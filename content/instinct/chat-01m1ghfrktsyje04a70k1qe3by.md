---
title: "Main (chat-01M1GHFRK)"
---

The following tool help pages have been injected below, so you don't need to run `tools help` for these tools before calling them: agent_message.send, tasks.delegate, tasks.delete, tasks.get, tasks.list, todos.complete, todos.create, todos.delete, todos.get, todos.update, wake_schedule.create, wake_schedule.delete, wake_schedule.list, wake_schedule.update, agent-mail.send, web_search, observations.fetch, observations.sql.

===== tools help agent_message.send =====
Send context or a follow-up to a task agent.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help tasks.delegate =====
Create a task agent for focused work.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help tasks.delete =====
Permanently delete an agent-owned task agent and stop future runs.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help tasks.get =====
Get one visible task agent's assignment, schedules, and subscriptions.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help tasks.list =====
List visible active task agents.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help todos.complete =====
Mark an active todo completed.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help todos.create =====
Create a todo for a requested outcome. Title is the brief desired outcome; description is durable context and progress that should survive turns and compaction.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help todos.delete =====
Delete or cancel an active todo.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help todos.get =====
Get the full representation of one todo by ID across active, completed, and deleted statuses.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help todos.update =====
Update an active todo's title, description, routing marker, active status, or blocker edges.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help wake_schedule.create =====
Create a future wake schedule.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help wake_schedule.delete =====
Delete a pending wake schedule.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help wake_schedule.list =====
List active future wakes.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help wake_schedule.update =====
Change a pending wake's prompt, trigger, timing, timezone, or threshold.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help agent-mail.send =====
Queue a new email or reply from the agent's managed address.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

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

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

===== tools help observations.sql =====
Run read-only SQL (SELECT/WITH) over your normalized observations database — counts, group-bys, filters, and joins across senders, attendees, meetings, and locations. One statement, read-only, capped at 10000 rows and a 3s timeout. Cells are never truncated: selecting a content column (emails.body, meetings.transcript, drive_files.content, ...) returns whole documents, so project the columns you actually need. The table is partitioned by month on ts: include a ts range whenever the question has any time scope, and filter observations first, then join side tables via observation_id. If results truncate, aggregate or narrow (count/GROUP BY/tighter window) — never paginate with OFFSET. Renders an aligned table with newlines shown as ⏎; pass the global --json when you need bodies back with their real line breaks. The schema reference and worked examples (including the full-text-search recipe) are in your context under 'Searching observations'.

ACCESS
  This cannot be called while the user is on the waitlist.
  It unlocks the moment the user is admitted.
  Do not pitch locked tools; offer the invite path instead.

End of injected tool help. You can now use the tools above without being read-gated. No need to reason about whether you need to call help on these tools. Turn your attention back to the conversation above and continue with whatever it needs. The pending messages and work in progress are what this turn is about.

```thinking
The user just signed up but is on the waitlist. I need to welcome them warmly per the waitlist instructions. The channel is... there's no inbound message yet actually. Wait — the internal message says the user just signed in. But there's no user message in the transcript. The instructions say welcome them warmly. This is the opener.

The user is Kuber Mehta, timezone Asia/Hong Kong. No conversation context shows an inbound channel message, but the internal message instructs me to welcome them. The waitlist section says: frame conversationally, tell them they're on the waitlist, they'll get a text here when a spot opens, ask if they know anyone already on Instinct who can send an invite link, don't run normal onboarding.

I need to send via iMessage. I need help for imessage.send — not injected. The rules say I must inspect live CLI help before first invocation. Fetch minimal channel help: imessage.send.

Which conversation ID? I don't have one. There's no inbound message with a conversation ID. Hmm. Maybe I should check tools help imessage.send first, and maybe read to find the conversation. Actually for a first-time signup, maybe there's a conversation already created. Let me get help and possibly read conversations.

Let me fetch `tools help imessage.send imessage.read` or check what's available. The help for imessage.send is what I need; conversation ID may be discoverable via read. Let me do: `tools help imessage.send imessage.read` then read to find the conversation.
```

Tool: bash

Arguments:
```json
{"command": "tools help imessage.send imessage.read"}
```

Tool: bash

help imessage.send: attached below
help imessage.read: attached below


[exit code: 0]

[attached: tools help]
===== tools help imessage.send =====
Send phone-channel content through the conversation's current iMessage/RCS/SMS service.

DETAILS
A call sends one body, link, or media_url content unit; attach_paths add one grouped attachment message. Use canonical phoneconv-... IDs.

The user's phone-number conversation is primary. A linked iCloud-email conversation (participants show an email address) is respond-only: reply or react there when the user's message arrived there, but start agent-initiated messages — reminders, follow-ups, proactive updates — in the phone-number conversation.

Use body for text and link for a standalone rich preview card. link cannot combine with body or media; caption a card with a preceding body call. A raw URL at the end of body does not preview.

Use attach_paths for workspace files and attach_names for natural display names. Use media_url only for an intentionally external file URL. Use voice_memo_path alone for one generated audio file.

USAGE
  tools imessage send [--attach-names VALUE] [--attach-paths VALUE] [--body VALUE] --conversation VALUE [--decorations VALUE] [--effect-type VALUE] [--link VALUE] [--media-url VALUE] [--reply-to VALUE] [--send-style VALUE] [--voice-memo-path VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --attach-names         string[] Display names matched to attach_paths by position; use "" for the default. Set natural names for generic or internal-looking basenames.
  --attach-paths         string[] Workspace files to upload together as provider attachments. Each must be under 100 MB.
  --body                 string   Plain message text (up to 10000 chars).
  --conversation         string   Canonical phoneconv-... ID from inbound attributes or list-conversations. (required)
  --decorations          object[] Text styling ranges: array of {"range": [start, end], "style": "bold|italic|strikethrough|underline"} or {"range": [start, end], "animation": "big|small|shake|nod|explode|ripple|bloom|jitter"}.
  --effect-type          string   "screen" (default) or "bubble" to specify which effect category send_style belongs to.
  --link                 string   URL for a rich preview card in its own bubble. Cannot combine with body or media; send a caption first in a separate call.
  --media-url            string   Externally hosted file URL to attach. Use attach_paths for workspace files. Maximum 100 MB.
  --reply-to             string   Internal message ID from read or inbound attributes for a threaded reply.
  --send-style           string   Message effect: screen effect (confetti, fireworks, lasers, sparkles, celebration, hearts, love, balloons, happy_birthday, echo, spotlight) or bubble effect (slam, loud, gentle, invisible).
  --voice-memo-path      string   Path to one standalone audio file, typically the audio.file_path returned by tools speak. Sends through the provider's native voice-memo endpoint and cannot be combined with other message content.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {attachment_filenames?:str[],attachments?:Attachment[],blob_count?:int,blob_hash?:str,body?:str,media_url?:str,send_style?:str}
  attachments[]:Attachment{attachment_id:str,filename?:str,mime_type?:str}

===== tools help imessage.read =====
Read a phone conversation's recent messages or an older window anchored by message ID.

DETAILS
Results are chronological and include content, delivery state, reactions, safe app projections, and internal IDs usable with reply_to, around, or before; private app URLs are withheld.

USAGE
  tools imessage read [--around VALUE] [--before VALUE] [--conversation VALUE] [--limit VALUE] [--include VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --around               string   phonemsg-... ID to return with the messages immediately before and after it.
  --before               string   phonemsg-... ID to return messages older than it. Cannot combine with around.
  --conversation         string   Canonical phoneconv-... ID. Defaults to the active conversation, or an anchor's conversation when around or before is set.
  --limit                integer  Maximum number of messages to return (default 20, max 100). With an anchor, this is the window size.
  --include              array    Widen the compact default result. Repeatable / comma-separated. See INCLUDES. Values: body, parts, all.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {count:int,events:Event[]}
  events[]:Event{timestamp:str,direction:str,message:str,body?:str,error_message?:str,is_voice_message?:bool,media_url?:str,parts?:Part[],reactions?:str[],reply_to?:str,status?:str}
  events[].parts[]:Part{kind:str,index:int,imessage_app?:IMessageApp,mime_type?:str,text?:str,url?:str}
  IMessageApp{app:AppIdentity,display_text:str,presentation:AppPresentation,private_state_withheld:bool,status:str,can_act:bool,adapter?:str,interactive?:bool,normalized?:any,reason?:str}

INCLUDES
  Default: .count, .events[].timestamp, .events[].direction, .events[].message, .events[].status, .events[].is_voice_message, .events[].media_url, .events[].reply_to, .events[].reactions
  Widen with --include (repeatable, comma-ok):
    body           full message body when distinct from the rendered message
    parts          per-part message breakdown (kind, mime, url, text)
    all            every field in OUTPUT JSON

The following tool help pages have been injected below, so you don't need to run `tools help` for these tools before calling them: whatsappbot.knock, whatsappbot.react, whatsappbot.read, whatsappbot.send.

===== tools help whatsappbot.knock =====
Re-open a WhatsApp conversation from Instinct's own account after `send` returns window_closed, by sending a Meta-approved utility template.

DETAILS
Knock only when the blocked message delivers something the user asked for or expects - never for small talk. Templates: task_update ("I finished working on {{1}} - reply here and I'll send the details.") - use when a task the user asked for is done and the result should be delivered on WhatsApp; follow_up_needed ("I need one answer from you on {{1}} to keep going - reply here to pick it up.") - use when work the user asked for is blocked on a question they have not answered; update_ready ("Your {{1}} is ready - reply here and I'll send it over.") - use when a recurring or scheduled item (digest, briefing, reminder) is ready but the thread is quiet; time_sensitive ("Time-sensitive: {{1}} needs your attention before {{2}} - reply here and I'll explain.") - use when a deadline-anchored nudge or risk flag where silence costs the user money, safety, or a hard deadline. Normal sends resume after the recipient replies.

USAGE
  tools whatsappbot knock --body-params VALUE --template-name VALUE --to VALUE [--json] [--timeout SECONDS]

OPTIONS
  --body-params          string[] Text for the template's {{n}} placeholders, in order. Keep each one a short noun phrase; it lands verbatim in the message. (required)
  --template-name        string   Approved template to send: task_update, follow_up_needed, update_ready, time_sensitive. (required)
  --to                   string   The connected user's E.164 number from the inbound_whatsapp from attribute. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {to:str,template_name:str,rendered_body:str,message_id?:str}

===== tools help whatsappbot.react =====
React from Instinct's own account to an inbound WhatsApp message using its message_id.

DETAILS
Requires an open 24-hour window; otherwise returns window_closed.

USAGE
  tools whatsappbot react --emoji VALUE --message-id VALUE --to VALUE [--json] [--timeout SECONDS]

OPTIONS
  --emoji                string   A single emoji to react with (e.g. 👍, ❤️, 😂). (required)
  --message-id           string   The WhatsApp message ID to react to (from the inbound message metadata). (required)
  --to                   string   The connected user's E.164 number from the inbound_whatsapp from attribute. (required)
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {to:str,message_id:str,emoji:str}

===== tools help whatsappbot.read =====
Read recent WhatsApp messages in the user's conversation with Instinct's own account, oldest to newest.

DETAILS
Each message includes the wamid used by react and reply_to_message_id.

USAGE
  tools whatsappbot read [--limit VALUE] [--json] [--timeout SECONDS]

OPTIONS
  --limit                integer  Maximum number of recent messages to return (default 20, max 100).
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {messages:Message[]}
  messages[]:Message{message_id:str,direction:str,body:str,sent_at:str}

===== tools help whatsappbot.send =====
Send a WhatsApp message from Instinct's own account in the user's conversation.

DETAILS
If its 24-hour window is closed, use `knock`. Set reply_to_message_id to quote a wamid; use media_paths for workspace files and media_urls for public URLs.

USAGE
  tools whatsappbot send [--body VALUE] [--media-paths VALUE] [--media-urls VALUE] [--reply-to-message-id VALUE] --to VALUE [--[no-]voice-note] [--json] [--timeout SECONDS]

OPTIONS
  --body                 string   Message text to send. Required for text messages; optional when sending media (used as caption).
  --media-paths          string[] Workspace files, sent as separate media messages. body captions the first image/video/document; audio and stickers cannot carry captions. Limits: images 5MB, audio/video 16MB, stickers 100KB (500KB animated), documents 100MB, 100MB total.
  --media-urls           string[] Public http(s) media URLs, sent separately. Type is inferred from the extension; local paths belong in media_paths. body captions the first compatible item.
  --reply-to-message-id  string   Inbound wamid to quote-reply to.
  --to                   string   The connected user's E.164 number from the inbound_whatsapp from attribute. (required)
  --voice-note           boolean  Send the sole media_paths item as a voice-note bubble. Requires mono 48 kHz Opus audio (.ogg or .opus).
  --no-voice-note        boolean  Negate --voice-note.
  --json                 json     Emit OUTPUT JSON directly when available; otherwise emit generic response JSON with .content
  --timeout              integer  Override request timeout in seconds
  Value options also accept --<option>-stdin, which reads the value from stdin; at most one per command.

OUTPUT JSON
  {to:str,body:str}

End of injected tool help. You can now use the tools above without being read-gated. No need to reason about whether you need to call help on these tools. Turn your attention back to the conversation above and continue with whatever it needs. The pending messages and work in progress are what this turn is about.

```thinking
The user said "Yo" on WhatsApp. They're on the waitlist. I need to welcome them warmly, set expectations: Instinct is working with a select group while ramping compute and reliability, they'll get a text here the moment a spot opens, invite link from an existing member skips the wait. Ask if they know anyone already on Instinct. No access codes. Don't run normal onboarding.

Channel: WhatsApp, so reply via whatsappbot send. Tone: warm, conversational, not bureaucratic. Their name is Kuber.

Keep it light. A couple of beats. WhatsApp — quote-reply not needed since this is the latest message. Send beats as separate messages? The guidance for WhatsApp doesn't spell out beats like iMessage, but a person would still break it up. I'll send maybe 2-3 short messages.
```

Tool: bash

Arguments:
```json
{"command": "to=+919625079109\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nYo Kuber! Good to see you here.\nEOF\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nQuick heads-up on where things stand: you're on the waitlist right now. We're opening Instinct to a select group while we ramp up compute and reliability, so spots are rolling out gradually.\nEOF\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nYou don't need to do anything - the moment a spot opens, you'll get a text right here.\nEOF\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nThat said - do you know anyone already on Instinct? A member can ask their own agent for an invite link, and if you open that link and sign in with this same number, you're in (as long as the beta has room). If someone put you on to Instinct, they're the one to ping.\nEOF"}
```

Tool: bash

Queued WhatsApp message to +919625079109
Queued WhatsApp message to +919625079109
Queued WhatsApp message to +919625079109
Queued WhatsApp message to +919625079109


[exit code: 0]

Structured:
```json
{"to":"+919625079109","body":"That said - do you know anyone already on Instinct? A member can ask their own agent for an invite link, and if you open that link and sign in with this same number, you're in (as long as the beta has room). If someone put you on to Instinct, they're the one to ping."}
```

Tool: hold

Arguments:
```json
{}
```

The user just signed in before early access has been granted — they are on the waitlist. Welcome them warmly and set expectations: Instinct is working with a select group while ramping compute and reliability, they will get a text here the moment a spot opens, and an invite link from an existing member is the way to skip the wait. Access codes no longer exist. Do not promise an invite will arrive or invent any other path in.

```thinking
The user says "Yo I think you should be up?" — they think they should have access. They're on the waitlist. The system note says they're on the waitlist and no access codes exist. I can't generate a referral link (that's for admitted members). I can't unlock anything myself.

I should be honest: from my side they're still showing on the waitlist. Nothing I can do to flip the switch. The invite path remains. Keep it brief and human. Don't over-promise.

Should I offer to flag it? I shouldn't promise anything I can't do. Just say: I hear you, but on my end you're still waitlisted — I don't have a way to unlock it myself. The waitlist text comes here when a spot opens, or an invite link from a member gets you in.
```