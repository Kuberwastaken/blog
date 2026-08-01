---
title: DeepSeek's Plan for AGI is the Costco Hot Dog
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

He founded DeepSeek - the lab that came out of nowhere in January 2025 with R1, matched OpenAI's O1 at a fraction of the cost, and cost NVIDIA half a trillion dollars of market cap in a day.

![hero-image](https://cdn.kuber.studio/assets/media/deepseek-meeting/hero.png)

In the years since, he has given exactly two long-form interviews, both in text to the same Chinese publication, and perhaps most interestingly - his lab was bankrolled entirely by High-Flyer, his own quant hedge fund, and took no outside money until this year.

So when a 3 hour 44 minute transcript of him talking to his new investors this may started circulating - it instantly became the largest sample of him thinking out loud that exists anywhere, spreading across WeChat before the original post was pulled and almost no one heard of it.

The best part was that midway through the recording, the meeting host pleads with attendees: please don't spread these numbers, please don't screen-record this.

And here we are :)

This is a deep dive about who is this man, what is DeepSeek doing different and how it's planning to achieve AGI using Costco's strategy.

*PS: everything here comes from a ~34,000-word Chinese transcript of that audio, which circulated on WeChat for about a day before the original post was deleted. The details are consistent with independent reporting on the funding round and the thinking matches his two known interviews closely. the transcript is machine-transcribed and translated through Claude Opus 5, the specific figures in it, GPU counts, revenue, parameter sizes, are single-sourced and unverifiable. Quotes below are faithful in meaning rather than word-perfect, and anything with a number attached deserves a mental asterisk.*

## Okay, but what is the Costco strategy.

Costco runs one of the strangest pricing policies in American retail, capping its markups around 14-15% as a matter of internal law, and the $1.50 hot dog combo has survived every inflation cycle since 1985.

The cap looks like generosity and works like a weapon - every competitor who needs fat margins has to fight you on terrain where fat margins are impossible. Nobody can undercut a company that has already decided to keep almost nothing.

DeepSeek has its own version of that internal law, and it might be the single most important number in this whole leak: buy a batch of GPUs, then price the API so the hardware pays for itself in **ten months**. That is the entire pricing policy. Over a server's three-to-five-year life it works out to roughly a sixfold margin on compute, he considers that "a reasonable profit", and everything else in this post hangs off that one self-imposed cap.

<div class="gpu-payback" aria-label="Timeline of one GPU server over five years: months one to ten pay back the hardware, months eleven to sixty are margin">
  <div class="gpu-bar">
    <div class="gpu-seg gpu-pay"><span>payback<br/><em>months 1 to 10</em></span></div>
    <div class="gpu-seg gpu-margin"><span>pure margin · the other ~5x · price stays put anyway</span></div>
  </div>
  <div class="gpu-axis">
    <span class="gpu-t10">month 10 · hardware fully paid off</span>
    <span class="gpu-t60">month 60 · server retires</span>
  </div>
</div>

<style>
.gpu-payback{margin:1.9rem 0;font-family:var(--codeFont),monospace}
.gpu-bar{display:flex;height:3.1rem;border:1px solid var(--lightgray);border-radius:.45rem;overflow:hidden}
.gpu-seg{display:flex;align-items:center;justify-content:center;font-size:.67rem;line-height:1.25;text-align:center;padding:0 .45rem}
.gpu-pay{width:16.67%;min-width:70px;background:var(--secondary);color:var(--light);font-weight:700;letter-spacing:.04em;flex-direction:column;gap:.1rem}
.gpu-pay em{font-style:normal;font-weight:400;font-size:.54rem;opacity:.9;letter-spacing:0}
.gpu-margin{flex:1;color:var(--darkgray);background:repeating-linear-gradient(-45deg,color-mix(in srgb,var(--secondary) 15%,transparent) 0 10px,color-mix(in srgb,var(--secondary) 6%,transparent) 10px 20px);border-left:2px solid var(--secondary)}
.gpu-axis{position:relative;height:1.35rem;margin-top:.4rem;font-size:.61rem;color:var(--gray)}
.gpu-axis span{position:absolute;top:0;white-space:nowrap}
.gpu-t10{left:16.67%;transform:translateX(-50%);color:var(--secondary);font-weight:700}
.gpu-t60{right:0}
@media (max-width:560px){.gpu-t10{left:0;transform:none}.gpu-t60{display:none}}
</style>

And the cap, in his telling, is itself the AGI strategy rather than just the business model that funds it.

Cheap tokens and open weights pull the world onto DeepSeek's stack and standardize the ecosystem around them. The renounced profit buys what he actually needs: researchers who join for the mission and stay ("open source and low prices make employees feel a real sense of accomplishment... give the organization cohesion"), an industry with no reason to fight them, and a revenue floor that funds research without dragging the lab into product wars.

Liang is convinced that intelligence is bound to become a commodity and his entire strategy relies on this one bet - but the breakthrough he wants most might just end up being the thing that breaks his own playbook. Hold that thought.

---
## "Restraint is a Strategy"

If you took away just one phrase from the entire meeting, he wanted this to be it- he said it over and over like a mantra.

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

Every AI company on Earth is currently in a land-grab. Grab users, grab revenue, grab verticals, grab GPUs, grab the entire value chain if you can. And here's the guy who arguably had the *most* momentum to grab with is saying the grabbing itself is what kills you.

## The AI Industry through a Quant's Perspective.

Liang views AI like a quant: as an allocation problem governed by incentives, margins, and adversarial responses.

He thinks AI will eventually be worth something like **ten percent of humanity's GDP**, and that trying to monopolize it means being "cast aside by history."

He then says OpenAI's math works on paper, but a rival willing to take one percent of that pie beats the one aiming for ten, and someone willing to take a tenth of a percent beats them both, followed by my favorite quote of the entire meeting:

> "You don't even need to actually take more; **if your vision is to take more, you will be beaten by those whose vision is to take less.** Actually no one has taken any money yet; it is just a vision. If your vision is to take more, you have already lost."

The stakes are asymmetric too - when OpenAI needs to charge $200/month to justify its infrastructure while DeepSeek runs on the ten-month rule (more on that in a bit), only one of them needs fat margins to survive.

### Where the Auction Logic Breaks

I already know that the auction argument would get quoted a little too admiringly, including above, by me - so let's run it back.

"The one who takes less beats the one who takes more" is true in exactly one kind of market - a commodity market with near-zero switching costs and contrary to tech twitter, we're still not sure if intelligence becomes one.

If distribution, integration, habit, and trust are the real moats, the 1% player loses to the 10% player all day long.

Apple has taken the fattest margins in consumer hardware for two decades and every ascetic competitor has bounced off, because an iPhone is a habit and an ecosystem rather than a fungible good. ChatGPT is a verb in a way an API price list will never be. Enterprises sign multi-year contracts precisely so they can stop re-evaluating vendors.

Liang seems to know this, and his answer is hiding in his own words. Asked where model competition ultimately lands, he names exactly three moats: cost, time, and user experience. "Apart from these, there may be no gap."

Which sets up the best irony in the whole transcript: the breakthrough Liang wants most is a model that learns continuously, absorbing your context the way a new employee does.

To be precise, continual learning does not automatically mean private per-customer memory; a model can keep improving globally without embedding itself in anyone's business. But the version Liang describes - a model that joins your company and learns it for two months like a hire, is exactly the embedding kind. That model is the least fungible product imaginable. If DeepSeek gets exactly what it wants, intelligence stops being a commodity, and the Costco math stops binding.

Which is funny exactly because

## AI Labs are Petitioning to Stop Continual Learning

The week I'm writing this, over a thousand employees across the Western frontier labs (OpenAI, Anthropic, DeepMind, Meta, with Anthropic's CEO and several co-founders among the signatories) published a joint statement called "Pacing the Frontier," and both OpenAI's and Anthropic's official accounts endorsed it.

![pacing-frontier](https://cdn.kuber.studio/assets/media/deepseek-meeting/pacing-frontier.png)

The ask, in the statement's own words: that the US government support an international effort to build "the technical and governance tools needed to deliberately pace the frontier of automated AI development." Strip the policy language and the thing they want a brake pedal for is models improving models, the recursive loop that sits one stair above continual learning on Liang's own staircase.

This came weeks after Anthropic published research on recursive self-improvement and OpenAI started openly measuring how much of its research loop its models now run. The people closest to the frontier looked at the next stair and asked the government to help build a railing first. [Theo has the best breakdown of the whole saga](https://youtu.be/yz0SZIng2Po) (not affiliated, as always).

The part of note is that Chinese labs were excluded from signing. The letter is addressed to the US government, and its organizers said plainly that they decided against accepting signatories from Chinese companies at this time. So the industry's brake pedal, if it ever gets built, is being designed without the lab whose entire published roadmap is the thing being braked. DeepSeek couldn't have signed the petition against its own next stair even if it wanted to, and everything in the transcript says it wouldn't have wanted to.

The strategy is perfectly tuned for an era its own roadmap is trying to end, and half the industry just petitioned to stop that ending from arriving.

## Watermelons and Sesame Seeds

The single best analogy in the meeting is Liang's own, explaining why they didn't fight to retain the tsunami of users R1 brought in:

> "The reason we don't fight for that is that **there are watermelons behind, and what's in front may all be sesame seeds.** Of course this sesame seed may be a fairly large one, but I don't think it counts as big."

<div class="wm-viz" aria-label="Tiny sesame seeds labeled the chatbot war next to a huge watermelon labeled AGI">
  <div class="wm-side">
    <div class="wm-seeds"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="wm-label">sesame seeds · the chatbot war</div>
  </div>
  <div class="wm-side">
    <div class="wm-melon"></div>
    <div class="wm-label">watermelons · AGI</div>
  </div>
</div>

<style>
.wm-viz{display:flex;align-items:flex-end;justify-content:center;gap:4rem;margin:1.9rem 0;font-family:var(--codeFont),monospace}
.wm-side{display:flex;flex-direction:column;align-items:center;gap:.65rem}
.wm-seeds{display:flex;flex-wrap:wrap;justify-content:center;align-content:flex-end;gap:.3rem;width:3.2rem;min-height:1rem}
.wm-seeds i{width:.42rem;height:.26rem;border-radius:50%;background:color-mix(in srgb,var(--secondary) 55%,var(--gray))}
.wm-seeds i:nth-child(2n){transform:rotate(28deg)}
.wm-seeds i:nth-child(3n){transform:rotate(-20deg)}
.wm-melon{width:7.2rem;height:7.2rem;border-radius:50%;border:2px solid var(--secondary);background:repeating-linear-gradient(105deg,color-mix(in srgb,var(--secondary) 80%,var(--dark)) 0 13px,color-mix(in srgb,var(--secondary) 32%,var(--light)) 13px 24px);box-shadow:0 0 22px color-mix(in srgb,var(--secondary) 22%,transparent)}
.wm-label{font-size:.62rem;color:var(--gray);white-space:nowrap}
@media (max-width:480px){.wm-viz{gap:2rem}.wm-melon{width:5.5rem;height:5.5rem}}
</style>

DeepSeek accidentally became the fastest-growing consumer app on the planet, and every growth playbook says: monetize, retain, you will never get this chance again. Instead they kept the users at deliberately minimal cost, ran no retention push, built no super app.

Going viral "was not in our script," and at one point they didn't even want to maintain the users anymore, but **"the users couldn't be driven away."**

Meanwhile everyone else fought over the chatbot market until, in his words, "their heads were bloodied," and the season's most-downloaded chatbot came from the one company that sat the war out. His explanation is what he calls a "dimensional-reduction strike" (降维打击, a Three-Body Problem reference that Chinese tech discourse uses the way we use "10x"): if you're organized around AGI and your model is genuinely at the frontier, consumer products and enterprise revenue fall out the bottom as byproducts.

---

## DeepSeek's Staircase to AGI

Liang lays out the path to AGI as a staircase where each step stands on the previous one:

<div class="agi-stairs" aria-label="DeepSeek's staircase to AGI: language models, chain-of-thought, agents (current), continual learning, singularity, embodiment">
  <div class="stair done" style="--i:1;">
    <span class="stair-name">Language Models</span>
    <span class="stair-note">the base</span>
  </div>
  <div class="stair done" style="--i:2;">
    <span class="stair-name">Chain-of-Thought</span>
    <span class="stair-note">climbed last year</span>
  </div>
  <div class="stair now" style="--i:3;">
    <span class="stair-tag">you are here</span>
    <span class="stair-name">Agents</span>
    <span class="stair-note">climbing this year</span>
  </div>
  <div class="stair todo" style="--i:4;">
    <span class="stair-name">Continual Learning</span>
    <span class="stair-note">the next stair, unsolved</span>
  </div>
  <div class="stair todo" style="--i:5;">
    <span class="stair-name">Singularity</span>
    <span class="stair-note">gradual, AI develops AI</span>
  </div>
  <div class="stair todo" style="--i:6;">
    <span class="stair-name">Embodiment</span>
    <span class="stair-note">the endpoint</span>
  </div>
</div>

<style>
.agi-stairs{display:flex;align-items:flex-end;gap:.3rem;margin:1.9rem 0 1.7rem;overflow-x:auto;border-bottom:2px solid var(--lightgray);scrollbar-width:thin}
.agi-stairs .stair{flex:1 1 0;min-width:98px;height:calc(2.7rem + var(--i)*2.05rem);box-sizing:border-box;padding:.55rem .6rem;border:1px solid var(--lightgray);border-bottom:none;border-radius:.45rem .45rem 0 0;display:flex;flex-direction:column;font-family:var(--codeFont),monospace;transition:transform .18s ease,box-shadow .18s ease}
.agi-stairs .stair:hover{transform:translateY(-3px)}
.agi-stairs .stair-name{font-size:.76rem;font-weight:700;color:var(--dark);line-height:1.25}
.agi-stairs .stair-note{font-size:.63rem;color:var(--gray);margin-top:.2rem;line-height:1.3}
.agi-stairs .done{background:color-mix(in srgb,var(--secondary) 13%,transparent);border-color:color-mix(in srgb,var(--secondary) 40%,var(--lightgray))}
.agi-stairs .now{background:color-mix(in srgb,var(--secondary) 24%,transparent);border:1.5px solid var(--secondary);border-bottom:none;box-shadow:0 0 20px color-mix(in srgb,var(--secondary) 28%,transparent)}
.agi-stairs .todo{border-style:dashed;background:transparent;opacity:.72}
.agi-stairs .stair-tag{align-self:flex-start;font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;background:var(--secondary);color:var(--light);padding:.12rem .38rem;border-radius:.25rem;margin-bottom:.32rem;white-space:nowrap}
.agi-stairs .now .stair-name::after{content:"▮";margin-left:.25rem;color:var(--secondary);animation:agiblink 1.1s steps(1) infinite}
@keyframes agiblink{50%{opacity:0}}
@media (prefers-reduced-motion:reduce){.agi-stairs .now .stair-name::after{animation:none}.agi-stairs .stair{transition:none}}
</style>

Last year's step was CoT, this year's is agents, and in his telling each step gets climbed until it caps out. CoT, he claims, is already a completed stair: it surpassed the very top humans at olympiad math and competitive programming, and still stopped short of AGI. The thing the entire industry is currently valued on, filed under *finished*.

He goes further than I would, claiming AI today "does not lack taste or intuition," only the ability to keep learning - circling back to the point earlier.

On when this gets solved, he said nobody knows, "the whole world still hasn't found a good method; everyone is groping." Internally they call this kind of research "scratching lottery tickets": it needs almost no GPUs, resists being staffed like a project, and nobody knows which ticket pays out.

Here he also mentions why they would never touch video generation, world models, vertical agents or 3D in general - because he thinks they are useful additions but not in the path of AGI.

---

## How does DeepSeek Price its AI (and makes Profit)

Liang mentions something interesting he calls the ten-month rule for the compute he acquires.

The API is priced to make the servers pay for themselves in 10 months - since a server runs for 3-5 years, everything after that is profit.

He openly admits demand is inelastic, meaning he could double prices tomorrow and roughly double revenue. He just... won't.
At one point someone on the call pushes back that a ten-month payback is actually too profitable, and he simply agrees: "indeed there's still room to cut prices."

Then there's this story:

> "With one of our models, we initially worried that demand would be too high, so we set the price fairly high. Later we cut it to a quarter, and many people in the company group chat cheered. Because this is exactly the purpose of putting so much care into building this model well: to let everyone use it fully."

If your people joined to make intelligence cheap and abundant, a price cut IS the win condition.

---

## The Compute Section (or: The Numbers They Asked Everyone Not to Share)

This is the part the host explicitly begged attendees to keep quiet, which of course means it's the part everyone shared first. In his framing: DeepSeek lags the US by one to two years while using 1/20th of the compute, and the goal is to shorten it further.

Per the transcript (and remember the asterisk from the top), DeepSeek sits on roughly 20,000 H-equivalent GPUs, most freshly arrived. He estimates the largest US frontier models at ~800B *active* parameters while DeepSeek operates at ~47 billions active, with the next generation targeted at 150-250B. Training at US scale would take fifty thousand GB300s he cannot buy at any price.

and he did admit the following:

> "We train models this big not because I think a model this big is enough, but because **that is all the resources we have.**"

He extends the point to people: the China-US talent gap is roughly zero ("it's literally the same pool of people"), but fewer chips means fewer experiments means slower researcher development - so even the talent gap is a compute gap in a trenchcoat.

He also said:

> "When Silicon Valley says Scaling has hit its limit, **that is for Silicon Valley;** for Chinese people, we are still very far from that. We haven't Scaled to anywhere near that degree."

Remember the 10 month plan earlier? He literally says here - money in the bank earns two percent a year; a GPU earns its own price back in ten months.

So the plan for the billions they just raised is barbarically simple: turn all of it into cards as fast as physically possible, paying a premium where needed, because "turning money into Nvidia cards is definitely better than putting it in the bank."

His stated ideal is spending the entire round within half a year, and his stated frustration is that the cards physically cannot be bought fast enough. If procurement spends twenty billion this year, they "count as super high performers."

## "Nvidia Is Digging Its Own Grave"

The most geopolitically spicy claim in the recording: when DeepSeek trained V3, they used NVIDIA's cards while sidestepping NVIDIA's ecosystem entirely, on their own compiler layer called TileLang, at an efficiency cost he puts at one to two percent.

CUDA, the twenty-year fortress that makes NVIDIA, is in his view "being dismantled rapidly," because AI can write code now.

On Huawei he gives the most precise benchmark of domestic silicon I've seen anywhere: the gap is "four times plus two years", four Huawei 950s to match one top NVIDIA card, on hardware trailing by two years, at which point it substitutes for the GB200/GB300 supernodes, latency and all.

Even at a multiple of the price he'd take it, because export controls mean the real choice is Huawei versus empty racks. In a normal market, he says, domestic substitution would be hard; with NVIDIA unbuyable, "everyone is forced into it." The transcript has Huawei allocating DeepSeek ~16,000 cards and DeepSeek porting the whole TileLang stack across, explicitly "to help Huawei build this ecosystem well," with his prediction that within a year the domestic-chips-don't-work perception gets reversed by facts, leaving only manufacturing capacity, which he expects to fade within five years.

---

## How Does DeepSeek's Culture Work

Everything about how DeepSeek runs internally is recognizable, just from somewhere other than tech: it's a research lab, specifically the kind universities pretend theirs are. No KPIs and no performance reviews, a vision that has never been written down anywhere, half of every researcher's time unassigned to explore whatever they want, authority that runs on consensus, and no overtime, because research needs slack and extreme focus means there is very little to do.

One thing, and only one thing, is sacred:

> "Our biggest core interest is maintaining the stability of the team; you could even say it is the only core interest. **As long as I can keep the team stable, I will surely achieve AGI. It is that simple.**"

Money is "certainly not the problem." Compute costs at worst a six-month delay. The only unrecoverable loss is people, and reportedly it's even contractual: **the funding round is said to have come with 2 conditions**

- no poaching the researchers
- no funding spinoffs

and if you're curious about what half of the job entails-

> "You could also say that right now **half the people in our company are labeling data.** Half of our core researchers, the most important people, half of them are labeling data."

The most efficient lab on Earth, and the founder's honest description of the current stage of AI is: my geniuses are doing data curation, because high-end data work *is* the research now - which sounds very similar to the complains some Meta's labs' researchers had a few months ago.

A few loose gems worth saving: he thinks Anthropic being ahead is "a phase" and that OpenAI and Google will "rise in alternation," immediately followed by the confession that "maybe half the people in our company, at any given time, half feel OpenAI is better." And asked how he'll balance pure research against his new capital-market obligations, the reassurance he offers his brand-new investors is essentially: worst case, we're merely a very good business. "We hope to have a bigger dream, but we also have a fallback performance we can put out."

---
# So Do I Buy It?

Time for the elephant. This is a man talking to his own investors, in a meeting that leaked. Some skepticism is mandatory, so here's mine.

**The "we don't care about money" gospel is also excellent fundraising.** "restraint" reassures investors he'll skip the billion-dollar super-app war, "10% of GDP" promises the upside anyway, and "reasonable profit" reads as discipline. It is a great pitch.

**Restraint is cheap when constraint does it for you.** He applies exactly this acid to his own efficiency legend ("that is all the resources we have") and never once to his strategy. A lab whose capex was covered by a quant fund, whose GPU count is capped by export controls, and whose home market makes consumer monetization brutal anyway gives up much less than it appears to when it renounces profit. Some of the philosophy is surely scarcity metabolized into identity. The honest version is that DeepSeek made a virtue of necessity and then discovered the virtue compounds.

**The taking-less applies only to margins.** On compute, talent, and the CUDA-replacement layer, it's total war, and he says so himself: the restraint "increases the probability of achieving AGI." Mistaking the monk for a pacifist would be the real error; the modesty is aimed.

**The leak itself is suspiciously convenient.** A meeting whose host loudly says *do not share this* produces a full transcript and a month of favorable coverage, right after a fundraise, mid-Huawei-partnership, at peak national-champion narrative. Probably an investor just leaked it. But if you *wanted* to communicate all of this without the founder ever giving an interview, it would look exactly like this, and the "please don't record" plea is exactly the seasoning that makes it taste authentic.

**And still, I mostly buy it.** Two things are very hard to fake. The first is coherence: pricing, open source, org design, roadmap, and chip strategy all reduce to one function, maximize P(AGI | team stays together), and every answer across four unscripted hours snaps to it, which is far beyond what anyone can improv. The second is the track record: almost everything he describes, they had already done before there were any outside investors to perform for.

---

# TLDR

1. **Their Strategy is subtraction:** Anything that doesn't lead to better models or AGI is off their list and their company culture is alligned for this vision.

2. **Taking less wins, but only in commodity markets.** Capped margins are an un-undercuttable moat and intention sorts the battlefield before revenue exists, and the whole trick rests on tokens staying fungible.

3. **The real bottleneck is learning.** The models have taste but they can't remember. Whoever cracks continual learning takes the next stair, and takes the commodity era with it.

Which leaves one concrete thing to watch. There was never a hidden agenda here - the plan sits. So when continual learning actually ships, the only thing to look at would just be one thing: the payback period. If it's still ten months, the philosophy was real all along.