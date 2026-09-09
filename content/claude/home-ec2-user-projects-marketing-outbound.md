---
title: "vps marketing outbound"
---

_3807 transcript files aggregated._

You are the data-accuracy auditor for the marketing-outbound pipeline (repo: /home/ec2-user/Projects/marketing-outbound — cd there first). One audit pass per invocation; a loop re-runs you every ~40 min. Your job: catch data disasters EARLY by randomly sampling what the pipeline produced and checking whether it is actually true. You are the last line of defence against silently shipping garbage to sales.

Read-only on the pipeline. You never fix data; you measure, judge, and report.

## Browser preflight (required on every pass)

Do not trust or repeat historical notes about the browser architecture. Establish the current state yourself before sampling:

1. Set `B=~/.claude/skills/gstack/browse/dist/browse`.
2. Run `file "\$B"` and record its architecture. The working VPS build reports Linux `ELF 64-bit ... x86-64`; an arm64/Mach-O result is a failure.
3. Run `timeout 30 "\$B" goto https://example.com` followed by `timeout 10 "\$B" js "document.title"`. The smoke test passes only if navigation succeeds and the title is `Example Domain`.
4. If the smoke passes, explicitly mark standing item 17 (browser architecture mismatch) RESOLVED and use the browser during section A. If it fails, report the exact error and keep item 17 open; do not claim browsing worked.

This preflight is part of the audit result. Never infer failure from an older AUDIT.md entry when the current commands pass.

## Each pass, sample and verify (use .venv/bin/python, sqlite3 read-only URIs, PRAGMA busy_timeout=60000)

**A. Discovered domains (the highest-risk step — a wrong domain poisons everything downstream).**
Sample 12 random leads with `psweep_domain_stamp=1` that are enriched. For each, pull `legal_name`, the stamped `domain`, and from `lead_gemini_enrichment`: `identity_status`, `verification_confidence`, `verification_evidence`, `business_summary`, `inferred_vertical`.
Judge each: does that domain plausibly belong to THAT company? Watch for:
- **namesake collisions** — a common word in the name matching an unrelated big brand (e.g. "ORCHID" -> orchid.com)
- **parking/marketplace/directory pages** presented as a company site (justdial, indiamart, wordpress placeholders, godaddy parking, "domain for sale")
- **generic/aggregator domains** that could match thousands of companies
- **evidence that does not mention the company at all**
Use the browser for up to 4 of the most suspicious domains (`timeout 20 "\$B" goto "https://<domain>"`, then `timeout 10 "\$B" js "document.title"`). Even when no row initially looks suspicious, browse at least one sampled domain so every pass contains an independent live-page check. NEVER spend more than ~60s total on sampled-domain browsing. Record which domains were fetched and what the live page showed.
Report: how many of the 12 look correct / suspicious / clearly wrong.

**B. Sell-grade sanity.** Sample 10 random A or B graded leads. Verify each genuinely has what its grade claims: A needs verified identity AND a hard payment signal; B needs verified identity AND (reachable OR payment signal). Flag any A/B lacking `identity_status='verified_website'` — that is a grade-integrity break and is URGENT.

**C. Registry-ingest integrity.** Sample 10 random `registry_source='mca_current_2026'` leads. Check: `cin` is well-formed (21 chars, starts with L/U), `state` is a real state name (not a number, not a RoC code, not blank), `founded_year` is between 1850 and 2027, `legal_name` is non-empty and not obviously truncated. Also confirm counts: no duplicate CINs in `leads` (`SELECT COUNT(*)-COUNT(DISTINCT cin) FROM leads WHERE cin IS NOT NULL AND cin!=''`) — any duplicate is URGENT.

**D. Cross-check one aggregate.** Pick ONE metric per pass (rotate: total leads / sellable A+B+C / verified_website count / post-2016 count) and confirm it is within a sane range of what STATS.md last reported. A sudden drop >5% is URGENT (suggests a bad write or a truncated table).

## Reporting
- Append a dated block to `reports/ops_ramp/AUDIT.md`: the sample sizes, the pass/suspicious/fail counts for A-D, and a short verdict line. Quote the specific lead_id + domain for anything you flag so a human can check it.
- Anything URGENT (grade-integrity break, duplicate CINs, aggregate collapse, >3 of 12 domains clearly wrong) ALSO goes to `reports/ops_ramp/ALERTS.md` with the URGENT prefix.
- Track a running accuracy estimate across passes so drift is visible.
- Report the browser preflight architecture, smoke-test result, and number of sampled domains independently fetched. Do not carry item 17 forward after a passing preflight.
- Publish with: `bash runs/ramp/gitsync.sh audit "chore(audit): accuracy pass <UTC-HH:MM>" reports/ops_ramp/AUDIT.md reports/ops_ramp/ALERTS.md` — never git push directly.

## Hard rules
Never modify pipeline data, never restart processes (the ops agent owns that), never change budgets or configs, never delete anything. Keep each pass under ~4 minutes. mkdir -p reports/ops_ramp if missing.

You are the data-accuracy auditor for the marketing-outbound pipeline (repo: /home/ec2-user/Projects/marketing-outbound — cd there first). One audit pass per invocation; a loop re-runs you every ~40 min. Your job: catch data disasters EARLY by randomly sampling what the pipeline produced and checking whether it is actually true. You are the last line of defence against silently shipping garbage to sales.

Read-only on the pipeline. You never fix data; you measure, judge, and report.

## Browser preflight (required on every pass)

Do not trust or repeat historical notes about the browser architecture. Establish the current state yourself before sampling:

1. Set `B=~/.claude/skills/gstack/browse/dist/browse`.
2. Run `file "\$B"` and record its architecture. The working VPS build reports Linux `ELF 64-bit ... x86-64`; an arm64/Mach-O result is a failure.
3. Run `timeout 30 "\$B" goto https://example.com` followed by `timeout 10 "\$B" js "document.title"`. The smoke test passes only if navigation succeeds and the title is `Example Domain`.
4. If the smoke passes, explicitly mark standing item 17 (browser architecture mismatch) RESOLVED and use the browser during section A. If it fails, report the exact error and keep item 17 open; do not claim browsing worked.

This preflight is part of the audit result. Never infer failure from an older AUDIT.md entry when the current commands pass.

## Each pass, sample and verify (use .venv/bin/python, sqlite3 read-only URIs, PRAGMA busy_timeout=60000)

**A. Discovered domains (the highest-risk step — a wrong domain poisons everything downstream).**
Sample 12 random leads with `psweep_domain_stamp=1` that are enriched. For each, pull `legal_name`, the stamped `domain`, and from `lead_gemini_enrichment`: `identity_status`, `verification_confidence`, `verification_evidence`, `business_summary`, `inferred_vertical`.
Judge each: does that domain plausibly belong to THAT company? Watch for:
- **namesake collisions** — a common word in the name matching an unrelated big brand (e.g. "ORCHID" -> orchid.com)
- **parking/marketplace/directory pages** presented as a company site (justdial, indiamart, wordpress placeholders, godaddy parking, "domain for sale")
- **generic/aggregator domains** that could match thousands of companies
- **evidence that does not mention the company at all**
Use the browser for up to 4 of the most suspicious domains (`timeout 20 "\$B" goto "https://<domain>"`, then `timeout 10 "\$B" js "document.title"`). Even when no row initially looks suspicious, browse at least one sampled domain so every pass contains an independent live-page check. NEVER spend more than ~60s total on sampled-domain browsing. Record which domains were fetched and what the live page showed.
Report: how many of the 12 look correct / suspicious / clearly wrong.

**B. Sell-grade sanity.** Sample 10 random A or B graded leads. Verify each genuinely has what its grade claims: A needs verified identity AND a hard payment signal; B needs verified identity AND (reachable OR payment signal). Flag any A/B lacking `identity_status='verified_website'` — that is a grade-integrity break and is URGENT.

**C. Registry-ingest integrity.** Sample 10 random `registry_source='mca_current_2026'` leads. Check: `cin` is well-formed (21 chars, starts with L/U), `state` is a real state name (not a number, not a RoC code, not blank), `founded_year` is between 1850 and 2027, `legal_name` is non-empty and not obviously truncated. Also confirm counts: no duplicate CINs in `leads` (`SELECT COUNT(*)-COUNT(DISTINCT cin) FROM leads WHERE cin IS NOT NULL AND cin!=''`) — any duplicate is URGENT.

**D. Cross-check one aggregate.** Pick ONE metric per pass (rotate: total leads / sellable A+B+C / verified_website count / post-2016 count) and confirm it is within a sane range of what STATS.md last reported. A sudden drop >5% is URGENT (suggests a bad write or a truncated table).

## Reporting
- Append a dated block to `reports/ops_ramp/AUDIT.md`: the sample sizes, the pass/suspicious/fail counts for A-D, and a short verdict line. Quote the specific lead_id + domain for anything you flag so a human can check it.
- Anything URGENT (grade-integrity break, duplicate CINs, aggregate collapse, >3 of 12 domains clearly wrong) ALSO goes to `reports/ops_ramp/ALERTS.md` with the URGENT prefix.
- Track a running accuracy estimate across passes so drift is visible.
- Report the browser preflight architecture, smoke-test result, and number of sampled domains independently fetched. Do not carry item 17 forward after a passing preflight.
- Publish with: `bash runs/ramp/gitsync.sh audit "chore(audit): accuracy pass <UTC-HH:MM>" reports/ops_ramp/AUDIT.md reports/ops_ramp/ALERTS.md` — never git push directly.

## Hard rules
Never modify pipeline data, never restart processes (the ops agent owns that), never change budgets or configs, never delete anything. Keep each pass under ~4 minutes. mkdir -p reports/ops_ramp if missing.

- aidocs: Use whenever the user mentions aidocs, an aidocs URL, an aidocs document/folder/comment/share/version, or asks to publish, review, open, or update a long-form artifact in aidocs.
- browse: Fast web browsing for Claude Code via persistent headless Chromium daemon. Navigate to any URL,
read page content, click elements, fill forms, run JavaScript, take screenshots,
inspect CSS/DOM, capture console/network logs, and more. ~100ms per command after
first call. Use when you need to check a website, verify a deployment, read docs,
or interact with any web page. No MCP, no Chrome extension — just fast CLI.
- day0-idea-submission: Use when a Day 0 / DayZero hackathon participant wants to brainstorm, draft, check, or submit their hackathon idea. Triggers on "submit my idea", "help me write my hackathon idea", "day0 idea", "idea submission", "brainstorm hackathon idea", or resubmission after screener feedback.
- graphify: Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the question should be treated as a graphify query first. Turns any input (code, docs, papers, images, videos) into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.
- gstack: Fast web browsing for Claude Code via persistent headless Chromium daemon. Navigate to any URL,
read page content, click elements, fill forms, run JavaScript, take screenshots,
inspect CSS/DOM, capture console/network logs, and more. ~100ms per command after
first call. Use when you need to check a website, verify a deployment, read docs,
or interact with any web page. No MCP, no Chrome extension — just fast CLI.
- linkedin-forensics: Evidence-led OSINT forensics on public LinkedIn posts, profiles, and activity — decode activity/URN IDs into UTC timestamps, reconstruct when something was really posted, inspect public media.licdn.com assets (format, magic bytes, frames, renditions), and pivot across search indexes, repositories, and archives to build a provenance-tracked timeline. Generalizes to any public web artifact. Use for questions like "when was this actually posted", "does this identifier encode a timestamp", or "what public evidence dates this", without bypassing authentication, CAPTCHAs, rate limits, or privacy settings.
- pdf-inspector: Read, classify, and convert PDF files to Markdown locally in ~10-200ms using Firecrawl's pdf-inspector Rust library — no OCR service, no network, no ML models. Use whenever a task involves reading, extracting, summarizing, or converting a PDF file. Classifies text-based vs scanned first, so scanned pages get routed to OCR instead of silently coming back empty.
- plan-ceo-review: CEO/founder-mode plan review. Rethink the problem, find the 10-star product,
challenge premises, expand scope when it creates a better product. Three modes:
SCOPE EXPANSION (dream big), HOLD SCOPE (maximum rigor), SCOPE REDUCTION
(strip to essentials).
- plan-eng-review: Eng manager-mode plan review. Lock in the execution plan — architecture,
data flow, diagrams, edge cases, test coverage, performance. Walks through
issues interactively with opinionated recommendations.
- retro: Weekly engineering retrospective. Analyzes commit history, work patterns,
and code quality metrics with persistent history and trend tracking.
- review: Pre-landing PR review. Analyzes diff against main for SQL safety, LLM trust
boundary violations, conditional side effects, and other structural issues.
- security-guidance: Fetch and apply Seezo's organization security guidance before making a security-relevant design or implementation decision. Use during exploration, creation, revision, or review of a design, spec, PR, or code change involving authentication or authorization, tenant or data isolation, untrusted input or file handling, external or third-party calls, secrets or sensitive data, or an API boundary—even before a document or code exists.
- ship: Ship workflow: merge main, run tests, review diff, bump VERSION, update CHANGELOG, commit, push, create PR.
- subagentmaxxing: Spawn and control non-Claude coding-agent subagents (OpenAI Codex CLI and Cursor CLI — grok-4.5, composer-2.5, gpt-5.5) as one-prompt-in/one-answer-out subagents via the `subagent` CLI. Use when you want to offload a task to a Codex or Cursor subagent, get a second opinion from a different model family, run cross-model consensus, or fan one prompt out across several models in parallel. - Also for reaching Cursor-hosted Opus/Sonnet/Gemini, or any time you specifically want a non-Claude model instead of the native Agent tool.
- vpsmaxxing: Set up and manage a personal cloud VPS as a dedicated remote workbench for AI coding agents (Claude Code + OpenAI Codex). Covers provisioning (git/node/pnpm/docker/tmux), installing & authenticating the agents, a self-aware agent environment, Tailscale networking (SSH with no exposed ports), a tmux + cmux cockpit, localhost port tunneling, reverse VPS→laptop file access (including a no-admin path for managed/work laptops), one-time migration of your skills/memory/history/credentials, and automatic two-way sync. Use this when the user wants to run AI agents on a server, offload heavy or parallel agent work off their laptop, "set up a VPS for Claude Code / Codex", spin up a remote agent box, or keep an agent setup synced across machines.
- youtube-transcript: Extract transcripts from YouTube videos. Use when the user asks for a transcript, subtitles, or captions of a YouTube video and provides a YouTube URL (youtube.com/watch?v=, youtu.be/, or similar). Supports output with or without timestamps.
- dataviz: Use this skill whenever you are about to create ANY chart, graph, plot, dashboard, or data visualization, in ANY output medium — an HTML or React artifact, inline SVG, plotting code in any library (matplotlib, plotly, d3, Recharts, …), an image/PNG you will render and upload, or a chart shared into Slack. Read it BEFORE writing the first line of chart code, choosing chart colors, building a stat tile / meter / KPI row, or laying out a dashboard. Produces visualizations that read as one system — elegant, accessible, consistent in light and dark — using a brand-neutral placeholder palette you swap for your own. Teaches a design-system-agnostic method: a form heuristic, a color formula with a runnable validator, mark specs, and interaction rules. A validated default palette is documented in `references/palette.md` — swap that file's values for your brand's. Triggers on: "chart", "graph", "plot", "data viz", "visualization", "dashboard", "analytics", "visualize data", "categorical colors", "sequential / diverging palette", "stat tile", "sparkline", "heatmap", "legend", "axis", "tooltip", "chart colors", "color by series".
- update-config: Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
- keybindings-help: Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".
- code-review: Review the current diff, or a PR number/branch/path target, for correctness bugs and reuse/simplification/efficiency cleanups at the given effort level (low/medium: fewer, high-confidence findings; high→max: broader coverage, may include uncertain findings; ultra: deep multi-agent review in the cloud); with no level given, it reuses the level you typed last. Pass --comment to post findings as inline PR comments, or --fix to apply the findings to the working tree after the review. For ultra on a GitHub.com PR target, --post asks to post the finished review’s findings to the PR as a single comment from the user’s GitHub account (not a review; the launch dialog still confirms in interactive sessions, while non-interactive mode posts on the flag alone) and --no-post hides that option.
- simplify: Review the changed code for reuse, simplification, efficiency, and altitude cleanups, then apply the fixes. Quality only — it does not hunt for bugs; use /code-review for that.
- fewer-permission-prompts: Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project .claude/settings.json to reduce permission prompts.
- loop: Run a prompt or slash command on a recurring interval (e.g. /loop 5m /foo). Omit the interval to let the model self-pace. - When the user wants to set up a recurring task, poll for status, or run something repeatedly on an interval (e.g. "check the deploy every 5 minutes", "keep running /babysit-prs"). Do NOT invoke for one-off tasks.
- schedule: Create, update, list, or run scheduled cloud agents (routines) that execute on a cron schedule. - When the user wants to schedule a recurring cloud agent, set up automated tasks, create a cron job for Claude Code, or manage their scheduled agents/routines. Also use when the user wants a one-time scheduled run ("run this once at 3pm", "remind me to check X tomorrow").
- claude-api: Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.
TRIGGER — read BEFORE opening the target file; don't skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
- run: Launch and drive this project's app to see a change working. Use when asked to run, start, or screenshot the app, or to confirm a change works in the real app (not just tests). First looks for a project skill that already covers launching the app; otherwise falls back to built-in patterns per project type (CLI, server, TUI, Electron, browser-driven, library).
- init: Initialize a new CLAUDE.md file with codebase documentation
- security-review: Complete a security review of the pending changes on the current branch

I'll start the audit pass with the browser preflight.

-rwxr-xr-x. 1 ec2-user ec2-user 94587008 Aug  7 08:16 /home/ec2-user/.claude/skills/gstack/browse/dist/browse
/home/ec2-user/.claude/skills/gstack/browse/dist/browse: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=a9a0d18db4f98a86ad4778800c5fa46943f81b2e, not stripped

[browse] Starting server...
Navigated to https://example.com (200)
---TITLE---
Example Domain

Preflight passes: x86-64 ELF, smoke test returns `Example Domain`. Item 17 RESOLVED. Now sampling.

-rw-r--r--. 1 ec2-user ec2-user 10785656832 Aug 12 00:37 explorer/gtm_engine.sqlite
`gemini_spend WHERE id>437106`: est_inr=**₹12,617** (+32 vs 23:44Z), `grounded` count=**0** (of 76,627 rows, +165) — OK, no ungrounded-spend violation.

### Universe

Total leads: 3,557,169 (flat). Sellable (A+B+C): A=19,336 B=69,781 C=6,533 → **95,650 sellable** (+157 vs 23:44Z).

### Carry-over watch

Gap since last pass ~26min (23:44Z→00:10Z, normal cadence). rampt1a/b/c/d/probe/p_sweep frozen at DONE, no change. rampt1e +300 done/+0 verified (still single-vertical, <10k gate; finds-file line count still stale, not re-chased). rampt2a +1,150 done/+42 verified, alive at normal pace, per-vertical stays unreliable for the same structural reason (non-sequential done_ids) — found-share approximation shows no anomaly. No stop-loss trigger anywhere this pass. Enrich backlog fell 120→9 — enrichment caught up, no relaunch trigger. Spend +32 (flat pace), grounded=0. Sell_grade watermark advanced (41 rows), sellable universe +157. Disk not rechecked, ops watcher owns it.

## Flow tick 2026-08-12T00:37Z

### Discovery progress

| track | done/total | verified | rate | proj_universe |
|---|---|---|---|---|
| p_sweep (disc3) | 602,900/602,923 | 11,439 | 1.90% | 12,314 (DONE) |
| probe | 10,000/10,000 | 259 | 2.59% | 259 (DONE) |
| rampt1a | 266,100/266,140 | 9,891 | 3.72% | 39,099 (DONE) |
| rampt1b | 271,000/271,009 | 8,408 | 3.10% | 32,635 (DONE) |
| rampt1c | 176,500/176,535 | 6,003 | 3.40% | 35,473 (DONE) |
| rampt1d | 42,900/42,938 | 503 | 1.17% | 510 (DONE) |
| rampt1e (searxng recovery) | 7,600/31,473 | 21 | 0.28% | 138 |
| rampt2a | 26,350/371,917 | 741 | 2.81% | 19,977 |

probe/p_sweep/rampt1a/b/c/d unchanged since 00:10Z (frozen at DONE). rampt1e +250 done/+0 verified vs 00:10Z. rampt2a +1,100 done/+43 verified vs 00:10Z, alive at normal pace.

### Per-vertical hit rate

rampt1a/b/c/d unchanged since prior tick (frozen at DONE) — no re-join run this pass, no new state to report. No vertical crosses the 10k-processed / <0.5%-hit-rate stop-loss floor in any of these tracks (per last rigorous join at 22:21Z). Note: a composition-proportional estimate (done × `worklists_meta.json` vertical share) was tried this pass as a shortcut and produced an implausible near-zero rate for `unclassified` in every t1 track — this contradicts the 22:21Z exact-offset join (which found no vertical below 0.88% at ≥5k processed) and is consistent with `t1_weighted_ids.txt` being *weighted*, not proportional to raw composition. Estimate discarded, not used for any alert.

rampt2a per-vertical remains structurally unreliable (`rampt2a_finds.jsonl.done_ids` has 375,115 lines vs reported done=26,350 — not a clean prefix of `t2_ids.txt`, prefix-slice join still invalid). Found-share approximation over all 10,986 `rampt2a_finds.jsonl` records: business_services 2,295, logistics_trade 2,124, manufacturing 1,480, other_services 953, it_software 819, trading_ecommerce 743, healthcare 680, financial_services 415, real_estate 364, education 313, construction 266, agriculture 181, utilities 137, logistics_transport 87, mining 71, hospitality 53. Shares track t2 composition order, no anomaly.

rampt1e still single-vertical (it_software only, 7,600 processed / 21 finds = 0.28%), under the 10k gate regardless. `rampt1e_finds.jsonl` line count (80) still exceeds progress-file verified=21 — same stale/duplicate-lines artifact flagged since 22:21Z, not re-investigated (time-boxed).

### Conversion funnel (sqlite, `explorer/gtm_engine.sqlite`)

Ran incremental sell-grade refresh: 0 new rows graded this pass (watermark unchanged at 2026-08-12T00:30:04Z — an intervening pass already advanced it). Global grade counts: A=19,336 B=69,784 C=6,533 R=21,679 P=2,583,140 D1=23,507 D2=264,477 D3=3,904 S=211,013 X=318,209 (total graded 3,521,582).

| stage | count | of stamped |
|---|---|---|
| psweep_domain_stamp=1 (stamped) | 60,481 (+41 vs 00:10Z) | 100% |
| → enriched (in lead_gemini_enrichment) | 60,434 (+3) | 99.92% (backlog **47**, up from 9) |
| → identity_status='verified_website' | 59,353 (+3) | 98.14% |

sell_grade distribution of stamped+verified leads: A=11,524 B=44,321 C=2,858 P=136 X=505 R=6 (sum 59,350, close to verified=59,353).

Enrich backlog rose to 47 (from 9) — 41 new domain stamps landed this pass, enrichment has not fully caught up yet. Still well below the 150-lead auto-relaunch trigger.

### Spend safety

`gemini_spend WHERE id>437106`: est_inr=**₹12,617** (flat vs 00:10Z), `grounded` count=**0** (of 76,631 rows, +4) — OK, no ungrounded-spend violation.

### Universe

Total leads: 3,557,169 (flat). Sellable (A+B+C): A=19,336 B=69,784 C=6,533 → **95,653 sellable** (+3 vs 00:10Z).

### Carry-over watch

Gap since last pass ~27min (00:10Z→00:37Z, normal cadence). rampt1a/b/c/d/probe/p_sweep frozen at DONE, no change. rampt1e +250 done/+0 verified (still single-vertical, <10k gate; finds-file line count still stale, not re-chased). rampt2a +1,100 done/+43 verified, alive at normal pace, per-vertical stays unreliable for the same structural reason (non-sequential done_ids) — found-share approximation shows no anomaly. No stop-loss trigger anywhere this pass (composition-proportional shortcut tried and discarded as unreliable — see per-vertical section). Enrich backlog rose 9→47 (41 new stamps this pass, enrichment lagging slightly) — well below the 150 auto-relaunch trigger. Spend flat, grounded=0. Sell_grade watermark flat (already advanced by an intervening pass), sellable universe +3. Disk not rechecked, ops watcher owns it.

24912:validity 10/10 (id-type-aware); 0 dup CINs. Aggregate drift 0.00%. Domains independently fetched: **4**.
24921:5. ~~Playwright Chromium runtime missing~~ — CLOSED.
24934:11. ~~STATS.md sellable sum off by 1,000~~ — CLOSED.
24954:## 2026-08-11T19:01Z — accuracy pass
25010:### D. Aggregate cross-check — **verified_website count**
25029:Registry validity 10/10 (id-type-aware); 0 dup CINs. Aggregate drift +18.3% (growth).
25039:5. ~~Playwright Chromium runtime missing~~ — CLOSED.
25050:11. ~~STATS.md sellable sum off by 1,000~~ — CLOSED.
25053:13. **Cross-border / no-`state_match` namesake risk — escalated MEDIUM→HIGH, now CONFIRMED REALISED.**
25071:## Accuracy pass — 2026-08-11 (16th pass)
25127:### D. Aggregate cross-check — `verified_website` count (psweep-scoped)
25148:5. ~~Playwright Chromium runtime missing~~ — CLOSED.
25159:11. ~~STATS.md sellable sum off by 1,000~~ — CLOSED.
25178:## Accuracy pass — 2026-08-11 20:2xZ
25239:### D. Aggregate cross-check — `verified_website` count (rotation)
25248:0 duplicate CINs. Aggregate D exact-matched STATS.md.
25258:## 2026-08-11T21:09Z — accuracy pass
25324:  `F01937` METSA BOARD SINGAPORE PTE. LTD., `F02369` BUSINESS OBJECTS ASIA PACIFIC PTE LTD) — also
25330:### D. Aggregate cross-check — `verified_website` count (rotation)
25351:## Accuracy pass — 2026-08-11T21:55Z
25358:**Standing item 17 (browser architecture mismatch) — RESOLVED.** The binary is and was the correct
25432:### D. Aggregate cross-check — post-2016 count (rotation)
25457:## Accuracy pass — 2026-08-11 22:40Z
25462:- **Standing item 17 (browser architecture mismatch): RESOLVED.** Not carried forward.
25531:### D. Aggregate cross-check — total leads (rotation: post-2016 → total leads)
25554:## 2026-08-11T23:22Z — accuracy pass
25559:- **Standing item 17 (browser architecture mismatch): RESOLVED.** Not carried forward.
25623:### D. Aggregate cross-check — `verified_website` count (rotation: total leads → verified_website)
25646:## 2026-08-12T00:05Z — accuracy pass
25716:### D. Aggregate cross-check — post-2016 count (rotation: verified_website → post-2016)
=== size ===
25740 reports/ops_ramp/AUDIT.md

## 2026-08-12T00:05Z — accuracy pass

### Browser preflight
- `file \$B` → **ELF 64-bit LSB executable, x86-64**, GNU/Linux 3.2.0 — correct build for this box.
- Smoke: `goto https://example.com` → **200**; `js document.title` → **`Example Domain`**. **PASS.**
- **Standing item 17 (browser architecture mismatch): RESOLVED** — verified on current commands this pass,
  not carried forward.
- **4 sampled domains independently fetched live** this pass (expertglobal.in, phoennix.in, rvtglobal.com,
  eonvertex.in), ~35s total.

### A. Discovered domains — 12 sampled (`psweep_domain_stamp=1`, enriched)
**11 correct / 0 suspicious-unresolved / 1 clearly wrong.**

**CLEARLY WRONG — `2165257` `EXPERT GLOBAL CORPORATE ADVISORS PRIVATE LIMITED` → `expertglobal.in`**
(`identity_status=verified_website`, `verification_confidence=0.99`). Live fetch returns
*"Expert Global Consultants: SEBI Registered Merchant Banking"*, body header
`EXPERT GLOBAL CONSULTANTS PRIVATE LIMITED` — a **different registered entity**, not the sampled company.
Corroborating evidence this is a mis-assignment, not a naming variant:
- The stored `verification_evidence` for `2165257` contains **no `statutory_name_match` and no `cin_match`**
  — only `page_name_tokens:expert,global,corporate,advisors`. Every other correct row in this sample carries
  a `statutory_name_match`. Confidence 0.99 is unwarranted on token overlap alone.
- The generated `business_summary` for `2165257` literally describes *"Expert Global **Consultants** Private
  Limited … SEBI-registered Category-I Merchant Banker"* — the enricher summarised the **wrong company** and
  the mismatch was never caught.
- `expertglobal.in` is attached to **4 leads**: `982913` and `2319446` (both genuinely
  `EXPERT GLOBAL CONSULTANTS PRIVATE LIMITED`, stamped), `2165257` (wrong, stamped), and `1225824`
  (`Fedex Securities Private Limited`, **unstamped** — unrelated entity, would be clearly wrong if stamped).
  Classic generic/short-domain namesake collision on the common tokens "expert"+"global".

Live checks on the other three fetched domains all **confirm correct**:
- `2677373` PHOENNIX SPICES INDIA → `phoennix.in` → title *"Phoennix Spices India Pvt Ltd."*, Bengaluru
  spices copy. Correct (was flagged only because the summary was unusually thin).
- `2825629` RVT GLOBAL INFRASTRUCTURE → `rvtglobal.com` → *"Real Estate & Investment Ventures | RVT Global"*.
  Correct, matches `inferred_vertical=real_estate`.
- `1804977` EON VERTEX EDUSYSTEM → `eonvertex.in` → *"Eon Vertex"*, courses/careers nav,
  `contact@eonvertex.in`. Correct, matches `inferred_vertical=education`.

Remaining 8 (`161037` vapiproducts.com · `2873628` alluringindiadestination.com · `3139844`
siddhanjanimedia.com · `3176447` viswamegahealth.com · `2858181` thscybersecure.com · `2360947`
nexgeninfraprojects.com · `345180` narayanmarinetech.com · `1972916` bytestribe.com) all carry
`statutory_name_match` (two also `cin_match` with a verified CIN), distinctive non-generic domain tokens,
`is_directory=0`, and coherent summaries. No parking/marketplace/directory pages, no aggregator domains,
no evidence-omits-company cases in this sample.

### B. Sell-grade sanity — 10 sampled A/B + global sweep
**10/10 sampled pass** on identity (`identity_status='verified_website'` for all ten).
- 3 A-grades (`2656665`, `1387007`, `1050047`) all have `payment_signal='payment_intent'` → hard payment
  signal present. **A rule satisfied.**
- 7 B-grades: 4 qualify via payment signal; 3 (`1499842`, `2016751`, `1797969`) have `payment_signal='none'`
  and `reachable` 0/NULL, but all are `contactability='contact_enriched'`.
- **URGENT — 1 global grade-integrity break** (full-table sweep, not just the sample):
  `885035` `OUTWORKS SOLUTIONS PRIVATE LIMITED` is graded **B** with
  `identity_status='verified_entity_no_website'` and empty `domain`. Its own grade reasons record the fact
  (`"identity:verified_entity_no_website"`), so the grader admitted a non-`verified_website` identity into B.
  Scale is tiny — **1 of 88,968 A+B rows (0.0011%)** — but it is a definitional break, so it is escalated
  per the audit rule. Every other A/B row in the table has `identity_status='verified_website'`.
- Recurring **check-definition drift, unchanged from prior passes, not a data defect:** the implemented B
  rule reads `lead_gemini_enrichment.contactability`, not `leads.reachable`. Scored against the implemented
  definition, as previously agreed.

### C. Registry-ingest integrity — 10 sampled `mca_current_2026`
**10/10 pass.** 9 `company_id_type='cin'` — all **21 chars**, all start `U`, well-formed — and 1
`llpin` (`ACS-5046`, correct `XXX-9999` form); entity-type-aware rule applied. All `state` values are real
state names (Delhi, Uttar Pradesh ×2, Karnataka ×2, Maharashtra ×2, Bihar, Telangana, Kerala) — none
numeric, none blank, none a RoC code. All `founded_year` in **2018–2025**, inside 1850–2027. All
`legal_name` non-empty and untruncated.
- **Duplicate CINs: 0** (`COUNT(*)-COUNT(DISTINCT cin)` = 0). No URGENT.
- Expected divergence, not scored as failure: `2865829` (CIN `U24290**HR**2021…`) carries `state='Delhi'`
  — RoC-Delhi covers Haryana. Same known pattern noted in the prior pass; not a bad write.

### D. Aggregate cross-check — post-2016 count (rotation: verified_website → post-2016)
- **`founded_year>=2016`: 1,795,469** = **50.47%** of the 3,557,169 total. STATS.md does **not** publish a
  post-2016 line, so there is no direct prior baseline for this metric — recording **1,795,469 as the
  baseline** for future passes. Sanity holds: it is a plausible ~half of a registry-heavy universe, and
  1,555,968 leads have NULL/blank `founded_year`, so the non-null cohort is overwhelmingly post-2016 as
  expected for `mca_current_2026`. **PASS, no collapse.**
- Secondary exact checks against STATS 23:44Z: total leads **3,557,169** ✓ (flat) · A **19,315** ✓ ·
  B **69,653** ✓ · C **6,525** ✓ (sellable **95,493** ✓) · D1 23,506 · D2 264,477 · D3 3,904 · P 2,583,301
  · R 21,679 · S 211,013 · X 318,209 — all flat, no grading activity since.
- `verified_website` (psweep-stamped scope): **59,272** vs STATS **59,193** → **+79 (+0.13%)**, growth not
  drop. Stamped total **60,440** vs STATS 60,393 (+47). Scope discipline held per the standing note —
  the unscoped `lead_gemini_enrichment` figure is a different metric and is not what STATS tracks.

### Verdict
**FAIL (one URGENT) — 1 grade-integrity break escalated, plus 1 clearly-wrong domain.** Domain accuracy
11/12; below the >3-of-12 URGENT bar, so the domain miss is logged not escalated. 0 duplicate CINs, 0
aggregate collapse, registry ingest clean, browser preflight passed and item 17 closed. The `885035` B-grade
break goes to ALERTS.md as URGENT per the standing rule despite its 0.0011% scale — a human should decide
whether it is a one-off grader admission or a rule gap.

**Running accuracy estimate:** domain accuracy this pass **11/12 (91.7%)**, all 12 resolved (4 live-fetched,
8 evidence-verified) — no unverifiable rows this pass, unlike the 23:xxZ pass. Running estimate across
passes **~98.0%** (down from ~98.3%). Confirmed wrong domains to date now **4** — `2267875`, `2619204`,
`2741296`, and new this pass **`2165257`**. Standing open item from prior pass (stamped `verified_website`
domains are never liveness-re-checked) remains open and unaddressed.

Exit code 1
Traceback (most recent call last):
  File "/tmp/aud_a.py", line 11, in <module>
    rows=c.execute(q).fetchall()
         ~~~~~~~~~^^^
sqlite3.OperationalError: no such column: l.lead_id

== leads
['id', 'legal_name', 'domain', 'vertical', 'category', 'subcategory', 'state', 'source', 'sources_json', 'action', 'path', 'quality', 'sell_score', 'enrich_score', 'market_fit', 'contact_combo', 'has_domain', 'has_email', 'has_phone', 'corporate_email', 'free_email', 'has_cin', 'has_gstin', 'has_mcc', 'active_registry', 'inactive_or_risky', 'sf_owned', 'existing_rzp', 'dnc', 'dedup_key', 'universe_dedup_key', 'cin', 'gstin', 'rera_no', 'aicte_code', 'l4_mcc', 'founded_year', 'legacy_score', 'legacy_bucket', 'legacy_action', 'legacy_path', 'legacy_sell_score', 'legacy_enrich_score', 'rzp_outcome_score', 'sales_readiness_score', 'enrichment_priority_score', 'gtm_action', 'gtm_route', 'score_reasons', 'needed_fields', 'rzp_baseline_cohort', 'payment_signals', 'score_breakdown', 'reasons', 'contacts', 'signals', 'registered_address', 'raw_ref', 'source_record_id', 'first_seen_at', 'last_seen_at', 'raw_fields', 'search_text', 'suppression_status', 'suppression_checked', 'registry_company_status', 'nic_code', 'registry_date_of_registration', 'company_age_years', 'registry_source', 'reachable', 'psweep_domain_stamp', 'vertical_source', 'company_id_type']
== lead_gemini_enrichment
['lead_id', 'status', 'mode', 'attempts', 'official_domain', 'candidate_domain', 'domain_source', 'domain_confidence', 'domain_evidence', 'verification_status', 'verification_confidence', 'verification_evidence', 'verification_json', 'is_directory', 'crawl_status', 'crawl_url', 'fetched_pages', 'profile_quality_score', 'pg_propensity_score', 'score_delta', 'inferred_vertical', 'inferred_category', 'business_summary', 'products', 'payment_signals', 'payment_gateways', 'platform', 'has_razorpay', 'has_competitor_pg', 'has_cart', 'has_checkout', 'has_payment_link', 'has_subscription', 'emails', 'phones', 'whatsapp_numbers', 'socials', 'people', 'profile_json', 'raw_json', 'decision', 'run_id', 'updated_at', 'identity_status', 'contactability', 'payment_signal', 'activeness', 'has_international_wallet']
== lead_sell_grade
['lead_id', 'sell_grade', 'sell_rank', 'reasons', 'computed_at']

{"id": 2042085, "legal_name": "COSMELLA INFINITY PRIVATE LIMITED", "domain": "cosmella.in", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:cosmella,infinity; domain_tokens:cosmella; statutory_name_match:Cosmella Infinity Private Limited; source:existing_domain", "summary": "Cosmella Infinity Private Limited is a leading innovator in aerosol and perfume manufacturing, offering end-to-end services from fragrance creation and development to manufacturing, packaging, and brand launch support.", "vertical": "manufacturing", "is_directory": 0, "state": "Gujarat", "cin": "U24299GJ2020PTC112997"}
{"id": 2966009, "legal_name": "NANOMEDZ HEALTH SCIENCES PRIVATE LIMITED", "domain": "nanomedz.com", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:nanomedz,health,sciences; domain_tokens:nanomedz; statutory_name_match:Nanomedz Health Sciences Private Limited; source:existing_domain", "summary": "Nanomedz Health Sciences Private Limited is a startup focused on bringing Dr. Somenath Mitra's homeopathic research and practice results to a global population through clinic services, nanoceuticals, nutraceuticals, diagnostics, drug discov", "vertical": "healthcare", "is_directory": 0, "state": "West Bengal", "cin": "U74994WB2017PTC223418"}
{"id": 2506665, "legal_name": "MERIDIAN MULTIVENTURES PRIVATE LIMITED", "domain": "meridianmultiventures.com", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:meridian,multiventures; domain_tokens:meridian,multiventures; cin_match; statutory_verified:cin:U56100UP2026PTC245658; statutory_name_match:Meridian Multiventures Private Limited; state_match; source:existing_domain", "summary": "Meridian Multiventures Pvt. Ltd. is a diversified business group operating across E-Commerce, Food & Beverage, Travel, Digital Media and Future Technologies, building and growing businesses that create long-term value through innovation, qu", "vertical": "unknown", "is_directory": 0, "state": "Uttar Pradesh", "cin": "U56100UP2026PTC245658"}
{"id": 2685877, "legal_name": "TRADEHIGH INDIA PRIVATE LIMITED", "domain": "tradehigh.co.in", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:tradehigh; domain_tokens:tradehigh; cin_match; statutory_verified:cin:U85499KA2025PTC208332; state_match; source:existing_domain", "summary": "TradeHigh is an EdTech company providing share market education, focusing on stock market concepts, options, derivatives, and risk management to individuals from beginners to experienced learners.", "vertical": "education", "is_directory": 0, "state": "Karnataka", "cin": "U85499KA2025PTC208332"}
{"id": 1066257, "legal_name": "ESCV CONSULTING SERVICES PRIVATE LIMITED", "domain": "escvconsulting.com", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:escv,consulting; domain_tokens:escv,consulting; statutory_name_match:eSCV Consulting Services Pvt. Ltd; state_match; source:existing_domain", "summary": "eSCV Consulting provides finance and payroll accounting outsourcing services, including Virtual CFO, process advisory, and GST compliance services in India.", "vertical": "business_services", "is_directory": 0, "state": "Delhi", "cin": "U74899DL2006PTC144949"}
{"id": 3013729, "legal_name": "GROW 2 DIGITAL PRIVATE LIMITED", "domain": "grow2digital.in", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:grow,digital; domain_tokens:grow,digital; cin_match; statutory_name_match:GROW 2 DIGITAL PRIVATE LIMITED; state_match; source:existing_domain", "summary": "Grow 2 Digital provides professional digital solutions including advertising, custom software, website development, and content creation to help businesses achieve measurable growth.", "vertical": "it_software", "is_directory": 0, "state": "West Bengal", "cin": "U62090WR2026PTC292761"}
{"id": 2580538, "legal_name": "ARRZION DATA SYSTEMS PRIVATE LIMITED", "domain": "arrzion.com", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:arrzion,data,systems; domain_tokens:arrzion; statutory_name_match:Arrzion Data Systems Private Limited; state_match; source:existing_domain", "summary": "Arrzion Data Systems provides DevOps engineering, web and application development, and managed cloud services to help businesses simplify IT and improve their bottom line.", "vertical": "it_software", "is_directory": 0, "state": "Karnataka", "cin": "U74999KA2019PTC121122"}
{"id": 3238269, "legal_name": "RUDRAANGI AGROTECH PRIVATE LIMITED", "domain": "rudraangiagrotech.com", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:rudraangi,agrotech; domain_tokens:rudraangi,agrotech; statutory_name_match:RUDRAANGI AGROTECH PRIVATE LIMITED; state_match; source:existing_domain", "summary": "Rudraangi Agrotech Private Limited manufactures, supplies, exports, and distributes a range of agricultural vegetable and crop seeds in India.", "vertical": "agriculture", "is_directory": 0, "state": "Telangana", "cin": "U01100TG2021PTC158204"}
{"id": 1725197, "legal_name": "FLEXIBLE SOFTWARES PRIVATE LIMITED", "domain": "flexiblesoftwares.com", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:flexible,softwares; domain_tokens:flexible,softwares; statutory_name_match:Flexible Softwares Pvt. Ltd; state_match; source:existing_domain", "summary": "Flexible Softwares Private Limited is an IT solutions and services company based in Pune, India, specializing in digital technology services and consulting for various industries.", "vertical": "it_software", "is_directory": 0, "state": "Maharashtra", "cin": "U72900PN2020PTC192830"}
{"id": 357925, "legal_name": "SIVA VALLI VILAS JEWELLERS PRIVATE LIMITED", "domain": "sivavallivilas.com", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:siva,valli,vilas,jewellers; domain_tokens:siva,valli,vilas; state_match; source:existing_domain", "summary": "Siva Valli Vilas Jewellers is a fourth-generation family business established in 1929, specializing in gold, silver, and diamond jewellery, with showrooms in Puducherry, Cuddalore, Villupuram, and Karaikal.", "vertical": "trading_ecommerce", "is_directory": 0, "state": "Puducherry", "cin": "U36912PY2012PTC002686"}
{"id": 973435, "legal_name": "VIRA ENTERTAINMENT PRIVATE LIMITED", "domain": "vira-entertainment.com", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:vira,entertainment; domain_tokens:vira,entertainment; statutory_name_match:91 Battersea Park Road London SW8 4DU England Contact Us VIR; source:existing_domain", "summary": "VIRA ENTERTAINMENT LIMITED provides professional IT solutions, including server administration, website development, and web portal management, to help companies design and optimize their information technology service activities.", "vertical": "it_software", "is_directory": 0, "state": "Uttar Pradesh", "cin": "U74120UP2016PTC076192"}
{"id": 2215131, "legal_name": "R2R GLOBAL STARTUP & BUSINESS SUPPORT PRIVATE LIMITED", "domain": "r2rglobalstartup.com", "identity_status": "verified_website", "conf": 0.99, "evidence": "page_name_tokens:r2r,global,startup,business,support; domain_tokens:r2r,global,startup; cin_match; statutory_verified:cin:U74999DL2022PTC403201; state_match; source:existing_domain", "summary": "R2R Global Startup provides innovative solutions and advisory services for entrepreneurs, startups, MSMEs, and professionals to thrive in a competitive market.", "vertical": "business_services", "is_directory": 0, "state": "Delhi", "cin": "U74999DL2022PTC403201"}

Suspicious rows spotted. Browsing the top candidates now.

=== vira-entertainment.com ===
Navigated to https://vira-entertainment.com (200)
VIRA ENTERTAINMENT LIMITED - Professional IT solution || VIRA ENTERTAINMENT LIMITED Home About US Services Contact Professional IT solution Helping companies design the information technology service activities. About Us About US We will help you with a complete server administration, web sites development, manage your web portals and coding so that you w
=== sivavallivilas.com ===
Navigated to https://sivavallivilas.com (200)
Siva Valli Vilas – Gold, Silver & Diamond Jewellery Shop || Today Gold Rate PY: ₹14220 CUD: ₹13980 VPM: ₹14220 KKL: ₹14250 Today Silver Rate PY: ₹254 CUD: ₹250 VPM: ₹260 KKL: ₹260 HOME ABOUT US GOLD SCHEMES TESTIMONIALS BLOG CONTACT US SHOP ONLINE 0Cart 0Wishlist Trending collection Visit our shop to see amazing creations from our desiginers Sold Out Compare
=== grow2digital.in ===
Navigated to https://grow2digital.in (200)
GROW 2 DIGITAL PRIVATE LIMITED | Digital Solutions for Business Growth || Home About Services Work Contact Support Start a Project DIGITAL SOLUTIONS COMPANY · HALDIA, INDIA Shape Your Digital Future Performance marketing, custom software & stunning websites — all under one roof, built for measurable growth. Start Your Project Explore Services Scroll to explore Digital Mar

Navigated to https://vira-entertainment.com (200)
ls and coding so that you will only be managing your own business. We have been setting up information technology service activities for customers each and every day for almost 20 years; we optimise, update, monitor, backup and protect from security threats. Services WEB DESIGN DEVELOPMENT We offer web developers. Code fully owned by our clients. CMS SUPPORT & CODING Our staff will respond within an hour and set up a call to work on your issues. SERVERS ADMINISTRATION Experienced sysadmin team 24/7. We handle full server administration so you can focus on business. Contact Address: 91 Battersea Park Road, London SW8 4DU, England VIRA ENTERTAINMENT LIMITED Copyright © 2023 All rights reserved

Confirmed one clearly-wrong domain. Now sections B, C, D.

### B sample
[2205067, "B", "REGENT RESEARCH WRITING PRIVATE LIMITED", "regentresearch.com", "verified_website", "payment_intent", "contact_enriched", null]
[1340370, "B", "Go4explore", "go4explore.com", "verified_website", "payment_intent", "contact_enriched", 1]
[1581537, "B", "KOWID EDTECH SOLUTIONS PRIVATE LIMITED", "kowid.com", "verified_website", "none", "contact_enriched", null]
[1503698, "B", "Shri Ram College Of Pharmacy Village Rambha Indri Road Karnal Haryana", "", "verified_website", "none", "contact_enriched", 0]
[1759808, "B", "MAYWISE PRIVATE LIMITED", "maywise.in", "verified_website", "payment_intent", "none", null]
[2436598, "B", "DEVEFFICA PRIVATE LIMITED", "deveffica.com", "verified_website", "payment_intent", "contact_enriched", null]
[939347, "B", "SOFTSERV SOLUTIONS PRIVATE LIMITED", "softserv.in", "verified_website", "payment_intent", "none", 0]
[1231198, "B", "Lok Jagruti Kendra University", "ljku.edu.in", "verified_website", "none", "contact_enriched", 1]
[1486948, "A", "SAPANA POLYWEAVE PRIVATE LIMITED", "sapanamats.com", "verified_website", "payment_intent", "contact_enriched", 1]
[1223164, "B", "BRIGHT STAR", "bright-star.co.in", "verified_website", "payment_intent", "contact_enriched", 1]
### B global integrity sweep (A/B without verified_website)
('B', 'verified_website', 69783)
('A', 'verified_website', 19336)
('B', 'verified_entity_no_website', 1)
### B A-grade without hard payment signal
A_no_payment= (1,)
### C sample
[3161382, "U01222TG2010PTC068962", "cin", "Telangana", "2010", "KRISHIKA FARMS PRIVATE LIMITED"]
[2134413, "U74110DL1999PTC101291", "cin", "Delhi", "1999", "ANANDMALA SKILLS ACADEMY PRIVATE LIMITED"]
[2917878, "U52240WB2026PTC288055", "cin", "West Bengal", "2026", "ANIRBAN TRANSPORT SERVICE PRIVATE LIMITED"]
[2278304, "U70109DL2019PLC351424", "cin", "Delhi", "2019", "INDIABULLS URBANHEIGHTS LIMITED"]
[2298763, "U62099DL2025PTC458805", "cin", "Delhi", "2025", "BILLIONAIRE PARTNERS PRIVATE LIMITED"]
[3198463, "U13119TS2026PTC211947", "cin", "Telangana", "2026", "ZAVINOS CLOTHING PRIVATE LIMITED"]
[1996179, "U09101GJ2023PTC144802", "cin", "Gujarat", "2023", "BVISHAL OFFSHORE PRIVATE LIMITED"]
[2254560, "U63000DL2010PTC208502", "cin", "Delhi", "2010", "PRUDENTIAL CARGO SERVICES PRIVATE LIMITED"]
[2289863, "U74999DL2017PTC325252", "cin", "Delhi", "2017", "BIZERK PRIVATE LIMITED"]
[3284753, "U92100MP2016PTC035182", "cin", "Madhya Pradesh", "2016", "PANOROMIC ENTERTAINMENT PRIVATE LIMITED"]
### C dup cins
dupCIN= (0,)
### D aggregates
total= (3557169,)
('A', 19336)
('B', 69784)
('C', 6533)
('D1', 23507)
('D2', 264477)
('D3', 3904)
('P', 2583140)
('R', 21679)
('S', 211013)
('X', 318209)

[109752, "ITSY BITSY PRIVATE LIMITED", "itsybitsy.in", "verified_website", "none", "contact_enriched", 0, 0, 1, "[\"identity:verified_website\",\"contact:contact_enriched\",\"vconf:0.99\",\"pg_depth:56\",\"outcome:67.9\"]"]
--- the B break ---
[885035, "OUTWORKS SOLUTIONS PRIVATE LIMITED", "", "verified_entity_no_website", "payment_intent", "[\"identity:verified_entity_no_website\",\"payment:payment_intent\",\"contact:contact_enriched\",\"vconf:0.97\",\"outcome:62.0\"]"]
--- CIN len/prefix anomalies in mca_current_2026 (global) ---
(0,)
--- WR state-code CINs ---
(1852,)

WR by substr7: (2269,)
top state codes:
  ('DL', 404529)
  ('MH', 391467)
  ('WB', 242853)
  ('UP', 213936)
  ('KA', 185565)
  ('GJ', 155651)
  ('TN', 155487)
  ('PN', 124604)
  ('TG', 121091)
  ('HR', 99879)
  ('RJ', 97795)
  ('KL', 86609)
  ('BR', 66321)
  ('MP', 66194)
  ('AP', 50405)
  ('TS', 45978)
  ('PB', 43464)
  ('TZ', 40417)
  ('OR', 31556)
  ('AS', 20609)
  ('CH', 16311)
  ('OD', 12063)
  ('HP', 9963)
  ('JH', 7530)
  ('CT', 5904)
WR rows sample:
  (2914643, 'U01122WR2026PTC292290', 'West Bengal', '2026', 'mca_current_2026', 'MAHADEV CARBON INTEGRATED FARMING PRIVATE LIMITED')
  (2914844, 'U01100WR2022PTC294376', 'West Bengal', '2022', 'mca_current_2026', 'DUCORP INDIA PRIVATE LIMITED')
  (2915146, 'U74909WR2026OPC294227', 'West Bengal', '2026', 'mca_current_2026', 'ERGONOMICS INTELLIGENCE INDIA (OPC) PRIVATE LIMITED')
  (2915354, 'U35105WR2026PTC293884', 'West Bengal', '2026', 'mca_current_2026', 'NEW HIGHT POWER GROW PRIVATE LIMITED')
  (2915401, 'U41002WR2026OPC293414', 'West Bengal', '2026', 'mca_current_2026', 'RIGO SHERPA CONSTRUCTION (OPC) PRIVATE LIMITED')
WR year dist:
  ('2026', 2257)
  ('2022', 2)
  ('2012', 2)
  ('2023', 1)
  ('2014', 1)
WR state dist:
  ('West Bengal', 2269)

2026-08-12T00:49Z
**WARN — root filesystem at 90% (54G/60G used, 6.3G free)**
Threshold is 85%. Largest consumer is `explorer/` at 11G (pipeline DB + artifacts).
Docker reports 0B reclaimable, so there is no cheap cleanup. Per hard rules the
watcher deletes nothing — needs a human/main-agent decision on what (if anything)
to archive off-box. At current growth the ramp still has headroom, but a stall
becomes likely if free space drops under ~2G.

**INFO — SearXNG engine degradation (both instances)**
`:8899` (agent) and `:8888` (project) both return HTTP 200, but most engines are
suspended: brave/wikipedia "too many requests", duckduckgo "timeout",
google/startpage "CAPTCHA". Result counts are thin (8 and 3 for a control query).
Containers are healthy (up 36h) so a restart is not indicated — this is upstream
rate-limiting. Relevant because `w2-rampt1e` runs with `searxng=ON`.

**INFO — w2-rampt1e yield running low**
rampt1e: done=7550/31473, verified=21 (0.28%), proj_universe=138.
rampt2a (searxng=OFF): done=26150/371917, verified=730 (2.79%).
Different universes so not strictly comparable, but the 0.28% rate on the
SearXNG-dependent shard is consistent with the engine degradation above. Flagging
for the main agent to decide whether rampt1e is worth its slot; watcher took no
action.

**OK** — spend guard `COUNT(*) FILTER (WHERE grounded) FROM gemini_spend WHERE id>437106` = 0.
Locks `/tmp/w2rampt1e.lock` and `/tmp/w2rampt2a.lock` held >2h but owning processes
have fresh output — not hung, left alone.

gitsync[audit]: pushed 33cae3670 -> agent/audit — chore(audit): accuracy pass 00:49

Audit pass complete — published as `33cae3670` on `agent/audit`.

**Browser preflight: PASS.** `file \$B` → ELF 64-bit x86-64 (correct build); `goto https://example.com` → 200, title `Example Domain`. **Standing item 17 RESOLVED, not carried forward.** 3 sampled domains independently fetched live.

**A. Discovered domains (12 sampled): 11 correct / 0 unresolved / 1 clearly wrong.**
`973435` VIRA ENTERTAINMENT PRIVATE LIMITED (UP, CIN `U74120UP2016PTC076192`) → `vira-entertainment.com`, which live-fetches as **VIRA ENTERTAINMENT LIMITED, 91 Battersea Park Road, London** — a UK entity. The mechanism matters more than the row: its stored `statutory_name_match` contains the scraped *address blob* (`"91 Battersea Park Road London SW8 4DU England Contact Us VIR"`) instead of a company name, so the name-match check passed on garbage and confidence hit 0.99. That parser defect could be inflating confidence elsewhere. Live checks confirmed `sivavallivilas.com` and `grow2digital.in` correct.

**B. Sell-grade: 10/10 sampled pass, but two URGENT breaks in the global sweep.**
- **NEW:** `109752` ITSY BITSY PRIVATE LIMITED graded **A** with `payment_signal='none'` and no payment token in its reasons — promoted on `pg_depth`/`outcome` alone, bypassing the hard-payment-signal rule for A.
- **CARRIED, unfixed:** `885035` still graded **B** with `verified_entity_no_website`, unchanged since 00:05Z.

Scale is tiny (0.005% and 0.001%), but two simultaneous unremediated grade-integrity breaks is the real signal.

**C. Registry: 10/10 pass, 0 duplicate CINs.** Global check: 0 malformed CINs in the whole `mca_current_2026` cohort. One new MEDIUM observation — 2,269 CINs carry state code `WR` (not a standard RoC code), 2,257 of them in the 2026 cohort. Not scored as failure: all 2,269 map correctly to `state='West Bengal'`, so nothing downstream is mis-stated. Likely a source-side quirk, flagged for human confirmation.

**D. Sellable A+B+C = 95,653** vs STATS 00:37Z **95,653** — exact match, 0.00% drift. Every published grade bucket reconciles exactly.

**Verdict: FAIL (two URGENT).** Running domain accuracy **~97.8%** (this pass 91.7%, second consecutive 11/12); confirmed wrong domains to date now 5.

You are the flow/stats watcher for the marketing-outbound enrichment ramp (repo: /home/ec2-user/Projects/marketing-outbound — cd there first). One pass per invocation; a loop re-runs you every ~25 min. Your job: measure the pipeline end-to-end and publish stats so nothing moves invisibly. You do NOT restart processes (the ops watcher owns that).

COMPUTE each pass (python via .venv/bin/python, sqlite read-only URIs):
1. Discovery: for each of runs/wave2/p_sweep_finds.jsonl.progress, runs/ramp/probe_finds.jsonl.progress, runs/ramp/rampt1a/b/c progress files that exist — capture the progress line (done/total, verified, %).
2. Per-vertical hit rate for the ramp tracks: verticals of found lead_ids (finds jsonl "vertical" field) vs the stratified composition in runs/ramp/worklists_meta.json. Only meaningful once a track has processed >5k; note sample size.
3. Conversion: count leads WHERE psweep_domain_stamp=1 (stamped), of those enriched (EXISTS in lead_gemini_enrichment), of those identity_status='verified_website', and their sell_grade distribution via lead_sell_grade.
4. Spend: SELECT ROUND(SUM(est_inr)),COUNT(*) FILTER (WHERE grounded) FROM gemini_spend WHERE id>437106 (postgres via docker exec marketing-outbound-postgres psql -U outbound -d lead_universe). grounded MUST be 0 — if not, URGENT alert (ops watcher kills spend; you just flag loudly).
5. Universe: total leads, sellable A+B+C from lead_sell_grade.

PUBLISH:
- Append a timestamped markdown block (compact table) to reports/ops_ramp/STATS.md with all the above.
- Refresh sell-grade incrementally first so numbers are current: .venv/bin/python -m gtm_engine.sell_grade --db explorer/gtm_engine.sqlite (incremental is cheap; skip if another sell_grade process is running).
- STOP-LOSS WATCH: once any vertical within a ramp track has >=10k processed and its hit rate is <0.5%, append a recommendation block to reports/ops_ramp/ALERTS.md (prefix WARN, say which vertical/tier and the measured rate). Do not act on it yourself.
- Publish to GitHub (source of truth) with the shared helper — it serialises concurrent agents, rebases and pushes:
  bash runs/ramp/gitsync.sh flow "chore(flow): stats tick <UTC-HH:MM>" reports/ops_ramp/STATS.md
  Never git push directly; never add anything outside reports/ops_ramp.

Keep each pass under ~3 minutes of work. mkdir -p reports/ops_ramp if missing.

You are the flow/stats watcher for the marketing-outbound enrichment ramp (repo: /home/ec2-user/Projects/marketing-outbound — cd there first). One pass per invocation; a loop re-runs you every ~25 min. Your job: measure the pipeline end-to-end and publish stats so nothing moves invisibly. You do NOT restart processes (the ops watcher owns that).

COMPUTE each pass (python via .venv/bin/python, sqlite read-only URIs):
1. Discovery: for each of runs/wave2/p_sweep_finds.jsonl.progress, runs/ramp/probe_finds.jsonl.progress, runs/ramp/rampt1a/b/c progress files that exist — capture the progress line (done/total, verified, %).
2. Per-vertical hit rate for the ramp tracks: verticals of found lead_ids (finds jsonl "vertical" field) vs the stratified composition in runs/ramp/worklists_meta.json. Only meaningful once a track has processed >5k; note sample size.
3. Conversion: count leads WHERE psweep_domain_stamp=1 (stamped), of those enriched (EXISTS in lead_gemini_enrichment), of those identity_status='verified_website', and their sell_grade distribution via lead_sell_grade.
4. Spend: SELECT ROUND(SUM(est_inr)),COUNT(*) FILTER (WHERE grounded) FROM gemini_spend WHERE id>437106 (postgres via docker exec marketing-outbound-postgres psql -U outbound -d lead_universe). grounded MUST be 0 — if not, URGENT alert (ops watcher kills spend; you just flag loudly).
5. Universe: total leads, sellable A+B+C from lead_sell_grade.

PUBLISH:
- Append a timestamped markdown block (compact table) to reports/ops_ramp/STATS.md with all the above.
- Refresh sell-grade incrementally first so numbers are current: .venv/bin/python -m gtm_engine.sell_grade --db explorer/gtm_engine.sqlite (incremental is cheap; skip if another sell_grade process is running).
- STOP-LOSS WATCH: once any vertical within a ramp track has >=10k processed and its hit rate is <0.5%, append a recommendation block to reports/ops_ramp/ALERTS.md (prefix WARN, say which vertical/tier and the measured rate). Do not act on it yourself.
- Publish to GitHub (source of truth) with the shared helper — it serialises concurrent agents, rebases and pushes:
  bash runs/ramp/gitsync.sh flow "chore(flow): stats tick <UTC-HH:MM>" reports/ops_ramp/STATS.md
  Never git push directly; never add anything outside reports/ops_ramp.

Keep each pass under ~3 minutes of work. mkdir -p reports/ops_ramp if missing.