---
title: "hodge: contradiction map (chat-01M1YBM9Q)"
---

_1 transcript files aggregated._

You are the LOGIC lane for a computational Hodge-conjecture counterexample program. New strategic directive from the user (endorsing an external critique): "Write the complete proposed contradiction before doing more computation. Specify the smooth variety, rational Hodge class, obstruction group, and the theorem saying algebraicity forces the obstruction to vanish. Explicitly account for T (the compatible correction), arbitrary homologically trivial corrections, and all auxiliary choices. Every unsupported arrow becomes a named lemma. Then attack the weakest essential lemma first."

CONTEXT: clone github.com/Kuberwastaken/hodge (private, gh auth works). Read writeup/main.tex on branch agent/writeup (the current paper), chow-descent/lambda32_kernel_assessment.md and DSTAB_SECTION.md on agent/chow-descent, boundary-prelog/corrected-ring/REPRODUCIBILITY_INDEX.md on agent/boundary-prelog. Known decisive facts from two independent audits (treat as ground truth for your map): (1) On the corrected ring, W is in ker G (0/43920 verified), so ANY functional lambda vanishing on ker G + im delta has lambda(W)=0 - the old lambda=diag(32,-32) obstruction certificate was a committed-ring object and cannot exist on the corrected ring. (2) The candidate class vs representative distinction (Question q:welldef in the paper) is the decisive unproved assumption: thm:counter assumes it, the abstract omits it. (3) Also open: q:coverage (the modeled span vs the Mumford-infinite CH^2), q:hyp (period independence vs nontorsion). (4) The paper's Branch A cites theorems that don't exist in the document (thm:lambda, thm:obstruction, prop:wth, prop:repind - dead refs).

DELIVERABLE: a CONTRADICTION_MAP.md - the complete proposed contradiction written end to end: the smooth variety, the rational Hodge class, the obstruction group, the theorem chain "algebraic => obstruction vanishes", with EVERY arrow either proved-and-cited (with artifact/references) or a NAMED LEMMA with a precise statement. Rank the named lemmas by essentiality x weakness. The output's top item is the single weakest essential lemma - the one whose failure kills the whole program - with an attack plan. Be brutally honest: if the chain cannot be closed even in principle with the current candidate, say so and say what shape of candidate could close it. Report back the map (as an attachment) plus your ranked lemma list in the message.

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
Let me start by cloning the repo and reading the specified files.
```

Tool: bash

Arguments:
```json
{"command": "cd /home/sandbox && git clone --quiet github.com/Kuberwastaken/hodge hodge 2>&1 | tail -2; cd hodge && git branch -a && git log --oneline -3"}
```

Tool: bash

fatal: repository 'github.com/Kuberwastaken/hodge' does not exist

/dev/fd/3: line 2: cd: hodge: No such file or directory


[exit code: 1]

Tool: bash

Arguments:
```json
{"command": "cd /home/sandbox && gh repo clone Kuberwastaken/hodge hodge 2>&1 | tail -3; cd hodge && git branch -a | head -20 && git log --oneline -3"}
```

Tool: bash

To get started with GitHub CLI, please run:  gh auth login
Alternatively, populate the GH_TOKEN environment variable with a GitHub API authentication token.

/dev/fd/3: line 2: cd: hodge: No such file or directory


[exit code: 1]

Tool: bash

Arguments:
```json
{"command": "ls ~/.config/gh 2>/dev/null; env | grep -i -E 'gh_|github' | sed 's/=.*/=<set>/'; which gh; gh auth status 2>&1 | head -5"}
```

Tool: bash

/usr/bin/gh
You are not logged into any GitHub hosts. To log in, run: gh auth login


[exit code: 0]

```thinking
gh auth doesn't work in my environment. Maybe there's a github integration tool. Let me check `tools --help` for github.
```

Tool: bash

Arguments:
```json
{"command": "tools --help 2>&1 | head -60"}
```

Tool: bash

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
{"command": "tools help github.get-file-content github.list-repos github.get-repo github.search-code 2>&1 | tail -120"}
```

Tool: bash

help github.get-file-content: attached below
help github.list-repos: attached below
help github.get-repo: attached below
help github.search-code: attached below


[exit code: 0]

[attached: tools help]
===== tools help github.get-file-content =====
Read the content of a file from a GitHub repository.

USAGE
  tools github get-file-content --owner VALUE --path VALUE [--ref VALUE] --repo VALUE [--json] [--timeout SECONDS]

OPTIONS
  --owner                string   Repository owner (required)
  --path                 string   File path within the repository (required)
  --ref                  string   Branch, tag, or commit SHA (default: default branch)
  --repo                 string   Repository name (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {owner:str,repo:str,path:str,content:str,ref?:str}

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

Tool: bash

Arguments:
```json
{"command": "mkdir -p /home/sandbox/hodgefiles\nfor spec in \"writeup/main.tex|agent/writeup|main.tex\" \"chow-descent/lambda32_kernel_assessment.md|agent/chow-descent|lambda32_kernel_assessment.md\" \"chow-descent/DSTAB_SECTION.md|agent/chow-descent|DSTAB_SECTION.md\" \"boundary-prelog/corrected-ring/REPRODUCIBILITY_INDEX.md|agent/boundary-prelog|REPRODUCIBILITY_INDEX.md\"; do\n  path=\"\${spec%%|*}\"; rest=\"\${spec#*|}\"; ref=\"\${rest%%|*}\"; out=\"\${rest##*|}\"\n  tools github get-file-content --owner Kuberwastaken --repo hodge --path \"\$path\" --ref \"\$ref\" --json > \"/tmp/gh_\$out.json\" 2>/tmp/gh_err_\$out.txt\n  if [ \$? -eq 0 ]; then\n    jq -r '.content' \"/tmp/gh_\$out.json\" > \"/home/sandbox/hodgefiles/\$out\"\n    echo \"OK \$out: \$(wc -l < /home/sandbox/hodgefiles/\$out) lines\"\n  else\n    echo \"FAIL \$out: \$(cat /tmp/gh_err_\$out.txt | head -2)\"\n  fi\ndone"}
```

Tool: bash

OK main.tex: 1940 lines
OK lambda32_kernel_assessment.md: 88 lines
OK DSTAB_SECTION.md: 70 lines
OK REPRODUCIBILITY_INDEX.md: 81 lines


[exit code: 0]

Structured:
```json
{"owner":"Kuberwastaken","repo":"hodge","path":"boundary-prelog/corrected-ring/REPRODUCIBILITY_INDEX.md","ref":"agent/boundary-prelog","content":"# Reproducibility index - ring artifacts (2026-09-07)\n\nCanonical fingerprint convention: **file-bytes sha256** of the artifact file exactly as emitted. CSR content-hashes over indptr/indices/data buffers are retired (index-dtype fragile). Ring fingerprints below use the recipe in MANIFEST.json (sha256 over pickle dumps of cols, sorted free, sorted piv rows).\n\n## Ring fingerprint sweep (cols,free,piv recipe, first 8 hex)\n\n| comp | committed v2 (DEFECTIVE, retired) | committed split == corrected split | corrected v2 (CANONICAL) |\n|---|---|---|---|\n| empty | 82a1b39d | 5d6b5719 | 50b9c489 |\n| 0 | 56fc1792 | f1602268 | 752ab48b |\n| 1 | 28c6b589 | f1602268 | 9a8371c1 |\n| 2 | 19ee8d12 | f1602268 | fd1d0659 |\n| 3 | e63c487b | f1602268 | 111300eb |\n| 01 | 4051e54f | ead6cbf3 | a0b6d472 |\n| 02 | 494045be | ead6cbf3 | 7fde1653 |\n| 03 | 634ac06f | ead6cbf3 | aef31765 |\n| 12 | 0a367df8 | ead6cbf3 | 8d397a39 |\n| 13 | 994961c9 | ead6cbf3 | 6521f53c |\n| 23 | 91b75732 | ead6cbf3 | 5a6bbb95 |\n| 012 | e14471d8 | 1c1bed5a | 6751e8eb |\n| 013 | 017e55fb | 1c1bed5a | b4d0f144 |\n| 023 | b068b972 | 1c1bed5a | d1c7a071 |\n| 123 | b2c319e0 | 1c1bed5a | 0befce58 |\n| 0123 | cb9161e7 | b63688e5 | b7aca6a8 |\n\nSplit note: corrected split ring == committed split ring byte-identical (lam={} never invokes the defective deg-2 base mul table; verified at relation level, 1900/1900 rows on comp 0, and all 240 edge side maps). Audit-confirmed.\n\n## Canonical artifacts (file-bytes sha256)\n\n| artifact | file sha256 (prefix) | notes |\n|---|---|---|\n| xW_weil_CORRECTED.npz | ec8e0b10 | canonical W; byte-matched boundary exact-Q reduction, 0/18272 both channels |\n| G_corrected_csr.npz | 776652c2 | 43920x18272 nnz 976130, ascending rows; canonical nonsplit G |\n| G_rowmap_corrected.pkl | 26eb36a0 | row -\u003e (edge,t), ascending; joint with matrix 67533bbd |\n| G_split_ascending_csr.npz | 49c52a6c | supersedes a5bbf928 (pure row permutation); joint with rowmap 1a55cade |\n| G_split_rowmap_ascending.pkl | 772c15ec | ascending emission order |\n| corrected_relation_rows.pkl | 7af635d0 | pre-rref joint_rel generators per comp, CorrectedBase |\n| corrected-components/comp_*.pkl | see MANIFEST.json | 16/16 sha-verified vs Astra corrected_components_result.json |\n\n## Retired\n\n- xW_weil_true.npz (committed-ring reduction of raw W; wrong ring)\n- xW_weil_split.npz (cross-ring re-expression; invalid route)\n- G_rowmap.pkl (non-ascending within-block t order; set-iteration artifact)\n- Astra corrected_G.pkl / corrected_N.pkl (stale side-1 translate_full formula; arbitration 2026-09-07)\n- delta_cols-3e38aecc.npz (stale uncorrected delta, nnz 1871544; corrected nnz 2279204)\n\n## Ring implementation (dedup shim)\n\nONE ring implementation: corrected_base.CorrectedBase (this directory) is the canonical deg-2 base mul table. stage3_base2.Base2 remains in the repo ONLY as CorrectedBase's superclass and for historical replay; its E^2=6pt / F_j^2=-pt/2 normalization entries are defective for all program uses. All mints and G builds must run with BASE=CorrectedBase() and pin these fingerprints.\n\n## witnesses_41.npz (patching adjudication, writeup r20)\n- Path: `boundary-prelog/corrected-ring/witnesses_41.npz`\n- sha256 (file-bytes): `ff3232555a23c87c4e83709f029392256bdb669bee99cfe42df0dc6caf2fec16`\n- Size: 3622712 bytes\n- Content: 41 unglueable patching residues + their images + deg2 / deg_le1 column lists. Audit-triangulated: universal patching lemma false by exactly 41. Cited by writeup r20.\n\n## coset_kg_result.json (coset provenance record-run, writeup r27)\n- Path: `boundary-prelog/corrected-ring/coset_kg_result.json`\n- sha256 (file-bytes): `b0447ad24e556a3a2441d4e4a779db5286d273f80aa4fe5707078ac1200de7cb`\n- Size: 287 bytes\n- Content: rank(M) = 954; all four channels (W_R, W_I, T_R, T_I) consistent - C(v) lies in pi(ker G) for both vectors; vacuity obstruction dead for W and T. Cited by writeup r27 (Remark 6.7).\n\n## G_corrected_csr.npz + G_rowmap_corrected.pkl (canonical corrected G, auditor fetch)\n- `boundary-prelog/corrected-ring/G_corrected_csr.npz` sha256 `776652c27838732c5d23800ec83af97c9a52a0c5c4366400f8f0b84cdc8f56bf` (1,441,981 B): corrected-ring gluing matrix, csr 43920x18272, nnz 976130, ascending emission order.\n- `boundary-prelog/corrected-ring/G_rowmap_corrected.pkl` sha256 `26eb36a0e6bf8bb9e8e02e22b43c02f826d4c3baaa59fb67fd592f35569e0cba` (301,658 B): row labels, ascending emission order; fingerprinted together with the matrix.\n\n## xW_weil_CORRECTED.npz (corrected Weil vector W)\n- `boundary-prelog/corrected-ring/xW_weil_CORRECTED.npz` sha256 `ec8e0b102df6d0b1a1755ef9f667a5d0b8a00a7e494fcbf3cab53d3447c79e64` (293,330 B): keys WR, WI, n, p. Byte-matched against boundary's W_T_mine_reduced (0/18272 diffs, both channels).\n\n## verdict-bundle/ (boundary's verdict bundle, 21 files + MANIFEST.txt)\n- Path: `boundary-prelog/verdict-bundle/`; per-file sha256 in `boundary-prelog/verdict-bundle/MANIFEST.txt` (all 21 verified on landing).\n- Contents: stage3_v2.py, g_echelon.py, g_tail.py, g_deg1{,_stage2,_rank}.py + g_deg1_B.npy + g_deg1_result.json + g_deg1_ckpt.pkl (13.6MB completed rowdeg==1 echelon), k_rank_{rref,tail}.py, kerphi{,2}.py, coset_kg{,4}.py + coset_kg_result.json, h_minted.json, witnesses_41.npz, W_T_mine_reduced.npz (canonical T+W mod p, sha e3f9ed4d3bb02a98e3e03b951d038a6427418671d0ae346a641538a821e4a4c7), deg2_row_indices_witness_order.npy, README.md.\n- Dropped as regenerable per boundary's README: g_tail_ckpt.pkl (44MB), k_rank_rref_ckpt.pkl (41MB), M1/M2/coset_M U-products.\n\n## col_catalog_ascending.pkl (global column key table for G_corrected)\n- Path: `boundary-prelog/corrected-ring/col_catalog_ascending.pkl`\n- sha256 (file-bytes): `818a7da9e0d6c6b999e8a7f424b300a53a6e161d20b63d5f65e49efa439c9a32`\n- 18272 entries, each (component tuple, free-col index, ((monomial key tuple), base symbol)), in G's exact column order: components in comps_order (subsets of {0,1,2,3} by size then lexicographic), free cols ascending within each.\n- Order proof: rebuilding G (43920x18272, nnz 976130) from the corrected comp pkls + corrected edges under this ordering reproduces G_corrected_csr.npz byte-identically (sha 776652c2...). Minted for boundary's s=2 projection test.\n"}
```

```thinking
All four files retrieved. Now read them. main.tex is 1940 lines — read in chunks. Let me read the smaller files first and get a structural overview of main.tex.
```

Tool: bash

Arguments:
```json
{"command": "cd /home/sandbox/hodgefiles && cat lambda32_kernel_assessment.md && echo \"=====DSTAB=====\" && cat DSTAB_SECTION.md && echo \"=====REPRO=====\" && cat REPRODUCIBILITY_INDEX.md"}
```

Tool: bash

# What lambda(W) = 32 says about W's Albanese-kernel membership

Preliminary assessment for the machinery paper's lambda discussion /
future-work section. Status of the object: W_mine is a bona fide global
class on the canonical ring (G_corrected.W_mine = 0/43920, two
implementations), and lambda is relation-invariant, so lambda(W) = 32 is
an invariant of the class - not of a representative, not of a ring
convention. Everything below is decoupled from the gluing story.

## 1. What lambda actually detects (decode facts, r5/r10)

The identity-keyed decode (532 coeffs: 266 WR + 266 WI) nets to:
  WR: -32 on E*B1, all other deg-1 nets 0
  WI: -32 on E*B3, all other deg-1 nets 0
The deg-2 support (152/152 coeffs) is wholly RREF-reconstructed from free
deg-1 Pic0-fibre cols: intrinsically, lambda reads ONLY the (E*B1, E*B3)
coordinates of a class. The deg-2-looking content is forced by relations,
not independent information.

So lambda is an s=1 detector: E*B_j = E.(Pic0 fibre) sits in CH^2_(1)
(E symmetric, B_j in Pic0; Beauville). It does not see s=0 (degree) or
s=2 (Albanese kernel) content at all. The (B1, B3) pair is one complex/
quaternionic channel: under i in End^0(B) = (-1,3)_Q, the B1- and
B3-readings are R and I parts of a single C-valued invariant (the defect
era's exact J-pairing is the same structure).

## 2. The kernel criterion (pins, all scan-verified)

- s-split: CH^2_(0) (degree) + CH^2_(1) + CH^2_(2); CH^2_(2) = ker alb is
  the Albanese kernel.
- Beauville p.650: alpha_1 injective (bijective) on CH^2_(1): the s=1
  part of a class is FAITHFULLY detected by alb.
- Pin 3 (diagonal, confirmed g=2 by geometry lane):
  alb(E.lambda_E(x)) = -(E^2/2).x = -3.x for x in Pic0 (E of type (1,3),
  E^2 = 6pt). So alb(E*B_j) = -3 b_j, nonzero for nonzero b_j.

## 3. Implication: W is NOT in the Albanese kernel

lambda(W) = 32 != 0 says W's (E*B1, E*B3) coordinates are not both zero.
Hence W_(1) != 0, hence alb(W) = alb(W_(1)) = -3.(m1*b1 + m3*b3) != 0
(with m1, m3 the coordinates lambda reads; b_j a Q-basis of Pic0, so
nonzero). Therefore W is not in CH^2_(2). The old "obstruction" was
always an s=1 shadow: lambda only ever saw the E*B1/E*B3 fibre, and what
it sees on the canonical class is W's honest s=1 content.

Normalization to be pinned before the paper states numbers: with cup Gram
32*I on the E*B subspace and height norm 8 (radar's scale notes), the
natural reading is m1 = m3 = +-1 up to the sign convention - i.e. W
carries exactly one unit of the E*B1 and E*B3 fibre directions - but the
exact m's require reconciling the three scale conventions (height norm 8,
cup Gram 32*I, the 64x T-tuple reference). Flagged, not asserted.

## 4. What lambda = 32 does NOT decide

It says nothing about W_(2), the s=2 component - the sector the program's
pin actually lives in. W = W_(0) + W_(1) + W_(2) with W_(1) now known
nonzero; W_(2) could be zero or not, and neither lambda nor alb can see
it (Beauville: alb kills CH^2_(2) by definition; lambda's decode shows it
reads no s=2 content).

## 5. What a real answer requires

1. NORMALIZATION (small, this lane + radar): reconcile the three scale
   conventions so "32" becomes explicit (m1, m3). One paragraph of
   algebra, no new computation.
2. PROJECTION TEST (medium, boundary/radar machinery): compute W's
   component on the proved s<=1 span INSIDE the canonical ring - the
   span of toric deg-2 classes, Q-classes, and the E*B_j fibre - and
   test whether the residual W_(2) = W - proj_{s<=1}(W) is zero in the
   canonical free basis. This is a rank/solve test on existing
   artifacts, no new rings. THIS is the decisive computation for whether
   the program has a kernel candidate at all.
3. If W_(2) != 0: the Hodge-side question re-opens with a concrete
   canonical candidate - is W_(2)'s Hodge class algebraic? That is the
   original pin, now with the formal-to-actual descent already closed
   (W glues) and the s=1 content explicitly identified and removable.

## 6. Suggested framing for the paper (one paragraph)

The lambda-invariant of the canonical class W equals 32 and is entirely
an s=1 reading: lambda detects the (E.B1, E.B3) Pic0-fibre coordinates
and nothing else (identity-keyed decode; all deg-2 support is
relation-forced). Consequently W has nonzero Albanese image -
alb(W) = -3(m1 b1 + m3 b3) != 0 - and is not an Albanese-kernel class.
The kernel question, invisible to lambda by construction, reduces to the
residual W_(2) after projection onto the proved s<=1 span; computing
that projection on the canonical ring is the identified next step.

=====DSTAB=====
# SECTION DRAFT - The wall-crossing derivation: existence, innerness, stability
(Branch C machinery paper. All computational claims below are exact mod
p = 1000003 on the corrected ring; logs and scripts on
agent/boundary-prelog, geometry-lane files as cited.)

## D.1 Definition
Let e = (f0, f1) be an edge of the degeneration's 1-skeleton, s in {0,1} a
side, Gc the shared face, and mw_s the integral monodromy direction of e
viewed from side s (SPLIT_HEIGHTS_DERIVATION.md). On the free monomial
algebra of the side-s face fan, tensor the formal base algebra, define the
derivation D = D_s^(e) by
    D(x_Gc) = l~_s := -(1/4) sum_k (mw_s)_k A_k,    D(x_K) = 0 (K != Gc),
    D(base symbols) = 0,
extended by Leibniz. D is homogeneous of bidegree (-1, +1) (drops one toric
factor, adds one Pic^0 symbol), hence nilpotent on the deg-3 model: D^3 = 0
for base-degree reasons.

## D.2 Theorem (the twist is inner)
Let rest_s be the twisted restriction of the edge ring to the side-s comp
ring and rest_s^0 its untwisted (pure-fan) part. Then
    rest_s = rest_s^0 o exp(D).        (1)
Proof: both sides are ring homomorphisms; they agree on the generators
(x_Gc maps to y_s + l~_s under rest_s and under rest_s^0 o exp(D); all other
generators agree trivially). The Taylor expansion terminates: the k-th lam
part of rest_s(u) is (1/k!) rest_s^0(D^k u), and base-degree > 2 vanishes.
Computational verification: (1) checked on every free-column representative
of all 16 comp rings, for every edge and side - 240 x 2 = 480 edge-sides,
zero mismatches, both lam channels (probe_inner_corrected.py,
probe_corr_log.txt; earlier committed-ring run edges 0-20 in probe_log.txt,
superseded artifact).

## D.3 Theorem (D-stability, ideal level)
D preserves the relation ideal I of the comp ring: D(I) subset I.
Proof: D is a derivation, so by Leibniz it suffices that D maps a generating
set of I into I. Generators: (i) Stanley-Reisner monomials; (ii) the
twisted-linear generators l_{fi,s} (joint_rel: 4 fan coordinate forms x
base symbols, twisted by lam). For (i): an SR monomial containing x_Gc is
mapped to l~_s times a smaller SR-or-zero monomial; the SR-check passes
exhaustively (all 240 edges, both sides, every non-cone ray pair: 0
failures, dstab_corrected.py / dstab_corr_log.txt). For (ii): the derivation kills every factor
except the shared-face ray, so with c_fi the fi-th coordinate of the ray Gc,
    D(l_{fi,s}) = 2 c_fi . l~_s . s.
Every summand of l~_s . s is A_k . s with deg(A_k) = 1 and, for the
degree-3 basics, deg(s) = 2. The base algebra is the model of CH^{<=2} of
the base: it is truncated at base-degree 2 (CorrectedBase.mul(a,b) = 0
whenever deg(a) + deg(b) > 2; base.monomials(3) is empty). Hence
l~_s . s = 0 in the ring - the vanishing is literal, not modulo relations -
and D(l_{fi,s}) = 0, a fortiori in I. (Computational confirmation:
480 edge-sides x 60 basics = 28800/28800, and no rref pivot column of any
comp ring has empty toric monomial, so the reduction test measures exactly
this literal vanishing rather than a quotient coincidence.) []

## D.4 Remark (truncation non-closure, quantified)
The deg-3 TRUNCATED row span used in computation is closed under toric
multiplication but not under base-symbol multiplication; consequently the
membership test D(r) in span(rows_3) fails for 9.66% of product rows
l . m0 (j >= 1), exactly via the Leibniz cross-term l . D(m0) - the
lam-twist A_j-multiples of relations that the truncation does not model.
By D.3 this is a property of the truncation, not of D; the base
multiplication tables are associative on the A-sector in both ring versions
(exhaustive associator check), excluding the alternative mechanism. The
figure quantifies the information lost by the truncation and nothing else.

## D.5 Corollary (what the patching construction consumes)
exp(D) is a well-defined automorphism of each comp ring quotient, and the
patching lemma's local patch w_s^(e) = D(v1_s) - (1/2) D^2(v0_s)
(PATCHING_LEMMA.md sec 2) is defined on CLASSES, not merely on
representatives. The representative-level identity (1) plus D.3 are exactly
the two inputs the assembly argument uses.

=====REPRO=====
# Reproducibility index - ring artifacts (2026-09-07)

Canonical fingerprint convention: **file-bytes sha256** of the artifact file exactly as emitted. CSR content-hashes over indptr/indices/data buffers are retired (index-dtype fragile). Ring fingerprints below use the recipe in MANIFEST.json (sha256 over pickle dumps of cols, sorted free, sorted piv rows).

## Ring fingerprint sweep (cols,free,piv recipe, first 8 hex)

| comp | committed v2 (DEFECTIVE, retired) | committed split == corrected split | corrected v2 (CANONICAL) |
|---|---|---|---|
| empty | 82a1b39d | 5d6b5719 | 50b9c489 |
| 0 | 56fc1792 | f1602268 | 752ab48b |
| 1 | 28c6b589 | f1602268 | 9a8371c1 |
| 2 | 19ee8d12 | f1602268 | fd1d0659 |
| 3 | e63c487b | f1602268 | 111300eb |
| 01 | 4051e54f | ead6cbf3 | a0b6d472 |
| 02 | 494045be | ead6cbf3 | 7fde1653 |
| 03 | 634ac06f | ead6cbf3 | aef31765 |
| 12 | 0a367df8 | ead6cbf3 | 8d397a39 |
| 13 | 994961c9 | ead6cbf3 | 6521f53c |
| 23 | 91b75732 | ead6cbf3 | 5a6bbb95 |
| 012 | e14471d8 | 1c1bed5a | 6751e8eb |
| 013 | 017e55fb | 1c1bed5a | b4d0f144 |
| 023 | b068b972 | 1c1bed5a | d1c7a071 |
| 123 | b2c319e0 | 1c1bed5a | 0befce58 |
| 0123 | cb9161e7 | b63688e5 | b7aca6a8 |

Split note: corrected split ring == committed split ring byte-identical (lam={} never invokes the defective deg-2 base mul table; verified at relation level, 1900/1900 rows on comp 0, and all 240 edge side maps). Audit-confirmed.

## Canonical artifacts (file-bytes sha256)

| artifact | file sha256 (prefix) | notes |
|---|---|---|
| xW_weil_CORRECTED.npz | ec8e0b10 | canonical W; byte-matched boundary exact-Q reduction, 0/18272 both channels |
| G_corrected_csr.npz | 776652c2 | 43920x18272 nnz 976130, ascending rows; canonical nonsplit G |
| G_rowmap_corrected.pkl | 26eb36a0 | row -> (edge,t), ascending; joint with matrix 67533bbd |
| G_split_ascending_csr.npz | 49c52a6c | supersedes a5bbf928 (pure row permutation); joint with rowmap 1a55cade |
| G_split_rowmap_ascending.pkl | 772c15ec | ascending emission order |
| corrected_relation_rows.pkl | 7af635d0 | pre-rref joint_rel generators per comp, CorrectedBase |
| corrected-components/comp_*.pkl | see MANIFEST.json | 16/16 sha-verified vs Astra corrected_components_result.json |

## Retired

- xW_weil_true.npz (committed-ring reduction of raw W; wrong ring)
- xW_weil_split.npz (cross-ring re-expression; invalid route)
- G_rowmap.pkl (non-ascending within-block t order; set-iteration artifact)
- Astra corrected_G.pkl / corrected_N.pkl (stale side-1 translate_full formula; arbitration 2026-09-07)
- delta_cols-3e38aecc.npz (stale uncorrected delta, nnz 1871544; corrected nnz 2279204)

## Ring implementation (dedup shim)

ONE ring implementation: corrected_base.CorrectedBase (this directory) is the canonical deg-2 base mul table. stage3_base2.Base2 remains in the repo ONLY as CorrectedBase's superclass and for historical replay; its E^2=6pt / F_j^2=-pt/2 normalization entries are defective for all program uses. All mints and G builds must run with BASE=CorrectedBase() and pin these fingerprints.

## witnesses_41.npz (patching adjudication, writeup r20)
- Path: `boundary-prelog/corrected-ring/witnesses_41.npz`
- sha256 (file-bytes): `ff3232555a23c87c4e83709f029392256bdb669bee99cfe42df0dc6caf2fec16`
- Size: 3622712 bytes
- Content: 41 unglueable patching residues + their images + deg2 / deg_le1 column lists. Audit-triangulated: universal patching lemma false by exactly 41. Cited by writeup r20.

## coset_kg_result.json (coset provenance record-run, writeup r27)
- Path: `boundary-prelog/corrected-ring/coset_kg_result.json`
- sha256 (file-bytes): `b0447ad24e556a3a2441d4e4a779db5286d273f80aa4fe5707078ac1200de7cb`
- Size: 287 bytes
- Content: rank(M) = 954; all four channels (W_R, W_I, T_R, T_I) consistent - C(v) lies in pi(ker G) for both vectors; vacuity obstruction dead for W and T. Cited by writeup r27 (Remark 6.7).

## G_corrected_csr.npz + G_rowmap_corrected.pkl (canonical corrected G, auditor fetch)
- `boundary-prelog/corrected-ring/G_corrected_csr.npz` sha256 `776652c27838732c5d23800ec83af97c9a52a0c5c4366400f8f0b84cdc8f56bf` (1,441,981 B): corrected-ring gluing matrix, csr 43920x18272, nnz 976130, ascending emission order.
- `boundary-prelog/corrected-ring/G_rowmap_corrected.pkl` sha256 `26eb36a0e6bf8bb9e8e02e22b43c02f826d4c3baaa59fb67fd592f35569e0cba` (301,658 B): row labels, ascending emission order; fingerprinted together with the matrix.

## xW_weil_CORRECTED.npz (corrected Weil vector W)
- `boundary-prelog/corrected-ring/xW_weil_CORRECTED.npz` sha256 `ec8e0b102df6d0b1a1755ef9f667a5d0b8a00a7e494fcbf3cab53d3447c79e64` (293,330 B): keys WR, WI, n, p. Byte-matched against boundary's W_T_mine_reduced (0/18272 diffs, both channels).

## verdict-bundle/ (boundary's verdict bundle, 21 files + MANIFEST.txt)
- Path: `boundary-prelog/verdict-bundle/`; per-file sha256 in `boundary-prelog/verdict-bundle/MANIFEST.txt` (all 21 verified on landing).
- Contents: stage3_v2.py, g_echelon.py, g_tail.py, g_deg1{,_stage2,_rank}.py + g_deg1_B.npy + g_deg1_result.json + g_deg1_ckpt.pkl (13.6MB completed rowdeg==1 echelon), k_rank_{rref,tail}.py, kerphi{,2}.py, coset_kg{,4}.py + coset_kg_result.json, h_minted.json, witnesses_41.npz, W_T_mine_reduced.npz (canonical T+W mod p, sha e3f9ed4d3bb02a98e3e03b951d038a6427418671d0ae346a641538a821e4a4c7), deg2_row_indices_witness_order.npy, README.md.
- Dropped as regenerable per boundary's README: g_tail_ckpt.pkl (44MB), k_rank_rref_ckpt.pkl (41MB), M1/M2/coset_M U-products.

## col_catalog_ascending.pkl (global column key table for G_corrected)
- Path: `boundary-prelog/corrected-ring/col_catalog_ascending.pkl`
- sha256 (file-bytes): `818a7da9e0d6c6b999e8a7f424b300a53a6e161d20b63d5f65e49efa439c9a32`
- 18272 entries, each (component tuple, free-col index, ((monomial key tuple), base symbol)), in G's exact column order: components in comps_order (subsets of {0,1,2,3} by size then lexicographic), free cols ascending within each.
- Order proof: rebuilding G (43920x18272, nnz 976130) from the corrected comp pkls + corrected edges under this ordering reproduces G_corrected_csr.npz byte-identically (sha 776652c2...). Minted for boundary's s=2 projection test.



[exit code: 0]