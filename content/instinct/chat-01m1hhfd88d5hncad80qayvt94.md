---
title: "validate tailnet oauth attach (chat-01M1HHFD8)"
---

_1 transcript files aggregated._

Validate end-to-end that an ephemeral cloud workspace session can join the user's tailnet via OAuth-minted ephemeral keys. There is a tested runbook in the personal skill /skills/personal/tailnet-attach/SKILL.md - follow it, with the OAuth-mint step prepended.

Inputs:
- OAuth client ID (not secret): kATpu1p7E311CNTRL
- OAuth client SECRET: in the vault entry "tailnet ephemeral attach key" (password field). Vault only fills into browser fields - use the cloud browser fill trick to read it into your environment. NEVER print the secret or minted keys in messages.

Steps:
1. Exchange client credentials for an API access token: POST https://api.tailscale.com/api/v2/oauth/token with grant_type=client_credentials (client_id + client_secret as basic auth or form fields).
2. Mint an ephemeral pre-auth key: POST /api/v2/tailnet/-/keys with capabilities.devices.create = {reusable: false, ephemeral: true, preauthorized: true, tags: ["tag:instinct"]}. If the tag errors (tag may not exist in the tailnet policy), retry WITHOUT tags and note that the user needs to add tag:instinct to the tailnet ACL/policy file.
3. In your workspace: download tailscale 1.102.3 static amd64, run tailscaled --tun=userspace-networking with statedir/socket in /tmp plus --socks5-server=localhost:1055, then tailscale up --auth-key=<minted key> --hostname=instinct-validate.
4. Verify: tailscale --socket status shows the tailnet peers (t2568, ai-vps, cesilia, nothing-phone-3, valerie). Try reaching one thing: e.g. curl --proxy http://localhost:1056 or a tailscale ping to an online peer (t2568 was online recently; valerie is DOWN, expect her to fail).
5. Clean up: tailscaled logout + kill the daemon, wipe /tmp/tsstate, release any browser lease.

Report: did the OAuth exchange work, did key minting work (with or without tag), did the session join, what the peer list showed, any reachability test result, and the exact error text if any step failed. No secrets in the report.

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
Let me start by reading the personal skill runbook, and check the vault situation. Plan:

1. Read /skills/personal/tailnet-attach/SKILL.md
2. Get the OAuth secret from vault via cloud browser fill trick (per browser-use skill). Need to read browser-use skill too.
3. Exchange for token, mint key, download tailscale, run, verify, cleanup, report.

Let me first read the runbook skill and browser-use skill.
```

Tool: bash

Arguments:
```json
{"command": "cat /skills/personal/tailnet-attach/SKILL.md"}
```

Tool: bash

---
name: tailnet-attach
description: Attach this ephemeral cloud workspace to Kuber's tailnet as a short-lived Tailscale node. Use when work needs to reach his tailnet devices (Mac t2568, ai-vps, cesilia, nothing-phone-3) and valerie (the Pi) is down or unsuitable, or when the user asks to attach a session to the tailnet.
---

# Attach a cloud workspace session to Kuber's tailnet

Verified empirically 2026-09-03: tailscaled 1.102.3 runs in the cloud workspace as uid 1001 (no root) in userspace-networking mode. /dev/net/tun exists but non-root cannot configure interfaces - always use userspace mode.

## Prerequisites
- Tailscale pre-auth key from the vault entry "tailnet ephemeral attach key" (reusable + ephemeral, ideally tagged tag:instinct). Retrieve via the cloud-browser fill trick; never print it in messages.
- If the vault entry does not exist, ask the user to create the key at https://login.tailscale.com/admin/settings/keys (reusable, ephemeral ON, tag tag:instinct recommended) and collect it via a vault request.

## Attach (about 10 seconds)
```bash
cd /tmp
curl -sSL -o ts.tgz https://pkgs.tailscale.com/stable/tailscale_1.102.3_amd64.tgz   # re-check for newer stable
tar xzf ts.tgz
rm -rf tsstate tssock && mkdir -p tsstate
/tmp/tailscale_1.102.3_amd64/tailscaled --tun=userspace-networking \
  --statedir=/tmp/tsstate --socket=/tmp/tssock \
  --socks5-server=localhost:1055 --outbound-http-proxy-listen=localhost:1056 &
sleep 3
/tmp/tailscale_1.102.3_amd64/tailscale --socket=/tmp/tssock up \
  --auth-key="\$TS_AUTH_KEY" --hostname="instinct-\$(head -c4 /dev/urandom | od -An -tx1 | tr -d ' \n')"
/tmp/tailscale_1.102.3_amd64/tailscale --socket=/tmp/tssock status
```

## Reaching tailnet services (proxy only - no direct routing in userspace mode)
- HTTP(S): `curl --proxy http://localhost:1056 http://100.x.y.z:port/` or `--socks5-hostname localhost:1055` (SOCKS5 with remote DNS works for MagicDNS names).
- SSH to a peer: `ssh -o ProxyCommand='nc -x localhost:1055 -X 5 %h %p' user@magicdns-name` (install netcat if absent), or use `tailscale ssh` through the daemon.
- The Mac's local user is kuber.mehta (NOT kuber). t2568 = 100.96.45.16. Peers as of 2026-09-02: ai-vps 100.111.187.101 (work machine - do NOT use for Instinct infra), cesilia 100.97.9.15 (windows), nothing-phone-3 100.122.143.96 (android), valerie 100.81.45.47 (pi).

## Cleanup
- Kill tailscaled when done. Ephemeral nodes auto-remove from the tailnet minutes after going offline - no admin-console cleanup needed.
- Wipe /tmp/tsstate and /tmp/ts.tgz (contains node keys).

## Notes / gotchas
- First `tailscale up` may print a login URL if the key is wrong/expired - that means the key failed, not that interactive login is expected.
- UDP buffer warnings in the daemon log are cosmetic (non-root).
- This gives session-scoped access only; the node dies with the workspace. For standing presence use valerie.


[exit code: 0]

```thinking
I need the OAuth secret from the vault entry "tailnet ephemeral attach key" (password field). The parent says vault only fills into browser fields — use the cloud browser fill trick to read it into the environment.

I need to read the browser-use skill for vault fill mechanics and how to read the filled value. Let me check tools surface for vault and cloud_browser.
```

Tool: bash

Arguments:
```json
{"command": "sed -n '1,200p' /skills/platform/browser-use/SKILL.md; echo ---; ls /skills/platform/browser-use/references/ 2>/dev/null"}
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
---
authentication.md
payment.md
recovery.md


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "tools --help 2>&1 | head -80"}
```

Tool: bash

Tools CLI

You are a task agent. Your parent (the main agent) spawned you for a focused job. When the job is done, report back to your parent and hold. Your parent owns task-agent cleanup.

Your direct-execute traits:
  - work - integrations, files, web page fetching, device tools
  - search - research over indexed personal data and the public web
  - channel read actions - read channel context when a channel family exposes read tools
  - task-agent read actions - inspect your sibling task agents, the ones your parent spawned
  - resource lifecycle actions - acquire, release, and extend the browser or device session your task needs. The browser-use skill owns the model; when the write lease you need is held by another task, tell your parent and it coordinates.
  - orchestration - message your parent and schedule wakes for yourself
  - todos read actions - inspect durable todos

Traits you see in the action list but cannot invoke:
  - channel write actions - user-facing sends, replies, reactions, edits, deletes, thread-title changes, and live voice steering. Only the main agent writes to user-facing channels; report proposed writes to your parent instead.
  - task-agent lifecycle actions - lifecycle control for task agents. The main agent owns task-agent lifecycle; report sibling routing or cleanup needs to your parent.
  - todos write actions - the main agent mutates todos after your reports.
  - early access invites - only the main agent invites people to Instinct early access; report the request to your parent.

Ground every factual claim: personal facts in indexed or exact internal context, and general public information in external sources. Report the provenance and exact observed external source URLs to your parent.

Run `tools --help` for the current surface.

USAGE
  tools <command-path> [options]
  tools help [<path>...]

Execution path segments are space-separated; help targets are dotted command paths.
Namespace help lists a family's actions; action pages are appended in full
to the bash result (stdout prints a stub per target).
Appending .all to a namespace fetches every descendant action page; do this only for small namespaces (each family's action count is shown in the list below).
Pass several targets to fetch them together, e.g. tools help gmail.search gmail.get-thread.

Built-ins (no help read needed): help, async wait, async list.

EXECUTABLE (you can call these directly)
  agent_message        namespace (1 action)   Send messages to other agents.
  browser_guidance     namespace (3 actions)  Search per-config website guidance and this user's past outcomes before browser navigation, and record how a config performed after an attempt. Missing guidance is normal and means unknown, not supported or blocked.
  cloud_browser        namespace (27 actions) Drive a cloud-hosted Chrome lease with the user's saved logins. Use for agent-driven web tasks (order food, book rides, compare prices, fetch receipts) that need real authenticated capability on real sites. A task agent acquires its own `lease_id` with `tools cloud_browser_scheduler acquire` and drives it here.
  cloud_browser_scheduler namespace (4 actions)  Schedule the user's cloud browser: acquire, list, release, and extend leases. A task agent acquires its own lease here and drives it through `tools cloud_browser <action>`; the main agent uses status to coordinate contention on the shared write lease.
  email                namespace (2 actions)  Read and reply through Instinct's shared email address (instinct@agent.instinct.co).
  flights              namespace (4 actions)  Search and read live flight offers, orders, changes, seats, payments, airline credits, and flight reference data through Instinct's native realtime flights index and tracker.
  github               namespace (12 actions) Inspect and update GitHub repositories and issues.
  gmail                namespace (37 actions) Search, read, draft, and send Gmail messages.
  google-calendar      namespace (45 actions) Full Google Calendar control: events, Meet links, attendees and meeting rooms, focus/OOO/working-location status, recurrence, reminders, labels and attachments; multi-calendar availability and advanced search; calendar lifecycle, subscriptions, ACL sharing and ownership transfer; colors, settings, and renewable push watches.
  google-docs          namespace (10 actions) Create and edit Google Docs through native structural reads, runtime schema discovery, complete batchUpdate bodies, revision-safe preservation, and HTML bootstrap. See the google-docs skill.
  google-drive         namespace (38 actions) Full Google Drive control: search, read, upload, and manage files and folders. Share files with notification control and expiration, manage comments and replies, view revision history, check storage quota, and work across personal and shared drives.
  google-sheets        namespace (31 actions) Read and edit Google Sheets spreadsheets.
  google-slides        namespace (16 actions) Read and edit Google Slides presentations.
  google-tasks         namespace (16 actions) Manage Google Tasks to-dos: list, create, update, complete, delete, and move tasks; manage task lists; clear completed tasks.
  google-workspace     namespace (2 actions)  Gmail, Calendar, Tasks, Drive, Docs, Sheets, Slides, and Contacts.
  granola              namespace (6 actions)  Read Granola meeting notes, summaries, and transcripts.
  image                namespace (2 actions)  Create new images or edit reference images, saving outputs into /downloads/.
  linear               namespace (27 actions) Search and update Linear issues and workspace metadata.
  link_payments        namespace (8 actions)  Use the user's Stripe Link wallet for purchases they approve with Link.
  links                namespace (4 actions)  Generate canonical links for common outbound actions, or resolve the best presentation for an arbitrary URL.
  maps                 namespace (4 actions)  Get directions, travel times, search places, and geocode addresses.
  notion               namespace (51 actions) Search, read, create, and manage Notion pages, databases, and blocks. Query databases with filters, add comments, and manage workspace content.
  observations         namespace (2 actions)  SQL over the user's observation database. Use observations sql for structured questions (counts, group-bys, joins, ranked full-text) and to read a known record's full content from its type table, instead of shell searches over the /observations mount.
  outlook              namespace (96 actions) Search, read, draft, send, and manage Outlook mail through Microsoft Graph.
  read                 action                 Read and display any file. Renders each type appropriately: images display natively (HEIC/TIFF/BMP/AVIF convert to JPEG automatically; SVG shows raw XML), videos show metadata plus sampled frames, audio shows rich transcripts plus metadata and waveforms, PDFs render each page as an image, Office docs (DOCX/XLSX/PPTX) are extracted to text, .eml files parse into headers plus body, text/code files show with line numbers. Works on file paths exposed by the workspace (/downloads/, /workspace/, etc.). Text observation records are read by selecting the type table's content column with `tools observations sql`; for binary observation files (photos, video, audio, uploads), `tools observations fetch` them into /downloads first, then read the saved file here. Use read_file when you want to see a PDF's layout, formatting, diagrams, or images on select pages. To search a long PDF or extract exact text (quotes, IDs, amounts), use pdftotext via bash instead - it is lossless for digital PDFs and much cheaper than rendering pages. They combine well: pdftotext to find the pages that matter, then read those pages here.
  search               action                 Search the user's memory index.
  slack                namespace (27 actions) Search Slack and send messages through the user's Slack account.
  slackbot             namespace (10 actions) Read and respond on Slack from Instinct's own account, including threads, reactions, files, and sent messages.
  time                 namespace (3 actions)  Look up current times, convert datetimes across timezones, and calculate durations.
  vault                namespace (7 actions)  Manage, fill, and import the user's stored credentials and personal information.
  wake_schedule        namespace (4 actions)  Create, list, update, and delete scheduled wakes for yourself.
  wake_subscription    namespace (3 actions)  Subscribe to event-driven wakes; list and unsubscribe from active subscriptions.
  weather              namespace (3 actions)  Get native weather forecasts, geocoding, air quality, marine, elevation, ensemble, climate, flood, and other weather datasets.
  web_fetch            action                 Fetch webpage content as readable Markdown.
  web_search           action                 Search the public web; results include URLs and query-relevant excerpts.
  yelp                 namespace (16 actions) Use Yelp for local recommendations and review-driven discovery: restaurants, services, events, ratings, reviews, photos, attributes, delivery, and reservation availability.

PARTIAL (you can read; writes delegated)
  agent-mail           namespace (15 actions) Use the agent's own managed email address: read and organize messages, follow threads, work with attachments and drafts, send or reply, and inspect delivery outcomes. Channel reads remain available.
  imessage             namespace (14 actions) Read and respond through Instinct's phone channel, including iMessage, RCS, SMS, apps, and GamePigeon. Channel reads remain available.
  todos                namespace (7 actions)  Inspect durable tasks, projects, blockers, decisions, and outcomes. List, get, and query remain available.
  whatsappbot          namespace (4 actions)  Read and respond on WhatsApp from Instinct's own account in the user's conversation. Channel reads remain available.

PARTIAL (some actions delegated)


[exit code: 0]

```thinking
I need the "cloud browser fill trick" to read the vault secret into my environment. The vault only fills into browser fields. So the trick: acquire a browser lease, navigate to some page with an input field (or use execute-js to create one), use `tools vault fill` to fill the entry into the field, then read the field's value back via execute-js.

Let me check vault help and cloud_browser execute-js help, and authentication.md for vault fill details.
```

Tool: bash

Arguments:
```json
{"command": "tools help vault.fill vault.list cloud_browser.execute-js cloud_browser.navigate-and-read cloud_browser_scheduler.acquire cloud_browser_scheduler.release 2>&1 | head -5"}
```

Tool: bash

help vault.fill: attached below
help vault.list: attached below
help cloud_browser.execute-js: attached below
help cloud_browser.navigate-and-read: attached below
help cloud_browser_scheduler.acquire: attached below


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

===== tools help cloud_browser_scheduler.release =====
Release the specified cloud browser lease.

DETAILS
Stops the cloud browser session; live page state for that task (current page, cart, unsaved forms) is lost. Cookies/logins from a persist lease are SAVED to the config's profile on release and load into any lease acquired after the release (a read lease already live when you release won't have them); a non-persist lease's session logins are not saved. Idempotent: no-op if the lease is already gone.

USAGE
  tools cloud_browser_scheduler release --lease-id VALUE [--json] [--timeout SECONDS]

OPTIONS
  --lease-id             string   Lease ID returned by `tools cloud_browser_scheduler acquire`. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.