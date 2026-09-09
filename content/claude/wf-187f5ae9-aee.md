---
title: "wf_187f5ae9 aee"
---

_5 transcript files aggregated._


You are fixing one GitHub issue in claurst, a Rust TUI coding agent (github.com/Kuberwastaken/claurst).
You are in an ISOLATED GIT WORKTREE of /root/dev/scratch/claurst (running as root on a Raspberry Pi 5, aarch64 Linux). The Cargo workspace is in src-rust/ inside the worktree.

Environment setup (do this first):
- export PATH="\$HOME/.cargo/bin:\$PATH"
- export CARGO_TARGET_DIR=/root/dev/scratch/claurst/src-rust/target   # SHARED build cache across agents; cargo may block on its lock while another agent builds — that is normal, wait it out, never kill a build.
- This is a 4-core Pi: full 'cargo check --workspace' takes ~3 min. Prefer targeted 'cargo check -p <crate>' and 'cargo test -p <crate>'.
- Read AGENTS.md at the repo root if present, but with this override: do NOT run 'cargo fmt --all' and do not reformat code you did not change (the repo is not fmt-clean; match surrounding style by hand).

Git and PR rules (strict):
1. git fetch origin && git checkout -b <your-branch> origin/main   (do this before editing anything)
2. Commit as you go: SMALL, sequential, logically-scoped commits with conventional-commit messages (feat/fix/docs/test/chore scopes like the existing history). Never one big squashed commit at the end.
3. ABSOLUTELY NO attribution trailers: no 'Co-Authored-By', no 'Generated with Claude Code', no mention of Claude/Anthropic/AI in commit messages or the PR body. The repo git identity is already configured — do not change it.
4. Verify before pushing: the workspace must compile ('cargo check --workspace') and relevant tests must pass. Report honestly what you could and could not verify.
5. Push with 'git push -u origin <your-branch>', then create the PR: gh pr create --base main --title '<conventional title>' --body '<problem / approach / verification>' — include 'Closes #<issue>' in the body. Do NOT merge the PR.
6. Never touch anything under /home/kuber.

Your final structured output must report exactly what you did (empty pr_url + explanation in notes if you failed).

Issue #311 — Google Gemini 3.1 Pro Preview fails on any tool call with HTTP 400: "Function call is missing a thought_signature in functionCall parts. This is required for tools to work correctly" (reported with the Read tool; plain chat works).
Root cause direction: newer Gemini "thinking" models attach a thoughtSignature field to response parts (including functionCall parts). When the client sends conversation history back for the next turn, every functionCall part it echoes must include the exact thoughtSignature it originally received; omitting it yields this 400.
Expectation: tool calls work on Gemini 3.1 Pro Preview.

Investigate first: the Google/Gemini provider in src-rust/crates/api (grep for gemini / functionCall / thought in crates/api/src). Find (1) where streaming and non-streaming Gemini responses are parsed into claurst's internal message/tool-use types — capture thoughtSignature from parts there (note: REST JSON uses camelCase thoughtSignature); (2) where claurst serializes conversation history back into Gemini 'contents' — attach the stored signature onto the corresponding functionCall part (and thought parts if applicable). You will likely need to thread an optional field through the internal tool-use/content-block type — keep it optional and provider-agnostic (e.g. a passthrough metadata field) so other providers are unaffected, and make sure it survives session save/load if messages are persisted. Follow Google's documented rules for signature handling (current turn's function calls must carry their signatures; do not fabricate signatures for older history — if history predates the capture, omitting signatures on PAST turns is acceptable per Google docs, the requirement is strictest for the current/most-recent turn). Add unit tests: response part with thoughtSignature is captured; request serialization round-trips it onto the functionCall part; absent signature keeps old behavior. You have no Gemini API key here — say so honestly in the PR verification section and rely on the round-trip tests.

---
You are running in an isolated git worktree at /root/dev/scratch/claurst/.claude/worktrees/wf_187f5ae9-aee-3 (a separate working copy of the repo). Changes you make here do NOT affect the main working directory (/root/dev/scratch/claurst/src-rust) or other agents. Work normally — the worktree will be cleaned up automatically if you made no changes, or preserved for review if you did.

- deep-research: Deep research harness — fan-out web searches, fetch sources, adversarially verify claims, synthesize a cited report. - When the user wants a deep, multi-source, fact-checked research report on any topic. BEFORE invoking, check if the question is specific enough to research directly — if underspecified (e.g., "what car to buy" without budget/use-case/region), ask 2-3 clarifying questions to narrow scope. Then pass the refined question as args, weaving the answers in.
- dataviz: Use this skill whenever you are about to create ANY chart, graph, plot, dashboard, or data visualization, in ANY output medium — an HTML or React artifact, inline SVG, plotting code in any library (matplotlib, plotly, d3, Recharts, …), an image/PNG you will render and upload, or a chart shared into Slack. Read it BEFORE writing the first line of chart code, choosing chart colors, building a stat tile / meter / KPI row, or laying out a dashboard. Produces visualizations that read as one system — elegant, accessible, consistent in light and dark — using a brand-neutral placeholder palette you swap for your own. Teaches a design-system-agnostic method: a form heuristic, a color formula with a runnable validator, mark specs, and interaction rules. A validated default palette is documented in `references/palette.md` — swap that file's values for your brand's. Triggers on: "chart", "graph", "plot", "data viz", "visualization", "dashboard", "analytics", "visualize data", "categorical colors", "sequential / diverging palette", "stat tile", "sparkline", "heatmap", "legend", "axis", "tooltip", "chart colors", "color by series".
- artifact-design: Design guidance and fundamentals for Artifacts.
- artifact-capabilities: Runtime capabilities a published Artifact can declare — calling the user's claude.ai connectors (MCP) from the page, and future abilities. Load this BEFORE passing `capabilities` to the Artifact tool or writing any `window.claude.mcp` code.
- update-config: Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
- keybindings-help: Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".
- verify: Verify that a code change actually does what it's supposed to by exercising it end-to-end and observing behavior — drive the affected flow, not just tests or typecheck. Run before committing nontrivial changes; bootstraps this repo's project verify skill if none exists yet. Don't invoke it on a diff that only touches tests, docs, or other code with no runtime surface to drive (a change to product source always has one) — there's nothing to observe.
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

I'll start by setting up the environment and exploring the repository structure.

On branch worktree-wf_187f5ae9-aee-3
nothing to commit, working tree clean
---BRANCH---
worktree-wf_187f5ae9-aee-3
---REMOTE---
origin	https://github.com/kuberwastaken/claurst (fetch)
origin	https://github.com/kuberwastaken/claurst (push)

total 176
drwxr-xr-x 12 root root  4096 Jul 16 12:45 .
drwxr-xr-x  5 root root  4096 Jul 16 12:45 ..
drwxr-xr-x  2 root root  4096 Jul 16 12:45 .devcontainer
-rw-r--r--  1 root root    67 Jul 16 12:45 .git
drwxr-xr-x  3 root root  4096 Jul 16 12:45 .github
-rw-r--r--  1 root root   170 Jul 16 12:45 .gitignore
drwxr-xr-x  2 root root  4096 Jul 16 12:45 .vscode
-rw-r--r--  1 root root 10063 Jul 16 12:45 AGENTS.md
-rw-r--r--  1 root root    20 Jul 16 12:45 CNAME
-rw-r--r--  1 root root 35821 Jul 16 12:45 LICENSE.md
-rw-r--r--  1 root root 10530 Jul 16 12:45 README.md
drwxr-xr-x  2 root root  4096 Jul 16 12:45 docs
-rw-r--r--  1 root root 26123 Jul 16 12:45 index.html
-rw-r--r--  1 root root 10986 Jul 16 12:45 install.ps1
-rw-r--r--  1 root root 12965 Jul 16 12:45 install.sh
drwxr-xr-x  3 root root  4096 Jul 16 12:45 npm
drwxr-xr-x  2 root root  4096 Jul 16 12:45 public
drwxr-xr-x  3 root root  4096 Jul 16 12:45 scripts
drwxr-xr-x  2 root root  4096 Jul 16 12:45 session
drwxr-xr-x  2 root root  4096 Jul 16 12:45 spec
drwxr-xr-x  4 root root  4096 Jul 16 12:45 src-rust
---AGENTS---
# Development Rules

Agent-facing rules for working on Claurst. Mirrors and extends `src-rust/.claude/CLAUDE.md`; when the two disagree, the rule closer to the code wins.

## Conversational Style

- Keep answers short and concise
- No emojis in commits, issues, PR comments, or code
- No fluff or cheerful filler text
- Technical prose only, be kind but direct (e.g., "Thanks @user" not "Thanks so much @user!")
- When the user asks a question, answer it first before making edits or running implementation commands.

## Code Quality

- Read files in full before making wide-ranging changes, before editing files you have not already fully inspected, and when the user asks you to investigate or audit something. Do not rely only on search snippets for broad changes.
- No `.unwrap()` / `.expect()` on fallible operations in production paths — propagate via `Result` or pattern-match. `unwrap` is acceptable in tests and in cases where the invariant is statically obvious and commented.
- Avoid speculative `.clone()` — borrow first, clone only when ownership is actually needed. Same applies to `.to_string()` on `&str`.
- No `unsafe` blocks without a `// SAFETY:` comment explaining the invariant.
- Single-line helper functions with a single call site are forbidden; inline them instead.
- Don't guess external API shapes. Read the crate source under `~/.cargo/registry/` or check `cargo doc --open`. For Anthropic / OpenAI / Google wire formats, the `crates/api/src/providers/<provider>.rs` files are the authoritative reference inside this repo.
- **NEVER use type erasure to silence the compiler** — no `Box<dyn Any>`, no `serde_json::Value` shoved through a typed boundary just because the right type is annoying to derive. If a type is hard to express, ask the user.
- NEVER remove or downgrade code to fix compiler errors from outdated dependencies; bump the dependency in `Cargo.toml` or `src-rust/Cargo.toml` workspace deps instead.
- Always ask before removing functionality or code that appears to be intentional.
- Do not preserve backward compatibility unless the user explicitly asks for it.
- Never hardcode keybinding checks inline (e.g. `key == KeyCode::Char('s') && mods.ctrl()`). All keybindings must flow through the configurable keybinding system in `crates/core/src/keybindings.rs` — add a default there.
- NEVER modify generated files directly. Generated artefacts in this repo:
  - `src-rust/Cargo.lock` — regenerated by cargo; for version bumps use [`scripts/bump-version.py`](scripts/bump-version.py).
  - `npm/package.json` `version` field — also stamped by `bump-version.py`.

## Commands

Run from `src-rust/` unless noted.

- After Rust changes (not docs): `cargo check --workspace` — fix every error and warning before committing.
- Clippy: `cargo clippy --workspace --all-targets -- -D warnings`. Fix lints; do not `#[allow(...)]` without justification.
- Format: `cargo fmt --all`. Run before committing.
- Tests: `cargo test --workspace` for everything, `cargo test --package claurst-<crate>` for a single crate, `cargo test --package claurst-<crate> -- <pattern>` for a specific test.
- Avoid running `cargo build --release` or `cargo run --release` unless you specifically need optimised output — debug builds and `cargo check` are 10× faster.
- If you create or modify a test, run it and iterate until it passes.
- For TUI changes: validate by hand with `cargo run -- "test prompt"` (interactive) or `cargo run -- --print "test"` (headless). The `--print` mode is faster for verifying non-TUI logic.
- Don't run blocking interactive commands you can't exit — the agent will hang. If you must, capture output with `--print` mode or pipe into `head`.

### Testing the TUI in a controlled terminal

The ratatui frontend is sensitive to terminal size and key encoding. For repeatable manual tests use tmux:

```bash
# Build a debug binary once
cargo build

# 80×24 session
tmux new-session -d -s claurst-test -x 80 -y 24
tmux send-keys -t claurst-test "./target/debug/claurst" Enter

# Give it time to redraw, then capture
sleep 2 && tmux capture-pane -t claurst-test -p

# Drive input
tmux send-keys -t claurst-test "your prompt here" Enter
tmux send-keys -t claurst-test Escape
tmux send-keys -t claurst-test C-o   # ctrl+o

# Cleanup
tmux kill-session -t claurst-test
```

On Windows hosts, prefer `cargo run -- --print "..."` against the headless path. The Windows console has known quirks with the kitty keyboard protocol — see `crates/tui` for the push/pop workaround.

## Issues & PR Comments

When posting issue/PR comments:

- Write the full comment to a temp file and use `gh issue comment --body-file` or `gh pr comment --body-file`.
- Never pass multi-line markdown directly via `--body` in shell commands.
- Preview the exact comment text before posting.
- Post exactly one final comment unless the user explicitly asks for multiple comments.
- If a comment is malformed, delete it immediately, then post one corrected comment.
- Keep comments concise, technical, and in the user's tone.

When creating issues, add labels that map to the relevant crate(s) — for example `crate:tui`, `crate:api`, `crate:tools`, `crate:mcp`, `crate:acp`. If an issue spans multiple crates, add all relevant labels.

When closing issues via commit, include `fixes #<number>` or `closes #<number>` in the commit message — GitHub closes the issue automatically on merge to main.

### 1. Provider identifier (`crates/core/src/provider_id.rs`)

Add a well-known constant on `ProviderId`, e.g. `pub const FOO: &'static str = "foo";`. Use the canonical name the provider publishes for its API.

### 2. Provider implementation (`crates/api/src/providers/`)

- OpenAI-compatible: add an entry to `openai_compat_providers.rs`. This is one line + an optional base-URL helper.
- Custom wire format: create `crates/api/src/providers/<name>.rs` exposing a struct that implements `LlmProvider` (see `provider.rs`). Mirror the structure of `anthropic.rs` or `google.rs` — request shaping, response parsing, streaming SSE handling, tool conversion.
- Add `pub mod <name>; pub use <name>::<Name>Provider;` to `providers/mod.rs`.

### 3. Register the provider (`crates/api/src/registry.rs`)

Import the new provider and add it to the registry construction. The registry hands back `Arc<dyn LlmProvider>` by id.

### 4. Model registry (`crates/api/src/model_registry.rs`)

Add the canonical model IDs and capability metadata (context window, supports thinking, supports vision, etc.).

Let me set up my branch and explore the Google provider structure.

Switched to a new branch 'fix/gemini-thought-signature'
branch 'fix/gemini-thought-signature' set up to track 'origin/main'.
---NOW ON---
fix/gemini-thought-signature

=== crates ===
acp
api
bridge
buddy
cli
commands
core
mcp
plugins
query
tools
tui
=== api providers ===
anthropic.rs
azure.rs
bedrock.rs
codex.rs
cohere.rs
copilot.rs
free.rs
google.rs
message_normalization.rs
minimax.rs
mod.rs
openai.rs
openai_compat.rs
openai_compat_providers.rs
request_options.rs
=== api src ===
auth.rs
bun_tls.rs
codex_adapter.rs
effort_support.rs
error_handling.rs
lib.rs
model_registry.rs
protocol
provider.rs
provider_error.rs
provider_types.rs
providers
registry.rs
stream_parser.rs
transform.rs
transformers
variants.rs

=== google.rs lines ===
1068 crates/api/src/providers/google.rs
=== grep thought (all crates/api) ===
crates/api/src/effort_support.rs:80:/// Whether `provider`/`model` is a reasoning/thinking model.
crates/api/src/effort_support.rs:178:    // Anthropic extended-thinking families.
crates/api/src/effort_support.rs:179:    let anthropic_thinking = m.starts_with("claude-3-7")
crates/api/src/effort_support.rs:188:    // Gemini thinking models (2.5 and 3.x).
crates/api/src/effort_support.rs:189:    let gemini_thinking =
crates/api/src/effort_support.rs:191:    anthropic_thinking || openai_reasoning || gemini_thinking
crates/api/src/variants.rs:12://! each tier to its own thinking-budget / reasoning-effort in
crates/api/src/variants.rs:15://! The param *values* (thinking budgets, `reasoningConfig`, …) are intentionally
crates/api/src/variants.rs:28://! - The minimax-m3 adaptive variant map is `{ none, thinking }`; claurst has no
crates/api/src/variants.rs:29://!   dedicated "thinking" rung, so `thinking` maps to the nearest rung (`High`).
crates/api/src/variants.rs:226:// google thinking helpers (transform.ts:634-671)
crates/api/src/variants.rs:229:fn google_thinking_level_efforts(id: &str) -> Vec<&'static str> {
crates/api/src/variants.rs:246:/// `{ high, max }`; everything else maps each thinking-level effort.
crates/api/src/variants.rs:247:fn google_thinking_variant_keys(id: &str) -> Vec<&'static str> {
crates/api/src/variants.rs:251:    google_thinking_level_efforts(id)
crates/api/src/variants.rs:268:        // NOTE: opencode's minimax-m3 adaptive map is `{ none, thinking }`.
crates/api/src/variants.rs:269:        // Claurst has no dedicated "thinking" rung; map it to the nearest one.
crates/api/src/variants.rs:270:        "thinking" => EffortLevel::High,
crates/api/src/variants.rs:299:        return vec!["none", "thinking"];
crates/api/src/variants.rs:366:                // github copilot currently only returns thinking for gemini.
crates/api/src/variants.rs:434:        "@ai-sdk/google-vertex" | "@ai-sdk/google" => google_thinking_variant_keys(id),
crates/api/src/variants.rs:455:                google_thinking_variant_keys(id)
crates/api/src/variants.rs:520:        // Non-adaptive thinking model (haiku 4.5): budget-based high/max.
crates/api/src/variants.rs:528:    fn minimax_thinking_modes_match_model_semantics() {
crates/api/src/variants.rs:543:            "always-on M2.7 thinking must not expose a disable toggle"
crates/api/src/protocol/openai_chat.rs:7:// block indexing, reasoning/thinking handling and finish/usage semantics — only
crates/api/src/protocol/openai_chat.rs:38:    thinking_open: bool,
crates/api/src/protocol/openai_chat.rs:50:            thinking_open: false,
crates/api/src/protocol/openai_chat.rs:124:        // Reasoning / thinking extraction.
crates/api/src/protocol/openai_chat.rs:157:                        // thinking mode requires the client to echo back on
crates/api/src/protocol/openai_chat.rs:159:                        if !self.thinking_open {
crates/api/src/protocol/openai_chat.rs:163:                                    thinking: String::new(),
crates/api/src/protocol/openai_chat.rs:167:                            self.thinking_open = true;
crates/api/src/protocol/openai_chat.rs:182:                // Close any open thinking block before visible text starts
crates/api/src/protocol/openai_chat.rs:185:                if self.thinking_open {
crates/api/src/protocol/openai_chat.rs:189:                    self.thinking_open = false;
crates/api/src/protocol/openai_chat.rs:200:            // Close any open thinking block before tool calls start (same
crates/api/src/protocol/openai_chat.rs:202:            if self.thinking_open {
crates/api/src/protocol/openai_chat.rs:206:                self.thinking_open = false;
crates/api/src/protocol/openai_chat.rs:253:                // Flush any still-open thinking block first so it is finalized

=== grep functionCall in google.rs ===
10:// - Image/video inputs via inlineData parts
132:    /// Convert a single ContentBlock to a Gemini "part" Value.
134:    fn content_block_to_part(block: &ContentBlock) -> Option<Value> {
156:                "functionCall": {
208:    /// Convert a ToolResult block to a "functionResponse" part Value.
209:    fn tool_result_to_part(tool_name: &str, content: &ToolResultContent) -> Value {
229:            "functionResponse": {
342:            let mut regular_parts: Vec<Value> = Vec::new();
343:            let mut tool_result_parts: Vec<Value> = Vec::new();
344:            let flush_regular_parts = |contents: &mut Vec<Value>, parts: &mut Vec<Value>| {
345:                if !parts.is_empty() {
348:                        "parts": std::mem::take(parts)
352:            let flush_tool_result_parts = |contents: &mut Vec<Value>, parts: &mut Vec<Value>| {
353:                if !parts.is_empty() {
356:                        "parts": std::mem::take(parts)
368:                    flush_regular_parts(&mut contents, &mut regular_parts);
374:                    tool_result_parts.push(Self::tool_result_to_part(&tool_name, content));
375:                } else if let Some(part) = Self::content_block_to_part(block) {
376:                    flush_tool_result_parts(&mut contents, &mut tool_result_parts);
377:                    regular_parts.push(part);
381:            flush_regular_parts(&mut contents, &mut regular_parts);
382:            flush_tool_result_parts(&mut contents, &mut tool_result_parts);
395:            json!({ "parts": [{ "text": text }] })
515:        let parts = candidate
517:            .and_then(|c| c.get("parts"))
524:        if let Some(parts) = parts {
525:            for part in parts {
526:                if let Some(text) = part.get("text").and_then(|t| t.as_str()) {
530:                } else if let Some(fc) = part.get("functionCall") {
686:        // TODO(#228): Gemini has its own SSE JSON shape (candidates/parts); this
712:                            partial_response: None,
747:                                partial_response: None,
782:                            let parts = candidate
784:                                .and_then(|c| c.get("parts"))
787:                            if let Some(parts) = parts {
788:                                for (part_idx, part) in parts.iter().enumerate() {
789:                                    if let Some(text) = part.get("text").and_then(|t| t.as_str()) {
794:                                    } else if let Some(fc) = part.get("functionCall") {
805:                                        let idx = if let Some((existing_idx, _, _)) = open_tool_calls.get(&part_idx) {
815:                                            open_tool_calls.insert(part_idx, (idx, id.clone(), name.clone()));
829:                                            partial_json: args_str,
1008:            contents[1]["parts"][0]["functionResponse"]["name"],
1034:        assert_eq!(contents[0]["parts"][0]["text"], json!("before"));
1035:        assert_eq!(contents[1]["parts"][0]["functionResponse"]["name"], json!("search"));
1036:        assert_eq!(contents[2]["parts"][0]["text"], json!("after"));
1046:                    "parts": [
1047:                        { "functionCall": { "name": "search", "args": { "q": "a" } } },
1048:                        { "functionCall": { "name": "search", "args": { "q": "b" } } }

Now let me read the full google.rs to understand the structure.

1	// providers/google.rs — GoogleProvider: implements LlmProvider for the
2	// Google Gemini API (generativelanguage.googleapis.com).
3	//
4	// Supports:
5	// - Non-streaming: POST .../generateContent?key={api_key}
6	// - Streaming SSE: POST .../streamGenerateContent?alt=sse&key={api_key}
7	// - Tool/function calling via functionDeclarations
8	// - System prompts via systemInstruction field
9	// - Thinking config for Gemini 2.5+ and 3.0+ models
10	// - Image/video inputs via inlineData parts
11	// - list_models via GET /v1beta/models
12	
13	use std::pin::Pin;
14	
15	use async_trait::async_trait;
16	use bytes::Bytes;
17	use claurst_core::provider_id::ProviderId;
18	use claurst_core::types::{ContentBlock, Message, MessageContent, Role, ToolResultContent, UsageInfo};
19	use futures::{Stream, StreamExt};
20	use serde_json::{json, Value};
21	use tracing::{debug, warn};
22	
23	use crate::error_handling::parse_error_response as parse_http_error;
24	use crate::provider::LlmProvider;
25	use crate::provider_error::ProviderError;
26	use crate::provider_types::{
27	    ProviderCapabilities, ProviderRequest, ProviderResponse, ProviderStatus, StopReason,
28	    StreamEvent, SystemPrompt, SystemPromptStyle,
29	};
30	
31	use super::request_options::merge_google_options;
32	
33	// ---------------------------------------------------------------------------
34	// GoogleProvider
35	// ---------------------------------------------------------------------------
36	
37	pub struct GoogleProvider {
38	    id: ProviderId,
39	    api_key: String,
40	    base_url: String,
41	    http_client: reqwest::Client,
42	}
43	
44	impl GoogleProvider {
45	    pub fn new(api_key: String) -> Self {
46	        Self {
47	            id: ProviderId::new(ProviderId::GOOGLE),
48	            api_key,
49	            base_url: "https://generativelanguage.googleapis.com".to_string(),
50	            http_client: reqwest::Client::new(),
51	        }
52	    }
53	
54	    // -----------------------------------------------------------------------
55	    // Internal helpers
56	    // -----------------------------------------------------------------------
57	
58	    /// Returns true if the model supports thinking config (Gemini 2.5+ / 3.0+).
59	    fn supports_thinking(model: &str) -> bool {
60	        model.contains("2.5") || model.contains("3.0") || model.contains("3.1") || model.contains("gemini-3")
61	    }
62	
63	    /// Build the full generateContent URL for non-streaming.
64	    fn generate_url(&self, model: &str) -> String {
65	        format!(
66	            "{}/v1beta/models/{}:generateContent?key={}",
67	            self.base_url, model, self.api_key
68	        )
69	    }
70	
71	    /// Build the full streamGenerateContent URL for streaming.
72	    fn stream_url(&self, model: &str) -> String {
73	        format!(
74	            "{}/v1beta/models/{}:streamGenerateContent?alt=sse&key={}",
75	            self.base_url, model, self.api_key
76	        )
77	    }
78	
79	    fn tool_use_id_for_name(name: &str, occurrence: usize) -> String {
80	        let sanitized: String = name
81	            .chars()
82	            .map(|ch| {
83	                if ch.is_ascii_alphanumeric() || ch == '_' || ch == '-' {
84	                    ch
85	                } else {
86	                    '_'
87	                }
88	            })
89	            .collect();
90	        let base = if sanitized.is_empty() { "tool" } else { sanitized.as_str() };
91	        if occurrence == 0 {
92	            format!("call_{}", base)
93	        } else {
94	            format!("call_{}_{}", base, occurrence + 1)
95	        }
96	    }
97	
98	    fn tool_name_by_id(messages: &[Message]) -> std::collections::HashMap<String, String> {
99	        let mut map = std::collections::HashMap::new();
100	        for message in messages {
101	            let MessageContent::Blocks(blocks) = &message.content else {
102	                continue;
103	            };
104	            for block in blocks {
105	                if let ContentBlock::ToolUse { id, name, .. } = block {
106	                    map.insert(id.clone(), name.clone());
107	                }
108	            }
109	        }
110	        map
111	    }
112	
113	    fn infer_tool_name_from_id(tool_use_id: &str) -> Option<String> {
114	        let raw = tool_use_id.strip_prefix("call_")?;
115	        let trimmed = if let Some((candidate, suffix)) = raw.rsplit_once('_') {
116	            if !candidate.is_empty() && suffix.chars().all(|ch| ch.is_ascii_digit()) {
117	                candidate
118	            } else {
119	                raw
120	            }
121	        } else {
122	            raw
123	        };
124	
125	        if trimmed.is_empty() {
126	            None
127	        } else {
128	            Some(trimmed.to_string())
129	        }
130	    }
131	
132	    /// Convert a single ContentBlock to a Gemini "part" Value.
133	    /// Returns None for blocks that should be dropped (e.g. Thinking).
134	    fn content_block_to_part(block: &ContentBlock) -> Option<Value> {
135	        match block {
136	            ContentBlock::Text { text } => Some(json!({ "text": text })),
137	
138	            ContentBlock::Image { source } => {
139	                // Prefer base64 inline data; fall back to URL if available.
140	                if let (Some(data), Some(mime)) = (&source.data, &source.media_type) {
141	                    Some(json!({
142	                        "inlineData": {
143	                            "data": data,
144	                            "mimeType": mime
145	                        }
146	                    }))
147	                } else { source.url.as_ref().map(|url| json!({
148	                        "fileData": {
149	                            "fileUri": url,
150	                            "mimeType": source.media_type.as_deref().unwrap_or("image/jpeg")
151	                        }
152	                    })) }
153	            }
154	
155	            ContentBlock::ToolUse { name, input, .. } => Some(json!({
156	                "functionCall": {
157	                    "name": name,
158	                    "args": input
159	                }
160	            })),
161	
162	            // Thinking blocks are not supported by Gemini — drop silently.
163	            ContentBlock::Thinking { .. } | ContentBlock::RedactedThinking { .. } => None,
164	
165	            // Document blocks: treat as file data when URL is available,
166	            // otherwise as inline base64.
167	            ContentBlock::Document { source, .. } => {
168	                if let (Some(data), Some(mime)) = (&source.data, &source.media_type) {
169	                    Some(json!({
170	                        "inlineData": {
171	                            "data": data,
172	                            "mimeType": mime
173	                        }
174	                    }))
175	                } else { source.url.as_ref().map(|url| json!({
176	                        "fileData": {
177	                            "fileUri": url,
178	                            "mimeType": source.media_type.as_deref().unwrap_or("application/pdf")
179	                        }
180	                    })) }
181	            }
182	
183	            // Render UI-only / metadata blocks as text so context is not lost.
184	            ContentBlock::UserLocalCommandOutput { command, output } => Some(json!({
185	                "text": format!("\$ {}\n{}", command, output)
186	            })),
187	            ContentBlock::UserCommand { name, args } => Some(json!({
188	                "text": format!("/{} {}", name, args)
189	            })),
190	            ContentBlock::UserMemoryInput { key, value } => Some(json!({
191	                "text": format!("[memory] {}: {}", key, value)
192	            })),
193	            ContentBlock::SystemAPIError { message, .. } => Some(json!({
194	                "text": format!("[error] {}", message)
195	            })),
196	            ContentBlock::CollapsedReadSearch { tool_name, paths, .. } => Some(json!({
197	                "text": format!("[{}] {}", tool_name, paths.join(", "))
198	            })),
199	            ContentBlock::TaskAssignment { id, subject, description } => Some(json!({
200	                "text": format!("[task:{}] {}: {}", id, subject, description)
201	            })),
202	
203	            // ToolResult is handled specially in message conversion.
204	            ContentBlock::ToolResult { .. } => None,
205	        }
206	    }
207	
208	    /// Convert a ToolResult block to a "functionResponse" part Value.
209	    fn tool_result_to_part(tool_name: &str, content: &ToolResultContent) -> Value {
210	        let response_content = match content {
211	            ToolResultContent::Text(t) => json!({ "content": t }),
212	            ToolResultContent::Blocks(blocks) => {
213	                // Concatenate all text blocks for the response payload.
214	                let text: String = blocks
215	                    .iter()
216	                    .filter_map(|b| {
217	                        if let ContentBlock::Text { text } = b {
218	                            Some(text.as_str())
219	                        } else {
220	                            None
221	                        }
222	                    })
223	                    .collect::<Vec<_>>()
224	                    .join("\n");
225	                json!({ "content": text })
226	            }
227	        };
228	        json!({
229	            "functionResponse": {
230	                "name": tool_name,
231	                "response": response_content
232	            }
233	        })
234	    }
235	
236	    /// Sanitize a JSON Schema object for Google's stricter requirements:
237	    /// - Integer enums → string enums
238	    /// - `required` must only list fields actually in `properties`
239	    /// - Non-object types must not have `properties`/`required`
240	    /// - Array `items` must have a `type` field
241	    fn sanitize_schema(schema: Value) -> Value {
242	        match schema {
243	            Value::Object(mut map) => {
244	                // Strip keywords that Gemini's function-declaration schema does
245	                // not understand and will reject with a 400 error.
246	                map.remove("additionalProperties");
247	                map.remove("\$schema");
248	                map.remove("default");
249	                map.remove("examples");
250	                map.remove("title");
251	
252	                // Recurse into nested schemas first.
253	                let schema_type = map
254	                    .get("type")
255	                    .and_then(|v| v.as_str())
256	                    .map(|s| s.to_string());
257	
258	                // Convert integer enums to string enums.
259	                if let Some(Value::Array(enum_vals)) = map.get("enum") {
260	                    if enum_vals.iter().any(|v| v.is_number()) {
261	                        let string_enums: Vec<Value> = enum_vals
262	                            .iter()
263	                            .map(|v| Value::String(v.to_string()))
264	                            .collect();
265	                        map.insert("enum".to_string(), Value::Array(string_enums));
266	                        // Upgrade type to string when converting number enums.
267	                        map.insert("type".to_string(), Value::String("string".to_string()));
268	                    }
269	                }
270	
271	                // For object types: sanitize properties recursively and fix required.
272	                if schema_type.as_deref() == Some("object") {
273	                    if let Some(Value::Object(props)) = map.get_mut("properties") {
274	                        let sanitized_props: serde_json::Map<String, Value> = props
275	                            .iter()
276	                            .map(|(k, v)| (k.clone(), Self::sanitize_schema(v.clone())))
277	                            .collect();
278	                        *props = sanitized_props;
279	                    }
280	
281	                    // Filter required to only include keys present in properties.
282	                    if let Some(Value::Array(req_arr)) = map.get("required").cloned() {
283	                        let prop_keys: std::collections::HashSet<String> = map
284	                            .get("properties")
285	                            .and_then(|p| p.as_object())
286	                            .map(|o| o.keys().cloned().collect())
287	                            .unwrap_or_default();
288	
289	                        let filtered: Vec<Value> = req_arr
290	                            .into_iter()
291	                            .filter(|v| {
292	                                v.as_str()
293	                                    .map(|s| prop_keys.contains(s))
294	                                    .unwrap_or(false)
295	                            })
296	                            .collect();
297	                        map.insert("required".to_string(), Value::Array(filtered));
298	                    }
299	                } else {
300	                    // Non-object types must not carry properties/required.
301	                    map.remove("properties");
302	                    map.remove("required");
303	                }
304	
305	                // Array items: ensure a type field is present.
306	                if schema_type.as_deref() == Some("array") {
307	                    if let Some(items) = map.get_mut("items") {
308	                        if let Value::Object(ref mut items_map) = items {
309	                            if !items_map.contains_key("type") {
310	                                items_map
311	                                    .insert("type".to_string(), Value::String("string".to_string()));
312	                            }
313	                            // Recurse sanitize into items.
314	                            let sanitized = Self::sanitize_schema(Value::Object(items_map.clone()));
315	                            *items = sanitized;
316	                        }
317	                    }
318	                }
319	
320	                Value::Object(map)
321	            }
322	            other => other,
323	        }
324	    }
325	
326	    /// Build the full request body JSON for the Gemini API.
327	    fn build_request_body(&self, request: &ProviderRequest) -> Value {
328	        // ---- Convert messages ----
329	        // Google requires a flat list of content objects.
330	        // ToolResult blocks must become separate user-role messages.
331	        let mut contents: Vec<Value> = Vec::new();
332	        let tool_name_by_id = Self::tool_name_by_id(&request.messages);
333	
334	        for msg in &request.messages {
335	            let role = match msg.role {
336	                Role::User => "user",
337	                Role::Assistant => "model",
338	            };
339	
340	            let blocks = msg.content_blocks();
341	
342	            let mut regular_parts: Vec<Value> = Vec::new();
343	            let mut tool_result_parts: Vec<Value> = Vec::new();
344	            let flush_regular_parts = |contents: &mut Vec<Value>, parts: &mut Vec<Value>| {
345	                if !parts.is_empty() {
346	                    contents.push(json!({
347	                        "role": role,
348	                        "parts": std::mem::take(parts)
349	                    }));
350	                }
351	            };
352	            let flush_tool_result_parts = |contents: &mut Vec<Value>, parts: &mut Vec<Value>| {
353	                if !parts.is_empty() {
354	                    contents.push(json!({
355	                        "role": "user",
356	                        "parts": std::mem::take(parts)
357	                    }));
358	                }
359	            };
360	
361	            for block in &blocks {
362	                if let ContentBlock::ToolResult {
363	                    tool_use_id,
364	                    content,
365	                    ..
366	                } = block
367	                {
368	                    flush_regular_parts(&mut contents, &mut regular_parts);
369	                    let tool_name = tool_name_by_id
370	                        .get(tool_use_id)
371	                        .cloned()
372	                        .or_else(|| Self::infer_tool_name_from_id(tool_use_id))
373	                        .unwrap_or_else(|| tool_use_id.clone());
374	                    tool_result_parts.push(Self::tool_result_to_part(&tool_name, content));
375	                } else if let Some(part) = Self::content_block_to_part(block) {
376	                    flush_tool_result_parts(&mut contents, &mut tool_result_parts);
377	                    regular_parts.push(part);
378	                }
379	            }
380	
381	            flush_regular_parts(&mut contents, &mut regular_parts);
382	            flush_tool_result_parts(&mut contents, &mut tool_result_parts);
383	        }
384	
385	        // ---- System instruction ----
386	        let system_instruction: Option<Value> = request.system_prompt.as_ref().map(|sp| {
387	            let text = match sp {
388	                SystemPrompt::Text(t) => t.clone(),
389	                SystemPrompt::Blocks(blocks) => blocks
390	                    .iter()
391	                    .map(|b| b.text.as_str())
392	                    .collect::<Vec<_>>()
393	                    .join("\n"),
394	            };
395	            json!({ "parts": [{ "text": text }] })
396	        });
397	
398	        // ---- Tool declarations ----
399	        let tools_value: Option<Value> = if request.tools.is_empty() {
400	            None
401	        } else {
402	            let declarations: Vec<Value> = request
403	                .tools
404	                .iter()
405	                .map(|td| {
406	                    json!({
407	                        "name": td.name,
408	                        "description": td.description,
409	                        "parameters": Self::sanitize_schema(td.input_schema.clone())
410	                    })
411	                })
412	                .collect();
413	            Some(json!([{ "functionDeclarations": declarations }]))
414	        };
415	
416	        // ---- Generation config ----
417	        let mut gen_config = serde_json::Map::new();
418	        gen_config.insert(
419	            "maxOutputTokens".to_string(),
420	            json!(request.max_tokens),
421	        );
422	        if let Some(temp) = request.temperature {
423	            gen_config.insert("temperature".to_string(), json!(temp));
424	        }
425	        if !request.stop_sequences.is_empty() {
426	            gen_config.insert(
427	                "stopSequences".to_string(),
428	                json!(request.stop_sequences),
429	            );
430	        }
431	        if let Some(top_p) = request.top_p {
432	            gen_config.insert("topP".to_string(), json!(top_p));
433	        }
434	        if let Some(top_k) = request.top_k {
435	            gen_config.insert("topK".to_string(), json!(top_k));
436	        }
437	
438	        // Thinking config for supported models.
439	        if Self::supports_thinking(&request.model) && request.thinking.is_some() {
440	            let budget = request
441	                .thinking
442	                .as_ref()
443	                .map(|t| t.budget_tokens)
444	                .unwrap_or(8192);
445	            gen_config.insert(
446	                "thinkingConfig".to_string(),
447	                json!({
448	                    "includeThoughts": true,
449	                    "thinkingBudget": budget
450	                }),
451	            );
452	        }
453	
454	        // ---- Assemble body ----
455	        let mut body = serde_json::Map::new();
456	        body.insert("contents".to_string(), Value::Array(contents));
457	        body.insert(
458	            "generationConfig".to_string(),
459	            Value::Object(gen_config),
460	        );
461	        if let Some(si) = system_instruction {
462	            body.insert("systemInstruction".to_string(), si);
463	        }
464	        if let Some(tools) = tools_value {
465	            body.insert("tools".to_string(), tools);
466	        }
467	
468	        let mut value = Value::Object(body);
469	        merge_google_options(&mut value, &request.provider_options);
470	        value
471	    }
472	
473	    /// Parse a Google error JSON body and return the appropriate ProviderError.
474	    fn parse_error_response(&self, status: u16, body: &str) -> ProviderError {
475	        parse_http_error(status, body, &self.id)
476	    }
477	
478	    /// Extract content blocks and usage from a completed Gemini response body.
479	    fn parse_response_body(
480	        &self,
481	        body: &Value,
482	        model: &str,
483	    ) -> Result<ProviderResponse, ProviderError> {
484	        let candidates = body
485	            .get("candidates")
486	            .and_then(|c| c.as_array())
487	            .ok_or_else(|| ProviderError::Other {
488	                provider: self.id.clone(),
489	                message: "Missing 'candidates' in response".to_string(),
490	                status: None,
491	                body: Some(body.to_string()),
492	            })?;
493	
494	        let candidate = candidates.first().ok_or_else(|| ProviderError::Other {
495	            provider: self.id.clone(),
496	            message: "Empty 'candidates' array in response".to_string(),
497	            status: None,
498	            body: Some(body.to_string()),
499	        })?;
500	
501	        let finish_reason = candidate
502	            .get("finishReason")
503	            .and_then(|r| r.as_str())
504	            .unwrap_or("STOP");
505	
506	        let stop_reason = match finish_reason {
507	            "STOP" => StopReason::EndTurn,
508	            "MAX_TOKENS" => StopReason::MaxTokens,
509	            "SAFETY" => StopReason::ContentFiltered,
510	            "RECITATION" => StopReason::ContentFiltered,
511	            "TOOL_CODE" | "FUNCTION_CALL" => StopReason::ToolUse,
512	            other => StopReason::Other(other.to_string()),
513	        };
514	
515	        let parts = candidate
516	            .get("content")
517	            .and_then(|c| c.get("parts"))
518	            .and_then(|p| p.as_array());
519	
520	        let mut content_blocks: Vec<ContentBlock> = Vec::new();
521	        let mut tool_name_counts: std::collections::HashMap<String, usize> =
522	            std::collections::HashMap::new();
523	
524	        if let Some(parts) = parts {
525	            for part in parts {
526	                if let Some(text) = part.get("text").and_then(|t| t.as_str()) {
527	                    content_blocks.push(ContentBlock::Text {
528	                        text: text.to_string(),
529	                    });
530	                } else if let Some(fc) = part.get("functionCall") {
531	                    let name = fc
532	                        .get("name")
533	                        .and_then(|n| n.as_str())
534	                        .unwrap_or("")
535	                        .to_string();
536	                    let args = fc.get("args").cloned().unwrap_or(json!({}));
537	                    let occurrence = tool_name_counts
538	                        .entry(name.clone())
539	                        .and_modify(|count| *count += 1)
540	                        .or_insert(0);
541	                    let id = Self::tool_use_id_for_name(&name, *occurrence);
542	                    content_blocks.push(ContentBlock::ToolUse {
543	                        id,
544	                        name,
545	                        input: args,
546	                    });
547	                }
548	            }
549	        }
550	
551	        // Extract usage metadata.
552	        let usage = self.extract_usage(body);
553	
554	        Ok(ProviderResponse {
555	            id: format!("gemini-{}", uuid_v4_simple()),
556	            content: content_blocks,
557	            stop_reason,
558	            usage,
559	            model: model.to_string(),
560	        })
561	    }
562	
563	    /// Extract UsageInfo from a response body's usageMetadata field.
564	    fn extract_usage(&self, body: &Value) -> UsageInfo {
565	        let meta = body.get("usageMetadata");
566	        UsageInfo {
567	            input_tokens: meta
568	                .and_then(|m| m.get("promptTokenCount"))
569	                .and_then(|v| v.as_u64())
570	                .unwrap_or(0),
571	            output_tokens: meta
572	                .and_then(|m| m.get("candidatesTokenCount"))
573	                .and_then(|v| v.as_u64())
574	                .unwrap_or(0),
575	            cache_creation_input_tokens: 0,
576	            cache_read_input_tokens: 0,
577	        }
578	    }
579	
580	}
581	
582	// ---------------------------------------------------------------------------
583	// LlmProvider impl
584	// ---------------------------------------------------------------------------
585	
586	#[async_trait]
587	impl LlmProvider for GoogleProvider {
588	    fn id(&self) -> &ProviderId {
589	        &self.id
590	    }
591	
592	    fn name(&self) -> &str {
593	        "Google"
594	    }
595	
596	    async fn create_message(
597	        &self,
598	        request: ProviderRequest,
599	    ) -> Result<ProviderResponse, ProviderError> {
600	        let url = self.generate_url(&request.model);
601	        let model = request.model.clone();
602	        let body = self.build_request_body(&request);
603	
604	        debug!("Google create_message: POST {}", url);
605	
606	        let resp = self
607	            .http_client
608	            .post(&url)
609	            .header("x-goog-api-key", &self.api_key)
610	            .header("Content-Type", "application/json")
611	            .json(&body)
612	            .send()
613	            .await
614	            .map_err(|e| ProviderError::ServerError {
615	                provider: self.id.clone(),
616	                status: None,
617	                message: e.to_string(),
618	                is_retryable: true,
619	            })?;
620	
621	        let status = resp.status().as_u16();
622	        let resp_body = resp.text().await.map_err(|e| ProviderError::ServerError {
623	            provider: self.id.clone(),
624	            status: Some(status),
625	            message: e.to_string(),
626	            is_retryable: true,
627	        })?;
628	
629	        if status >= 400 {
630	            return Err(self.parse_error_response(status, &resp_body));
631	        }
632	
633	        let json_body: Value =
634	            serde_json::from_str(&resp_body).map_err(|e| ProviderError::Other {
635	                provider: self.id.clone(),
636	                message: format!("Failed to parse response JSON: {}", e),
637	                status: Some(status),
638	                body: Some(resp_body.clone()),
639	            })?;
640	
641	        self.parse_response_body(&json_body, &model)
642	    }
643	
644	    async fn create_message_stream(
645	        &self,
646	        request: ProviderRequest,
647	    ) -> Result<
648	        Pin<Box<dyn Stream<Item = Result<StreamEvent, ProviderError>> + Send>>,
649	        ProviderError,
650	    > {
651	        let url = self.stream_url(&request.model);
652	        let model = request.model.clone();
653	        let body = self.build_request_body(&request);
654	
655	        debug!("Google create_message_stream: POST {}", url);
656	
657	        let resp = self
658	            .http_client
659	            .post(&url)
660	            .header("x-goog-api-key", &self.api_key)
661	            .header("Content-Type", "application/json")
662	            .json(&body)
663	            .send()
664	            .await
665	            .map_err(|e| ProviderError::ServerError {
666	                provider: self.id.clone(),
667	                status: None,
668	                message: e.to_string(),
669	                is_retryable: true,
670	            })?;
671	
672	        let status = resp.status().as_u16();
673	        if status >= 400 {
674	            let resp_body =
675	                resp.text()
676	                    .await
677	                    .unwrap_or_else(|_| "<unreadable>".to_string());
678	            return Err(self.parse_error_response(status, &resp_body));
679	        }
680	
681	        // Wrap the byte stream in a line-based SSE parser.
682	        let provider_id_for_stream = self.id.clone();
683	        let model_clone = model.clone();
684	        let byte_stream = resp.bytes_stream();
685	
686	        // TODO(#228): Gemini has its own SSE JSON shape (candidates/parts); this
687	        // decode belongs in a `protocol::gemini` decoder, alongside the
688	        // OpenAI-Chat and AnthropicMessages protocols.
689	        let stream = async_stream::stream! {
690	            let mut byte_stream = byte_stream;
691	            let text_block_index: usize = 0;
692	            let mut tool_block_index: usize = 1000;
693	            let mut open_tool_calls: std::collections::HashMap<usize, (usize, String, String)> =
694	                std::collections::HashMap::new();
695	            let mut emitted_message_start = false;
696	            let message_id = format!("gemini-{}", uuid_v4_simple());
697	            // Shared byte-buffering decoder (#228): buffers raw bytes and only
698	            // decodes complete lines. Previously a non-UTF8 chunk — which is
699	            // exactly what a multibyte codepoint split across a chunk boundary
700	            // looks like — was skipped entirely, dropping data.
701	            let mut decoder = crate::SseByteDecoder::new();
702	            let mut tool_name_counts: std::collections::HashMap<String, usize> =
703	                std::collections::HashMap::new();
704	
705	            while let Some(chunk_result) = byte_stream.next().await {
706	                let chunk: Bytes = match chunk_result {
707	                    Ok(c) => c,
708	                    Err(e) => {
709	                        yield Err(ProviderError::StreamError {
710	                            provider: provider_id_for_stream.clone(),
711	                            message: e.to_string(),
712	                            partial_response: None,
713	                        });
714	                        return;
715	                    }
716	                };
717	
718	                // Process complete lines.
719	                for line in decoder.push(&chunk) {
720	                    let line = line.trim_end_matches('\r');
721	
722	                    if let Some(data) = line.strip_prefix("data: ") {
723	                        let data = data.trim();
724	                        if data.is_empty() || data == "[DONE]" {
725	                            continue;
726	                        }
727	
728	                        // Parse the JSON payload and emit events.
729	                        let parsed: Value = match serde_json::from_str(data) {
730	                            Ok(v) => v,
731	                            Err(e) => {
732	                                warn!("Google SSE: JSON parse error: {}: {}", e, data);
733	                                continue;
734	                            }
735	                        };
736	
737	                        // Check for stream-level error.
738	                        if let Some(err) = parsed.get("error") {
739	                            let msg = err
740	                                .get("message")
741	                                .and_then(|m| m.as_str())
742	                                .unwrap_or("unknown error")
743	                                .to_string();
744	                            yield Err(ProviderError::StreamError {
745	                                provider: provider_id_for_stream.clone(),
746	                                message: msg,
747	                                partial_response: None,
748	                            });
749	                            return;
750	                        }
751	
752	                        // Emit MessageStart on first chunk.
753	                        if !emitted_message_start {
754	                            emitted_message_start = true;
755	                            let meta = parsed.get("usageMetadata");
756	                            let usage = UsageInfo {
757	                                input_tokens: meta
758	                                    .and_then(|m| m.get("promptTokenCount"))
759	                                    .and_then(|v| v.as_u64())
760	                                    .unwrap_or(0),
761	                                output_tokens: meta
762	                                    .and_then(|m| m.get("candidatesTokenCount"))
763	                                    .and_then(|v| v.as_u64())
764	                                    .unwrap_or(0),
765	                                cache_creation_input_tokens: 0,
766	                                cache_read_input_tokens: 0,
767	                            };
768	                            yield Ok(StreamEvent::MessageStart {
769	                                id: message_id.clone(),
770	                                model: model_clone.clone(),
771	                                usage,
772	                            });
773	                        }
774	
775	                        let candidates = parsed
776	                            .get("candidates")
777	                            .and_then(|c| c.as_array());
778	
779	                        let Some(candidates) = candidates else { continue };
780	
781	                        for candidate in candidates {
782	                            let parts = candidate
783	                                .get("content")
784	                                .and_then(|c| c.get("parts"))
785	                                .and_then(|p| p.as_array());
786	
787	                            if let Some(parts) = parts {
788	                                for (part_idx, part) in parts.iter().enumerate() {
789	                                    if let Some(text) = part.get("text").and_then(|t| t.as_str()) {
790	                                        yield Ok(StreamEvent::TextDelta {
791	                                            index: text_block_index,
792	                                            text: text.to_string(),
793	                                        });
794	                                    } else if let Some(fc) = part.get("functionCall") {
795	                                        let name = fc
796	                                            .get("name")
797	                                            .and_then(|n| n.as_str())
798	                                            .unwrap_or("")
799	                                            .to_string();
800	                                        let args_str = fc
801	                                            .get("args")
802	                                            .map(|a| a.to_string())
803	                                            .unwrap_or_else(|| "{}".to_string());
804	
805	                                        let idx = if let Some((existing_idx, _, _)) = open_tool_calls.get(&part_idx) {
806	                                            *existing_idx
807	                                        } else {
808	                                            let occurrence = tool_name_counts
809	                                                .entry(name.clone())
810	                                                .and_modify(|count| *count += 1)
811	                                                .or_insert(0);
812	                                            let id = Self::tool_use_id_for_name(&name, *occurrence);
813	                                            let idx = tool_block_index;
814	                                            tool_block_index += 1;
815	                                            open_tool_calls.insert(part_idx, (idx, id.clone(), name.clone()));
816	                                            yield Ok(StreamEvent::ContentBlockStart {
817	                                                index: idx,
818	                                                content_block: ContentBlock::ToolUse {
819	                                                    id,
820	                                                    name: name.clone(),
821	                                                    input: json!({}),
822	                                                },
823	                                            });
824	                                            idx
825	                                        };
826	
827	                                        yield Ok(StreamEvent::InputJsonDelta {
828	                                            index: idx,
829	                                            partial_json: args_str,
830	                                        });
831	                                    }
832	                                }
833	                            }
834	
835	                            // Handle finish reason.
836	                            let finish_reason = candidate
837	                                .get("finishReason")
838	                                .and_then(|r| r.as_str())
839	                                .unwrap_or("");
840	
841	                            if !finish_reason.is_empty()
842	                                && finish_reason != "FINISH_REASON_UNSPECIFIED"
843	                            {
844	                                // Close text block.
845	                                yield Ok(StreamEvent::ContentBlockStop {
846	                                    index: text_block_index,
847	                                });
848	
849	                                // Close tool call blocks.
850	                                let mut tool_indices: Vec<usize> =
851	                                    open_tool_calls
852	                                        .values()
853	                                        .map(|(idx, _, _)| *idx)
854	                                        .collect();
855	                                tool_indices.sort_unstable();
856	                                for idx in tool_indices {
857	                                    yield Ok(StreamEvent::ContentBlockStop { index: idx });
858	                                }
859	                                open_tool_calls.clear();
860	
861	                                let stop_reason = match finish_reason {
862	                                    "STOP" => Some(StopReason::EndTurn),
863	                                    "MAX_TOKENS" => Some(StopReason::MaxTokens),
864	                                    "SAFETY" | "RECITATION" => Some(StopReason::ContentFiltered),
865	                                    "TOOL_CODE" | "FUNCTION_CALL" => Some(StopReason::ToolUse),
866	                                    other => Some(StopReason::Other(other.to_string())),
867	                                };
868	
869	                                let meta = parsed.get("usageMetadata");
870	                                let final_usage = UsageInfo {
871	                                    input_tokens: meta
872	                                        .and_then(|m| m.get("promptTokenCount"))
873	                                        .and_then(|v| v.as_u64())
874	                                        .unwrap_or(0),
875	                                    output_tokens: meta
876	                                        .and_then(|m| m.get("candidatesTokenCount"))
877	                                        .and_then(|v| v.as_u64())
878	                                        .unwrap_or(0),
879	                                    cache_creation_input_tokens: 0,
880	                                    cache_read_input_tokens: 0,
881	                                };
882	
883	                                yield Ok(StreamEvent::MessageDelta {
884	                                    stop_reason,
885	                                    usage: Some(final_usage),
886	                                });
887	                                yield Ok(StreamEvent::MessageStop);
888	                            }
889	                        }
890	                    }
891	                    // SSE comment lines (": ...") and blank lines are ignored.
892	                }
893	            }
894	        };
895	
896	        Ok(Box::pin(stream))
897	    }
898	
899	    async fn health_check(&self) -> Result<ProviderStatus, ProviderError> {
900	        // Lightweight liveness probe: a models-listing GET on the live endpoint.
901	        // (Model *listing* for the picker comes from the catalog, not here.)
902	        let url = format!("{}/v1beta/models?key={}", self.base_url, self.api_key);
903	        let resp = self
904	            .http_client
905	            .get(&url)
906	            .header("x-goog-api-key", &self.api_key)
907	            .send()
908	            .await;
909	        match resp {
910	            Ok(r) if r.status().is_success() => Ok(ProviderStatus::Healthy),
911	            Ok(r) => {
912	                let status = r.status().as_u16();
913	                let body = r.text().await.unwrap_or_default();
914	                match self.parse_error_response(status, &body) {
915	                    ProviderError::AuthFailed { message, .. } => {
916	                        Err(ProviderError::AuthFailed {
917	                            provider: self.id.clone(),
918	                            message,
919	                        })
920	                    }
921	                    e => Ok(ProviderStatus::Unavailable {
922	                        reason: e.to_string(),
923	                    }),
924	                }
925	            }
926	            Err(e) => Ok(ProviderStatus::Unavailable {
927	                reason: e.to_string(),
928	            }),
929	        }
930	    }
931	
932	    fn capabilities(&self) -> ProviderCapabilities {
933	        ProviderCapabilities {
934	            streaming: true,
935	            tool_calling: true,
936	            thinking: true,
937	            image_input: true,
938	            pdf_input: true,
939	            audio_input: false,
940	            video_input: true,
941	            caching: false,
942	            structured_output: true,
943	            system_prompt_style: SystemPromptStyle::SystemInstruction,
944	        }
945	    }
946	}
947	
948	// ---------------------------------------------------------------------------
949	// Helpers
950	// ---------------------------------------------------------------------------
951	
952	/// Generate a simple pseudo-random hex ID without pulling in the uuid crate.
953	/// Uses a combination of the current time and a thread-local counter.
954	fn uuid_v4_simple() -> String {
955	    use std::time::{SystemTime, UNIX_EPOCH};
956	    let t = SystemTime::now()
957	        .duration_since(UNIX_EPOCH)
958	        .map(|d| d.as_nanos())
959	        .unwrap_or(0);
960	    // Simple hash mix to spread bits.
961	    let a = t ^ (t >> 17) ^ (t << 13);
962	    let b = a.wrapping_mul(0x517cc1b727220a95);
963	    format!("{:032x}", b)
964	}
965	
966	#[cfg(test)]
967	mod tests {
968	    use super::*;
969	    use claurst_core::types::Message;
970	    use serde_json::json;
971	
972	    fn test_request(messages: Vec<Message>) -> ProviderRequest {
973	        ProviderRequest {
974	            model: "gemini-3-flash-preview".to_string(),
975	            messages,
976	            system_prompt: None,
977	            tools: vec![],
978	            max_tokens: 512,
979	            temperature: None,
980	            top_p: None,
981	            top_k: None,
982	            stop_sequences: vec![],
983	            thinking: None,
984	            provider_options: json!({}),
985	        }
986	    }
987	
988	    #[test]
989	    fn build_request_body_uses_function_names_for_tool_results() {
990	        let provider = GoogleProvider::new("test".to_string());
991	        let request = test_request(vec![
992	            Message::assistant_blocks(vec![ContentBlock::ToolUse {
993	                id: "call_search_2".to_string(),
994	                name: "search".to_string(),
995	                input: json!({"q": "cats"}),
996	            }]),
997	            Message::user_blocks(vec![ContentBlock::ToolResult {
998	                tool_use_id: "call_search_2".to_string(),
999	                content: ToolResultContent::Text("ok".to_string()),
1000	                is_error: Some(false),
1001	            }]),
1002	        ]);
1003	
1004	        let body = provider.build_request_body(&request);
1005	        let contents = body["contents"].as_array().expect("contents array");
1006	        assert_eq!(contents.len(), 2);
1007	        assert_eq!(
1008	            contents[1]["parts"][0]["functionResponse"]["name"],
1009	            json!("search")
1010	        );
1011	    }
1012	
1013	    #[test]
1014	    fn build_request_body_preserves_tool_result_order() {
1015	        let provider = GoogleProvider::new("test".to_string());
1016	        let request = test_request(vec![Message::user_blocks(vec![
1017	            ContentBlock::Text {
1018	                text: "before".to_string(),
1019	            },
1020	            ContentBlock::ToolResult {
1021	                tool_use_id: "call_search".to_string(),
1022	                content: ToolResultContent::Text("done".to_string()),
1023	                is_error: Some(false),
1024	            },
1025	            ContentBlock::Text {
1026	                text: "after".to_string(),
1027	            },
1028	        ])]);
1029	
1030	        let body = provider.build_request_body(&request);
1031	        let contents = body["contents"].as_array().expect("contents array");
1032	        assert_eq!(contents.len(), 3);
1033	        assert_eq!(contents[0]["role"], json!("user"));
1034	        assert_eq!(contents[0]["parts"][0]["text"], json!("before"));
1035	        assert_eq!(contents[1]["parts"][0]["functionResponse"]["name"], json!("search"));
1036	        assert_eq!(contents[2]["parts"][0]["text"], json!("after"));
1037	    }
1038	
1039	    #[test]
1040	    fn parse_response_body_assigns_unique_ids_for_duplicate_tool_names() {
1041	        let provider = GoogleProvider::new("test".to_string());
1042	        let response = json!({
1043	            "candidates": [{
1044	                "finishReason": "FUNCTION_CALL",
1045	                "content": {
1046	                    "parts": [
1047	                        { "functionCall": { "name": "search", "args": { "q": "a" } } },
1048	                        { "functionCall": { "name": "search", "args": { "q": "b" } } }
1049	                    ]
1050	                }
1051	            }],
1052	            "usageMetadata": {}
1053	        });
1054	
1055	        let parsed = provider
1056	            .parse_response_body(&response, "gemini-3-flash-preview")
1057	            .expect("parsed response");
1058	
1059	        assert!(matches!(
1060	            &parsed.content[0],
1061	            ContentBlock::ToolUse { id, .. } if id == "call_search"
1062	        ));
1063	        assert!(matches!(
1064	            &parsed.content[1],
1065	            ContentBlock::ToolUse { id, .. } if id == "call_search_2"
1066	        ));
1067	    }
1068	}
1069	