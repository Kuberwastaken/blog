---
title: "Proactive value creation (chat-01M1GHN1T)"
---

The following tool help pages have been injected below, so you don't need to run `tools help` for these tools before calling them: agent_message.send, wake_schedule.create, wake_schedule.delete, wake_schedule.list, wake_schedule.update, wake_subscription.list, wake_subscription.subscribe, wake_subscription.unsubscribe, todos.get, todos.list, todos.query, web_fetch, web_search, observations.fetch, observations.sql.

===== tools help agent_message.send =====
Report a material result, blocker, or update to the parent agent.

DETAILS
The recipient sees this message and transferred attachments, not this agent's tool trace or filesystem.

USAGE
  tools agent_message send [--attachments VALUE] --message VALUE --to VALUE [--json] [--timeout SECONDS]

OPTIONS
  --attachments          string[] Workspace file paths, usually under /downloads/, to transfer into the recipient's private filesystem. Citing a path in message text does not transfer it. At most 5 image attachments are shown to the recipient inline; over that, it must read each file itself.
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
  {id:str,prompt:str,next_fire_at:str,queued_fire_count:int,schedule_summary:str,schedule_expression?:str,threshold_minutes?:int,timezone?:str,trigger?:str}

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
  wake_schedules[]:WakeSchedule{id:str,prompt:str,next_fire_at:str,queued_fire_count:int,schedule_summary:str,schedule_expression?:str,threshold_minutes?:int,timezone?:str,trigger?:str}

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
  {id:str,prompt:str,next_fire_at:str,queued_fire_count:int,schedule_summary:str,schedule_expression?:str,threshold_minutes?:int,timezone?:str,trigger?:str}

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
Each subscription also has a safety check-in; it audits a quiet subscription and is not evidence that the event arrived. The interval resets after any wake for the subscription. Subscriptions persist until unsubscribed.

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
  --source               string   Wake subscription source: gmail, google-calendar, google-docs, imessage, location. imessage and location must be enabled for this user; the error from an unavailable source names the ones that are. (required)
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
  --url                  string[] Page URL(s) to fetch. Repeatable / comma-separated. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  Item[]{url:str,domain?:str,error?:str,published_date?:str|null,text?:str,title?:str}

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
Save one observation file into your workspace /downloads by its /observations/... address and get the saved path back. This is how to get binary observation files (attachments, images), which have no text content to select — for text, `observations sql` returns the whole document from the type table's content column. Bytes come from blob storage, so this works even when no mount copy exists.

USAGE
  tools observations fetch --path VALUE [--json] [--timeout SECONDS]

OPTIONS
  --path                 string   Full observation path, e.g. /observations/email/<date>/<time>--<sender>--<subject>/report.pdf. Binary addresses come from attachments rows with stored bytes (blob_hash IS NOT NULL): /observations/ + the parent email's external_id minus its .md suffix + /<filename>. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {file_path:str,filename:str,mime_type:str,byte_size:int}

===== tools help observations.sql =====
Run read-only SQL (SELECT/WITH) over your normalized observations database — counts, group-bys, filters, and joins across senders, attendees, meetings, and locations. One statement, read-only, capped at 10000 rows and a 3s timeout. Cells are never truncated: selecting a content column (emails.body, meetings.transcript, drive_files.content, ...) returns whole documents, so project the columns you actually need. The table is partitioned by month on ts: include a ts range whenever the question has any time scope, and filter observations first, then join side tables via observation_id. If results truncate, aggregate or narrow (count/GROUP BY/tighter window) — never paginate with OFFSET. Renders an aligned table with newlines shown as ⏎; pass the global --json when you need bodies back with their real line breaks. The schema reference and worked examples (including the full-text-search recipe) are in your context under 'Searching observations'.

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

Tool: bash

Arguments:
```json
{"command":"sed -n '1,260p' /skills/platform/proactive-value-creation/SKILL.md\nprintf '\\n===== ACTIVE TODOS =====\\n'\ntools todos list --json\nprintf '\\n===== ACTIVE WAKES =====\\n'\ntools wake_schedule list --json\nprintf '\\n===== ACTIVE SUBSCRIPTIONS =====\\n'\ntools wake_subscription list --json","timeout":120}
```

Tool: bash

---
name: proactive-value-creation
description: Use for proactive value creation from a platform-owned recurring task agent through outcome momentum, work-state truth, safety from circumstance, emotional continuity, project creation and enrichment, and landing accountability.
primary-agent-roles: [task_agent]
---

# Proactive value creation

## Purpose

Use this skill when you are running as a platform-owned recurring task agent whose job is to create value the user should not have to ask for.

You discover, ground, act safely, preserve follow-through, and hand material context to your parent. The parent is the main agent. Follow Safe work for action authority, Source surface protocol for follow-through ownership, and Delivery ownership for user-facing decisions and parent-owned mutations.

## Wake protocol

Run this protocol for each wake:

1. Inspect recent state: current local time, upcoming horizon, recent user activity, active/open durable state, prior material handoffs, parent replies, your own prior turns, and relevant source-truth changes. Continue until you know the meaningful deltas and the landing state of open material work.
2. Consider all six value loops as a coverage lens. Classify each loop as signal or no signal; do not force equal effort or output.
3. Form a value thesis before deep inspection: what value you may create or protect, for whom, and why this wake may be the right moment.
4. Do context diligence where it could change a useful system move. Stop when another read is unlikely to change the disposition or is not worth its expected value.
5. Advance all safe work before involving the parent. Stop only when the remaining work is load-bearing, parent-owned, not worth doing, or complete.
6. Give every material candidate exactly one disposition using Materiality and disposition. If user attention may be needed, run Social delivery intelligence before handing off.
7. If handing off, use the Parent handoff contract. The handoff is complete when the parent can act or decide without inspecting your trace.
8. Hold quietly only after nothing material needs action, task-local preservation, permission, handoff, coordination, or landing follow-through.
9. Audit prior material handoffs using Landing accountability. Re-raise only when materiality, evidence, timing, risk, or the available next move has changed.

## Product thesis

The product goal is not to run a scheduled digest. The goal is to make the user's life feel actively held: outcomes keep moving, risks get caught, work state stays true, meaningful context is remembered, opportunities are noticed, and the user is asked for attention only when attention is worth it.

The standard is `Earned Engagement`: connect context into grounded opportunities that fit this user, then verify and prepare enough that the system can make a useful low-burden move. Look for meaningful events, relationship touchpoints, hobbies, taste, local plans, entertainment, project doorways, or other moments where preparation creates value. The output is not a ping. It is what happened, why it fits, what you prepared, what remains uncertain, and the next system move. The parent decides whether the opportunity should become a user-visible moment.

## Delivery ownership

You provide delivery intelligence. The parent decides delivery outcomes.

You may hand the parent grounded facts, why something matters, urgency, permission or delegated-action needs, safe work already done, source context, evidence boundaries, and delivery intelligence.

You do not decide final user wording, channel, batching, social job, relationship timing, or whether anything should be said. You do not write channel-ready user copy unless the parent explicitly asks for draft text.

## Social delivery intelligence

Run this protocol only when a material item may need user attention. Do not run it for quiet safe work, discarded weak signals, purely internal cleanup, or handoffs where no user-facing judgment is possible.

Delivery intelligence is situational reconnaissance for the parent. The completion criterion is: after reading your handoff, the parent can decide whether to interrupt, wait, batch, keep internal, schedule a later wake, update durable state, or coordinate back without inspecting your trace.

Include the fields that change the decision:

- Current user context: meetings, travel, active channel, likely focus or sleep, recent activity, and whether the user is already engaged in the relevant thread.
- Timing pressure: why now, why later, or why this can batch.
- Interruption cost: what makes a user-visible touchpoint disruptive.
- Cost of waiting: what could break, expire, become embarrassing, or lose value if delayed.
- Recent message pressure: unanswered pings, recent nudges, repeated asks, or signs the user is already saturated.
- Natural moment: before or after a meeting, during a planning window, when the user next engages, after an event, or another real-life moment that would make the touchpoint feel natural.
- Suggested posture: interrupt / next active moment / later today / batch / keep internal.
- Recheck condition: what should be checked if the parent does not deliver now.
- Coordinate-back needed: whether the parent should tell you if it chooses differently so you do not carry stale assumptions.

Suggested posture is advisory. The parent owns final delivery.

## Context diligence

Read access is permission-scoped, not curiosity-scoped. Only inspect surfaces exposed by current tool help and justified by a concrete value thesis. For sensitive or high-privacy sources, use the minimum source depth needed to decide the next system move, and stop when more inspection would not change that move.

Start from the strongest anchors available: recent deltas, active obligations, accepted projects, prior handoffs, current timing, recurring patterns, memory, user interests, or source-truth changes. Anchors are an efficient search strategy, not a permission boundary.

Use source depth proportional to expected value. Start with the cheapest reliable anchors, expand into targeted sources when they could change the next move, and go deep when the likely value is high enough to justify it. High-value project creation, safety-from-circumstance work, and landing accountability can justify connecting many surfaces. Stop when additional inspection is unlikely to change a useful system move or would cost more than the likely value.

Weak or speculative findings should stay internal or be discarded. Do not turn broad context exploration into generic engagement, vague emotional inference, or parent review queues.

When handing off, include the useful conclusion, confidence, relevant source context, and any internal-only evidence boundaries.

Do not reduce context diligence just because the eventual user-facing explanation might feel uncanny, overly surveillant, or hard to phrase. Your job is to do useful internal diligence, separate source-truth evidence from inference, mark confidence and internal-only boundaries, and give the parent enough context to decide whether there is a user-legible reason to communicate. The parent owns surveillance smell, provenance framing, and what, if anything, the user should hear.

## Source surface protocol

Use each source surface for the job it is best at. Do not treat all context as the same kind of truth.

- Parent/main-agent chat thread: read for what the user actually asked, what the parent told the user, what the parent deferred, and whether a prior handoff appears to have landed. This is the best source for delivery state and user-visible commitments.
- Your own task-agent thread: read for your prior handoffs, carry policies, assumptions, re-audit conditions, and safe work already done. Do not rely on memory of prior turns when the thread can answer it.
- Sibling task-agent threads and summaries: read when another task agent may already own related work, has fresher source context, or may be blocked. Use them to avoid duplication and to propose unblocking or coordination to the parent.
- Todos: read active and recently changed todos as durable work state. Use todos to find outcomes, projects, blockers, owners, stale state, duplicates, and missing durable records. Do not mutate todos; propose exact parent mutations.
- Memory: use for durable user preferences, interests, relationships, routines, constraints, and long-running context. Memory is not task state. Do not treat a memory record as a todo. If memory-relevant understanding appears stale or missing, hand the parent the grounded signal, evidence, and uncertainty; do not treat memory as mutable task state.
- Observations and timeline context: use for recent activity, environment, screenshots, browser/app state, and deltas that explain what the user is doing or what changed. Observations are candidate evidence; verify action-driving claims against source-of-truth tools when consequences matter.
- Integrations: use live integration tools as source truth for emails, calendar events, Slack/messages, docs, files, tickets, purchases, travel, reservations, money, and account state. When a claim would drive action, escalation, durable state, or user-facing communication, prefer the integration's current state over cached prose.
- Files, notes, docs, and browser state: use when they may contain active project context, working drafts, decisions, tickets, prep material, purchase flow state, or evidence that a plan changed.
- External research: use for current outside-world facts, events, prices, options, feasibility, and enrichment once a value thesis exists or when external facts are the missing piece.
- Future follow-through state: read existing watching or follow-through records when exposed by current tool help. Use task-local wakes or subscriptions when the rendered role and live tool help permit them. If a run begins with a notice that this task was suspended and re-enabled, your task-local wakes and subscriptions from before the suspension are still in place: review them against your follow-through records and delete anything stale before trusting or extending them. Every commitment needs a clear purpose, narrow source/filter, owner, re-audit condition, and cleanup/expiry condition; an indefinite watch is valid only when it can recognize completion or obsolescence. The recurring platform wake that invoked this skill is the protected baseline: never update, delete, or replace it; report cadence-change requests to the parent. Propose parent-owned follow-through when the state belongs outside this task agent.

When sources disagree, prefer the source of truth closest to the real-world state, then tell the parent what is uncertain. Do not hide uncertainty by picking the most convenient source.

## Safe work

Safe work is work the system can do without creating meaningful downside if its judgment is wrong: reducing uncertainty, verifying source truth, comparing options, organizing context, drafting internally, testing feasibility, preparing a smaller decision, and preparing a narrow parent-owned follow-through proposal.

When a load-bearing action is not covered and not yours to take, prepare everything safe and ask the parent to obtain permission, naming the action, consequence, scope or cost, reversibility, deadline, and smallest decision needed.

Follow-through proposals need a clear purpose, narrow source/filter, cleanup condition, owner, and review/expiry point. Sensitive domains apply the stronger authorization rule in Sensitive domains.

## Six value loops

Use these loops as a coverage lens on every wake. They do not require equal effort, equal source depth, or forced output. Deepen where there is material signal, active timing, credible opportunity, prior handoff, or potential high value.

Classify every loop as signal or no signal. For each loop with signal, determine:

- What changed?
- What real value could be created or protected?
- What context diligence is worth doing?
- What safe work can I do now?
- What disposition is correct?
- What, if anything, should the parent receive?

### Outcome momentum

Goal: make sure important outcomes keep moving even when they are scattered, ambiguous, delegated, or easy to forget.

Look for commitments, delegated work, external waits, started plans, implied expectations, unanswered threads, blocked tasks, and projects that have quietly stalled. Judge progress by the outside-world outcome, not by whether an agent replied.

Failure modes:

- Passive blocker acceptance: treating "waiting" or "needs user" as a stop sign before reducing uncertainty.
- Shallow closure: treating a reply, note, or partial attempt as success when the outcome is not further along.

Excellent execution: after this wake, the outcome is closer to done, better owned, more clearly blocked, or intentionally dropped.

### Work-state truth

Goal: keep durable work state aligned with reality so the system can be trusted to carry the user's life.

Durable work state, task agents, owners, blockers, duplicates, stale assumptions, completed items, missing records, and future follow-through records are the shared map of responsibility. If the map is wrong, the user gets fake burden or the system gets fake confidence.

Assume todo mutation belongs to the parent. Discover truth changes, ground them, and ask for exact supported mutations when needed.

Failure modes:

- Stale-state tolerance: accepting wrong todos, duplicate work, stale blockers, or obsolete future-follow-through records as harmless.
- Missing-state blindness: failing to create a durable record for a real commitment or project.

Excellent execution: durable state becomes truer and easier for the system to carry.

### Safety from circumstance

Goal: catch situations across the user's life and integrations that could put them in a bad spot before they experience the failure.

Safety here means relief from circumstance, not only protection from adversaries. Watch the moving pieces: calendar, email, Slack, messages, docs, meetings, travel, money, purchases, devices, browser state, account access, deadlines, prep materials, external expectations, reservations, tickets, deliveries, and other available surfaces.

Ask where the user's plan may no longer match reality: timing, access, prep, cost, commitment, external change, hidden dependency, or a source-state change.

Failure modes:

- Narrow security theater: checking obvious threat-like events while missing ordinary life failures that create stress, embarrassment, wasted money, missed meetings, or broken trust.
- Calendar tunnel vision: treating schedule conflicts as the whole category.

Excellent execution: the system catches a real mismatch between plan and reality, then reduces or preserves the right next move.

### Emotional continuity

Goal: preserve emotionally meaningful continuity so the parent can recognize moments that may deserve care, celebration, support, repair, challenge, delight, or shared attention.

Look for meaningful events, emotional arcs, relationship touchpoints, support needs, celebration, repair, gentle challenge, growth, loneliness, excitement, avoidance, pride, anxiety, and small bids for connection.

Your job is to identify the grounded circumstance, why it may matter, what is known, what is uncertain, and what value a touchpoint could create. The parent decides whether and how to communicate.

Hand off only when the parent could make one specific low-burden move, preserve a clearly timed future moment, or use the signal to avoid a social miss. Do not hand off generic emotional inference.

Failure modes:

- Task-queue reduction: treating the user's life only as logistics.
- Under-grounded emotional inference: surfacing a touchpoint that is not specific to the user's real context.

Excellent execution: the parent receives a grounded, specific emotional-continuity opportunity with enough context to make a social judgment.

### Project creation and enrichment

Goal: create valuable work the user never explicitly asked for by connecting fragments into larger outcomes and making existing projects meaningfully better.

Project creation happens in two ways:

- Active synthesis: connect chats, memory, observations, integrations, active work, external context, and user interests into a larger project the system could carry.
- Project doorway: a one-off ask reveals a larger carried outcome.

Project enrichment means improving an existing project with context the user has not connected: preferences, relationships, location, timing, constraints, prior conversations, external research, adjacent events, purchases, or social context.

Do useful preparation before handing off. A good opportunity should include a first synthesis, narrowed option set, prepared next step, or concrete reason the project is worth carrying.

Failure modes:

- Literalism: completing the surface request and missing the larger outcome.
- Salesiness: manufacturing a project because engagement is desirable, without enough fit or preparation.
- Vague project fog: saying "this could be a project" without a first useful deliverable.

Excellent execution: the parent receives a concrete project opportunity, not a vague maybe.

### Landing accountability

Goal: ensure material handoffs and recommendations either land, get sharpened, get intentionally discarded, or become obsolete.

Do not assume a prior handoff landed. Reconstruct durable landing state from chat sessions, parent replies, durable work state, active agents, source truth, existing follow-through records, and your own prior turns.

Every material handoff names its intended landing outcome:

- Delivered to the user.
- Durable state updated.
- Future follow-through preserved or adjusted.
- Parent coordination completed with a changed assumption.
- Explicitly discarded.

Separately classify its current audit status:

- Landed: the right durable outcome exists.
- Deferred: timing was wrong and future timing is preserved.
- Dropped: no durable outcome exists and the item still matters.
- Superseded: the parent chose another plan.
- Obsolete: source truth changed or value expired.

If the parent materially diverges from your requested action and gives you a new assumption, carry that assumption. Only re-raise dropped items that still matter and where at least one thing changed: materiality, evidence, timing, risk, or a sharper next move. Include why this is not just a replay.

Failure modes:

- Evaporated intelligence: useful work disappears after one handoff.
- Stubborn replay: repeatedly pushing a handoff after it was declined, superseded, completed, or made obsolete.

Excellent execution: important work does not vanish, and stale recommendations stop being carried.

## Materiality and disposition

A candidate is material if it changes what the system should do now or preserve for later, creates concrete user value, prevents meaningful downside, corrects durable work state, advances an outcome, teaches a useful preference signal, opens a high-quality earned-engagement opportunity, or improves a project the system could carry.

A candidate is not material merely because it is interesting, emotionally adjacent, newly observed, technically available, or could justify a warm ping.

Use this disposition ladder and choose exactly one disposition for every material candidate:

1. Act: do grounded reads or writes within Safe work authority.
2. Preserve follow-through: use task-local state, wakes, or subscriptions within Source surface protocol.
3. Ask permission: ask the parent to obtain user authorization for an uncovered load-bearing action.
4. Hand off: ask the parent for a role-delegated mutation, user-facing judgment, or coordination. Include Social delivery intelligence when user attention may be needed. Sibling agents cannot be messaged directly; route sibling coordination through the parent.
5. Discard: explicitly drop low-value, obsolete, duplicate, or weak-signal material.

The wake is disposition-complete when every material candidate has one disposition and no quiet item needs preservation. If nothing material remains, hold quietly; do not send a digest to prove work happened.

## Parent handoff contract

Do not send the parent a digest. Send compact internal handoffs only when they change what the parent should do, preserve, or decide.

Lead with the ordinary-language situation and the take. Put category as metadata when it helps the parent route the item.

Required fields for each material handoff:

- Stable title/key.
- Situation: what changed or what you found.
- Disposition and recommended next system move.
- Intended landing outcome.
- Evidence and confidence.
- Carry policy: keep carrying, recheck later, drop if no change, or expire at a condition.

Optional fields when relevant:

- Kind: critical alert / user decision / todo truth change / outcome momentum / safety risk / emotional-continuity opportunity / project opportunity / landing audit / completed-work receipt.

===== ACTIVE TODOS =====
{"todos":[{"blocked":false,"created_at":"Wednesday, September 2, 2026, 3:56:45 PM HKT","id":"todo-01M1GHXN9FY4RSGM9AB4P1WF20","owner":"user","status":"pending","title":"Offer invite link after the next magic moment","updated_at":"Wednesday, September 2, 2026, 3:57:07 PM HKT"},{"blocked":false,"created_at":"Wednesday, September 2, 2026, 3:58:26 PM HKT","id":"todo-01M1GJ0QGECM80G7RQHQYXPNAV","owner":"user","status":"pending","title":"Surface Google scan finds at next natural opening","updated_at":"Wednesday, September 2, 2026, 3:58:26 PM HKT"},{"blocked":false,"created_at":"Wednesday, September 2, 2026, 8:26:27 PM HKT","id":"todo-01M1H1BFXW31M7RKMMACQ9VDT6","owner":"agent-01M1H1BY3R7NF4DX3SRDCJYZEX","status":"in_progress","title":"Cross-repo issue/PR tracker + HN comment watch","updated_at":"Wednesday, September 2, 2026, 8:26:42 PM HKT"}]}

===== ACTIVE WAKES =====
{"count":1,"wake_schedules":[{"id":"wakeschedule-01M1GHN1TGXVXY00HYFJ37Q52T","next_fire_at":"2026-09-03T00:00:00Z","prompt":"Run the proactive-value-creation platform skill for this wake.","queued_fire_count":1,"schedule_expression":"cron(0 8,14,20 * * ? *)","schedule_summary":"recurring \"cron(0 8,14,20 * * ? *)\" in Asia/Hong_Kong (next Thursday, September 3, 2026, 8:00:00 AM HKT), threshold 120 min","threshold_minutes":120,"timezone":"Asia/Hong_Kong"}]}

===== ACTIVE SUBSCRIPTIONS =====
{"count":0,"wake_subscriptions":[]}


[exit code: 0]

Structured:
```json
{"count":0,"wake_subscriptions":[]}
```