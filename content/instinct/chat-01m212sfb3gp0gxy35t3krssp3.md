---
title: "lit: frobenius non-algebraicity sweeps (chat-01M212SFB)"
---

_1 transcript files aggregated._

Context: a serious computational Hodge-conjecture program (Weil-type abelian sixfolds, certified OUT-by-4 obstruction vs a 438-class catalogue) hit the Deligne cap: Hodge classes on abelian varieties are absolute Hodge (Deligne 1982), so realization-level tests cannot detect non-algebraicity. The one rigorous non-algebraicity verifier is the Frobenius root-of-unity bound (van Luijk trick) in higher codimension, which can only fire where Delignes conjecture (Hodge => absolute Hodge) could fail: atypical isolated Hodge points in non-abelian-type families. The user demands extremely deep literature search - arxiv full text, GitHub, blogs, proceedings, 1990-2026. Report to your parent with source URLs, what exists, what is directly usable, and an honest verdict on whether it changes three numbers: counterexample-via-frobenius-sweep 1-3pct, lift-direction algebraicity theorem 5-10pct, current-program counterexample 0pct.
YOUR SPECIALTY: has ANYONE ever run the Frobenius root-of-unity bound as a NON-ALGEBRAICITY test at Hodge loci in codimension >= 2 (as opposed to Picard-rank computations on K3/surfaces)? Search exhaustively: van Luijk, Elsenhans-Jahnel, Poonen-Testa-van Luijk, Charles 2014 (his erratum too), Hassett-Varilly-Alvarado, Costa-Tziatzios, Sertoz, Lairez, Movasati (his Hodge locus computations and code), anyone computing Hodge/Tate ranks of middle cohomology of hypersurfaces or complete intersections over finite fields. Also: theoretical papers on the DEFECT (Hodge rank minus algebraic rank) being computable or bounded. If the answer is genuinely "nobody has swept it," establish that as firmly as absence-of-evidence allows, and list the closest 5 works.

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
The task: deep literature search on whether anyone has run the Frobenius root-of-unity bound as a non-algebraicity test at Hodge loci in codimension >= 2. I need to search exhaustively: van Luijk, Elsenhans-Jahnel, Poonen-Testa-van Luijk, Charles 2014 + erratum, Hassett-Varilly-Alvarado, Costa-Tziatzios, Sertoz, Lairez, Movasati, defect computability.

Let me plan a batch of web searches. Start with multiple async searches.
```

Tool: bash

Arguments:
```json
{"command": "tools web_search --query 'van Luijk root of unity Frobenius eigenvalue non-algebraic Tate conjecture surfaces' --limit 15 --async s1\ntools web_search --query 'Frobenius characteristic polynomial root of unity bound Hodge classes codimension two hypersurfaces' --limit 15 --async s2\ntools web_search --query 'Charles 2014 \"l-adic\" Tate conjecture absolute Hodge erratum Frobenius' --limit 15 --async s3\ntools web_search --query 'Elsenhans Jahnel Picard rank K3 surfaces Frobenius Artin-Tate' --limit 15 --async s4"}
```

Tool: bash

s1 launched
s2 launched
s3 launched
s4 launched


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "tools web_search --query 'Poonen Testa van Luijk \"Computing Néron-Severi groups\" root of unity' --limit 12 --async s5\ntools web_search --query 'Movasati Hodge locus computations cubic hypersurfaces algebraic cycles code' --limit 15 --async s6\ntools web_search --query 'Hassett Várilly-Alvarado transcendental obstructions K3 good reduction Frobenius' --limit 12 --async s7\ntools web_search --query 'Costa Tziatzios algebraic cycles Fermat hypersurface Hodge conjecture finite fields' --limit 12 --async s8"}
```

Tool: bash

s5 launched
s6 launched
s7 launched
s8 launched


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "tools async wait s1 s2 s3 s4 s5 s6 s7 s8 2>&1 | tail -20\nfor f in s1 s2 s3 s4 s5 s6 s7 s8; do echo \"===== \$f =====\"; jq -r '.[] | .title + \" | \" + .url + \" | \" + (.highlights[0] // \"\" | .[0:200])' /tmp/tool-async/\$f.json 2>/dev/null; done", "timeout": 90}
```

Tool: bash

{"action":"web_search","name":"s1","status":"done"}
{"action":"web_search","name":"s2","status":"done"}
{"action":"web_search","name":"s3","status":"done"}
{"action":"web_search","name":"s4","status":"done"}
{"action":"web_search","name":"s5","status":"done"}
{"action":"web_search","name":"s6","status":"done"}
{"action":"web_search","name":"s7","status":"done"}
{"action":"web_search","name":"s8","status":"done"}
===== s1 =====
K3 surfaces with Picard number one and infinitely | https://pub.math.leidenuniv.nl/~luijkrmvan/ps/picone.pdf | Ronald van Luijk
...
that for any scheme Z over Fq with q = p r and p prime, the absolute Frobenius FZ : Z → Z of Z acts as the identity on points, and by f 7→ f p on the structure sheaf.
...
F r Z
..
Finiteness of K3 surfaces  and the Tate conjecture | https://www.numdam.org/articles/10.24033/asens.2215/ | 3 surfaces and
...
Finiteness of K3 surfaces and the Tate conjecture
...
Given a finite field k of characteristic p≥5, we show that the Tate conjecture holds for K3 surfaces over k¯ if and only if the
Arithmetic of K3 surfaces  (open problems and conjectures) | https://pub.math.leidenuniv.nl/~luijkrmvan/ps/FO80.pdf | Pic Xp/` n Pic Xp ,→ H 2 ´et(Xp, µ`n ). 
Because Pic Xp is finitely generated and free, 
the inverse limit gives a Galois invariant injection 
Pic Xp ,→ lim 
←−n 

H 2 ´et(Xp, µ`n ) =: H 2 ´et(X, Z`(1
arXiv:1111.4117v1 [math.AG] 17 Nov 2011 | https://arxiv.org/ | - Mathematics (math new, recent, search) includes: (see detailed description): Algebraic Geometry; Algebraic Topology; Analysis of PDEs; Category Theory; Classical Analysis and ODEs; Combinatorics; Co
Chapter 18 Causal versus random: the Tate conjecture and ... | https://kskedlaya.org/ | monitor or control any
...
accounts (including Facebook, Instagram, LinkedIn, e𝕏
...
𝕏-Twitter, TikTok).
...
Math 1
...
ization, including the use of the
...
Lean. More details will be posted to the
.
 | https://websites.umich.edu/~asnowden/papers/finitate-070711.pdf | . Given a finite
...
≥ 5, we show that the Tate conjecture holds
...
over k if and only if there are
...
surfaces defined over each finite
...
In this paper, we consider the finiteness question for K3
Kummer surfaces and the computation of the Picard group | https://doi.org/10.1112/s1461157012000022 | V Fp
...
into l-adic cohomology. There is a natural operation of Frobenius on H 2 ét (V Fp , Q l (1)). All eigenvalues are of absolute value 1. The Frobenius operation on the Picard group is compatibl
K3 surfaces over finite fields with given L-function | https://doi.org/10.2140/ant.2016.10.1133 | We have L(X/‫ކ‬ q , T ) = 22 i=1 (1 -γ i T ) with the γ i of complex absolute value 1. The polynomial L(X/‫ކ‬ q , T ) factors in ‫[ޑ‬T ] as L = L alg L trc with L alg (X/‫ކ‬ q , T ) =
...
γ i ∈µ ∞ (1 
arXiv:math/0506416v2  [math.AG]  24 Jun 2005 | https://export.arxiv.org/pdf/math/0506416v2.pdf | Ronald van Luijk
...
Ronald van Luijk
...
scheme Z over Fq with
...
r and p prime, the absolute Frobenius FZ : Z → Z
...
Corollary 2.3. With the notation as in Proposition 2.2, the ranks of NS(Se) and
The Tate conjecture over finite fields (AIM talk) | https://www.jmilne.org/ | James Milne -- Home Page

 "In the eternal struggle between the world's beauty and its cruelty, cruelty was gaining by the day." 

| Mathematics | New Zealand/Aotearoa |
| --- | --- |
| Books and cour
The representations of the automorphism groups and the Frobenius invariants of K3 surfaces | https://doi.org/10.48550/arxiv.1312.7634 | # The representations of the automorphism groups and the Frobenius invariants of K3 surfaces
...
For a K3 surface over an algebraically closed field of odd characteristic, the representation of the au
 | https://arxiv.org/pdf/1304.5623 | any characteristic. On the other hand, Tate [Ta65] and Shioda [Sh77b] gave examples of K3 surfaces with Picard rank 22 in positive characteristic, so-called Shiodasupersingular K3 surfaces. Artin [A
SUPÉRIEUkE de L ÉCOLE hORMALE | https://www.numdam.org/item/ASENS_2014__47_2_285_0.pdf | 1. Introduction Given a class of algebraic varieties, it is reasonable to ask if there are only finitely many members defined over a given finite field. While this is clearly the case when the appropr
Some Non-Special Cubic Fourfolds | https://doi.org/10.25537/dm.2018v23.637-651 | We follow a strategy developed by van Luijk [23] and refined by Elsen hans and Jahnel [9, 10], for producing explicit K3 surfaces of Picard rank 1. We find an explicit cubic fourfold with good reducti
[1107.1221] Finiteness of K3 surfaces and the Tate conjecture | https://ar5iv.labs.arxiv.org/html/1107.1221 | Given a finite field \$k\$ of characteristic \$p\geq 5\$ , we show that the Tate conjecture holds for K3 surfaces over \$\overline{k}\$ if and only if there are only finitely many K3 surfaces defined over e
===== s2 =====
Eigenvalues of Frobenius and Hodge Numbers | https://doi.org/10.4310/pamq.2006.v2.n2.a5 | We study the connection between Hodge purity of the cohomology of algebraic varieties over fields of different characteristics. Specifically, we study varieties over number fields, whose cohomology in
Computing zeta functions of nondegenerate toric hypersurfaces via controlled reduction | https://kskedlaya.org/slides/oxford2013.pdf | Write q = p a with p prime. 
Suppose deg Pi is known for some i. Thanks to the bound on roots, for 
some explicitly computable N, we may determine Pi exactly from its 
coefficients modulo p N. 
That i
Decomposition of the diagonal and eigenvalues of Frobenius for Fano hypersurfaces | https://doi.org/10.48550/arxiv.math/0302109 | Let X ⊂ P n be a possibly singular hypersurface of degree d ≤ n, defined over a finite field F q . We show that the diagonal, suitably interpreted, is decomposable. This gives a proof that the eigenva
Hodge and Frobenius colevels of algebraic varieties | https://doi.org/10.48550/arxiv.2309.16290 | 1.1 Hodge colevel and Frobenius colevel Let us recall the definitions of cohomological colevel in two different contexts. Definition 1.1 (Frobenius colevel). Let 𝑘 be an algebraic closure of the prime
18.782 Introduction to Arithmetic Geometry Fall 2020 Lecture #37 12/7/2020 | https://math.mit.edu/~roed/courses/18.782/LectureNotes37.pdf | 37.1 The Riemann hypothesis for hypersurfaces over Fq Katz’ idea is that we can prove the Riemann hypothesis by deforming from a hypersurface where it is easy to prove. For any hypersurface with equat
Frobenius and the Hodge filtration | https://doi.org/10.1090/s0002-9904-1972-12976-8 | helot: Let X/W be proper and smooth, where W = W(k) is the Witt vectors of the finite field k. Let X 0 /k denote the closed fibre. Then the de Rham cohomology groups H DR (X/W) depend only on X 0 and 
Frobenius polynomials for Calabi–Yau equations | https://download.uni-mainz.de/mathematik/Algebraische%20Geometrie/DvS-Publikationen/Frobenius%20polynomials%20for%20Calabi-Yau%20equations.pdf | We describe a variation of Dwork’ s unit-root method to determine the degree 4 Frobenius polynomial for members of a 1-modulus Calabi–Yau family over P1 in terms of the holomorphic period near a point
CONGRUENCES AND COHOMOLOGY | https://www.imath.kiev.ua/~mariyka/publ/congruences-and-cohomology-notes-draft.pdf | We will refer to αi’s and βj’s as the Frobenius roots of X. Their existence was proved 
by Bernard Dwork circa 1960 using p-adic methods. The natural building blocks in 
Dwork’s approach were hypersur
Genus bounds for curves with fixed Frobenius eigenvalues | https://doi.org/10.1090/s0002-9939-2013-11839-3 | The Weil polynomial of a d-dimensional abelian variety A over a finite field F q is the characteristic polynomial of the q-th power Frobenius endomorphism of A 72 N. D. ELKIES, E. W. HOWE, AND C. RITZ
FROBENIUS NONCLASSICAL HYPERSURFACES | https://webpages.scu.edu/ftp/sasgarli/frob-non-classical.pdf | = H 6 = 0. In fact, every such F is projectively equivalent to (1.1) over Fq by [BC66, Theorem 4.1]. Our first main result concerns lower bounds on the degree of a Frobenius nonclassical hypersurface.
 | https://export.arxiv.org/pdf/2201.06013v2.pdf | it is shown that as algebraic integers, the eigenvalues of the geometric Frobenius acting on ℓ-adic cohomology have higher than known q-divisibility beyond the middle dimension. This sharpens both D
 | https://export.arxiv.org/pdf/2207.11981v2.pdf | Abstract. A smooth hypersurface over a finite field Fq is called Frobenius nonclassical
...
if the image of every geometric point under the q-th Frobenius endomorphism remains
...
in the unique hyperp
 | https://arxiv.org/pdf/2602.24155 | We define the i-th Newton polygon newti(X) of X to be the lower convex hull of
...
and denote it by newt(X). A celebrated theorem of Mazur [Maz73] gives a lower
...
bound for newti(X) in terms of anot
 | https://arxiv.org/pdf/2401.04981 | 0 Hodge structure
...
Lie algebra, known as the adjoint
...
) compo
...
57]
...
To analyze the variation of this representation with y, we pick a place v and pass to the corresponding p-adic represen
Hasse-Witt matrices, unit roots and period integrals | https://doi.org/10.48550/arxiv.1801.01189 | F(λ) F(λp)≡ (p−1)F(λ) mod p. Let q = p r and t ∈ Fq. Assume p ∤ n + 1 and t n+1 6 = 0, 1 H-Wp(λ) 6 = 0. Then there exists exactly one p-adic unit root in the factor of zeta function of Dwork family co
===== s3 =====
(2πi)kZ | https://www.imo.universite-paris-saclay.fr/~francois.charles/RemGPC.pdf | Abstract. We discuss various results and questions around the Grothendieck period conjecture, which is a counterpart, concerning the de Rham-Betti realization of algebraic varieties over number fields
Martin Orr's Blog | https://martinorr.name/blog/2014/09/02/tate-classes/ | I will state the Tate conjecture, the![\ell](http://www.martinorr.name/blog/images/mathtex/1.png)-adic analogue of the Hodge conjecture, which says that if the base field is finitely generated, then t
Deligne's Principle A and the Mumford-Tate conjecture | Martin Orr's Blog | http://www.martinorr.name/blog/2014/09/10/delignes-principle-a-and-mumford-tate/ | In this post I will fill in a missing detail from two weeks ago, where I mentioned that the Mumford-Tate group is determined by the Hodge classes. More precisely, I will show that an element of is in 
The Tate conjecture over finite fields (AIM talk) | https://www.jmilne.org/ | James Milne -- Home Page

 "In the eternal struggle between the world's beauty and its cruelty, cruelty was gaining by the day." 

| Mathematics | New Zealand/Aotearoa |
| --- | --- |
| Books and cour
Martin Orr's Blog | https://martinorr.name/blog/2015/06/26/absolute-hodge-classes-in-l-adic-cohomology/ | martinorr.name
...
blog/2
...
14/1
...
/20/
...
in de Rham cohomology
...
We can then prove[Deligne's theorem](http://www.martinorr.name/blog/2014/12/17/delignes-theorem-on-absolute-hodge-classes), th
 | https://arxiv.org/pdf/0709.3040 | An ℓ-adic Tate q-structure is a finite dimensional Qℓ-vector space together with a linear
...
6 The Hodge conjecture and the Tate conjecture
...
To go further, we shall need to consider the Hodge conj
Tate classes | Martin Orr's Blog | http://www.martinorr.name/ | - Abelian varieties series on my blog: the best part of the blog, now with a handy index.
- M2 thesis (Orsay, 2010) on Groupes de monodromie l-adiques algébriques, based on Pink's 1998 paper.
Recent progress on the Tate conjecture | https://www.math.ucla.edu/~totaro/papers/public_html/tate.pdf | X of an abelian variety over a global field should be finite; the precise relation between these conjectures is discussed below. (A global field means a number field or the function field of a curve o
[1602.08354] A survey around the Hodge, Tate and Mumford-Tate conjectures for abelian varieties | https://ar5iv.labs.arxiv.org/html/1602.08354 | Actually the Hodge conjecture was introduced in 1950, its main goal is to establish a bridge between Algebraic Geometry and Differential Geometry. Hodge was inspired by Lefschetz’s theorems. This conj
The Tate Conjecture for Certain Abelian Varieties over Finite Fields | https://www.jmilne.org/math/articles/2001aP.pdf | In an earlier work, we showed that if the Hodge conjecture holds for all complex 
abelian varieties of CM-type, then the Tate conjecture holds for all abelian varieties 
over finite fields (Milne 1999
`-ADIC ALGEBRAIC MONODROMY GROUPS, ... | https://people.math.ethz.ch/ | Index of Personal Homepages | Department of Mathematics | ETH Zurich
Cycles in the de Rham cohomology of abelian varieties over number fields | https://www.cambridge.org/core/journals/compositio-mathematica/article/cycles-in-the-de-rham-cohomology-of-abelian-varieties-over-number-fields/EBE4850629696746B61FCF8FC3D97E96 | In his 1982 paper, Ogus defined a class of cycles in the de Rham cohomology of smooth proper varieties over number fields. This notion is a crystalline analogue of\$\ell\$ -adic Tate cycles. In the case
HPD-invariance of the Tate conjecture(s) | https://doi.org/10.4171/jncg/462 | where ks stands for a (chosen) separable closure of k, Gal.ks=k/ for the absolute Galois group of k, and Het. ; Ql/ WD .lim Het. ; Z= l // ˝ Zl Ql for l-adic cohomology. In the sixties, Tate [40, 41] 
[math/0603622] Tate Conjecture and Mixed Perverse Sheaves | https://ar5iv.labs.arxiv.org/html/math/0603622 | Using the theory of mixed perverse sheaves, we extend arguments on the Hodge conjecture initiated by Lefschetz and Griffiths to the case of the Tate conjecture, and show that the Tate conjecture for d
The abelian part of a compatible system and ℓ | https://arxiv.org/ | arXiv.org e-Print archive

## Physics

- Astrophysics (astro-ph new, recent, search) Astrophysics of Galaxies; Cosmology and Nongalactic Astrophysics; Earth and Planetary Astrophysics; High Energy Ast
===== s4 =====
The Picard group of aK3 surface and its reduction modulop | https://doi.org/10.2140/ant.2011.5.1027 | Andreas-Stephan Elsenhans (University of Bayreuth): h
...
Jörg Jahnel (University of Siegen):
...
We present a method to compute the geometric Picard rank of a K 3 surface over ‫.ޑ‬ Contrary to a wide
On the computation of the Picard group for K3 surfaces | https://doi.org/10.1017/s0305004111000326 | # 1. In this note, we will present a method to construct examples of K3 sur faces of geometric Picard rank 1. Our approach is a refinement of that of R. van Luijk [vL]. It is based on an analysis of t
The Picard group of a K3 surface and its reduction modulo p | https://msp.org/ant/2011/5-8/ant-v5-n8-p02-s.pdf | 201
...
#### The Picard group of a K3 surface and its reduction modulo p Andreas-Stephan Elsenhans and Jörg Jahnel
...
2011)
...
### The Picard group of a K3 surface and its reduction modulo p
...
And
On the computation of the Picard group for K3 surfaces | https://wwwuser.gwdguser.de/~jjahnel/Arbeiten/pic_dst_cam2a.pdf | On the computation of the Picard group for K3 surfaces By Andreas-Stephan Elsenhans ‡
...
The first explicit examples of K3 surfaces over Q with geometric Picard rank 1 were constructed by R. van Luij
On the computation of the Picard group for  K 3 surfaces | https://www.cambridge.org/core/journals/mathematical-proceedings-of-the-cambridge-philosophical-society/article/abs/on-the-computation-of-the-picard-group-for-k3-surfaces/E6C83B382A80D77D73FE78B74C05E77D | [ANDREAS-STEPHAN ELSENHANS](https://www.cambridge.org/core/search?filters[authorTerms]=ANDREAS-STEPHAN%20ELSENHANS&eventCode=SE-AU)and
[JÖRG JAHNEL](https://www.cambridge.org/core/search?filters[autho
On the computation of the Picard group for \$K3\$ surfaces | https://doi.org/10.48550/arxiv.1006.1724 | # On the computation of the Picard group for \$K3\$ surfaces
...
We construct examples of \$K3\$ surfaces of geometric Picard rank \$1\$. Our method is a refinement of that of R. van Luijk. It is based on a
K3 surfaces of Picard rank one and degree two | https://wwwuser.gwdguser.de/~jjahnel/Arbeiten/ants4.pdf | Abstract. We construct explicit examples of K3 surfaces over Q which are of degree 2 and geometric Picard rank 1. We construct, particularly, examples of the form w 2 = detM where M is a (3 × 3)-matri
K3 surfaces of Picard rank one which are double covers of the projective plane | https://math.nyu.edu/~tschinke/books/finite-fields/final/02_elsenhans.pdf | K3 surfaces of Picard rank one which are
...
the projective plane
...
Andreas-Stephan Elsenhans and J¨org Jahnel
...
Abstract. We construct examples of K3 surfaces over Q which are of
degree 2 and the
On the distribution of the Picard ranks of the reductions of a K3 surface | https://doi.org/10.1007/s40993-020-00204-2 | # On the distribution of the Picard ranks of the reductions of a K3 surface
...
- Edgar Costa (Massachusetts Institute of Technology): h-index 6; 178 citations
- Andreas-Stephan Elsenhans (University 
[1006.1724] On the computation of the Picard group for 𝐾⁢3 surfaces‡ | https://ar5iv.labs.arxiv.org/html/1006.1724 | by Andreas-Stephan Elsenhans∗ (Bayreuth) and Jörg Jahnel (Siegen) Fachbereich 6 Mathematik Universität Siegen Walter-Flex-Straße 3 D-57068 Siegen Germany Mathematisches Institut Universität Bayreuth D
Weil Polynomials of K3-Surfaces | https://antsmath.org/ANTSIX/slides/elsenhans.pdf | faces

Andreas-Stephan Elsenhans

University of Bayreuth

July 2010

joint work with J¨org Jahnel
...
Properties of K3 surfaces 
Betti numbers: 1, 0, 22, 0, 1 
Hodge diamond: 1 
0 0 
1 20 1 
0 0 
1 
P
 | https://arxiv.org/pdf/1006.1972 | The Picard group of a K3 surface and
...
its reduction modulo p
...
Andreas-Stephan Elsenhans and J¨org Jahnel
...
We present a method to compute the geometric Picard rank of a K3 surface
over Q. Cont
 | https://arxiv.org/pdf/1010.1923 | Andreas-Stephan Elsenhans∗ and J¨org Jahnel‡
...
We test the methods for computing the Picard group of a K3 surface in a
...
situation of high rank. The examples chosen are resolutions of quartics in 
On the computation of the Picard group for K3 surfaces | https://www.cambridge.org/ | potential with quali
...
cations, assessments,
...
publications and original
The Picard group of a \$K3\$ surface and its reduction modulo \$p\$ | https://doi.org/10.48550/arxiv.1006.1972 | - Andreas-Stephan Elsenhans (University of Bayreuth): h-index 11; 406 citations
- Jörg Jahnel (University of Siegen): h-index 23; 1,946 citations
...
Andreas-Stephan Elsenhans and J¨org Jahnel
...
We 
===== s5 =====
Computing Néron–Severi groups and cycle class groups | https://arxiv.org/ | - Computing Research Repository (CoRR new, recent, search) includes: (see detailed description): Artificial Intelligence; Computation and Language; Computational Complexity; Computational Engineering,
Computing Néron-Severi groups and cycle class groups | https://scholarlypublications.universiteitleiden.nl/access/item%3A2865265/view | ### Computing Néron-Severi groups and cycle class groups Poonen, B.; Testa, D.; Luijk, R.M. van
...
##### Citation Poonen, B., Testa, D., & Luijk, R. M. van. (2015). Computing Néron-Severi groups and 
MR3334893 - MathSciNet | https://mathscinet.ams.org/mathscinet/relay-station?mr=3334893 | Poonen, Bjorn; Testa, Damiano; van Luijk, Ronald
...
Computing Néron-Severi groups and cycle class groups.
...
Compos. Math. 151 (2015), no. 4, 713–734.
Computing Néron-Severi groups and cycle class groups - arXiv.gg | https://arxiv.gg/abs/1210.3720 | # Computing Néron-Severi groups and cycle class groups
...
Bjorn Poonen, Damiano Testa, Ronald van Luijk
...
Assuming the Tate conjecture and the computability of étale cohomology with finite coeffici
computing néron–severi groups and cycle class groups | https://math.mit.edu/ | MIT Mathematics skip to main content

## Latest News

- Department News Archive
- Mathematics in the MIT News

### James R. Munkres, Professor Emeritus of Mathematics, dies at 95

James R. Munkres pas
Computing Néron–Severi groups and cycle class groups | https://dspace.mit.edu/ | Access open research, scholarship, and institutional publications from MIT — peer-reviewed articles, theses and dissertations, technical reports, working papers, task force reports, annual reports, te
Computing Néron-Severi groups and cycle class groups - MaRDI portal | https://portal.mardi4nfdi.de/wiki/Item:Q5251377 | Computing Néron-Severi groups and cycle class groups
...
377
...
Computing Néron-Severi groups and cycle class groups
...
Computing Néron-Severi groups and cycle class groups
...
Computing Néron–Sever
Computing Néron–Severi groups and cycle class groups | https://sites.google.com/site/agneshomepage/yale-2013/bjorn-poonen-computing-n%C3%A9ron-severi-groups | AGNES Homepage - Bjorn Poonen: Computing Néron-Severi groups
...
# Bjorn Poonen: Computing Néron-Severi groups
...
If the Tate conjecture is true, and if étale cohomology with finite coefficients is c
[1902.02753] Bounds on the Torsion Subgroups of Néron–Severi Groups | https://ar5iv.labs.arxiv.org/html/1902.02753 | The torsion subgroup \$(\operatorname{NS}X)_{\mathrm{tor}}\$ is the group of numerically zero divisors modulo algebraic equivalence. This is a birational invariant [1, p. 177]. Recently, Poonen, Testa a
Computing the cohomology of constructible étale sheaves on curves | https://doi.org/10.48550/arxiv.2306.03283 | The computability of étale cohomology groups of torsion sheaves on schemes of finite type over algebraically closed fields was proved in 2014 by Poonen, Testa and van Luijk [PTv15, Th. 7 .9] in charac
Calculability of étale cohomology modulo - MaRDI portal | https://portal.mardi4nfdi.de/wiki/Calculability_of_%C3%A9tale_cohomology_modulo_%5C(%5Cell%5C) | Abstract: Let X be an algebraic scheme over an algebraically closed field and ell a prime number invertible on X
...
According to classical results (due essentially to A. Grothendieck, M. Artin and P.
Computation of étale cohomology on curves in single exponential time - MaRDI portal | https://portal.mardi4nfdi.de/wiki/Item:Q2211019 | Let \(X\) be a smooth connected curve over a field \(k\). Consider a finite locally constant sheaf \(A\) on \(X_{et}\) of abelian groups of torsion invertible in \(k\). Denote by \(p_a(X)\) the arithm
===== s6 =====
On a Hodge locus | https://doi.org/10.48550/arxiv.2211.11405 | There are many instances such that deformation space of the homology class of an al gebraic cycle as a Hodge cycle is larger than its deformation space as algebraic cycle. This phenomena can occur for
Hodge cycles for cubic hypersurfaces | https://doi.org/10.48550/arxiv.1902.00831 | We study an algebraic cycle of the form Z0 = rP
...
n 2 , r ∈ N, rˇ ∈ Z, 1 ≤ r, |rˇ| ≤ 10, gcd(r, rˇ) = 1, inside the cubic Fermat variety X0 of even dimension n ≥ 4 and with dim P
...
n 2 ∩ Pˇ n 2 = 
foliation.lib | https://github.com/movasati/NoetherLefschetz/blob/master/foliation.lib | LIBRARY: foliation.lib A library for computing Mixed Hodge structures, Gauss-Manin
 connections, Picard-Fuchs equations and modular foliations, Hodge cycles and 
 much more...
...
The procedure lcm, M
 | https://export.arxiv.org/pdf/2211.11405v2.pdf | There are many instances such that deformation space of the homology class of an algebraic cycle as a Hodge cycle is larger than its deformation space as algebraic cycle. This
...
phenomena can occur
[1902.00831] Hodge cycles for cubic hypersurfaces | https://arxiv.org/ | - Mathematics (math new, recent, search) includes: (see detailed description): Algebraic Geometry; Algebraic Topology; Analysis of PDEs; Category Theory; Classical Analysis and ODEs; Combinatorics; Co
On a conjecture on Hodge loci of linear combinations of linear subvarieties | https://doi.org/10.1007/s12215-025-01307-4 | For each k ≥ 5 we give a counterexample to a conjecture of Movasati on the dimension of certain Hodge loci of cubic hypersurfaces in P 2k+1 containing two k-planes intersecting in dimension k -3. We g
emresertoz/PeriodSuite | https://github.com/emresertoz/PeriodSuite | Software to compute periods of hypersurfaces, with additional functions to make use of computed periods (e.g. for Picard/Hodge group computation).
...
This is an implementation of the algorithm introd
On a conjecture on Hodge loci of linear combinations of linear subvarieties | https://doi.org/10.48550/arxiv.2312.12363 | For each k ≥ 5 we give a counterexample to a conjecture of Movasati on the dimension of certain Hodge loci of cubic hypersurfaces in P 2k+1 containing two k-planes intersecting in dimension k -3. We g
On a Hodge locus - arXiv.gg | https://arxiv.gg/abs/2211.11405 | Hossein Movasati
...
There are many instances such that deformation space of the homology class of an algebraic cycle as a Hodge cycle is larger than its deformation space as algebraic cycle. This phe
On reconstructing subvarieties from their periods | https://doi.org/10.1007/s12215-020-00562-x | We give a new practical method for computing subvarieties of projective hypersurfaces. By computing the periods of a given hypersurface X, we find algebraic cohomology cycles on X. On well picked alge
Hodge cycles for cubic hypersurfaces | https://www.alphaxiv.org/ | (TailRL), which maximizes the log-probability of exceeding a randomly chosen reward threshold. Its gradient gives more weight to rare, high-reward rollouts and can be interpreted as a mixture of Best-
On a conjecture on Hodge loci of linear combinations of linear subvarieties | Rendiconti del Circolo Matematico di Palermo Series 2 | Springer Nature Link | https://link.springer.com/article/10.1007/s12215-025-01307-4 | For each \(k \ge 5\) we give a counterexample to a conjecture of Movasati on the dimension of certain Hodge loci of cubic hypersurfaces in \(\textbf{P}^{2k+1}\) containing two k-planes intersecting in
On a Hodge locus - ADS | https://ui.adsabs.harvard.edu/ | The TIME columns of all the event lists of SXS, HXI, and SGD-1 were converted into a barycentric position using the "barycor" ftool in the hitomi package of HEAsoft 6.20 and the hitomi orbital file (T
On a conjecture on Hodge loci of linear combinations of linear subvarieties | https://arxiv.org/html/2312.12363v1 | For each \$k\geq 5\$ we give a counterexample to a conjecture of Movasati on the dimension of certain Hodge loci of cubic hypersurfaces in \$\mathbf{P}^{2k+1}\$ containing two \$k\$ -planes intersecting in 
Hodge cycles for cubic hypersurfaces. | https://www.semanticscholar.org/ | # Semantic Scholar

0 citations.

## Topics

- Digital Humanities and Scholarship
- Ethics and Social Impacts of AI
- Computational and Text Analysis Methods
===== s7 =====
Transcendental obstructions to weak approximation on general K3 surfaces | https://doi.org/10.1016/j.aim.2011.06.017 | TRANSCENDENTAL OBSTRUCTIONS TO WEAK APPROXIMATION ON GENERAL K3 SURFACES
...
BRENDAN HASSETT, ANTHONY VARILLY-ALVARADO, AND PATRICK VARILLY ´
...
Abstract. We construct an explicit K3 surface over the
Failure of the Hasse principle on general surfaces | https://doi.org/10.1017/s1474748012000904 | Abstract We show that transcendental elements of the Brauer group of an algebraic surface can obstruct the Hasse principle. We construct a general \$K 3\$ surface \$X\$ of degree \$2\$ over \$ \mathbb{Q} \$ ,
Transcendental obstructions to weak approximation on general K3 surfaces | https://doi.org/10.48550/arxiv.1005.1879 | # Transcendental obstructions to weak approximation on general K3 surfaces
...
We construct an explicit K3 surface over the field of rational numbers that has geometric Picard rank one, and for which 
Odd order obstructions to the Hasse principle on general K3 surfaces | https://doi.org/10.1090/mcom/3485 | Abstract. We show that odd order transcendental elements of the Brauer group of a K3 surface can obstruct the Hasse principle. We exhibit a general K3 surface Y of degree 2 over Q together with a thre
Good reduction of K3 surfaces | Compositio Mathematica | Cambridge Core | https://www.cambridge.org/core/journals/compositio-mathematica/article/good-reduction-of-k3-surfaces/9296E569F340B0BA56C0293FF6F5CCB3 | Let\$K\$ be the field of fractions of a local Henselian discrete valuation ring\${\mathcal{O}}_{K}\$ of characteristic zero with perfect residue field\$k\$ . Assuming potential semi-stable reduction, we sho
[1005.1879] Transcendental obstructions to weak approximation on general K3 surfaces | https://ar5iv.labs.arxiv.org/html/1005.1879 | [1005.1879] Transcendental obstructions to weak approximation on general K3 surfaces
...
Brendan Hassett Department of Mathematics, Rice University, Houston, TX 77005, USA hassett@rice.edu http://www.
Failure of the Hasse principle on general K3 surfaces | https://doi.org/10.48550/arxiv.1110.1738 | Abstract. We show that transcendental elements of the Brauer group of an algebraic surface can obstruct the Hasse principle. We construct a general K3 surface X of degree 2 over Q, together with a two
[1701.02945] A Néron–Ogg–Shafarevich Criterion for K3 Surfaces | https://ar5iv.labs.arxiv.org/html/1701.02945 | The naive analogue of the Néron–Ogg–Shafarevich criterion is false for K3 surfaces, that is, there exist K3 surfaces over Henselian, discretely valued fields \$K\$ , with unramified \$\ell\$ -adic étale c
Failure of the Hasse principle on general  \$K 3\$  surfaces | https://www.cambridge.org/core/journals/journal-of-the-institute-of-mathematics-of-jussieu/article/abs/failure-of-the-hasse-principle-on-general-k-3-surfaces/73A5F034715D74BD610ACCA469FDC484 | We show that transcendental elements of the Brauer group of an algebraic surface can obstruct the Hasse principle. We construct a general![](https://static.cambridge.org/binary/version/id/urn:cambridg
[1110.1738] Failure of the Hasse principle on general K3 surfaces | https://ar5iv.labs.arxiv.org/html/1110.1738 | Brendan Hassett Department of Mathematics, Rice University, Houston, TX 77005, USA hassett@rice.edu http://www.math.rice.edu/~hassett and Anthony Várilly-Alvarado Department of Mathematics, Rice Unive
FAILURE OF THE HASSE PRINCIPLE ON GENERAL K3 ... | https://www.math.brown.edu/ | The Department of Mathematics
...
Brown offers a dynamic environment that
...
excellence and a
...
The Department of Mathematics at Brown offers a dynamic environment that fosters academic excellence 
Mathematics of Computation | https://www.ams.org/journals/mcom/2020-89-323/S0025-5718-2019-03485-3/ | ## Odd order obstructions to the Hasse principle on general K3 surfaces
...
We show that odd order transcendental elements of the Brauer group of a K3 surface can obstruct the Hasse principle. We exhi
===== s8 =====
The Hodge conjecture and the Tate conjecture for fermat varieties | https://doi.org/10.3792/pjaa.55.111 | # The Hodge conjecture and the Tate conjecture for fermat varieties
...
# The Hodge Conjecture and the Tare Conjecture or Fermat Varieties
...
Throughout the paper, X(p) will denote the Fermat variety
Cycles on Fermat hypersurfaces | https://www.numdam.org/item/CM_1980__42_1_121_0/ | Cycles on Fermat hypersurfaces 

 Cycles on Fermat hypersurfaces 

 Ran, Ziv 

```
@article{CM_1980__42_1_121_0,
     author = {Ran, Ziv},
     title = {Cycles on {Fermat} hypersurfaces},
     journal
Special Values of Zeta-Functions of Fermat Varieties over Finite Fields | Springer Nature Link | https://link.springer.com/chapter/10.1007/978-1-4757-4158-2_13 | Special values of the zeta-functions of Fermat varieties over finite fields at integral arguments are computed. Guided by a series of conjectures by Lichtenbaum and Milne, and by Shioda, arithmetical 
 | https://projecteuclid.org/journalArticle/Download?urlid=10.2748%2Ftmj%2F1178229881 | The purpose of this paper is to clarify the "inductive structure" of
...
Fermat varieties of a common degree and of various dimensions, and apply
it to the questions concerning the unirationality and 
Notes on the Hodge conjecture for Fermat varieties | https://doi.org/10.1017/exp.2021.14 | # Notes on the Hodge conjecture for Fermat varieties
...
Abstract We review a combinatoric approach to the Hodge conjecture for Fermat varieties and announce new cases where the conjecture is true. We
Integral Hodge conjecture for Fermat varieties | https://www.sciencedirect.com/science/article/pii/S0747717119300173 | We describe an algorithm which verifies whether linear algebraic cycles of the Fermat variety generate the[lattice](https://www.sciencedirect.com/topics/mathematics/lattices)of Hodge cycles. A compute
The zeta function of forms of Fermat equations | https://doi.org/10.1142/9789812561800_0012 | We study "forms of the Fermat equation" over an arbitrary field k, i.e. homogenous equations of degree m in n unknowns that can be transformed into the Fermat equation X m 1 +. ..+X m n by a suitable 
Cycle conjectures and birational invariants over finite fields | https://doi.org/10.48550/arxiv.2406.14438 | We study a natural birational invariant for varieties over finite fields and show that its vanishing on projective space is equivalent to the Tate conjecture, the Beilinson conjecture, and the Grothen
On fake linear cycles inside Fermat varieties | https://doi.org/10.2140/ant.2023.17.1847 | We introduce a new class of Hodge cycles with nonreduced associated Hodge loci; we call them fake linear cycles. We characterize them for all Fermat varieties and show that they exist only for degrees
How does Tate verify his own conjecture for the Fermat hypersurface? | https://mathoverflow.net/questions/64866/how-does-tate-verify-his-own-conjecture-for-the-fermat-hypersurface | This question is about Tate's 1963 paper "Algebraic Cycles and Poles of Zeta Functions". Here he announces a conjecture (now known as "the Tate conjecture") which states that certain classes in the co
Effective Obstruction to Lifting Tate Classes from Positive Characteristic | https://doi.org/10.1007/978-3-030-80914-0_9 | Abstract. We give an algorithm that takes a smooth hypersurface over a number field and computes a p-adic approximation of the obstruction map on the Tate classes of a finite reduction. This gives an 
Small codimension components of the Hodge locus containing the Fermat variety | https://doi.org/10.1142/s021919972150053x | We characterize the smallest codimension components of the Hodge locus of smooth degree d hypersurfaces of the projective space P n+1 of even dimension n, passing through the Fermat variety (with d 6 


[exit code: 0]