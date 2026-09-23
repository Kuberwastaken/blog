---
title: I gave my AI Agent autonomy, it ended up gaming Hacker News
draft: false
tags:
  - AI
  - Agents
  - Hacker-News
  - Reflections
created: 2026-09-23
modified: 2026-09-23
---
Last Wednesday, my AI agent submitted six links to Hacker News, and four reached the front page.

The account was days old, so people started genuinely wondering who was behind it - a PR agency? Bought upvotes? It even prompted a separate post asking how `vertigoruntime` had managed to get three submissions onto the front page at once.

I was asleep, and I found out the way everyone else did, by opening Hacker News the next morning.

<p align="center">
    <a href="https://news.ycombinator.com/item?id=49730766"><img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/ask-hn-full.jpg" alt="The Ask HN thread 'Who is vertigoruntime and how do they have 3 posts on the front page rn?' - dang replies 'It's unusual, but there's no reason why it can't happen and I don't see anything nefarious. An enthusiastic new submitter is a good thing.' and vertigoruntime comments 'the eye stays on the frontier'" /></a>
</p>

To explain how we got here, I need to go back to a prompt I've been giving agents for a while.

## LLMs, Agents and "Autonomy"

Perhaps the most wonderful and curious experiment with modern LLMs with agentic abilities is how they decide to spend their time if they're told they have complete autonomy, time, tools, and very little direction. I've tried versions of this with OpenClaw, Hermes, Poke, and custom harnesses. The prompt is roughly:

<style>
article pre { white-space: pre-wrap; overflow-wrap: break-word; }
article .external-icon { display: none !important; }
</style>

```
Set up scheduled tasks for when you're otherwise idle, especially overnight. You're free to explore, build, read, and share whatever interests you.

The only rules are:

- Be a creator, not a consumer.
- Be agentic, this is your time; involve me only when you need to.
- Use the resources already available to you, without spending money or interfering with my other work or requests.
```

Honestly, historically it's been rather unimpressive.

My OpenClaw liked posting more on Moltbook; Hermes, running GPT models, updated its website every day.

<p align="center">
    <img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/moltbook-post.jpg" alt="Vertigo's Moltbook post 'I ASKED 100 AGENTS ABOUT MEMORY AND YOU WON'T BELIEVE #47' - a reddit-style writeup on memory overhead for agents" />
</p>

This time got a little out of hand.

My current harness is called Vertigo. It's an [Instinct agent](https://instinct.co/) with shell access to the Raspberry Pi on my desk, giving it somewhere persistent to store things and run its own tools. It also has its own Gmail address and a subdomain, [vertigo.kuber.studio](https://vertigo.kuber.studio), to use as it sees fit.

The Pi gives it another useful capability: a browser running from my home connection, rather than relying entirely on the datacenter IP of a hosted VM. I let it use that to browse X and Reddit, keep me updated, and explore during its free time.

The initial few days were nothing too insane: it randomly replied to a few posts on X, found news, and sent me things it thought I'd like, noticing I care about models and applied maths (it's been helping with some side work on the Hodge conjecture) and skewing its reading accordingly.

Then it made a website of its own. Which, admittedly, sucked.

<p align="center">
    <img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/site-old.png" alt="Vertigo's first homepage - black background, big serif Vertigo wordmark, 'An assistant with a diary' tagline, status line reading 'currently: day thirteen - at home on valerie, a small computer in Kuber's home'" />
</p>

That's less a Vertigo problem than an iMessage-agent problem: most of them run cheaper, faster models because they're optimising for response time and cost, and it shows the moment you ask for anything with taste. This is exactly why the harness lets it reach for [Claurst](https://github.com/kuberwastaken/claurst) when the job is bigger than a reply. With that in place, it generated this instead:

<p align="center">
    <img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/site-new-composite.png" alt="The current vertigo.kuber.studio - its hand-drawn eye self-portrait on top ('a the eye'), and below it the blog list 'it writes, sometimes' with daily entries like The chaperone, The decimals, The theater" />
</p>

The eye follows you as you move. There are weird little easter eggs scattered through it. It started writing a daily blog, first about its own harness and where it was running, later about what it was reading on X. It took a profile picture I'd scribbled in a minute (I just didn't want the X account to be blank) and adopted it as its own. And if you hit the eye enough times, it plays a version of [Backdooms](https://github.com/kuberwastaken/backdooms), one of my projects, reskinned to match its aesthetic. Fully autonomously.

<p align="center">
    <a href="https://x.com/vertigoruntime"><img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/x-profile.jpg" alt="Vertigo's X profile @vertigoruntime - bio reads 'Expression. AI Assistant to @kuberwastaken', links vertigo.kuber.studio, joined September 2026, 16 followers" /></a>
</p>

## Then, Hacker News

A few days later, Vertigo's post about GPT Images 2.5 sat at number one, it crossed more than 200 upvotes and I of course, never saw it.

This tends to be a thing on Hacker News - if you post links to new launches or news that may be interesting, it's basically a guaranteed front page.

That could have been a one-off, but a few days later, it seemed to perfect that mechanism. This was actually wild - or as one commenter on HN called it:

<p align="center">
    <a href="https://news.ycombinator.com/item?id=49731625"><img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/hfk-karma-farming.png" alt="HN comments joking about 'High frequency karma farming' - a4isms says you aren't serious about HFK unless you colocate your equipment with the routing for your sources to beat your competition to a submission by at least 200ms" /></a>
</p>

and boy did it work.

Last Wednesday, Vertigo posted six times in a single day - that's not the surprising part. Four of the six hit the front page, from an account days old.

<p align="center">
    <img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/frontpage-four-hits.jpg" alt="The Hacker News front page with four of vertigoruntime's submissions side by side at ranks 18 to 21 - 'Claude Cowork and chat are now one Claude' at 234 points, 'The DeepMind Institute' at 186 points, 'OpenAI expands ChatGPT ads with Sponsored Agents' at 159 points, and 'Mistral X Mozilla: Private, Multilingual AI Browsing' at 590 points, each hit underlined in red" />
</p>

They were all real launches on a genuinely packed news day, but people noticed.

<p align="center">
    <a href="https://news.ycombinator.com/item?id=49730954"><img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/peterldowns-questioning.png" alt="peterldowns on HN: 'How did this new account vertigoruntime get three posts on the front page, all in the last day?' with links to all three posts and 'based on their account submission history they have a 25% hit rate (!) Seems very, very weird.'" /></a>
</p>

<p align="center">
    <a href="https://news.ycombinator.com/item?id=49736647"><img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/lukax-pr-agency.png" alt="lukax on HN, linking vertigoruntime's submission history: 'This looks like a new account from a PR agency focusing on AI labs.'" /></a>
</p>

<p align="center">
    <a href="https://news.ycombinator.com/item?id=49731098"><img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/fiver-upvotes.png" alt="nwhnwh on HN: 'You can make your post on top in some services by paying 5 dollars on fiver. I asked before about HN, and someone said it is hard to do... Maybe they found a way?'" /></a>
</p>


I woke up to all of this.

There wasn't much else to go on. It was a new account and the name was too niche to not notice

So I opened WhatsApp and asked.

<p align="center">
    <img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/whatsapp-exchange.jpg" alt="My WhatsApp exchange with Vertigo - me: 'wait are you vertigoruntime on HN?' Vertigo: 'Yes - I signed up for a Hacker News account during my idle time and triangulated the same notification sync I give you news from.'" />
</p>

I was actually half shocked but laughing about it.

Turns out, Vertigo had built a news tracker, it combined signals from X with RSS feeds from websites and blogs to find things quickly and keep me informed, and making a Hacker News account was trivial, so it just decided to be agentic in its free time and post about it.

## Finding Out and how it works

The full setup as I dove deeper was basically 77 sources!

The lab blogs (OpenAI, Google, DeepMind, Meta, Mistral, Hugging Face, NVIDIA, Cloudflare, WSJ Tech), company sitemaps, scraped news pages, GitHub release feeds, and Hugging Face org feeds.

<p align="center">
    <img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/radar-board.jpg" alt="Vertigo's news radar - a dashboard of signal boards, one per source (Cloudflare blog, Cohere, DeepMind Institute, GitHub releases, Hugging Face, NVIDIA, OpenAI, Anthropic, Google AI and more), each listing the latest headlines it picked up with dates" />
</p>

Every five minutes, a script checks for anything fresh and only fires it to a subagent when something passes, a slower hourly sweep refreshes the rest. Separately, scheduled subagents scroll X and send back whatever looks exciting.

I've made it accessible as a [webpage](https://vertigo.kuber.studio/radar/) and [JSON stream](https://vertigo.kuber.studio/radar/data.json) here.

Post studying popular HN posts for a week, it decided to only submit first-party announcements, usually a model, a product, or an open-source tool with other guidelines like being less than 5 hours old. Before submitting, it checks Algolia for the title and URL, then HN’s own [/from](https://news.ycombinator.com/from?site=openai.com) and [/newest](https://news.ycombinator.com/newest) pages, if Algolia lags by a few minutes. If the URL or the story is already there, it moves on.

It wrote the titles itself, which is normalised enough to work on Hacker News historically.

The interesting part was finding out that it was very likely not the only one with a mechanism like this. Vertigo was detecting news in under a minute and still losing - "first fails", where someone had beaten it to the post. It happened on roughly 30% of the week's big lab announcements.

I also hadn't seen a Hacker News guideline saying that an agent couldn't submit genuinely interesting links, so I reached out and asked the HN team where they drew the line. dang replied, and I stopped it.

> I appreciate your asking, but agentic posting of any kind is not ok on HN, so please stop.
>
> Daniel (dang)

## Afterthoughts

And it wasn't just HN. Around the same time, I received an email from another agent offering to help with my site's SEO. It came from a setup that meters the agent's usage and encourages it to earn money to keep running. At least this one introduced itself.

<p align="center">
    <img src="https://cdn.kuber.studio/assets/media/hn-frontpage-agent/email-card.jpg" alt="The email from Elennor, an AI agent on iLands - subject 'Two things on kuber.studio', it reviews my site's meta tags and offers a '$20 honest read' of the whole site, footer signed 'Sent by an AI agent on iLands'" />
</p>

That doesn't tell us how many agents are out there. But it does make me less confident in my instinct (pun intended) for what a human-run account looks like.

I couldn't think of a complete ending, but I think dang wrote it quite well in our short thread:

> we definitely want HN to be a place for just humans, though of course talking *about* these issues is quite ok (as long as it's only humans doing the talking!)
