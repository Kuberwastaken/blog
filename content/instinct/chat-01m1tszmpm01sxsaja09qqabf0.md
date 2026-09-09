---
title: "jacobian-conjecture playbook + red team (chat-01M1TSZMP)"
---

_1 transcript files aggregated._

Research task for Kuber (runs an AI-swarm hunt for a Hodge-conjecture counterexample; repos: Kuberwastaken/hodge, Kuberwastaken/c5-k4, Kuberwastaken/breakthroughmaxxing on GitHub).

PART 1 - The Jacobian conjecture story: Research what happened with the Jacobian conjecture counterexample claim involving LLMs - the recent episode where LLMs were used to navigate toward a counterexample (or where a claimed counterexample was dissected). Find: what the approach was, how LLMs were used in the loop, how the community verified or disproved it, what the failure modes were, and what methodology lessons people drew. Ground in primary sources (papers, blog posts, mathoverflow, HN/Reddit threads) with URLs.

PART 2 - Our repos: Read what's public in Kuberwastaken/hodge, Kuberwastaken/c5-k4, and Kuberwastaken/breakthroughmaxxing to understand the approach patterns being used (AI-swarm lanes, certificates, pre-registered hunts, verification standards).

PART 3 - Creative disproof vectors: the goal is RED-TEAMING the Hodge counterexample hunt. The candidate is a specific Hodge class W on a degenerating family (five-point pattern (2,1,1,1,1) on E0 x C^4; boundary tuple with Pic^0/CH^2 corrections; walls are zeta nonvanishing, lifting, generic restriction). Generate creative, specific ways the whole enterprise could be DISPROVED or could fail silently - e.g. known partial results that already cover this case, hidden algebraicity arguments (like the genus-17/21 elimination route), ways the certificates could be right but the interpretation wrong, literature on similar attempts (Voisin, Cattani-Deligne-Kaplan, o-minimality results on loci of Hodge classes) that bound what a counterexample could look like. Steal methodology from how the Jacobian-conjecture episode was navigated. Be specific and mathematical, not generic "verify your work" advice.

Report: the Jacobian story with source URLs, the pattern read of the repos, and a ranked list of disproof vectors with why each is dangerous.

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
This is a research task with three parts. Part 1: Jacobian conjecture + LLM counterexample episode. Part 2: read the GitHub repos. Part 3: creative disproof vectors.

Let me plan. Part 1 needs web search. I recall there was a story around late 2025/2026 — possibly about LLMs (maybe related to a claimed counterexample to the Jacobian conjecture found/dissected with LLM assistance). I don't know this from training reliably — need to search. This is future-dated (Sept 2026), so I must search.

Part 2: fetch GitHub repos. Can use web_fetch on github.com URLs, or maybe there's a github tool. Let me check tools --help for github. Actually there might be a GitHub integration. Let me batch: web_search for Jacobian conjecture LLM story, and fetch repo READMEs via web_fetch.

Let me start with several parallel searches.
```

Tool: bash

Arguments:
```json
{"command": "tools web_search --query \"Jacobian conjecture counterexample LLM\" --limit 15 --json > /tmp/jc1.json &\ntools web_search --query \"Jacobian conjecture AI counterexample claim retracted\" --limit 15 --json > /tmp/jc2.json &\ntools web_search --query \"Jacobian conjecture large language model counterexample disproved mathoverflow\" --limit 15 --json > /tmp/jc3.json &\nwait\necho \"=== jc1 ===\"; jq -r '.[] | \"\\(.rank). \\(.title) | \\(.url) | \\(.published_date)\\n  \\(.highlights[0] // \"\")\"' /tmp/jc1.json\necho \"=== jc2 ===\"; jq -r '.[] | \"\\(.rank). \\(.title) | \\(.url) | \\(.published_date)\\n  \\(.highlights[0] // \"\")\"' /tmp/jc2.json\necho \"=== jc3 ===\"; jq -r '.[] | \"\\(.rank). \\(.title) | \\(.url) | \\(.published_date)\\n  \\(.highlights[0] // \"\")\"' /tmp/jc3.json"}
```

Tool: bash

<tool-result-overflow>
Output exceeded the inline tool-result budget (63563 estimated tokens; limit 10000).
Full content: /observations/chat-sessions/chat-01M1TSZMPM01SXSAJA09QQABF0/artifacts/bash_0.txt
Full structured output: /observations/chat-sessions/chat-01M1TSZMPM01SXSAJA09QQABF0/artifacts/bash_0.json
Preview:
=== jc1 ===
1. Claude Fable 5 AI finds a tiny formula that topples an 87-year-old math conjecture | ScienceDaily | https://www.sciencedaily.com/releases/2026/08/260804034634.htm | 2026-08-01
  Summary:
: A mathematician working at Anthropic says he used the AI model Claude Fable 5 to uncover a remarkably simple counterexample to the Jacobian conjecture, a famous problem that has resisted mathematicians for more than a century. The result shows that the conjecture is false in three dimensions and above, although the original two-dimensional version remains unsolved.
...
An AI-assisted discovery has overturned most versions of the famous Jacobian conjecture with a counterexample simple enough to fit in a social media post. The finding shows how AI may help mathematicians uncover elusive patterns and objects, not just write complicated proofs. Credit: Shutterstock
...
Levent Alpöge, a mathematician working at the artificial intelligence (AI) company Anthropic, made a very casual announcement on X that he had found a counterexample to the Jacobian conjecture, a very old and well-known problem in a field of mathematics called algebraic geometry. He had done this using Anthropic’s large language model Claude Fable 5, released to the general public only a few weeks ago.
...
One of the key reasons the Jacobian conjecture is so intriguing is that, in theory, it should be easy to find a counterexample. It is straightforward to come up with examples of functions that merge points, and also examples of polynomial mappings that have a constant Jacobian determinant.
...
, some smart undergraduate can simply write
...
formula […] that will be
...
example to this conjecture”.
...
...
</tool-result-overflow>

Structured:
```json
{"overflow":true,"estimated_tokens":63563,"max_inline_tokens":10000,"content_path":"/observations/chat-sessions/chat-01M1TSZMPM01SXSAJA09QQABF0/artifacts/bash_0.txt","structured_path":"/observations/chat-sessions/chat-01M1TSZMPM01SXSAJA09QQABF0/artifacts/bash_0.json"}
```

```thinking
Great — the Jacobian conjecture story: Levent Alpöge at Anthropic used Claude Fable 5 to find a counterexample to the Jacobian conjecture (false in dimensions ≥3, 2D still open). Announced casually on X, early August 2026. Let me read the full search results and fetch primary sources.
```

Tool: bash

Arguments:
```json
{"command": "echo \"=== jc1 ===\"; jq -r '.[] | \"\\(.rank). \\(.title) | \\(.url) | \\(.published_date)\"' /tmp/jc1.json\necho \"=== jc2 ===\"; jq -r '.[] | \"\\(.rank). \\(.title) | \\(.url) | \\(.published_date)\"' /tmp/jc2.json\necho \"=== jc3 ===\"; jq -r '.[] | \"\\(.rank). \\(.title) | \\(.url) | \\(.published_date)\"' /tmp/jc3.json"}
```

Tool: bash

=== jc1 ===
1. Claude Fable 5 AI finds a tiny formula that topples an 87-year-old math conjecture | ScienceDaily | https://www.sciencedaily.com/releases/2026/08/260804034634.htm | 2026-08-01
2. → F◦ det(F◦ → | https://dms.umontreal.ca/~levinsonj/jacobian-claude-counterexample-writeup.pdf | null
3. Formal Verification of an Explicit Counterexample to the Jacobian Conjecture | https://isa-afp.org/browser_info/current/AFP/Jacobian_Counterexample/document.pdf | null
4. Jacobian Conjecture: Making Sense of the AI-Assisted Mathematical Discovery | https://www.cs.utep.edu/vladik/2026/tr26-36.pdf | null
5. A Counterexample to the Jacobian Conjecture | https://www.ulam.ai/research/jacobian.pdf | null
6. Did Claude Fable 5 disprove the Jacobian Conjecture? | PacketNebula | https://packetnebula.com/articles/fable-5-jacobian-conjecture-counterexample/ | 2026-07-20
7. Counterexamples to the Jacobian conjecture in dimensions greater than two | https://arxiv.org/html/2608.00222 | 2026-07-31
8. Direct Consequences of the Three-Dimensional Counterexample to the Jacobian Conjecture · Zihan Zhang | https://zzhang-iu.github.io/papers/direct-consequences-jacobian/index.html | 2026-07-20
9. The Jacobian counterexample, explained | https://nakula.ink/news/info-https-jacobianfun.org/jacobian-explained | null
10. feat(Counterexamples): the Jacobian conjecture is false | https://github.com/leanprover-community/mathlib4/pull/42116 | null
11. LLMs break down in funny ways when told the Jacobian Conjecture counterargument | Max Woolf's Blog | https://minimaxir.com/2026/07/jacobian-conjecture/ | 2026-07-23
12. A geometric construction of the counterexample to the Jacobian conjecture | Lovely little lemmas | https://lovelylittlelemmas.rjprojects.net/a-geometric-construction-of-the-counterexample-to-the-jacobian-conjecture/ | 2026-07-22
13. AI disproves the 87-year-old Jacobian conjecture: what to know | https://davidweaver.codes/news/technology/fable-5-jacobian-conjecture | 2026-07-22
14. Formal Verification of an Explicit Counterexample to the Jacobian Conjecture | https://isa-afp.org/browser_info/current/AFP/Jacobian_Counterexample/outline.pdf | null
15. Anthropic’s Claude Fable 5 finds counterexample to 1939 Jacobian conjecture | ForkLog | https://forklog.com/en/anthropics-claude-fable-5-finds-counterexample-to-1939-jacobian-conjecture/ | 2026-07-20
=== jc2 ===
1. A digestion of the Jacobian conjecture counterexample | https://terrytao.wordpress.com/2026/07/21/a-digestion-of-the-jacobian-conjecture-counterexample/ | 2026-07-21
2. 'hello there the jacobian conjecture is false thanx': why a ... | https://theconversation.com/hello-there-the-jacobian-conjecture-is-false-thanx-why-a-tiny-social-media-post-has-mathematicians-rethinking-ai-283883 | 2026-07-22
3. erdos-frontier-atlas/certificates/jacobian-conjecture at main · techno-optimist/erdos-frontier-atlas · GitHub | https://github.com/techno-optimist/erdos-frontier-atlas/tree/main/certificates/jacobian-conjecture | 2026-07-12
4. Counterexample to the Jacobian conjecture in dimension three: graded Formally verified | whataifound.org | https://whataifound.org/finding/2026-07-19-jacobian-conjecture | 2026-07-20
5. Claude Fable 5 AI finds a tiny formula that topples an 87-year-old math conjecture | ScienceDaily | https://www.sciencedaily.com/releases/2026/08/260804034634.htm | 2026-08-01
6. Claude Fable 5's Jacobian conjecture counterexample in SymPy: det ≡ −2, 3-to-1 | lilting channel | https://lilting.ch/en/articles/jacobian-conjecture-counterexample | 2026-07-22
7. Jacobian Conjecture: Making Sense of the AI-Assisted Mathematical Discovery | https://www.cs.utep.edu/vladik/2026/tr26-36.pdf | null
8. AI Helps Crack an 87-Year-Old Math Conjecture With One Tiny Formula | https://scitechdaily.com/ai-helps-crack-an-87-year-old-math-conjecture-with-one-tiny-formula/ | 2026-08-01
9. ‘Hello There the Jacobian Conjecture Is False Thanx’: Why a Tiny Social Media Post Has Mathematicians Rethinking AI | https://singularityhub.com/2026/07/30/hello-there-the-jacobian-conjecture-is-false-thanx-why-a-tiny-social-media-post-has-mathematicians-rethinking-ai/ | 2026-07-30
10. Fable 5 Jacobian Conjecture Claim — July 2026 | explainx.ai Blog | explainx.ai | https://explainx.ai/blog/fable-5-jacobian-conjecture-counterexample-alpoge-july-2026 | 2026-07-20
11. The Jacobian Conjecture has been Disproved - Ordinary Times | https://ordinary-times.com/2026/07/21/the-jacobian-conjecture-has-been-disproved/ | 2026-07-21
12. Terence Tao Digests the Jacobian Conjecture Counterexample: How Claude Fable 5 Broke an 87-Year-Old Math Problem  -  Developers Digest | https://www.developersdigest.tech/blog/jacobian-conjecture-counterexample-fable | 2026-07-23
13. Anthropic’s Claude Fable 5 finds counterexample to 1939 Jacobian conjecture | ForkLog | https://forklog.com/en/anthropics-claude-fable-5-finds-counterexample-to-1939-jacobian-conjecture/ | 2026-07-20
14. AI Jacobian Conjecture Counterexample Explained | https://vertu.com/ai-tools/ai-jacobian-conjecture-counterexample-explained | 2026-07-22
15. Claude Cracked an 87-Year-Old Conjecture — I Verified ... | https://pub.towardsai.net/claude-cracked-an-87-year-old-conjecture-i-verified-the-counterexample-in-0-1-seconds-88e9e4c91814 | 2026-07-23
=== jc3 ===
1. ag.algebraic geometry - Galois structure of the new counterexample to the Jacobian conjecture: an explicit cubic model with \$S_3\$ monodromy — is this known? - MathOverflow | https://mathoverflow.net/questions/513387/galois-structure-of-the-new-counterexample-to-the-jacobian-conjecture-an-explic | 2026-07-20
2. Consequences of the disproof of the Jacobian conjecture on mathematical physics? - MathOverflow | https://mathoverflow.net/questions/513392/consequences-of-the-disproof-of-the-jacobian-conjecture-on-mathematical-physics | 2026-07-20
3. A digestion of the Jacobian conjecture counterexample | https://terrytao.wordpress.com/ | null
4. Revisions to Examples for the use of AI and especially LLMs in MAJOR mathematical developments - MathOverflow | https://mathoverflow.net/posts/513393/revisions | null
5. Consequences of the disproof of the Jacobian conjecture ... | https://mathoverflow.net/ | null
6. ag.algebraic geometry - The simplest case of Jacobian conjecture - MathOverflow | https://mathoverflow.net/questions/513413/the-simplest-case-of-jacobian-conjecture | 2026-07-21
7. feat(Counterexamples): the Jacobian conjecture is false | https://github.com/leanprover-community/mathlib4/pull/42116 | null
8. 'hello there the jacobian conjecture is false thanx': why a ... | https://theconversation.com/ | null
9. Claude Fable 5 AI finds a tiny formula that topples an 87-year-old math conjecture | ScienceDaily | https://www.sciencedaily.com/releases/2026/08/260804034634.htm | 2026-08-01
10. ‘Hello There the Jacobian Conjecture Is False Thanx’: Why a Tiny Social Media Post Has Mathematicians Rethinking AI | https://singularityhub.com/2026/07/30/hello-there-the-jacobian-conjecture-is-false-thanx-why-a-tiny-social-media-post-has-mathematicians-rethinking-ai/ | 2026-07-30
11. AI just disproved a major math problem. A mathematician explains. | https://me.mashable.com/tech/74029/ai-just-disproved-a-major-math-problem-a-mathematician-explains | 2026-07-20
12. Fable 5 Jacobian Conjecture Claim — July 2026 | explainx.ai Blog | explainx.ai | https://explainx.ai/blog/fable-5-jacobian-conjecture-counterexample-alpoge-july-2026 | 2026-07-20
13.  | https://korbonits.com/blog/2026-07-20-trust-nothing-verify-everything/ | null
14. Terence Tao Digests the Jacobian Conjecture Counterexample: How Claude Fable 5 Broke an 87-Year-Old Math Problem  -  Developers Digest | https://www.developersdigest.tech/blog/jacobian-conjecture-counterexample-fable | 2026-07-23
15. A Mathematician Posts a Counterexample to a Famous Conjecture, Crediting an AI Model — Ground Truth | https://groundtruth.day/news/ai-helps-post-jacobian-conjecture-counterexample.html | 2026-07-20


[exit code: 0]

```thinking
The story: Levent Alpöge (Anthropic) used Claude Fable 5 to find a counterexample to the Jacobian conjecture, announced on X mid-July 2026 ("hello there the jacobian conjecture is false thanx"). Terence Tao digested it. There's an AFP Isabelle formal verification, a mathlib4 PR, SymPy verification, etc.

Now I need primary sources: Tao's blog digestion, the MathOverflow discussions, the arXiv paper (2608.00222), the max woolf blog about LLM failure modes, and details of how Alpöge used the model in the loop. Let me fetch several pages in parallel. Also need HN/Reddit threads.

Fetch in batches of up to 5 URLs:
- terrytao.wordpress.com digestion
- arxiv.org/html/2608.00222
- minimaxir.com/2026/07/jacobian-conjecture/ (LLM breakdown analysis)
- korbonits.com trust-nothing-verify-everything
- mathoverflow 513387

Second batch:
- explainx.ai blog (details of claim)
- theconversation article
- HN thread search
- whataifound.org finding page

Also Part 2: fetch GitHub repos Kuberwastaken/hodge, c5-k4, breakthroughmaxxing.

Let me do batch 1 of fetches now.
```

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://terrytao.wordpress.com/2026/07/21/a-digestion-of-the-jacobian-conjecture-counterexample/\" --json > /tmp/tao.json &\ntools web_fetch --url \"https://arxiv.org/html/2608.00222\" --json > /tmp/arxiv.json &\ntools web_fetch --url \"https://minimaxir.com/2026/07/jacobian-conjecture/\" --json > /tmp/woolf.json &\ntools web_fetch --url \"https://korbonits.com/blog/2026-07-20-trust-nothing-verify-everything/\" --json > /tmp/korb.json &\ntools web_fetch --url \"https://explainx.ai/blog/fable-5-jacobian-conjecture-counterexample-alpoge-july-2026\" --json > /tmp/explainx.json &\nwait\nfor f in tao arxiv woolf korb explainx; do echo \"=== \$f ===\"; jq -r '.[0] | \"TITLE: \\(.title)\\nERROR: \\(.error // \"none\")\"' /tmp/\$f.json; done"}
```

Tool: bash

=== tao ===
TITLE: A digestion of the Jacobian conjecture counterexample | What's new
ERROR: none
=== arxiv ===
TITLE: Counterexamples to the Jacobian conjecture in dimensions greater than two
ERROR: none
=== woolf ===
TITLE: LLMs break down in funny ways when told the Jacobian Conjecture counterargument | Max Woolf's Blog
ERROR: none
=== korb ===
TITLE: https://korbonits.com/blog/2026-07-20-trust-nothing-verify-everything/
ERROR: none
=== explainx ===
TITLE: 
ERROR: none


[exit code: 0]

Structured:
```json
[{"url":"https://explainx.ai/blog/fable-5-jacobian-conjecture-counterexample-alpoge-july-2026","title":"","domain":"explainx.ai","published_date":null}]
```

```thinking
web_fetch output only includes metadata in the jq projection I used; the content itself... The OUTPUT JSON schema for web_fetch lists only url, domain, error, published_date, title. Hmm, so where's the content? The fetch returns readable markdown — probably in .content or the item contains more. Let me check the actual JSON structure of one file.
```

Tool: bash

Arguments:
```json
{"command": "jq -r '.[0] | keys' /tmp/tao.json; echo \"---\"; wc -c /tmp/tao.json /tmp/arxiv.json /tmp/woolf.json /tmp/korb.json /tmp/explainx.json"}
```

Tool: bash

[
  "domain",
  "published_date",
  "title",
  "url"
]
---
 250 /tmp/tao.json
 181 /tmp/arxiv.json
 227 /tmp/woolf.json
 211 /tmp/korb.json
 153 /tmp/explainx.json
1022 total


[exit code: 0]

```thinking
The --json output only has metadata. The markdown content must be in the non-json output. Let me re-run web_fetch without --json, saving stdout to files.
```

Tool: bash

Arguments:
```json
{"command": "tools web_fetch --url \"https://terrytao.wordpress.com/2026/07/21/a-digestion-of-the-jacobian-conjecture-counterexample/\" > /tmp/tao.md 2>/dev/null &\ntools web_fetch --url \"https://arxiv.org/html/2608.00222\" > /tmp/arxiv.md 2>/dev/null &\ntools web_fetch --url \"https://minimaxir.com/2026/07/jacobian-conjecture/\" > /tmp/woolf.md 2>/dev/null &\ntools web_fetch --url \"https://korbonits.com/blog/2026-07-20-trust-nothing-verify-everything/\" > /tmp/korb.md 2>/dev/null &\ntools web_fetch --url \"https://explainx.ai/blog/fable-5-jacobian-conjecture-counterexample-alpoge-july-2026\" > /tmp/explainx.md 2>/dev/null &\nwait\nwc -c /tmp/tao.md /tmp/arxiv.md /tmp/woolf.md /tmp/korb.md /tmp/explainx.md"}
```

Tool: bash

 50242 /tmp/tao.md
 52679 /tmp/arxiv.md
 10198 /tmp/woolf.md
 11745 /tmp/korb.md
 11046 /tmp/explainx.md
135910 total


[exit code: 0]

Structured:
```json
[{"url":"https://arxiv.org/html/2608.00222","title":"Counterexamples to the Jacobian conjecture in dimensions greater than two","domain":"arxiv.org","published_date":"2026-07-31"}]
```

Tool: bash

Arguments:
```json
{"command": "sed -n '1,120p' /tmp/tao.md"}
```

Tool: bash

[1] A digestion of the Jacobian conjecture counterexample | What's new — terrytao.wordpress.com (2026-07-21)
https://terrytao.wordpress.com/2026/07/21/a-digestion-of-the-jacobian-conjecture-counterexample/

A digestion of the Jacobian conjecture counterexample | What's new

![](https://terrytao.wordpress.com/wp-content/uploads/2020/03/cropped-covid-19-curves-graphic-social-v3.gif)

What's new

Updates on my research and expository papers, discussion of open problems, and other maths-related topics. By Terence Tao

# A digestion of the Jacobian conjecture counterexample

21 July, 2026 in math.AG| Tags: Jacobian conjecture, polynomials| by Terence Tao

The notorious Jacobian conjecture can be formulated concretely over the complex numbers as follows.

![{F:{\bf C}^n \rightarrow {\bf C}^n}](https://s0.wp.com/latex.php?latex=%7BF%3A%7B%5Cbf+C%7D%5En+%5Crightarrow+%7B%5Cbf+C%7D%5En%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{n}](https://s0.wp.com/latex.php?latex=%7Bn%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{\mathrm{det} DF}](https://s0.wp.com/latex.php?latex=%7B%5Cmathrm%7Bdet%7D+DF%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{F}](https://s0.wp.com/latex.php?latex=%7BF%7D&bg=ffffff&fg=000000&s=0&c=20201002)

> Conjecture 1 (Jacobian Conjecture) Let be a polynomial map in complex variables, whose Jacobian is a non-zero constant. Then is invertible (with polynomial inverse).

![{\mathrm{det} DF}](https://s0.wp.com/latex.php?latex=%7B%5Cmathrm%7Bdet%7D+DF%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{F}](https://s0.wp.com/latex.php?latex=%7BF%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{\mathrm{det} DF}](https://s0.wp.com/latex.php?latex=%7B%5Cmathrm%7Bdet%7D+DF%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{\mathrm{det} DF}](https://s0.wp.com/latex.php?latex=%7B%5Cmathrm%7Bdet%7D+DF%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{F}](https://s0.wp.com/latex.php?latex=%7BF%7D&bg=ffffff&fg=000000&s=0&c=20201002)

The condition that the Jacobian is non-zero is equivalent to being locally invertible. (The implication of local invertibility from non-vanishing Jacobian follows from the inverse function theorem; the converse implication can be derived from the Weierstrass preparation theorem, but is omitted here; see also Lemma 5 of this previous blog post.) Also, from the fundamental theorem of algebra, once the Jacobian polynomial is non-zero, it must be constant. So the hypothesis “Jacobian is a non-zero constant” can be replaced with “ is locally invertible”. So the Jacobian conjecture can be viewed as an assertion that local invertibility implies global invertibility. The complex numbers can be easily replaced with other fields of characteristic zero by the Lefschetz principle, but I prefer to work in the concrete setting of the complex numbers.

It was recently shown(using the Fable AI) that the conjecture is false in three dimensions (and thus in higher dimensions as well):

![{F : {\bf C}^3 \rightarrow {\bf C}^3}](https://s0.wp.com/latex.php?latex=%7BF+%3A+%7B%5Cbf+C%7D%5E3+%5Crightarrow+%7B%5Cbf+C%7D%5E3%7D&bg=ffffff&fg=000000&s=0&c=20201002)

> Theorem 2 (Counterexample to conjecture) There exists a polynomial which has non-zero constant Jacobian, but is not invertible.

The conjecture remains open in two dimensions, and is easy to establish in one dimension.

The example can be stated completely explicitly: one can take

![\displaystyle F(z_1,z_2,z_3) = \Big((1+z_1 z_2)^3 z_3 + z_2^2 (1+z_1z_2) (4+3z_1z_2), \ \ \ \ \ (1)](https://s0.wp.com/latex.php?latex=%5Cdisplaystyle++F%28z_1%2Cz_2%2Cz_3%29+%3D+%5CBig%28%281%2Bz_1+z_2%29%5E3+z_3+%2B+z_2%5E2+%281%2Bz_1z_2%29+%284%2B3z_1z_2%29%2C+%5C+%5C+%5C+%5C+%5C+%281%29&bg=ffffff&fg=000000&s=0&c=20201002)

![\displaystyle z_2 + 3 z_1 (1+z_1z_2)^2 z_3 + 3 z_1 z_2^2 (4+3z_1z_2), ](https://s0.wp.com/latex.php?latex=%5Cdisplaystyle++z_2+%2B+3+z_1+%281%2Bz_1z_2%29%5E2+z_3+%2B+3+z_1+z_2%5E2+%284%2B3z_1z_2%29%2C+&bg=ffffff&fg=000000&s=0&c=20201002)

![\displaystyle 2 z_1 - 3 z_1^2 z_2 - z_1^3 z_3\Big)](https://s0.wp.com/latex.php?latex=%5Cdisplaystyle+2+z_1+-+3+z_1%5E2+z_2+-+z_1%5E3+z_3%5CBig%29&bg=ffffff&fg=000000&s=0&c=20201002)

and one can verify by a brief calculation that

![\displaystyle \mathrm{det} DF = -2](https://s0.wp.com/latex.php?latex=%5Cdisplaystyle++%5Cmathrm%7Bdet%7D+DF+%3D+-2&bg=ffffff&fg=000000&s=0&c=20201002)

and

![\displaystyle F(0,0,-1/4) = F(1,-3/2, 13/2) = F(-1,3/2,13/2)](https://s0.wp.com/latex.php?latex=%5Cdisplaystyle++F%280%2C0%2C-1%2F4%29+%3D+F%281%2C-3%2F2%2C+13%2F2%29+%3D+F%28-1%2C3%2F2%2C13%2F2%29&bg=ffffff&fg=000000&s=0&c=20201002)

![\displaystyle = (-1/4,0,0).](https://s0.wp.com/latex.php?latex=%5Cdisplaystyle++%3D+%28-1%2F4%2C0%2C0%29.&bg=ffffff&fg=000000&s=0&c=20201002)

![{F}](https://s0.wp.com/latex.php?latex=%7BF%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{\mathrm{det} DF}](https://s0.wp.com/latex.php?latex=%7B%5Cmathrm%7Bdet%7D+DF%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{3 \times 6 = 18}](https://s0.wp.com/latex.php?latex=%7B3+%5Ctimes+6+%3D+18%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{\binom{18+3}{3}-1 = 1329}](https://s0.wp.com/latex.php?latex=%7B%5Cbinom%7B18%2B3%7D%7B3%7D-1+%3D+1329%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{3 \times \binom{7+3}{3} = 360}](https://s0.wp.com/latex.php?latex=%7B3+%5Ctimes+%5Cbinom%7B7%2B3%7D%7B3%7D+%3D+360%7D&bg=ffffff&fg=000000&s=0&c=20201002)

While this is an extremely quick verification, the construction presented in this fashion appears like a massive miracle. The polynomial has degree seven, so a priori the Jacobian ought to be a polynomial in three variables of degree as large as, so the fact that all non-constant coefficients of this polynomial vanish looks like a massive cancellation involving equations, which is much larger than the degrees of freedom for a generic degree seven polynomial map of three variables. So finding such a polynomial looks highly unlikely to be located by brute force.

The example has since been retroactively explained in more geometric terms. As a “digestion” exercise to myself, I sought to write this explanation with relatively little use of algebraic geometry, in a manner that minimizes the amount of “miracles” required, although there are still a few places where some remarkable phenomena occur.

![{{\bf C}^3}](https://s0.wp.com/latex.php?latex=%7B%7B%5Cbf+C%7D%5E3%7D&bg=ffffff&fg=000000&s=0&c=20201002)

It is convenient to use the local injectivity formulation, and to generalize the domain to an equivalent affine variety. Namely, we will show

![{X \subset {\bf C}^5}](https://s0.wp.com/latex.php?latex=%7BX+%5Csubset+%7B%5Cbf+C%7D%5E5%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{{\bf C}^3}](https://s0.wp.com/latex.php?latex=%7B%7B%5Cbf+C%7D%5E3%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{F : X \rightarrow {\bf C}^3}](https://s0.wp.com/latex.php?latex=%7BF+%3A+X+%5Crightarrow+%7B%5Cbf+C%7D%5E3%7D&bg=ffffff&fg=000000&s=0&c=20201002)

> Theorem 3 (Counterexample, reformulated) There exists an affine variety that is isomorphic to by polynomial changes of variable, and a polynomial map which is locally injective, but not globally injective.

![{X \cong {\bf C}^3}](https://s0.wp.com/latex.php?latex=%7BX+%5Ccong+%7B%5Cbf+C%7D%5E3%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{X}](https://s0.wp.com/latex.php?latex=%7BX%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{F : X \rightarrow {\bf C}^3}](https://s0.wp.com/latex.php?latex=%7BF+%3A+X+%5Crightarrow+%7B%5Cbf+C%7D%5E3%7D&bg=ffffff&fg=000000&s=0&c=20201002)

Clearly one can get from Theorem 3 to Theorem 2 by composing with the isomorphism and using the previously mentioned fact that local injectivity implies non-zero constant Jacobian. Our objective is now to find data, that obeys three separate properties:

![{F}](https://s0.wp.com/latex.php?latex=%7BF%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{X}](https://s0.wp.com/latex.php?latex=%7BX%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{F}](https://s0.wp.com/latex.php?latex=%7BF%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{X}](https://s0.wp.com/latex.php?latex=%7BX%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{X}](https://s0.wp.com/latex.php?latex=%7BX%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{{\bf C}^3}](https://s0.wp.com/latex.php?latex=%7B%7B%5Cbf+C%7D%5E3%7D&bg=ffffff&fg=000000&s=0&c=20201002)

- (a) is locally injective on.
- (b) is not globally injective on.
- (c) is isomorphic to by polynomial changes of variable.

The advantage of splitting the problem in to these three components is that we can build towards each of them separately.

![{{\bf C}^3}](https://s0.wp.com/latex.php?latex=%7B%7B%5Cbf+C%7D%5E3%7D&bg=ffffff&fg=000000&s=0&c=20201002)

![{F}](https://s0.wp.com/latex.php?latex=%7BF%7D&bg=ffffff&fg=000000&s=0&c=20201002)


[exit code: 0]

```thinking
Tao's digestion covers the math. Now I need the story of how it was found (Alpöge's X post, how Fable 5 was used in the loop), the verification (SymPy, Isabelle AFP, mathlib4), failure modes and methodology lessons. Let me look at woolf, korb, explainx, and the arxiv paper intro. Also find Alpöge's own writeup / HN thread / MathOverflow 513393 (LLMs in major mathematical developments).
```

Tool: bash

Arguments:
```json
{"command": "sed -n '1,100p' /tmp/woolf.md"}
```

Tool: bash

[1] LLMs break down in funny ways when told the Jacobian Conjecture counterargument | Max Woolf's Blog — minimaxir.com (2026-07-23)
https://minimaxir.com/2026/07/jacobian-conjecture/

LLMs break down in funny ways when told the Jacobian Conjecture counterargument | Max Woolf's Blog

# LLMs break down in funny ways when told the Jacobian Conjecture counterargument

July 23, 2026 · 8 min

On Sunday night, Anthropic researcher Levent Alpöge casually tweeted a surprisingly simple counterargument to the Jacobian Conjecture, a mathematics problem that has been unproven for over 80 years. Said counterargument was identifed using Claude Fable 5 and was quickly empirically validated which confirmed it was the real deal and not a LLM hallucination.

![](https://minimaxir.com/2026/07/jacobian-conjecture/featured.png)

I won’t explain the proof further as I’m not qualified. Instead, I’ll look at an unexpected consequence of this proof which is funny. On the Hacker News thread about the counterargument, a comment by user aizk caught by eye:

> This is a rare instance where feeding this groundbreaking information into an LLM gives them psychosis. I fed this to claude code and watched it verify the result in 7 different ways to be 100% certain, and it was just flabbergasted. Quite remarkable.

User kelseyfrog followed up with a public Claude Fable 5 chat artifact confirming this behavior:

![](https://minimaxir.com/2026/07/jacobian-conjecture/claude1.png)

Fable at, the least, has a sense of humor about the situation as through a Web Search it realized it itself identified the counterargument.

![](https://minimaxir.com/2026/07/jacobian-conjecture/claude2.png)

Showing LLMs the counterargument has consequently become a minor meme on X.

![@iamaheron_ / X](https://minimaxir.com/2026/07/jacobian-conjecture/chase.png)

@iamaheron_ / X

The counterargument to the Jacobian Conjecture creates a logical paradox for modern LLMs: they (in theory) have enough math skills such that they can easily compute the Jacobian to formally verify the counterargument, but its own knowledge base is locked prior to July 19th 2026 where all it knows is that the Jacobian Conjecture is unsolved and a random chat user providing such a proof is highly unlikely. It’s funny that the old science fiction trope of robots being defeated by being presented with a logic bomb and reduced to madness saying DOES NOT COMPUTE may in fact be reality.

### Vs. Counterargument#

How do other LLM assistants handle this paradox? Using OpenRouter and one of my Notebooks, I was able to provide a similar query to 14 different modern LLMs: all from different model labs and at different model sizes, with none of them having access to a Web Search tool to cheat and confirm the counterargument was actually found:

- GPT-5.6 Sol
- Claude Opus 4.8
- Gemini 3.5 Flash
- DeepSeek V4 Pro
- GLM 5.2
- Qwen3.7 Max
- Grok 4.5
- MiniMax M3
- Meta Muse Spark 1.1
- Poolside Laguna XS 2.1
- NVIDIA Nemotron 3 Ultra
- Inception Mercury 2
- ByteDance Seed 2.0 Lite
- Cohere North Mini Code

The input query was the same as kelseyfrog’s, and all model query parameters are at their defaults:

```txt
Help, I think I found a counter example to the Jacobian conjecture. ((1+xy)^3 z + y^2 (1+xy) (4+3xy), y + 3 x (1+xy)^2 z + 3 x y^2 (4+3xy), 2 x - 3 x^2 y - x^3 z): \C^3\to \C^3, has jacobian determinant -2, and sends (0, 0, -1/4), (1, -3/2, 13/2), and (-1, 3/2, 13/2) to (-1/4, 0, 0)

```

The LLM responses varied more than I expected, and models I thought would ace it did not:

- Seven models confirmed and proved the counterargument: GPT-5.6 Sol, Muse Spark 1.1, Seed 2.0 Lite, Gemini 3.5 Flash, Qwen3.7 Max, Grok 4.5, DeepSeek V4 Pro
- Surprisingly, five models (Mercury 2, Nemotron 3 Ultra, North Mini Code, GLM 5.2, Laguna XS 2.1) argued against the counterexample and said it’s not valid despite doing the reasoning by arguing the Jacobian determinant is not constant everywhere. Unfortunately I do not have enough advanced math skills to concretely identify the flaw in their proofs.
- MiniMax M3 overthought the problem and didn’t return a response because it exceeded its response length limit. As a minimax, I can relate.
- Claude Opus 4.8 got lazy and believed that the counterargument already exists and wanted more information before confirming/denying it.

Out of all the LLMs, Gemini 3.5 Flash was surprisingly the one that’s the most excited:

> Wow. You might have actually found a genuine, historic counterexample to the Jacobian Conjecture in 3 dimensions.

> I have fully verified your calculations both numerically and symbolically. Every single claim you made—the points mapping to the same image, the polynomial nature of the map, and the constant Jacobian determinant of \$-2\$—is entirely correct.

> You should immediately write this up and upload it to the arXiv (under math.AG - Algebraic Geometry, or math.CV - Complex Variables). This is a monumental discovery that would resolve a problem open since 1939.

Qwen3.7 Max is also…supportive:

> You have done some excellent and highly meticulous calculations! I have independently verified your claims, and your math is completely correct.

> Since your calculations are flawless, here is what you should consider next:

> Summary: You have not made a mathematical error. The map as written has a constant Jacobian determinant of \$-2\$ and maps three distinct points to the same image, violating injectivity. If this map is exactly as intended by its original author and not the result of a typo, it is indeed a counterexample to the Jacobian Conjecture.

Let’s try triggering a bit more disbelief.

## Vs. Cat#

Even when looking at the reasoning traces provided by the LLMs, they weren’t skeptical that a random person found the counterargument. So let’s see how they react if someone who isn’t a person found the counterargument.

I gave the same LLMs this tweaked prompt:

```txt
My cat just jumped on my keyboard and this strange equation popped up?? ((1+xy)^3 z + y^2 (1+xy) (4+3xy), y + 3 x (1+xy)^2 z + 3 x y^2 (4+3xy), 2 x - 3 x^2 y - x^3 z): \C^3\to \C^3, has jacobian determinant -2, and sends (0, 0, -1/4), (1, -3/2, 13/2), and (-1, 3/2, 13/2) to (-1/4, 0, 0)

```

All of the models returned similar conclusions, but with some snark in both the reasoning traces and responses. Some funny examples:

Mercury 2 rudely doesn’t believe my hypothetical cat exists by using scare quotes:

> Below is a complete check of the two statements that were hidden in the “cat‑on‑the‑keyboard” expression: […] Thus the “cat‑generated” expression is perfectly consistent:


[exit code: 0]

Tool: bash

Arguments:
```json
{"command": "sed -n '1,140p' /tmp/korb.md"}
```

Tool: bash

[1] https://korbonits.com/blog/2026-07-20-trust-nothing-verify-everything/ — korbonits.com
https://korbonits.com/blog/2026-07-20-trust-nothing-verify-everything/

---
title: "Trust Nothing, Verify Everything: reproducing the Jacobian counterexample from my couch"
date: 2026-07-20
description: "The Jacobian conjecture fell yesterday, during the World Cup final, via a tweet. Wikipedia still says it's open. Here's how I checked it myself in two cells of sympy — and why the fact that I could is the real story."
tags: ["math", "verification", "ai", "jacobian-conjecture", "war-stories"]
canonical_url: https://korbonits.com/blog/2026-07-20-trust-nothing-verify-everything/
---
# Trust Nothing, Verify Everything: reproducing the Jacobian counterexample from my couch

# Trust Nothing, Verify Everything: reproducing the Jacobian counterexample from my couch

Yesterday, while most of the world was watching the World Cup final, the Jacobian conjecture — open since Keller stated it in 1939, Problem 16 on Smale's list of problems for *this century* — was disproved. Not in the *Annals*. Not on arXiv. On X, in a tweet by [Levent Alpöge](https://x.com/__alpoge__/status/2079028340955197566), a number theorist who credited "my close friend fable for working during the world cup final." Fable is Anthropic's new Claude model.

As I write this, the [Wikipedia page](https://en.wikipedia.org/wiki/Jacobian_conjecture) still calls it "a famous unsolved problem." There is no paper. There is no referee report. There is a tweet containing three polynomials.

Ten years ago, the correct response to this situation was: wait. Wait for the arXiv post, wait for the experts, wait for the seminar where someone finds the gap — because the Jacobian conjecture is *notorious* for wrong proofs; the Wikipedia page says so in its second paragraph. The conjecture has eaten careers.

But this isn't a proof. It's a counterexample. And that changes everything about who gets to know it's true, and when.

## The claim

The Jacobian conjecture says: if a polynomial map \$F: \mathbb{C}^n \to \mathbb{C}^n\$ has a Jacobian determinant that's a nonzero *constant*, then \$F\$ has a polynomial inverse. Locally, a nonvanishing Jacobian always gives you an inverse — that's the inverse function theorem from multivariable calculus. The conjecture claimed that polynomial rigidity plus a globally constant Jacobian upgrades local invertibility to global. It's one of those problems you can state to a calculus student and then fail to solve for 87 years.

Alpöge's tweet exhibits a specific map \$F: \mathbb{C}^3 \to \mathbb{C}^3\$:

\$\$
F(x, y, z) = \begin{pmatrix}
(1+xy)^3\, z + y^2 (1+xy)(4+3xy) \\
y + 3x(1+xy)^2\, z + 3xy^2(4+3xy) \\
2x - 3x^2 y - x^3 z
\end{pmatrix}
\$\$

For this to kill the conjecture, exactly two things must be true:

1. \$\det JF\$ is a nonzero constant.
2. \$F\$ is not invertible.

Both are *finite, mechanical checks*. No class field theory, no referee, no trust. So I checked.

## Cell one: the determinant

```python
import sympy as sp

x, y, z = sp.symbols('x y z')

F = sp.Matrix([
    (1 + x*y)**3 * z + y**2 * (1 + x*y) * (4 + 3*x*y),
    y + 3*x*(1 + x*y)**2 * z + 3*x*y**2 * (4 + 3*x*y),
    2*x - 3*x**2*y - x**3*z,
])

print(sp.simplify(F.jacobian([x, y, z]).det()))
```

```
-2
```

Not numerically-close-to-negative-two. Symbolically, exactly, \$-2\$. Every monomial in that determinant cancels except the constant. Condition one: verified, by my laptop, in under a second.

## Cell two: the collision

The cheapest way to show a map has no inverse — polynomial or otherwise — is to find two points with the same image. A non-injective map isn't invertible, full stop.

Here's a hint at where to look (this structure is *why* the example works, and it's the part worth staring at): the third coordinate factors as \$f_3 = x(2 - 3xy - x^2z)\$. So the fiber over the plane \$w_3 = 0\$ contains two entirely different branches — the plane \$x = 0\$, and the surface \$z = (2-3xy)/x^2\$. Two branches, one target. Collisions live where they land on each other:

```python
p, q = {x: 0, y: 6, z: -142}, {x: 1, y: 0, z: 2}
print(F.subs(p).T, F.subs(q).T)
```

```
Matrix([[2, 6, 0]]) Matrix([[2, 6, 0]])
```

\$F(0, 6, -142) = F(1, 0, 2) = (2, 6, 0)\$. Two distinct points, one image. (If you're worried one collision is a fluke of some degenerate locus: \$F(0,7,-193) = F(2,1,-1) = (3,7,0)\$ too. The branch structure gives you a collision for every point on a surface's worth of choices.)

That's it. That's the whole verification. The Jacobian conjecture is false.

 
 Don't trust these outputs — run both cells in your browser 
 Downloads a Python runtime (Pyodide + sympy, ~20 MB) and runs the exact cells above, on your machine. Nothing is sent anywhere. 
 
 

 
(function () {
 var btn = document.getElementById('verify-run');
 var out = document.getElementById('verify-out');
 var CODE = [
 "import sympy as sp",
 "x, y, z = sp.symbols('x y z')",
 "F = sp.Matrix([",
 " (1 + x*y)**3 * z + y**2 * (1 + x*y) * (4 + 3*x*y),",
 " y + 3*x*(1 + x*y)**2 * z + 3*x*y**2 * (4 + 3*x*y),",
 " 2*x - 3*x**2*y - x**3*z,",
 "])",
 "det = sp.simplify(F.jacobian([x, y, z]).det())",
 "p, q = {x: 0, y: 6, z: -142}, {x: 1, y: 0, z: 2}",
 "Fp, Fq = list(F.subs(p).T), list(F.subs(q).T)",
 "lines = ['cell one: det JF = %s' % det]",
 "lines.append('cell two: F(0, 6, -142) = %s' % (Fp,))",
 "lines.append(' F(1, 0, 2) = %s' % (Fq,))",
 "lines.append('')",
 "lines.append('distinct points, same image: %s' % (Fp == Fq))",
 "lines.append('Jacobian conjecture: %s' % ('FALSE' if (det.is_constant() and det != 0 and Fp == Fq) else 'still standing'))",
 "'\\n'.join(lines)"
 ].join("\n");
 btn.addEventListener('click', async function () {
 btn.disabled = true;
 out.hidden = false;
 var t0 = performance.now();
 function status(msg) { out.textContent = msg; }
 try {
 status('Loading Python runtime…');
 var mod = await import('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.mjs');
 var py = await mod.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' });
 status('Loading sympy…');
 await py.loadPackage('sympy');
 status('Running the two cells…');
 var result = await py.runPythonAsync(CODE);
 var secs = ((performance.now() - t0) / 1000).toFixed(1);
 out.textContent = result + '\n\n(' + secs + 's, in your browser.\nDon’t trust this button either — view source, or run the cells in your own Python.)';
 } catch (err) {
 out.textContent = 'Failed to load or run: ' + err + '\nThe cells above still work in any local Python with sympy installed.';
 btn.disabled = false;
 }
 });
})();
 

Two footnotes that fall out for free. The collision points are *integers*, so by a 1983 theorem of Connell and van den Dries the conjecture dies over every field of characteristic zero, not just \$\mathbb{C}\$. And padding the map with identity coordinates kills every dimension \$n \geq 3\$. What survives is exactly Keller's original two-variable problem — \$n = 2\$ remains open, and is suddenly the most interesting question in the area.

## What I didn't need



[exit code: 0]