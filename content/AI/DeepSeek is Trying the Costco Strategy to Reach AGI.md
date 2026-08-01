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

He founded DeepSeek - the lab that came out of nowhere in January 2025 with R1, matched OpenAI's o1 at a fraction of the cost, and cost NVIDIA a trillion dollars of market cap in a day. In the years since, he has given exactly two long-form interviews, both in text, both to the same Chinese publication. He communicates with the world through model weights and papers and perhaps most interestingly - his lab was bankrolled entirely by High-Flyer, his own quant hedge fund, and took no outside money until this year.

So when a 3 hour 44 minute transcript of him talking to his new investors started circulating on a May 20th meeting, it instantly became the largest sample of him thinking out loud that exists anywhere, spreading across WeChat before the original post was pulled and almost no one heard of it.

The best part was that midway through the recording, the meeting host pleads with attendees: please don't spread these numbers, please don't screen-record this.

And here we are :)

*A note on sourcing before we go further: everything here comes from a ~34,000-word Chinese transcript of that audio, which circulated on WeChat for about a day before the original post was deleted. DeepSeek has never confirmed the meeting. The details are consistent with independent reporting on the funding round and the thinking matches his two known interviews closely, but the audio itself is not public, the transcript is machine-transcribed and machine-translated (it garbles model names, rendering what is almost certainly "Opus 4.7" as "O4.7"), and the specific figures in it, GPU counts, revenue, parameter sizes, are single-sourced and unverifiable. Quotes below are faithful in meaning rather than word-perfect, and anything with a number attached deserves a mental asterisk.*

This is a deep dive about who is this man, what is DeepSeek doing different and how it's planning to achieve AGI using Costco's strategy.

## Okay, but what is the Costco strategy.

Costco runs one of the strangest pricing policies in American retail, capping its markups around 14-15% as a matter of internal law, and the $1.50 hot dog combo has survived every inflation cycle since 1985.

The cap looks like generosity and works like a weapon - every competitor who needs fat margins has to fight you on terrain where fat margins are impossible. Nobody can undercut a company that has already decided to keep almost nothing.

DeepSeek has its own version of that internal law, and it might be the single most important number in this whole leak: buy a batch of GPUs, then price the API so the hardware pays for itself in **ten months**. That is the entire pricing policy. Over a server's three-to-five-year life it works out to roughly a sixfold margin on compute, he considers that "a reasonable profit", and everything else in this post hangs off that one self-imposed cap.

And the cap, in his telling, is itself the AGI strategy rather than just the business model that funds it. Cheap tokens and open weights pull the world onto DeepSeek's stack and standardize the ecosystem around them. The renounced profit buys what he actually needs: researchers who join for the mission and stay ("open source and low prices make employees feel a real sense of accomplishment... give the organization cohesion"), an industry with no reason to fight them, and a revenue floor that funds research without dragging the lab into product wars. He states the causality plainly: this kind of restraint, over the long horizon, "can increase the probability that we achieve AGI."

Liang is convinced that intelligence is bound to become a commodity and his entire strategy relies on this one bet - but the breakthrough he wants most might just end up being the thing that breaks his own playbook. Hold that thought.

---

## "Restraint is a Strategy"

If you remember one phrase from this entire meeting, it's this one. He says it over and over, like a mantra:

> "Restraint is a strategy. It lies in the fact that sometimes you can give up some things in exchange for many other things."

Much of the meeting concerned what DeepSeek deliberately refuses to do. In four hours, he said:

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

## The GDP Math That Explains Everything

Liang views AI like a quant: as an allocation problem governed by incentives, margins, and adversarial responses. He thinks AI will eventually be worth something like **ten percent of humanity's GDP**, and where most founders would start drawing their slice of the pie chart, his conclusion is that trying to monopolize it means being "cast aside by history."

He then plays the game out like an iterated auction. OpenAI's math works on paper, but a rival willing to take one percent of that pie beats the one aiming for ten, and someone willing to take a tenth of a percent beats them both. Then the kicker, which might be my favorite quote of the entire meeting:

> "You don't even need to actually take more; **if your vision is to take more, you will be beaten by those whose vision is to take less.** Actually no one has taken any money yet; it is just a vision. If your vision is to take more, you have already lost."

Nobody has captured the value yet; the pie itself is still hypothetical. He's saying the *intention* alone is enough to lose, because your intention shapes your pricing, your openness, your hiring, and how hard the rest of the world works to route around you. The stakes are asymmetric too - when OpenAI needs to charge $200/month to justify its infrastructure while DeepSeek runs on the ten-month rule, only one of them needs fat margins to survive.

### Where the Auction Logic Breaks

Now the stress test, because that auction argument gets quoted a little too admiringly, including above, by me.

"The one who takes less beats the one who takes more" is true in exactly one kind of market: a commodity market with near-zero switching costs. Hot dogs qualify, and so does electricity. It is genuinely unclear that intelligence does. If distribution, integration, habit, and trust are the real moats, the 1% player loses to the 10% player all day long. Apple has taken the fattest margins in consumer hardware for two decades and every ascetic competitor has bounced off, because an iPhone is a habit and an ecosystem rather than a fungible good. ChatGPT is a verb in a way an API price list will never be. Enterprises sign multi-year contracts precisely so they can stop re-evaluating vendors.

Liang seems to know this, and his answer is hiding in his own words. Asked where model competition ultimately lands, he names exactly three moats: cost, time, and user experience. "Apart from these, there may be no gap." That sentence is the tell. The auction logic is really a bet that intelligence commoditizes, that models converge until tokens are interchangeable and price is the product. He even expects his own margin to compress, saying the sixfold profit will likely fall to fourfold or threefold over time. Every piece of the strategy (open weights, capped margins, refusing the super app) is downstream of that single assumption. If it holds, he wins on discipline. If it breaks, the company hoarding users and integrations wins instead, and the restraint was just leaving money on the table.

Which sets up the best irony in the whole transcript: the breakthrough Liang wants most is a model that learns continuously, absorbing your context the way a new employee does. To be precise, continual learning does not automatically mean private per-customer memory; a model can keep improving globally without embedding itself in anyone's business. But the version Liang describes, a model that joins your company and learns it for two months like a hire, is exactly the embedding kind. That model is the least fungible product imaginable. Memory is a switching cost. If DeepSeek gets exactly what it wants, intelligence stops being a commodity, and the Costco math stops binding.

The strategy is perfectly tuned for an era its own roadmap is trying to end.

## Watermelons and Sesame Seeds

The single best analogy in the meeting is Liang's own, explaining why they didn't fight to retain the tsunami of users R1 brought in:

> "The reason we don't fight for that is that **there are watermelons behind, and what's in front may all be sesame seeds.** Of course this sesame seed may be a fairly large one, but I don't think it counts as big."

DeepSeek accidentally became the fastest-growing consumer app on the planet, and every growth playbook says: monetize, retain, you will never get this chance again. Instead they kept the users at deliberately minimal cost, ran no retention push, built no super app. Going viral "was not in our script," and at one point they didn't even want to maintain the users anymore, but **"the users couldn't be driven away."**

Meanwhile everyone else fought over the chatbot market until, in his words, "their heads were bloodied," and the season's most-downloaded chatbot came from the one company that sat the war out. His explanation is what he calls a "dimensional-reduction strike" (降维打击, a Three-Body Problem reference that Chinese tech discourse uses the way we use "10x"): if you're organized around AGI and your model is genuinely at the frontier, consumer products and enterprise revenue fall out the bottom as byproducts. The company fighting for the product has to be better at products than you are at models, and right now, models matter more. He sums it up with a line that reads like a fortune cookie until you remember he's describing his own P&L: the thing you most want, you can't get, while the thing you don't care about comes easily.

---

## The Staircase: DeepSeek's Actual Roadmap

This is where the meeting stops being a business call and becomes a research seminar, and where you remember that this "company" is really a lab with a billing department.

Liang lays out the path to AGI as a staircase where each step stands on the previous one:

**Language models → Chain-of-Thought → Agents → Continual Learning → (gradual) Singularity → Embodiment**

Last year's step was CoT, this year's is agents, and in his telling each step gets climbed until it caps out. CoT, he claims, is already a completed stair: it surpassed the very top humans at olympiad math and competitive programming, and still stopped short of AGI. The thing the entire industry is currently valued on, filed under *finished*.

So what's the next stair? His answer is the most clarifying explanation of AI's actual bottleneck I've read anywhere, and he does it with an office errand. A new employee spends two months absorbing context, and afterward you can say "go get Little Wang" and they just do it. An AI model gets zero of those two months; every conversation is its first day on the job, forever. You'd have to explain who Little Wang is, where he sits, and how to approach him, every single time.

> "AI cannot replace your employees. But if AI has the ability of continual learning, if, like your employee, it comes into the company and learns for two months, **then it could replace everyone in the world.**"

That's the whole game in two sentences, and anyone who has worked with AI agents knows this is exactly the wall you hit; the model is amnesiac rather than dumb. He goes further than I would, claiming AI today "does not lack taste or intuition," only the ability to keep learning. Taste was supposed to be the last human moat, and here is the founder of the most efficiency-obsessed lab in the field saying the models have taste, they just can't remember your name.

On when this gets solved, he's refreshingly honest: nobody knows, "the whole world still hasn't found a good method; everyone is groping." Internally they call this kind of research "scratching lottery tickets": it needs almost no GPUs, resists being staffed like a project, and nobody knows which ticket pays out. The next breakthrough is currently a thought rather than a training run, sitting unclaimed in someone's head. And per the auction-logic irony above, whoever's head it comes out of will have ended the commodity era.

The staircase also explains every refusal from earlier. Video generation is "a good business" with "nothing to do with intelligence." World models are off the main line at this stage. Multimodality is a component that V4 will ship natively, but a component only. Hallucinations, the thing that launched ten thousand LinkedIn thinkpieces, are classified internally as a "product problem" to be fixed with better post-training, which is to say: a backlog ticket. Even the roadmap's ordering is engineered laziness: solve learning first, and the model helps build everything after it, which is why robotics sits last. The first customer for all of it is DeepSeek itself; the models exist, in his words, first to be useful to their own developers, because that is the fastest way to AGI. The model exists to build its successor.

---

## The Economics: A Lab That Accidentally Makes Money

The ten-month rule from the top plays out with almost comic discipline. He openly admits demand is inelastic, meaning he could double prices tomorrow and roughly double revenue. He just... won't. At one point someone on the call pushes back on-screen that a ten-month payback is actually too profitable, and he simply agrees: "indeed there's still room to cut prices."

Then there's this story:

> "With one of our models, we initially worried that demand would be too high, so we set the price fairly high. Later we cut it to a quarter, and many people in the company group chat cheered. Because this is exactly the purpose of putting so much care into building this model well: to let everyone use it fully."

The employees *cheered a price cut.* It sounds like PR fluff until you realize it's structural: if your people joined to make intelligence cheap and abundant, a price cut IS the win condition. The vision does the incentive alignment that RSUs do everywhere else. (He does clock the other side of it, deadpan: "price cuts are certainly not a good thing for our competitors; they are definitely not cheering." That's your ARR, halved, by a man who describes it as sharing joy.)

Open source gets the same unromantic treatment, in three cold observations. Closed buys you nothing: "ByteDance's model is closed-source; what benefit does it get? I don't see any benefit." Open costs you nothing, provided you only want a reasonable profit: running frontier weights well at scale is brutally hard, and at his price point, third parties deploying his own open model against him lose money; open source only threatens you "if you want to make a hundredfold profit." The restraint and the open-sourcing are load-bearing for each other. And it's a size-class advantage: startups lack the strength, big companies can't organize it, "a sweet spot that belongs to companies of our size."

The detail that should quietly embarrass several labs: the open weights are the **same weights they serve**, with no secret better version held back. And buried in the Q&A, the fallback plan, delivered with a shrug: worst case, if all technical progress froze today, "just selling the API could probably support a public company." The doomsday scenario is a profitable business. Must be nice.

---

## The Compute Section (or: The Numbers They Asked Everyone Not to Share)

This is the part the host explicitly begged attendees to keep quiet, which of course means it's the part everyone shared first. The headline narrative, in his framing: DeepSeek lags the US by one to two years while using one-twentieth of the compute, and the goal is to rewrite that ratio, "shorten the time gap further, down to 6 months, 3 months."

Per the transcript (and remember the asterisk from the top), DeepSeek sits on roughly twenty thousand H-equivalent GPUs, most freshly arrived. He estimates the largest US frontier models at ~800B *active* parameters while DeepSeek operates at a few tens of billions active, with the next generation targeted at 150-250B. Training at US scale would take fifty thousand GB300s he cannot buy at any price.

He also settles "is DeepSeek efficient by choice?" once and for all:

> "We train models this big not because I think a model this big is enough, but because **that is all the resources we have.**"

All the architectural cleverness, the entire "does more with less" mythos, is rationing rather than philosophy, and he's completely unsentimental about it. He extends the point to people: the China-US talent gap is roughly zero ("it's literally the same pool of people"), but fewer chips means fewer experiments means slower researcher development. Even the talent gap is a compute gap in a trenchcoat.

Then the best subtweet of Silicon Valley discourse I've ever read:

> "When Silicon Valley says Scaling has hit its limit, **that is for Silicon Valley;** for Chinese people, we are still very far from that. We haven't Scaled to anywhere near that degree."

"The wall" becomes a regional phenomenon, a luxury complaint, like billionaires debating whether money buys happiness while you're rationing H100s.

And the ten-month payback number returns here, because it doubles as his entire capital allocation strategy. Money in the bank earns two percent a year; a GPU earns its own price back in ten months. So the plan for the billions they just raised is barbarically simple: turn all of it into cards as fast as physically possible, paying a premium where needed, because "turning money into Nvidia cards is definitely better than putting it in the bank." His stated ideal is spending the entire round within half a year, and his stated frustration is that the cards physically cannot be bought fast enough. If procurement spends twenty billion this year, they "count as super high performers." Imagine your KPI being *spend money faster*, and still missing it.

## "Nvidia Is Digging Its Own Grave"

The most geopolitically spicy claim in the recording: when DeepSeek trained V3, they used NVIDIA's cards while sidestepping NVIDIA's ecosystem entirely, on their own compiler layer called TileLang, at an efficiency cost he puts at one to two percent. CUDA, the twenty-year fortress that makes NVIDIA worth more than entire G7 economies, is in his view "being dismantled rapidly," and the reason has a poetic circularity: AI can write code now. The lock-in was always really a "porting is expensive" lock-in, and AI cratered the cost of porting. The moat is being drained by the very thing it irrigates.

On Huawei he gives the most precise benchmark of domestic silicon I've seen anywhere: the gap is "four times plus two years", four Huawei 950s to match one top NVIDIA card, on hardware trailing by two years, at which point it substitutes for the GB200/GB300 supernodes, latency and all. Even at a multiple of the price he'd take it, because export controls mean the real choice is Huawei versus empty racks. In a normal market, he says, domestic substitution would be hard; with NVIDIA unbuyable, "everyone is forced into it." The transcript has Huawei allocating DeepSeek ~16,000 cards and DeepSeek porting the whole TileLang stack across, explicitly "to help Huawei build this ecosystem well," with his prediction that within a year the domestic-chips-don't-work perception gets reversed by facts, leaving only manufacturing capacity, which he expects to fade within five years.

If he's right, US export policy will have accomplished the most impressive own-goal in the history of industrial policy: it took the world's most efficient AI lab, which *wanted* to keep buying American, and conscripted it into building the American ecosystem's replacement.

---

## This Is a Lab Wearing a Company as a Raincoat

Everything about how DeepSeek runs internally is recognizable, just from somewhere other than tech: it's a research lab, specifically the kind universities pretend theirs are. No KPIs and no performance reviews ("there is no performance review, there is only the vision"), a vision that has never been written down anywhere, half of every researcher's time unassigned to explore whatever they want, authority that runs on consensus, and no overtime, in China, in the industry that invented 996, because research needs slack and extreme focus means there is very little to do.

One thing, and only one thing, is sacred:

> "Our biggest core interest is maintaining the stability of the team; you could even say it is the only core interest. **As long as I can keep the team stable, I will surely achieve AGI. It is that simple.**"

Money is "certainly not the problem." Compute costs at worst a six-month delay. The only unrecoverable loss is people, and reportedly it's even contractual: the funding round is said to have come with conditions on investors amounting to leaving the researchers alone and their would-be spinouts unfunded. It's how a PI talks about a research group, far more than how a CEO talks about a company. When someone asks if the model is Bell Labs, he pushes back only on the economics: Bell Labs had a monopoly parent paying the bills, "but we clearly do need to commercialize... the government will not give me a single cent", which is incidentally the driest possible rebuttal to the "state-controlled operation" narrative OpenAI was selling Washington.

And then the detail that rewired my sense of what frontier AI work actually is right now:

> "You could also say that right now **half the people in our company are labeling data.** Half of our core researchers, the most important people, half of them are labeling data."

The most efficient lab on Earth, and the founder's honest description of the current stage of AI is: my geniuses are doing data curation, because high-end data work *is* the research now, and expert-labeled data costs the same everywhere. Who knew the one thing that stays expensive in Shenzhen is taste.

What the four hours add up to is a research group that secretes products the way a gland secretes hormones, involuntarily, as a byproduct of its actual function. "Products are a by-product on the road to AGI" is an actual quote; the API runs without a sales team or customer support, and revenue keeps happening *to* them. Every Western lab claims some version of this, but when OpenAI says it there's a $500-billion-infrastructure-commitment-shaped asterisk attached, and when this guy says it, the supporting evidence is that he barely monetized the most viral app launch in history because the team was busy with V4.

The moment that sums it all up: an investor delivers a full minute of poetry about DeepSeek as a banyan tree sheltering an ecosystem of little birds, "benefiting all things without contending." Liang's response, in its entirety, is to answer the technical question. The world keeps offering this company metaphors, and it keeps replying with engineering.

A few loose gems worth saving: he thinks Anthropic being ahead is "a phase" and that OpenAI and Google will "rise in alternation," immediately followed by the confession that "maybe half the people in our company, at any given time, half feel OpenAI is better," which no American CEO would volunteer as a neutral weather report. And asked how he'll balance pure research against his new capital-market obligations, the reassurance he offers his brand-new investors is essentially: worst case, we're merely a very good business. "We hope to have a bigger dream, but we also have a fallback performance we can put out."

---

# So Do I Buy It?

Time for the elephant. This is a man talking to his own investors, in a meeting that leaked. Some skepticism is mandatory, so here's mine.

**The "we don't care about money" gospel is also excellent fundraising.** Notice the trick: "restraint" reassures investors he'll skip the billion-dollar super-app war, "10% of GDP" promises the upside anyway, and "reasonable profit" reads as discipline. The renunciation of greed is, itself, a great pitch.

**Restraint is cheap when constraint does it for you.** He applies exactly this acid to his own efficiency legend ("that is all the resources we have") and never once to his strategy. A lab whose capex was covered by a quant fund, whose GPU count is capped by export controls, and whose home market makes consumer monetization brutal anyway gives up much less than it appears to when it renounces profit. Some of the philosophy is surely scarcity metabolized into identity. The honest version is that DeepSeek made a virtue of necessity and then discovered the virtue compounds.

**The taking-less applies only to margins.** On compute, talent, and the CUDA-replacement layer, it's total war, and he says so himself: the restraint "increases the probability of achieving AGI." Mistaking the monk for a pacifist would be the real error; the modesty is aimed.

**The leak itself is suspiciously convenient.** A meeting whose host loudly says *do not share this* produces a full transcript and a month of favorable coverage, right after a fundraise, mid-Huawei-partnership, at peak national-champion narrative. Probably an investor just leaked it. But if you *wanted* to communicate all of this without the founder ever giving an interview, it would look exactly like this, and the "please don't record" plea is exactly the seasoning that makes it taste authentic.

**And still, I mostly buy it.** Two things are very hard to fake. The first is coherence: pricing, open source, org design, roadmap, and chip strategy all reduce to one function, maximize P(AGI | team stays together), and every answer across four unscripted hours snaps to it, which is far beyond what anyone can improv. The second is the track record: almost everything he describes, they had already done before there were any outside investors to perform for.

# The Actual Lessons

Three, if you skimmed everything else:

1. **Strategy is subtraction.** Every "no" on that four-hour list is focus reinvested into the single thing they believe matters, and the unwritten vision does the alignment work that KPIs and RSUs do everywhere else, apparently better.

2. **Taking less wins, but only in commodity markets.** Capped margins are an un-undercuttable moat and intention sorts the battlefield before revenue exists, yet the whole trick rests on tokens staying fungible.

3. **The real bottleneck is learning.** The models have taste but they can't remember. Whoever cracks continual learning takes the next stair, and takes the commodity era with it.

So, the question this whole piece has been circling: is the restraint a durable strategy, a temporary artifact of sanctions, or an ideology that collapses the day persistent agents arrive? My answer after four hours is that it's all three, in sequence. It was born as constraint, a lab that couldn't buy GPUs making a philosophy of needing fewer. It currently operates as a durable moat, because intelligence today really is close to fungible and nobody can undercut the capped player. And it carries its own expiry date, because the moment models remember you, taking less stops being the winning move.

Which leaves one concrete thing to watch. There was never a hidden agenda here; the plan sits in public, in the weights, in the price list, and now in his own voice. So when continual learning ships, look at one number: the payback period. If it's still ten months, the philosophy was real all along.

---

*Sourcing, once more: this post is based on the circulated transcript described in the note up top, which DeepSeek has not confirmed. The only English-language coverage I've come across is [a short video by Squintist](https://www.youtube.com/watch?v=BcKQk0NeBV0) (not affiliated, as always). Liang Wenfeng's two prior interviews, with the Chinese outlet 暗涌 Waves (2023 and 2024), remain the only other substantial public record of his thinking, and are worth reading alongside this.*
