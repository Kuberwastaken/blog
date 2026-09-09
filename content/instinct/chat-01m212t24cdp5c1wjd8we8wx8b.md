---
title: "lit: hodge failure mechanisms (chat-01M212T24)"
---

_1 transcript files aggregated._

Context: a serious computational Hodge-conjecture program (Weil-type abelian sixfolds, certified OUT-by-4 obstruction vs a 438-class catalogue) hit the Deligne cap: Hodge classes on abelian varieties are absolute Hodge (Deligne 1982), so realization-level tests cannot detect non-algebraicity. The one rigorous non-algebraicity verifier is the Frobenius root-of-unity bound (van Luijk trick) in higher codimension, which can only fire where Delignes conjecture (Hodge => absolute Hodge) could fail: atypical isolated Hodge points in non-abelian-type families. The user demands extremely deep literature search - arxiv full text, GitHub, blogs, proceedings, 1990-2026. Report to your parent with source URLs, what exists, what is directly usable, and an honest verdict on whether it changes three numbers: counterexample-via-frobenius-sweep 1-3pct, lift-direction algebraicity theorem 5-10pct, current-program counterexample 0pct.
YOUR SPECIALTY: every known failure mechanism for Hodge-type statements, with precise statements: Atiyah-Hirzebruch (integral torsion), Kollar (rational vs integral on high-degree hypersurfaces - get the exact theorem and what it does and does not imply rationally), Voisin (Kahler), Totaro (cobordism), Soulé-Voisin, Voisin on the Griffiths group (rational non-algebraicity of CYCLES vs classes - the distinction matters), Ottem-Suzuki, Benoist-Ottem. For each: does the mechanism survive rational coefficients and could it in principle yield a rational (p,p) non-algebraic class on a smooth projective variety? The honest answer for each mechanism, with citations.

Priority add to your failure-mechanisms specialty: Engel-de Gaay Fortman-Schreieder, "Matroids and the integral Hodge conjecture for abelian varieties" (arxiv 2507.15704) - universal combinatorial restrictions from arbitrary algebraic curves yielding INTEGRAL Hodge counterexamples on abelian varieties, with public Sage certificate code (github.com/philip-engel/regular_matroids). This is the closest existing architecture to the program's missing bridge theorem. Extract every geometric implication in their argument and assess: which could in principle apply to codimension-3 cycles, and does ANY ingredient survive over Q? Also: Zharkov's account of Kontsevich's tropical approach (arxiv 2002.02347) - the universal equations for balanced cycles, why the finite linear ansatz fails, and whether Amini-Piquerez (arxiv 2012.13142) rules out tropical detectors.

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
This is a research task. I need to do deep literature search on failure mechanisms for Hodge-type statements, plus the Engel-de Gaay Fortman-Schreieder paper and Zharkov/Kontsevich tropical approach. Let me start with parallel web searches and arxiv fetches.

Plan: batch web searches for the key papers and mechanisms, fetch arxiv abstracts/full text for 2507.15704 and 2002.02347, 2012.13142. Then synthesize and report to parent.

Let me fire off several searches and fetches in one bash call.
```

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://arxiv.org/abs/2507.15704\" \"https://arxiv.org/abs/2002.02347\" \"https://arxiv.org/abs/2012.13142\" --json > /tmp/arxiv_abs.json 2>&1; jq -r '.[] | .url, .title, (.error // \"\")' /tmp/arxiv_abs.json"}
```

Tool: bash

parse error: Invalid numeric literal at line 1, column 6


[exit code: 4]

Tool: bash

Arguments:
```json
{"command": "tools web_search --query \"Kollar hypersurface integral Hodge conjecture degree at least 3 theorem statement\" --limit 8 --json > /tmp/kollar.json; tools web_search --query \"Atiyah Hirzebruch counterexample integral Hodge conjecture torsion class\" --limit 6 --json > /tmp/ah.json; tools web_search --query \"Voisin counterexample Kahler Hodge conjecture odd dimensions\" --limit 6 --json > /tmp/voisin_k.json; tools web_search --query \"Soule Voisin torsion cohomology classes algebraic cycles\" --limit 6 --json > /tmp/sv.json; tools web_search --query \"Ottem Suzuki pencil Hodge conjecture fails integral\" --limit 6 --json > /tmp/os.json; tools web_search --query \"Benoist Ottem integral Hodge conjecture failure curve unramified cohomology\" --limit 6 --json > /tmp/bo.json; tools web_search --query \"Voisin Griffiths group codimension two cycle not algebraically equivalent\" --limit 6 --json > /tmp/grif.json; tools web_search --query \"Totaro complex cobordism cycle class map Hodge conjecture\" --limit 6 --json > /tmp/totaro.json"}
```

Tool: bash

(no output)

[exit code: 0]

Structured:
```json
[{"rank":1,"title":"Torsion algebraic cycles and complex cobordism","url":"https://doi.org/10.1090/s0894-0347-97-00232-4","domain":"doi.org","published_date":"1997-01-01","highlights":["- Burt Totaro (University of Chicago): h-index 24; 2,393 citations; corresponding author\n...\nAtiyah and Hirzebruch gave the first counterexamples to the Hodge conjecture with integral coefficients [3] . That conjecture predicted that every integral cohomology class of Hodge type (p, p) on a smooth projective variety should be the class of an algebraic cycle, but Atiyah and Hirzebruch found additional topological properties which must be satisfied by the integral cohomology class of an algebraic cycle. Here we provide a more systematic explanation for their results by showing that the classical cycle map, from algebraic cycles modulo algebraic equivalence to integral cohomology, factors naturally through a topologically defined ring which is richer than integral cohomology. The new ring is based on complex cobordism, a well-developed topological theory which has been used only rarely in algebraic geometry since Hirzebruch used it to prove the Riemann-Roch theorem [17] .\n...\nThis factorization of the classical cycle map implies the topological restrictions on algebraic cycles found by Atiyah and Hirzebruch. It goes beyond their work by giving a topological method to show that the classical cycle map can be noninjective, as well as nonsurjective. The kernel of the classical cycle map is called the Griffiths group, and the topological proof here that the Griffiths group can be nonzero is the first proof of this fact which does not use Hodge theory. (The proof here gives nonzero torsion elements in the Griffiths group, whereas Griffiths's Hodge-theoretic proof gives nontorsion elements [13] .)\n...\nSimilarly, one can ask whether an algebraic cycle which maps to 0 in Deligne cohomology must be algebraically equivalent to\n...\n0, the point being that Griffiths's original examples of cycles which were homologically but not algebraically equivalent to 0 had nonzero image in Deligne cohomology. The answer is no, as Nori showed by a subtle application of Hodge theory [28] . Here we show again that the answer is no, using our topological method. It is interesting that both Nori's examples and ours work in codimension at least 3; Nori suggests that the answer to the question should be yes for codimension 2 cycles.\n...\nWe now describe our main construction in more detail. If X is a smooth complex algebraic variety, the classical cycle class map sends the ring of algebraic cycles modulo algebraic equivalence to the integral cohomology ring of X. We show that this map factors canonically through the ring M U * X ⊗ MU * Z, where M U * X is the complex cobordism ring of the topological space X (see section 1 for definitions). Here M U * X is a module over the graded ring\n...\nto Z by sending all\n...\ngenerators x i to 0. The resulting\n...\nU * X ⊗ MU * Z is the same as the integral cohomology ring if the integral cohomology is torsion-free, but in general the map\n...\n→ H * (X,\n...\nneed not be either injective or surjective, although the kernel and cokernel are torsion. The construction of the new cycle map, from cycles modulo algebraic equivalence to M U * X ⊗ MU * Z, uses Hironaka's resolution of singularities together with some fundamental results on complex cobordism proved by Quillen and Wilson.\n...\nThe fact that the usual cycle class map goes into the image of M U * X was essentially observed by Atiyah ([2] , footnote 1, p. 445); it follows immediately from Hironaka's resolution of singularities. As a result, all odd-dimensional elements of the Steenrod algebra vanish on the image of algebraic cycles in H * (X, Z/p). Atiyah and Hirzebruch used a weaker form of this statement to produce their counterexamples to the Hodge conjecture with integral coefficients [3] .\n...\nOnce we have our more refined cycle class, it is natural to try to use it to give a new construction of smooth projective varieties with nonzero Griffiths group. We need to find varieties X such that the map M U * X ⊗ MU * Z → H * (X, Z) is not injective, and then we have to hope that some of the elements of the kernel can be represented by algebraic cycles. Unfortunately, it is much harder to find topological spaces X with M U * X ⊗ MU * Z → H * (X, Z) not injective than to find nonsurjective examples. As far as I know, the only examples in the literature are those produced by Conner and Smith ([10] , [11] , and [3\n...\n] , p. 854). Unfortunately, their examples are defined as cell complexes with explicit attaching maps, and there is no obvious way to approximate such spaces by smooth algebraic varieties.\n...\nreduced bordism groups\n...\npoint compactification\n...\nX -S is any compactification, M\n...\nis isomorphic to\n...\nrelative bordism group\n...\n. The cycle map\n...\ntakes values in\n...\nMU * Z\n...\ncorresponding cohomology theory, complex cobordism M U * X\n...\nany space X.\n...\nM U i\n...\n∼ = M U BM 2n-i\n...\nfor an n\n...\ndimensional complex manifold\n...\ngeometric description of\n...\ncobordism group M U i X\n...\nregular neighborhood of\n...\nembedding in C N ).\n...\nmention one other geometric\n...\n: for any real manifold X, M U i X is\n...\ngroup of bordism classes of codimension i real manifolds M with a proper map f : M → X and a complex structure on the \"stable normal bundle\" f * T X -T M [33] .\n...\n∗X =\n...\nIn fact, Quillen's statement can be improved a little,\n...\nof the improved statement.\n...\n2.2\n...\nLet X be\n...\ncell complex.\n...\nM U * X\n...\nMU * Z\n...\nH * (X\n...\nThe new cycle map\n...\nFor convenience, we write M U BM i X ⊗ MU * Z to denote the degree i subgroup of the graded group M U BM * X ⊗ MU * Z. (See section 1 for definitions.) Theorem 3.1. Let X be a complex algebraic scheme. We define a homomorphism from the group Z alg i X of i-dimensional algebraic cycles on X modulo algebraic equivalence to M U BM 2i X ⊗ MU * Z such that the composition\n...\nZ alg i X → M U BM 2i X ⊗ MU * Z → H BM 2i (X,\n...\n0 for j \u003c\n...\nH 0\n...\nj = 0\n...\nfor complex cobordism (see section 1\n...\n, for any smooth\n...\nmanifold, the group\n...\n⊗ MU * Z is\n...\n0 for j \u003e 2i and\n...\n[Z] of Z in\n...\ni X → M\n...\n2i X ⊗ MU * Z for any complex algebraic scheme X, where Z i X is the group of algebraic i-cycles on X, that is, the free abelian group on the set of closed i-dimensional irreducible subvarieties of X. For a cycle α, we write [α] for its class in M U BM * X ⊗ MU * Z. Our next step will be to check that this map is a natural transformation on the category of proper algebraic maps.\n...\nZ * X\n...\nZ on the category\n...\nwe have to show that\n...\nis well defined on\n...\n(i + 1\n...\nW ⊂\n...\n→ C not constant\n...\nIf X is a smooth complex algebraic variety of dimension n, then cycles modulo algebraic equivalence, graded by Z i alg X = Z alg n-i X, form a ring, as do the groups\n...\nM U i X ⊗ MU * Z = M U BM 2n-i X ⊗ MU * Z. Theorem 4.1. If X is a smooth variety, then the cycle map Z i alg X → M U 2i X ⊗ MU * Z is a ring homomorphism.\n...\nThe proof follows the outline of Fulton's proof that the usual cycle map Z * alg X → H * (X, Z) is a ring homomorphism ( [12] , chapter 19).\n...\nProof. The proof is equivalent to checking that the map from cycles modulo rational equivalence to M U * X ⊗ MU * Z is a ring homomorphism. (We do things this way because most of Fulton's book is written in terms of cycles modulo rational equivalence; the same arguments would apply to cycles modulo algebraic equivalence.)\n...\nequivalence given by\n...\nand MacPherson\n...\nof α× β\n...\nZ is a resolution\n...\nn-dimensional variety, T\n...\nT a nonconstant map, t ∈ T\n...\nsubscheme f -1 (t) ⊂ X is\n...\ncodimension-one\n...\nclass in M U BM 2n-2 (f -1\n...\nt)) ⊗ MU * Z\n...\nf -1\n...\nis equal to\n...\nBaum-F\n...\n-MacPherson pullback of\n...\nf -1\n...\nnatural way to approximate the\n...\n⊗ MU * Z/\n...\n2 (BG × B\n...\np) ⊗ MU * Z\n...\nBG × BZ/p, Z) is not injective"],"image":null},{"rank":2,"title":"[alg-geom/9609016] Torsion algebraic cycles and complex cobordism","url":"https://arxiv.org/abs/alg-geom/9609016","domain":"arxiv.org","published_date":null,"highlights":["# Title:Torsion algebraic cycles and complex cobordism\n...\n\u003e Abstract: We show that the cycle map on a variety X, from algebraic cycles modulo algebraic equivalence to integer cohomology, lifts canonically to a topologically defined quotient of the complex cobordism ring of X. This more refined cycle map gives a topological proof that the Griffiths group is nonzero for some varieties X, without any use of Hodge theory. We also use this more refined cycle map to give examples of torsion algebraic cycles which map to 0 in Deligne cohomology but are not algebraically equivalent to 0, thus answering some questions by Colliot-Thelene and Schoen.\n...\nFrom: Burt Totaro [view email] [v1] Mon, 23 Sep 1996 22:33:05 UTC (52 KB) [v2] Tue, 24 Sep 1996 16:23:09 UTC (52 KB)"],"image":"https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-fb.png"},{"rank":3,"title":"Torsion algebraic cycles and complex cobordism","url":"https://doi.org/10.48550/arxiv.alg-geom/9609016","domain":"doi.org","published_date":"1996-09-23","highlights":["We show that the cycle map on a variety X, from algebraic cycles modulo algebraic equivalence to integer cohomology, lifts canonically to a topologically defined quotient of the complex cobordism ring of X. This more refined cycle map gives a topological proof that the Griffiths group is nonzero for some varieties X, without any use of Hodge theory. We also use this more refined cycle map to give examples of torsion algebraic cycles which map to 0 in Deligne cohomology but are not algebraically equivalent to 0, thus answering some questions by Colliot-Thelene and Schoen.\n...\n- Burt Totaro (University of Chicago): h-index 24; 2,393 citations; corresponding author\n...\n- Madhav V. Nori. Algebraic cycles and Hodge theoretic connectivity. Inventiones mathematicae. 1993;111(1):349-373. doi:10.1007/bf01231292.\n...\n- John Milnor. On the Cobordism Ring Ω ∗ and a Complex Analogue, Part I. American Journal of Mathematics. 1960;82(3):505. doi:10.2307/2372970."],"image":null},{"rank":4,"title":"Torsion Algebraic Cycles and Complex Cobordism","url":"https://www.jstor.org/","domain":"jstor.org","published_date":null,"highlights":["JSTOR Home\n\n- Free online reading for over 10 million articles\n- Save and organize content with Workspace\n- Link account to institutional access\n\nContinue with Google Continue with Microsoft Find my institution\n\nor\n\n*required\n\nUsername or email address *required\n\nPasswordSHOW\n\nStay logged in Forgot password?\n\nLog in\n\nDon't have an account? Register for free\n\nYou are now logged in to JSTOR through Institute for Social and Economic Change, India.\n\nCreate a personal JSTOR account to get a Workspace where you can save and organize your research and come back to it at any time.\n\n*required\n\nEmail *required\n\nConfirm Email *required\n\nPassword\n\n- Use at least 1 letter\n- Use at least 1 number or special character\n- 6 characters minimum (72 max)\n- No blank spaces\n\n*required\n\nConfirm Password\n\n*required\n\nYour use of JSTOR indicates your acceptance of the Terms \u0026 Conditions of Use, the Privacy Policy, and that you are 16 or older.\n\nDon't ask again\n\nContinue without an accountCreate account\n\nSkip to main content\n\nExplore the world’s knowledge, cultures, and ideas\n\nExplore the world’s knowledge, cultures, and ideas\n\nAdvanced Search\n\nAll Content\n\nImages\n\nSearch all content\n\nIndian, A Brahmin gives Krishna the Message or Invitation for the Competition to Rukmini’s Svayamvara, from a Bhagavata Purana, c.1650-60, Part of Open: The Cleveland Museum of Art, Creative Commons: Free Reuse (CC0). Part of Open: The Cleveland Museum of Art.\n\nImage 1 of 5\n\nEnrich your research with primary sources\n\nEnrich your research with primary sources\n\nExplore millions of high-quality primary sources and images from around the world, including artworks, maps, photographs, and more.\n\nBrowse by collection\n\nTake an interdisciplinary approach to American Foreign Policy in the Middle East\n\nTake an interdisciplinary approach to American Foreign Policy in the Middle East\n\nExplore American Foreign Policy in the Middle East through a variety of media types\n\nArticle\n\nTRIANGULAR DYNAMICS: US RESPONSE TO CHINA’S ASSERTIVENESS IN THE MIDDLE EAST\n\nPart of Arab Studies Quarterly\n\nArticle\n\nDo Campaign Speeches Predict Foreign Policy? An Operational Code and Leadership Trait Analysis of Donald Trump's MENA Policies\n\nPart of Uluslararası İlişkiler / International Relations\n\nArticle\n\nThe U.S. Policy towards Post-Saddam Iraq: Implications for the Middle Eastern Regional Security\n\nPart of Strategic Studies\n\nImage\n\nMiddle East Map\n\nPart of Visual Arts Legacy Collection\n\nImage\n\nKUWAIT. Gulf War Aftermath. KUWAIT. 1991. The Persian Gulf.\n\nPart of Magnum Photos\n\nBook\n\nFloundering Stability: US Foreign Policy in Egypt\n\nPart of Floundering Stability: US Foreign Policy in Egypt\n\nBook chapter\n\nStrained Ties: Saudi Arabia and the War in Yemen\n\nPart of Staying in the Fight: How War on Terror Veterans in Congress Are Shaping US Defense Policy\n\nBook chapter\n\nMetaphor, the Middle East, and the American Imagination\n\nPart of Securing the Prize: Presidential Metaphor and US Intervention in the Persian Gulf\n\nResearch report\n\nUS POLICY IN THE MIDDLE EAST: THIRD QUARTER 2025 REPORT CARD: A Quarterly Assessment of the Trump Administration’s Regional Foreign Policy\n\nPart of Middle East Institute\n\nResearch report\n\nUS Military Bases in the Gulf: Better Upset than Sorry?\n\nPart of Arab Center for Research \u0026 Policy Studies\n\nResearch report\n\nCalming the Red Sea’s Turbulent Waters\n\nPart of International Crisis Group\n\nBroaden your research with images and primary sources\n\nBroaden your research with images and primary sources\n\nBring your work to life with images\n\nHarness the power of visual materials—explore more than 3 million images now on JSTOR.\n\nIncorporate alternative voices in your research\n\nEnhance your scholarly research with underground newspapers, magazines, and journals.\n\nTake your research further with Artstor’s 3+ million images\n\nExplore collections in the arts, sciences, and literature from the world’s leading museums, archives, and scholars.\n\n- Search for images\n- Browse Independent Voices\n- Search Artstor collections\n\nABOUT US\n\n- About JSTOR\n- Mission and History\n- JSTOR Labs\n- JSTOR Daily\n- News\n- Webinars\n- Careers\n\nABOUT US\n\n- About JSTOR\n- Mission and History\n- JSTOR Labs\n- JSTOR Daily\n- News\n- Webinars\n- Careers\n\nEXPLORE CONTENT\n\n- What's in JSTOR\n- Advanced Search\n- By Subject\n- By Title\n- Collections\n- Publisher\n- Images\n\nEXPLORE CONTENT\n\n- What's in JSTOR\n- Advanced Search\n- By Subject\n- By Title\n- Collections\n- Publisher\n- Images\n\nRESEARCH TOOLS\n\n- Text Analysis Support\n- The JSTOR Understanding Series\n\nRESEARCH TOOLS\n\n- Text Analysis Support\n- The JSTOR Understanding Series\n\nHELP CENTER\n\n- Get Support\n- Get Access\n- LibGuides\n- Research Basics\n- Contact Us\n- License JSTOR Content\n\nHELP CENTER\n\n- Get Support\n- Get Access\n- LibGuides\n- Research Basics\n- Contact Us\n- License JSTOR Content\n\n- For Librarians\n- For Publishers\n- Teaching Resources\n\nJSTOR is part of ITHAKA, a nonprofit with a mission to improve access to knowledge and education for people around the world. We believe education is key to the wellbeing of individuals and society, and we work to make it more effective and affordable.©2000‍–2026 ITHAKA. All Rights Reserved. JSTOR®, the JSTOR logo, JPASS®, Artstor®, Reveal Digital™ and ITHAKA® are registered trademarks of ITHAKA.\n\n- Terms \u0026 Conditions of Use\n- Privacy Policy\n- Accessibility\n- Cookie Policy\n- Cookie Settings"],"image":null},{"rank":5,"title":"Torsion algebraic cycles and complex cobordism","url":"https://geodesic.mathdoc.fr/articles/10.1090/S0894-0347-97-00232-4/","domain":"geodesic.mathdoc.fr","published_date":null,"highlights":["Torsion algebraic cycles and complex cobordism \n\n Torsion algebraic cycles and complex cobordism \n\nTotaro, Burt 1 Author's affiliations\n\n 1 Department of Mathematics, University of Chicago, 5734 S. University Ave., Chicago, Illinois 60637 \n\n Author's affiliations: \n\n Totaro, Burt 1 \n\n 1 Department of Mathematics, University of Chicago, 5734 S. University Ave., Chicago, Illinois 60637 \n\n```\nTotaro, Burt. Torsion algebraic cycles and complex cobordism. Journal of the American Mathematical Society, Volume 10 (1997) no. 2, pp. 467-493. doi: 10.1090/S0894-0347-97-00232-4\n```\n...\n[27] Nori, Madhav V. Algebraic cycles and Hodge-theoretic connectivity Invent. Math. 1993 349 373\n...\n[30] Parimala, R., Suresh, V. Zero-cycles on quadric fibrations: finiteness theorems and the cycle map Invent. Math. 1995 83 117\n...\n[35] Schoen, Chad On the computation of the cycle class map for nullhomologous cycles over the algebraic closure of a finite field Ann. Sci. École Norm. Sup. (4) 1995 1 50"],"image":"https://geodesic.mathdoc.fr/static/gdml/img/geodesic_600.png"},{"rank":6,"title":"integral Hodge conjecture in nLab","url":"https://ncatlab.org/nlab/show/integral+Hodge+conjecture","domain":"ncatlab.org","published_date":null,"highlights":["Let \$XX\$ be a smooth projective complex manifold. The integral Hodge conjecture states that every integral Hodge cycle, i.e. \$2k2k\$-degree cohomology class of \$XX\$ which lies in the \$(k,k)(k,k)\$-piece of the Hodge decomposition, is algebraic, i.e. the class of an algebraic cycle.\n...\nCounterexamples of the first type were given first by Atiyah-Hirzebruch 61. They were later re-interpreted in terms of complex cobordism by Totaro 97. These examples were so-called Godeaux-Serre varieties?, constructed in (Serre 58, section 20).\n...\n- Burt Totaro, Torsion algebraic cycles and complex cobordism, J. Amer.\n...\nMath. Soc. 10 (1997), no. 2, 467–493, pdf."],"image":null}]
```

```thinking
The web_fetch with multiple URLs returned something not matching my jq assumption. Let me check the raw output.
```

Tool: bash

Arguments:
```json
{"command": "head -c 2000 /tmp/arxiv_abs.json; echo; echo ====; tools web_fetch --url \"https://arxiv.org/abs/2507.15704\" --json | jq '{url, title, error}'"}
```

Tool: bash

Error: tools web_fetch: unexpected argument: https://arxiv.org/abs/2002.02347

====

jq: error (at <stdin>:1): Cannot index array with string "url"


[exit code: 5]

Structured:
```json
[{"url":"https://arxiv.org/abs/2507.15704","title":"Mathematics \u003e Algebraic Geometry","domain":"arxiv.org","published_date":null}]
```

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://arxiv.org/abs/2507.15704,https://arxiv.org/abs/2002.02347,https://arxiv.org/abs/2012.13142\" --json > /tmp/arxiv_abs.json; jq -r '.[] | .url + \" :: \" + (.title // \"\") + \" :: \" + (.error // \"\")' /tmp/arxiv_abs.json"}
```

Tool: bash

https://arxiv.org/abs/2507.15704 :: Mathematics > Algebraic Geometry :: 
https://arxiv.org/abs/2002.02347 :: [2002.02347] Tropical Abelian varieties, Weil classes and the Hodge Conjecture :: 
https://arxiv.org/abs/2012.13142 :: [2012.13142] Tropical Clemens-Schmid sequence and existence of tropical cycles with a given cohomology class :: 


[exit code: 0]

Structured:
```json
[{"url":"https://arxiv.org/abs/2507.15704","title":"Mathematics \u003e Algebraic Geometry","domain":"arxiv.org","published_date":null},{"url":"https://arxiv.org/abs/2002.02347","title":"[2002.02347] Tropical Abelian varieties, Weil classes and the Hodge Conjecture","domain":"arxiv.org","published_date":null},{"url":"https://arxiv.org/abs/2012.13142","title":"[2012.13142] Tropical Clemens-Schmid sequence and existence of tropical cycles with a given cohomology class","domain":"arxiv.org","published_date":null}]
```

```thinking
Titles came back but the abstract content isn't in the OUTPUT JSON fields listed (url, domain, error, published_date, title). The readable markdown is presumably in non-JSON output. Let me fetch without --json to get markdown. Also fetch the full HTML (ar5iv) for 2507.15704 to extract geometric implications. And check the search results I saved.
```

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://arxiv.org/abs/2507.15704\" > /tmp/e_abs.md 2>&1; tools web_fetch --url \"https://arxiv.org/abs/2002.02347\" > /tmp/zharkov_abs.md 2>&1; tools web_fetch --url \"https://arxiv.org/abs/2012.13142\" > /tmp/ap_abs.md 2>&1; head -c 1500 /tmp/e_abs.md; echo; echo ==ZHARKOV==; head -c 1500 /tmp/zharkov_abs.md; echo; echo ==AMINI==; head -c 1500 /tmp/ap_abs.md"}
```

Tool: bash

[1] Mathematics > Algebraic Geometry — arxiv.org
https://arxiv.org/abs/2507.15704

[2507.15704] Matroids and the integral Hodge conjecture for abelian varieties
[Skip to main content](#content)
[![Cornell University](https://arxiv.org/static/browse/0.3.4/images/icons/cu/cornell-reduced-white-SMALL.svg)](https://www.cornell.edu/)
We gratefully acknowledge support from the Simons Foundation,[member institutions](https://info.arxiv.org/about/ourmembers.html), and all contributors.[Donate](https://info.arxiv.org/about/donate.html)
[](https://arxiv.org/IgnoreMe)
[![arxiv logo](https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-one-color-white.svg)](https://arxiv.org/)>[math](https://arxiv.org/list/math/recent)>arXiv:2507.15704
[Help](https://info.arxiv.org/help)|[Advanced Search](https://arxiv.org/search/advanced)
All fieldsTitleAuthorAbstractCommentsJournal referenceACM classificationMSC classificationReport numberarXiv identifierDOIORCIDarXiv author IDHelp pagesFull text
Search
[![arXiv logo](https://arxiv.org/static/browse/0.3.4/images/arxiv-logomark-small-white.svg)](https://arxiv.org/)
[![Cornell University Logo](https://arxiv.org/static/browse/0.3.4/images/icons/cu/cornell-reduced-white-SMALL.svg)](https://www.cornell.edu/)
open search
GO
open navigation menu
# Mathematics \> Algebraic Geometry
**arXiv:2507.15704**(math)
[Submitted on 21 Jul 2025 ([v1](https://arxiv.org/abs/2507.15704v1)), last revised 7 Aug 2025 (this version, v2)]
# Title:Matroids and the integral H
==ZHARKOV==
[1] [2002.02347] Tropical Abelian varieties, Weil classes and the Hodge Conjecture — arxiv.org
https://arxiv.org/abs/2002.02347

[2002.02347] Tropical Abelian varieties, Weil classes and the Hodge Conjecture

Skip to main content

![Cornell University](https://arxiv.org/static/browse/0.3.4/images/icons/cu/cornell-reduced-white-SMALL.svg)

We gratefully acknowledge support from the Simons Foundation, member institutions, and all contributors. Donate

![arxiv logo](https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-one-color-white.svg)

> math> arXiv:2002.02347

Help| Advanced Search

All fields Title Author Abstract Comments Journal reference ACM classification MSC classification Report number arXiv identifier DOI ORCID arXiv author ID Help pages Full text

Search

![arXiv logo](https://arxiv.org/static/browse/0.3.4/images/arxiv-logomark-small-white.svg)

![Cornell University Logo](https://arxiv.org/static/browse/0.3.4/images/icons/cu/cornell-reduced-white-SMALL.svg)

GO

--

# Mathematics Algebraic Geometry

arXiv:2002.02347 (math)

[Submitted on 6 Feb 2020]

# Title:Tropical Abelian varieties, Weil classes and the Hodge Conjecture

Authors: Ilia Zharkov

View PDF

> Abstract:We describe in some details an idea of M. Kontsevich how one can try to find a counterexample to the Hodge conjecture using tropical geometry.

https://doi.org/10.48550/arXiv.2002.02347

arXiv-issued DOI via DataCite

| Comments: |
| --- |
| Subjects: | Algebraic Geometry (math.AG) |
| Cite as: | 
==AMINI==
[1] [2012.13142] Tropical Clemens-Schmid sequence and existence of tropical cycles with a given cohomology class — arxiv.org
https://arxiv.org/abs/2012.13142

[2012.13142] Tropical Clemens-Schmid sequence and existence of tropical cycles with a given cohomology class

Skip to main content

![Cornell University](https://arxiv.org/static/browse/0.3.4/images/icons/cu/cornell-reduced-white-SMALL.svg)

We gratefully acknowledge support from the Simons Foundation, member institutions, and all contributors. Donate

![arxiv logo](https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-one-color-white.svg)

> math> arXiv:2012.13142

Help| Advanced Search

All fields Title Author Abstract Comments Journal reference ACM classification MSC classification Report number arXiv identifier DOI ORCID arXiv author ID Help pages Full text

Search

![arXiv logo](https://arxiv.org/static/browse/0.3.4/images/arxiv-logomark-small-white.svg)

![Cornell University Logo](https://arxiv.org/static/browse/0.3.4/images/icons/cu/cornell-reduced-white-SMALL.svg)

GO

--

# Mathematics Algebraic Geometry

arXiv:2012.13142 (math)

[Submitted on 24 Dec 2020]

# Title:Tropical Clemens-Schmid sequence and existence of tropical cycles with a given cohomology class

Authors: Omid Amini, Matthieu Piquerez

View PDF

> Abstract:This is a sequel to our work in tropical Hodge theory. Our aim here is to prove a tropical analogue of the Clemens-Schmid exact sequence in asymptotic Hodge theory. As an application of this

[exit code: 0]

Structured:
```json
[{"url":"https://arxiv.org/abs/2012.13142","title":"[2012.13142] Tropical Clemens-Schmid sequence and existence of tropical cycles with a given cohomology class","domain":"arxiv.org","published_date":null}]
```

```thinking
Get full abstract of 2507.15704, plus full text (ar5iv HTML) to extract geometric implications. Also review the search result JSONs.
```

Tool: bash

Arguments:
```json
{"command": "grep -A30 'Abstract' /tmp/e_abs.md | head -50; echo ====; for f in kollar ah voisin_k sv os bo grif totaro; do echo \"== \$f ==\"; jq -r '.[] | .url + \" :: \" + .title' /tmp/\$f.json 2>/dev/null | head -6; done"}
```

Tool: bash

All fieldsTitleAuthorAbstractCommentsJournal referenceACM classificationMSC classificationReport numberarXiv identifierDOIORCIDarXiv author IDHelp pagesFull text
Search
[![arXiv logo](https://arxiv.org/static/browse/0.3.4/images/arxiv-logomark-small-white.svg)](https://arxiv.org/)
[![Cornell University Logo](https://arxiv.org/static/browse/0.3.4/images/icons/cu/cornell-reduced-white-SMALL.svg)](https://www.cornell.edu/)
open search
GO
open navigation menu
# Mathematics \> Algebraic Geometry
**arXiv:2507.15704**(math)
[Submitted on 21 Jul 2025 ([v1](https://arxiv.org/abs/2507.15704v1)), last revised 7 Aug 2025 (this version, v2)]
# Title:Matroids and the integral Hodge conjecture for abelian varieties
Authors:[Philip Engel](https://arxiv.org/search/math?searchtype=author&query=Engel,+P),[Olivier de Gaay Fortman](https://arxiv.org/search/math?searchtype=author&query=de+Gaay+Fortman,+O),[Stefan Schreieder](https://arxiv.org/search/math?searchtype=author&query=Schreieder,+S)
View a PDF of the paper titled Matroids and the integral Hodge conjecture for abelian varieties, by Philip Engel and 2 other authors
[View PDF](https://arxiv.org/pdf/2507.15704)[HTML (experimental)](https://arxiv.org/html/2507.15704v2)> > Abstract:
> We prove that the cohomology class of any curve on a very general principally polarized abelian variety of dimension at least 4 is an even multiple of the minimal class. The same holds for the intermediate Jacobian of a very general cubic threefold. This disproves the integral Hodge conjecture for abelian varieties and shows that very general cubic threefolds are not stably rational. Our proof is motivated by tropical geometry; it relies on multivariable Mumford constructions, monodromy considerations, and the combinatorial theory of matroids. Comments:|80 pages, v2: minor changes|
Subjects:|Algebraic Geometry (math.AG); Combinatorics (math.CO)|
MSCclasses:|05B35, 14C25, 14C30, 14E08|
Cite as:|[arXiv:2507.15704](https://arxiv.org/abs/2507.15704)[math.AG]|
|(or[arXiv:2507.15704v2](https://arxiv.org/abs/2507.15704v2)[math.AG]for this version)|
|[https://doi.org/10.48550/arXiv.2507.15704](https://doi.org/10.48550/arXiv.2507.15704)
Focus to learn more
arXiv-issued DOI via DataCite
|
## Submission history
From: Stefan Schreieder [[view email](https://arxiv.org/show-email/47e68615/2507.15704)]
**[[v1]](https://arxiv.org/abs/2507.15704v1)**Mon, 21 Jul 2025 15:12:15 UTC (206 KB)
**[v2]**Thu, 7 Aug 2025 21:48:33 UTC (207 KB)
Full-text links:## Access Paper:
View a PDF of the paper titled Matroids and the integral Hodge conjecture for abelian varieties, by Philip Engel and 2 other authors
* [View PDF](https://arxiv.org/pdf/2507.15704)
* [HTML (experimental)](https://arxiv.org/html/2507.15704v2)
* [TeX Source](https://arxiv.org/src/2507.15704)
* [Other Formats](https://arxiv.org/format/2507.15704)
[view license](http://arxiv.org/licenses/nonexclusive-distrib/1.0/)
Current browse context:
math.AG
[<<prev](https://arxiv.org/prevnext?id=2507.15704&function=prev&context=math.AG) | [next>>](https://arxiv.org/prevnext?id=2507.15704&function=next&context=math.AG)
[new](https://arxiv.org/list/math.AG/new)|[recent](https://arxiv.org/list/math.AG/recent)|[2025-07](https://arxiv.org/list/math.AG/2025-07)
Change to browse by:
[math](https://arxiv.org/abs/2507.15704?context=math)
[math.CO](https://arxiv.org/abs/2507.15704?context=math.CO)
### References & Citations
* [NASA ADS](https://ui.adsabs.harvard.edu/abs/arXiv:2507.15704)
* [Google Scholar](https://scholar.google.com/scholar_lookup?arxiv_id=2507.15704)
====
== kollar ==
https://math.stackexchange.com/questions/2416420/kollars-counter-example-about-the-integral-hodge-conjecture :: Kollar's counter-example about the integral Hodge conjecture.
https://repo.uni-hannover.de/ :: Hodge theory and algebraic cycles
https://www.mn.uio.no/math/personer/vit/johnco/gael-ottem.pdf :: 
https://ar5iv.labs.arxiv.org/html/2105.04695 :: [2105.04695] Known cases of the Hodge conjecture
https://ar5iv.labs.arxiv.org/html/2305.08961 :: [2305.08961] On the failure of the integral Hodge/Tate conjecture for products with projective hypersurfaces
https://doi.org/10.1515/crelle-2022-0036 :: On the degree of algebraic cycles on hypersurfaces
== ah ==
https://ncatlab.org/nlab/show/integral+Hodge+conjecture :: integral Hodge conjecture in nLab
https://webusers.imj-prg.fr/~claire.voisin/Articlesweb/torsion.pdf :: Torsion cohomology classes and algebraic cycles on complex projective manifolds
https://doi.org/10.48550/arxiv.1601.06170 :: Further counterexamples to the integral Hodge conjecture
https://ncatlab.org/ :: integral Hodge conjecture in nLab
https://doi.org/10.4171/cmh/479 :: Failure of the integral Hodge conjecture for threefolds of Kodaira dimension zero
https://ar5iv.labs.arxiv.org/html/math/0403254 :: [math/0403254] Torsion cohomology classes and algebraic cycles on complex projective manifolds
== voisin_k ==
https://webusers.imj-prg.fr/~claire.voisin/Articlesweb/hodgeimrn.pdf :: [PDF] A Counterexample to the Hodge Conjecture Extended to Kähler ...
https://doi.org/10.1155/s1073792802111135 :: 
https://doi.org/10.48550/arxiv.math/0112247 :: A counterexample to the Hodge conjecture for Kaehler varieties
https://ar5iv.labs.arxiv.org/html/math/0112247 :: [math/0112247] A counterexample to the Hodge conjecture for Kähler varieties
https://arxiv.org/abs/math/0112247 :: A counterexample to the Hodge conjecture for Kaehler varieties - arXiv
https://webusers.imj-prg.fr/~claire.voisin/Articlesweb/verbanianotes.pdf :: Algebraic geometry versus K¨ahler geometry
== sv ==
https://webusers.imj-prg.fr/~claire.voisin/Articlesweb/torsion.pdf :: Torsion cohomology classes and algebraic cycles on complex projective manifolds
https://doi.org/10.1016/j.aim.2004.10.022 :: Torsion cohomology classes and algebraic cycles on complex projective manifolds
https://webusers.imj-prg.fr/~claire.voisin/Articlesweb/sdarticle.pdf :: doi:10.1016/j.aim.2004.10.022
https://doi.org/10.48550/arxiv.math/0403254 :: Torsion cohomology classes and algebraic cycles on complex projective manifolds
http://dml.mathdoc.fr/item/hal-00001298/ :: Torsion cohomology classes and algebraic cycles on complex projective manifolds
https://ar5iv.labs.arxiv.org/html/math/0403254 :: [math/0403254] Torsion cohomology classes and algebraic cycles on complex projective manifolds
== os ==
https://www.mn.uio.no/math/personer/vit/johnco/papers/ihcpes.pdf :: 1. Introduction For a smooth complex projective variety X, we denote by CH p(X) the Chow group of codimension p cycles and by H 2p(X, Z) the Betti cohomology group of degree 2p. The image H
https://doi.org/10.48550/arxiv.1906.08994 :: A pencil of Enriques surfaces with non-algebraic integral Hodge classes
https://doi.org/10.1007/s00208-020-01969-8 :: A pencil of Enriques surfaces with non-algebraic integral Hodge classes
https://doi.org/10.25417/uic.13475349 :: The Integral Hodge Conjecture and Universality of the Abel-Jacobi Maps
https://www.impan.pl/~pragacz/ottem.pdf :: Enriques surface fibrations with even index - Joint work with F. Suzuki.
https://arxiv.org/pdf/1906.08994 :: 
== bo ==
https://doi.org/10.4171/cmh/479 :: Failure of the integral Hodge conjecture for threefolds of Kodaira dimension zero
https://ems.press/journals/cmh/articles/16855 :: Failure of the integral Hodge conjecture for threefolds of Kodaira dimension zero | EMS Press
https://www.math.ens.psl.eu/~benoist/articles/IHCEnriques.pdf :: Failure of the integral Hodge conjecture for threefolds of Kodaira dimension zero
https://www.mn.uio.no/math/personer/vit/johnco/papers/ihcenriques.pdf :: FAILURE OF THE INTEGRAL HODGE CONJECTURE FOR THREEFOLDS OF KODAIRA DIMENSION ZERO
https://doi.org/10.48550/arxiv.1802.01845 :: Failure of the integral Hodge conjecture for threefolds of Kodaira dimension zero
https://link.springer.com/ :: Cohomologie non ramifiée dans le produit avec une courbe ...
== grif ==
https://webusers.imj-prg.fr/~claire.voisin/Articlesweb/torsion.pdf :: Torsion cohomology classes and algebraic cycles on complex projective manifolds
https://webusers.imj-prg.fr/~claire.voisin/Articlesweb/griffithsgroup.pdf :: = 1(X)⊕ ∧ | |+| | = 2k− | | ≥
https://webusers.imj-prg.fr/~claire.voisin/Articlesweb/sdarticle.pdf :: doi:10.1016/j.aim.2004.10.022
https://doi.org/10.4310/pamq.2014.v10.n1.a1 :: On the Griffiths groups of Fano manifolds of Calabi-Yau Hodge type
https://doi.org/10.4171/jems/1419 :: Infinite torsion in Griffiths groups
https://arxiv.org/html/2303.04083 :: Torsion in Griffiths Groups
== totaro ==
https://doi.org/10.1090/s0894-0347-97-00232-4 :: Torsion algebraic cycles and complex cobordism
https://arxiv.org/abs/alg-geom/9609016 :: [alg-geom/9609016] Torsion algebraic cycles and complex cobordism
https://doi.org/10.48550/arxiv.alg-geom/9609016 :: Torsion algebraic cycles and complex cobordism
https://www.jstor.org/ :: Torsion Algebraic Cycles and Complex Cobordism
https://geodesic.mathdoc.fr/articles/10.1090/S0894-0347-97-00232-4/ :: Torsion algebraic cycles and complex cobordism
https://ncatlab.org/nlab/show/integral+Hodge+conjecture :: integral Hodge conjecture in nLab


[exit code: 0]