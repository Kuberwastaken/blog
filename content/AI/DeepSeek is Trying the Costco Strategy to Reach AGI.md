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
Liang Wenfeng might be the most consequential person in AI who has essentially never spoken in public.

He founded DeepSeek - the lab that came out of nowhere in January 2025 with R1, matched OpenAI's o1 at a fraction of the cost, and costed NVIDIA a trillion dollars of market cap in a day. He had given two long-form interviews in his life, both in text to the same Chinese publication. He communicates with the world through model weights and papers and perhaps most interestingly - his lab was bankrolled entirely by High-Flyer, his own quant hedge fund, and took no outside money until this year.

So when a 3 hour 44 minute transcript of him talking to his new investors started circulating on a May 20th meeting, it instantly became the largest sample of him thinking out loud that exists anywhere, spreading across WeChat before the original post was pulled and almost no one heard of it.

The best part was that midway through the recording, the meeting host pleads with attendees: please don't spread these numbers, please don't screen-record this.

And here we are :)

This is a deep dive about who is this man, what is DeepSeek doing different and how it's planning to achieve AGI using Costco's strategy.

## Okay, but what is the Costco strategy.

Costco runs one of the strangest pricing policies in American retail, capping its markups around 14-15% as a matter of internal law, and the $1.50 hot dog combo has survived every inflation cycle since 1985.

The cap looks like generosity and works like a weapon - every competitor who needs fat margins has to fight you on terrain where fat margins are impossible. Nobody can undercut a company that has already decided to keep almost nothing.

DeepSeek has its own version of that internal law, and it might be the single most important number in this whole leak: buy a batch of GPUs, then price the API so the hardware pays for itself in **ten months**. That is the entire pricing policy. Over a server's three-to-five-year life it works out to roughly a sixfold margin on compute, he considers that "a reasonable profit", and everything else in this post (the open weights, the refused product lines, the price cuts that make his own employees cheer) hangs off that one self-imposed cap.

Liang is convinced that intelligence is bound to become a commodity and his entire strategy relies on this one bet - but the breakthrough he wants most might just end up being the thing that breaks his own playbook.

---

## "Restraint is a Strategy"

If you remember one phrase from this entire meeting, it's this one. He says it over and over, like a mantra:

> "Restraint is a strategy. It lies in the fact that sometimes you can give up some things in exchange for many other things."

A large focus on his meeting was around things he wanted to deny doing at DeepSeek
In four hours, he said:

- No to maximizing profit
- No to chasing users
- No to becoming a super app ("Become the next ByteDance? The next Tencent? We have no such thought at all.")
- No to video generation
- No to 3D
- No to world models
- No to vertical agents (finance, medical, all deprioritized)
- No to going closed-source, ever
- No to vertically integrating into chips
- No to overtime, even

Every AI company on Earth is currently in a land-grab. Grab users, grab revenue, grab verticals, grab GPUs, grab the entire value chain if you can. And here's the guy who arguably has the *most* momentum to grab with, saying the quiet part in the opposite direction: the grabbing itself is what kills you.

His reasoning is game theory rather than spirituality, and it deserves both the admiration and a stress test. The admiration comes first.

## The GDP Math That Explains Everything

Liang's lens of looking through AI is very interesting and quant-like in my opinion and to understand that, I'll mostly be quoting parts of the translated transcript here to understand him.

Liang thinks AI will eventually be worth something like **ten percent of humanity's GDP**, a double-digit percentage of everything humans produce, and his take was:

> "If we tried to monopolize that benefit, we would surely be cast aside by history."

followed by:

> "Look at OpenAI: the way they do that math seems to work out; theoretically there's no problem. But they have a problem: they'll be beaten by another person willing to occupy only one percent. Because another person says, I do it this well, but I only need to take one percent of global GDP, and then he'll beat him. At that point, if yet another person emerges saying I only need zero point one percent, then he'll beat the previous person again."

> "You don't even need to actually take more; **if your vision is to take more, you will be beaten by those whose vision is to take less.** Actually no one has taken any money yet; it is just a vision. If your vision is to take more, you have already lost."

Nobody has captured the value yet; the pie itself is still hypothetical. He's saying the *intention* alone is enough to lose, because your intention shapes your pricing, your openness, your hiring, and how hard the rest of the world works to route around you.

This is his AI game theory, and the stakes are asymmetric - when OpenAI needs to charge $200/month to justify its infrastructure while DeepSeek prices its API to recoup hardware costs in ten months, the two are playing different games on purpose, and only one of them needs the fat margins to survive.

### Where the Auction Logic Breaks

Now the stress test, because that auction argument gets quoted a little too admiringly, including above, by me.

"The one who takes less beats the one who takes more" is true in exactly one kind of market: a commodity market with near-zero switching costs. Hot dogs qualify, and so does electricity. It is genuinely unclear that intelligence does. If distribution, integration, habit, and trust are the real moats, the 1% player loses to the 10% player all day long. Apple has taken the fattest margins in consumer hardware for two decades, and every ascetic competitor promising the same specs for less has bounced off, because an iPhone is a habit and an ecosystem rather than a fungible good. ChatGPT is a verb in a way an API price list will never be. Enterprises sign multi-year contracts precisely so they can stop re-evaluating vendors.

Here's the thing though: Liang seems to know this, and his answer is hiding in his own words. Asked where model competition ultimately lands, he names exactly three moats: cost, time, and user experience. "Apart from these, there may be no gap." That sentence is the tell. The auction logic is really a bet that intelligence commoditizes, that models converge until tokens are interchangeable and price is the product. Every piece of the strategy (open weights, capped margins, refusing the super app) is downstream of that single assumption. If the assumption holds, he wins on discipline. If it breaks, the guy hoarding users and integrations wins instead, and the restraint was just leaving money on the table.

And that sets up the best irony in the whole transcript, which pays off in the roadmap section below: the breakthrough Liang wants most is a model that learns continuously, absorbing your context the way a new employee does. A model that has worked with you for two months is the least fungible product imaginable. Memory is a switching cost. If DeepSeek gets exactly what it wants, intelligence stops being a commodity, and the Costco math stops binding. The strategy is perfectly tuned for an era its own roadmap is trying to end.

## Watermelons and Sesame Seeds

The single best analogy in the meeting is Liang's own, explaining why they didn't fight to retain the tsunami of users R1 brought in:

> "The reason we don't fight for that is that **there are watermelons behind, and what's in front may all be sesame seeds.** Of course this sesame seed may be a fairly large one, but I don't think it counts as big."

Think about the restraint required here. DeepSeek accidentally became the fastest-growing consumer app on the planet, and every growth playbook says: monetize, retain, build the super app, you will literally never get this chance again. They did... nothing. Going viral "was not in our script." At one point they didn't even want to maintain the users anymore, but (and I love this line) **"the users couldn't be driven away."**

Meanwhile everyone else fought like hell over the chatbot market, and he delivers this absolutely brutal observation about how that went:

> "At that time, everyone on the consumer side was fighting until their heads were bloodied, and in the end it got carried off by someone who wasn't fighting for it."

That someone was him. The chatbot war's biggest winner turned out to be the one company that sat it out.

His explanation for *why* this keeps happening is what he calls a "dimensional-reduction strike" (降维打击, a Three-Body Problem reference that Chinese tech discourse uses the way we use "10x"): if you're organized around AGI and your model is genuinely at the frontier, consumer products and enterprise revenue just fall out the bottom as byproducts. The company fighting for the product has to be *better at products* than you are at models, and right now, models matter more.

> "It's strange: the thing you most want you can't get, while the thing you don't care so much about comes easily."

It reads like a fortune cookie until you remember he's describing his own P&L.

---

## The Staircase: DeepSeek's Actual Roadmap

This is the section where the meeting stops being a business call and becomes a research seminar, and where you remember that this "company" is really a lab with a billing department.

Liang lays out the entire path to AGI as a staircase where each step stands on the previous one:

**Language models → Chain-of-Thought → Agents → Continual Learning → (gradual) Singularity → Embodiment**

Last year's step was CoT. This year's step is agents. And each step gets climbed until it caps out, which he's very explicit about:

> "Just like CoT: after CoT reached its ceiling, it had already surpassed the very top humans; at doing math-olympiad problems and writing programs it had already surpassed the very top humans. But it still stopped there; that technology couldn't reach AGI."

Sit with that for a second. The founder of DeepSeek casually asserts that reasoning models, the thing the entire industry is currently valued on, are a *completed step* that surpassed top humans and still fell short of AGI. In his framing they were simply one more stair.

### The "Go Get Little Wang" Problem

So what's the next stair? His answer is the most clarifying explanation of AI's actual bottleneck I've read anywhere, and he does it with an office errand.

When you hire an employee, they spend two months absorbing context: who's who, how things work, what matters. After that, you can say "go get Little Wang" and they just... do it. An AI model gets zero of those two months. Every conversation is its first day on the job, forever.

> "If you tell it 'go get Little Wang,' you have to tell it who Little Wang is, what position, where they are, how to find them, what to watch out for when finding them. You have to give AI all the context. Under those circumstances, AI can do it, but you can't possibly give it all the context; it's unrealistic."

And so:

> "AI cannot replace your employees. But if AI has the ability of continual learning, if, like your employee, it comes into the company and learns for two months, **then it could replace everyone in the world.**"

That's the whole game, stated in two sentences. Anyone who has actually worked with AI agents knows this is *exactly* the wall you hit; the model is amnesiac rather than dumb. Liang goes further than I would, though:

> "AI today does not lack taste or intuition; what it lacks is the ability to learn continually."

Taste was supposed to be the last human moat! And here's the most technically credible founder in the field going "no, taste is fine, the models have taste, they just can't remember your name."

On when continual learning gets solved, he's refreshingly honest: nobody knows. "The whole world still hasn't found a good method; everyone is groping." He calls this kind of research "scratching lottery tickets": it needs almost no GPUs and resists being staffed like a project; the threshold is low, anyone can scratch, and nobody knows which ticket pays out. The next breakthrough is currently a *thought* rather than a training run, and it's sitting unclaimed in someone's head.

Remember the irony from earlier, though. The employee who has learned your company for two months is precisely the product nobody switches away from. The next stair on this staircase ends the commodity era the whole pricing strategy assumes.

### What They Refuse to Build

The staircase explains every "no" from earlier. Video generation? "Commercially it is a good business. But it has nothing to do with intelligence." World models, the thing half of Silicon Valley currently swears is the future? He waves those off the main line at this stage too. Even multimodality gets filed under *component*: V4 will ship it natively, but "it is a component; it is not intelligence itself."

My favorite one: hallucinations are classified internally as a **product problem**. They consider it solvable with better post-training, something to get around to eventually, low on the list. The thing that launched ten thousand LinkedIn thinkpieces about AI's fundamental flaw is, in DeepSeek's internal taxonomy, roughly a UI bug.

There's also a genuinely elegant reason the roadmap is ordered the way it is: laziness, by design.

> "If we first solve continual learning, then solve the self-iteration singularity, and then solve embodied intelligence, the road becomes quite easy. Because further down the line, you can use the earlier technology to help develop the later technology."

Solve learning first, and the model helps build everything after. Robotics-first, in his framing, would be "a very grueling job." They've literally ordered the research agenda so that AI does the later homework. And the first customer for all of it is themselves: "The first goal of the models we build is not that everyone else finds them easy to use, but that we ourselves find them easy to use. That is the fastest way to achieve AGI." Dogfooding becomes the AGI strategy; the model exists to build its successor.

---

## The Economics: A Lab That Accidentally Makes Money

Here's where it gets almost funny. DeepSeek's API pricing formula, from the man himself: buy the servers, price the tokens so the servers pay for themselves in **ten months**, done. That works out to roughly a sixfold margin on compute, which he considers "a reasonable profit", and he openly admits demand is inelastic, meaning he could double prices tomorrow and roughly double revenue. He just... won't. At one point someone on the call pushes back on-screen that a ten-month payback is actually too profitable, and he simply agrees: "indeed there's still room to cut prices."

Then he tells this story, which I haven't stopped thinking about:

> "With one of our models, we initially worried that demand would be too high, so we set the price fairly high. Later we cut it to a quarter, and many people in the company group chat cheered. Because this is exactly the purpose of putting so much care into building this model well: to let everyone use it fully."

The employees *cheered a price cut.* Find me one other AI company where the group chat celebrates revenue going down. It sounds like PR fluff until you realize it's structural: if your people joined to make intelligence cheap and abundant, a price cut IS the win condition. The vision does the incentive alignment that RSUs do everywhere else.

(He does clock the other side of it, deadpan: "price cuts are certainly not a good thing for our competitors; they are definitely not cheering." That's your ARR, halved, by a man who describes it as sharing joy.)

### The Open Source Logic, Minus the Romance

I've written about DeepSeek-as-open-champion before, back when OpenAI was trying to get them banned. What's striking in this meeting is that Liang's own defense of open source contains zero romance. It's three cold observations:

**1. Closed buys you nothing.**

> "I don't see any benefit to closed-source. ByteDance's model is closed-source; what benefit does it get? I don't see any benefit."

**2. Open costs you nothing, provided you only want a reasonable profit.** Even with the weights public, running them well at scale is brutally hard. At his ten-month-payback price point, third parties deploying his own open model against him *lose money*. Open source only threatens your business "if you want to make a hundredfold profit." The restraint and the open-sourcing are load-bearing for each other. It's one machine.

**3. It's a size-class advantage.**

> "A startup that is too small doesn't have the strength to do it; a big company finds it hard to organize. This is a sweet spot that belongs to companies of our size."

And the detail that should quietly embarrass several labs: the open weights are the **same weights they serve.** "We won't open-source a slightly worse model while using a better one for our own deployment." There is no secret good version; the recipe on the box is the recipe in the kitchen.

Oh, and buried in the Q&A there's the fallback plan, delivered with a shrug: worst case, if all technical progress froze today, "just selling the API could probably support a public company." The doomsday scenario is a profitable business. Must be nice.

---

## The Compute Section (or: The Numbers They Asked Everyone Not to Share)

This is the part the host explicitly begged attendees to keep quiet, which of course means it's the part everyone shared first. The headline narrative, in his own framing:

> "We lag the US by about one to two years, and yet we got this done using only **one-twentieth** of the US's compute. In the future we want to rewrite this narrative: we use a fraction of its compute, but shorten the time gap further, down to 6 months, 3 months."

Per the transcript, DeepSeek is sitting on roughly twenty thousand H-equivalent GPUs, most of which just arrived. That's the entire hardware base of the lab that terrified Washington. For scale, he estimates the largest US frontier models at ~800B *active* parameters while DeepSeek still operates at a few tens of billions active, with the next generation targeted at 150-250B. Training at the US scale would take fifty thousand GB300s, and those are impossible for him to buy at any price.

He also settles "is DeepSeek efficient by choice?" once and for all:

> "We train models this big not because I think a model this big is enough, but because **that is all the resources we have.**"

All the architectural cleverness (MoE, MLA, the FP8 training, the entire "DeepSeek does more with less" mythos) is rationing rather than philosophy, and he's completely unsentimental about it. He extends the point to people, too: the China-US talent gap is roughly zero ("it's literally the same pool of people"), but fewer chips means fewer experiments means slower researcher development. Even the talent gap is a compute gap in a trenchcoat.

Then there's the scaling-wall take, which is the best subtweet of Silicon Valley discourse I've ever read:

> "When Silicon Valley says Scaling has hit its limit, **that is for Silicon Valley;** for Chinese people, we are still very far from that. We haven't Scaled to anywhere near that degree."

"The wall" becomes a regional phenomenon, a luxury complaint, like billionaires debating whether money buys happiness while you're rationing H100s.

And the ten-month payback number returns here, because it turns out to double as his entire capital allocation strategy. Money in the bank earns two percent a year; a GPU earns its own price back in ten months. So the plan for the billions they just raised is barbarically simple: turn all of it into cards, as fast as physically possible, paying a premium where needed, because "turning money into Nvidia cards is definitely better than putting it in the bank." His stated ideal is spending the entire financing round within half a year, and his stated frustration is that it can't be done; the cards physically cannot be bought fast enough. If procurement manages to spend twenty billion this year, they would "count as super high performers." Imagine your KPI being *spend money faster*, and still missing it.

## "Nvidia Is Digging Its Own Grave"

The chip section is the most geopolitically spicy part of the recording, and the one where Liang sounds least like a philosopher and most like an engineer with a grudge and a plan.

The claim that would have been unthinkable two years ago: when DeepSeek trained V3, they used NVIDIA's cards while sidestepping NVIDIA's ecosystem entirely. They wrote their own high-level compiler layer called TileLang and built everything on top of it, going "almost entirely free of dependence on Nvidia's ecosystem," at an efficiency cost he puts at "a loss of 1% to 2%; I think that's acceptable."

CUDA, the moat, the twenty-year fortress, the reason NVIDIA is worth more than entire G7 economies, is in his view "being dismantled rapidly," for a reason that has a poetic circularity to it: AI can write code now. The ecosystem lock-in was always really a "porting is expensive" lock-in, and AI just cratered the cost of porting. The moat is being drained by the very thing it irrigates.

On Huawei, he gives the most precise benchmark of domestic silicon I've seen anywhere: the gap is "four times plus two years", meaning four Huawei 950s to match one top NVIDIA card, on hardware trailing by two years, at which point it's a genuine drop-in for the GB200/GB300 supernodes ("latency and all, it's the same"). Even at a multiple of the price he'd consider it a substitute, because export controls mean the real choice is Huawei versus empty racks.

> "If we were in a normal commercial environment where I could buy Nvidia cards, then domestic substitution would be fairly hard; but in a situation where Nvidia cards can't be bought, everyone is forced into it."

Hence "Nvidia is digging its own grave", or more accurately, having its grave dug for it by US export policy, with Jensen handing over the shovel. Far from stopping DeepSeek, the controls created the market conditions for DeepSeek to spend its own R&D making Huawei's ecosystem viable, which is exactly what they're doing: the transcript has Huawei allocating them ~16,000 cards and DeepSeek porting the whole TileLang stack across, explicitly "to help Huawei build this ecosystem well." His prediction is that within a year the perception that domestic chips "can't be used" gets reversed with facts, leaving manufacturing capacity as the only bottleneck, and he expects that one to fade within five years.

If he's right, the export control policy will have accomplished the single most impressive own-goal in the history of industrial policy: it took the world's most efficient AI lab, which *wanted* to keep buying American, and conscripted it into building the American ecosystem's replacement.

---

## This Is a Lab Wearing a Company as a Raincoat

Now the part I found genuinely moving, and the reason this recording matters beyond strategy nerdery.

Everything about how DeepSeek runs internally, as described across these four hours, is recognizable, just from somewhere other than tech: it's a *research lab*. Specifically, it's what universities pretend their labs are like:

- **KPIs and performance reviews are absent entirely.** "There is no performance review, there is only the vision."
- **The vision has never been written down anywhere.** "It lives in the way we do things and in our attitude toward the world."
- **Half of every researcher's time is unassigned.** Google had its famous 20% time (RIP). DeepSeek's rule is that *assigned* work should stay under 50%; the other half is "explore whatever they think is important, with no prerequisites."
- **Overtime is off the table**, in *China*, in the industry that invented 996. His two reasons are perfect: research needs slack, and "we are extremely focused; being very focused means we have very few things to do."
- **Authority runs on consensus.** "It is not that I can push some matter through; it must be a consensus before I can push it through."
- **And the single only thing that matters:**

> "Our biggest core interest is maintaining the stability of the team; you could even say it is the only core interest. **As long as I can keep the team stable, I will surely achieve AGI. It is that simple.**"

Money is "certainly not the problem." Compute costs at worst a six-month delay. The only unrecoverable loss is people. Reportedly it's even contractual: the funding round is said to have come with conditions on investors amounting to *leave the researchers alone, and leave their would-be spinouts unfunded.* It's how a PI talks about their research group, far more than how a CEO talks about a company. When someone asks if the model is Bell Labs, he pushes back only on the economics: Bell Labs had a monopoly parent paying the bills, "but we clearly do need to commercialize... the government will not give me a single cent", which is incidentally the driest possible rebuttal to the "state-controlled operation" narrative OpenAI was selling Washington. This lab has to eat what it kills. It just refuses to kill more than it can eat.

And then there's the detail that completely rewired my sense of what frontier AI work actually is right now:

> "You could also say that right now **half the people in our company are labeling data.** Half of our core researchers, the most important people, half of them are labeling data."

The most efficient lab on Earth, the algorithmic-elegance people, and the founder's honest description of the current stage of AI is: my geniuses are doing data curation. High-end data work *is* the research now, and China has "no cost advantage" in it; expert-labeled data costs the same everywhere, and who knew the one thing that stays expensive in Shenzhen is taste.

This is what the four hours add up to: a research group that secretes products the way a gland secretes hormones, involuntarily, as a byproduct of its actual function. "Products are a by-product on the road to AGI" is an actual quote. The API runs without a sales team or customer support. The users could not be driven away. Revenue keeps happening *to* them. Every Western lab claims some version of this ("our products fund the mission!"), but when OpenAI says it there's a $500-billion-infrastructure-commitment-shaped asterisk attached, and when this guy says it, the supporting evidence is that he forgot to monetize the most viral app launch in history because the team was busy with V4.

My favorite moment in the whole recording makes the same point by accident. An investor delivers a full minute of poetry about DeepSeek as a banyan tree sheltering an ecosystem of little birds, "benefiting all things without contending." Liang's response, in its entirety, is to answer the technical question. That's the whole company in one exchange: the world keeps offering it metaphors, and it keeps replying with engineering.

## Loose Gems From the Q&A

A few things that fit nowhere above and were too good to cut. First, the takes that would each be a headline if he tweeted them:

- **On Anthropic being on top:** "Anthropic now being ahead of OpenAI is not long-term; it's a phase. In the future, OpenAI and Google will most likely rise in alternation." Followed by this gem of internal honesty: "Maybe half the people in our company, at any given time, half feel OpenAI is better." Imagine an American CEO volunteering that half his researchers prefer the rival's model, as a neutral weather report.
- **On China's endgame role:** the world's *largest producer* of intelligence, with the most chips, the most electricity, and systematically the cheapest output, "just as the services China provides in other industries may be cheaper." He treats AI as manufacturing, and made-in-China intelligence will sell at made-in-China prices.
- **On the domestic bloodbath:** too many Chinese labs building the same foundation models; it "will definitely converge" to maybe two big and two small, and maybe even fewer. It's brutal when you remember he's the reason half of them raised money.

And the human moments no comms team would have survived:

- "I hear you, but the video seems to have dropped, boss." Even the most consequential AI briefing of the year has Zoom problems.
- He offers the room a break three hours in ("do you want to eat something first?") then just keeps going when nobody objects.
- Asked how he'll balance pure research against his new capital-market obligations, the reassurance he offers his brand-new investors is essentially: *worst case we're merely a very good business.* "We hope to have a bigger dream, but we also have a fallback performance we can put out."

---

# So Do I Buy It?

Time for the elephant. This is a man talking to his own investors, in a meeting that leaked. Some skepticism is mandatory, so here's mine.

**The "we don't care about money" gospel is also excellent fundraising.** Notice the trick: "restraint" reassures investors he'll skip the billion-dollar super-app war, "10% of GDP" promises the upside anyway, and "reasonable profit" reads as discipline. The renunciation of greed is, itself, a great pitch.

**Restraint is cheap when constraint does it for you.** He applies exactly this acid to his own efficiency legend ("we train models this big because that is all the resources we have") and never once to his strategy. A lab whose capex was covered by a quant fund, whose GPU count is capped by export controls, and whose home market makes consumer monetization brutal anyway gives up much less than it appears to when it renounces profit. Some of the philosophy is surely scarcity metabolized into identity. The honest version of the claim is that DeepSeek made a virtue of necessity and then discovered the virtue compounds.

**The taking-less applies only to margins.** On compute, talent, and the CUDA-replacement layer they're building, it's total war, and he says so himself: the restraint "increases the probability of achieving AGI." Mistaking the monk for a pacifist would be the real error; the modesty is aimed.

**The leak itself is suspiciously convenient.** A meeting whose host loudly says *do not share this* produces a full recording, quote compilations, and a month of favorable coverage painting DeepSeek as principled, efficient, and inevitable, right after a fundraise, mid-Huawei-partnership, at peak national-champion narrative. Probably an investor just leaked it. But if you *wanted* to communicate all of this without the founder ever giving an interview, it would look exactly like this, and the "please don't record" plea is exactly the seasoning that makes it taste authentic.

**And still, I mostly buy it.** After all the discounting, two things are very hard to fake. The first is the *coherence*: pricing, open source, org design, roadmap, and chip strategy all reduce to one function, maximize P(AGI | team stays together), and every answer across four unscripted hours snaps to it, which is far beyond what anyone can improv. The second is the *track record*: almost everything he describes, they had already done before there were any outside investors to perform for.

# The Actual Lessons

Three, if you skimmed everything else:

1. **Strategy is subtraction.** Every "no" on that four-hour list is focus reinvested into the single thing they believe matters, and the unwritten vision does the alignment work that KPIs and RSUs do everywhere else, apparently better.

2. **Taking less wins, but only in commodity markets.** Capped margins are an un-undercuttable moat and intention sorts the battlefield before revenue exists, yet the whole trick rests on tokens staying fungible. Watch switching costs; the day models remember you is the day this lesson expires.

3. **The real bottleneck is learning.** The models have taste but they can't remember. Whoever cracks continual learning ("go get Little Wang", minus the briefing document) takes the next stair, ends the commodity era, and inherits both sides of this post's argument.

And the meta-lesson, the one the recording itself teaches: the most closed thing about the world's most open AI lab was always its founder's voice. It took a leak he explicitly asked to be prevented for us to hear four hours of it, and what it revealed was a research lab with a staircase drawn on its whiteboard, run by a man whose entire plan is *take less, focus, keep the team, climb.*

There was never a hidden agenda to find. The plan sits in public, in the weights, in the price list, and now in his own voice; DeepSeek has been telling us exactly what they're doing the whole time. The open question, the one this transcript sharpens rather than settles, is whether the world they're building toward still has room for the strategy that got them there.

---

*This post is based on the widely-circulated recording and ~34,000-word transcript of DeepSeek's May 20th investor meeting (~3h44m of audio), which spread through Chinese tech media over the past month before the original post was taken down; DeepSeek has not confirmed its authenticity. Quotes are faithful-in-meaning rather than word-perfect for the reasons flagged up top. The only English-language coverage I've come across is [a short video by Squintist](https://www.youtube.com/watch?v=BcKQk0NeBV0) (not affiliated, as always). Liang Wenfeng's two prior long-form interviews, with the Chinese outlet 暗涌 Waves (2023 and 2024), remain the only other substantial public record of his thinking, and are worth reading alongside this.*
