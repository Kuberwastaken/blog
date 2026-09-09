---
title: "wf-dd79fc93-d28 · agent-a27eaf"
---

You are reconciling what a Codex chat DECIDED/PLANNED for the Gemini enrichment pipeline against what is ACTUALLY in the code today, to produce a "where do we go from here" verdict for the user. The repo is at /Users/kuber.mehta/Projects/marketing-outbound (currently on main; recent commits already merged a "reliable Gemini enrichment pipeline" branch).

== CHAT EXTRACTION (the plan/diagnosis/decisions from the "fix gemini enrichment pipeline" chat) ==
{
  "problem_statement": "The user pasted a prior chat readout (a \"50-lead\" Gemini enrichment run) and asked how to fix the Gemini enrichment pipeline in the marketing-outbound project. The reported failure mode: the pipeline was promoting \"LLM found a plausible domain\" into \"this is the company's real site.\" The batch runner called enrich_lead_with_gemini, counted status == \"profiled\", and the dashboard read that as truth. Concretely, the local SQLite showed 50 of 55 Gemini rows with domain_confidence = 1.0 and 37 rows with nonzero score deltas, so \"confidence\" was meaningless as a gate and scores were being polluted by unverified domains. Known-bad examples included ANGAN RESTAURANT -> bikanervala.com and HOTEL SHAMBHU -> oslgroup.co.in.",
  "root_cause_diagnosis": "gtm_engine/gemini_enrichment.py (around line 961) trusted any incoming domain source BEFORE identity verification: it treated existing_domain as confidence 1.0, email-derived domains as 0.72, and Gemini-grounded domains as acceptable if Gemini reported >=0.7 grounding confidence; it then crawled, profiled, and rescaled/applied score deltas. The local DB confirmed the shape: 50/55 Gemini rows had domain_confidence=1.0, 39 were \"profiled\", 37 got score deltas, and 50 rows said \"existing_domain\" — so the bug was broader than \"Gemini hallucinated a domain\": ANY domain source (existing domain, email-derived domain, SearXNG result, Gemini grounding citation) was treated as identity-verified and immediately profiled and scored. Meanwhile gtm_engine/enrichment.py (the older SearXNG lane, around line 533) already had candidate/evidence machinery that scored identity anchors (legal-name tokens, CIN/GSTIN, city/state, domain tokens, directory/social penalties), and scripts/scrape_site_meta.py (around line 129) already had parked/health detection — but gemini_enrichment.py bypassed all of it. The \"confidence\" number could not be used as a gate, and the existing batch data had to be treated as suspect until reverified. Score pollution came from full score RECOMPUTATION, not a simple additive delta, so it could not be cleanly subtracted.",
  "proposed_fix": "Don't patch with a tiny \"name appears on page\" check — INVERT the pipeline. (1) Add a domain verification stage BEFORE profiling; candidate sources (existing domain, email domain, SearXNG result, Gemini grounding citation) are all candidates, none are truth yet. (2) Reuse the SearXNG evidence lane in enrichment.py to retrieve and score candidates by legal-name tokens, CIN/GSTIN, city/state, domain tokens, with directory/social penalties. (3) Fetch homepage/about/contact and reject dead, 4xx/5xx, parked, directory, and parent/group pages before Gemini ever sees them (reuse parked/health logic from scrape_site_meta.py). (4) Use Gemini ONLY as a judge on shortlisted evidence — \"Is this the official site of this exact legal entity, not a parent, directory, or namesake?\" — outputting verified, candidate_unverified, parent_or_group, namesake, dead_or_parked, or no_domain. (5) Only when status == verified run profile/classification and call update_lead_scores — no verified identity, no score bump. (6) Quarantine the current batch: do NOT subtract score_delta; recompute scores from canonical lead data plus verified enrichment only. Net flow: SearXNG-first candidate retrieval -> deterministic verifier -> Gemini-as-judge -> profile/score only after verification. \"Fewer wins, but the wins become real.\" A later hardening principle from the user drove a second phase: \"wrong scrapes are much worse than less right scrapes\" — so borderline evidence must default to review, not to a scored/profiled row.",
  "pipeline_contract_changes": [
    "enrich_lead_with_gemini: 'profiled' status can ONLY occur after verification.status == verified; everything else is a candidate/reject state and does NOT touch lead scores",
    "New schema fields/columns added to lead_gemini_enrichment for verified-vs-candidate distinction: candidate_domain (unverified domains stored here, NOT official_domain), official_domain only set when verified, plus verification_status, verification_confidence, crawl_status, and raw verification JSON (candidate list + rejected reasons + judge/deterministic evidence)",
    "New statuses introduced: verified_domain/profiled, candidate_unverified, parent_or_group, namesake, dead_or_parked (phase 1)",
    "Phase-2 statuses: needs_manual_review added; vague dead_or_parked split into parked, crawl_blocked, and site_unreachable",
    "Dashboard/API contract: 'verified domains' means verification_status='verified' ONLY; legacy rows with official_domain but no verification_status=verified are called out as 'legacy rows needing reverify' and counted as verified_domains: 0",
    "resolve_verification gate: auto-profile requires deterministic verification AND verification_confidence >= 0.88; Gemini judge can downgrade or send to needs_manual_review but can NOT rescue weak deterministic evidence into auto-verification",
    "Distinctive-anchor rule: a high score is not enough unless matched name evidence contains a non-category token from the company name; generic tokens (logistics/freight/shipping/cargo/clearing/forwarding) can support evidence but cannot be the identity anchor; registry/GSTIN/CIN or exact email match can still verify",
    "Review-row crawl metadata must point at the candidate actually being sent to human review, not the first candidate",
    "score application kept explicit via --apply-scores flag (default off) so cleanup decisions are never implicit",
    "Batch runner gains SQLite busy-timeout, deterministic random ordering, and modulo shard args for safe parallel chunked runs"
  ],
  "implementation_steps": [
    {
      "step": "branch",
      "description": "main was 4 commits ahead of origin; branched codex/reliable-gemini-enrichment from current state to isolate the work"
    },
    {
      "step": "5a0e0b4 feat(gemini): verify domains before profiling",
      "description": "Core verify-first rewrite of gemini_enrichment.py: candidate/result dataclasses, deterministic identity helpers, schema fields for verified vs candidate domains, SQLite migrations for new columns, crawl-quality guard incl. parked/for-sale detection, gated enrichment flow (profiled only if verified), writer stores unverified as candidate_domain; dashboard/API list+detail+export wiring, new filter states, status-tone map, raw verification JSON in detail view; focused tests for parked domains, namesake/wrong-page, and verified-only-profiled rule (tests pass)"
    },
    {
      "step": "20d2774 feat(gemini): add enrichment reverify audit",
      "description": "Added scripts/reverify_gemini_enrichment.py to re-run suspect Gemini rows through the new verifier and report verified vs rejected buckets; fixed a migration-order bug (indexes were created on new columns before migrations added them) by moving indexes into the migration path; dry-run upgraded local SQLite schema in place"
    },
    {
      "step": "c31ef08 fix(workbench): report only verified Gemini domains",
      "description": "Dashboard count corrected so verified means verification_status='verified'; legacy official_domain rows flagged as needing reverify (verified_domains shows 0 until reverify)"
    },
    {
      "step": "f3023a0 fix(gemini): require conservative domain verification",
      "description": "Phase-2 hardening after user's 'wrong scrapes worse than less-right' note: resolve_verification made asymmetric — judge can downgrade/flag/send to needs_manual_review but cannot bless weak evidence; auto-profile requires verification_confidence >= 0.88; SATLOG-style ~0.746 evidence now becomes needs_manual_review; unreachable verified candidates carry real crawl class"
    },
    {
      "step": "e9b71ea feat(workbench): surface Gemini review states",
      "description": "API/dashboard filters + labels + dropdown options for needs_manual_review, crawl_blocked, site_unreachable, parked; kept legacy dead_or_parked visible"
    },
    {
      "step": "86ef442 fix(gemini): keep review crawl metadata aligned",
      "description": "Fix: when the best rejected/review candidate was not the first candidate, the row-level crawl_status could show the first candidate's result; now follows the review candidate. Added regression test (typo existing domain first, better corporate-email candidate second)"
    },
    {
      "step": "ebfeb3a fix(workbench): refresh Gemini status option cache",
      "description": "Bumped meta payload + browser session cache keys so /api/meta exposes new gemini_status options instead of the stale cached list"
    },
    {
      "step": "verifier correction (generic-token / distinctive-anchor rule) committed",
      "description": "Triggered by the 250-run finding TEAMWORLD LOGISTICS -> teamglobal.in auto-profiled on phone/city/corporate-email + generic 'logistics' token. New rule: high score insufficient without a distinctive non-category name token; generic logistics/freight/shipping/cargo/clearing/forwarding tokens demoted from identity anchor. Added Teamworld/Teamglobal regression test. (committed before rerun; explicit hash not stated in transcript)"
    },
    {
      "step": "fb7e409 fix(gemini): wait on parallel batch writes",
      "description": "SQLite busy-timeout on the batch script so parallel shard chunks wait instead of failing on transient DB lock"
    },
    {
      "step": "b0c8b9a fix(gemini): cap contact extraction scan text",
      "description": "Fixed a perf stall where a huge page hung EMAIL_RE.findall(text) during contact extraction; capped contact-scan text (200 KB) before regex"
    },
    {
      "step": "98fbc32 Merge reliable Gemini enrichment pipeline",
      "description": "Merged codex/reliable-gemini-enrichment into main with a merge commit (main was 4 ahead of origin, became 13 ahead after merge), tests 8 passed + py_compile, pushed main to origin"
    },
    {
      "step": "7bd0ea2 docs: add Gemini enrichment reliability diagram",
      "description": "Created docs/gemini_enrichment_pipeline_reliability.excalidraw (79 editable elements): before/after pipeline, 0.88 gate, distinctive anchors, review/reject/retry, 250-row audit + relevance stats, known-bad cases, false positives"
    },
    {
      "step": "edc9b15 docs: enlarge Gemini reliability diagram text",
      "description": "Replaced Virgil handwritten font with Excalidraw sans, smallest text bumped to 18px, title 41px, scaled up ~20%"
    },
    {
      "step": "0e5b5e8 docs: clarify bounded crawl in reliability diagram",
      "description": "Updated diagram to show crawl is a bounded local Python requests fetcher (not Gemini), Gemini grounding is fallback discovery only, judge is evidence-only; added concrete bounds (max 6 candidates, max 8 pages/site, same-host HTML/text, caps, timeouts)"
    },
    {
      "step": "fbdb763 (VPS sharding/merge orchestration helpers)",
      "description": "Added deterministic random ordering + modulo shard args to the runner, a helper to build a compact randomized sampled SQLite (since prod DB is 7.5 GB / 1.5M rows), and a merge helper to upsert lead_gemini_enrichment result rows back into the local dashboard DB while remapping gemini_runs ids"
    }
  ],
  "audit_results": "FIRST 25-ROW REVERIFY (run id 1, scores off): 15 verified+profiled, 4 candidate_unverified, 6 dead_or_parked, 0 failures, 0 rescored (60% verified / 16% unverified / 24% dead-parked). Spot checks matched pipeline: Linkers->linkerscargo.in clean; SATLOG->satlogsolutions.com accepted at 0.746 (flagged worth human glance); Premier Shipping->y2klogistics.com correctly held (site brand is Y2K); Safetrans->safetransfreight.com held ('Coming Soon'); S.D. Pathak->spd.in correctly parked. Caveat: 23 legacy profiled rows still unreverified (incl. known-bad ANGAN->bikanervala, HOTEL SHAMBHU->oslgroup); 0 competitor-PG hits, max PG intent only 26 (cleanup, not a hot list). SECOND 25-ROW REVERIFY after 0.88 gate (scores off): profiled 11, needs_manual_review 4, candidate_unverified 3, site_unreachable 5, crawl_blocked 1, parked 1; SATLOG now correctly needs_manual_review at 0.746; no profiled row below 0.88; hardening tests 7/7. 250-ROW AUDIT (run IDs 6-13, 5x50 parallel + leftover mini-chunks 11-13, scores off, 250 distinct leads, no duplication): profiled 133, needs_manual_review 56, candidate_unverified 21, parent_or_group 7, site_unreachable 27, crawl_blocked 5, parked 1; profiled below 0.88 = 0. Known-bad held correctly: ANGAN->bikanervala = candidate_unverified, HOTEL SHAMBHU->oslgroup = candidate_unverified, RESTAURANT CHEF PILLAI->panachamoottil.com = parent_or_group, H V Freight->continentalgroup.com = parent_or_group, TEAMWORLD->teamglobal.in = needs_manual_review. ROW-BY-ROW RELEVANCE REVIEW (/tmp/gemini_250_relevance_review.csv): relevant 131 (use now), likely_relevant_review 55 (human approve before scoring), not_relevant 32 (wrong/parent/generic/parked/too weak), unknown_retry_crawl 32 (blocked/unreachable). Two profiled FALSE POSITIVES caught by manual review despite passing the gate: LILAVATI HOSPITAL CAFETARIA->lilavatihospital.com (scraped the hospital, not the cafeteria) and Sea Air Cargo Express->ggfreight.com (site is Gavaksha Global Freight). VPS 2,250 RANDOMIZED RUN (9 shards x 250, scores off) was IN PROGRESS at transcript end: last meaningful poll 637/2,250 with 18 profiled, 48 review, 53 unverified, 0 failures, majority no_domain (broad random sample = low yield as expected).",
  "decisions_made": [
    "Invert the pipeline (verify-first) rather than add a loose 'name on page' check",
    "Reuse existing SearXNG evidence-scoring lane and scrape_site_meta parked/health logic instead of writing a second verifier",
    "Keep the Gemini storage/dashboard contract stable enough that the dashboard need not be rebuilt",
    "Work on isolated branch codex/reliable-gemini-enrichment; small sequential commits",
    "Treat existing 55 legacy Gemini rows as suspect; provide reverify script rather than auto-mutating; keep --apply-scores explicit and default OFF",
    "Quarantine batch: recompute scores from verified data, do NOT subtract score_delta",
    "Adopt user's principle: wrong scrapes are worse than fewer right scrapes -> default borderline to needs_manual_review",
    "Set auto-profile gate at verification_confidence >= 0.88 with a manual-review band below it",
    "Generic logistics/freight tokens cannot serve as the identity anchor; require a distinctive name token",
    "When user said merge to main: stopped in-flight batch, merged branch into main, pushed to origin (then user reversed course and asked to keep running 250)",
    "Parallelize 250 audit as 5 disjoint chunks of 50 with explicit l.id IN(...) guards + SQLite busy timeout to avoid duplicate cohort selection and write-lock races",
    "For VPS: do NOT ship the 7.5 GB / 1.5M-row prod DB; build a compact randomized sampled DB (~11 MB), run on VPS via plain ssh ai-vps (claudevps/codexvps are just tmux launchers), copy git-ignored Vertex credentials over SSH, deploy from committed git tree (not 17 GB rsync), merge only result rows back",
    "Keep GitHub as source of truth for code/manifests only; batch/result DBs stay as transfer artifacts unless Git LFS/object storage added",
    "Separate 'pipeline performance' from 'market/domain coverage' when analyzing the broad random batch"
  ],
  "open_questions_or_todos": [
    "Reverify ALL remaining legacy profiled rows before trusting dashboard aggregate Gemini scores (23 left after first batch; only 55 legacy rows total eligible for reverify)",
    "No score cleanup has happened yet — DB still contains old score deltas from legacy rows; recompute scores from verified rows only AFTER human review, and only then use --apply-scores",
    "Work the needs_manual_review queue (55-56 rows) before scoring; likely_relevant_review (55) is the human approval queue",
    "Retry/browser-check the unknown_retry_crawl bucket (32) and crawl_blocked/site_unreachable rows — possibly add a Playwright/browser fallback for 403/406/503 before rejecting",
    "Two profiled false positives slipped the 0.88 gate (Lilavati Hospital Cafeteria, Sea Air Cargo Express->ggfreight) — alias/sub-entity and wrong-brand cases may need another verifier rule",
    "VPS 2,250-row randomized run was still in progress at transcript end (637/2,250) — needs completion, result DB copy-back, merge into local dashboard via merge helper + cache invalidation, then analysis as a ~2.5k randomized validation",
    "Run 4 was marked interrupted (84 rows, SSL retry); run 5 marked interrupted (56 rows) when merge happened; run 6 marked partial when stuck on contact-extraction stall",
    "Push fbdb763 VPS orchestration code to GitHub once the run proves out",
    "Batch quality note: high-priority cohort is logistics/freight heavy with 0 competitor-PG hits and low PG intent — useful as reliability validation but not yet a hot Razorpay sales list"
  ],
  "final_state": "Work landed on main: codex/reliable-gemini-enrichment was merged via merge commit 98fbc32 'Merge reliable Gemini enrichment pipeline' and pushed to origin (main went from 4 to 13 commits ahead, then synced). Subsequent commits (parallel-write timeout fb7e409, contact-scan cap b0c8b9a, the four docs/excalidraw commits 7bd0ea2/edc9b15/0e5b5e8, and VPS orchestration fbdb763) were committed and pushed on main. On main before push: pytest tests/test_gemini_enrichment_verification.py -q = 8 passed, py_compile passed. Local dashboard workbench running at http://127.0.0.1:8765 (restarted several times to pick up new code/Vertex creds). docs/gemini_enrichment_pipeline_reliability.excalidraw added and refined (sans font, 18px min, bounded-crawl callout). Row-level relevance review written to /tmp/gemini_250_relevance_review.csv (131 relevant / 55 review / 32 not-relevant / 32 retry). The transcript ENDS mid-task with the VPS 2,250-row randomized batch (9 tmux shards on ai-vps, scores off) still running — last polled at 637/2,250 rows, 0 failures, all shards alive — captured transcript truncated there ('… (truncated; raise max_chars to see more)'). The last assistant message was a routine progress-poll note, so the run had not yet been copied back or merged into the dashboard.",
  "key_quotes": [
    "My opinion: don’t patch this with a tiny “name appears on page” check. The better fix is to invert the pipeline.",
    "Right now gemini_enrichment.py treats existing_domain as 1.0, email-derived domains as 0.72, and Gemini-grounded domains as acceptable if Gemini says >=0.7; then it crawls, profiles, and rescales. The local DB confirms the problem: 50/55 Gemini rows have domain_confidence = 1.0, 39 are profiled, and 37 got score deltas.",
    "So yes: SearXNG-first candidate retrieval, deterministic verifier, Gemini-as-judge, then profile/score only after verification. That gives us fewer “wins,” but the wins become real.",
    "Quarantine the current batch. Don’t subtract score_delta; recompute scores from canonical lead data plus verified enrichment only. The current score pollution came from full score recomputation, not a simple additive delta.",
    "see *wrong* scrapes is much worse than less right scrapes if that makes sense, we need this reinforced in our pipeline",
    "I’m with you: a wrong scrape is poison, a missing scrape is just work left to do.",
    "Auto-profile now requires verification_confidence >= 0.88. Borderline-but-plausible domains now become needs_manual_review, not profiled. Gemini can downgrade or flag doubt, but it can no longer rescue weak deterministic evidence into auto-verification.",
    "The new rule is: high score is not enough unless the matched name evidence contains a non-category token from the company name. Registry/GSTIN/CIN or exact email matches can still verify; phone/city/category alone now falls to manual review.",
    "A useful red flag already appeared in the low-confidence profiled sample: TEAMWORLD LOGISTICS PVT. LTD got profiled on teamglobal.in with only logistics/phone/city/corporate-email style evidence.",
    "Two profiled rows are genuinely not relevant despite passing the gate: Lilavati Hospital Cafeteria scraped the hospital, and Sea Air Cargo Express scraped Gavaksha Global Freight.",
    "250 distinct leads processed. Scores were not applied. profiled below 0.88 verification confidence: 0.",
    "The crawl is not Gemini. It is our local Python crawler... Max 6 domain candidates per lead; Max 8 pages per domain; Only same-host links; Per-page response text capped at 900 KB; Combined profile text capped at 12 KB; Contact extraction scans max 200 KB; Gemini judge receives only 5 KB of page text; timeout 5s connect / 18s read.",
    "The prompt explicitly says: Use only the supplied evidence. Do not search. Do not reward a parent/group site, directory, same-name business, marketplace listing, parked domain, or generic page.",
    "The local production SQLite is 7.5 GB, so I’m not going to ship the whole dashboard DB. Better path: create a compact randomized batch database with only the sampled leads, run that on VPS, then merge just the enrichment result rows back into the local dashboard DB.",
    "just merge the reliable branch with main, no need to seperate and commit to origin please, easier to keep track"
  ]
}

== PRECURSOR CONTEXT ==
Here is the concise context summary.

---

**Precursor codex session 019f0278 (2026-06-29, marketing-outbound) — Gemini enrichment design context**

This session is **both pipeline design and UI work, not purely UI** — and the pipeline half is the load-bearing part for judging any later fix. It began by auditing what Gemini capability already existed (older, Postgres-targeted scripts: `scripts/enrich_domains_gemini.py` = gemini-2.5-flash + Google-Search-grounded domain discovery; `scripts/scrape_site_meta.py` = deterministic site crawl → `lead_site_meta` with payment gateways/competitor-PG/platform/contacts/socials/site-quality/PG-propensity; `scripts/enrich_mcc_gemini.py` = Gemini classification of site text → products/summary/vertical/sells-online/MCC/confidence; `src/outbound_scrapers/gates/profile_site.py` = LLM structured company profile + identity match; `scripts/gemini_budget.py` = token-spend tracking with a hard INR cap). The key finding: **none of it was wired into the new CSV/SQLite GTM workbench** — the workbench only did Razorpay aggregate scoring + SearXNG + shallow crawl + payment detection, and Gemini output never fed `rzp_outcome_score`. The user then asked to "fully wire up the gemini workflow ... for everything along w/ batching," so the agent built a **new SQLite-native module `gtm_engine/gemini_enrichment.py`** (deliberately rewriting rather than bending the old Postgres scripts), persisting into a `lead_gemini_enrichment` table with a run ledger + provenance, `/api/gemini/*` status+run endpoints, a CLI batch runner `scripts/run_gemini_gtm_enrichment.py`, and full UI surfacing. A safety invariant was baked in: **Gemini calls only fire via explicit run endpoints or CLI — nothing spends on import/startup; UI cohort runs are capped; dry-runs work without a key.**

The single most important design conclusion (from the user's pasted analysis at 08:08, judged "the single highest-leverage code task") was the **rescore-after-enrichment loop**: *"Without rescore, every discovered website/signal is thrown away — the score never moves."* The agent then wired rescoring so crawl evidence rewrites the lead score immediately (PayU/Cashfree/cart/subscription → payment-signal points → can promote to "Sell now"; Razorpay-on-site → suppressed as existing customer). **Crucially, Gemini was never run with a real key in this session (`GEMINI_API_KEY` unset)** — everything was verified only via compile/syntax checks, dry-runs, smoke tests, and one no-key SearXNG crawl batch (25 processed / 21 accepted / 15 payment hits). So the live Gemini path and the Gemini-signal rescore specifically were left **unproven end-to-end**, which is exactly the gap the later 06-30 "fix gemini enrichment pipeline" session would have to close.

Points that matter for judging the later fix:
- **Architecture:** SQLite-native `gtm_engine/gemini_enrichment.py` is the new home; old `scripts/enrich_domains_gemini.py` / `scrape_site_meta.py` / `enrich_mcc_gemini.py` / `profile_site.py` are conceptual ancestors, not the wired path. Budget cap lives in `scripts/gemini_budget.py`.
- **Signal precedence (deliberate):** payment-signal filters read Gemini-derived signals first, then SearXNG/crawl, then original CSV — so enriched data shows immediately.
- **Rescore loop is the linchpin** and was committed (`0cd7c0a` "Rescore leads after website enrichment evidence"), but only the SearXNG/crawl rescore was actually exercised; the Gemini-signal rescore was not run live.
- **Performance pitfalls already hit & patched:** default dashboard stats originally did joined full-table scans for Gemini facets (metadata ~13.5s / stats ~42.8s cold) → fixed to read the small `lead_gemini_enrichment` table / union aggregates; a cache bug where a *rejected* (no-key) Gemini POST nuked the heavy stats cache → fixed to invalidate only after a successful run; also fixed a SQLite-`Row.get()` bug and a direct-script import-fallback bug in `serve_gtm_app.py`.
- **UI delivered:** Gemini filter section under Enrichment, Gemini-score sorts, run panel beside SearXNG, facet tabs (status/platform/inferred vertical/category), PG-intent + site-quality filters, KPIs separating SearXNG evidence from Gemini profiling, inline row badges (discovered domain / PG intent / competitor PG / Razorpay-on-site), lead-detail Gemini block + per-lead "Run Gemini," and a "Needs domain discovery" queue preset.
- **Operational scale & queues:** 1.56M-lead SQLite universe; ~24.9k known domains vs ~1.536M missing; strategy queues added (known-domain crawl ≈15.6k remaining, high-priority no-domain ≈400k, low-fit registry drag ≈501k, competitor-PG, immediate-clean) via `/api/strategy` + dashboard cards; Gemini CLI presets `known-domain-profile` and `high-priority-no-domain` (skip low-fit manufacturing/construction). Spend estimate filed for the API request: ~\$500–\$2,500/mo pilot, \$4K–\$15K/mo at 400k scale.
- **End state:** wired but unrun; left ready for "when the key lands." Sequential commits: `fa4eacc` (backend), `8faf56a` (import fix), `d740e5c`/`18abab3`/`63dc0a3`/`9c8c7a1` (dashboard/cache/status), `0cd7c0a` (rescore), `e4038d9` (known-domain crawler), `87e7a92` (strategy API), `bf2d323` (strategy UI), `7952102` (Gemini presets). Only `graphify-out/` left dirty.

Source transcript extracted to `/tmp/precursor_full.txt` (Gemini section lines 6332–7596).

== CURRENT CORE CODE MAP ==
{
  "entry_points": [
    "scripts/run_gemini_gtm_enrichment.py — main batch CLI for Gemini enrichment; build_where/order_clause/select_rows pick leads, inserts a row into gemini_runs, loops calling enrich_lead_with_gemini(conn,row,run_id,client,mode,...) per lead (run_gemini_gtm_enrichment.py:225-282). Flags: --mode {full,domain,profile} (default full), --no-searxng, --no-grounding-discovery, --max-search-queries, --no-apply-scores, --limit, presets (apply_preset L143).",
    "scripts/run_gemini_batch.py — alternate batch driver also calling enrich_lead_with_gemini (run_gemini_batch.py:90).",
    "scripts/merge_gemini_batch_db.py — merges gemini_runs / lead_gemini_enrichment from shard DBs (no enrichment logic).",
    "gtm_engine/serve_gtm_app.py — web server batch endpoints: SearXNG flow via enrich_lead (serve_gtm_app.py:1655) and Gemini flow via enrich_lead_with_gemini (serve_gtm_app.py:1771), wrapped in gemini_runs insert/update (1743/1810/1821).",
    "gtm_engine/gemini_enrichment.py::enrich_lead_with_gemini — the per-lead Gemini orchestrator (L1596).",
    "gtm_engine/enrichment.py — standalone SearXNG-only CLI: subcommands ensure-schema, health, preview <lead_id>, run-one <lead_id> (main L1056-1076) calling enrich_lead (L746). DEFAULT_DB = explorer/gtm_engine.sqlite (L27).",
    "scripts/run_known_domain_crawl.py:156 — calls enrichment.enrich_lead for the 'Known website crawl' route."
  ],
  "pipeline_flow": "There are TWO distinct pipelines.\n\nA) GEMINI pipeline (gemini_enrichment.py::enrich_lead_with_gemini, L1596):\n1. ensure_gemini_schema; normalize mode to one of {full,domain,profile} (L1608-1610).\n2. Suppression gate: if lead.dnc OR existing_rzp OR inactive_or_risky -> status 'skipped', write row, return (L1613-1620).\n3. Candidate discovery: discover_domain_candidates (L1623). In profile mode, SearXNG + grounding are disabled (L1626-1627). Candidate sources in priority order: existing_domain (score 65, from leads.domain), corporate_email (68, non-free email domains from contacts JSON), searxng (only if NO existing domain; build_queries -> SearXNGClient.search -> score_result, keep only category=='candidate', no rejected_reason, score>=40), gemini_grounding (only if grounding on AND client configured AND no existing domain AND no searxng/corporate candidate; grounded Gemini call). Candidates de-duped by root_domain via dedupe_candidates (L690) and sorted, existing_domain first.\n4. Verification: verify_domain_candidates (L1630, run_judge=client.configured). Iterates first 6 candidates: crawl_site() each (L1047), score_identity_verification() deterministic (L1048), optional Gemini judge if site live AND run_judge AND det confidence<0.9 (L1050), resolve_verification() merges (L1052). First candidate reaching status=='verified' AND confidence>=AUTO_VERIFY_CONFIDENCE(0.88) returns immediately as verified (L1063). Otherwise the highest-confidence rejected verification is returned (L1077-1100).\n5. If not verification.verified (L1656): write status = verification.status (candidate_unverified / needs_manual_review / parent_or_group / namesake / parked / dead_or_parked / crawl_blocked / site_unreachable / directory / no_domain), official_domain='' but candidate_domain kept; NO profiling. Return (L1669-1670).\n6. If verified but crawl features became not-live: recompute crawl_failure_status, official_domain wiped to '', status set to the failure status (L1672-1689).\n7. mode=='domain': return status 'verified_domain', no profiling/scoring (L1691-1703).\n8. mode full/profile and verified+live: call Gemini classify_prompt (L1705) ONLY if client.configured — this is the profiling/classification LLM call. Merge LLM socials into crawled socials (L1707-1710). Compute payment_signals_from_features and score_delta (L1711-1713).\n9. If apply_scores: update_lead_scores -> rzp_quality.score_lead recalibration writes leads table (L1715-1716, L1484-1593).\n10. status='profiled'; write_gemini_result persists the lead_gemini_enrichment row; if a new domain found and lead had none, also UPDATE leads.domain/has_domain (L1851-1852).\n\nB) SearXNG-only pipeline (enrichment.py::enrich_lead, L746) — older, no Gemini:\n1. route = enrichment_route(row) (L368). 2. 'Do not enrich' -> status 'suppressed'. 3. 'Known website crawl' with domain -> crawl_payment_evidence (fetch one page, extract_payment_signals), status 'accepted' if crawl ok (confidence 80) else 'failed' (L774-829). 4. Otherwise build_queries -> SearXNGClient.search -> score_result per result, store in enrichment_evidence, choose_decision (L596) -> status accepted/review/searched/failed; then crawl_payment_evidence on best_url; if payment signals found and status was 'searched' it is bumped to 'review' (L869-872). 5. score_lead_after_enrichment rescoring writes leads table (L671).",
  "verification_logic": "Verification is a two-stage deterministic-then-LLM-judge merge, gated by confidence thresholds.\n\nDETERMINISTIC: score_identity_verification (L804-918). Immediate rejects: domain_blocked (DIRECTORY_DOMAINS / social / generic) -> status 'directory' conf 0 (L809-810); not is_live -> crawl_failure_status mapping (L811-814). Otherwise builds a 0-100 score from anchors over crawled title/meta/page_text/combined_text/h1s: page_name_tokens (min 42, 12/token), domain_tokens (min 36, 18/token), cin_match (+70), gstin_match (+75), email_match vs lead contacts (+55), phone_match (+45), city/district/state +8 / pincode +12, plus source bonus (existing_domain +10, corporate_email +18, searxng up to +12, grounding up to +8) and small quality bonus. confidence = min(0.99, score/100) (L900). Auto-verify requires can_auto_verify (registry OR email identifier, OR distinctive_name_anchor with phone/enough-name+anchor) AND confidence>=0.72 -> status 'verified', else 'candidate_unverified' (L901-904). distinctive_name_anchor excludes GENERIC_IDENTITY_TOKENS (logistics/shipping/etc., L155-181) so generic-name matches do not auto-verify (test L148-186). 'group/holdings' host tokens with page tokens downgrade to 'parent_or_group' (L907-908).\n\nJUDGE: judge_domain_identity (L963) runs only if site live, run_judge, det conf<0.9. Gemini returns status in {verified, candidate_unverified, parent_or_group, namesake, needs_manual_review, parked, crawl_blocked, site_unreachable}; unknown statuses coerced to candidate_unverified (L977-978); confidence clamped 0-1.\n\nMERGE: resolve_verification (L989-1024). Order: det terminal statuses (dead_or_parked/parked/crawl_blocked/site_unreachable/directory) win outright (L1001). Negative judge statuses (parent_or_group/namesake/dead_or_parked/parked/site_unreachable) with judge_conf>=0.62 override (L1003). judge 'crawl_blocked'>=0.62 (L1005). judge 'needs_manual_review'>=0.62 -> needs_manual_review (L1007). If det 'verified' and judge agrees/empty/failed -> blended confidence then positive_verification_status gate (L1010-1013): >=0.88 verified, >=0.70 needs_manual_review, else candidate_unverified. If judge says verified>=0.70 but det not verified and det>=0.55 -> blended; needs_manual_review or candidate_unverified, never auto-verified (L1014-1017) — this is why a borderline judge 'verified' goes to manual review (test L133-145, L217-268). Else parent_or_group passthrough, or confidence>=0.70 -> needs_manual_review, else candidate_unverified (L1018-1024).\n\nACCEPTANCE: verify_domain_candidates only returns verified if status=='verified' AND confidence>=AUTO_VERIFY_CONFIDENCE(0.88) (L1063); DomainVerification.verified property requires status in {'verified'} and a candidate (L388-390). official_domain is set ONLY when verification.verified (L1639); everything else keeps candidate_domain but official_domain='' and is NOT profiled (tests confirm L189-268).",
  "state_fields": [
    "lead_gemini_enrichment.status — primary per-lead outcome: skipped, candidate_unverified, needs_manual_review, parent_or_group, namesake, dead_or_parked, parked, crawl_blocked, site_unreachable, directory, no_domain, verified_domain (mode=domain), profiled, failed (gemini_enrichment.py result dicts + record_failure)",
    "lead_gemini_enrichment.verification_status — verified | candidate_unverified | needs_manual_review | parent_or_group | namesake | parked | dead_or_parked | crawl_blocked | site_unreachable | directory | no_domain | judge_failed (set from domain_payload, write_gemini_result L1759)",
    "lead_gemini_enrichment.mode — full | domain | profile (L1610)",
    "lead_gemini_enrichment.crawl_status — ok | ok_insecure | parked | no_domain | http_<code> | non_html:<ct> | timeout | ssl | fetch_failed | <ExceptionName> (fetch_url L1195-1225, crawl_site L1332)",
    "lead_gemini_enrichment fields: official_domain, candidate_domain, domain_source, domain_confidence, domain_evidence, verification_confidence, verification_evidence, verification_json, is_directory, crawl_url, fetched_pages, profile_quality_score, pg_propensity_score, score_delta, inferred_vertical, inferred_category, business_summary, products, payment_signals, payment_gateways, platform, has_razorpay, has_competitor_pg, has_cart, has_checkout, has_payment_link, has_subscription, emails, phones, whatsapp_numbers, socials, people, profile_json, raw_json, decision, run_id, attempts (schema L309-353)",
    "gemini_runs.status — running | complete | failed; columns processed/domain_found/profiled/rescored/failed/grounded (schema L291-307)",
    "lead_enrichment.status (SearXNG pipeline) — suppressed | accepted | review | searched | failed (choose_decision L596-611, enrich_lead)",
    "lead_enrichment.route — Do not enrich | Known website crawl | Registry + SearXNG | Email-domain inference | Name + geo SearXNG | Manual/browser review (enrichment_route L368-384)",
    "enrichment_runs.status — running | complete | failed; columns accepted/searched/review/failed",
    "DomainVerification.status extra value 'no_domain' when no candidates (L1037); DomainCandidate.source — existing_domain | corporate_email | searxng | gemini_grounding | name_guess (priority map L691-697)"
  ],
  "gemini_role": "Gemini is used in three narrowly-scoped roles, all optional and skipped if the client is not configured: (1) GROUNDED DOMAIN DISCOVERY (discover_domain_prompt, grounded=True with google_search/googleSearch tool) — a LAST-RESORT candidate source, invoked only when there is no existing domain AND no SearXNG/corporate-email candidate already (gemini_enrichment.py:784-799); returns {domain, confidence, is_directory, evidence, sources}. (2) IDENTITY JUDGE (judge_domain_prompt, grounded=False, JSON mode) — per live candidate, only if run_judge and deterministic confidence<0.9; it judges whether the crawled site is the official site of the exact business using ONLY supplied evidence (no search), returning status/confidence/reason/matched_evidence/concerns (L921-986, called L1050-1051). Its verdict can downgrade or push to manual review but a judge-only 'verified' can NEVER auto-verify a deterministically-unverified domain (resolve_verification L1014-1017). (3) BUSINESS PROFILING/CLASSIFICATION (classify_prompt, grounded=False, JSON mode) — runs only AFTER a domain is verified, on the crawled evidence, to produce business_summary, products, inferred_vertical/category, customer_type, sells_online, payment_use_cases, people, socials, confidences (L1131-1192, called L1705). Model default gemini-2.5-flash; temperature 0, thinkingBudget 0; backend auto-selects Vertex (service-account) vs public API (L82-101, L403-419).",
  "searxng_role": "SearXNG/deterministic search is the PRIMARY, preferred candidate-domain source and runs before any Gemini grounding. In the Gemini pipeline, discover_domain_candidates calls SearXNG only when the lead has no existing domain (L759); build_queries (enrichment.py:429) builds up to max_search_queries (default 4) name/geo/CIN/GSTIN queries, SearXNGClient.search hits a local instance (default http://localhost:8888/search, L26), and score_result (enrichment.py:501-593) deterministically scores each result by identity anchors (name tokens, domain tokens, CIN/GSTIN/city/state, payment-intent language) and classifies the host as candidate/directory/social/generic. Only results with category=='candidate', no rejected_reason, and score>=40 become candidates (gemini_enrichment.py:768). DIRECTORY/SOCIAL/GENERIC domains are penalized heavily (-45/-18/-55) and dropped. SearXNG presence is what suppresses the grounded-Gemini fallback (has_retrieved_candidate gate, L783-784). In the standalone enrichment.py pipeline SearXNG is the whole engine: search -> score_result -> choose_decision -> crawl best_url for payment signals; no LLM at all. The deterministic crawler (crawl_site, fetch_url) does all contact/social/payment/platform extraction via regex/pattern tables (PG_PATTERNS, PLATFORM_PATTERNS, SOCIAL_PATTERNS, EMAIL_RE, PHONE_RE, WA_RE) independent of Gemini.",
  "thresholds": [
    "AUTO_VERIFY_CONFIDENCE = 0.88 — auto-accept gate; verify returns verified only at status=='verified' AND conf>=0.88 (gemini_enrichment.py:116, used L578,1063)",
    "REVIEW_VERIFY_CONFIDENCE = 0.70 — needs_manual_review floor (L117, used L580,1014,1021)",
    "deterministic auto-verify: confidence>=0.72 AND can_auto_verify -> 'verified' (L904); confidence=min(0.99, score/100) (L900)",
    "judge skipped when deterministic confidence>=0.9 (L1050)",
    "negative/manual-review judge overrides require judge_conf>=0.62 (L1003,1005,1007)",
    "judge-verified path requires judge_conf>=0.70 AND det_conf>=0.55, still capped to manual_review/unverified (L1014)",
    "SearXNG candidate kept only if category=='candidate' and score>=40 (L768)",
    "score_result host penalties: directory -45, social -18, generic -55; existing-domain match +45; cap 0..100 (enrichment.py:564-578)",
    "choose_decision (SearXNG pipeline): known-domain accept if best>=45 (conf max(75,score)); else accept>=70, review>=45, else searched (enrichment.py:603-611); Known-website-crawl confidence fixed 80 (L777)",
    "candidate caps: verify_domain_candidates inspects first 6 candidates (L1046); dedupe merged_evidence[:8] (L714); identity_tokens capped 8 (enrichment.py:320); build_queries default 4",
    "crawl caps: MAX_FETCH_BYTES 900_000, MAX_PROFILE_TEXT 12_000, MAX_CONTACT_SCAN_TEXT 200_000, MAX_PAGES 8, REQUEST_TIMEOUT (5,18) (L111-115); emails[:12], phones[:12], whatsapp[:8] (L1380-1382)",
    "score_site_features pg/quality each capped 100; has_razorpay subtracts 30 from pg (L1449-1450,1464)",
    "score_delta clamped to [-40, 35]; has_razorpay -25 (gemini_enrichment.py:1467-1481)",
    "CRAWL_BLOCKED_HTTP_CODES = {401,403,406,407,408,409,425,429,451} map to 'crawl_blocked'; other http_>=400 -> site_unreachable (L154,556-574)",
    "parked detection requires a PARKED_SIGNS match AND page len<40_000 (L1355)"
  ],
  "gaps_or_todos": [
    "Grounded discovery only fires when there are zero SearXNG/corporate candidates (L783-784) — a SearXNG candidate that fails verification blocks the grounded-Gemini fallback entirely; no second attempt at discovery.",
    "verify_domain_candidates only checks the first 6 candidates (candidates[:6], L1046) — beyond-6 candidates are silently dropped.",
    "Two parallel DIRECTORY_DOMAIN lists that disagree: gemini_enrichment.py (L183-223, includes social/maps/travel/etc.) vs enrichment.py (L68-97, includes bizapedia/dnb/fundoodata not in the other). Drift risk.",
    "FREE_EMAIL_DOMAINS (gemini, L225) and GENERIC_DOMAINS (enrichment, L109) overlap but differ (protonmail/icloud/googlemail only in gemini) — corporate-email detection differs by pipeline.",
    "score_lead_after_enrichment (enrichment.py:671) duplicates the rzp rescoring logic of update_lead_scores (gemini L1484) with different field handling — two scoring write paths.",
    "crawl_site PARKED_SIGNS check ignores parked pages >=40_000 bytes (L1355) — large parked/templated pages will pass as live.",
    "fetch_url SSL fallback disables verification (verify=False) and marks ok_insecure but downstream treats it as live 'ok' with no trust penalty (L1219).",
    "PHONE_RE only matches Indian 10-digit [6-9]\\d{9}; landlines/intl numbers missed (L284).",
    "judge status 'judge_failed' (LLM error) is treated like 'no judge' and lets deterministic 'verified' stand (L1010) — LLM outage silently bypasses the judge.",
    "name_guess source has a priority weight (L696) but discover_domain_candidates never actually generates name_guess candidates — dead code path.",
    "extract_payment_signals notes a TODO-ish pass on razorpay+competitor co-presence but does nothing (enrichment.py:654-657).",
    "'namesake' and 'dead_or_parked' are reject statuses the deterministic scorer never emits — only the Gemini judge can produce them (L153,977).",
    "No explicit retry/backoff on Gemini 429s; generate_json raises and the lead is marked failed by the batch runner (record_failure)."
  ],
  "notes": "[\"Crawling is fully deterministic regex/pattern extraction (crawl_site L1332-1426): title/meta/h1, emails/phones/whatsapp, socials, platform (PLATFORM_PATTERNS), payment gateways (PG_PATTERNS), commerce booleans, and pg_propensity_score + profile_quality_score (score_site_features L1429). Gemini never crawls.\", \"Profiling Gemini output is merged conservatively: only socials with truthy values overwrite crawled socials (L1707-1710); business fields come straight from the LLM JSON.\", \"Final lead rescoring routes through src/outbound_scrapers/gates/rzp_quality.score_lead with load_calibration() (gemini L1485,1540; enrichment L696) — writes gtm_action, gtm_route, quality, sales_readiness_score, enrichment_priority_score, rzp_outcome_score, score_breakdown back to the leads table.\", \"write_gemini_result (L1742) is the single persistence point; uses INSERT ... ON CONFLICT(lead_id) DO UPDATE with attempts incremented each run; also back-fills leads.domain/has_domain when a new verified domain is found and the lead had none (L1851).\", \"Backend abstraction: GeminiClient auto-selects Vertex AI (service-account OAuth, googleSearch tool, regional endpoint) vs public Generative Language API (x-goog-api-key, google_search tool); grounded calls cannot use responseMimeType json so JSON is regex-extracted via parse_json_object (L450-453,481-490).\", \"Tests (tests/test_gemini_enrichment_verification.py) lock in: parked rejection, http_403/429 -> crawl_blocked, borderline judge-verified -> manual_review, generic-token+phone not auto-verifying wrong brand, no profiling of unverified candidates, and profiling only after a verified domain. FakeClient(configured=False) path is exercised to prove no-Gemini still verifies/labels deterministically.\", \"DEFAULT_DB is explorer/gtm_engine.sqlite (enrichment.py:27). The web app serve_gtm_app.py exposes both pipelines as batch endpoints with the same gemini_runs/enrichment_runs bookkeeping as the CLI.\"]"
}

== SCRIPTS & DOCS ==
I have everything I need. Here is the summary.

---

# Gemini Enrichment: How It Runs, Intended Design, and Doc/Script Discrepancies

There are **two physically separate enrichment lanes** in this repo, against two different datastores. The scripts you named split cleanly across them, and the docs each describe only one lane.

| Lane | Datastore | Scripts | Documented in |
|---|---|---|---|
| **A — Postgres domain/MCC finder** | `postgresql://outbound:outbound@localhost:15433/lead_universe` | `enrich_domains_gemini.py`, `enrich_mcc_gemini.py`, `reclassify_starved.py`, `gemini_budget.py` | `docs/enrichment-playbook.md`, `docs/MASTER.md` |
| **B — SQLite GTM workbench (verify-first)** | `explorer/gtm_engine.sqlite` | `run_gemini_gtm_enrichment.py`, `run_gemini_batch.py`, `reverify_gemini_enrichment.py`, `prepare_gemini_batch_db.py`, `merge_gemini_batch_db.py` | `docs/gemini_enrichment_pipeline_reliability.excalidraw` |

All Lane B scripts route through `gtm_engine.gemini_enrichment.enrich_lead_with_gemini` / `ensure_gemini_schema` and write `lead_gemini_enrichment` + `gemini_runs`. Lane A talks to the Gemini REST API directly.

---

## 1. How enrichment is actually RUN

### Lane A — Postgres domain finder (`scripts/enrich_domains_gemini.py`)
Two-tier, cheap-first, idempotent (only touches `primary_domain IS NULL`):
```bash
# free ₹0 pass: email-localpart/name guesses → DNS/HTTP → on-page phone/email/pin match
.venv/bin/python scripts/enrich_domains_gemini.py --free-only --apply --limit 7000
# paid grounded pass on leftovers, budget-capped, --track converges across daily chunks
MARKETING_GEMINI_BUDGET_INR=2000 .venv/bin/python scripts/enrich_domains_gemini.py --limit 1300 --track --apply
```
- **Transport:** raw REST to `generativelanguage.googleapis.com/v1beta/.../gemini-2.5-flash:generateContent`, hardcoded `MODEL = "gemini-2.5-flash"`, `tools=[{google_search:{}}]` grounding, `thinkingConfig.thinkingBudget=0` (lines 54-55, 141-149).
- **Apply flag:** `--apply` writes; default is dry-run. Four guardrails before write: confidence ≥0.70, directory blocklist, live-HTTP 200, and on-page phone/email/pincode corroboration → `confirmed` vs `model_only`. `--include-model-only` to also persist the un-corroborated ones (line 312-314, 393-394).
- **Parallelism:** `ThreadPoolExecutor(--workers, default 6)`, incremental flush every 200 rows.
- **Budget:** imports `gemini_budget as gb`; `gb.cap_rows()` pre-trims the batch and `gb.over_budget()` hard-stops mid-run (lines 48, 276, 346-351).

### Lane B — Workbench main runner (`scripts/run_gemini_gtm_enrichment.py`)
```bash
GEMINI_API_KEY=... .venv/bin/python scripts/run_gemini_gtm_enrichment.py --limit 100 --mode full
GEMINI_API_KEY=... .venv/bin/python scripts/run_gemini_gtm_enrichment.py --all --min-rzp 65 --missing-domain
```
- **Modes:** `--mode full|domain|profile`; cohort `--preset` shortcuts (`known-domain-profile`, `high-priority-no-domain`, `immediate-clean`, `broad-high-priority`, lines 143-162).
- **Selection/filters:** rich `build_where` over `leads`+`lead_gemini_enrichment` — suppression, `--missing-domain/--has-domain`, vertical fit, `--min-rzp/--min-readiness/--min-enrichment-priority`, `--where-sql`, retry buckets `--retry-failed` (`status='failed'`) and `--retry-no-domain` (lines 60-110).
- **Sharding:** `--shard-count N --shard-index i` → `(l.id % N) = i`; `--order random --random-seed 20260630`; `--all` vs `--limit`; commit every `--batch-size` (default 10); `--max-errors`, `--sleep-ms` pacing (lines 106-108, 320-324).
- **Apply-scores flag:** `--no-apply-scores`. **Scores are applied BY DEFAULT** (`apply_scores=not args.no_apply_scores`, line 253). Verify-first gating happens inside `enrich_lead_with_gemini`, so only verified rows actually get rescored.
- **Discovery:** SearXNG candidate retrieval (`--searxng-url`, `--no-searxng`) + grounded-Gemini fallback (`--no-grounding-discovery`), `--max-search-queries` (default 4). Every run logged to `gemini_runs`.

### Lane B — Vertex/alt-backend batch (`scripts/run_gemini_batch.py`)
```bash
export GOOGLE_APPLICATION_CREDENTIALS=\$PWD/Service_account_Json_file.json
export GEMINI_BACKEND=vertex GEMINI_MODEL=gemini-2.5-flash VERTEX_LOCATION=us-central1
.venv/bin/python scripts/run_gemini_batch.py --limit 50
```
Simpler top-N runner ordered by `l.enrich_score`. **Apply-scores flag:** `--no-scores`; **scores applied BY DEFAULT**. `--reresearch` to include already-profiled leads. Routes through whichever backend `GeminiClient` resolves (Vertex when service-account creds are set, else `GEMINI_API_KEY`).

### Lane B — Sharded parallel batch (prepare → run → merge)
```bash
# 1. carve a compact per-shard DB to ship to workers (default 9 shards × 250 rows, seed 20260630)
.venv/bin/python scripts/prepare_gemini_batch_db.py --shards 9 --per-shard 250
# 2. each worker runs run_gemini_gtm_enrichment.py against its shard DB (--shard-count/--shard-index)
# 3. fold results back into the dashboard DB
.venv/bin/python scripts/merge_gemini_batch_db.py explorer/gemini_vps_batch.sqlite
```
- `prepare_gemini_batch_db.py`: deterministic modulo-shard sampling with a shared `random_seed` so parallel workers never race for the same leads; records a `gemini_batch_manifest`; VACUUMs the small DB (lines 51-77, 116-130).
- `merge_gemini_batch_db.py`: remaps source `run_id`s into the target, upserts `lead_gemini_enrichment` via `ON CONFLICT(lead_id) DO UPDATE`, annotates `filter_json` with `merged_from`, and invalidates dashboard caches (lines 47-95, 121-123). `--dry-run` available.

### Lane B — Re-audit (`scripts/reverify_gemini_enrichment.py`)
Re-runs already-enriched rows through the verify-first pipeline to rewrite honest statuses on suspect old batches.
```bash
.venv/bin/python scripts/reverify_gemini_enrichment.py --run-id 5 --statuses profiled,verified_domain
```
- **Apply-scores flag:** `--apply-scores`. **Scores are OFF BY DEFAULT** (`apply_scores=args.apply_scores`, line 173) — deliberately, so re-audits don't compound old score pollution (docstring lines 14-16, closing reminder line 239-240).
- `--mode domain` allows deterministic-only verification with no Gemini key; `full`/`profile` require the key. Selects by `--run-id`, `--statuses` (default list includes `candidate_unverified, needs_manual_review, parent_or_group, namesake, parked, crawl_blocked, site_unreachable, no_domain`).

### Spend ledger (`scripts/gemini_budget.py`)
Shared module (not a runner): logs tokens + estimated ₹ per call into Postgres `gemini_spend`, enforces `MARKETING_GEMINI_BUDGET_INR` hard cap. `cap_rows()` pre-flight-trims; `over_budget()` mid-run stop. Pricing is an explicit assumption (Flash \$0.30/1M in, \$2.50/1M out, grounding free under 1,500/day). `python scripts/gemini_budget.py` prints the ledger report.

---

## 2. What the docs say the intended reliable pipeline is

**`docs/enrichment-playbook.md`** — the canonical 5-stage Postgres play (domain-find → site-meta crawl → classify → dedup/scrub → score → activate). It frames Gemini enrichment as Stage 1 (`enrich_domains_gemini.py`, free pre-check then paced grounded run) and Stage 3 (`enrich_mcc_gemini.py`). Its non-negotiables: free pre-check first, `thinkingBudget=0`, pace under the 1,500/day free grounding tier, and **"every Gemini call logs tokens + ₹ to `gemini_spend`"** with a hard cap; on-page corroboration beats model confidence.

**`docs/gemini_enrichment_pipeline_reliability.excalidraw`** — the "reliability hardening" diagram (the one referenced in recent commits) documents Lane B's intended design: *"Wrong scrapes are worse than fewer right scrapes… optimizes for precision first."* The intended reliable pipeline is **verify-first**:
1. Candidate discovery: domain/email/SearXNG first, grounded Gemini only as fallback.
2. Bounded **local Python `requests` crawler** (not Gemini browsing): same-host pages only, max 6 candidates, max 8 pages/site, caps 900 KB/page · 12 KB profile · 200 KB contact scan, 5s/18s timeouts.
3. **Deterministic identity score** (name/domain tokens, CIN/GSTIN, email, phone, city/state).
4. Gemini judge on supplied evidence only (~5 KB) — it can downgrade/flag for review but cannot bless weak matches.
5. **Auto gate ≥0.88 confidence + distinctive identity anchor** required before any profile/score.

Outcomes bucket into **profile (verified) / review (plausible) / reject-retry (wrong, blocked, parked)**, producing the honest statuses `candidate_unverified`, `needs_manual_review`, `parent_or_group`, `namesake`, `parked`, `crawl_blocked`, `site_unreachable`. The 250-row audit (runs 6-13, **no scores applied**) yielded 133 profiled, 56 review, 29 rejected, 32 retry. Operational changes listed: SQLite busy-timeout for parallel chunks, capped contact scan, dashboard exposes review/retry statuses, and *"Reverify script keeps scores off by default."*

---

## 3. Discrepancies between docs and scripts

1. **The two lanes are undocumented to each other.** `enrichment-playbook.md` and `MASTER.md` describe only the Postgres lane and never mention `run_gemini_gtm_enrichment.py`, `run_gemini_batch.py`, `reverify_*`, or the prepare/merge batch flow. The reliability diagram describes only the SQLite-workbench lane and never mentions the Postgres domain finder. A reader of either doc gets half the system. They also hit different tables (`primary_domain` on `leads` vs `lead_gemini_enrichment`/`gemini_runs`).

2. **The "every Gemini call is metered" guarantee is false for Lane B.** `gemini_budget` is imported only by `enrich_domains_gemini.py`, `enrich_mcc_gemini.py`, `reclassify_starved.py` (all Postgres). None of `run_gemini_gtm_enrichment.py`, `run_gemini_batch.py`, or `reverify_gemini_enrichment.py` import it — they log no spend and honor no `MARKETING_GEMINI_BUDGET_INR` cap, so they run unmetered and uncapped. Yet `enrichment-playbook.md` ("Cost discipline — non-negotiable") states **every** Gemini call logs to `gemini_spend`. The cap also physically can't reach Lane B: `gemini_budget` connects to Postgres, while Lane B never opens that connection.

3. **`apply_scores` default polarity is inconsistent across the runners.** `run_gemini_gtm_enrichment.py` (`--no-apply-scores`) and `run_gemini_batch.py` (`--no-scores`) apply scores **by default**; `reverify_gemini_enrichment.py` (`--apply-scores`) keeps them **off by default**. Only the reverify default is documented (in the diagram). The fresh-runner default-on behavior is safe only because gating lives inside `enrich_lead_with_gemini`, but the opposing defaults are an easy foot-gun and aren't called out anywhere.

4. **`GTM_ENGINE_PIPELINE.md` understates the real state.** Line 59 marks the Gemini node 🟥 `gap` — *"domain-find · MCC classify · site profile (half-wired / uncommitted)"* — and line 49 marks the post-enrichment re-score loop (Gate 5b) a `gap` *"loop not closed in practice."* In reality the scripts implement a full verify-first Gemini pipeline that writes `lead_gemini_enrichment` and rescores leads by default. The reliability diagram (newer) contradicts the pipeline-overview diagram (older); the overview is stale.

5. **The fresh runner's retry vocabulary lags the verify-first status vocabulary.** The diagram and `reverify`'s `DEFAULT_STATUSES` define a rich review/retry queue (`needs_manual_review`, `candidate_unverified`, `crawl_blocked`, etc.), but `run_gemini_gtm_enrichment.build_where` only has first-class retry flags for `status='failed'` (`--retry-failed`) and `status='no_domain'` (`--retry-no-domain`). To re-pull the "retry crawl" / "approve before scoring" buckets you must drop to `--include-profiled` + `--where-sql` or switch to the reverify script.

6. **Two different Gemini transports coexist.** Lane A hardcodes raw REST `generativelanguage` v1beta + `gemini-2.5-flash`; Lane B goes through `GeminiClient`, which `run_gemini_batch.py` documents as Vertex-capable (`GEMINI_BACKEND=vertex`, `VERTEX_LOCATION`). The pricing assumptions in `gemini_budget.py` are Flash-list-rate only and aren't applied to the Vertex path at all.

**Relevant files:** `/Users/kuber.mehta/Projects/marketing-outbound/scripts/{run_gemini_gtm_enrichment,reverify_gemini_enrichment,run_gemini_batch,prepare_gemini_batch_db,merge_gemini_batch_db,enrich_domains_gemini,gemini_budget}.py` · `/Users/kuber.mehta/Projects/marketing-outbound/docs/{enrichment-playbook.md,gemini_enrichment_pipeline_reliability.excalidraw,GTM_ENGINE_PIPELINE.md,MASTER.md}` · pipeline module (not read here but invoked by all Lane B scripts): `gtm_engine/gemini_enrichment.py`.

YOUR JOB — do NOT trust the summaries blindly; OPEN THE CODE and verify each claim that matters:
1. For every key element of the chat's proposed fix (the "invert the pipeline": SearXNG candidates -> deterministic verifier -> Gemini judges only survivors; distinctive identity anchors; conservative domain verification at the right threshold; reverify audit), check whether the current code in gtm_engine/gemini_enrichment.py and enrichment.py ACTUALLY implements it. Read the specific functions. Cite file:line.
2. Identify what was FULLY implemented, what was PARTIALLY implemented, and what was proposed/discussed but NOT done.
3. Identify any open_questions_or_todos from the chat that are still unaddressed in code.
4. Check the audit/reverify results from the chat against current reverify tooling — is the pipeline validated, or is validation still pending?
5. Surface any NEW risks/bugs you notice in the current implementation that the chat did not cover.

Return a rigorous structured verdict.