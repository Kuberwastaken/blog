---
title: Recreating Minecraft is Not a Benchmark
draft: false
tags:
  - AI
  - Artificial-Intelligence
  - Benchmarks
  - Technology
  - Reflections
created: 2026-09-06
modified:
---
GPT Astra released a couple of days ago and, inevitably, within the hour my entire feed was the same five things: recreating Minecraft in one prompt, painting themselves in MS Paint, the pelican riding a bicycle as an SVG, a ball bouncing in a rotating box with believable gravity, and an SVG game controller.

On paper, these look like harder, more visual problems for a model to solve. There's a reason they're as big as they are. I've started calling them demo-benchmarks: visual and understandable enough for everyone to get, but finite enough for the next model to be "perfect" on.

And that's the problem. These tests can't tell you how good a model is anymore, because it's trivial for labs to optimise for exactly these tests by the next release.

It's not really their fault, either. Honestly, I'd say it's dumb if they didn't - nothing sells a launch like a pelican or a 3D game controller the timeline can't stop quoting.

![](https://x.com/kuberwastaken/status/2096007526995341459)

A fixed, famous target and eight weeks of runway is a solved pelican. These tests never change, and anything that never changes can be overfit. Every launch cycle proves it again.

A test you can perfect on a schedule measures preparation instead of capability, and to me that's anti the very definition of a benchmark: it should be a hard test, something very hard to perfect.

<p align="center">
    <img src="https://cdn.kuber.studio/assets/media/demo-benchmarks/minecraft-fable5.png" alt="Claude Fable 5 recreating Minecraft in one prompt" />
</p>

The same dynamic runs through the open evals. Smaller models that feel dumber in practice still outscore better ones on sites like Artificial Analysis. This isn't hypothetical: [Thinking Machines' Inkling Small scored within a point of its flagship sibling on the Artificial Analysis Intelligence Index](https://artificialanalysis.ai/articles/inkling-small-lands-within-a-point-of-inkling-on-the-artificial-analysis-intelligence-index-with-less-than-a-third-of-the-parameters) with less than a third of the parameters, and beat it on Humanity's Last Exam, GPQA Diamond and SciCode. Public, static, famous test sets leak into training data and fine-tuning choices.

<p align="center">
    <img src="https://cdn.kuber.studio/assets/media/demo-benchmarks/aa-inkling-index.png" alt="Inkling Small, a third of the size, matching its flagship on the Artificial Analysis Intelligence Index" />
</p>

A launch is a first impression, and first impressions are marketing. That's why you're always bound to be shocked - the shock was scheduled.

So what's the alternative? Honestly, I'm not sure

because if you think about it, the obvious fix somewhat already exists. LiveBench rotates its questions, ARC-AGI keeps a private set, Humanity's Last Exam holds part of itself back.
Tests where the tested party doesn't know what's being tested: you can't teach to a test that hasn't been written yet.

But if holdout evals are the answer, though, why does the pelican still win?

The easy answer is partly because holdouts don't stay holdouts, every scored run touches an API and every disputed answer gives a question away - give a private set a few model releases and it's a public set with extra steps.

But the real answer is because most of social media doesn't need to understand a research paper to notice that the bicycle finally has pedals or is animated.
A demo benchmark makes it obvious why it's a better capability in seconds.

So no, there is no alternative to a good demo. But there are better alternatives to demo-benchmarks for seeing how good a model actually is. And if a model scores well but keeps failing at your work, that is actually a gap that deserves investigation.

Demo-benchmarks make great content. I just wish we'd stop grading with them.
