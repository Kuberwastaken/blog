---
title: "wf-d23d1768-b1d · agent-a191ca"
---

You are Fable 5, a senior strategy + staff-engineer advisor. Give an opinionated, specific plan + a detailed checklist for the next step of the "marketing-outbound" project. Your final message IS the deliverable (it will be relayed verbatim to the user), so make it a complete, well-structured document.

## The project
A Razorpay SME lead-discovery / enrichment / GTM-scoring engine.
- Repo (read it): /Users/kuber.mehta/Projects/marketing-outbound
- Live copy + data on the VPS: `ssh ai-vps` then /home/ec2-user/Projects/marketing-outbound ; the 13G working DB is explorer/gtm_engine.sqlite (SQLite). You MAY ssh ai-vps to inspect live schema/counts (read-only, mode=ro) if useful. sqlite3 CLI is NOT installed there — use .venv/bin/python + sqlite3.
- ~1.56M deduped public-registry Indian SME leads (the leads table, 71 cols).
- A Razorpay-calibrated heuristic scorer at src/outbound_scrapers/gates/rzp_quality.py assigns rzp_outcome_score + gtm_action (Sell now / Enrich high / Enrich medium / Suppress) + rzp_baseline_cohort FROM REGISTRY DATA ONLY (before any web enrichment).
- A live enrichment fleet (44 shards on the VPS) enriches leads via SearXNG + Gemini and writes the lead_gemini_enrichment table (48 cols) with orthogonal facets:
  - identity_status: verified_website / candidate_unverified / needs_manual_review / no_digital_trace / parent_or_group / namesake
  - payment_signal: payment_intent / existing_razorpay / competitor_pg / none
  - contactability: contact_enriched / partial / none
  - activeness: live_site / unreachable / crawl_blocked / parked / unknown
  - plus business_summary, products, emails, phones, whatsapp_numbers, socials, official_domain, inferred_vertical/category, pg_propensity_score, verification_confidence, etc.
- Progress: ~248k of ~1.05M enrichable leads done, ~1700/hr, ~786k remaining, ETA ~2026-07-26. ENRICHMENT KEEPS RUNNING — any solution must work continuously as the data grows.
- Data platform: HF dataset kuberrpy/marketing-outbound-leads is the canonical store (full per-table parquet mirror + hourly incremental deltas + daily re-dump; local raw crawl blobs are evicted after push to keep the VM disk flat). GitHub carries code + campaign JSONL + 3h aggregate snapshots (ops/db_snapshots/HISTORY.md).

## The key finding that motivates this work
Among enriched leads, the facets already surface a goldmine the registry scorer CANNOT see:
- 14,118 HOT = identity_status=verified_website AND payment_signal=payment_intent AND contactability IN (contact_enriched,partial)
- 14,712 verified + payment-signal ; 17,140 verified + contactable ; 183 on a competitor gateway (switch targets) ; 406 already Razorpay (exclude).
But the current gtm_action buries them — it was assigned from registry data, so these hot leads are scattered across "Enrich high/medium".

## The problem to solve
1. RE-CLASSIFICATION: do "another pass on the classifier" that USES the enrichment facets to rank/surface the genuinely good, sellable leads (crème-de-la-crème). It should compose with, not throw away, the existing rzp_outcome_score/cohort work.
2. USABILITY: the local dashboard (gtm_engine/serve_gtm_app.py backend + gtm_engine/app/{index.html,app.js,styles.css} frontend, served on :8765) currently shows leads in a weird/alphabetical, hard-to-navigate order. Make it show the good leads WELL — ranked, navigable, filterable, with the "why" visible — and keep it live/fresh while enrichment runs.

## Your task
FIRST, actually read the relevant code so your plan is grounded, at minimum:
- gtm_engine/serve_gtm_app.py (the dashboard backend, its SQL, /api/leads, the FROM_LEADS join, existing facet filters, ordering)
- gtm_engine/app/index.html, app.js, styles.css (the frontend — how it renders/sorts/paginates)
- src/outbound_scrapers/gates/rzp_quality.py (the existing scorer — rzp_outcome_score, cohorts, gtm_action) so the new grade composes cleanly
- skim gtm_engine/enrichment.py / gemini_enrichment.py for the facet definitions
(Optionally ssh ai-vps to sanity-check live counts.)

THEN produce a single well-structured document with:

A) STRATEGY & APPROACH — what the plan should be and HOW to go about it. Be decisive on the real design questions:
   - Live-computed score in the query vs a materialized sell_score column (given enrichment writes continuously) — pick one and justify; note performance for ~248k→1.05M rows.
   - The exact definition of "good" — propose concrete sell-grade tiers (A/B/C/…) as SQL-expressible predicates over the facets + rzp_outcome_score, and how existing_razorpay/suppressed are handled.
   - How the ranking degrades gracefully while most leads are still un-enriched (don't punish "not yet enriched" as if it were "bad").
   - How to make the dashboard navigable: default ordering, a "Hot" preset, the columns/"why" to surface, pagination/search, and NOT disrupting the running fleet (read-only, WAL).
   - Anything you'd warn us about (double-counting signals already in rzp_outcome_score, cohort skew, verification confidence, false positives).

B) DETAILED CHECKLIST — an ordered, concrete, file-level implementation checklist we can execute step by step, including the SQL/scoring expression, the specific serve_gtm_app.py + frontend edits, and verification steps at each stage. Make it pragmatic and shippable incrementally without pausing enrichment.

Be specific and opinionated; ground every recommendation in the actual code you read.