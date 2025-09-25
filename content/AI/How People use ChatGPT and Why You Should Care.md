---
title: How People use ChatGPT and Why You Should Care
draft: false
tags:
  - AGI
  - AI
  - Artificial-Intelligence
  - GenerativeAI
  - TechforGood
  - Technology
  - ChatGPT
  - OpenAI
created: 2025-09-25
modified:
---
OpenAI just put out a very detailed paper and post covering what in my opinion is one of the most important pieces of information for anybody using or building with AI
### How do People use the Biggest, Most used AI Provider in the World

<p align="center">
  <img src="https://cdn.kuber.studio/assets/media/chatgpt-use-study/hero.png" alt="Hero Image" />
</p>


They conducted a large study of 1.5 million conversations to track how consumer usage has evolved since ChatGPT’s and general AI launch three years ago.

I analyzed the entire paper and honestly, the results are a bit more shocking than you think.

(*PS: They Also have [a little Blog post](https://openai.com/index/how-people-are-using-chatgpt/) on their website, but it's not detailed at all :/ hence this post!*)

# How Big the Scale of ChatGPT Actually is

I had heard predictions and random numbers of this, none that were verifiable, but this is actually pretty insane. 

<p align="center">
  <img src="https://cdn.kuber.studio/assets/media/chatgpt-use-study/users.png" alt="Hero Image" />
</p>


By July 2025, ChatGPT hit **700 million weekly active users** sending **2.5 billion messages per day**. That's roughly **29,000 messages per second, 24/7.**

To put this in perspective - ChatGPT now reaches about 10% of the world's entire adult population. The speed of adoption has literally no precedent in technology history.

This was shocking, but not as much as how people use it

## AI Usage for Work vs. Personal Use

Everyone talks about ChatGPT as a productivity tool for work. But **Only 27% of messages are actually work-related**

![Work vs Non-Work Image](https://cdn.kuber.studio/assets/media/chatgpt-use-study/work-nonwork.png)

That number has been **declining** from 47% in June 2024. The vast majority of ChatGPT usage - over 70% - is now personal, non-work related activities.

This isn't because fewer people are using it for work (work usage has grown significantly). It's because personal usage has exploded even faster.

What does this mean? The economic impact of AI on "home production" - the stuff we do outside of work - might be as large or larger than its impact on professional productivity.

# What Are People Actually Doing?

![Stats Image](https://cdn.kuber.studio/assets/media/chatgpt-use-study/stats.jpeg)

OpenAI classified conversations into categories and found that nearly 80% of all usage falls into just three buckets:
### 1. Practical Guidance (29% of all usage)

This includes tutoring, how-to advice, creative ideation, and health/fitness guidance. Essentially, ChatGPT has become the world's most accessible personal consultant or Assistant. 

I suspect a lot of Google how-tos and blogs usage has been replaced with literally this, so that's interesting to see too.

### 2. Writing (24% declining from 36%)

Not just creating new content, but mostly editing and improving existing text. About two-thirds of writing requests are "make this better" rather than "write this from scratch."

### 3. Seeking Information (24% and growing fast)

Basically using ChatGPT as a smarter Google. This category has nearly doubled in the past year.

The decline in Writing and explosive growth in Information Seeking tells us something important: people are shifting from using ChatGPT as a content creator to using it as an intelligent research assistant.

## Coding and Programming Was Just a Bubble?*

I'm still not sure about this one and not sure how they are getting their stats - just their website, or with codex/ openrouter usage along with it but they quoted **only 4.2% of ChatGPT messages are related to computer programming**.

I mean I've seen numbers of dedicated coding tools like Cursor, GitHub Copilot, and Claude (which shows 33% programming usage) are instead being used? but honestly it's a shock number but slightly makes me question the method used to measure it

# What Demographic uses ChatGPT

### The Gender Gap has Finally Closed (and somewhat reversed?)

In early 2023, about 80% of ChatGPT users had typically masculine names. By June 2025, users with typically feminine names actually became the majority.

This represents one of the fastest demographic shifts in tech adoption I've ever seen. There are a bit more females using ChatGPT than males? INSANE

![Age Image](https://cdn.kuber.studio/assets/media/chatgpt-use-study/gender.png)

### Age Distribution

Nearly 50% of all messages come from users under 26.

After that it distributes pretty evenly until about 70s, it makes sense to target that target audience if you're building in AI; they're the ones that adopts new tech the fastest.

![Age Image](https://cdn.kuber.studio/assets/media/chatgpt-use-study/age.png)

### Global Adoption

The fastest growth at the moment is happening in low-to-middle income countries. ChatGPT adoption is becoming truly global.
Which is pretty cool, because it's not just developed countries favoring it.

There's not a lot of data on Subscriptions with these and how it scales with ChatGPT Go subscription in India.

# How People Actually Interact with AI

The Paper used a classification model to categorize between **Asking vs. Doing vs. Expressing**.

- **Asking (49%)**: "Help me understand X" or "What should I do about Y?"
- **Doing (40%)**: "Write this email" or "Create this spreadsheet"
- **Expressing (11%)**: Casual conversation with no specific goal

What's interesting is that **Asking is growing faster than Doing**. People increasingly want AI as an advisor and assistant, not just a task executor, which funnily was one of the first things people thought of when it was introduced.

The researchers found that Asking messages consistently get higher quality ratings (which, I presume means text being copied/ thumbs ups) from users. 

![Quality Image](https://cdn.kuber.studio/assets/media/chatgpt-use-study/message-quality.png)

This suggests people get more value from AI that helps them think through problems than AI that just does work for them. - or they were just cheating on academic questions.

# The Work Usage Patterns

When people do use ChatGPT for work, the patterns are surprisingly consistent across all job types:

- **Writing dominates work usage overall** (40% of work messages)
- **Information gathering and decision support** are the main use cases
- **The same activities appear across completely different professions**

ChatGPT's primary economic value comes from **decision support**, especially in knowledge-intensive jobs where better decision-making directly improves productivity.

But the personal usage explosion we saw earlier suggests something even bigger: AI is becoming a general-purpose cognitive tool that people use to navigate all aspects of life, not just work, which we did expect honestly.

# The Privacy Factor of The Research

What impressed me most about this study was the methodology. OpenAI analyzed these conversations without any human ever reading the actual messages.

<p align="center">
  <img src="https://cdn.kuber.studio/assets/media/chatgpt-use-study/privacy-filter.png" alt="Privacy Image" />
</p>


They used automated LLM classifiers to categorize conversations, validated against public datasets, and used secure data clean rooms for demographic analysis. 

This sets a strong precedent for how to conduct research on sensitive user data, but how much trust do you put to classifier models? As someone who's extensively worked on and trained them for [Some of my work on TREAT](https://www.trytreat.tech/) they can be a hit or miss, I hope the accuracy wasn't as bad here.

## Implications for People Building in AI

If you're building in the AI space, here's what I would take away from this

1. **Personal use cases are massive** - don't just focus on productivity tools

2. **Decision support > task automation** - people want advisors, not just executors

3. **Writing assistance is table stakes** - but it's mostly editing, not creation

4. **Information seeking is exploding** - the search interface is far from solved

5. **Global and demographic expansion** is happening faster than expected

The most successful AI products of the next year probably won't be the ones that automate work tasks, we have a lot of those.
They'll be the ones that help people make better decisions across all areas of their lives.

Hope this was a fun read, if you enjoyed this, I write cool stuff like this on my Social Media, feel free to grab links from the footer and add the blog from the RSS stream so you stay updated :)






