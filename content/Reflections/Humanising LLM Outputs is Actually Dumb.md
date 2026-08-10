---
title: Humanising LLM Outputs is Dumb
draft: false
tags:
  - AI
  - Artificial-Intelligence
  - GenerativeAI
  - OpenSource
  - AGI
  - Technology
  - Reflections
created: 2026-08-10
modified:
---
The largest tell for where culture and sentiment is shifting for AI tools is usually X, viral GitHub repositories and Hacker News.

One of these tells I've been seeing a lot lately is skills like [I have ADHD](https://github.com/ayghri/i-have-adhd) and Agents.md instructions such as [giving outputs in only ASD-STE100 Simplified Technical English](https://x.com/levelsio/status/2086046112142545061).

I understand the appeal, none of us really like the verboseness and specific quirks of LLM outputs, but I really think fixing that by humanising the model is the wrong abstraction.

![intro](https://i.ytimg.com/vi/ExaNNAIysks/maxresdefault.jpg)

The problem is that these instructions are not applied after the model has finished doing the work, it becomes part of the same work - If you tell an agent to use short sentences, avoid jargon, never overwhelm you and only include the most important details, you are asking it to continuously compress its output into a lower-bandwidth format.

That compression is lossy.

You probably never notice what got dropped because the output still reads nicely.

ASD-STE is a great example because it sounds so reasonable. It was designed to make documentation unambiguous _for humans_. But an agent isn't a human technical writer, and the raw state is often the most information-dense representation available. Meanwhile the style rules sit on the same instruction list as: solve the task, use tools correctly, preserve abstractions, don't break anything.

This becomes even stranger once agents start talking to other agents.

A subagent investigates a bug, turns its findings into a nice human-readable summary, the parent agent reads that summary, and then turns it into another nice human-readable summary for you.

If a subagent ran six tests, I don’t want:

> Most tests passed, although there was one issue worth looking into.

I want:

```text
5/6 PASS
FAIL: test_cache_invalidation
CAUSE: stale key survives restart
REPRO: tests/cache_test.py:184
```

More importantly, humanisation hides failure.

Agents fail in useful, ugly ways: conflicting evidence, unresolved branches, stack traces, uncertain assumptions. Human prose is extremely good at smoothing these into sentences like:

> There are a few considerations here.

That sounds nicer.

But I'd rather find my agent is hallucinating or near its token window than be happy with that.

Every other system we build works the opposite way - Databases don't store data in the format a dashboard displays it, compilers don't make their IR pleasant to read, APIs don't exchange friendly summaries.

We keep the highest-fidelity representation as long as possible and transform it at the boundary where a human consumes it, but LLM tooling is increasingly doing this backwards.

To be clear, none of this is an argument against accessibility or personalisation.

If you want three-line answers or Simplified Technical English, great!
I just think it's better to do it at the end.

Let agents keep detailed state, let subagents exchange schemas, diffs, exact errors, confidence, provenance. Then compress it for me.

I think the best part is that these viral skills might actually be pointing toward the right future.

Users are patching this at the prompt layer, something that belongs further down the stack.

"Talk to me like I have ADHD" makes perfect sense as a renderer, it makes much less sense as an operating instruction. The durable version is agents whose native language is precise, machine-facing state, with the warm, concise, human version generated only at the boundary.

So the viral repos aren't the end state, but a bug report.