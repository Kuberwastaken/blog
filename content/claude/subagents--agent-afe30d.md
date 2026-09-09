---
title: "subagents · agent-afe30d"
---

Read-only research task. Study claurst (Rust) model/provider system so I can write a port plan. Base dir: /Users/kuber.mehta/Personal-Projects/claurst/src-rust

Read these files IN FULL and report their structures precisely (types, key functions with signatures, and what each does):
1. /Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/model_registry.rs
2. /Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/effort_support.rs
3. /Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/registry.rs
4. /Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/provider.rs
5. /Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/provider_types.rs

Also survey (read enough to describe roles/exports, not necessarily in full):
6. /Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/providers/mod.rs and each provider file (anthropic.rs, openai.rs, google.rs, copilot.rs, openai_compat.rs, openai_compat_providers.rs, azure.rs, bedrock.rs, cohere.rs, minimax.rs, free.rs, codex.rs)
7. /Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/api/src/lib.rs (what's exported)
8. /Users/kuber.mehta/Personal-Projects/claurst/src-rust/crates/tui/src/model_picker.rs (how it lists/filters models, how it shows efforts)

For EACH of the following questions give a concrete answer with file:line references:
A. How does claurst load the models.dev catalog today? Is it fetched at runtime (HTTP), bundled/embedded, or cached to disk? Where is the cache path, TTL, refresh logic? What HTTP client is used?
B. What is claurst's Model metadata struct? List every field (id, name, context/limit, cost, reasoning, modalities, release_date, capabilities, variants, status, etc.). Compare shape.
C. How does claurst compute "supported efforts" for a model (effort_support.rs)? Is it per-model metadata, provider rules, hardcoded lists, release-date gated? Quote the core logic.
D. Does claurst do ANY live/dynamic per-provider model listing (querying an API like /v1/models, /api/tags, copilot /models)? If yes where; if no, say so explicitly.
E. How are providers defined/registered? Is there a provider trait? What does a provider expose (endpoint, auth, model source, protocol)? List the trait methods.
F. How does the model picker get its model list, and how does it surface reasoning/effort levels to the user?
G. What HTTP/async runtime + JSON libs are in use (reqwest? tokio? serde?) — check crates/api/Cargo.toml.

Report concrete details with absolute file paths and line numbers. Do NOT edit anything. Be thorough and precise — this drives an implementation plan.

- graphify: Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the question should be treated as a graphify query first. Turns any input (code, docs, papers, images, videos) into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.
- vpsmaxxing: Set up and manage a personal cloud VPS as a dedicated remote workbench for AI coding agents (Claude Code + OpenAI Codex). Covers provisioning (git/node/pnpm/docker/tmux), installing & authenticating the agents, a self-aware agent environment, Tailscale networking (SSH with no exposed ports), a tmux + cmux cockpit, localhost port tunneling, reverse VPS→laptop file access (including a no-admin path for managed/work laptops), one-time migration of your skills/memory/history/credentials, and automatic two-way sync. Use this when the user wants to run AI agents on a server, offload heavy or parallel agent work off their laptop, "set up a VPS for Claude Code / Codex", spin up a remote agent box, or keep an agent setup synced across machines.
- youtube-transcript: Extract transcripts from YouTube videos. Use when the user asks for a transcript, subtitles, or captions of a YouTube video and provides a YouTube URL (youtube.com/watch?v=, youtu.be/, or similar). Supports output with or without timestamps.
- deep-research: Deep research harness — fan-out web searches, fetch sources, adversarially verify claims, synthesize a cited report. - When the user wants a deep, multi-source, fact-checked research report on any topic. BEFORE invoking, check if the question is specific enough to research directly — if underspecified (e.g., "what car to buy" without budget/use-case/region), ask 2-3 clarifying questions to narrow scope. Then pass the refined question as args, weaving the answers in.
- update-config: Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
- keybindings-help: Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".
- verify: Verify that a code change actually does what it's supposed to by running the app and observing behavior. Use when asked to verify a PR, confirm a fix works, test a change manually, check that a feature works, or validate local changes before pushing.
- code-review: Review the current diff for correctness bugs and reuse/simplification/efficiency cleanups at the given effort level (low/medium: fewer, high-confidence findings; high→max: broader coverage, may include uncertain findings; ultra: deep multi-agent review in the cloud). Pass --comment to post findings as inline PR comments, or --fix to apply the findings to the working tree after the review.
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