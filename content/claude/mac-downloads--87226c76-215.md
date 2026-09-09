---
title: "mac-downloads · 87226c76-215"
---

install claurst for my mac m5 pro please, it says Apple could not verify “claurst” is free of malware that may harm your Mac or compromise your privacy.

install claurst for my mac m5 pro please, it says Apple could not verify “claurst” is free of malware that may harm your Mac or compromise your privacy.

- deep-research: Deep research harness — fan-out web searches, fetch sources, adversarially verify claims, synthesize a cited report. - When the user wants a deep, multi-source, fact-checked research report on any topic. BEFORE invoking, check if the question is specific enough to research directly — if underspecified (e.g., "what car to buy" without budget/use-case/region), ask 2-3 clarifying questions to narrow scope. Then pass the refined question as args, weaving the answers in.
- compass:creating-skills: Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.
- compass:design-environment-setup: Sets up a complete Blade design development environment from scratch. Installs and verifies Blade MCP, Figma MCP, GitHub PAT, Node/pnpm/nvm toolchain (via bd2-env-setup.sh), and clones + installs a design repo. Use when onboarding to a new machine, setting up a fresh design project, or troubleshooting missing dev tooling. Triggers on "setup design env", "design environment setup", "setup my dev environment", "blade figma setup", "new machine setup", or "design env setup".
- compass:designing-skills: Designs optimal Claude architectures by analyzing objectives to recommend skill-only, sub-agent-only, or hybrid patterns. Use when deciding between SKILL.md files and sub-agents, planning Claude workflows, or structuring multi-agent systems in Claude Code. Triggers on "should I use a skill or sub-agent", "design a skill for", "when to use sub-agents", or "architect this Claude workflow".
- compass:docset: Caches external documents from Google Drive, Slack, and DevRev for instant offline search. Auto-caches MCP fetches via PostToolUse hooks. Use when searching previously fetched content, checking cache status, or manually caching a document.
- compass:drafting-concept-note: Create Razorpay product concept notes following the official 8-section template (Working Backwards approach). Use when PM is doing (1) New feature ideation, (2) Preparing leadership pitches, (3) Writing RFC/PRD precursors. Accepts inputs from Slack threads, meeting notes, Google Docs, data points, Voice of Customer, or blank slate brainstorm. Outputs 6-10 page structured concept notes ready for review.
- compass:drafting-product-strategy: Drafts FY27 integrated strategy documents following Razorpay's strategy template. Use when asked to write, draft, or create an annual strategy document, FY27 strategy, integrated strategy, or product strategy. Handles both Group-level (4 L0 OKRs, POD structure) and POD-level (3 L0 OKRs, execution plan) strategies. Produces leadership-ready 5-6 page documents.
- compass:drafting-stakeholder-updates: Draft stakeholder updates tailored to audience — executives, engineering, customers, or cross-functional partners. Use when writing weekly status updates, monthly reports, launch announcements, risk communications, or decision documentation.
- compass:frontend-environment-setup
- compass:initializing-pm-compass
- compass:learning-cc-fundamentals
- compass:managing-programs
- compass:managing-tasks
- compass:planning-campaigns
- compass:projecting-financials
- compass:razorpay-api-review
- compass:reviewing-strategy
- compass:synthesizing-user-research
- compass:testing-skills
- compass:troubleshooting-compass
- anthropic-skills:consolidate-memory
- anthropic-skills:creating-skills
- anthropic-skills:designing-skills
- anthropic-skills:docx
- anthropic-skills:drafting-product-strategy
- anthropic-skills:initializing-pm-compass
- anthropic-skills:manager-review-auditor
- anthropic-skills:managing-programs
- anthropic-skills:pdf
- anthropic-skills:pptx
- anthropic-skills:projecting-financials
- anthropic-skills:razorpay-api-review
- anthropic-skills:reviewing-strategy
- anthropic-skills:schedule
- anthropic-skills:self-review-auditor
- anthropic-skills:setup-cowork
- anthropic-skills:skill-creator
- anthropic-skills:synthesizing-user-research
- anthropic-skills:testing-skills
- anthropic-skills:xlsx
- update-config: Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
- keybindings-help: Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".
- verify: Verify that a code change actually does what it's supposed to by running the app and observing behavior. Use when asked to verify a PR, confirm a fix works, test a change manually, check that a feature works, or validate local changes before pushing.
- code-review: Review the current diff for correctness bugs and reuse/simplification/efficiency cleanups at the given effort level (low/medium: fewer, high-confidence findings; high→max: broader coverage, may include uncertain findings). Pass --comment to post findings as inline PR comments, or --fix to apply the findings to the working tree after the review.
- simplify: Review the changed code for reuse, simplification, efficiency, and altitude cleanups, then apply the fixes. Quality only — it does not hunt for bugs; use /code-review for that.
- fewer-permission-prompts: Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project .claude/settings.json to reduce permission prompts.
- loop: Run a prompt or slash command on a recurring interval (e.g. /loop 5m /foo). Omit the interval to let the model self-pace. - When the user wants to set up a recurring task, poll for status, or run something repeatedly on an interval (e.g. "check the deploy every 5 minutes", "keep running /babysit-prs"). Do NOT invoke for one-off tasks.
- claude-api: Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.
TRIGGER — read BEFORE opening the target file; don't skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
- run: Launch and drive this project's app to see a change working. Use when asked to run, start, or screenshot the app, or to confirm a change works in the real app (not just tests). First looks for a project skill that already covers launching the app; otherwise falls back to built-in patterns per project type (CLI, server, TUI, Electron, browser-driven, library).
- init: Initialize a new CLAUDE.md file with codebase documentation
- review
- security-review