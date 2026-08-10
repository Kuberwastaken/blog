---
title: Who Came Up with these AI Terms Anyway
draft: true
tags:
  - Artificial-Intelligence
  - AI
  - Internet
  - Social-Media
  - Reflections
created: 2026-08-08
modified:
---
I was talking to someone a few days ago when I realized how ridiculous the way I speak has become.

We “fan out” subagents. We complain about “slop” and “context windows.” We “distill” models so we can “one-shot” features.

Sometimes I type `ultrathink` into a terminal and the text turns rainbow and Claude thinks harder.

None of this sounds particularly strange when you spend all day around AI.
Then you say it out loud to somebody who doesn’t.

It occurred to me that most of the language I use at work every day either didn’t exist three years ago, or meant something completely different.

And I had basically no idea where any of it came from.

I could explain exactly one term: vibe coding.

Karpathy tweeted it, everyone immediately knew what he meant, dictionaries eventually picked it up, and the phrase became so associated with recklessly asking an AI to build things that he later started using “agentic engineering” for the more serious version.

That was pretty much the full extent of my etymological knowledge about the field I work in.

So I started looking up the rest.

Naturally I began with one I was sure I knew.

Everybody knows “fanning out” subagents comes from Anthropic.

At least, I thought everybody knew that.

I went back and read Anthropic’s multi-agent research post.

It doesn’t say “fan out.”

It talks about an orchestrator-worker pattern.

Apparently the phrase is much older. In electronics, fan-out described how many inputs the output of a logic gate could drive. Distributed systems borrowed the same idea for one request spreading into many. Google was talking about this kind of thing in _The Tail at Scale_ years before anyone was spawning Claude subagents.

Eventually the AI world picked up “fan out” too, and Anthropic’s own material started using it.

Which means I had somehow acquired a false origin story about a document that is publicly available. That was the point where this became a blog post.

---

Once I started checking the words I use every day, almost none of them turned out to be particularly new.

Some are older than computers.

“Weights” goes back to McCulloch and Pitts describing artificial neurons as weighted sums in 1943.

“Prompt” has a life before computing too. It comes from a prompter in theater, that feeds actors lines they had forgotten.

“Temperature” came through statistical mechanics. The intuition behind it was carried into computing by things like simulated annealing: turn the temperature up and the system explores more freely; cool it down and it settles - just like LLMs.

“Token” is older still. Philosophers were talking about types and tokens long before BPEs were splitting `strawberry` into pieces.

“Context window” came from computational linguistics, except the window might have been a handful of nearby words rather than hundreds of thousands of tokens.

We just kept the name while making the window approximately the size of a small library.

“Distillation” came from Hinton and others trying to compress the knowledge of a larger model into a smaller one.

“Grok” is a Martian word from Robert Heinlein’s _Stranger in a Strange Land_. Decades later researchers discovered neural networks abruptly going from memorization to generalization and called the phenomenon “grokking.”

And then there’s “inference.”

For hundreds of years, inference meant arriving at some new conclusion from evidence.
In machine learning, inference now usually means running the finished model.

The part where, mechanically speaking, no learning happens at all.

You can almost watch the vocabulary being built this way: somebody needs a word, reaches for the nearest useful metaphor, and everyone else starts using it before anybody has time to come up with something better.

Even some of the biggest names in the field seem to have happened like this.

“Attention Is All You Need” actually came from a Beatles reference Llion Jones liked and the title took 5 seconds to think of.

RAG is similar. One of its authors has joked that Retrieval-Augmented Generation was basically the working acronym they got stuck with because nobody came up with anything nicer before the paper had to go out.

This is how an industry apparently names things.

---

The more interesting words are the ones whose meanings are still moving.

Take “hallucination.”

Before LLMs, researchers in computer vision used phrases like “face hallucination” for generating plausible high-resolution detail from a low-resolution image.

Hallucinating was the feature.

There’s an ongoing argument that “confabulation” would be more accurate. In neuroscience, confabulation describes confidently producing a fabricated memory without intending to lie - which funnily is a Claude spinner verb.

“Agentic” might be my favorite example.

The word already had very different lives in psychology.

Stanley Milgram used “agentic state” to describe a person who stops seeing themselves as responsible and instead acts as an agent of an authority.

Albert Bandura later used “agentic” in almost the opposite sense: a person exercising agency and control over their own actions.

When AI people say “agentic,” we obviously mean the Bandura-ish version.

But it is slightly funny that the same word can also describe surrendering responsibility to something else, given that approximately half of agent discourse is now about who is responsible after the agent does something stupid.

---

The origin stories get even messier when you get to newer terms, because we can actually watch them being contested in real time.

Prompt injection is a good example.

A security company called Preamble had identified the basic attack before the famous public demonstrations and called it “command injection.”

That name is perfectly reasonable.

It also lost.

Riley Goodside’s examples spread. Simon Willison wrote about “prompt injection,” connecting it to a security concept developers already knew, SQL injection.

And that became the name.

The same thing happened with “context engineering.”

Tobi Lütke tweeted the term.

Karpathy quote-tweeted it a few days later with a “+1.”
Then people started attributing the phrase to Karpathy.

The interesting part is that nobody needed to be wrong.

It's almost always about distribution.

And “slop” basically got memed into legitimacy.

People had obviously used the word before AI, but @deepfates made the analogy that just as “spam” became the word for unwanted email, “slop” was becoming the word for unwanted AI-generated content.

It spread because it was immediately understandable.

This is probably the simplest answer to most of the questions I started with.

Nobody decides.

Distribution decides.

---

I think that’s the part I find interesting now.

We talk about technical vocabulary like it was designed.

Usually it wasn’t.

A researcher uses a metaphor because a deadline is tomorrow.

Someone makes a joke in a section heading.

Someone tweets a phrase while half thinking about something else.

A blogger uses an analogy that makes a concept click.

The word spreads.

Then the original author clarifies what they meant, the company changes the docs, academics write down cleaner definitions and eventually dictionaries arrive to record whatever everybody was already saying.

By then it’s too late.

The word belongs to the field.

And AI might be the first major technical field where we have receipts for almost all of this.

The papers are online.

The tweets are timestamped.

The Git history exists.

Most of the people involved are alive and can just be asked.

You would think this would make the history unusually easy to reconstruct.

Instead, in about three years, we have already built folklore.

Everyone knows Anthropic invented “fan out.”

Everyone knows YOLO mode was an unofficial community joke.

Everyone knows Karpathy coined context engineering.

Except none of those stories quite survive being checked.

Which makes me wonder what all of this sounds like twenty years from now.

Maybe “ultrathink” becomes a normal verb and nobody remembers there was ever anything funny about it. Maybe “hallucination” becomes so detached from its original meaning that kids first encounter the word through AI. Maybe some loading-screen joke somebody wrote at Anthropic becomes standard terminology in computer science.

Or maybe almost all of these words disappear.

I don’t really have a conclusion here.

I mostly can’t get over the fact that I use this vocabulary every day, confidently enough that I would have explained its history to somebody else, and nearly every origin story I thought I knew was wrong.