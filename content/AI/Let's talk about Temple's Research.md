---
title: "Let's talk about Temple's Research (with receipts)"
literalDashes: true
socialImage: social-images/temple-og.jpg
tags:
  - AI
  - Wearables
  - Research
created: 2026-11-06
modified: 2026-11-07
---
I've been seeing a lot of discourse about Temple on my twitter feed lately, which in my opinion has largely been misguided. Like Deepinder said, the best way to like (or hate) a pre-release product is to read the damn research.

So that's exactly what I decided to do this Diwali weekend, and in the process breaking it down in a more digestible and opinionated way so most curious people can follow along.

![The gold, oval Temple device held up between two fingers.](https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/temple-device.jpg)

Fair warning before we get into this - I'm far from a medical professional, I just happen to have experiences with wearables and BLE tech I can hack, am decent at exploring topics I have no business exploring with AI agents and have watched one too many videos by the quantified scientist.

and no, I don't have any involvement with Temple, I was just bored

## The papers

So there's largely 4 main documents backing this device at the moment, and they're awaiting peer review as of today, so take them with a few grains of salt.

1. **The heart rate accuracy study** - covered 43 healthy adults on treadmills wearing 6 optical devices + a chest-strap for reference. The [raw and cleaned recordings are public](https://cdn.temple.com/research/hr_validation_study/data.zip) under a CC BY-NC license, which we work with below.

2. **The Doppler preprint** - [BrainFlow against transcranial Doppler ultrasound](https://www.medrxiv.org/content/10.64898/2026.09.02.26362022v1) (TCD). This one covers the brain blood flow tracking work.

3. **The NIRS preprint** - [BrainFlow against near-infrared spectroscopy](https://www.biorxiv.org/content/10.64898/2026.09.17.751664v1) (TD-NIRS), 44 men across 60 sessions, separating signals from the brain and scalp layers.

4. **The age preprint** - [89 pulse-waveform features compared against chronological age](https://www.biorxiv.org/content/10.64898/2026.08.19.745616v1), arguing the temple is a richer measurement site than the wrist.

The [science page](https://temple.com/science-and-research) also links background physiology for Entropy and Span, Temple's broader health scores, which is less interesting for now.

# The Good

## It's (likely) a really good monitoring device

As far as data goes, it's amazing -- which itself is a really cool achievement, because it stands shoulder-to-shoulder with years of R&D and shipping from the likes of WHOOP, Oura, Fitbit and more.

I recomputed the scores from the raw data and public files, and every one matches the paper to two decimal places, so the headline arithmetic checks out!

The graphs here come from those same files: Temple's cleaned versions (where they removed sustained failure episodes) and my all-valid rerun (where nothing gets removed).

For heart rate on the treadmill, we get these stats:

![Mean absolute heart-rate error with failure episodes removed and retained: Temple 1.18/1.18, Apple S12 1.94/1.97, Fitbit Air 2.96/3.33, WHOOP MG 3.14/3.92, Garmin 970 3.18/5.20, Oura Ring 5 5.21/7.31 and untaped Polar 0.59/2.12 bpm.](https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/hr-clean-vs-raw.svg)

Of course, treadmill walking and running is one of the simpler tasks for optical sensors to track, so we still need data across outdoor running, lifting, cycling and daily life for more context - but this serves as a pretty good starting point.

Funnily enough, it did well where some other devices got stuck in the sustained failures, Temple's score was 1.18 either way, whereas Garmin moves from 3.18 to 5.20, Oura from 5.21 to 7.31. So the actual result is consistency. In these recordings, Temple is the least vulnerable to prolonged large errors.

<div class="chart-row">
<img src="https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/hr-by-intensity.svg" alt="Mean error in six reference-heart-rate bands. Temple stays near one bpm, Apple near two, and Oura's error rises at higher heart rates in this treadmill dataset.">
<img src="https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/hr-tails.svg" alt="Percentage of available paired seconds with absolute error above five, ten and twenty bpm, for all seven comparison devices.">
</div>

<p class="img-caption">(These consider Pooled seconds instead of people, different from the paper's headline)</p>

Temple stays near 1 bpm across heart-rate bands, Apple near 2, Oura climbs at higher heart rates. And the bad seconds barely exist: 2.2% of Temple's paired seconds are more than 5 bpm off, against Oura's 34.6%.

Matched on identical timestamps, Temple wins against Fitbit for 42/42 people, WHOOP for 40/43, Garmin for 43/43 and Oura for 43/43. (Reporting rates and coverage still matter when reading those - more on that in The Bad.)

![Mean error when device readings are compared to reference readings from four seconds earlier through eight seconds later. Some devices improve with a small offset; Temple remains lowest among these five optical devices throughout the plotted range.](https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/hr-lag.svg)

Small clock offsets didn't rescue the others either. Even at each device's best searched offset, Temple stayed lowest across the range.

*reiterating, these are numbers from one treadmill session per person, at one site, against another wearable as the reference.*

The most interesting wrinkle in the whole dataset: an untaped Polar chest strap is more accurate than Temple for 36 of 43 people, and Temple still wins on average because the strap fails hard on a few. More on that in The Bad, it's worth the read.

## The temple is (probably) a good place to keep a device

This is probably the biggest visual (and marketing :P) difference for Temple and it's surprisingly hard to track from frontier research other than the paper's sources, but seeing the numbers and no counterevidence, it likely has substance and is arguably really cool. 

TLDR it argues that the pulse signal at your temple seems to carry much richer information than the one at your wrist, which makes it a better place for an activity tracker to be.


<div class="chart-row">
<img src="https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/age-counts.svg" alt="Fourteen age-linked features found at the temple versus three at the wrist, out of 89 pulse-waveform features.">
<img src="https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/age-selection.svg" alt="Bootstrap-FDR selection frequency over 1,000 resamples: strongest temple feature 70 percent, another strong temple feature 39.5 percent, strongest wrist feature 10.1 percent.">
</div>


The only catch I saw from the paper included that the two sides used different people and different hardware (32 Hz at the temple, 500 Hz at the wrist), so anatomy isn't fully isolated imo but even with that, the features do largely work out.

## The dictation / speech-to-text part

I saw a lot of speculation about this on twitter, especially the not having a mic part. But funnily enough it's probably the most heavily precedented researched part of the entire device, so I'm quite positive it can work out

[Throat microphones](https://www.sensear.com/blog/throat-microphones-then-and-now) already pick speech up from vibration at the neck rather than from sound in the air and even the [original AirPods technical spec](https://web.archive.org/web/20180831054835/support.apple.com/kb/SP750?locale=en_US) lists a speech-detecting accelerometer, used alongside the mics to tell when you're speaking.

![Apple's original AirPods technical specifications page; its sensor list includes a speech-detecting accelerometer.](https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/airpods-spec.jpg)

There's also been research on the temple, a [2007 Microsoft Research paper](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/Multisensory-Processing-for-Speech-Enhancement-and-Magnitude-Normalized-Spectra-for-Speech-Modeling.pdf) captured speech from it which was noise-resistant but distorted, so they paired it with a regular mic (worth remembering when people say no mic is needed) - and a [2013 study](https://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=5685&context=jur) confirmed speech vibration is measurable at thirteen head and neck spots, temple included.

There does need to be some novel work to make it reliable (anybody who's used pure signaling with transformers for even normal mics with speech-to-text can tell). The real test I'd want to see: how many words it recovers from the vibration signal alone, in a noisy room. I'm very positive they can pull it off, but that's the number that proves it.

## BrainFlow is pretty cool

BrainFlow is their proprietary score built from pulse shape, heart rate, temperature and optical signals.

This is the part I was most skeptical of going in, and also where Temple is doing something I couldn't find any other consumer wearable even attempting: tracking blood-flow changes in your brain from a sensor sitting outside your skull.

<div class="chart-row">
<img src="https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/nirs-tilt.svg" alt="Head-down tilt challenge: BrainFlow correlation with the modelled brain layer 0.912 with lag optimisation, 0.494 against scalp, 0.826 at zero lag, 0.832 after heart-rate adjustment and 0.649 after superficial-signal adjustment; p < 0.001.">
<img src="https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/nirs-squat.svg" alt="Stand-to-squat challenge: BrainFlow correlation with the modelled brain layer 0.843 with lag optimisation, 0.700 against scalp, 0.701 at zero lag, 0.850 after heart-rate adjustment and 0.570 after superficial-signal adjustment; p < 0.001.">
<img src="https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/nirs-supine.svg" alt="Stand-to-supine challenge: BrainFlow correlation with the modelled brain layer 0.839 with lag optimisation, 0.767 against scalp, 0.796 at zero lag, 0.654 after heart-rate adjustment and 0.438 after superficial-signal adjustment; p = 0.082.">
</div>

Both the Doppler and NIRS papers are pretty cool, I initially planned to write them all out here, but it doesn't do them justice, you should read them if you're interested.

But as a small TLDR, the Doppler paper checks if BrainFlow is seeing anything like actual brain blood flow, or is it just like a pulse reader?

It held up in the paper - correlations of 0.795 and 0.799 against the ultrasound but the better part was when people lay down, their heart rate went down while their brain blood flow went up, and BrainFlow went up with it. If this thing was just reading your pulse, it would have gone the wrong way but it didn't

The NIRS paper checked if it's observing the brain or just the scalp skin on top of it. Two of the three challenges show a clear brain-over-scalp advantage; the third (standing to lying down) doesn't reach significance, at p = 0.082. And the headline 0.91 correlation in the first challenge drops to 0.65 once they adjust for the superficial signal. Still decent

To reiterate, what we largely see here is the metric *can* work, it may or may not be useful to most people -- WHOOP did something very similar with their ECG which is still relative and not approved everywhere but is still a cool upgrade



A lot of their experimentation and methods to try to disprove the results was cool and is worth a read.

# The Bad

## "Beats a chest strap" needs workshopping

This is one of the quotes a lot of people got (rightly!) weirded out by. The Polar H10 is probably one of the most accurate consumer devices you could get for tracking, so beating it in any capacity would genuinely be insane.

![Each point is one participant's mean absolute heart-rate error. Temple's values cluster below 2.3 bpm. The untaped Polar has many values below Temple but a few severe outliers reaching 27.36 bpm.](https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/hr-per-person.svg)

Plotting it out does show that the untaped Polar beats Temple for **36 of 43 people**. Its median participant error is **0.38 bpm** against Temple's **1.12**. But its worst participant averages **27.36 bpm** off, while Temple's worst is **2.25**.

To their credit, yes, Temple wins the mean while losing for most people, because a few strap failures drag its average up.

But the other weird part about this observation (which is also mentioned in the paper) is that the second strap was worn lower than usual to make room for the reference strap. It was hard for me to separate it, but there's a chance it could have contributed to its failures.

<div class="chart-row">
<img src="https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/hr-paired-apple.svg" alt="Sorted paired error differences against the Apple watch: Temple has lower per-person error for 37 of 43 participants. Positive bars favour Temple.">
<img src="https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/hr-paired-polar.svg" alt="Sorted paired error differences against the untaped Polar: Temple has lower per-person error for seven of 43 participants. Positive bars favour Temple.">
</div>

<p class="img-caption">Per participant: other device's error minus Temple's. Positive favours Temple.</p>

The all-valid mean difference against the untaped Polar is **0.93 bpm** in Temple's favour, but the participant-bootstrap 95% interval runs from **-0.34 to 2.66**. It crosses zero. "Temple's mean was lower in this sample" holds; "Temple is definitively more accurate than a chest strap" doesn't.

# The Bad?

## You likely won't feel too much of a difference from other wearables

Temple is a wearable. Just like your other activity trackers.
You won't feel much difference in the numbers you get from your Apple Watches to WHOOP bands to FitBit Airs to Temple, they're all optimized really well and have marginal level of differences, which is actually great.

What matters is sampling and available seconds for data, which almost all of them do well

![Median fraction of reference seconds with a paired device reading. Temple, Fitbit, WHOOP, Garmin and the untaped Polar are close to continuous; Apple and Oura are around 20 percent.](https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/hr-coverage.svg)

<p class="img-caption">Apple and Oura export roughly one value every five seconds; the rest are near-continuous.</p>

## Placement changes the result

![Upper versus lower wrist position: Apple 1.52 versus 2.45 bpm, Fitbit 2.54 versus 3.86, WHOOP 2.21 versus 6.08, Garmin 4.83 versus 5.59. Temple's overall mean is 1.18.](https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/hr-wrist.svg)

There's a chance I'm reading too much into it, but in multiple papers, it was mentioned how optical devices' placements were shifted to accommodate multiple of them, the issue with that notion is that the results can actually be quite variable because of it.

It's a non-issue for most normal use, but does matter for research, but just thought it's important to bring up.

## Some Other Miscellaneous Nitpicks

- **The cohorts are narrow.** Young, healthy, mostly male, one site, scheduled challenges, prescribed stillness. Free-living use, older people, and anyone with actual health conditions are untested.

- **The brain claims still outrun the brain evidence.** The correlations come from modelled references in controlled postures, the algorithms differ between the studies, and nothing tests ordinary daily life (which to be fair, is common with other wearables too.)

# How everyone else started

Oura took Kickstarter orders in August 2015, according to its [company history](https://ouraring.com/blog/history-of-oura/). A [2017 independent study](https://pmc.ncbi.nlm.nih.gov/articles/PMC6095823/) of the first-generation ring tested 41 healthy people aged 14-22 for one lab night against polysomnography (PSG, the sleep-lab reference).

It detected sleep well (95.5% sensitivity) and wake poorly (48.1% specificity). Deep sleep came out about 20 minutes underestimated, REM about 17 overestimated. The same paper describes Oura's own 2016 internal report: 14 people, total-sleep-time agreement limits running from roughly 64 minutes too low to 66 too high.

![Historical sleep studies: Oura Gen1 sleep sensitivity 95.5 percent and wake specificity 48.1 percent; WHOOP sleep sensitivity 95 percent, wake specificity 51 percent and four-stage agreement 64 percent.](https://raw.githubusercontent.com/Kuberwastaken/temple-research/main/img/historical-sleep.svg)

WHOOP's [2020 sleep study](https://pubmed.ncbi.nlm.nih.gov/32713257/) used 12 healthy adults over 86 lab sleeps: 89% sleep/wake agreement but only 64% four-stage agreement, with researchers entering bedtimes and the company scoring recordings. A separate [university-run, WHOOP-funded study](https://pmc.ncbi.nlm.nih.gov/articles/PMC7849816/) found a 13.8-minute sleep-duration bias in 32 participants.

Oura's sleep validation never validated its other scores; Temple's pulse accuracy doesn't validate BrainFlow, Entropy or Span. These historical cohorts and endpoints also can't rank today's hardware against today's hardware but I think it's cool to see where all of it started.

Either way - it's good that this exists. We want more research like this, and more users playing around with the data.

# Where I land

However this launch and pilot go, imo we should be bullish on hardware startups - not just because it's made in India (although it's very cool it is) but because we're playing in leagues and comparisons beyond our usual bounds and doing well at it and we want to see more of it.

I'm probably not gonna go out of my way to get a Temple, half because of the price being higher than basically any baseline accurate sensors for my life and secondly I do think keeping a device glued to your head is likely much harder than a band that disappears on your wrist.

TLDR: We should critique where we need to, but you gotta admit it's pretty cool.

## Methods, all results and reproduction

This analysis uses company-released data, the [original dataset](https://cdn.temple.com/research/hr_validation_study/data.zip) is licensed by Temple Private Limited under CC BY-NC 4.0.

- [analysis.py](https://github.com/Kuberwastaken/temple-research/blob/main/analysis.py): whole-session results and paired comparisons; [results.json](https://github.com/Kuberwastaken/temple-research/blob/main/results.json).
- [hr_extended.py](https://github.com/Kuberwastaken/temple-research/blob/main/hr_extended.py): tails, heart-rate bands, sex and wrist-position subgroups, offset sensitivity; [hr_extended.json](https://github.com/Kuberwastaken/temple-research/blob/main/hr_extended.json).
- [coverage.py](https://github.com/Kuberwastaken/temple-research/blob/main/coverage.py): coverage, all-device matched-second comparisons, offset grid; [coverage.json](https://github.com/Kuberwastaken/temple-research/blob/main/coverage.json).
- [plots_final.py](https://github.com/Kuberwastaken/temple-research/blob/main/plots_final.py): chart generation; [README](https://github.com/Kuberwastaken/temple-research#readme) with commands and limitations.

### Sources

[Heart-rate white paper](https://cdn.temple.com/research/temple-heart-rate-accuracy-study.pdf) · [Raw/clean recordings](https://cdn.temple.com/research/hr_validation_study/data.zip) · [Doppler preprint](https://www.medrxiv.org/content/10.64898/2026.09.02.26362022v1) · [Doppler full manuscript](https://www.medrxiv.org/content/medrxiv/early/2026/09/04/2026.09.02.26362022.full.pdf) · [NIRS preprint](https://www.biorxiv.org/content/10.64898/2026.09.17.751664v1) · [Age preprint](https://www.biorxiv.org/content/10.64898/2026.08.19.745616v1) · [Temple science page](https://temple.com/science-and-research) · [Deepinder's open letter coverage](https://www.ndtv.com/health/dear-concerned-indian-doctors-deepinder-goyal-defends-temple-says-its-not-a-scam-12291398) · [Throat microphone mechanism](https://www.sensear.com/blog/throat-microphones-then-and-now) · [Original AirPods technical spec](https://web.archive.org/web/20180831054835/support.apple.com/kb/SP750?locale=en_US)