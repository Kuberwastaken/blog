---
title: "wf-488f0322-9e4 · agent-ab6def"
---

Finalize the model-surfacing design for claurst, incorporating the critiques. Produce the DEFINITIVE recommendation:
- target architecture (single source of truth + how local/custom models layer in),
- the precise change list (delete/replace) with file:line,
- the guardrail test(s) that prevent regression,
- a short "why this will not recur" rationale tied to the past failures,
- any remaining open decisions for the owner.
Keep it implementation-ready and tight. Markdown.

=== DESIGN ===
I have verified the architecture end-to-end. Below is the implementation-ready design, grounded in the actual code (all file:line refs verified against the working tree on branch `merge-104`).

---

# claurst model-surfacing: single-source-of-truth design + refactor plan

## 0. Root cause (verified, one sentence)

The catalog (`ModelRegistry`, fed by the models.dev snapshot + disk cache + network refresh) is already correct and self-updating, but the `/model` picker **populates from the registry and then asynchronously clobbers that list** with each provider's hand-curated `list_models()`:

- `crates/tui/src/app.rs:1685-1692` — `open_model_picker_for_provider` fills the picker from `models_for_provider_from_registry(...)` (correct, has opus-4-7), then sets `self.model_picker_fetch_pending = true`.
- `crates/cli/src/main.rs:3402-3439` — that flag spawns `provider.list_models()` (the hardcoded `[opus-4-6, sonnet-4-6, haiku-4-5]`).
- `crates/cli/src/main.rs:3351-3379` — the result drain calls `app.model_picker.set_models(entries)` at **:3365**, **replacing** the registry list with the stale provider list.

So there are two registries with confusingly similar names — `ModelRegistry` (the catalog) and `ProviderRegistry` (live provider instances) — and the picker reads the catalog first, then lets the provider instance overwrite it. That overwrite is the entire bug.

A second, independent recurrence vector lives in `flagship_patterns_for` (`crates/api/src/model_registry.rs:977-1042`): for OpenAI/Google/zai the patterns are **version-pinned** (`"gpt-5.2-pro"`, `"gemini-3.1-pro"`, `"glm-5.1"`). A newer release that doesn't match a listed pattern sorts *behind* an older one that does, regardless of `release_date`. Anthropic is currently safe only because its patterns are family-level (`"claude-opus-4"`).

---

## 1. Target architecture: ONE canonical catalog

### Layering (all merged into `ModelRegistry` *before* anything reads it)

```
L0  Bundled snapshot   include_bytes!("../assets/models-snapshot.json")   (model_registry.rs:40)   compile-time floor
L1  Disk cache         ~/.cache/claurst/models.json   (load_cache, model_registry.rs:940)         overlays L0 (.extend semantics)
L2  Network refresh    refresh_from_models_dev()      (model_registry.rs:890)                      rewrites L1, 5-min TTL + bg loop
L3  Dynamic discovery  per-provider discover_models() (NEW, see §1b)                               merged in for ids NOT in models.dev
L4  User config        provider_configs / explicit config.model                                   wins for selection only
```

L0-L2 already exist and match opencode. The two missing pieces are **(1b)** clean handling of dynamic/local models and **(1c)** making the picker and defaults read *only* from this merged catalog.

### 1a. Providers contribute auth/capability ONLY — never a curated list

Repurpose the trait method. In `crates/api/src/provider.rs:75`:

```rust
// BEFORE (required — every provider must hand-roll a list):
async fn list_models(&self) -> Result<Vec<ModelInfo>, ProviderError>;

// AFTER (optional, default = "I have nothing dynamic to add"):
/// Live model discovery for providers whose catalog is NOT in models.dev
/// (local servers, gateways, OAuth-scoped endpoints). Returns the models the
/// *running endpoint* actually serves. Catalog-backed providers MUST NOT
/// override this — the models.dev snapshot is their source of truth.
async fn discover_models(&self) -> Result<Vec<ModelInfo>, ProviderError> {
    Ok(Vec::new())
}
```

- **Delete** the bodies in `anthropic.rs:324-349` and `bedrock.rs:766-790` entirely (don't override → inherit the empty default). Their models come from the snapshot under provider keys `anthropic` and `amazon-bedrock` (both verified present, anthropic has 23 models through opus-4-7).
- **Keep** real bodies — renamed to `discover_models` — only for providers that query a live endpoint: `ollama`/`lmstudio`/`llamacpp`/`custom-openai` (`openai_compat.rs:1176`, `:578`), `openai.rs:969`, `google.rs:913`, `cohere.rs:656`, `azure.rs:444`, `minimax.rs:443`, `codex.rs:902`, `copilot.rs:1120`.
- `copilot.rs:454-460` hardcoded fallback list (`claude-sonnet-4.6`/`4.5`) **stops being a model source**. Copilot is in models.dev under `github-copilot`; the registry is the floor. `discover_models` returns *only* what the live `/models` endpoint reports; on failure it returns `Ok(vec![])` and the registry list stands. Delete the curated fallback vec.

### 1b. How dynamic/local/gateway models layer in cleanly

Add one merge function on the catalog (the only place discovery touches the catalog):

```rust
// crates/api/src/model_registry.rs
impl ModelRegistry {
    /// Merge live-discovered models for one provider WITHOUT removing catalog
    /// entries. Catalog (models.dev) wins on conflict for metadata; discovery
    /// only *adds* ids the catalog doesn't have (ollama tags, gateway models,
    /// self-hosted). Idempotent.
    pub fn merge_discovered(&mut self, provider_id: &str, discovered: Vec<ModelInfo>) {
        for info in discovered {
            self.entries
                .entry(format!("{provider_id}/{}", info.id))
                .or_insert_with(|| ModelEntry::from_dynamic(provider_id, info));
        }
    }
}
```

Rules that keep this clean:
- **Catalog-backed providers** (anthropic, openai, google, …): `discover_models` may still run, but because the same ids already exist in the snapshot, `or_insert_with` is a no-op for them — the snapshot's richer metadata (pricing, release_date, modalities) is preserved. New ids the API reports before models.dev catches up get added automatically.
- **Not-in-models.dev providers** (ollama, lmstudio, llamacpp, custom-openai, free, codex): the registry has no entries, so discovery *is* their catalog. `free` and `codex` already have curated registry-side producers (`free_provider_models`, `codex_provider_models` in `model_picker.rs:270-288`) — fold those into `merge_discovered`-style seeding so they live behind the same single read path rather than as picker special-cases.
- Discovery never deletes. The only removal path is the existing visibility filter (`list_visible_by_provider`, `model_registry.rs:715`, alpha/deprecated unless `CLAURST_ENABLE_EXPERIMENTAL_MODELS=1`).

### 1c. Latest/default derived deterministically, NO hardcoded ids

There is already a correct, registry-driven resolver chain — `best_model_for_provider` (`model_registry.rs:733-777`) → `effective_model_for_config` (`:1080-1095`). Make it **the only** computation and fix the sort precedence so it cannot regress:

In `best_model_for_provider`, reorder so `release_date` dominates and patterns are only a tiebreaker, and make patterns **family-level**:

```
1. status: active/beta before alpha/deprecated
2. release_date DESC          <-- PRIMARY (newest always wins)
3. flagship family-pattern index ASC   (tiebreak within same date)
4. "-latest" alias present
5. model id DESC
```

This is opencode's "release_date DESC, then priority" order. With it, opus-4-8 wins the instant it appears in *any* layer, with zero code edit. Then rewrite `flagship_patterns_for` (`model_registry.rs:977-1042`) to families only — `"claude-opus"`, `"claude-sonnet"`, `"gpt-5"`, `"gemini-3"`, `"glm-5"` — deleting every version-pinned entry (`"gpt-5.2-pro"`, `"gemini-3.1-pro"`, `"glm-5.1"`, `"codex"` exacts). Version-pinned patterns are exactly how the "stuck on old default" bug re-enters for non-Anthropic providers.

### 1d. The picker reads ONLY from the catalog and never overwrites it

The picker becomes a pure projection of the merged catalog. Flow after refactor:

1. `open_model_picker_for_provider` (`app.rs:1674`) calls `models_for_provider_from_registry` (already correct) and displays it immediately. **Keep.**
2. Kick off `discover_models` **only for dynamic providers**, and on return call `registry.merge_discovered(pid, …)` then re-project the picker from the registry — i.e. replace `set_models(entries)` at `main.rs:3365` with `set_models(models_for_provider_from_registry(pid, &registry))`. The provider list is *merged into the catalog*, then the picker re-reads the catalog. It can only *add* rows, never replace the catalog ones.
3. For catalog-backed providers (anthropic/bedrock/openai/google/…) skip the spawn entirely — the registry already has everything.

Net: there is no code path where a provider's return value becomes the displayed list. It always goes catalog → merge → re-project.

---

## 2. Exactly what to DELETE / CHANGE

| # | File:line | Current | Action |
|---|-----------|---------|--------|
| 1 | `crates/api/src/provider.rs:75` | `async fn list_models(&self) -> Result<Vec<ModelInfo>, …>;` (required) | **Rename → `discover_models`, add default `Ok(Vec::new())`.** |
| 2 | `crates/api/src/providers/anthropic.rs:324-349` | hardcoded `[opus-4-6, sonnet-4-6, haiku-4-5]` | **Delete the whole override.** Inherit empty default; models come from snapshot key `anthropic`. |
| 3 | `crates/api/src/providers/bedrock.rs:766-790` | hardcoded `anthropic.claude-*-4-6` | **Delete the whole override.** Snapshot key `amazon-bedrock`. |
| 4 | `crates/api/src/providers/copilot.rs:454-460` | curated fallback vec (`claude-sonnet-4.6/4.5`) | **Delete the curated vec.** `discover_models` returns live `/models` only; empty on failure. Registry (`github-copilot`) is the floor. |
| 5 | `crates/cli/src/main.rs:3402-3439` | spawns `provider.list_models()` for the picker | **Gate to dynamic providers only**, call `discover_models`, and pass result to `merge_discovered` (do not build a replacement `Vec<ModelEntry>` here). |
| 6 | `crates/cli/src/main.rs:3365` | `app.model_picker.set_models(entries)` (clobber) | **Replace** with `merge_discovered(pid, discovered)` + `set_models(models_for_provider_from_registry(pid, ®istry))`. The picker re-reads the catalog. |
| 7 | `crates/core/src/lib.rs:1958-1961` | `DEFAULT_MODEL/SONNET_MODEL/HAIKU_MODEL/OPUS_MODEL = "claude-…-4-6"` | **Demote to last-resort offline floor only.** Keep the constants (something must exist if the snapshot embed ever fails), but no UI/default path may read them except the single resolver's final `else`. Add a `// LAST RESORT — do not read directly; see resolve_default()` banner. |
| 8 | `crates/core/src/lib.rs:1297-1324` | `Config::effective_model()` hardcoded per-provider table (`openai→gpt-4o`, `bedrock→anthropic.claude-sonnet-4-6-v1`, …) | **Collapse.** Return the explicit `config.model` if set; otherwise return a sentinel that forces callers through `effective_model_for_config` (registry). Delete the 20-line provider→string match — it is a third competing default table. |
| 9 | `crates/api/src/model_registry.rs:733-777` (`best_model_for_provider`) | flagship pattern dominates over date | **Reorder** to release_date-DESC primary (see §1c). |
| 10 | `crates/api/src/model_registry.rs:977-1042` (`flagship_patterns_for`) | version-pinned patterns | **Replace with family-level patterns**; delete every `X.Y`-pinned entry. |
| 11 | `crates/api/src/providers/google.rs:998` | internal `self.list_models()` call | Rename to `self.discover_models()`. |
| 12 | `crates/tui/src/model_picker.rs:270-288` (`free`/`codex` special-cases) | curated lists inside the picker | Move behind `merge_discovered` seeding so the picker has **no** provider-specific branches; it only reads the registry. |

After this, `grep -rn "fn list_models" crates/` returns nothing, and the picker (`main.rs:3351-3439`) contains no `Vec<ModelEntry>` construction from a provider return value.

---

## 3. Migration / compatibility

- **Offline / models.dev unreachable:** unchanged and already safe. `refresh_from_models_dev` honors `CLAURST_DISABLE_MODELS_FETCH` and swallows all network/parse errors (`model_registry.rs:890-896`); the bundled snapshot (L0) is the floor. Deleting the hardcoded provider lists does **not** reduce offline coverage because the snapshot already contains anthropic (23 models) and amazon-bedrock. The only true offline floor that must survive is the `core::constants` last-resort string (item #7).
- **First run (cold cache):** `load_cached_model_registry` (`main.rs:1089`) hydrates from the embed; `spawn_models_cache_refresh` (`main.rs:1129`) refreshes in the background. Picker shows snapshot models instantly, upgrades silently when the refresh lands. No change.
- **Bundled snapshot staleness (the opus-4-8 case):** snapshot currently tops out at opus-4-7 (`2026-04-16`). With the release_date-primary sort, the day models.dev lists opus-4-8 the background refresh writes it to L1 and `best_model_for_provider("anthropic")` returns it with **no code change and no release**. The remaining job — `script/sync-models.*` refreshing the embedded snapshot — becomes a freshness optimization, not a correctness requirement.
- **Custom / local providers:** ollama/lmstudio/llamacpp/custom-openai keep live `discover_models`; via `merge_discovered` they're added to the catalog instead of replacing it, so a user with both a local Ollama and a catalog provider sees a coherent merged list. `OLLAMA_HOST`/`LM_STUDIO_HOST`/etc. behavior unchanged.
- **Bedrock id formats:** the `anthropic.`-prefixed ids now come from the `amazon-bedrock` snapshot entries rather than the hand-written `anthropic.claude-opus-4-6` strings. Verify the snapshot's bedrock model ids match the dispatch format the Bedrock provider expects; if models.dev uses bare ids, add the `anthropic.` prefix (and any `-v1` suffix) in the Bedrock provider's request builder, not in a curated list. The current `effective_model` bedrock default `"anthropic.claude-sonnet-4-6-v1"` (`lib.rs:1320`) is deleted (item #8) and replaced by `best_model_for_provider("amazon-bedrock")`; add a one-test check that the resolved id is dispatchable.
- **Config back-compat:** explicit `config.model` and `provider_configs` are untouched (L4 still wins). `/model <id>` typed by the user still bypasses the picker via `effective_model` returning the explicit value.

---

## 4. Guardrails against silent regression

**G1 — One and only one place computes "default/latest".** Make `effective_model_for_config` (`model_registry.rs:1080`) the single public resolver and route every call site through it (the CLI already does at `main.rs:1676, 1686, 2273, 2348, 3043, 3197, 3305, 3624, 3717` — good). Add `#[doc(hidden)]`/`pub(crate)` on `best_model_for_provider`/`best_small_model_for_provider` so nothing outside the resolver computes a default. Add a module banner: *"No model id is hardcoded anywhere except `core::constants` (offline floor). All defaults flow through `effective_model_for_config`."*

**G2 — Picker == catalog (the regression that bit us).** Test in `crates/cli` (or `tui`) integration tests:
```rust
#[test]
fn picker_list_equals_registry_projection() {
    let reg = ModelRegistry::new();                       // bundled snapshot
    for pid in ["anthropic","amazon-bedrock","openai","google"] {
        let picker = models_for_provider_from_registry(pid, &reg);
        let catalog: Vec<String> =
            reg.list_visible_by_provider(pid).iter().map(|e| e.info.id.to_string()).collect();
        assert!(picker.iter().all(|m| catalog.contains(&m.id)),
            "{pid}: picker surfaced an id not in the catalog — a curated list crept back in");
    }
}
```

**G3 — No provider returns a curated static list.** Compile-time + test invariant:
```rust
#[test]
fn no_catalog_backed_provider_overrides_discovery() {
    // Catalog-backed providers must inherit the empty default.
    for p in [anthropic(), bedrock()] {            // construct test instances
        assert!(p.discover_models().await.unwrap().is_empty(),
            "catalog-backed provider must not hand-roll a model list");
    }
}
```
Plus a CI grep gate: `! grep -rn "fn list_models" crates/` and `! grep -rnE 'ModelId::new\("claude-(opus|sonnet|haiku)' crates/api/src/providers/` — fails the build if a curated Claude id reappears in any provider.

**G4 — Latest always wins by date.** Property test on the sort:
```rust
#[test]
fn newest_release_date_is_default() {
    let mut reg = ModelRegistry::new();
    reg.merge_discovered("anthropic", vec![ModelInfo {
        id: ModelId::new("claude-opus-9-9"), /* release_date 2099-01-01 */ .. }]);
    assert_eq!(reg.best_model_for_provider("anthropic").as_deref(),
        Some("claude-opus-9-9"),
        "a strictly newer model must become the default with no code change");
}
```
This is the direct executable assertion that the opus-4-8 class of bug cannot recur.

**G5 — Constants are floor-only.** Test that `DEFAULT_MODEL` is referenced from exactly one location (the resolver's final `else`); enforce with a grep gate `grep -rc "constants::DEFAULT_MODEL" crates/` capped at the known sites, or move the constant behind a `fn offline_floor()` so its single call site is greppable.

---

### Files touched (summary, all absolute)

- `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/provider.rs` (trait → `discover_models` default)
- `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/providers/anthropic.rs` (delete `:324-349`)
- `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/providers/bedrock.rs` (delete `:766-790`)
- `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/providers/copilot.rs` (delete fallback `:454-460`)
- `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/providers/{google,openai,openai_compat,cohere,azure,minimax,codex}.rs` (rename to `discover_models`)
- `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/model_registry.rs` (`merge_discovered` new; reorder `best_model_for_provider` `:733-777`; family patterns `:977-1042`)
- `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/cli/src/main.rs` (`:3351-3439` merge-not-replace; gate to dynamic providers)
- `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/tui/src/app.rs` (`:1674-1692` re-project after merge)
- `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/tui/src/model_picker.rs` (`:270-288` fold free/codex into seeding)
- `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/core/src/lib.rs` (`:1297-1324` collapse table; `:1958-1961` demote constants to floor)

The single behavioral invariant to remember: **providers describe how to talk to an endpoint; the catalog decides which models exist and which is latest; the picker is a read-only projection of the catalog.** Nothing else may name a Claude model id.

=== CRITIQUES ===
Verified against the working tree at `/Users/kuber.mehta/Personal-Projects/claurst/src-rust`. Branch is `main` (not `merge-104`), real paths are `src-rust/crates/...`, but the line refs in the design line up. I confirmed the root cause is real (anthropic.rs:324-349 hardcodes opus-4-6/sonnet-4-6/haiku-4-5; the picker drain at main.rs:3365 clobbers the registry list with it). Through the offline / no-network / stale-or-partial / first-run lens, the design does NOT hold. Here are the holes, each with evidence and the exact fix.

---

## H1 — HEADLINE: making `release_date` the PRIMARY sort key reintroduces "latest model not showing" under exactly the partial-data conditions this review targets

The design (§1c, item #9) reorders `best_model_for_provider` so `release_date DESC` dominates and family pattern is a tiebreak only on equal dates. `release_date` is `Option<String>`, parsed verbatim from models.dev (`model_registry.rs:538`), compared as a raw string with `.unwrap_or("")` (`:769-770`). An empty/missing date sorts to the BOTTOM under DESC. Two concrete failure paths:

1. **Day-0 new flagship with no date.** I simulated the actual snapshot with Rust `.cmp()` semantics: add `claude-opus-4-8` with `release_date` absent → the NEW sort picks **claude-opus-4-7**, not 4-8. The design's central promise ("the day models.dev lists opus-4-8 … `best_model_for_provider` returns it with no code change") silently assumes models.dev always populates `release_date` strictly greater than the prior model on the very first push. If it ships the id first and backfills the date (or ships null), date-primary buries the new model behind the old default — the exact original bug.

2. **Metadata poisoning from a partial refresh.** `refresh_from_models_dev` does `self.entries.extend(parsed.models)` (`:908`) and `load_cache` does the same (`:952`); `HashMap::extend` overwrites per-key. A models.dev response that returns `claude-opus-4-7` with `release_date: null` (CDN/edge truncation, schema hiccup) overwrites the bundled entry's good `2026-04-16` with `None`. Under date-primary, opus-4-7 then drops to the bottom and the default flips to the next dated model. The only guard is whole-response-empty (`!parsed.models.is_empty()`, `:951`); there is no per-field guard. Under the OLD pattern-primary sort this same poisoned entry still wins via the `claude-opus-4` pattern + id-DESC tiebreak — so the reorder strictly amplifies sensitivity to upstream gaps.

**Fix:** Do not trust string `release_date` as the sole/primary discriminator. (a) Parse a numeric version out of the model id (`opus-4-8` > `opus-4-7`) and use it as a co-primary so a missing/equal date can't bury a higher version; (b) keep flagship-family priority as a primary key (see H2); (c) in `extend`/`load_cache`, merge fields rather than blind-overwrite — never let an incoming `None` clobber a non-null bundled `release_date`/`status`.

## H2 — The reorder flips the Anthropic default from Opus to Sonnet (offline, no network needed)

This is not network-conditional; it happens with the bundled snapshot alone. With family pattern demoted to a same-date tiebreak, the default becomes "newest model of ANY family." Simulated on the real snapshot, dropping `claude-opus-4-7` (i.e. the common window where the latest Sonnet is newer than the latest Opus — `claude-sonnet-4-6` @ 2026-02-17 vs `claude-opus-4-6` @ 2026-02-05):

- OLD sort → `claude-opus-4-6` (flagship)
- NEW sort → `claude-sonnet-4-6` (downgrade)

For an Anthropic-first Claude Code clone, silently defaulting to Sonnet whenever Anthropic ships an interleaved Sonnet/Haiku point release is a capability regression users will notice. Anthropic's patterns were ALREADY family-level (`model_registry.rs:980-984`) and never had the stuck-default bug; the reorder breaks the one provider that was correct.

**Fix:** Keep flagship-family priority PRIMARY (within active/beta status), and use `release_date` (plus id-version from H1) as the tiebreak *within* the preferred family — i.e. "newest within the preferred family," which is what the old anthropic patterns already did. The stuck-default bug for non-Anthropic was caused by version-pinned patterns + the picker clobber, not by family-primary ordering.

## H3 — Agreement (sound): family-level patterns ARE the right fix for openai/google/zai

Item #10 is correct and offline-relevant. `flagship_patterns_for` version-pins `"gpt-5.2-pro"`, `"gemini-3.1-pro"`, `"glm-5.1"` (`model_registry.rs:986,996,1020`). Offline, the bundled snapshot is the only source, so a newer unpinned id sorts behind an older pinned one with no recourse. De-pinning to families is necessary. Just do it via family-PRIMARY + date-within-family (H2), not date-primary. Note the catch-all arm (`:1031-1040`) still mixes version-ish patterns (`"gpt-5"`, `"gemini-2.5-pro"`) — keep it family-level too.

## H4 — Item #8's "sentinel" breaks the terminal offline fallback (circular) and regresses local/non-Anthropic empty-registry defaults

`effective_model_for_config` (`model_registry.rs:1080-1095`) is: explicit `config.model` → registry `best_model_for_provider` → `config.effective_model()` (the per-provider table at `lib.rs:1301-1323`). Item #8 says collapse that table to "a sentinel that forces callers through `effective_model_for_config`." But the table IS that resolver's terminal `else` — making it a sentinel is circular and yields garbage whenever `best_model_for_provider` returns `None`. That happens for every provider ABSENT from the bundled snapshot, which I verified: `codex`, `openai-codex`, `free`, `opencode-zen` are all MISSING, and `ollama`/`lmstudio`/`llamacpp`/`custom-openai` are never in models.dev. Today those return real placeholders (`ollama→"llama3.2"`, `lmstudio/custom-openai→"default"`, `lib.rs:1315-1318`). After item #8, an offline ollama user with the local server down resolves to a sentinel — or, per item #7, to `constants::DEFAULT_MODEL = "claude-opus-4-6"` (`lib.rs:1958`), i.e. a Claude id sent to a local Ollama. Same for any provider when the bundled snapshot fails to parse (`load_bundled_snapshot` leaves the registry empty by design, `:613-615`).

**Fix:** Give `effective_model_for_config` a real terminal: explicit → registry best → `format!("{provider}/default")` (matching `default_model_for_provider`'s existing terminal, `model_picker.rs:371`) → `constants::DEFAULT_MODEL` only for Anthropic. Do not delete the local-provider placeholders.

## H5 — Item #8 for Bedrock resolves to a wrong-region, US-pinned id (offline and online)

Deleting the hardcoded bedrock default (`anthropic.claude-sonnet-4-6-v1`, `lib.rs:1320`) and trusting `best_model_for_provider("amazon-bedrock")` is unsafe. The bundled `amazon-bedrock` snapshot carries SIX region variants of each model (`anthropic.`, `us.`, `eu.`, `au.`, `global.`, `jp.`). The `claude-opus-4` family pattern matches all of them, and the id tiebreak is lexical, so I verified `best_model_for_provider("amazon-bedrock")` returns **`us.anthropic.claude-opus-4-7`** — a US-pinned, region-prefixed id. The current default is the region-neutral bare `anthropic.…-v1` form (region applied at dispatch). For EU/AP users this resolves to a wrong-region/double-prefixed inference-profile id and fails. The design's migration note has the direction backwards (it worries about *adding* an `anthropic.` prefix; the real problem is *too many* region prefixes being picked arbitrarily). This holds under both sorts; item #8 *activates* it by removing the safe bare default.

**Fix:** Bedrock needs a region-normalizing projection before best-model selection (filter to bare `anthropic.` entries / strip `us.|eu.|au.|global.|jp.` and any `-v1:0` region suffix), then apply region at dispatch. Note this is a provider-specific branch, which the design's "no provider-specific branches" invariant forbids — so the invariant itself is wrong for Bedrock.

## H6 — Folding codex/free into "seeding" (item #12) regresses their offline floor unless it stays provider-specific

`codex`/`free` are not in the snapshot (verified). The current offline floor is deliberate and non-trivial: `codex_provider_models` filters the `openai` catalog through `codex_model_allowed`, applies `codex_limit_override`, zeroes cost, and falls back to the static `codex_fallback_models()`/`CODEX_MODELS` when the catalog is empty (`model_picker.rs:395-457`); the codex default is the `DEFAULT_CODEX_MODEL` constant (`:357-362`), not a date/family pick; `free` returns `free/auto` + `free_provider_models()`. Item #12 ("no provider-specific branches; it only reads the registry") cannot reproduce any of this generically:
- A generic `merge_discovered` dump of the openai catalog under `codex` loses the `codex_model_allowed` filter (picker would show openai models the Codex endpoint rejects) and the cost/limit overrides.
- Routing the codex default through `best_model_for_provider("codex")` ignores `DEFAULT_CODEX_MODEL` and picks by date/family instead.
- Seeding MUST run at registry construction (offline), not in the network discovery path, or offline first-run shows empty codex/free.

**Fix:** Keep the codex/free producers as explicit, offline, construction-time seeds that preserve the filter + overrides + curated default, and accept that "the picker has no provider-specific branches" is not achievable for codex.

## H7 — The design's first-run freshness claim ("upgrades silently when the refresh lands") is false; the refactor does nothing to fix it

The TUI's session default is computed once from the Arc registry (`main.rs:1250` → `effective_model_for_config` at `:1676/:1686`). Startup uses `load_cached_model_registry` (bundled + disk cache, no in-memory network) + `spawn_models_cache_refresh` (`main.rs:1252`), which only `std::fs::write`s the cache for the NEXT launch (`:1177-1178`); the in-memory Arc is never network-refreshed mid-session. The App's by-value registry reloads the cache only on picker-open (`app.rs:1682`), so only the picker LIST can update, and only if reopened AFTER the ~10s async fetch completes (a race) — the active `model_name` stays bundled-stale until restart. So on the very first run after a new model ships, it will not be the active default for the session, and may not even appear in the picker. The refactor replaces the `provider.list_models()` spawn with a pure re-projection of an already-loaded registry (items #5/#6), which closes nothing here.

**Fix:** After the background fetch lands, signal the running app to reload the cache into both registries and recompute the default; or do a short-timeout in-memory `refresh_from_models_dev` at startup and update `model_name` on completion. At minimum, drop the "first run upgrades silently / no change" claim from §3 — it is inaccurate.

## H8 — Completeness gaps in the trait migration

`grep` shows a `list_models` trait impl the design's rename list omits: `crates/api/src/providers/free.rs:367` (plus a test impl at `:487`). After renaming/defaulting the trait method (item #1), `free.rs` will fail to compile. The design caught `google.rs:998`'s internal call but not these. Confirm the full set is `{copilot, azure, google, bedrock, minimax, codex, openai_compat, openai, cohere, free, anthropic}` before asserting `grep -rn "fn list_models"` returns nothing.

---

## What IS sound for this lens (credit where due)

- Deleting anthropic's hardcoded list (item #2) is offline-safe: bundled `anthropic` has 23 models through `claude-opus-4-7` (2026-04-16), all with `release_date` populated. Verified.
- Deleting copilot's `hardcoded_models` (item #4) is id-format-safe offline: bundled `github-copilot` has 27 models using the same dotted ids (`claude-opus-4.7`, `claude-sonnet-4.6`) the Copilot endpoint and the old fallback used. Verified.
- `extend`/never-remove semantics are resilient to a shrinking or empty upstream (`load_cache` empty-guard at `:951`; `extend` of `{}` is a no-op). Verified.
- First-run DOES trigger a network fetch — `cache_is_fresh` returns false when the cache file is absent (`main.rs:1107-1120, 1139`). Verified.
- Family-level patterns (item #10) are the correct, necessary fix for the openai/google/zai stuck-default. Verified.

## Net

The diagnosis (picker clobber + version-pinned patterns) is correct, and several deletions are offline-safe. But the proposed cure — **`release_date`-PRIMARY sort** — is the wrong mechanism for the assigned lens: it re-creates "latest not showing" whenever models.dev ships a new flagship without a (greater) date or a partial refresh nulls a date (H1), and it regresses the Anthropic default from Opus to Sonnet with no network involved (H2). Item #8's table collapse breaks the terminal offline fallback for every non-snapshot/local provider (H4) and mis-resolves Bedrock to a US-pinned id (H5). The "single read path with no provider-specific branches" goal is unachievable without regressing codex/free/bedrock offline behavior (H5, H6). And the design overstates first-run freshness while doing nothing to fix it (H7). Recommend: keep family-PRIMARY + (id-version, date)-within-family sort, field-merging refresh that won't null-poison bundled metadata, a real terminal in `effective_model_for_config`, and explicit offline seeds for codex/free/bedrock-normalization.

---

NOT sound for this lens. The design fixes the cloud "latest/default" path but actively regresses local/custom/gateway surfacing, and its central premise is false precisely for the providers you asked me to scrutinize. Holes below, each with the exact fix. All refs verified against the working tree (note: design says branch `merge-104`; actual HEAD is `main`, but the cited line numbers do match the tree).

---

**H1 — `lmstudio` IS in models.dev, so `merge_discovered` lets the catalog clobber the live truth (the sharpest reverse-clobber).**
The design assumes ollama/lmstudio/etc. are "not-in-models.dev so discovery is their catalog." False for LM Studio. `crates/api/assets/models-snapshot.json` has a `lmstudio` provider with 3 curated, *dated* models (`openai/gpt-oss-20b` 2025-08-05, `qwen/qwen3-coder-30b` 2025-07-23, `qwen/qwen3-30b-a3b-2507` 2025-07-30) — models the user almost certainly does NOT have installed.
- With `merge_discovered` = `or_insert_with` (additive only), the picker for lmstudio becomes `{3 models.dev catalog models}` ∪ `{user's installed models}`. Selecting a non-installed catalog model → dispatch failure.
- Worse with the new sort: under release_date-DESC-primary, `best_model_for_provider("lmstudio")` returns `qwen/qwen3-30b-a3b-2507` (newest catalog date) over the user's dateless installed models. The LM Studio **default now points at a model the user may not have**. This is the "default stuck on a wrong model" class re-entering through the local door, and release_date-primary makes it stronger (dated catalog entries always outrank dateless discoveries).
**Fix:** `merge_discovered` needs a per-provider authority policy, not one global additive merge. Tag each entry with a source (`Catalog` vs `Discovered`). For live-endpoint providers (ollama, lmstudio, llamacpp, custom-openai, copilot) discovery is authoritative: the picker and `best_model_for_provider` must project from the *discovered* set (catalog only as fallback when discovery is empty/unreachable), not the union. Only cloud catalog providers get union semantics.

**H2 — The core premise "same ids already exist → `or_insert_with` is a no-op" is false for local/gateway providers due to id-format mismatch.**
models.dev spells the LM Studio model `qwen/qwen3-coder-30b` (vendor-prefixed); the live `/v1/models` endpoint returns `qwen3-coder-30b` (or `…-instruct`). Copilot's live `/models` returns dotted ids like `claude-sonnet-4.6` (`copilot.rs:1120+`) while the `github-copilot` snapshot uses its own spelling. Because the keys differ, `or_insert_with` does NOT dedupe — it inserts a second row. Result: duplicate-looking entries (one dated catalog row + one dateless live row) for the exact providers (lmstudio/copilot/gateways) where this hurts most. The design's claim that catalog metadata is "preserved" and discovery is a no-op only holds when id normalization is identical, which it is not here.
**Fix:** normalize ids on merge (strip known vendor prefixes / dot-vs-dash) before the `entry()` lookup, OR, given H1's source-tag fix, never union live+catalog for these providers so the collision can't surface.

**H3 — `merge_discovered` never deletes → stale local models persist; current behavior is correct.**
Today `app.model_picker.set_models(entries)` (`main.rs:3365`) *replaces* the list, so `ollama rm`, a model swap, or switching `OLLAMA_HOST`/`providers.ollama.api_base` mid-session is reflected immediately. Under the design, `or_insert_with` plus the additive `.extend()` in `load_cache` (`model_registry.rs:952`) and `refresh_from_models_dev` (`:908`) mean removed local models linger in the in-memory `ollama/*` keyspace for the whole session, and switching hosts shows the **union of both servers'** models. Concrete regression.
**Fix:** for live-endpoint providers, `merge_discovered` must clear that provider's prior `Discovered` entries before inserting the fresh set (replace-the-discovered-subset), keyed off the source tag from H1.

**H4 — Dynamic models have no `release_date`; release_date-DESC-primary sends them all to the bottom and the re-projection destroys the ollama ordering.**
`ModelInfo` (`provider.rs:22-37`) has no `release_date`/`param_size`/`is_coder`; the ollama native path computes coder-first + param-size-desc ordering in-flight (`openai_compat.rs:646-652`) but those keys are not carried into `ModelEntry`. Today that order survives because `set_models` takes the provider vec verbatim. Under the design, the picker re-projects via `models_for_provider_from_registry`, which re-sorts by `release_date` DESC then id (`model_picker.rs:309-313`) — all local models tie at `""` and collapse to arbitrary id-DESC order. The "best local coding model on top" UX is lost, and "newest local model becomes default" never happens because there are no dates. The design's headline guarantee ("newest always wins by date," G4) **does not apply to any local provider** and the design never acknowledges this.
**Fix:** persist a discovery sort-rank (or carry `param_size`/`is_coder`) into `ModelEntry` and have both `best_model_for_provider` and the picker honor it as the primary key for dateless providers; do not re-sort the discovered subset by date.

**H5 — Flattening `flagship_patterns_for` to family-level (item #10) regresses local default selection.**
For cloud providers patterns are a date tiebreaker, so flattening is fine. For local providers patterns are the *only* ranking signal (no dates), and they are deliberately capability-ordered: `"qwen3-coder","qwen2.5-coder","deepseek","llama3.3","llama3.1","qwen2.5"` (`model_registry.rs:1023-1030`). Item #10 ("delete every version-pinned entry") applied to this arm would drop coder-preference and version ordering, making the local default arbitrary.
**Fix:** scope the pattern flattening to the catalog cloud providers only (openai/google/zai/codex). Leave the ollama/lmstudio/llamacpp arm intact — it is capability ranking, not a stale-version pin.

**H6 — Discovery only runs on picker-open, but default resolution runs at startup/every turn → local defaults resolve before the catalog is populated.**
The only callers of `list_models()`/discovery are the picker spawn (`main.rs:3417`) and an internal google call (`google.rs:998`). `effective_model_for_config` (`model_registry.rs:1080`) and `default_model_for_provider` (`model_picker.rs:347`) compute the default from `best_model_for_provider`, which for a local provider with no catalog entries returns `None` → `"ollama/default"` placeholder. The design centralizes all defaults on the catalog but never populates the catalog for local providers at the moment defaults are computed. So a user whose configured provider is ollama with no explicit `config.model` gets the bogus `ollama/default` until they manually open the picker once. This is exactly the "latest/default not showing" symptom, relocated to local providers.
**Fix:** kick off `discover_models` for the active provider at startup (and merge) before the first default resolution, or make `effective_model_for_config` lazily trigger discovery for live-endpoint providers when the catalog has zero entries for them.

**H7 — Internal contradiction that suppresses gateway/Azure/custom-base-url discovery.**
§1a keeps `discover_models` for openai/google/azure/cohere/minimax specifically so "new ids the API reports before models.dev catches up get added automatically" — the gateway/Azure case. But §1d ("for catalog-backed providers anthropic/bedrock/**openai/google**/… skip the spawn entirely") cancels exactly that. If you skip the spawn for openai/google, an OpenAI- or Google-compatible **gateway or Azure deployment serving endpoint-specific models is never discovered**. The two sections are mutually exclusive for the providers your lens cares about.
**Fix:** drop the §1d "skip the spawn for catalog-backed" optimization. The catalog-vs-dynamic distinction must be data-driven: always call `discover_models` (the empty default is free for true catalog-only providers like anthropic/bedrock) and let providers with a live endpoint contribute.

**H8 — "Gate discovery to dynamic providers only" (#5) reintroduces a hardcoded provider-id list that drifts.**
There is no flag distinguishing catalog-backed from dynamic providers; the only way to "gate to dynamic providers" is an id allowlist. Any novel/custom provider id not on the list gets no discovery and is stuck on the synthetic `"default"` row. This is the same hardcoded-list anti-pattern the design is trying to eliminate, just moved into the picker.
**Fix:** same as H7 — always call `discover_models`; rely on the empty default. No id gate.

**H9 — Synthetic `"default"` placeholder is non-dispatchable and silently escapes the G2 invariant.**
When discovery fails (ollama down), `models_for_provider_from_registry` synthesizes a `model_entry("default","Default model",…)` (`model_picker.rs:298-306`) and `default_model_for_provider` returns `"<pid>/default"` (`:371`) — neither is a real model the local endpoint serves. The design's G2 test ("picker ⊆ catalog") only checks anthropic/bedrock/openai/google, so it will never catch that local pickers surface an id absent from the catalog. The invariant the design leans on is unenforced exactly where it would fail.
**Fix:** include at least one live-endpoint provider in G2 with a mocked discovery, and assert that when discovery is empty the picker shows an explicit "endpoint unreachable" non-selectable state rather than a fake selectable `default`.

---

Residual note (not blocking, but unaddressed by "the catalog decides which models exist"): for a gateway behind `custom-openai`, a model named `claude-*`/`gpt-*` is routed by `find_provider_for_model`'s family heuristic (`model_registry.rs:651-681`) to anthropic/openai by bare name, which can misroute a gateway selection. Pre-existing, but the design's "providers describe the endpoint; the catalog owns identity" framing doesn't cover cross-provider id collisions that gateways create.

Bottom line: the design is correct for catalog-backed cloud providers, but for the local/custom/gateway lens it (a) wrongly assumes none of them are in models.dev (lmstudio is), (b) builds on an id-equality assumption that fails for live vs catalog id spellings, (c) replaces authoritative live-replace semantics with additive-merge that strands stale/non-installed models and makes defaults point at models the user doesn't have, and (d) contradicts itself on whether endpoint discovery runs for openai/google gateways. The unifying fix is a source-tagged `merge_discovered` with a per-provider authority policy (live-endpoint providers: discovery authoritative/replace; cloud providers: union), always-call discovery (no id gate), discovery-before-first-default-resolution, and dateless-aware ranking that preserves the ollama coder/param ordering.

Relevant files: `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/model_registry.rs`, `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/providers/openai_compat.rs`, `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/providers/openai_compat_providers.rs`, `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/providers/copilot.rs`, `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/assets/models-snapshot.json`, `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/tui/src/model_picker.rs`, `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/tui/src/app.rs`, `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/cli/src/main.rs`.

---

I have verified the design against the actual tree (on `main`; there is no `merge-104` branch — but the cited line numbers match `main`). I traced every edge case in the lens against real code and the bundled snapshot. Here is the adversarial review.

---

# Verdict: NOT sound for this lens. The core clobber fix is correct, but the default-resolution changes regress, and four of the named edge cases (Bedrock ids, codex, copilot, qwen/alibaba) are either unaddressed or actively broken by the proposal.

## What the design gets right (credit where due)

- The clobber root cause is real and correctly located. `models_for_provider_from_registry("anthropic")` (`model_picker.rs:270`) shows the 23-model catalog (incl. `claude-opus-4-7`), then `model_picker_fetch_pending` (`main.rs:3402`) spawns `provider.list_models()` which for Anthropic is hardcoded `[opus-4-6, sonnet-4-6, haiku-4-5]` (`anthropic.rs:324-348`, verified), and `set_models(entries)` at `main.rs:3365` overwrites the catalog with those 3 stale rows. The "open /model, see latest flash to old" behavior is exactly this. Merge-not-replace + skip-spawn-for-catalog-providers + re-project genuinely kills *that* path.
- Family-leveling the Anthropic pattern (`claude-opus`/`claude-sonnet`) is the correct fix for the **next** major bump: today `flagship_patterns_for` (`model_registry.rs:980`) pins `"claude-opus-4"`, which will not match `claude-opus-5` and would pin the default to opus-4-7 the day opus-5 ships. Good catch.

## Hole 1 — The date-primary reorder (§1c) REGRESSES the default to cheap/small models. Proven against the snapshot.

The design says the current sort lets pattern dominate date; that is true (`best_model_for_provider`, `model_registry.rs:745-774`: pattern index ASC is primary, date is the 3rd key). But flipping to **release_date DESC primary, pattern as tiebreaker** is wrong because `best_model_for_provider` feeds the *default flagship* (via `effective_model_for_config:1080` and `default_model_for_provider`, `model_picker.rs:364`). The newest-dated model is frequently NOT the flagship. From the actual snapshot, newest-by-date per provider:

- **google**: `gemini-3.1-flash-lite` @ 2026-05-07 — newer than any Pro. Under date-primary the Google default becomes **flash-lite**. Worse: even with the design's own family pattern `"gemini-3"`, both `gemini-3.1-flash-lite` and `gemini-3.1-pro-*` match at index 0, tie, fall to date → flash-lite still wins. So *both* proposed changes pick the wrong default for Google.
- **openai**: newest = `gpt-5.5-pro`/`gpt-5.5` (ok today), but `gpt-5.4-nano`/`gpt-5.4-mini` @ 2026-03-17 were the newest before 5.5 — date-primary would have pinned the default to **nano/mini**. (Note: the *current* code already resolves OpenAI to `gpt-5.5` correctly, because every `gpt-5.x` ties on the `"gpt-5"` catch-all and date breaks the tie — so the design's premise that OpenAI is "stuck on old" via version pins is false for the live catalog; the pins are dead entries, not the bug.)

Fix: keep **flagship-family pattern as the PRIMARY key**, make the patterns family-level, and keep `release_date DESC` as the in-family tiebreaker (which is already the code's behavior). Do NOT promote date above pattern. The only change needed is de-pinning patterns; the reorder is the regression.

## Hole 2 — The "family-level" patterns are still version-pinned for non-Anthropic, so the bug recurs at the next major bump.

§1c proposes `"gpt-5"`, `"gemini-3"`, `"glm-5"`. These are pinned to a major version: `"gpt-5"` will not match `gpt-6`, `"gemini-3"` will not match `gemini-4`, `"glm-5"` will not match `glm-6`. The instant the provider ships the next major, the old flagship (which still matches the pin) outranks the new one — the identical "stuck on old default" failure the design claims to eliminate. Anthropic is the only one made truly family-level (`claude-opus`). Either make all of them role-based (match `pro`/exclude `mini|nano|flash-lite|codex`) or accept that these are still pins and document the recurrence.

## Hole 3 — Bedrock: deleting the hardcoded list pins the default to a region-locked inference-profile id the user's account can't invoke. Backwards mitigation.

This is the most serious edge case. The Bedrock provider expects **bare** ids and regionalizes at dispatch: `model_id_with_prefix` (`bedrock.rs:91-107`) adds `us.`/`eu.` based on `AWS_REGION`, and explicitly **skips if the id already has a dot-prefix**. The hardcoded list (`bedrock.rs:766-789`) deliberately ships bare `anthropic.claude-opus-4-6` so this works.

The snapshot's `amazon-bedrock` ids are the opposite — region/scope-prefixed, with duplicates per model:
```
us.anthropic.claude-opus-4-7   jp.anthropic.claude-opus-4-7   global.anthropic.claude-opus-4-7
eu.anthropic.claude-opus-4-7   anthropic.claude-opus-4-7      (all @ 2026-04-16)
```
`best_model_for_provider("amazon-bedrock")`: all 5 tie on pattern and date, fall to id-DESC → **`us.anthropic.claude-opus-4-7`** wins by lexical tiebreak. For a user in `eu-west-1`/`ap-*`, `model_id_with_prefix` sees the existing `us.` prefix, skips, and dispatches a `us.` inference profile to a non-US endpoint → failure. The one entry that *would* work (bare `anthropic.…`) is the one the tiebreak discards. The design's §3 mitigation ("if models.dev uses bare ids, add the `anthropic.` prefix in the request builder") is exactly inverted: models.dev uses *more*-prefixed ids, and the provider already prefixes; feeding it prefixed ids defeats the region logic. Plus the picker now shows ~5 duplicate "Opus 4.7" rows (85 bedrock entries vs. the curated 3).

Fix: before resolving/displaying Bedrock, **filter the catalog to the bare `^anthropic\.` (and `^amazon\.`/`^meta\.`) ids and drop the `us.|eu.|jp.|au.|global.` cross-region duplicates**, then let `model_id_with_prefix` regionalize. Add a real test that the resolved id has no dot-prefix. (Note: the existing `effective_model` default `anthropic.claude-sonnet-4-6-v1` at `lib.rs:1320` is bare and dispatchable — deleting it per item #8 without this filter is a net regression.)

## Hole 4 — codex: missing from the catalog, so the "catalog is the floor" model collapses; removing the codex pins picks a wrong default by lexical id.

Verified: the snapshot has **no `codex` or `openai-codex` key**. So codex has no catalog floor and discovery-derived `ModelInfo` carries no date (see Hole 6). The current code is already smarter than the design describes: `codex_provider_models` (`model_picker.rs:395`) derives codex models from the `openai` catalog filtered by `codex_model_allowed`, and `default_model_for_provider` pins `DEFAULT_CODEX_MODEL` (`model_picker.rs:357-362`). The design's "fold free/codex into `merge_discovered` seeding" cannot express this (catalog-key remap `codex→openai` + cost-zeroing + 400K context override). And §1c's "delete the `codex` exacts" from `flagship_patterns_for:1022` means codex ids tie on pattern and (dateless) tie on date, falling to id-DESC — so `gpt-5.2-codex-mini` would outrank `gpt-5.2-codex` lexically. codex needs its hardcoded `DEFAULT_CODEX_MODEL`, which also breaks guardrail G1 ("no model id hardcoded except `core::constants`") — `DEFAULT_CODEX_MODEL` lives in `core::codex_oauth`, so the grep gate either false-fails or must carve an exception (a hole in the guard).

## Hole 5 — copilot: catalog-as-floor over-shows models the user's subscription can't use; the design moves it the wrong direction.

The fallback the design cites as a "2-entry vec (claude-sonnet-4.6/4.5)" is actually an **11-model list** (`hardcoded_models`, `copilot.rs:455-471`, incl. `gpt-5.4`, `gemini-3-flash-preview`) using **dot-versioned** ids. Two problems:
- Id format: copilot dispatch uses dots (`claude-opus-4.6`), and the snapshot's `github-copilot` keys also use dots (`claude-opus-4.7`, `claude-sonnet-4.5`, plus oddballs like `claude-opus-41`). So format happens to line up — but the design never checks this and it's pure luck, not a guarantee.
- Entitlement scoping: Copilot's live `/models` is the *authoritative, restrictive* set (varies by subscription). The correct behavior is **replace** with what the endpoint returns. The design's universal "catalog is floor, discovery only adds, never removes" means a free-tier user is shown all 27 catalog copilot models and gets 403 on the ones they lack. The design's own comment acknowledges "OAuth-scoped endpoints" but its merge-only rule contradicts it. Copilot (and codex) need replace-semantics, not floor-semantics.

## Hole 6 — `ModelInfo` has no `release_date`, so the discovery fast-path cannot make a new model "latest," and guardrail G4 won't compile.

Verified `ModelInfo` (`provider.rs:22-36`) is `{id, provider_id, name, context_window, max_output_tokens}` — **no `release_date`, no `status`**. Consequences:
- `merge_discovered`/`from_dynamic` must synthesize `release_date = None`. Under the design's date-primary sort, dateless discovered models sort to the **bottom** (`rd_b.cmp(rd_a)` with `rd=""` loses to any dated entry). So the design's headline claim — "new ids the API reports before models.dev catches up get added automatically [and surface as latest]" — fails: they're added but buried. "Latest not showing" persists on the discovery path.
- G4's test literal `ModelInfo { id, release_date 2099-01-01 }` does not compile. The executable proof the design rests on doesn't typecheck against the real struct.

## Hole 7 — qwen/alibaba: three different ids for one provider; the catalog key never matches the runtime provider id, and the design has no alias normalization.

Verified id trinity:
- Catalog key: **`alibaba`** (snapshot has `alibaba`, not `qwen`/`dashscope`).
- Provider runtime id: **`qwen`** (`registry.rs:571` registers `qwen()` whose `.id()=="qwen"`; `ProviderRegistry::get` is a plain `HashMap` lookup, `registry.rs:316`, no alias map).
- UI select id: **`alibaba`** (`app.rs:284`); auth env `DASHSCOPE_API_KEY`.
- `Config::effective_model()` (`lib.rs:1301-1323`) has **no `qwen`/`alibaba` arm** → falls to `_ => DEFAULT_MODEL` (Claude).

So if `config.provider == "qwen"`, `models_for_provider_from_registry("qwen")` finds nothing under `"qwen"` and returns the single `"default"` placeholder, and `best_model_for_provider("qwen") = None` → `effective_model_for_config` falls through to a **Claude** default for a Qwen user. The design's invariant "the picker is a projection of the catalog by provider_id" silently breaks here. Worse, item #8 (delete the `effective_model` per-provider table, "force callers through the registry") removes the only place that could give a Qwen-ish fallback, so the sentinel resolves to the `core::constants` Claude floor — a regression. The whole `codex`/`openai-codex` aliasing (`is_codex_provider`, `model_picker.rs:380`) shows the codebase already needs an alias layer; the design adds none for `qwen↔alibaba`.

Fix: add a single canonicalization map (`qwen↔alibaba`, `codex↔openai-codex`, and the bedrock catalog-key situation) applied at every catalog read (`list_by_provider`, `best_model_for_provider`, `models_for_provider_from_registry`) so provider-runtime-id and catalog-key converge before lookup.

## Hole 8 — The guardrail tests are scoped to the easy providers and would pass while every edge case above stays broken.

G2 iterates `["anthropic","amazon-bedrock","openai","google"]`; G3 checks `[anthropic(), bedrock()]`. None cover `qwen/alibaba`, `codex/openai-codex`, `github-copilot`, or the bedrock region-duplicate/dispatchability problem — i.e. exactly the four edge cases in this lens. As written, the guardrails are green-by-construction on a broken build. G2 must include `github-copilot`, `codex`, `openai-codex`, `qwen`, `alibaba`; the bedrock case needs a dispatchable-id (no dot-prefix) assertion, not just "id ∈ catalog."

---

## Minimal corrected plan for this lens
1. Keep the merge-not-replace picker fix and skip-spawn for catalog providers. Sound.
2. **Do not** make `release_date` the primary sort key. Keep flagship-pattern primary, date as in-family tiebreaker. De-pin patterns to family level, and for OpenAI/Google make the flagship match role-based (exclude `mini|nano|flash-lite|codex|spark`) so "newest cheap model" never becomes the default.
3. Bedrock: filter catalog to bare `anthropic.`/`amazon.`/`meta.` ids, drop `us.|eu.|jp.|au.|global.` duplicates, let `model_id_with_prefix` regionalize; assert resolved id is dot-prefix-free.
4. Add a provider-id↔catalog-key canonicalization map (`qwen↔alibaba`, `codex↔openai-codex`) at every catalog read; keep `DEFAULT_CODEX_MODEL` and a Qwen fallback (don't delete the whole `effective_model` table — only the entries the registry can actually serve).
5. Use **replace** (not floor+merge) semantics for entitlement-scoped endpoints (copilot, codex) when the live endpoint succeeds; fall back to catalog only on failure.
6. Add `release_date` (+`status`) to `ModelInfo`, or make `from_dynamic` stamp discovered models with a "now"/high sort key, otherwise the discovery path can never surface a model as latest. Fix the G4 test to match the real struct, and extend G2/G3 to the four edge-case providers.

Relevant files (all absolute): `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/model_registry.rs` (`best_model_for_provider:733`, `flagship_patterns_for:977`, `effective_model_for_config:1080`), `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/provider.rs:22` (`ModelInfo` has no `release_date`), `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/providers/bedrock.rs:91` (`model_id_with_prefix`) and `:766` (hardcoded list), `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/providers/copilot.rs:455` (`hardcoded_models`, 11 dot-versioned ids), `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/providers/codex.rs:902`, `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/core/src/lib.rs:1297` (`effective_model`, no qwen/alibaba arm), `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/tui/src/model_picker.rs:270` (projection + `:395` codex catalog-derivation + `:347` default), `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/registry.rs:316/571` (qwen-only registration), `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/cli/src/main.rs:3365` (clobber). Snapshot: `/Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/assets/models-snapshot.json` (no `codex`/`qwen` keys; `alibaba` present; bedrock region-duplicated ids; `gemini-3.1-flash-lite` is the newest Google entry).