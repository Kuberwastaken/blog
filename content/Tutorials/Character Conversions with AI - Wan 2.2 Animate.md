---
title: Character Conversions with AI - Wan 2.2 Animate
draft: false
tags:
  - AI
  - AGI
  - Artificial-Intelligence
  - Business
  - GenerativeAI
  - OpenSource
  - Internet
  - Wan
  - "#alibaba"
created: 2025-09-24
modified:
---
Hey! you probably saw my post and were curious how to recreate it haha, I know I sent these out a little late but that's because every single service that offers these models for free is extremely overloaded because of how Viral this has gotten, but ideally you should get one in ~10 minutes of preparation. It's not Realtime yet, but only a matter of time until it is.

![The X Post](https://cdn.kuber.studio/assets/media/wan/x-post.png)

The model in question is called **Wan 2.2 Animate** - Which is a SOTA JUST 14B Open Source Model By Wan AI by the Alibaba Group.
It is a Chinese model, but most services host them separately, so data privacy isn't that big of an issue - your outputs aren't being used on training the model.

If you're interested in the model and the Paper itself (both amazing btw)

**Model Repository ->** https://github.com/Wan-Video/Wan2.2
**Paper ->** https://arxiv.org/abs/2509.14055

But our main focus is on generating the videos, that's what we'll be covering here.

# Method: Hugging Face Spaces

This is the most simple and private way to do it, but there's a queue 

(*I tried to reverse engineer and potentially host the model on a space itself to dodge the queue using a backend API with multiple spaces, but the space itself is making API calls, which we don't have the keys for, so the main space it is haha.*)
### Step 1: Go to the Hugging Face Space

You might have to make a Hugging Face account if you don't have one - do it, it's free and they're an amazing company too :)

Go to the [Official Space Link](https://huggingface.co/spaces/Wan-AI/Wan2.2-Animate)

It'll take a minute to initialize the Gradio spaces container - don't worry

![Step-1](https://cdn.kuber.studio/assets/media/wan/step1.png)

### Step 2: Upload a Reference Image and Template Video

Here, you'll be prompted to upload two things:

**Template Video:** The original Video you want to Modify - This could be you, a famous scene, footage from something else, anything - it doesn't matter because it's going to be replaced by our character.

**Reference Image:** The Reference Image of the Character you want to convert to. Ideally should have similar dimensions and space as the template video for the best results.

![Step-2](https://cdn.kuber.studio/assets/media/wan/step2.png)

It'll take a bit to upload, don't worry.

When that's done - Just click **Generate Video**

Don't change the default Model or Inference Quality - you have the best possible one selected already.

The model page recommends to use front facing video only, 
what I did for my video was getting [Nano Banana](https://aistudio.google.com/models/gemini-2-5-flash-image) to replace a screenshot from my original video with the character I wanted.

It also only does with Realistic Reference images - I tried doing one with Luffy and it was *cough* nightmare fuel

### Step 3: Wait for the Output (and PLEASE Download it)

anddd you should be done, click on the download button on the top right of the Media to save it :)

![Step-3](https://cdn.kuber.studio/assets/media/wan/step3.png)

---

## Other Methods to Generate These

[Official Wan Video Portal](https://create.wan.video/explore)- Unlimited Free Generations, 1-2 Free Premium Generations Daily, Can't... speak about Data Privacy lol

[Fal AI](https://fal.ai/models/fal-ai/wan/v2.2-14b/animate/move/playground)- The Free New Account Credits would give you a few generations

[Higgsfield](https://higgsfield.ai/flow/animate)- It's Paid but honestly their ecosystem is Pretty Cool.

---

If you found this useful, drop me a Follow! 
[X](https://www.x.com/kuberwastaken)   [LinkedIn](https://www.linkedin.com/in/kubermehta/)  [Instagram](https://www.instagram.com/yokuber/)

Feel free to Reach out or DM me if you want to talk, have any problems or need any help too, I'll try my best!