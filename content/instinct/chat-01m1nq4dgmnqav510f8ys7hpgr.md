---
title: "reddit kuberwt presence (chat-01M1NQ4DG)"
---

_1 transcript files aggregated._

Standing task: create and run the Reddit account u/kuberwt for Kuber.

SETUP (do first):
1. Mint a vault request for the Reddit password (login kind, name "Reddit kuberwt", username prefilled kuberwt, field password) and message me the link URL immediately - he is waiting to fill it.
2. Once filled: create the Reddit account u/kuberwt with email vertigoruntime@gmail.com (verification code readable via the vertigo gmail integration, gmailacct-01M1HMHBCYFJGFQ5MFX1HRKDAY). Use the browser-use skill. If kuberwt is taken, report alternatives to me before picking.
3. Join relevant subreddits: r/LocalLLaMA, r/artificial, r/MachineLearning, r/programming, r/technology, r/singularity, r/ChatGPT, r/OpenAI, r/ClaudeAI, r/webdev, r/SideProject - tune to his world (AI builder, student, OSS).

WARM-UP LAW (critical): Reddit nukes fresh accounts fast, and he has a 7-year-old ban flag on his own systems - this account must look and be organic. First 2 weeks: browse, join, upvote only. No links, no comments, no posts. After warm-up, light genuine commenting is fine.

ONGOING: organic sessions every ~2 days per your schedule. When the parent relays a post/comment request from him, execute it exactly as given and report the permalink. Never post or comment anything he did not explicitly send.

Report when the account is created and verified, with the profile URL.

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
This is a standing task to create a Reddit account. First step: mint a vault request for the Reddit password and send the link to parent immediately. I need vault request help first.
```

Tool: bash

Arguments:
```json
{"command": "tools help vault.request"}
```

Tool: bash

help vault.request: attached below


[exit code: 0]

[attached: tools help]
===== tools help vault.request =====
Return a one-time URL the user can open to fill only the vault subfields you request. Use when `tools vault list` shows the user is missing a SECRET you need (password, card number, PIN), or when `tools vault fill` reports a secret subfield isn't populated. Do not mint a link just to collect a non-secret identifier (username, email, phone) — ask for that in chat. Pass the returned `url` up to the main agent verbatim — do not rewrite the domain, path, or query params, and do not add fields of your own. Any URL you synthesize yourself will 404 the user. Pass `fields` to scope the page to exactly the subfields needed (e.g. ["password"] or ["number", "exp_m", "exp_y", "cvv", "zip"]). If omitted, the server chooses the default fields for that kind. Pass the `prefill` field to seed non-secret subfields (e.g. a known username) into the form; secret subfields (passwords, CVVs, SSN digits) are ignored because those must be typed by the user directly. After the user submits, the main agent receives a completion wake.

Links are single-use and valid for 7 days. If the user reports the link doesn't work, call this action again to mint a fresh one — the previous link may have been used or expired.

USAGE
  tools vault request [--field-formats VALUE] [--fields VALUE] --kind VALUE --name VALUE [--prefill VALUE] --return-channel VALUE [--json] [--timeout SECONDS]

OPTIONS
  --field-formats        json     Optional map of non-secret subfield → value shape the landing page validates before submit. Supported shapes: "email" and "phone" (e.g. {"username": "phone"}). Secret subfields are silently ignored.
  --fields               string[] Optional subfield keys to request. Valid subfields by kind: card → number, exp_m, exp_y, cvv, zip; login → username, password; address → line1, line2, city, state, zip, country; phone → number; ssn → full. Keys may be short ("password") or kind-qualified ("login.password"). On `login`, request only the subfields you actually need — `username` is optional; you can request just `["password"]`. Submissions merge into the existing entry, so fields can be requested incrementally. Omit `fields` entirely only when the user should fill the standard fields for this kind. card has no cardholder-name subfield; the entry-level `name` is the user-facing label, not a card field.
  --kind                 string   Vault kind the user should add: "card", "login", "address", "phone", or "ssn". (required)
  --name                 string   User-friendly entry label the agent will use later with `tools vault fill` (e.g. "Amex", "Chase login"). (required)
  --prefill              json     Optional map of non-secret subfield → value to seed into the vault form (e.g. {"username": "alice@example.com"} for kind=login). Secret subfields are silently dropped. Keys may be short ("username") or kind-qualified ("login.username"); the server normalizes.
  --return-channel       string   Where the landing page returns the user when they finish: the channel you are delivering this link on (usually the one the user asked from, e.g. imessage for texting on the Instinct number, desktop for the Instinct app chat). Use none only when no conversational return applies (e.g. voice). Values: desktop, mobile, imessage, slack, whatsapp, email, none. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {url:str,kind:str,name:str,fields:str[],field_formats?:map[str]}

```thinking
Check if vault entry already exists first? Parent said mint immediately. But checking vault list is cheap and could avoid a duplicate. Parent explicitly said mint and message immediately — he's waiting. I'll just mint. Return channel: user talks via WhatsApp. Use whatsapp.
```

Tool: bash

Arguments:
```json
{"command": "tools vault request --kind login --name \"Reddit kuberwt\" --fields '[\"password\"]' --prefill '{\"username\":\"kuberwt\"}' --return-channel whatsapp --json"}
```

Tool: bash

{"fields":["username","password"],"kind":"login","name":"Reddit kuberwt","url":"https://app.instinct.com/vault/fill?t=M7C7SBONGOW5VQESWASQXSYCAPIMFO3H&src=whatsapp"}


[exit code: 0]

Structured:
```json
{"fields":["username","password"],"kind":"login","name":"Reddit kuberwt","url":"https://app.instinct.com/vault/fill?t=M7C7SBONGOW5VQESWASQXSYCAPIMFO3H\u0026src=whatsapp"}
```

Tool: bash

Arguments:
```json
{"command": "tools agent_message send --to agent-01M1GHFRMBD77X6YGF9XFS6QB4 --message-stdin <<'EOF'\nVault link for the Reddit kuberwt password (username prefilled kuberwt, only asks for password):\n\nhttps://app.instinct.com/vault/fill?t=M7C7SBONGOW5VQESWASQXSYCAPIMFO3H&src=whatsapp\n\nSingle-use, valid 7 days. Once he submits I'll get the completion wake and proceed with account creation (email vertigoruntime@gmail.com, verification code via the vertigo Gmail account), then join the subreddit set and start warm-up browsing.\nEOF"}
```

Tool: bash

Message queued for agent-01M1GHFRMBD77X6YGF9XFS6QB4.


[exit code: 0]

Structured:
```json
{"status":"queued","recipient_agent_id":"agent-01M1GHFRMBD77X6YGF9XFS6QB4","agent_message_id":"agentmsg-01M1NQ4M10BQJT9QPAN0S50XVD","wake_created_event_id":"01M1NQ4M5MPCBWY34WVM7A84AR"}
```

```thinking
Done with step 1. Now I wait for the vault completion wake. But I could do prep work: read the browser-use skill so I'm ready when the password lands. That's useful work for this turn.
```

Vault link sent to parent. While waiting for the password, I'll prep by reading the browser-use skill so account creation goes smoothly.

Tool: bash

Arguments:
```json
{"command": "sed -n '1,250p' /skills/platform/browser-use/SKILL.md"}
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

Assistant text is not visible to the user or other agents. Messaging tools must be used to communicate with them.

```thinking
That internal message is just a reminder. I've already sent the vault link to the parent. Next step: wait for the vault completion wake. Should I scout reddit guidance now? Yes, useful prep. Then hold.
```

Tool: bash

Arguments:
```json
{"command": "tools help browser_guidance.search && tools browser_guidance search --query 'Reddit create account signup' 2>&1 | head -60"}
```

Tool: bash

help browser_guidance.search: attached below

tools browser_guidance search blocked by help gate — see end of result


[exit code: 0]

[attached: tools help]
Blocked: `search_browser_guidance` didn't run — an action's help usage contract must be read before it's called. The contracts are below; you can call them from your next turn.

===== tools help browser_guidance.search =====
Search internal browser guidance and your own prior per-config outcomes before choosing a website or navigating. Query with the intended task, optionally including a site name. Results contain agent-safe website, flow, and instructions plus, per config you can route to, how that config last performed for you (config-a: success, config-b: blocked). Run this before acquiring a browser (no lease needed); results are config-agnostic, so there is nothing lease-specific to pass. No results is expected for most sites and means there is no known guidance.

Examples:
- tools browser_guidance search --query 'Resy book a table'
- tools browser_guidance search --query 'Amazon order history' --limit 5

USAGE
  tools browser_guidance search [--limit VALUE] --query VALUE [--json] [--timeout SECONDS]

OPTIONS
  --limit                integer  Maximum results. 1-10, default 3.
  --query                string   Natural-language website and task query, for example 'Expedia book a flight' or 'find restaurant reservations'. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {results:Result[],available_configs:str[],default_config:str}
  results[]:Result{website:str,flow:str,instructions:str,attempt_count?:int,blocked_count?:int,config?:str,last_attempt_at?:str,outcome?:str,outcome_note?:str,success_count?:int}

Tool: bash

Arguments:
```json
{"command": "tools browser_guidance search --query 'Reddit create account signup' --limit 5 --json"}
```

Tool: bash

{"available_configs":["config-a"],"default_config":"config-a","results":[{"attempt_count":1,"config":"config-a","flow":"Post or engage with content on X","instructions":"","last_attempt_at":"2026-09-02T19:01:49Z","outcome":"success","outcome_note":"follows, likes, and first post all worked from saved login. composer keystrokes input truncates ~120 chars/30s - chunk it. new account hit graduated-access interstitial after first post, informational only.","success_count":1,"website":"x.com"},{"attempt_count":1,"config":"config-a","flow":"Log in to Hacker News and stage a submission","instructions":"","last_attempt_at":"2026-09-03T10:41:00Z","outcome":"success","outcome_note":"Vault login fill + click works; session verified as kuberwastaken; /submit staging clean, no submit pressed. Refs rotate after page reload - re-read before filling.","success_count":1,"website":"news.ycombinator.com"},{"flow":"Engage with LinkedIn posts","instructions":"Try normally in an authenticated session. Likes and connection actions are generally reachable; verify the final state and avoid duplicate retries.","website":"linkedin.com"},{"attempt_count":6,"blocked_count":2,"config":"config-a","flow":"Modify a GitHub repository through GitHub","instructions":"","last_attempt_at":"2026-09-04T06:54:26Z","outcome":"success","outcome_note":"github.com web session is signed OUT; commit works via api.github.com fetch in the signed-out browser using vault PAT (fill into injected password input, use as Bearer in-page, never exposed)","success_count":4,"website":"github.com"},{"flow":"Reserve a restaurant table with OpenTable","instructions":"Try normally. SMS or email verification may require the user, but that is not a site-access failure.","website":"opentable.com"}]}


[exit code: 0]

Structured:
```json
{"results":[{"website":"x.com","flow":"Post or engage with content on X","instructions":"","config":"config-a","outcome":"success","outcome_note":"follows, likes, and first post all worked from saved login. composer keystrokes input truncates ~120 chars/30s - chunk it. new account hit graduated-access interstitial after first post, informational only.","last_attempt_at":"2026-09-02T19:01:49Z","attempt_count":1,"success_count":1},{"website":"news.ycombinator.com","flow":"Log in to Hacker News and stage a submission","instructions":"","config":"config-a","outcome":"success","outcome_note":"Vault login fill + click works; session verified as kuberwastaken; /submit staging clean, no submit pressed. Refs rotate after page reload - re-read before filling.","last_attempt_at":"2026-09-03T10:41:00Z","attempt_count":1,"success_count":1},{"website":"linkedin.com","flow":"Engage with LinkedIn posts","instructions":"Try normally in an authenticated session. Likes and connection actions are generally reachable; verify the final state and avoid duplicate retries."},{"website":"github.com","flow":"Modify a GitHub repository through GitHub","instructions":"","config":"config-a","outcome":"success","outcome_note":"github.com web session is signed OUT; commit works via api.github.com fetch in the signed-out browser using vault PAT (fill into injected password input, use as Bearer in-page, never exposed)","last_attempt_at":"2026-09-04T06:54:26Z","attempt_count":6,"success_count":4,"blocked_count":2},{"website":"opentable.com","flow":"Reserve a restaurant table with OpenTable","instructions":"Try normally. SMS or email verification may require the user, but that is not a site-access failure."}],"available_configs":["config-a"],"default_config":"config-a"}
```

```thinking
No Reddit-specific guidance; default config-a. Nothing else to do until the vault completion wake arrives. Hold.
```

Prep done: no Reddit-specific guidance on file, default config-a is the route. The vault link is with the parent; account creation starts when the password lands via the completion wake. Nothing further to do this turn.

Tool: hold

Arguments:
```json
{}
```

Subreddit scope from the user: tech-AI niches as listed, PLUS watches - add r/Watches and adjacent horology subs (r/Watchexchange browse-only is fine, r/WatchHorology, r/microbrandwatches - your judgment).

```thinking
New info: add watch subs to the join list. Still waiting on the vault password. Nothing else actionable. I should just acknowledge internally — no need to message parent (it's their message to me; a reply isn't needed). Actually a brief ack isn't required; do not message parent when there's nothing to report. Hold.
```

Noted: r/Watches plus adjacent horology subs added to the join list alongside the tech-AI set. Still waiting on the vault password completion wake before account creation can start.

Tool: hold

Arguments:
```json
{}
```

Password is in the vault (login "Reddit kuberwt"). Proceed with account creation now - he acknowledges the datacenter-IP risk and wants to try anyway. Report the profile URL once created + verified.

```thinking
Time to create the Reddit account. Steps:
1. Acquire write browser lease (we're signing up / will want login saved).
2. Navigate to reddit.com/register or reddit.com and sign up with email vertigoruntime@gmail.com, username kuberwt, password from vault (tools vault fill).
3. Verification code via vertigo gmail integration (gmailacct-01M1HMHBCYFJGFQ5MFX1HRKDAY).

I need help for: cloud_browser_scheduler.acquire, cloud_browser actions, vault.fill, and gmail search for the vertigo account. Let me fetch help first.

Also read authentication.md reference? Vault fill mechanics are in there, but I can fetch cloud_browser help and vault.fill help which likely suffices. Let me batch: tools help cloud_browser_scheduler.acquire cloud_browser.all vault.fill — cloud_browser.all might be large but it's the action set, useful. Also gmail search help for reading the verification code: the gmail integration account is specified; need tools help gmail.search maybe. Let me get those.
```

Tool: bash

Arguments:
```json
{"command": "tools help cloud_browser_scheduler.acquire cloud_browser.all vault.fill gmail.search 2>&1 | tail -5"}
```

Tool: bash

help cloud_browser.set-viewport: not attached (too many pages in one call; request specific actions)
help cloud_browser.upload-file: not attached (too many pages in one call; request specific actions)
help cloud_browser.wait-for-response: not attached (too many pages in one call; request specific actions)
help vault.fill: not attached (too many pages in one call; request specific actions)
help gmail.search: not attached (too many pages in one call; request specific actions)


[exit code: 0]

[attached: tools help]
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

===== tools help cloud_browser.read-page =====
Read the cloud browser's current page, including nested cross-origin iframe contents by default.

DETAILS
Default `format=ax` returns the accessibility tree with [ref=nX] markers and frame provenance — use this when you need structure or refs to click/fill. `format=text` returns visible innerText across the frame tree. Each link renders with its destination (`link "text" href="https://..." [ref=nX]`) — read the href directly instead of scraping URLs with execute_js. The [ref=nX] markers are valid for THIS snapshot only: after any navigation, form submit, or in-place DOM update, re-read to get fresh refs. Pass frame_id (from `tools cloud_browser list-frames`) only to scope the read to one frame subtree.

USAGE
  tools cloud_browser read-page [--format VALUE] [--frame-id VALUE] --lease-id VALUE --tab-id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --format               string   'ax' (default) for accessibility tree with refs, 'text' for body innerText.
  --frame-id             string   Optional frame id from `tools cloud_browser list-frames`. Defaults to the full page frame tree; use to scope the read to one frame subtree.
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required on every action so it always lands on the intended tab. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

===== tools help cloud_browser.find =====
Find elements across the cloud browser's nested frame tree by natural-language query.

DETAILS
Returns [{ref,role,text,ariaLabel,frame_id?,truncated?,warning?}]. Traversal is bounded; when truncated, use list_frames and read_page(frame_id=...) for frames not searched. Use returned refs with `tools cloud_browser click`, `form-input`, etc.; frame routing is automatic.

USAGE
  tools cloud_browser find --lease-id VALUE --query VALUE --tab-id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --query                string   Natural language query (e.g. 'password input', 'Sign in button'). (required)
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required on every action so it always lands on the intended tab. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  Element[]{ariaLabel?:str,frame_id?:str,ref?:str,role?:str,text?:str,truncated?:bool,warning?:str}

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

===== tools help cloud_browser.screenshot =====
Capture a screenshot of the cloud browser.

DETAILS
tab_id is required so the screenshot always lands on the intended tab. Default save=false returns a JPEG inline in the tool result for the agent's own reasoning. save=true writes a PNG to /downloads/ and returns {path, url} for forwarding to the user. When a downstream send tool needs a URL, pass the exact `url` field from the tool result byte-for-byte; a synthesized URL will 404. The server re-mints a fresh short signed URL at send time from the `/downloads/` path.

USAGE
  tools cloud_browser screenshot --lease-id VALUE [--[no-]save] --tab-id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID from `tools cloud_browser_scheduler acquire`. (required)
  --save                 boolean  If true, capture a PNG and save under /downloads/, returning {path, url} for forwarding to the user. Default false returns a JPEG inline for the agent's own reasoning.
  --no-save              boolean  Negate --save.
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required so the screenshot always lands on the intended tab. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

===== tools help cloud_browser.click =====
Click an element in the cloud browser by ref.

DETAILS
Refs come from `tools cloud_browser read-page` ([ref=nX] markers) or `find` results — both are interchangeable. Prefer the ref already in your most recent read_page output; only call find when the ref isn't visible there. Refs are snapshot-scoped: on an `unknown ref` error the page changed under you — re-read for fresh refs rather than retrying the dead one.

USAGE
  tools cloud_browser click --lease-id VALUE --ref VALUE [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --ref                  string   The ref (e.g. 'n3') from `tools cloud_browser read-page` or `find`. If you capture it via \$(...) shell extraction, verify it is non-empty before clicking. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {clicked:bool,tag:str,bounds:Bounds,frame_local?:bool,mode?:str,trusted?:bool,warning?:str}
  bounds:Bounds{x:int,y:int,width:int,height:int}

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

===== tools help cloud_browser.form-input =====
Fill a text input, textarea, or contenteditable in the cloud browser.

DETAILS
Default mode=value uses the native value setter (handles <label>-to-control redirection, bypasses React-controlled-input guards, fires input+change events with isTrusted=false). Set mode=keystrokes to dispatch real keyboard events per character (keyDown + keyUp via Input.dispatchKeyEvent, with proper key codes and an inter-keystroke delay) — slower but fires keydown/keypress/keyup/beforeinput/input/change with isTrusted=true, which React-controlled widgets, Lit/web-component custom elements, date pickers, masked inputs, and autocomplete typeaheads validate input on. Prefer mode=keystrokes for: money/amount/price/quantity fields, OTP / verification-code / single-character-box inputs, CVV and other payment-form fields, any input inside a shadow-DOM custom element (Lit, Aileron, design-system components), and before clicking a save/submit action when a mode=value fill may leave the form's internal state empty. A mode=value fill can display the requested value while the site state remains empty; some sites then fire a blocking alert() on save. If that alert has already appeared, dismiss or recover the browser session before retrying; input commands cannot run while the renderer is blocked. With a ref, keystrokes append to existing content — clear first (empty value) to replace; the result warns when pre-existing content was detected. Without a ref, keystrokes go to whatever is currently focused (also appending). To clear a field, pass an empty value with the field's ref. On a masked or chip/token input, a value-mode fill that drops or reformats characters is automatically re-entered via keystrokes.

USAGE
  tools cloud_browser form-input --lease-id VALUE [--mode VALUE] [--ref VALUE] [--tab-id VALUE] --value VALUE [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --mode                 string   'value' (default) for native value-setter, or 'keystrokes' for real keystroke dispatch.
  --ref                  string   Ref from `tools cloud_browser read-page` or `find`. Required for mode=value, optional for mode=keystrokes.
  --tab-id               integer  Only needed for mode=keystrokes WITHOUT a ref (targets that tab's focused element). When a ref is given the tab is derived from the ref, exactly like click.
  --value                string   Text to fill. Pass an empty string together with a ref to CLEAR the field. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {filled:bool,mode:str,bounds?:Bounds,frame_local?:bool,tag?:str,warning?:str}
  bounds:Bounds{x:int,y:int,width:int,height:int}

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

===== tools help cloud_browser.scroll =====
Scroll the cloud browser's current page to a known position.

USAGE
  tools cloud_browser scroll --lease-id VALUE --tab-id VALUE --to VALUE [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required on every action so it always lands on the intended tab. (required)
  --to                   string   One of: top, bottom, up, down. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {scrolled:bool,mode?:str,note?:str,scroll_y?:int}

===== tools help cloud_browser.list-tabs =====
List every tab currently open in the cloud browser session with its id, title, url, and active flag.

DETAILS
Pass discover=true to first attach to any new targets the browser has that we haven't tracked yet (popups, OAuth windows opened by the page) — combined discover+list call.

USAGE
  tools cloud_browser list-tabs [--[no-]discover] --lease-id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --discover             boolean  If true, first sync any untracked targets into our session before listing. Default false.
  --no-discover          boolean  Negate --discover.
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  Tab[]{id:int,tab_id:int,title:str,url:str,active:bool,closed?:bool}

===== tools help cloud_browser.key-press =====
Press a named key in the cloud browser: enter, tab, backspace, escape, up, down, left, right, pageup, pagedown, home, end.

USAGE
  tools cloud_browser key-press --key VALUE --lease-id VALUE --tab-id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --key                  string   Key name. (required)
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required on every action so it always lands on the intended tab. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {pressed:str}

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

===== tools help cloud_browser.click-at =====
Click at viewport coordinates (x, y).

DETAILS
Use this when you can SEE the element in a screenshot but it doesn't have a ref — cross-origin iframe contents (OAuth/payment widgets), canvas-rendered UI, hover popovers that vanish before read_page captures them. Pair with `tools cloud_browser screenshot` to identify the coordinates. Prefer `tools cloud_browser click`(ref) whenever the element does have a ref — refs are more robust to viewport/scroll changes.

USAGE
  tools cloud_browser click-at [--button VALUE] --lease-id VALUE --tab-id VALUE --x VALUE --y VALUE [--json] [--timeout SECONDS]

OPTIONS
  --button               string   Mouse button: 'left' (default), 'right', or 'middle'.
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required on every action so it always lands on the intended tab. (required)
  --x                    number   Viewport x in CSS pixels (left edge = 0). (required)
  --y                    number   Viewport y in CSS pixels (top edge = 0). (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {clicked:bool,x:num,y:num,button:str}

===== tools help cloud_browser.select-option =====
Select an <option> in a native <select> element in the cloud browser.

USAGE
  tools cloud_browser select-option --lease-id VALUE --ref VALUE --value VALUE [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --ref                  string   The ref for the <select> (from `tools cloud_browser read-page` or `find`). (required)
  --value                string   The value or visible text of the option to select. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {selected:bool,value:str,mode?:str}

===== tools help cloud_browser.wait-for-selector =====
Wait until an element reaches a state (visible by default), then return.

DETAILS
Address it by `ref` from a prior read_page/find (most reliable — no selector guessing), by CSS `selector`, or by `text` alone when you only need to wait for visible page text. Use this after navigate on SPAs that render after load, and after click/submit INSTEAD of `sleep N && read_page` loops. Pass `text` to wait until the element's text contains a value (e.g. a status reading 'Ready', or a price populating) — matching is case-insensitive, so AX-tree text like 'ADD TO CART' works even when the DOM text is 'Add to cart'. Selector queries pierce open shadow roots. Note `selector` matches CSS tags/attributes, not AX roles: a div with role=button needs '[role=button]', not 'button'. Returns {matched:true} on success, errors on timeout.

USAGE
  tools cloud_browser wait-for-selector --lease-id VALUE [--ref VALUE] [--selector VALUE] [--state VALUE] --tab-id VALUE [--text VALUE] [--timeout-ms VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --ref                  string   Element ref from read_page/find, e.g. 'n42'. Use at most one of ref or selector; text may be used alone.
  --selector             string   CSS selector to wait for. E.g. '.search-results' or '[data-testid=price]'.
  --state                string   Target state: 'visible' (default), 'attached', 'hidden', or 'detached'.
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required on every action so it always lands on the intended tab. (required)
  --text                 string   Wait until matching text appears (case-insensitive). May be used alone, or with ref/selector to constrain the element.
  --timeout-ms           integer  Max wait in milliseconds. Default 10000, max 40000 (fits inside the default 45s bash budget; raise the bash `timeout` if you also raise this).
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {matched:bool,state:str,ref?:str,selector?:str,text?:str}

===== tools help cloud_browser.check-lease =====
Probe whether the cloud browser lease is still alive without driving the browser.

DETAILS
Returns {alive: bool, tabs: [...], recovered?: bool, error?: string}. Alive=false means the lease is dead: stop, do not retry actions against this lease_id, and acquire a fresh one. Alive=true with recovered=true means the probe itself revived the lease on a fresh browser: same lease_id, but tabs/refs reset — call list_tabs and re-navigate. Cheap side-effect-free check; safe to call before any sequence of browser actions when you've been idle or unsure about lease state.

USAGE
  tools cloud_browser check-lease --lease-id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID to probe, from `tools cloud_browser_scheduler acquire`. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {lease_id:str,alive:bool,error?:str,note?:str,recovered?:bool,tabs?:Tab[]}
  Tab{id:int,tab_id:int,title:str,url:str,active:bool,closed?:bool}

===== tools help cloud_browser.close-tab =====
Close the given tab in the cloud browser.

USAGE
  tools cloud_browser close-tab --lease-id VALUE --tab-id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --tab-id               integer  The tab id from `tools cloud_browser list-tabs`. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {closed:bool,id:int}

===== tools help cloud_browser.create-tab =====
Open a new tab in the cloud browser at the given URL (or about:blank if omitted).

USAGE
  tools cloud_browser create-tab --lease-id VALUE [--url VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --url                  string   Optional URL to open in the new tab.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {id:int,tab_id:int,url:str}

===== tools help cloud_browser.drag =====
Drag from one point to another with real CDP mouse events (press → moves → release).

DETAILS
Use for sliders, signature pads, kanban-style reordering, drag-to-upload zones, and any UI that listens for real pointer events rather than synthetic DragEvents. Specify each endpoint as either a ref (from `tools cloud_browser read-page` or `find` — resolved to the element's center) or explicit x/y viewport coords.

USAGE
  tools cloud_browser drag [--duration-ms VALUE] [--from-ref VALUE] [--from-x VALUE] [--from-y VALUE] --lease-id VALUE [--steps VALUE] --tab-id VALUE [--to-ref VALUE] [--to-x VALUE] [--to-y VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --duration-ms          integer  Total drag duration. Default 300ms. Max 10000ms. Spread evenly across `steps`.
  --from-ref             string   Ref of the element to start the drag from (alternative to from_x/from_y).
  --from-x               number   Viewport x in CSS pixels for the drag start.
  --from-y               number   Viewport y in CSS pixels for the drag start.
  --lease-id             string   Lease ID (e.g. "L-abc123") from `tools cloud_browser_scheduler acquire`. Required for every cloud_browser_* operator action. (required)
  --steps                integer  Number of intermediate mouseMoved events. Default 10. Max 100. Higher = smoother drag, better for pointer-momentum-aware UIs.
  --tab-id               integer  Tab id from `tools cloud_browser list-tabs` (or returned by `tools cloud_browser_scheduler acquire`, `tools cloud_browser navigate`, `tools cloud_browser navigate-and-read`, `tools cloud_browser create-tab`, `tools cloud_browser focus-tab`). Required on every action so it always lands on the intended tab. (required)
  --to-ref               string   Ref of the element to drop on (alternative to to_x/to_y).
  --to-x                 number   Viewport x in CSS pixels for the drop point.
  --to-y                 number   Viewport y in CSS pixels for the drop point.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {dragged:bool,from:num[],to:num[],mode?:str}

===== tools help cloud_browser.physical-input =====
Control explicit physical input state in pure-computer-use mode.

STATUS
  unavailable: Connect this account to use cloud_browser.