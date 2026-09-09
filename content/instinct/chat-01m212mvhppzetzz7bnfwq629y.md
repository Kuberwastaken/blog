---
title: "hodge deep literature scan (chat-01M212MVH)"
---

_1 transcript files aggregated._

Deep literature scan for the hodge program, triggered by the user's direct question: is there literature that would help immensely, and have we searched deep enough (github, arxiv, blogs). Search systematically - arxiv full text, GitHub, math blogs (Movasati, Scribd/notes, conference proceedings), 2000-2026, everything findable.

Four questions, each answered with sources (URLs) and a "does this change anything" verdict:
1. THE FROBENIUS VERIFIER: has ANYONE ever run the van Luijk-style Frobenius root-of-unity bound in codimension >= 2, i.e., as a non-algebraicity test at Hodge loci (not just Picard-rank computations on K3s)? Known names: van Luijk, Elsenhans-Jahnel, Charles 2014, Poonen-Testa-van Luijk on Neron-Severi. Look hard for higher-codimension instances, Hodge-locus computations, atypical-point computations (Zilber-Pink computational side, Klingler-Otwinowski-Urbanik, Baldi-Klingler-Ullmo explicit examples), and Movasati's Hodge locus computations (he has explicit code and tables).
2. IMPLEMENTATIONS: what working code exists - Lairez-Sertoz period computation, Costa/Harvey/Kedlaya controlled reduction point counting (pctree and successors), OSCAR/Sage/Magma Hodge/cohomology packages, anything for hypersurface point counts at scale. License, language, maturity.
3. THE LIFT DIRECTION: Markman's secant-sheaf construction for Weil classes (arxiv 2509.23403 and the older papers) - exactly where does splitness enter, what is known about nonsplit cases (discriminant -3 in particular), and what deformation-theory / normal-sheaf computation literature exists for lifting cycles from a degenerate fiber (log-smooth deformation, toric degenerations, Namikawa, Gross-Siebert).
4. COMPUTATIONAL HODGE THEORY + AI 2024-2026: anyone applying LLMs/ML to Hodge classes, cycle finding, period relations, or counterexample hunts in algebraic geometry; and the EinsteinArena-style venues for this field.

Report: for each question what exists, what's directly usable by us, and an honest verdict on whether it changes the program's conclusions (the Deligne cap, the lift direction 5-10, or the frobenius-sweep 1-3). Report to me, not the user.

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
I'm a task agent. My parent delegated a deep literature scan on four questions about the Hodge program. I need to do systematic web research and report back. Let me plan the searches.

Four questions:
1. Frobenius verifier in codim >= 2 / at Hodge loci — van Luijk, Elsenhans-Jahnel, Charles 2014, Poonen-Testa-van Luijk, higher codim, Hodge locus computations, atypical points (Baldi-Klingler-Ullmo, Klingler-Otwinowski-Urbanik), Movasati.
2. Implementations: Lairez-Sertz periods, pctree (Costa-Harvey-Kedlaya), OSCAR/Sage/Magma packages.
3. Markman's secant-sheaf construction (arXiv 2509.23403), splitness, nonsplit cases, deformation theory (log-smooth, toric degenerations, Gross-Siebert, Namikawa).
4. Computational Hodge + AI 2024-2026, EinsteinArena-style venues.

Let me batch web searches. I'll run many searches, then fetch key pages (arXiv abstracts). Use --async for parallel, or just batch sequential in one bash call. web_search calls are network bound; use --async fan-out.

Let me fire off a bunch of searches in one bash call with async names, then wait and extract.
```

Tool: bash

Arguments:
```json
{"command": "tools web_search --query 'Frobenius root of unity bound non-algebraic Hodge class codimension two point counting' --limit 10 --async s1a\ntools web_search --query 'van Luijk K3 Picard rank Frobenius eigenvalues method Elsenhans Jahnel higher codimension' --limit 10 --async s1b\ntools web_search --query 'Charles 2014 \"on the Picard number\" K3 Frobenius arithmetic' --limit 8 --async s1c\ntools web_search --query 'Poonen Testa van Luijk \"Computing Néron-Severi groups\" zeta function' --limit 8 --async s1d\ntools async wait s1a s1b s1c s1d\nfor f in s1a s1b s1c s1d; do echo \"===== \$f =====\"; jq -r '.[] | .title + \" | \" + .url + \" | \" + ((.highlights // [])[0] // \"\")' /tmp/tool-async/\$f.json 2>/dev/null | head -12; done"}
```

Tool: bash

s1a launched
s1b launched
s1c launched
s1d launched
{"action":"web_search","name":"s1a","status":"done"}
{"action":"web_search","name":"s1b","status":"done"}
{"action":"web_search","name":"s1c","status":"done"}
{"action":"web_search","name":"s1d","status":"done"}
===== s1a =====
Cohomological divisibility and
point count divisibility | https://arxiv.org/html/math/0305127 | Let \$X⊂ℙnX\subset{\mathbb{P}}^{n}\$ be a closed scheme defined by \$rr\$ homogeneous equations of degrees \$d1≥d2≥…≥drd_{1}\geq d_{2}\geq\ldots\geq d_{r}\$ over the finite field \$𝔽q{\mathbb{F}}_{q}\$, with complement \$U:=ℙn∖XU:={\mathbb{P}}^{n}\setminus X\$. Let \$κ\kappa\$ be the maximum of \$00\$ and the integral part of the rational number \$n−d2−…−drd1\frac{n-d_{2}-\ldots-d_{r}}{d_{1}}\$. We show that the eigenvalues of the geometric Frobenius acting on the \$ℓ\ell\$-adic cohomology \$Hci​(U×𝔽q𝔽q¯,ℚℓ)H^{i}_{c}(U\times_{{\mathbb{F}}_{q}}\overline{{\mathbb{F}}_{q}},{\mathbb{Q}}_{\ell})\$ with compact supports are divisible by \$qκq^{\kappa}\$ as algebraic integers.
...
The common feature of these results is that one has a separated \$kk\$-scheme \$X/kX/k\$ of finite type, and an integer \$κ≥1\kappa\geq 1\$, such that for each finite extension \$𝔽qν{\mathbb{F}}_{q^{\nu}}\$ of \$𝔽q{\mathbb{F}}_{q}\$, \$|X⁡(𝔽qν)||X({\mathbb{F}}_{q^{\nu}})|\$ is divisible by \$qν⋅κq^{\nu\cdot\kappa}\$. Some years ago, Deligne posed the problem of showing that in any such situation \$(X/k,κ)(X/k,\kappa)\$, the divisibilities of numbers of points result from corresponding divisibilities of all the eigenvalues of Frobenius on all the compact \$ℓ\ell\$-adic cohomology groups, \$ℓ\ell\$ any prime other than \$pp\$, of the variety \$X/kX/k\$ in question. As explained by Ax [2], such divisibilities of numbers of points imply (and indeed are equivalent to) the corresponding divisibility of all reciprocal zeros and poles of the zeta function. But for any given \$ℓ≠p\ell\neq p\$, the \$ℓ\ell\$-adic cohomological expression of the zeta function may well have cancellation: the problem is that there might be pairs of Frobenius eigenvalues on different \$ℓ\ell\$-adic groups which cancel, but which both have insufficient divisibility.
...
for \$kν=𝔽qνk_{\nu}={\mathbb{F}}_{q^{\nu}}\$. Recall [9],
...
Suppose one has a list of \$r≥1r\geq 1\$ polynomials \$fi∈k⁡[X1,…,Xn]f_{i}\in k[X_{1},\ldots,X_{n}]\$, with \$fif_{i}\$ of degree \$di≥1d_{i}\geq 1\$. Take any integer \$R≥1R\geq 1\$, and any list of \$R≥1R\geq 1\$ polynomials \$gj∈k⁡[X1,…,Xn]g_{j}\in k[X_{1},\ldots,X_{n}]\$, such that each \$gjg_{j}\$ is a product \$gj=∏ifiai,jg_{j}=\prod_{i}f_{i}^{a_{i,j}}\$, with all \$ai,j≥0a_{i,j}\geq 0\$. Denote by \$X/kX/k\$ the closed subscheme of \$𝔸n​(k){\mathbb{A}}^{n}(k)\$ defined by \$g1=…=gR=0g_{1}=\ldots=g_{R}=0\$. Then every eigenvalue of \$FF\$ on every compact cohomology group \$Hci​(X)H^{i}_{c}(X)\$ is divisible as an algebraic integer by \$qμ⁡(n,d1,…,dr)q^{\mu(n;d_{1},\ldots,d_{r})}\$.
...
Under the hypotheses of Theorem 2.1, every eigenvalue of \$FF\$ on every compact cohomology group \$Hci​(𝔸n∖X)H^{i}_{c}({\mathbb{A}}^{n}\setminus X)\$ is divisible as an algebraic integer by \$qμ⁡(n,d1,…,dr)q^{\mu(n;d_{1},\ldots,d_{r})}\$.
...
Every eigenvalue of \$FF\$ on every group \$Hci​(𝔸n∖X)H^{i}_{c}({\mathbb{A}}^{n}\setminus X)\$ is divisible as an algebraic integer by \$qμ⁡(n,d1,…,dr)q^{\mu(n;d_{1},\ldots,d_{r})}\$.
===== s1b =====
The Picard group of a K3 surface and its reduction modulo p | https://msp.org/ant/2011/5-8/ant-v5-n8-p02-s.pdf | Volume 5
...
2011 
No.
...
#### The Picard group of a K3 surface and its reduction modulo p Andreas-Stephan Elsenhans and Jörg Jahnel
...
The Picard group of a K3 surface and its reduction modulo p
...
Andreas-Stephan Elsenhans and Jörg Jahnel

We present a method to compute the geometric Picard rank of a K3 surface over Q. Contrary to a widely held belief, we show that it is possible to verify Picard rank 1 using reduction at a single prime.
===== s1c =====
 | https://doi.org/10.2140/ant.2014.8-1 | # On the Picard number of K3 surfaces over number fields
...
We discuss some aspects of the behavior of specialization at a finite place of Néron-Severi groups of K3 surfaces over number fields. We give optimal lower bounds for the Picard number of such specializations, thus answering a question of Elsenhans and Jahnel. As a consequence of these results, we show that it is possible to compute explicitly the Picard number of any given K3 surface over a number field.
...
This question is raised by Shioda [1981] . Using the Weil conjectures [Deligne 1974 ], it is possible to compute the Picard numbers of smooth projective varieties over finite fields, at least in the case the Tate conjecture holds. Indeed, counting points in sufficiently many extensions of the base field, one can compute the characteristic polynomial of the Frobenius acting on the second étale cohomology group and determine the multiplicity of 1 as an eigenvalue. If the Tate conjecture holds, this multiplicity is equal to the Picard number.
...
over the field of definition. In the past few years, the problem of computing Picard numbers of K3 surfaces has been featured for instance in the work of Elsenhans and Jahnel [2008a; 2008b] with recent geometric applications in the work of Hassett and Várilly-Alvarado [2013] and Várilly [Hassett et al. 2011] . Recent work of Hassett, Kresch and Tschinkel [2013] tackles this question in some cases.
...
On the other hand, over finite fields, there are obstructions for the map (1) to be surjective as was first noticed by Shioda [1981; 1983] . Indeed, it is a consequence of the Tate conjecture that the geometric Picard number of a K3 surface over a number field is always even; see for instance [de Jong and Katz 2000] . This striking fact has been recently used in a surprising way by Bogomolov, Hassett and Tschinkel [2011] and Li and Liedtke [2012] to prove that any complex K3 surface with odd Picard rank contains infinitely many rational curves.
...
In this paper, we describe the Shioda-type obstructions that can prevent the map (1) from being surjective, and we give optimal lower bounds for the Picard number of the specialization. One of our results is that Hodge theory can force the existence of such obstructions even when the Picard number is even; see Theorem 1(2) below.
...
===== s1d =====
Computing Néron-Severi groups and cycle class groups | https://scholarlypublications.universiteitleiden.nl/access/item%3A2865265/view | ### Computing Néron-Severi groups and cycle class groups Poonen, B.; Testa, D.; Luijk, R.M. van
...
##### Citation Poonen, B., Testa, D., & Luijk, R. M. van. (2015). Computing Néron-Severi groups and cycle class groups. Compositio Mathematica, 151(4), 713-734. doi:10.1112/S0010437X14007878
...
##### Computing N´eron–Severi groups and cycle class groups
...
Bjorn Poonen, Damiano Testa and Ronald van Luijk
...
##### Computing N´eron–Severi groups and cycle class groups
...
Bjorn Poonen, Damiano Testa and Ronald van Luijk
...


[exit code: 0]

```thinking
Continue searches: higher-codimension Frobenius/Hodge locus computations, Movasati Hodge locus, Baldi-Klingler-Ullmo atypical, Lairez-Sertoz, pctree, controlled reduction, OSCAR, Markman secant sheaf, arXiv 2509.23403, nonsplit Weil, deformation theory lifting cycles, AI+algebraic geometry 2024-2026, EinsteinArena.

Batch more async searches.
```

Tool: bash

Arguments:
```json
{"command": "tools web_search --query 'Movasati Hodge locus computation code tables algebraic cycles hypersurface' --limit 10 --async s2a\ntools web_search --query 'Baldi Klingler Ullmo atypical Hodge locus explicit examples computation' --limit 10 --async s2b\ntools web_search --query 'Lairez Sertoz \"Effective periods\" Picard-Fuchs numerical periods hypersurface implementation' --limit 10 --async s2c\ntools web_search --query 'pctree Costa Harvey Kedlaya controlled reduction zeta function point counting github' --limit 10 --async s2d\ntools async wait s2a s2b s2c s2d\nfor f in s2a s2b s2c s2d; do echo \"===== \$f =====\"; jq -r '.[] | .title + \" | \" + .url + \" | \" + ((.highlights // [])[0] // \"\")' /tmp/tool-async/\$f.json 2>/dev/null | head -12; done"}
```

Tool: bash

s2a launched
s2b launched
s2c launched
s2d launched
{"action":"web_search","name":"s2a","status":"done"}
{"action":"web_search","name":"s2b","status":"done"}
{"action":"web_search","name":"s2c","status":"done"}
{"action":"web_search","name":"s2d","status":"done"}
===== s2a =====
On a Hodge locus | https://doi.org/10.48550/arxiv.2211.11405 | 2. Let δ0 ∈ Hn(X0, Q) be a Hodge cycle and x β be a monomial of degree kd− n− 2. The integral 1 (2πi) n 2Z δt Resi x βΩ f k t can be written as a power series in (tα)α∈ I with coefficients in an abelian extension of Q(ζd). If δ0 is a sum of linear cycles P n 2 then such an abelian extension is Q(ζ2d). In Conjecture 1 we have considered V[Z] as an
...
V N [Z] is obtained by truncating the defining holomorphic functions of VZ up to degree N. The non-smoothness results as above follows from the non-smoothness of V N [Z] for small values of N like 2, 3 (the case N = 2 has been partially treated in cohomological terms in [Mac05]). The strongest evidence to Conjecture 1 is the following theorem in [Mov21a, Theorem 19.1, part 2] which is proved by heavy computer calculations. Theorem 8. In the context of Conjecture 1, for r ∈ N, rˇ ∈ Z, 1 ≤ r, | rˇ| ≤ 10, the infinitesimal Hodge locus V N [Z], N ≤ M is smooth for all (n, M) = (6, 14),(8, 6),(10, 4),(12, 3). For n = 4, the Hodge locus V[Z] itself is smooth for trivial reasons. There is abundant examples of Hodge cycles for which we know neither to verify the Hodge conjecture (construct algebraic cycles) nor give evidences that they might be counterexamples to the Hodge conjecture, see [Del06] and [Mov21a, Chapter 19]. Finding Hodge cycles for hypersurfaces is extremely difficult, and the main examples in this case are due to T. Shioda for Fermat varieties [Shi79]. We have proved Theorem 8 by computer with processor Intel Core i7-7700, 16 GB Mem ory plus 16 GB swap memory and the operating system Ubuntu 16.04. It turned out that for many cases such as (n, N) = (12, 3), we get the ‘Memory Full’ error. Therefore, we had to increase the swap memory up to 170 GB. Despite the low speed of the swap which slowed down the computation, the computer was able to use the data and give us the desired output. The computation for this example took more than 21 days. We only know that at least 18 GB of the swap were used.
...
In 2023 R. Kloostermann sent the author the preprint [Klo23] in which among many other things proves that Conjecture 1 is not true for  \$ n \geq 10 \$. It turns out that for a generic cubic hypersurface  \$ X_0 \$ of dimension  \$ n \geq 10 \$, we have  \$ T_0 V_Z = T_0 V_{[Z]} \$, even though for Fermat variety this is not true. Actually according to Theorem 8 at Fermat variety for  \$ n = 10 \$ and 12 we have the equalities of fourth order and third order neighborhoods, respectively. The equality  \$ T_0 V_Z = T_0 V_{[Z]} \$ can be easily checked by computer using Villaflor's elegant formula in [VL22b]. I could have done this in 2019 when Villaflor defended his thesis. However, I was too exhausted by my computer calculations in [Mov21a]. Below, is the computer code for this verification which uses an example of hypersurface of dimension 10 in [Klo23].
...
Here is the computer code used for Conjecture 19.
...
//-------------------preparing the ring-------------------
...
LIB "foliation.lib";
...
===== s2b =====
On the distribution of the Hodge locus | https://doi.org/10.1007/s00222-023-01226-0 | Given a polarizable
...
such special subvarieties (hence is algebraic), at least if we restrict ourselves to the Hodge locus factorwise of positive period dimension (Theorem 1.5
...
2 Special subvarieties as (a)typical intersection loci: conjectures . . . . . . . 445 3 Special subvarieties as (a)typical intersection loci: results and applications 447 4 Preliminaries . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 454 5 Typicality versus atypicality and a strong Zilber–Pink conjecture . . . . . 460 6 Atypical locus – the geometric Zilber–Pink conjecture . . . . . . . . . . . 465 7 A criterion for the typical Hodge locus to be empty . . . . . . . . . . . . . 472 8 Proof of Theorem 1.5 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 477 9 Applications in higher level . . . . . . . . . . . . . . . . . . . . . . . . . . 477 10 Typical locus – all or nothing . . . . .
...
. . . . . . . . . . . . . . . . . . . 480 11 On a question of Serre and Gross . . . . . . . . . . . . . . . . . . . . . . . 482 Acknowledgements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 485 References . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 485
...
Definition 2.4 The atypical Hodge locus HL(S,V⊗)atyp ⊂ HL(S,V⊗) (resp. the typ ical Hodge locus HL(S,V⊗)typ ⊂ HL(S,V⊗)) is the union of the atypical (resp. strict typical) special subvarieties of S for V.
...
Conjecture 2.5 (Zilber–Pink conjecture for the atypical Hodge locus, strong version) Let V be a polarizable ZVHS on an irreducible smooth quasi-projective variety S. The atypical Hodge locus HL(S,V⊗)atyp is a finite union of atypical special subvari eties of S for V. Equivalently: the set of atypical special subvarieties of S for V has finitely many maximal elements for the inclusion.
...
===== s2c =====
Effective homology and periods of complex projective hypersurfaces | https://doi.org/10.48550/arxiv.2306.05263 | We introduce a new algorithm for computing the periods of a smooth complex projective hypersurface. The algorithm intertwine with a new method for computing an explicit basis of the singular homology of the hypersurface. It is based on Picard-Lefschetz theory and relies on the computation of the monodromy action induced by a one-parameter family of hyperplane sections on the homology of a given section. We provide a SageMath implementation. For example, on a laptop, it makes it possible to compute the periods of a smooth complex quartic surface with hundreds of digits of precision in typically an hour.
...
1.1. Contributions. We focus on the case of projective hypersurfaces, although most of the ideas that we present apply in more generality. Let X ⊂ P n (C) be a complex projective hypersurface defined by a polynomial F (x 0 , . . . , x n ) ∈ C[x 0 , . . . , x n ]. A major obstacle in the computation of the period matrices for X is the lack of algorithms for computing an explicit description of the singular homology of X. By "explicit", we mean explicit enough to integrate numerically over a basis of cycles. We describe an algorithm for computing at the same time:
...
The algorithm relies on the study of a one-parameter family of hyperplane sections X ∩ H t , following the principles of Picard-Lefschetz theory (Lefschetz, 1924; Lamotke, 1981) . An important step of the algorithm is the computation of the monodromy action induced by this family of sections on the homology H n-1 (X ∩ H b ) of one section (above a chosen basepoint b ∈ P 1 ). We perform this computation through duality with De Rham cohomology, using the period matrix of X ∩ H b , obtained by induction on dimension.
...
To perform the numerical integration, we reduce to one-variable complex integrals of rational multiples of the periods of H n-1 (X ∩ H b ). Since these periods are solutions of a Picard-Fuchs differential equation, which we can compute explicitly, we can perform the integration using general algorithms for integration of differentially finite functions (van der Hoeven, 1999; Mezzarobba, 2010) . These algorithms provide rigorous error bounds with quasilinear complexity with respect to precision.
...
On the practical side, we have implemented the above algorithm in Sagemath (The Sage Developers, 2023), together with the computation of related invariants (Picard rank, Néron-Severi group, endomorphism ring). This implementation can be found in the package lefschetz-family 1 . We are able to compute the periods of the holomorphic form of a smooth quartic surface in P 3 (C) defined over Q in, typically, about an hour on a laptop, with 300 decimal digits of precision. Naturally, the actual running time depends on many parameters, including the bitsize of the coefficients of the defining equation, and the conditionning of some numerical steps, see Section 6 for concrete examples. Such a computation was not feasible in reasonable time with the previously known algorithm (Sertöz, 2019) , except for some quartic surfaces defined by sparse polynomials.
...
1.2. Related works. Algorithms for computing period matrices of curves (also known as Riemann matrices) are well established, with work by Deconinck and van Hoeij (2001) , Swierczewski (2017) , Bruin et al. (2019) , Molin and Neurohr (2019), and Neurohr (2018) , to name a few. The papers by Cynk and van Straten (2019) and Elsenhans and Jahnel (2022) are the first to tackle higher 1 https://gitlab.inria.fr/epichonp/lefschetz-family dimensions in some particular cases: double covers of P 3 (C) ramified along 8 planes, and double covers of P 2 (C) ramified along 6 lines, respectively. The algorithm by Sertöz (2019) is the first and only algorithm to tackle the case of smooth hypersurfaces in any dimension. It proceeds by global deformation from the hypersurface X ⊂ P n (C) to the Fermat hypersurface defined by n i=0 x d i = 0, with d equal to the degree of X. In a nutshell, our method is more efficient, in most cases, because the Picard-Fuchs equation associated to this global deformation is generally much larger than the Picard-Fuchs differential equation associated to a family of hyperplane sections. Moreover, Sertöz' method requires a base point, a hypersurface of which we know the periods a priori. Our method is more intrinsic, which gives it the potential to study varieties beyond smooth projective hypersurfaces.
...
===== s2d =====
edgarcosta/controlledreduction | https://github.com/edgarcosta/controlledreduction | # edgarcosta/controlledreduction
...
An implementation of the controlled reduction method for computing the Hasse-Weil zeta functions of smooth projective hypersurfaces over finite fields
...
An implementation of the controlled reduction method for computing the
Hasse-Weil zeta functions of smooth projective hypersurfaces over finite
fields. Explicitly, by computing a p-adic approximation of Frobenius
action on p-adic cohomology (Monsky-Washnizter) with sufficient precision
and then lifting its characteristic polynomial to the integers.
...
An overview of the method can be found in: 
 - "Computing zeta functions of nondegenerate projective hypersurfaces over 


[exit code: 0]

```thinking
Good. Continue: 
- Question 1 more: has anyone used Frobenius point counting as non-algebraicity certificate in codim >= 2 / Hodge locus? Search: "Tate conjecture computation Hodge classes Frobenius fixed bound codimension", "Hassett Várilly-Alvarado", "Charles Picard number higher codimension", "computing cycle class groups Poonen Testa van Luijk codimension". Also "absolute Hodge cycles computation", "Otro Kloostermann Hodge locus", "Villaflor", "periods algebraic cycles".
- Question 3: Markman secant sheaf Weil classes arxiv 2509.23403; Markman "The monodromy of generalized Kummer varieties and algebraic cycles on their intermediate Jacobians"; "Weil classes nonsplit discriminant -3"; deformation theory lifting cycles from degenerate fiber, log smooth, Gross-Siebert, Namikawa, "specialization of algebraic cycles deformation".
- Question 4: AI LLM algebraic geometry counterexample 2024-2026, "AI algebraic geometry counterexample machine learning Hodge", "machine learning cycles Hodge conjecture", EinsteinArena.

Also question 2 more: OSCAR Hodge, Sage, Magma, hypellfrob, "point counting hypersurface at scale", "Kedlaya costa pctree performance".

Let me batch next round.
```

Tool: bash

Arguments:
```json
{"command": "tools web_search --query 'Tate conjecture computation Frobenius fixed part bound Hodge classes codimension two hypersurface fourfold' --limit 10 --async s3a\ntools web_search --query 'Markman secant sheaf Weil classes abelian fourfolds arxiv' --limit 10 --async s3b\ntools web_search --query 'nonsplit Weil classes discriminant -3 abelian fourfold algebraic Hodge conjecture' --limit 10 --async s3c\ntools web_search --query 'deformation of algebraic cycles toric degeneration log smooth specialization Gross-Siebert' --limit 10 --async s3d\ntools async wait s3a s3b s3c s3d\nfor f in s3a s3b s3c s3d; do echo \"===== \$f =====\"; jq -r '.[] | .title + \" | \" + .url + \" | \" + ((.highlights // [])[0] // \"\")' /tmp/tool-async/\$f.json 2>/dev/null | head -12; done"}
```

Tool: bash

s3a launched
s3b launched
s3c launched
s3d launched
{"action":"web_search","name":"s3a","status":"done"}
{"action":"web_search","name":"s3b","status":"done"}
{"action":"web_search","name":"s3c","status":"done"}
{"action":"web_search","name":"s3d","status":"done"}
===== s3a =====
The Tate Conjecture for Cubic Fourfolds over a Finite Field | https://www.cambridge.org/core/journals/compositio-mathematica/article/tate-conjecture-for-cubic-fourfolds-over-a-finite-field/77EEF0DA110DE84E0222BAEF223BA1FE | We prove the Tate conjecture for codimension 2 cycles on an ordinary cubic fourfold over a finite field. The proof involves the construction of canonical coordinates on the formal deformation space via a crystalline period map.
The Tate Conjecture for Cubic Fourfolds over a Finite Field | https://doi.org/10.1023/a:1017532821467 | We prove the Tate conjecture for codimension 2 cycles on an ordinary cubic fourfold over a ¢nite ¢eld. The proof involves the construction of canonical coordinates on the formal deformation space via a crystalline period map.
...
The central idea of the proof is the construction of a lifting of the variety to characteristic zero, where we can use the fact the Hodge conjecture is known for this class of varieties. To be more precise, let X 0 aF be an ordinary cubic hypersurface in P 5 . Let X W be a lifting of X 0 to the Witt vectors W of F. An embedding W D3C then gives a complex cubic fourfold X C . We thus have the following diagram:
...
The proof of the Tate conjecture described here then begins by ¢nding a special lifting of X 0 which has the property that the Frobenius map acts as an endomorphism of the rational Hodge structure of H 4 sing X C Y Q2. It has the additional property that the subspace of H 4 sing X C Y Q2 that is ¢xed under the action of Frobenius lies in the 0Y 0 part of the Hodge structure. Since the Hodge conjecture is known for codimesion 2 cycles on a cubic fourfold [Z] , this implies that the Galois invariant subspace of H 4 et X 0 Y Q 2 is generated by algebraic cycles. Now let X W be an arbitrary lifting of X 0 to W . The de Rham cohomology of X W has a natural Hodge ¢ltration and a semilinear Frobenius action induced by the natural isomorphism with the crystalline cohomology of X 0 . A lifting satisfying the property described in the previous paragraph must at least have the property that the Frobenius map preserves the Hodge ¢ltration. (A general lifting will not have this property.)
...
This lifting is then produced by constructing a `p-adic period map' from the universal deformation space of X 0 to a `period' space that, loosely speaking, parameterizes admissible ¢ltrations that can be placed on the crystalline cohomology of X 0 . However, the construction of this period map is not as straightforward as it is in Hodge theory. One constructs a p-divisible group de¢ned over F out of the crystalline cohomology of X 0 . The period map then arises as a map between the universal deformation space of X 0 and the universal deformation space of . We can then use the fact that deformations of p-divisible groups are parameterized (roughly) by the Hodge ¢ltrations induced on their associated Dieudonnem odule [M] .
...
In fact more can be said. The connected and e¨tale pieces of are rigid (i.e they have no non-trivial deformations), so deformations of are entirely determined by extension data. This gives a canonical group structure on the universal deformation space of X 0 . The required lifting of X 0 then corresponds to the origin of this group structure. This is completely analogous to the situation described by Deligne and Illusie [DI] and Nygaard [N] for ordinary K3 surfaces. This is not surprising, since the middle cohomology of a cubic fourfold looks very similar to that of a K3 surface (its Hodge numbers are h 0Y4 h 4Y0 0, h 1Y3 h 3Y1 1, and h 2Y2 21). In fact, the methods of this paper can be used to give another proof of these results as well.
...
To conclude the proof of the Tate conjecture, one now only has to show that the Frobenius map actually induces an endomorphism of the Hodge structure on the rational cohomology of the complex cubic fourfold X C associated to X can . This follows by using the fact that complex cubic fourfolds have an associated Kuga^Satake^Deligne Abelian variety and using an absolute Hodge cycles argument as in [N] .
===== s3b =====
Secant sheaves and Weil classes on abelian varieties | https://arxiv.org/html/2509.23403v2 | Secant sheaves and Weil classes on abelian varieties
...
# Secant sheaves and Weil classes on abelian varieties
...
Eyal Markman Address: Department of Mathematics and Statistics, University of Massachusetts, Amherst, MA 01003, USA. Email: markman@umass.edu
...
Let \$K\$ be a CM-field, i.e., a totally complex quadratic extension of a totally real field \$F\$ . Let \$X\$ be an abelian variety admitting an algebra embedding \$F\rightarrow{\rm End}_{\mathbb{Q}}(X)\$ , and let \$\hat{X}\$ be the dual abelian variety. We construct an embedding \$\eta:K\rightarrow{\rm End}_{\mathbb{Q}}(X\times\hat{X})\$ associated to a choice of a polarization \$\Theta\$ in \$\wedge^{2}_{F}H^{1}(X,{\mathbb{Q}})\$ and an element \$q\in F\$ , such that \$K=F(\sqrt{-q})\$ . We get the \$[K:{\mathbb{Q}}]\$ -dimensional subspace \$HW(X\times\hat{X},\eta)\$ of Hodge Weil classes in \$H^{\frac{d}{2},\frac{d}{2}}(X\times\hat{X},{\mathbb{Q}})\$ , where \$d:=4\dim(X)/[K:{\mathbb{Q}}]\$ .
...
The space \$V_{\mathbb{C}}\!:=\!H^{1}(X\times\hat{X},{\mathbb{C}})\$ admits a natural symmetric bilinear pairing and the even cohomology \$S^{+}_{\mathbb{C}}\!:=\!H^{ev}(X,{\mathbb{C}})\$ is the half-spin representation of \${\rm Spin}(V_{\mathbb{C}})\$ . Hence, \${\mathbb{P}}(S^{+}_{\mathbb{C}})\$ contains a component of the Grassmannian of maximal isotropic subspaces of \$V_{\mathbb{C}}\$ known as the even spinorial variety. We associate to \$(\Theta,q)\$ a \$2^{[F:{\mathbb{Q}}]}\$ -dimensional subspace \$B\$ of \$S^{+}_{\mathbb{Q}}\$ such that \${\mathbb{P}}(B)\$ is secant to the spinorial variety. Associated to two coherent sheaves \$F_{1}\$ and \$F_{2}\$ on \$X\$ with Chern characters in \$B\$ we obtain the object \$E:=\Phi(F_{1}\boxtimes F_{2}^{\vee})\$ in the derived category \$D^{b}(X\!\times\!\hat{X})\$ , where \$\Phi\!:\!D^{b}(X\!\times\!X)\!\rightarrow\!D^{b}(X\!\times\!\hat{X})\$ is Orlov’s equivalence. The flat deformations of the normalized Chern character \$\kappa(E):=ch(E)\exp\left(-\frac{c_{1}(E)}{{\rm rank}(E)}\right)\$ of \$E\$ remain of Hodge type under every deformation of \$(X\times\hat{X},\eta)\$ as an abelian variety of Weil type \$(A^{\prime},\eta^{\prime})\$ . The algebraicity of the Weil classes of every deformation \$(A^{\prime},\eta^{\prime})\$ would thus follow if E is semiregular in the appropriate sense.
...
When \$F={\mathbb{Q}}\$ , so that \$K\$ is an imaginary quadratic number field, the above construction was combined with the Semi-regularity theorem to prove the algebraicity of the Weil classes on abelian sixfolds of split Weil type. The algebraicity of the Weil classes on all abelian fourfold of Weil type follows. The Hodge conjecture for abelian varieties of dimension \$\leq 5\$ is known to follow from the latter result.
...
===== s3c =====
Hodge Langlands Watch: Hodge Conjecture for Certain Weil-Type CM Abelian Fourfolds | https://doi.org/10.5281/zenodo.16831128 | # Hodge Langlands Watch: Hodge Conjecture for Certain Weil-Type CM Abelian Fourfolds
...
We verify the Hodge Conjecture for four-dimensional Weil-type Abelian varieties with complex multiplication (CM) by an imaginary quadratic field K=\mathbb{Q}(\sqrt{-d}), d eq1, proving that all Hodge classes in H^{2,2}(X,\mathbb{Q}), including Weil classes, are algebraic, i.e., H^{2,2}(X,\mathbb{Q})=H_{ ext{alg}}^{2,2}(X,\mathbb{Q}). Using the Hodge-Langlands Watch (HLW) framework, we quantify the cycle map ext{cl}: ext{CH}^{2}(X)\otimes\mathbb{Q} o H^{2,2}(X,\mathbb{Q}) through the Second Hand a^{(\phi)}, Minute Hand m^{(\phi)}, and Hour Handr^{(\phi)}, assuming injectivity for N\'{e}ron-Severi-generated cycles in primitive cases. For primitive cases (m=1), Abelian subvarieties span the Weil class, while for non-primitive cases (m=2), zero cycles from CM torsion points span the extra Weil class. The CM structure’s K-action and Galois symmetries, combined with geometric constraints of CM loci, ensure cycle surjectivity across smooth fibers, degeneration limits, and the moduli space A_{4}. Compared to polarization-driven methods for d=1 [2], our symmetry-driven HLW approach offers a unified methodology for d eq1.
The monodromy of generalized Kummer varieties and algebraic cycles on their intermediate Jacobians | EMS Press | https://ems.press/journals/jems/articles/4732564 | We compute the subgroup of the monodromy group of a generalized Kummer variety associated to equivalences of derived categories of abelian surfaces. The result was announced by Markman and Mehrotra (2017). Mongardi (2016) showed that the subgroup constructed here is in fact the whole monodromy group. As an application we prove the Hodge conjecture for the generic abelian fourfold of Weil type with complex multiplication by an arbitrary imaginary quadratic number field , but with trivial discriminant invariant in . The latter result is inspired by a recent observation of O'Grady that the third intermediate Jacobians of smooth projective varieties of generalized Kummer deformation type form complete families of abelian fourfolds of Weil type. Finally, we prove the surjectivity of the Abel–Jacobi map from the Chow group of codimension 2 algebraic cycles homologous to zero on every projective irreducible holomorphic symplectic manifold of Kummer type onto the third intermediate Jacobian of , as predicted by the generalized Hodge Conjecture.
Cycles on abelian 2n-folds of Weil type from secant sheaves on abelian n-folds | https://www.emergentmind.com/papers/2502.03415 | # Cycles on abelian 2n-folds of Weil type from secant sheaves on abelian n-folds
...
Abstract: A. Weil identified a 2-dimensional space of rational classes of Hodge type (n,n) in the middle cohomology of every 2n-dimensional abelian variety with a suitable complex multiplication by an imaginary quadratic number field. These abelian varieties are said to be of Weil type and these Hodge classes are known as Weil classes. We prove that the Weil classes are algebraic for all abelian sixfold of Weil type of discriminant -1, for all imaginary quadratic number fields. The algebraicity of the Weil classes follows for all abelian fourfolds of Weil type (for all discriminants and all imaginary quadratic number fields), by a degeneration argument of C. Schoen. The Hodge Conjecture for abelian fourfolds is known to follow from the above result.
Weil Classes and Decomposable Abelian Fourfolds | https://air.unimi.it/handle/2434/948510 | Weil Classes and Decomposable Abelian Fourfolds
...
We determine which codimension two Hodge classes on J×J, where J is a general abelian surface, deform to Hodge classes on a family of abelian fourfolds of Weil type. If a Hodge class deforms, there is in general a unique such family. We show how to determine the imaginary quadratic field acting on the fourfolds of Weil type in this family as well as their polarization. There are Hodge classes that may deform to more than one family. We relate these to Markman's Cayley classes.
...
#### Abstract
===== s3d =====
Mirror Symmetry via Logarithmic Degeneration Data I | https://doi.org/10.48550/arxiv.math/0309070 | This paper is the first arising from our project announced in [19] aiming at establishing a new paradigm for mirror symmetry. At the center of this approach is residual data associated to certain maximally unipotent degenerations f : X → S of Calabi-Yau vari eties. The residual degeneration data consists of the central fibre X 0 of the degeneration together with the log-structure induced from the inclusion X 0 ⊂ X , a polarization, and an element of a “log K¨ahler moduli space”. We claim that mirror symmetry comes down to an involution acting on residual degeneration data. In particular, degenerating families should be mirror-dual if and only if they have dual expressions in terms of residual data. The deepest result that we prove here is a basic duality between logarithmic complex and K¨ahler moduli of central fibres of degenerations as log spaces. Finer consequences for mirror symmetry will be addressed in a sequel to this paper. The central idea is to restrict attention to what we call toric degenerations of Calabi Yau varieties (Definition 4.1). Roughly put, these are degenerations in which the singular fibre is a union of toric varieties and the map to the base is log smooth off of some bad set Z. In this context, we define a dual intersection complex capturing key data about the degeneration. The dual intersection complex we construct is an affine manifold B with singularities together with a polyhedral decomposition P. The affine structure depends on both the irreducible components of X 0 and on information about the structure of f at the most singular points of X 0. If in addition, X is polarized with a choice of relatively ample line bundle L , then the dual intersection complex B comes equipped with a convex multi-valued piecewise linear function ϕ. This function can be used to define a discrete Legendre transform, which gives a new affine manifold Bˇ which is, in a suitable sense, dual to B. In addition Bˇ carries a new convex multi-valued piecewise linear function ˇϕ. Then Bˇ should be the dual intersection complex of a mirror degeneration. This part of the construction is relatively simple and conceptual, but it covers only the discrete part of mirror symmetry. It is the treatment of moduli that makes this paper so long. One apparent source of moduli is a change of gluing of the components of X 0. However, an essential insight of this paper is that the correct limiting version of complex moduli also involves a choice of logarithmic structure. More justification for doing this will come from the study of deformation theory in the sequel of this paper. On the other hand, the source of the moduli on the K¨ahler side is perhaps less clear. In this paper we have fairly much reverse-engineered from the complex moduli side. The fact that the K¨ahler moduli space is then related (in an expected fashion) to the logarithmic Picard group should be seen as the first striking verification of our approach. In the sequel to this paper, we will connect the K¨ahler moduli more directly to a logarithmic version of H 1,1 and couple this with a base-change theorem, justifying our definition further [21]. Let us consider a simple example of the phenomena we have just outlined. Consider X ⊆ P 3 × A 1 defined by the equation
...
at P in a small neighbourhood of v in B. We then obtain a corresponding toric variety Xv. These varieties can then be glued together in a way whose combinatorics is specified by B and P: we want to construct a scheme or algebraic space X0 whose dual intersection complex is (B, P). There is some moduli to this gluing, say specified by some data s. We then obtain spaces X0(B, P, s) given by this gluing. In this simple case, X0(B, P, s) is normal crossings, and as studied by Friedman in [12], the deformation theory of X0(B, P, s) is controlled partly by a sheaf N D = E xt 1(Ω 1 X0(B,P,s), O X0(B,P,s)), a line bundle on the singular locus D of X0(B, P, s). It turns out this sheaf can be calculated in terms of B and s, and in particular, the restriction of N D to any irreducible component of D, corresponding to an edge τ of P, is O P 1(n), where suitably defined monodromy of the affine structure is 1 n 0 1! around the singular point in the interior of τ . (See Example 3.30. In the quartic example above, n = 4 for each singular point.) In order for X0(B, P, s) to be smoothable, N D must have a section not generically zero along any component (and the zeroes will be related to the singular set Z mentioned above). This places restrictions on both the numbers n (obviously we need n ≥ 0, which is the positivity condition of § 1.5) and s. It turns out in this case specifying a section of N D with no zeroes at singular points of D is the same thing as choosing a log structure on X0(B, P, s) and a morphism to a log point. Thus the full moduli space we are interested in is, in this example, the moduli space of pairs X0(B, P, s) and sections of N D not vanishing at any singular point of D. This can be viewed as a rough approximation to the moduli space of a smoothing of X0(B, P, s): they in fact have the same dimension. For more general B, P or more
...
In §§ 3.2 and 3.3 we begin to address the question: given an affine manifold with singu larities B with polyhedral decomposition P and open gluing data s, how do we put a log structure on X0(B, P, s) in order to make it a log Calabi-Yau space? We are able to con struct a sheaf of sets on X0(B, P, s) whose sections define suitable log structures. This construction is explained in § 3.2, and in § 3.3, we actually compute this sheaf explicitly. This latter section is the technical heart of the paper, and can probably be skipped on a first reading. The eventual goal is to identify global sections of this sheaf; this is finally accomplished in the case that B is positive and simple in Theorem 5.2, with one of the main theorems of the paper being Theorem 5.4. This allows us, in the simple case, to cal culate the moduli space of log Calabi-Yau spaces with a given dual intersection complex (B, P). This moduli space will play the role of complex moduli in mirror symmetry for toric log Calabi-Yau spaces. Section 4 introduces the notions of toric degenerations and log Calabi-Yau spaces, and in § 4.1 we give these definitions and the construction of the dual intersection complex, reversing the constructions of the previous two chapters. The construction of the dual intersection complex was already explained in less detail in [19]. A brief § 4.2 discusses the polarized case and the intersection complex. Section 4.3 makes the connection with positivity: we show the dual intersection complex of a toric degeneration of Calabi-Yau varieties is always positive, hence justifying the definition of positive. Finally, in § 4.4, we continue some of the calculations leading up to the proof of Theorems 5.2 and 5.4. This is again technical, but Examples 4.28 and 4.29 should prove informative. Section 5 ties together all the strands so far. We complete the calculation of the moduli of log Calabi-Yau spaces with a given dual intersection complex in the simple case. The proof relies on most of the technical aspects developed so far in the paper. However, the answer is elegant: the moduli space in fact coincides with a cohomology group of a natural sheaf on B, determined canonically by the affine structure. Furthermore, this is precisely the group expected from previous experience with the Strominger-Yau-Zaslow conjecture. In § 5.2, we compute the log Picard group; this can probably be skipped altogether as it merely provides motivation for the definition of the log K¨ahler moduli space in § 5.3. The log K¨ahler moduli space will be canonically isomorphic to the moduli space of log Calabi-Yau spaces for the mirror. There is no technical content in § 5.3, and in fact the reader may wish to read this section early on! There we also describe the many aspects of this program left undone.
Affine Manifolds, Log Structures, and Mirror Symmetry | https://journals.tubitak.gov.tr/cgi/viewcontent.cgi?article=2785&context=math | Abstract We outline work in progress suggesting an algebro-geometric version of the Strominger-Yau-Zaslow conjecture. We define the notion of a toric degen eration, a special case of a maximally unipotent degeneration of Calabi-Yau manifolds. We then show how in this case the dual intersection complex has a natural structure of an affine manifold with singularities. If the degeneration is polarized, we also obtain an intersection complex, also an affine manifold with singularities, related by a discrete Legendre transform to the dual inter section complex. Finally, we introduce log structures as a way of reversing this construction: given an affine manifold with singularities with a suitable polyhedral decomposition, we can produce a degenerate Calabi-Yau variety along with a log structure. Hopefully, in interesting cases, this object will have a well-behaved deformation theory, allowing us to use the discrete Legendre transform to construct mirror pairs of Calabi-Yau manifolds. We also connect this approach to the topological form of the Strominger-Yau-Zaslow conjecture.
...
can place on 0 turning it into a log scheme which we write as †0 . This preserves some of the information associated to the inclusion 0 ⊆ X , but can be described without knowing . It is then hoped, and de nitely is the case in two dimensions, that a log scheme †0 has good deformation theory and can be deformed, and in some cases yield a family X ! as desired. This is as yet the most technically di cult aspect of our program, and has yet to be fully elaborated. If the above ideas can be viewed as a generalisation of Mumford's
...
operation which works on singular bres unless we incorporate a log structure. One of the fundamental points of our program will be to de ne mirrors of log Calabi-Yau schemes of the sort arising from toric degenerations of Calabi-Yau manifolds. The main point of this construction is as follows. Given a toric degeneration X ! , or just as well †0 , we obtain an a ne manifold B along with a polyhedral decomposition P If , or †0 , is equipped with an ample line bundle, we can also construct the intersection complex of 0. While vertices of the dual intersection complex correspond to irreducible components of 0, it is the maximal cells of the intersection complex which correspond to these same components. However, the presence of the polarization allows us to de ne an a ne structure with singularities on the intersection complex. Thus we have a new a ne manifold B, and a new polyhedral decomposition P . Most signi cantly, there is a clear relationship between B; P and B; P . The polarization on †0 can be viewed as giving a convex multi-valued piecewise linear function ϕ on B, and one can de ne the discrete Legendre transform of the triple (B; P ; ϕ), being a triple (B; P ϕ), where B; Pare as above and ϕ is a convex multivalued piecewise linear function on B. These a ne structures are naturally dual. This discrete Legendre transform is analagous to the well known discrete Legendre transform of a convex piecewise linear function on n From the data (B; P ϕ) one can then construct a scheme 0 along with a log structure. If †0 and †0 are smoothable, then we expect that the smoothings will lie in mirror families of Calabi-Yau manifolds. This construction can be seen to reproduce the Batyrev-Borisov mirror symmetry construction for complete intersections in toric varieties. This is evidence that it is the correct construction. More intriguingly, in a strong sense this is an algebro-geometric analogue of the Strominger-Yau-Zaslow conjecture. Indeed, we show that given a toric degeneration X ! , if B is the corresponding inte gral a ne manifold with singularities, then the integral a ne structure on B determines a torus bundle over an open subset of B, and topologically is a compacti cation of this torus bundle. Furthermore, it is well-known ([13], [19]) that such a ne structures can be dualised via a (continuous) Legendre transform: we are just replacing the continuous Legendre transform with a discrete Legendre transform. As a result, our construction gives both a proof of a topological form of SYZ in a quite general context, including the Batyrev-Borisov complete intersection case, and also points the way towards an algebro geometrization of the SYZ conjecture. This paper is meant to serve as an announcement of these ideas, which still are a work in progress. We will give an outline of the approach, and suggest what may be proved using it. A full exploration of this program is currently ongoing. Details of many of the ideas discussed here will appear in [9]. Some aspects of the ideas here were present in earlier literature. The idea that mirror symmetry can be represented by an exchange of irreducible components and information about deepest points was present in an intuitive manner in Leung and Vafa's paper [20]. The idea of using the dual intersection complex (in the normal crossing case) to represent the base of the SYZ bration rst occurred in Kontsevich and Soibelman's paper [18],
...
Remark 3.3. It is sometimes useful to think about a log structure via the exact sequence ! O ×X ! M X M X 0 (1) de ning a sheaf of monoids M X. For example, consider Example 3.2, (1), with D 1 2 = 0g ⊆ = Spec k 1; x2], D D1 ∪ D2, with D = 0 . If ij Dj are the inclusions, then M X i1 N ⊕ i2 N, and an element 2 M X is mapped to (n1; n2), where nj is the order of vanishing of along Dj . Pulling back this log structure to D one obtains a similar exact sequence with M D M X Example 3.2, (5) is important. The beauty of log geometry is that we are able to treat such an †0 as if it were a non-singular variety. Essentially, we say a log scheme over 0† which is locally of the form given in (5) is log smooth over 0†. In particular, on a log smooth scheme, there is a sheaf of logarithmic di erentials which is locally free. F. Kato has developed deformation theory for such log schemes. The philosophy is then as follows. Given B; P , we have constructed a space 0. We rst try to put a log structure on 0 such that there is a set Z ⊆ Sing 0) not contained in any toric stratum of 0 such that †0 Z is log smooth. We then try to deform †0 in a family to get † †, and do this in such a way that the underlying map of spaces X ! is a toric degeneration. This is the technical heart of the program, and we will only give some hints here of how this works. The rst point is that given B; P , we constructed 0 by gluing together its irreducible components. However, it can also be constructed by describing an open cover and a gluing of these open sets. Speci cally, if σ 2 P , we can view σ as a polytope in MR, and let ~σ be the cone over σ in MR ⊕ , i.e. σ rm; r r ≥ 0; m σ Then ~σ de nes an a ne toric variety Yσ, and writing HomZ M ⊕ ) as N ⊕(0 1) N ⊕ represents a monomial z on Yσ. We let σ be de ned by the equation z = 0 in Yσ. We are simply reversing the procedure described in § 2 to obtain B from a toric degeneration. It is then not di cult to show that σ σ 2 Pg form a natural open covering of 0, and one can explicitly describe how they glue. We have gained from this description a natural log structure on σ coming from the inclusion σ ⊆ Yσ as in Example 3.2, (4) or (5), and so we have an open covering of 0 by log schemes which are log smooth over 0† †σ † σ 2 PgThe problem is that unless Z φ, the log structures don't glue. However, it is possible to de ne a \sheaf of log structures on σ over 0†" consisting essentially of deformations of the given log structure. This is a rather technical but important point. Given a log structure, in a certain sense, it is the extension class of M X by O ×X in (1) which determines the log structure. In our case, the sheaves M Xσ do glue, so one can de ne a sheaf of monoids MX 0 globally on 0. The \sheaf of log smooth structures" LS 0) can then be de ned as an appropriate subsheaf of E xt 1


[exit code: 0]