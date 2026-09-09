---
title: "lit: atypical loci + zilber-pink computational (chat-01M212SZR)"
---

Context: a serious computational Hodge-conjecture program (Weil-type abelian sixfolds, certified OUT-by-4 obstruction vs a 438-class catalogue) hit the Deligne cap: Hodge classes on abelian varieties are absolute Hodge (Deligne 1982), so realization-level tests cannot detect non-algebraicity. The one rigorous non-algebraicity verifier is the Frobenius root-of-unity bound (van Luijk trick) in higher codimension, which can only fire where Delignes conjecture (Hodge => absolute Hodge) could fail: atypical isolated Hodge points in non-abelian-type families. The user demands extremely deep literature search - arxiv full text, GitHub, blogs, proceedings, 1990-2026. Report to your parent with source URLs, what exists, what is directly usable, and an honest verdict on whether it changes three numbers: counterexample-via-frobenius-sweep 1-3pct, lift-direction algebraicity theorem 5-10pct, current-program counterexample 0pct.
YOUR SPECIALTY: the atypical/isolated Hodge point world. Klingler-Otwinowski-Urbanik, Baldi-Klingler-Ullmo on fields of definition of Hodge loci; Voisin on Hodge loci; Zilber-Pink and atypical intersections - but the COMPUTATIONAL side: any paper that EXHIBITS an atypical Hodge point explicitly with computable data, Movasati's explicit Hodge loci (he computes components of Hodge loci for Fermat-type families - get his tables, code, and arxiv list), infinitesimal VHS computations. Goal: assemble the candidate-family shortlist where an isolated exotic Hodge class could be (i) found numerically, (ii) PROVEN Hodge, (iii) point-counted. Say exactly which families are closest to ready.

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
I'm a task agent spawned by Main to do deep literature search on the atypical/isolated Hodge point world — computational side. The goal: assemble a candidate-family shortlist where an isolated exotic Hodge class could be (i) found numerically, (ii) PROVEN Hodge, (iii) point-counted. Report to parent with source URLs, what exists, what's usable, and verdicts on the three numbers.

My specialty scope: Klingler-Otwinowski-Urbanik, Baldi-Klingler-Ullmo (fields of definition of Hodge loci), Voisin on Hodge loci, Zilber-Pink and atypical intersections — but the computational side: papers exhibiting atypical Hodge points explicitly with computable data, Movasati's explicit Hodge loci (tables, code, arxiv list), infinitesimal VHS computations.

This is a deep research task. Let me plan the searches:

1. Movasati explicit Hodge loci computations — his papers: "Hodge loci and absolute Hodge cycles" / "Modular and Automorphic Forms & Arithmetic" — he has a book "A Course in Hodge Theory" and papers on Hodge loci for Fermat varieties. Key papers: 
   - H. Movasati, "Modular and Automorphic Forms & Arithmetic" — computes Hodge loci passing through Fermat point for hypersurfaces.
   - Movasati & Villaflor? 
   - He has code at github? I recall "Hodge loci in the deformation space of Fermat varieties" and his tables of Hodge numbers. He has a paper "Why should one compute the periods of algebraic cycles?" and a book. He maintains a webpage with code (foliation integrals, etc.).

2. Klingler-Otwinowski-Urbanik — "On the fields of definition of Hodge loci"? Actually that's Baldi-Klingler-Ullmo: "On the distribution of the Hodge locus" (arXiv 2107.08838). Klingler-Otwinowski: "Hodge loci and the Torelli problem"? Otwinowski-Klingler-Urbanik paper "Equidistribution in families of abelian varieties and uniformity"? Actually: B. Klingler, T. Otwinowski, D. Urbanik — "On the fields of definition of Hodge loci" maybe. Let me search.

3. Voisin on Hodge loci — "Hodge loci" in Handbook of moduli (2013); "Hodge loci and absolute Hodge classes"; her paper "The density of the Hodge locus" etc.

4. Zilber-Pink atypical intersections — Daw, Orr, Klingler, etc.

5. Computational side — papers that explicitly exhibit atypical Hodge points with computable data:
   - Movasati's computations of Hodge loci components for Fermat-type hypersurfaces (he computed for quintic threefolds? and for surfaces).
   - "Atypical Hodge loci of low codimension" — actually there's a paper by Gregorio Baldi, Bruno Klingler, Emmanuel Ullmo; also "Hodge loci and atypical intersections: conjectures" by Klingler.
   - Dan, Akhtar? "Atypical examples in Hodge theory" — there is work by A. Dan? Also "Voisin's examples of atypical Hodge loci" (her 2017 paper constructing non-algebraic Hodge classes in families? "On the homotopy types of Kähler manifolds and birational aspects of algebraic geometry" no). Voisin has "Hodge theory and complex algebraic geometry" and the paper where she constructs Hodge classes not absolute Hodge? No — that doesn't exist for H^2 by Kodaira. Hmm.
   
   Actually relevant: Voisin's examples of smooth projective families where the Hodge locus is dense but not algebraic? "Hodge loci" survey.

   - Movasati & Sertöz? 
   - Computational point-count: Kedlaya, Costa, Harvey — point counting algorithms (Kedlaya p-adic cohomology), Harvey's average polynomial time. For a Frobenius sweep, you'd need zeta function computation of the hypersurface over F_p. Costa's "p-cohomology" code (psage? "phc"?). Edgar Costa has code: https://github.com/edgarcosta/p-cohomology? Actually it's "Controlled reductions" and the code in Sage "cohomology". Edgar Costa, "Computing zeta functions of nondegenerate hypersurfaces with few monomials" and the pycontrolledreduction repo: github.com/edgarcosta/pycontrolledreduction.
   - van Luijk trick: Ronald van Luijk "K3 surfaces with Picard number one and infinitely many rational points" (2005) — Picard number 2 vs 1 discrepancy via Frobenius. Elsenhans-Jahnel extended to higher degree.

6. Atypical Hodge loci explicit examples: 
   - "Klingler, Otwinowski" — "Atypical Hodge loci for Hodge classes of high degree"? There's a 2024-2025 paper: Bruno Klingler, Thomas Otwinowski, David Urbanik "Fields of definition of Hodge loci" (arXiv). 
   - Also Baldi-Ullmo: "Special subvarieties of non-arithmetic ball quotients and Hodge Theory" — computing exceptional Hodge loci in ball quotients; Ullmo-Yafaev.
   - Urbanik "Atypical Hodge loci" — David Urbanik has a paper "Atypical Hodge Loci and the Zilber-Pink conjecture"? Actually "David Urbanik, Absolute Hodge classes and atypical intersections"? There's Urbanik "A new proof of the theorem of ..." Hmm. There's a recent paper: "Atypical Hodge loci" by Klingler-Otwinowski (2023?): they construct explicit families with dense atypical Hodge loci. And Otwinowski's thesis (IMJ / Université Paris-Saclay) computing Hodge loci in families of hypersurfaces — "Composantes du lieu de Hodge et monodromie" maybe. Thomas Otwinowski's PhD thesis: "Hodge loci of families of hypersurfaces" — he computed Hodge loci of cubic fourfolds? I recall his thesis on "Lieux de Hodge des familles d'hypersurfaces".
   
7. Movasati's explicit Hodge loci: H. Movasati, "Hodge loci in the deformation space of Fermat varieties" — he computed for Fermat cubic? He has tables at his webpage (w3.impa.br/~hossein). Papers: "Modular and automorphic forms & arithmetic" (with computations of Hodge loci for the Fermat variety of degree? and dimension?). Also "Hodge theory of ... " his book "A Course in Hodge Theory: With Emphasis on Multiple Integrals" (2021). Also Movasati-Villaflor "Periods of linear cycles on Fermat varieties"? Also "Computing periods of hypersurfaces" (Movasati, with code in Singular: "foliation.lib"?). He has github: github.com/hossein-movasati? Not sure. Let me search.

Also relevant computational IVHS: infinitesimal variation of Hodge structure — Carlson-Green-Griffiths-Harris; computations for hypersurfaces via Jacobian rings (Griffiths residues). Movasati uses exactly this: the Hodge locus is defined by the vanishing of integrals over cycles, computable via Griffiths-Dwork.

Also "Terasoma"? Also "Hodge loci of degree ? passing through the Fermat point" — Movasati & Villaflor Loyola "Periods of complete intersection algebraic cycles" (manuscripta 2021?). There's a big table: for Fermat varieties of degree d and dimension n, the Hodge locus through the Fermat point is either the Fermat point (isolated) or positive-dimensional components; Movasati conjectured characterization. Explicit cases: cubic fourfolds, quintic fourfolds etc.

For our purpose: isolated exotic Hodge point = a point in moduli where an extra Hodge class exists that is not expected (not from the family structure / atypical). In abelian varieties, Deligne: all Hodge classes are absolute Hodge — so Frobenius can't detect. Need non-abelian type families where atypical Hodge points could fail absolute Hodge... wait, actually the claim in the parent's brief: "the one rigorous non-algebraicity verifier is the Frobenius root-of-unity bound (van Luijk trick) in higher codimension, which can only fire where Deligne's theorem could fail: atypical isolated Hodge points in non-abelian-type families." 

My job: assemble candidate-family shortlist. Families where:
(i) extra Hodge classes can be found numerically (period computations, LLL on period matrices — e.g., Movasati's approach; also "Hodge class finder" via numerical periods like van Straten? Also the "Hodge conjecture checker" by ???; Danielsson? For surfaces, Picard number jumping: compute periods numerically, find algebraic cycles via lattice reduction (van Luijk, Elsenhans, Lairez-Sertöz: "Effective reconstruction of generic genus-? curves" no — Lairez & Sertöz "A numerical transcendental method in algebraic geometry: computation of Picard groups and related invariants" (2019), which computes Picard groups numerically with certified bounds via Emre Sertöz and Pierre Lairez. That's key: Lairez-Sertöz compute the Néron-Severi group numerically and certify. Also "Periods and Nori motives" (Huber-Müller-Stach) gives certified period computation — Huber, Müller-Stach "Periods and Nori Motives" book; algorithm by Huber. 
(ii) PROVEN Hodge: IVHS / Griffiths residue computations — Movasati's code; also "Hodge loci" certified via exact rational arithmetic on Jacobian rings.
(iii) point-counted: Kedlaya/Costa controlled reduction, Harvey average poly-time, deformation method (Lauder), Abbott-Kedlaya-Roe (AKR) implemented in Sage (zeta functions of hypersurfaces). Costa's code (pycontrolledreduction), Tuitman's pcc_p/pcc_q (Magma, for curves/smooth surfaces?) — Jan Tuitman's point counting code for curves. Also "hasegawa"? For K3 surfaces: Elsenhans-Jahnel compute zeta via p-adic. For fourfolds/higher: Costa-Harvey-Kedlaya "Zeta functions of nondegenerate hypersurfaces in toric varieties" (CHGK) with code "toric controlled reduction" (github.com/edgarcosta? there's "ToricControlledReduction" Magma code by Costa-Harvey-Kedlaya).

Candidate families for isolated Hodge points with jump in middle Hodge numbers in non-abelian-type:
- Quintic fourfolds / hypersurfaces X^n_d with Fermat point and Hodge loci through Fermat (Movasati's tables). The Fermat variety itself has maximal Hodge classes; the locus through it can be isolated (typical) or positive-dim (atypical relative to expectation?) Actually in Movasati's framework: for Fermat varieties, Hodge loci through the Fermat point; some are "atypical" (dimension smaller than expected). The Zariski tangent space computations via IVHS are machine-doable.
- Complete intersection fourfolds.
- CY threefolds have h^{2,1}... Hodge classes of codim 2 in CY 3-folds = H^4 (curves) — atypical Hodge points in CY families: "atypical points in Calabi-Yau moduli"? There's work by ??? on exceptional points in CY moduli with extra Hodge classes.
- Hyperkähler / K3^[2]? Hodge classes there... but hyperkähler = abelian-type? No, K3 type is not abelian type; but Hodge classes on K3 surfaces are algebraic (Lefschetz 1,1), so no exotic non-algebraic classes in codim 1. Need codim ≥2. K3^[2] fourfolds: Hodge conjecture known? H^4 of hyperkähler fourfolds generated by... Hassett-Tschinkel? Hodge conjecture for H^4 of hyperkähler fourfolds of K3[2] type is known (via deformations?) — Voisin? Actually H^4 hyperkähler known: all Hodge classes algebraic for K3^[n] type? I recall Voisin "Remarks and questions on coisotropic subvarieties..." Also "Hassett-Tschinkel: Hodge theory and Lagrangian planes on generalized Kummer fourfolds". The Hodge conjecture for generalized Kummer fourfolds (abelian surface related — abelian type anyway) is known? There's a 2023 paper proving HC for H^4 of all hyperkähler manifolds of K3^[n]-type? — "Markman: The monodromy of generalized Kummer varieties and algebraic cycles on their intermediate Jacobians"? Markman proved the Hodge conjecture for generalized Kummer varieties (2021). For K3^[n] type: "Voisin, Hodge classes on hyperkähler manifolds"? O'Grady? There's "Hodge classes on hyperkähler fourfolds" by ... I think HC for H^4 of HK of K3^[2]-type was proved by Voisin? Or by "Ferretti"? Not sure. But these are deformations where Hodge classes are absolute Hodge? For K3 type, are Hodge classes absolute Hodge? Not known in general I think — absolute Hodge on K3s for codim 1 yes (algebraic). Hmm, but for hyperkähler fourfolds of K3[2] type, all Hodge classes in H^4 are algebraic? There is a result: "The Hodge conjecture for the moduli space of sheaves on a K3"? Let me not overreach; search will tell.

The classic place where non-algebraic Hodge classes could exist: varieties with h^{p,p} classes not explained. The minimal dimension where HC is open: codim 2 in dim 4 (fourfolds, H^4) and dim ≥ 4 generally; also H^6 in sixfolds (his current case). For Frobenius detection: need family over number field with good reduction, compute characteristic polynomial of Frobenius on H^4_et (for fourfolds) — van Luijk trick: if the Hodge class is algebraic, then eigenvalues that are roots of unity times q^2 must appear with multiplicity ≥ rank of algebraic classes... The bound: # of Frobenius eigenvalues equal to q^2 × (root of unity) ≤ geometric Picard-type rank. If the family member has an extra Hodge class (say h^{2,2} jumps), and point counts show NO extra root-of-unity eigenvalues, the class is not algebraic → counterexample to HC. That's the van Luijk method extended; Elsenhans-Jahnel used it for K3 surfaces (Picard number). For H^4 of fourfolds this requires computing zeta of fourfolds over F_p — heavy but Costa-Harvey-Kedlaya toric controlled reduction can do hypersurfaces; also for double octics / CY fourfolds? There's work: "Zeta functions of Calabi-Yau fourfolds"? Hmm.

Key literature on "isolated/atypical Hodge points computationally exhibited":
1. Movasati's program: explicit Hodge loci for Fermat-type families; his tables list for which (n,d) the Fermat point is an isolated Hodge point vs lies on positive-dimensional Hodge locus. This is EXACTLY the shortlist data: isolated Hodge points with explicit equations over Q (Fermat variety over Q! cyclotomic actually, but the family is defined over Q). Fermat point is a point with CM-like structure; point counting on Fermat hypersurfaces is classical (Weil, Jacobi sums) — trivially computable! So the pipeline (i) numerical: Movasati tables; (ii) proven Hodge: IVHS computations (his code, Singular); (iii) point-count: Jacobi sums for Fermat. But wait: at Fermat point the extra Hodge classes are known algebraic? Many Hodge classes on Fermat varieties are algebraic (Shioda's work: Hodge conjecture for Fermat varieties — Shioda proved HC for Fermat varieties? Shioda "The Hodge conjecture for Fermat varieties" (1979) — yes, Shioda proved the HC for Fermat varieties! So Fermat point is useless for counterexample: all Hodge classes there are algebraic. The interesting points are OTHER points on Hodge loci, or isolated atypical points NOT at Fermat. Hmm.

But the atypical isolated Hodge points in non-abelian families: the whole point of Zilber-Pink is that atypical intersections are "unlikely"; explicit examples are rare. Known explicit atypical Hodge loci: 
- Voisin's examples? She showed Hodge loci can be non-dense etc.
- Otwinowski's thesis: computed Hodge loci in families of hypersurfaces; found atypical components.
- Klingler-Otwinowski-Urbanik (2023?): "On the fields of definition of Hodge loci" — no, that's BKU. 
- Baldi-Klingler-Ullmo: "On the distribution of the Hodge locus" (2021): Hodge locus is analytically dense in typical Shimura varieties, non-dense in atypical (e.g., non-Shimura) varieties — and the proof of Zilber-Pink for atypical Hodge loci (Baldi-Klingler-Ullmo "Non-density of the Hodge locus" + Pila-type).
- Explicit atypical points: "Cattani-Deligne-Kaplan" gives algebraicity of Hodge loci; explicit equations almost never computed. Movasati's work is the exception.

So the honest answer may be: almost nobody has exhibited an isolated atypical Hodge point with full computable data (periods + point counts). Closest ready:
1. Movasati's Fermat-family Hodge loci (explicit equations for loci, IVHS certified; but Shioda kills the Fermat point itself; other points on the loci are over number fields and could be checked).
2. Mirror quintic / CY threefold special points (e.g., "rank-one attractor points", "attractor points" — Moore; "special points in CY moduli" — Demirtas et al. "Explicating DGQY?" Hmm: there is recent physics literature: "Calabi-Yau manifolds with extra Hodge classes"? e.g., "Kachru-Nally-Yang"? Also Gendler-Kachru et al. "Taming the landscape"? Also Candelas-de la Ossa "The zeta-function of the quintic"? Candelas, de la Ossa, Rodriguez-Villegas computed zeta functions of mirror quintic family over F_p (2000-2003) — "Calabi-Yau manifolds over finite fields I/II". That's point-counting data for a CY family! And Kadir "The arithmetic of Calabi-Yau manifolds and mirror symmetry" (thesis) has zeta computations for one-parameter CY families. For threefolds though, H^3 has no Hodge classes (h^{p,p}... H^3 = H^{3,0}+H^{2,1}+H^{1,2}+H^{0,3}, no (p,p)). So CY threefold zeta is about H^3, not Hodge classes. Need even middle degree: CY fourfolds (H^4, Hodge classes (2,2)) — Candelas et al. computed zeta for some fourfolds? There is "The zeta function of a Calabi-Yau fourfold"? Hmm. Actually for CY fourfolds, codim-2 Hodge classes in H^4: atypical points where h^{2,2} jumps. Known: "A Calabi-Yau fourfold with h^{2,2} jump"? 
3. Cubic fourfolds: Hodge classes in H^4; special cubic fourfolds (Hassett): the locus of cubics containing a plane etc. = Hodge loci (divisors C_d). All known Hodge classes on cubic fourfolds algebraic (Voisin proved HC for cubic fourfolds). So useless for counterexample but useful as calibration: known algebraic classes ↔ Frobenius roots of unity. Voisin 2007 "Some aspects of the Hodge conjecture" proves HC for cubic fourfolds.
4. Weil-type abelian fourfolds/sixfolds — Deligne cap applies (his current case).
5. Double octic CY threefolds? H^3 again no Hodge classes.
6. Fourfolds: sextic fourfold? Double covers of P^4 (sextic fourfolds are CY fourfolds): h^{2,2} jumps at special members? "Sextic double solids" are threefolds. "Double octic fourfolds" (double cover of P^4 branched along octic) are CY fourfolds. 
7. Also intermediate Jacobians... no.
8. Hypersurfaces in weighted projective space with h^{2,2} jumping: Movasati-Villaflor computed Hodge loci for Fermat-type; also "Villaflor Loyola: Periods of complete intersection algebraic cycles" thesis with tables (Roberto Villaflor). His thesis (IMP A 2019?) "Periods of complete intersection algebraic cycles" — computes Hodge loci for several families including cubic and quintic? Villaflor has code: github.com/rvillaflor? There's "Hodge loci of Fermat varieties" computations. Also Movasati-Villaflor "A course in Hodge theory" exercises.
9. Dan's work: Ananyo Dan computed Hodge loci? "Dan, Kaur: Semi-regular varieties and variational Hodge conjecture"? Not atypical.
10. Griffiths-Harris infinitesimal: "IVHS computations for hypersurfaces" implemented in Macaulay2? There is code by ??? Also "Hodge loci via IVHS" — Movasati's chapter.

Also the "absolute Hodge" angle: Deligne's theorem says for abelian varieties all Hodge classes are absolute Hodge, hence defined over number fields and Frobenius-stable... The point of the parent: atypical Hodge classes in non-abelian-type families are where absolute Hodge could fail, and Frobenius could catch a non-algebraic class. But note: if a Hodge class is atypical and the family is over Q-bar, by CDK Hodge loci are algebraic, defined over number fields? Baldi-Klingler-Ullmo: Hodge loci are defined over Q-bar (fields of definition). Klingler-Otwinowski-Urbanik: "Hodge loci are defined over number fields" — that paper title I think is "On the fields of definition of Hodge loci" proving Hodge loci (components) are defined over finite extensions of Q? Let me search to get it right.

For the Frobenius test to even apply, the special member must be defined over a number field with good reduction — CDK + BKU guarantee atypical components are over Q-bar, so YES they can be point-counted. Good — that's the conceptual bridge: isolated Hodge points are defined over Q-bar (Baldi-Klingler-Ullmo 2021, "On the distribution of the Hodge locus"), so they have reductions mod p and can be point-counted. The pipeline: find atypical Hodge point numerically (periods), prove the class Hodge (IVHS exactness / CDK algebraicity), prove the member defined over number field (BKU), point-count (controlled reduction), compare root-of-unity count with algebraic class rank bound (need upper bound on rank of algebraic (2,2)-classes — hard! van Luijk trick needs independent geometric upper bound, e.g., via specialization from another prime or geometric arguments. In K3 case: NS rank bound via second prime. For H^4 of fourfolds: algebraic rank upper bound via a second prime with more eigenvalues — same trick works: rank of algebraic classes ≤ #root-of-unity eigenvalues for ANY prime. So discrepancy between two primes gives upper bound; if at p1 count is low and Hodge number is high → non-algebraic. That's exactly van Luijk/Elsenhans-Jahnel methodology. For H^{2,2} though the Frobenius acts on H^4_et which is large (h^4 of CY fourfold can be huge, e.g. sextic fourfold h^4 ~ 1752?), computing full charpoly is expensive but doable? Costa's toric code handles "few monomials"; full sextic in P^5 has many monomials — hard. Maybe smaller: double octic CY fourfolds? h^4? Hmm.

OK. The deliverable: a report. Let me do the searches now. I should also check what siblings might be doing (the parent mentions other specialties exist? Not visible, but the parent spawned multiple agents with different specialties presumably). I could check sibling task agents to avoid duplication. The parent said "YOUR SPECIALTY" implying others cover other areas. I can peek at siblings quickly.

Let me plan search batches:

Batch 1 (web_search, several queries, can I do multiple in one bash call? tools web_search one query per call but I can run multiple tools calls in one bash command line? Each tools call is separate command; I can chain with && but they'd run sequentially in one bash call — yes that's allowed and cheap. Also could use --async. Let me use --async for parallel searches.)

Queries:
1. "Movasati Hodge loci Fermat explicit computation tables" 
2. "Baldi Klingler Ullmo fields of definition Hodge loci"
3. "Klingler Otwinowski Urbanik Hodge loci"
4. "Voisin Hodge loci survey atypical"
5. "Otwinowski thesis Hodge loci hypersurfaces"
6. "Villaflor periods complete intersection algebraic cycles Hodge loci code"
7. "Lairez Sertöz numerical computation Picard group certified"
8. "Costa Harvey Kedlaya controlled reduction zeta hypersurfaces code"
9. "atypical Hodge loci explicit example"
10. "van Luijk Frobenius Picard number K3"
11. "absolute Hodge conjecture atypical points non-abelian type"
12. "zeta function Calabi-Yau fourfold point counting"

Also GitHub searches for Movasati code: w3.impa.br/~hossein; github "Hodge loci" Singular.

Batch 2: fetch key pages: Movasati's webpage tables, arxiv abstracts.

Let me start. First check siblings + run first search batch async. Actually tools async: launch searches async and meanwhile fetch a few known URLs. Known URLs from memory: 
- arxiv.org/abs/2107.08838 (BKU "On the distribution of the Hodge locus") — I should verify rather than trust. Let me search instead of guessing.

Let me fire off a big async batch.
```

I'm picking up a deep literature-search task on atypical/isolated Hodge points — the computational side. Let me start by checking what sibling lanes exist, then fire off a broad async search batch.