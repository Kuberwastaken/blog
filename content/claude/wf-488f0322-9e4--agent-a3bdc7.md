---
title: "wf-488f0322-9e4 · agent-a3bdc7"
---

Adversarially review this proposed model-surfacing design for claurst. Focus your critique on this lens: Provider-id and format edge cases (Bedrock id formats, codex, copilot, qwen/alibaba alias) and the specific recurring failure mode where a picker/provider call overwrites the catalog or a hardcoded default pins an old model — prove the design actually eliminates these.
Try hard to find where it would STILL break or regress given the real failure history (latest model not showing, defaults stuck on old model). Be concrete and skeptical; cite specifics. If the design is sound for your lens, say so explicitly; otherwise list the holes and the exact fix for each.

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