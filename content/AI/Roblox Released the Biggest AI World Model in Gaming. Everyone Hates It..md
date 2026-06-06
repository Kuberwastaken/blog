---
title: Roblox Released the Biggest AI World Model in Gaming. Everyone Hates It.
draft: false
tags:
  - Artificial-Intelligence
  - AI
  - Internet
  - Social-Media
  - Roblox
  - World-Models
  - Gaming
created: 2026-06-06
modified:
---
![intro](https://cdn.kuber.studio/assets/media/roblox-world-model/banner.png)

When Google DeepMind introduced Genie in 2024, the idea was fundamentally insane - systems that could generate interactive environments from a single image, learning physics, movement, and input responses purely from training data.

It was the obvious next step for AI in media and video games.

It's two years later, we're at Genie 3 - a limited research preview, and frontier labs are still working on getting past a demo that holds together for more than 60 seconds before it becomes computationally unsustainable.

Running a world model in real time - maintaining visual consistency frame to frame, handling multiplayer concurrency, keeping latency low enough to feel like a game are  genuinely hard, unsolved engineering problems. Researchers in this space know that and they present their work carefully, in controlled demos, within honest context about what the technology can and cannot do yet.

Recently, Roblox decided to skip that part.

![acqusition](https://cdn.kuber.studio/assets/media/roblox-world-model/acqusition.png)

They acquired Morpheus AI, a company working on "real time dreaming" technology for neural rendering and world model work.

The acquisition price has not been disclosed, which is interesting, because Roblox usually does announce those numbers fast. Alongside the acquisition, they started Roblox Labs - a new internal division to signal to investors they are now a "serious" player in AI research.

A couple months earlier, Roblox had demoed a neural rendering system, essentially an NVIDIA DLSS 5-style AI pass applied to existing Roblox games in real time.

The reception was obviously poor, the anti-AI crowd rejected it on principle, but even people who follow generative AI closely were skeptical of the concept.

Running a multiplayer, live game where latency matters, through an AI renderer that hallucinates your UI into in-world objects and makes the game uncontrollable is NOT an improvement.

Funnily enough, that same demo also surfaced that Roblox had used footage from Clair Obscur: Expedition 33 without Sandfall Interactive's permission, which made things worse.

Then, following the Morpheus acquisition - to prove Roblox Labs was real, without any announcements or anticipation - they quietly released World Research Station.

People caught on what happened, tried the game and safe to say, it did not go well.

![rating](https://cdn.kuber.studio/assets/media/roblox-world-model/rating.png)

5% rating. One of the lowest scores any large-scale Roblox project has received.

The game is US-only, built on what Roblox is calling "game cartridge architecture." to connect to their GPU runtimes, with this one letting you choose between Realistic or Anime modes to navigate a generated environment in space as an explorer to survive.

Of course, you could break the country restriction by just VPN'ing to US instead, so I'll just let you see the gameplay I captured for yourselves.

![gameplay](https://cdn.kuber.studio/assets/media/roblox-world-model/gameplay.mp4)

This was insane.

It took me 4 tries of reconnecting to get a session, in non-peak hours, which performed poorly and disconnected in less than 2 minutes too.
 
There game itself has no real gameplay loop while having other annoyances like an extreme input latency, textures that some reviewers called "a YouTube video from 2005," persistent visual glitches, and the game dropping connections mid-session because the infrastructure cannot hold it together.

What I hate the most is that this could've been one of the best implementations of world models in games if this wasn't rushed.

It's a navigable, "real" game with mostly stable states and a way to ship to a platform as big as Roblox, while having missed basically all the UX polish that makes a game stable and fun.

The issue is, it's a demo - a rushed one at that shipped as a game to an audience that was expecting a game.

---

Frankly, this isn't actually new either.

![gameplay](https://cdn.kuber.studio/assets/media/roblox-world-model/guilded.png)

In August 2021, Roblox acquired Guilded, a Discord competitor built for gaming communities, for $87.2 million.

Guilded had raised $10.2 million total and had around 500,000 downloads at the time. Roblox integrated it, maintained it for a few years with barely any additions and minor integrations before shutting it down at the end of 2025.

The technology and the team existed and Guilded had a loyal fanbase before acquisition but Roblox just could not execute on it, could not compete with Discord, and wound down something they had spent nearly $90 million on.

---

Roblox has more to work with here than almost anyone else could.

Millions of games, an enormous corpus of gameplay data, the budget to build real infrastructure, instead, this seems like another box that needed to be checked before the acquisition could sit comfortably on an earnings call.

The 5% rating is more than earned - the technology isn't the problem here, the execution and rush is and sadly with all new tech, first impressions do matter - and this wasn't a great one and it'll carry forward for anyone trying to continue innovating in the space.

![ending](https://cdn.kuber.studio/assets/media/roblox-world-model/ending.png)