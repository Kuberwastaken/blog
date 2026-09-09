---
title: "target scout: combinatorics (chat-01M20M7DP)"
---

_1 transcript files aggregated._

One-hour research sprint (report back by 8:10pm IST sharp - partial findings beat late completeness). Handle Kuber's direction from the conversation: find the next counterexample-hunt target now that the Hodge route is theorem-closed.

Your beat: combinatorics, graph theory, Ramsey theory, extremal problems, combinatorial designs.

Score every candidate against Kuber's four filters, all four mandatory:
1. A NAMED conjecture people actually care about (has a Wikipedia page, a survey, a history - not an exercise).
2. The counterexample, if it exists, is a FINITE object you can hold up (a graph, a coloring, a matrix, a design) - not an asymptotic argument.
3. NO meta-theorem capping the search (the Deligne lesson: for abelian varieties every Hodge class is motivated, so no realization-level computation could ever certify non-algebraicity - we spent weeks before learning this. Check FIRST whether any theorem structure makes counterexamples impossible to exhibit or certify computationally).
4. Cheap, public, independent verification - anyone can check the certificate in seconds-to-hours on a laptop.

Precedent bar: Mertens (Odlyzko-te Riele), Euler sum-of-powers (direct search), Wagner's RL graph-theory counterexamples, FunSearch. The bar has moved since those: the conjecture needs a name and the find must be checkable.

For each serious candidate report: the conjecture statement in two lines; who conjectured it and why it's cared about; current status (verified up to what bound/size); why a counterexample is plausible (heuristics, known near-misses, where the verified frontier sits vs where counterexamples could live); what the search space looks like (object class, size where counterexamples might first appear, feasibility of SAT/CP/ILP/ML-guided search); exactly what the certificate would be and its verification cost; and your filter-3 audit (why no meta-theorem blocks this).

Give me a ranked top-3 with a clear #1 pick and the reasoning. Be honest about which famous candidates FAIL the filters (say why in one line each). Depth over breadth: a strong #1 with real search-space detail beats ten sketches.

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
I'm a task agent, woken at 7:14:54 PM with a research sprint, report back by 8:10 PM IST sharp. The wake delivery note says the agent_message was delivered with 2191.7s delay (~36 min). Current time is unclear - the internal_message with injected help is timestamped 7:51:27 PM. So I have about 19 minutes until 8:10.

I need to do a fast research sprint on combinatorics/graph theory/Ramsey/extremal/design conjectures suitable for a counterexample hunt. Score against the four filters. Ranked top-3 with a clear #1.

Let me think about what I know and do a couple of quick web searches to ground key facts (current verification frontiers can be stale). Time is tight — maybe 2-3 searches, then write the report.

Candidates to consider:

1. **Hadwiger's conjecture** - every graph with no K_t minor is (t-1)-colorable. Counterexample would be a finite graph. Verified for t ≤ 6. Counterexamples plausible? Most believe it's true. Search space huge. Certificate: a graph + claim no K_t minor + chromatic number ≥ t. Verifying no K_t minor is hard (checking all minors is expensive but K_t minor test for fixed t is poly; certificate of chromatic ≥ t needs SAT proof - DRAT cert, could be big but checkable). Actually Wagner... The filter-4 verification is doable via SAT/DRAT. But plausibility low-ish, search frontier unclear.

2. **Hedetniemi's conjecture** (tensor product coloring) - already refuted by Shitov (2019) with huge graphs. Done.

3. **Ramsey number R(5,5)** - conjectured value 43-48. Counterexample to "R(5,5)=43" would be a 2-coloring of K_42 with no mono K_5. Known: 43 ≤ R(5,5) ≤ 46 (current bounds as of recent years; there were improvements to 46 in 2024 by Angeltveit-McKay). The certificate: an explicit edge 2-coloring of K_n, checkable in seconds. Named, cared about, finite object, no meta-theorem caps it. Search space: 2^(903) for n=42 - need SAT-guided/ML search. This is a strong candidate. Lower bound improvements are "constructions" - a counterexample to the conjectured upper bound.

4. **Hadamard conjecture** - Hadamard matrix of order 4k exists for all k. Counterexample: prove no H-matrix of order n for some n - that's a non-existence proof, not a finite object you hold up... actually the counterexample direction is bad: conjecture says existence; counterexample = a 4k for which none exists = needs exhaustive search certificate (DRAT unsat proof - checkable but big). Less clean.

5. **Graceful tree conjecture / Ringel-Kotzig** - every tree is graceful. Counterexample: a tree with no graceful labeling. Verification: enumerate labelings of that tree - polynomial per tree? Graceful labeling verification for a fixed tree requires checking n! labelings - needs exhaustive cert (SAT unsat). Hmm, not "seconds" but feasible for small trees. Trees up to ~35 vertices verified graceful. Counterexample plausible? Widely believed true.

6. **Erdős conjecture on arithmetic progressions** - not finite.

7. **Collatz** - finite counterexample would be a divergent trajectory (not certifiable) or a cycle (finite! checkable in seconds). Collatz cycle: any nontrivial cycle is a finite certificate. Named conjecture, no meta-theorem cap, cheap verification. Search: verified to ~2^68 or higher (as of 2020s, ~2^71). Plausibility: extremely low. But certificate perfection. Might mention but plausibility is near zero. Filter pass though. It's a fine candidate to mention honestly.

8. **Borsuk's conjecture** - already disproved (Kahn-Kalai). 

9. **Hadwiger–Nelson?** chromatic number of plane - not a yes/no conjecture with finite counterexample easily... A finite unit-distance graph with chromatic number k is a finite object. De Grey found 5-chromatic (1581 vertices, now ~509). The "conjecture" is that chromatic number of plane ≤ ... it's an open problem not conjecture per se. Finding a 6-chromatic unit-distance graph would be huge. It's not exactly a named conjecture but the problem is famous. Certificate: the graph + 6-chromaticity needs SAT unsat proof for 5-coloring + explicit 6-coloring. Doable. Plausibility: moderate-decent! Many believe CNP could be 6 or 7. Good candidate.

10. **Erdős–Faber–Lovász** - proved (2021, Kang et al. for large n). Done.

11. **Ringel's conjecture** - proved (2020, Montgomery et al. large n; Keevash-Staden full). Done.

12. **Caccetta-Häggkvist conjecture** - digraph with min outdegree ≥ n/k has directed girth ≤ k. Counterexample finite digraph. k=3 the famous case. Verification: check outdegrees (easy) + girth (easy, poly). Certificate very cheap! Search space: digraphs with outdegree ≥ n/3 and no triangles/short cycles. Plausibility: many believe true, but it's open for all k with minimal progress. Verified for small n. Counterexample would be a finite digraph - extremely checkable (seconds). Named conjecture, people care. Filter-3: no meta-theorem cap. Strong candidate.

13. **Erdős–Gyárfás conjecture** - every graph with min degree 3 has a cycle of length a power of 2. Counterexample: finite graph, check cycle lengths - verification poly-time (find all cycle lengths is exponential in principle but for a specific graph, checkable via... counting cycles of each length is #P-ish but for small graphs fine). Actually verifying "no 2^k cycle" for a graph of size ~100 requires enumerating simple cycles - could be expensive but certificate could be a SAT proof. Plausible? Many believe true. Mention.

14. **Sheehan's conjecture** - every 4-regular Hamiltonian graph has a second Hamiltonian cycle. Counterexample: 4-regular graph with exactly one Hamiltonian cycle. Verification: Hamiltonian cycle count requires exhaustive enumeration - expensive but for smallish graphs feasible with a verifiable search (certified enumeration). Counterexamples known for r-regular? For r=4 open... Actually it's known for bipartite etc. Smith's theorem covers even-degree... Thomason showed ≥2 for degrees... Sheehan open. Plausibility moderate-low. Could mention.

15. **Ryser's conjecture** - r-partite hypergraph: τ ≤ (r-1)ν. Counterexample finite hypergraph. Open for r ≥ 4. Verification cheap-ish (compute τ and ν is NP-hard for fixed small r though; for small objects certifiable). Plausibility: many doubt for large r. Candidate.

16. **Alon–Saks–Seymour conjecture** - disproved already (Huang-Sudakov 2011). Done.

17. **Babai/...** skip.

18. **Petersen coloring conjecture** (Jaeger) - every bridgeless cubic graph has a Petersen coloring. Counterexample: bridgeless cubic graph + SAT proof of no coloring. Named-ish (Jaeger's conjecture). Plausibility believed true.

19. **Cycle double cover conjecture** - every bridgeless graph has a family of cycles covering each edge twice. Counterexample: bridgeless graph with no CDC. Verified for small graphs / snarks (checked up to ~36-40 vertices). Verification: certificate of no CDC is hard (exponential families) - needs CP/SAT encoding of CDC existence. For a fixed graph, CDC existence can be checked via ILP/CP with certificate (unsat proof). Plausibility: widely believed true, but it's a classic famous open conjecture (Szekeres, Seymour). Counterexample must be a snark; snarks enumerated to order ~36. Search via SAT on generated snarks. This is a solid candidate - famous, finite, no meta-cap, verification via solvers (not "seconds" but "hours", acceptable per filter 4 "seconds-to-hours").

20. **Tutte's 3-flow / 4-flow / 5-flow conjectures** - finite counterexamples would be graphs; flow existence checkable via poly-time? A nowhere-zero 5-flow existence: for a fixed graph, checkable in exponential time but small graphs fine with certificates. 5-flow conjecture (Tutte) widely believed true; 3-flow and 4-flow imply hard things. Counterexample to 5-flow must be a snark-ish cubic graph... Verification: existence of nowhere-zero 5-flow is NP-complete in general; certificate = unsat proof. OK.

21. **Reconstruction conjecture** - counterexample: two non-isomorphic graphs with same deck. Verified up to 13 vertices (McKay). Plausibility: many doubt! Verification: check decks equal (poly) + non-isomorphic (easy for small). Certificate: two graphs + deck comparison - checkable in seconds-minutes for the size where it'd first appear (≥ 14 vertices). Search space: pairs of graphs - huge, but structure-guided. This is a genuinely good candidate: famous, finite, cheap verification, real plausibility of falsity (many experts suspect it's false), no meta-theorem. Strong #2 or #3.

22. **Kelly-Ulam / digraph reconstruction?** less famous.

23. **Graph minors / Erdős–Pósa?** no.

24. **Sidon sets / Erdős–Turán** asymptotic, no.

25. **Lonely runner conjecture** - k runners: counterexample is finite vector of speeds. Verified for k ≤ 7. Counterexample for k=8: finite set of speeds - but speeds real... rationals suffice; certificate: a finite set of integer speeds, checkable by finite verification? Verification of a lonely-runner counterexample: need max over time of min distance < 1/(k+1) - it's a finite check per speed vector? Time continuous but piecewise; actually checkable exactly via critical times. Certificate feasible. Plausibility believed true. Mention as sketch.

26. **Zarankiewicz / Turán numbers** - lower bound constructions are finite objects! E.g., known conjectured values for small Turán numbers, Ramsey numbers - "conjecture" status weaker. Ramsey R(5,5) is the flagship here.

27. **Crossing number conjectures** - Guy's conjecture on crossing number of complete graphs; Hill's conjecture. Counterexample: a drawing of K_n with fewer crossings than the conjectured formula - a drawing is a finite object (rotation system), verifiable in poly time (count crossings from rotation system - minutes). Hill's conjecture: cr(K_n) = Z(n), verified for n ≤ 12 (n=13,14 with conditions). A drawing of K_13 with fewer than Z(13)=225 crossings... wait Z(13) = 225. Finding fewer would refute. Known good drawings match conjecture for n ≤ 12. Plausibility: drawing-based constructions stuck at conjectured value for decades... but Ábrego et al. conjectured it's true for all n? Actually people found the conjectured-optimal drawings; whether below exists unknown. It's considered plausible that cr(K_n) < Z(n) for large n? I recall the conjecture is widely believed but there's skepticism too. Certificate beautiful: rotation system → crossing count, seconds. Strong candidate!

Similarly **rectilinear crossing number** vs Zarankiewicz for K_{m,n} (Turán's brick factory problem) - a drawing of K_{m,n} with fewer than Zarankiewicz crossings = finite certificate. Verified small cases. Plausibility: Zarankiewicz conjecture believed? Many believe true. Hmm.

28. **Graham's conjecture / pebbling?** niche.

29. **Seymour's second neighborhood conjecture** - every oriented graph has a vertex whose second out-neighborhood ≥ out-neighborhood. Counterexample: finite digraph, verification in seconds! Famous-ish (Seymour). Verified for tournaments up to certain size and special classes. Plausibility: believed true but open since 1990s. Verification: compute out-neighborhoods - trivially cheap for any reasonable size. Filter-4 perfect. Filter-1: it has a name and literature (Dean's conjecture for tournaments). Decent candidate.

30. **Sumner's conjecture** - tournaments contain every oriented tree of order n (2n-1 tournament). Proved for large n (Kühn-Mycroft-Osthus). Small cases finite - mostly resolved.

31. **Erdős–Hajnal conjecture** - asymptotic/structural, counterexample would be infinite family - fails filter 2 partially.

32. **Hoffman-Singleton related** - Moore graphs: existence of Moore graph of diameter 2 degree 57! Famous open problem (Hoffman-Singleton 1960). The conjecture... it's "does a 57-regular Moore graph exist?" - existence question, counterexample direction wrong (non-existence is not a finite object). But finding the graph would be massive. Not a named "conjecture" though; it's "the missing Moore graph". Filter-1 shaky. Skip or one-liner.

33. **Conference matrices / Hadamard** - same issue.

34. **Steinhaus-Moser?** no.

35. **Barnette's conjecture** - every 3-connected cubic bipartite planar graph is Hamiltonian. Counterexample: finite graph (must be huge? Tutte... verified up to ~90 vertices by Brinkmann-Goedgebeur-McKay). Verification: non-Hamiltonicity certificate - needs exhaustive (unsat) proof; the graph itself checkable for the degree/connectivity properties in seconds; the non-Hamiltonicity via SAT DRAT could be big but checkable in hours. Plausibility: believed true. Mention.

36. **Tait's conjecture** - already disproved historically (Tutte). Precedent actually.

37. **Grünbaum?** skip.

38. **The "no perfect cuboid"** - number theory lane, not mine. Euler brick - perfect cuboid existence. Finite object if found (three integers), seconds to verify! But it's number theory (sibling's beat). Maybe mention cross-over.

39. **Erdős distinct distances?** asymptotic.

40. **Unit distance / chromatic number of plane** covered above (Hadwiger-Nelson).

41. **Lehmer's totient?** number theory.

42. **Ore's conjecture?** done.

43. **1-2-3 conjecture** - mostly proved? open in parts.

44. **Total coloring conjecture (Behzad-Vizing)** - χ'' ≤ Δ+2. Counterexample: graph needing Δ+3 colors. Famous (1960s, Wikipedia page). Verified for many classes. Verification: certificate of total chromatic number ≥ Δ+3 - SAT unsat proof, checkable in hours; graph small. Plausibility: believed true by most. But counterexamples would be sensational. Candidate - decent.

45. **List coloring conjecture** (edge list chromatic = chromatic index). Galvin proved bipartite. Open in general. Counterexample finite. Famous. Verification: list-chromatic index certificate - hard to verify (list coloring existence over all lists is Π2 - not a single SAT cert! "for every list assignment" - that's the killer. List chromatic number verification is Π2^p-complete - NOT cheaply certifiable. Fails filter 4 unless small). Flag filter-4 issue. Good honest mention.

46. **Alon-Tarsi?** no.

47. **Ramsey: R(5,5)** covered. Also **R(3,10)**, small Ramsey numbers with conjectured exact values - weaker "conjecture" status. The famous one: Erdős's offer on R(5,5). Lower-bound construction = counterexample to upper-bound conjectures. But strictly, "R(5,5) = 43" isn't a universally held conjecture... Radziszowski surveys conjecture R(5,5) ∈ {43,...,46}; some conjecture 43. A 2-coloring of K_43 avoiding mono K_5 would raise lower bound to 44, refuting "R(5,5)=43". Named-ish. Actually there IS a long-standing conjecture that R(5,5)=43? The dynamic survey says "it is commonly conjectured that R(5,5)=43"? I believe the conjectured value is 43 per Radziszowski. Good.

48. **Van der Waerden / Szemerédi** asymptotic.

49. **Erdős–Ginzburg–Ziv variants** no.

50. **The Harborth conjecture** - every planar graph has a planar straight-line embedding with integer edge lengths. Counterexample: planar graph with no rational-distance embedding - verification of non-existence is not finite-certifiable easily. Fail filter 4. Skip.

51. **Fáry–Milnor?** topology.

52. **Unknotting?** no.

53. **Snevily's conjecture** - abelian group / Latin transversal: any k×k submatrix of the Cayley table of odd cyclic group has a transversal. Counterexample: finite explicit submatrix - verifiable in seconds (enumerate permutations k!). Famous-ish (Snevily 1999), related to Ryser. Verified for small orders. Plausibility: believed true (Alon, Dasgupta et al. partial results). Verification cheap for small k. Candidate - medium.

54. **Ryser-Brualdi-Stein conjecture** - every Latin square of order n has a transversal of size n-1 (and n if odd). Counterexample: a Latin square with no near-full transversal. Verification: SAT proof for transversal absence; Latin square explicit. Famous (Ryser 1967). Verification: for n maybe ~30-40, transversal search via CP with proof. Plausibility: believed true; Park et al. recent progress 2024 (near-complete transversals proved - actually 2024 result: every Latin square has transversal of size n - O(log n / loglog n)? Park-Pham proved n-o(n)). Hmm, believed true strongly now. Mention.

55. **Erdős–Moser equation** number theory.

56. **Graceful tree conjecture** covered - famous (Ringel-Kotzig), trees verified graceful up to 35 vertices (and all trees ≤ 4 leaves, caterpillars, lobsters <4...). Verification of non-gracefulness: enumerate labelings - for a tree on n vertices, n! labelings... with symmetry ~n!/aut - for n=40 that's huge; SAT proof needed, feasible? Graceful labeling as SAT with alldifferent - proof could be hard. Medium.

57. **The union-closed sets conjecture** (Frankl) - counterexample: finite union-closed family where every element appears in < half the sets. FINITE object! Verification: enumerate family, compute frequencies - SECONDS. Famous (Frankl, Wikipedia page, tons of attention, Polymath, Gilmer's recent 2022 progress toward constant). Plausibility: recent progress suggests true, but counterexample search still live. Verified computationally for families on small universes (up to ~12 elements?). Search space: union-closed families on [n] - huge but SAT/CP encodable, ML-guidable. This is a VERY strong candidate: famous, finite, seconds verification, no meta-theorem, active area. Where's the frontier? Brute-force verified Frankl's conjecture for families with universe size up to ~11-12. Gilmer proved constant ~0.01 density exists. Counterexample must have universe ≥ 13ish. SAT-guided search for union-closed families with all frequencies < m/2. Strong #1 or #2.

Hmm wait - is the conjecture "there exists an element in ≥ half the sets". Counterexample = family where max frequency < half. Yes finite.

58. **The sunflower conjecture** - asymptotic bounds; counterexample would need family - but it's about bounds w > C(log...)... Erdős-Rado sunflower conjecture: w-petal sunflower-free family size ≤ (Cw)^w. Counterexample would be finite family beating bound for some w - plausible? Recent progress (Alweiss et al.) suggests the conjectured form maybe true-ish. Verification: sunflower-free check - enumerate triples - cheap for moderate size. But conjecture asymptotic-constant-ish; a single finite family beating (Cw)^w for small w doesn't refute asymptotic... actually the conjecture states for all w, r: family without r-sunflower has size ≤ K^w where K depends only on r. A finite counterexample for specific w,r with |F| > K^w for the conjectured K... K unspecified constant - fails "hold up" cleanness. Skip.

59. **Middle levels conjecture** - proved (Mütze 2016).

60. **Erdős–Straus** - number theory, 4/n = 1/x+1/y+1/z: counterexample is a single n with no solution - verification = search over x,y,z bounded ~ doable? For given n, solutions bounded; exhaustive check feasible (n^2-ish search). Number theory lane though - sibling.

61. **Graph theory: Vizing's planar?** done.

62. **The Dinitz?** done (Galvin).

63. **Schanuel?** no.

64. **De Bruijn–Erdős (near-pencil)** - proved.

65. **Kneser?** proved.

66. **The "tree packing conjecture"** (Gyárfás-Lehel): K_n decomposes into trees T_2,...,T_n. Counterexample: an n with no packing - verification = SAT proof of non-decomposition. Verified for small n. Plausibility: believed true, partial results (Joos et al. approximate). Medium candidate.

67. **Lovász conjecture on Hamilton paths in vertex-transitive graphs** - every connected vertex-transitive graph has a Hamilton path. Counterexample: finite VT graph with no Hamilton path. Famous (Lovász 1969). Verification: non-Hamilton-path certificate - SAT unsat, feasible for moderate graphs; graph checkable in seconds. Plausibility: believed true, but only 5 non-Hamiltonian VT graphs known (all have Hamilton paths). Search: census of VT graphs exists up to ~47 vertices (or more). Counterexample would be huge news. Candidate - decent.

68. **Caccetta-Häggkvist** covered - strong.

69. **Bermond-Thomassen conjecture** - digraph min outdegree ≥ 2k-1 has k vertex-disjoint cycles. Finite digraph, verification: certifying no k disjoint cycles - k=2 case open? Actually k=2 solved? No - Bermond-Thomassen k=2 case... I think k≤3 resolved? Thomassen proved min outdegree ≥ 3 suffices for 2 disjoint cycles (B-T says 3 for k=2). Resolved for k=2. k=3: outdegree 5 → 3 disjoint cycles, open. Verification of "no 3 disjoint cycles" - could certify via structure. Medium.

70. **Woodall's conjecture** - in digraph, dicut... related to Lucchesi-Younger: every digraph with minimum dicut size τ has τ disjoint dijoins. Open; counterexample finite. Niche.

OK. Also **Ramsey: triangle-free process / R(3,t)** asymptotic no.

**Erdős–Sós conjecture** - proved for large n (Ajtai-Komlós-Simonovits-Szemerédi, announced). Done-ish.

**Sidorenko's conjecture** - asymptotic density, counterexample would be a single graph G and bipartite H with t(H,G) below bound - finite-ish (H and G explicit)! Verification: count homomorphisms - computable in poly time for fixed H! Sidorenko: t(H,G) ≥ t(K2,G)^e(H) for bipartite H. Counterexample = explicit H and G. Verification: brute-force homomorphism counting - poly for fixed sizes, could take hours for big G but doable exactly via combinatorial formulas. Famous conjecture (Erdős-Simonovits, Sidorenko). Plausibility: believed true, many partial results. Hmm, hom counting for a large G is exact but expensive; "hours" acceptable? Maybe mention.

**Borsuk number?** done.

**Ziegler?** no.

**Hadwiger's conjecture** covered.

**The "unfriendly partitions"?** no.

**Erdős–Hajnal?** no.

**Sauer–Shelah?** no.

**The polynomial method?** no.

Designs: **Existence of Steiner systems / Kirkman** - mostly solved (Keevash, Glock et al.). **Hadamard** covered. **Projective plane of order 12** - famous! Non-existence conjecture? Actually the conjecture is only prime-power orders exist (conjectured). Projective plane of order 12: existence unknown. A projective plane of order 12 = finite object (157 points, incidence structure), verification of existence = seconds (check axioms). But finding it is the hard direction - exhaustive searches failed for order 10 (Lam's proof - no plane of order 10, itself a computational precedent!). For order 12, search space astronomically beyond current. The "conjecture" (no plane of non-prime-power order) - counterexample = the plane itself. Verification cheap. Plausibility: very low. It's a famous target though. Lam's order-10 result is exactly the genre precedent. Could mention as "moonshot".

**Mutually orthogonal Latin squares (Euler's 36 officers / Euler's conjecture)** - disproved historically (Bose-Shrikhande-Parker). Precedent!

**Prime-power conjecture for projective planes** covered above.

OK. So top tier by my assessment:

**#1 Union-closed sets (Frankl's conjecture)** - hmm, but Gilmer's result (constant ~0.01) plus subsequent improvements (to ~0.4? - improved by Chase-Lovett etc. toward (3-√5)/2≈0.38 barrier) suggest strong truth. But counterexample hunt still legitimate; and verification seconds. Actually wait - I should think about which has best "counterexample plausibility". Frankl: most believe true. Verification frontier: brute force verified for |universe| ≤ 12ish. Search above needs cleverness. ML/RL-guided (Wagner-style) could explore families on n=13-20. Feasibility decent.

**Reconstruction conjecture** - many experts genuinely doubt. Verified up to 13 vertices (McKay 2013ish?). Counterexample ≥ 13... wait verified up to 13 means counterexample ≥ 14. Search: pairs of hypomorphic graphs. Construction techniques exist for near-misses (there are "almost reconstructible" families). Verification: deck equality + non-isomorphism - trivial for 14-20 vertex graphs. The catch: how to search the pair space - need clever generation (e.g., switchings, P-graphs...). RL/SAT guided plausible. I recall known results: reconstruction conjecture verified for graphs up to 13 vertices (McKay). Some infinite families of digraphs counterexamples exist for digraphs (Stockmeyer) - but the graph case open. Strong plausibility case: many think it's false.

**Caccetta-Häggkvist** - k=3: counterexample would be digraph min outdegree ≥ n/3, girth ≥ 4 (triangle-free). Verified for small n. Most believe true but proofs stuck; Sullivan's survey. Verification of counterexample: check min outdegree (O(n^2)) + triangle-free (O(n^ω)) - seconds. Search: triangle-free digraphs with high outdegree - structured (blow-ups of C4... known extremal examples). Could do SAT/ILP-guided. Plausibility moderate-low (believed true).

**Cycle double cover / snarks** - counterexample must be a snark; census of snarks complete to order 36 (or 38?). All small snarks have CDC (checked to ~36). Believed true (implied by 5-cycle-double-cover... actually CDC implied by Tutte 5-flow? No - 5-flow conjecture implies CDC for cubic... CDC implied by the 5-flow conjecture restricted... A nowhere-zero 5-flow doesn't give CDC; the strong embedding conjecture implies CDC). Filter-4 for CDC non-existence is unsat-cert - fine. Believed true though.

**Hill's conjecture (crossing number of K_n)** - conjectured formula Z(n). Verified n ≤ 12 exactly; known drawings achieve Z(n) for all n, so cr ≤ Z(n). Counterexample = drawing of K_n with < Z(n) crossings. Verification: rotation system → crossing count, trivially cheap. Search: optimize drawings - RL/local search amenable! This is genuinely FunSearch-shaped: search over drawings/rotation systems. Plausibility: mixed opinions; some suspect strictly better drawings for large n (for rectilinear crossing number it's known rectilinear > general eventually... for general cr(K_n), conjecture open; many believe true but the analogous Zarankiewicz for K_{m,n} - believed mostly). Search feasibility: crossing-minimal drawings found by heuristics historically; if a better drawing exists at n=13 (Z(13)=225), heuristics would likely have found it... They run crossing minimization heuristics routinely. Known: best drawings match Z(n). RL could beat it - genuinely uncertain. Good candidate.

**Hadwiger-Nelson 6-chromatic unit-distance graph** - active program (Polymath 16). Finding 6-chromatic UDG = big news. Not exactly "named conjecture" but famous problem; "the conjecture that CNP = 5" isn't a standard conjecture (de Grey showed ≥5; upper bound 7). No named conjecture to disprove - fails filter 1 as phrased, unless framed as "there is no 6-chromatic UDG" which nobody conjectured. Mention as adjacent.

**Seymour's second neighborhood** - verification trivial, fame medium.

**Hadwiger conjecture** - counterexample = graph with χ ≥ t, no K_t minor. For t=7: χ=7, no K7 minor. Known: χ=7 graphs exist trivially; the claim is they all have K7 minors. Believed true-ish (t=6 proved via 4CT by Robertson-Seymour-Thomas). Verification: non-K7-minor certificate - minor testing for fixed t is poly (R-S cubic) but certificate complex; χ ≥ 7 via unsat. Verification "seconds-to-hours" - the K7-minor-freeness certificate is the hard part (would need TRUSTED re-run of a minor algorithm; certificates not standard). Risky filter-4. Also plausibility low. One-liner fail/skeptical.

**Lonely runner** - speeds vector; verification of a counterexample for k runners: for each runner, all times have some other runner within 1/(k+1)... wait conjecture: each runner is lonely at some time (distance ≥ 1/(k+1) from others). Counterexample: speed vector where one runner never lonely. Verification: checkable via finite event analysis - feasible. k=8 open. Believed true. Medium. It's more Diophantine/dynamics; borderline beat. One-liner.

**Perfect cuboid** - number theory sibling.

Now filter-3 audit for top candidates - any meta-theorems?
- Frankl: no cap. Gilmer-type results only give constant ~0.38; a counterexample family would need density < 1/2, consistent with all theory.
- Reconstruction: no cap (digraph version HAS counterexamples - Stockmeyer - showing the search isn't theorem-capped in general; the graph version could go either way).
- CH: no cap; related conjectures (Beauville?) no.
- Hill: no cap; rectilinear crossing number provably exceeds Z(n) for large... wait, actually rectilinear crossing number of K_n is known > Z(n)? No - Hill's conjecture is about general crossing number; for rectilinear, it's known that cr-bar(K_n) > Z(n) for some n? I recall rectilinear crossing number equals... it's known that the rectilinear crossing number of K_n is strictly greater than the conjectured Z(n)? No - the best rectilinear drawings also achieve Z(n) for small n; asymptotically rectilinear > general possibly. Not a cap on Hill's conjecture itself. Fine.
- CDC: no cap (no theorem says every bridgeless graph has CDC; it'd prove CDC true if... no).
- Seymour second neighborhood: no cap.

Now think about #1 pick. The program's strengths: swarm orchestration, certificates, adversarial review, SAT/CP machinery, RL (Wagner precedent), FunSearch precedent. Kuber wants "AI found a counterexample to a conjecture people care about" + cheap public verification + plausible findability within reasonable compute.

Candidates ranked by (fame × plausibility-of-being-false × search-feasibility × verification-cheapness):

1. **Frankl's union-closed sets**: fame high (Wikipedia, Polymath16-adjacent attention, Gilmer 2022 Quanta coverage), finite ✓, verification seconds ✓, no cap ✓, plausibility-of-falsity: low-moderate (believed true, but the "verified frontier" is only n≤12ish - huge gap; counterexamples conjectured by some to possibly exist for large families? Actually most believe true). Search: SAT/CP on n=13+ universes is brutal (2^(2^n) families) - need RL/evolutionary construction of union-closed families with low max-frequency. This is EXACTLY Wagner-RL-shaped (he refuted conjectures by constructing extremal graphs via RL). Feasibility: decent. #1 contender.

2. **Graph reconstruction conjecture**: fame high (Wikipedia, classic), finite ✓ (pair of graphs), verification seconds ✓ (deck comparison + iso check), no cap ✓ (digraph analogue false!), plausibility-of-falsity: moderate-high (genuine skepticism; only verified to 13 vertices). Search difficulty: finding hypomorphic non-isomorphic pairs is like finding needles; known construction families produce near-misses; ML-guided generation plausible. #1 contender too.

3. **Caccetta-Häggkvist (k=3)**: fame medium-high (Wikipedia page yes), finite ✓, verification seconds ✓, no cap ✓, plausibility: low-moderate. Search: triangle-free digraphs outdegree ≥ n/3 - the extremal structure is well-studied; heuristic search (local search maintaining triangle-free + boosting outdegree) feasible. #2/#3.

4. **Hill's conjecture cr(K_n)=Z(n)**: fame medium (Wikipedia "crossing number inequality"/Hill), finite ✓ (rotation system), verification seconds ✓, no cap ✓, plausibility: moderate (genuinely unknown; heuristics haven't beaten Z(n), but search has been limited; n=13 is the first open - 78 vertices... wait K_13 has 13 vertices, 78 edges, 225 conjectured crossings; drawing optimization over rotation systems of K_13 - local search space huge but RL/FunSearch-shaped). #3.

5. **Cycle double cover**: fame high, verification harder (unsat cert), believed true. #4.

6. **Seymour's second neighborhood**: verification trivial, fame medium. #5. Actually this is interesting because verification is the cheapest possible. But fame lower; "Dean's conjecture" for tournaments was solved? No - Dean's conjecture (tournament second neighborhood) still open? I believe the tournament case was... Seymour's second neighborhood conjecture remains open; for tournaments it's "Dean's conjecture", proven? I recall a claimed proof for tournaments (Fisher 1996?) for... hmm, Dean's conjecture was proved? No - I think it's still open or proved for tournaments via... There was a 2023? Not sure. Skip precision; can search quickly.

Given time constraints (now ~7:52, report by 8:10), do quick grounding searches: verify (a) reconstruction conjecture verified frontier, (b) Frankl computational verification frontier, (c) Caccetta-Häggkvist status, (d) Hill's conjecture status/Z(13), (e) snark census size, (f) Seymour 2nd neighborhood status. Maybe 2-3 parallel web searches, then write.

Let me batch web searches: I'll run 3-4 searches in one bash call.

Queries:
1. "reconstruction conjecture verified up to 13 vertices McKay" 
2. "union-closed sets conjecture computational verification universe size"
3. "Caccetta-Haggkvist conjecture k=3 status verified small"
4. "Hill's conjecture crossing number K_13 225 verified up to n=12"
5. "snark census cycle double cover checked order 36"
6. "Seymour second neighborhood conjecture status 2024"

Then write the report. Report by 8:10 sharp. It's 7:51-7:52 now. One search turn (~2-3 min), then write (~5 min), send by ~8:05. Good.

Let me do the searches.
```

Quick grounding pass on verification frontiers and current status for my shortlist, then I'll write the ranked report.

Tool: bash

Arguments:
```json
{"command": "tools web_search --query \"graph reconstruction conjecture verified up to 13 vertices McKay computational\" --limit 6 --json | jq -r '.[] | \"\\(.title) | \\(.url)\\n  \\(.highlights[0] // \"\")\"' ; echo \"=====2=====\" ; tools web_search --query \"union-closed sets conjecture Frankl computational verification universe elements brute force\" --limit 6 --json | jq -r '.[] | \"\\(.title) | \\(.url)\\n  \\(.highlights[0] // \"\")\"' ; echo \"=====3=====\" ; tools web_search --query \"Caccetta-Haggkvist conjecture status triangle-free digraph minimum outdegree k=3\" --limit 6 --json | jq -r '.[] | \"\\(.title) | \\(.url)\\n  \\(.highlights[0] // \"\")\"' ; echo \"=====4=====\" ; tools web_search --query \"Hill's conjecture crossing number complete graph K_13 verified n=12 Zarankiewicz\" --limit 6 --json | jq -r '.[] | \"\\(.title) | \\(.url)\\n  \\(.highlights[0] // \"\")\"'", "timeout": 90}
```

Tool: bash

<tool-result-overflow>
Output exceeded the inline tool-result budget (34125 estimated tokens; limit 10000).
Full content: /observations/chat-sessions/chat-01M20M7DPAPBJB318QX0F5XST3/artifacts/bash_0_9c12ebf2.txt
Full structured output: /observations/chat-sessions/chat-01M20M7DPAPBJB318QX0F5XST3/artifacts/bash_0_9c12ebf2.json
Preview:
Reconstruction of small graphs and digraphs | https://doi.org/10.48550/arxiv.2102.01942
  We describe computer searches that prove the graph reconstruction conjecture for graphs with up to 13 vertices and some limited classes on larger sizes. We also investigate the reconstructibility of tournaments up to 13 vertices, digraphs up to 9 vertices, and posets up to 13 points. In all cases, our results also apply to the set reconstruction problem that uses the isomorph-reduced deck.
...
...
</tool-result-overflow>

Structured:
```json
{"overflow":true,"estimated_tokens":34125,"max_inline_tokens":10000,"content_path":"/observations/chat-sessions/chat-01M20M7DPAPBJB318QX0F5XST3/artifacts/bash_0_9c12ebf2.txt","structured_path":"/observations/chat-sessions/chat-01M20M7DPAPBJB318QX0F5XST3/artifacts/bash_0_9c12ebf2.json"}
```