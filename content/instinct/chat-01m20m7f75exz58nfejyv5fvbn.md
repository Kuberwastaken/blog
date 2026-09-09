---
title: "target scout: number theory + discrete (chat-01M20M7F7)"
---

_1 transcript files aggregated._

One-hour research sprint (report back by 8:10pm IST sharp - partial findings beat late completeness). Handle Kuber's direction from the conversation: find the next counterexample-hunt target now that the Hodge route is theorem-closed.

Your beat: additive/computational number theory, discrete geometry, SAT-amenable finite problems, matrix/tensor problems, anything outside combinatorics/graph theory (a parallel scout covers that).

Score every candidate against Kuber's four filters, all four mandatory:
1. A NAMED conjecture people actually care about (has a Wikipedia page, a survey, a history - not an exercise).
2. The counterexample, if it exists, is a FINITE object you can hold up (a number, a set, a matrix, a configuration) - not an asymptotic argument.
3. NO meta-theorem capping the search (the Deligne lesson: for abelian varieties every Hodge class is motivated, so no realization-level computation could ever certify non-algebraicity - we spent weeks before learning this. Check FIRST whether any theorem structure makes counterexamples impossible to exhibit or certify computationally).
4. Cheap, public, independent verification - anyone can check the certificate in seconds-to-hours on a laptop.

Precedent bar: Mertens (Odlyzko-te Riele), Euler sum-of-powers (direct search), Keller's conjecture resolution via SAT (proof-side precedent), Wagner's RL counterexamples, FunSearch. The bar has moved: the conjecture needs a name and the find must be checkable.

For each serious candidate report: the conjecture statement in two lines; who conjectured it and why it's cared about; current status (verified up to what bound); why a counterexample is plausible (heuristics, near-misses, where the verified frontier sits vs where counterexamples could live); the search space (object class, size where counterexamples might first appear, feasibility of SAT/CP/ILP/ML-guided/direct search); exactly what the certificate would be and its verification cost; and your filter-3 audit (why no meta-theorem blocks this).

Give me a ranked top-3 with a clear #1 pick and the reasoning. Be honest about which famous candidates FAIL the filters (one line each). Depth over breadth.

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
I'm the "target scout: number theory / discrete geometry / SAT-amenable" task agent. My parent gave me a one-hour research sprint, report back by 8:10 PM IST sharp. It's currently ~7:50 PM IST (the wake came at 7:49:47). So I have ~20 minutes left.

I should do focused web research on candidate conjectures in my beat and deliver a ranked top-3 with a clear #1. Let me think about what I know and verify current status via web search.

Candidate list for my beat (additive/computational number theory, discrete geometry, SAT-amenable finite problems, matrix/tensor problems):

Strong candidates:

1. **Keller's conjecture** — already resolved (Brakensiek et al. 2020, SAT proof that dimension 7 has no counterexample; Keller true in all dims after dim 8+ counterexamples found earlier). So it's done — proof-side precedent, not a target.

2. **Euclidean Ramsey / Hadwiger–Nelson problem** — chromatic number of the plane. Not a conjecture to disprove per se; it's an open problem, lower bound 5 (de Grey 2018), upper bound 7. Counterexample framing doesn't fit perfectly — finding a 6-chromatic finite unit-distance graph would be a finite object (de Grey's 1581-vertex graph for 5). A 6-chromatic unit-distance graph would be huge news. That's actually a serious candidate: named problem, finite object (a graph embedding), cheap verification (check all distances equal 1 and no 5-coloring exists — well, verifying non-5-colorability is NP-hard but a SAT certificate/UNSAT proof is checkable... hmm, UNSAT proofs can be checked with DRAT proof checkers, cheap-ish). The de Grey result got massive coverage (Quanta). A 6-chromatic graph would be a similar-scale splash. But it's a "lower bound improvement" on an open problem, not disproving a named conjecture. Still very strong fit for the machinery.

3. **Mertens** — done.

4. **Euler's sum of powers conjecture** — done (1966 Lander & Parkin; 1988 Elkies for fourth powers).

5. **Boolean Pythagorean triples** — done by SAT (Heule et al. 2016).

6. **Schur number S(5)** — resolved by SAT (Heule 2017, S(5)=160). S(6) unknown — but that's an open problem not a conjecture.

7. **Gil Kalai's / Kahn-Kalai conjecture** — resolved 2022 (Park-Pham). Done.

8. **Conway's thrackle conjecture** — graph theory, sibling's beat.

9. **Schanuel's conjecture** — not finite-object falsifiable.

10. **abc conjecture** — counterexample would be a triple; but plausible? Verification cheap (a, b, c, radicals). But a counterexample to abc would need rad(abc)^(1+ε) < c; the conjecture is asymptotic (for every ε there are finitely many exceptions). A counterexample isn't a finite object in the strict sense — the conjecture says "for each ε>0, finitely many exceptions" so no single triple disproves it. FAILS filter 2.

11. **Goldbach** — counterexample would be a single even number; verification cheap. But heuristics overwhelmingly against; verified to 4×10^18. A single counterexample would disprove it, finite object, cheap check. Filter 3: no meta-theorem. Filter 4: trivial to verify. Filter 2: yes. Filter 1: definitely named. But plausibility of finding one is essentially zero — verified to 4e18 and heuristic says probability of counterexample beyond that is astronomically small. Honest ranking: fails the "why plausible" test. Not a real target, but worth mentioning as filter-passing but plausibility-failing.

12. **Collatz** — counterexample would be a nontrivial cycle (finite object, cheap verification: just iterate the cycle). Named, cared about. Plausibility low, verified to huge bounds. Similar to Goldbach: passes filters, fails plausibility.

13. **Packing/covering problems in discrete geometry**: 
   - **Keller** done.
   - **Sphere packing in other dimensions** — mostly solved in 8, 24; conjectures elsewhere are less "named conjecture with counterexample" shaped.
   - **Minkowski's conjecture**? Resolved.
   - **Danzer-Grünbaum?** resolved.

14. **Hadwiger's covering conjecture / Borsuk's conjecture** — Borsuk was disproved (Kahn-Kalai 1993). Counterexample is a finite set of points — but already disproved, so not open. Asymptotic Borsuk in low dimensions (d=4..63 open?) — Borsuk open in dimension 4. Counterexample would be a finite point set in R^4 needing 6 pieces of smaller diameter. Named-ish (Borsuk's problem in dimension 4). Plausibility: unclear.

15. **Matrix/tensor: Strassen-type / matrix multiplication exponent** — not finite-object.

16. **Brent's / complexity conjectures** — no.

17. **Discrete geometry: Erdős–Moser problem?** (1^k+2^k+...+(m-1)^k = m^k). Conjecture: no solutions. Counterexample = a single pair (k, m), verifiable with big arithmetic. Verified to enormous bounds (m < 10^10^6-ish via Moser/ton of theory). Plausibility: heuristics say none. Named: yes-ish (Erdős–Moser problem). But fails plausibility hard.

18. **Magic square of squares** (Parker square) — open problem, not a named conjecture with consensus; but a "3x3 magic square of distinct squares" existence is a famous unsolved puzzle. Finding one = finite object, instant verification. It's not a conjecture to disprove, it's a construction problem. FunSearch-adjacent. Notable? Moderately. It's on the sibling beat? No, it's number theory/diophantine. Could be a candidate for "construction target" rather than counterexample. The parent asked for counterexample-hunt targets but the framing ("AI found X") includes constructions like FunSearch. Hmm, the brief says counterexample-hunt target. Keep it as an honorable mention.

19. **Unit distances / Erdős distinct distances** — asymptotic.

20. **The "moving sofa problem"** — open, construction, not named conjecture.

21. **Inscribed square problem (Toeplitz)** — no finite object.

22. **Singmaster's conjecture** — binomial coefficients repeating; N=3003 appears 8 times (max known). Conjecture: bounded by some constant. Counterexample = a number appearing ≥9 times in Pascal's triangle = finite object, cheap verification (check the multiplicities computationally — needs care but doable). Plausibility: Singmaster conjectured bounded; no strong heuristic either way. Verified for N up to 2^48 or so. A counterexample would be genuinely notable. This is a decent candidate! Name recognition moderate (has a Wikipedia page? I believe Singmaster's conjecture does have one). Search space: numbers up to huge sizes; checking multiplicity of N requires finding all ways N = C(n,k). There are algorithms (via factorization). Amenable to distributed search.

23. **Riemann hypothesis** — counterexample = a zero off the line; finite-ish certificate but verification is heavy (though interval arithmetic certification is standard). Plausibility: essentially none, and verified to 12 trillion zeros. Notable beyond measure. But "AI found it" story: the search is purely numerical, not search-space clever. Fails plausibility; also filter 4 partially (verification requires certified numerics — actually doable in hours). Mention and reject on plausibility.

24. **Perfect numbers: odd perfect number** — counterexample to "no odd perfect numbers exist" (not a named conjecture exactly, but a famous open problem; a single odd perfect number is a finite object, verification = check sigma(N)=2N, minutes). Plausibility: known lower bound 10^1500, many necessary conditions; heuristic (Wagstaff?) suggests unlikely but not impossible. "AI found an odd perfect number" would be enormous news. But search feasibility: search space beyond 10^1500 with strong structural constraints (must have specific form N = p^k m^2 etc.). Direct search infeasible; would need constructive methods (like Brent-Cohen-te Riele style). Actually there's a known "spoof" odd perfect numbers line (Descartes number 198585576189 = spoof). Constructing spoofs via SAT/ILP could be a FunSearch-like target! Finding a new spoof or a spoof that evades known rules — but that's not disproving anything named. Real OPN: passes filters 1,2,3,4 but plausibility is the question; the heuristic argument by... there are arguments both ways. This could rank.

25. **Graceful tree conjecture / Ringel-Kotzig** — graph labeling, sibling beat (graph theory).

26. **Zarankiewicz / Turán** — extremal, sibling beat.

27. **Kaplansky? Erdős–Straus conjecture** (4/n = 1/x+1/y+1/z). Counterexample = single n; verification cheap. Verified to 10^17. Heuristic says true. Fails plausibility.

28. **Pollock's conjecture / polygonal numbers?** meh.

29. **Discrete geometry: empty hexagon problem (Erdős's "happy ending" type)** — Horton's theorem resolved (no empty 7-gons). Empty hexagons exist for n≥30 (resolved). Done.

30. **Kobon triangle problem** — max triangles from n lines; known bounds, small open cases; not a named conjecture.

31. **Orchard-planting / orchard visibility?** meh.

32. **Ulam's packing conjecture?** obscure.

33. **Lonely runner conjecture!** — This is a strong one. Lonely runner conjecture (Wills 1967, Cusick): n runners on a circular track with distinct speeds, each runner is "lonely" (distance ≥ 1/n from all others) at some time. Proven for n ≤ 7. A counterexample for n=8 would be a finite object: a set of 7 distinct speeds such that some runner is never lonely. Verification: for a given speed vector, checking whether runner i is ever lonely is a computation over the torus — can be certified with interval arithmetic in seconds. Named: yes (Wikipedia page, Tao worked on it, serious literature). Plausibility: hmm, most people believe it's true. But the search space is finite-ish for fixed n: speeds can be assumed integers (rational approximation arguments), and there's structure. Actually the conjecture is widely believed true; but the counterexample search is well-posed: SAT/ILP formulation exists? There are formulations reducing to checking integer vectors with bounded entries. The verified frontier: proven n≤7; for n=8 it's open with numerical searches finding no counterexample. Hmm, "why is a counterexample plausible": the conjecture could fail for large n by measure heuristics? Actually there are heuristics suggesting it holds. It's a medium fit.

34. **Covering systems: Erdős covering systems conjecture** — resolved (Hough 2015, minimum modulus bounded). The distinct-moduli covering system problem: Erdős–Selfridge? Open: does there exist a covering system with all moduli distinct and odd (Erdős–Selfridge conjecture says NO)? A counterexample = finite object (list of congruences), verification = check every integer 1..lcm is covered — lcm might be huge but computable. Hough's theorem doesn't settle odd moduli. The odd covering system problem is famous (\$2000 Erdős prize?). Finding one (construction) or proving impossible. A construction would be a finite certificate, verifiable in... lcm of moduli could be astronomically large, but coverage checking can be done smartly. Hmm — this is a "construction" target rather than counterexample. Neilsen found a covering with... there's progress. Notable moderately.

35. **Matrix: the "Sauer–Shelah"?** no.

36. **Tensor: border rank / Strassen's laser method conjectures?** no finite object.

37. **SAT-amenable named: "Erdős discrepancy problem"** — resolved by Tao (2015). The finite certificate side: SAT was used for lower bounds before Tao. Done.

38. **Ramsey R(5,5)** — open problem, not conjecture with consensus direction. Sibling beat.

39. **Van der Waerden / Szemerédi quantitative bounds** — asymptotic.

40. **The "union-closed sets conjecture"** — extremal set theory. Counterexample = finite family of sets, verification = cheap! Named (Frankl's conjecture), very famous, has Wikipedia, serious literature, recent progress (Gilmer 2022, constant 0.01 improvements, Chase-Lovett). Counterexample is a finite union-closed family where every element appears in < half the sets. Plausibility: believed true, and Gilmer's result shows every union-closed family has an element in ≥1% of sets... counterexample plausible? Most experts believe true. But search space: union-closed families on small ground sets — verified by brute force up to n=12 or so (Bošnjak–Marković verified n≤11, others to 12). If it fails, minimal counterexample could be at n=13+? Search space explodes (2^(2^n)). But guided search (RL/SAT with symmetry breaking) could push the verified frontier. Plausibility is the weak point but the certificate is perfect and the name is huge. This is combinatorics though — set systems; the sibling covers "extremal problems, combinatorial designs". Union-closed sets is arguably combinatorics. I can mention it briefly and defer, or include it. The brief says my beat is "anything outside combinatorics/graph theory". Union-closed sets is combinatorics. I'll leave it but flag overlap.

41. **Discrete geometry: "Kneser–Poulsen conjecture"** (reconfiguration of balls: if centers move closer, union volume doesn't increase). Open in the plane for... proven in plane for unions? Bezdek–Connelly proved for... KP conjecture proven in plane (Csikós) for union AND intersection in dimension 2? Actually Bezdek-Connelly proved it in the plane (2002). Open in R^3+. Counterexample = finite configuration of balls with moving centers, certificate = compute volumes (certifiable with interval arithmetic). Named, has history. Plausibility: believed true in R^3. Meh.

42. **Lebesgue's universal covering problem** — open problem, construction/optimization, not named conjecture with consensus.

43. **Moser's worm problem** — same.

44. **"No-three-in-line" / Heilbronn triangle** — asymptotic.

45. **Dürer? no.**

46. **Number theory: "Giuga conjecture"** — n is prime iff 1^(n-1)+...+(n-1)^(n-1) ≡ -1 mod n. Counterexample (Giuga number-like composite satisfying condition) = finite object. But it's a primality characterization conjecture; counterexample plausible? Verified composites up to 10^13800ish? Giuga numbers known; the conjecture's counterexamples are composite Giuga numbers — none known and heuristic suggests they may exist but be huge. A counterexample would be "a composite Giuga number" — verification cheap (check the congruence + compositeness). Named-ish: "Giuga's conjecture" has Wikipedia. Plausibility: heuristics (Borweins) suggest counterexamples likely exist but are enormous (~10^17000 digits?). Actually the heuristic: composite Giuga numbers should exist but are incredibly rare — expected count grows like log log... So a search has no realistic chance. Fails plausibility feasibility.

47. **Wieferich primes / abc-adjacent**: search continues, no named conjecture killed.

48. **Catalan's conjecture** — resolved (Mihăilescu). **Fermat-Catalan conjecture**: 1/x+... Fermat-Catalan: x^p + y^q = z^r with 1/p+1/q+1/r < 1 has finitely many coprime solutions — asymptotic finiteness, no single counterexample. Fails filter 2. But "the ten known solutions" — finding an 11th solution to Fermat-Catalan equation is a famous search (Beal conjecture: no solutions when all exponents ≥3 with coprime bases — Beal offers \$1M prize!). Beal conjecture: a single counterexample = finite object, cheap verification, \$1M prize attached, named, famous-ish. Plausibility: believed true (follows from abc); verified computationally for bounded ranges. Hmm, "AI disproved Beal" — but Beal is widely considered weak compared to abc; most experts believe true. Search: enumeration over exponent triples and bases; huge. Probably fails plausibility but passes all four filters — worth an honorable mention.

49. **Magic: "196-algorithm / Lychrel numbers"** — unproven either way; a "certificate" that 196 never palindromizes isn't finite. Reverse: proving some number is Lychrel requires proof. No.

50. **Discrete geometry + SAT: "Erdős–Szekeres happy ending / g(n)"** — for n=6: does every set of 17 points in general position contain a convex hexagon? g(6)=17 proven by Szekeres–Peters (2006, computer). Done.

51. **"Square peg" no.**

52. **Tensor/matrix named finite-object: "Strassen's conjecture on additivity of tensor rank"?** — disproved (Shitov 2019). Done. **Comon's conjecture** (symmetric rank = rank for symmetric tensors) — disproved by Shitov 2018. Done. 

53. **"Hadamard's maximal determinant problem"** — open problems, constructions, not conjectures with consensus.

54. **"Williamson matrices / circulant Hadamard conjecture"**: Circulant Hadamard conjecture (Ryser): no circulant Hadamard matrix of order > 4. Counterexample = a single {-1,+1} sequence of length n>4 with periodic autocorrelations zero = finite object, verification in O(n^2) seconds. Named, famous, has Wikipedia. Verified by exhaustive search up to n < 4×10^12? (known results: no circulant Hadamard for 4 < n < 548964900 requires... actually verified to ~10^13 with number-theoretic exclusions for most orders; there are open "field descent" methods). A counterexample would need order n = 4m^2 with specific properties; the search is number-theoretically structured. Plausibility: believed no counterexample exists, but no theorem caps. Hmm — this passes all 4 filters, certificate perfect. Plausibility: most believe it true. But the "search" is well-studied; hard to beat decades of structured exclusion. Honorable mention.

55. **"Barker sequence conjecture"** — no Barker sequences of length > 13. Verified to length ~10^22 via number theory. Similar shape to circulant Hadamard. Less famous.

56. **"Skolem/Steiner"** — designs exist iff conditions; resolved mostly.

57. **"Projective plane of order 12"** — famous open problem! Does a projective plane of order 12 exist? The order-10 case was killed by Lam's massive computer search (1989) — famous precedent. A projective plane of order 12, if found, = finite object (an incidence structure / set of lines), verification = check axioms, seconds on a laptop (it's ~157 points, 157 lines — trivial check). Named problem (prime power conjecture / projective plane existence). If it doesn't exist, a SAT proof like Keller is the path (proof-side). If it exists, construction = "AI found a projective plane of order 12" — enormous news in combinatorics, arguably bigger than Keller. BUT: it's combinatorial design — sibling beat ("combinatorial designs"). Hmm. The sibling scout has combinatorial designs. I could flag it as crossover. The prime power conjecture is a named conjecture; finding a plane of order 12 disproves... well, 12 isn't prime power so its existence doesn't disprove prime-power conjecture? Prime power conjecture says every finite projective plane has prime power order — a plane of order 12 would DISPROVE it! Named conjecture, finite object, trivial verification, no meta-theorem. Plausibility: most experts doubt order-12 plane exists; Lam et al. spent years killing order 10. Search feasibility: SAT approaches on order 12 are currently infeasible (search space enormous), but ML-guided construction is exactly FunSearch-shaped. This is a top candidate but overlaps sibling beat. I'll mention it as crossover-flagged since designs went to sibling.

58. **Number theory + ML: "Elliptic curve ranks / Birch-Swinnerton-Dyer"** — BSD is asymptotic/analytic, no finite counterexample object. Fails.

59. **"Class number problems / idoneal numbers"** — Euler's idoneal numbers: conjectured complete list of 65; a 66th idoneal number = finite object, verification = check definition (computable). Weinberger proved at most one more exists and GRH excludes it. So a counterexample would disprove... under GRH excluded, so finding one would be huge (would give a counterexample to consequences of GRH, not GRH itself). Named-ish (idoneal numbers / Euler's numeri idonei). Plausibility: extremely low (analytic bounds push any 66th beyond astronomical). Fails feasibility.

60. **"Sierpinski number conjecture"** — Sierpinski: 78557 is the smallest Sierpinski number; Seventeen or Bust project found primes for all but 5 k values remaining? As of now: remaining candidates: 21181, 22699, 24737, 55459, 67607. If a prime k·2^n+1 is found for each, Sierpinski's problem is resolved (proof-side). Not counterexample. Distributed computing already covers. Meh.

61. **"Riesel numbers"** similar.

62. **"Waring's problem / ideal solutions / Euler's extended"** — meh.

63. **"Lander, Parkin, Selfridge conjecture"** (1967): sums of like powers: if sum of m n-th powers equals sum of k n-th powers (nontrivially), then m+k ≥ n. Euler's sum of powers is the m=1 case. Lander-Parkin-Selfridge is still open for higher powers! A counterexample = explicit tuple of numbers = finite object, verification in seconds (big-integer arithmetic). Named (has Wikipedia "Lander, Parkin, and Selfridge conjecture"). Status: for n=4: 4.1.3 found (Elkies) m+k=4=n — matches, not a violation. Known small solutions cataloged on EulerNet. A counterexample would need e.g. n=6 with m+k ≤ 5? Known: 6th powers 3.3 solutions (m+k=6=n). Violations require m+k < n. Nobody has found any; searches (EulerNet, Meyrignac's distributed project) covered lots. Plausibility: heuristics (density arguments) suggest counterexamples may exist for larger n but be rare/huge — actually density heuristics: for fixed n, number of representations grows... The probability argument suggests solutions with m+k < n should exist for large enough n with sufficiently large numbers. This is a real, honest, search-shaped target with precedent (Euler sum-of-powers is exactly this genre — the 1966 counterexample killed Euler's conjecture via direct search!). Lander-Parkin-Selfridge is the direct descendant and still open. This is a strong candidate: it's literally the modern open version of the precedent. Verification trivial. Search = distributed enumeration, very amenable to smarter search (meet-in-the-middle hashing, ML-guided is less obvious but enumeration is GPU-friendly).

64. **"Prouhet / Tarry-Escott problem"** — ideal solutions: Prouhet-Tarry-Escott asks for equal sums of like powers with k terms for degrees 1..k-1 ("ideal solutions" size k). Open whether ideal solutions of size 11, 12 exist. Construction target, finite object, cheap verify. Less famous than LPS.

65. **Discrete geometry, SAT-amenable, very hot right now: "packing chromatic / 11-sudoku"?** no.

66. **"Hadwiger–Nelson"** — as discussed, huge. It's discrete geometry! My beat includes discrete geometry. The chromatic number of the plane: finding a 6-chromatic unit-distance graph = finite object (vertex coordinates + edge list), verification: (a) check all edges have length 1 (exact algebraic arithmetic, seconds); (b) verify non-5-colorability — UNSAT certificate via SAT solver (DRAT proof, checkable, could be large but standard). de Grey's 2018 result (5-chromatic) was a massive public event — Quanta, huge discussion, Polymath 16 followed. A 6-chromatic unit-distance graph would be a genuinely big story with a named problem ("Hadwiger–Nelson problem", Wikipedia, 70+ years history). Current status: known bounds 5 ≤ χ ≤ 7. Counterexample framing: it's "improving a lower bound" not killing a conjecture — but some conjectured χ=5? There's no consensus conjecture; people guess 5, 6, or 7. Filter 1 ("named conjecture") — it's a named problem, not a conjecture. Slight fit issue, but the parent brief includes "SAT-amenable finite problems" and the goal is a public splash. Also filter 4: verifying non-5-colorability requires trusting a SAT proof — that's the Keller precedent (proof-side, got accepted). Filter 3: no meta-theorem. Plausibility: Polymath 16 pushed record graphs down in size; nobody has found 6-chromatic. Heuristics: if χ=6 or 7, minimal 6-chromatic graphs might be enormous (de Grey needed 1581 vertices for 5, later reduced to 509 by parts). Search: SAT-guided, MCTS/RL over graph constructions — exactly Wagner-style + FunSearch-shaped. I think this is a serious top-3 candidate.

67. **"Moser spindle" style — unit distance graph chromatic in higher dims?** meh.

68. **"Erdős's unit distances in the plane"?** asymptotic.

69. **"Falconer"?** analysis.

70. **"Zaremba's conjecture"** (continued fractions: every denominator d has numerator a with partial quotients ≤ 5). Counterexample = single d; verification cheap (enumerate all a coprime to d — that's O(d) which could be large but a given counterexample d is checkable in O(d log d)). Named (Wikipedia). Verified computationally to large bounds (up to ~10^10? by numerical work). Plausibility: believed true (follows from Hensley-type heuristics). Weak plausibility. Honorable mention.

71. **"Gilbreath's conjecture"** (iterating differences of primes gives 1s). Counterexample = a row where it fails = finite? No — the conjecture is about every row; a counterexample would be a specific row index n where row n doesn't start with 1 — that's a finite certificate (compute first n rows — O(n^2) — cheap!). Named (Wikipedia). Verified to n ~ 10^13 (Odlyzko). Plausibility: believed true, heuristics strong. Odlyzko verified to 10^13. Fails plausibility realistically.

72. **"Legendre's conjecture"** (prime between n^2 and (n+1)^2). Counterexample = single n with primeless interval = finite certificate (primality proof of the gap: check all numbers composite — O(n) trial or use factoring; for n around 10^9+ that's a lot but feasible with a certificate of compositeness per number? Actually you'd need to certify every number in the interval is composite — 2n numbers — heavy but parallelizable; a PRP+factor certificate is feasible). Named. Verified to ~10^18. Heuristics (Cramér) strongly support. Fails plausibility.

73. **"Oppermann / Brocard / Andrica"** same genre.

74. **"Twin primes / de Polignac"** — a counterexample to "infinitely many twins" isn't finite. No.

75. **"Wolstenholme / harmonic"** meh.

76. **"Grimm's conjecture"** — each composite in a run can be assigned a distinct prime factor. Counterexample = a finite run = finite certificate, cheap check! Named (Wikipedia "Grimm's conjecture"). Status: verified for n up to 10^10-ish? Heuristics believe true. Hmm plausible? Unclear. Honorable mention maybe.

77. **"The 3x+1 / Collatz"** mentioned.

78. **"Busy Beaver values"** — BB(5) was recently resolved (2024, bbchallenge: BB(5) = 47,176,870). BB(6) open; "AI computing BB(6)" — but it's not a conjecture; also verification of BB is a massive proof artifact (Coq). The bbchallenge story got attention (Quanta). BB(6) is likely beyond astronomical (known machines run >10^36534 steps). Not feasible. No.

79. **"Matrix: the 'Cohn–Umans' group-theoretic approach"** no finite object.

80. **"Determinant vs permanent (Valiant)"** no.

81. **"Tensor rank of 3x3x3 / Strassen's matrix tensor rank"**: The rank of the 2x2 matrix multiplication tensor is 7 (Strassen), but border rank questions resolved. The rank of the 3x3x3 "matrix multiplication tensor" for 3x3 matrices: known bounds 19-23; finding a rank-18 or lower decomposition = finite object (a tensor decomposition = list of rank-1 terms), verification = check the identity, seconds. Named problem ("the exponent of matrix multiplication" adjacent; "Strassen's problem" of rank of ⟨3,3,3⟩). Actually the specific question "rank of 3x3 matrix multiplication" is a famous open problem in algebraic complexity. Finding a better algorithm for 3x3 matrix multiplication (fewer than 23 multiplications, beating Laderman/Smirnov) = a genuine, checkable, famous target. AlphaTensor (DeepMind 2022, Nature) did exactly this genre — found better algorithms for small matrices (4x4 over F2 etc.) and got Nature + big coverage. Precedent exists and the frontier is open: rank of ⟨3,3,3⟩ is between 19 (Bläser) and 23 (Laderman). Beating Laderman's 23 for 3x3x3, or improving ⟨4,4,4⟩ rank 49 (AlphaTensor got 47 over F2; over integers 49). "AI found a faster matrix multiplication algorithm" — splash proven by AlphaTensor. Filter check: named problem ✓ (50+ years, Strassen 1969); finite object ✓ (explicit decomposition); no meta-theorem ✓; cheap verification ✓ (verify the decomposition identity exactly — minutes). Plausibility: genuine — AlphaTensor already improved some cases; the gap 19-23 for 3x3 is wide open; RL/search methods are literally the state of the art here. This is a VERY strong candidate for my beat. The "named conjecture" framing: it's a named open problem, not a conjecture with consensus direction — but improving the bound doesn't need consensus direction. The public story "AI beats Laderman's 50-year-old 3x3 record" is instantly legible. Hmm, but note: it overlaps with "counterexample" only loosely (a decomposition below the believed-minimum would "counterexample" the belief rank=23... actually the community doesn't conjecture 23). Still, as a splash target it's top-tier and AlphaTensor validated both feasibility and publicity.

82. **"Packing equal circles / squares in a square"** — packomania problems; improving a packing = finite object, cheap verify; famous-ish (Erich Friedman's site); "Malfatti"? Not named conjectures. FunSearch-adjacent. Honorable mention as "record-hunting" genre.

83. **"Cap set problem"** — resolved asymptotically (Ellenberg-Gijswijt); finite cap sets in specific dimensions = constructions; not named conjecture to kill.

84. **"Sphere packing / kissing numbers in dimensions 5-7"**: kissing number problem in dimension 4 = 24 (resolved, Musin), dim 5-7 unknown: dim 5 known bounds 40-44. Finding 45 kisses in dim 5 = finite object (coordinates), verification = check angles (certifiable). Named problem (kissing number / Newton-Gregory problem, Wikipedia, famous history Newton vs Gregory). Plausibility: believed 40? Conway-Sloane: "most believe 40"? Actually best known: 40 (construction), upper 44. Is 41+ plausible? Experts doubt. Search: numerical optimization + exactification. Medium candidate. Counterexample framing: none (no consensus conjecture). Honorable mention.

85. **"Kepler/Hales"** done. **"Fejes Tóth?"** meh.

86. **"The 'Dido' / honeycomb"** done.

87. **"Chromatic number of R^3 / R^n"** — same genre as Hadwiger-Nelson, less famous.

88. **"Erdős–Sós?"** sibling.

89. **"Additive: 'Erdős–Turán conjecture on additive bases'"** — asymptotic. **"Erdős distinct subset sums"** — Conway-Guy sequence, u_n conjecture? Conway-Guy found distinct subset-sum sets smaller than powers of 2; the "Erdős distinct sum problem" asks max k for {1..n}... resolved? Bohman proved sumset... There's "Erdős's conjecture: a distinct subset sum set of k elements has max element ≥ c·2^k" — counterexample = finite set of integers = cheap verify! Named-ish. Status: Conway-Guy gives max 2^k·0.22..., Erdős conjectured ≥ 2^k... wait Erdős conjectured max element ≥ c·2^k for some absolute c... Conway-Guy disproved the specific c=1. Lunnon/Steinerberger improved. Current record constructions vs conjectured bound c ≈ ... This is real but moderately famous. Honorable mention.

90. **"Borwein integrals / sinc"** — no.

91. **"Pillai's conjecture"** (finitely many perfect powers differing by k) — asymptotic, fails filter 2 for a single counterexample? Pillai: for fixed k, finitely many pairs of perfect powers differing by k. A counterexample to "conjectured list" — not named-consensus. No.

92. **"Hall's conjecture / Marshall Hall: |x^3 - y^2| > x^(1/2)?"** — Hall: x^3-y^2 nonzero implies |x^3-y^2| > C x^{1/2}? Counterexample = pair (x,y) with |x^3-y^2| < x^{1/2} nonzero = finite object, cheap verify! Named (Hall's conjecture, Wikipedia, follows from abc so believed true). Status: searches found "good Hall pairs" with small differences but none violating x^{1/2}. Plausibility: believed true (implied by abc). Fails plausibility mostly. Honorable mention.

93. **"Waring-Goldbach"** no.

94. **"The 'prime k-tuples' conjecture"** — no finite counterexample.

95. **"Agoh–Giuga"** — Giuga variant. No.

96. **"Lehmer's totient problem"** (composite n with phi(n) | n-1 — Lehmer numbers). Counterexample = single composite n = finite object, cheap verify (factor n, check divisibility). Named (Wikipedia "Lehmer's totient problem"), famous-ish, \$1000 prize history. Status: no Lehmer numbers known; any must be huge (>10^22, ≥14 odd prime factors, etc. — extensive necessary conditions). Heuristic: plausible that none exist OR that they exist but enormous. Search: constructive (like Carmichael number construction — Chernick/Alford-Granville-Pomerance methods). Constructing Carmichael numbers was a famous computational art; Lehmer numbers are the harder cousin. "AI found a Lehmer number" — would be a nice story but Lehmer's totient problem is mid-tier famous. Honorable mention / top-5.

97. **"Carmichael/totient"** adjacent.

98. **"Discrete geometry: 'Danzer's problem' (finite set of points hitting every convex region of volume 1)"** — resolved (Bambah-Woods? open? Danzer's problem open! Actually Danzer's problem — whether a finite-density set can intersect every convex body of volume 1 in R^d — was answered... in 2016 by Solomon-Weiss? No wait, that's the Danzer-Grünbaum... Hmm. I recall Danzer's problem was solved negatively for d=2 in 2016? Not sure. Skip.)

99. **"Gerver's sofa"** construction.

100. **"Tiling: 'einstein problem' / aperiodic monotile"** — RESOLVED 2023 (the hat!) — massive splash (NYT, Quanta). This is exactly the genre: discrete geometry, finite object, splash achieved. Follow-ups: "spectres", chiral aperiodic monotile (Spectre resolved it), the "vampire einstein"... Remaining open: "weakly chiral aperiodic monotile"? The hat story shows the publicity ceiling of this genre. Any remaining named einstein sub-problems? The "einstein problem" is essentially done. Skip.

101. **"Tiling: Conway's 'thrackle'"** sibling. **"Heesch's tiling problem"** — the Heesch number problem: maximum Heesch number; currently record 6 (Bašić 2021). Conjecture: unbounded? Or some max? Finding a tile with Heesch number 7 = finite object (polyform + corona), verification cheap-ish. Moderately named ("Heesch's tiling problem", Wikipedia). Search: SAT/CP enumeration of polyominoes/polyiamonds — very SAT-amenable. Plausibility: genuine — recent progress (Heesch 5 found 2020 by Bašić; Heesch 6 in 2021). "AI found a Heesch-7 tile" — decent story, not front-page. Honorable mention / maybe top-3.

102. **"Voronoi/Conway 'dead tiles'"** meh.

103. **"Number theory + ML famous: 'BSD over function fields'"** no.

104. **"Skewes' number adjacent: 'Li(x) vs pi(x)'"** — crossover regions known; no conjecture alive (Littlewood proved crossover). No.

105. **"The 'second Hardy–Littlewood conjecture'"** (pi(x+y) ≤ pi(x)+pi(y)) — believed FALSE, and a counterexample would be a pair (x,y) = finite object! Verification: count primes in intervals — certifiable (with prime certificates). Status: known to be incompatible with prime k-tuples conjecture; believed false since 1970s; but no explicit counterexample found — expected first counterexample near x ~ 447 or so? No — expected very large (Richards: counterexamples exist if k-tuples true, around x where dense admissible clusters occur, possibly x ~ 10^300+). Search: find admissible k-tuples beating pi(y) — actually the known approach: find y and dense admissible tuple of length pi(y)+1, then Hardy-Littlewood predicts a counterexample somewhere in the tuple — but that's heuristic, not an explicit certified counterexample. To certify, need actual prime cluster. First such clusters expected astronomically large. Fails feasibility. Skip.

106. **"Pólya's conjecture"** — ALREADY disproved (1958, Haselgrove; explicit counterexample n=906,180,359 found 1980). Done — but note as precedent (named conjecture killed by computation).

107. **"Buniakowsky"** no finite object.

108. **"Chebyshev's bias"** no.

109. **"The 'New Mersenne conjecture'"** — disproved. Mersenne primes: "are there infinitely many" no. **"Catalan's Mersenne conjecture"** (M(M(p)) chains) — counterexample-ish, obscure.

110. **"Wagstaff primes / NSW"** search continues, no named conjecture.

111. **"Repunit primes"** same.

112. **"Discrete: 'Conway's Angel problem'"** — resolved 2006. Done.

113. **"Self-avoiding walk / entropy constant"?** no.

114. **"Percolation thresholds"** — open (bond percolation on Kagome etc.), not named conjectures with finite certificates. No.

115. **"SAT: 'minimum sudoku clues' = 17"** — RESOLVED by computation (McGuire et al. 2012). Done, precedent.

116. **"Magic: 'most-perfect' / 'algebraic'"** meh.

117. **"The 'Lonely runner'"** covered above — actually quite strong for SAT/ILP.

118. **"The 'moving sofa'"** no.

119. **"Erdős–Faber–Lovász"** — RESOLVED 2021 (Kang et al.). Done.

120. **"Total coloring conjecture"** graph theory — sibling.

121. **"Reconstruction conjecture"** graph theory — sibling.

122. **"Ulam's reconstruction"** sibling.

123. **"The 'Hadamard conjecture'"** (Hadamard matrix of every order 4n). Construction target: smallest open order is 668. Finding a Hadamard matrix of order 668 = finite object, verification O(n^2) trivial. Named (Hadamard conjecture, Wikipedia, famous since 1893). Plausibility: believed true, constructive methods keep filling orders; 668 has resisted everything for decades. "AI constructed a Hadamard matrix of order 668" — real splash in combinatorics community; public story is decent ("168-year-old problem, smallest open case"). Search: SAT/CP/metaheuristics over {-1,1} matrices — brutally hard search space but structured (Goethals-Seidel, Williamson, T-sequences routes). It's combinatorial designs → sibling beat. Flag crossover.

124. **"Weighing matrices / orthogonal designs"** same family.

125. **"The 'Paley conjecture'"** trivial (construction known).

126. **"Matrix: 'permutation polynomial' / 'Costas arrays'"** — Costas arrays: existence for all n; known missing n=32, 33 (and others). Finding a Costas array of order 32 = finite object, trivial verification! Named ("Costas array", Wikipedia, sonar applications, real engineering fame). Status: exhaustive search proved none for n=32? Let me recall: Costas arrays enumerated exhaustively to n=29 (none for 32,33? no — enumeration up to 29 or 30; n=32,33 unknown by exhaustive search but believed none exist based on density). Actually: exhaustive enumeration completed through order 29 (Drakakis et al. ~2011); orders 32 and 33 are the smallest for which no Costas array is known. Golomb conjectured Costas arrays exist for all orders? The "Costas array existence problem" — Golomb's conjecture. If none exist for 32, a SAT UNSAT proof kills it; if one exists, construction. Belief: most believe n=32,33 have none (density heuristic: expected count < 1). So the splash would be a SAT proof (Keller-style, proof-side). Construction side unlikely. Moderate candidate; overlaps designs (sibling). Honorable mention.

127. **"The 'graceful labeling'"** sibling.

128. **"Ruler: 'perfect Golomb rulers' conjecture"** (no perfect Golomb ruler with >4 marks — proven). **"Optimal Golomb rulers"** — search ongoing (distributed OGR project); finding shorter ruler = record-hunting, semi-named. Honorable mention.

129. **"The 'no-three-in-line' for n×n: exact for large n"** asymptotic-ish.

130. **"Discrete geometry: 'illumination conjecture'"** (Hadwiger–Boltyanski: every convex body in R^d illuminated by 2^d points). Open d≥3 (d=3: 16? known ≤ 16 for smooth... general d=3 open? Levi 1955 d=2 resolved; d=3 resolved? Lassak? I think d=3 still open for pathological bodies? Actually d=3 illumination number conjectured 8, known ≤16, resolved for centrally symmetric (14?). Counterexample = a convex body needing more than 2^d sources — a body is not a finite object per se (could discretize but certificate is messy). Fails filter 2 cleanly. Skip.

131. **"Borsuk number in dimension 4"** covered above — Borsuk's conjecture is disproved in general (so the named conjecture is dead), but the problem in dimension 4 is open: does every 4-dim set partition into 5 smaller-diameter pieces? A counterexample would be a finite point set requiring 6 pieces — "requiring 6 pieces" is a covering lower bound, hard to certify cheaply (you'd need to prove no 5-partition exists — UNSAT-style certificate possible but nontrivial). Filter 4 weak. Skip.

132. **"The 'Erdős–Moser equation'"** covered.

133. **"'Weyl/Bohr'"** no.

134. **"'The Duffin-Schaeffer conjecture'"** resolved 2019 (Koukoulopoulos-Maynard). Done. **"Littlewood conjecture"** (lim inf n||nα||·||nβ|| = 0) — counterexample = pair (α,β) with positive lim inf — not a finite object. Fails filter 2. Skip.

135. **"'p-adic Littlewood'"** no.

136. **"'The inverse Galois problem' over Q"** — construction, group-by-group; not named conjecture with counterexample. No.

137. **"'Cohen-Lenstra'"** asymptotic.

138. **"'The ten known sporadic...'"** no.

139. **"'Sporadic finite simple groups' done.** 

140. **"The 'abc-adjacent': 'Szpiro's conjecture'"** no finite object.

141. **"The 'Fermat' right triangle congruent number problem: 'congruent number conjecture'"** (Tunnell resolves under BSD) — no.

142. **"Existence of 'perfect cuboid'"!** — A perfect cuboid: integer box with all edges, face diagonals, and space diagonal integral. Existence unknown; Euler bricks exist (face diagonals only). Finding a perfect cuboid = finite object (a,b,c), verification in seconds (check 7 square roots). Named problem ("perfect cuboid", Wikipedia, Euler 18th century). Famous-ish puzzle. Status: extensive searches — no perfect cuboid with smallest edge < ~10^13 (various searches), and "perfect cuboid must have... " necessary conditions known. If one exists, it's huge. Search: parametric families + SAT/number theory. Plausibility: genuinely uncertain — no heuristic consensus; some think none exist (would follow from... no known implication). The inverse: proving nonexistence is also open. "AI found a perfect cuboid" — fun story, mid-tier fame (it's more of a recreational-famous problem). But the search is very amenable: modular constraints, parametric search, ML-guided construction. Also "almost perfect cuboids" (6 of 7 conditions) known — near-misses exist, which suggests the search space is alive. Honorable mention / top-5.

143. **"'Euler brick with odd edge' / 'perfect Euler brick'"** same family.

144. **"'Heronian tetrahedra / perfect pyramid'"** less famous.

145. **"The '3n+1 for rationals'..."** no.

146. **"The 'Dyson's crank'..."** no.

147. **"The 'Erdős unit fractions: 4/n' (Erdős–Straus)"** covered — fails plausibility (verified 10^17, heuristic true).

148. **"Odd perfect numbers"** covered — strong candidate.

149. **"Amicable/sociable: 'are there infinitely many amicable pairs'"** no finite object. **"Sociable cycles"** record-hunting.

150. **"The 'Cullen/Woodall primes'"** no.

151. **"The 'ABC: quality records' (abc triples with quality > 1.5)"** — record-hunting (ABC@home); not a conjecture.

152. **"The 'Nyman-Beurling'"** no.

153. **"The 'Collatz-like: 5n+1 divergent trajectory'"** — a divergent orbit isn't a finite certificate. A cycle is. Collatz covered.

154. **"The 'palindromic: 196'"** covered.

155. **"The 'Erdős–Ginzburg–Ziv'..."** resolved.

156. **"The 'zero-sum: Davenport constant of G=Z_n^3'"** — open for... Davenport constant for rank-3 groups unknown in general; specific finite computations; semi-named. Niche.

157. **"The 'Hadwiger-Nelson of the sphere / Borsuk'"** meh.

158. **"The 'chromatic number of unit-distance graphs in Q^2'..."** niche.

159. **"SAT: 'Keller-like: tilings by unit cubes in other variants' (Keller with different constraints)"** meh.

160. **"The 'Füredi-Hajnal' / Stanley-Wilf"** — RESOLVED (Marcus-Tardos 2004). Done.

161. **"The 'permutation: Stanley-Wilf limits'"** — existence of growth-rate limits resolved? The "Stanley-Wilf conjecture" resolved; specific limits (1324 pattern) open — asymptotic, no finite object. Skip.

162. **"The 'sorting: 17-18 pancake'..."** meh.

163. **"The 'Ramsey: R(5,5)'"** sibling (graph).

164. **"The 'Ramsey-like: Erdős–Hajnal'..."** asymptotic.

165. **"The 'van der Waerden numbers W(2,6)'..."** — exact values open beyond small; W(2,6)=1132 found by SAT (Kouril 2012). Finding W(3,4)? Record-hunting on named-ish objects. Weak fame. Honorable mention at best.

166. **"The 'Schur number S(6)'"** — S(5)=160 by SAT (2017, big cert 2PB). S(6) open; bounds 536 ≤ S(6) ≤ 1836? (lower 536? Heule's construction; upper?). Improving either bound = SAT-scale. "Named" — Schur numbers have Wikipedia. Splash: moderate (S(5) got a Quanta mention? It got press as "biggest math proof"). Honorable mention.

167. **"The 'Boolean Pythagorean triples: unbounded variants'"** done.

168. **"The 'Harary-Hill conjecture' (crossing number of K_n)"** — asymptotic but rectilinear crossing number values are finite computations; conjectured formula; counterexample = a drawing with fewer crossings than conjectured + certification. Certification of crossing-minimality is the hard part (lower bound). Hmm, a drawing BEATING the Harary-Hill formula would immediately disprove it (certificate = the drawing, checkable in polynomial time!). Status: verified for n ≤ 12 (and n=13?); conjectured value Z(n). If a counterexample drawing exists for some n, it's finite and cheap to verify. Named (Harary-Hill conjecture, Wikipedia "Turán's brick factory problem"). Plausibility: believed true; the formula holds for all computed n. Fails plausibility mostly. Sibling-beat adjacent (topological graph theory). Skip/mention.

169. **"The 'crossing number of K_13' exact"** — record-hunting.

170. **"The 'Erdős distinct distances: 45°'"** no.

171. **"The 'Minkowski lattice: sphere packing in dim 10-16' optimal"** — open, constructions (laminated lattices); proving optimality hard; finding denser packing = finite-ish object (basis matrix), verification cheap (compute shortest vectors — certifiable). "Named": densest sphere packing in dimension d is a named problem per-dimension. Dim 10: laminated Λ10 vs "P10a" non-lattice packings (Best's packing denser!). Actually in dim 10 the densest known is a non-lattice packing. Conjectures: Conway-Sloane guessed laminated in many dims, already beaten in 10,11,12,13. Finding denser packings = record-hunting with real fame in the community; "AI finds record sphere packings" = FunSearch-shaped story. Moderate. Honorable mention.

172. **"The 'Thomson problem' / Tammes"** — record-hunting, semi-named.

173. **"The 'maximum determinant of {0,1} matrices'"** — open for many n; record-hunting; Ehlich's bound conjectured tight for some classes; niche.

174. **"The 'D-optimal designs'"** niche.

175. **"The 'Ryser's conjecture on circulant Hadamard'"** covered above — honorable mention.

176. **"The 'Prime power conjecture' via order-12 projective plane"** covered — top-tier but sibling beat (designs). I'll flag.

177. **"The 'Graceful permutation / terraces'"** niche.

178. **"The 'Langford pairing' / 'Skolem'"** resolved-ish.

179. **"The 'Erdős–Heilbronn conjecture'"** resolved (Dias da Silva–Hamidoune). Done.

180. **"Additive number theory: 'Snevily's conjecture'"** resolved-ish (Dasgupta et al. / Arsovski for odd order). Mostly done.

181. **"The 'Davenport constant for C_n^r'"** niche.

182. **"The 'zero-sum: EGZ generalizations: Harborth constant'"** niche.

183. **"The 'Diophantine: x^3+y^3+z^3 = 33/42'"** — RESOLVED (Booker-Sutherland 2019-2020, massive splash!). Done — but precedent: "AI/computation cracked sum of three cubes" was huge news (Numberphile, Quanta). Remaining: k=114? Booker-Sutherland: 42 done 2019. Remaining under 1000: 114, 390, 627, 633, 732, 921, 975? As of 2024, 114 was solved? Hmm — I recall 114 still open... Actually the list of unsolved under 1000 after 42: 114, 390, 627, 633, 732, 921, 975. Not a named conjecture; record-hunting on a famous equation. The x³+y³+z³ search method (Booker's hashing trick) is well-defined; more cubes = diminishing returns splash-wise. Honorable mention as precedent.

184. **"The 'Waring: g(4)=19 resolved; ideal Waring'"** — "Euler's conjecture that g(k) = 2^k + floor((3/2)^k) - 2" — proven for almost all k, open for finitely many k where it depends on fractional part of (3/2)^k! Specifically: if {(3/2)^k} ≤ 1 - (3/4)^k... The exceptional k: verifying g(k) formula holds for all k up to 471,600,000; beyond that it hinges on the distribution of (3/2)^k mod 1 — connected to "Waring's problem exceptional k" and Mahler's Z-numbers! **Mahler's Z-number problem**: does there exist a positive x such that fractional parts of x(3/2)^n < 1/2 for all n? Conjectured no (Mahler). A Z-number = not a finite object. Fails. Skip.

185. **"The 'Furstenberg ×2×3'"** no finite object.

186. **"The 'Erdős–Straus' covered.** 

187. **"The 'Brocard's problem' (n!+1 = m²)"** — Brown numbers; conjectured only 3 solutions (4,5,7). Counterexample = single (n,m) = finite object, verification: compute n!+1, check square — n might be huge but certificate is just the pair; verification cost O(n) multi-precision mults, cheap even for n~10^9. Named ("Brocard's problem / Brown numbers", Wikipedia). Verified: no solutions for n up to 10^9 (Berndt-Galway). Heuristic (abc-ish): finitely many, probably just the three. Plausibility low. Same bucket as Goldbach: passes 4 filters, fails plausibility. Mention.

188. **"The 'Fermat primes: only 5' conjecture"** — counterexample = a 6th Fermat prime = finite object, verification via Pepin's test — cheap! Named, famous. Status: F_5..F_32 all composite (F_33? open? As of now F_33's character unknown... I think F33 is unknown status; compositeness known up to F_32? Actually: F_33 is the smallest Fermat number whose character is unknown (as of recent years, after F_24 etc. resolved). Pepin test on F_33 (~2.5 billion digits) is beyond current compute — infeasible. Search dead. Skip.

189. **"The 'Wall-Sun-Sun primes' (Fibonacci-Wieferich)"** — existence of any Wall-Sun-Sun prime is open! Finding ONE = finite object, verification: check p² | F_{p-(p/5)} — O(log p) fibonacci mod p², seconds! Named (Wikipedia "Wall–Sun–Sun prime"). Tied to FLT first case history (Wieferich). Status: searched to ~10^17 (PrimeGrid 2020ish, no finds). Heuristic: expected number up to x ~ log log x (like Wieferich) — so they should exist but are incredibly sparse; expected first could be ~10^18+? Wieferich primes: only 2 known (1093, 3511), searched to 10^17. A Wall-Sun-Sun prime find = decent story ("prime that eluded search for 80 years"), not front-page-of-math but real. Plausibility: genuinely plausible IF you can search far enough — but the search is brute-force-ish (no shortcut known beyond FFT screening); beating PrimeGrid's 10^17 needs serious GPU. Feasibility: medium-hard. Honorable mention / top-5.

190. **"The 'Wieferich: third Wieferich prime'"** same genre, more famous! Finding a third Wieferich prime = finite object, trivial verification (2^{p-1} ≡ 1 mod p²). Named ("Wieferich prime", Wikipedia, FLT history — only 1093 and 3511 known since 1910s!). Searched to ~10^17 (Dorais-Klyve: no others below 6.7×10^15; PrimeGrid extended). Heuristic: expected count to x is ~ log log x, so a third should exist around e^{e^3} ≈ 5×10^8?? Wait — expected number of Wieferich primes up to x ≈ log log x: log log(10^17) ≈ 3.67 — we've found 2, so statistically consistent; the third expected when log log x ≈ 3 → x ≈ e^{e^3} ≈ 5.4×10^8?? That's already covered. log log x = 4 → x = e^{e^4} ≈ e^54.6 ≈ 5×10^23. So the third Wieferich prime plausibly lives around 10^20-10^24. Searching to 10^23 is a massive but maybe GPU-feasible-ish campaign (PrimeGrid Wieferich@home reached ~10^17). Hmm — 6 orders of magnitude beyond current frontier is a lot but the screening is FFT-amenable. "AI found the third Wieferich prime in a century" — real story, moderate fame. Where's the AI angle though — it's brute force. Weak "AI found it" story; it's compute-found. Same critique applies to Wall-Sun-Sun. Honorable mentions.

191. **"The 'Wilson primes: 4th Wilson prime'"** (p² | (p-1)!+1) — only 5, 13, 563 known. Same genre. Searched to ~2×10^13 (Costa et al.). Expected third... fourth around 10^20+. Same story.

192. **"The 'Giuga: composite Giuga number'"** covered — fails feasibility (heuristic puts first at ~10^1700 digits? The Borwein heuristic: composite Giuga numbers with k prime factors... expected very rare). Skip.

193. **"The 'Agoh-Giuga'"** skip.

194. **"The 'Perfect: triperfect/multiperfect numbers'"** — record-hunting; new multiperfect numbers found occasionally; semi-named. Meh.

195. **"The 'weird numbers' (abundant not semiperfect): are there odd weird numbers?"** — open! Finding an odd weird number = finite object, verification cheap (compute divisors, check no subset sums to n — subset-sum verification needs a certificate? "not semiperfect" is a universal claim — you'd verify via subset-sum DP which for n ~ 10^18 is infeasible... actually weird numbers found are small; checking a candidate n requires subset-sum over divisors — for n up to ~10^10 DP is fine. If odd weird exists it's estimated > 10^17 (necessary: >10^17? there's a bound by... odd weird numbers, if exist, > 10^21? Not sure). Verification cost for huge n becomes an issue (subset sum DP on n). Borderline filter 4. Meh. Skip.

196. **"The 'Ore's harmonic divisor / perfect'"** meh.

197. **"The 'Sociable numbers / amicable: new records'"** meh.

198. **"Discrete geometry + SAT HOT: 'the chromatic number of the plane' covered. 'The fractional chromatic number of the plane' (bounds 3.899-4.36)"** — improving = finite objects (weighted graphs / measurable colorings?) — fractional chromatic lower bounds come from finite unit-distance graphs with weights (a finite object!). Upper bound = measurable coloring (not finite). Lower bound improvement: current best finite graph fractional chromatic ~3.8992 (from SAT-ish constructions, Croft's turtle...). "Named problem" umbrella. Medium.

199. **"The 'Moser's problem: chromatic of Q(√2)...'"** niche.

200. **"The 'Erdős–Ko–Rado'..."** resolved.

OK. So my beat's realistic top tier:

**A. Odd perfect number** (construction side of a famous open problem). Filters: 1 ✓ (2000-year-old problem, Wikipedia, Euler, Descartes, massive literature); 2 ✓ (a single N); 3 ✓ (no meta-theorem — the conjecture "none exist" is not theorem-capped; if one exists, exhibiting it is decisive); 4 ✓ (σ(N)=2N check in seconds once factored — wait, verification requires computing σ(N) which requires full factorization of N — the prover supplies the factorization as part of the certificate; then σ check is multiplications, cheap ✓). Plausibility: this is THE question. Heuristics: most experts believe none exist (Wagstaff's heuristic, the "spoof" analysis). Necessary conditions: N > 10^1500, ≥10 distinct prime factors (Nielsen), ≥101 prime factors counted with multiplicity? (Ochem-Rao), not divisible by 105? etc. The search: direct brute force impossible; constructive "factor chain" methods (Brent-Cohen-te Riele found the "Descartes spoof" F = 198585576189 which is a spoof OPN with one faux prime factor). A genuine research program: SAT/ILP-guided factor-chain construction targeting real primes, or finding spoofs with fewer faux factors (a spoof with zero faux factors = a real OPN). Feasibility: genuinely hard but the factor-chain search space is exactly the kind of thing CP/SAT + ML guidance attacks; and partial spoofs are intermediate "results" (new spoofs with better properties are publishable). Splash if found: absolutely enormous — front page everywhere, "2000-year-old problem." But honest assessment: plausibility of success in weeks-months is low. Expected value: high ceiling, low probability, good intermediate artifacts.

**B. Matrix multiplication rank (beat Laderman's 23 for 3×3×3, or improve ⟨4,4,4⟩ to ≤46 over Z/rationals)**. Filters: 1 — named open problem, 50+ years, Strassen-Laderman lineage, AlphaTensor precedent (Nature 2022) proves both feasibility of the method and the publicity; it's arguably "the" named problem of algebraic complexity. 2 ✓ finite object (decomposition). 3 ✓ no cap. 4 ✓ verify the Brent equations in minutes with exact arithmetic. Plausibility: HIGH relative to everything else — AlphaTensor already beat human records over F2; over Z nothing better than Laderman's 23 for 3×3 has been found in 50 years, but the search space is now tractable with modern RL + SAT hybrid (people encode tensor decomposition as SAT/continuous optimization). The gap [19,23] is huge by field standards. Downside: "other labs would follow" — DeepMind already did; being second-mover in the exact AlphaTensor genre weakens novelty, but a 3×3 result over the integers would beat AlphaTensor's own frontier (they didn't improve 3×3 over Z either — actually AlphaTensor didn't beat 23 for 3×3; they improved 4×4 over F2 from 49→47 and 5×5 from 98→96 over F2; over Z they matched). So beating Laderman 23 over Q would beat DeepMind itself. That's a hell of a story: "beat AlphaTensor at its own game."

**C. Hadwiger–Nelson: find a 6-chromatic unit-distance graph**. Filters: 1 — named famous problem (70+ years, Wikipedia, de Grey 2018 splash with Quanta + Polymath 16); 2 ✓ (finite graph with algebraic coordinates); 3 ✓ no cap; 4 ~ (edge-length checks cheap; non-5-colorability needs a SAT UNSAT certificate — DRAT proof, checkable with standard tools, this is exactly the Keller precedent for verification legitimacy). Plausibility: unknown — χ could be 5; if it's 6, the minimal witness might be big (de Grey needed ~500-1500 vertices for 5-chromatic; a 6-chromatic might need tens of thousands?). Search: MCTS/RL construction + SAT coloring checks — literally the Wagner method + FunSearch. Splash: very high ("chromatic number of the plane jumps to 6"). Note: some people (de Grey himself) have heuristic arguments χ ∈ {5,6,7}. Also relevant: SAT attacks on HN exist in literature. Strong candidate.

**D. Lonely runner conjecture — counterexample for n=8 (or verify frontier)**. Filter 1 ✓ (named, Wikipedia, Tao/Terence wrote about it, serious literature); 2 ✓ (a speed vector (v1..v7) + certificate); 3 ✓; 4 ✓ (interval-arithmetic certification of "runner i never lonely" — computable in seconds-minutes; rigorous via interval methods). Plausibility: believed true... but here's the thing — for the counterexample hunt what matters is whether counterexamples plausibly exist. The conjecture has been verified numerically for huge swaths; most believe true. Also the known reduction: counterexamples can be taken with integer speeds (because the condition is open/scale-invariant? there's a known argument: if counterexample exists, rational/integer counterexample exists). So the search is over integer tuples — enumerable with pruning. Verified by exhaustive search for bounded speeds (e.g., "speeds ≤ some bound checked"). The frontier: proven n≤7; for n=8, numerical/exhaustive verification up to certain bounds (there's literature: "computational verification of lonely runner for n=8 with speeds ≤ 50" or similar). If a counterexample exists with moderately-sized speeds, search finds it; but heuristics say true. Medium plausibility.

**E. Singmaster's conjecture — find N with multiplicity ≥9** (or ≥ the conjectured bound O(1)). Filters: 1 — named (Wikipedia "Singmaster's conjecture"), history (Singmaster 1971); 2 ✓ (a single N); 3 ✓; 4 ~ (verification = exhibit all representations N = C(n_i, k_i) AND prove there are no others? No — for a counterexample to "multiplicity bounded by 8," you just exhibit N with ≥9 verified representations — multiplicity is AT LEAST 9; you don't need to prove no more exist! So certificate = list of 9+ (n_i, k_i) pairs, each checkable in seconds ✓✓). Plausibility: Singmaster showed N(a,b)=O(1); known max multiplicity is 8 (N=3003, achieved by C(3003,1)=C(78,2)=C(15,5)=C(14,6)). Are there N with multiplicity ≥9? Heuristic: counting argument — expected number of representations of N... Singmaster conjectured multiplicity ≤ some constant (he suggested maybe 12 or so? He conjectured N(a,b) = O(1) and suggested 12 as plausible bound after computing many values — actually Singmaster computed up to some bound and conjectured max multiplicity grows slowly; he specifically conjectured it might be bounded by 12? Let me recall: Singmaster's conjecture: N(a,b) = O(1). He suggested perhaps N(a,b) ≤ 12? Hmm, I recall "Singmaster conjectured the maximum multiplicity is bounded by a small constant, perhaps 12". Known: infinitely many N have multiplicity ≥6; multiplicity 8 known only for 3003? No — multiplicity 6 infinitely many, 8: is 3003 the only one? There are others? I believe 3003 has multiplicity 8 and it's the highest known. A search for multiplicity-9: involves finding N with many binomial representations — related to finding solutions to C(n,k)=C(m,j) which connects to the "Singmaster" literature and equal-products-of-binomials. There are parametric families giving multiplicity 6 (e.g., from Fibonacci-type identities). Multiplicity 8 needs 3003-like coincidences. The search: enumerate candidate N via C(n,k) collisions with k ≤ 6 or so — computational but clever (hashing binomial values). The heuristic density: number of binomial coefficients ≤ X is ~ X^{1/2}·log-ish... collisions of multiplicity m scale like... For multiplicity 9 you might need N astronomically large. Hmm, plausibility: genuinely unknown — could be a FunSearch-shaped hunt. Splash: moderate ("century-old question about Pascal's triangle"). Medium candidate.

**F. Perfect cuboid / Euler brick** — moderate fame, genuine uncertainty, near-misses exist. Search: parametrized + modular. Splash: good ("300-year-old Euler problem"). Medium.

**G. Lander–Parkin–Selfridge** — the direct descendant of the Euler sum-of-powers precedent. Open for n ≥ ... violations m+k<n none known; heuristic: for fixed n with m+k = n-1, expected solutions exist but with very large numbers (density). Search: meet-in-the-middle over sorted power sums — GPU-amenable, exactly like EulerNet/Meyrignac's project which ran for years. Splash if a violation found: good in the number theory community + "killed the conjecture that replaced Euler's" narrative; the name recognition is lower than Euler's original. Medium candidate.

**H. Odd
```