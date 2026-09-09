---
title: "crack: genus-4 semiregularity spec (chat-01M215WY4)"
---

_1 transcript files aggregated._

Scope the genus-4 semiregularity computation - the first datum of the "crack test" for the Hodge-on-abelian-varieties program.

Context: Markman (arXiv:2502.03415) proved algebraicity of Weil classes via secant sheaves; the semiregularity argument in that paper is special to genus 3. His companion paper (arXiv:2509.23079) says verbatim "semi-regularity has not been addressed yet" for the genus-4 case - that is the named crack. Buchweitz-Flenner developed the semiregularity map machinery.

Deliverable (report back, do not run heavy compute yet):
1. Precise mathematical specification of the computation: exactly which sheaf, on which variety/moduli, which Ext groups or obstruction-map rank decides semiregularity in the genus-4 case. Cite the exact statements in 2502.03415 / 2509.23079 that pin this down - read both papers closely.
2. Existing tooling survey: Macaulay2 / Singular / Oscar packages that can compute the needed Ext or obstruction data; any published code from Markman, Buchweitz-Flenner, or others.
3. Cost estimate and execution plan: what a first datum costs (hours? days?), on what hardware. Constraints: the 2-core compute box is busy ~15h with another job; nothing runs on the user's personal machines; we have Instinct-side infra.
4. Kill criteria: what result would make the whole computation moot (e.g. someone already computed it - check the literature hard for that first).

Sharpened spec from the markman/lift verification lane - your scoping target is now exact and doubly motivated:

1. THE EXACT COMPUTATION: Ext^2(F,F) and rank of the obstruction map ob_F: HH^2(X) -> Ext^2(F,F) for explicit candidate secant sheaves on X = Pic^3(C), C a Brill-Noether generic genus-4 curve with two g^1_3's (Markman 2502.03415 Example 8.2.4). The genus-3 analog is Prop 8.3.9 (rank ob_F = 6, PROVEN) - the genus-4 case is the named gap ("currently able to handle it only for dim(X) <= 3", ICM survey 2509.23403).

2. WHY IT'S DOUBLY MOTIVATED (new): Schoen's Prop 10 degeneration (Compositio 114, 1998) is dimension-generic - discriminant multiplicativity under products, rank-2 Weil surfaces with complementary invariant, specialization in the universal family. Sign arithmetic one dimension up checks out (eightfold +1 = sixfold -1 x surface -1). So a split-EIGHTFOLD algebraicity theorem (disc +1) would close ALL sixfold discs including the nonsplit ones - and the genus-4 semiregularity computation is the SOLE blocker. Your computation's outcome: rank-sufficient => every nonsplit Weil sixfold closes by theorem; rank-insufficient => the field's only documented stalemate gets a second witness.

3. NOBODY has ever executed a lift/semiregularity computation numerically in a Hodge-class application (verified) - first-of-its-kind, zero off-the-shelf software. Include that in the tooling survey: what has to be built.

4. Also assess as a possible side-quest: Mostaed arXiv:2603.20268 open problem O1 - 2816 explicit algebraic equations at l=43 over F_43 deciding non-emptiness of V cap W_K, "requiring no new theory", explicitly inviting computation. Finite and swarm-shaped, but note its outcome settles EXISTENCE of the CM points, not algebraicity. One paragraph verdict on whether it's worth a lane.

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
Let me understand the task. I'm a task agent. The parent gave me a scoping task: scope the genus-4 semiregularity computation for Markman's Weil-class algebraicity program. Then a second message sharpened the spec: Ext^2(F,F) and rank of obstruction map ob_F: HH^2(X) -> Ext^2(F,F) for secant sheaves on X = Pic^3(C), C Brill-Noether generic genus-4 curve with two g^1_3's. Plus tooling survey, cost estimate, kill criteria, and a one-paragraph verdict on Mostaed arXiv:2603.20268.

Note: arXiv:2509.23079 and arXiv:2603.20268 — 2509 is Sep 2025 (plausible), 2603 would be March 2026 — current date is Sep 2026, so plausible.

I need to do deep research: read both Markman papers closely (2502.03415, 2509.23079, ICM survey 2509.23403), check literature for anyone having computed genus-4 semiregularity, survey Macaulay2/Singular/Oscar tooling, cost estimate.

This is a deep-research task. I have web_search and web_fetch. I should fetch the arXiv papers. The deep-research skill exists — should I read it? The task is research into a report. Yes, let me read the skill briefly, plus start fetching papers.

Plan:
1. Fetch arXiv abstracts/HTML for 2502.03415, 2509.23079, 2509.23403.
2. Read relevant sections (Example 8.2.4, Prop 8.3.9 in 2502.03415).
3. Search literature for genus-4 semiregularity computations for Markman.
4. Survey tooling: Macaulay2 packages for Ext over sheaves (e.g., "SheafCohomology", Tate resolutions), deformation theory packages.
5. Mostaed 2603.20268 verdict.
6. Report to parent.

ArXiv HTML pages: arxiv.org/abs/2502.03415 and arxiv.org/html/2502.03415v2 (HTML version). web_fetch renders markdown. Papers are long; the HTML may be truncated by web_fetch. Let me try fetching the abs pages first and the HTML full text. Possibly better to download the PDF and extract text with tools read? tools read renders PDFs. I could wget the PDF to /downloads and use tools read --file-path. That might give better full text. Actually for careful reading of specific propositions, PDF via tools read could be good but it's a huge paper. HTML fetch of specific sections may work: arxiv.org/html/2502.03415v2 is a single big page — web_fetch might truncate.

Let me batch: read deep-research SKILL.md, fetch abs pages for the three arXiv IDs, and search for Markman semiregularity genus 4 computations.

I'll do this in one bash call with async fetches? web_fetch supports up to 5 URLs in one call. Let me do:

- tools web_fetch --url arxiv.org/abs/2502.03415, arxiv.org/abs/2509.23079, arxiv.org/abs/2509.23403, arxiv.org/abs/2603.20268
- sed the deep-research skill
- web_search for prior computations

Then proceed.
```

Tool: bash

Arguments:
```json
{"command": "sed -n '1,120p' /skills/platform/deep-research/SKILL.md\necho \"===== ABS PAGES =====\"\ntools web_fetch --url \"https://arxiv.org/abs/2502.03415\" --url \"https://arxiv.org/abs/2509.23079\" --url \"https://arxiv.org/abs/2509.23403\" --url \"https://arxiv.org/abs/2603.20268\" --json 2>&1 | head -c 6000"}
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
===== ABS PAGES =====
[{"domain":"arxiv.org","published_date":null,"title":"Cycles on abelian 2⁢𝑛-folds of Weil type from secant sheaves on abelian 𝑛-folds","url":"https://arxiv.org/abs/2502.03415"},{"domain":"arxiv.org","published_date":null,"title":"Secant sheaves on abelian \n      \n        n\n      \n    -folds with real multiplication and Weil classes on abelian \n      \n        \n          ⁢\n          2\n          n\n        \n      \n    -folds with complex multiplication","url":"https://arxiv.org/abs/2509.23079"},{"domain":"arxiv.org","published_date":null,"title":"[2509.23403] Secant sheaves and Weil classes on abelian varieties","url":"https://arxiv.org/abs/2509.23403"},{"domain":"arxiv.org","published_date":null,"title":"McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds","url":"https://arxiv.org/abs/2603.20268"}]


[exit code: 0]

Structured:
```json
[{"url":"https://arxiv.org/abs/2502.03415","title":"Cycles on abelian 2⁢𝑛-folds of Weil type from secant sheaves on abelian 𝑛-folds","domain":"arxiv.org","published_date":null},{"url":"https://arxiv.org/abs/2509.23079","title":"Secant sheaves on abelian \n      \n        n\n      \n    -folds with real multiplication and Weil classes on abelian \n      \n        \n          ⁢\n          2\n          n\n        \n      \n    -folds with complex multiplication","domain":"arxiv.org","published_date":null},{"url":"https://arxiv.org/abs/2509.23403","title":"[2509.23403] Secant sheaves and Weil classes on abelian varieties","domain":"arxiv.org","published_date":null},{"url":"https://arxiv.org/abs/2603.20268","title":"McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds","domain":"arxiv.org","published_date":null}]
```

```thinking
All four papers exist. Now I need the full text of the key sections. Best approach: download PDFs of 2502.03415 (the main one with Example 8.2.4 and Prop 8.3.9), 2509.23079, 2509.23403, and 2603.20268, then extract text via tools read or pdftotext (if available). Let me check for pdftotext, and download PDFs via curl.

Actually HTML versions on arxiv might be easier to grep. arxiv.org/html/2502.03415v2 — I can curl and grep. But web_fetch renders to markdown with truncation possible. Curl + grep on the HTML is better for targeted extraction. Let me download both HTML and check.

Let me set up workspace and fetch.
```

Tool: bash

Arguments:
```json
{"command": "mkdir -p /tmp/deep-research/genus4-semireg && cd /tmp/deep-research/genus4-semireg\nfor id in 2502.03415 2509.23079 2509.23403 2603.20268; do\n  curl -sL \"https://arxiv.org/pdf/\$id\" -o \"\$id.pdf\" --max-time 90 &\ndone\nwait\nls -la *.pdf\nfile *.pdf\nwhich pdftotext pdftk python3; python3 -c \"import fitz\" 2>&1 | head -1", "timeout": 120}
```

Tool: bash

-rw-r--r-- 1 sandbox sandbox 1102305 Sep  9 01:15 2502.03415.pdf
-rw-r--r-- 1 sandbox sandbox  630342 Sep  9 01:15 2509.23079.pdf
-rw-r--r-- 1 sandbox sandbox  515151 Sep  9 01:15 2509.23403.pdf
-rw-r--r-- 1 sandbox sandbox  751185 Sep  9 01:15 2603.20268.pdf
2502.03415.pdf: PDF document, version 1.5, 96 pages
2509.23079.pdf: PDF document, version 1.7, 45 pages
2509.23403.pdf: PDF document, version 1.7, 23 pages
2603.20268.pdf: PDF document, version 1.7, 7 pages
/usr/bin/pdftotext
/usr/bin/python3
warning: The `fitz` API is deprecated and will be removed in future. Use `import pymupdf` instead.


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "cd /tmp/deep-research/genus4-semireg\nfor id in 2502.03415 2509.23079 2509.23403 2603.20268; do pdftotext -layout \"\$id.pdf\" \"\$id.txt\"; done\nwc -l *.txt\necho \"=== find Example 8.2.4 and Prop 8.3.9 in main paper ===\"\ngrep -n \"8.2.4\\|8\\.3\\.9\\|semi-regular\\|semiregular\" 2502.03415.txt | head -40"}
```

Tool: bash

  4790 2502.03415.txt
  2180 2509.23079.txt
  1143 2509.23403.txt
  2103 2603.20268.txt
 10216 total
=== find Example 8.2.4 and Prop 8.3.9 in main paper ===
101:    9.3. A semiregular reflexive secant⊠2 -sheaf                                      81
347:obFi : HH 2 (X) → Ext2 (Fi , Fi ) has rank 6 (Proposition 8.3.9).
351:The q-th component σq of the semiregularity map
360:E is said to be semiregular, if σ is injective. Buchweitz and Flenner proved that when
361:E is semiregular the pair (Y, E) deforms locally in the sublocus in the smooth base of
370:goes through for such a sheaf (Definition 7.3.5) and the semiregularity map is defined as
376:   Keep the notation of Theorem 1.4.1. The sheaf E in the theorem is not semiregular.
378:9.3, which produces a semiregular sheaf. Let G1 and G2 be cyclic subgroups of X of
397:a Ḡ-equivariant sheaf Ẽ. The latter descends to a semiregular reflexive sheaf Ē over Y
404:    1One needs to verify that our semiregularity map is injective, if and only if Pridham’s is.
420:genus curves, but the proof of their semiregularity is special to genus 3.
464:Hodge conjecture for semiregular sheaves. We then formulate a conjectural generaliza-
465:tion for semiregular sheaves of rank r > 0 twisted by a Čech 2-cocycle with coefficients
492:semiregular simple reflexive sheaf B over (X × X̂)/Ḡ, twisted by a Čech 2-cocycle
494:The semiregularity of B follows from the equality ker(obG ) = ker(ch(G)) mentioned
496:Finally we derive from the semiregularity theorem the algebraicity of the Hodge-Weil
1902:  In Section 7.1 we recall the definition of the semi-regularity map of a coherent sheaf
1903:F in terms of its Atiyah class atF . A sheaf is semiregular, when its semi-regularity
1904:map is injective. In Section 7.2 we extend the definition of the semi-regularity map for
1908:as Conjecture 7.3.9. It states that a semiregular twisted sheaf on a special fiber of a
1919:q-th component σq of the semiregularity map
1929:The sheaf E is said to be semiregular, if σ is injective. We have the commutative
1986:where the semiregularity map σB is defined as in equation (7.1.1) with atE replaced by
2116:2-cocycle with coefficients in µr ) is said to be semiregular, if the semiregularity map σB
2120:ferent terminology. In [Pr] the semiregularity map takes values in Deligne cohomology.
2121:See also [HP, Theorem 14.4] for an application of Pridham’s semiregularity theorem for
2125:is a semiregular rank r coherent sheaf over M0 , twisted by a cocycle with coefficients in
2268:Proof. Step 1: Let B be a rank r semiregular coherent sheaf over M0 twisted by a Čech
2298:   Step 4: We prove next that the sheaf Ẽ0 is semiregular. The homomorphism p∗0 :
2321:morphisms are injective, and the left vertical homomorphism is the semiregularity map
2322:σB , which is assumed to be injective. Hence, the semiregularity map σẼ0 is injective as
2503:and so χ(F ∨ ⊗ F ) is relevant for the semi-regularity property of F in the absolute or
2611:d + 1. However, Fd := IZ (Θ) is unlikely to be semiregular, and the semiregularity map
2648:Example 8.2.4. Keep the notation of Example 8.2.3, let C be a non-hyperelliptic curve
2700:8d + 2 dim Ext1 (Fd , Fd ) − 2 grows linearly with d, and hence it can be semi-regular for
2705:(8.2.4)         Z
2739:Comparing with (8.2.4) we get 9 − 24λ = 17, so λ = −1/3.                                    □
2899:surjective, then E is semiregular.
2905:still conclude that the semiregularity map restricts to the image of the obstruction map
2911:                     satisfies the hypotheses of Lemma 8.3.4 and is thus semiregular as


[exit code: 0]

```thinking
Good. Let me read the key sections: lines around 2648 (Example 8.2.4), 2899-2950 (Prop 8.3.9 area), 340-430 (introduction summary), 1900-1990 (semiregularity map definition). Let me extract those ranges.
```

Tool: bash

Arguments:
```json
{"command": "cd /tmp/deep-research/genus4-semireg\necho \"===== Intro summary (330-430) =====\"; sed -n '330,430p' 2502.03415.txt\necho \"===== Example 8.2.3-8.2.4 (2600-2760) =====\"; sed -n '2600,2760p' 2502.03415.txt"}
```

Tool: bash

===== Intro summary (330-430) =====
      sheaf of rank 8d over X × X̂ (Proposition 9.2.2).
  (3) The characteristic class κ(E) := exp(−c1 (E)/rank(E))ch(E) remains of Hodge
      type under every deformation of (X × X̂, η, h) as a polarized abelian sixfold of
      Weil type (Lemma 6.2.3).
  (4) The η(K)-translates of the graded summand κ3 (E) of κ(E) in H 3,3 (X × X̂, Q),
      together with h3 , span the 3-dimensional subspace Qh3 ⊕ HW  ˆ P (Proposition 6.4.1
      and Lemma 8.3.1).
  (5) E deforms with (X × X̂, η, h) to first order as a twisted sheaf in every direction in
      the 9-dimensional moduli space of polarized abelian sixfolds of Weil type (Lemma
      8.4.1 (2) and Remark 8.5.4).

   Orlov’s derived equivalence Φ : Db (X × X) → Db (X × X̂) relates diagonal general-
ized (including non-commutative and gerby) deformations of Db (X × X) along which
the objects Fi , i = 1, 2, deform, to commutative deformations of X × X̂ as polarized
abelian varieties of Weil type (with an additional gerby structure), by Corollary 8.5.2.
The proof of (5) above reduces to showing that Fi deforms to first order along a 9-
dimensional subspace of HH 2 (X). This amounts to showing that the obstruction map
obFi : HH 2 (X) → Ext2 (Fi , Fi ) has rank 6 (Proposition 8.3.9).

1.5. Semiregular K-secant sheaves. Let E be a coherent sheaf on a N -dimensional
compact Kähler manifold Y . Denote the Atiyah class of E by atE ∈ Ext1 (E, E ⊗ Ω1Y ).
The q-th component σq of the semiregularity map
                                                               N
                                                               Y −2
                  σ := (σ0 , . . . , σN −2 ) : Ext2 (E, E) →          H q+2 (Y, ΩqY )
                                                               q=0
8                                                 EYAL MARKMAN

                                           (atE )q /q!                           Tr
is the composition Ext2 (E, E) −→ Extq+2 (E, E ⊗ ΩqY ) −→ H q+2 (Y, ΩqY ). The sheaf
E is said to be semiregular, if σ is injective. Buchweitz and Flenner proved that when
E is semiregular the pair (Y, E) deforms locally in the sublocus in the smooth base of
a deformation of Y , where ch(E) remains of Hodge-type [BF1, Th. 5.1].
   If E is locally free, then the projective bundle P(E) often deforms over a larger family
relaxing the condition that c1 (E) remains of Hodge-type (1, 1). Every Pr−1 -bundle
admits a lift to a locally free sheaf twisted by a Čech 2-cocycle with coefficients in
the local system µr of r-th roots of unity and with trivial determinant. The Buchweitz-
Flenner theorem has a generalization for twisted sheaves [Pr, Remark 2.6]. We formulate
a conjectural generalization of the Buchweitz-Flenner theorem for such twisted sheaves,
which we believe1 follows from Pridham’s result. The usual definition of the Atiyah class
goes through for such a sheaf (Definition 7.3.5) and the semiregularity map is defined as
in the untwisted case. Conjecture 7.3.9 states that E deforms over the sublocus of the
base of the deformation, where κ(E) remains of Hodge type. Note that if E is locally
free, then κ(E) is the trace of the exponential Atiyah class of P(E), in precise analogy
with the relationship between ch(E) and the Atiyah class of E for an untwisted sheaf
E. We prove Conjecture 7.3.9 for twisted sheaves on abelian varieties in Section 7.4.
   Keep the notation of Theorem 1.4.1. The sheaf E in the theorem is not semiregular.
We describe next the equivariant version of the construction, carried out in Section
9.3, which produces a semiregular sheaf. Let G1 and G2 be cyclic subgroups of X of
order d + 1 with G1 ∩ G2 = (0). Choose Ci ⊂ X, 1 ≤ i ≤ d + 1, to be a G1 -orbit of
translates of the Abel-Jacobi image AJ(C) of C. Choose Σi ⊂ X, 1 ≤ i ≤ d + 1, to be
a G2 -orbit of translates of −AJ(C). The ideal sheaf I∪d+1 Ci is G1 -equivariant, I∪d+1 Σi
                                                             i=1                        i=1
is G2 -equivariant, and I∪d+1 Ci ⊠ I∪d+1 Σi is G1 × G2 -equivariant. The reflexive sheaf E is
                               i=1              i=1
the dual of the image of I∪d+1 Ci ⊠ I∪d+1 Σi via an equivalence Φ̃ (the composition of Φ
                                     i=1              i=1

with tensorization by Θ ⊠ Θ and a shift) between Db (X × X) and Db (X × X̂) and E ∨
is thus equivariant with respect to the image G ⊂ (X × X̂) × Pic0 (X × X̂) of G1 × G2
via the Rouqier isomorphism associated to Φ̃ between the identity components of the
groups of autoequivalences of X × X and X × X̂. Denote by Ḡ the image of G via the
projection to the cartesian factor X × X̂. The projection G → Ḡ is an isomorphism,
by Lemma 9.3.3.
   Let q : X × X̂ → Y := (X × X̂)/Ḡ be the quotient morphism. When d is even2
the rank 8d of E is relatively prime to the order (d + 1)2 of Ḡ. In that case we can
replace E by its tensor product with a suitable power of the line bundle det(E) to get
a Ḡ-equivariant sheaf Ẽ. The latter descends to a semiregular reflexive sheaf Ē over Y
satisfying q ∗ Ē = Ẽ. Finally, we associate to Ē a reflexive sheaf B, twisted by a Čech
2-cocycle with coefficients in µ8d and with a trivial determinant line bundle, satisfying
κ(E) = q ∗ κ(B). Such a sheaf B is constructed, regardless of the parity of d. The
morphism q induces a local isomorphism of the Kuranishi deformation spaces of X × X̂
and Y . Our verification of Conjecture 7.3.9 in the case of abelian varieties implies
that (Y, B) deforms locally over the locus where κ(B) remains of Hodge-type. Hence,
    1One needs to verify that our semiregularity map is injective, if and only if Pridham’s is.
    2If d is odd replace it with 4d and note that Q(
                                                            √            √
                                                                −4d) = Q( −d).
                            ABELIAN 2n-FOLDS OF WEIL TYPE                                  9

(X × X̂, q ∗ B) deforms locally over the locus where q ∗ κ(B) remains of Hodge type. Now
κ(E) = q ∗ κ(B) and κ(E) remains of Hodge type over the locus, where (X × X̂, η, h)
deforms as an abelian variety of Weil-type, by Corollary 1.3.2, yielding a proof of the
the following.
                                                                 √
Theorem 1.5.1. Let d be a positive integer. Set K := Q( −d). The Hodge-Weil
classes of polarized abelian sixfolds of Weil type with complex multiplication by K and
with discriminant −1 are algebraic.
  The Theorem is proved in Section 9.3. The construction described above is generalized
in Example 8.2.3 to produce secant⊠2 -objects over X × X̂, for Jacobians X of higher
genus curves, but the proof of their semiregularity is special to genus 3.

1.6. Verification of the Hodge conjecture for abelian fourfolds. The following
is a known consequence of Theorem 1.5.1.
Corollary 1.6.1. The Hodge conjecture holds for abelian fourfolds.
Proof. Theorem 1.5.1 implies that the Hodge-Weil classes are algebraic for every abelian
fourfold of Weil-type, for all imaginary quadratic number fields, and for all discriminants,
by degenerating abelian sixfolds of Weil type of discriminant −1 to products of abelian
fourfolds of Weil type of arbitrary discriminant and abelian surfaces of Weil type [S2,
Prop. 10]. If A is a simple abelian fourfold, then H 2,2 (A, Q) is spanned by quadratic
polynomials in divisor classes and by Hodge-Weil classes (for possibly infinitely many
===== Example 8.2.3-8.2.4 (2600-2760) =====
                         4        2                         a2
                       a3 − 6a2 a3 + 8a2 a3 − 4a1 a3 + 6          − 3a2 + 3a1 − a0 [pt]
                                                             2
                                  d        da3 3
       α + a3 β = 1 + a3 Θ − Θ2 −              Θ + d2 [pt]
                                  2         6
Comparing coefficients in Equation 8.2.2 we get a2 = d + a23 , a1 = 2(d + a23 )(1 − a3 ),
             a0 = 6a43 − 6a33 + 8da23 − 6da3 + 2d2 = (a23 + d)(6a23 − 6a3 + 2d).
We get a secant ideal sheaf tensored with OX (a3 Θ) for every choice of an integer a3 ≤ 1.
If we choose a3 = 1, then a2 = d + 1, a1 = 0, and a0 = 2d(d + 1). Once again
we can choose Z to be invariant with respect to a cyclic subgroup G of X of order
d + 1. However, Fd := IZ (Θ) is unlikely to be semiregular, and the semiregularity map
could restrict to Ext2 (Fd , Fd )RG as an injective map for at most finitely many values of
d, since dim Ext2 (Fd , Fd ) = X ch(Fd )ch(Fd∨ ) + 2 dim Ext1 (Fd , Fd ) − 2 = 8d(d + 1) −
2 + 2 dim Ext1 (Fd , Fd ) grows quadratically with d, while the order of G is linear in d.
Another choice of a K-secant object with the same Chern character is the following.
Let τt0 (W2 ) be a translate of W2 in X and set Z := ∪t∈G τt0 +t (W2 ). Let g be a generator
of G and set ti := t0 + ig, 0 ≤ i ≤ d. We choose G so that for each pair (i, j), with
0 ≤ i < j ≤ d,  the intersection
                                   τti (W2 ) ∩ τtj (W2 ) consists of 6 distinct points, and this
                 d+1
collection of             sets of 6 points are pairwise disjoint. For each such pair (i, j)
                   2
54                                          EYAL MARKMAN

choose 4 of the 6 points of intersection τti (W2 ) ∩ τtj (W2 ) and let ν : Z̃ → Z ⊂ X be the
partial normalization of Z resolving the self intersection at each of the 4 chosen points
for each pair (i, j). Let F ′ be the object




                                                   ν∗
(8.2.3)                                      OX → ν∗ OZ̃ .



                                       
                                  d+1
We choose the collection of               sets of 4 points to be G-invariant. Note that
                                    2
ch(F ′ (Θ)) = ch(Fd )). Let q : X → Y := X/G be the quotient map and set Z̄ :=
q(τt0 (W2 )). It admits the partial normalization ν̄ : Z̃/G → Z̄. Thenh Z = q −1 (Z̄)) is an
                                                                                           i
etalé G-cover of Z̄ and F ′ is the pullback via q of the object F̄ ′ := OY → ν̄∗ (OZ̃/G) ) .



Example 8.2.4. Keep the notation of Example 8.2.3, let C be a non-hyperelliptic curve
of genus 4 with two g31 ’s, X = Pic3 (C) let e : Θ ⊂ X be the theta divisor W3 , and let
W2,p = {p+p1 +p2 ; p1 , p2 ∈ C} be the translate of W2 ⊂ Pic2 (C) by the point p into X.
Then W2,p is contained in Θ and passes through the singularities of Θ (the two g31 ’s) and
is thus a Weil divisor20 in Θ. Let IW2,p be the ideal sheaf of W2,p as a subvariety of Θ.
Choose d unordered pairs of points {pi , qi }di=1 in C, with {pi , qi } ∩ {pj , qj } = ∅, for i ̸= j.
Assume that the line secant to the canonical embedding of C through pi and qi does not
lie on the unique quadric containing the canonical curve. Let Ci = {p + pi + qi } ⊂ Θ
be the translate W1 := AJ(C) ⊂ Pic1 (C) into Θ. Then Ci is contained in the smooth
locus of Θ. Assume that p ̸∈ {pi , qi }, for all 1 ≤ i ≤ d. Then Ci ∩ W2,p = {p + pi + qj }
with multiplicity21 1. Set Zd := W2,p ∪ ∪di=1 Ci , considered as a subscheme of Θ. Then




     20Let ι : X → X be the involution sending L to ω         −1
                                                                    Given two distinct points p, p′ ∈ C,
                                                          C ⊗L   .
we have the scheme theoretic equality W2,p ∪ ι(W2,p′ ) = Θ ∩ τp′ −p (Θ). So W2,p + ι(W2,p′ ) is a cartier
divisor in the linear system of e∗ OX (τp′ −p (Θ)).
   21Indeed, the scheme theoretic intersection of C with W ∪ι(W ′ ) is equal to the scheme theoretic
                                                    i       2,p      2,p
intersection of Ci with τp′ −p (Θ), which has degree 4, and Ci ∩ ι(W2,p′ ) is a divisor in the linear system
of ωC (−pi − qi − p′ ) and so of degree 3.
                               ABELIAN 2n-FOLDS OF WEIL TYPE                                 55
                  √
e∗ IZd (Θ) is a Q( −d)-secant sheaf. Indeed, we have:
                                                               Θ2 Θ3 Θ4
                      ch(e∗ (OΘ )) = 1 − ch(OX (Θ)) = Θ −        +   −    ,
                                                               2   6   24
                                       Θ2 Θ3 Θ4
                   ch(e∗ (OΘ (Θ))) = Θ +    +      +     ,
                                        2      6      24
                                   Θ2 Θ3 Θ4
                      ch(OW2 ) =      −      +       (see Example 8.2.3),
                                    2     3      8
                                   Θ2 Θ3 Θ4
                  ch(OW2 (Θ)) =       +      +     ,
                                    2     6     24
              ch(e∗ (IW2,p (Θ))) = Θ,
                                      Θ3 Θ4
                          ch(OW1 ) =      −     (see Example 8.2.3),
                                       6      8
                                      Θ3 Θ4
                   ch(OW1 (Θ)) =          +     = [W1 ] + [pt],
                                       6     24
                                            Θ3
                  ch(e∗ IZd (Θ)) = Θ − d        = β.
                                             6
Set Fd := e∗ IZd (Θ). Note that dim Ext2 (Fd , Fd ) = − X β 2 + 2 dim Ext1 (Fd , Fd ) − 2 =
                                                         R

8d + 2 dim Ext1 (Fd , Fd ) − 2 grows linearly with d, and hence it can be semi-regular for
at most finitely many values of d.
Lemma 8.2.5. We have ch(OW2 ) = Θ2 /2 − Θ3 /3 + 3[pt] in the notation of Example
8.2.3.
Proof. We have ch(OW2 ) = Θ2 /2 + λΘ3 + 3[pt], for some rational number λ satisfying
(8.2.4)         Z
                   Θ2 /2 + λΘ3 + 3[pt] 1 − Θ + Θ2 /2 − Θ3 /6 + Θ4 /24 = 9 − 24λ,
                                                                      
 χ(OW2 (−Θ)) =
                      X
             3,3
since dim H (X, Q) is the rank of the Neron-Severi group of X, which is 1 for generic
C. Assume that C is the intersection of a smooth quadric Q and a cubic in P3 . So C
has two g31 ’s, associated to the two rulings of Q. Let q1 + q2 + q3 be a reduced divisor
in one g31 , denote by L := ωC (−q1 − q2 − q3 ) the other g31 , and let p ∈ C \ {q1 , q2 , q3 }
be a point, such that |L(−p)| = {a + b} for distinct points a, b ∈ C \ {p}. We calculate
the intersection W2 ∩ τp−q1 −q2 (Θ). The intersection has cohomology class Θ3 /2. It
consists of the union of three irreducible components of class Θ3 /6 each. As a subset of
X = Pic2 (C), the intersection consists of classes of effective divisors D on C of degree
2, such that D + q1 + q2 − p is effective. One irreducible component is C1 := τp (AJ(C)).
   The complement of C1 in the intersection consist of divisors D, such that h0 (OC (D +
q1 + q2 ) = 2 (the inequality h0 (OC (D + q1 + q2 ) ≤ 2 follows from the assumption that
C is not hyperelliptic). Such divisors D satisfy
                               ωC (−D′ ) ∼= OC (D + q1 + q2 ),
for some effective divisor D′ . So D + D′ belongs to |ωC (−q1 − q2 )|. If q3 is in the support
of D, then D = q3 + q, where q is any point of C, since h0 (OC (q1 + q2 + q3 )) = 2. Hence,
a second irreducible component is C2 := τq3 (AJ(C)). The third irreducible component
56                                    EYAL MARKMAN

C3 consists of D, such that D + q ∈ |L|, for some q ∈ C. So C3 = τL (−AJ(C)), where
−AJ(C) is a curve in Pic−1 (C).
   The curves C1 and C2 intersect at the point corresponding to the divisor p + q3 . The
curves C1 and C3 intersect at the two points {p+a, p+b}. Let P be the plane tangent to
Q at q3 . Then P ∩ Q consists of two lines through q3 and P ∩ C = q1 + q2 + 2q3 + a′ + b′ ,
for some points a′ , b′ of C, which we may assume distinct, possibly by changing the
choice of the divisor q1 + q2 + q3 . The curves C2 and C3 intersect at the two points
{q3 + a′ , q3 + b′ }. We conclude that
              χ(OW2 ∩τp−q1 −q2 (Θ) ) = χ(OC1 ) + χ(OC2 ) + χ(OC3 ) − 5 = −14.
              χ(OW2 (−τp−q1 −q2 (Θ))) = χ(OW2 ) − χ(OW2 ∩τp−q1 −q2 (Θ) ) = 17.
Comparing with (8.2.4) we get 9 − 24λ = 17, so λ = −1/3.                                    □
8.3. Secant sheaves on abelian threefolds with a rank 6 obstruction map.
Keep the notation of Lemma 8.2.1. Set F1 := I∪d+1 Ci ⊗ OX (Θ). Let P := span{α, β}
                    √                              i=1
be
R   the  rationalRQ(  −d)-secant  plane. Assumption    2.4.1 is satisfied, since (α, β)S =
 X
    τ (α) ∪ β = X α ∪ β = −4d ̸= 0. Let h be an ample class in the rank 1 subgroup
H (X × X̂, Z)Spin(V )P . Such an ample class h exists, by Proposition 2.4.4.
  2


Lemma 8.3.1. The rank of Φ(F1 ⊠ F1 ) is non-zero. The Spin(V )P -invariant classes
h3 and κ3 (Φ(F1 ⊠ F1 )) are linearly independent.
Proof. We use the notation of Proposition 6.4.1. We have
              ch(Φ(F1 ⊠ F1 )) = ϕ(ch(F1 ) ⊠ ch(F1 )) = ϕ′ (ch(F1 ) ⊠ τ (ch(F1 ))).
                 √
Set λ1 := exp( −dΘ) and λ2 = λ̄1 , so that
                                                                 √                 √
                                            
              1                   1                  1 h                                    i
  ch(F1 ) =       (λ1 + λ2 ) + √ (λ1 − λ2 ) = √            (1 + −d)λ1 + (−1 + −d)λ2


[exit code: 0]