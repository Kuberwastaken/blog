---
title: "AsianMOM: A WebGPU-Powered AI That Roasts You Like an Asian Mother"
draft: false
tags: 
created: 2025-05-27
modified: 2025-05-27
---
People are making AI apps that contribute to the society or make others' lives easier. 
I was bored of that.
So I made an AI app that roasts you with the sharp-witted, no-nonsense energy of an Asian mom, and I had the perfect, most creative name for it -_AsianMOM_
*(well technically it's Artificial Surveillance with Interactive Analysis and Nagging Maternal Oversight Model)*
This isn't the most crazy part though, the crazy part is, it runs on YOUR browser. locally. 
No backends, no setups, just opening it and waiting for the models to load. Once it's loaded in, you can even use it offline thanks to the power of WebGPU
This isn’t just a gimmick, it’s a proof of concept for what’s possible with new WebML and WebGPU, and a dash of absurdity. Let’s dive into how _AsianMOM_ came to life, what makes it tick, and why it’s a glimpse into the future of AI.

![AsianMOM Demo](https://raw.githubusercontent.com/Kuberwastaken/AsianMOM/refs/heads/main/Media/Assets/Readme-Image.jpg)

## What is WebML and WebGPU?

WebML and WebGPU are cutting-edge technologies that enables apps like AsianMOM to run sophisticated AI models directly in your web browser, making advanced AI accessible without the need for specialized hardware or software installations.

**WebML (Web Machine Learning)** is a collection of browser-based tools and APIs that allow developers to execute machine learning models locally on your device, whether it’s a laptop, phone, or tablet. It uses WebAssembly, a technology that runs high-performance code in browsers, to process complex AI tasks without sending data to a server. This means _AsianMOM_ can analyze images or generate text entirely on your device, keeping your data private and eliminating the need for constant internet connectivity. WebML supports frameworks like ONNX (Open Neural Network Exchange), which standardizes AI models so they can run efficiently across different platforms, which is what we're using here.

**WebGPU**, on the other hand, is the powerhouse that makes this possible. It’s a modern browser API that provides developers with direct access to your device’s GPU (graphics processing unit) or, if unavailable, a CPU fallback for high-performance computing tasks. Unlike its predecessor, WebGL, which was primarily for rendering graphics like 3D games, WebGPU is designed for general-purpose computing, including the heavy mathematical operations required by AI models. For _AsianMOM_, WebGPU handles the **1.5 billion parameters** of its dual models (SmolVLM for vision and LLaMA 3.2 for text) with remarkable efficiency, enabling real-time roasts in browsers like Chrome, Edge, and Firefox. For the technically inclined, WebGPU’s low-level access to GPU shaders allows for optimized matrix multiplications critical to neural networks, offering near-native performance in a browser environment. Together, WebML and WebGPU eliminate the need for cloud servers or expensive hardware, making AI tools like _AsianMOM_ accessible to anyone with a modern browser, from students in classrooms to developers in low-bandwidth regions, paving the way for a future where AI is as ubiquitous and user-friendly as browsing the web.

## Discovering it was even Possible

I first stumbled across the inspiration for _AsianMOM_ while messing around with a SmolVLM demo on a WebGPU showcase site. The demo was simple but REALLY cool: turn your camera on and the model described it LIVE in a browser. No fuss, no server calls. That’s when it hit me: what if this thing could _roast_ my mess instead of just describing it? I imagined an AI saying, “This desk looks like a landfill. You think you’ll find success under all that trash?” From that spark, _AsianMOM_ was born.

The demo’s simplicity of running a vision model in a browser blew my mind. It wasn’t just cool; it was a glimpse into a future where AI is as easy to use as a webpage. I wanted _AsianMOM_ to capture that same “holy crap, this runs in my browser?” vibe while adding a layer of humor that makes it universally relatable.

## Building the Actual Thing

Building _AsianMOM_ was a chaotic journey of ambition, trial and error, and a lot of coffee. The goal was to create a single `index.html` file that could run two AI models: SmolVLM for vision and LLaMA 3.2 for text using WebGPU, all while delivering mom-level roasts. Here’s how it went down:

1. **The Vision**: I started with SmolVLM (500M parameters), a lightweight vision-language model that can process images and generate text. The plan was to feed it images and have it roast based on what it saw. In the end, paired it with LLaMA 3.2 (1B parameters) for text-based roasts, aiming for a dual-model setup where users could upload images or type prompts.

2. **The Stack**: Everything runs on WebML with ONNX models optimized for WebGPU. The UI is a barebones React app (because I’m lazy and React’s fast to prototype). The entire app is bundled into one `index.html` file, which loads the models, caches them locally, and runs inference in real-time.

3. **The Workflow**: Users open the page, upload an image or type a prompt, and the app processes it. SmolVLM handles image inputs, extracting visual features, while LLaMA 3.2 generates the roast. WebGPU accelerates the matrix math, and the result is a snarky comment delivered in seconds.

The whole thing took about 3 days to build, with most of the time spent wrestling with WebML’s quirks and my own less-than-stellar prompting skills. But the end result? A browser-based AI that roasts you like you forgot to call your mom on her birthday.

## Trial and Error: What Worked, What Didn’t

Building _AsianMOM_ was like trying to teach a toddler to roast equal parts frustrating and hilarious. Here’s a rundown of the highs and lows:

- **ONNX Models**: I chose ONNX because it’s widely supported by WebML and works well with WebGPU. Converting SmolVLM and LLaMA 3.2 to ONNX was straightforward, but optimizing them for browser performance was a nightmare. Early versions took _10 minutes_ to load the models, which was unacceptable. After tweaking quantization and pruning, I got it down to ~3 minutes.

- **Vision Model Struggles**: I initially wanted SmolVLM to handle both image processing _and_ roasting, but it kept spitting out generic descriptions instead of burns. Turns out, most vision-language models have safeguards to avoid generating “mean” content about people. I tried fine-tuning SmolVLM to be snarkier, but the results were meh, think “Your shirt is untidy” instead of “You look like you got dressed in a hurricane.” So, I pivoted to using LLaMA 3.2 for the actual roasting, passing SmolVLM’s outputs as context

- **Trying Different LLMs**: I experimented with smaller models like Phi-2 (1.3B) and Qwen (0.5B) to save space, but they lacked the wit needed for mom-level roasts. LLaMA 3.2 hit the sweet spot small enough for browsers, punchy enough to deliver lines like, “You call that a haircut? It looks like a lawnmower gave up halfway.”

- **Safeguards and Ethics**: Many LLMs have guardrails to prevent toxic outputs, which made roasting tricky. I had to carefully craft prompts to keep things playful without crossing into mean-spirited territory. It’s a fine line mom roasts are savage but loving, not cruel.

- **The UI**: I’m no designer, so the UI is… functional. Built with React and Tailwind CSS, it’s a simple input field for text, an image uploader, and a big “Roast Me” button. I tried fancier designs, but they bloated the file size, so I kept it minimal. The focus is on the roasts, not the aesthetics.

- **Caching and Performance**: WebGPU’s caching was a lifesaver. Once the models are loaded, they’re stored locally, making subsequent runs lightning fast. But older devices or browsers without WebGPU support (looking at you, Safari) struggled. I added a CPU fallback, but it’s sluggish on low-end hardware.

What worked? The dual-model setup (SmolVLM + LLaMA) and WebGPU’s raw power. What didn’t? My overambitious plan to make SmolVLM a roast master and my initial underestimation of WebML’s learning curve. Still, every failure taught me something new about optimizing AI for the web.

## Seeing It in Action

Want to experience *AsianMOM* for yourself? Visit [asianmom.kuber.studio](https://asianmom.kuber.studio) to try it directly in your browser, or use the download button on the site to get the `index.html` file and run it locally on a modern browser like Chrome, Edge, or Firefox. For a real treat, *AsianMOM* can tap into your webcam for live video analysis, delivering real-time, culturally inspired roasts based on what it sees. Think of it as your mom catching you slouching or snacking at midnight. Just enable your webcam, and you might get zingers like, “Why you sitting like that? You want a hunchback by thirty?” or “Eating chips again? You think your stomach is a landfill?” You can also upload a photo, like one of your messy desk, or type a prompt, such as “I stayed up until 3 AM studying,” and get roasted with lines like, “This desk looks like a recycling bin exploded. You expect to find your future in that mess?” The first load takes about 3 minutes as WebGPU downloads the 1.5 billion-parameter models (SmolVLM for vision and LLaMA 3.2 for text), but once cached, it runs smoothly and works offline. 

Check out the [GitHub repo](https://github.com/Kuberwastaken/AsianMOM) for the source code. Using it to roast my friends’ questionable outfits or my chaotic workspace was both hilarious and humbling sometimes the roasts are a bit mild or slightly off, but when they land, they’re as sharp as a mom’s side-eye.[](https://asianmom.kuber.studio/)

## Why This Is Huge: Problems It Can Help Solve

_AsianMOM_ might seem like a silly side project, but it’s a proof of concept for something much bigger. Here’s why it matters:

- **Accessible AI**: By running entirely in a browser, _AsianMOM_ shows that powerful AI doesn’t need expensive hardware or cloud subscriptions. This could pave the way for AI tools in education (imagine a math tutor in a browser), healthcare (diagnostic aids in remote areas), or entertainment (more apps like _AsianMOM_!).

- **Privacy-First AI**: Since everything runs locally, your data stays on your device. No sending your embarrassing selfies to a server somewhere. This is huge for privacy-conscious users and applications in sensitive fields.

- **Low-Bandwidth Solutions**: In areas with spotty internet, offline-capable AI apps like _AsianMOM_ could deliver critical services without relying on constant connectivity.

The bigger picture? WebML and WebGPU are making AI a utility, like electricity or Wi-Fi. _AsianMOM_ is my goofy contribution to that future, but the tech behind it could solve real problems for millions.

## What It Taught Me About WebML and WebGPU

Building _AsianMOM_ was a crash course in the wild world of browser-based AI. Here’s what I learned:

- **WebML’s Potential and Pain**: WebML is incredible for running models locally, but it’s still clunky. Model optimization (quantization, pruning) is critical to avoid browser crashes. Debugging WebML errors feels like deciphering alien hieroglyphs.

- **WebGPU’s Power**: WebGPU is a beast. It handled 1.5B parameters with ease on my mid-range laptop, but it’s sensitive to browser quirks and device capabilities. Testing across platforms was a humbling experience.

- **Prompt Engineering Is Hard**: Getting _AsianMOM_ to sound like a snarky mom took dozens of prompt iterations. Small changes in wording made a huge difference too generic, and it sounded like a chatbot; too specific, and it lost the humor.

- **Community Resources Are Key**: I leaned heavily on open-source tools like ONNX.js, WebGPU samples, and Hugging Face’s model hub. The open-source community made this project possible.

This project pushed me to think creatively about constraints file size, browser compatibility, model performance and taught me that AI in the browser is both challenging and insanely rewarding.

## Current Limitations of AsianMOM

_AsianMOM_, while a fun showcase of WebGPU and WebML, faces several limitations that highlight the growing pains of browser-based AI. 
The initial model loading time is a major bottleneck, taking around 3 minutes to fetch and initialize the 1.5 billion parameters (SmolVLM 500M and LLaMA 3.2 1B) on a decent machine, and even longer on low-end devices due to browser data transfer constraints. The roasting quality can be inconsistent, often due to my novice prompting skills and model safeguards that prevent overly harsh outputs, resulting in burns that sometimes miss the sharp yet loving tone of an Asian mom. Browser-based resource allocation is another hurdle; WebGPU operates under strict memory and compute limits per tab to prevent crashes, which can cause stuttering during inference, especially on mobile devices or systems with weaker GPUs, where only a fraction of VRAM is utilized. This forces aggressive model optimization through quantization and pruning, but performance still suffers on devices with less than 8GB RAM or when falling back to sluggish CPU-based inference. 

Platform support is also a challenge WebGPU works well on Chrome, Edge, and Firefox across Windows, macOS, and Linux, but Safari’s incomplete support makes _AsianMOM_ unreliable on iOS or older macOS systems, and some budget Android phones or outdated Linux browsers lack WebGPU entirely, excluding users on those platforms. These constraints loading delays, inconsistent outputs, resource caps, and spotty platform support show that while WebML and WebGPU are powerful, they’re still maturing technologies that demand careful optimization and broader adoption to truly shine.
## The Communities Building These

_AsianMOM_ wouldn’t exist without the vibrant communities pushing WebML and WebGPU forward. Some key players:

- **WebGPU Community**: The WebGPU Working Group (W3C) is standardizing the API, with contributions from Google, Apple, and Mozilla. Their samples and docs were lifesavers.

- **ONNX.js and WebML**: The ONNX.js team at Microsoft and the broader WebML community provide tools and tutorials for running AI in browsers. Their work made integrating SmolVLM and LLaMA 3.2 feasible.

- **Hugging Face**: The model hub and community forums were goldmines for finding pre-trained models and optimization tips.

- **Indie Devs on X**: I found tons of inspiration from X posts about WebGPU experiments and AI hacks. The indie dev scene is buzzing with people pushing the limits of what browsers can do.

These communities are collaborative, open, and full of folks who love breaking things to build something better. If you’re into AI or web dev, they’re worth diving into.

## Why You Should Join In and Make This Huge

_AsianMOM_ is just the start. It’s open-source ([GitHub repo](https://github.com/Kuberwastaken/AsianMOM)), and I’m calling on devs, AI nerds, and anyone with a sense of humor to jump in and make it bigger. Here’s why you should get involved:

- **Push the Boundaries**: WebML and WebGPU are young, and projects like _AsianMOM_ are a chance to explore what’s possible. Add new models, improve the roasts, or build your own spin-off (_SassyGrandma_, anyone?).

- **Learn by Doing**: Contributing to _AsianMOM_ is a hands-on way to master WebML, WebGPU, and AI prompting. I learned more from this project than from any tutorial.

- **Make AI Fun**: AI doesn’t have to be boring or corporate. Let’s build more apps that make people laugh, think, or both.

- **Shape the Future**: Browser-based AI is going to be huge. By contributing to projects like this, you’re helping define how AI reaches the masses.

Grab the code, tweak it, break it, make it better. Share your roasts on X, submit pull requests, or just scan the QR code and laugh at _AsianMOM_’s burns. Let’s make browser-based AI the next big thing together.