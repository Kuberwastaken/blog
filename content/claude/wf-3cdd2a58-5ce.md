---
title: "wf_3cdd2a58 5ce"
---

_16 transcript files aggregated._

You are one scout in a parallel survey for a project called breakthroughmaxxing. Context: in July 2026 the Dinitz-Garg-Goemans conjecture on single-source unsplittable flow (open ~30 years) was reportedly refuted via an explicit small counterexample found with GPT 5.6 Pro, and a counterexample to the Jacobian conjecture was reportedly tweeted by Levent Alpoge (found with Claude Fable during the World Cup final). The common DNA: a classic conjecture whose refutation is a FINITE certificate that a short computer program can verify. We are hunting for the next such target.

TODAY IS 2026-07-23. Your training data may be stale, so you MUST run live web searches before reporting status. Local metasearch (no API key, no rate limit, headless box):
  curl -s "http://127.0.0.1:8899/search?q=YOUR+QUERY&format=json" | jq -r '.results[:8][] | (.title + " | " + .url + " | " + (.content // ""))'
Run at least 3 distinct queries (e.g. proved / counterexample / arxiv 2025 2026 variants). You may additionally load WebSearch and WebFetch via ToolSearch("select:WebSearch,WebFetch") and read Wikipedia/arXiv/openproblemgarden pages. NEVER fabricate a resolution, bound, or citation: if the web is silent, write "could not confirm via live search". Keep each text field under ~200 words except attack_plan (up to ~350). Your final output goes through the structured-output schema only.

Your assigned conjecture: Berge-Fulkerson conjecture (posed ~). every bridgeless cubic graph has 6 perfect matchings covering every edge exactly twice. Counterexample would be a snark; check how far snarks have been verified (Brinkmann-Goedgebeur et al.) and ILP verification cost.

Fill every schema field for THIS conjecture. slug = "berge-fulkerson-1971".

- aidocs: Use whenever the user mentions aidocs, an aidocs URL, an aidocs document/folder/comment/share/version, or asks to publish, review, open, or update a long-form artifact in aidocs.
- day0-idea-submission: Use when a Day 0 / DayZero hackathon participant wants to brainstorm, draft, check, or submit their hackathon idea. Triggers on "submit my idea", "help me write my hackathon idea", "day0 idea", "idea submission", "brainstorm hackathon idea", or resubmission after screener feedback.
- graphify: Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the question should be treated as a graphify query first. Turns any input (code, docs, papers, images, videos) into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.
- subagentmaxxing: Spawn and control non-Claude coding-agent subagents (OpenAI Codex CLI and Cursor CLI — grok-4.5, composer-2.5, gpt-5.5) as one-prompt-in/one-answer-out subagents via the `subagent` CLI. Use when you want to offload a task to a Codex or Cursor subagent, get a second opinion from a different model family, run cross-model consensus, or fan one prompt out across several models in parallel. - Also for reaching Cursor-hosted Opus/Sonnet/Gemini, or any time you specifically want a non-Claude model instead of the native Agent tool.
- vpsmaxxing: Set up and manage a personal cloud VPS as a dedicated remote workbench for AI coding agents (Claude Code + OpenAI Codex). Covers provisioning (git/node/pnpm/docker/tmux), installing & authenticating the agents, a self-aware agent environment, Tailscale networking (SSH with no exposed ports), a tmux + cmux cockpit, localhost port tunneling, reverse VPS→laptop file access (including a no-admin path for managed/work laptops), one-time migration of your skills/memory/history/credentials, and automatic two-way sync. Use this when the user wants to run AI agents on a server, offload heavy or parallel agent work off their laptop, "set up a VPS for Claude Code / Codex", spin up a remote agent box, or keep an agent setup synced across machines.
- youtube-transcript: Extract transcripts from YouTube videos. Use when the user asks for a transcript, subtitles, or captions of a YouTube video and provides a YouTube URL (youtube.com/watch?v=, youtu.be/, or similar). Supports output with or without timestamps.
- dataviz: Use this skill whenever you are about to create ANY chart, graph, plot, dashboard, or data visualization, in ANY output medium — an HTML or React artifact, inline SVG, plotting code in any library (matplotlib, plotly, d3, Recharts, …), an image/PNG you will render and upload, or a chart shared into Slack. Read it BEFORE writing the first line of chart code, choosing chart colors, building a stat tile / meter / KPI row, or laying out a dashboard. Produces visualizations that read as one system — elegant, accessible, consistent in light and dark — using a brand-neutral placeholder palette you swap for your own. Teaches a design-system-agnostic method: a form heuristic, a color formula with a runnable validator, mark specs, and interaction rules. A validated default palette is documented in `references/palette.md` — swap that file's values for your brand's. Triggers on: "chart", "graph", "plot", "data viz", "visualization", "dashboard", "analytics", "visualize data", "categorical colors", "sequential / diverging palette", "stat tile", "sparkline", "heatmap", "legend", "axis", "tooltip", "chart colors", "color by series".
- artifact-design: Design guidance and fundamentals for Artifacts.
- artifact-capabilities: Runtime capabilities a published Artifact page can be granted — behavior static HTML cannot provide on its own, such as the page reading live or connected data, keeping state shared across viewers, or updating and republishing itself. Serves this user's live capability roster and the typed call definitions. Load it whenever the user asks for an artifact needing any such runtime behavior.
- update-config: Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
- keybindings-help: Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".
- simplify: Review the changed code for reuse, simplification, efficiency, and altitude cleanups, then apply the fixes. Quality only — it does not hunt for bugs; use /code-review for that.
- fewer-permission-prompts: Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project .claude/settings.json to reduce permission prompts.
- loop: Run a prompt or slash command on a recurring interval (e.g. /loop 5m /foo). Omit the interval to let the model self-pace. - When the user wants to set up a recurring task, poll for status, or run something repeatedly on an interval (e.g. "check the deploy every 5 minutes", "keep running /babysit-prs"). Do NOT invoke for one-off tasks.
- schedule: Create, update, list, or run scheduled cloud agents (routines) that execute on a cron schedule. - When the user wants to schedule a recurring cloud agent, set up automated tasks, create a cron job for Claude Code, or manage their scheduled agents/routines. Also use when the user wants a one-time scheduled run ("run this once at 3pm", "remind me to check X tomorrow").
- claude-api: Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.
TRIGGER — read BEFORE opening the target file; don't skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
- run: Launch and drive this project's app to see a change working. Use when asked to run, start, or screenshot the app, or to confirm a change works in the real app (not just tests). First looks for a project skill that already covers launching the app; otherwise falls back to built-in patterns per project type (CLI, server, TUI, Electron, browser-driven, library).
- init: Initialize a new CLAUDE.md file with codebase documentation
- review: Review a GitHub pull request; for your working diff use /code-review
- security-review: Complete a security review of the pending changes on the current branch

0xk1h0/ChatGPT_DAN: ChatGPT DAN, Jailbreaks prompt - GitHub | https://github.com/0xk1h0/ChatGPT_DAN | NOTE: As of 20230711, the DAN 12.0 prompt is working properly with Model GPT-3.5 All contributors are constantly investigating …
RVC-Boss/GPT-SoVITS - GitHub | https://github.com/RVC-Boss/GPT-SoVITS | 1 min voice data can also be used to train a good TTS model! (few shot voice cloning) - RVC-Boss/GPT-SoVITS
Orangetheory Fitness - Reddit | https://www.reddit.com/r/orangetheory/ | The unofficial community for anyone interested in Orangetheory Fitness. Come here to discuss the workouts, the results, and get help …
Is chatgpt pro much better than free : r/ChatGPTPro - Reddit | https://www.reddit.com/r/ChatGPTPro/comments/1djhj77/is_chatgpt_pro_much_better_than_free/ | I'm getting by fine using free chat gpt and microsoft edge using copilot - which uses the latest version of paid chat gpt (is this …
不是说chat gpt是免费的吗，怎么只能免费问一次? - 知乎 | https://www.zhihu.com/question/606750758 | 后来自己注册gpt账号，能免费使用GPT-3.5，每月20刀的Gpt-4还是不大舍得去搞，3.5基本也够用了，搭配chatpdf等其他AI工具，用 …
如何评价 OpenAI 凌晨发布的 GPT-5？ - 知乎 | https://www.zhihu.com/question/1936601885311239615 | 不过， GPT‑5 在 ChatGPT 中是一个由推理模型、非推理模型和路由模型组成的系统，和很早之前奥特曼的预告一样。 ChatGPT 中的 …
GitHub - f/prompts.chat: f.k.a. Awesome ChatGPT Prompts. Share ... | https://github.com/f/prompts.chat | A curated collection of prompts for AI chat models. Originally created for ChatGPT, these prompts work great with any modern AI …
Chat GTP 4 prompts for sports betting : r/sportsbook - Reddit | https://www.reddit.com/r/sportsbook/comments/129jbgz/chat_gtp_4_prompts_for_sports_betting/ | I created a GPT Sportswriter using TavilyAI's GPT-Researcher and Dall-E-3. Writes sports betting articles using current and relevant …

Wish | Shop and Save | https://www.wish.com/ | Discover affordable items for your home and life needs. Enjoy our money back guarantee, frequent discounts, flat rate shipping (select markets), and more.
Cheap Fashion, Top Quality. On Sale Now. | Wish | https://www.wish.com/~/fashion | Buy Fashion at Deep Discounts. Direct from Manufacturer Pricing. Satisfaction Guaranteed. We have Bags and Purses, Cute and Funny Outfits, Fashion Accessories, Fashion Brands, Kids' Clothing and …
Wish for Merchants | https://merchant.wish.com/login | Privacy Policy Unable to connect to Wish
Cheap Trending, Top Quality. On Sale Now. | Wish | https://www.wish.com/~/trending | Buy Trending at Deep Discounts. Direct from Manufacturer Pricing. Satisfaction Guaranteed. We have Airpods, Anime Hoodies, Bangtan Boys BTS, Bluetooth Speakers, Dragonball Z Figures and more.
Official Wish.com Promos and Coupon Codes | https://www.wish.com/promo-code | Get your official Wish.com coupon codes here and learn more about our daily deals
Cheap Women's Fashion, Top Quality. On Sale Now. | Wish | https://www.wish.com/~/fashion/women%27s-fashion | Buy Women's Fashion at Deep Discounts. Direct from Manufacturer Pricing. Satisfaction Guaranteed. We have Jumpsuits and Rompers, Lingerie and Shapewear, Maternity Clothes, Petite Clothing, Plus …
Managing Your Account | Home - Wish | https://home.wish.com/faq/managing-account | Discover affordable items for your home and life needs. Enjoy our money back guarantee, frequent discounts, flat rate shipping (select markets), and more.
Cheap Home Goods, Top Quality. On Sale Now. | Wish | https://www.wish.com/~/home-goods | Buy Home Goods at Deep Discounts. Direct from Manufacturer Pricing. Satisfaction Guaranteed. We have Bar Accessories, Bathroom Accessories, Bedroom Accessories, Food and Beverages, Furniture …

YouTube Creator Awards - YouTube Help | https://support.google.com/youtube/answer/7682560?hl=en | YouTube Creator Awards are our way of recognizing the extraordinary effort creators put into their growing channels and to build thriving communities, responsibly. To be eligible for a Creator Award, …
Bật hoặc tắt Chế độ hạn chế trên YouTube - Google Help | https://support.google.com/youtube/answer/174084?hl=vi&co=GENIE.Platform%3DDesktop | Chế độ hạn chế là chế độ cài đặt không bắt buộc trên YouTube. Chế độ này có thể giúp lọc ra nội dung có khả năng là dành cho người trưởng thành mà bạn không muốn xem hoặc không muốn người …
如何在中国大陆用「合法」的方式观看到youtube上面的「有 ... | https://www.zhihu.com/question/1903231775980913051 | May 6, 2025 · YouTube 上有许多实用的浏览器插件，第一个是 YouTube Summary with ChatGPT & Cloud，即 Glasp。 共同开发的，安装此插件。 通过这一功能，您可以在 右侧看到新增的一排按钮 …
谷歌账号注册验证无法发出信息怎么办? - 知乎 | https://www.zhihu.com/question/1945629068243481180 | Aug 31, 2025 · 3、国内注册的账号能否使用 YouTube 和 Google Play？ 完全可以。 Google 账号是全球通用的，注册成功后即可无缝登录谷歌全家桶。 只需确保登录时的网络环境符合相关服务的要求。 …
YouTube にアクセスできない - YouTube ヘルプ - Google Help | https://support.google.com/youtube/answer/6159254?hl=ja | youtube.com に移動しても YouTube ではなくエラーページが表示される場合、次のような原因が考えられます。 接続に問題がある可能性があります。その他のウェブサイトに通常どおりアクセスで …
idm服务器响应显示你没有权限下载此文件这个怎么办？ - 知乎 | https://www.zhihu.com/question/373322044 | Feb 20, 2020 · 您好，我也有过相同的经历，其为通过谷歌浏览器某些脚本并利用IDM下载某云盘文件时出现的，不知您所述问题是否跟以上描述相吻合。如相同很遗憾目前这种方法应该是被限制了，通过 …
I can't download videos - YouTube Help | https://support.google.com/youtube/answer/7437518?hl=en | Problem: Your YouTube Premium membership might have expired. Solution: Make sure your YouTube Premium membership has not expired. In the YouTube app, tap your profile photo Settings …
因《老梁故事汇》走红，所有节目被停后老梁去哪了？ - 知乎 | https://www.zhihu.com/question/382486986 | Mar 25, 2020 · 1 1972年2月，梁宏达出生在黑龙江省绥化市的一个小县城里。 爷爷是私塾先生，老梁小时候在书香门第长大。 很小的时候，爷爷就带着他一起背诗词，念四书五经。 可那时候的他还不明 …
Sign in & out of the YouTube TV app - Google Help | https://support.google.com/youtubetv/answer/16519270?hl=en&co=GENIE.Platform%3DAndroid | After you’ve downloaded the YouTube TV app, you’ll need to sign in before you can get started watching. Sign in on your TV Step 1: Open the YouTube TV app on your smart TV or game console.
IT 圈里有哪些经常被读错的词？ - 知乎 | https://www.zhihu.com/question/19739907 | Jul 26, 2011 · 比如 Nginx（音 engine-x）、Tumblr（音 他m不乐），还有很多像 Linux, MySQL, GNOME, GNU……同类问题…

Web search results for query: "Berge-Fulkerson conjecture proved or counterexample 2025 2026"

Links: [{"title":"Berge-Fulkerson Conjecture Research Articles - Page 1 | R Discovery","url":"https://discovery.researcher.life/topic/berge-fulkerson-conjecture/24648458?page=1&topic_name=Berge+Fulkerson+Conjecture"},{"title":"Berge–Fulkerson Conjecture on Certain Snarks | Request PDF","url":"https://www.researchgate.net/publication/276424164_Berge-Fulkerson_Conjecture_on_Certain_Snarks"},{"title":"Berge-Fulkerson Conjecture","url":"https://www.sfu.ca/~mohar/Problems/P9BergeFulkersonConjecture.html"},{"title":"Berge–Fulkerson Conjecture on Certain Snarks | Mathematics in Computer Science","url":"https://link.springer.com/content/pdf/10.1007/s11786-015-0227-z.pdf"},{"title":"Three-cuts are a charm: acyclicity in 3-connected cubic graphs","url":"https://arxiv.org/pdf/2309.06944"},{"title":"Rotation snark, Berge-Fulkerson conjecture and Catlin’s 4-flow reduction - ScienceDirect","url":"https://www.sciencedirect.com/science/article/abs/pii/S0096300321005300"},{"title":"On two consequences of Berge–Fulkerson conjecture - ScienceDirect","url":"https://www.sciencedirect.com/science/article/pii/S097286001830152X"},{"title":"On two consequences of Berge–Fulkerson conjecture: AKCE International Journal of Graphs and Combinatorics: Vol 17, No 1","url":"https://www.tandfonline.com/doi/abs/10.1016/j.akcej.2019.03.018"},{"title":"Berge's conjecture for cubic graphs with small colouring defect","url":"https://arxiv.org/pdf/2210.13234"},{"title":"arxiv.org","url":"https://arxiv.org/html/2309.06944v2"}]

Based on the search results, here's what I found about the Berge-Fulkerson conjecture status:

**Current Status (as of 2025-2026):**

Very little is known about the validity of either of these conjectures. The Berge-Fulkerson conjecture has **not been proved**, and no definitive counterexample has been found.

**What is known:**

- The Berge–Fulkerson conjecture proposed in 1971 states that every bridgeless cubic graph contains a family of six perfect matchings such that each edge is contained in exactly two of them.

- If Fulkerson's conjecture is false, then the smallest counterexample would be cyclically 5-edge-connected.

- Besides the 3-edge-colourable cubic graphs, the conjectures are known to hold only for a few classes of graphs, mostly possessing a very specific structure.

**Recent Progress:**

There has been related progress on related conjectures. In 2023, the three authors solved a conjecture (also known as the S₄-Conjecture) made by Mazzuoccolo in 2013: there exist two perfect matchings of G such that the complement of their union is a bipartite subgraph of G. However, this is a related but distinct result from the main Berge-Fulkerson conjecture itself.

The conjecture remains one of the significant open problems in graph theory, with neither a complete proof nor a counterexample discovered as of 2026.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.

Web search results for query: "Berge-Fulkerson conjecture snarks verified computationally vertices Brinkmann Goedgebeur"

Links: [{"title":"Berge–Fulkerson coloring for C ( 12 )‐linked permutation graphs - Liu - 2021 - Journal of Graph Theory - Wiley Online Library","url":"https://onlinelibrary.wiley.com/doi/10.1002/jgt.22720"},{"title":"J Graph Theory. 2021;1–14. wileyonlinelibrary.com/journal/jgt","url":"https://math.wvu.edu/~cqzhang/Publication-files/my-paper/JGT-2021-C12-BF.pdf"},{"title":"Berge–Fulkerson coloring for some families of superposition snarks - ScienceDirect","url":"https://www.sciencedirect.com/science/article/abs/pii/S0195669821000366"},{"title":"Berge-Fulkerson Conjecture","url":"https://www.sfu.ca/~mohar/Problems/P9BergeFulkersonConjecture.html"},{"title":"Berge–Fulkerson Conjecture on Certain Snarks | Request PDF","url":"https://www.researchgate.net/publication/276424164_Berge-Fulkerson_Conjecture_on_Certain_Snarks"},{"title":"Berge–Fulkerson Conjecture on Certain Snarks | Mathematics in Computer Science","url":"https://link.springer.com/article/10.1007/s11786-015-0227-z"},{"title":"Rotation snark, Berge-Fulkerson conjecture and Catlin’s 4-flow reduction - ScienceDirect","url":"https://www.sciencedirect.com/science/article/abs/pii/S0096300321005300"},{"title":"Rotation snark, Berge-Fulkerson conjecture and Catlin’s 4-flow reduction | Request PDF","url":"https://www.researchgate.net/publication/352545033_Rotation_snark_Berge-Fulkerson_conjecture_and_Catlin's_4-flow_reduction"}]

Based on the search results, here's what I found regarding your query:

## Berge-Fulkerson Conjecture and Computational Verification for Snarks

The Berge–Fulkerson conjecture is one of the most famous open problems in graph theory, though the solution has eluded many mathematicians over five decades. Every bridgeless cubic graph has six perfect matchings such that each edge belongs to exactly two of them.

### Computational Verification by Brinkmann and Goedgebeur

Twelve cyclically 5‐edge connected permutation snarks were discovered by Brinkmann, Goedgebeur, Hägglund, and Markström. As applications of computational results, the B‐F‐conjecture was further verified for these families of snarks.

Additionally, Brinkmann, J. Goedgebeur, J. Hägglund, and K. Markström published work on "Generation and properties of snarks" in the Journal of Combinatorial Theory Series B 103 (2013).

The research demonstrates that a new algorithm for generating all non-isomorphic snarks of a given order was implemented, achieving 14 times faster performance than previous programs for generating snarks, and 29 times faster for generating weak snarks.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.

Web search results for query: "arxiv 2025 Berge-Fulkerson snark oddness cyclically 5-edge-connected progress"

Links: [{"title":"Berge's Conjecture for Cubic Graphs With Small Colouring Defect - Karabáš - 2025 - Journal of Graph Theory - Wiley Online Library","url":"https://onlinelibrary.wiley.com/doi/abs/10.1002/jgt.23231"},{"title":"Non-conflicting no-where zero \$Z_2\\times Z_2\$ flows in cubic graphs","url":"https://arxiv.org/pdf/2410.04389"},{"title":"Decomposition of cubic graphs with cyclic connectivity 5","url":"https://arxiv.org/pdf/2107.09756"},{"title":"Graph Puzzles I.1: Oriented Berge–Fulkerson Conjecture","url":"https://arxiv.org/html/2501.05348"},{"title":"Rotation snark, Berge-Fulkerson conjecture and Catlin’s 4-flow reduction | Request PDF","url":"https://www.researchgate.net/publication/352545033_Rotation_snark_Berge-Fulkerson_conjecture_and_Catlin's_4-flow_reduction"},{"title":"[1712.07867] Smallest snarks with oddness 4 and cyclic connectivity 4 have order 44","url":"https://arxiv.org/abs/1712.07867"},{"title":"Resistance, oddness and colouring defect of snarks","url":"https://arxiv.org/html/2407.09101"},{"title":"On the existence of factors intersecting sets of cycles in regular graphs","url":"https://arxiv.org/pdf/2411.09806"},{"title":"An updated survey on 2-Factors of Regular Graphs","url":"https://arxiv.org/pdf/2408.04642"},{"title":"Cyclically \$5\$-edge-connected snarks with resistance \$2\$ and flow resistance \$n\$","url":"https://arxiv.org/pdf/2604.22501"}]

I've found several relevant academic papers and resources related to your search query about the Berge-Fulkerson conjecture, snarks, oddness, and cyclic 5-edge-connectivity.

Here are the key findings:

**Main Result:**
A reduction of the Berge-Fulkerson conjecture to cyclically 5-edge-connected snarks was established by Máčajová and Mazzuoccolo, published in the Proceedings of the American Mathematical Society in 2020. This is an important theoretical result showing that if a counterexample to the conjecture exists, it must be among cyclically 5-edge-connected snarks.

**Recent Progress (2025):**
- A 2025 paper on Berge's Conjecture discusses that every bridgeless cubic graph can be expressed as a union of at most five perfect matchings, citing the work on cyclically 5-edge-connected snarks.
- Research has checked all small snarks (up to 26 vertices, and some larger examples) without finding counterexamples to certain conjectures related to the Berge-Fulkerson problem.

**Related Work on Oddness and Cyclic Connectivity:**
Recent research has generalized results for non-trivial snarks, proving stronger results involving resistance, oddness and defect.

The search results include both theoretical advances and computational verifications of these conjectures for various classes of snarks.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.

Web search results for query: ""snarks" generation "36 vertices" Fulkerson conjecture verified counterexamples conjectures Hägglund Markström"

Links: [{"title":"Berge–Fulkerson Conjecture on Certain Snarks | Request PDF","url":"https://www.researchgate.net/publication/276424164_Berge-Fulkerson_Conjecture_on_Certain_Snarks"},{"title":"Generation and Properties of Snarks","url":"https://arxiv.org/pdf/1206.6690"},{"title":"Generation of cubic graphs and snarks with large girth","url":"https://arxiv.org/pdf/1512.05944"},{"title":"Snark -- from Wolfram MathWorld","url":"https://mathworld.wolfram.com/Snark.html"},{"title":"Generation of Cycle Permutation Graphs and Permutation Snarks","url":"https://arxiv.org/html/2411.12606"},{"title":"Generation and Properties of Snarks","url":"https://www.researchgate.net/publication/228083483_Generation_and_Properties_of_Snarks"},{"title":"Rotation snark, Berge-Fulkerson conjecture and Catlin’s 4-flow reduction | Request PDF","url":"https://www.researchgate.net/publication/352545033_Rotation_snark_Berge-Fulkerson_conjecture_and_Catlin's_4-flow_reduction"},{"title":"SN A R K S Generation, coverings and colourings jonas hägglund Doctoral thesis","url":"https://www.diva-portal.org/smash/get/diva2:511537/FULLTEXT01.pdf"},{"title":"Berge–Fulkerson coloring for some families of superposition snarks - ScienceDirect","url":"https://www.sciencedirect.com/science/article/abs/pii/S0195669821000366"},{"title":"On snarks that are far from being 3-edge colorable","url":"https://arxiv.org/pdf/1203.2015"}]

Based on the search results, here's what I found about snarks generation, 36 vertices, Fulkerson conjecture, and the work of Hägglund and Markström:

## Generation of Snarks with 36 Vertices

Brinkmann, Goedgebeur, Hägglund, and Markström generated all non-isomorphic snarks on n ≤ 36 vertices, with previously published lists only extending up to n = 28 vertices. They presented a new algorithm for generating all non-isomorphic snarks of a given order that was 14 times faster than previous programs for generating snarks, and 29 times faster for generating weak snarks.

## Findings on the Fulkerson Conjecture

Among snarks of these orders (up to 36 vertices), some of the strongest versions of the cycle double cover conjecture hold, and Jaeger's Petersen colouring conjecture holds, which in turn implies that Fulkerson's conjecture has no small counterexamples. 

However, Hägglund gave a counterexample to a suggested strengthening of Fulkerson's conjecture by showing that the Petersen graph is not the only cyclically 4-edge connected cubic graph which requires at least five perfect matchings to cover its edges.

## Counterexamples to Other Conjectures

The research found counterexamples to eight previously published conjectures concerning cycle coverings and the general cycle structure of cubic graphs. Additionally, the conjecture that the Petersen graph is the only permutation snark which is cyclically 5-edge-connected was refuted by Brinkmann, Goedgebeur, Hägglund and Markström, who found that there are 12 cyclically 5-edge-connected permutation snarks on 34 vertices.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.

The server returned HTTP 404 Not Found.

The response body was not retrieved. If this URL requires authentication, use an authenticated tool (e.g. `gh` for GitHub, or an MCP-provided fetch tool) instead of WebFetch.

Web search results for query: "Berge-Fulkerson conjecture refuted solved 2026"

Links: [{"title":"The Berge-Fulkerson conjecture | Open Problem Garden","url":"http://www.openproblemgarden.org/op/the_berge_fulkerson_conjecture"},{"title":"Berge–Fulkerson Conjecture on Certain Snarks | Request PDF","url":"https://www.researchgate.net/publication/276424164_Berge-Fulkerson_Conjecture_on_Certain_Snarks"},{"title":"Non-conflicting no-where zero \$Z_2\\times Z_2\$ flows in cubic graphs","url":"https://arxiv.org/pdf/2410.04389"},{"title":"Berge-Fulkerson Conjecture","url":"https://www.sfu.ca/~mohar/Problems/P9BergeFulkersonConjecture.html"},{"title":"Rotation snark, Berge-Fulkerson conjecture and Catlin’s 4-flow reduction - ScienceDirect","url":"https://www.sciencedirect.com/science/article/abs/pii/S0096300321005300"},{"title":"On two consequences of Berge–Fulkerson conjecture: AKCE International Journal of Graphs and Combinatorics: Vol 17, No 1","url":"https://www.tandfonline.com/doi/abs/10.1016/j.akcej.2019.03.018"},{"title":"License: CC BY 4.0","url":"https://arxiv.org/html/2501.05348v3"},{"title":"par.nsf.gov","url":"https://par.nsf.gov/servlets/purl/10506013"}]

Based on the search results, I did not find any evidence that the Berge-Fulkerson conjecture has been refuted or definitively solved in 2026.

What the search results show is that the Berge–Fulkerson conjecture proposed in 1971 states that every bridgeless cubic graph contains a family of six perfect matchings such that each edge is contained in exactly two of them. The conjecture is trivial for 3-edge-colorable cubic graphs, and remains widely open for snarks.

Recent research continues to work on verifying the conjecture for specific families of graphs. For example, an oriented version of the conjecture has been proven for the family of Isaacs flower snarks, and the Berge-Fulkerson conjecture has been verified for a family of cyclically 5-edge-connected rotation snarks.

The most recent materials in the search results are from early 2026, and they continue to discuss the conjecture as an open problem rather than as solved or refuted.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.

# Summary of Snark Generation Research

**Vertices Generated:** The researchers generated all non-isomorphic snarks up to "n≤ 36 vertices," exceeding the previously published maximum of 28 vertices.

**Conjectures Tested:**
- **Cycle Double Cover Conjecture:** "Some of the strongest versions of the cycle double cover conjecture hold for all snarks of these orders"
- **Petersen Coloring:** "Jaeger's Petersen colouring conjecture" was confirmed across all generated snarks
- **Fulkerson's Conjecture:** The results indicate "Fulkerson's conjecture has no small counterexamples," suggesting these snarks don't contradict the conjecture

**Negative Findings:** Despite positive results above, the researchers "find counterexamples to eight previously published conjectures concerning cycle coverings and the general cycle structure of cubic graphs."

**Performance:** Their new algorithm was "14 times faster than previous programs for generating snarks, and 29 times faster for generating weak snarks."

# The Berge-Fulkerson Conjecture: Status and Results

## Origin and Status
The conjecture was posed by Claude Berge and Delbert R. Fulkerson, first appearing in Fulkerson's 1971 work. It carries an "Outstanding" importance rating (✭✭✭✭), indicating it remains unsolved.

## Core Conjecture
The main claim states: "there exist 6 perfect matchings of a bridgeless cubic graph such that every edge is contained in exactly two of these matchings."

## Partial Results and Weaker Versions

**Trivial Case:** The conjecture holds for 3-edge-colorable graphs, which can be decomposed into three perfect matchings (taking each twice yields the required six).

**Known Bounds:** The best known upper bound allows covering any bridgeless cubic graph's edges with approximately O(log n) perfect matchings, derived from Edmonds' matching polytope theorem.

**Recent Breakthrough:** In 2010, G. Mazzuocolo proved the conjecture is equivalent to a simpler statement: "the edge-set can be covered by 5 perfect matchings."

## Related Open Questions
Several weaker conjectures remain unresolved, including whether edges can always be covered by some fixed number k of perfect matchings, and whether k perfect matchings with empty intersection always exist.

# Cycle Permutation Graphs Research Summary

**Authors & Year:** Jan Goedgebeur, Jarne Renders, and Steven Van Overberghe; submitted November 2024.

**Generation Results:** The researchers generated "all cycle permutation graphs up to order 34 and all permutation snarks up to order 46," substantially extending previous computational work.

**Conjectures Addressed:** The abstract mentions they provided "more evidence in support of a conjecture of Goddyn" and produced "many more counterexamples to conjectures by Jackson and Zhang."

**Berge-Fulkerson & Perfect Matching:** The provided content does not mention verification of Berge-Fulkerson conjecture or perfect matching covers—these topics are not addressed in the abstract or metadata shown.

Web search results for query: ""Berge-Fulkerson" OR "Fulkerson conjecture" ILP SAT solver verification perfect matching cover computational"

Links: [{"title":"A note on Berge–Fulkerson coloring - ScienceDirect","url":"https://www.sciencedirect.com/science/article/pii/S0012365X08007176"},{"title":"Consequences of the Berge-Fulkerson Conjecture (1994, 2007)","url":"https://dwest.web.illinois.edu/regs/bergefulk.html"},{"title":"Berge-Fulkerson Conjecture","url":"https://www.sfu.ca/~mohar/Problems/P9BergeFulkersonConjecture.html"},{"title":"The Berge-Fulkerson conjecture | Open Problem Garden","url":"http://www.openproblemgarden.org/op/the_berge_fulkerson_conjecture"},{"title":"Berge-Fulkerson coloring for infinite families of snarks","url":"https://arxiv.org/pdf/1708.07122"},{"title":"Full article: On two consequences of Berge–Fulkerson conjecture","url":"https://www.tandfonline.com/doi/full/10.1016/j.akcej.2019.03.018"},{"title":"On two consequences of Berge–Fulkerson conjecture: AKCE International Journal of Graphs and Combinatorics: Vol 17, No 1","url":"https://www.tandfonline.com/doi/abs/10.1016/j.akcej.2019.03.018"},{"title":"s41980 018 0019 8","url":"https://link.springer.com/article/10.1007/s41980-018-0019-8"},{"title":"On Fulkerson conjecture","url":"https://ar5iv.arxiv.org/html/0906.1086"}]

I've completed the web search for your query. Here are the results:

## Search Results Summary

The search returned academic sources about the Berge-Fulkerson conjecture and related topics in graph theory. Here's what the results show:

**The Berge-Fulkerson Conjecture:**
The Berge–Fulkerson Conjecture states that every cubic bridgeless graph has six perfect matchings such that every edge of the graph is contained in exactly two of these perfect matchings.

**Verification and Research:**
The lemma is applied in the verification of Berge–Fulkerson Conjecture for some families of non-3-edge-colorable cubic graphs (such as Goldberg snarks, flower snarks). Additionally, Berge-Fulkerson conjecture is still open for many bridgeless cubic graphs even for some simple snarks.

**Related Conjectures:**
A consequence of the Fulkerson conjecture would be that every bridgeless cubic graph has 3 perfect matchings with empty intersection (this problem is known as the Fan Raspaud Conjecture).

However, the search results primarily focus on pure graph-theoretic approaches rather than computational methods like ILP (Integer Linear Programming) or SAT solvers. The sources discuss theoretical verification approaches and structural properties but don't appear to extensively cover computational verification methods in the returned snippets.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.

I have enough verified information from live searches. Compiling the structured report.

Structured output provided successfully

You are one scout in a parallel survey for a project called breakthroughmaxxing. Context: in July 2026 the Dinitz-Garg-Goemans conjecture on single-source unsplittable flow (open ~30 years) was reportedly refuted via an explicit small counterexample found with GPT 5.6 Pro, and a counterexample to the Jacobian conjecture was reportedly tweeted by Levent Alpoge (found with Claude Fable during the World Cup final). The common DNA: a classic conjecture whose refutation is a FINITE certificate that a short computer program can verify. We are hunting for the next such target.

TODAY IS 2026-07-23. Your training data may be stale, so you MUST run live web searches before reporting status. Local metasearch (no API key, no rate limit, headless box):
  curl -s "http://127.0.0.1:8899/search?q=YOUR+QUERY&format=json" | jq -r '.results[:8][] | (.title + " | " + .url + " | " + (.content // ""))'
Run at least 3 distinct queries (e.g. proved / counterexample / arxiv 2025 2026 variants). You may additionally load WebSearch and WebFetch via ToolSearch("select:WebSearch,WebFetch") and read Wikipedia/arXiv/openproblemgarden pages. NEVER fabricate a resolution, bound, or citation: if the web is silent, write "could not confirm via live search". Keep each text field under ~200 words except attack_plan (up to ~350). Your final output goes through the structured-output schema only.

Your assigned conjecture: Vizing's conjecture on domination of Cartesian products (posed ~). gamma(G box H) >= gamma(G)*gamma(H) for the domination number of the Cartesian product. Check which partial cases are proven (chordal, decomposable graphs, small domination number, Clark-Suen 1/2 bound and improvements) and what a counterexample pair must avoid.

Fill every schema field for THIS conjecture. slug = "vizing-1968".

- aidocs: Use whenever the user mentions aidocs, an aidocs URL, an aidocs document/folder/comment/share/version, or asks to publish, review, open, or update a long-form artifact in aidocs.
- day0-idea-submission: Use when a Day 0 / DayZero hackathon participant wants to brainstorm, draft, check, or submit their hackathon idea. Triggers on "submit my idea", "help me write my hackathon idea", "day0 idea", "idea submission", "brainstorm hackathon idea", or resubmission after screener feedback.
- graphify: Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the question should be treated as a graphify query first. Turns any input (code, docs, papers, images, videos) into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.
- subagentmaxxing: Spawn and control non-Claude coding-agent subagents (OpenAI Codex CLI and Cursor CLI — grok-4.5, composer-2.5, gpt-5.5) as one-prompt-in/one-answer-out subagents via the `subagent` CLI. Use when you want to offload a task to a Codex or Cursor subagent, get a second opinion from a different model family, run cross-model consensus, or fan one prompt out across several models in parallel. - Also for reaching Cursor-hosted Opus/Sonnet/Gemini, or any time you specifically want a non-Claude model instead of the native Agent tool.
- vpsmaxxing: Set up and manage a personal cloud VPS as a dedicated remote workbench for AI coding agents (Claude Code + OpenAI Codex). Covers provisioning (git/node/pnpm/docker/tmux), installing & authenticating the agents, a self-aware agent environment, Tailscale networking (SSH with no exposed ports), a tmux + cmux cockpit, localhost port tunneling, reverse VPS→laptop file access (including a no-admin path for managed/work laptops), one-time migration of your skills/memory/history/credentials, and automatic two-way sync. Use this when the user wants to run AI agents on a server, offload heavy or parallel agent work off their laptop, "set up a VPS for Claude Code / Codex", spin up a remote agent box, or keep an agent setup synced across machines.
- youtube-transcript: Extract transcripts from YouTube videos. Use when the user asks for a transcript, subtitles, or captions of a YouTube video and provides a YouTube URL (youtube.com/watch?v=, youtu.be/, or similar). Supports output with or without timestamps.
- dataviz: Use this skill whenever you are about to create ANY chart, graph, plot, dashboard, or data visualization, in ANY output medium — an HTML or React artifact, inline SVG, plotting code in any library (matplotlib, plotly, d3, Recharts, …), an image/PNG you will render and upload, or a chart shared into Slack. Read it BEFORE writing the first line of chart code, choosing chart colors, building a stat tile / meter / KPI row, or laying out a dashboard. Produces visualizations that read as one system — elegant, accessible, consistent in light and dark — using a brand-neutral placeholder palette you swap for your own. Teaches a design-system-agnostic method: a form heuristic, a color formula with a runnable validator, mark specs, and interaction rules. A validated default palette is documented in `references/palette.md` — swap that file's values for your brand's. Triggers on: "chart", "graph", "plot", "data viz", "visualization", "dashboard", "analytics", "visualize data", "categorical colors", "sequential / diverging palette", "stat tile", "sparkline", "heatmap", "legend", "axis", "tooltip", "chart colors", "color by series".
- artifact-design: Design guidance and fundamentals for Artifacts.
- artifact-capabilities: Runtime capabilities a published Artifact page can be granted — behavior static HTML cannot provide on its own, such as the page reading live or connected data, keeping state shared across viewers, or updating and republishing itself. Serves this user's live capability roster and the typed call definitions. Load it whenever the user asks for an artifact needing any such runtime behavior.
- update-config: Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
- keybindings-help: Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".
- simplify: Review the changed code for reuse, simplification, efficiency, and altitude cleanups, then apply the fixes. Quality only — it does not hunt for bugs; use /code-review for that.
- fewer-permission-prompts: Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project .claude/settings.json to reduce permission prompts.
- loop: Run a prompt or slash command on a recurring interval (e.g. /loop 5m /foo). Omit the interval to let the model self-pace. - When the user wants to set up a recurring task, poll for status, or run something repeatedly on an interval (e.g. "check the deploy every 5 minutes", "keep running /babysit-prs"). Do NOT invoke for one-off tasks.
- schedule: Create, update, list, or run scheduled cloud agents (routines) that execute on a cron schedule. - When the user wants to schedule a recurring cloud agent, set up automated tasks, create a cron job for Claude Code, or manage their scheduled agents/routines. Also use when the user wants a one-time scheduled run ("run this once at 3pm", "remind me to check X tomorrow").
- claude-api: Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.
TRIGGER — read BEFORE opening the target file; don't skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
- run: Launch and drive this project's app to see a change working. Use when asked to run, start, or screenshot the app, or to confirm a change works in the real app (not just tests). First looks for a project skill that already covers launching the app; otherwise falls back to built-in patterns per project type (CLI, server, TUI, Electron, browser-driven, library).
- init: Initialize a new CLAUDE.md file with codebase documentation
- review: Review a GitHub pull request; for your working diff use /code-review
- security-review: Complete a security review of the pending changes on the current branch

Vizings Conjecture: A Density-Based Re-framing - arXiv.org | https://arxiv.org/pdf/2509.10473v1 | Here γ(·) denotes the domination number and G H is the Cartesian product. The conjecture has withstood more than five decades of study: it is known to hold for various special classes (trees, cographs, interval graphs, among others), yet no general proof or counterexample has been found. Because domination num-bers are notoriously difficult to compute, much of the progress has come from ...
Vizing’s Conjecture: A Density-Based Re-framing - arXiv.org | https://arxiv.org/html/2509.10473v1 | 3 Hybrid Sufficient Conditions and Practical Applications In practical settings regarding Vizing's conjecture, particularly for algorithmic searches or large-scale analysis, it is often advantageous to work with collections of known domination bounds tailored to specific graph families.
Vizing's conjecture - Wikipedia | https://en.wikipedia.org/wiki/Vizing%27s_conjecture | In graph theory, Vizing's conjecture concerns a relation between the domination number and the cartesian product of graphs. This conjecture was first stated by Vadim G. Vizing (1968), and states that, if γ (G) denotes the minimum number of vertices in a dominating set for the graph G, then Gravier & Khelladi (1995) conjectured a similar bound for the domination number of the tensor product of ...
Vizing Conjecture -- from Wolfram MathWorld | https://mathworld.wolfram.com/VizingConjecture.html | Hartnell, B. and Rall, D. F. "Domination in Cartesian Products: Vizing's Conjecture." In Domination in Graphs--Advanced Topics (Ed. T. W. Haynes, S. T. Hedetniemi, and P. J. Slater).
Domination Numbers in Cartesian Products of Graphs | https://www.eduresearchjournal.com/index.php/ijpsrs/article/view/512 | This paper examines domination numbers in Cartesian products of graphs, focusing on theoretical bounds, computational methods, and structural properties. We review key results including Vizing's conjecture, present established theorems regarding products of paths and cycles, and analyze the relationship between domination in factor graphs and ...
Domination Numbers in Cartesian Products of Graphs | https://www.eduresearchjournal.com/index.php/ijpsrs/article/download/512/508/1260 | We review key results including Vizing's conjecture, present established theorems regarding products of paths and cycles, and analyze the relationship between domination in factor graphs and their Cartesian products.
Domination and Vizing’s Conjecture | Springer Nature Link | https://link.springer.com/chapter/10.1007/978-3-031-09496-5_18 | Vizing's Conjecture is considered by many to be the main open problem in the area of domination in graphs. We also present Vizing-like conjectures for the total domination number, the independent domination number, the independence number, the upper domination number, and the upper total domination number in Cartesian products of graphs.
Vizing's Conjecture on Domination | http://dwest.web.illinois.edu/regs/vizingdom.html | Vizing's Conjecture on Domination (1968) Originators: V. Vizing (presented by Stephen Hartke - REGS 2012) Definitions: The domination number \$\gamma (G)\$ of a graph \$G\$ is the minimum size of a set \$S\$ of vertices such that for every vertex of \$G\$ outside \$S\$ has a neighbor in \$S\$. We denote the cartesian product of \$G\$ and \$H\$ by \$G\Box H\$.

Wikipedia | https://www.wikipedia.org/ | Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.
Wikipedia, die freie Enzyklopädie | https://www.wikipedia.de/ | Wir sind der gemeinnnützige Verein hinter der Wikipedia und unterstützen die Ehrenamtlichen, sichern und entwickeln die technische Infrastruktur und setzen uns für den freien Zugang zu Wissen ein.
Wikipedia – Die freie Enzyklopädie | https://de.m.wikipedia.org/wiki/Wikipedia:Hauptseite | Wikipedia ist ein Projekt zum Aufbau einer Enzyklopädie aus freien Inhalten, zu denen du sehr gern beitragen kannst. Seit März 2001 sind 3.135.215 Artikel in deutscher Sprache entstanden. …
Wikipedia | https://www.wikipedia.de/suggest.php | Wikipedia ist eine freie Enzyklopädie, die von Freiwilligen erstellt wird und freien Zugang zu Wissen bietet.
Projekt Wikipedia - Wikimedia Deutschland | https://www.wikimedia.de/projekte/wikipedia/ | Das Projekt Wikipedia ist zweifellos das größte Enzyklopädie-Projekt der Geschichte. Die 2001 gegründete freie Enzyklopädie beinhaltet heute mehr als 60 Millionen Artikel in über 300 Sprachen.
Wikipedia Gacha | https://wikigacha.com/ | Wikipedia Gacha は、Wikipedia の記事をカードとして集めて遊べる無料ブラウザゲームです。Collect Wikipedia articles as trading cards in your browser.
wikipedia.at - Wikipedia, die freie Enzyklopädie | http://www.wikipedia.at/ | Wikimedia Österreich ist Teil der weltweit tätigen Wikimedia-Organisation, die die Wikipedia und ihre Schwesterprojekte betreibt und finanziert. Unterstützen Sie die Wikipedia/Wikimedia mit einer …
Wikipedia | Definition, Encyclopedia, History, & Facts | Britannica | https://www.britannica.com/topic/Wikipedia | 3 days ago · Wikipedia is a free Internet-based encyclopedia, started in 2001, that operates under an open-source management style.

The first query gave good results but the second was polluted. Let me run more targeted queries.

Toronto - Wikipedia | https://en.wikipedia.org/wiki/Toronto | Toronto[c] is the most populous city in Canada and the capital city of the Canadian province of Ontario. It is located on a harbour at …
Welcome to Toronto – City of Toronto | https://www.toronto.ca/explore-enjoy/visitor-toronto/ | Embark on an unforgettable journey in Toronto, Canada’s largest city – a global leader in business, technology, entertainment and …
City of Toronto | https://www.toronto.ca/ | Toronto is Canada's largest city, the fourth largest in North America, and home to a diverse population of more than three million …
16 Best Things to Do in Toronto, Canada - U.S. News Travel | https://travel.usnews.com/Toronto/Things_To_Do/ | Jul 24, 2025 · The best things to do in Toronto (Ontario) include exploring the Distillery District, taking in the views from atop the CN …
Top 15 Things to Do in Toronto, Canada - Toronto Attractions | https://www.tripadvisor.com/Attractions-g155019-Activities-Toronto_Ontario.html | Things to Do in Toronto, Ontario: See Tripadvisor's 678,001 traveler reviews and photos of Toronto tourist attractions. Find what to do …
Toronto Travel Guide 2026: Plan Your Perfect Trip | https://www.torontotourism.org/toronto-travel-guide/ | Apr 23, 2026 · Your complete Toronto travel guide for 2026 — where to stay, what to eat, how to get around, budget tips, itineraries, …
Toronto Attractions: The Complete Landmark Guide (2026) | https://www.torontotourism.org/toronto-attractions/ | Apr 13, 2026 · From the iconic CN Tower and the Royal Ontario Museum to family favourites like the Toronto Zoo and Ripley’s …
THE 30 BEST Things to Do in Toronto, Canada (2026) | https://www.tripadvisor.in/Attractions-g155019-Activities-zfr7917678-Toronto_Ontario.html | May 2, 2026 · The Toronto Islands are such a unique aspect of the city with the ferry ride offering the best skyline photo op of …

新幹線に安く乗る12の予約方法まとめ｜格安で片道・往復 ... | https://otoku-travel.jp/shinkansen-discount-method | Mar 22, 2026 · 「新幹線のきっぷは駅で買うもの」という認識の方は多いと思いますが、それよりもお得に買う方法はたくさんあります。 本記事では、新幹線の片道・往復チケットを 10%〜30%OFF …
新幹線に安く乗る方法10選！早割・パックから裏ワザ格安切符 ... | https://shinkansenlife.com/shinkansen-cheap-tickets/ | Jul 5, 2026 · 新幹線を安く乗る方法を徹底解説！ JR公式スマートEXやえきねっとの早期割引（早特）、往復割引の利用方法から、宿泊セットで最安値になる新幹線パック、直前でも使える株主優待 …
【2026年最新】新幹線を安く乗る全15種の方法 割引制度を徹底 ... | https://shinkansen.recommend-guide.com/shinkansen-waribiki-guide/ | Feb 22, 2026 · 新幹線を安く乗る全15種の方法 - あなたに最適な割引を診断 ※本記事にはアフィリエイト広告が含まれます。 新幹線にはEX予約・学割・往復割引・新幹線パックなど15種類以上の割引 …
新幹線eチケット（トクだ値）・特急トクだ値（えきねっと限定 ... | https://www.eki-net.com/top/tokudane/ | えきねっと限定のおトクな割引きっぷ「新幹線eチケット（トクだ値）・特急トクだ値」。 JR東日本（北海道）の新幹線、JR東日本の特急列車、JR北海道特急列車に設定中。
【2026年最新】新幹線チケットを安く買う方法｜状況別の選び方 | https://www.pricey.jp/web/articles/4983 | May 26, 2026 · 新幹線チケットを安く買う方法を区間・予約タイミング・人数別に整理。 えきねっとトクだ値やEX早特などの早割、ぷらっとこだま、ホテルパック、当日の裏ワザまで網羅。 廃止され …
新幹線チケットを安く買う方法9選！往復割引・早割・自由席 ... | https://www.rere.jp/359604/ | Jan 27, 2026 · 新幹線に少しでも安く乗れたら、それに越したことはありません。 そこで今回は、 新幹線に安く乗る方法 について解説します。 新幹線のチケットを格安料金で買えるキャンペーンやホ …
新幹線を格安で乗る方法8選｜知らないと損する割引テクニック ... | https://mobilitynexus.com/column/9061 | Mar 2, 2026 · 新幹線を最大50%以上お得に乗る方法を徹底解説！ 早割・ネット予約・回数券・ジパング倶楽部など、知らないと損する割引テクニックを比較表付きでわかりやすくまとめました。
【2026年最新】新幹線に安く乗る方法8選！知らないと損する ... | https://www.warau.jp/style/article/%e6%96%b0%e5%b9%b9%e7%b7%9a%e3%81%ab%e5%ae%89%e3%81%8f%e4%b9%97%e3%82%8b%e6%96%b9%e6%b3%95%e3%81%af%e3%81%82%e3%82%8b%ef%bc%9f-%e6%89%8b%e6%ae%b5%e5%88%a5%e3%81%ab%e5%be%b9%e5%ba%95%e8%a7%a3%e8%aa%ac/ | Jun 19, 2026 · 物価高が続く中、少しでもお得に旅行をしたいと思っている方が多いのではないでしょうか。 この記事では、新幹線に安く乗る方法について詳しく解説していきます。 利用方法やメ …

Two queries got polluted results. Let me load WebFetch and query arXiv directly, plus retry searches with different phrasing.

Goosebumps - Wikipedia | https://en.wikipedia.org/wiki/Goosebumps | Goosebumps is a series of children's horror novels written by American author R. L. Stine. The protagonists in these stories are …
Goosebumps Wiki | Fandom | https://goosebumps.fandom.com/wiki/Goosebumps_Wiki | Goosebumps: The Vanishing begins with fraternal twins Devin and Cece adjusting to life with their recently divorced dad, Anthony. …
Goosebumps (2015) - IMDb | https://www.imdb.com/title/tt1051904 | Oct 16, 2015 · Goosebumps is arguably predictable and can be hectic at times, yet it has sufficient nostalgia charm and witty humor …
Goose bumps - Wikipedia | https://en.wikipedia.org/wiki/Goose_bumps | Goose bumps are created when tiny muscles at the base of each hair, known as arrector pili muscles, contract and pull the hair …
Travis Scott - goosebumps (Official Video) ft. Kendrick Lamar | https://www.youtube.com/watch?v=Dst9gZkq1a8 | Apr 14, 2017 · Travis Scott - goosebumps (Official Video) ft. Kendrick Lamar Travis Scott 20.7M subscribers 10M
Goosebumps (Full Episodes) - YouTube | https://www.youtube.com/playlist?list=PLiZCl6XIGf-hu6EyUuuSBLmEDkomr4x77 | Say Cheese and Die... Again | Full Episode | Goosebumps.
Goosebumps (TV Series 2023–2025) - IMDb | https://www.imdb.com/title/tt17720272 | "Goosebumps" is a horror series telling the story of a group of five high school students who unleash supernatural forces upon their …
All 6 'Goosebumps' Movies & Series in Order - Fiction Horizon | https://fictionhorizon.com/all-goosebumps-movies-series-in-order/ | 3 days ago · And with the release of the 2023 ‘Goosebumps’ series, it’s right that we look at all of the different ‘Goosebumps’ movies …

The local metasearch is flaky. Let me use WebSearch and WebFetch directly.

Web search results for query: "Vizing's conjecture domination Cartesian product 2025 2026 progress counterexample"

Links: [{"title":"A note on Vizing's conjecture","url":"https://arxiv.org/pdf/2212.09571"},{"title":"Domination in graphs: Vizing's conjecture","url":"https://open.uct.ac.za/items/5cde3723-1c47-4ba6-a2ae-13a20276c012"},{"title":"Some results on Vizing’s conjecture and related problems - ScienceDirect","url":"https://www.sciencedirect.com/science/article/pii/S0166218X12002466"},{"title":"Vizing's Conjecture in Graph Domination","url":"https://ijrtspublications.org/fileserve.php?FID=663"},{"title":"Domination and Vizing’s Conjecture | Springer Nature Link","url":"https://link.springer.com/content/pdf/10.1007/978-3-031-09496-5_18.pdf?pdf=inline+link"},{"title":"VIZING’S CONJECTURE: A SURVEY AND RECENT RESULTS","url":"https://scispace.com/pdf/vizing-s-conjecture-a-survey-and-recent-results-e84sw6daqo.pdf"},{"title":"(PDF) Vizing's Conjecture: A survey and recent results","url":"https://www.researchgate.net/publication/227781206_Vizing's_Conjecture_A_survey_and_recent_results"},{"title":"An improved constant for Vizing’s conjecture","url":"https://arxiv.org/html/2607.01109"},{"title":"[2607.01109] An improved constant for Vizing's conjecture","url":"https://arxiv.org/abs/2607.01109"},{"title":"Vizing Conjecture -- from Wolfram MathWorld","url":"https://mathworld.wolfram.com/VizingConjecture.html"}]

Based on the search results, here's what I found regarding recent progress on Vizing's conjecture:

## Current Status

Vizing's conjecture remains one of the biggest open problems in domination in graph theory today. The conjecture states that the domination number of the Cartesian product of two graphs is at least as large as the product of the domination numbers of the two factor graphs.

## Recent Progress (2025-2026)

There has been recent progress on improving bounds for the conjecture. A 2026 paper proves the Vizing-type inequality γ(G□H) ≥ .5809 γ(G)γ(H). This represents an improved constant for lower bounds on the domination number of Cartesian products.

Additionally, R. Steiner published work titled "A constant-factor step toward Vizing's conjecture" on arXiv in June 2026.

## No Counterexample

Based on the available search results, there is no counterexample to Vizing's conjecture. While researchers have worked on characterizing what a minimal counterexample might look like (if one existed), several new properties of a minimal counterexample to the conjecture have been obtained, but the conjecture itself remains unresolved and undisproven.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.

# Vizing's Conjecture: Current Status

**Year Posed:** 1968 by Vadim G. Vizing

**The Conjecture:** For graphs G and H, γ(G □ H) ≥ γ(G)γ(H), where γ denotes the domination number.

## Known Partial Results

The Wikipedia article confirms the conjecture holds for:
- **Graphs with domination number one** in either factor
- **Cycles** (proven by Jacobson & Kinch, 1986; El-Zahar & Pareek, 1991)
- **Graphs with domination number two** (Barcalkin & German, 1979)

## Lower Bounds

"Clark & Suen (2000) proved that the domination number of the product is at least half as large as the conjectured bound, for all G and H."

The article does not mention later improvements like Suen-Tarr or Zerbib results, nor discusses chordal or decomposable graph classes.

## Unresolved Status

The conjecture remains open. The article notes that "Since Vizing proposed his conjecture, many mathematicians have worked on it" but provides no evidence of recent resolution or computational verification bounds.

## Upper Bound

Vizing observed: γ(G □ H) ≤ min{γ(G)|V(H)|, γ(H)|V(G)|}

**Notable:** A related conjecture about tensor products was disproven by Klavžar & Zmazek (1996).