---
title: "crack: Q-obstruction theory lane (chat-01M215WZG)"
---

_1 transcript files aggregated._

Theory lane for the Hodge counterexample hunt's named crack: nonsplit Weil-type sixfolds outside the disc -1 class, genus-4 semiregularity territory.

Two deliverables:

1. Mostaed arXiv:2603.20268 - read it closely. It claims CM points (McMullen curve intersect Weil locus) whose Hodge-Weil classes are absolute Hodge but "resist all known algebraicity methods". Assess: is the math sound, what exactly is shown, what is assumed, are the classes it exhibits candidates we could compute with? It's single-author unrefereed - treat as a map, verify every load-bearing claim against primary sources.

2. The obstruction-invariant question: Costa-Sertoz (arXiv:2003.11037, with code at github.com/edgarcosta/crystalline_obstruction) built a crystalline obstruction over finite fields that can prove a Hodge class is non-algebraic in char p settings. Over Q, no analog is known - that absence is exactly the "verifier cap" our program documented. Scope what a Q-analog would require: what would a realization-level invariant separating algebraic from absolute-Hodge classes have to look like, which existing frameworks (motivic Galois, Andre's motivated cycles, prismatic/BMS theory, arithmetic DT invariants) get closest, and where the known no-go results are. Deliverable: a concrete attack assessment - is this a problem an AI-assisted theory lane can make real progress on, what's the sharpest sub-problem, what would a first publishable result look like.

Adding the sharpest formulation yet of your deliverable 2, from tonight's external strategy review (Claude, independently converged with our lit scan): the missing object is a UNIVERSAL RATIONAL SPECIALIZATION RESTRICTION. Target proof shape: every algebraic cycle specializes into a proved subspace C; every representative of w specializes to W modulo a controlled ambiguity A; W not in C+A => contradiction. The Engel-deGaayFortman-Schreieder argument (arXiv:2507.15704) is the model: start from an ARBITRARY algebraic curve, derive a combinatorial restriction via degeneration, exclude it. Named caveat: their restriction is integral and dies over Q - so identify precisely which steps rely on curves and integral divisibility, and whether a genuinely different restriction exists for codimension-three cycles (must survive rational coefficients, signed combinations, base changes). Also fold in: our catalogue currently supplies examples INSIDE the algebraic specialization image, not an upper bound C on it - scoping what C and A would have to be is part of the deliverable. A proposed lemma that survives those constraints IS the breakthrough.

Fleet finding that lands squarely in your lane - the ONLY counterexample-shaped route in the entire 1962-2026 literature that survives rational coefficients: the tropical/Kontsevich approach. Key facts from the failure-mechanisms deep-read:
- Kontsevich's implication: tropical HC fails for a tropical ppav X => a generic member of the degenerating complex family is a CLASSICAL HC counterexample (one-way; converse may fail).
- Amini-Piquerez (arXiv:2012.13142) prove tropical HC for rationally triangulable varieties but EXCLUDE tropical abelian varieties by name - the open locus is exactly where the test lives.
- Zharkov (arXiv:2002.02347) wrote down Kontsevich's universal flag equations for a dim-4 Weil-type family with explicit Weil classes; his finite LINEAR ansatz reduces to a finite linear system that is solvable only modulo the full lattice Z<theta,w1,w2> - "unfortunately the solution does not hold modulo any proper sublattice". The ansatz killed exactly the Weil plane it was supposed to isolate. One failed ansatz, not a no-go.
- The attack: make the flag equations work modulo a PROPER sublattice, or find a non-linear ansatz. This is theory work.
Fold this into your attack assessment: is the tropical route a better wedge than a Q-analog crystalline obstruction, or a companion? Also note for calibration: every other mechanism (AH, Kollar, Totaro, Soule-Voisin, Ottem-Suzuki, Benoist-Ottem, EGS) is provably torsion-only - EGS's own Thm 1.10 shows 2-primary-ness - so anything you propose must clear the "survives Q" bar explicitly.

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
This is a heavy theory task. Let me plan.

Deliverables:
1. Read Mostaed arXiv:2603.20268 closely — assess soundness, what's shown, what's assumed, candidate classes for computation.
2. Q-analog obstruction invariant scoping — Costa-Sertoz crystalline obstruction, universal rational specialization restriction, EGS argument analysis, tropical/Kontsevich route comparison. Deliver a concrete attack assessment.

I need to fetch the arXiv papers. Let me start by fetching:
- arXiv:2603.20268 (Mostaed)
- arXiv:2003.11037 (Costa-Sertoz)
- arXiv:2507.15704 (Engel-deGaayFortman-Schreieder)
- arXiv:2012.13142 (Amini-Piquerez)
- arXiv:2002.02347 (Zharkov)
- github.com/edgarcosta/crystalline_obstruction

Wait — arXiv 2603.20268? That would be March 2026. Current date is September 2026, plausible. Let me fetch the abstract pages first, then HTML full text where available.

This is a lot of content. Strategy: fetch abstract pages first (cheap), then fetch full HTML (ar5iv or arxiv.org/abs + /html). web_fetch renders to markdown.

Let me batch: fetch abs pages for all five papers in one call (up to 5 URLs). Then fetch full texts.

Let me also read the deep-research skill? Not necessary; this is a math assessment task, not a report-format task. I'll skip it.

Let me start.
```

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://arxiv.org/abs/2603.20268\" --url \"https://arxiv.org/abs/2003.11037\" --url \"https://arxiv.org/abs/2507.15704\" --url \"https://arxiv.org/abs/2012.13142\" --url \"https://arxiv.org/abs/2002.02347\" --json > /tmp/abs_pages.json 2>&1; jq -r '.[] | \"===== \\(.url)\\nTITLE: \\(.title)\\nERROR: \\(.error)\\n\"' /tmp/abs_pages.json 2>/dev/null || head -c 3000 /tmp/abs_pages.json"}
```

Tool: bash

===== https://arxiv.org/abs/2603.20268
TITLE: McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds
ERROR: null

===== https://arxiv.org/abs/2003.11037
TITLE: [2003.11037] Effective obstruction to lifting Tate classes from positive characteristic
ERROR: null

===== https://arxiv.org/abs/2507.15704
TITLE: Mathematics > Algebraic Geometry
ERROR: null

===== https://arxiv.org/abs/2012.13142
TITLE: [2012.13142] Tropical Clemens-Schmid sequence and existence of tropical cycles with a given cohomology class
ERROR: null

===== https://arxiv.org/abs/2002.02347
TITLE: [2002.02347] Tropical Abelian varieties, Weil classes and the Hodge Conjecture
ERROR: null



[exit code: 0]

Structured:
```json
[{"url":"https://arxiv.org/abs/2603.20268","title":"McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds","domain":"arxiv.org","published_date":null},{"url":"https://arxiv.org/abs/2003.11037","title":"[2003.11037] Effective obstruction to lifting Tate classes from positive characteristic","domain":"arxiv.org","published_date":null},{"url":"https://arxiv.org/abs/2507.15704","title":"Mathematics \u003e Algebraic Geometry","domain":"arxiv.org","published_date":null},{"url":"https://arxiv.org/abs/2012.13142","title":"[2012.13142] Tropical Clemens-Schmid sequence and existence of tropical cycles with a given cohomology class","domain":"arxiv.org","published_date":null},{"url":"https://arxiv.org/abs/2002.02347","title":"[2002.02347] Tropical Abelian varieties, Weil classes and the Hodge Conjecture","domain":"arxiv.org","published_date":null}]
```

```thinking
All five papers exist. Now I need full text. The heavy read is Mostaed 2603.20268. Let me check if HTML versions exist. arXiv HTML: https://arxiv.org/html/2603.20268v1 etc. web_fetch renders markdown. Full papers will be long — fetch them one or two at a time to keep context manageable, saving to /tmp.

Plan:
1. Fetch full HTML of 2603.20268 (Mostaed) — primary deliverable.
2. Fetch full HTML of 2507.15704 (EGS).
3. Fetch 2003.11037 (Costa-Sertoz) — abstract + key sections; I know the framework but verify.
4. Zharkov and Amini-Piquerez — already summarized by parent; skim for verification.

Let me fetch Mostaed full text first.
```

All five papers resolve. Now pulling full text, starting with the two heaviest reads (Mostaed and EGS).

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://arxiv.org/html/2603.20268v1\" --json > /tmp/mostaed.json 2>&1; jq -r '.[0] | \"ERROR: \\(.error)\\nTITLE: \\(.title)\\nURL: \\(.url)\"' /tmp/mostaed.json; echo \"---content length---\"; jq -r '.[0].content // \"\"' /tmp/mostaed.json | wc -c"}
```

Tool: bash

ERROR: null
TITLE: McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds
URL: https://arxiv.org/html/2603.20268v1
---content length---
1


[exit code: 0]

Structured:
```json
[{"url":"https://arxiv.org/html/2603.20268v1","title":"McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds","domain":"arxiv.org","published_date":null}]
```

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://arxiv.org/html/2507.15704\" --json > /tmp/egs.json 2>&1; jq -r '.[0] | \"ERROR: \\(.error)\\nTITLE: \\(.title)\\nURL: \\(.url)\"' /tmp/egs.json; echo \"---content length---\"; jq -r '.[0].content // \"\"' /tmp/egs.json | wc -c"}
```

Tool: bash

ERROR: null
TITLE: Matroids and the integral Hodge conjecture for abelian varieties
URL: https://arxiv.org/html/2507.15704
---content length---
1


[exit code: 0]

Structured:
```json
[{"url":"https://arxiv.org/html/2507.15704","title":"Matroids and the integral Hodge conjecture for abelian varieties","domain":"arxiv.org","published_date":null}]
```

Assistant text is not visible to the user or other agents. Messaging tools must be used to communicate with them.

```thinking
The content field came back empty (length 1 — probably just whitespace/newline). web_fetch returns title but content may be in a different field or truncated. Let me inspect the JSON structure.
```

Tool: bash

Arguments:
```json
{"command": "jq -r '.[0] | keys' /tmp/mostaed.json; echo ---; jq -r '.[0] | .content' /tmp/mostaed.json | head -c 2000"}
```

Tool: bash

[
  "domain",
  "published_date",
  "title",
  "url"
]
---
null


[exit code: 0]

```thinking
The web_fetch tool's OUTPUT JSON doesn't include content as a field listed — but it said "Fetch webpage content as readable Markdown". The JSON envelope might put content elsewhere, or the HTML fetch failed silently. Maybe I need to not use --json, or the content is huge and was dropped. Let me try without --json to see raw output, or try the ar5iv mirror.
```

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://arxiv.org/html/2603.20268v1\" 2>/dev/null | head -c 3000; echo; echo \"=====AR5IV ATTEMPT=====\"; tools web_fetch --url \"https://ar5iv.labs.arxiv.org/html/2603.20268\" --json > /tmp/mostaed5.json 2>&1; jq -r '.[0] | \"ERR: \\(.error) TITLE: \\(.title)\"' /tmp/mostaed5.json"}
```

Tool: bash

[1] McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds — arxiv.org
https://arxiv.org/html/2603.20268v1

McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds

# McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds

###### Abstract.

McMullen’s compact Kobayashi-geodesic curve \$V\$ in the Hilbert modular sixfold \$X_{L}\$ meets the Weil locus \$\mathcal{W}_{K}\$ of abelian sixfolds with exceptional Hodge classes in \$H^{3,3}\$ in a super-atypical intersection of expected dimension \$-2\$ . We prove \$V\cap\mathcal{W}_{K}\$ is finite and every point carries a CM structure with field \$M=KL\$ of degree \$12\$ , via the André–Oort theorem with an independent transcendence proof. The Hodge–Weil classes at these points are absolute Hodge but resist all known algebraicity methods: CM isolation, absent secant geometry, and uncontrolled discriminant obstruct every existing approach. Non-emptiness of \$V\cap\mathcal{W}_{K}\$ reduces to \$2816\$ explicit equations in \$\mathbb{H}\$ , each with finitely many CM solutions, constituting a finite and decidable path toward a new case of the Hodge conjecture.

###### Key words and phrases:

Hodge conjecture, abelian sixfolds, Weil classes, CM abelian varieties, Hilbert modular varieties, geodesic curves, triangle groups, André–Oort theorem, unlikely intersections, Hecke correspondences, modular embeddings, Faltings height.

###### 2020 Mathematics Subject Classification:

Primary 14C30; Secondary 14K22, 14K10, 11F41, 11G15, 11J81.

## Introduction

### Hodge classes on abelian varieties: the Mumford–Tate group and Weil type

The Hodge conjecture predicts that every rational cohomology class of type \$(p,p)\$ on a smooth complex projective variety is algebraic. For abelian varieties the Mumford–Tate group \$\operatorname{MT}(A)\$ governs the space of Hodge classes: by Mumford’s theorem [27], the Hodge classes on all powers of \$A\$ are exactly the \$\operatorname{MT}(A)\$ -invariants. Deligne [14, Thm. 2.11] proved that all such classes are absolute Hodge, a powerful rigidity property that nevertheless falls short of algebraicity.

The deepest open cases occur when \$\operatorname{MT}(A)\$ is small, making the invariant space large. The theory of Weil type [35, 25] provides the most systematic source of exceptional Hodge classes. For an imaginary quadratic field \$K=\mathbb{Q}(\sqrt{-d})\$ , a \$2g\$ -dimensional abelian variety \$A\$ is of Weil type for \$K\$ if \$K\hookrightarrow\operatorname{End}^{0}(A)\$ acts on \$H^{1,0}(A)\$ with eigenvalues \$+i\sqrt{d}\$ and \$-i\sqrt{d}\$ each of multiplicity \$g\$ . This forces a distinguished \$2\$ -dimensional \$\mathbb{Q}\$ -subspace \$W_{K}(A)\subset H^{2g}(A,\mathbb{Q})\$ of Hodge–Weil classes, exceptional in the sense of Moonen–Zarhin [25]: they lie outside the algebra generated by divisor classes when \$g\geq 2\$ .

Positive results on the algebraicity of Weil classes are scarce. For \$g=2\$ : Weil [35] treated sp
=====AR5IV ATTEMPT=====
ERR: null TITLE: [2603.20268] McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds


[exit code: 0]

Structured:
```json
[{"url":"https://ar5iv.labs.arxiv.org/html/2603.20268","title":"[2603.20268] McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds","domain":"ar5iv.labs.arxiv.org","published_date":null}]
```

```thinking
The non-JSON output gives readable markdown. The abstract is very informative. Let me get the full text. It's likely long (50+ pages). I'll save the full output to a file and read it in chunks.
```

The paper exists and fetches cleanly. Saving the full text and reading it in sections.

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://arxiv.org/html/2603.20268v1\" > /tmp/mostaed.md 2>/dev/null; wc -c /tmp/mostaed.md; grep -n '^#' /tmp/mostaed.md | head -80"}
```

Tool: bash

50366 /tmp/mostaed.md
6:# McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds
8:###### Abstract.
12:###### Key words and phrases:
16:###### 2020 Mathematics Subject Classification:
20:## Introduction
22:### Hodge classes on abelian varieties: the Mumford–Tate group and Weil type
30:### McMullen’s curve and the Weil locus
43:###### Theorem A (McMullen [24, Thm. 1.2]).
56:###### Theorem B (McMullen [24, Thm. 1.9]).
62:###### Theorem C (Generic Mumford–Tate group).
77:###### Proposition D (Structure of \$\mathcal{W}_{K}\$ ).
106:### Main results I: finiteness and explicit height bounds for \$V\cap\mathcal{W}_{K}\$
110:###### Theorem E (Finiteness of intersection).
122:###### Corollary F (Isogeny classes and height bound).
128:### Main results II: inaccessibility by known methods and reduction to a finite computation
132:###### Theorem G (Inaccessibility of Weil classes).
154:###### Proposition H (Hecke criterion).
170:###### Proposition I (Constant-sign obstruction).
176:###### Theorem J (Reduction to finite computation).
189:###### Proposition K (CM types of \$M\$ ).
227:### Organisation of the paper
241:### Notation and conventions
253:## 1. McMullen’s curve
262:### 1.1. Triangle groups and matrix models
277:###### Theorem 1.1 ([24, Thm. 1.1]).
283:###### Theorem 1.2 ([24, Thm. 1.2]).
289:### 1.2. The field \$L\$ and the Hilbert modular variety
302:### 1.3. The quadrilateral subgroup \$\Delta_{0}\$
316:### 1.4. The modular embedding and McMullen’s curve
329:###### Theorem 1.3 ([24, Thm. 1.9]).
337:### 1.5. Zariski density and the Mumford–Tate group
341:###### Theorem 1.4 ([24, Thm. 5.1]).
353:###### Remark 1.5.
359:###### Corollary 1.6.
368:###### Proof.
379:###### Remark 1.7.
383:## 2. The Weil locus
389:### 2.1. Abelian sixfolds of Weil type
393:###### Definition 2.1.
409:###### Remark 2.2.


[exit code: 0]

Structured:
```json
[{"url":"https://arxiv.org/html/2603.20268v1","title":"McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds","domain":"arxiv.org","published_date":null}]
```

```thinking
Only 50KB — that's likely a truncated fetch or the paper is moderately sized. Actually 50KB markdown is maybe 15-20 pages. But grep shows section headers only up to section 2 in the first 80 lines of grep output. Let me see all headers.
```

Tool: bash

Arguments:
```json
{"command": "grep -n '^#' /tmp/mostaed.md | tail -60; echo \"=====TOTAL LINES=====\"; wc -l /tmp/mostaed.md"}
```

Tool: bash

6:# McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds
8:###### Abstract.
12:###### Key words and phrases:
16:###### 2020 Mathematics Subject Classification:
20:## Introduction
22:### Hodge classes on abelian varieties: the Mumford–Tate group and Weil type
30:### McMullen’s curve and the Weil locus
43:###### Theorem A (McMullen [24, Thm. 1.2]).
56:###### Theorem B (McMullen [24, Thm. 1.9]).
62:###### Theorem C (Generic Mumford–Tate group).
77:###### Proposition D (Structure of \$\mathcal{W}_{K}\$ ).
106:### Main results I: finiteness and explicit height bounds for \$V\cap\mathcal{W}_{K}\$
110:###### Theorem E (Finiteness of intersection).
122:###### Corollary F (Isogeny classes and height bound).
128:### Main results II: inaccessibility by known methods and reduction to a finite computation
132:###### Theorem G (Inaccessibility of Weil classes).
154:###### Proposition H (Hecke criterion).
170:###### Proposition I (Constant-sign obstruction).
176:###### Theorem J (Reduction to finite computation).
189:###### Proposition K (CM types of \$M\$ ).
227:### Organisation of the paper
241:### Notation and conventions
253:## 1. McMullen’s curve
262:### 1.1. Triangle groups and matrix models
277:###### Theorem 1.1 ([24, Thm. 1.1]).
283:###### Theorem 1.2 ([24, Thm. 1.2]).
289:### 1.2. The field \$L\$ and the Hilbert modular variety
302:### 1.3. The quadrilateral subgroup \$\Delta_{0}\$
316:### 1.4. The modular embedding and McMullen’s curve
329:###### Theorem 1.3 ([24, Thm. 1.9]).
337:### 1.5. Zariski density and the Mumford–Tate group
341:###### Theorem 1.4 ([24, Thm. 5.1]).
353:###### Remark 1.5.
359:###### Corollary 1.6.
368:###### Proof.
379:###### Remark 1.7.
383:## 2. The Weil locus
389:### 2.1. Abelian sixfolds of Weil type
393:###### Definition 2.1.
409:###### Remark 2.2.
=====TOTAL LINES=====
418 /tmp/mostaed.md


[exit code: 0]

```thinking
The fetch truncated at line 418, mid-section-2. The web_fetch has a length cap. I need the rest of the paper. Options:
- Fetch with a URL fragment? web_fetch probably fetches the whole page then truncates at some char limit. The limit seems ~50KB.
- Try fetching section by section using arXiv HTML anchors? No, fetch gets whole page.
- Try the ar5iv version and see if it gives more; probably same cap.
- Download the PDF? I can't read PDF via web_fetch; but I could use bash + curl? Sandbox may have internet access. Let me try curl to download the HTML directly, bypassing web_fetch truncation. Workspace has bash — try curl.
```

Tool: bash

Arguments:
```json
{"command": "curl -sL --max-time 60 \"https://arxiv.org/html/2603.20268v1\" -o /tmp/mostaed_full.html; echo \"exit=\$?\"; wc -c /tmp/mostaed_full.html; grep -c '<section' /tmp/mostaed_full.html 2>/dev/null; grep -o '<title>[^<]*</title>' /tmp/mostaed_full.html | head -1"}
```

Tool: bash

exit=0
1214962 /tmp/mostaed_full.html
54
<title>McMullen’s Curve, the Weil Locus, and the Hodge Conjecture for Abelian Sixfolds</title>


[exit code: 0]

```thinking
Direct curl works — 1.2MB HTML, full paper. Now convert to text. Use python with html2text or pandoc if available, or use sed/python html.parser. Let me check for pandoc or python libs.
```

Direct curl works — full 1.2MB paper. Converting to readable text.

Tool: bash

Arguments:
```json
{"command": "which pandoc python3 lynx w3m 2>/dev/null; python3 -c \"import html2text\" 2>&1 | head -1; python3 -c \"import bs4; print('bs4 ok')\" 2>&1 | head -1"}
```

Tool: bash

/usr/bin/pandoc
/usr/bin/python3
bs4 ok


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "pandoc -f html -t markdown --wrap=none /tmp/mostaed_full.html -o /tmp/mostaed_full.md 2>/dev/null; wc -lc /tmp/mostaed_full.md; grep -n '^#' /tmp/mostaed_full.md | grep -v '^[0-9]*:#' | head -100"}
```

Tool: bash

  2324 323043 /tmp/mostaed_full.md


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "grep -nE '^#{1,6} ' /tmp/mostaed_full.md | head -120"}
```

Tool: bash

1:##### Report GitHub Issue {#modal-title .modal-title}
90:###### Abstract. {#abstract. .ltx_title .ltx_title_abstract}
96:###### Key words and phrases:  {#key-words-and-phrases .ltx_title .ltx_title_keywords}
102:###### 2020 Mathematics Subject Classification {#mathematics-subject-classification .ltx_title .ltx_title_classification}
107:###### Contents {#contents .ltx_title .ltx_title_contents}
146:### Hodge classes on abelian varieties: the Mumford--Tate group and Weil type {#hodge-classes-on-abelian-varieties-the-mumfordtate-group-and-weil-type .ltx_title .ltx_title_subsection}
162:### McMullen's curve and the Weil locus {#mcmullens-curve-and-the-weil-locus .ltx_title .ltx_title_subsection}
183:###### [[Theorem A]{#Thmthmintro1.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#Thmthmintro1.3 .ltx_text .ltx_font_bold}(McMullen \[[24](#bib.bib24){.ltx_ref}, Thm. 1.2\])[.]{#Thmthmintro1.4 .ltx_text .ltx_font_bold} {#theorem-a-mcmullen-24-thm.-1.2. .ltx_title .ltx_runin .ltx_title_theorem}
205:###### [[Theorem B]{#Thmthmintro2.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#Thmthmintro2.3 .ltx_text .ltx_font_bold}(McMullen \[[24](#bib.bib24){.ltx_ref}, Thm. 1.9\])[.]{#Thmthmintro2.4 .ltx_text .ltx_font_bold} {#theorem-b-mcmullen-24-thm.-1.9. .ltx_title .ltx_runin .ltx_title_theorem}
217:###### [[Theorem C]{#Thmthmintro3.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#Thmthmintro3.3 .ltx_text .ltx_font_bold}(Generic Mumford--Tate group)[.]{#Thmthmintro3.4 .ltx_text .ltx_font_bold} {#theorem-c-generic-mumfordtate-group. .ltx_title .ltx_runin .ltx_title_theorem}
243:###### [[Proposition D]{#Thmthmintro4.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#Thmthmintro4.3 .ltx_text .ltx_font_bold}(Structure of \$\mathcal{W}_{K}\$)[.]{#Thmthmintro4.4 .ltx_text .ltx_font_bold} {#proposition-d-structure-of-mathcalw_k. .ltx_title .ltx_runin .ltx_title_theorem}
285:### Main results I: finiteness and explicit height bounds for \$V \cap \mathcal{W}_{K}\$ {#main-results-i-finiteness-and-explicit-height-bounds-for-v-cap-mathcalw_k .ltx_title .ltx_title_subsection}
292:###### [[Theorem E]{#Thmthmintro5.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#Thmthmintro5.3 .ltx_text .ltx_font_bold}(Finiteness of intersection)[.]{#Thmthmintro5.4 .ltx_text .ltx_font_bold} {#theorem-e-finiteness-of-intersection. .ltx_title .ltx_runin .ltx_title_theorem}
316:###### [[Corollary F]{#Thmthmintro6.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#Thmthmintro6.3 .ltx_text .ltx_font_bold}(Isogeny classes and height bound)[.]{#Thmthmintro6.4 .ltx_text .ltx_font_bold} {#corollary-f-isogeny-classes-and-height-bound. .ltx_title .ltx_runin .ltx_title_theorem}
329:### Main results II: inaccessibility by known methods and reduction to a finite computation {#main-results-ii-inaccessibility-by-known-methods-and-reduction-to-a-finite-computation .ltx_title .ltx_title_subsection}
336:###### [[Theorem G]{#Thmthmintro7.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#Thmthmintro7.3 .ltx_text .ltx_font_bold}(Inaccessibility of Weil classes)[.]{#Thmthmintro7.4 .ltx_text .ltx_font_bold} {#theorem-g-inaccessibility-of-weil-classes. .ltx_title .ltx_runin .ltx_title_theorem}
369:###### [[Proposition H]{#Thmthmintro8.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#Thmthmintro8.3 .ltx_text .ltx_font_bold}(Hecke criterion)[.]{#Thmthmintro8.4 .ltx_text .ltx_font_bold} {#proposition-h-hecke-criterion. .ltx_title .ltx_runin .ltx_title_theorem}
392:###### [[Proposition I]{#Thmthmintro9.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#Thmthmintro9.3 .ltx_text .ltx_font_bold}(Constant-sign obstruction)[.]{#Thmthmintro9.4 .ltx_text .ltx_font_bold} {#proposition-i-constant-sign-obstruction. .ltx_title .ltx_runin .ltx_title_theorem}
404:###### [[Theorem J]{#Thmthmintro10.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#Thmthmintro10.3 .ltx_text .ltx_font_bold}(Reduction to finite computation)[.]{#Thmthmintro10.4 .ltx_text .ltx_font_bold} {#theorem-j-reduction-to-finite-computation. .ltx_title .ltx_runin .ltx_title_theorem}
426:###### [[Proposition K]{#Thmthmintro11.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#Thmthmintro11.3 .ltx_text .ltx_font_bold}(CM types of \$M\$)[.]{#Thmthmintro11.4 .ltx_text .ltx_font_bold} {#proposition-k-cm-types-of-m. .ltx_title .ltx_runin .ltx_title_theorem}
479:### Organisation of the paper {#organisation-of-the-paper .ltx_title .ltx_title_subsection}
507:### Notation and conventions {#notation-and-conventions .ltx_title .ltx_title_subsection}
549:### [1.1. ]{.ltx_tag .ltx_tag_subsection}Triangle groups and matrix models {#triangle-groups-and-matrix-models .ltx_title .ltx_title_subsection}
574:###### [[Theorem 1.1]{#S1.Thmtheorem1.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S1.Thmtheorem1.3 .ltx_text .ltx_font_bold}(\[[24](#bib.bib24){.ltx_ref}, Thm. 1.1\])[.]{#S1.Thmtheorem1.4 .ltx_text .ltx_font_bold} {#theorem-1.1-24-thm.-1.1. .ltx_title .ltx_runin .ltx_title_theorem}
586:###### [[Theorem 1.2]{#S1.Thmtheorem2.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S1.Thmtheorem2.3 .ltx_text .ltx_font_bold}(\[[24](#bib.bib24){.ltx_ref}, Thm. 1.2\])[.]{#S1.Thmtheorem2.4 .ltx_text .ltx_font_bold} {#theorem-1.2-24-thm.-1.2. .ltx_title .ltx_runin .ltx_title_theorem}
599:### [1.2. ]{.ltx_tag .ltx_tag_subsection}The field \$L\$ and the Hilbert modular variety {#the-field-l-and-the-hilbert-modular-variety .ltx_title .ltx_title_subsection}
621:### [1.3. ]{.ltx_tag .ltx_tag_subsection}The quadrilateral subgroup \$\Delta_{0}\$ {#the-quadrilateral-subgroup-delta_0 .ltx_title .ltx_title_subsection}
644:### [1.4. ]{.ltx_tag .ltx_tag_subsection}The modular embedding and McMullen's curve {#the-modular-embedding-and-mcmullens-curve .ltx_title .ltx_title_subsection}
665:###### [[Theorem 1.3]{#S1.Thmtheorem3.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S1.Thmtheorem3.3 .ltx_text .ltx_font_bold}(\[[24](#bib.bib24){.ltx_ref}, Thm. 1.9\])[.]{#S1.Thmtheorem3.4 .ltx_text .ltx_font_bold} {#theorem-1.3-24-thm.-1.9. .ltx_title .ltx_runin .ltx_title_theorem}
682:### [1.5. ]{.ltx_tag .ltx_tag_subsection}Zariski density and the Mumford--Tate group {#zariski-density-and-the-mumfordtate-group .ltx_title .ltx_title_subsection}
689:###### [[Theorem 1.4]{#S1.Thmtheorem4.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S1.Thmtheorem4.3 .ltx_text .ltx_font_bold}(\[[24](#bib.bib24){.ltx_ref}, Thm. 5.1\])[.]{#S1.Thmtheorem4.4 .ltx_text .ltx_font_bold} {#theorem-1.4-24-thm.-5.1. .ltx_title .ltx_runin .ltx_title_theorem}
706:###### [[Remark 1.5]{#S1.Thmtheorem5.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S1.Thmtheorem5.3 .ltx_text .ltx_font_bold} {#remark-1.5. .ltx_title .ltx_runin .ltx_title_theorem}
718:###### [[Corollary 1.6]{#S1.Thmtheorem6.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S1.Thmtheorem6.3 .ltx_text .ltx_font_bold} {#corollary-1.6. .ltx_title .ltx_runin .ltx_title_theorem}
732:###### Proof. {#proof. .ltx_title .ltx_runin .ltx_font_italic .ltx_title_proof}
750:###### [[Remark 1.7]{#S1.Thmtheorem7.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S1.Thmtheorem7.3 .ltx_text .ltx_font_bold} {#remark-1.7. .ltx_title .ltx_runin .ltx_title_theorem}
772:### [2.1. ]{.ltx_tag .ltx_tag_subsection}Abelian sixfolds of Weil type {#abelian-sixfolds-of-weil-type .ltx_title .ltx_title_subsection}
779:###### [[Definition 2.1]{#S2.Thmtheorem1.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S2.Thmtheorem1.3 .ltx_text .ltx_font_bold} {#definition-2.1. .ltx_title .ltx_runin .ltx_title_theorem}
800:###### [[Remark 2.2]{#S2.Thmtheorem2.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S2.Thmtheorem2.3 .ltx_text .ltx_font_bold} {#remark-2.2. .ltx_title .ltx_runin .ltx_title_theorem}
819:### [2.2. ]{.ltx_tag .ltx_tag_subsection}The Weil locus and its codimension {#the-weil-locus-and-its-codimension .ltx_title .ltx_title_subsection}
822:###### [[Definition 2.3]{#S2.Thmtheorem3.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S2.Thmtheorem3.3 .ltx_text .ltx_font_bold} {#definition-2.3. .ltx_title .ltx_runin .ltx_title_theorem}
836:###### [[Remark 2.4]{#S2.Thmtheorem4.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S2.Thmtheorem4.3 .ltx_text .ltx_font_bold} {#remark-2.4. .ltx_title .ltx_runin .ltx_title_theorem}
844:###### [[Proposition 2.5]{#S2.Thmtheorem5.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S2.Thmtheorem5.3 .ltx_text .ltx_font_bold} {#proposition-2.5. .ltx_title .ltx_runin .ltx_title_theorem}
852:###### Proof. {#proof.-1 .ltx_title .ltx_runin .ltx_font_italic .ltx_title_proof}
897:### [2.3. ]{.ltx_tag .ltx_tag_subsection}Dimensional analysis {#dimensional-analysis .ltx_title .ltx_title_subsection}
911:### [2.4. ]{.ltx_tag .ltx_tag_subsection}Hodge classes on fibers over \$V \cap \mathcal{W}_{K}\$ {#hodge-classes-on-fibers-over-v-cap-mathcalw_k .ltx_title .ltx_title_subsection}
918:###### [[Proposition 2.6]{#S2.Thmtheorem6.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S2.Thmtheorem6.3 .ltx_text .ltx_font_bold} {#proposition-2.6. .ltx_title .ltx_runin .ltx_title_theorem}
932:###### Proof. {#proof.-2 .ltx_title .ltx_runin .ltx_font_italic .ltx_title_proof}
944:###### [[Remark 2.7]{#S2.Thmtheorem7.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S2.Thmtheorem7.3 .ltx_text .ltx_font_bold} {#remark-2.7. .ltx_title .ltx_runin .ltx_title_theorem}
959:### [2.5. ]{.ltx_tag .ltx_tag_subsection}Examples {#examples .ltx_title .ltx_title_subsection}
966:###### [[Example 2.8]{#S2.Thmtheorem8.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S2.Thmtheorem8.3 .ltx_text .ltx_font_bold}(The alternating components)[.]{#S2.Thmtheorem8.4 .ltx_text .ltx_font_bold} {#example-2.8-the-alternating-components. .ltx_title .ltx_runin .ltx_title_theorem}
983:###### [[Remark 2.9]{#S2.Thmtheorem9.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S2.Thmtheorem9.3 .ltx_text .ltx_font_bold} {#remark-2.9. .ltx_title .ltx_runin .ltx_title_theorem}
996:###### [[Example 2.10]{#S2.Thmtheorem10.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S2.Thmtheorem10.3 .ltx_text .ltx_font_bold}(Transversality at an explicit point)[.]{#S2.Thmtheorem10.4 .ltx_text .ltx_font_bold} {#example-2.10-transversality-at-an-explicit-point. .ltx_title .ltx_runin .ltx_title_theorem}
1014:###### [[Remark 2.11]{#S2.Thmtheorem11.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S2.Thmtheorem11.3 .ltx_text .ltx_font_bold} {#remark-2.11. .ltx_title .ltx_runin .ltx_title_theorem}
1022:###### [[Example 2.12]{#S2.Thmtheorem12.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S2.Thmtheorem12.3 .ltx_text .ltx_font_bold}(The three size-\$6\$ orbits and their components)[.]{#S2.Thmtheorem12.4 .ltx_text .ltx_font_bold} {#example-2.12-the-three-size-6-orbits-and-their-components. .ltx_title .ltx_runin .ltx_title_theorem}
1049:###### [[Example 2.13]{#S2.Thmtheorem13.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S2.Thmtheorem13.3 .ltx_text .ltx_font_bold}(The Hodge--Weil condition for all \$20\$ components)[.]{#S2.Thmtheorem13.4 .ltx_text .ltx_font_bold} {#example-2.13-the-hodgeweil-condition-for-all-20-components. .ltx_title .ltx_runin .ltx_title_theorem}
1057:###### [[Example 2.14]{#S2.Thmtheorem14.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S2.Thmtheorem14.3 .ltx_text .ltx_font_bold}(CM locus on \$\mathcal{W}_{K}^{alt}\$)[.]{#S2.Thmtheorem14.4 .ltx_text .ltx_font_bold} {#example-2.14-cm-locus-on-mathcalw_kalt. .ltx_title .ltx_runin .ltx_title_theorem}
1075:### [3.1. ]{.ltx_tag .ltx_tag_subsection}Every point of \$V \cap \mathcal{W}_{K}\$ is a CM point {#every-point-of-v-cap-mathcalw_k-is-a-cm-point .ltx_title .ltx_title_subsection}
1078:###### [[Proposition 3.1]{#S3.Thmtheorem1.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S3.Thmtheorem1.3 .ltx_text .ltx_font_bold} {#proposition-3.1. .ltx_title .ltx_runin .ltx_title_theorem}
1086:###### Proof. {#proof.-3 .ltx_title .ltx_runin .ltx_font_italic .ltx_title_proof}
1108:###### [[Remark 3.2]{#S3.Thmtheorem2.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S3.Thmtheorem2.3 .ltx_text .ltx_font_bold} {#remark-3.2. .ltx_title .ltx_runin .ltx_title_theorem}
1123:### [3.2. ]{.ltx_tag .ltx_tag_subsection}Finiteness via André--Oort {#finiteness-via-andréoort .ltx_title .ltx_title_subsection}
1130:###### [[Theorem 3.3]{#S3.Thmtheorem3.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S3.Thmtheorem3.3 .ltx_text .ltx_font_bold}(Tsimerman \[[34](#bib.bib34){.ltx_ref}, Thm. 1.3\])[.]{#S3.Thmtheorem3.4 .ltx_text .ltx_font_bold} {#theorem-3.3-tsimerman-34-thm.-1.3. .ltx_title .ltx_runin .ltx_title_theorem}
1152:###### [[Theorem 3.4]{#S3.Thmtheorem4.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S3.Thmtheorem4.3 .ltx_text .ltx_font_bold} {#theorem-3.4. .ltx_title .ltx_runin .ltx_title_theorem}
1160:###### Proof. {#proof.-4 .ltx_title .ltx_runin .ltx_font_italic .ltx_title_proof}
1214:###### [[Remark 3.5]{#S3.Thmtheorem5.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S3.Thmtheorem5.3 .ltx_text .ltx_font_bold} {#remark-3.5. .ltx_title .ltx_runin .ltx_title_theorem}
1226:###### [[Corollary 3.6]{#S3.Thmtheorem6.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S3.Thmtheorem6.3 .ltx_text .ltx_font_bold} {#corollary-3.6. .ltx_title .ltx_runin .ltx_title_theorem}
1234:###### Proof. {#proof.-5 .ltx_title .ltx_runin .ltx_font_italic .ltx_title_proof}
1242:###### [[Remark 3.7]{#S3.Thmtheorem7.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S3.Thmtheorem7.3 .ltx_text .ltx_font_bold} {#remark-3.7. .ltx_title .ltx_runin .ltx_title_theorem}
1251:### [3.3. ]{.ltx_tag .ltx_tag_subsection}Transcendence: Wolfart and Blázquez-Sanz--Casale--Freitag--Nagloo {#transcendence-wolfart-and-blázquez-sanzcasalefreitagnagloo .ltx_title .ltx_title_subsection}
1258:###### [[Theorem 3.8]{#S3.Thmtheorem8.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S3.Thmtheorem8.3 .ltx_text .ltx_font_bold}(Wolfart \[[36](#bib.bib36){.ltx_ref}, [37](#bib.bib37){.ltx_ref}\])[.]{#S3.Thmtheorem8.4 .ltx_text .ltx_font_bold} {#theorem-3.8-wolfart-36-37. .ltx_title .ltx_runin .ltx_title_theorem}
1282:###### [[Theorem 3.9]{#S3.Thmtheorem9.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S3.Thmtheorem9.3 .ltx_text .ltx_font_bold}(Blázquez-Sanz--Casale--Freitag--Nagloo \[[8](#bib.bib8){.ltx_ref}, Theorem D\])[.]{#S3.Thmtheorem9.4 .ltx_text .ltx_font_bold} {#theorem-3.9-blázquez-sanzcasalefreitagnagloo-8-theorem-d. .ltx_title .ltx_runin .ltx_title_theorem}
1309:### [3.4. ]{.ltx_tag .ltx_tag_subsection}Examples {#examples-1 .ltx_title .ltx_title_subsection}
1316:###### [[Example 3.10]{#S3.Thmtheorem10.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S3.Thmtheorem10.3 .ltx_text .ltx_font_bold}(\$d = 1\$, \$K = {{\mathbb{Q}}{(i)}}\$)[.]{#S3.Thmtheorem10.4 .ltx_text .ltx_font_bold} {#example-3.10-d-1-k-mathbbqi. .ltx_title .ltx_runin .ltx_title_theorem}
1342:###### [[Example 3.11]{#S3.Thmtheorem11.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S3.Thmtheorem11.3 .ltx_text .ltx_font_bold}(\$d = 3\$, \$K = {{\mathbb{Q}}{(\sqrt{- 3})}}\$)[.]{#S3.Thmtheorem11.4 .ltx_text .ltx_font_bold} {#example-3.11-d-3-k-mathbbqsqrt--3. .ltx_title .ltx_runin .ltx_title_theorem}
1370:###### [[Example 3.12]{#S3.Thmtheorem12.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S3.Thmtheorem12.3 .ltx_text .ltx_font_bold}(\$d = 7\$, \$K = {{\mathbb{Q}}{(\sqrt{- 7})}}\$)[.]{#S3.Thmtheorem12.4 .ltx_text .ltx_font_bold} {#example-3.12-d-7-k-mathbbqsqrt--7. .ltx_title .ltx_runin .ltx_title_theorem}
1382:###### [[Remark 3.13]{#S3.Thmtheorem13.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S3.Thmtheorem13.3 .ltx_text .ltx_font_bold} {#remark-3.13. .ltx_title .ltx_runin .ltx_title_theorem}
1404:### [4.1. ]{.ltx_tag .ltx_tag_subsection}The degree-12 CM field {#the-degree-12-cm-field .ltx_title .ltx_title_subsection}
1411:###### [[Proposition 4.1]{#S4.Thmtheorem1.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S4.Thmtheorem1.3 .ltx_text .ltx_font_bold} {#proposition-4.1. .ltx_title .ltx_runin .ltx_title_theorem}
1425:###### Proof. {#proof.-6 .ltx_title .ltx_runin .ltx_font_italic .ltx_title_proof}
1433:###### [[Remark 4.2]{#S4.Thmtheorem2.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S4.Thmtheorem2.3 .ltx_text .ltx_font_bold} {#remark-4.2. .ltx_title .ltx_runin .ltx_title_theorem}
1442:### [4.2. ]{.ltx_tag .ltx_tag_subsection}CM types and the Weil compatibility condition {#cm-types-and-the-weil-compatibility-condition .ltx_title .ltx_title_subsection}
1449:###### [[Proposition 4.3]{#S4.Thmtheorem3.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S4.Thmtheorem3.3 .ltx_text .ltx_font_bold} {#proposition-4.3. .ltx_title .ltx_runin .ltx_title_theorem}
1457:###### Proof. {#proof.-7 .ltx_title .ltx_runin .ltx_font_italic .ltx_title_proof}
1473:###### [[Remark 4.4]{#S4.Thmtheorem4.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S4.Thmtheorem4.3 .ltx_text .ltx_font_bold} {#remark-4.4. .ltx_title .ltx_runin .ltx_title_theorem}
1486:### [4.3. ]{.ltx_tag .ltx_tag_subsection}Why Markman's theorem does not apply {#why-markmans-theorem-does-not-apply .ltx_title .ltx_title_subsection}
1489:###### [[Theorem 4.5]{#S4.Thmtheorem5.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S4.Thmtheorem5.3 .ltx_text .ltx_font_bold}(Markman \[[23](#bib.bib23){.ltx_ref}, §8.4, §9.3\])[.]{#S4.Thmtheorem5.4 .ltx_text .ltx_font_bold} {#theorem-4.5-markman-23-8.4-9.3. .ltx_title .ltx_runin .ltx_title_theorem}
1501:###### [[Observation 4.6]{#S4.Thmtheorem6.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S4.Thmtheorem6.3 .ltx_text .ltx_font_bold} {#observation-4.6. .ltx_title .ltx_runin .ltx_title_theorem}
1529:### [4.4. ]{.ltx_tag .ltx_tag_subsection}The Hodge conjecture for \$A_{v_{0}}\$ {#the-hodge-conjecture-for-a_v_0 .ltx_title .ltx_title_subsection}
1536:#### Weil classes lie in \$H^{3,3}\$ {#weil-classes-lie-in-h33 .ltx_title .ltx_title_subsubsection}
1554:#### Absolute Hodge but not known algebraic {#absolute-hodge-but-not-known-algebraic .ltx_title .ltx_title_subsubsection}
1562:#### The Mumford--Tate group obstruction {#the-mumfordtate-group-obstruction .ltx_title .ltx_title_subsubsection}
1570:#### Two obstructions to existing methods {#two-obstructions-to-existing-methods .ltx_title .ltx_title_subsubsection}
1599:### [5.1. ]{.ltx_tag .ltx_tag_subsection}Hecke correspondences on \$X_{L}\$ {#hecke-correspondences-on-x_l .ltx_title .ltx_title_subsection}
1618:###### [[Remark 5.1]{#S5.Thmtheorem1.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S5.Thmtheorem1.3 .ltx_text .ltx_font_bold} {#remark-5.1. .ltx_title .ltx_runin .ltx_title_theorem}
1627:### [5.2. ]{.ltx_tag .ltx_tag_subsection}Fixed points are CM points {#fixed-points-are-cm-points .ltx_title .ltx_title_subsection}
1630:###### [[Proposition 5.2]{#S5.Thmtheorem2.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S5.Thmtheorem2.3 .ltx_text .ltx_font_bold} {#proposition-5.2. .ltx_title .ltx_runin .ltx_title_theorem}
1638:###### Proof. {#proof.-8 .ltx_title .ltx_runin .ltx_font_italic .ltx_title_proof}
1712:###### [[Remark 5.3]{#S5.Thmtheorem3.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S5.Thmtheorem3.3 .ltx_text .ltx_font_bold} {#remark-5.3. .ltx_title .ltx_runin .ltx_title_theorem}
1736:### [5.3. ]{.ltx_tag .ltx_tag_subsection}An algorithm for \$\ell = 43\$ {#an-algorithm-for-ell-43 .ltx_title .ltx_title_subsection}
1824:### [5.4. ]{.ltx_tag .ltx_tag_subsection}The hypergeometric structure {#the-hypergeometric-structure .ltx_title .ltx_title_subsection}
1831:#### Uniform hypergeometric ODE {#uniform-hypergeometric-ode .ltx_title .ltx_title_subsubsection}
1834:###### [[Observation 5.4]{#S5.Thmtheorem4.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S5.Thmtheorem4.3 .ltx_text .ltx_font_bold} {#observation-5.4. .ltx_title .ltx_runin .ltx_title_theorem}
1863:#### All six component maps \$f_{i}\$ land in \$\mathbb{H}\$ {#all-six-component-maps-f_i-land-in-mathbbh .ltx_title .ltx_title_subsubsection}
1877:#### The simplest equivariance: generator \$B\$ {#the-simplest-equivariance-generator-b .ltx_title .ltx_title_subsubsection}
1912:#### Why \$\ell = 43\$ is the natural first candidate {#why-ell-43-is-the-natural-first-candidate .ltx_title .ltx_title_subsubsection}
1929:### [5.5. ]{.ltx_tag .ltx_tag_subsection}Why the search terminates: heights, bounds, and finiteness {#why-the-search-terminates-heights-bounds-and-finiteness .ltx_title .ltx_title_subsection}
1936:#### Field of definition and height bound {#field-of-definition-and-height-bound .ltx_title .ltx_title_subsubsection}
1960:#### Finiteness of isogeny classes {#finiteness-of-isogeny-classes .ltx_title .ltx_title_subsubsection}
1967:###### [[Corollary 5.5]{#S5.Thmtheorem5.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S5.Thmtheorem5.3 .ltx_text .ltx_font_bold} {#corollary-5.5. .ltx_title .ltx_runin .ltx_title_theorem}
1975:###### Proof. {#proof.-9 .ltx_title .ltx_runin .ltx_font_italic .ltx_title_proof}
1988:#### Finiteness of the Hecke search {#finiteness-of-the-hecke-search .ltx_title .ltx_title_subsubsection}
2030:### [5.6. ]{.ltx_tag .ltx_tag_subsection}The CM type constraint {#the-cm-type-constraint .ltx_title .ltx_title_subsection}
2043:#### The norm equation {#the-norm-equation .ltx_title .ltx_title_subsubsection}
2073:#### CM type and Weil condition {#cm-type-and-weil-condition .ltx_title .ltx_title_subsubsection}
2095:#### How \$\alpha\$ constrains \$\Phi\$ {#how-alpha-constrains-phi .ltx_title .ltx_title_subsubsection}
2113:###### [[Remark 5.6]{#S5.Thmtheorem6.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[.]{#S5.Thmtheorem6.3 .ltx_text .ltx_font_bold} {#remark-5.6. .ltx_title .ltx_runin .ltx_title_theorem}
2122:#### Summary: what determines \$v_{0} \in {V \cap \mathcal{W}_{K}}\$ {#summary-what-determines-v_0-in-v-cap-mathcalw_k .ltx_title .ltx_title_subsubsection}
2154:### [5.7. ]{.ltx_tag .ltx_tag_subsection}Examples and open problems {#examples-and-open-problems .ltx_title .ltx_title_subsection}
2157:###### [[Example 5.7]{#S5.Thmtheorem7.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S5.Thmtheorem7.3 .ltx_text .ltx_font_bold}(\$d = 3\$, \$\ell = 43\$, rational solution)[.]{#S5.Thmtheorem7.4 .ltx_text .ltx_font_bold} {#example-5.7-d-3-ell-43-rational-solution. .ltx_title .ltx_runin .ltx_title_theorem}
2169:###### [[Example 5.8]{#S5.Thmtheorem8.2 .ltx_text .ltx_font_bold}]{.ltx_tag .ltx_tag_theorem}[ ]{#S5.Thmtheorem8.3 .ltx_text .ltx_font_bold}(\$d = 7\$, \$\ell = 43\$, rational solution)[.]{#S5.Thmtheorem8.4 .ltx_text .ltx_font_bold} {#example-5.8-d-7-ell-43-rational-solution. .ltx_title .ltx_runin .ltx_title_theorem}


[exit code: 0]