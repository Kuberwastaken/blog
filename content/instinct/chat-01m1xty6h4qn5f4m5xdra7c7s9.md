---
title: "hodge: sankaran-type citation dig (chat-01M1XTY6H)"
---

_1 transcript files aggregated._

Literature dig for the hodge counterexample writeup. Find the citable reference for this exact statement: the Chow ring presentation of a toric bundle (stratum in a Beauville/BGvG-type degeneration) as CH(stratum) = CH(B)[x_rays] / (Stanley-Reisner ideal + twisted linear relations), where the twist comes from Pic^0 extension classes of the line bundles (the lam=0 split case reducing to the product presentation). A Sankaran-type reference is expected (Sankaran's work on Chow rings of toric bundles / wonderful compactifications), but identify the RIGHT paper/theorem with exact statement and numbering. Verify the reference actually says what is needed (twisted-linear-relations form, not only the product case): pull the actual text where accessible (arXiv, journal, author's page). Report: full citation, exact theorem/section number, verbatim statement, source URL, and how the lam-twist appears in their notation. If Sankaran doesn't cover the Pic0-twisted case, find what does.

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
The task: literature dig for Chow ring presentation of toric bundles with twisted linear relations from Pic^0 extension classes. The expected reference: Sankaran's work on Chow rings of toric bundles. Actually the classical reference is "Chow rings of toric bundles" — there's a paper by P. Sankaran and V. Uma, "Cohomology of toric bundles" (Comment. Math. Helv. 78 (2003), 540-554), which gives H*(E) = H*(B)[x_1..x_n] / (Stanley-Reisner + linear relations twisted by c_1 of line bundles). They assume line bundles, and the twist is the first Chern class of the line bundle. For the Chow ring version, Sankaran-Uma also have "Chow rings of toric bundles"? Let me think: there's a paper "Chow ring of toric bundles" maybe by K. Kaveh? Actually the general result: for a toric bundle E → B with fiber X_Σ, CH*(E) ≅ CH*(B)[x_ρ] / (SR ideal + (χ^u terms with c_1(L_u))). The reference commonly cited: Sankaran–Uma, "Cohomology of toric bundles" (2003) and its erratum; for Chow rings with rational coefficients, Fulton-Sturmfels? Also "The Chow ring of a toric bundle" — I recall a paper by Sankaran: "The Chow ring of a toric bundle" perhaps in the context of torus-equivariant... There's also Katz-Payne? Hmm.

For the Pic^0 twist: the parent context involves line bundles whose classes are Pic^0 (algebraically trivial), so c_1 = 0 homologically, and the twist appears at Chow level as elements in CH^1(B) that may be nonzero in Pic^0 ⊂ CH^1. The twisted linear relations take the form x_i ~ terms involving [L_ρ] ∈ CH^1(B) = Pic(B). Sankaran-Uma's formula uses the first Chern class of the associated line bundles, which in Chow is the class of the divisor/line bundle in Pic(B). So the relevant statement: CH*(E) = CH*(B)[x_ρ]/(SR + linear relations ∑⟨u,v_ρ⟩(x_ρ − c_1(L_ρ))... ).

Key papers to search:
1. P. Sankaran and V. Uma, "Cohomology of toric bundles", Comment. Math. Helv. 78 (2003), no. 3, 540–554; Erratum 79 (2004), 840–841.
2. There's also "Chow rings of toric bundles" maybe by K. Kaveh "Note on cohomology rings of spherical varieties and volume polynomial" (J. Lie Theory 21 (2011)) — Kaveh proved cohomology ring of spherical varieties via polytopes, using Sankaran-Uma.
3. For Chow rings specifically over Q: maybe "Sankaran, P.: The Chow ring of a smooth toric variety"? Hmm.

Actually I recall: Sankaran–Uma's paper works with Borel-Moore homology? No — their main theorem: H*(E; Z) ≅ H*(B; Z)[x_1,...,x_m]/(SR + I) where I generated by linear forms λ_u = Σ⟨u,v_i⟩ x_i − c_1(L_u)... something like that. The erratum corrects the sign/form of the relations.

For the Chow ring (not just cohomology), with Q coefficients: the same presentation holds; reference maybe Ehlers (1975) for B point, and general base: Sankaran–Uma state it for cohomology; the Chow version is folklore but appears in "Fulton, Intersection Theory"? There's also a paper: "Chow rings of wonderful compactifications" — not this. BGvG (Böhning, Graf von Bothmer, van Garrel) paper arXiv:1911.08930 "Prelog Chow groups of self-products of degenerations of cubic threefolds" — they might cite a specific presentation. The parent's memory mentions BGvG Thm 3.2 and "all 13 star-fan shapes", "Sankaran-Uma hypotheses machine-certified". So the writeup already cites Sankaran-Uma. The pin: formal-vs-actual Chow descent turning on CH²(B) Pic⁰-product table. The user wants the exact citable reference for the presentation with twist from Pic^0 extension classes.

Let me search the web to verify exact statements and numbering. Sankaran-Uma: Theorem 1.2? I recall the main theorem is Theorem 1.2 in the erratum? Let me actually search.

Plan: web_search for "Sankaran Uma cohomology of toric bundles theorem", fetch arXiv version (math/0304010? maybe "math.AG/0304010"? I think it's arXiv:math/0304010?). Then pull actual text from arXiv HTML (ar5iv). Also check Kaveh's paper and possibly "Hofscheier" or "Chow ring of toric bundles" by... Also maybe De Concini-Procesi? Also "M. Hering?". There's also the paper "Equivariant Chow rings of toric bundles"? Hmm.

Also relevant: BGvG arXiv:1911.08930v3 — check how they cite the presentation. Also Sankaran's "The Chow ring of a smooth projective toric variety"? no.

Let me batch: web_search several queries in one bash call (async or sequential). Then fetch arXiv abs pages and ar5iv full text.

ArXiv ID for Sankaran-Uma "Cohomology of toric bundles": I believe it's math.AG/0304010... not sure. Let me search.

First turn: run multiple web_search calls.
```

Tool: bash

Arguments:
```json
{"command": "tools web_search --query 'Sankaran Uma \"Cohomology of toric bundles\" Commentarii Mathematici Helvetici arxiv' --limit 8 --json 2>/dev/null | head -c 3000; echo; echo ====; tools web_search --query 'Chow ring of toric bundle \"Stanley-Reisner\" presentation line bundles c_1 theorem' --limit 8 --json 2>/dev/null | head -c 3000"}
```

Tool: bash

<tool-result-overflow>
Output exceeded the inline tool-result budget (14792 estimated tokens; limit 10000).
Full content: /observations/chat-sessions/chat-01M1XTY6H4QN5F4M5XDRA7C7S9/artifacts/bash_0.txt
Full structured output: /observations/chat-sessions/chat-01M1XTY6H4QN5F4M5XDRA7C7S9/artifacts/bash_0.json
Preview:
[{"domain":"doi.org","highlights":["# Cohomology of toric bundles\n...\nCommentarii Mathematici Helvetici. Published: 2003-09-30. 36 citations.\n...\n- Parameswaran Sankaran (Institute of Mathematical Sciences): h-index 14; 702 citations\n- V. Uma (Institute of Mathematical Sciences): h-index 6; 197 citations\n...\n# Commentarii Mathematici Helvetici Cohomology of toric bundles\n...\nLet p : E-→B be a principal bundle with fibre and structure group the torus T ∼ = (C * ) n over a topological space B. Let X be a nonsingular projective T -toric variety. One has the X-bundle π : . This is a Zariski locally trivial fibre bundle in case p : E-→B is algebraic. The purpose of this note is to describe (i) the singular cohomology ring of E(X) as an H * (B; Z)-algebra, (ii) the topological K-ring of K * (E(X)) as a K * (B)-algebra when B is compact. When p : E-→B is algebraic over an irreducible, nonsingular, noetherian scheme over C, we describe (iii) the Chow ring of A * (E(X)) as an A * (B)-algebra, and (iv) the Grothendieck ring K 0 (E(X)) of algebraic vector bundles on E(X) as a K 0 (B)-algebra.\n...\nNote that for any cohomology theory H, H * (E(X)) is an H * (B)-algebra via the induced map π * : H * (B)-→H * (E(X)). The following is our main theorem: Theorem 1.2. Let π : E-→B be a principal T -bundle over an arbitrary topological space B. Assume that X is a smooth complete T -toric variety and that ∆(n) has been ordered so that ( * ) holds. With above notations, (i) The singular cohomology ring of E(X) is isomorphic as an H * (B; Z)-algebra to R(H * (B; Z), ∆), with\n...\nr i = c 1 (ξ ∨ i ) ∈ H 2 (B; Z). (ii) When B is compact, the K-ring K * (E(X)) of complex vector bundles over E(X) is isomorphic as a K * (B)-algebra to R(K * (B); ∆) where r i = [ξ ∨ i ] ∈ K(B), 1 ≤ i ≤ n.\n...\n(iii) The Chow ring A * (E(X)) of E(X) is isomorphic as an A * (B)-algebra to R(A * (B), ∆) where r i = c 1 (ξ ∨ i ) ∈ A 1 (B), 1 ≤ i ≤ n. (iv) T
...
</tool-result-overflow>

Structured:
```json
{"overflow":true,"estimated_tokens":14792,"max_inline_tokens":10000,"content_path":"/observations/chat-sessions/chat-01M1XTY6H4QN5F4M5XDRA7C7S9/artifacts/bash_0.txt","structured_path":"/observations/chat-sessions/chat-01M1XTY6H4QN5F4M5XDRA7C7S9/artifacts/bash_0.json"}
```

```thinking
The search found Sankaran-Uma "Cohomology of toric bundles" CMH 2003, with Theorem 1.2 covering (iii) Chow ring as A*(B)-algebra R(A*(B), ∆) with r_i = c_1(ξ_i^∨) ∈ A^1(B). Now I need the full text: the presentation R(R, ∆) = R[x_1..x_n]/(SR ideal + linear relations twisted by r_i). Need exact statement, theorem numbering (Theorem 1.2), and erratum (CMH 79 (2004) 840–841) which corrected something. Also the parent says "Sankaran-Uma hypotheses were machine-certified" — likely from a previous writeup. Need exact statement of the relations: R(R, ∆) := R[x_1,...,x_n]/I where I generated by monomials (SR) and elements λ_i = Σ_j <χ_j? ...> Actually the linear relations: for each character u of T, Σ <u, v_i> (x_i - r_i)? Let me fetch the actual paper. arXiv: math/0304010? Search arXiv. The doi.org result highlights give text. Let me fetch the full text from arXiv (ar5iv) or the journal. Search for arXiv ID.

Also check the erratum: "Erratum to 'Cohomology of toric bundles'" CMH 79 (2004) 840–841 — it corrects the statement about the ordering condition (*) maybe. Need to confirm what the erratum changes.

Also for the Pic^0 twist: in Sankaran-Uma, the twist is c_1(ξ_i) ∈ A^1(B). If line bundle is in Pic^0 (algebraically trivial), c_1 = 0 in cohomology but nonzero in A^1(B) = Pic(B) ⊕ NS? Actually A^1(B) = Pic(B) for smooth B, and Pic^0 ⊂ Pic. So the Chow statement with r_i ∈ A^1(B) does carry the Pic^0 class. That's exactly what the user wants: the twist by Pic^0 extension classes appears in Chow as the class of the line bundle ξ_i in A^1(B), while in cohomology only its first Chern class survives (vanishing for Pic^0). So Sankaran-Uma part (iii) covers it. 

Also there might be a more recent reference specifically for "Chow rings of toric bundles" — e.g., "The Chow ring of a toric bundle" by ... hmm, there's a 2019+ paper by Sankaran? Or "K. Kaveh"? Also possibly relevant: BGvG 1911.08930 uses prelog Chow; the stratum presentation in their paper — check how they cite. Also, there's Sankaran's paper "The ring of modular forms..."? Not relevant.

Let me fetch: arXiv page for Sankaran-Uma. Search arxiv for it, fetch ar5iv full text, and fetch erratum info.
```

Found the expected Sankaran–Uma reference. Now let me pull the actual theorem text.

Tool: bash

Arguments:
```json
{"command": "tools web_search --query 'arxiv Sankaran Uma \"toric bundles\" math.AG' --limit 6 --json 2>/dev/null | python3 -c \"import json,sys; d=json.load(sys.stdin); [print(r['url'],'|',r['title']) for r in d]\"; echo ====; tools web_search --query '\"Erratum\" Sankaran Uma \"toric bundles\" Comment Math Helv 79 2004 840' --limit 6 --json 2>/dev/null | python3 -c \"import json,sys; d=json.load(sys.stdin); [print(r['url'],'|',r['title']) for r in d]\""}
```

Tool: bash

https://arxiv.org/abs/math/0212053 | [math/0212053] Cohomology of toric bundles - arXiv
https://export.arxiv.org/pdf/math/0212053v2.pdf | 
https://doi.org/10.1007/s00014-003-0761-1 | Cohomology of toric bundles
https://arxiv.org/abs/2006.12043 | Cohomology rings of toric bundles and the ring of conditions - arXiv
https://arxiv.gg/abs/math/0212053 | Cohomology of toric bundles - arXiv.gg
https://arxiv.org/pdf/math/0504107 | 
====
https://doi.org/10.1007/s00014-004-0817-x | Erratum
https://link.springer.com/ | Erratum to: Cohomology of toric bundles - Springer Nature
https://doi.org/10.2748/tmj/1232376162 | \$K\$-rings of smooth complete toric varieties and related spaces
https://doi.org/10.1515/forum-2023-0074 | K-theory of flag Bott manifolds
https://projecteuclid.org/ | K-RINGS OF SMOOTH COMPLETE TORIC VARIETIES ...
https://www.jstage.jst.go.jp/article/tmj/60/4/60_4_459/_pdf/-char/en | Tohoku Mathematical Journal, Vol.60, No.4, 459-469 (2008)


[exit code: 0]

Structured:
```json
[{"rank":1,"title":"Erratum","url":"https://doi.org/10.1007/s00014-004-0817-x","domain":"doi.org","published_date":"2004-10-01","highlights":["Parameswaran Sankaran\n...\nInstitute of Mathematical Sciences): h\n...\n702 citations\n- V. Uma (Institute of Mathematical Sciences): h-index 6; 197 citations\n...\nVol.\n...\n9 (200\n...\n841\n...\nCohomology of toric bundles P Sankaran V Uma Comment. Math. Helv 78 2003 P. Sankaran and V. Uma, Cohomology of toric bundles, Comment. Math. Helv. 78 (2003), 540-554."],"image":null},{"rank":2,"title":"Erratum to: Cohomology of toric bundles - Springer Nature","url":"https://link.springer.com/","domain":"link.springer.com","published_date":null,"highlights":["Home | Springer Nature Link\n\n# Home for all research\n\nSearch for articles, journals, books, authors\n\nSearch\n\n185 million monthly downloads\n\n24 million monthly readers\n\n3 million authors submit annually\n\n## Discover open access\n\n## Publish with us\n\n## Track your research\n\n## Our brands\n\n## Call for papers\n\nLog in for personalised recommendations.\n\nCollection\n\n### Edge-Computing AI for Medical Devices\n\nElectronic medical devices can be implantables, wearables, and remote. These devices can collect varioius multimodal and multigrain bio-signals invasively or non-invasively. This large heterogeneous data from medical devices contains tremendous information that can be analyzed with artificial...\n\nSubmission deadline 31 October 2025\n\nCollection\n\n### Interruption of Amino Acids Supply as Anti-Tumor Strategy\n\nThe interruption of amino acids supply has emerged as a promising anti-tumor strategy, with research focusing on the metabolic vulnerabilities of cancer cells. Depletion of essential amino acids necessary for tumor growth has shown potential in inhibiting cancer cell proliferation and inducing cell...\n\nSubmission deadline 31 December 2025\n\nCollection\n\n### Photothermal Membranes for Water Treatment\n\nThis topical collection aims to showcase the latest developments in photothermal materials and their applications in solar-driven water treatment and desalination technologies. The journal will publish innovative research on the design, synthesis, and performance evaluation of various photothermal...\n\nSubmission deadline 23 June 2025\n\nSee all calls for papers\n\n## Trending research\n\nArticle\n\n### Fish climbing in the upper Congo Basin (Central Africa), first report for the shellear Parakneria thysi on the Luvilombo Falls\n\nArticle\n\n### Beavers can convert stream corridors to persistent carbon sinks\n\nCommunications Earth \u0026 Environment\n\nResearch\n\n### Sleep timing irregularity in midlife: association with incident major adverse cardiac events and cardiovascular disease mortality over a 10-year follow-up\n\nArticle\n\n### A versatile self-cleaning fabric coating as a detergent-free laundry product\n\nArticle\n\n### Graphene Aerogel-Based Flexible Pressure Sensor for Physiological Signal Detection and Human–Machine Interaction\n\n## Featured journals\n\n### Artificial Intelligence Review\n\nArtificial Intelligence Review is a fully open access journal publishing state-of-the-art research in artificial intelligence and cognitive science.\n\nJournal Impact Factor 13.9 (2024)\n\nDownloads 5.1M (2025)\n\n### Discover Sustainability\n\nDiscover Sustainability is an open access journal publishing research across all fields relevant to sustainability.\n\nJournal Impact Factor 3.0 (2024)\n\nDownloads 4.2M (2025)\n\n### Journal of Epidemiology and Global Health\n\nThe Journal of Epidemiology and Global Health is an international peer reviewed journal which aims to impact global epidemiology and international...\n\nJournal Impact Factor 3.1 (2024)\n\nDownloads 818.1k (2025)\n\n## Browse by subject\n\n## Featured books\n\n### An Introduction to Statistical Learning\n\n### The Algorithm Design Manual\n\n### Hypertension and Cardiovascular Disease in Asia\n\n### Electronics for Beginners\n\n### Managing your Mental Health during your PhD\n\n### Advances in Diabetes Research and Management\n\n### Technology Roadmapping and Development\n\n### Chief Sustainability Officers At Work\n\n### Surgery\n\n## About Springer Nature Link\n\nAs part of Springer Nature, Springer Nature Link delivers fast access to the depth and breadth of our online collection of journals, eBooks, reference works and protocols across a vast range of subject disciplines.\n\nSpringer Nature Link is the reading platform of choice for hundreds of thousands of researchers worldwide. Find out how to publish your research with Springer Nature."],"image":null},{"rank":3,"title":"\$K\$-rings of smooth complete toric varieties and related spaces","url":"https://doi.org/10.2748/tmj/1232376162","domain":"doi.org","published_date":"2008-01-01","highlights":["Cohomology of toric bundles P Sankaran V Uma Comment. Math. Helv 78 2003. 2004 Errata P. SANKARAN AND V. UMA, Cohomology of toric bundles, Comment. Math. Helv. 78 (2003), 540-554, Errata: 79 (2004), 840-841."],"image":null},{"rank":4,"title":"K-theory of flag Bott manifolds","url":"https://doi.org/10.1515/forum-2023-0074","domain":"doi.org","published_date":"2023-08-24","highlights":["- Parameswaran Sankaran, V. Uma. Cohomology of toric bundles. Commentarii Mathematici Helvetici. 2003;78(3):540-554. doi:10.1007/s00014-003-0761-1.\n...\n- Parameswaran Sankaran, V. Uma. Erratum. Commentarii Mathematici Helvetici. 2004;79(4):840. doi:10.1007/s00014-004-0817-x."],"image":null},{"rank":5,"title":"K-RINGS OF SMOOTH COMPLETE TORIC VARIETIES ...","url":"https://projecteuclid.org/","domain":"projecteuclid.org","published_date":"2011-07-01","highlights":["The Annals of Probability 2011, Vol. 39, No. 4, 1502–1527 DOI: 10.1214/10-AOP591 c Institute of Mathematical Statistics, 2011\n...\nBy Tusheng Zhang University of Manchester\n...\nIn this paper, we prove that there exists a unique solution to the Dirichlet boundary value problem for a general class of semilinear sec ond order elliptic partial\n...\nequations. Our approach is prob abilistic. The theory of Dirichlet processes and backward stochastic differential equations play a crucial role.\n...\nReceived October 2009; revised May 2010. AMS 2000 subject classifications. Primary 60H30; secondary 35J25, 31C25. Key words and phrases. Dirichlet processes, quadratic forms, Fukushima’s decomposi tion, Dirichlet boundary value problems, backward stochastic differential equations, weak solutions, martingale representation theorem. This is an electronic reprint of the original article published by the Institute of Mathematical Statistics in The Annals of Probability, 2011, Vol. 39, No. 4, 1502–1527. This reprint differs from the original in pagination and typographic detail."],"image":null},{"rank":6,"title":"Tohoku Mathematical Journal, Vol.60, No.4, 459-469 (2008)","url":"https://www.jstage.jst.go.jp/article/tmj/60/4/60_4_459/_pdf/-char/en","domain":"jstage.jst.go.jp","published_date":null,"highlights":["Princeton, NJ\n...\n19\n...\n[13] P. SANKARAN AND V. UMA, Cohomology of toric bundles, Comment. Math. Helv. 78 (2003), 540–554, \nErrata: 79 (2004), 840–841. \n[14] P. SANKARAN AND V. UMA, On K-theory of quasi-toric manifolds, Osaka J. Math. 44 (2007), 71–89. \n["],"image":null}]
```

Assistant text is not visible to the user or other agents. Messaging tools must be used to communicate with them.

```thinking
Fetch ar5iv/abs and the full text of math/0212053 (v2 presumably includes erratum corrections). Let me fetch the ar5iv HTML full text.
```

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://ar5iv.labs.arxiv.org/html/math/0212053\" --json 2>/dev/null > /tmp/sankaran_full.json; python3 -c \"\nimport json\nd=json.load(open('/tmp/sankaran_full.json'))\nprint(type(d), len(d) if isinstance(d,list) else d.keys())\nif isinstance(d,list):\n    for it in d: print(it.get('url'), it.get('error'), it.get('title'))\n\""}
```

Tool: bash

<class 'list'> 1
https://ar5iv.labs.arxiv.org/html/math/0212053 None [math/0212053] Cohomology of toric bundles


[exit code: 0]

Structured:
```json
[{"url":"https://ar5iv.labs.arxiv.org/html/math/0212053","title":"[math/0212053] Cohomology of toric bundles","domain":"ar5iv.labs.arxiv.org","published_date":null}]
```

```thinking
The fetch worked but returned only metadata? web_fetch returns markdown content — the OUTPUT JSON showed only {url, domain, error, published_date, title} fields listed, but content may be in another field. Let me check the full JSON keys of the item.
```

Tool: bash

Arguments:
```json
{"command": "python3 -c \"\nimport json\nd=json.load(open('/tmp/sankaran_full.json'))\nit=d[0]\nprint(list(it.keys()))\nfor k,v in it.items():\n    if isinstance(v,str): print(k, len(v))\n\""}
```

Tool: bash

['domain', 'published_date', 'title', 'url']
domain 20
title 42
url 46


[exit code: 0]

```thinking
web_fetch returned no content field — maybe content is delivered as .content in generic response? The OUTPUT JSON for web_fetch lists only those fields; the readable markdown may be in .content when not --json, i.e., text output. Let me fetch without --json and capture output. Or the markdown content might have been truncated. Let me just run web_fetch without --json and save to file.
```

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://ar5iv.labs.arxiv.org/html/math/0212053\" > /tmp/sankaran_ar5iv.txt 2>/dev/null; wc -c /tmp/sankaran_ar5iv.txt; head -c 800 /tmp/sankaran_ar5iv.txt"}
```

Tool: bash

50162 /tmp/sankaran_ar5iv.txt
[1] [math/0212053] Cohomology of toric bundles — ar5iv.labs.arxiv.org
https://ar5iv.labs.arxiv.org/html/math/0212053

[math/0212053] Cohomology of toric bundles

# Cohomology of toric bundles

P.Sankaran and V.Uma Institute of Mathematical Sciences CIT Campus, Chennai 600 113, INDIA E-mail: sankaran@imsc.res.in uma@imsc.res.in

††2000 A.M.S. Subject Classification:- 14M25, 14F15 Key words and phrases: Toric varieties, toric bundles, singular cohomology, Chow ring, and K-theory. This is the corrected version of the paper published in Comm. Math. Helv. 78, (2003), 540–554. The Errata appeared in Comm. Math. Helv. 79, (2004), 840–841.

Abstract: Let \$p:E\mbox{\$\longrightarrow\$}B\$ be a principal bundle with fibre and structure group the torus \$T\cong(\mathbb{C}^{*})^{n}\$ over a topol

[exit code: 0]

Structured:
```json
[{"url":"https://ar5iv.labs.arxiv.org/html/math/0212053","title":"[math/0212053] Cohomology of toric bundles","domain":"ar5iv.labs.arxiv.org","published_date":null}]
```

Tool: bash

Arguments:
```json
{"command": "grep -n -i \"stanley\\|Reisner\\|Theorem 1.2\\|R(\\\\\\mathcal{R}\\|lambda\\|λ\\|monomial\\|definition\" /tmp/sankaran_ar5iv.txt | head -40"}
```

Tool: bash

16:Let \$T\cong(\mathbb{C}^{*})^{n}\$ denote the complex algebraic torus. Let \$M=Hom_{alg}(T,\mathbb{C}^{*})\cong\mathbb{Z}^{n}\$ and \$N=Hom_{alg}(\mathbb{C}^{*},T)\cong\mathbb{Z}^{n}\$ denote the group of characters and the group of \$1\$ -parameter subgroups of \$T\$ respectively. Note that \$M=N^{\vee}:=Hom(N;\mathbb{Z})\$ under the natural pairing \$\langle~{},~{}\rangle:M\times N\mbox{\$\longrightarrow\$}\mathbb{Z},\$ given by \$\chi^{u}\circ\lambda_{v}(z)=z^{\langle u,v\rangle}\$ for all \$z\in\mathbb{C}^{*}\$ . (Here \$\chi^{u}\in\mathbb{C}(T)=\mathbb{C}[M]\$ denotes the character corresponding to \$u\in M\$ and \$\lambda_{v}\$ the \$1\$ -parameter subgroup corresponding to \$v\in N\$ .)
48:###### Definition 1.1
71:###### Theorem 1.2
89:For any cone \$\gamma\in\Delta\$ , denote by \$x(\gamma)\$ the monomial \$x_{j_{1}}\cdots x_{j_{r}}\in S[x_{1},\cdots,x_{d}]\$ where \$v_{j_{1}}\cdots,v_{j_{r}}\$ are the primitive vectors along the edges of \$\gamma\$ .
91:Recall from §1 the definition of the \$S\$ -algebras \$R\$ and \${\cal R}\$ . We shall denote by the same symbol \$x(\gamma)\$ , in \$R\$ and \${\cal R}\$ , the image of the monomial \$x(\gamma)\in S[x_{1},\cdots,x_{d}]\$ under the canonical quotient map.
110:for some \$c,c_{k}\in S\$ . (iv) The monomials \$x(\tau_{i})\$ , \$1\leq i\leq m,\$ span \$R\$ as an \$S\$ -module.
156:for some \$b_{p},b\in S\$ and suitable cones \$\gamma_{p}\in\Delta\$ which contain \$\alpha\$ and are not contained in \$\beta\$ . (iv) The monomials \$x(\tau_{i}),1\leq i\leq m\$ span \${\cal R}\$ as an \$S\$ -module.
176:In this section we shall prove parts (i) and (iii) of the Main Theorem 1.2.
249:Proof of Theorem 1.2 (i), (iii): We first consider part (iii). In view of equations (4) and (6) above we see that we have a well defined homomorphism of algebras: \$\psi:R(A^{*}(B),\Delta)\mbox{\$\longrightarrow\$}A^{*}(E(X))\$ defined by \$\psi(x_{j})=[E(V(\rho_{j}))],1\leq j\leq d\$ .
291:Recall the definition of \${\cal R}\$ from §1.
327:Proof of Theorem 1.2(ii), (iv): To prove (ii), we first show that \$K^{*}(E(X))\$ is a free \$K^{*}(B)\$ -module of rank \$m\$ , the number of \$n\$ -dimensional cones in \$\Delta\$ where \$X=X(\Delta)\$ . With notations as in §4, the restriction of \$[{\cal L}(\tau_{i})],1\leq i\leq m,\$ to the fibre \$X\$ forms a \$\mathbb{Z}\$ -basis for \$K^{*}(X)\$ . Since \$B\$ is compact Hausdorff, it is locally compact and normal. Therefore \$B\$ can be covered by finitely many compact subsets \$W_{1},\cdots,W_{k}\$ such that the bundle \$\pi|W_{r}\$ is trivial for \$1\leq r\leq k\$ . Let \$Y\$ be any closed subset of \$W_{r}\$ . Now using Künneth theorem for K- theory (cf. [8]), we see that \$K^{*}(\pi(Y))\$ is a free \$K^{*}(Y)\$ -module with basis \$[{\cal L}(\tau_{i})|Y]\$ , \$1\leq i\leq m\$ . Applying Theorem 1.3, Ch. IV, [15], we conclude that \$K^{*}(E(X))\$ is a free \$K(B)\$ -module with basis \$[{\cal L}(\tau_{i})],~{}1\leq i\leq m\$ .


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "sed -n '20,110p' /tmp/sankaran_ar5iv.txt"}
```

Tool: bash

Consider the fibre bundle \$\pi:E(X)\mbox{\$\longrightarrow\$}B\$ with fibre the toric variety \$X\$ , where \$E(X)\$ is the fibre product \$E\times_{T}X\$ , and the projection map is defined as \$\pi([e,x])=p(e)\$ . Note that the bundle \$\pi:E(X)\mbox{\$\longrightarrow\$}B\$ is Zariski locally trivial when \$p:E\mbox{\$\longrightarrow\$}B\$ is algebraic. In this paper, we describe the integral singular cohomology ring \$H^{*}(E(X);\mathbb{Z})\$ , and the \$K\$ -ring \$K(E(X))\$ when \$B\$ is a compact topological space. Also, when \$p:E\mbox{\$\longrightarrow\$}B\$ is algebraic and \$B\$ an irreducible nonsingular noetherian scheme over \$\mathbb{C}\$ , we describe the Chow ring \$A^{*}(E(X))\$ , and the Grothendieck ring \${\cal K}^{0}(E(X))\$ of algebraic vector bundles of the complex variety \$E(X)\$ .

Suppose that \$q:V\mbox{\$\longrightarrow\$}X\$ is a \$T\$ -equivariant vector bundle over \$X\$ , then we obtain a vector bundle \$E(V)\$ over \$E(X)\$ with total space \$E\times_{T}V\$ where the bundle projection is the map \$[e,v]\mapsto[e,q(v)]\$ . In case \$V\$ is a \$T\$ -equivariant line bundle associated to a character \$\chi^{u}:T\mbox{\$\longrightarrow\$}\mathbb{C}^{*},\$ the bundle \$E(V)\$ is isomorphic to the pull-back bundle \$\pi^{*}(\xi_{u})\$ where \$\xi_{u}\mbox{\$\longrightarrow\$}B\$ is the line bundle got from \$E\mbox{\$\longrightarrow\$}B\$ by ‘extending’ the structure group via \$\chi^{u}\$ . After fixing an isomorphism, \$T\cong(\mathbb{C}^{*})^{n}\$ , \$u\in M\$ corresponds to an element \$(a_{1},\cdots,a_{n})\in\mathbb{Z}^{n}\$ . The bundle \$E\$ is then the principal bundle associated to the Whitney sum of line bundles \$\xi_{i},1\leq i\leq n,\$ and \$E(V)\$ can then be identified with the tensor product \$\xi_{1}^{a_{1}}\otimes\cdots\otimes\xi_{n}^{a_{n}}\$ . (Here it is understood that, when \$a<0\$ , \$\xi^{a}=(\xi^{\vee})^{-a}\$ .)

When \$B\$ is a non-singular variety any line bundle \$\xi\$ over \$B\$ is isomorphic to \${\cal O}(Y)\$ for some divisor \$Y\$ in \$B\$ . The divisor class \$[Y]\$ is the first Chern class \$c_{1}(\xi)\in A^{1}(B)\$ of \$\xi\$ .

We use the notations of [13] throughout the paper.

For \$k\geq 1\$ , \$\Delta(k)\$ will denote the set of \$k\$ dimensional cones in \$\Delta\$ . We let \$d=\#\Delta(1)\$ , and write \$v_{1},\cdots,v_{d}\$ for the primitive elements of \$N\$ along the edges in \$\Delta\$ . Let \$\rho_{j}\in\Delta(1)\$ be the edge \$\mathbb{R}_{\geq 0}v_{j}\$ . Recall that our hypothesis that \$X\$ is smooth is equivalent to the statement that the set of the primitive vectors along the edges of any cone in \$\Delta\$ is part of a \$\mathbb{Z}\$ -basis for \$N\$ .

For a cone \$\sigma\in\Delta\$ , \$U_{\sigma}\$ denotes the affine toric variety defined by \$\sigma\$ and \$V(\sigma)\$ denotes the closure in \$X\$ of the variety whose local equation in \$U_{\sigma}\$ is \$\chi^{u}=0\$ for all \$u\notin\sigma^{\perp}\$ , \$u\in\sigma^{\vee}\$ . The \$V(\sigma),\sigma\in\Delta,\$ are the orbit closures for the action of \$T\$ on \$X\$ .

For \$1\leq j\leq d\$ let \$L_{j}\$ denote the \$T\$ -equivariant line bundle over \$X\$ which corresponds to the piecewise linear function \$\psi_{j}\$ defined by \$\psi_{j}(v_{i})=-\delta_{i,j}\$ . The line bundle \$L_{j}\$ admits a global \$T\$ -equivariant section \$s_{j}\$ whose zero locus is the variety \$V(\rho_{j})\$ .

Let \$\sigma_{1},\cdots,\sigma_{m}\$ be an ordering of the cones in \$\Delta(n)\$ . Let \$\tau_{i}\in\Delta\$ be the intersection with \$\sigma_{i}\$ of those cones \$\sigma_{j}\$ , \$j>i,\$ such that \$\dim(\sigma_{i}\cap\sigma_{j})=n-1.\$ Thus \$\tau_{1}=0\$ , and \$\tau_{m}=\sigma_{m}\$ . Consider the condition:

| \$\$\tau_{i}<\sigma_{j}\Longrightarrow i\leq j.\$\$ |
| --- |

Set \$\tau^{\prime}_{i}<\sigma_{i}\$ to be the cone such that \$\tau_{i}\cap\tau^{\prime}_{i}=0,\dim(\tau_{i})+\dim(\tau^{\prime}_{i})=n\$ , \$1\leq i\leq m\$ . Also consider the condition

| \$\$\tau_{i}^{\prime}<\sigma_{j}\Longrightarrow j\leq i.\$\$ |
| --- |

Note that \$\tau^{\prime}_{i}\$ is the intersection with \$\sigma_{i}\$ of those cones \$\sigma_{j}\$ with \$j<i\$ and \$\dim(\sigma_{i})\cap\dim(\sigma_{j})=n-1\$ and so condition \$(*^{\prime})\$ is the same as \$(*)\$ for the reverse ordering on \$\Delta\$ . It is well known that when \$X\$ is (nonsingular) projective, then there exists an ordering of the cones in \$\Delta(n)\$ such that both conditions \$(*)\$ and \$(*^{\prime})\$ hold. We shall assume that there exists an ordering of \$\Delta(n)\$ such that property \$(*)\$ holds. (See [13], §5.2.)

By relabelling the \$v_{j}\$ ’s if necessary, we assume that \$v_{1},\cdots,v_{n}\in N\$ are primitive vectors along the edges of \$\sigma_{m}\$ and let \$u_{1},\cdots,u_{n}\$ be the dual basis of \$M\$ .

###### Definition 1.1

. Let \$S\$ be a ring with \$1\$ . Let \$r_{i},1\leq i\leq n,\$ be in the centre of \$S\$ . Consider the polynomial algebra \$S[x_{1},\cdots,x_{d}]\$ . We denote by \$I_{S}\$ the two-sided ideal generated by the following two types of elements

| \$\$x_{j_{1}}\cdots x_{j_{k}},~{}1\leq j_{p}\leq d,\$\$ |
| --- |

where \$v_{j_{1}},\cdots,v_{j_{k}}\$ do not span a cone of \$\Delta\$ , and,

| \$\$y_{i}:=\sum_{1\leq j\leq d}\langle u_{i},v_{j}\rangle x_{j}-r_{i},~{}1\leq i\leq n.\$\$ |
| --- |

Denote by \${\cal I}_{S}\$ the two-sided ideal generated by elements of type \$(i)\$ above and the elements

| \$\$z(u):=\prod_{j,\langle u,v_{j}\rangle>0}(1-x_{j})^{\langle u,v_{j}\rangle}-r(u)\prod_{j,\langle u,v_{j}\rangle<0}(1-x_{j})^{-\langle u,v_{j}\rangle},~{}u\in M,\$\$ |
| --- |

where \$r(u)=\prod_{1\leq j\leq d}r_{i}^{\langle u,v_{j}\rangle}.\$ Define \$R=R(S,\Delta)=S[x_{1},\cdots,x_{d}]/I_{S}\$ and \${\cal R}={\cal R}(S,\Delta)=S[x_{1},\cdots,x_{d}]/{\cal I}_{S}\$ .

Note that the \$S\$ -algebras \$R\$ and \${\cal R}\$ depend not only on the fan \$\Delta\$ , but also on the the isomorphism \$N\cong\mathbb{Z}^{n}\$ resulting from the choice of \$\sigma_{m}\in\Delta\$ and the elements \$r_{i}\in S\$ . The only non-commutative ring \$S\$ we need to consider is the integral cohomology ring of \$B\$ .

Note that for any cohomology theory \${\cal H}\$ , \${\cal H}^{*}(E(X))\$ is an \${\cal H}^{*}(B)\$ -algebra via the induced map \$\pi^{*}:{\cal H}^{*}(B)\mbox{\$\longrightarrow\$}{\cal H}^{*}(E(X))\$ . The following is our main theorem:

###### Theorem 1.2

. Let \$\pi:E\mbox{\$\longrightarrow\$}B\$ be a principal \$T\$ -bundle over an arbitray topological space \$B\$ . Assume that \$X\$ is a smooth complete \$T\$ -toric variety and that \$\Delta(n)\$ has been ordered so that \$(*)\$ holds. With above notations, (i) The singular cohomology ring of \$E(X)\$ is isomorphic as an \$H^{*}(B;\mathbb{Z})\$ -algebra to \$R(H^{*}(B;\mathbb{Z}),\Delta)\$ , with \$r_{i}=c_{1}(\xi_{i}^{\vee})\in H^{2}(B;\mathbb{Z})\$ . (ii) When \$B\$ is compact Hausdorff, the \$K\$ -ring \$K^{*}(E(X))\$ of complex vector bundles over \$E(X)\$ is isomorphic as a \$K^{*}(B)\$ -algebra to \${\cal R}(K^{*}(B);\Delta)\$ where \$r_{i}=[\xi_{i}^{\vee}]\in K(B)\$ , \$1\leq i\leq n\$ . Suppose \$p:E\mbox{\$\longrightarrow\$}B\$ is algebraic where \$B\$ irreducible, non-singular and noetherian over \$\mathbb{C}\$ . Furthermore, assume that \$(*^{\prime})\$ also holds. Then: (iii) The Chow ring \$A^{*}(E(X))\$ of \$E(X)\$ is isomorphic as an \$A^{*}(B)\$ -algebra to \$R(A^{*}(B),\Delta)\$ where \$r_{i}=c_{1}(\xi_{i}^{\vee})\in A^{1}(B)\$ , \$1\leq i\leq n\$ . (iv) The ring \${\cal K}(E(X))\$ is isomorphic as a \${\cal K}(B)\$ -algebra to \${\cal R}({\cal K}(B),\Delta)\$ where \$r_{i}=[\xi_{i}^{\vee}]\in{\cal K}(B)\$ .

We shall now briefly explain the method of proof. For the first three parts, we shall use a Leray-Hirsch type theorem to obtain the structure of \${\cal H}^{*}(E(X))\$ as a module over \${\cal H}^{*}(B)\$ . Then we shall construct a \${\cal H}^{*}(B)\$ -algebra homomorphism from the expected \${\cal H}^{*}(B)\$ -algebra to \${\cal H}^{*}(E(X))\$ and verify that this algebra homomorphism is an isomorphism of \${\cal H}^{*}(B)\$ -modules. The “Leray-Hirsch” theorem we need in the context of Chow rings is due to D.Edidin and W.Graham [11]. However we give a proof which is more suited to our specific situation. (See also [12].) The “Leray-Hirsch” in the context of \$K\$ -theory of complex vector bundles that we need is theorem 1.3, Ch. IV, [15]. (Compare Theorem 2.7.8, [5].) For part (iv) we use a result of Grothendieck [7] to prove the analogue of Leray-Hirsch theorem.

We do not know if parts (iii) and (iv) of the main theorem remain valid without the hypothesis that \$(*^{\prime})\$ hold. Neither do we know of an example where \$\Delta(n)\$ admits an ordering satisfying \$(*)\$ but no ordering that satisfies both \$(*)\$ and \$(*^{\prime})\$ . However, there are complete nonsingular varieties \$X(\Delta)\$ which are not projective such that \$\Delta(n)\$ admits an ordering satisfying both \$(*)\$ and \$(*^{\prime})\$ . The example of a complete non projective toric variety given in p. 84 [17] is seen to be one such.

Examples of algebraic bundles \$E(X)\mbox{\$\longrightarrow\$}B\$ we consider include as special cases the toric fibre bundles considered on p.41, [13].

We were motivated by the work of Al Amrani [2] who has computed the singular cohomology ring of a weighted projective space bundle. Another motivation for us was the work of H.Pittie and A.Ram [18] who established the Pieri-Chevalley formula in \$K\$ -theory in the context of an algberaic \$G/B\$ bundle associated to a principal \$B\$ bundle where \$G\$ is a complex simple algebraic group and \$B\$ a Borel subgroup.

## 2 The rings \$R\$ and \${\cal R}\$

In this section we prove certain facts about the rings \$R\$ and \${\cal R}\$ which will be needed in the proof of the main theorem.

We keep the notations of §1. We assume that \$\Delta(n)\$ has been so ordered that property \$(*)\$ holds. Recall that \$v_{1},\cdots,v_{d}\$ are the primitive vectors along the edges of \$\Delta\$ , that \$v_{1},\cdots,v_{n}\$ are in \$\sigma_{m}\$ , and that \$u_{1},\cdots,u_{n}\$ is the dual basis of \$M\$ .

For any cone \$\gamma\in\Delta\$ , denote by \$x(\gamma)\$ the monomial \$x_{j_{1}}\cdots x_{j_{r}}\in S[x_{1},\cdots,x_{d}]\$ where \$v_{j_{1}}\cdots,v_{j_{r}}\$ are the primitive vectors along the edges of \$\gamma\$ .

Recall from §1 the definition of the \$S\$ -algebras \$R\$ and \${\cal R}\$ . We shall denote by the same symbol \$x(\gamma)\$ , in \$R\$ and \${\cal R}\$ , the image of the monomial \$x(\gamma)\in S[x_{1},\cdots,x_{d}]\$ under the canonical quotient map.

###### Lemma 2.1

. (i) For \$u=\sum_{1\leq i\leq n}a_{i}u_{i}\in M\$ , the following equality holds in \$R\$ .

| \$\$\sum_{1\leq j\leq d}\langle u,v_{j}\rangle x_{j}=r_{u}\$\$ |
| --- |

where \$r_{u}=\sum_{1\leq i\leq n}a_{i}r_{i}.\$ (ii) If \$\gamma\in\Delta(r)\$ is spanned by \$v_{j_{1}},v_{j_{2}},\cdots,v_{j_{r}}\$ , then

| \$\$x_{j_{1}}x(\gamma)=-\sum_{k}\langle u,v_{k}\rangle x(\gamma_{k})+r_{u}x(\gamma)\$\$ |
| --- |

for some \$u\in M\$ , where the sum on the right is over those cones \$\gamma_{k}\$ in \$\Delta(r+1)\$ which are spanned by primitive vectors \$v_{k},v_{j_{1}},v_{j_{2}},\cdots,v_{j_{r}}\$ . (iii) If \$\alpha<\gamma\leq\beta\$ are cones in \$\Delta\$ then there exist cones \$\gamma_{1},\cdots,\gamma_{s}\in\Delta\$ with \$\alpha<\gamma_{k}\$ such that the \$\gamma_{k}\$ are not contained in \$\beta\$ , and

| \$\$x(\gamma)=\sum_{k}c_{k}x(\gamma_{k})+cx(\alpha)\$\$ |
| --- |

for some \$c,c_{k}\in S\$ . (iv) The monomials \$x(\tau_{i})\$ , \$1\leq i\leq m,\$ span \$R\$ as an \$S\$ -module.


[exit code: 0]