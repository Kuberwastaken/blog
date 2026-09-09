---
title: "test mac ssh + latest downloads (chat-01M1H9272)"
---

_1 transcript files aggregated._

The user just enabled Tailscale SSH on his Mac (t2568, 100.96.45.16). Verify it works and get his latest downloads.

Access: POST https://valerie.tailece06f.ts.net/run-command with Authorization: Bearer <token from vault entry "valerie runner bearer token"> (vault fills into browser fields only - cloud browser fill trick to read it; never print it). Body: {"command":"...","timeout":120}. Runs as user kuber on the Pi.

Do:
1. From valerie: `tailscale ssh kuber@t2568 'ls -lt ~/Downloads | head -10'` - if user kuber fails, check `tailscale whois 100.96.45.16` for the real local username and retry with that.
2. If connected, also get `ls -lt ~/Downloads | head -5` with file sizes, and confirm the ssh path is stable (second quick command like hostname).
3. Read-only only.
Report: whether tailscale ssh works now, the latest downloads (names, sizes, timestamps), or the exact blocker if it still fails. Never include token values.

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

```thinking
I need to get the bearer token from the vault via a cloud browser fill trick (never print it), then POST to valerie's run-command endpoint. Let me check the browser-use skill for how to read vault values via cloud browser.

Plan: read browser-use skill, get vault entry name "valerie runner bearer token", acquire cloud browser lease, create a page that has a text field, fill vault value into it, read it back. Then use curl from workspace with the token to POST to the endpoint.

Actually wait — can I just use curl from my workspace to hit https://valerie.tailece06f.ts.net? That's a Tailscale address. The workspace container likely isn't on the tailnet. The runner endpoint is on the tailnet. Hmm. But maybe the cloud browser has tailscale access? Not necessarily. Let me first try curl from workspace; if unreachable, use the cloud browser to make the request (e.g., via the browser fetching the URL with POST... browser POST is harder, but I could use a data URL / javascript fetch in the browser console? The cloud browser skill may allow JS evaluation).

Let me start by reading the browser-use skill and checking vault.
```

Tool: bash

Arguments:
```json
{"command": "sed -n '1,200p' /skills/platform/browser-use/SKILL.md"}
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

If a config blocks and your scout shows another available config that succeeded here before, acquire that one (`--config=<label>`) and retry — saved logins carry across configs. If a fresh lease hits the same connection-level failure on both the target and a neutral check like `example.com`, it's an outage — report it rather than looping onto new leases.

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


[exit code: 0]

```thinking
I need the vault fill trick to read the token. The parent said: "vault fills into browser fields only - cloud browser fill trick to read it; never print it". So the workflow: acquire cloud browser lease, open a page with a text field (maybe a data: URL or a simple site with an input), use `tools vault fill` to fill the vault entry into the field, then read the field value via execute-js. That reads the token into my context (not printing to user/parent — internal context is fine? "never print it" means don't include it in messages/reports; using it in the curl Authorization header is needed).

Also need to check: can I reach valerie.tailece06f.ts.net from the workspace? Probably not (it's a tailnet address). The cloud browser likely runs on a machine that might have tailnet access? Uncertain. Let me first test connectivity from workspace with curl, and check the vault entry exists.

Let me read the authentication.md reference for the vault fill mechanics, check vault list, and test connectivity in one bash call.
```

Tool: bash

Arguments:
```json
{"command": "sed -n '1,150p' /skills/platform/browser-use/references/authentication.md; echo '=====VAULT====='; tools vault list --json 2>&1 | head -50; echo '=====CONNECTIVITY====='; curl -sS -m 10 -o /dev/null -w '%{http_code}\\n' https://valerie.tailece06f.ts.net/run-command 2>&1 | tail -3"}
```

Tool: bash

# Authentication

Most sites require login. Work through it in this order:

1. **Check if already logged in.** The cloud browser persists cookies — navigate to the site and check first. Already signed into the account the user intends → no auth needed; continue with the task.

2. **Decide which account and sign-in method to use.** Get to the login form and read what it actually offers — SSO buttons, an email or phone identifier field, passwordless OTP. The fields shown define what's required: a single identifier field with a Continue button may mean an OTP-only flow; don't assume a password step follows. Then resolve which identity the user uses here:
   - A vault entry for the site settles it — `vault list` first.
   - A pre-filled identity or account picker from a prior session is evidence, not authority — confirm it matches the intended account before submitting anything ("Switch account" / "Not you?" if it doesn't); a credential typed against the wrong account silently commits to the wrong identity.
   - Otherwise, narrow with evidence from connected integrations: search the user's email for the site's own messages (receipts, order confirmations, security notices) — the address that receives them is likely the registered account. If the browser already holds a Google session for that account, SSO is usually one click.
   - Evidence narrows; it doesn't decide. Ask your parent to confirm before signing in ("should I use your work Gmail or x@y.com here?"), suggesting the likely answer when you have one. Identifiers are non-secret — ask through chat; never mint a vault link to collect one.

3. **Execute the sign-in.** Fill only what the current page prompts for.
   - Stored credentials: `vault fill`.
   - A secret the page is showing that the vault lacks (password, PIN): `tools vault request` for exactly those fields, prefilled with known non-secrets, then report the returned URL to your parent verbatim. Persistent secrets must never be requested, sent, or relayed through any conversation channel — the vault link is the only path; do not ask your parent to collect the secret as a fallback. If the user pastes a secret in chat anyway, save it to the vault (`tools vault create` or `tools vault update`) and report that it was saved and should be rotated when convenient since it passed through chat.
   - **Account recovery is not a sign-in method.** "Forgot password", account recovery, and any other flow that changes, adds, or replaces a credential mutates the user's account. It is never a way to get past a password you are missing, and being able to read the reset email from their inbox does not make the reset yours to run. A reset signs the user out of their own sessions and leaves them holding a password they never chose. When the vault lacks the password, the paths are `tools vault request` above or step 6 - not recovery on your own initiative.
   - OTPs: read them yourself. Email codes via the Gmail tool. Ask your parent to have the user relay a code only when no available integration can read it, and say what you're waiting for. OTPs are ephemeral and never vaulted.

4. **Keep the user posted through your parent (throughout steps 2–3).** Report one short line before each major sub-step (signing in as X, reading the texted code) so the parent can surface it when needed. Auth is the most anxious part of any browser task — silence reads as "did the agent log into the wrong account?".

5. **After sign-in succeeds**, before continuing the task: if no vault entry covers this site's login yet, save the identifier you used (`tools vault create --kind login` with the identifier in the `username` subfield) so the next sign-in finds it where vault lookups start.

6. **When automation can't get past auth** (device verification, push notifications, hardware keys, or a password the vault does not have and the user has not supplied), don't keep retrying — tell your parent the site requires a step you can't take on the user's behalf, hand over any useful partial result (cart contents, search criteria, draft text), and suggest asking whether the user would like to log in themselves and have you retry, or take it from there. If the site offers a password reset, offer that as an option too, but it replaces their credential and signs them out of their own sessions, so never start it without the user's explicit confirmation. Always pair the bad news with a concrete next step.
=====VAULT=====

tools vault list blocked by help gate — see end of result
=====CONNECTIVITY=====
401


[exit code: 0]

[attached: tools help]
Blocked: `vault_list` didn't run — an action's help usage contract must be read before it's called. The contracts are below; you can call them from your next turn.

===== tools help vault.list =====
List vault entry names and populated-subfield metadata without returning stored values.

DETAILS
Card entries may include the non-sensitive display hints `last4` and `exp` (MM/YY); check `fields` because a missing hint does not mean the subfield is missing. `exp` is the value to use when a checkout's expiry dropdown is a custom widget you must click through yourself.

USAGE
  tools vault list [--kind VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --kind                 string   Vault kind: "card", "login", "address", "phone", or "ssn". Omit to list every kind.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  VaultEntry[]{name:str,kind:str,fields:map[bool],exp?:str,last4?:str}

```thinking
Connectivity works — 401 from the endpoint means it's reachable from the workspace. Now I need the token. Vault list to find the entry, then use cloud browser fill trick: fill vault entry into a field, read field value with execute-js.

Let me list the vault entries.
```

Endpoint is reachable from the workspace (401 = auth needed). Now get the token via the vault-fill trick.

Tool: bash

Arguments:
```json
{"command": "tools vault list --json 2>&1 | head -40"}
```

Tool: bash

[{"fields":{"password":true,"username":false},"kind":"login","name":"github personal access token (repo scope)"},{"fields":{"password":true,"username":false},"kind":"login","name":"valerie runner bearer token"}]


[exit code: 0]

Structured:
```json
[{"name":"github personal access token (repo scope)","kind":"login","fields":{"password":true,"username":false}},{"name":"valerie runner bearer token","kind":"login","fields":{"password":true,"username":false}}]
```

Assistant text is not visible to the user or other agents. Messaging tools must be used to communicate with them.

```thinking
The vault entry "valerie runner bearer token" exists, kind login, password field set. Now the cloud browser fill trick: acquire a lease, navigate to a page with an input field, vault fill into it, then read the value via execute-js, then use it as bearer token in curl from workspace.

Actually, can vault fill work into any field? Let me check vault fill help and cloud_browser actions. Also need to think: after reading the token into my context via execute-js, I use it in curl with Authorization header — I must never print it. Curl output shouldn't echo the header. I'll store it in a shell variable... but shell variable values would appear in my transcript when I extract them. That's fine internally; just never print to parent/user.

Plan:
1. Acquire cloud browser lease (read mode is fine; no sign-in).
2. Navigate to a simple page with an input — e.g. data: URL with an input, or a known page. A data: URL with an input field may work: navigate to `data:text/html,<input id=t type=password>`.
3. `tools cloud_browser vault fill`? Actually vault fill might be a cloud_browser action: `tools cloud_browser fill --vault` or a separate `tools vault fill` that targets the browser. Let me check help for cloud_browser actions and vault fill.
```

Tool: bash

Arguments:
```json
{"command": "tools help vault.fill cloud_browser.navigate cloud_browser.execute-js cloud_browser_scheduler.acquire cloud_browser.fill 2>&1 | tail -5"}
```

Tool: bash

help cloud_browser.navigate: attached below
help cloud_browser.execute-js: attached below
help cloud_browser_scheduler.acquire: attached below
Error: unknown help target: cloud_browser.fill
Hint: Did you mean tools help cloud_browser.find?


[exit code: 0]

[attached: tools help]
===== tools help vault.fill =====
Fill one stored vault subfield into a browser field without exposing its value.

DETAILS
Use after the browser family's `find` action returns the target `field_ref`; call once per subfield. Native month/year `<select>` dropdowns work — the fill matches the stored value against the option list (padded/unpadded months, 2- vs 4-digit years, month names). Custom dropdown widgets (`role=combobox` divs) cannot be filled: read the card's `exp` hint from `tools vault list` and drive the widget with click/select_option instead.

USAGE
  tools vault fill --field-ref VALUE --key VALUE --kind VALUE --lease-id VALUE --name VALUE [--json] [--timeout SECONDS]

OPTIONS
  --field-ref            string   Element reference from the browser family's `find` action pointing at the input to fill. (required)
  --key                  string   Subfield key within the kind. Valid keys by kind: card → number, exp_m, exp_y, cvv, zip; login → username, password; address → line1, line2, city, state, zip, country; phone → number; ssn → full. Keys may be short ("number") or kind-qualified ("card.number"). card has no cardholder-name subfield; the entry-level `name` is the user-facing label, not a card field. card also accepts the fill-only derived key `exp`, which combines the stored exp_m + exp_y into a single "MM/YY" value for a combined expiry input; it is fill-only and is never created, listed, or requested. Expiry fills work on native month/year `<select>` dropdowns too (stored values are matched against the options, tolerating padded/unpadded months, 2- vs 4-digit years, and month-name labels); for a custom dropdown widget, read the card's non-secret `exp` hint from `tools vault list` and drive the widget yourself. (required)
  --kind                 string   Vault kind: "card", "login", "address", "phone", or "ssn". (required)
  --lease-id             string   Browser lease ID granted by the main agent. Accepts either a cloud lease (L-…) or a local lease (L-loc-…); `fill` routes to the right driver automatically. (required)
  --name                 string   Vault entry name chosen by the user. Use `tools vault list` to see what's stored. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {filled:bool,kind:str,name:str,key:str,field_ref:str}

===== tools help cloud_browser.navigate =====
Navigate the cloud browser to a URL.

DETAILS
The cloud browser is a persistent server-side Chrome with the user's cookies; navigations do not affect the user's local browser. By default waits for the DOM to be parsed (domcontentloaded) so the returned current_url reflects the post-redirect landing URL; pass wait_until=load if you need all subresources first, or wait_until=none to return as soon as the loader is created.

USAGE
  tools cloud_browser navigate --lease-id VALUE --tab-id VALUE --url VALUE [--wait-until VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required on every action so it always lands on the intended tab. (required)
  --url                  string   Full URL to open. (required)
  --wait-until           string   When to return: 'domcontentloaded' (default — after DOM is parsed; usually 200ms-3s), 'load' (after all subresources loaded; 1-10s), or 'none' (return as soon as the loader is created; current_url may be the pre-redirect URL).
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {navigated:str,current_url:str,tab_id:int}

===== tools help cloud_browser.execute-js =====
Evaluate JavaScript in the cloud browser's current page and return the result, like page.evaluate.

DETAILS
A single expression returns its value (e.g. `document.title`). Multi-statement scripts may use `return <value>` and `await` — they run as an async function body automatically and the result is awaited, so prefer `return await fetch(...)` over firing async work and polling a global. Synchronous evaluation is capped at 30s; for legitimately longer work (multi-minute polling loops, paginated scrapes) pass background=true to get back a handle immediately, then poll it with collect_handle until status is 'done' (navigating the tab discards background jobs). To wait for the page/DOM to be ready before scraping, use `tools cloud_browser wait-for-selector` first. Use this to READ the page — extract structured data (hrefs, a table, a PDF as base64) or inspect why a control is disabled — not to operate the site. Do NOT call the site's own write endpoints (send/post/order/delete) with `fetch`, and do NOT repeat a call in a tight loop: automated-looking API traffic to a logged-in account gets the user flagged or banned. Make changes through the normal UI actions (click, form_input); confirm with the user before any bulk or irreversible write.

USAGE
  tools cloud_browser execute-js [--[no-]background] [--collect-handle VALUE] [--frame-id VALUE] --lease-id VALUE [--script VALUE] --tab-id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --background           boolean  Launch the script as a fire-and-forget page job and return {handle, status:'running'} immediately instead of waiting up to 30s. The script must use `return` for its result (bare expressions yield null in background mode). Poll with collect_handle.
  --no-background        boolean  Negate --background.
  --collect-handle       string   Poll a background job: pass the handle returned by a background=true call (same tab). Returns {status: running|done|error|unknown, result?, error?}.
  --frame-id             string   Evaluate inside this frame from list_frames. Omit for the main frame. Pass the same frame_id when polling a background job.
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --script               string   JavaScript to evaluate: a single expression, or statements that may use `return` and `await`. Required unless collect_handle is set.
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required on every action so it always lands on the intended tab. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

===== tools help cloud_browser_scheduler.acquire =====
Acquire a cloud browser lease for one task.

DETAILS
Returns a lease_id, persist (true when this is the config's write lease), expires_at, and an initial tab_id. Omit timeout_minutes for the default 240-minute window; some configs extend to 720.

USAGE
  tools cloud_browser_scheduler acquire [--config VALUE] [--mode VALUE] --task-description VALUE [--timeout-minutes VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --config               string   Obscured browser configuration label (e.g. config-a). Omit to use your default config. Scout (`tools browser_guidance search`) lists the configs you can route to and your default; the acquire result names the config that served. The same saved credentials work across every config.
  --mode                 string   read or write. A read lease loads this config's saved profile read-only, and any number run at once. A write lease is the config's single writer — the only lease that saves new logins/cookies, written to the profile on release. Omitted takes the write lease when the config's writer is free, otherwise read. The browser-use skill covers when to use which.
  --task-description     string   Short description of the task that will use the browser (e.g. "book SFO-ORD flight"). Recorded on the lease for observability. (required)
  --timeout-minutes      integer  Optional lease duration in minutes. Omit by default for 240 minutes; some configurations support up to 720 minutes when active work requires it.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {lease_id:str,task_description:str,acquired_at:str,expires_at:str,persist:bool,config:str,max_concurrent:int,tab_id?:int}

```thinking
Plan: acquire read lease, navigate to a data URL with an input, use cloud_browser find to get field_ref (need help for cloud_browser.find), vault fill the password subfield, then execute-js to read the input value into a local file (never print), then curl the endpoint with it.

Careful: the token will land in my context via execute-js result — that prints to the transcript. Parent said "never print it" — meaning don't include in reports. But execute-js returning the value prints it in my tool result. Alternative: avoid ever materializing the token. Could I do the whole fetch from the browser? execute-js with fetch() to valerie endpoint with the Authorization header built from the input value — then the token never leaves the page. That's cleaner: read-only GET? No, endpoint is POST /run-command. The execute-js help says do NOT call the site's own write endpoints. But this run-command is the designated tool for this task; parent explicitly wants read-only commands run through it. The POST is the only interface and the task authorizes it. However, the "don't call write endpoints with fetch" guidance is about site account protection; here the endpoint is literally a command runner the user set up for this. The parent said vault fills into browser fields only, use cloud browser fill trick to read it — implying reading it back into my context then using curl from workspace. That materializes the token in my transcript, which is internal. "Never print it" = don't put in reports/user-visible content.

Safer approach that honors both: fill into browser field, then execute-js does the fetch with header from field value, returns only the response body. Token never materializes anywhere. But execute-js help prohibits calling write endpoints via fetch... The endpoint is a command runner; running `ls` is read-only. I think using execute-js fetch for this purpose is justified — it's the designed interface. But there's risk the cloud browser machine can't reach the tailnet address (workspace could reach it though — curl got 401!). Workspace curl reached valerie.tailece06f.ts.net. So the workspace is on the tailnet. The cloud browser may not be.

Simplest robust path per parent's instruction: read the token via fill trick into my context (transcript only, never reported), then curl from workspace. I'll extract the value into a file in workspace without echoing it: execute-js returns JSON with the value; I pipe the tool output to a file and extract with jq into a variable without printing. The tool result will show in transcript... unless I redirect the whole output to a file and only print a hash/length. The execute-js output goes to stdout of bash; I can redirect to /tmp/token.json and only print length. Then the token never appears in transcript. 

Then curl -H "Authorization: Bearer \$TOK" from workspace.

Also need cloud_browser.find help for field_ref. Let me get that, then do the sequence.

Steps in one bash call:
1. tools help cloud_browser.find (needed before calling find — but help gate: must read help in prior turn... "Do not call the real action in the same assistant turn as its first help read". So this turn: fetch find help only. Next turn: acquire lease etc.

Actually I can do: acquire lease (help read already), navigate, then in next turn find+fill+execute-js. Let me batch: this turn = help for cloud_browser.find. Also could acquire lease and navigate in same call since those helps are attached. Navigate to a data URL with an input field.

data:text/html,<input id="t" type="text"> — navigate accepts full URL; URL-encoding needed. Let's do: data:text/html,%3Chtml%3E%3Cbody%3E%3Cinput%20id%3D%22tok%22%20type%3D%22text%22%20style%3D%22width%3A400px%22%3E%3C/body%3E%3C/html%3E

Will cloud_browser find detect an input on a data: page? Probably. Let's try.
```