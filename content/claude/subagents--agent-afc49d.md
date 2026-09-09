---
title: "subagents · agent-afc49d"
---

In /Users/kuber.mehta/Projects/marketing-outbound (Razorpay SME lead dashboard), the dashboard's location filter is unusable because `leads.state` has **1,560 distinct values** — it should be ~37 (28 states + 8 UTs + Unknown). Build proper geo-normalization. Audit of the real dirt (from the live 1.56M-lead DB):

- **PIN-code-laden addresses dumped into `state`** (~1,947 leads): 'Dwarka New Delhi 110075', 'Gurugram 122002', 'Noida 201301', 'Connaught Place New Delhi 110001', 'Leh 194101', 'Vaishali Nagar Jaipur 302021', 'New Delhi 110 001' (note the space inside the PIN).
- **Casing/"And" variants**: 'Jammu And Kashmir' vs 'Jammu and Kashmir', 'Daman And Diu' vs 'Daman and Diu', 'Andaman And Nicobar Islands' vs 'Andaman and Nicobar Islands', 'Andaman and Nicobar' (no "Islands").
- **Spelling/legacy**: 'Orissa' & 'Orissa/Odisha' → Odisha; 'Pondicherry' → Puducherry; 'New Delhi' → Delhi; 'Dadra and Nagar Haveli' / 'Daman and Diu' → 'Dadra and Nagar Haveli and Daman and Diu' (the merged UT).
- **Cities-as-state**: 'Gurugram'→Haryana, 'Noida'→Uttar Pradesh, 'Leh'→Ladakh, 'Srinagar'→Jammu and Kashmir, etc.
- **Empty** (16,805) and 'Unknown' (623) → 'Unknown'.

Also two smaller facet bugs to fix in the same pass:
- `leads.category` has singular/plural dupes: 'developer'(20,791) vs 'developers'(26,349); 'export_council'(10,048) vs 'export_councils'(8,461) — collapse to one canonical each.
- `lead_gemini_enrichment.inferred_vertical` splits '' (237,370) and NULL (53) — unify so the facet treats them the same.

## GUARDRAILS
- Mac repo only. Do NOT ssh anywhere, do NOT touch any live DB, do NOT deploy/push. Local commits only, author kuberhob@gmail.com, NO Co-Authored-By trailer.
- Python `.venv/bin/python`. READ how `gtm_engine/serve_gtm_app.py` builds facets (`BAR_FACETS`, `MULTI_FILTERS`, `default_facet_rows`/`grouped`, `where_from_params`, `FROM_LEADS`, `build_db`, `ENRICHMENT_TABLES`, `preserve_enrichment_tables`) and mirror the existing `lead_sell_grade` side-table pattern in `gtm_engine/sell_grade.py` (ensure_schema + backfill + ENRICHMENT_TABLES + build_db hook). Match style. Don't touch scripts/ or feedback.py.
- Validate on a SYNTHETIC fixture; run `.venv/bin/python -m pytest tests/ -q` green (add your own tests). Don't touch the live fleet.

## Build
1. **`gtm_engine/geo_normalize.py`**:
   - `CANONICAL_STATES` — the 28 states + 8 union territories, canonical spellings (post-2019/2020: J&K and Ladakh separate; the merged 'Dadra and Nagar Haveli and Daman and Diu'; Telangana separate from Andhra Pradesh).
   - `STATE_ALIASES` — lowercased variant → canonical (handle "and"/"And" casing generically by lowercasing before lookup; Orissa→Odisha, Pondicherry→Puducherry, Uttaranchal→Uttarakhand, 'nct of delhi'/'new delhi'/'delhi ncr'→Delhi, common abbreviations MH/DL/KA/TN/UP/WB/etc.).
   - `PIN2_TO_STATE` — first-2-digit Indian PIN → state/circle (11=Delhi, 12-13=Haryana, 14-16=Punjab, 17=Himachal Pradesh, 18-19=Jammu and Kashmir/Ladakh, 20-28=Uttar Pradesh, 30-34=Rajasthan, 36-39=Gujarat, 40-44=Maharashtra & Goa (403/404 Goa), 45-48=Madhya Pradesh, 49=Chhattisgarh, 50-53=Telangana/Andhra Pradesh, 56-59=Karnataka, 60-64=Tamil Nadu, 67-69=Kerala, 70-74=West Bengal, 75-77=Odisha, 78=Assam, 79=Arunachal/NE, 80-85=Bihar/Jharkhand, 90-99=Army — verify these against your knowledge and refine; get the big circles right).
   - `CITY_TO_STATE` — a solid set of India's ~120 largest cities → state (metros + tier-2; include the ones in the audit: Gurugram, Noida, Ghaziabad, Leh, Srinagar, Varanasi, Agra, Jaipur, Bodhgaya, etc.).
   - `normalize_state(raw) -> str`: (a) empty/'unknown'/None → 'Unknown'; (b) lowercase+trim+collapse-internal-space; (c) if a 6-digit PIN is present (allow an internal space like '110 001') → PIN2→state; (d) exact alias/canonical match; (e) contains-a-canonical-state-name substring; (f) contains-a-known-city → its state; (g) else 'Unknown'. Order matters — a clean alias should beat a city substring.
   - `normalize_category(raw)` — collapse the plural/singular dupes (developer→developers, export_council→export_councils) via a small alias map; identity otherwise.
2. **`lead_geo` side table** `(lead_id INTEGER PRIMARY KEY, state_norm TEXT, state_raw TEXT)` — since `state` is static per lead (from the golden CSV, doesn't change with enrichment), just a **full backfill** (no watermark/refresher needed): `ensure_geo_schema`, `refresh_geo(conn)` chunked over the id space computing normalize_state, indexed on state_norm. Add `lead_geo` to `ENRICHMENT_TABLES`; call ensure + a backfill hook in `build_db` so it repopulates on rebuild; CLI `python -m gtm_engine.geo_normalize --db <path>`.
3. **Wire `serve_gtm_app.py`**: `FROM_LEADS += " LEFT JOIN lead_geo gx ON gx.lead_id = l.id"`; the location facet + `state` filter + `LIST_COLUMNS` use `COALESCE(gx.state_norm, 'Unknown') AS state` (keep raw available as e.g. `state_raw` if useful for the detail panel). Apply `normalize_category` to the category facet/filter (a CASE or a small mapping table `category_norm` — your call; simplest is a SQL CASE for the 2 known dupes). For `inferred_vertical`, ensure the facet expr uses `COALESCE(NULLIF(ge.inferred_vertical,''),'unknown')` consistently (check it isn't already). Bump the stats/meta cache-key version + frontend CACHE_VERSION.
4. **Tests**: `normalize_state` on ALL the audit examples above → correct canonical; assert a realistic dirty set collapses to ≤ ~37 distinct; category dupes collapse; PIN-with-internal-space parses.

## Finish
Granular commits. Report: the files, the normalize_state logic + coverage (how many of the audit examples map correctly, expected distinct-count after normalization), tests, and exactly what deploy must run (the lead_geo backfill on the live DB, like the sell_grade `--full`). Note anything you're unsure about in the PIN/city maps so I can spot-check on live data before it goes out.