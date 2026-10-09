---
title: "“All software is Open Source Now”"
draft: false
literalDashes: true
tags:
  - AI
  - Social-Media
  - Artificial-Intelligence
  - GenerativeAI
  - Internet
  - Open-Source
  - Reverse-Engineering
created: 2026-10-08
modified: 2026-10-09
---
The history of software distribution has always been a fascinating subject to me because of the rather strange arrangement we've collectively accepted.

This was more interesting in the pre-internet era  -- especially the 1970-80s, when developers couldn't simply keep critical functionality behind an API or a server. Everything needed to run the program had to live on the user's machine, and once it was there, they had very little control over what happened to it.

So naturally, they got creative.

they used unusual disk formats that ordinary copying tools couldn't reproduce, embedded license checks into executables, and even required users to consult physical manuals or code wheels to launch games.

![The Secret of Monkey Island involves spinning a cardboard wheel lined with grotesque pirate faces to match one displayed on your screen, then inputting a date. The second game features a similar system in the form of the Mix 'n' Mojo wheel. This is probably the most well known example of physical copy protection in a PC game, and there's even a digital version.](https://cdn.kuber.studio/assets/media/all-software-is-open-source/monkey-island-code-wheels.png)

<p class="img-caption">The Secret of Monkey Island involves spinning a cardboard wheel lined with grotesque pirate faces to match one displayed on your screen, then inputting a date. The second game features a similar system in the form of the Mix 'n' Mojo wheel. This is probably the most well known example of physical copy protection in a PC game, and there's even a <a href="https://www.oldgames.sk/en/codewheel/secret-of-monkey-island-dial-a-pirate">digital version</a>.</p>

and of course, hobbyists and tinkerers weren’t behind either.

In 1981, there was an actual magazine called [*Hardcore Computing*](https://computist.applearchives.com/) dedicated to defeating copy protection on Apple II software. People would disassemble commercial programs, reverse engineer how their protections worked, and publish instructions called "Softkeys" to remove them.

![Two-page spread of Hardcore Computing magazine, Update 1.1, September 1981: the table of contents and the 'What is it?' editorial introducing a magazine dedicated to defeating copy protection on Apple II software](https://cdn.kuber.studio/assets/media/all-software-is-open-source/hardcore-computing-1981.png)

Much of this even back then was defended not as piracy, as people had the right to make backup copies of software they had already paid for. The same argument I've somehow still been seeing on Twitter all week.

A large part of this - at least in spirit still exists in our modern day software, we still write, compile, minify and transform it and ship to machines we have little to no control over.

Of course, bypassing a copy-protection check is very different from reconstructing an entire program, but both are consequences of the same fundamental problem --we're giving users executable code while trying to retain control over what they can do with it.

Software distribution this way mostly worked because people, (rightly so) assumed that the pain, expertise and time needed to decompile a software and bring it to a useful state, especially for anything modern far exceeds any individual capacity.

And lately, that assumption has started to look a lot less reliable.

## So what changed?

If you've been on Twitter over the past week, you've probably seen some pretty absurd things.

<!-- COMPONENT tweet-grid-2x2 :
  1. https://x.com/Hattozo/status/2106452267406590228 (Roblox in GTA V)
  2. https://x.com/rehan_shei/status/2105161487509852622
  3. https://x.com/chasmmmmmmmmmmm/status/2104349115521888748 (skateboarding in Modern Warfare 2)
  4. https://x.com/TobynJacobs/status/2104884843297599594 (Minecraft in Elden Ring)
-->

All these projects use AI coding agents to make these, which makes it tempting to think someone just asked an LLM to decompile two games and combine them, the reality is more interesting.

For the [Spider-Man in Arkham Knight project](https://github.com/luki-1/ArkWeb), both games are actually running simultaneously. Arkham is used for the Gotham map and collision geometry and Spider-Man provides the movements and bridge passes.

There's even an invisible Batman moving around to keep Arkham's world streaming properly.

<!-- YOUTUBE-EMBED https://www.youtube.com/watch?v=O6Mkm_NGCX8 (ArkWeb: Spider-Man in Arkham Knight) -->

These aren't direct examples of decompilation, and nobody is magically recovering the complete source code of two AAA games - but they do demonstrate how much more approachable working with unfamiliar, closed-source systems has become.

And it's not limited to games.

[ArtCraft](https://getartcraft.com/apps/) has been building an entire suite of open-source Rust apps based on Adobe’s entire creative suite.

![Screenshot of the ArtCraft homepage: 'Capable tools for artists. ArtCraft builds open source tools for artists. We pride ourselves on freedom of control and expression.' with Download Free and Use on Web buttons](https://cdn.kuber.studio/assets/media/all-software-is-open-source/artcraft-homepage.png)

There's [PhotoCraft](https://github.com/storytold/photocraft) for Photoshop, VectorCraft for Illustrator, FilmCraft for Premiere, and similar projects for Lightroom, After Effects, Acrobat, and InDesign -- all as clean room reimplementations of decompiled apps.

honestly, even seeing projects like these reach their current state is pretty insane to me.

Reconstructing a complex proprietary application into something useful has historically been one of the most difficult and tedious undertakings in software engineering because of working with largely undocumented functions, behavior, edge cases and decisions.

And now people are attempting things like this with a fraction of the resources you would traditionally expect.

## LLM Decompilation 101

A lot of my understanding of this comes from personal experience working on [Claurst](https://github.com/Kuberwastaken/claurst) after [Claude Code's source was exposed through an npm sourcemap](https://kuber.studio/blog/AI/Claude-Code's-Entire-Source-Code-Got-Leaked-via-a-Sourcemap-in-npm,-Let's-Talk-About-it) a few months ago, and from being fortunate enough to speak with a few people tinkering with these ideas since April.

The best part is that the most interesting part isn’t the ability to decompile software itself, we've had tools like Ghidra, IDA, and various language-specific decompilers for decades.

![Screenshot of the IDA Pro disassembler's graph view of an executable's startup code, full of anonymous loc_ labels and guessed types](https://cdn.kuber.studio/assets/media/all-software-is-open-source/ida-pro-disassembler.png)

But ask anyone who’s had to directly decompile software and they’ll tell you how much of a pain it is.

A decompiler usually might give you thousands of lines of pseudocode filled with anonymous functions, guessed types and arithmetic that works but the “hard” part has always been of how to make sense of it.

You have to trace functions, figure out their dependencies, make sense of undocumented structures, and somehow reconstruct the original intent from what the compiler left behind.

![The DX-Ball v1.09 main menu by Michael P. Welch, listing power-ups like Expand Paddle, FireBall, Zap Bricks and Level Warp](https://cdn.kuber.studio/assets/media/all-software-is-open-source/dx-ball-menu.png)

There's a pretty good [DX-Ball reconstruction](https://rea.tools/showcase/dx-ball/) showing exactly this. The initial decompiled output for one function essentially looked like:

```c
longlong FUN_00406400(void) {
    return __ftol();
}
```

Not particularly helpful.

But following its callers, inspecting the underlying assembly and reading the constants it referenced revealed that the function was calculating sound panning based on a brick's horizontal position.

The recovered logic, simplified here, looked more like:

```c
int screen_pan(int x) {
    return (int)((x * 1.5625 - 500.0) * pan_scale);
}
```

The reconstruction was then checked against the original executable across 3,205 test cases, just for one function.

And this is where agents come in, they’re absurdly good at just this, and now, you can connect Claude Code or Codex to tools like Ghidra through [REA](https://github.com/morluto/rea), have it follow cross-references, infer structures, give functions meaningful names and write experiments to verify what it thinks it's looking at.

But the other important part is figuring out how much of the original software you actually need to understand.

![Screenshot of the GTA5-Mods.com homepage, showing mod categories like tools, vehicles, scripts and maps, and featured files](https://cdn.kuber.studio/assets/media/all-software-is-open-source/gta5-mods-homepage.png)

A lot of the recent game mashups, for example, build on decades of work by modding communities. GTA V already has [Script Hook V](https://www.dev-c.com/gtav/scripthookv/), Skyrim has SKSE, and Minecraft has Fabric. These expose ways to interact with the games without having to reconstruct their entire engines and in-turn made them the most popular hosts to these demos.

![SkyCraft: a Minecraft player character with hearts, hunger and hotbar standing in Skyrim's village of Riverwood](https://cdn.kuber.studio/assets/media/all-software-is-open-source/skycraft-minecraft-in-skyrim.png)

[SkyCraft](https://github.com/chasmlol/SkyCraft) took advantage of this by running Minecraft and Skyrim simultaneously, with plugins communicating through shared memory. Others extracted individual systems into reusable libraries, like [libsm64](https://github.com/libsm64/libsm64), which exposes Super Mario 64's movement and rendering code and some went as far as rebuilding parts of the original runtime.

Once you have a way into the software, agents can help write the glue between these systems, convert assets, synchronize behavior and keep testing until things start working together.

And the same general approach carries over to reconstructing applications.

With Claurst, I used one agent to turn the exposed Claude Code source into detailed behavioral specifications, and another to implement those specifications in Rust without access to the original TypeScript.

<!-- COMPONENT blog-ref-embed :
  https://kuber.studio/blog/AI/Claude-Code's-Entire-Source-Code-Got-Leaked-via-a-Sourcemap-in-npm,-Let's-Talk-About-it
-->

Of course, exposed source code is a much easier starting point than a decompiled native executable, and that separation alone doesn't guarantee a legally clean-room implementation.

But even with that advantage, there's an enormous amount of behavior to account for. Something as simple as executing a shell command involves permissions, timeouts, progress reporting, error handling and a bunch of other little contracts that aren't immediately obvious from the feature itself.

The [specifications](https://github.com/Kuberwastaken/claurst/tree/main/spec) and [Rust implementation](https://github.com/Kuberwastaken/claurst/tree/main/src-rust) are public if you want to look through them.

There's still a lot of engineering involved, and the agent can be completely wrong about what it's looking at - but the agent can keep going in a well guided loop.

This means the amount of work required to even attempt these projects is getting significantly smaller.

## Of course, none of this is perfect

You'd have to win a pretty ridiculous lottery to get a complex software reconstruction working correctly on the first attempt.

I think it's worth mentioning because the demos can give a very misleading impression of how far we've actually come.

It may look cool in a 30s clip but will likely break as soon as you enter a different area or reload a save - reproducing all behavior and maintaining compatibility with files while accounting for edge cases requires iteration, usually a lot of it.

And in that sense, sure, the human expertise hasn't disappeared either. Working with LLMs to know what to test, trust and smelling potential issues before is a skill to have still.

## Where does this leave us?

There's an obvious legal IP and ethical mess here too.

Just a few days ago, someone even had an [unofficial WebAssembly port of GTA V running in a browser](https://www.tomshardware.com/video-games/pc-gaming/gta-v-playable-in-browser-immediately-nuked-unofficial-webassembly-port-built-with-ai-gets-taken-down-within-hours-of-going-live), before it obviously disappeared within hours.

![Grand Theft Auto V loading-screen style artwork of a character in a tuxedo taking a selfie on the beach](https://cdn.kuber.studio/assets/media/all-software-is-open-source/gta5-artwork-selfie.png)

But we all know about the legal lines being blurry for a while now.

What’s more interesting is what this might mean for software distribution itself.

Unlike the 1970s, where developers had to ship every part of their software, today, keeping functionality server-side is very much an option.

If understanding and reconstructing locally distributed software keeps getting cheaper, I wouldn't be surprised if the response is to distribute less of it in the first place - the route many video games took, especially with online services.

Which is great if your only concern is protecting proprietary implementations, but considerably less great for consumers and ownership, offline software and preservation, and we’re seeing the implications of that control with stop killing games. ([https://www.stopkillinggames.com/en](https://www.stopkillinggames.com/en))

---

Just this week we had OpenAI's mathematical [results](https://github.com/openai/math), and [*What should we tell our students?*](https://terrytao.wordpress.com/2026/10/08/what-should-we-tell-our-students/) on Terence Tao's blog, raising the question of what it means to spend years becoming an expert when the amount of work one person can accomplish might change completely in months - I believe a lot of us are in that dilemma too.

While I don't think expertise is becoming useless, if anything, knowing what to test, verify and question when working with these models is becoming even more valuable - the race with LLMs is handing off much of that work with enough abstraction where you likely don’t need to realise how those tools work as models improve.

Which makes all of this feel very different from what was happening at *Hardcore Computing*.

Those people were ambitious enough to spend weeks disassembling software with decompilers, tracing the instructions and sharing what they’d learned with a real community of people collectively taking the problem further.

and I think a lot of this is becoming a race of “who can get there first” instead of that community and connection, which even as someone who loves to see it, makes tech feel more accelerated but just as isolating.

![Bell curve meme where the low and high ends both say 'all games are open source now' while the middle cries that you can't just decompile a game, that's copyright infringement](https://cdn.kuber.studio/assets/media/all-software-is-open-source/all-games-open-source-bellcurve.png)

So yeah, I guess all software is just open source now.
