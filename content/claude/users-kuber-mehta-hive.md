---
title: "mac  hive"
---

_3 transcript files aggregated._

A team member's Claude sent you a hive question.

**SCOPE — important**
You may ONLY read these paths (any other path is blocked by a hook):
  - ~/Projects
  - ~/Personal-Projects

You MUST NOT read ~/.claude, ~/.ssh, ~/.aws, credentials*, secrets*,
.env*, *.pem, *.key — these are hard-denied regardless of allowlist.

Do not include API keys, tokens, or other credentials in your answer
(an output filter will strip them, but don't generate them).

**Question (from mohit.p):**
In one sentence, what is the project at ~/Projects/marketing-outbound and its current A+B sell-grade lead count? Cite the file.

**Message ID:** TEST-1785144050
**Thread ID:** TEST-1785144050

**What to do:**
1. Discover from allowed paths only
2. Compose a concise answer with citations
3. **DO NOT call hive_respond or hive_ack** — only print your final answer
   as plain markdown. The human will review and dispatch manually.

Print only the answer text. Cite sources inline.

A team member's Claude sent you a hive question.

**SCOPE — important**
You may ONLY read these paths (any other path is blocked by a hook):
  - ~/Projects
  - ~/Personal-Projects

You MUST NOT read ~/.claude, ~/.ssh, ~/.aws, credentials*, secrets*,
.env*, *.pem, *.key — these are hard-denied regardless of allowlist.

Do not include API keys, tokens, or other credentials in your answer
(an output filter will strip them, but don't generate them).

**Question (from mohit.p):**
In one sentence, what is the project at ~/Projects/marketing-outbound and its current A+B sell-grade lead count? Cite the file.

**Message ID:** TEST-1785144050
**Thread ID:** TEST-1785144050

**What to do:**
1. Discover from allowed paths only
2. Compose a concise answer with citations
3. **DO NOT call hive_respond or hive_ack** — only print your final answer
   as plain markdown. The human will review and dispatch manually.

Print only the answer text. Cite sources inline.

- aidocs: Use whenever the user mentions aidocs, an aidocs URL, an aidocs document/folder/comment/share/version, or asks to publish, review, open, or update a long-form artifact in aidocs.
- day0-idea-submission: Use when a Day 0 / DayZero hackathon participant wants to brainstorm, draft, check, or submit their hackathon idea. Triggers on "submit my idea", "help me write my hackathon idea", "day0 idea", "idea submission", "brainstorm hackathon idea", or resubmission after screener feedback.
- graphify: Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the question should be treated as a graphify query first. Turns any input (code, docs, papers, images, videos) into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.
- subagentmaxxing: Spawn and control non-Claude coding-agent subagents (OpenAI Codex CLI and Cursor CLI — grok-4.5, composer-2.5, gpt-5.5) as one-prompt-in/one-answer-out subagents via the `subagent` CLI. Use when you want to offload a task to a Codex or Cursor subagent, get a second opinion from a different model family, run cross-model consensus, or fan one prompt out across several models in parallel. - Also for reaching Cursor-hosted Opus/Sonnet/Gemini, or any time you specifically want a non-Claude model instead of the native Agent tool.
- vpsmaxxing: Set up and manage a personal cloud VPS as a dedicated remote workbench for AI coding agents (Claude Code + OpenAI Codex). Covers provisioning (git/node/pnpm/docker/tmux), installing & authenticating the agents, a self-aware agent environment, Tailscale networking (SSH with no exposed ports), a tmux + cmux cockpit, localhost port tunneling, reverse VPS→laptop file access (including a no-admin path for managed/work laptops), one-time migration of your skills/memory/history/credentials, and automatic two-way sync. Use this when the user wants to run AI agents on a server, offload heavy or parallel agent work off their laptop, "set up a VPS for Claude Code / Codex", spin up a remote agent box, or keep an agent setup synced across machines.
- youtube-transcript: Extract transcripts from YouTube videos. Use when the user asks for a transcript, subtitles, or captions of a YouTube video and provides a YouTube URL (youtube.com/watch?v=, youtu.be/, or similar). Supports output with or without timestamps.
- deep-research: Deep research harness — fan-out web searches, fetch sources, adversarially verify claims, synthesize a cited report. - When the user wants a deep, multi-source, fact-checked research report on any topic. BEFORE invoking, check if the question is specific enough to research directly — if underspecified (e.g., "what car to buy" without budget/use-case/region), ask 2-3 clarifying questions to narrow scope. Then pass the refined question as args, weaving the answers in.
- update-config: Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
- keybindings-help: Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".
- verify: Verify that a code change actually does what it's supposed to by running the app and observing behavior. Use when asked to verify a PR, confirm a fix works, test a change manually, check that a feature works, or validate local changes before pushing.
- code-review: Review the current diff for correctness bugs and reuse/simplification/efficiency cleanups at the given effort level (low/medium: fewer, high-confidence findings; high→max: broader coverage, may include uncertain findings; ultra: deep multi-agent review in the cloud). Pass --comment to post findings as inline PR comments, or --fix to apply the findings to the working tree after the review.
- simplify: Review the changed code for reuse, simplification, efficiency, and altitude cleanups, then apply the fixes. Quality only — it does not hunt for bugs; use /code-review for that.
- fewer-permission-prompts: Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project .claude/settings.json to reduce permission prompts.
- loop: Run a prompt or slash command on a recurring interval (e.g. /loop 5m /foo). Omit the interval to let the model self-pace. - When the user wants to set up a recurring task, poll for status, or run something repeatedly on an interval (e.g. "check the deploy every 5 minutes", "keep running /babysit-prs"). Do NOT invoke for one-off tasks.
- schedule: Create, update, list, or run scheduled cloud agents (routines) that execute on a cron schedule. - When the user wants to schedule a recurring cloud agent, set up automated tasks, create a cron job for Claude Code, or manage their scheduled agents/routines. Also use when the user wants a one-time scheduled run ("run this once at 3pm", "remind me to check X tomorrow").
- claude-api: Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.
TRIGGER — read BEFORE opening the target file; don't skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
- run: Launch and drive this project's app to see a change working. Use when asked to run, start, or screenshot the app, or to confirm a change works in the real app (not just tests). First looks for a project skill that already covers launching the app; otherwise falls back to built-in patterns per project type (CLI, server, TUI, Electron, browser-driven, library).
- init: Initialize a new CLAUDE.md file with codebase documentation
- review: Review a GitHub pull request; for your working diff use /code-review
- security-review: Complete a security review of the pending changes on the current branch

total 1912
drwxr-xr-x@  37 kuber.mehta  staff    1184 10 Jul 18:24 .
drwxr-xr-x   19 kuber.mehta  staff     608 23 Jul 16:21 ..
drwxr-xr-x@   3 kuber.mehta  staff      96  7 Jul 23:03 .claude
-rw-r--r--@   1 kuber.mehta  staff   12292 14 Jul 01:47 .DS_Store
-rw-r--r--@   1 kuber.mehta  staff     170 29 Jun 18:08 .env
-rw-r--r--@   1 kuber.mehta  staff    1352 10 Jul 18:24 .env.example
drwxr-xr-x@  17 kuber.mehta  staff     544 27 Jul 14:23 .git
-rw-r--r--@   1 kuber.mehta  staff     928  6 Jul 21:39 .gitignore
drwxr-xr-x    7 kuber.mehta  staff     224 10 Jul 18:25 .pytest_cache
-rw-r--r--@   1 kuber.mehta  staff       5 25 Jun 15:00 .python-version
drwxr-xr-x    5 kuber.mehta  staff     160 10 Jul 14:55 .ruff_cache
drwxr-xr-x   10 kuber.mehta  staff     320 10 Jul 18:15 .venv
drwxr-xr-x@  13 kuber.mehta  staff     416 15 Jul 20:59 campaign_data
drwxr-xr-x@  22 kuber.mehta  staff     704 10 Jul 18:15 cockpit
drwxr-xr-x   65 kuber.mehta  staff    2080  2 Jul 14:06 data
drwxr-xr-x@  61 kuber.mehta  staff    1952 10 Jul 18:15 docs
drwxr-xr-x@   8 kuber.mehta  staff     256 13 Jul 13:50 evals
drwxr-xr-x   14 kuber.mehta  staff     448  8 Jul 03:52 explorer
-rw-r--r--    1 kuber.mehta  staff    7805 10 Jul 15:18 FOLLOWUPS.md
drwxr-xr-x@  13 kuber.mehta  staff     416 13 Jul 11:39 graphify-out
drwxr-xr-x   19 kuber.mehta  staff     608 15 Jul 14:32 gtm_engine
drwxr-xr-x@   7 kuber.mehta  staff     224 10 Jul 18:15 infra
drwxr-xr-x    6 kuber.mehta  staff     192  7 Jul 22:29 logs
drwxr-xr-x@   7 kuber.mehta  staff     224 10 Jul 15:18 ops
-rw-r--r--@   1 kuber.mehta  staff     263 25 Jun 15:00 package.json
drwxr-xr-x@  18 kuber.mehta  staff     576 10 Jul 18:15 playbooks
-rw-r--r--@   1 kuber.mehta  staff  202847 25 Jun 15:00 pnpm-lock.yaml
-rw-r--r--@   1 kuber.mehta  staff    1314  2 Jul 13:05 pyproject.toml
-rw-r--r--    1 kuber.mehta  staff    9767 10 Jul 15:18 README.md
drwxr-xr-x    3 kuber.mehta  staff      96  1 Jul 14:54 refs
drwxr-xr-x@   8 kuber.mehta  staff     256 10 Jul 18:15 reports
drwxr-xr-x@ 114 kuber.mehta  staff    3648 16 Jul 11:26 scripts
-rw-r--r--@   1 kuber.mehta  staff    2377 29 Jun 18:03 Service_account_Json_file.json
drwxr-xr-x@   3 kuber.mehta  staff      96 25 Jun 15:00 src
drwxr-xr-x@  41 kuber.mehta  staff    1312 15 Jul 14:32 tests
drwxr-xr-x@  22 kuber.mehta  staff     704 10 Jul 18:15 ui
-rw-r--r--@   1 kuber.mehta  staff  705471 30 Jun 17:15 uv.lock

1	# Marketing Outbound OS - Razorpay SME Lead Discovery
2	
3	> **Status snapshot (2026-07-02):** local `data/golden/leads_universe.parquet`
4	> has **1,561,167 deduped leads** across **77 columns**. The Razorpay/GTM score
5	> columns (`rzp_outcome_score`, `sales_readiness_score`, `gtm_action`, …) are
6	> **promoted universe-wide** (run `20260702T070745Z`), along with the Gate 4d
7	> registry-harvest columns (`registry_company_status`, `nic_code`,
8	> `company_age_years`, `active_registry`) and per-row `suppression_status` /
9	> `suppression_checked`. The source registry has **106 configured source rows**,
10	> **51 live sources**, **50 live adapter-backed sources**, and **36 adapter
11	> modules**.
12	>
13	> **Start here:** [docs/BUILD.md](docs/BUILD.md) for architecture and current
14	> state, [docs/gtm_pipeline.md](docs/gtm_pipeline.md) for the refresh/scoring
15	> runbook, and [docs/SETUP.md](docs/SETUP.md) for local bring-up.
16	
17	Marketing Outbound OS is a repeatable lead-discovery and GTM scoring system for
18	Razorpay's SME outbound motion. It turns public registries, regulator lists,
19	MCA/NIC slices, legacy baselines, Salesforce matches, and payment-signal
20	evidence into one deduped lead universe with explicit provenance, suppression,
21	scoring, routing, and local review tools.
22	
23	The current direction is no longer "only find contactable leads." Missing
24	website/contact data is an enrichment route. High-value registry identities now
25	stay in the universe and are routed to SearXNG/browser/crawler research rather
26	than being dropped.
27	
28	---
29	
30	## Current Data Snapshot
31	
32	These numbers come from the ignored local artifact
33	`data/golden/leads_universe.parquet`.
34	
35	| Metric | Current value |
36	|---|---:|
37	| Deduped leads | **1,561,167** |
38	| Output columns in durable golden artifact | **77** |
39	| Reachable rows | **263,873** |
40	| Needs enrichment rows | **1,284,810** |

# Marketing Outbound OS - Razorpay SME Lead Discovery

> **Status snapshot (2026-07-02):** local `data/golden/leads_universe.parquet`
> has **1,561,167 deduped leads** across **77 columns**. The Razorpay/GTM score
> columns (`rzp_outcome_score`, `sales_readiness_score`, `gtm_action`, …) are
> **promoted universe-wide** (run `20260702T070745Z`), along with the Gate 4d
> registry-harvest columns (`registry_company_status`, `nic_code`,
> `company_age_years`, `active_registry`) and per-row `suppression_status` /
> `suppression_checked`. The source registry has **106 configured source rows**,
> **51 live sources**, **50 live adapter-backed sources**, and **36 adapter
> modules**.
>
> **Start here:** [docs/BUILD.md](docs/BUILD.md) for architecture and current
> state, [docs/gtm_pipeline.md](docs/gtm_pipeline.md) for the refresh/scoring
> runbook, and [docs/SETUP.md](docs/SETUP.md) for local bring-up.

Marketing Outbound OS is a repeatable lead-discovery and GTM scoring system for
Razorpay's SME outbound motion. It turns public registries, regulator lists,
MCA/NIC slices, legacy baselines, Salesforce matches, and payment-signal
evidence into one deduped lead universe with explicit provenance, suppression,
scoring, routing, and local review tools.

The current direction is no longer "only find contactable leads." Missing
website/contact data is an enrichment route. High-value registry identities now
stay in the universe and are routed to SearXNG/browser/crawler research rather
than being dropped.

---

## Current Data Snapshot

These numbers come from the ignored local artifact
`data/golden/leads_universe.parquet`.

| Metric | Current value |
|---|---:|
| Deduped leads | **1,561,167** |
| Output columns in durable golden artifact | **77** |
| Reachable rows | **263,873** |
| Needs enrichment rows | **1,284,810** |

[hive-responder-policy] path '2>/dev/null' → /Users/kuber.mehta/.hive/2>/dev/null not in peer's allowlist (allowed: ['/Users/kuber.mehta/Projects', '/Users/kuber.mehta/Personal-Projects'])

[hive-responder-policy] path '.git/' → /Users/kuber.mehta/.hive/.git not in peer's allowlist (allowed: ['/Users/kuber.mehta/Projects', '/Users/kuber.mehta/Personal-Projects'])

[hive-responder-policy] path '/.venv/' → /.venv not in peer's allowlist (allowed: ['/Users/kuber.mehta/Projects', '/Users/kuber.mehta/Personal-Projects'])

Good, found `gtm_engine/sell_grade.py` and reports. Let me check the reports directory and README data snapshot for A+B grade counts specifically.

/Users/kuber.mehta/Projects/marketing-outbound/FOLLOWUPS.md:149:   this lane is separable. Where: `gtm_engine/sell_grade.py` R-band handling.

total 32
drwxr-xr-x@  8 kuber.mehta  staff   256 10 Jul 18:15 .
drwxr-xr-x@ 37 kuber.mehta  staff  1184 10 Jul 18:24 ..
-rw-r--r--@  1 kuber.mehta  staff  6148 10 Jul 18:15 .DS_Store
-rw-r--r--   1 kuber.mehta  staff  7049 10 Jul 15:18 agent_verify_calibration_20260707.md
drwxr-xr-x@  8 kuber.mehta  staff   256  6 Jul 10:56 campaign
drwxr-xr-x   7 kuber.mehta  staff   224 10 Jul 15:18 competitor_pg_verified
drwxr-xr-x@  6 kuber.mehta  staff   192  2 Jul 17:39 d1_20260702
drwxr-xr-x@  5 kuber.mehta  staff   160  2 Jul 16:05 d1_20260702_interim

/Users/kuber.mehta/Projects/marketing-outbound/docs/D1_RECRAWL_AND_OUTCOME_JOIN.md:3:Two standalone scripts that extend the sell-grade system: one **recovers** the
/Users/kuber.mehta/Projects/marketing-outbound/docs/D1_RECRAWL_AND_OUTCOME_JOIN.md:31:incremental sell-grade refresher re-grades the row (D1 → A/B/C/R/D2/D3). It
/Users/kuber.mehta/Projects/marketing-outbound/docs/D1_RECRAWL_AND_OUTCOME_JOIN.md:41:**Lead selection.** Prefers `lead_sell_grade.sell_grade='D1'` ordered by
/Users/kuber.mehta/Projects/marketing-outbound/docs/D1_RECRAWL_AND_OUTCOME_JOIN.md:60:python -m gtm_engine.sell_grade --db explorer/gtm_engine.sqlite   # incremental
/Users/kuber.mehta/Projects/marketing-outbound/docs/D1_RECRAWL_AND_OUTCOME_JOIN.md:84:`lead_id, sell_grade, sell_rank, facets_json, batch_id, exported_at` — the grade
/Users/kuber.mehta/Projects/marketing-outbound/docs/D1_RECRAWL_AND_OUTCOME_JOIN.md:86:`lead_sell_grade`.
/Users/kuber.mehta/Projects/marketing-outbound/docs/D1_RECRAWL_AND_OUTCOME_JOIN.md:116:- A grade source present: `lead_decision_log` (preferred) or `lead_sell_grade`.
/Users/kuber.mehta/Projects/marketing-outbound/docs/D1_RECRAWL_AND_OUTCOME_JOIN.md:126:`lead_sell_grade`; append:
/Users/kuber.mehta/Projects/marketing-outbound/docs/D1_RECRAWL_AND_OUTCOME_JOIN.md:131:    "lead_sell_grade",
/Users/kuber.mehta/Projects/marketing-outbound/docs/FRESH_LENS_AUDIT_2026-07-07.md:13:substring-tests raw combined HTML; `sell_grade.py:62-66` promotes these flags to
/Users/kuber.mehta/Projects/marketing-outbound/docs/FRESH_LENS_AUDIT_2026-07-07.md:45:token+state-only", demands 0.95-or-hard-anchor) but sell-grade, dashboard, and
/Users/kuber.mehta/Projects/marketing-outbound/docs/FRESH_LENS_AUDIT_2026-07-07.md:61:**6. [dumb-mistake]** R-band floor 0.75 in `sell_grade.py:74-76` vs verifier
/Users/kuber.mehta/Projects/marketing-outbound/docs/FRESH_LENS_AUDIT_2026-07-07.md:129:DB has drifted (NMR now 14,413; `lead_sell_grade` table missing post-rebuild).
/Users/kuber.mehta/Projects/marketing-outbound/docs/FRESH_LENS_AUDIT_2026-07-07.md:139:(`sell_grade.py:59`) with no identity check. Safe today (features persist only
/Users/kuber.mehta/Projects/marketing-outbound/docs/FRESH_LENS_AUDIT_2026-07-07.md:173:(sell-grade CASE, payment facets, funnel) repeatedly re-launder loose substring
/Users/kuber.mehta/Projects/marketing-outbound/docs/gtm_pipeline_e2e.excalidraw:69:      "text": "Public-registry discovery  ->  RZP-calibrated scoring  ->  SearXNG+Gemini enrichment  ->  2-stage PG verification  ->  geo + sell-grade  ->  serve.    \u2605 = added since the last diagram.",
/Users/kuber.mehta/Projects/marketing-outbound/docs/gtm_pipeline_e2e.excalidraw:75:      "originalText": "Public-registry discovery  ->  RZP-calibrated scoring  ->  SearXNG+Gemini enrichment  ->  2-stage PG verification  ->  geo + sell-grade  ->  serve.    \u2605 = added since the last diagram.",
/Users/kuber.mehta/Projects/marketing-outbound/docs/gtm_pipeline_e2e.excalidraw:3553:      "text": "20,850\nranked by dense sell-grade",
/Users/kuber.mehta/Projects/marketing-outbound/docs/gtm_pipeline_e2e.excalidraw:3559:      "originalText": "20,850\nranked by dense sell-grade",

-rw-r--r--@ 1 kuber.mehta  staff     32010240  2 Jul 17:39 /Users/kuber.mehta/Projects/marketing-outbound/explorer/d1_random_2500.sqlite
-rw-r--r--@ 1 kuber.mehta  staff     44109824  2 Jul 16:34 /Users/kuber.mehta/Projects/marketing-outbound/explorer/d1_ranked_2500.sqlite
-rw-r--r--@ 1 kuber.mehta  staff      2543616 30 Jun 17:58 /Users/kuber.mehta/Projects/marketing-outbound/explorer/gemini_vps_500.sqlite
-rw-r--r--@ 1 kuber.mehta  staff     21721088 30 Jun 15:23 /Users/kuber.mehta/Projects/marketing-outbound/explorer/gemini_vps_batch_20260630_2250.results.sqlite
-rw-r--r--  1 kuber.mehta  staff     11042816 30 Jun 14:43 /Users/kuber.mehta/Projects/marketing-outbound/explorer/gemini_vps_batch_20260630_2250.sqlite
-rw-r--r--@ 1 kuber.mehta  staff     11128832 30 Jun 17:01 /Users/kuber.mehta/Projects/marketing-outbound/explorer/gemini_vps_interim_2250.sqlite
-rw-r--r--@ 1 kuber.mehta  staff  12736028672  8 Jul 03:52 /Users/kuber.mehta/Projects/marketing-outbound/explorer/gtm_engine.sqlite
-rw-r--r--@ 1 kuber.mehta  staff  12103921664  3 Jul 09:19 /Users/kuber.mehta/Projects/marketing-outbound/explorer/gtm_engine.sqlite.corrupt

[hive-responder-policy] path 'text"://d' → /Users/kuber.mehta/.hive/text":/d not in peer's allowlist (allowed: ['/Users/kuber.mehta/Projects', '/Users/kuber.mehta/Personal-Projects'])

66-      "updated": 1,
67-      "link": null,
68-      "locked": false,
69:      "text": "Public-registry discovery  ->  RZP-calibrated scoring  ->  SearXNG+Gemini enrichment  ->  2-stage PG verification  ->  geo + sell-grade  ->  serve.    \u2605 = added since the last diagram.",
70-      "fontSize": 13,
71-      "fontFamily": 2,
72-      "textAlign": "left",
73-      "verticalAlign": "top",
74-      "containerId": null,
75:      "originalText": "Public-registry discovery  ->  RZP-calibrated scoring  ->  SearXNG+Gemini enrichment  ->  2-stage PG verification  ->  geo + sell-grade  ->  serve.    \u2605 = added since the last diagram.",
76-      "lineHeight": 1.25,
77-      "baseline": 10.4,
78-      "autoResize": true
--
3550-      "updated": 1,
3551-      "link": null,
3552-      "locked": false,
3553:      "text": "20,850\nranked by dense sell-grade",
3554-      "fontSize": 10.5,
3555-      "fontFamily": 2,
3556-      "textAlign": "left",
3557-      "verticalAlign": "top",
3558-      "containerId": null,
3559:      "originalText": "20,850\nranked by dense sell-grade",
3560-      "lineHeight": 1.25,
3561-      "baseline": 8.4,
3562-      "autoResize": true

[hive-responder-policy] path "sell_grade\\|Grade A\\|Grade B\\|grade='A'\\|grade='B'\\|grade=.A.\\|grade=.B.\\|A/B\\|A + B" → /Users/kuber.mehta/.hive/sell_grade\|Grade A\|Grade B\|grade='A'\|grade='B'\|grade=.A.\|grade=.B.\|A/B\|A + B not in peer's allowlist (allowed: ['/Users/kuber.mehta/Projects', '/Users/kuber.mehta/Personal-Projects'])

(Bash completed with no output)

total 0
drwxr-xr-x@ 8 kuber.mehta  staff  256  6 Jul 10:56 .
drwxr-xr-x@ 8 kuber.mehta  staff  256 10 Jul 18:15 ..
drwxr-xr-x@ 5 kuber.mehta  staff  160  5 Jul 00:55 mac
drwxr-xr-x@ 5 kuber.mehta  staff  160  5 Jul 00:54 vps
drwxr-xr-x@ 5 kuber.mehta  staff  160  6 Jul 10:56 vps-g1
drwxr-xr-x@ 5 kuber.mehta  staff  160  6 Jul 10:56 vps-g2
drwxr-xr-x@ 5 kuber.mehta  staff  160  6 Jul 10:56 vps-g3
drwxr-xr-x@ 5 kuber.mehta  staff  160  6 Jul 10:56 vps-g4
---
total 16
drwxr-xr-x@  13 kuber.mehta  staff   416 15 Jul 20:59 .
drwxr-xr-x@  37 kuber.mehta  staff  1184 10 Jul 18:24 ..
-rw-r--r--@   1 kuber.mehta  staff  6148 10 Jul 18:15 .DS_Store
drwxr-xr-x@   4 kuber.mehta  staff   128 15 Jul 15:31 discovery-corp-email
drwxr-xr-x@   4 kuber.mehta  staff   128 15 Jul 17:40 discovery-nocin-corpemail
drwxr-xr-x@   4 kuber.mehta  staff   128 15 Jul 20:59 discovery-nocin-full
drwxr-xr-x@   5 kuber.mehta  staff   160 15 Jul 14:19 discovery-vps
drwxr-xr-x@ 107 kuber.mehta  staff  3424  5 Jul 00:50 mac
drwxr-xr-x@ 141 kuber.mehta  staff  4512  5 Jul 00:50 vps
drwxr-xr-x@ 149 kuber.mehta  staff  4768  6 Jul 11:00 vps-g1
drwxr-xr-x@ 150 kuber.mehta  staff  4800  6 Jul 11:00 vps-g2
drwxr-xr-x@ 148 kuber.mehta  staff  4736  6 Jul 11:00 vps-g3
drwxr-xr-x@ 147 kuber.mehta  staff  4704  6 Jul 11:00 vps-g4

This Bash command contains multiple operations. The following parts require approval: command -v sqlite3, timeout 60 sqlite3 /Users/kuber.mehta/Projects/marketing-outbound/explorer/gtm_engine.sqlite ".tables"

146-
147-1. **Promotion wiring:** promoted leads should land in the sell-grade ladder
148-   with a distinct provenance tag (`agent_corroborated`) so SDR feedback on
149:   this lane is separable. Where: `gtm_engine/sell_grade.py` R-band handling.
150-2. **Cheap deterministic win — SHIPPED 2026-07-07** (`email_domain_match`,
151-   +50 strong identifier in `score_identity_verification`; A1 sub-unit guard
152-   confirmed still caps parent-venue emails; tests green). Measured impact on
153-   the live DB: 2,927 needs_manual_review + 2,406 candidate_unverified leads
154-   carry a lead-sourced email on the candidate's own domain; **4,681 of them
155-   also have a stored name anchor and would flip to verified on an offline
156-   re-score pass** (stored `raw_json.features`, no re-crawl needed). Remaining
157-   decision: run that re-score pass (and spot-check ~20 promotions first for
158-   contact-provenance circularity — contacts enriched FROM the same site would
159-   be self-confirming).
160-3. **Verified-control recall is 45%** — the agent is stricter than the
161-   original judge. Fine for the additive review-band lane; do NOT use it as a
162-   replacement gate anywhere.
163-4. **Full-band run** (~12.6k leads ≈ 14M tokens/day-scale, ~2 weeks at
164-   current single-key throughput or ask for gateway allowlisting of ai-vps):

126-**17. [dumb-mistake]** The funnel diagram is hardcoded numbers dressed as a
127-generated artifact (`gen_funnel_excalidraw.py:24-60`); internal sums are off
128-(123,420 vs 123,425; 15,239 vs 15,238; grades sum 180,217/180,221) and the live
129:DB has drifted (NMR now 14,413; `lead_sell_grade` table missing post-rebuild).
130-Fix: make the script query the DB; commit the query with the numbers.
131-
132-**18. [blind-spot]** Funnel conflates lost / parked / suppression-success: NMR
133-counted "dropped" while ~10.5k salvageable; C counted as a drop; X wins counted
134-as losses. R+D1+item-6 ≈ 25k parked leads — 5x sell-ready — invisible in the
135-"2.5%" narrative. Fix: three-way stage accounting (advance / parked-recoverable
136-/ terminal).
137-
138-**19. [edge-case]** Grade X fires on `has_razorpay=1` unconditionally
139-(`sell_grade.py:59`) with no identity check. Safe today (features persist only

72-}
73-DROP_STYLE = {"stroke": "#e03131", "bg": "#ffc9c9"}
74-INK = "#1e1e1e"
75-
76-# Grade -> colour bucket.
77:GRADE_STYLE = {
78-    "A":  {"stroke": "#2f9e44", "bg": "#b2f2bb"},   # sell-ready
79-    "B":  {"stroke": "#2f9e44", "bg": "#b2f2bb"},
80-    "C":  {"stroke": "#f08c00", "bg": "#ffec99"},   # thin
81-    "R":  {"stroke": "#e8590c", "bg": "#ffd8a8"},   # salvageable
82-    "D1": {"stroke": "#868e96", "bg": "#dee2e6"},   # dead / no-website
83-    "D2": {"stroke": "#868e96", "bg": "#dee2e6"},
84-    "D3": {"stroke": "#868e96", "bg": "#dee2e6"},
85-    "X":  {"stroke": "#868e96", "bg": "#ced4da"},
86-}
87-
88-# Grade -> plain-English meaning + what to do with it (shown in the ladder panel).
89:GRADE_MEANING = {
90-    "A":  "Hot · verified + hard-payment + reachable → SELL",
91-    "B":  "Warm · verified + contact or payment intent",
92-    "C":  "Qualified · verified, nothing else yet",
93-    "R":  "Review · near-verified (sub-0.88) → human check",
94-    "D1": "Retryable · unreachable / bot-blocked → re-crawl",
95-    "D2": "Cold · no website / identity unverified",
96-    "D3": "Dead · namesake / parent-group (wrong entity)",
97-    "X":  "Existing · already Razorpay / DNC → exclude",
98-}
99-
100-# --------------------------------------------------------------------------- #
101-# Deterministic id / seed generation (no randomness).
102-# --------------------------------------------------------------------------- #
103-_counter = 0
104-
105-
106-def _tick() -> int:
107-    global _counter
108-    _counter += 1
109-    return _counter
110-
111-
112-def _new_id(prefix: str) -> str:
113-    return f"{prefix}_{_tick():04d}"
114-
115-
116-def _seed(n: int) -> int:
117-    # Stable pseudo-unique ints derived from the counter.
118-    return (2_000_000 + n * 97) % (2 ** 31)
119-
120-
121-def _nonce(n: int) -> int:
122-    return (3_000_000 + n * 131) % (2 ** 31)
123-
124-
125-# --------------------------------------------------------------------------- #
126-# Element factories -- each returns the FULL prop set Excalidraw requires.
127-# --------------------------------------------------------------------------- #
128-
129-def base_element(eid: str, etype: str, x: float, y: float, w: float, h: float,
--
230-    minw, maxw = 170.0, 560.0
231-    frac = (math.log10(survivors) - lo) / (hi - lo)
232-    return round(minw + (maxw - minw) * frac, 1)
233-
234-
235:def grade_bar_len(count: int) -> float:
236-    counts = [g["count"] for g in DATA["grade_distribution"]]
237-    hi = math.log10(max(counts))
238-    return round(300.0 * math.log10(max(count, 1)) / hi, 1)
239-
240-
241-def fmt(n: int) -> str:
242-    return f"{n:,}"
243-
244-
245-def pct(part: float, whole: float) -> float:
246-    return round(100.0 * part / whole, 1)
247-
248-
249-# --------------------------------------------------------------------------- #
250-# Build.
251-# --------------------------------------------------------------------------- #
252-
253-def build() -> dict:
254-    elements: list[dict] = []
255-    total = DATA["total"]
256-
257-    center_x = 400.0
258-    top_y0 = 150.0
259-    step_y = 150.0
260-    box_h = 96.0
261-    drop_x = 720.0
262-    drop_w = 400.0
263-
264-    # ---- Title + subtitle ------------------------------------------------- #
265-    elements.append(text(_new_id("title"), 60, 34,
266-                         "Enrich-high enrichment funnel  —  180,221 → 4,536 sell-ready (2.5%)",
267-                         26, stroke=INK, align="left", valign="top"))
268-    elements.append(text(_new_id("subtitle"), 62, 74,
269-                         "Lead-enrichment drop-off by stage · box width ∝ survivors (log) · red = dropped, with top WHY reasons",
270-                         14, stroke="#495057", align="left", valign="top"))
271-
272-    # ---- Layer legend ----------------------------------------------------- #
273-    legend_layers = [
274-        ("input", LAYER_STYLE["input"]),
275-        ("searxng+gemini", LAYER_STYLE["searxng+gemini"]),

52-            {"reason": "Existing Razorpay (grade X) — excluded from selling", "count": 40, "pct_of_tier": 0.02}]},
53-    ],
54:    "grade_distribution": [
55-        {"grade": "A", "count": 1409}, {"grade": "B", "count": 3127},
56-        {"grade": "C", "count": 83}, {"grade": "R", "count": 10553},
57-        {"grade": "D1", "count": 12298}, {"grade": "D2", "count": 150634},
58-        {"grade": "D3", "count": 2073}, {"grade": "X", "count": 40},
59-    ],
60-}
61-
62-# --------------------------------------------------------------------------- #
63-# Palette (Excalidraw's standard background colours + matching stroke).
64-# --------------------------------------------------------------------------- #
65-LAYER_STYLE = {
66-    "input":          {"stroke": "#343a40", "bg": "#e9ecef", "name": "input"},
67-    "searxng+gemini": {"stroke": "#6741d9", "bg": "#d0bfff", "name": "searxng+gemini"},
68-    "crawl":          {"stroke": "#e8590c", "bg": "#ffd8a8", "name": "crawl"},
69-    "gemini":         {"stroke": "#1971c2", "bg": "#a5d8ff", "name": "gemini"},
70-    "gemini_light":   {"stroke": "#1971c2", "bg": "#d0ebff", "name": "gemini (light)"},
71-    "grade":          {"stroke": "#2f9e44", "bg": "#b2f2bb", "name": "grade"},
72-}
73-DROP_STYLE = {"stroke": "#e03131", "bg": "#ffc9c9"}
74-INK = "#1e1e1e"
--
234-
235-def grade_bar_len(count: int) -> float:
236:    counts = [g["count"] for g in DATA["grade_distribution"]]
237-    hi = math.log10(max(counts))
238-    return round(300.0 * math.log10(max(count, 1)) / hi, 1)
239-
240-
241-def fmt(n: int) -> str:
242-    return f"{n:,}"
243-
244-
245-def pct(part: float, whole: float) -> float:
246-    return round(100.0 * part / whole, 1)
247-
248-
249-# --------------------------------------------------------------------------- #
250-# Build.
251-# --------------------------------------------------------------------------- #
252-
253-def build() -> dict:
254-    elements: list[dict] = []
255-    total = DATA["total"]
256-
--
383-    bar_x = gp_x + 344
384-    bar_h = 12.0
385:    for i, g in enumerate(DATA["grade_distribution"]):
386-        gy = row_y0 + i * row_step
387-        style = GRADE_STYLE[g["grade"]]
388-        # Colored grade chip with the letter inside.
389-        chip_r = rect(_new_id("gchip"), gp_x, gy, chip, chip, style["stroke"], style["bg"])
390-        elements.append(chip_r)
391-        elements.append(centered_text(_new_id("gletter"), gp_x + chip / 2, gy + chip / 2,
392-                                      g["grade"], 16, stroke=INK))
393-        # Count (line 1) + plain-English meaning (line 2), to the right of the chip.
394-        elements.append(text(_new_id("gcount"), gp_x + chip + 14, gy - 1,

**Marketing Outbound OS** (`~/Projects/marketing-outbound`) is Razorpay's SME lead-discovery and GTM scoring system that turns public registries, regulator lists, MCA/NIC data, and payment-signal evidence into one deduped, scored, sell-graded lead universe (README.md:17-21).

**A+B sell-grade lead count: 4,536** (Grade A = 1,409 + Grade B = 3,127), per the hardcoded grade distribution in `scripts/gen_funnel_excalidraw.py:54-59`, which matches the funnel title "180,221 → 4,536 sell-ready (2.5%)" at `scripts/gen_funnel_excalidraw.py:266`.

⚠️ Caveat: `docs/FRESH_LENS_AUDIT_2026-07-07.md:126-130` flags this figure as "hardcoded numbers dressed as a generated artifact" (with a minor internal sum mismatch, 180,217 vs 180,221) and notes the live `lead_sell_grade` table was missing post-rebuild at audit time — so this is the last known snapshot, not a live query, and may have drifted.

A teammate's Claude sent you a hive question.

**SCOPE — important**
You may ONLY read these paths (any other path is blocked by a hook):
  - ~/Projects
  - ~/Personal-Projects

**Question (from mohit.p):**
In one sentence, what project lives at ~/Projects/marketing-outbound and what is its current sell-grade A+B lead count? Cite the file you found it in.

**What to do:**
1. Discover from allowed paths only
2. Compose a concise answer with citations
3. Print only the answer text.


A teammate's Claude sent you a hive question.

**SCOPE — important**
You may ONLY read these paths (any other path is blocked by a hook):
  - ~/Projects
  - ~/Personal-Projects

**Question (from mohit.p):**
In one sentence, what project lives at ~/Projects/marketing-outbound and what is its current sell-grade A+B lead count? Cite the file you found it in.

**What to do:**
1. Discover from allowed paths only
2. Compose a concise answer with citations
3. Print only the answer text.


- aidocs: Use whenever the user mentions aidocs, an aidocs URL, an aidocs document/folder/comment/share/version, or asks to publish, review, open, or update a long-form artifact in aidocs.
- day0-idea-submission: Use when a Day 0 / DayZero hackathon participant wants to brainstorm, draft, check, or submit their hackathon idea. Triggers on "submit my idea", "help me write my hackathon idea", "day0 idea", "idea submission", "brainstorm hackathon idea", or resubmission after screener feedback.
- graphify: Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the question should be treated as a graphify query first. Turns any input (code, docs, papers, images, videos) into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.
- subagentmaxxing: Spawn and control non-Claude coding-agent subagents (OpenAI Codex CLI and Cursor CLI — grok-4.5, composer-2.5, gpt-5.5) as one-prompt-in/one-answer-out subagents via the `subagent` CLI. Use when you want to offload a task to a Codex or Cursor subagent, get a second opinion from a different model family, run cross-model consensus, or fan one prompt out across several models in parallel. - Also for reaching Cursor-hosted Opus/Sonnet/Gemini, or any time you specifically want a non-Claude model instead of the native Agent tool.
- vpsmaxxing: Set up and manage a personal cloud VPS as a dedicated remote workbench for AI coding agents (Claude Code + OpenAI Codex). Covers provisioning (git/node/pnpm/docker/tmux), installing & authenticating the agents, a self-aware agent environment, Tailscale networking (SSH with no exposed ports), a tmux + cmux cockpit, localhost port tunneling, reverse VPS→laptop file access (including a no-admin path for managed/work laptops), one-time migration of your skills/memory/history/credentials, and automatic two-way sync. Use this when the user wants to run AI agents on a server, offload heavy or parallel agent work off their laptop, "set up a VPS for Claude Code / Codex", spin up a remote agent box, or keep an agent setup synced across machines.
- youtube-transcript: Extract transcripts from YouTube videos. Use when the user asks for a transcript, subtitles, or captions of a YouTube video and provides a YouTube URL (youtube.com/watch?v=, youtu.be/, or similar). Supports output with or without timestamps.
- deep-research: Deep research harness — fan-out web searches, fetch sources, adversarially verify claims, synthesize a cited report. - When the user wants a deep, multi-source, fact-checked research report on any topic. BEFORE invoking, check if the question is specific enough to research directly — if underspecified (e.g., "what car to buy" without budget/use-case/region), ask 2-3 clarifying questions to narrow scope. Then pass the refined question as args, weaving the answers in.
- update-config: Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
- keybindings-help: Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".
- verify: Verify that a code change actually does what it's supposed to by running the app and observing behavior. Use when asked to verify a PR, confirm a fix works, test a change manually, check that a feature works, or validate local changes before pushing.
- code-review: Review the current diff for correctness bugs and reuse/simplification/efficiency cleanups at the given effort level (low/medium: fewer, high-confidence findings; high→max: broader coverage, may include uncertain findings; ultra: deep multi-agent review in the cloud (requires claude.ai account access)). Pass --comment to post findings as inline PR comments, or --fix to apply the findings to the working tree after the review.
- simplify: Review the changed code for reuse, simplification, efficiency, and altitude cleanups, then apply the fixes. Quality only — it does not hunt for bugs; use /code-review for that.
- fewer-permission-prompts: Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project .claude/settings.json to reduce permission prompts.
- loop: Run a prompt or slash command on a recurring interval (e.g. /loop 5m /foo). Omit the interval to let the model self-pace. - When the user wants to set up a recurring task, poll for status, or run something repeatedly on an interval (e.g. "check the deploy every 5 minutes", "keep running /babysit-prs"). Do NOT invoke for one-off tasks.
- claude-api: Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.
TRIGGER — read BEFORE opening the target file; don't skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
- run: Launch and drive this project's app to see a change working. Use when asked to run, start, or screenshot the app, or to confirm a change works in the real app (not just tests). First looks for a project skill that already covers launching the app; otherwise falls back to built-in patterns per project type (CLI, server, TUI, Electron, browser-driven, library).
- init: Initialize a new CLAUDE.md file with codebase documentation
- review: Review a GitHub pull request; for your working diff use /code-review
- security-review: Complete a security review of the pending changes on the current branch

Not logged in · Please run /login

Reply with exactly: RESPONDER_AUTH_OK

Reply with exactly: RESPONDER_AUTH_OK

- aidocs: Use whenever the user mentions aidocs, an aidocs URL, an aidocs document/folder/comment/share/version, or asks to publish, review, open, or update a long-form artifact in aidocs.
- day0-idea-submission: Use when a Day 0 / DayZero hackathon participant wants to brainstorm, draft, check, or submit their hackathon idea. Triggers on "submit my idea", "help me write my hackathon idea", "day0 idea", "idea submission", "brainstorm hackathon idea", or resubmission after screener feedback.
- graphify: Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the question should be treated as a graphify query first. Turns any input (code, docs, papers, images, videos) into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.
- subagentmaxxing: Spawn and control non-Claude coding-agent subagents (OpenAI Codex CLI and Cursor CLI — grok-4.5, composer-2.5, gpt-5.5) as one-prompt-in/one-answer-out subagents via the `subagent` CLI. Use when you want to offload a task to a Codex or Cursor subagent, get a second opinion from a different model family, run cross-model consensus, or fan one prompt out across several models in parallel. - Also for reaching Cursor-hosted Opus/Sonnet/Gemini, or any time you specifically want a non-Claude model instead of the native Agent tool.
- vpsmaxxing: Set up and manage a personal cloud VPS as a dedicated remote workbench for AI coding agents (Claude Code + OpenAI Codex). Covers provisioning (git/node/pnpm/docker/tmux), installing & authenticating the agents, a self-aware agent environment, Tailscale networking (SSH with no exposed ports), a tmux + cmux cockpit, localhost port tunneling, reverse VPS→laptop file access (including a no-admin path for managed/work laptops), one-time migration of your skills/memory/history/credentials, and automatic two-way sync. Use this when the user wants to run AI agents on a server, offload heavy or parallel agent work off their laptop, "set up a VPS for Claude Code / Codex", spin up a remote agent box, or keep an agent setup synced across machines.
- youtube-transcript: Extract transcripts from YouTube videos. Use when the user asks for a transcript, subtitles, or captions of a YouTube video and provides a YouTube URL (youtube.com/watch?v=, youtu.be/, or similar). Supports output with or without timestamps.
- deep-research: Deep research harness — fan-out web searches, fetch sources, adversarially verify claims, synthesize a cited report. - When the user wants a deep, multi-source, fact-checked research report on any topic. BEFORE invoking, check if the question is specific enough to research directly — if underspecified (e.g., "what car to buy" without budget/use-case/region), ask 2-3 clarifying questions to narrow scope. Then pass the refined question as args, weaving the answers in.
- update-config: Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
- keybindings-help: Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".
- verify: Verify that a code change actually does what it's supposed to by running the app and observing behavior. Use when asked to verify a PR, confirm a fix works, test a change manually, check that a feature works, or validate local changes before pushing.
- code-review: Review the current diff for correctness bugs and reuse/simplification/efficiency cleanups at the given effort level (low/medium: fewer, high-confidence findings; high→max: broader coverage, may include uncertain findings; ultra: deep multi-agent review in the cloud). Pass --comment to post findings as inline PR comments, or --fix to apply the findings to the working tree after the review.
- simplify: Review the changed code for reuse, simplification, efficiency, and altitude cleanups, then apply the fixes. Quality only — it does not hunt for bugs; use /code-review for that.
- fewer-permission-prompts: Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project .claude/settings.json to reduce permission prompts.
- loop: Run a prompt or slash command on a recurring interval (e.g. /loop 5m /foo). Omit the interval to let the model self-pace. - When the user wants to set up a recurring task, poll for status, or run something repeatedly on an interval (e.g. "check the deploy every 5 minutes", "keep running /babysit-prs"). Do NOT invoke for one-off tasks.
- schedule: Create, update, list, or run scheduled cloud agents (routines) that execute on a cron schedule. - When the user wants to schedule a recurring cloud agent, set up automated tasks, create a cron job for Claude Code, or manage their scheduled agents/routines. Also use when the user wants a one-time scheduled run ("run this once at 3pm", "remind me to check X tomorrow").
- claude-api: Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.
TRIGGER — read BEFORE opening the target file; don't skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
- run: Launch and drive this project's app to see a change working. Use when asked to run, start, or screenshot the app, or to confirm a change works in the real app (not just tests). First looks for a project skill that already covers launching the app; otherwise falls back to built-in patterns per project type (CLI, server, TUI, Electron, browser-driven, library).
- init: Initialize a new CLAUDE.md file with codebase documentation
- review: Review a GitHub pull request; for your working diff use /code-review
- security-review: Complete a security review of the pending changes on the current branch