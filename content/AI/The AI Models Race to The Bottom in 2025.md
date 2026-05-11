---
title: The AI Models Race to The Bottom in 2025
draft: false
tags:
  - AI
  - Artificial-Intelligence
  - Business
  - Data-Analytics
  - DeepSeek
  - ChatGPT
  - GenerativeAI
  - Gemini
  - Internet
  - Machine-Learning
  - Tech
created: 2025-03-10
modified:
---
If you don't care to read this entire thing and just want the verdict -
The Price of Intelligence Is Going to Zero.

This piece is largely inspired by watching multiple of Theo’s videos on AI pricing, model quality, and the weird economics of this whole space.

I largely agree with the core idea.

The most important thing happening in AI right now is not that models are getting smarter. That part is obvious.

The more interesting shift is that intelligence is becoming cheaper, faster, and more interchangeable.

That sounds dramatic, but it is already happening.

A few years ago, access to frontier-level AI felt rare. You paid a premium for it. You built around one provider. You treated model access like a scarce resource.

Now the same general capability keeps getting cheaper. Open-source models are getting better. Closed models are undercutting each other. Smaller models are becoming “good enough” for more tasks. Developers are learning to route work between providers instead of worshipping one model.

That changes everything.

![Price of AI Models](<https://media-hosting.imagekit.io//eef6c485ecf64673/Screenshot%202025-03-10%20013811.png?Expires=1836159218&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=v5fUX4vS~OlTijx~SyjNXV3lQqwzaqNBt9EbpG1iUK6uSyTMwpvN5acZJlB-6kxkZyjCFQw9VkEo~CNZ3XEcER0vHwjiOXtA3M4WttdJU5TNTQNBgS3i0Eaiko6R-4sVKxtkBQTnFPa1km6AF7PgsBV7wk4aGId459KMUZ5ea2yPzZhxco45R~Kiv09BUzq4VcmaT7EpywLrtvD~n2kkpvNDJQjKHWqkiX7vaEFeG-9mjhcBjODt2OEZ~9RyJsdVzFdGxfqlaEz7ceQjTolB4jbvVkpFm75axkyCHxUzoCrGUPhOE1sdgSh-q9wcam5wT1VvnTfVurAsWiwqsf6xGw__>)

## Intelligence Is Becoming a Commodity

The strange thing about AI is that people talk about it like magic while the market is pricing it like infrastructure.

That gap matters.

When GPT-3 launched, it felt like a portal into the future. There was no serious alternative for most developers. If you wanted high-quality language model output, you went to OpenAI.

That gave the model itself enormous pricing power.

Over time, the model stopped being the entire product.

The API became one layer in a stack.

The frontier moved from “who has the smartest model” to questions like:

- Who has the cheapest inference?
- Who has the lowest latency?
- Who has the best context window?
- Who has the best tool use?
- Who has the best distribution?
- Who has the best product experience?
- Who can make the model useful without the user thinking about the model?

That is a very different market.

When intelligence becomes widely available, the value moves away from raw access. It moves toward packaging, workflow, taste, reliability, and trust.

That is why the “AI wrapper” debate has always felt incomplete to me. Yes, a lot of products are wrappers. But the entire software industry is built on wrapping lower-level abstractions into something useful.

The question is not whether you are wrapping a model.

The question is whether your wrapper has a reason to exist after the model gets cheaper.

## Phase 1: When GPT-3 Felt Untouchable

![Image of AI models Quality](https://github.com/Kuberwastaken/Dynamic-Readme-Images/raw/main/screenshot.png)

<p align="center" style="font-size: small; font-weight: lighter;">Fun fact, this static image updates daily thanks to my project: dynamic readme images</p>

GPT-3 was one of those moments where the world briefly felt unevenly distributed.

Some people tried it and immediately understood that software was going to change. Others dismissed it as autocomplete. Both reactions made sense at the time.

The model was expensive, slow, and inconsistent. It still felt powerful enough to make people rethink what computers could do.

For a while, OpenAI had the market almost to itself.

That meant:

- Developers defaulted to OpenAI
- Products were built directly around OpenAI APIs
- Prompting felt like a new technical skill
- Model quality mattered more than model cost
- There were few serious open alternatives

This was the early monopoly phase.

The model was the moat because access to the model was scarce.

That never lasts in software.

Once developers see a capability work, the next step is making it cheaper, smaller, faster, and easier to copy.

## Phase 2: The Price Cut Was the Real Product Launch

GPT-3.5 Turbo was important because it changed the economics.

It was not only a better developer experience. It made building AI apps feel financially sane.

Suddenly, a lot more products could afford to use language models in production. Things that would have been too expensive with older models started to make sense.

This is where the market began shifting.

When a model gets 30x cheaper, you do not simply save money. You start designing differently.

You call the model more often.

You use it for smaller tasks.

You add AI features to workflows that would not have justified the cost earlier.

You stop treating every token like it is precious.

This is one of the most underrated effects of cheaper inference. It does not only reduce cost. It changes behavior.

A cheap model gets used in places where an expensive model would never be called.

That is how AI spreads.

## Phase 3: Open Source Made the Floor Collapse

The open-source wave changed the psychology of the market.

Models like LLaMA, Mistral, Mixtral, and later DeepSeek showed that useful intelligence did not need to come from one closed lab.

The quality gap started shrinking.

Small models got better.

Fine-tuning got easier.

Quantization improved.

Inference became more optimized.

People started running surprisingly capable models locally or through cheaper providers.

That matters because open source does not need to beat the best closed model at everything.

It only needs to be good enough for enough tasks.

Most real-world use cases do not need the smartest model on Earth. They need something reliable enough, fast enough, and cheap enough.

Customer support does not always need a frontier model.

Simple data extraction does not always need a frontier model.

Classification does not always need a frontier model.

Summaries do not always need a frontier model.

Internal automation does not always need a frontier model.

Once developers realize this, model selection becomes a routing problem.

Use the cheap model where it works.

Use the expensive model when it matters.

That is the future.

## The New Economics of AI

The old assumption was simple.

Better model equals better product.

That is becoming less true.

A better model still matters, but only if the extra intelligence creates enough value to justify the cost.

For many tasks, the cheaper model wins.

For harder tasks, the expensive model may still win because it needs fewer attempts.

That last point is important.

A more expensive model can still be cheaper in practice if it solves the task in one turn instead of five.

Imagine two models.

Model A is cheap. It costs less per token, but it misunderstands the request, needs retries, and creates more correction work.

Model B is expensive. It costs more per token, but it follows the instruction correctly the first time.

On paper, Model A looks cheaper.

In practice, Model B might have the same net cost or even lower cost because it uses fewer turns, fewer retries, fewer tool calls, and less human cleanup.

This is where pricing gets more philosophical.

The real unit is not tokens.

The real unit is completed work.

A model that costs more per token can still be cheaper per finished task.

That means the race is not only toward lower token prices. It is toward lower cost per outcome.

That is a much more interesting race.

## Cheap Intelligence Changes Product Design

When intelligence becomes cheap, software starts behaving differently.

Earlier software was mostly deterministic.

You clicked a button.

A function ran.

A database changed.

The software did exactly what it was programmed to do.

AI software is different.

It can interpret vague intent. It can summarize. It can generate. It can classify. It can plan. It can fill gaps. It can make a best guess.

When that capability is expensive, you use it carefully.

When it becomes cheap, you put it everywhere.

That is when products start to feel less like tools and more like collaborators.

Your email client drafts replies.

Your IDE explains errors.

Your browser summarizes pages.

Your notes app organizes thoughts.

Your spreadsheet understands messy data.

Your CRM writes follow-ups.

Your calendar negotiates meetings.

At first, these feel like features.

Eventually, they become expected behavior.

That is what commoditization does. It turns magic into baseline infrastructure.

## The Model Layer Is Getting Thinner

A lot of AI companies are in a dangerous position.

If your product is basically “chat with a model,” you are exposed.

If the model gets cheaper, your pricing power drops.

If the model gets better, your differentiation shrinks.

If the platform adds your feature, your product becomes a button.

That does not mean AI startups are doomed.

It means the model layer alone is a weak moat.

The stronger moats are:

- Distribution
- Workflow ownership
- Data access
- User trust
- Brand
- Taste
- Latency
- Reliability
- Integrations
- Regulatory approval
- Proprietary feedback loops
- Deep understanding of a specific customer

This is why OpenAI, Anthropic, Google, and others are moving toward products.

Chatbots are not the end state.

The model provider wants to own the place where work happens.

That is why they care about coding agents, browsers, memory, enterprise search, voice, multimodal interfaces, and operating-system-level integrations.

The model is valuable.

The surface area around the model is where the power compounds.

## The Strange Future of Expensive Models

It is easy to say all models will become cheap.

That is probably true in a broad sense, but the frontier will still be expensive.

There will always be a most capable model.

There will always be a demand for intelligence that can handle harder tasks, longer context, better reasoning, fewer mistakes, and more autonomy.

The mistake is thinking expensive models die because cheap models improve.

Expensive models survive by doing more in fewer steps.

A cheap model might write code after several prompts.

An expensive model might design the architecture, write the code, run tests, fix bugs, update docs, and explain tradeoffs in one session.

A cheap model might answer a question.

An expensive model might solve the actual problem behind the question.

That is why frontier pricing will not disappear immediately.

It will be judged differently.

People will stop asking:

> How much does this model cost per million tokens?

They will ask:

> How much does this model cost per completed task?

That is where expensive models can still win.

If a stronger model takes fewer requests, fewer turns, fewer retries, and less human supervision, the net effect can be the same as a cheaper model.

Sometimes it may be better.

The price of intelligence goes down in two ways:

1. The token price falls
2. The number of tokens needed to complete the task falls

Both matter.

## The Developer Playbook Is Changing

A few years ago, developers picked one model provider and built around it.

That is starting to look naive.

The better approach is model fluidity.

Your app should be able to swap models based on cost, latency, quality, and task type.

A simple version looks like this:

```javascript
const providers = [openai, anthropic, google, deepseek];

const cheapestProvider = providers.sort(
  (a, b) => a.pricePerToken - b.pricePerToken
)[0];

app.post("/chat", async (req, res) => {
  const response = await cheapestProvider.generate(req.body.prompt);
  res.send(response);
});
```

That is obviously oversimplified, but the direction is right.

A serious AI product should route intelligently.

Use a small model for simple classification.

Use a cheap model for summaries.

Use a fast model for autocomplete.

Use a stronger model for reasoning.

Use the best model for high-stakes decisions.

Use local models when privacy matters.

Use fallback providers when reliability matters.

In the long run, developers should think less like model fans and more like infrastructure engineers.

The question is not “Which model is best?”

The question is “Which model is best for this job at this price?”