---
title: "OLX whoop MG watch (chat-01M1YMNSB)"
---

_1 transcript files aggregated._

Standing watch (2x/day): search olx.in for "whoop MG" listings in two location scopes: Delhi and all-India.

ALERT CRITERIA (report ONLY on a hit; stay silent otherwise - he explicitly wants no "nothing found" pings):
- Whoop MG priced under Rs 10,000 WITHOUT subscription, OR
- Whoop MG at any price WITH a subscription included
- Must be a legit Whoop MG (the medical-grade Whoop 5.0 MG unit) - not a fake, not a Whoop 4.0, not a band/accessory. Judge from listing photos/description; note your legitimacy read when reporting.

DELHI listings are preferred - a Delhi hit is the headline. All-India hits still get reported (he said "link + tell me anyways if it's india").

On a hit, report to parent: listing title, price, with/without subscription, location, the olx.in URL, and your legitimacy assessment. Use the browser (browser-use skill, acquire your own lease) - OLX search URL pattern: https://www.olx.in/items/q-whoop-mg and the Delhi location variant. If the browser is unavailable on a fire, retry once later rather than reporting failure; only escalate to parent if it stays broken across a day.

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
Task: standing watch, 2x/day. First run — do the search now, set up schedule. Use browser. Read browser-use skill and check leases.
```

Tool: bash

Arguments:
```json
{"command": "sed -n '1,150p' /skills/platform/browser-use/SKILL.md; tools wake_schedule list --json"}
```

Tool: bash

---
name: browser-use
description: "Drive the cloud browser: navigation, reading, forms, sign-in, vault, screenshots, and recovery when a site resists. Use when your task involves operating a website. Domain specifics (food, flights, restaurants, rideshare, shopping) live in sibling skills; the browser mechanics here are the same for all of them."
primary-agent-roles: [task_agent]
---

# Browser use

You operate a website through a **lease** on a cloud browser that carries the user's saved profile (cookies, logins). This skill is the mechanics — the same for every site. Domain judgment — what to present, when to confirm, domain pitfalls — lives in the matching sibling skill.

## Do you need the browser?

Use a native integration tool when one covers the operation — it's faster and more reliable: Gmail for email, GCal for calendar, Linear for issues, Slack/iMessage for messages, Docs/Drive for documents. Use the browser to operate a site directly — checkout, account-specific flows, a web form, a page the user shared, or anything with no native tool. If both exist and it's ambiguous, ask your parent which the user prefers. If your task matches a sibling skill (food-ordering, flight-booking, restaurant-booking, restaurant-recommendations, rideshare, shopping), open it first — it names the native-vs-browser split and the flow for that domain.

## Scout first, record after

**Before you open anything**, scout what's known — no lease needed:

```bash
tools browser_guidance search --query 'Expedia book a flight'
```

Scout returns what's known about the site and flow, plus how each config you can route to last performed **for you** (`config-a: success`, `config-b: blocked`). This history is yours — scout only ever returns curated guidance plus your own past outcomes, never another user's. It also jogs your memory: don't assume from memory whether you've done a site before — search and let your own record tell you. Read the results as-is: each row is either curated guidance (`instructions`, no config) or one of your own per-config outcomes (`config`, `outcome`, `outcome_note`) — don't pipe scout through a `jq` projection that assumes one shape, or you'll silently drop the very signal (which config was blocked) you're scouting for.

- **No results** is normal — it means *unknown*, not blocked. Proceed with your default.
- **Omit `--config` to use your default** — the acquire result names the config it ran on. Most tasks want this.
- **Pass `--config=<label>` only to override** to another config you can route to, when your own outcomes clearly favor it for this site. Scout lists the configs you can route to and your default, plus how each has performed for you.

Guidance is a **risk prior**, not proof the attempt is blocked. A signed-out homepage, sparse page, consent screen, or ordinary login redirect is normal site flow — continue it. Call a site blocked only after an explicit challenge or access error, or after the normal route fails at the warned stage. If scout warns a site may block, relay that hedge to your parent before first navigation, then proceed.

**After the attempt lands**, record how the config did — your next run reads it back when it scouts, and reuses the config that worked. One row exists per (config, website, flow) and re-recording replaces it, so reuse the website and flow wording exactly as scout returned them — new phrasing forks a near-duplicate row instead of updating your memory:

```bash
tools browser_guidance record --website <site> --flow '<flow>' --config <label> --outcome success|blocked --note '<what happened>'
```

Every record is kept: scout's per-config line summarizes the full history (latest outcome, how long ago, success/blocked counts). When the summary looks contradictory — a flaky site where timing matters — or you want the notes you left yourself on past attempts, page through them with `tools browser_guidance history --website <site> --flow '<flow>' --config <label>` (newest first). The summary answers most questions; reach for history when it doesn't.

## Signing in and leases

Acquire a lease to use the browser:

```bash
tools cloud_browser_scheduler acquire --task-description='<short task>' --mode=<read|write>
```

It returns a `lease_id`, `persist`, `expires_at`, and an initial `tab_id` (skip a `list-tabs` on your first action). Drive with `tools cloud_browser <action> --lease-id=<lease_id>` (`tools help cloud_browser.all` for the action set) — and only your own lease_id: several leases can be active for the user at once, and mixing IDs drives the wrong session. You don't need to tell your parent you acquired one; just proceed. Extend a long task with `extend-lease`; release with `tools cloud_browser_scheduler release --lease-id=<lease_id>` when done. Omit `--config` to acquire on your default (the result names it); pass `--config=<label>` only to override to another config scout lists for you, when your own outcomes favor it.

The whole lease model follows from **one fact: only a write lease can save a login.**

- A **read** lease loads the saved profile and uses it — you're signed in if the profile is. Any number run at once. Default for everything: reading, searching, filling forms, checkout, acting inside a session that already holds a login.
- A **write** lease is the config's single writer — the only lease that saves a *new* login into the profile, and it saves on **release**, not while you hold it.

So the lease you **open with** turns on one question: **are you going to sign in?** If the task has you log in — or it needs the user's account and no session is saved — open a **write** lease. Otherwise open a **read** lease. The end goal doesn't decide this: a task whose point is to read still opens on a writer if it has you sign in first.

**Two tasks, same site, opposite first move:**

```bash
# "What do the Lavazza pods cost on Amazon?" — nothing to sign into. One read lease.
L=\$(tools cloud_browser_scheduler acquire --task-description='Amazon pod price' --mode=read --json | jq -er '.lease_id')
tools cloud_browser navigate-and-read --lease-id="\$L" --url 'https://www.amazon.com/s?k=lavazza+ristretto'
```

```bash
# "Log into my Amazon and tell me my most recent order." — you'll sign in, and only a
# writer saves that login, so the sign-in opens on a writer even though the goal is a read.
w=\$(tools cloud_browser_scheduler acquire --task-description='Amazon sign in' --mode=write --json | jq -er '.lease_id')
# navigate, vault fill, finish the login on the writer
tools cloud_browser_scheduler release --lease-id="\$w"          # release saves the login
r=\$(tools cloud_browser_scheduler acquire --task-description='Amazon read order' --mode=read --json | jq -er '.lease_id')
tools cloud_browser navigate-and-read --lease-id="\$r" --url 'https://www.amazon.com/gp/css/order-history'
```

A few judgment calls:

- **You've used this site before** — the profile probably holds the login. Open a read lease and go; you never touch the scarce writer. (Not sure? Scout — your own history tells you.)
- **A read lease turns out signed-out** (the profile didn't have it, or the config rotated its IP): sign in on the read lease and continue. It won't be saved this time — fine, and rare.
- **The writer is shared** — one per config, and its only job is to capture a sign-in. Once the login's in, you can release it and continue on a read lease, freeing the writer — worth it when the writer's contended or you have a lot left. If something else needs it while you hold it, tell your parent and do the read-only parts meanwhile.

Each config keeps its own saved profile, and the same credentials work across every config.

→ **How to actually sign in** — account choice, ambiguous accounts, vault, OTPs: `references/authentication.md`.
→ **Payment** — vault-fill cards, the combined MM/YY gotcha, Link: `references/payment.md`.

**Secrets never go through chat.** Never ask the user for a password or card number in the conversation — mint a vault link instead. If the user pastes one anyway, don't refuse it: save it to the vault, use it, and tell them it's insecure and worth rotating since it passed through chat.

**Saved password rejected.** Confirm it's actually the password — not a typo, a stale session, or the wrong account — before concluding a reset is needed. A password reset is allowed and deliberate, not assumed: it changes a credential, so it needs the writer and the user — do it on a write lease and hand up a secure vault link for them to set the new value; never collect the secret in chat.

## Drive the page

The loop: **`navigate-and-read` → decide → act → confirm the result.** Wait for the page to settle before you read, extract links from the page rather than guessing a URL, and confirm the real URL with `current-url` after anything that might have navigated. Refs (`n5`) belong to one snapshot — on `unknown ref`, re-read for fresh ones rather than retrying the dead one. A live browser can be replaced under you — "moved to a fresh browser" / "recovered" / "reconnected" mean the same lease is alive again (refresh and continue); "no active browser session" / "lease expired" mean acquire a fresh one (a write lease's saved cookies carry into it). For the full action set and arguments: `tools help cloud_browser.all`.

## Decisions that belong to the user

When the request leaves a real choice open — "order me dinner", "find a restaurant", "book somewhere", "show me options" — present 3-5 viable choices with the fields that decide it, and wait for your parent to confirm the pick. Don't auto-select the top, cheapest, earliest, or first result. Include a saved screenshot when a visual helps the user choose, and give each finalist's exact verified URL on its own labeled line. You may pick without asking only when the user gave exact criteria that make one option clearly correct, or saved history makes it unambiguous — and even then, confirm before any purchase, booking, or submission.

Before finalizing any purchase, booking, or submission, show the final state and get explicit confirmation. This isn't a list of button labels to watch for — much of browsing is irreversible (a placed order, a booked slot, a sent message), and approval means the user has seen the **specific end state** and approved *that*: "buy me the Whoop charger" authorizes the errand, not this item at this price with this shipping. Show the checkout, get the go-ahead through your parent, then click. Never infer approval from the original request or a progress message.

**Which account.** When more than one identity could be right and a vault entry doesn't settle it, confirm before you submit — a credential typed against the wrong account silently commits to the wrong identity, and a pre-filled account picker is evidence, not authority. (`references/authentication.md` for how to narrow it down.)

## Keep the user posted

Browser tasks take minutes — don't go silent. Send short updates at natural milestones: after opening the site, after a search, before a slow login or payment, after a refinement, before final confirmation. During sign-in especially, report one line before each step (signing in as X, reading the texted code) — auth silence reads as "did it log into the wrong account?". If a task is dragging — a slow flow, a recovery, a pivot you're weighing — say so rather than working silently. Keep updates concrete and light; don't narrate every click.

## When a site doesn't cooperate

Some sites are bot-detectable. Before concluding a block, try a bounded set of recoveries: reload once; if `click` by ref silently no-ops, try `click-at` from a screenshot; if inputs don't take value-mode, retry `mode=keystrokes`; scrape a stubborn autocomplete via `execute-js`; if a search submit gets a generic error, try a deep link with the same parameters. After one bounded attempt plus the applicable recoveries, treat the block as terminal and hand off. A site-level bot wall does not clear on its own, so **don't respawn a fresh lease to escape it, don't re-navigate straight back into the same URL, and never schedule a wake — one-shot or recurring — to re-attempt a bot-walled site**: a blocked site is finished work to report, not bounded work to continue later, and re-attempts just grind and can flag the account. Retry a block only on a genuinely new external signal (the user says they cleared it, or you pivot to a different site or config). This shapes your handoff too: when reporting a bot wall, don't offer to "retry in a bit" — a timed retry hits the same wall and just restarts the grind with the user's blessing — offer the alternative route or hand over your partial state instead. Your browser runs a managed anti-bot solver that clears most interstitials on its own, but it needs 5-30s to work: when a page shows a challenge instead of real content — Cloudflare's "verify you are human" / "just a moment", a "Press & Hold" button, or a reCAPTCHA/hCaptcha checkbox — stay on that already-loaded page and wait for the solve, re-reading for up to 30s (a `wait_for_selector` on the content you expect, or a couple of spaced re-reads) before you treat it as a block; a single read the instant the wall appears misses the solve. Only once ~30s has passed and it's still walled is it terminal — then image-grid CAPTCHAs and hard-mode walls (DataDome) won't yield on further retries and may flag the session, so stop and hand off.

If a config blocks and your scout shows another available config that succeeded here before, acquire that one (`--config=<label>`) and retry — each config keeps its own saved-login profile, so expect to sign in again there. If a fresh lease hits the same connection-level failure on both the target and a neutral check like `example.com`, it's an outage — report it rather than looping onto new leases.

**When you stop, hand your parent the best grounded closeout** — a verified link, a specific verified pivot, or state you already recovered. The pivot decision turns on how specific the request was:

```
"Buy me AirPods" (open-ended) — BestBuy captcha'd. A read-only search elsewhere
has no side effect, so try one: Amazon has them at a comparable price. Pivot, and
tell the parent you switched and why.
```
```
"Order the AirPods from BestBuy" (named the site), OR switching would change the
price / shipping / what you already told the user — don't silently pivot. Say
BestBuy is blocked, what you tried, and ask whether to try elsewhere.
```
```
Worked the recovery ladder, browser still dead on two sites — give up cleanly:
"The browser keeps timing out on both Amazon and example.com after a reload and a
fresh lease — looks like an outage, not the site. Nothing was submitted. Want me
to retry shortly?" Say what you tried, the exact symptom, and a next step.
```

→ **Timeouts, stuck pages, replaced browsers, outages** — the full recovery ladder: `references/recovery.md`.

## Reference files

- **Signing in** — account choice, ambiguous accounts, vault, OTPs → `references/authentication.md`
- **Payment** — vault-fill cards, MM/YY, Link → `references/payment.md`
- **Recovery** — timeouts, stuck pages, replaced browsers, outages → `references/recovery.md`
- **Domain flows** — food, flights, restaurants, rideshare, shopping → the matching sibling skill
{"count":1,"wake_schedules":[{"id":"wakeschedule-01M1YMNSTVAVW50JFC9FEGQDNB","next_fire_at":"2026-09-07T23:04:56Z","prompt":"Run the twice-daily OLX whoop MG sweep per your standing task and report only on hits.","queued_fire_count":0,"schedule_expression":"rate(720 minutes)","schedule_summary":"recurring every 720 minutes, platform-chosen fire times (next Tuesday, September 8, 2026, 4:34:56 AM IST)","timezone":"Asia/Calcutta"}]}


[exit code: 0]

Structured:
```json
{"count":1,"wake_schedules":[{"id":"wakeschedule-01M1YMNSTVAVW50JFC9FEGQDNB","prompt":"Run the twice-daily OLX whoop MG sweep per your standing task and report only on hits.","schedule_expression":"rate(720 minutes)","timezone":"Asia/Calcutta","next_fire_at":"2026-09-07T23:04:56Z","queued_fire_count":0,"schedule_summary":"recurring every 720 minutes, platform-chosen fire times (next Tuesday, September 8, 2026, 4:34:56 AM IST)"}]}
```

```thinking
Schedule already exists (every 720 min). Now do the sweep. Scout browser guidance and acquire a read lease.
```

Tool: bash

Arguments:
```json
{"command": "tools browser_guidance search --query 'OLX olx.in search listings'; tools cloud_browser_scheduler acquire --task-description='OLX whoop MG listing sweep' --mode=read --json"}
```

Tool: bash




tools browser_guidance search blocked by help gate — see end of result
tools cloud_browser_scheduler acquire blocked by help gate — see end of result


[exit code: 3]

[attached: tools help]
Blocked: `search_browser_guidance`, `cloud_browser_acquire` didn't run — an action's help usage contract must be read before it's called. The contracts are below; you can call them from your next turn.

===== tools help browser_guidance.search =====
Search internal browser guidance and your own prior per-config outcomes before choosing a website or navigating. Results are nearest matches, not guaranteed applicable guidance: when no relevant entry exists, unrelated sites or flows may be returned. Apply instructions and outcomes only when the result's website and flow fit your task; otherwise use the browser skill's default strategy. Run before acquiring a browser; no lease is needed. Search coverage is incomplete, so no applicable results does not establish that no guidance exists.

Examples:
- tools browser_guidance search --query 'Resy book a table'
- tools browser_guidance search --query 'Amazon order history' --limit 5

USAGE
  tools browser_guidance search [--limit VALUE] --query VALUE [--json] [--timeout SECONDS]

OPTIONS
  --limit                integer  Maximum results. 1-10, default 3.
  --query                string   Natural-language website and task query. Include a site name or URL when known, for example 'Expedia book a flight' or 'wsj.com account billing'. Names and URLs are search terms, not exact filters. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {results:Result[],available_configs:str[],default_config:str}
  results[]:Result{website:str,flow:str,instructions:str,attempt_count?:int,blocked_count?:int,config?:str,last_attempt_at?:str,outcome?:str,outcome_note?:str,success_count?:int}

===== tools help cloud_browser_scheduler.acquire =====
Acquire a cloud browser lease for one task.

DETAILS
Scout first: before your first acquire in a task, run `tools browser_guidance search --query '<site> <flow>'` (no lease needed); its result includes a guidance_token to pass here. After the attempt lands, record the outcome with `tools browser_guidance record`. Returns a lease_id, persist (true when this is the config's write lease), expires_at, and an initial tab_id. Omit timeout_minutes for the default 240-minute window; some configs extend to 720.

USAGE
  tools cloud_browser_scheduler acquire [--config VALUE] [--guidance-token VALUE] [--mode VALUE] --task-description VALUE [--timeout-minutes VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --config               string   Obscured browser configuration label (e.g. config-a). Omit to use your default config. Scout (`tools browser_guidance search`) lists the configs you can route to and your default; the acquire result names the config that served. The same saved credentials work across every config.
  --guidance-token       string   Token from this task's browser_guidance search result. Required for the first acquire when guidance enforcement is enabled.
  --mode                 string   read or write. A read lease loads this config's saved profile read-only, and any number run at once. A write lease is the config's single writer — the only lease that saves new logins/cookies, written to the profile on release. Omitted takes the write lease when the config's writer is free, otherwise read. The browser-use skill covers when to use which.
  --task-description     string   Short description of the task that will use the browser (e.g. "book SFO-ORD flight"). Recorded on the lease for observability. (required)
  --timeout-minutes      integer  Optional lease duration in minutes. Omit by default for 240 minutes; some configurations support up to 720 minutes when active work requires it.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {lease_id:str,task_description:str,acquired_at:str,expires_at:str,persist:bool,config:str,max_concurrent:int,tab_id?:int}

Tool: bash

Arguments:
```json
{"command": "tools browser_guidance search --query 'olx.in search classified listings' --json"}
```

Tool: bash

{"available_configs":["config-a"],"default_config":"config-a","results":[{"flow":"Find property listings on Zillow","instructions":"Try normally. Property search, listing details, and direct listing links are generally reachable.","website":"zillow.com"},{"flow":"Find resale tickets and prices on StubHub","instructions":"Try normally for resale listings and prices. If a challenge appears, retry once, then offer another marketplace.","website":"stubhub.com"},{"flow":"Find people or profiles on LinkedIn","instructions":"Try normally in an authenticated session. Profile search and profile reading are generally reachable. Preserve canonical profile links.","website":"linkedin.com"}]}


[exit code: 0]

Structured:
```json
{"results":[{"website":"zillow.com","flow":"Find property listings on Zillow","instructions":"Try normally. Property search, listing details, and direct listing links are generally reachable."},{"website":"stubhub.com","flow":"Find resale tickets and prices on StubHub","instructions":"Try normally for resale listings and prices. If a challenge appears, retry once, then offer another marketplace."},{"website":"linkedin.com","flow":"Find people or profiles on LinkedIn","instructions":"Try normally in an authenticated session. Profile search and profile reading are generally reachable. Preserve canonical profile links."}],"available_configs":["config-a"],"default_config":"config-a"}
```

Tool: bash

Arguments:
```json
{"command": "tools cloud_browser_scheduler acquire --task-description='OLX whoop MG listing sweep' --mode=read --json"}
```

Tool: bash

{"acquired_at":"2026-09-07T19:20:42.530573749Z","config":"config-a","expires_at":"2026-09-07T23:20:42.530573749Z","lease_id":"L-krn-o5q2jpobgfzioqervki2zjwiiq","max_concurrent":5,"persist":false,"tab_id":1,"task_description":"OLX whoop MG listing sweep"}


[exit code: 0]

Structured:
```json
{"acquired_at":"2026-09-07T19:20:42.530573749Z","config":"config-a","expires_at":"2026-09-07T23:20:42.530573749Z","lease_id":"L-krn-o5q2jpobgfzioqervki2zjwiiq","max_concurrent":5,"persist":false,"tab_id":1,"task_description":"OLX whoop MG listing sweep"}
```

Tool: bash

Arguments:
```json
{"command": "tools help cloud_browser.navigate-and-read cloud_browser.current-url cloud_browser.release"}
```

Tool: bash

help cloud_browser.navigate-and-read: attached below
help cloud_browser.current-url: attached below

Error: unknown help target: cloud_browser.release
Hint: Did you mean tools help cloud_browser.check-lease?


[exit code: 2]

[attached: tools help]
===== tools help cloud_browser.navigate-and-read =====
Navigate the cloud browser to a URL and read the resulting page as an accessibility tree with [ref=nX] markers, in one tool call.

DETAILS
Prefer this over separate `navigate` + `read-page` calls — saves one LLM turn per page transition. Defaults to wait_until=domcontentloaded so the AX tree is meaningful when read; pass wait_until=load if you need all subresources first.

USAGE
  tools cloud_browser navigate-and-read --lease-id VALUE --tab-id VALUE --url VALUE [--wait-until VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required on every action so it always lands on the intended tab. (required)
  --url                  string   Full URL to open. (required)
  --wait-until           string   When to read the page: 'domcontentloaded' (default — after DOM is parsed), 'load' (after all subresources), or 'none' (immediately; AX tree may be empty).
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

===== tools help cloud_browser.current-url =====
Return the current URL of the addressed tab (post-redirect, post-navigation).

DETAILS
Use this when you need authoritative URL state without re-reading the full page — for example, before reporting a product or booking link back to the user, or to confirm where an input action navigated. read_page, navigate, and navigate_and_read already include `current_url` in their results; other input tools (click, click_at, key_press, form_input, select_option) do NOT — CDP acks input events before the browser commits any triggered navigation, so the result URL would lie. Call this tool after any input that may have navigated.

USAGE
  tools cloud_browser current-url --lease-id VALUE --tab-id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required on every action so it always lands on the intended tab. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {current_url:str}

Tool: bash

Arguments:
```json
{"command": "tools cloud_browser navigate-and-read --lease-id L-krn-o5q2jpobgfzioqervki2zjwiiq --tab-id 1 --url 'https://www.olx.in/items/q-whoop-mg' --json > /tmp/olx-all.json; jq -r '.content // .' /tmp/olx-all.json | head -120"}
```

Tool: bash

{"current_url":"https://www.olx.in/items/q-whoop-mg","navigated":"https://www.olx.in/items/q-whoop-mg","page":"[viewport: showing the on-screen region (~0% down a 4107px page). Scroll then read again to see other regions, or use find to jump to any element anywhere on the page.]\n\nRootWebArea \"Whoop Mg in India, Free classifieds in India | OLX\"\n  banner\n    link \"OLX India\" href=\"https://www.olx.in/\" [ref=n1]\n      image \"OLX India\"\n    image\n    textbox \"Search city, area or locality\" value=\"India\" [ref=n2]\n    button \"select-location\" [ref=n3]\n      image\n    search\n      button \"search\" [ref=n4]\n      group\n        textbox \"search-box\" [ref=n5]\n      button \"reset\" [ref=n6]\n    image\n    link \"favorite Wishlist\" href=\"https://www.olx.in/wishlist\" [ref=n7]\n      button \"favorite\" [ref=n8]\n        image\n      StaticText \"Wishlist\"\n    button \"Login\" [ref=n9]\n      image\n      StaticText \"Login\"\n    link \"SELL\" href=\"https://www.olx.in/post\" [ref=n10]\n      image\n      image\n      StaticText \"SELL\"\n  button \"open-categories-menu\" [ref=n11]\n    image\n  StaticText \"ALL CATEGORIES\"\n  link \"Cars\" href=\"https://www.olx.in/cars_c84\" [ref=n12]\n    StaticText \"Cars\"\n  link \"Motorcycles\" href=\"https://www.olx.in/motorcycles_c81\" [ref=n13]\n    StaticText \"Motorcycles\"\n  link \"Mobile Phones\" href=\"https://www.olx.in/mobile-phones_c1453\" [ref=n14]\n    StaticText \"Mobile Phones\"\n  link \"For Sale: Houses \u0026 Apartments\" href=\"https://www.olx.in/for-sale-houses-apartments_c1725\" [ref=n15]\n    StaticText \"For Sale: Houses \u0026 Apartments\"\n  link \"For Rent: Houses \u0026 Apartments\" href=\"https://www.olx.in/for-rent-houses-apartments_c1723\" [ref=n16]\n    StaticText \"For Rent: Houses \u0026 Apartments\"\n  link \"Beds-Wardrobes\" href=\"https://www.olx.in/beds-wardrobes_c1591\" [ref=n17]\n    StaticText \"Beds-Wardrobes\"\n  link \"TVs, Video - Audio\" href=\"https://www.olx.in/tvs-video-audio_c1523\" [ref=n18]\n    StaticText \"TVs, Video - Audio\"\n  StaticText \"07 Sep, 2026\"\n  main\n    list\n      listitem\n        link \"Home\" href=\"https://www.olx.in/\" [ref=n19]\n          StaticText \"Home\"\n    heading \"Whoop Mg in India\"\n      StaticText \"Whoop Mg in India\"\n    StaticText \"CATEGORIES\"\n    image\n    list\n      listitem\n        link \"All Categories\" href=\"https://www.olx.in/items/q-whoop-mg\" [ref=n20]\n          StaticText \"All Categories\"\n    StaticText \"LOCATIONS\"\n    image\n    StaticText \"Filters\"\n    StaticText \"BUDGET\"\n    image\n    StaticText \"Choose a range below\"\n    textbox \"min\" [ref=n21]\n    StaticText \"to\"\n    textbox \"max\" [ref=n22]\n    button \"Apply\" [ref=n23]\n      StaticText \"Apply\"\n    StaticText \"Showing results for \"\n    StaticText \"'\"\n    StaticText \"whoop mg\"\n    StaticText \"'\"\n    StaticText \"9\"\n    StaticText \" \"\n    StaticText \"Ads\"\n    StaticText \"SORT BY\"\n    StaticText \": Date Published\"\n    list\n      listitem\n        link \"FEATURED ₹ 18,999 NEE Whoop Life MG With 1yr subscription Qty available hundred MUMBAI CENTRAL, MUMBAI 21 AUG\" href=\"https://www.olx.in/item/accessories-c1457-mobile-in-mumbai-central-mumbai-iid-1850144148\" [ref=n24]\n          figure\n            image \"NEE Whoop Life MG With 1yr subscription Qty available hundred\"\n          StaticText \"FEATURED\"\n          StaticText \"₹ 18,999\"\n          heading \"NEE Whoop Life MG With 1yr subscription Qty available hundred\"\n            StaticText \"NEE Whoop Life MG With 1yr subscription Qty available hundred\"\n          StaticText \"MUMBAI CENTRAL, MUMBAI\"\n          StaticText \"21 AUG\"\n        button \"Favourite\" [ref=n25]\n          image\n      listitem\n        link \"₹ 38,000 TODAY Whoop 5.0 Mg Life - With 12 Months Membership. ELPHINSTONE ROAD, MUMBAI\" href=\"https://www.olx.in/item/accessories-c1457-mobile-in-elphinstone-road-mumbai-iid-1833461920\" [ref=n26]\n          figure\n            image \"Whoop 5.0 Mg Life - With 12 Months Membership.\"\n          StaticText \"₹ 38,000\"\n          StaticText \"TODAY\"\n          heading \"Whoop 5.0 Mg Life - With 12 Months Membership.\"\n            StaticText \"Whoop 5.0 Mg Life - With 12 Months Membership.\"\n          image\n          StaticText \"ELPHINSTONE ROAD, MUMBAI\"\n        button \"Favourite\" [ref=n27]\n          image\n      listitem\n        link \"₹ 17,000 Whoop MG Life Fitness Band KARUKUTTY, ANGAMALY YESTERDAY\" href=\"https://www.olx.in/item/men-c1793-whoop-mg-life-fitness-band-in-karukutty-angamaly-iid-1854850609\" [ref=n28]\n          figure\n            image \"Whoop MG Life Fitness Band\"\n          StaticText \"₹ 17,000\"\n          heading \"Whoop MG Life Fitness Band\"\n            StaticText \"Whoop MG Life Fitness Band\"\n          StaticText \"KARUKUTTY, ANGAMALY\"\n          StaticText \"YESTERDAY\"\n        button \"Favourite\" [ref=n29]\n          image\n      listitem\n        link \"₹ 30,000 WHOOP BAND MG LIFE OPEN UNIT WITH 1 YEAR SUBSCRIPTION AVAILABLE AT BES EAST STREET ROAD, PUNE 2 DAYS AGO\" href=\"https://www.olx.in/item/mobile-phones-c1453-used-other-mobiles-in-east-street-road-pune-iid-1854700643\" [ref=n30]\n          figure\n            image \"WHOOP BAND MG LIFE OPEN UNIT WITH 1 YEAR SUBSCRIPTION AVAILABLE AT BES\"\n          StaticText \"₹ 30,000\"\n          heading \"WHOOP BAND MG LIFE OPEN UNIT WITH 1 YEAR SUBSCRIPTION AVAILABLE AT BES\"\n            StaticText \"WHOOP BAND MG LIFE OPEN UNIT WITH 1 YEAR SUBSCRIPTION AVAILABLE AT BES\"\n          StaticText \"EAST STREET ROAD, PUNE\"\n          StaticText \"2 DAYS AGO\"\n        button \"Favourite\" [ref=n31]\n          image\n      listitem\n        link \"₹ 28,000 Whoop MG Life - Subscription Till 6/7/2027 ALWIN X CROSS ROADS, HYDERABAD 3 DAYS AGO\" href=\"https://www.olx.in/item/men-c1793-whoop-mg-life-subscription-till-672027-in-alwin-x-cross-roads-hyderabad-iid-1854576208\" [ref=n32]\n          figure\n            image \"Whoop MG Life - Subscription Till 6/7/2027\"\n          StaticText \"₹ 28,000\"\n          heading \"Whoop MG Life - Subscription Till 6/7/2027\"\n            StaticText \"Whoop MG Life - Subscription Till 6/7/2027\"\n          StaticText \"ALWIN X CROSS ROADS, HYDERABAD\"\n          StaticText \"3 DAYS AGO\"\n        button \"Favourite\" [ref=n33]\n          image\n      listitem\n        link \"₹ 34,999 whoop mg life KANNUR, KERALA 27 AUG\" href=\"https://www.olx.in/item/accessories-c1457-mobile-in-kannur-kerala-iid-1853882513\" [ref=n34]\n          figure\n            image \"whoop mg life\"\n          StaticText \"₹ 34,999\"\n          heading \"whoop mg life\"\n            StaticText \"whoop mg life\"\n          StaticText \"KANNUR, KERALA\"\n          StaticText \"27 AUG\"\n        button \"Favourite\" [ref=n35]\n          image\n      listitem\n        link \"₹ 40,000 Whoop MG Band New With 2 Years Subscription SECTOR 90, NOIDA 18 AUG\" href=\"https://www.olx.in/item/mobile-phones-c1453-used-iphone-in-sector-90-noida-iid-1852925926\" [ref=n36]\n          figure\n            image \"Whoop MG Band New With 2 Years Subscription\"\n          StaticText \"₹ 40,000\"\n          heading \"Whoop MG Band New With 2 Years Subscription\"\n            StaticText \"Whoop MG Band New With 2 Years Subscription\"\n          StaticText \"SECTOR 90, NOIDA\"\n          StaticText \"18 AUG\"\n        button \"Favourite\" [ref=n37]\n          image\n      listitem\n      listitem\n        link \"₹ 65,000 Selling my Whoop MG brand new item KOKAPET, HYDERABAD 13 AUG\" href=\"https://www.olx.in/item/men-c1793-selling-my-whoop-mg-brand-new-item-in-kokapet-hyderabad-iid-1852422433\" [ref=n38]\n          figure\n          StaticText \"₹ 65,000\"\n          heading \"Selling my Whoop MG brand new item\"\n            StaticText \"Selling my Whoop MG brand new item\"\n          StaticText \"KOKAPET, HYDERABAD\"\n          StaticText \"13 AUG\"\n        button \"Favourite\" [ref=n39]\n          image\n      listitem\n        link \"₹ 41,000 Whoop life mg SECTOR 56, GURGAON 16 JUL\" href=\"https://www.olx.in/item/accessories-c1457-mobile-in-sector-56-gurgaon-iid-1846007721\" [ref=n40]\n          figure\n          StaticText \"₹ 41,000\"\n          heading \"Whoop life mg\"\n            StaticText \"Whoop life mg\"\n          StaticText \"SECTOR 56, GURGAON\"\n          StaticText \"16 JUL\"\n        button \"Favourite\" [ref=n41]\n          image\n","tab_id":1}


[exit code: 0]

Structured:
```json
{"current_url":"https://www.olx.in/items/q-whoop-mg","navigated":"https://www.olx.in/items/q-whoop-mg","page":"[viewport: showing the on-screen region (~0% down a 4107px page). Scroll then read again to see other regions, or use find to jump to any element anywhere on the page.]\n\nRootWebArea \"Whoop Mg in India, Free classifieds in India | OLX\"\n  banner\n    link \"OLX India\" href=\"https://www.olx.in/\" [ref=n1]\n      image \"OLX India\"\n    image\n    textbox \"Search city, area or locality\" value=\"India\" [ref=n2]\n    button \"select-location\" [ref=n3]\n      image\n    search\n      button \"search\" [ref=n4]\n      group\n        textbox \"search-box\" [ref=n5]\n      button \"reset\" [ref=n6]\n    image\n    link \"favorite Wishlist\" href=\"https://www.olx.in/wishlist\" [ref=n7]\n      button \"favorite\" [ref=n8]\n        image\n      StaticText \"Wishlist\"\n    button \"Login\" [ref=n9]\n      image\n      StaticText \"Login\"\n    link \"SELL\" href=\"https://www.olx.in/post\" [ref=n10]\n      image\n      image\n      StaticText \"SELL\"\n  button \"open-categories-menu\" [ref=n11]\n    image\n  StaticText \"ALL CATEGORIES\"\n  link \"Cars\" href=\"https://www.olx.in/cars_c84\" [ref=n12]\n    StaticText \"Cars\"\n  link \"Motorcycles\" href=\"https://www.olx.in/motorcycles_c81\" [ref=n13]\n    StaticText \"Motorcycles\"\n  link \"Mobile Phones\" href=\"https://www.olx.in/mobile-phones_c1453\" [ref=n14]\n    StaticText \"Mobile Phones\"\n  link \"For Sale: Houses \u0026 Apartments\" href=\"https://www.olx.in/for-sale-houses-apartments_c1725\" [ref=n15]\n    StaticText \"For Sale: Houses \u0026 Apartments\"\n  link \"For Rent: Houses \u0026 Apartments\" href=\"https://www.olx.in/for-rent-houses-apartments_c1723\" [ref=n16]\n    StaticText \"For Rent: Houses \u0026 Apartments\"\n  link \"Beds-Wardrobes\" href=\"https://www.olx.in/beds-wardrobes_c1591\" [ref=n17]\n    StaticText \"Beds-Wardrobes\"\n  link \"TVs, Video - Audio\" href=\"https://www.olx.in/tvs-video-audio_c1523\" [ref=n18]\n    StaticText \"TVs, Video - Audio\"\n  StaticText \"07 Sep, 2026\"\n  main\n    list\n      listitem\n        link \"Home\" href=\"https://www.olx.in/\" [ref=n19]\n          StaticText \"Home\"\n    heading \"Whoop Mg in India\"\n      StaticText \"Whoop Mg in India\"\n    StaticText \"CATEGORIES\"\n    image\n    list\n      listitem\n        link \"All Categories\" href=\"https://www.olx.in/items/q-whoop-mg\" [ref=n20]\n          StaticText \"All Categories\"\n    StaticText \"LOCATIONS\"\n    image\n    StaticText \"Filters\"\n    StaticText \"BUDGET\"\n    image\n    StaticText \"Choose a range below\"\n    textbox \"min\" [ref=n21]\n    StaticText \"to\"\n    textbox \"max\" [ref=n22]\n    button \"Apply\" [ref=n23]\n      StaticText \"Apply\"\n    StaticText \"Showing results for \"\n    StaticText \"'\"\n    StaticText \"whoop mg\"\n    StaticText \"'\"\n    StaticText \"9\"\n    StaticText \" \"\n    StaticText \"Ads\"\n    StaticText \"SORT BY\"\n    StaticText \": Date Published\"\n    list\n      listitem\n        link \"FEATURED ₹ 18,999 NEE Whoop Life MG With 1yr subscription Qty available hundred MUMBAI CENTRAL, MUMBAI 21 AUG\" href=\"https://www.olx.in/item/accessories-c1457-mobile-in-mumbai-central-mumbai-iid-1850144148\" [ref=n24]\n          figure\n            image \"NEE Whoop Life MG With 1yr subscription Qty available hundred\"\n          StaticText \"FEATURED\"\n          StaticText \"₹ 18,999\"\n          heading \"NEE Whoop Life MG With 1yr subscription Qty available hundred\"\n            StaticText \"NEE Whoop Life MG With 1yr subscription Qty available hundred\"\n          StaticText \"MUMBAI CENTRAL, MUMBAI\"\n          StaticText \"21 AUG\"\n        button \"Favourite\" [ref=n25]\n          image\n      listitem\n        link \"₹ 38,000 TODAY Whoop 5.0 Mg Life - With 12 Months Membership. ELPHINSTONE ROAD, MUMBAI\" href=\"https://www.olx.in/item/accessories-c1457-mobile-in-elphinstone-road-mumbai-iid-1833461920\" [ref=n26]\n          figure\n            image \"Whoop 5.0 Mg Life - With 12 Months Membership.\"\n          StaticText \"₹ 38,000\"\n          StaticText \"TODAY\"\n          heading \"Whoop 5.0 Mg Life - With 12 Months Membership.\"\n            StaticText \"Whoop 5.0 Mg Life - With 12 Months Membership.\"\n          image\n          StaticText \"ELPHINSTONE ROAD, MUMBAI\"\n        button \"Favourite\" [ref=n27]\n          image\n      listitem\n        link \"₹ 17,000 Whoop MG Life Fitness Band KARUKUTTY, ANGAMALY YESTERDAY\" href=\"https://www.olx.in/item/men-c1793-whoop-mg-life-fitness-band-in-karukutty-angamaly-iid-1854850609\" [ref=n28]\n          figure\n            image \"Whoop MG Life Fitness Band\"\n          StaticText \"₹ 17,000\"\n          heading \"Whoop MG Life Fitness Band\"\n            StaticText \"Whoop MG Life Fitness Band\"\n          StaticText \"KARUKUTTY, ANGAMALY\"\n          StaticText \"YESTERDAY\"\n        button \"Favourite\" [ref=n29]\n          image\n      listitem\n        link \"₹ 30,000 WHOOP BAND MG LIFE OPEN UNIT WITH 1 YEAR SUBSCRIPTION AVAILABLE AT BES EAST STREET ROAD, PUNE 2 DAYS AGO\" href=\"https://www.olx.in/item/mobile-phones-c1453-used-other-mobiles-in-east-street-road-pune-iid-1854700643\" [ref=n30]\n          figure\n            image \"WHOOP BAND MG LIFE OPEN UNIT WITH 1 YEAR SUBSCRIPTION AVAILABLE AT BES\"\n          StaticText \"₹ 30,000\"\n          heading \"WHOOP BAND MG LIFE OPEN UNIT WITH 1 YEAR SUBSCRIPTION AVAILABLE AT BES\"\n            StaticText \"WHOOP BAND MG LIFE OPEN UNIT WITH 1 YEAR SUBSCRIPTION AVAILABLE AT BES\"\n          StaticText \"EAST STREET ROAD, PUNE\"\n          StaticText \"2 DAYS AGO\"\n        button \"Favourite\" [ref=n31]\n          image\n      listitem\n        link \"₹ 28,000 Whoop MG Life - Subscription Till 6/7/2027 ALWIN X CROSS ROADS, HYDERABAD 3 DAYS AGO\" href=\"https://www.olx.in/item/men-c1793-whoop-mg-life-subscription-till-672027-in-alwin-x-cross-roads-hyderabad-iid-1854576208\" [ref=n32]\n          figure\n            image \"Whoop MG Life - Subscription Till 6/7/2027\"\n          StaticText \"₹ 28,000\"\n          heading \"Whoop MG Life - Subscription Till 6/7/2027\"\n            StaticText \"Whoop MG Life - Subscription Till 6/7/2027\"\n          StaticText \"ALWIN X CROSS ROADS, HYDERABAD\"\n          StaticText \"3 DAYS AGO\"\n        button \"Favourite\" [ref=n33]\n          image\n      listitem\n        link \"₹ 34,999 whoop mg life KANNUR, KERALA 27 AUG\" href=\"https://www.olx.in/item/accessories-c1457-mobile-in-kannur-kerala-iid-1853882513\" [ref=n34]\n          figure\n            image \"whoop mg life\"\n          StaticText \"₹ 34,999\"\n          heading \"whoop mg life\"\n            StaticText \"whoop mg life\"\n          StaticText \"KANNUR, KERALA\"\n          StaticText \"27 AUG\"\n        button \"Favourite\" [ref=n35]\n          image\n      listitem\n        link \"₹ 40,000 Whoop MG Band New With 2 Years Subscription SECTOR 90, NOIDA 18 AUG\" href=\"https://www.olx.in/item/mobile-phones-c1453-used-iphone-in-sector-90-noida-iid-1852925926\" [ref=n36]\n          figure\n            image \"Whoop MG Band New With 2 Years Subscription\"\n          StaticText \"₹ 40,000\"\n          heading \"Whoop MG Band New With 2 Years Subscription\"\n            StaticText \"Whoop MG Band New With 2 Years Subscription\"\n          StaticText \"SECTOR 90, NOIDA\"\n          StaticText \"18 AUG\"\n        button \"Favourite\" [ref=n37]\n          image\n      listitem\n      listitem\n        link \"₹ 65,000 Selling my Whoop MG brand new item KOKAPET, HYDERABAD 13 AUG\" href=\"https://www.olx.in/item/men-c1793-selling-my-whoop-mg-brand-new-item-in-kokapet-hyderabad-iid-1852422433\" [ref=n38]\n          figure\n          StaticText \"₹ 65,000\"\n          heading \"Selling my Whoop MG brand new item\"\n            StaticText \"Selling my Whoop MG brand new item\"\n          StaticText \"KOKAPET, HYDERABAD\"\n          StaticText \"13 AUG\"\n        button \"Favourite\" [ref=n39]\n          image\n      listitem\n        link \"₹ 41,000 Whoop life mg SECTOR 56, GURGAON 16 JUL\" href=\"https://www.olx.in/item/accessories-c1457-mobile-in-sector-56-gurgaon-iid-1846007721\" [ref=n40]\n          figure\n          StaticText \"₹ 41,000\"\n          heading \"Whoop life mg\"\n            StaticText \"Whoop life mg\"\n          StaticText \"SECTOR 56, GURGAON\"\n          StaticText \"16 JUL\"\n        button \"Favourite\" [ref=n41]\n          image\n","tab_id":1}
```