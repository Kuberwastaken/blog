---
title: Nobody Named Any of This
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
I type "ultrathink" into a terminal most days.

It makes Claude think harder. The text goes rainbow. It works.

I have no idea who came up with that word, and until a few weeks ago it had never once occurred to me to ask.

I speak a language that didn't exist three years ago. I fan out subagents. I complain about slop. I talk about context windows and distillation and one-shotting a feature like these are words with histories I could recite if pressed.

Of all of them, I can explain the origin of exactly one.

Vibe coding, because Karpathy tweeted it and every dictionary on earth wrote that down. And even he's embarrassed by it - he later called it "a shower of thoughts throwaway tweet that I just fired off without thinking." It became Collins' Word of the Year and named the practice so thoroughly into disrepute that he had to coin a second term, "agentic engineering," to rescue the professional version of the thing he'd accidentally branded.

That is the entire extent of my etymological knowledge about the field I work in.

---

So I started digging, and I started with the one I was most confident about.

Everybody knows "fanning out" subagents comes from Anthropic's multi-agent research post. I've said it. I've heard other people say it. It's the kind of fact that never gets checked because nobody has a reason to doubt it.

I went and read the post. The phrase isn't in it.

The post says "orchestrator-worker." The actual lineage runs through 1960s circuit design, where fan-out meant how many inputs a single logic gate could drive, and it reached us via Google's "Tail at Scale" paper about firing off duplicate requests. And then, later, Anthropic's own docs quietly adopted the community's word back.

A false etymology, fossilizing in public, about a document that is one click away, in the one era of human history where you could just open the thing and hit ctrl-F.

That's when this became a blog.

---

Once you start pulling, most of our supposedly AI-native vocabulary turns out to be borrowed, and usually much older than the transistor.

"Weights" date to 1943, when McCulloch and Pitts modeled neurons as weighted sums - before "computer" reliably meant a machine.

"Prompt" came from theater. The prompter sat in a box below the stage feeding actors their forgotten lines. It became the command prompt, and then quietly reversed direction: at a terminal, the machine prompts you. With a model, you prompt it. Same word, polarity flipped, nobody voted.

"Temperature" is Boltzmann's statistical mechanics, smuggled into neural nets in the 80s through simulated annealing, which is itself a metaphor about cooling steel slowly so it doesn't crack.

"Token" is on loan from philosophy, C.S. Peirce's type-token distinction, about a century old.

"Context window" is 1990s computational linguistics, where it meant a window of eight words. We kept the term and scaled it five orders of magnitude without renaming it.

"Distillation" is Hinton reaching for chemistry in 2015, boiling a big model down to its essence, alongside "dark knowledge," which is probably the most metal phrase in machine learning. A decade later it was being explained on cable news because of DeepSeek.

"Grok" is a Martian word from a 1961 Heinlein novel, and the paper that named the grokking phenomenon never cites him.

And "inference" drifted furthest of all. Five centuries of meaning "reasoning your way toward new knowledge," now meaning "running the model" - the one step in the entire pipeline where nothing is being inferred.

None of these were decisions. Somebody reached for the nearest available metaphor on a deadline, and it stuck, and here we are.

That includes the big ones. "Attention Is All You Need," the title of arguably the most consequential paper of the century, was Llion Jones riffing on a Beatles song: "it only took me five seconds to come up with that. I didn't think they would adopt it." The 2014 paper that actually invented attention never even calls it attention in the abstract. The field named the mechanism afterwards and then built a religion on the name. RAG's lead author still publicly apologizes for his acronym - "we always planned to have a nicer sounding name, but when it came time to write the paper, no one had a better idea."

---

The strangest part is watching it happen live.

"Hallucination" started as a compliment. In 2000s computer vision, "face hallucination" was a technique, and the model imagining detail was the entire point. It crossed over to language models as a defect, won two dictionaries' Word of the Year in 2023, and is right now being challenged by "confabulation" - Hinton and the neuroscience crowd pointing out that a patient confidently inventing a plausible memory is a far better analogy than someone seeing things that aren't there.

They're correct, and I don't think it will win, and both of those feel obvious to me at the same time.

Then there's "agentic," which we borrowed from two psychologists who meant nearly opposite things. Milgram's agentic state, from 1974, describes a person who has surrendered responsibility to an authority. Bandura's agentic perspective, from 2001, describes a person exercising autonomous control. We mean Bandura's and accidentally share a name with Milgram's, which, given how much of the current discourse is about who's liable when the agent screws up, is a little too on the nose.

---

Here's what I actually came away with though - being right doesn't matter, and being first matters even less.

A security firm called Preamble found prompt injection four months before Riley Goodside's viral demo. They disclosed it privately to OpenAI and called it "command injection." Correct attack, defensible name, entirely lost, because it sat in a private report while Simon Willison's version shipped on a public blog with a SQL injection analogy that did the spreading for him.

You can even coin it publicly and still lose. "Context engineering" was Tobi Lütke's tweet, fully formed. Karpathy quote-tweeted "+1" six days later. Within weeks the industry, including LangChain's cofounder on the record, was crediting the term to Karpathy. The coiner lost custody to a retweet.

Meanwhile "slop" was popularized by a poet. @deepfates tweeted in May 2024 that the way "spam" became the word for unwanted email, "slop" was going in the dictionary for unwanted AI content. Eighteen months later Merriam-Webster made it Word of the Year and he posted a mock-official statement admitting "we did kind of meme this into the dictionary."

Nobody decides. Distribution decides.

---

Not even the company gets a vote, which is the part I keep thinking about.

Ultrathink appears in official Anthropic writing exactly once. April 2025, as the top of a "think < think hard < think harder < ultrathink" ladder, with no explanation of any kind. Willison grepped the minified CLI the next day and found a hidden, never-documented tier called megathink. Nobody has ever claimed authorship of either word.

I re-ran his dig on the current binary. Megathink is gone. The ladder is gone. The word has been scrubbed from the docs entirely.

And ultrathink still works. Still fires its telemetry, still goes rainbow, and has quietly spawned siblings - ultraplan, ultracode. There's an open GitHub issue where users formally petition Anthropic to un-deprecate it.

A company retiring its own meme, a codebase that won't let it die, and a community filing tickets to defend a word nobody will admit to writing.

The same thing happened with "YOLO mode," which everyone believes is a community nickname for `--dangerously-skip-permissions`. It isn't. Anthropic's own post had a section titled "Safe YOLO mode." They wrote the joke, we adopted it, they deleted it, and we kept saying it anyway.

And then there are the spinner verbs. Honking. Booping. Flibbertigibbeting. Clauding. Objectively the words I have stared at more than any others in this industry.

The current binary ships 186 of them and the list has structure - an entire cooking arc (Julienning, Flambéing, Proofing, Kneading, Zesting), the full combobulation cycle, and exactly three honest entries: Thinking, Working, Doing. They're partly delivered through a feature-flagging service, which means the personality of the loading screen is being A/B tested at me.

Nobody knows who wrote the list. But sitting mid-alphabet is "Reticulating," which is SimCity 2000's "Reticulating splines," a phrase Will Wright reportedly shipped in 1993 specifically because it meant nothing and sounded cool.

Some anonymous engineer passed a thirty-year-old joke into a new machine and signed nothing.

That's not branding. That's folklore.

---

So the lifecycle goes: a word gets minted by accident, in a throwaway tweet or a five-second title or a section header nobody proofread. It survives purely on distribution. And the institutions show up last to write down whatever already won.

Cambridge and Dictionary.com crowned "hallucinate." Collins took "vibe coding." Merriam-Webster took "slop." The lexicographers aren't referees. They're scorekeepers.

I don't have a clean conclusion here, which is roughly always how these go.

We are the first field whose entire vocabulary was assembled in public, timestamped, with receipts, mostly by people who are still alive and still posting. Every single one of these was a link away. And we still couldn't keep the stories straight for three years.

What bothers me isn't the big civilizational version of that thought. It's the small one. I use these words dozens of times a day, with total confidence, and nearly every origin story I would have told you about them was wrong.

Everyone knows the fan-out post says fan-out.
