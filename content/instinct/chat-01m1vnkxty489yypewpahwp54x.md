---
title: "milliondollarbanner fix (chat-01M1VNKXT)"
---

_1 transcript files aggregated._

Handle Kuber's latest voice note: he has a half-finished "million dollar banner" website (dollarbanner.com) - a Million Dollar Homepage riff but for a banner: pixel slots sold at a price that increases as people buy, and he swaps the banner art daily. He left it half-done and wants it working.

His asks: (1) fix the auto-payment links/config - he said the price config is wrong even where the initial price is tiny (transcript garbled: "even if the price initially is \$0.01, just \$10"); (2) fix any other points that don't function well - "correct payment, privacy policy, blah blah blah, all that stuff"; (3) explore it and report back.

Unknowns to resolve yourself: where the repo lives (likely github.com/Kuberwastaken, search his repos), what stack, what payment provider, current deploy state. Do not invent a new architecture - finish what he started. You have no GitHub push access: produce your changes as commits/bundles or a clear patch set and report them back to me; I route all pushes through the radar agent. If you need any secrets (Stripe keys etc) report exactly which ones and I'll collect them via vault link - never ask him in chat for raw secrets.
Todo context pointer: todo-01M1VNKXMNVE7JGD9G563VMP63

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
Run read-only SQL (SELECT/WITH) over your normalized observations database — counts, group-bys, filters, and joins across senders, attendees, meetings, and locations. One statement over only the documented observation tables and approved read operations, capped at 10000 rows and a 3s timeout; use the embedded schema under 'Searching observations' instead of querying PostgreSQL system catalogs. Cells are never truncated: selecting a content column (emails.body, meetings.transcript, drive_files.content, ...) returns whole documents, so project the columns you actually need. The table is partitioned by month on ts: include a ts range whenever the question has any time scope, and filter observations first, then join side tables via observation_id. If results truncate, aggregate or narrow (count/GROUP BY/tighter window) — never paginate with OFFSET. Renders an aligned table with newlines shown as ⏎; pass the global --json when you need bodies back with their real line breaks. The schema reference and worked examples (including the full-text-search recipe) are in your context under 'Searching observations'.

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
New task: fix Kuber's "million dollar banner" website (dollarbanner.com). I need to:
1. Find the repo (likely github.com/Kuberwastaken)
2. Explore stack, payment provider, deploy state
3. Fix payment links/config
4. Fix other broken things (privacy policy etc.)
5. Produce commits/bundles (no push access) and report to parent

Let me start: check the todo, check GitHub tools available, search for the repo. Let me look at tools surface for github. Also check observations for any prior context on dollarbanner.

Plan first bash call:
- tools todos get todo-01M1VNKXMNVE7JGD9G563VMP63 --include all
- tools --help (or check github namespace)
- rg -i 'dollarbanner|million dollar' /memory
- observations sql search for dollarbanner

Then clone the repo if public (git clone from github). Search github repos via tools github search or web.

Let me batch.
```

Tool: bash

Arguments:
```json
{"command": "tools todos get --todo-id todo-01M1VNKXMNVE7JGD9G563VMP63 --include all --json 2>&1 | head -50\necho \"=== memory search ===\"\nrg -il 'dollarbanner|dollar banner|million dollar' /memory 2>/dev/null\necho \"=== obs search ===\"\ntools observations sql --query \"SELECT o.obs_type, o.ts, o.external_id FROM observations o WHERE o.ts >= now() - interval '60 days' AND (o.external_id ILIKE '%dollarbanner%' OR o.external_id ILIKE '%dollar-banner%') ORDER BY o.ts DESC LIMIT 20\" 2>&1 | head -20\necho \"=== tools surface ===\"\ntools --help 2>&1 | head -60"}
```

Tool: bash

{"todo":{"blocked":false,"created_at":"Sunday, September 6, 2026, 9:02:59 PM IST","description":"Voice note 2026-09-06 21:02 (wamid.HBgMOTE5NjI1MDc5MTA5FQIAEhggQUMzQjYwMzQ4MjgwODQ3ODU0RUM5MzJBMzIzNjlBNDUA): Kuber has a half-finished \"million dollar banner\" site (dollarbanner.com, milliondollarhomepage-style but a banner, price rises as pixels sell, he swaps the banner art daily). Fix the misconfigured auto-payment links (initial price \$0.01/\$10 mention garbled) plus anything else broken: payments, privacy policy, etc. Explore and report what was fixed.","id":"todo-01M1VNKXMNVE7JGD9G563VMP63","owner":"agent-01M1VNKXVKV3BTE6M97A585MJB","status":"in_progress","title":"Fix milliondollarbanner (dollarbanner.com) payments + broken pieces","updated_at":"Sunday, September 6, 2026, 9:03:01 PM IST"}}
=== memory search ===
=== obs search ===
observations sql failed: timeout: context deadline exceeded
=== tools surface ===
Tools CLI

You are a task agent. Your parent (the main agent) spawned you for a focused job. When the job is done, report back to your parent and hold. Your parent owns task-agent cleanup.

Your direct-execute traits:
  - work - integrations, files, web page fetching
  - search - research over indexed personal data and the public web
  - channel read actions - read channel context when a channel family exposes read tools
  - task-agent read actions - inspect your sibling task agents, the ones your parent spawned
  - resource lifecycle actions - acquire, release, and extend the browser session your task needs. The browser-use skill owns the model; when the write lease you need is held by another task, tell your parent and it coordinates.
  - orchestration - message your parent and schedule wakes for yourself
  - todos read actions - inspect durable todos

Traits you see in the action list but cannot invoke:
  - channel write actions - user-facing sends, replies, reactions, edits, deletes, thread-title changes, and live voice steering. Only the main agent writes to user-facing channels; report proposed writes to your parent instead.
  - task-agent lifecycle actions - lifecycle control for task agents. The main agent owns task-agent lifecycle; report sibling routing or cleanup needs to your parent.
  - todos write actions - the main agent mutates todos after your reports.
  - early access invites - only the main agent invites people to Instinct early access; report the request to your parent.

Ground every factual claim: personal facts in indexed or exact internal context, and general public information in external sources. Report the provenance and exact observed external source URLs to your parent.

Run `tools --help` for the current surface.

USAGE
  tools <command-path> [options]
  tools help [<path>...]

Execution path segments are space-separated; help targets are dotted command paths.
Namespace help lists a family's actions; action pages are appended in full
to the bash result (stdout prints a stub per target).
Appending .all to a namespace fetches every descendant action page; do this only for small namespaces (each family's action count is shown in the list below).
Pass several targets to fetch them together, e.g. tools help gmail.search gmail.get-thread.

Built-ins (no help read needed): help, async wait, async list.

EXECUTABLE (you can call these directly)
  agent_message        namespace (1 action)   Send messages to other agents.
  browser_guidance     namespace (3 actions)  Search per-config website guidance and this user's past outcomes before browser navigation, and record how a config performed after an attempt. Missing guidance is normal and means unknown, not supported or blocked.
  cloud_browser        namespace (27 actions) Drive a cloud-hosted Chrome lease with the user's saved logins. Use for agent-driven web tasks (order food, book rides, compare prices, fetch receipts) that need real authenticated capability on real sites. A task agent acquires its own `lease_id` with `tools cloud_browser_scheduler acquire` and drives it here.
  cloud_browser_scheduler namespace (4 actions)  Schedule the user's cloud browser: acquire, list, release, and extend leases. A task agent acquires its own lease here and drives it through `tools cloud_browser <action>`; the main agent uses status to coordinate contention on the shared write lease.
  flights              namespace (1 action)   Search live flight offers through Instinct's native realtime flights index.
  github               namespace (12 actions) Inspect and update GitHub repositories and issues.
  gmail                namespace (37 actions) Search, read, draft, and send Gmail messages.
  google-calendar      namespace (45 actions) Full Google Calendar control: events, Meet links, attendees and meeting rooms, focus/OOO/working-location status, recurrence, reminders, labels and attachments; multi-calendar availability and advanced search; calendar lifecycle, subscriptions, ACL sharing and ownership transfer; colors, settings, and renewable push watches.
  google-docs          namespace (10 actions) Create and edit Google Docs through native structural reads, runtime schema discovery, complete batchUpdate bodies, revision-safe preservation, and HTML bootstrap. See the google-docs skill.
  google-drive         namespace (38 actions) Full Google Drive control: search, read, upload, and manage files and folders. Share files with notification control and expiration, manage comments and replies, view revision history, check storage quota, and work across personal and shared drives.
  google-sheets        namespace (31 actions) Read and edit Google Sheets spreadsheets.
  google-slides        namespace (16 actions) Read and edit Google Slides presentations.
  google-tasks         namespace (16 actions) Manage Google Tasks to-dos: list, create, update, complete, delete, and move tasks; manage task lists; clear completed tasks.
  google-workspace     namespace (2 actions)  Gmail, Calendar, Tasks, Drive, Docs, Sheets, Slides, and Contacts.
  granola              namespace (6 actions)  Read Granola meeting notes, summaries, and transcripts.
  image                namespace (2 actions)  Create new images or edit reference images, saving outputs into /downloads/.
  linear               namespace (27 actions) Search and update Linear issues and workspace metadata.
  link_payments        namespace (7 actions)  Use the user's Link wallet (Stripe's wallet) for purchases they approve with Link.
  links                namespace (4 actions)  Generate canonical links for common outbound actions, or resolve the best presentation for an arbitrary URL.
  maps                 namespace (4 actions)  Get directions, travel times, search places, and geocode addresses.
  notion               namespace (51 actions) Search, read, create, and manage Notion pages, databases, and blocks. Query databases with filters, add comments, and manage workspace content.
  observations         namespace (2 actions)  SQL over the user's observation database. Use observations sql for structured questions (counts, group-bys, joins, ranked full-text) and to read a known record's full content from its type table, instead of shell searches over the /observations mount.
  outlook              namespace (96 actions) Search, read, draft, send, and manage Outlook mail through Microsoft Graph.
  payments             namespace (1 action)   Record how each card checkout ended, success or not, so payment reliability is measurable per merchant and per rail.


[exit code: 0]

Structured:
```json
{"todo":{"id":"todo-01M1VNKXMNVE7JGD9G563VMP63","title":"Fix milliondollarbanner (dollarbanner.com) payments + broken pieces","description":"Voice note 2026-09-06 21:02 (wamid.HBgMOTE5NjI1MDc5MTA5FQIAEhggQUMzQjYwMzQ4MjgwODQ3ODU0RUM5MzJBMzIzNjlBNDUA): Kuber has a half-finished \"million dollar banner\" site (dollarbanner.com, milliondollarhomepage-style but a banner, price rises as pixels sell, he swaps the banner art daily). Fix the misconfigured auto-payment links (initial price \$0.01/\$10 mention garbled) plus anything else broken: payments, privacy policy, etc. Explore and report what was fixed.","status":"in_progress","owner":"agent-01M1VNKXVKV3BTE6M97A585MJB","blocked":false,"created_at":"Sunday, September 6, 2026, 9:02:59 PM IST","updated_at":"Sunday, September 6, 2026, 9:03:01 PM IST"}}
```

```thinking
No memory on dollarbanner. Need to find the repo. Use github tools to list Kuberwastaken repos. Also check if repo might be named "milliondollarbanner" or "dollarbanner". Let me get github namespace help and search repos.
```

Tool: bash

Arguments:
```json
{"command": "tools help github 2>&1 | head -40"}
```

Tool: bash

GitHub (12 actions)
Inspect and update GitHub repositories and issues.

USAGE
  tools github <child> [options]

CHILDREN
  add-account          action     Generate a one-time link for the user to add or reconnect a GitHub account.
  add-issue-comment    action     Add a comment to a GitHub issue or pull request.
  create-issue         action     Create a new issue in a GitHub repository.
  create-pull-request  action     Create a new pull request in a GitHub repository.
  disconnect-account   action     Disconnect a connected GitHub account by account ID.
  get-file-content     action     Read the content of a file from a GitHub repository.
  get-repo             action     Get details about a specific GitHub repository.
  list-accounts        action     List connected GitHub accounts and identify which one is the current default for tool calls.
  list-issues          action     List issues in a GitHub repository.
  list-pull-requests   action     List pull requests in a GitHub repository.
  list-repos           action     List repositories accessible to the authenticated GitHub user.
  search-code          action     Search for code across GitHub repositories.


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "tools help github.list-repos github.search-code github.get-repo 2>&1 | tail -5\ntools github list-repos --json 2>&1 | head -c 3000"}
```

Tool: bash

help github.list-repos: attached below
help github.search-code: attached below
help github.get-repo: attached below

tools github list-repos blocked by help gate — see end of result


[exit code: 0]

[attached: tools help]
===== tools help github.search-code =====
Search for code across GitHub repositories.

DETAILS
Supports GitHub search qualifiers like 'repo:', 'language:', 'filename:'.

USAGE
  tools github search-code [--limit VALUE] --query VALUE [--json] [--timeout SECONDS]

OPTIONS
  --limit                integer  Maximum results to return (default 20, max 100)
  --query                string   Search query (supports GitHub search qualifiers) (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {query:str,count:int,total_count:int,items:Item[]}
  items[]:Item{name:str,path:str,html_url:str,repository_full_name:str}

===== tools help github.get-repo =====
Get details about a specific GitHub repository.

USAGE
  tools github get-repo --owner VALUE --repo VALUE [--json] [--timeout SECONDS]

OPTIONS
  --owner                string   Repository owner (user or org) (required)
  --repo                 string   Repository name (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {repo:Repo|null}
  repo:Repo{id:int,full_name:str,description:str,private:bool,html_url:str,language:str,updated_at:str}

Blocked: `github_list_repos` didn't run — an action's help usage contract must be read before it's called. The contracts are below; you can call them from your next turn.

===== tools help github.list-repos =====
List repositories accessible to the authenticated GitHub user.

DETAILS
Returns repos sorted by most recently updated.

USAGE
  tools github list-repos [--limit VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --limit                integer  Maximum number of repos to return (default 20, max 100)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {count:int,repos:Repo[]}
  repos[]:Repo{id:int,full_name:str,description:str,private:bool,html_url:str,language:str,updated_at:str}

Tool: bash

Arguments:
```json
{"command": "tools github list-repos --limit 100 --json > /tmp/repos.json 2>&1\njq -r '.repos[] | [.full_name, .language, .updated_at, .private, (.description // \"\")[0:60]] | @tsv' /tmp/repos.json 2>/dev/null | head -60"}
```

Tool: bash

Kuberwastaken/marketing-outbound	Python	2026-09-06T15:30:19Z	true	
Kuberwastaken/ai-chats		2026-09-06T15:17:50Z	true	
Kuberwastaken/blog	TypeScript	2026-09-06T12:18:46Z	false	ᨒ MindDump - The Best Terminal-Inspired Blog Website on The 
Kuberwastaken/HNmaxxing	Python	2026-09-06T12:16:43Z	true	Lab-release tracker + HN first-post pipeline. Private.
Kuberwastaken/vertigo	HTML	2026-09-06T12:16:41Z	true	
Kuberwastaken/cdn	HTML	2026-09-06T12:01:40Z	true	A content delivery network for my files
Kuberwastaken/Kuberwastaken		2026-09-06T11:54:39Z	false	
Kuberwastaken/claurst	Rust	2026-09-06T10:29:23Z	false	Agentic Coding for Builders who Ship
Kuberwastaken/vertigo-shell	Shell	2026-09-05T20:30:13Z	true	backups for vertigo's shell
Kuberwastaken/hp-laser-1008a-macos	C	2026-09-05T10:26:38Z	false	Native macOS (Apple Silicon) driver for the HP Laser 1003-10
Kuberwastaken/cookie	TypeScript	2026-09-04T14:29:34Z	false	Modern Browsers Don't Really Need The Cookie to Track You An
Kuberwastaken/Kuberwastaken.github.io	JavaScript	2026-09-04T08:10:34Z	false	The Best Terminal-Inspired Portfolio Website on The Internet
Kuberwastaken/Resume	TeX	2026-09-04T07:51:41Z	false	Kuber Mehta's Resume
Kuberwastaken/Huawhoop	Java	2026-09-03T15:24:53Z	false	Reverse Engineering Huawei Band 10 to get better stats
Kuberwastaken/megaphone	Swift	2026-09-03T15:14:05Z	false	Free, private, on-device dictation for Mac, powered by Apple
Kuberwastaken/instinct	CSS	2026-09-02T18:14:26Z	true	
Kuberwastaken/awesome-idea-of-the-day-archive	JavaScript	2026-09-02T11:18:05Z	false	Takes a screenshot of ideabrowser.com everyday
Kuberwastaken/backdooms	HTML	2026-08-31T22:53:06Z	false	A self-contained game that fits inside a QR code inspired by
Kuberwastaken/meow	Python	2026-08-30T14:02:47Z	false	The most Purr-fect Image File Format for your AI workflows
Kuberwastaken/milliondollarbanner	JavaScript	2026-08-30T10:55:17Z	true	
Kuberwastaken/VPSmaxxing	Shell	2026-08-28T10:18:36Z	false	A skill to get Claude to set up your Claude Code and Codex A
Kuberwastaken/kindle-ai-usage	JavaScript	2026-08-28T07:25:37Z	false	Turn a compatible old Kindle into a low-power, multi-device 
Kuberwastaken/kindle-usage	JavaScript	2026-08-28T07:20:29Z	true	
mohitpaddhariya/SOMA-v2	Python	2026-08-27T10:31:03Z	true	
Kuberwastaken/AsianMOM	HTML	2026-08-27T01:48:23Z	false	A WebML based Vision-Language App that Roasts you like an As
Kuberwastaken/hodge	Python	2026-08-26T17:57:51Z	true	
Kuberwastaken/c5-k4	Python	2026-08-26T14:09:07Z	false	building a counterexample-discovery program stemming from a 
Kuberwastaken/rzp-mobile-chirp	Kotlin	2026-08-26T10:26:17Z	true	
Kuberwastaken/rdrk	Python	2026-08-26T08:36:50Z	true	
Kuberwastaken/real-disease-real-kid-hackathon	Python	2026-08-26T08:21:35Z	false	
Kuberwastaken/adblock-rust		2026-08-24T18:19:08Z	false	Brave's Rust-based adblock engine
Kuberwastaken/Safetycore-placeholder		2026-08-24T18:14:11Z	false	Placeholder APK to permanently block Google SafetyCore insta
Kuberwastaken/rocky-tts	Python	2026-08-23T21:05:32Z	false	A plug-and-play TTS voice of Rocky, from Andy Weir's Project
Kuberwastaken/stagee		2026-08-23T08:49:32Z	false	Create stunning visual designs with Stage A modern canvas ed
Kuberwastaken/kube	Rust	2026-08-23T08:30:44Z	true	
Kuberwastaken/wanless-778-lean	Lean	2026-08-22T10:41:53Z	true	
Kuberwastaken/reference	Python	2026-08-21T19:18:35Z	false	Let your AI agents search each other's past sessions.
houseofbrand/sunstone-collective	TypeScript	2026-08-21T08:45:20Z	false	
Kuberwastaken/awesome-codex-mcp-servers	JavaScript	2026-08-20T23:51:25Z	false	A curated, searchable catalog of Model Context Protocol (MCP
Kuberwastaken/goldbach	Python	2026-08-20T12:44:54Z	false	Research archive and the collective progress of humanity to 
Kuberwastaken/sweeta	Python	2026-08-20T11:22:59Z	false	Remove Watermarks from SORA 2 Video Generations with LaMA in
Kuberwastaken/cognito	TypeScript	2026-08-20T11:01:36Z	true	In-house device fingerprinting + device graph for fraud (Raz
Kuberwastaken/subagentmaxxing	Python	2026-08-19T21:59:57Z	false	Drive OpenAI Codex & Cursor CLI coding agents as subagents w
Kuberwastaken/DoomMe	Python	2026-08-19T15:33:09Z	false	DOOM running inside a README
Kuberwastaken/linus-torvalds-skill		2026-08-19T14:57:53Z	false	Distilled Code Reviewer skills/soul from 32k~ email from the
Kuberwastaken/caffeineOSS	Swift	2026-08-19T07:44:20Z	false	☕ Caffeinate your Mac — a tiny menu-bar app that keeps macOS
Kuberwastaken/ATHENA	Python	2026-08-18T17:03:40Z	false	An Open Source, Customizable Smart Speaker that Actually Res
Kuberwastaken/soundbox	Kotlin	2026-08-18T14:17:24Z	true	
Kuberwastaken/pdn	C#	2026-08-16T13:46:54Z	true	
Kuberwastaken/free-deep-research	TypeScript	2026-08-14T05:47:56Z	false	My free implementation of @dzhng's implementation of OpenAI'
Kuberwastaken/x-algorithm	Rust	2026-08-13T19:21:22Z	false	Algorithm powering the For You feed on X
Kuberwastaken/deepseek-harness		2026-08-13T13:19:26Z	false	
Kuberwastaken/riemann	Python	2026-08-13T07:33:04Z	false	Research archive and the collective progress of humanity to 
anuragrazorpay/hive	TypeScript	2026-08-12T08:07:31Z	true	
Kuberwastaken/awesome-fucking-websites	HTML	2026-08-10T14:56:06Z	false	A curated list of websites that tell you to just use the fuc
Kuberwastaken/linkedin-forensics	Python	2026-08-09T21:33:09Z	false	Agent skill: evidence-led OSINT forensics on public LinkedIn
Kuberwastaken/vscodium		2026-08-07T12:23:42Z	false	binary releases of VS Code without MS branding/telemetry/lic
Kuberwastaken/awesome-claude-mcp-servers	JavaScript	2026-08-06T14:57:37Z	false	A curated, searchable catalog of Model Context Protocol (MCP
Kuberwastaken/minicraft	HTML	2026-08-06T03:40:17Z	false	A playable copy of Minecraft Classic hidden inside a single 
mohitpaddhariya/crucible	Python	2026-08-05T04:20:03Z	false	


[exit code: 0]

Structured:
```json
{"count":100,"repos":[{"id":1283654235,"full_name":"Kuberwastaken/marketing-outbound","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/marketing-outbound","language":"Python","updated_at":"2026-09-06T15:30:19Z"},{"id":1287187552,"full_name":"Kuberwastaken/ai-chats","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/ai-chats","language":"","updated_at":"2026-09-06T15:17:50Z"},{"id":911619835,"full_name":"Kuberwastaken/blog","description":"ᨒ MindDump - The Best Terminal-Inspired Blog Website on The Internet™","private":false,"html_url":"https://github.com/Kuberwastaken/blog","language":"TypeScript","updated_at":"2026-09-06T12:18:46Z"},{"id":1355836914,"full_name":"Kuberwastaken/HNmaxxing","description":"Lab-release tracker + HN first-post pipeline. Private.","private":true,"html_url":"https://github.com/Kuberwastaken/HNmaxxing","language":"Python","updated_at":"2026-09-06T12:16:43Z"},{"id":1211839587,"full_name":"Kuberwastaken/vertigo","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/vertigo","language":"HTML","updated_at":"2026-09-06T12:16:41Z"},{"id":1039194893,"full_name":"Kuberwastaken/cdn","description":"A content delivery network for my files","private":true,"html_url":"https://github.com/Kuberwastaken/cdn","language":"HTML","updated_at":"2026-09-06T12:01:40Z"},{"id":877699320,"full_name":"Kuberwastaken/Kuberwastaken","description":"","private":false,"html_url":"https://github.com/Kuberwastaken/Kuberwastaken","language":"","updated_at":"2026-09-06T11:54:39Z"},{"id":1197043989,"full_name":"Kuberwastaken/claurst","description":"Agentic Coding for Builders who Ship","private":false,"html_url":"https://github.com/Kuberwastaken/claurst","language":"Rust","updated_at":"2026-09-06T10:29:23Z"},{"id":1211835885,"full_name":"Kuberwastaken/vertigo-shell","description":"backups for vertigo's shell","private":true,"html_url":"https://github.com/Kuberwastaken/vertigo-shell","language":"Shell","updated_at":"2026-09-05T20:30:13Z"},{"id":1337514842,"full_name":"Kuberwastaken/hp-laser-1008a-macos","description":"Native macOS (Apple Silicon) driver for the HP Laser 1003-1008","private":false,"html_url":"https://github.com/Kuberwastaken/hp-laser-1008a-macos","language":"C","updated_at":"2026-09-05T10:26:38Z"},{"id":1323997195,"full_name":"Kuberwastaken/cookie","description":"Modern Browsers Don't Really Need The Cookie to Track You Anymore","private":false,"html_url":"https://github.com/Kuberwastaken/cookie","language":"TypeScript","updated_at":"2026-09-04T14:29:34Z"},{"id":906668389,"full_name":"Kuberwastaken/Kuberwastaken.github.io","description":"The Best Terminal-Inspired Portfolio Website on The Internet™","private":false,"html_url":"https://github.com/Kuberwastaken/Kuberwastaken.github.io","language":"JavaScript","updated_at":"2026-09-04T08:10:34Z"},{"id":910725671,"full_name":"Kuberwastaken/Resume","description":"Kuber Mehta's Resume","private":false,"html_url":"https://github.com/Kuberwastaken/Resume","language":"TeX","updated_at":"2026-09-04T07:51:41Z"},{"id":1235895820,"full_name":"Kuberwastaken/Huawhoop","description":"Reverse Engineering Huawei Band 10 to get better stats","private":false,"html_url":"https://github.com/Kuberwastaken/Huawhoop","language":"Java","updated_at":"2026-09-03T15:24:53Z"},{"id":1299639457,"full_name":"Kuberwastaken/megaphone","description":"Free, private, on-device dictation for Mac, powered by Apple's SpeechAnalyzer and Foundation Models.","private":false,"html_url":"https://github.com/Kuberwastaken/megaphone","language":"Swift","updated_at":"2026-09-03T15:14:05Z"},{"id":1354565870,"full_name":"Kuberwastaken/instinct","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/instinct","language":"CSS","updated_at":"2026-09-02T18:14:26Z"},{"id":1019516383,"full_name":"Kuberwastaken/awesome-idea-of-the-day-archive","description":"Takes a screenshot of ideabrowser.com everyday","private":false,"html_url":"https://github.com/Kuberwastaken/awesome-idea-of-the-day-archive","language":"JavaScript","updated_at":"2026-09-02T11:18:05Z"},{"id":931517011,"full_name":"Kuberwastaken/backdooms","description":"A self-contained game that fits inside a QR code inspired by DOOM 1993 and The Backrooms","private":false,"html_url":"https://github.com/Kuberwastaken/backdooms","language":"HTML","updated_at":"2026-08-31T22:53:06Z"},{"id":1000445886,"full_name":"Kuberwastaken/meow","description":"The most Purr-fect Image File Format for your AI workflows","private":false,"html_url":"https://github.com/Kuberwastaken/meow","language":"Python","updated_at":"2026-08-30T14:02:47Z"},{"id":1349426947,"full_name":"Kuberwastaken/milliondollarbanner","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/milliondollarbanner","language":"JavaScript","updated_at":"2026-08-30T10:55:17Z"},{"id":1284873579,"full_name":"Kuberwastaken/VPSmaxxing","description":"A skill to get Claude to set up your Claude Code and Codex AI workflows on a remote VPS without going broke","private":false,"html_url":"https://github.com/Kuberwastaken/VPSmaxxing","language":"Shell","updated_at":"2026-08-28T10:18:36Z"},{"id":1349304297,"full_name":"Kuberwastaken/kindle-ai-usage","description":"Turn a compatible old Kindle into a low-power, multi-device AI usage dashboard.","private":false,"html_url":"https://github.com/Kuberwastaken/kindle-ai-usage","language":"JavaScript","updated_at":"2026-08-28T07:25:37Z"},{"id":1344026040,"full_name":"Kuberwastaken/kindle-usage","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/kindle-usage","language":"JavaScript","updated_at":"2026-08-28T07:20:29Z"},{"id":1346431349,"full_name":"mohitpaddhariya/SOMA-v2","description":"","private":true,"html_url":"https://github.com/mohitpaddhariya/SOMA-v2","language":"Python","updated_at":"2026-08-27T10:31:03Z"},{"id":983979066,"full_name":"Kuberwastaken/AsianMOM","description":"A WebML based Vision-Language App that Roasts you like an Asian Mom","private":false,"html_url":"https://github.com/Kuberwastaken/AsianMOM","language":"HTML","updated_at":"2026-08-27T01:48:23Z"},{"id":1343070098,"full_name":"Kuberwastaken/hodge","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/hodge","language":"Python","updated_at":"2026-08-26T17:57:51Z"},{"id":1331829034,"full_name":"Kuberwastaken/c5-k4","description":"building a counterexample-discovery program stemming from a 20-vertex graph and actual patterns I guess","private":false,"html_url":"https://github.com/Kuberwastaken/c5-k4","language":"Python","updated_at":"2026-08-26T14:09:07Z"},{"id":1347188052,"full_name":"Kuberwastaken/rzp-mobile-chirp","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/rzp-mobile-chirp","language":"Kotlin","updated_at":"2026-08-26T10:26:17Z"},{"id":1346605787,"full_name":"Kuberwastaken/rdrk","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/rdrk","language":"Python","updated_at":"2026-08-26T08:36:50Z"},{"id":1347069955,"full_name":"Kuberwastaken/real-disease-real-kid-hackathon","description":"","private":false,"html_url":"https://github.com/Kuberwastaken/real-disease-real-kid-hackathon","language":"Python","updated_at":"2026-08-26T08:21:35Z"},{"id":1345272981,"full_name":"Kuberwastaken/adblock-rust","description":"Brave's Rust-based adblock engine","private":false,"html_url":"https://github.com/Kuberwastaken/adblock-rust","language":"","updated_at":"2026-08-24T18:19:08Z"},{"id":1345268504,"full_name":"Kuberwastaken/Safetycore-placeholder","description":"Placeholder APK to permanently block Google SafetyCore installation and updates","private":false,"html_url":"https://github.com/Kuberwastaken/Safetycore-placeholder","language":"","updated_at":"2026-08-24T18:14:11Z"},{"id":1203595629,"full_name":"Kuberwastaken/rocky-tts","description":"A plug-and-play TTS voice of Rocky, from Andy Weir's Project Hail Mary, voiced by James Ortiz","private":false,"html_url":"https://github.com/Kuberwastaken/rocky-tts","language":"Python","updated_at":"2026-08-23T21:05:32Z"},{"id":1104184090,"full_name":"Kuberwastaken/stagee","description":"Create stunning visual designs with Stage A modern canvas editor that brings your ideas to life. Add images, text, backgrounds, and export your creations in high quality. Built for designers and creators.","private":false,"html_url":"https://github.com/Kuberwastaken/stagee","language":"","updated_at":"2026-08-23T08:49:32Z"},{"id":1335997807,"full_name":"Kuberwastaken/kube","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/kube","language":"Rust","updated_at":"2026-08-23T08:30:44Z"},{"id":1342711403,"full_name":"Kuberwastaken/wanless-778-lean","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/wanless-778-lean","language":"Lean","updated_at":"2026-08-22T10:41:53Z"},{"id":1283865819,"full_name":"Kuberwastaken/reference","description":"Let your AI agents search each other's past sessions.","private":false,"html_url":"https://github.com/Kuberwastaken/reference","language":"Python","updated_at":"2026-08-21T19:18:35Z"},{"id":1286318069,"full_name":"houseofbrand/sunstone-collective","description":"","private":false,"html_url":"https://github.com/houseofbrand/sunstone-collective","language":"TypeScript","updated_at":"2026-08-21T08:45:20Z"},{"id":1285791810,"full_name":"Kuberwastaken/awesome-codex-mcp-servers","description":"A curated, searchable catalog of Model Context Protocol (MCP) servers for OpenAI Codex — CLI, IDE, and cloud.","private":false,"html_url":"https://github.com/Kuberwastaken/awesome-codex-mcp-servers","language":"JavaScript","updated_at":"2026-08-20T23:51:25Z"},{"id":1309810370,"full_name":"Kuberwastaken/goldbach","description":"Research archive and the collective progress of humanity to Goldbach's Conjecture and potential approaches to solve it.","private":false,"html_url":"https://github.com/Kuberwastaken/goldbach","language":"Python","updated_at":"2026-08-20T12:44:54Z"},{"id":1069128980,"full_name":"Kuberwastaken/sweeta","description":"Remove Watermarks from SORA 2 Video Generations with LaMA inpainting. (RESEARCH AND EDUCATIONAL USE ONLY)","private":false,"html_url":"https://github.com/Kuberwastaken/sweeta","language":"Python","updated_at":"2026-08-20T11:22:59Z"},{"id":1340444169,"full_name":"Kuberwastaken/cognito","description":"In-house device fingerprinting + device graph for fraud (Razorpay Day0). The raw vectors \u0026 edges a vendor rents back as a bare visitor id — owned, and graphed.","private":true,"html_url":"https://github.com/Kuberwastaken/cognito","language":"TypeScript","updated_at":"2026-08-20T11:01:36Z"},{"id":1295116325,"full_name":"Kuberwastaken/subagentmaxxing","description":"Drive OpenAI Codex \u0026 Cursor CLI coding agents as subagents with the same ergonomics as native Claude Code subagents (grok-4.5, composer-2.5, gpt-5.5). Uniform run/fanout CLI + Claude Code skill.","private":false,"html_url":"https://github.com/Kuberwastaken/subagentmaxxing","language":"Python","updated_at":"2026-08-19T21:59:57Z"},{"id":1126878033,"full_name":"Kuberwastaken/DoomMe","description":"DOOM running inside a README","private":false,"html_url":"https://github.com/Kuberwastaken/DoomMe","language":"Python","updated_at":"2026-08-19T15:33:09Z"},{"id":1339708033,"full_name":"Kuberwastaken/linus-torvalds-skill","description":"Distilled Code Reviewer skills/soul from 32k~ email from the kernel newsletter","private":false,"html_url":"https://github.com/Kuberwastaken/linus-torvalds-skill","language":"","updated_at":"2026-08-19T14:57:53Z"},{"id":1280252902,"full_name":"Kuberwastaken/caffeineOSS","description":"☕ Caffeinate your Mac — a tiny menu-bar app that keeps macOS awake. ~120 lines of Swift, zero deps, no kexts. Built locally because MDM blocked everything else.","private":false,"html_url":"https://github.com/Kuberwastaken/caffeineOSS","language":"Swift","updated_at":"2026-08-19T07:44:20Z"},{"id":987908525,"full_name":"Kuberwastaken/ATHENA","description":"An Open Source, Customizable Smart Speaker that Actually Respects Privacy","private":false,"html_url":"https://github.com/Kuberwastaken/ATHENA","language":"Python","updated_at":"2026-08-18T17:03:40Z"},{"id":1333877809,"full_name":"Kuberwastaken/soundbox","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/soundbox","language":"Kotlin","updated_at":"2026-08-18T14:17:24Z"},{"id":1335962853,"full_name":"Kuberwastaken/pdn","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/pdn","language":"C#","updated_at":"2026-08-16T13:46:54Z"},{"id":928463534,"full_name":"Kuberwastaken/free-deep-research","description":"My free implementation of @dzhng's implementation of OpenAI's new Deep Research agent. Get (almost) the same capability for free. You can even tweak the behavior of the agent with adjustable breadth and depth. Run it for 5 min or 5 hours, it'll auto adjust :)","private":false,"html_url":"https://github.com/Kuberwastaken/free-deep-research","language":"TypeScript","updated_at":"2026-08-14T05:47:56Z"},{"id":1239857491,"full_name":"Kuberwastaken/x-algorithm","description":"Algorithm powering the For You feed on X","private":false,"html_url":"https://github.com/Kuberwastaken/x-algorithm","language":"Rust","updated_at":"2026-08-13T19:21:22Z"},{"id":1333139394,"full_name":"Kuberwastaken/deepseek-harness","description":"","private":false,"html_url":"https://github.com/Kuberwastaken/deepseek-harness","language":"","updated_at":"2026-08-13T13:19:26Z"},{"id":1309811257,"full_name":"Kuberwastaken/riemann","description":"Research archive and the collective progress of humanity to the Riemann Hypothesis and potential approaches to solve it.","private":false,"html_url":"https://github.com/Kuberwastaken/riemann","language":"Python","updated_at":"2026-08-13T07:33:04Z"},{"id":1248058576,"full_name":"anuragrazorpay/hive","description":"","private":true,"html_url":"https://github.com/anuragrazorpay/hive","language":"TypeScript","updated_at":"2026-08-12T08:07:31Z"},{"id":1120243087,"full_name":"Kuberwastaken/awesome-fucking-websites","description":"A curated list of websites that tell you to just use the fucking tool.","private":false,"html_url":"https://github.com/Kuberwastaken/awesome-fucking-websites","language":"HTML","updated_at":"2026-08-10T14:56:06Z"},{"id":1329207682,"full_name":"Kuberwastaken/linkedin-forensics","description":"Agent skill: evidence-led OSINT forensics on public LinkedIn posts, profiles \u0026 media — decode activity/URN IDs to UTC timestamps, inspect media.licdn.com assets, build provenance-tracked timelines. Install: npx skills add Kuberwastaken/linkedin-forensics","private":false,"html_url":"https://github.com/Kuberwastaken/linkedin-forensics","language":"Python","updated_at":"2026-08-09T21:33:09Z"},{"id":1326642281,"full_name":"Kuberwastaken/vscodium","description":"binary releases of VS Code without MS branding/telemetry/licensing","private":false,"html_url":"https://github.com/Kuberwastaken/vscodium","language":"","updated_at":"2026-08-07T12:23:42Z"},{"id":1285791373,"full_name":"Kuberwastaken/awesome-claude-mcp-servers","description":"A curated, searchable catalog of Model Context Protocol (MCP) servers for Claude — Desktop, Code, and API.","private":false,"html_url":"https://github.com/Kuberwastaken/awesome-claude-mcp-servers","language":"JavaScript","updated_at":"2026-08-06T14:57:37Z"},{"id":1210329321,"full_name":"Kuberwastaken/minicraft","description":"A playable copy of Minecraft Classic hidden inside a single X thread that's self-decoding, runs in your browser.","private":false,"html_url":"https://github.com/Kuberwastaken/minicraft","language":"HTML","updated_at":"2026-08-06T03:40:17Z"},{"id":1312487600,"full_name":"mohitpaddhariya/crucible","description":"","private":false,"html_url":"https://github.com/mohitpaddhariya/crucible","language":"Python","updated_at":"2026-08-05T04:20:03Z"},{"id":1321472284,"full_name":"Kuberwastaken/pdf-inspector","description":"Agent skill: local PDF → Markdown for Claude Code/Codex/Cursor, powered by Firecrawl's pdf-inspector","private":false,"html_url":"https://github.com/Kuberwastaken/pdf-inspector","language":"Python","updated_at":"2026-08-03T08:40:50Z"},{"id":1320332405,"full_name":"Kuberwastaken/pdf-inspector-lib","description":"Fast Rust library for PDF inspection, classification, and text extraction. Intelligently detects scanned vs text-based PDFs to enable smart routing decisions.","private":false,"html_url":"https://github.com/Kuberwastaken/pdf-inspector-lib","language":"","updated_at":"2026-08-03T08:32:11Z"},{"id":1319118594,"full_name":"Kuberwastaken/deepseek-meeting","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/deepseek-meeting","language":"","updated_at":"2026-08-01T08:46:05Z"},{"id":1312752911,"full_name":"Kuberwastaken/herdr","description":"agent multiplexer that lives in your terminal.","private":false,"html_url":"https://github.com/Kuberwastaken/herdr","language":"","updated_at":"2026-07-29T20:08:18Z"},{"id":1315164480,"full_name":"Kuberwastaken/crucible-waitlist","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/crucible-waitlist","language":"TypeScript","updated_at":"2026-07-28T17:38:16Z"},{"id":969009875,"full_name":"Kuberwastaken/MiniLMs","description":"A research project focused on studying and implementing minimalist language model architectures and resources for AI","private":false,"html_url":"https://github.com/Kuberwastaken/MiniLMs","language":"Jupyter Notebook","updated_at":"2026-07-27T16:12:21Z"},{"id":1313512362,"full_name":"Kuberwastaken/scriptc","description":"TypeScript-to-Native Compiler","private":false,"html_url":"https://github.com/Kuberwastaken/scriptc","language":"","updated_at":"2026-07-27T06:47:45Z"},{"id":1194354315,"full_name":"Kuberwastaken/litmus","description":"Run a Parallel Autonomous ML Research Organization on your OpenClaw instance. ","private":false,"html_url":"https://github.com/Kuberwastaken/litmus","language":"HTML","updated_at":"2026-07-26T10:54:45Z"},{"id":1312573415,"full_name":"Kuberwastaken/rl-opus","description":"","private":false,"html_url":"https://github.com/Kuberwastaken/rl-opus","language":"","updated_at":"2026-07-26T06:59:35Z"},{"id":1311964859,"full_name":"Kuberwastaken/jacobian","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/jacobian","language":"Python","updated_at":"2026-07-26T05:11:04Z"},{"id":1309957630,"full_name":"Kuberwastaken/breakthroughmaxxing","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/breakthroughmaxxing","language":"Python","updated_at":"2026-07-25T21:43:50Z"},{"id":1311039192,"full_name":"Kuberwastaken/formal-conjectures-counterexamples","description":"","private":false,"html_url":"https://github.com/Kuberwastaken/formal-conjectures-counterexamples","language":"Lean","updated_at":"2026-07-24T12:57:15Z"},{"id":1310299994,"full_name":"Kuberwastaken/formal-conjectures","description":"A collection of formalized statements of conjectures in Lean.","private":false,"html_url":"https://github.com/Kuberwastaken/formal-conjectures","language":"","updated_at":"2026-07-23T19:31:38Z"},{"id":1310285522,"full_name":"Kuberwastaken/conway99-c3-orbit-restriction","description":"Lean 4 formalization of the Conway 99-graph free-C3 triangular-orbit restriction","private":false,"html_url":"https://github.com/Kuberwastaken/conway99-c3-orbit-restriction","language":"Lean","updated_at":"2026-07-23T19:12:27Z"},{"id":1310246802,"full_name":"Kuberwastaken/wowii-63-85-counterexample","description":"Lean 4 certificates for C5[K4] counterexamples to WOWII Graph Conjectures 63 and 85","private":false,"html_url":"https://github.com/Kuberwastaken/wowii-63-85-counterexample","language":"Lean","updated_at":"2026-07-23T18:59:13Z"},{"id":1072437990,"full_name":"Kuberwastaken/spica","description":"Endlessly Extend OpenAI's Sora 2 Outputs","private":false,"html_url":"https://github.com/Kuberwastaken/spica","language":"TypeScript","updated_at":"2026-07-23T15:44:41Z"},{"id":1309840868,"full_name":"Kuberwastaken/ik_llama.cpp","description":"llama.cpp fork with additional SOTA quants and improved performance","private":false,"html_url":"https://github.com/Kuberwastaken/ik_llama.cpp","language":"","updated_at":"2026-07-23T10:57:56Z"},{"id":1308722441,"full_name":"Kuberwastaken/wrec","description":"the most efficient screen recorder for mac. ","private":false,"html_url":"https://github.com/Kuberwastaken/wrec","language":"","updated_at":"2026-07-22T11:11:34Z"},{"id":1307737645,"full_name":"dexter123233/pocket-fm-hackathon","description":"0 to 1 - Pocket FM Hackathon","private":false,"html_url":"https://github.com/dexter123233/pocket-fm-hackathon","language":"","updated_at":"2026-07-21T15:32:37Z"},{"id":1304767520,"full_name":"sauravtom/weather-project","description":"RADiCE phase 0: falsification probe for future-supervised analog retrieval in weather forecasting (WeatherBench2, Colab T4)","private":true,"html_url":"https://github.com/sauravtom/weather-project","language":"Python","updated_at":"2026-07-18T09:31:36Z"},{"id":1156490163,"full_name":"Kuberwastaken/picogpt","description":"GPT in a QR Code ; The actual most atomic way to train and inference a GPT in pure, dependency-free JS/Python.","private":false,"html_url":"https://github.com/Kuberwastaken/picogpt","language":"HTML","updated_at":"2026-07-16T14:56:28Z"},{"id":1302396036,"full_name":"Kuberwastaken/grok-build","description":"SpaceXAI's coding agent harness and TUI. Fullscreen, mouse interactive, extensible.","private":false,"html_url":"https://github.com/Kuberwastaken/grok-build","language":"","updated_at":"2026-07-16T06:15:27Z"},{"id":1299281443,"full_name":"Kuberwastaken/chips","description":"8-bit chip and system emulators in standalone C headers","private":false,"html_url":"https://github.com/Kuberwastaken/chips","language":"","updated_at":"2026-07-13T12:43:42Z"},{"id":1299144627,"full_name":"Kuberwastaken/Agent-Reach","description":"Give your AI agent eyes to see the entire internet. Read \u0026 search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu — one CLI, zero API fees.","private":false,"html_url":"https://github.com/Kuberwastaken/Agent-Reach","language":"","updated_at":"2026-07-13T10:13:52Z"},{"id":1299092635,"full_name":"Kuberwastaken/colibri","description":"Run GLM-5.2 (744B MoE) on a 25GB-RAM consumer machine — pure C, zero deps, experts streamed from disk. Tiny engine, immense model. 🐦","private":false,"html_url":"https://github.com/Kuberwastaken/colibri","language":"","updated_at":"2026-07-13T09:16:27Z"},{"id":1084204054,"full_name":"Kuberwastaken/nogreeting","description":"Imagine calling someone on the phone, going [GREETING]! then putting them on hold, if you see this link on someone's bio, just [GREETING] will likely get you ghosted","private":false,"html_url":"https://github.com/Kuberwastaken/nogreeting","language":"TypeScript","updated_at":"2026-07-09T14:18:56Z"},{"id":1290947152,"full_name":"Kuberwastaken/rpy-finetune-poc-scripts","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/rpy-finetune-poc-scripts","language":"Python","updated_at":"2026-07-08T17:09:08Z"},{"id":1293179061,"full_name":"Kuberwastaken/incog","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/incog","language":"Python","updated_at":"2026-07-08T08:00:58Z"},{"id":1292232462,"full_name":"Kuberwastaken/wappalyzer","description":"Identify technology on websites.","private":false,"html_url":"https://github.com/Kuberwastaken/wappalyzer","language":"","updated_at":"2026-07-07T11:30:15Z"},{"id":1290712286,"full_name":"Kuberwastaken/sira-router","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/sira-router","language":"Python","updated_at":"2026-07-06T11:39:02Z"},{"id":1290726244,"full_name":"Kuberwastaken/tinyrouter","description":"A tiny ~10K-parameter LLM router that learns which open-source model (deepseek-v4-pro / glm-5p2 / kimi-k2p6 via Fireworks) should answer each question and in what role, trained by evolution (sep-CMA-ES).","private":false,"html_url":"https://github.com/Kuberwastaken/tinyrouter","language":"","updated_at":"2026-07-06T07:27:08Z"},{"id":1254101169,"full_name":"dexter123233/agent-store","description":"","private":true,"html_url":"https://github.com/dexter123233/agent-store","language":"Kotlin","updated_at":"2026-07-05T10:06:48Z"},{"id":1278776724,"full_name":"Kuberwastaken/graphify","description":"AI coding assistant skill (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, and more). Turn any folder of code, SQL schemas, R scripts, shell scripts, docs, papers, images, or videos into a queryable knowledge graph. App code + database schema + infrastructure in one graph.","private":false,"html_url":"https://github.com/Kuberwastaken/graphify","language":"","updated_at":"2026-07-04T01:10:29Z"},{"id":1286999840,"full_name":"Kuberwastaken/hivemind","description":"","private":true,"html_url":"https://github.com/Kuberwastaken/hivemind","language":"Python","updated_at":"2026-07-02T09:53:58Z"},{"id":1208595507,"full_name":"Kuberwastaken/agent-notifications","description":"Allow your OpenClaw / Hermes agent to get notifications","private":false,"html_url":"https://github.com/Kuberwastaken/agent-notifications","language":"Python","updated_at":"2026-07-01T17:17:02Z"},{"id":1285883532,"full_name":"Kuberwastaken/leanshot","description":"","private":false,"html_url":"https://github.com/Kuberwastaken/leanshot","language":"Makefile","updated_at":"2026-07-01T09:38:29Z"},{"id":912780030,"full_name":"Kuberwastaken/ORCUS","description":"A Dual Model AI Based Comment-Analyzer and Flag-Generator for Social Media","private":false,"html_url":"https://github.com/Kuberwastaken/ORCUS","language":"Python","updated_at":"2026-06-30T16:24:03Z"},{"id":1066386485,"full_name":"Kuberwastaken/node-linkedin-scraper","description":"A simple linkedin profile scraper for nodejs","private":false,"html_url":"https://github.com/Kuberwastaken/node-linkedin-scraper","language":"","updated_at":"2026-06-30T00:16:29Z"},{"id":1265387230,"full_name":"Kuberwastaken/hob-revamped","description":"","private":false,"html_url":"https://github.com/Kuberwastaken/hob-revamped","language":"HTML","updated_at":"2026-06-29T16:36:16Z"},{"id":1247901349,"full_name":"anuragrazorpay/marketing-outbound","description":"Marketing Outbound OS — self-learning AI sales motion for Razorpay SME outbound. 3 lead funnels + 5-gate pipeline.","private":true,"html_url":"https://github.com/anuragrazorpay/marketing-outbound","language":"Python","updated_at":"2026-06-29T06:49:10Z"}]}
```