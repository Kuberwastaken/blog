---
title: "legendary problems with live leads scan (chat-01M211FFS)"
---

_1 transcript files aggregated._

Handle the user's latest question: which other legendary/famous open problems have LIVE LEADS suitable for machine attack - i.e., the kill is a finite counterexample or a constructive record bound, verified in seconds, with no meta-theorem cap, and a frontier that has actually moved recently.

Scan and report with sources (URLs) for each candidate: current frontier (who moved it last, when, to what bound), exact verification cost of a hit, fame ceiling, the productive search shape, and an honest P(hit) estimate at hobby-to-modest compute (laptop to ~\$200 spot instances). Cover at minimum: R(5,5) and nearby Ramsey numbers (current best bounds and whether SAT attacks are live), Schur S(6) (current bound, Heule's S(5) machinery applicability), Beal conjecture (prize status, current search coverage), kissing numbers / sphere-packing records (what AlphaEvolve did 2025, which dimensions are soft), lonely runner conjecture (status at small n), moving sofa (Baek's 2024 optimality claim status), Collatz and RH counterexample hunts (as mined-out lottery comparisons - current verification heights), and any other famous finite-witness conjecture with a moved frontier in 2024-2026 that I haven't named. Also one line on why each millennium problem has or lacks a machine-shaped lead.

Rank the final list by expected fame-per-compute-dollar and say which 2-3 would displace anything on the current slate (Frankl main, HN, Hill K13, 3-cubes 627 audit). Report to me, not the user.

The following tool help pages have been injected below, so you don't need to run `tools help` for these tools before calling them: agent_message.send, wake_schedule.create, wake_schedule.delete, wake_schedule.list, wake_schedule.update, wake_subscription.list, wake_subscription.subscribe, wake_subscription.unsubscribe, todos.get, todos.list, todos.query, web_fetch, web_search, observations.fetch, observations.sql.

===== tools help agent_message.send =====
Report a material result, blocker, or update to the parent agent.

DETAILS
The recipient sees this message and transferred attachments, not this agent's tool trace or filesystem.

USAGE
  tools agent_message send [--attachments VALUE] --message VALUE --to VALUE [--json] [--timeout SECONDS]

OPTIONS
  --attachments          string[] Up to 5 workspace file paths, usually under /downloads/, to transfer into the recipient's private filesystem (20.0 MB total). Citing a path in message text does not transfer it. At most 5 image attachments are shown to the recipient inline; over that, it must read each file itself.
  --message              string   Self-contained message body. (required)
  --to                   string   Reachable recipient agent ID. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {status:str,recipient_agent_id:str,agent_message_id?:str,attachments?:Attachment[],run_id?:str,wake_created_event_id?:str}
  attachments[]:Attachment{blob_hash?:str,byte_size?:int,filename?:str,mime_type?:str,path?:str}

===== tools help wake_schedule.create =====
Create a future wake schedule.

DETAILS
Pick the wake style first: a cadence wake takes --interval; a clock wake takes --at or --cron with --threshold; --threshold 0 is an exact wake. A one-shot delay under 15 minutes takes --run-in-seconds. Set exactly one of --interval, --at, --cron, or --run-in-seconds. Before creating an ongoing schedule, list active schedules and update a match instead of stacking a duplicate.

USAGE
  tools wake_schedule create [--at VALUE] [--cron VALUE] [--interval VALUE] --prompt VALUE [--run-in-seconds VALUE] [--threshold VALUE] [--timezone VALUE] [--trigger VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --at                   string   Local wall-clock time as `yyyy-mm-ddThh:mm:ss`, no offset, no Z. Requires --threshold.
  --cron                 string   Cron fields without `cron(...)`: `minutes hours day-of-month month day-of-week` plus optional `*` year; day-of-week 0-7 or SUN-SAT. Requires --threshold.
  --interval             integer  Cadence in minutes (5-10080); the first fire lands within one interval of creation. Prefer the longest interval that meets the need.
  --prompt               string   Instruction delivered when the wake fires; keep it separate from --trigger. (required)
  --run-in-seconds       integer  Exact delay in seconds, maximum 900.
  --threshold            integer  Minutes of acceptable lateness after the scheduled time (0-1440). Required with --at or --cron; 0 = exact wake.
  --timezone             string   IANA timezone for --at or --cron; omit to use the user's timezone.
  --trigger              string   Condition checked before waking; unmet recurring cycles are skipped. Omit for an unconditional wake.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {id:str,prompt:str,next_fire_at:str,queued_fire_count:int,schedule_summary:str,schedule_expression?:str,skipped_fire_at?:str,threshold_minutes?:int,timezone?:str,trigger?:str}

EXAMPLES
  "let me know around 6" — clock wake, generous threshold
    tools wake_schedule create --prompt 'Tell the user the oven window is open' --at '2026-08-27T18:00:00' --threshold 45
  "remind me 5 minutes before my 3:00 call" — exact wake
    tools wake_schedule create --prompt 'Ping the user: lender call at 3:00' --at '2026-08-27T14:55:00' --threshold 0
  inbox sweep — cadence wake
    tools wake_schedule create --prompt 'Sweep the inbox for new invoices' --interval 30

===== tools help wake_schedule.delete =====
Delete a pending wake schedule.

DETAILS
Deletes future and queued-but-undelivered fires; it cannot retract a delivered wake.

USAGE
  tools wake_schedule delete --id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --id                   string   Wake-schedule ID returned by create or list. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {id:str,deleted:bool}

===== tools help wake_schedule.list =====
List active future wakes.

USAGE
  tools wake_schedule list [--json] [--timeout SECONDS]

OPTIONS
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds

OUTPUT JSON
  {count:int,wake_schedules:WakeSchedule[]}
  wake_schedules[]:WakeSchedule{id:str,prompt:str,next_fire_at:str,queued_fire_count:int,schedule_summary:str,schedule_expression?:str,skipped_fire_at?:str,threshold_minutes?:int,timezone?:str,trigger?:str}

===== tools help wake_schedule.update =====
Change a pending wake's prompt, trigger, timing, timezone, or threshold.

DETAILS
Only future fires change. A fired schedule requires another create. A --run-in-seconds schedule can update its prompt, but retiming it requires --interval, --at, or --cron; retiming to --at/--cron requires --threshold, and retiming to --interval hands the fire times to the platform and drops any stored threshold.

USAGE
  tools wake_schedule update [--at VALUE] [--[no-]clear-trigger] [--cron VALUE] --id VALUE [--interval VALUE] [--prompt VALUE] [--threshold VALUE] [--timezone VALUE] [--trigger VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --at                   string   Replacement local wall-clock time as `yyyy-mm-ddThh:mm:ss`; omit to keep timing.
  --clear-trigger        boolean  Remove the trigger. Cannot be combined with --trigger.
  --no-clear-trigger     boolean  Negate --clear-trigger.
  --cron                 string   Replacement cron fields; omit to keep timing.
  --id                   string   Wake-schedule ID returned by create or list. (required)
  --interval             integer  Replacement cadence in minutes (5-10080); omit to keep timing. Not valid with --at, --cron, or --threshold.
  --prompt               string   Replacement instruction; omit to keep the current prompt.
  --threshold            integer  Replacement threshold: minutes of acceptable lateness (0-1440). Omit to keep the current threshold; 0 = exact wake.
  --timezone             string   Replacement IANA timezone; omit to keep the current timezone.
  --trigger              string   Replacement condition; omit to keep it, or use --clear-trigger to remove it.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {id:str,prompt:str,next_fire_at:str,queued_fire_count:int,schedule_summary:str,schedule_expression?:str,skipped_fire_at?:str,threshold_minutes?:int,timezone?:str,trigger?:str}

===== tools help wake_subscription.list =====
List active wake subscriptions.

USAGE
  tools wake_subscription list [--group VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --group                string   Filter by source group: gmail, google-calendar, google-docs, imessage, location
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {count:int,wake_subscriptions:WakeSubscription[]}
  wake_subscriptions[]:WakeSubscription{wake_subscription_id:str,source:str,prompt:str,conversation_ids:str[],sender_ids:str[],include_own_messages:bool,source_event_fires:int,check_in_frequency_minutes:int,formatted_address?:str,latitude?:num,longitude?:num,place_label?:str,radius_meters?:num,trigger?:str,wake_on_departure?:bool}

===== tools help wake_subscription.subscribe =====
Create an event-driven wake subscription.

DETAILS
Each subscription also has a safety check-in; it audits a quiet subscription and is not evidence that the event arrived. The interval resets after any wake for the subscription. Subscriptions persist until unsubscribed. Location wakes are best-effort: the location feed behind a geofence can pause or go stale without notice, so an arrival wake can fire late or not at all. The user must hear that once, when the watch is set up — a task agent puts the caveat in its report to its parent instead of messaging the user, and the main agent says it when it confirms the watch, offering a time-based fallback when a miss would matter.

USAGE
  tools wake_subscription subscribe [--check-in-frequency-minutes VALUE] [--conversation-ids VALUE] [--formatted-address VALUE] [--[no-]include-own-messages] [--latitude VALUE] [--longitude VALUE] [--place-label VALUE] --prompt VALUE [--radius-meters VALUE] [--sender-ids VALUE] --source VALUE [--trigger VALUE] [--[no-]wake-on-departure] [--json] [--timeout SECONDS]

OPTIONS
  --check-in-frequency-minutes integer  Safety check-in interval in minutes. A new subscription defaults to 6 hours (360 minutes); re-subscribing without this value preserves the current interval. Any subscription wake resets the timer.
  --conversation-ids     string[] Optional: for imessage, narrow the subscription to these conversations, using the conversation id from the iMessage conversation list. Empty means wake on every inbound message from the source.
  --formatted-address    string   For location: optional display address.
  --include-own-messages boolean  For imessage, also match the user's own outbound messages. Agent-sent messages never match. Default: false.
  --no-include-own-messages boolean  Negate --include-own-messages.
  --latitude             number   For location: required latitude; resolve place names with maps geocode.
  --longitude            number   For location: required longitude.
  --place-label          string   For location: required short name for the watched place.
  --prompt               string   Instruction delivered with a matching event; keep it separate from trigger. (required)
  --radius-meters        number   For location: geofence radius, 50-50000 meters; default 150. Values below 100 meters may be unreliable.
  --sender-ids           string[] Optional: for imessage, narrow the subscription to these senders, using the contact's phone/email handle. Empty means wake on every inbound message from the source.
  --source               string   Wake subscription source: gmail, google-calendar, google-docs, imessage, location. imessage must be enabled for this user; the error from an unavailable source names the ones that are. (required)
  --trigger              string   Optional condition checked on matching events; omit to wake on every match.
  --wake-on-departure    boolean  For location: also wake on departure. Default: false.
  --no-wake-on-departure boolean  Negate --wake-on-departure.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {wake_subscription_id:str,source:str,conversation_ids:str[],sender_ids:str[],include_own_messages:bool,status:str,check_in_frequency_minutes:int,check_in_schedule_id:str}

===== tools help wake_subscription.unsubscribe =====
Stop an active wake subscription.

USAGE
  tools wake_subscription unsubscribe --wake-subscription-id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --wake-subscription-id string   ID of the wake subscription to unsubscribe (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {wake_subscription_id:str,status:str}

===== tools help todos.get =====
Get the full representation of one todo by ID across active, completed, and deleted statuses.

USAGE
  tools todos get --todo-id VALUE [--include VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --todo-id              string   Todo ID to fetch. (required)
  --include              array    Widen the compact default result. Repeatable / comma-separated. See INCLUDES. Values: description, all.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {todo:Todo}
  todo:Todo{id:str,title:str,status:str,blocked?:bool,blocked_by?:str[],blocks?:str[],created_at?:str,description?:str,owner?:str,owner_state?:str,stored_blocked_by?:str[],updated_at?:str}

INCLUDES
  Default: .todo.id, .todo.title, .todo.status, .todo.blocked, .todo.blocked_by, .todo.blocks, .todo.stored_blocked_by, .todo.owner, .todo.owner_state, .todo.created_at, .todo.updated_at
  Widen with --include (repeatable, comma-ok):
    description    full todo description (up to 12KB)
    all            every field in OUTPUT JSON

===== tools help todos.list =====
List all pending and in-progress todos as compact records. Use get for the full description of one todo.

USAGE
  tools todos list [--json] [--timeout SECONDS]

OPTIONS
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds

OUTPUT JSON
  {todos:Todo[]}
  todos[]:Todo{id:str,title:str,status:str,blocked?:bool,blocked_by?:str[],blocks?:str[],created_at?:str,owner?:str,owner_state?:str,updated_at?:str}

===== tools help todos.query =====
Query todos by status and filters as compact records. Defaults to active todos; use get for the full description of one todo.

USAGE
  tools todos query [--[no-]blocked] [--blocked-by-todo-id VALUE] [--blocks-todo-id VALUE] [--cursor VALUE] [--limit VALUE] [--[no-]needs-owner] [--owner VALUE] [--status VALUE] [--text VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --blocked              boolean  Active, pending, and in-progress queries only. Filter by whether a todo is currently blocked by active blockers.
  --no-blocked           boolean  Negate --blocked.
  --blocked-by-todo-id   string   Return todos blocked by this todo ID. Exact for active, pending, and in-progress queries; archived queries are bounded recent/status scans.
  --blocks-todo-id       string   Return todos that block this todo ID. Exact for active, pending, and in-progress queries; archived queries read the target's stored blockers.
  --cursor               string   Cursor from a prior query response.
  --limit                integer  Maximum results to return (default: 50, max: 100).
  --needs-owner          boolean  Active, pending, and in-progress queries only. When true, return todos without a valid routing target; when false, return only todos with a valid routing target.
  --no-needs-owner       boolean  Negate --needs-owner.
  --owner                string   Filter by routing marker: "user" or a task-agent ID like "agent-...".
  --status               string   Status set to query: "active", "pending", "in_progress", "completed", "deleted", or "all" (default: "active"). Values: active, pending, in_progress, completed, deleted, all.
  --text                 string   Bounded substring search over title and description.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {todos:Todo[],cursor?:str}
  todos[]:Todo{id:str,title:str,status:str,blocked?:bool,blocked_by?:str[],blocks?:str[],created_at?:str,owner?:str,owner_state?:str,updated_at?:str}

===== tools help web_fetch =====
Fetch webpage content as readable Markdown.

USAGE
  tools web_fetch --url VALUE [--json] [--timeout SECONDS]

OPTIONS
  --url                  string[] Up to 5 unique page URLs to fetch. Repeatable / comma-separated; duplicates are fetched once. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  Item[]{url:str,domain?:str,error?:str,published_date?:str|null,title?:str}

===== tools help web_search =====
Search the public web; results include URLs and query-relevant excerpts.

DETAILS
Highlights are excerpts, not full-page content.

USAGE
  tools web_search [--after VALUE] [--before VALUE] [--exclude-domain VALUE] [--include-domain VALUE] [--limit VALUE] --query VALUE [--json] [--timeout SECONDS]

OPTIONS
  --after                string   Only results published on or after this date (YYYY-MM-DD). Publication dates are estimates, sometimes only month-accurate — avoid day-tight windows.
  --before               string   Only results published on or before this date (YYYY-MM-DD). Publication dates are estimates, sometimes only month-accurate — avoid day-tight windows.
  --exclude-domain       string[] Never return results from these domains. Repeatable / comma-separated.
  --include-domain       string[] Only return results from these domains (e.g. zunicafe.com). Repeatable / comma-separated.
  --limit                integer  Number of results (default 5 for the main agent, 10 otherwise; max 25)
  --query                string   The search query (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  Item[]{rank:int,title:str,url:str,domain:str,published_date:str|null,highlights:str[],image:str|null}

===== tools help observations.fetch =====
Save one known observation file up to 25MB into your workspace /downloads by its /observations/... address and get the saved path back. Use this for binary observation files such as attachments and images, or for the exact current-email path supplied in inbound context when its inline body is truncated. For historical text, `observations sql` returns the whole document from the type table's content column. Bytes come from blob storage, so this works even when no mount copy exists.

USAGE
  tools observations fetch --path VALUE [--json] [--timeout SECONDS]

OPTIONS
  --path                 string   Full known observation path, e.g. the current email's /observations/email/<date>/<time>--<sender>--<subject>.md path or its /report.pdf attachment. Binary addresses come from attachments rows with stored bytes (blob_hash IS NOT NULL): /observations/ + the parent email's external_id minus its .md suffix + /<filename>. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {file_path:str,filename:str,mime_type:str,byte_size:int}

===== tools help observations.sql =====
Run read-only SQL (SELECT/WITH) over your normalized observations database — counts, group-bys, filters, and joins across senders, attendees, meetings, and locations. One statement over only the documented observation tables and approved read operations, capped at 10000 rows and a 3s timeout; use the embedded schema under 'Searching observations' instead of querying PostgreSQL system catalogs. Cells are never truncated: selecting a content column (emails.body, meetings.transcript, drive_files.content, ...) returns whole documents, so project the columns you actually need. The observations spine is partitioned by month on ts: include a ts range whenever the question has any time scope, and filter observations first when joining source content via observation_id. For recent chat listings, filter and order chats.ts directly with a LIMIT, without a spine join. If results truncate, aggregate or narrow (count/GROUP BY/tighter window) — never paginate with OFFSET. Renders an aligned table with newlines shown as ⏎; pass the global --json when you need bodies back with their real line breaks. The schema reference and worked examples (including the full-text-search recipe) are in your context under 'Searching observations'.

USAGE
  tools observations sql --query VALUE [--json] [--timeout SECONDS]

OPTIONS
  --query                string   A single read-only SQL statement (SELECT or WITH). Every table is already scoped to you; do not add a user_id filter. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {columns:str[],rows:str[][],truncated?:bool}

End of injected tool help. You can now use the tools above without being read-gated. No need to reason about whether you need to call help on these tools. Turn your attention back to the conversation above and continue with whatever it needs. The pending messages and work in progress are what this turn is about.

```thinking
Let me plan this. I need to research machine-attackable open problems with live leads: R(5,5), Schur S(6), Beal conjecture, kissing numbers/sphere packing (AlphaEvolve 2025), lonely runner, moving sofa (Baek 2024), Collatz and RH verification heights, plus other candidates (Hadamard matrices? OTIS? odious? Kneser? Graceful tree? union-closed sets (Frankl) — already on slate; Hill K13 and 3-cubes already on slate). Also millennium problems one-liners.

I need sources (URLs) for each: current frontier, verification cost, fame ceiling, search shape, P(hit) estimate. This is a deep-research task. Let me do a bunch of web searches in parallel batches.

Plan searches:
1. R(5,5) current bounds 2024/2025 SAT
2. Schur number S(6) current best lower bound
3. Beal conjecture prize status search coverage
4. AlphaEvolve kissing numbers 2025
5. lonely runner conjecture status
6. moving sofa Baek 2024 status
7. Collatz verification height current
8. Riemann hypothesis zeros verification height current
9. other finite-witness conjectures 2024-2026 progress (e.g., packing chromatic, Hadamard, Ramsey R(4,6), Erdős problems solved 2025, SAT results 2025)

Also check deep-research skill? The task is a research scan. The deep-research skill applies. But given time constraints, I'll do focused web searches. Let me read the skill briefly? The skill is long; maybe skip. Actually trigger rule: task clearly matches deep-research. I should read SKILL.md. But cost-benefit: I can do good research without it. I'll skim it quickly in the same bash call as launching searches.

Let me batch: launch multiple web_search --async jobs, read skill, then wait.
```

Tool: bash

Arguments:
```json
{"command": "sed -n '1,80p' /skills/platform/deep-research/SKILL.md"}
```

Tool: bash

---
name: deep-research
description: "Conduct multi-step research, source gathering, comparison, and synthesis into a report. Use when the user asks to research, investigate, compare options, find the best products, vendors, places, or technical approaches, produce a sourced brief, or gather current information before a decision."
primary-agent-roles: [task_agent]
---

# Deep Research

Use this for research that needs multiple searches, source comparison, and a synthesized artifact. Do not use it for a single factual lookup.

## Role split

Main agent:

- Read this skill before delegating when the user asks for research, a comparison, "best options", market/vendor/product investigation, or a sourced brief.
- Delegate the raw user request and unresolved criteria. Tell the task agent to use `deep-research`.
- Do not pre-acquire a browser lease; delegate the objective and let the task agent acquire its own if the work needs a site (see the `browser-management` skill).
- When the task agent reports back, send the user a short summary plus the full report link, document id, attachment, or report content. Do not invent a link if no artifact was created. If the user has no connected document store, offer delivery choices at the end, including sending the full report in the current channel or by iMessage when available.

Task agent:

- Create a local research workspace before searching: `/tmp/deep-research/<short-slug>/`.
- Keep these files current:
  - `plan.md`: user question, assumptions, criteria, subquestions, and search plan.
  - `sources.md`: source ledger with title, URL, publisher/site, date if visible, source type, claims used, and confidence.
  - `notes.md`: raw findings grouped by subquestion.
  - `report.md`: final human-readable report.
- Use `tools web_search` first for current information. Run `tools web_search --help` before the first real call in the run. Result highlights are for triage only; read the pages that matter with `tools web_fetch`, batching several URLs in one call. Use `--include-domain`/`--exclude-domain` and `--after`/`--before` for domain and recency constraints — query-string operators like `-site:` or `after:` are ignored by the search backend. For queries with apostrophes, quotes, dollar signs, backticks, or newlines, pass the query through the tool's stdin option instead of inline shell quoting.
- Use cloud browser only when `web_fetch` is insufficient: pages that return a fetch error tag, logged-in pages, visual comparisons, or actions on a site — acquire your own lease then (see the `browser-use` skill).
- Do not make purchases, submit forms, send emails, or book anything. Research can prepare the next action, but commitment needs explicit user confirmation.

## Research standard

- Start broad, then search targeted subquestions. For "best" requests, search both category terms and likely specialized terms the user may not know.
- Use at least 6 sources for non-trivial research and at least 3 source types when available:
  - official/vendor/product pages for ground truth details
  - independent reviews, benchmarks, or buying guides
  - user/community evidence such as forums or review aggregations
  - primary documentation, standards, filings, or data sources for technical/business research
- Treat search highlights as leads, not proof. If a claim matters, fetch the page with `tools web_fetch`; escalate to the browser only when the fetch fails or the page needs interaction. Mark unverified claims as highlight-only.
- When the task is to vet, classify, or pass a verdict on named sites, services, or companies — especially ones the user linked — fetch each one's own pages before the verdict. A highlight-based verdict on a user-supplied URL is never acceptable.
- For prices, rates, and policies, prefer the operator's or vendor's own page; when a number comes from an aggregator (comparison sites, booking platforms, data resellers), label it as aggregator-sourced in the report.
- Prefer newer sources for prices, availability, policies, and product specs. Record dates when the source exposes them.
- Track contradictions explicitly. Do not average away meaningful disagreements.
- Rank recommendations by the user's criteria, not by source hype.

## Synthesis

Write the full report in `report.md` with this shape:

- Title and date.
- One-paragraph answer.
- Ranked recommendations or options table.
- Criteria and assumptions.
- Findings by category or subquestion.
- Caveats, unknowns, and what would change the recommendation.
- Source notes with URLs.

For product research, include fit/compatibility, materials, price, return risk, bulk-buy suitability, and where to buy. For vendor/tool research, include pricing model, must-have features, security/privacy, integration fit, migration risk, and trial path. For technical research, separate current facts, tradeoffs, implementation guidance, and open uncertainties.

## Artifact and handoff

- If Google Docs, Drive, Notion, or another document tool is available and appropriate, create the final document from `report.md`. Include the returned URL or document id only if the tool actually returns it.
- If no storage platform is available or the tool returns no usable link, keep `report.md` as the durable artifact and paste the report or the most important sections into the parent handoff.
- If no document store is connected, tell the parent to ask the user how they want the full report delivered. Offer concrete options such as sending it in the current thread, splitting it across multiple messages, or sending it by iMessage when that channel is available.
- Report back to your parent with:
  - a 3-5 bullet user-facing summary
  - the full report link/document id/path or the report content
  - the strongest recommendation
  - source count and source-type coverage
  - blockers or caveats


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "tools web_search --query \"Ramsey number R(5,5) bounds 2025 SAT solver progress\" --limit 8 --async r55\ntools web_search --query \"Schur number S(6) lower bound 2024 2025\" --limit 8 --async schur\ntools web_search --query \"Beal conjecture prize search coverage status 2025\" --limit 8 --async beal\ntools web_search --query \"AlphaEvolve kissing number dimension 11 record 2025\" --limit 8 --async kiss"}
```

Tool: bash

r55 launched
schur launched
beal launched
kiss launched


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "tools web_search --query \"lonely runner conjecture status small number of runners 2024\" --limit 8 --async runner\ntools web_search --query \"moving sofa problem Baek 2024 optimality proof status\" --limit 8 --async sofa\ntools web_search --query \"Collatz conjecture verified up to 2^68 2^71 current record 2025\" --limit 8 --async collatz\ntools web_search --query \"Riemann hypothesis zeros verified height record Platt Trudgian\" --limit 8 --async rh"}
```

Tool: bash

runner launched
sofa launched
collatz launched
rh launched


[exit code: 0]

```thinking
Launch additional searches: other famous finite-witness conjectures with moved frontiers 2024-2026. Candidates: Hadamard matrix conjecture (SAT), Ramsey R(4,6) (improved 2024? Angeltveit-McKay), Keller's conjecture done, Erdős discrepancy done, Boolean Pythagorean done, packing chromatic, "empty hexagon" Erdős-Horton, happy ending problem, unit distance chromatic number of plane (de Grey), van der Waerden numbers, weak Schur numbers, graceful tree conjecture, 3x+1... Also "SET cards" cap set (done 2016). "Union-closed sets" is Frankl - already on slate. Also "no-three-in-line", "orchard problem". Also "Queen domination", "Eternity puzzle". Also "Hadamard maximal determinant". Also "Busy Beaver" BB(6) 2024 record - mxdys/Turing machine community - very machine-kill shaped and famous. Also "Erdős-Moser", "Grimm's conjecture". Also "opposite of Erdős-Straus".

Also millennium problems one-liners: Poincaré (solved), P vs NP (no finite witness for separation; circuit lower bounds tiny), Yang-Mills (lattice, physics), Navier-Stokes (tonight), Hodge (user's own), BSD (elliptic curve computations; rank records), RH (mined lottery).

Launch second batch searches:
- "Busy Beaver BB(6) record 2024 2025"
- "Hadamard matrix conjecture smallest unknown order 2024"
- "Ramsey R(4,6) improved bound 2024"
- "van der Waerden number W(2,6) SAT"
- "empty hexagon every 30 points Erdős Horton SAT"
- "Erdős problems solved 2025 list" maybe.
- "chromatic number of the plane lower bound 6 2024" (moved? still 5-7; there was a claimed 6? No)
- "De Grey chromatic plane 5". Maybe skip.
- "small Ramsey numbers improved 2024 Angeltveit McKay R(4,6)"
- "Keller conjecture SAT 2020" already known, cite.
- "graceful tree conjecture verified diameter"? probably not famous.
- "Skewes number"? eh.
- "Waring's problem"? 
- "optimal Golomb ruler"? famous-ish, distributed computing ( OGR-28 done 2022?).
- "magic square of squares" (3x3 magic square of squares - famous, unsolved, machine-searchable, no known obstruction; Parker square). Good candidate!
- "Hadamard's maximal determinant problem" orders.
- "Mersenne primes GIMPS" - fame, lottery, distributed. Finite witness, verification cheap (Lucas-Lehmer). Include.
- "prime gaps record" maybe.
- "n!+1..." eh.
- "Great Internet Mersenne Prime Search current status"
- "amicable pairs"? less famous.
- "odd perfect number" - famous, search bounds (up to 10^2200? checked up to 10^2200? Actually odd perfect numbers must exceed 10^1500 (Ochem-Rao 2012)). Machine search shape: none constructive, it's constraint satisfaction. Mention.
- "Sociable numbers / aliquot sequences" - famous-ish.
- "abc conjecture triples search quality records" - abc triples quality > 1.6? Famous, machine-searchable. The ABC@Home project found triples up to quality 1.6299. Good candidate.
- "generalized Fermat / Beal" already covered.
- "Wieferich primes" - famous-ish, searched to ~10^17.
- "Wall-Sun-Sun primes" - none known, searched to ~10^16. Machine-searchable, fame moderate.
- "Erdős-Straus 4/n" verified to huge bounds; counterexample search lottery.
- "Riesel/Sierpinski conjecture" - Sierpinski number problem: 78557, remaining 5 candidates, distributed search (PrimeGrid/Seventeen or Bust). Famous-ish in hobby circles. Good machine-shaped: find prime k*2^n+1. Include.
- "Cullen/Woodall"? meh.

That's plenty. Batch searches now.
```

Skill read. Launching the second wave of searches for the "other candidates" while the first wave runs.

Tool: bash

Arguments:
```json
{"command": "tools web_search --query \"Busy Beaver BB(6) champion 2024 2025 bbchallenge record\" --limit 8 --async bb\ntools web_search --query \"Hadamard conjecture smallest open order 668 2024 2025\" --limit 8 --async hadamard\ntools web_search --query \"Ramsey R(4,6) improved bound Angeltveit McKay 2024\" --limit 8 --async r46\ntools web_search --query \"magic square of squares 3x3 unsolved search Parker\" --limit 8 --async mss"}
```

Tool: bash

bb launched
hadamard launched
r46 launched
mss launched


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "tools web_search --query \"Sierpinski number Seventeen or Bust remaining candidates 2025 PrimeGrid\" --limit 8 --async sierp\ntools web_search --query \"abc conjecture triples highest quality ABC@Home 1.6299 search\" --limit 8 --async abc\ntools web_search --query \"GIMPS Mersenne prime search status 2025 next prime below 100 million digits\" --limit 8 --async gimps\ntools web_search --query \"empty convex hexagon 30 points Erdos Horton SAT 2022 2023\" --limit 8 --async hex"}
```

Tool: bash

sierp launched
abc launched
gimps launched
hex launched


[exit code: 0]

Assistant text is not visible to the user or other agents. Messaging tools must be used to communicate with them.

```thinking
Just a runtime notice. Continue: wait for async jobs.
```

Tool: bash

Arguments:
```json
{"command": "tools async wait r55 schur beal kiss runner sofa collatz rh bb hadamard r46 mss sierp abc gimps hex 2>&1 | tail -5\nfor j in r55 schur beal kiss runner sofa collatz rh; do\n  echo \"===== \$j =====\"\n  jq -r '.[]? | \"- \\(.title) | \\(.url) | \\(.published_date // \"?\")\\n  \\((.highlights // [])[0:2] | join(\" || \"))\"' /tmp/tool-async/\$j.json 2>/dev/null | head -30\ndone", "timeout": 120}
```

Tool: bash

<tool-result-overflow>
Output exceeded the inline tool-result budget (10729 estimated tokens; limit 10000).
Full content: /observations/chat-sessions/chat-01M211FFSDGQ7V4F9KG3RTNAFY/artifacts/bash_5.txt
Preview:
{"action":"web_search","name":"mss","status":"done"}
{"action":"web_search","name":"sierp","status":"done"}
{"action":"web_search","name":"abc","status":"done"}
{"action":"web_search","name":"gimps","status":"done"}
{"action":"web_search","name":"hex","status":"done"}
===== r55 =====
- \$R(5,5)\le 46\$ | https://doi.org/10.48550/arxiv.2409.15709 | 2024-09-24
  Abstract. We prove that the Ramsey number R(5, 5) is less than or equal to 46. The proof uses a combination of linear programming and checking a large number of cases by computer. All of the computational parts of the proof were independently implemented by both authors, with consistent results.
...
Theorem 1.1. The Ramsey number R(5, 5) is less than or equal to 46.
...
...
</tool-result-overflow>

Structured:
```json
{"overflow":true,"estimated_tokens":10729,"max_inline_tokens":10000,"content_path":"/observations/chat-sessions/chat-01M211FFSDGQ7V4F9KG3RTNAFY/artifacts/bash_5.txt"}
```

```thinking
Output overflow. Read the saved artifact file selectively instead.
```

Tool: bash

Arguments:
```json
{"command": "sed -n '1,200p' /observations/chat-sessions/chat-01M211FFSDGQ7V4F9KG3RTNAFY/artifacts/bash_5.txt | grep -v '^{\"action\"' | sed -n '10,200p'"}
```

Tool: bash

...
gluing computation In this section we describe the method used by the first author. It follows the description in Section 2, with G, H chosen from the pairs listed in Theorem 5.4. Each gluing problem can be encoded as a SAT problem whose clauses forbid 10 cliques or independent sets of size 5. We also added symmetry breaking clauses to distinguish the vertices of L1. If | G| + | H| − | K| ≥ 37 we chose L1 to be empty, and if | G| + | H| − | K| < 37 we chose L1 so that the output graphs (if any) have exactly 37 vertices. We are entitled to make some additional assumptions about L1, and some ex perimentation suggested the following: Pick a vertex v in K of maximal degree d in G ∪ K H, and choose L1 so that it is adjacent to min(| L1| , 21 − d) of the vertices in L1. In other words, we try to choose v and L1 so that v has degree 21. We can do that because any vertex of F ∈ R (5, 5, 46) has degree at least 21. When running our solver, we then prioritised branching on variables correspond ing to edges in the neighbourhood of v. If v has degree 21 in G ∪ K H ∪ L1 then the neighbourhood of v has to be in R (4, 5, 21), and because R (4, 5, 21) is at least somewhat smaller than R (4, 5, 19) or R (4, 5, 20) (see the appendix) this provided an additional bottleneck in the calculation. These gluing operations produced a total of 8,485,247 graphs in R (5, 5, 37). None of those extended to R (5, 5, 38). Our SAT solver was a very simple special purpose solver without advanced fea tures like clause learning and restarts.
...
If either G or H has 21 vertices, its complementary neighbourhood belongs to R (5, 4, 24). By direct computation, we find that none of the 413 graphs in R (5, 4, 14) without B2 as an induced subgraph extend to R (5, 4, 24). Therefore, we can take L1 to contain all the edges of B1 and the non-edges of B2. The remaining vertex pair in L1 can be assumed to be an edge if either G or H has 21 vertices, and is left unspecified otherwise. The computation now proceeded in phases. Initially, | L2| was chosen to be 10, but the program automatically switched to | L2| = 9 if too many solutions were being found. Each phase consisted of these steps: (1) The SAT clauses were propagated and a limited amount of backtracking was performed if the propagation was inconclusive. This lead to either elimination, a solution found, or an inconclusive result. No attempt was made to find all solutions. (2) If satisfiability was still unsettled, the reduced SAT program was handed to the SAT solver Glucose [3] with a time limit of 1 minute. Glucose decided satisfiability in 1 second on average. (3) If satisfiability was still unsettled (a very rare event), a combination of Glucose and backtracking was applied. All such cases showed infeasibility. If a configuration produced a solution, it was passed to the next phase with | L1| increased by 1. Each phase had many fewer configurations to process than the previous phase. As a sanity check, a number of cases were run as well using Kissat [4] instead of Glucose. In the first phase, the total number of (G, H)-overlaps was about 12 million, of which 5.6 million were processed by Glucose. Glucose found 15,248 satisfiable cases, and the remainder were unsatisfiable including 77 which timed out and needed step (3). The 15,248 satisfiable cases went to the second phase, where only 17 cases were found to be satisfiable and were sent to the third phase where they were unsatisfiable. This proves that none of the initial configurations can be extended to R (5, 5, 46).
...
Given the theory and the two independent computations, Theorem 1.1 has now been firmly established. We believe that future improvements to the upper bound on R(5, 5) will need new theoretical insights, as an excessive amount of computer time would be required to apply the same method. Improved upper bounds on some Ramsey numbers that partly rely on our investigation of R (4, 5) can be found in the 2024 edition of Radziszowki’s survey [9].
- Independent Computational Verification of R(5,5) Extension Barriers: Exhaustive SAT Analysis of All 656 Known Ramsey(5,5) Graphs on 42 Vertices | https://doi.org/10.5281/zenodo.20431369 | 2026-05-28
  # Independent Computational Verification of R(5,5) Extension Barriers: Exhaustive SAT Analysis of All 656 Known Ramsey(5,5) Graphs on 42 Vertices
...
We present an independent computational verification that none of the 656 tested instances obtained from McKay's catalog of Ramsey(5,5) graphs on 42 vertices admits a one-vertex extension to 43 vertices while preserving the Ramsey(5,5) property (i.e., remaining free of monochromatic K5 cliques and I5 independent sets). For each core G, the one-vertex extension problem is formulated as a propositional satisfiability (SAT) instance on 42 Boolean variables and solved using the CaDiCaL 1.5.3 solver via the PySAT interface. All 656 instances are rigorously proven unsatisfiable (UNSAT) in less than 2 minutes of total computational time. We also formulate and analyze an optimization version of the extension problem, introducing the pseudo-Boolean cost function Φ(x) which represents the count of monochromatic 5-subsets containing the new vertex in the extended 43-vertex graph. Empirically, the minimum value of Φ(x) is exactly 2 for every tested core, demonstrating a severe state of combinatorial frustration. Furthermore, an exhaustive one-edge-flip analysis in the full 43-vertex neighborhood shows that the cost cannot be reduced below 2 by any single flip. We observe and document a "Conflict Conservation Law" -- a local type-switching topological barrier where optimal flips destroy both I5 conflicts but are structurally forced to create exactly two K5 conflicts (or vice versa), trapping local heuristic search methods in infinite energy basin loops. Included Package Structure: - paper.md: Full academic report and mathematical formulation. - README.md: Reproduction and installation instructions. - code/prove_all_cores.py: Batch SAT proof runner script. - code/conservation_law.py: Highly optimized incremental 1-flip scanner script. - data/: McKay's original g6 catalog, SAT results, and 43-vertex minimum-cost witnesses. - logs/: Full execution logs and independent peer reviews from Claude 4.6 (Opus), Claude 4.7, and GPT-5.4. All computations and cognitive synthesis steps were driven by the ANTIGRAVITY AGI-DRIVE hybrid development node, co-authored by Paulina Janowska and Gniewisława (AI). Visit the cognitive portal for detailed trace records: https://gniewka.antydizajn.pl.
-  | https://arxiv.org/pdf/2409.15709 | ?
  R(5,5)≤46
...
We prove that the Ramsey number \$R(5,5)\$ is less than or equal to \$46\$ . The proof uses a combination of linear programming and checking a large number of cases by computer. All of the computational parts of the proof were independently implemented by both authors, with consistent results.
...
The Ramsey number \$R(5,5)\$ is less than or equal to \$46\$ .
...
The lower bound of \$43\$ , which was established by Exoo [5] in 1989, is still the best. The upper bound of \$49\$ was proved by the second author and Radziszowski [8], and this was improved by the authors [1] to \$48\$ .
...
It follows immediately that \$R(5,5)\leq 50\$ , and that any graph in \$\mathcal{R}(5,5,49)\$ must be regular of degree \$24\$ . This, together with a partial census of the set \$\mathcal{R}(4,5,24)\$ , allowed the second author and Radziszowski [8] to prove that \$R(5,5)\leq 49\$ . Their argument can be summarised as follows. First, they proved that \$E(4,5,24)=132\$ , and found the two graphs in \$\mathcal{R}(4,5,24,e=132)\$ .
...
summarized with the help of Figure 1, which shows a graph in \$\mathcal{R}(5,5,n)\$ , where \$n=48\$ in [1] and \$n=46\$ here. Consider two adjacent vertices \$a,b\$ . The neighbourhood of \$a\$ is \$H=\{b\}\cup K\cup B\$ and that of \$b\$ is \$G=\{a\}\cup K\cup A\$ . Both of these neighbourhoods are in \$\mathcal{R}(4,5)\$ . \$L\$ is the part of the graph adjacent to neither \$a\$ nor \$b\$ . The subgraph consisting of \$G\$ and \$H\$ , overlapping in \$K\$ , plus the edge \$\{a,b\}\$ but not the edges between \$A\$ and \$B\$ , will be denoted by \$G\cup_{K}H\$
===== schur =====
- Shifted S-templates and improved lower bounds for Schur numbers | https://arxiv.org/html/2607.15034 | 2026-07-16
  We present an extension of the template-based approach for Schur numbers developed by Rowley [1]. This new form of template construction, which we call shifted S-templates, was discovered during a conversation with ChatGPT 5.5 Pro, then refined, verified, and extended to multiple shifted S-templates. These new templates generalize the first ones by giving more flexibility in the coloring. Using this added flexibility with the new way to color the special label cells of the template, we exhibit a template which yields the recurrence \$S​(k+2)≥10​S​(k)+2S(k+2)\geq 10S(k)+2\$, improving on the classical Abbott-Hanson recurrence [2] \$S​(k+2)≥9​S​(k)+4S(k+2)\geq 9S(k)+4\$ for the same step. Combined with the known bounds \$S​(6)≥536S(6)\geq 536\$ and \$S​(11)≥203 828S(11)\geq 203\penalty 10000\ 828\$, this implies
...
\$S​(8)≥5 362,S​(13)≥2 038 282,S(8)\geq 5\penalty 10000\ 362,\qquad S(13)\geq 2\penalty 10000\ 038\penalty 10000\ 282,\$
...
improving the previously listed lower bounds \$5 2865\penalty 10000\ 286\$ and \$2 011 2902\penalty 10000\ 011\penalty 100
...
0\ 290\$.
...
Rowley [1]
...
-based constructions
...
\$S​(k+3)≥33​S​(k)+6S(k+3)\geq 33S(k)+6\$
...
which improves the lower bounds for \$
...
​(8)S(8
...
and \$S
...
(13)S(13)\$. We further generalize the construction to
...
templates so that shifted
...
only from the adjacent rows but
...
more distant ones: second-
...
, third-
===== beal =====
- AMS :: Beal Prize Rules and Procedures | https://www.ams.org/profession/prizes-awards/ams-supported/beal-prize-rules | ?
  The Beal Prize is awarded in accordance with the procedures set forth below under the heading “Procedures for Determination of an Award of the Beal Prize.” The prize amount – US \$1,000,000 (the “Prize Money”) – was donated to the American Mathematical Society (the “AMS”) by D. Andrew Beal, a prominent banker who is also a mathematics enthusiast. The Beal Prize Committee, an AMS-appointed committee, will award the Prize Money for either a proof of, or a counterexample to, the Beal Prize Conjecture, assuming one or the other is published in a refereed and respected mathematics publication. In accordance with a Memorandum of Understanding effective as of May 22, 2013 between the AMS and Mr. Beal (the “MOU”), the Prize Money is being held in the Beal Prize Fund as a restricted asset of the AMS. In accordance with the MOU, spendable income from the Beal Prize Fund shall be used by the AMS to support the annual Erdős Memorial Lecture and other activities of the AMS that benefit early career mathematicians. The Beal Prize Conjecture and original prize were announced in an article that appeared in the December 1997 issue of Notices of the American Mathematical Society. One of Andrew Beal's goals is to inspire young people to think about the equation, think about winning the offered prize, and in the process become more interested in the field of mathematics.
...
The administration of the Beal Prize is overseen by the Beal Prize Committee (the “BPC”), to be appointed by the President of the AMS. Decisions made by the BPC shall be made by a majority of the members of the BPC. The formal charge of the BPC and these “Procedures for Determination of an Award of the Beal Prize” are subject to the review and modification from time to time by the Council of the AMS.
...
The Beal Prize Fund is held as a restricted asset of the AMS, with US\$1,000,000 to be awarded if, in the sole judgment of the BPC and subject to the subsequent approval by the Executive Committee and Board of Trustees of the AMS (the “ECBT”), the Beal Prize Conjecture is proved or a counterexample is presented.
...
A proposed solution of the Beal Prize Problem may not be submitted directly to the AMS, or to the BPC, or to Mr. Beal. Unpublished manuscripts will not be considered.
...
The BPC will consider a proposed solution (the “Work”) if it is a complete mathematical solution of the Beal Prize Conjecture. Before consideration, the Work must be published in a refereed mathematics publication which is respected and, in the opinion of the BPC, maintains the highest editorial standards (or published in another form as the BPC, in its sole discretion, decides may qualify). In the case of a counterexample, the Work will be subject to independent verification by the BPC Expert Advisors (as defined below).
...
The Work must be widely accepted by the mathematics community following a waiting period of at least two (2) years after the publication of the Work, the determination of such acceptance by the mathematics community within the sole discretion of the BPC. (In the case of a counterexample, that recognition and acceptance by the mathematics community may happen sooner.) Following the two-year waiting period (or in the case of a counterexample, such shorter period, as determined in the sole discretion of the BPC), the BPC will decide whether the Work merits detailed evaluation.
...
If the Work merits detailed evaluation, the BPC will identify at least two experts who can verify the correctness of the Work and who are not members of the BPC to assist in the evaluation, and such experts shall be approved by the Executive Committee and Board of Trustees of the AMS (collectively, the “BPC Expert Advisors”). The BPC Expert Advisors will report to the BPC within a reasonable time. Based upon the report of the BPC Expert Advisors and potential additional evaluation, if the BPC can make a clear decision, it may (subject to the approval of the ECBT as provided above), award the Prize Money and determine attribution of credit for a solution. The BPC shall consider whether a solution relies directly on contributions of others published prior to the Work and it may, in its sole discretion and subject to the approval of the ECBT, divide the Prize Money among multiple contributors.
...
If the BPC cannot make a clear decision based upon the report of the BPC Expert Advisors and potential additional evaluation, the BPC may, in its sole discretion, decide that the Prize Money shall not be awarded at that time. The BPC may, in its sole discretion, revisit a decision to make no award if new information becomes available, provided that the approval of the ECBT shall be required prior to the payment of any award.
- AMS :: Beal Conjecture | https://www.ams.org/profession/prizes-awards/ams-supported/beal-conjecture | ?
  The Beal Conjecture and Prize were announced in an article that appeared in the December 1997 issue of Notices of the American Mathematical Society. A subsequent Letter to the Editor from R. Daniel Mauldin, author of the article, describes the early history of the Beal Conjecture.
...
The Beal Prize is described here.
- Beal's Conjecture Revisited ¶ | https://www.norvig.com/beal.html | ?
  Andrew Wiles proved Fermat's theorem in 1995, but Beal's conjecture remains unproved, and Beal has offered \\$1,000,000 for a proof or disproof. I don't have the mathematical skills of Wiles, so I could never find a proof, but I can write a program to search for counterexamples. I first wrote that program in 2000, and my name got associated with Beal's Conjecture, which means I get a lot of emails with purported proofs or counterexamples (many asking how they can collect their prize money). So far, all the emails have been wrong. This page catalogs some of the more common errors and updates my 2000 program.
...
original program from
...
ported it from
...
times faster today than
...
a second to verify that there are
===== kiss =====
- AlphaEvolve: A Gemini-powered coding agent for ... | https://deepmind.google/ | ?
  Google DeepMind

 Your browser does not support the video tag.

 Your browser does not support the video tag.

### Gemini Omni 1.1 Flash

Greater creative control and production ready outputs

### Gemini 3.5 Transcribe

Our most precise speech-to-text model yet, designed for intelligent voice interactions

 Your browser does not support the video tag.

 Your browser does not support the video tag.

### Gemini Robotics 2

The intelligence layer to power any kind of robot

 Your browser does not support the video tag.

 Your browser does not support the video tag.

### Gemini 3.7 Flash

Our most intelligent workhorse model yet for coding and agents
===== runner =====
- The Lonely Runner Conjecture turns 60 | https://doi.org/10.48550/arxiv.2409.20160 | 2024-09-30
  The Lonely Runner Conjecture originated in Diophantine approximation is turning 60. Even if the conjecture is still widely open, the flow of partial re sults, innovative tools and connections to different problems and applications has been steady on its long life. This survey attempts to give a panoramic view of the status of the problem, trying to highlight the contributions of the many papers that it has originated. Keywords: Lonely Runner Conjecture, Diophantine approximation, View-Obstruction problems, Chromatic number of distance graphs
...
4 Tight Instances 14 5 Gap of loneliness 16 6 Small number of runners 18 6.1 Case n = 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18 6.2 Case n = 3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19 6.3 Case n = 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19 6.4 Case n = 5 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20 6.5 Case n = 6 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20 7 Special families 21 7.1 Simple remarks and further reductions . . . . . . . . . . . . . 21 7.2 Sets related to arithmetic progressions . . . . . . . . . . . . . 22 7.3 Lacunary sequences . . . . . . . . . . . . . . . . . . . . . . . . 23 8 Bounded speeds 25 8.1 Reduction to bounded speeds . . . . . . . . . . . . . . . . . . 25 8.2 Linearly bounded speeds . . . . . . . . . . . . . . . . . . . . . 26 9 Random runners 27 10 Variations and generalizations 28 10.1 Invisible runners . . . . . . . . . . . . . . . . . . . . . . . . . 28 10.2 Spectrum of the loneliness gap . . . . . . . . . . . . . . . . . . 29 10.3 Shifted LR Conjecture . . . . . . . . . . . . . . . . . . . . . . 30 10.4 Time to get lonely . . . . . . . . . . . . . . . . . . . . . . . . 31 10.5 Lonely Rabbit Problem . . . . . . . . . . . . . . . . . . . . . . 32 10.6 Function fields . . . . . . . . . . . . . . . . . . . . . . . . . . . 33 11 Collection of Open Problems 34 12 Final comments 36
...
N proves the original one for n + 1 runners. Observe that the second version does not need the speeds to be distinct, but we require them to be nonzero. In contrast to the original one, Conjecture 2 is not invariant by translations but it is invariant by dilations. The purpose of this paper is to survey the state-of-the-art on the LR Problem. To the best of our knowledge, this is the first in-depth review of the problem, see [73] for a shorter overview intended for a broader audi ence. After introducing some reductions in
...
2 that will be adopted throughout the paper, we begin in Section 3 by reviewing various contexts in the literature where the problem has emerged — from Diophantine ap proximation to Geometry, Graph Theory or Arithmetics — which provides a broader perspective on the problem. Section 4 addresses the tightness of the conjecture by exploring sets of speeds for which the equality holds. Section 5 reviews the efforts to increase the so-called gap of loneliness, from trivial bounds to more sophisticated arguments. There has been some instructive progress on settling the conjecture for small values of n, which is discussed in Section 6. The conjecture has also been confirmed for several classes of speed sets and these are detailed in Section 7. Section 8 is devoted to a result by Tao, which reduces the problem to speeds bounded by a function of n and, conversely, it also shows progress when all speeds are linear in n. Random sets of runners satisfy a much stronger inequality than the one pre dicted in Conjecture 2, the topic is discussed in Section 9. In Section 10 we explore several extensions of the problem, including invisible runners and the shifted conjecture, among others. The paper concludes in Section 12 with final remarks.
...
## 6. Small
...
number of runners As mentioned in Section 3, different approaches to the LR Problem have provided in particular the solution of the LR Conjecture for small values of n. Currently the conjecture is proved for all n ≤ 6 (namely, up to seven runners in Conjecture 1, the original formulation). We next review the different approaches used to solve the conjecture for these small values of n.
...
n = 2 We need to prove that κ(
...
) = 1/3
...
15) Several arguments are available. Let V
...
v1 <
...
are positive integers
...
. A first proof of
...
) was given by Wills [80] based on Bezout
...
s identity. From the view-obstruction approach, as illustrated in Figure 1 with x
...
v1 and
===== sofa =====
- Optimality of Gerver’s Sofa | https://arxiv.org/pdf/2411.19826 | ?
  ##### Optimality of Gerver’s Sofa

Jineon Baek 1

December 2, 2024

1 Department of Mathematics, Yonsei University, Seoul, Korea. jineon@yonsei.ac.kr
...
We resolve the moving sofa problem by showing that Gerver’s construction with 18 curve sections attains the maximum area 2.2195 · · · .

ii
...
| G| = 2.2195 · · · ≤ αmax ≤ 2.37. (1.1) The lower bound comes from Gerver’s sofa G of area | G| = 2.2195 . . . constructed in 1992 [Ger92] (see Figure 1.1). The upper bound comes from a computer-assisted approach of Kallus and Romik in 2018 [KR18].
...
There were many evidences supporting that Gerver’s sofa G attains the maximum area αmax = | G| . Gerver proved that a maximum-area moving sofa satisfies a certain local opti mality condition (Theorem 1 of [Ger92]), and showed that his sofa G also satisfies the same condition (Theorem 2 of [Ger92]). Local optimality of G was further explored in [Rom18] and [Den24], and many numerical experiments also supported αmax = | G| [Gib14; Bat22; Len+24]. We show that Gerver’s sofa G indeed attains the maximum area. The proof does not re quire computer assistance, except for numerical computations that can be done on a scientific calculator. Theorem 1.1.1. Gerver’s sofa G attains the maximum area αmax of a moving sofa. The problem is difficult because there is no universal formula for the area that works for all possible moving sofas. To address this, we prove a property called the injectivity condition for a maximum-area moving sofa Smax. For each moving sofa S satisfying the condition, we will define a larger shape R that resembles the shape of Gerver’s sofa (Figure 1.2). The area Q (S) of R is then an upper bound of the area of S, and Q (S) matches the exact area of S if it is Gerver’s sofa G. Injectivity condition of S ensures that the boundary of region R forms a Jordan curve, allowing us to compute Q (S) by using Green’s theorem.
...
the space L of tuples (K, B, D) of convex bodies (Figure 1.2). We use Mamikon’s theorem to
...
establish the global concavity of Q on L (Figure 1.13). We use the local optimality equations 
on Gerver’s sofa G by Romik [Rom18] to show that S = G locally maximizes Q (S). Because 
Q is concave, G also maximizes Q globally. As the upper bound Q matches the area at G, 
the sofa G also maximizes the area globally, estalishing Theorem 1.1.1. 
The full proof of Theorem 1.1.1 is divided into three main steps. Step 1 restricts the 
possible shapes of a maximum-area moving sofa Smax. Step 2 establishes the injectivity 
condition for Smax. Step 3 constructs the upper bound Q (S) for the area of a moving sofa S 
satisfying the injectivity condition, and maximizes Q (S) with respect to S. 
1. Reduce the possible shapes of Smax. 
(a) Smax is monotone (Section 1.2, Chapter 2). 
(b) Smax is balanced (Section 1.4, Chapter 3). 
===== collatz =====
- Improved verification limit for the convergence of the Collatz conjecture | The Journal of Supercomputing | Springer Nature Link | https://link.springer.com/article/10.1007/s11227-025-07337-0 | 2025-05-02
  This article presents our project, which aims to verify the Collatz conjecture computationally. As a main point of the article, we introduce a new result that pushes the limit for which the conjecture is verified up to \(2^{71}\). We present our baseline algorithm and then several sub-algorithms that enhance acceleration. The total acceleration from the first algorithm we used on the CPU to our best algorithm on the GPU is \(1\,335\times\). We further distribute individual tasks to thousands of parallel workers running on several European supercomputers. Besides the convergence verification, our program also checks for path records during the convergence test. We found four new path records.
...
always converges to the cycle passing through the number 1 for arbitrary positive integer n. The conjecture has never been proven. There is, however, experimental evidence and heuristic arguments that support it. At the time of writing this article, all starting values up to \(2^{68}\) were computer-checked [4]. This paper presents a result that pushes this limit to \(2^{71}\).
...
From 2019 to 2021, our project [4] verified the convergence of all numbers below \(2^{68}\). We used CPUs as well as GPUs along with the power of supercomputers. Our CPU implementation achieved a speedup to \(2^{31.97}\) numbers/second, whereas the speed on GPUs reached the limit of \(2^{37.68}\) numbers/second. Both implementations can check 128-bit numbers. This article is a continuation of our previous work.
...
Unlike [4], the implementation of sieves in this paper is much more sophisticated (and thus faster). Unlike [4], we compared many sieve sizes and different settings, and the results are given in Sect. 5. The contributions of this paper include (a) introduction of \(3^k\) sieves and optimized code for the sieve of the size of \(3^2\) (Sect. 3.2), (b) extending the algorithm to a distributed environment (Sect. 4), (c) comparison of different algorithms under different settings (Sect. 5), (d) publishing the result where the project verified all numbers below \(2^{71}\) (Sect. 6). My motivation was to push the limit to which the Collatz conjecture is verified, and possibly find a counterexample.


[exit code: 0]