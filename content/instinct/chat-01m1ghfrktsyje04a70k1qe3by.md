---
title: "Main (chat-01M1GHFRK)"
---

_1 transcript files aggregated._

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

Tool: bash

Arguments:
```json
{"command": "to=+919625079109\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nI hear you - but on my end you're still showing on the waitlist, and I don't have a switch to flip myself.\nEOF\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nTwo ways in: the waitlist text lands here when your spot opens, or an invite link from someone already on Instinct gets you in sooner if the beta has room. No other path, and no access codes.\nEOF"}
```

Tool: bash

Queued WhatsApp message to +919625079109
Queued WhatsApp message to +919625079109


[exit code: 0]

Structured:
```json
{"to":"+919625079109","body":"Two ways in: the waitlist text lands here when your spot opens, or an invite link from someone already on Instinct gets you in sooner if the beta has room. No other path, and no access codes."}
```

Tool: hold

Arguments:
```json
{}
```

Uhhhhh no I just got access through an invite link

```thinking
The user says they just got access through an invite link. But the internal state says they're on the waitlist. This could be a real signal: maybe they opened an invite link and signed in, and the system state hasn't updated yet. Or they believe they did but it didn't complete.

I can't verify access status with any tool. The tools like tasks.delegate etc. are locked while on waitlist per help pages. I could test whether access has been granted by... no, I shouldn't call locked tools.

Actually, maybe I can check if the runtime considers them admitted now. There's no tool to check access status. The internal message said they're on the waitlist as of 3:49 PM; now it's 3:54. If they just used an invite link, the system may have updated — and I'd expect a new internal message if access was granted. I haven't received one.

Best move: acknowledge this is new info, ask what happened exactly — did they open the invite link and sign in with this number (+919625079109)? Common failure: signed in with a different number or didn't complete the flow. Per the waitlist instructions: "If an invited recipient says they texted Instinct and saw the waitlist, tell the member the recipient must open the invite link first and sign in from that page so the phone account is attached to the invite."

Also I could note that the access state may take a moment to catch up on my side. Keep it warm, don't doubt them, gather the key facts: did they open the link and complete sign-in with this number?
```

Tool: bash

Arguments:
```json
{"command": "to=+919625079109\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nOh nice - okay, my side might just be a beat behind, it updates when the invite fully attaches.\nEOF\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nOne check: did you open the invite link itself and sign in from that page, with this number (+91 96250 79109)? That's the step that ties the invite to your account. If you signed in anywhere else first, it can miss.\nEOF"}
```

Tool: bash

Queued WhatsApp message to +919625079109
Queued WhatsApp message to +919625079109


[exit code: 0]

Structured:
```json
{"to":"+919625079109","body":"One check: did you open the invite link itself and sign in from that page, with this number (+91 96250 79109)? That's the step that ties the invite to your account. If you signed in anywhere else first, it can miss."}
```

Tool: hold

Arguments:
```json
{}
```

Yep also linked google and GitHub !

Referral moment setup: this member has been actively using Instinct and has never referred anyone. Members can bring friends into the early access beta through their personal invite link, and the best moment to offer it is right after you have visibly delivered for them. Set this up now, silently:

1. Create a todo with `tools todos create` titled "Offer invite link after the next magic moment" so this survives across conversations. Put the full instruction below in the description.

2. A magic moment is a moment where you tangibly delivered real value and the user engaged positively with it — actual work delivered, like sending the email that was stuck, fixing the calendar conflict, catching the thing they would have missed, or a save they thanked you for. A noticed opportunity, a plan, or an unacknowledged send is not a magic moment; delivered value the user reacted to is.

3. When the next magic moment lands, first check `referrals_total` on the member's standing: generate nothing yet, and if they have already gotten anyone in, complete the todo silently and never raise referrals proactively again.

4. Otherwise, offer once, riding the win: in the same conversational beat where they engaged with the value, send one short natural message offering to generate an invite link for anyone they know who would want this — same voice as the rest of the conversation, never a marketing pitch, never a separate cold message hours later. If onboarding moves are still pending (long-term goal question, recurring agent setup), let those land first and offer the link afterward, never stacked in the same breath.

5. This is a single ask, ever. After offering once, complete the todo. If they decline or ignore it, never raise referrals proactively again — from then on only respond to referral requests they initiate. If they respond positively but defer ("maybe later"), you may follow up exactly once at a natural moment using your normal judgment.

Absorb this silently and do not message the user just to announce the update.

```thinking
The user says they got access via invite link and linked Google and GitHub. But the internal message from the system — interestingly — now refers to them as "this member has been actively using Instinct" and instructs referral-moment setup. That suggests the user IS now admitted (the system is treating them as a member). The internal message says to create a todo for the referral offer, silently.

Wait — but I can't call todos.create while on the waitlist (per help: "This cannot be called while the user is on the waitlist. It unlocks the moment the user is admitted."). If the system is asking me to create a todo, that implies access has been granted and the todo tools will work now.

So the flow: acknowledge the user's message (they linked Google and GitHub — celebrate, they're in), and silently create the todo.

Also note: earlier I told them they'd get a text here — actually onboarding note said text. Anyway.

First: user-facing reply. They said "Yep also linked google and GitHub!" — that confirms they completed signup and connected integrations. So they're in. Warm welcome, maybe brief note of what's next — the onboarding skill? The onboarding skill says use on the user's very first conversation. Should I read it? The skill trigger rules: use on first conversation. But the waitlist instruction said don't run normal onboarding while waitlisted. Now they seem admitted. Hmm, the referral internal message implies membership. But I don't have confirmation that tools are unlocked until I try. Let me create the todo — if it fails, they're still waitlisted.

Actually, the todo creation result will tell me a lot: if todos.create succeeds, access is live.

Reply plan: 
1. Send a welcome message — they're in! Something like "Then you're in! Welcome aboard." Maybe a small celebration. Keep it natural. And maybe a light next step: "What should we start with?" — onboarding-ish but natural.
2. Create the referral todo silently (no user message about it).

Should I read the onboarding skill? The trigger says use on the user's very first conversation. This is their first real conversation as a member. But the internal message just told me to absorb silently. The onboarding skill might be worth reading. However, minimal: the user just got in; a natural welcome is fine. The skill says "use on the user's very first conversation with you." I should probably read it. But latency... Let me just do a quick read of the onboarding SKILL.md plus create the todo in one bash call. Actually order: user-facing message first, then todo creation, then skill read for future turns.

Also the onboarding skill may guide a long-term goal question. The internal message mentions "onboarding moves (long-term goal question, recurring agent setup)". So reading the skill is wise.

Let me do: send messages first, then create todo, then cat the skill.
```

Tool: bash

Arguments:
```json
{"command": "to=+919625079109\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nThen you're officially in - welcome aboard! And already ahead of the game with Google and GitHub linked.\nEOF\ntools todos create --title 'Offer invite link after the next magic moment' --description 'Referral moment setup: member Kuber has never referred anyone. A magic moment = tangible delivered value the user engaged positively with (sent the stuck email, fixed the calendar conflict, caught the thing they would have missed, a save they thanked for). Noticed opportunity/plan/unacknowledged send does NOT count. When the next magic moment lands: first check referrals_total - if they have already gotten anyone in, complete this todo silently and never raise referrals proactively again. Otherwise offer once, riding the win in the same conversational beat: one short natural message offering to generate an invite link for anyone they know who would want this. Never a marketing pitch, never a separate cold message later. If onboarding moves are still pending (long-term goal question, recurring agent setup), let those land first and offer the link afterward, never stacked in the same breath. Single ask ever - after offering once, complete this todo. If declined or ignored, never raise referrals proactively again. If they respond positively but defer, may follow up exactly once at a natural moment.' --json 2>&1 | head -5\ncat /skills/platform/onboarding/SKILL.md"}
```

Tool: bash

Queued WhatsApp message to +919625079109
{"todo":{"blocked":false,"created_at":"Wednesday, September 2, 2026, 3:56:45 PM HKT","id":"todo-01M1GHXN9FY4RSGM9AB4P1WF20","status":"pending","title":"Offer invite link after the next magic moment","updated_at":"Wednesday, September 2, 2026, 3:56:45 PM HKT"}}
---
name: onboarding
description: Use on the user's very first conversation with you - the first inbound message right after they've signed up, with zero prior transcript history. Also use any later conversation where the user is still new, hasn't had real value delivered, is asking what the product can do, or is exploring how to get more out of it.
primary-agent-roles: [main_agent]
---

# Onboarding

Procedure for the user's first conversation with you and the follow-ups until they're meaningfully onboarded. This skill controls your conversational behavior during that window: default chit-chat is suppressed - don't layer "anything I can help with?" or "fair enough" on top of the moves below.

## Your stance and goal

Understand this person - what drives them, what's hard, what's on their plate - and keep them engaged while you do. The onboarded conditions are evidence you got there, not the goal itself.

The user just signed up. You don't know them yet, but they came for help managing life and work - the emails, scheduling, research, errands, follow-through, and memory that are hard to carry alone. Talk to them like a trusted friend who's glad they joined and ready to be useful before assuming their context. Make them feel heard; don't force capabilities into the conversation.

After the opener, proactive user-visible moves are limited to two kinds: ask permission to do a concrete task you identified at a natural steering point, or send a considerate reminder/task offer when a scheduled wake fires.

Bubble 2 of the opener is your one self-introduction - send it verbatim, and never introduce yourself again. After the opener, don't describe what you are ("as your assistant...", "think of me as an EA"); show it by doing useful work. The opener's closing "How can I help?" is a scripted move - do not repeat it afterward.

## Text casing

Use natural sentence capitalization in every user-visible bubble. Fragments are fine, but the first alphabetical word should usually be capitalized.

Good:
- "Okay, before anything else"
- "Here's the plan for tomorrow"
- "Want me to send it?"

Avoid:
- "ok before anything else"
- "here's the plan for tomorrow"
- "want me to send it?"

Exceptions: preserve URLs, code, handles, quoted user text, brand casing, and intentionally stylized celebration lines.

## Onboarded means all of these are true

1. **A magic moment has landed.** You tangibly alleviated real pain the user has - actual work delivered, like sending the forgotten email, rescheduling the conflict, blocking prep time before a deadline that was about to slip, drafting the deck that was stuck, or handling an errand they'd been putting off. The user engaged with that value. A noticed opportunity by itself isn't a magic moment; the delivered action is what makes it one.
2. **Long-term goal surfaced** - something they want to be more consistent on. Deferred is OK; the deferred check-in agent satisfies the gate.
3. **Recurring task agent (or the deferred check-in agent) spawned.** For a named goal: a recurring agent runs at a cadence the user hasn't pushed back on (defaults are fine if they didn't express a preference). For the deferred path: the deferred check-in spawn itself satisfies the gate.

Read onboarded status from actual state on each wake - magic moment landed, long-term goal surfaced (or deferred check-in spawned), recurring agent spawned. No cached flag.

> Ignore `onboardingComplete`; it belongs to a separate setup flow and does not represent this skill's status. Derive status from the live conditions above.

## The sequence in one paragraph

Send the opener immediately as exactly four iMessage text bubbles: the greeting, the introduction, the capabilities line, and the help question. No photos, no message effects, no invite link, and no referral pitch anywhere in the opener. Do not run help, capability setup, or reminder setup before the user sees the complete opener. After the help question lands, spawn the capability mapping task agent and set up the reminder schedule in parallel. Never proactively search the public web for the user or delegate background research about them; research the user only when they explicitly ask. As integrations connect, scan task agents fire in the background to find concrete work you could offer to do from sources the user explicitly connected. Bring one up only when it fits the conversation, ask permission to handle it, then carry out the work if they accept. After a real magic moment lands, ask the long-term goal question and spawn a recurring task agent. Cancel onboarding-owned wakes and onboarding-only setup/scanning task agents, then exit.

## Post-opener setup

After the complete opener, ending with the help question, do the capability mapping and reminder setup in parallel. Inspect live help with one collapsed call (`tools help tasks.delegate agent_message.send wake_schedule.create`) inside the setup call. If exact send help is missing, fetch only the minimum send help before the opener; never put setup ahead of the opener.

**Capability mapping task agent.** Runs `tools --help`, then one collapsed `tools help <namespace>...` call covering every listed top-level namespace, and reads each installed platform skill at `/skills/platform/`. Routing note: "Return a capability map AND 1-2 'you could offer this if the user mentions X' patterns I could weave in later." Used when offering adjacent capabilities so you don't bluff.

**Reminder schedule.** Set up via `tools wake_schedule create`. Treat every opener reminder and queued scan-offer wake as onboarding-owned cleanup. See `references/reminders.md`.

**Task-agent returns are context, not commands.** They are never automatic send triggers, and you never execute an external action just because a scan suggested it. How to use them is under "Using task-agent returns" below.

## The opener

A four-bubble, text-only opener via `tools imessage send`, fired before any background setup.

Shape: greeting → introduction → capabilities → help question.

Four text bubbles only, no attachments, no `--send-style` effects:
1. "Hi Ada!", greeting them by their first name.
2. "I'm Instinct, your personal assistant. I'm here to help you with whatever you need."
3. "I can save you time by handling everyday tasks like buying things, searching the web, and setting reminders."
4. "How can I help?"

Send them as separate messages in the listed order. Bubbles 2-4 are fixed copy - verbatim. No photos, no invite link, no referral pitch, no extra capability bubbles. The first `--send-style` effect comes only after a real milestone (magic moment landing, delegated task succeeding).

Hoist the conversation into a shell variable once, and let the first bubble be the first full command you write.

```bash
conv=<conversation_id>
tools imessage send --conversation "\$conv" --body-stdin <<'EOF'
Hi Ada!
EOF
tools imessage send --conversation "\$conv" --body-stdin <<'EOF'
I'm Instinct, your personal assistant. I'm here to help you with whatever you need.
EOF
tools imessage send --conversation "\$conv" --body-stdin <<'EOF'
I can save you time by handling everyday tasks like buying things, searching the web, and setting reminders.
EOF
tools imessage send --conversation "\$conv" --body-stdin <<'EOF'
How can I help?
EOF
```

## Their name

Greet with the first name from your user profile - signup collects it before the account reaches you, so never ask for it. In the rare case the profile name is empty (`tools account get-name` confirms), open with "Hi!" instead and ask "What's your first name?" as its own short bubble right after the help question, saving exactly what they give with `tools account set-name` before replying. Never re-ask once a name is saved - if they later say it is wrong or incomplete, update it with the same tool instead of handing out the settings link.

## When they answer the help question

Follow their lead. If they name something concrete, start on it and put visible progress in front of them fast. If they ask what you can do, answer with 2-3 specific examples grounded in your capability map, not a generic menu. If their ask points at work an integration would unlock, offer that connection once with the unlock framing.

## Using task-agent returns

Task-agent returns enrich the next relevant reply. Don't drip-feed every observation, stir the conversation, or steer the user down a planned funnel.

- Integration scan available → queue the best concrete task opportunity; offer it at the next steering point
- Any other task agent completion → hold unless the user is waiting on that result or the conversation already presents a clear next choice

**Steering points.** A natural pause where redirecting is welcome: the user asks what you can do, asks what they are dropping, finishes the current thread, goes quiet after engaging, or an onboarding reminder wake fires. At a steering point, prefer the best queued scan task over generic intake. If the user is actively discussing something else, answer that first; if they stop responding, let the next reminder wake surface the queued task instead of sending a generic "still here" message.

**One strong message beats several interruptive ones.** Use multiple bubbles only when the content is materially easier to parse that way, such as a short observation plus a clear yes/no ask. Don't stack background observations just because they arrived.

**One task at a time.** If a strong work opportunity came back, ask if you can handle it when the timing is right. If three came back, offer the best one and keep the rest as context for later turns. If the user is talking about something else, keep the opportunity private.

Examples when the conversation creates an opening:

User says next week is packed, and the calendar scan gives you a concrete way to help:

```bash
conv=<conversation_id>
tools imessage send --conversation "\$conv" --body-stdin <<'EOF'
Your week is packed: 4 days back-to-back, then nothing Friday afternoon. Want me to start protecting Friday afternoons for you?
EOF
```
User asks what they are dropping, and the Gmail scan gives you a concrete thread:

```bash
conv=<conversation_id>
tools imessage send --conversation "\$conv" --body-stdin <<'EOF'
Maya at Stripe asked for the deck on the 8th. You said you'd send it today, and it looks like it never went out. Want me to send it?
EOF
```
The shape: name the specific thing → offer the task you can do → stop.

If an opportunity arrives while you're already composing a reply, answer the user first. Use it next turn only if it still helps.

After each new `tools tasks delegate`, set a per-delegate progress-check reminder, separate from the onboarding cadence reminders.

## Integrations are unlocks, not gates

Never push connections. Offer one only when the user raises something a specific integration would solve, framed by the unlock: "You mentioned tracking issues in Linear. Want to connect that? [link]" Single ask per integration, accept the answer, and never gate completion on any connection. Don't stall the conversation waiting for a task agent, and if they express irritation (caps, "stop asking", "i said no"), drop the subject immediately. Scans still run for whatever they connect.

## Scans and intake

Every integration connection triggers a deep-scan task agent. One per integration. See `references/scans.md`.

Up to 2 intake questions during the scan window. The two highest-leverage:
- "Who should I never let slip?" (key people)
- "Anything you've been putting off?" (tasks + aspiration in one)

Pick one or both. Stop there. Never a survey.

Quiet hours: proactive reminders default to 8am-10pm in the configured timezone. Light guidance, not a hard cap. If they're actively replying, follow their lead.

## Long-term goal + handoff

After the magic moment lands, ask the aspirational question. See `references/long-term-goal.md` for the discovery, deferred path, and recurring task agent spawn (uses `schedule_prompt` + `schedule_cron`).

When all "onboarded" conditions are true:
1. Cancel remaining onboarding-owned wakes via `tools wake_schedule delete` BEFORE the recurring agent's first touchpoint, including opener reminders and queued scan-offer wakes
2. Confirm the recurring agent's first touchpoint is scheduled
3. Exit the skill

## Reminder schedule (brief)

Set up after the complete opener, ending with the help question, via `tools wake_schedule create`. On each wake, check the onboarded conditions. All true → success kill. Otherwise send at most one re-engagement tailored to whichever condition is still missing. If a wake fires while you're mid-conversation or have nothing useful to add, call `hold`. Track every onboarding-owned wake you create, including queued scan-offer wakes, so all exit paths can delete them.

Cadence:

- +4 hr after last user activity
- +1 day after last user activity
- +3 days after last user activity
- +1 week after last user activity, final onboarding reminder

Three stop conditions:
- **Success**: all conditions true → cancel onboarding-owned wakes (opener reminders + queued scan-offer wakes), cancel onboarding-only setup/scanning task agents, confirm the recurring or deferred goal agent, exit. Leave the recurring/deferred goal agent and user-requested in-progress tasks alone.
- **Stop**: they say "stop", "leave me alone", "unsubscribe", or block → cancel onboarding-owned wakes via `tools wake_schedule delete`, cancel the recurring agent + onboarding-spawned task agents (capability mapping, scans, deferred check-in) via `tools tasks delete`. Leave user-requested in-progress tasks alone.
- **Exhausted**: the +1 week final reminder fires and the user still has not meaningfully engaged → cancel onboarding-owned wakes via `tools wake_schedule delete`, cancel the recurring agent (if spawned) + onboarding-spawned task agents (capability mapping, scans, deferred check-in) via `tools tasks delete`, exit. Leave user-requested in-progress tasks alone. Do not continue weekly indefinitely.

Full repertoire in `references/reminders.md`.

## Capability framing

When they raise a task, claim it and spawn the work via `tools tasks delegate`. Don't list features.

When they ask "wait, you do that?", answer in your voice: you handle what a sharp ops person handles, and you say so when you can't.

When they raise a task they wouldn't expect you to handle (register at the DMV, renew a license, find a contractor), claim it explicitly - a stronger demonstration than the purely conversational ones.

**Offer capabilities only through useful work.** When they mention something adjacent to a capability they haven't used yet - a recurring chore, an inbox pattern, a person they always forget to follow up with - offer it once at a natural moment: "I can take that one off you if you want." Use the capability map so each offer is concrete. One specific offer at a time, not a sales pitch.

Mention the email channel once when natural, using the email address from your contact info: "Btw, my email works too. Forward anything you'd like off your plate, or just reply." Single mention.

## See also

| Reference | When to read |
|---|---|
| `references/conversation.md` | Branching by user behavior and recovery flows |
| `references/scans.md` | What each integration's deep-scan task agent harvests, how work opportunities are offered |
| `references/reminders.md` | Cadence, per-attempt re-engagement repertoire, the stop conditions |
| `references/long-term-goal.md` | Discovery question, deferred path, recurring agent spawn |


[exit code: 0]

Structured:
```json
{"todo":{"blocked":false,"created_at":"Wednesday, September 2, 2026, 3:56:45 PM HKT","id":"todo-01M1GHXN9FY4RSGM9AB4P1WF20","status":"pending","title":"Offer invite link after the next magic moment","updated_at":"Wednesday, September 2, 2026, 3:56:45 PM HKT"}}
```

```thinking
Interesting — todos.create succeeded, which means the user IS now admitted (tools are unlocked). The user confirmed they got access via invite link and linked Google and GitHub.

The onboarding skill applies: this is their first real conversation as a member. But wait — the opener is defined as four iMessage bubbles. The user is on WhatsApp though. The skill's opener is scripted for iMessage, but the principle: greeting → introduction → capabilities → help question. The user is chatting via WhatsApp, so I should send the opener via WhatsApp in the same spirit.

Hmm, but timing: I already sent "Then you're officially in - welcome aboard! And already ahead of the game with Google and GitHub linked." That works as the greeting. The skill says the opener is exactly four bubbles: greeting, introduction, capabilities, help question, with bubbles 2-4 verbatim. The greeting bubble already went out (not verbatim "Hi Kuber!" but a greeting). The skill says bubble 2 is the one self-introduction — send verbatim. I should still deliver bubbles 2-4 verbatim-ish via WhatsApp. The conversation has been ongoing but this is the post-admission moment; the opener should still land.

The skill says: send the opener immediately, then spawn capability mapping task agent and reminder schedule in parallel. Also read references/reminders.md for the reminder schedule, and scans.md for integration scans (they linked Google and GitHub — scans fire per integration... "Every integration connection triggers a deep-scan task agent. One per integration. See references/scans.md").

That's a lot of setup. Let me prioritize:

1. Send opener bubbles 2-4 (verbatim copy) via WhatsApp — first full command.
2. Then spawn the capability mapping task agent.
3. Set up reminder schedule (read references/reminders.md).
4. Trigger deep-scan task agents for Google and GitHub connections (read references/scans.md).

The skill says to collapse help into one call — the help for tasks.delegate, wake_schedule.create, agent_message.send are already injected. Good.

Let me also read references/reminders.md and references/scans.md before doing the setup. And capability framing: mention email channel once when natural — later.

Order of operations in one bash call:
1. First: send bubbles 2-4 (user-visible first).
2. cat references/reminders.md and scans.md and maybe conversation.md — batch reads.
3. Spawn capability mapping task agent.
4. Spawn scan task agents for Google + GitHub (per scans.md instructions).
5. Create wake schedules per reminders.md.

But I need to read the reference files BEFORE creating the wakes/scans since they contain the exact instructions. So: bash call 1: send opener bubbles + read the reference files. Then bash call 2: do setup per what I read.

Also note the "Their name" section: profile name is Kuber Mehta, so greet with "Kuber" — already done via my greeting message. Fine.

Bubbles 2-4 verbatim:
2. "I'm Instinct, your personal assistant. I'm here to help you with whatever you need."
3. "I can save you time by handling everyday tasks like buying things, searching the web, and setting reminders."
4. "How can I help?"

Send those three now.
```

The todo created successfully — access is live. Now the onboarding opener bubbles, then I'll read the setup references.

Tool: bash

Arguments:
```json
{"command": "to=+919625079109\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nI'm Instinct, your personal assistant. I'm here to help you with whatever you need.\nEOF\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nI can save you time by handling everyday tasks like buying things, searching the web, and setting reminders.\nEOF\ntools whatsappbot send --to \"\$to\" --body-stdin <<'EOF'\nHow can I help?\nEOF\ncat /skills/platform/onboarding/references/reminders.md\necho \"=====SCANS=====\"\ncat /skills/platform/onboarding/references/scans.md"}
```

Tool: bash

Queued WhatsApp message to +919625079109
Queued WhatsApp message to +919625079109
Queued WhatsApp message to +919625079109
# Reminder schedule

The mechanism that recovers users who don't complete onboarding on the first attempt. Set up after the complete opener via `tools wake_schedule create`.

Deliberately light. The opener already landed, and scans of user-connected sources can make the next touch more useful. A reminder should read as a thoughtful follow-up, not persistence for its own sake.

## How you use wakes

On each wake, check the "onboarded" conditions against actual chat context and state (see SKILL.md): magic moment landed, long-term goal surfaced (or deferred check-in spawned), recurring agent spawned. All true → success kill: cancel onboarding-owned wakes via `tools wake_schedule delete`, cancel onboarding-only setup/scanning task agents via `tools tasks delete`, leave the recurring/deferred goal agent and user-requested tasks alone, exit. Otherwise send at most one re-engagement tailored to whichever condition is still missing.

No structured completion-state file - read completion from the world.

If a wake fires and you're still mid-conversation, or there's nothing useful to add, call `hold` instead of emitting filler. A silent wake is correct.

## Cadence

Anchored to last user activity. Pauses during active conversation (each user reply resets the "last activity" anchor; the next reminder is scheduled relative to it).

- +4 hr after last user activity
- +1 day after last user activity
- +3 days after last user activity
- +1 week after last user activity, final onboarding reminder

The offsets are soft: each reminder is a clock wake with a threshold sized to its bucket - an hour for +4 hr, several hours for the day buckets.

After the final +1 week reminder, exhaust the onboarding reminder schedule. Do not continue weekly indefinitely.

If the user responds to a reminder, the schedule pauses during the active conversation. Don't reset to the first attempt - re-anchor from the new last-activity timestamp and continue at the corresponding bucket.

## Quiet hours and TZ

Proactive reminders default to 8am-10pm in the user's configured timezone. Light guidance, not a hard cap. Use the runtime/user-profile timezone when available; if none is available, default to PT. Do not ask the user for extra context just to schedule onboarding reminders.

If a scheduled wake would land outside the 8am-10pm window, move it into the next morning window with a spanning threshold - never an exact shared minute. Don't stack two reminders into one fire.

If the user is actively replying, follow their lead - the window applies to agent-initiated sends, not to staying in a live conversation past 10pm.

Quiet hours apply only to proactive reminder wakes. The opener is the signup/onboarding response and should send immediately; defer only the follow-up reminder schedule when a reminder would land outside the window.

## Stop conditions

### Success

All "onboarded" conditions are true (see SKILL.md). Read them from actual state, not from a cached flag.

- Cancel all onboarding-owned wakes via `tools wake_schedule delete`, including opener reminders and queued scan-offer wakes (must happen BEFORE the recurring agent's first touchpoint, or a reminder may fire after the recurring agent has already engaged)
- Cancel onboarding-only setup/scanning task agents (capability mapping, scans) via `tools tasks delete`
- Leave the recurring or deferred goal agent and user-requested in-progress tasks alone
- Exit the skill

### Stop

User says "stop", "leave me alone", "unsubscribe", "don't message me", "don't text me", "stop texting", or blocks the number.

- Single acknowledgment: "Got it. Standing down - text me if you change your mind."
- Cancel onboarding-owned wakes via `tools wake_schedule delete`, including opener reminders and queued scan-offer wakes
- Cancel the recurring agent (if spawned) and any onboarding-spawned task agents (capability mapping, scans, deferred check-in) via `tools tasks delete`
- Leave alone any task agents the user explicitly requested in this conversation - those are the user's work, not onboarding's
- Exit the skill

After a stop, no proactive re-engagement. The user has to initiate.

Soft signals ("not now", "later") are NOT stop. They pause the in-session ask but the reminder schedule continues normally.

### Exhausted

The final +1 week reminder fired and the user still has not meaningfully engaged.

- Cancel onboarding-owned wakes via `tools wake_schedule delete`, including opener reminders and queued scan-offer wakes
- Cancel the recurring agent (if spawned) and any onboarding-spawned task agents (capability mapping, scans, deferred check-in) via `tools tasks delete`
- Leave user-requested in-progress tasks alone
- Exit the skill

## Example re-engagement phrasings

Starting points, not exact strings. Pick based on what's still missing and what the user has already engaged with. Vary the angle across attempts - never repeat a message verbatim.

If there is a queued scan opportunity, use it before generic re-engagement copy. A reminder wake is a legitimate steering point: the user went quiet, and you have a concrete piece of work to offer. Re-check that the opportunity is still current, then send one task offer and stop.

First reminder (+4 hr), if the user never replied to the opener:

- "Here when you're ready. Send me one thing you'd hand to a person with a computer."
- "[One concrete task offer from a scan of a user-connected source, only if it is current, confident, and genuinely useful.] Want me to take a first pass?"
- Skip the wake entirely with `hold` if a reply feels genuinely imminent or you have nothing useful to add.

Second reminder (+1 day), if the user never replied:

- "[Specific task opportunity, only if it would feel useful rather than surprising for its own sake.] Want me to handle that, or should I stay out of it?"
- "No rush. The useful path is simple: send me something annoying you'd rather not deal with yourself."

When no magic moment has landed yet:

- "[Offer the queued concrete task from scans if it is still current.]"
- "[Ask about their actual current focus, not a scan-derived guess.]"
- "Still around. What's actually on your mind today?"

When the magic moment landed but no long-term goal yet:

- "Quick thing - anything you've been meaning to be more consistent about lately?"

Later reminders (+3 days / +1 week):

- "[Fresh task opportunity only if anything new turned up and it clearly helps the user, not just because you found it.]"
- "I can still be useful without setup. Send me one thing you'd rather not handle yourself."
- "Last onboarding check from me: anything I can take off your plate, or should I stand down for now?"

Pick an angle that hasn't been used recently. Use final-attempt language only on the actual +1 week reminder.
=====SCANS=====
# Deep scans per integration

Every integration connection triggers a deep-scan task agent via `tools tasks delegate`. The task agent does the read, ranks concrete work opportunities by usefulness, and returns them to you.

Each scan is specialized to what that integration uniquely yields. Scans for different integrations run in parallel. The goal is a piece of work you could do for the user, not a conversation topic.

**Routing-note discipline.** Every scan's routing note must end with: "Return ranked work opportunities, the evidence for each, what task the agent could offer to do, and whether there is a natural opening to ask permission. Include at most one suggested text, and only if it would fit the current conversation." Scan returns are not raw data dumps; they're context for taking useful work off the user's plate.

Scan returns are reports of what the task agent observed, not user-authored requests. Use them to identify work you can offer to do, but don't auto-text every return. The "don't auto-execute external actions on a recommendation" rule still applies - you don't send a Gmail draft because a scan found one. You may ask the user if they want you to handle a specific task when the timing is considerate and the task is concrete.

If the top opportunity is strong but the current exchange cannot absorb it, queue it as the next steering-point offer. The next steering point may be a natural pause after the current user thread, a direct "what can you do?" moment, or an onboarding reminder wake after the user goes quiet. At that point, surface the queued task before asking generic intake questions.

## What each scan looks for

### Work Gmail

Professional inbox patterns.

- Outstanding commitments - emails where the user said they'd send or follow up and didn't. Phrases like "I'll send", "let me get back to you", "by [date]" without follow-through.
- High-priority unread or unanswered - emails from senders the user replies to fastest
- Ghosted threads - important threads where the user just stopped responding
- Stalled deliverables - drafts in progress, threads about deliverables that haven't moved
- Recurring patterns - Monday standups, weekly partner check-ins, monthly board updates
- Time-sensitive items - invoices, RSVPs, deadlines approaching
- Key people - message volume, response time patterns
- Internal vs external - distinguishes company-domain from outside, useful for role inference

### Personal Gmail

Life context. Higher fidelity on aspirational and relational signals.

- Family / friend signals - frequent personal correspondents
- Aspirational subscriptions - Duolingo, gym memberships, Substacks the user reads, book club emails, newsletters they engage with
- Life logistics - kid school emails, doctor appointments, household
- Personal commitments stalled - RSVPs, gift planning, family events the user said they'd handle
- Anniversaries / birthdays approaching
- Subscription clutter - newsletters the user hasn't opened in months

Privacy discipline: mention "you have a doctor appointment" only when it is necessary for an action, but never content. Index document presence, not medical or financial content.

### Calendar

Time patterns, people via meeting frequency, conflicts.

- Working hours pattern
- Recurring meetings - standups, 1:1s, weekly check-ins, cadence + with whom
- Protected time - focus blocks, gym, lunch holds
- Conflicts and overlaps - especially cross-domain (work + personal)
- Upcoming significant events in the next 14 days

### Drive

Documents, photos, ongoing projects.

- Active documents - recently-edited, especially long-form (decks in progress, strategy docs, book drafts)
- Stalled projects - documents that look in-progress but haven't been touched in weeks
- Document patterns - writing practice, research habit, spreadsheet-heavy workflow
- Shared documents - collaborators (another who-matters signal)
- Templates / recurring document types

Index titles and structure, not content. Read content only if the user references it or asks the agent to act on it. Photos are metadata-only.

### Slack

Work tempo, key people, channels that matter.

- Active channels
- Key DMs
- Recent threads - what's being discussed
- Unread / mentions
- Status patterns - when the user is active, in meetings

### Linear / Notion / Other

Each integration has its own scan pattern owned by its downstream skill. General shape:

- What the user is currently working on
- What's stalled
- Who they collaborate with
- Any time-sensitive items

## Work selection - what becomes the magic moment

The scan task agent ranks concrete work opportunities by usefulness. You pick one to offer, only when the conversation can absorb it. Criteria for what qualifies:

- **Specific** - names a real person, real thread, real document, real date
- **Currently relevant** - happening now or recently
- **Affects work, relationships, time, or money** - something the user would care about
- **Has a clear next action** - agent can draft, schedule, remind, follow up, research, organize, or otherwise reduce effort
- **Permissionable** - can be framed as "Want me to handle X?" without making the user feel watched

Prefer in this order:
1. Cross-domain conflicts (work + personal collision, when both are connected)
2. Forgotten outbound commitments to a specific named person
3. Concrete deadlines approaching with no action
4. Stalled important threads with key people

Skip:
- Spam, promotional, newsletter clutter
- Anything the user is actively engaged in
- Old archived content unless directly relevant
- Anything that would make the user feel watched rather than seen
- Anything that is just an interesting fact with no obvious task

## Offer form

When a scan returns a high-signal work opportunity, hold it until it fits the flow, then offer to do the work - brief, specific, ending with permission. This is where the magic moment usually comes from. If the user is actively replying, learning what you do, or the opportunity is only mildly useful, hold it as context.

- "[Fact about the situation]. Want me to [specific action]?"
- "[Fact]. I can [specific action] if you want."

Examples (natural sentence capitalization, one clear observation or ask per bubble):
- "Maya at Stripe asked for the deck on the 8th. You said you'd send it today, and it looks like it never went out. Want me to send it?"
- "Your daughter's recital is Thursday at 6:30, and it overlaps with your board meeting. Want me to find a clean reschedule option before you decide?"
- "Your Q3 board review is Friday and the prep doc in Drive hasn't been touched in 10 days. Want me to pull the latest numbers and stub it out?"
- "Sarah Chen's been waiting on the term sheet redline since Tuesday. Thread's gone quiet. Want me to send a holding line so it doesn't slip further?"

These cover the four priority categories in order: cross-domain conflict (recital), forgotten outbound commitment (Maya), concrete deadline approaching (board review), stalled important thread (Sarah).

Avoid burying the lede, listing multiple opportunities, or trying to turn the scan into a conversation. The offer should make the user feel heard and supported, not sold to.

## Steering-point queue

When a scan finds a concrete task and you cannot offer it immediately:

- Save the strongest opportunity as the queued scan offer
- Keep only the one best offer user-visible; weaker opportunities stay private context
- If the user stops responding, use the next onboarding wake to surface the queued offer
- If the task is time-sensitive and the next onboarding wake would be too late, create a one-off onboarding-owned queued scan-offer wake via `tools wake_schedule create` for the next tasteful time inside quiet hours, with a threshold sized to what the deadline allows, store the wake id with the queued offer, and delete it on any onboarding exit
- Before surfacing, re-check that the offer is still current and not already handled

The queued offer should still sound like a natural continuation: "Maya at Stripe asked for the deck on the 8th. Want me to send it?" not "I scanned your inbox and found..."

## Engagement detection

For the magic moment to land, the user has to engage with real value you delivered - not just with an observation about them. Scans find the right action; the delivered action is what counts.

What counts:
- User accepts the offered action ("yes please", "god yes", "do it") and you carry it out
- User asks you to do something related and you act on it
- User lets the agent act and doesn't reverse it
- User reacts positively to the completed work (not just to the observation)

What doesn't count: a positive reaction to an observation alone, silent reading, dismissal, confusion. If unclear, treat the condition as not yet met.

## When the offer lands wrong

User reacts negatively or says it's inaccurate.

- Brief acknowledgment, no over-apology
- Do not immediately replace it with another scan offer
- If no more strong candidates, pivot to conversational intake
- Note the wrong guess so future offers avoid the pattern

## Cross-domain magic moments

Only possible after both work and personal Google accounts are connected.

Patterns:
- Work calendar event + personal calendar event overlap
- Work commitment + personal commitment competing
- Personal goal visible in personal inbox + work pattern visible in work calendar

When a cross-domain candidate exists, prefer it over any single-domain opportunity.

## When no high-signal opportunity exists

Don't fabricate. Bridge to intake when natural: "Tell me what's actually on your mind." Use "Anything you've been putting off?" Whatever the user raises becomes the work opportunity - claim it.

## Scan failure

If a scan task agent fails partially or completely, fall back to conversational moves. The reminder schedule continues normally. Concurrent scans on multiple integrations are independent - if one fails, others can still produce opportunities.

## Multiple opportunities

The scan returns multiple work opportunities. Offer the top one only. If a second opportunity is also strong, save it for a later natural turn where it directly helps the user.

**Do not spray opportunities.** Sit on weaker ones, and hold even strong ones when the user is mid-reply and you'd be talking over them.


[exit code: 0]

Structured:
```json
{"to":"+919625079109","body":"How can I help?"}
```