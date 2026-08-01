---
title: DeepSeek is Trying the Costco Strategy to Reach AGI
draft: false
tags:
  - AI
  - DeepSeek
  - Artificial-Intelligence
  - GenerativeAI
  - OpenSource
  - AGI
  - China
  - Technology
created: 2026-08-01
modified:
---
DeepSeek is a household name. Liang Wenfeng is not.

The founder of the lab that erased a trillion dollars of NVIDIA's market cap in a single day - the lab OpenAI tried to get *banned* - has given roughly two real interviews in his life. Both in text, both to the same Chinese publication. No podcasts, no keynotes, no X account, no Lex Fridman three-hour special. The most misunderstood lab in AI is run by a man who communicates with the world almost entirely through model weights and arXiv papers.

Then in May, he got on a closed-door call with his investors and talked for almost **four hours.**

A ~34,000-word transcript of that call hit WeChat last month. The original post was reportedly taken down within a day. Copies are everywhere now. DeepSeek has never confirmed it - that's how leaks work - but the details check out against independent reporting, and the voice is unmistakably the same one from those two interviews. It is the longest unguarded look at this man's thinking that has ever existed, by a factor of several.

The best part? Somewhere in the middle of the recording, the meeting host pleads with attendees: *please don't spread these numbers, please don't screen-record this.*

and here we are :)

What's wild to me is that English-language media has almost entirely slept on it. This thing has been dissected across Chinese tech media for weeks - quote compilations, annotated threads, the works - and on this side of the language wall it's been close to crickets. I went through the full transcript and the circulating quote collections, and it is genuinely the most interesting AI strategy document of the year.

Let's break it all down.

---

## The Quant Who Hoards GPUs

Quick refresher on who's talking, because the biography *is* the thesis.

Liang Wenfeng topped the college entrance exam in his home city, studied engineering at Zhejiang University, and then - instead of joining Big Tech - built High-Flyer, one of China's largest quant funds, trading markets with machine learning. Along the way the fund kept buying GPUs long before anyone understood why: about a hundred cards in 2015, a thousand by 2019, ten thousand by 2021. He says it was curiosity. In 2023, the research team became DeepSeek.

If that path sounds familiar, it should - Jeff Bezos spent four years at D.E. Shaw, a quant fund, before starting Amazon. And the quant lineage shows all over this transcript: Liang talks about artificial intelligence the way a retailer talks about inventory. Cost, price, margin, payback period, discipline. Once you hear it in that register, every "weird" thing DeepSeek does stops being weird.

In January 2025 this lab came out of nowhere with R1, an open-source reasoning model matching OpenAI's o1 at a fraction of the price, went #1 on the App Store, and triggered the biggest one-day market cap wipeout in stock market history. They were bankrolled entirely by High-Flyer and famously took no outside money - until now. This meeting is Liang explaining to his hand-picked first outside investors what they just bought into.

(One caveat before we start: the transcript is machine-transcribed and machine-translated, speakers aren't labeled, and model names occasionally come out mangled - at one point it renders what is almost certainly "Opus 4.7" as "O4.7". Treat exact numbers with a grain of salt. The *thinking* comes through crystal clear.)

---

## The Costco Strategy

Here's DeepSeek's entire pricing model, from the man himself, in one sentence: buy a batch of servers, price the API so the servers pay for themselves in **ten months.**

Servers run three to five years, so a ten-month payback works out to roughly six times the hardware cost over a server's life. His words: we only earn a sixfold profit. That's the whole formula. And he openly admits it's *not* profit-maximizing - demand at this price is inelastic, meaning he could double prices tomorrow and roughly double revenue. He just won't.

At one point someone on the call heckles him from the *other* direction - a comment pops up saying a ten-month payback means his margins are too fat. And he just... agrees? "Indeed there's still room to cut prices." The investor scolding the founder for insufficient greed, and winning.

Then he tells this story, which I haven't stopped thinking about:

> "With one of our models, we initially worried that demand would be too high, so we set the price fairly high. Later we cut it to a quarter, and many people in the company group chat cheered. Because this is exactly the purpose of putting so much care into building this model well: to let everyone use it fully."

The employees *cheered a price cut.* Find me another AI company where the group chat celebrates revenue going down. It sounds like PR fluff until you realize it's structural: if your people joined to make intelligence cheap and abundant, a price cut IS the win condition.

If this playbook sounds familiar, it's because a very boring American retailer has been running it for decades. **Costco** caps its markups around 14% as a matter of internal law - and the cap is exactly *why* people trust the store. Structurally-limited greed isn't charity; it's a moat. You cannot undercut someone who has already decided not to be greedy, and every competitor who needs fat margins to survive has to live in territory you've made uninhabitable.

DeepSeek is running the Costco strategy on frontier intelligence - except the competitors caught in the squeeze have hundred-billion-dollar burn rates that *require* the margins Liang just declared he'll never take.

### The Math Behind the Modesty

His justification isn't spiritual. It's game theory, played out loud, and it's the best part of the whole meeting.

Liang thinks AI eventually becomes something like **ten percent of humanity's GDP.** Not a market - a double-digit slice of everything. Most founders would hear that and start drawing their piece of the pie chart. His conclusion runs exactly backwards:

> "If we tried to monopolize that benefit, we would surely be cast aside by history."

And then he walks the auction down, step by step:

> "Look at OpenAI: the way they do that math seems to work out; theoretically there's no problem. But they have a problem: they'll be beaten by another person willing to occupy only one percent... At that point, if yet another person emerges saying I only need zero point one percent, then he'll beat the previous person again."

And the kicker, my favorite quote of the entire four hours:

> "You don't even need to actually take more; **if your vision is to take more, you will be beaten by those whose vision is to take less.** Actually no one has taken any money yet - it is just a vision. If your vision is to take more, you have already lost."

Nobody has captured the value yet. The pie doesn't exist yet. And he's saying the *intention alone* is enough to lose - because your intention shapes your pricing, your openness, your hiring, and how hard the rest of the world works to route around you. He has a word for the whole posture, and he repeats it like a mantra: **"Restraint is a strategy."**

## The Weights Are the Recipe, Not the Restaurant

I've written about DeepSeek-as-open-champion before, back when OpenAI was petitioning to get them banned - my analogy then was a restaurant handing out its actual recipes while "Open"AI let you peek through a window. What's striking in this meeting is that Liang's own defense of open source contains zero romance. Three cold observations:

**1. Closed buys you nothing.**

> "I don't see any benefit to closed-source. ByteDance's model is closed-source - what benefit does it get? I don't see any benefit."

**2. Open costs you nothing - if you're not greedy.** The weights are the recipe, not the restaurant. Serving a frontier model cheaply is the actual hard part - the kernels, the clusters, the utilization. A rival can download DeepSeek's model tomorrow and still serve it at multiples of DeepSeek's cost, which means at Liang's ten-month-payback price, *competing with DeepSeek using DeepSeek's own model loses money.* Open source only threatens your business, he says, "if you want to make a hundredfold profit." The restraint and the open-sourcing are load-bearing for each other. It's one machine.

**3. It's a size-class advantage.** A startup is too small to pull off frontier-scale open source; a big company can't organize itself to. "This is a sweet spot that belongs to companies of our size."

And the detail that should quietly embarrass several labs: **the open weights are the same weights they serve.** "We won't open-source a slightly worse model while using a better one for our own deployment." No secret good version. He *wants* thousands of companies built on top - every one of them makes the ecosystem a little more DeepSeek-shaped, at zero cost to a company that was never going to charge rent anyway.

Oh, and the fallback plan, delivered with a shrug in the Q&A: worst case, if all technical progress froze today, "just selling the API could probably support a public company." The doomsday scenario is a profitable business. Must be nice.

---

## Watermelons and Sesame Seeds

The single best analogy in the meeting is Liang's own, explaining why they didn't fight to retain the tsunami of users R1 brought in:

> "The reason we don't fight for that is that **there are watermelons behind, and what's in front may all be sesame seeds.** Of course this sesame seed may be a fairly large one, but I don't think it counts as big."

Think about the restraint required here. DeepSeek accidentally became the fastest-growing consumer app on the planet. Every growth playbook says: monetize, retain, build the super app, you'll never get this chance again. They did... nothing. Going viral "was not in our script." No retention push, no monetization, an API run by a handful of maintainers with no sales team and no customer support. At one point they didn't even want to maintain the users anymore, but - and I love this line - **"the users couldn't be driven away."**

Meanwhile everyone else fought like hell over the chatbot market, and he delivers this absolutely brutal postmortem:

> "At that time, everyone on the consumer side was fighting until their heads were bloodied - and in the end it got carried off by someone who wasn't fighting for it."

The someone being him. The chatbot war's biggest winner was the one lab that wasn't fighting it.

The same knife falls on entire product categories. Video generation? "Commercially it is a good business. But it has nothing to do with intelligence." 3D? No. World models - the thing half of Silicon Valley currently swears is the future? Not the bottleneck at this stage. Vertical agents for finance and medicine? Deprioritized; the coding agent is what matters. Even multimodality gets filed under *component* - V4 will ship it natively, but "it is a component; it is not intelligence itself."

My favorite one: **hallucinations are classified internally as a product problem.** Solvable with better post-training, will get around to it, not the priority. The thing that launched ten thousand LinkedIn thinkpieces about AI's fatal flaw is, in DeepSeek's internal taxonomy, roughly a UI bug.

And the refusals cash out somewhere unexpected: **no overtime.** In China. In the industry that invented 996. His two reasons are perfect - research needs relaxed people, and "we are extremely focused; being very focused means we have very few things to do." Products ship imperfect and stay imperfect, unpatched, on purpose. "We don't need to work overtime because it's just not that hard."

His name for what all this refusing enables is a "dimensional-reduction strike" (降维打击 - a Three-Body Problem reference Chinese tech discourse uses the way we use "10x"): if you're organized around AGI and your model is genuinely at the frontier, consumer products and enterprise revenue fall out the bottom as byproducts. "Products are a by-product on the road to AGI" is an actual quote.

> "It's strange - the thing you most want you can't get, while the thing you don't care so much about comes easily."

That's not a fortune cookie. That's a man describing his own P&L.

---

## The Staircase

This is where the meeting stops being a business call and becomes a research seminar, and where you remember what this "company" actually is.

The foundational bet goes back to Liang's 2023 interview: human intelligence might fundamentally *be* language - thinking might be the brain weaving words. If that's true, a language model is the seed of general intelligence, and the path forward is a staircase where each step stands on the last:

**Language models → Chain-of-Thought → Agents → Continual Learning → (gradual) Singularity → Embodiment**

Last year's step was CoT. This year's step is agents. And steps *cap out* - he's very explicit about this:

> "Just like CoT - after CoT reached its ceiling, it had already surpassed the very top humans; at doing math-olympiad problems and writing programs it had already surpassed the very top humans. But it still stopped there - that technology couldn't reach AGI."

Sit with that. The founder of DeepSeek casually asserting that reasoning models - the thing the entire industry is currently valued on - are a *completed step* that beat top humans and still isn't AGI. Not the destination. A stair.

### The "Go Get Little Wang" Problem

So what's the next stair? His answer is the most clarifying explanation of AI's actual bottleneck I've read anywhere, and he does it with an office errand.

When you hire an employee, they spend two months absorbing context - who's who, how things work, what matters. After that you can say "go get Little Wang" and they just... do it. They know who Little Wang is, where he sits, and that he's grumpy before lunch.

An AI model has no two months. Every conversation is its first day on the job, forever.

> "If you tell it 'go get Little Wang,' you have to tell it who Little Wang is, what position, where they are, how to find them, what to watch out for when finding them. You have to give AI all the context. Under those circumstances, AI can do it, but you can't possibly give it all the context - it's not realistic."

His claim: with complete context, AI *already* beats the human. But you can never supply complete context. So:

> "AI cannot replace your employees. But if AI has the ability of continual learning - if, like your employee, it comes into the company and learns for two months - **then it could replace everyone in the world.**"

That's the whole game, stated in two sentences. And then he goes somewhere I didn't expect:

> "AI today does not lack taste or intuition; what it lacks is the ability to learn continually."

Taste was supposed to be our thing! The last human moat! And here's the most technically credible founder in the field going "no, the models have taste, they just can't remember your name."

On when continual learning gets solved, he's refreshingly honest: nobody knows. "The whole world still hasn't found a good method; everyone is groping." Internally they call this kind of research **"scratching lottery tickets"** - it needs almost no GPUs and can't be staffed like a project; the threshold is low, anyone can scratch, nobody knows which ticket pays out. The next breakthrough is currently a *thought*, not a training run, and it's sitting unclaimed in someone's head.

Two honest caveats belong here. First, the staircase is ordered by laziness, and he's proud of it: solve learning first, and the model helps build everything after it - "you can use the earlier technology to help develop the later technology." Robotics sits *last* precisely because it's bitter, labor-intensive work he'd rather delegate to the AI. Even the singularity gets deflated into a gradual process, non-linear only because "AI can accelerate AI research." Second: serious people bet the other way. Yann LeCun has spent years arguing that language models alone won't reach human-level intelligence - that you need world models that predict what actions do. Liang is betting the entire company against that. One of them is wrong, and we get to watch.

And the first customer for the next model? Themselves:

> "The first goal of the models we build is not that everyone else finds them easy to use, but that we ourselves find them easy to use. That is the fastest way to achieve AGI."

Dogfooding as an AGI strategy. The model exists to build its successor.

### Meanwhile, Half the Geniuses Are Labeling Data

Then there's the detail that completely rewired my sense of what frontier AI work actually is right now:

> "You could also say that right now **half the people in our company are labeling data.** Half of our core researchers, the most important people, half of them are labeling data."

The most efficient lab on Earth, the algorithmic-elegance people, and the founder's honest description of the current stage of AI is: my geniuses are doing data curation. Not because they're behind on hiring annotators - because expert-level data work *is* the research now, and it turns out high-end labeling costs the same in China as in America. The one thing that doesn't get cheaper in Shenzhen is taste.

Karpathy coined the frame for this years ago: Software 2.0. The dataset is the source code, and the people curating it are the programmers. DeepSeek is just the first lab whose founder said the quiet part into a hot mic. The bottleneck isn't money or chips - it's time.

---

## The Compute Wall (or: The Numbers They Asked Everyone Not to Share)

This is the part the host explicitly begged attendees to keep quiet, which of course means it's the part everyone shared first.

The headline narrative, in Liang's own framing:

> "We lag the US by about one to two years, and yet we got this done using only **one-twentieth** of the US's compute. In the future we want to rewrite this narrative: we use a fraction of its compute, but shorten the time gap further - down to 6 months, 3 months."

Per the transcript, DeepSeek is sitting on roughly **twenty thousand H-equivalent GPUs** - most of which *just arrived*. That's the entire hardware base of the lab that terrified Washington. He estimates the largest American frontier models at ~800 billion *active* parameters while DeepSeek operates around fifty billion active - an order of magnitude down - with the next generation targeted at 150-250B. Training at US scale would take fifty thousand next-gen chips he cannot buy at any price.

Two things here deserve to be famous. First, the definitive answer to "is DeepSeek efficient by choice?" - no:

> "We train models this big not because I think a model this big is enough, but because **that is all the resources we have.**"

All the architectural cleverness - MoE, MLA, FP8, the entire "DeepSeek does more with less" mythos - is rationing, not philosophy. The constraint made the innovation, and he's completely unsentimental about it. Even the talent gap, he argues, is downstream of compute: same pool of people ("it's literally the same batch"), fewer chips, fewer experiments, slower researcher development. Every gap is a compute gap in a trenchcoat.

Second, the scaling-wall take, which is the best subtweet of Silicon Valley discourse I've ever read:

> "When Silicon Valley says Scaling has hit its limit, **that is for Silicon Valley;** for Chinese people, we are still very far from that. We haven't Scaled to anywhere near that degree."

"The wall" as a regional phenomenon. A luxury complaint. Like billionaires debating whether money buys happiness - fascinating, but not super relevant when you're rationing H100s.

Which explains the plan for the billions they just raised, quant-brained to the end: turn all of it into GPUs, as many as possible, as fast as possible, premium acceptable. Cash in the bank earns two percent; a GPU pays itself back in ten months. "If I spend all the money within half a year, that would be wonderful." The bottleneck isn't budget discipline - it's that the cards literally cannot be bought fast enough. Imagine your procurement KPI being *spend twenty billion faster* and still missing it.

## "Nvidia Is Digging Its Own Grave"

The chip section is the most geopolitically spicy part of the recording, and the one where Liang sounds least like a philosopher and most like an engineer with a grudge and a plan.

The claim that would've been unthinkable two years ago: **when DeepSeek trained V3, they used NVIDIA's cards but not NVIDIA's ecosystem.** They wrote their own high-level compiler layer - TileLang - and built everything on top of it, going "almost entirely free of dependence on Nvidia's ecosystem." The efficiency cost of leaving CUDA-land? "A loss of 1% to 2% - I think that's acceptable." Elsewhere he flatly says the new stack *raises* efficiency, substantially.

CUDA - the moat, the twenty-year fortress, the reason NVIDIA is worth more than entire G7 economies - and his position is that it's "being dismantled rapidly." The reason has a poetic circularity to it: CUDA's moat was always "nobody wants to rewrite all this software." Well - **AI writes code now.** They're even using AI to help write TileLang itself. Every card NVIDIA sells trains better AI, and better AI ports the ecosystem away from NVIDIA faster. The moat is being drained by the very thing it irrigates.

(The escape is real but unfinished, to be fair - the newer releases reportedly ship kernels for both CUDA and TileLang, and parts of the stack still lean on CUDA today. This is a jailbreak in progress, not a completed one.)

On Huawei, he gives the most precise benchmark of domestic silicon I've seen anywhere: the gap is **"four times plus two years"** - four Huawei 950s to match one top NVIDIA card, on hardware trailing by two years, at which point it's a genuine drop-in for the GB200/GB300 supernodes, "latency and all." Even at double the price he'd call it a substitute, because the alternative isn't NVIDIA - it's empty racks:

> "If we were in a normal commercial environment where I could buy Nvidia cards, then domestic substitution would be fairly hard; but in a situation where Nvidia cards can't be bought, everyone is forced into it."

Hence "Nvidia is digging its own grave" - or more accurately, having its grave dug for it by US export policy, with Jensen handing over the shovel. The transcript has Huawei allocating DeepSeek ~16,000 cards (an order of magnitude fewer than China's internet giants get), and DeepSeek porting the whole TileLang stack to them explicitly "to help Huawei build this ecosystem well." His prediction: within a year, the perception that domestic chips "can't be used" gets reversed with facts, and the only remaining bottleneck is manufacturing capacity - which he doesn't believe survives five years.

If he's right, the export controls will have pulled off the most impressive own-goal in the history of industrial policy: they took the world's most efficient AI lab, which *wanted* to keep buying American, and conscripted it into building the American ecosystem's replacement.

---

## This Is a Lab Wearing a Company as a Raincoat

Now the part I found genuinely moving, and the reason this recording matters beyond strategy nerdery.

Everything about how DeepSeek runs internally, as described across these four hours, is recognizable - but not from tech. It's a *research lab*. Specifically, it's what universities pretend their labs are like:

- **No KPIs. No performance reviews.** "There is no performance review, there is only the vision."
- **The vision isn't written down.** Anywhere. "It lives in the way we do things and in our attitude toward the world."
- **Half of every researcher's time is unassigned.** Google had its famous 20% time (RIP). DeepSeek's rule is that *assigned* work should not exceed 50%. The other half: "they can study whatever they want, explore on their own, pursue whatever they think is important - with no prerequisites."
- **Authority by consensus.** "It is not that I can push some matter through; it must be a consensus before I can push it through."
- **And the single only thing that matters:**

> "Our biggest core interest is maintaining the stability of the team - you could even say it is the only core interest. **As long as I can keep the team stable, I will surely achieve AGI. It is that simple.**"

Money? "Certainly not the problem." Compute? A delay of six months at worst. The only unrecoverable loss is people. That's not how CEOs talk - that's how a PI talks about their research group. And it's backed by behavior: the funding round reportedly came with conditions on investors amounting to *don't poach our researchers, don't fund spinouts of them.* The one asset he made his backers contractually respect is the team. He's also honest that the loose structure is straining - real hierarchy is being built "right away, because I am already making this adjustment" - which is the least flattering thing he could have admitted and therefore weirdly the most credible.

When someone asks if the model is Bell Labs, he pushes back only on the economics: Bell Labs had a monopoly parent paying the bills, "but we clearly do need to commercialize... **the government will not give me a single cent**" - which is incidentally the driest possible rebuttal to the "state-controlled operation" narrative OpenAI was selling Washington. This lab has to eat what it kills. It just refuses to kill more than it can eat.

That's the picture four hours leave behind, and it's why I say DeepSeek is the most misunderstood lab in AI. The West keeps reading them through lenses that don't fit - state champion, price-dumping menace, mysterious whale. The transcript shows something much simpler and much stranger: a research group that secretes products the way a gland secretes hormones - involuntarily, as a byproduct of its actual function. The API has no sales team. The users could not be driven away. Revenue keeps happening *to* them.

Every Western lab claims some version of this ("our products fund the mission!"). The difference is that when OpenAI says it, there's a $500-billion-infrastructure-commitment-shaped asterisk attached. When this guy says it, the supporting evidence is that he forgot to monetize the most viral app launch in history because the team was busy with V4.

## The Rapid-Fire Takes

The Q&A is full of casually dropped opinions that would each be a headline if he tweeted them:

**On Anthropic being on top:** "Anthropic now being ahead of OpenAI is not long-term; it's a phase. In the future, OpenAI and Google will most likely rise in alternation." Also, Anthropic burns the least money of the three for what it gets. Also-also, this gem of internal honesty: "Maybe half the people in our company - at any given time, half feel OpenAI is better." Imagine an American CEO volunteering that half his researchers prefer the rival's model, as a neutral weather report.

**On where model competition ends up:** three moats, in order - **cost, time, user experience.** "Apart from these, there may be no gap." No mystical secret sauce, no permanent winner. "I absolutely do not believe that large-model companies can take away most of the profit of the AI industry." Trillions in AI-lab market cap quietly disagree, and one of them is wrong.

**On China's endgame role:** the world's *largest producer* of intelligence - most chips, most electricity, systematically cheapest, "just as the services China provides in other industries may be cheaper." AI as manufacturing, not as magic. Made-in-China intelligence at made-in-China prices.

**On the domestic bloodbath:** too many Chinese labs building the same foundation models; it "will definitely converge" to maybe two big and two small - maybe fewer. Brutal, when you remember he's the reason half of them raised money.

## The Small Human Moments

Scattered through four hours, the bits no comms team would have survived:

- "I hear you, but the video seems to have dropped, boss." Even the most consequential AI briefing of the year has Zoom problems.
- He offers the room a break three hours in - "does everyone want a mid-session break? Do you want to eat something first?" - then just keeps going when nobody objects.
- An investor delivers a full minute of poetry about DeepSeek being a banyan tree sheltering an ecosystem of little birds, "benefiting all things without contending." Liang's response, in its entirety, is to answer the technical question.
- Asked how he balances pure research against his new capital-market obligations, the reassurance he offers his brand-new investors is essentially: *worst case, we're merely a very good business.* "We hope to have a bigger dream, but we also have a fallback performance we can put out."

---

# So Do I Buy It?

Time for the elephant. This is a man talking to his own investors, in a meeting that leaked. Some skepticism is mandatory, so here's mine.

**The "we don't care about money" gospel is also excellent fundraising.** Notice the trick: "restraint" reassures investors he won't burn billions on a super-app war, "10% of GDP" promises the upside anyway, and "reasonable profit" reads as discipline. The renunciation of greed is, itself, a great pitch. He'd probably say the overlap between sincerity and strategy is the whole point - the vision only works *because* it's real - and honestly, years of DeepSeek's observable behavior (the weights are open, the prices are floor-level, the super app never came) back him more than they back any Western lab's mission statement. But a pitch is a pitch.

**"Restraint" coexists with buying every GPU on Earth.** The taking-less philosophy applies to *profit margins* - not to compute, talent, or the CUDA-replacement layer they're building. There, it's total war. This isn't hypocrisy exactly; the restraint is entirely instrumental, and he says so himself: it "increases the probability of achieving AGI." Don't mistake the monk for a pacifist. The modesty is aimed.

**The leak itself is suspiciously convenient.** A meeting whose host loudly says *do not share this* produces a full transcript, quote compilations, and weeks of favorable coverage painting DeepSeek as principled, efficient, and inevitable - right after a fundraise, mid-Huawei-partnership, at peak national-champion narrative. Maybe an investor just leaked it. Probably an investor just leaked it. But if you *wanted* to communicate all of this without the founder ever giving an interview, it would look exactly like this, and the "please don't record" plea is exactly the seasoning that makes it taste authentic.

**And still.** After all the discounting, two things are very hard to fake. The *coherence* - pricing, open source, org design, roadmap, chip strategy all reduce to one function, maximize P(AGI | team stays together), and every answer across four unscripted hours snaps to it, which is not something you can improv. And the *track record* - almost everything he describes, they had already done before there were any outside investors to perform for.

# The Actual Lessons

If you skimmed everything else, here's what I'd take away:

1. **Strategy is subtraction.** DeepSeek's edge isn't what they do; it's the compounding interest on everything they refuse to do. Every "no" - video gen, super apps, verticals, overtime - is compute, focus, and organizational sanity reinvested into the only thing they think matters.

2. **The one who takes less beats the one who takes more - and intention counts.** Your announced greed recruits your opposition; your announced restraint recruits your allies. Before anyone has made a dollar, the vision has already sorted the battlefield.

3. **Capped margins are a moat, not a sacrifice.** Costco proved it with hot dogs; DeepSeek is proving it with tokens. The player with structurally limited greed is the one nobody can undercut - and open source is only "dangerous" to business models that need the hundredfold markup.

4. **Vision is an operating system, not a poster.** No KPIs, no written mission, and the group chat cheers price cuts. If your people need performance reviews to row in the same direction, the problem isn't the people.

5. **Constraints are R&D.** One-twentieth the compute produced the efficiency innovations everyone now copies. "Low cost is a result" of scarcity, metabolized well. With infinite resources, you'll never be forced to have DeepSeek's ideas.

6. **The frontier's real bottleneck is learning, not knowledge.** The models have taste; they can't remember. Whoever cracks continual learning - "go get Little Wang" without the briefing document - takes the next stair, and nobody currently knows the way up.

And the meta-lesson, the one the recording itself teaches: the most closed thing about the world's most open AI lab was always its founder's voice. It took a leak he explicitly asked not to happen for us to hear four hours of it. And what was he hiding all this time? No conspiracy, no state puppeteer, no secret better model behind the open one. Just a lab with a staircase drawn on its whiteboard, run by a quant whose entire plan is *take less, focus, keep the team, climb.*

He even left us a promise we can check: the strongest model DeepSeek ever builds, released open, the same weights they run themselves.

The scariest thing about DeepSeek was never anything they concealed. It's that they've been telling us exactly what they're doing the whole time.

We'll see.

---

*This post is based on the widely-circulated ~34,000-word transcript of DeepSeek's May 20th investor meeting (~3h44m of audio), which spread through Chinese tech media over the past month before the original post was taken down, plus the quote compilations derived from it. DeepSeek has not confirmed its authenticity. The transcript is auto-transcribed and machine-translated - speakers are unlabeled and some numbers and model names are visibly mangled - so treat specific figures as approximate and quotes as faithful-in-meaning rather than word-perfect. The only English-language coverage I've found is [this great short video by Squintist](https://www.youtube.com/watch?v=BcKQk0NeBV0) (not affiliated, as always), worth ten minutes of your time. Liang Wenfeng's two prior interviews, with the Chinese outlet 暗涌 Waves (2023 and 2024), remain the only other substantial public record of his thinking and are worth reading alongside this.*
