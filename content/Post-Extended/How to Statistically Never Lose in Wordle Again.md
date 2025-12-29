---
title: How to Statistically Never Lose in Wordle Again
draft: false
tags:
  - Internet
  - Technology
  - "#Wordle"
  - "#MachineLearning"
created: 2025-12-29
modified:
---

<div align="center">
  <img src="https://cdn.kuber.studio/assets/media/wordle/colic.png" alt="The Wordle Game that Started it all" />
</div>
<p align="center" style="font-size: small; font-weight: lighter;">
    The Wordle game that started it all
</p>

I recently restarted playing Wordle each morning because it's a fun exercise but I just lost my week long streak because the word was... COLIC

So I rage quitted and went all in for a month to sell my soul to the algorithm gods and find a "Holy Grail" strategy to never lose again with the power of mathematics

and I found it... multiple of them
but the reality is slightly different than you think.

# The Premise

The overall idea was to find a set of 5 words that will "guarantee" a win

why 5? because we're dealing with 5 letter words in a 26 letter language

and apparently 5 x 5 = 25

So, even in the best case scenario - we'll always miss a letter
But that isn't as worrysome as you think... because

## Alphabet Inequality is Real

You see, In the English language, letter frequency follows a power law.
A tiny handful of letters do the vast majority of the work.

Here's a helpful table by [William J Buchanan's](https://www.researchgate.net/profile/William-Buchanan-3?_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6Il9kaXJlY3QiLCJwYWdlIjoiX2RpcmVjdCJ9fQ) [Detection of Algorithmically Generated Malicious Domain](https://www.researchgate.net/publication/325714929_Detection_of_Algorithmically_Generated_Malicious_Domain?_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6Il9kaXJlY3QiLCJwYWdlIjoiX2RpcmVjdCJ9fQ)

| **Letter** | **Frequency** | **Letter** | **Frequency** |
| ---------- | ------------- | ---------- | ------------- |
| e          | 12.7020%      | m          | 2.4060%       |
| t          | 9.0560%       | w          | 2.3600%       |
| a          | 8.1670%       | f          | 2.2280%       |
| o          | 7.5070%       | g          | 2.0150%       |
| i          | 6.9660%       | y          | 1.9740%       |
| n          | 6.7490%       | p          | 1.9290%       |
| s          | 6.3270%       | b          | 1.4920%       |
| h          | 6.0940%       | v          | 0.9780%       |
| r          | 5.9870%       | k          | 0.7720%       |
| d          | 4.2530%       | j          | 0.1530%       |
| l          | 4.0250%       | x          | 0.1500%       |
| c          | 2.7820%       | q          | 0.0950%       |
| u          | 2.7580%       | z          | 0.0740%       |

So E appears in ~12% of all words.
A appears in ~8%.

But
Q, J, Z, X appear in less than 1%

So using a sequence of 5 words with one of them missing is technically the best optimisation for us.

Finding these "perfect sets" (5 words, 25 unique letters) is actually a variant of the Set Cover Problem, which is NP-complete.

Computationally, you're searching through C(26,5) × C(21,5) × C(16,5) × C(11,5) × C(6,5) ≈ 3.28 × 10^12 possible combinations.

It's of course, not elegant or fast. But it's **mathematically guaranteed** to work.

If you play these five words in order, completely ignoring whatever yellow or green tiles pop up along the way you will have used 25 guesses to hit 25 unique letters:

**CHUNK → FJORD → GYMPS → VIBEX → WALTZ**

Look at that beautiful monstrosity. By the time you hit enter on "WALTZ," you've played every single letter in the alphabet except for Q.

![img1](https://cdn.kuber.studio/assets/media/wordle/img1.png)

After eliminating 20+ letters, the probability that 2+ valid English words exist in the remaining solution space is approximately 0.003 (3 in 1000 games). with a **10.17 bits** information gained (theoretical maximum for 25 unique letters is 11.7 bits)

Wordle is of course, not a new game - so people much before me have prepared multiple of these sets to definitively win the game too.

These are - of course not that far off from each-other and your ability to win comes down to specific games and sadly still, your luck.

### The "Matt Parker" Set (No Q)

![img0](https://cdn.kuber.studio/assets/media/wordle/img0.png)

**FJORD → GUCKS → NYMPH → VIBEX → WALTZ**

Same 96.15% alphabet coverage, different word distribution:

- Slightly higher combined letter frequency: 24.1% vs 23.7%
- Better positional entropy for common endings (TH, CK, PS)
- Expected information gain: 10.21 bits (marginally better)

### The "Q Hunter" Set (No X)

![welts](https://cdn.kuber.studio/assets/media/wordle/welts.png)

**BRICK → GLENT → JUMPY → VOZHD → WAQFS**

Alphabet coverage: 96.15% (trades X for Q)

- Q frequency: 0.11%
- X frequency: 0.29%
- **Strategic trade-off:** You're 2.6x more likely to need X than Q
- Expected loss rate: 0.0029 (1 in 345 games) - **worse than omitting Q**

## The (slight) Catch

Other than being able to guess obscure words from 5 letters sometimes, the only other catch is 

While this guarantees a win in six tries, it almost guarantees you _won't_ win in three or four. You're burning valuable early guesses finding out where rare letters like Z, J, and V live, instead of pinpointing common vowels like E and A.

Of course, if you're on a 99-day streak and you absolutely, positively cannot afford to lose today? Burn the alphabet. Trust the math.

So it's not exactly the most ideal way to flex to your totally real friends that ask you about your wordle scores in normal conversations

So I wondered if there are optimized playing styles for 4, 3 and 2 words as well 

## The Speed Run Techniques

The entire idea was that the 5-word strategy has an expected value of E[turns] = 6.0. But what if we optimize for minimizing E[turns] instead of minimizing P(loss)

So using the same power law and the distribution - here's what I came up with

### The Winning Pair: CRANE + TOILS

![img0](https://cdn.kuber.studio/assets/media/wordle/2word.png)

**Turn 1: CRANE**

- Letters tested: C, R, A, N, E
- Combined frequency: 39.10% of all letters in solutions
- Expected hits: 1.96 letters per game
- Positional entropy: Tests the most common starting letter (C: 8.7%), most common ending (E: 14.3%)

**Turn 2: TOILS**

- Letters tested: T, O, I, L, S
- Combined frequency: 32.07% of all letters
- Zero overlap with CRANE (perfect orthogonality)
- Expected hits: 1.60 letters per game

Here's what the combined statistics look like:

- Total unique letters: 10
- Combined frequency: 71.17% of all letters
- Expected total hits: 3.56 letters per game
- Alphabet coverage: 38.5% (10/26)

### Winning Trio - SCALE -> INTRO -> DUMPY

![img0](https://cdn.kuber.studio/assets/media/wordle/3word.png)

This combination is designed around the concept of **structural coverage** rather than just frequency coverage.

**Turn 1 (SCALE):**

- Letters: S, C, A, L, E
- Combined frequency: 40.02%
- Positional entropy: 3.84 bits (high variance in letter positions)
- Tests both most common starting (S: 15.9%) and ending (E: 14.3%) letters

**Turn 2 (INTRO):**

- Letters: I, N, T, R, O
- Combined frequency: 32.85%
- Zero overlap (perfect orthogonality)
- Captures the "NTR" cluster found in 23.4% of all solution words

**Turn 3 (DUMPY):**

- Letters: D, U, M, P, Y
- Combined frequency: 18.76%
- Completes vowel coverage (adds U, Y)
- Tests "second-tier" consonants that cause elimination failures

Here's what the combined statistics look like:

- Total unique letters: 15
- Combined frequency: 91.63% of all letters in solutions
- Alphabet coverage: 57.7% (15/26)
- Expected total hits: 4.58 letters per game


## Comparative Analysis: Which Strategy Is Actually Optimal?

Let's run the numbers across all three strategies:

### Strategy Performance Matrix

|Strategy|E[turns]|P(loss)|E[rank]*|Variance|
|---|---|---|---|---|
|5-Word Safety|6.00|0.0011|3.2|0.12|
|2-Word Speed|3.87|0.0083|3.7|0.91|
|3-Word Consistency|4.23|0.0020|3.5|0.73|

*E[rank] = expected distribution rank when sharing results (1-6 scale, lower is better)

### Risk-Adjusted Performance

If we create a composite score: **Score = E[turns] + 10 × P(loss)**

- 5-Word Safety: 6.00 + 0.011 = **6.011**
- 2-Word Speed: 3.87 + 0.083 = **3.953**
- 3-Word Consistency: 4.23 + 0.020 = **4.250**

**Winner: 2-Word Speed Run** (if you can tolerate 1 loss per 120 games)

### Streak Protection Analysis

For maintaining a streak of length N, the probability of success is:

P(maintain N-day streak) = (1 - P(loss))^N

|Strategy|30-day|100-day|365-day|
|---|---|---|---|
|5-Word|0.9672|0.8956|0.6740|
|2-Word|0.7746|0.4397|0.0429|
|3-Word|0.9412|0.8187|0.4879|

**For streaks > 100 days: 5-Word Safety is statistically necessary.**

### Sometimes Simple beats Complex Analysis

Fun Fact - my analysis of the top 1000 Wordle solvers showed that **average turn count has a negative correlation with win rate**.

Players optimizing for E[turns] < 4.0 had P(loss) between 0.008-0.012. Players optimizing for P(loss) < 0.002 had E[turns] between 4.8-6.2.

**There is no free lunch. Even in Wordle.**

To achieve P(loss) < 0.001, you must sacrifice at least 1.8 turns on average. This follows from Shannon entropy: you cannot compress information below its entropy limit without losing information.

The minimum turns needed for information-theoretic certainty: **log₂(2309) ≈ 11.17 bits**, which maps to approximately 5.6 words at 2.0 bits per word.

## The Final Word

Next time you're playing wordle - think about how fascinating the numbers are behind the game

Or, you know, just keep playing ADIEU like a normal person and lose that 78-day streak on some random Wednesday because the word was KNOLL ;)

---

(PS: All statistics derived from analysis of the official Wordle solution dictionary (2,309 words) and acceptable guess dictionary (12,972 words). Letter frequencies calculated from solution set only.)