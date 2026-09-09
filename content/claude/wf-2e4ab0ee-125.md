---
title: "wf_2e4ab0ee 125"
---

_2 transcript files aggregated._


You are fixing GitHub issue #311 in claurst, a Rust TUI coding agent (github.com/Kuberwastaken/claurst).

Issue #311 — Google Gemini 3.1 Pro Preview fails on any tool call with HTTP 400: "Function call is missing a thought_signature in functionCall parts. This is required for tools to work correctly" (reported with the Read tool; plain chat works).
Root cause direction: newer Gemini "thinking" models attach a thoughtSignature field to response parts (including functionCall parts). When the client sends conversation history back for the next turn, every functionCall part it echoes must include the exact thoughtSignature it originally received; omitting it yields this 400. Follow Google's documented rules: signatures are strictly required on the current/most-recent turn's function calls; do not fabricate signatures for older history.

IMPORTANT — resume, don't restart:
A prior agent working this issue was killed mid-run. Its worktree is at
  /root/dev/scratch/claurst/.claude/worktrees/wf_187f5ae9-aee-3
with branch fix/gemini-thought-signature checked out and substantial UNCOMMITTED changes across src-rust/crates/api (provider_types.rs, protocol/openai_chat.rs, providers/google.rs, message_normalization.rs, and other providers — it appears to have threaded an optional signature field through the shared tool-call type). Do ALL your work inside that worktree.
1. cd into the worktree and run 'git diff' first. Review the WIP critically: keep what is sound, fix or redo what is not. If it is fundamentally misguided you may discard it (git checkout -- .) and start clean — your call, judge on the merits.
2. The branch sits at an OLD main. Bring it current: git fetch origin, then 'git stash -u && git merge --ff-only origin/main && git stash pop'. Note main has moved since the WIP was written — notably crates/api/src/providers/openai.rs gained cached-token parsing (#319). Resolve any stash conflicts preserving BOTH sides' intent.
3. Design requirements: capture thoughtSignature (camelCase in REST JSON) from BOTH streaming and non-streaming Gemini response parsing; store it as an optional, provider-agnostic passthrough field on the internal tool-use/content type (other providers unaffected — None stays absent on their wire formats); re-attach it to the corresponding functionCall part when serializing history back to Gemini 'contents'; make sure it survives session save/load if messages are persisted.
4. Add unit tests: response part with thoughtSignature is captured (streaming + non-streaming); request serialization round-trips it onto the functionCall part; absent signature keeps old behavior byte-identical for other providers.

Build environment (this box is a 4-core Raspberry Pi 5, aarch64):
- export PATH="\$HOME/.cargo/bin:\$PATH"
- Do NOT set CARGO_TARGET_DIR to the main repo's target directory (sharing it across worktrees was found to poison fingerprints and link stale rlibs). Use the DEFAULT target dir inside the worktree. The first build is cold (~10-15 min) — be patient, never kill a build; prefer targeted 'cargo check -p claurst-api' / 'cargo test -p claurst-api' loops, with one final 'cargo check --workspace' + relevant tests before pushing.
- Read AGENTS.md at the repo root if present, but do NOT run 'cargo fmt --all' and do not reformat code you did not change; match surrounding style by hand.

Git and PR rules (strict):
- Commit as you go: SMALL, sequential, logically-scoped conventional commits (like the existing history). Never one big squash.
- ABSOLUTELY NO attribution trailers: no 'Co-Authored-By', no 'Generated with Claude Code', no mention of Claude/Anthropic/AI in commit messages or the PR body.
- You have no Gemini API key here — say so honestly in the PR's verification section and rely on the round-trip unit tests.
- When done and verified: git push -u origin fix/gemini-thought-signature, then: gh pr create --base main --title '<conventional title>' --body '<problem / approach / verification>' including 'Closes #311'. Do NOT merge the PR.
- Never touch anything under /home/kuber, and do not modify the main checkout at /root/dev/scratch/claurst (worktree only).


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

I'll start by examining the current state of the worktree and the WIP changes.

On branch fix/gemini-thought-signature
Your branch is behind 'origin/main' by 14 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src-rust/crates/api/src/lib.rs
	modified:   src-rust/crates/api/src/protocol/openai_chat.rs
	modified:   src-rust/crates/api/src/provider_types.rs
	modified:   src-rust/crates/api/src/providers/azure.rs
	modified:   src-rust/crates/api/src/providers/bedrock.rs
	modified:   src-rust/crates/api/src/providers/codex.rs
	modified:   src-rust/crates/api/src/providers/cohere.rs
	modified:   src-rust/crates/api/src/providers/copilot.rs
	modified:   src-rust/crates/api/src/providers/google.rs
	modified:   src-rust/crates/api/src/providers/message_normalization.rs
	modified:   src-rust/crates/api/src/providers/minimax.rs
	modified:   src-rust/crates/api/src/providers/openai.rs
	modified:   src-rust/crates/api/src/transformers/anthropic.rs
	modified:   src-rust/crates/commands/src/export.rs
	modified:   src-rust/crates/commands/src/stats.rs
	modified:   src-rust/crates/core/src/lib.rs
	modified:   src-rust/crates/query/src/compact.rs
	modified:   src-rust/crates/query/src/lib.rs
	modified:   src-rust/crates/query/src/sanitize.rs
	modified:   src-rust/crates/query/src/session_memory.rs
	modified:   src-rust/crates/tui/src/lib.rs
	modified:   src-rust/crates/tui/src/message_copy.rs
	modified:   src-rust/crates/tui/src/messages/mod.rs

no changes added to commit (use "git add" and/or "git commit -a")
=== BRANCH ===
fix/gemini-thought-signature
=== LOG ===
6fce473 fix(api): complete MiniMax M3 refresh (#313)
26c913d fix(api): refresh MiniMax M3 metadata (#308)
7a31cc8 fix: resolve clippy 1.97 lints failing CI
0097c51 fix(tui): remember permission approvals across restarts
4da14ef feat(tui): click or Alt+E to expand a pasted-text placeholder in the prompt
45a775c fix(tui): expand pasted-text placeholders at submit so the agent gets the real content
656c02b feat(api): live Anthropic model discovery via /v1/models (filters the sub list) (#307)
a39316f fix(cli): activate Claude Pro/Max OAuth credentials in-session (no restart) (#306)
ad6b164 fix(tui): don't rainbow xhigh in the effort picker when max is also available (#305)
c08f17a feat(tui): terminal working indicator via OSC 9;4 progress (#304)

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

Let me review the WIP diff, starting with the core type change and getting an overview.

 src-rust/crates/api/src/lib.rs                     |  37 +++--
 src-rust/crates/api/src/protocol/openai_chat.rs    |   1 +
 src-rust/crates/api/src/provider_types.rs          |  18 ++-
 src-rust/crates/api/src/providers/azure.rs         |   1 +
 src-rust/crates/api/src/providers/bedrock.rs       |  10 +-
 src-rust/crates/api/src/providers/codex.rs         |   8 +-
 src-rust/crates/api/src/providers/cohere.rs        |   8 +-
 src-rust/crates/api/src/providers/copilot.rs       |  12 +-
 src-rust/crates/api/src/providers/google.rs        | 169 ++++++++++++++++++++-
 .../api/src/providers/message_normalization.rs     |   1 +
 src-rust/crates/api/src/providers/minimax.rs       |   1 +
 src-rust/crates/api/src/providers/openai.rs        |  11 +-
 src-rust/crates/api/src/transformers/anthropic.rs  |   1 +
 src-rust/crates/commands/src/export.rs             |   2 +-
 src-rust/crates/commands/src/stats.rs              |   1 +
 src-rust/crates/core/src/lib.rs                    |   7 +
 src-rust/crates/query/src/compact.rs               |   3 +-
 src-rust/crates/query/src/lib.rs                   |  22 +--
 src-rust/crates/query/src/sanitize.rs              |   1 +
 src-rust/crates/query/src/session_memory.rs        |   1 +
 src-rust/crates/tui/src/lib.rs                     |   1 +
 src-rust/crates/tui/src/message_copy.rs            |   4 +-
 src-rust/crates/tui/src/messages/mod.rs            |   6 +-
 23 files changed, 279 insertions(+), 47 deletions(-)

diff --git a/src-rust/crates/api/src/provider_types.rs b/src-rust/crates/api/src/provider_types.rs
index d39e5ea..fca195a 100644
--- a/src-rust/crates/api/src/provider_types.rs
+++ b/src-rust/crates/api/src/provider_types.rs
@@ -204,6 +204,9 @@ enum PartialBlock {
         id: String,
         name: String,
         json_buf: String,
+        /// Opaque provider signature (e.g. Gemini's `thoughtSignature`) captured
+        /// on `ContentBlockStart`; echoed back on the finalized block (#311).
+        thought_signature: Option<String>,
     },
     /// Any block that arrives fully-formed on `ContentBlockStart` and needs no
     /// delta accumulation (e.g. `RedactedThinking`, images).
@@ -225,10 +228,11 @@ impl PartialBlock {
                 thinking_buf: thinking,
                 signature_buf: signature,
             },
-            ContentBlock::ToolUse { id, name, .. } => PartialBlock::ToolUse {
+            ContentBlock::ToolUse { id, name, thought_signature, .. } => PartialBlock::ToolUse {
                 id,
                 name,
                 json_buf: String::new(),
+                thought_signature,
             },
             other => PartialBlock::Passthrough(other),
         }
@@ -244,10 +248,10 @@ impl PartialBlock {
                 thinking: thinking_buf,
                 signature: signature_buf,
             },
-            PartialBlock::ToolUse { id, name, json_buf } => {
+            PartialBlock::ToolUse { id, name, json_buf, thought_signature } => {
                 let input =
                     serde_json::from_str(&json_buf).unwrap_or(Value::Object(Default::default()));
-                ContentBlock::ToolUse { id, name, input }
+                ContentBlock::ToolUse { id, name, input, thought_signature }
             }
             PartialBlock::Passthrough(block) => block,
         }
@@ -519,6 +523,7 @@ mod tests {
                 id: "tool_1".into(),
                 name: "get_weather".into(),
                 input: Value::Null,
+                thought_signature: Some("sig-tool-xyz".into()),
             },
         });
         acc.on_event(&StreamEvent::InputJsonDelta {
@@ -549,7 +554,7 @@ mod tests {
             other => panic!("expected Text block second, got {other:?}"),
         }
         match &blocks[2] {
-            ContentBlock::ToolUse { id, name, input } => {
+            ContentBlock::ToolUse { id, name, input, thought_signature } => {
                 assert_eq!(id, "tool_1");
                 assert_eq!(name, "get_weather");
                 assert_eq!(
@@ -557,6 +562,11 @@ mod tests {
                     Some("Paris"),
                     "tool_use JSON assembled from partial deltas"
                 );
+                assert_eq!(
+                    thought_signature.as_deref(),
+                    Some("sig-tool-xyz"),
+                    "opaque tool-call signature survives stream assembly"
+                );
             }
             other => panic!("expected ToolUse block third, got {other:?}"),
         }

Let me find where `ContentBlock` is defined and review the core changes.

diff --git a/src-rust/crates/core/src/lib.rs b/src-rust/crates/core/src/lib.rs
index 9a16004..dbc44ef 100644
--- a/src-rust/crates/core/src/lib.rs
+++ b/src-rust/crates/core/src/lib.rs
@@ -219,6 +219,13 @@ pub mod types {
             id: String,
             name: String,
             input: Value,
+            /// Opaque, provider-supplied metadata that must be echoed back
+            /// verbatim on subsequent turns for the tool call to be accepted.
+            /// Currently carries Google Gemini's `thoughtSignature` for thinking
+            /// models (issue #311); `None` for every other provider. Persisted
+            /// with the session so it survives save/load.
+            #[serde(default, skip_serializing_if = "Option::is_none")]
+            thought_signature: Option<String>,
         },
         ToolResult {
             tool_use_id: String,

src-rust/crates/core/src/lib.rs:211:    pub enum ContentBlock {

180	        /// Return `true` for errors that mean the conversation cannot continue
181	        /// without intervention (e.g. compaction or context-window reset).
182	        pub fn is_context_limit(&self) -> bool {
183	            matches!(
184	                self,
185	                ClaudeError::ContextWindowExceeded | ClaudeError::MaxTokensReached
186	            )
187	        }
188	    }
189	}
190	
191	// ---------------------------------------------------------------------------
192	// types module
193	// ---------------------------------------------------------------------------
194	pub mod types {
195	    use serde::{Deserialize, Serialize};
196	    use serde_json::Value;
197	
198	    // ---- Roles -----------------------------------------------------------
199	
200	    #[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
201	    #[serde(rename_all = "lowercase")]
202	    pub enum Role {
203	        User,
204	        Assistant,
205	    }
206	
207	    // ---- Content blocks --------------------------------------------------
208	
209	    #[derive(Debug, Clone, Serialize, Deserialize)]
210	    #[serde(tag = "type", rename_all = "snake_case")]
211	    pub enum ContentBlock {
212	        Text {
213	            text: String,
214	        },
215	        Image {
216	            source: ImageSource,
217	        },
218	        ToolUse {
219	            id: String,
220	            name: String,
221	            input: Value,
222	            /// Opaque, provider-supplied metadata that must be echoed back
223	            /// verbatim on subsequent turns for the tool call to be accepted.
224	            /// Currently carries Google Gemini's `thoughtSignature` for thinking
225	            /// models (issue #311); `None` for every other provider. Persisted
226	            /// with the session so it survives save/load.
227	            #[serde(default, skip_serializing_if = "Option::is_none")]
228	            thought_signature: Option<String>,
229	        },
230	        ToolResult {
231	            tool_use_id: String,
232	            content: ToolResultContent,
233	            #[serde(skip_serializing_if = "Option::is_none")]
234	            is_error: Option<bool>,
235	        },
236	        Thinking {
237	            thinking: String,
238	            signature: String,
239	        },
240	        RedactedThinking {
241	            data: String,
242	        },
243	        Document {
244	            source: DocumentSource,
245	            #[serde(skip_serializing_if = "Option::is_none")]
246	            title: Option<String>,
247	            #[serde(skip_serializing_if = "Option::is_none")]
248	            context: Option<String>,
249	            #[serde(skip_serializing_if = "Option::is_none")]
250	            citations: Option<CitationsConfig>,
251	        },
252	        /// A `!`-prefixed shell command invoked by the user, with its captured output.
253	        /// Rendered as a faint gray block with a `!command` header.
254	        UserLocalCommandOutput {
255	            command: String,
256	            output: String,
257	        },
258	        /// A skill/slash-command invocation entered by the user.
259	        /// Rendered as `▸ name args` with cyan styling.
260	        UserCommand {
261	            name: String,
262	            args: String,
263	        },
264	        /// A memory key/value written by the user (e.g. via `/memory`).
265	        /// Rendered as `# key: value` in cyan with a `Got it.` footer.
266	        UserMemoryInput {
267	            key: String,
268	            value: String,
269	        },
270	        /// A system-level API error, rendered as a red-bordered block.
271	        /// Shows first 5 lines with `[expand]` hint when truncated, and an
272	        /// optional `Retrying in Ns...` countdown line when `retry_secs` is set.
273	        SystemAPIError {
274	            message: String,
275	            #[serde(skip_serializing_if = "Option::is_none")]
276	            retry_secs: Option<u32>,
277	        },
278	        /// A collapsed summary of multiple read/search tool calls.
279	        /// Rendered as `▸ Read N files (+ M more)` on a single line.
280	        CollapsedReadSearch {
281	            tool_name: String,
282	            paths: Vec<String>,
283	            n_hidden: usize,
284	        },
285	        /// A sub-task assignment in an agentic workflow.
286	        /// Rendered as a cyan-bordered box with Task ID, subject, and description.
287	        TaskAssignment {
288	            id: String,
289	            subject: String,
290	            description: String,
291	        },
292	    }
293	
294	    #[derive(Debug, Clone, Serialize, Deserialize)]
295	    #[serde(untagged)]
296	    pub enum ToolResultContent {
297	        Text(String),
298	        Blocks(Vec<ContentBlock>),
299	    }

The core type change looks sound. Now let me review the critical google.rs changes and the other provider changes.

diff --git a/src-rust/crates/api/src/providers/google.rs b/src-rust/crates/api/src/providers/google.rs
index 1bd03d4..c8afc9c 100644
--- a/src-rust/crates/api/src/providers/google.rs
+++ b/src-rust/crates/api/src/providers/google.rs
@@ -152,12 +152,27 @@ impl GoogleProvider {
                     })) }
             }
 
-            ContentBlock::ToolUse { name, input, .. } => Some(json!({
-                "functionCall": {
-                    "name": name,
-                    "args": input
+            ContentBlock::ToolUse {
+                name,
+                input,
+                thought_signature,
+                ..
+            } => {
+                let mut part = json!({
+                    "functionCall": {
+                        "name": name,
+                        "args": input
+                    }
+                });
+                // Gemini 3.x thinking models require the exact `thoughtSignature`
+                // captured from the response to be echoed back on the functionCall
+                // part; omitting it yields HTTP 400 (issue #311). REST JSON uses
+                // camelCase. Absent signature → old behaviour (no key emitted).
+                if let (Some(sig), Some(obj)) = (thought_signature, part.as_object_mut()) {
+                    obj.insert("thoughtSignature".to_string(), json!(sig));
                 }
-            })),
+                Some(part)
+            }
 
             // Thinking blocks are not supported by Gemini — drop silently.
             ContentBlock::Thinking { .. } | ContentBlock::RedactedThinking { .. } => None,
@@ -534,6 +549,13 @@ impl GoogleProvider {
                         .unwrap_or("")
                         .to_string();
                     let args = fc.get("args").cloned().unwrap_or(json!({}));
+                    // Capture the thought signature (camelCase in REST JSON) that
+                    // rides alongside the functionCall part on Gemini thinking
+                    // models, so it can be echoed back on the next turn (#311).
+                    let thought_signature = part
+                        .get("thoughtSignature")
+                        .and_then(|s| s.as_str())
+                        .map(|s| s.to_string());
                     let occurrence = tool_name_counts
                         .entry(name.clone())
                         .and_modify(|count| *count += 1)
@@ -543,6 +565,7 @@ impl GoogleProvider {
                         id,
                         name,
                         input: args,
+                        thought_signature,
                     });
                 }
             }
@@ -801,6 +824,13 @@ impl LlmProvider for GoogleProvider {
                                             .get("args")
                                             .map(|a| a.to_string())
                                             .unwrap_or_else(|| "{}".to_string());
+                                        // Gemini streams a functionCall part whole, so its
+                                        // thoughtSignature (camelCase) is present here and
+                                        // must ride along on the ToolUse block (#311).
+                                        let thought_signature = part
+                                            .get("thoughtSignature")
+                                            .and_then(|s| s.as_str())
+                                            .map(|s| s.to_string());
 
                                         let idx = if let Some((existing_idx, _, _)) = open_tool_calls.get(&part_idx) {
                                             *existing_idx
@@ -819,6 +849,7 @@ impl LlmProvider for GoogleProvider {
                                                     id,
                                                     name: name.clone(),
                                                     input: json!({}),
+                                                    thought_signature,
                                                 },
                                             });
                                             idx
@@ -993,6 +1024,7 @@ mod tests {
                 id: "call_search_2".to_string(),
                 name: "search".to_string(),
                 input: json!({"q": "cats"}),
+                thought_signature: None,
             }]),
             Message::user_blocks(vec![ContentBlock::ToolResult {
                 tool_use_id: "call_search_2".to_string(),
@@ -1065,4 +1097,131 @@ mod tests {
             ContentBlock::ToolUse { id, .. } if id == "call_search_2"
         ));
     }
+
+    #[test]
+    fn parse_response_body_captures_thought_signature() {
+        // Gemini 3.x thinking models attach a camelCase `thoughtSignature` as a
+        // sibling of `functionCall` on the part; it must be captured (#311).
+        let provider = GoogleProvider::new("test".to_string());
+        let response = json!({
+            "candidates": [{
+                "finishReason": "FUNCTION_CALL",
+                "content": {
+                    "parts": [
+                        {
+                            "functionCall": { "name": "read", "args": { "path": "a.rs" } },
+                            "thoughtSignature": "SIG_ABC123"
+                        }
+                    ]
+                }
+            }],
+            "usageMetadata": {}
+        });
+
+        let parsed = provider
+            .parse_response_body(&response, "gemini-3.1-pro-preview")
+            .expect("parsed response");
+
+        match &parsed.content[0] {
+            ContentBlock::ToolUse {
+                name,
+                thought_signature,
+                ..
+            } => {
+                assert_eq!(name, "read");
+                assert_eq!(thought_signature.as_deref(), Some("SIG_ABC123"));
+            }
+            other => panic!("expected ToolUse block, got {other:?}"),
+        }
+    }
+
+    #[test]
+    fn parse_response_body_omits_signature_when_absent() {
+        // A functionCall part without a signature (older/non-thinking models)
+        // yields a ToolUse with `thought_signature == None` (old behaviour).
+        let provider = GoogleProvider::new("test".to_string());
+        let response = json!({
+            "candidates": [{
+                "finishReason": "FUNCTION_CALL",
+                "content": {
+                    "parts": [
+                        { "functionCall": { "name": "read", "args": {} } }
+                    ]
+                }
+            }],
+            "usageMetadata": {}
+        });
+
+        let parsed = provider
+            .parse_response_body(&response, "gemini-2.0-flash")
+            .expect("parsed response");
+
+        assert!(matches!(
+            &parsed.content[0],
+            ContentBlock::ToolUse { thought_signature, .. } if thought_signature.is_none()
+        ));
+    }
+
+    #[test]
+    fn build_request_body_round_trips_thought_signature_onto_function_call() {
+        // A captured signature must ride back as a camelCase sibling of the
+        // functionCall part, or Gemini 3.x rejects the turn with HTTP 400 (#311).
+        let provider = GoogleProvider::new("test".to_string());
+        let request = test_request(vec![Message::assistant_blocks(vec![
+            ContentBlock::ToolUse {
+                id: "call_read".to_string(),
+                name: "read".to_string(),
+                input: json!({ "path": "a.rs" }),
+                thought_signature: Some("SIG_ABC123".to_string()),
+            },
+        ])]);
+
+        let body = provider.build_request_body(&request);
+        let contents = body["contents"].as_array().expect("contents array");
+        let part = &contents[0]["parts"][0];
+        assert_eq!(part["functionCall"]["name"], json!("read"));
+        assert_eq!(part["functionCall"]["args"], json!({ "path": "a.rs" }));
+        assert_eq!(part["thoughtSignature"], json!("SIG_ABC123"));
+    }
+
+    #[test]
+    fn build_request_body_without_signature_omits_thought_signature_key() {
+        // Absent signature keeps the old wire shape: no thoughtSignature key.
+        let provider = GoogleProvider::new("test".to_string());
+        let request = test_request(vec![Message::assistant_blocks(vec![
+            ContentBlock::ToolUse {
+                id: "call_read".to_string(),
+                name: "read".to_string(),
+                input: json!({ "path": "a.rs" }),
+                thought_signature: None,
+            },
+        ])]);
+
+        let body = provider.build_request_body(&request);
+        let part = &body["contents"][0]["parts"][0];
+        assert_eq!(part["functionCall"]["name"], json!("read"));
+        assert!(
+            part.get("thoughtSignature").is_none(),
+            "absent signature must not emit a thoughtSignature key"
+        );
+    }
+
+    #[test]
+    fn thought_signature_survives_content_block_serde_round_trip() {
+        // The signature must persist across session save/load (JSON round-trip).
+        let block = ContentBlock::ToolUse {
+            id: "call_read".to_string(),
+            name: "read".to_string(),
+            input: json!({ "path": "a.rs" }),
+            thought_signature: Some("SIG_PERSIST".to_string()),
+        };
+        let encoded = serde_json::to_string(&block).expect("serialize");
+        assert!(encoded.contains("thought_signature"));
+        let decoded: ContentBlock = serde_json::from_str(&encoded).expect("deserialize");
+        assert!(matches!(
+            decoded,
+            ContentBlock::ToolUse { thought_signature, .. }
+                if thought_signature.as_deref() == Some("SIG_PERSIST")
+        ));
+    }
 }

The google.rs changes are thorough. Let me review the remaining diffs to understand the full picture, especially the streaming accumulation path and the mechanical `thought_signature: None` additions in other providers.

diff --git a/src-rust/crates/api/src/protocol/openai_chat.rs b/src-rust/crates/api/src/protocol/openai_chat.rs
index 6c7b525..075a416 100644
--- a/src-rust/crates/api/src/protocol/openai_chat.rs
+++ b/src-rust/crates/api/src/protocol/openai_chat.rs
@@ -225,6 +225,7 @@ impl OpenAiChatDecoder {
                             id: tc_id.to_string(),
                             name,
                             input: json!({}),
+                            thought_signature: None,
                         },
                     });
                 }
diff --git a/src-rust/crates/api/src/providers/azure.rs b/src-rust/crates/api/src/providers/azure.rs
index 48b136a..496603f 100644
--- a/src-rust/crates/api/src/providers/azure.rs
+++ b/src-rust/crates/api/src/providers/azure.rs
@@ -377,6 +377,7 @@ impl LlmProvider for AzureProvider {
                                         id: tc_id.to_string(),
                                         name,
                                         input: serde_json::json!({}),
+                                        thought_signature: None,
                                     },
                                 });
                             }
diff --git a/src-rust/crates/api/src/providers/bedrock.rs b/src-rust/crates/api/src/providers/bedrock.rs
index 9169465..ddad86e 100644
--- a/src-rust/crates/api/src/providers/bedrock.rs
+++ b/src-rust/crates/api/src/providers/bedrock.rs
@@ -373,7 +373,7 @@ impl BedrockProvider {
                     None
                 }
             }
-            ContentBlock::ToolUse { id, name, input } => Some(json!({
+            ContentBlock::ToolUse { id, name, input, .. } => Some(json!({
                 "toolUse": {
                     "toolUseId": id,
                     "name": name,
@@ -595,7 +595,12 @@ impl BedrockProvider {
                         .unwrap_or("")
                         .to_string();
                     let input = tu.get("input").cloned().unwrap_or(json!({}));
-                    return Some(ContentBlock::ToolUse { id, name, input });
+                    return Some(ContentBlock::ToolUse {
+                        id,
+                        name,
+                        input,
+                        thought_signature: None,
+                    });
                 }
                 None
             })
@@ -834,6 +839,7 @@ fn parse_bedrock_event(
                     id,
                     name,
                     input: json!({}),
+                    thought_signature: None,
                 },
             }));
         } else {
diff --git a/src-rust/crates/api/src/providers/codex.rs b/src-rust/crates/api/src/providers/codex.rs
index 748a852..38a7df3 100644
--- a/src-rust/crates/api/src/providers/codex.rs
+++ b/src-rust/crates/api/src/providers/codex.rs
@@ -492,7 +492,12 @@ impl CodexProvider {
                         .and_then(|v| v.as_str())
                         .unwrap_or("{}");
                     let input = serde_json::from_str(args).unwrap_or_else(|_| json!({}));
-                    content.push(ContentBlock::ToolUse { id, name, input });
+                    content.push(ContentBlock::ToolUse {
+                        id,
+                        name,
+                        input,
+                        thought_signature: None,
+                    });
                 }
                 _ => {}
             }
@@ -705,6 +710,7 @@ impl LlmProvider for CodexProvider {
                                                         id: call_id,
                                                         name,
                                                         input: json!({}),
+                                                        thought_signature: None,
                                                     },
                                                 });
                                             }
diff --git a/src-rust/crates/api/src/providers/cohere.rs b/src-rust/crates/api/src/providers/cohere.rs
index 2cdf201..468ec94 100644
--- a/src-rust/crates/api/src/providers/cohere.rs
+++ b/src-rust/crates/api/src/providers/cohere.rs
@@ -230,7 +230,12 @@ impl CohereProvider {
                         .unwrap_or("{}");
                     let input: Value =
                         serde_json::from_str(input_str).unwrap_or_else(|_| json!({}));
-                    content_blocks.push(ContentBlock::ToolUse { id, name, input });
+                    content_blocks.push(ContentBlock::ToolUse {
+                        id,
+                        name,
+                        input,
+                        thought_signature: None,
+                    });
                 }
             }
         }
@@ -554,6 +559,7 @@ impl LlmProvider for CohereProvider {
                                         id: tc_id,
                                         name: tc_name,
                                         input: json!({}),
+                                        thought_signature: None,
                                     },
                                 });
                             }
diff --git a/src-rust/crates/api/src/providers/copilot.rs b/src-rust/crates/api/src/providers/copilot.rs
index 16ce3f4..cbb3211 100644
--- a/src-rust/crates/api/src/providers/copilot.rs
+++ b/src-rust/crates/api/src/providers/copilot.rs
@@ -371,6 +371,7 @@ impl CopilotProvider {
                                     id,
                                     name,
                                     input: tool_input,
+                                    ..
                                 } => {
                                     flush_assistant_content(&mut input, &mut message_parts);
                                     input.push(json!({
@@ -551,7 +552,12 @@ impl CopilotProvider {
                         .and_then(|value| value.as_str())
                         .unwrap_or("{}");
                     let input = serde_json::from_str(args).unwrap_or_else(|_| json!({}));
-                    content.push(ContentBlock::ToolUse { id, name, input });
+                    content.push(ContentBlock::ToolUse {
+                        id,
+                        name,
+                        input,
+                        thought_signature: None,
+                    });
                 }
                 _ => {}
             }
@@ -660,10 +666,11 @@ impl CopilotProvider {
             for (index, block) in response.content.iter().enumerate() {
                 let start_block = match block {
                     ContentBlock::Text { .. } => ContentBlock::Text { text: String::new() },
-                    ContentBlock::ToolUse { id, name, .. } => ContentBlock::ToolUse {
+                    ContentBlock::ToolUse { id, name, thought_signature, .. } => ContentBlock::ToolUse {
                         id: id.clone(),
                         name: name.clone(),
                         input: json!({}),
+                        thought_signature: thought_signature.clone(),
                     },
                     ContentBlock::Thinking { .. } => ContentBlock::Thinking {
                         thinking: String::new(),
@@ -1051,6 +1058,7 @@ impl LlmProvider for CopilotProvider {
                                         id: tc_id.to_string(),
                                         name,
                                         input: serde_json::json!({}),
+                                        thought_signature: None,
                                     },
                                 });
                             }
diff --git a/src-rust/crates/api/src/providers/message_normalization.rs b/src-rust/crates/api/src/providers/message_normalization.rs
index 155a3e0..d1addd9 100644
--- a/src-rust/crates/api/src/providers/message_normalization.rs
+++ b/src-rust/crates/api/src/providers/message_normalization.rs
@@ -122,6 +122,7 @@ mod tests {
                 id: "call:1/abc".to_string(),
                 name: "search".to_string(),
                 input: json!({"q": "test"}),
+                thought_signature: None,
             }]),
             Message::user_blocks(vec![ContentBlock::ToolResult {
                 tool_use_id: "call:1/abc".to_string(),
diff --git a/src-rust/crates/api/src/providers/minimax.rs b/src-rust/crates/api/src/providers/minimax.rs
index de6e7f5..99610fc 100644
--- a/src-rust/crates/api/src/providers/minimax.rs
+++ b/src-rust/crates/api/src/providers/minimax.rs
@@ -158,6 +158,7 @@ impl MinimaxProvider {
                             id,
                             name,
                             input: serde_json::Value::Object(Default::default()),
+                            thought_signature: None,
                         }
                     }
                     _ => return None,
diff --git a/src-rust/crates/api/src/providers/openai.rs b/src-rust/crates/api/src/providers/openai.rs
index 447084e..befc16a 100644
--- a/src-rust/crates/api/src/providers/openai.rs
+++ b/src-rust/crates/api/src/providers/openai.rs
@@ -249,7 +249,7 @@ impl OpenAiProvider {
                 ContentBlock::Text { text } => {
                     text_parts.push(text.as_str());
                 }
-                ContentBlock::ToolUse { id, name, input } => {
+                ContentBlock::ToolUse { id, name, input, .. } => {
                     let args = serde_json::to_string(input).unwrap_or_default();
                     tool_calls.push(json!({
                         "id": id,
@@ -492,7 +492,12 @@ impl OpenAiProvider {
                     .unwrap_or("{}");
                 let input: Value =
                     serde_json::from_str(args_str).unwrap_or(json!({}));
-                content_blocks.push(ContentBlock::ToolUse { id, name, input });
+                content_blocks.push(ContentBlock::ToolUse {
+                    id,
+                    name,
+                    input,
+                    thought_signature: None,
+                });
             }
         }
 
@@ -628,6 +633,7 @@ mod tests {
                 id: "call_1".to_string(),
                 name: "search".to_string(),
                 input: json!({ "q": "test" }),
+                thought_signature: None,
             }]),
             Message::user_blocks(vec![ContentBlock::ToolResult {
                 tool_use_id: "call_1".to_string(),
@@ -905,6 +911,7 @@ impl LlmProvider for OpenAiProvider {
                                         id: tc_id.to_string(),
                                         name,
                                         input: json!({}),
+                                        thought_signature: None,
                                     },
                                 });
                             }
diff --git a/src-rust/crates/api/src/transformers/anthropic.rs b/src-rust/crates/api/src/transformers/anthropic.rs
index f920681..e945fea 100644
--- a/src-rust/crates/api/src/transformers/anthropic.rs
+++ b/src-rust/crates/api/src/transformers/anthropic.rs
@@ -200,6 +200,7 @@ impl MessageTransformer for AnthropicTransformer {
                         id: tool_id,
                         name,
                         input,
+                        thought_signature: None,
                     });
                 }
                 "thinking" => {

Now the remaining files (api/lib.rs, query, commands, tui).

diff --git a/src-rust/crates/api/src/lib.rs b/src-rust/crates/api/src/lib.rs
index 3a64e15..8fefb0c 100644
--- a/src-rust/crates/api/src/lib.rs
+++ b/src-rust/crates/api/src/lib.rs
@@ -92,9 +92,9 @@ pub use providers::OpenAiProvider;
 
 // Phase 3 re-exports — model registry.
 pub use model_registry::{
-    CostBreakdown, CostTier, CostTierCondition, ExperimentalMode, InterleavedReasoning, Modality,
-    ModelEntry, ModelRegistry, ModelStatus, ProviderEntry, ProviderOverride,
-    effective_model_for_config,
+    CostBreakdown, CostTier, CostTierCondition, ExperimentalMode, InterleavedReasoning, Modality,
+    ModelEntry, ModelRegistry, ModelStatus, ProviderEntry, ProviderOverride,
+    effective_model_for_config,
 };
 pub use effort_support::{model_is_reasoning, supported_efforts, variant_ladder};
 pub use variants::{
@@ -209,14 +209,14 @@ pub mod types {
     pub struct ThinkingConfig {
         #[serde(rename = "type")]
         pub thinking_type: String,
-        #[serde(default, skip_serializing_if = "is_zero")]
+        #[serde(default, skip_serializing_if = "is_zero")]
         pub budget_tokens: u32,
     }
 
-    fn is_zero(value: &u32) -> bool {
-        *value == 0
-    }
-
+    fn is_zero(value: &u32) -> bool {
+        *value == 0
+    }
+
     impl ThinkingConfig {
         pub fn enabled(budget: u32) -> Self {
             Self {
@@ -224,13 +224,13 @@ pub mod types {
                 budget_tokens: budget,
             }
         }
-
-        pub fn adaptive() -> Self {
-            Self {
-                thinking_type: "adaptive".to_string(),
-                budget_tokens: 0,
-            }
-        }
+
+        pub fn adaptive() -> Self {
+            Self {
+                thinking_type: "adaptive".to_string(),
+                budget_tokens: 0,
+            }
+        }
     }
 
     /// System prompt - either a single string or structured blocks with cache.
@@ -1488,7 +1488,12 @@ impl StreamAccumulator {
                         PartialBlock::ToolUse { id, name, json_buf } => {
                             let input = serde_json::from_str(&json_buf)
                                 .unwrap_or(Value::Object(Default::default()));
-                            ContentBlock::ToolUse { id, name, input }
+                            ContentBlock::ToolUse {
+                                id,
+                                name,
+                                input,
+                                thought_signature: None,
+                            }
                         }
                         PartialBlock::Thinking {
                             thinking_buf,
diff --git a/src-rust/crates/commands/src/export.rs b/src-rust/crates/commands/src/export.rs
index 8f35915..3e98fed 100644
--- a/src-rust/crates/commands/src/export.rs
+++ b/src-rust/crates/commands/src/export.rs
@@ -43,7 +43,7 @@ fn export_message_to_markdown(
                     ContentBlock::Text { text } => {
                         text_parts.push(text.as_str());
                     }
-                    ContentBlock::ToolUse { id, name, input } => {
+                    ContentBlock::ToolUse { id, name, input, .. } => {
                         tool_uses.push((id.as_str(), name.as_str(), input));
                     }
                     ContentBlock::Thinking { thinking, .. } => {
diff --git a/src-rust/crates/commands/src/stats.rs b/src-rust/crates/commands/src/stats.rs
index 64b1c22..e997b1b 100644
--- a/src-rust/crates/commands/src/stats.rs
+++ b/src-rust/crates/commands/src/stats.rs
@@ -1236,6 +1236,7 @@ mod tests {
                 id: format!("tu-{i}"),
                 name: t.to_string(),
                 input: serde_json::json!({}),
+                thought_signature: None,
             });
         }
         TranscriptEntry::Assistant(TranscriptMessage {
diff --git a/src-rust/crates/query/src/compact.rs b/src-rust/crates/query/src/compact.rs
index 06e7542..77fc67c 100644
--- a/src-rust/crates/query/src/compact.rs
+++ b/src-rust/crates/query/src/compact.rs
@@ -992,7 +992,7 @@ async fn summarise_head(
         if let MessageContent::Blocks(blocks) = &msg.content {
             for block in blocks {
                 match block {
-                    ContentBlock::ToolUse { name, input, id } => {
+                    ContentBlock::ToolUse { name, input, id, .. } => {
                         transcript.push_str(&format!(
                             "[Tool Call: {} (id={})]\nInput: {}\n\n",
                             name, id, input
@@ -1734,6 +1734,7 @@ mod tests {
             id: id.to_string(),
             name: name.to_string(),
             input,
+            thought_signature: None,
         }])
     }
 
diff --git a/src-rust/crates/query/src/lib.rs b/src-rust/crates/query/src/lib.rs
index ab07178..5e67edf 100644
--- a/src-rust/crates/query/src/lib.rs
+++ b/src-rust/crates/query/src/lib.rs
@@ -1001,8 +1001,11 @@ pub async fn run_query_loop(
                     // Accumulate reasoning/thinking content for providers like
                     // DeepSeek that require reasoning_content to be sent back.
                     let mut thinking_chunks: Vec<String> = Vec::new();
-                    // tool_call_blocks: index → (id, name, accumulated_json)
-                    let mut tool_call_blocks: std::collections::HashMap<usize, (String, String, String)> =
+                    // tool_call_blocks: index → (id, name, accumulated_json, thought_signature)
+                    // thought_signature carries Gemini's opaque per-call signature
+                    // through stream assembly so it survives into the persisted
+                    // ToolUse block and is echoed back next turn (#311).
+                    let mut tool_call_blocks: std::collections::HashMap<usize, (String, String, String, Option<String>)> =
                         std::collections::HashMap::new();
                     let mut usage = UsageInfo::default();
                     let mut stop_str = "end_turn".to_string();
@@ -1054,9 +1057,9 @@ pub async fn run_query_loop(
                                             }
                                             claurst_api::StreamEvent::ContentBlockStart {
                                                 index,
-                                                content_block: ContentBlock::ToolUse { id, name, .. },
+                                                content_block: ContentBlock::ToolUse { id, name, thought_signature, .. },
                                             } => {
-                                                tool_call_blocks.insert(*index, (id.clone(), name.clone(), String::new()));
+                                                tool_call_blocks.insert(*index, (id.clone(), name.clone(), String::new(), thought_signature.clone()));
                                             }
                                             claurst_api::StreamEvent::TextDelta { text, .. } => {
                                                 text_chunks.push(text.clone());
@@ -1068,7 +1071,7 @@ pub async fn run_query_loop(
                                                 thinking_chunks.push(reasoning.clone());
                                             }
                                             claurst_api::StreamEvent::InputJsonDelta { index, partial_json } => {
-                                                if let Some((_, _, buf)) = tool_call_blocks.get_mut(index) {
+                                                if let Some((_, _, buf, _)) = tool_call_blocks.get_mut(index) {
                                                     buf.push_str(partial_json);
                                                 }
                                             }
@@ -1177,7 +1180,7 @@ pub async fn run_query_loop(
                     let mut malformed_tool_calls: std::collections::HashSet<String> =
                         std::collections::HashSet::new();
                     for idx in tc_indices {
-                        if let Some((id, name, json_str)) = tool_call_blocks.remove(&idx) {
+                        if let Some((id, name, json_str, thought_signature)) = tool_call_blocks.remove(&idx) {
                             let input = match parse_tool_args(&json_str) {
                                 Ok(v) => v,
                                 Err(e) => {
@@ -1193,7 +1196,7 @@ pub async fn run_query_loop(
                                     serde_json::json!({})
                                 }
                             };
-                            content_blocks.push(ContentBlock::ToolUse { id, name, input });
+                            content_blocks.push(ContentBlock::ToolUse { id, name, input, thought_signature });
                         }
                     }
 
@@ -1216,7 +1219,7 @@ pub async fn run_query_loop(
 
                     // Handle tool-use turn: execute tools and loop.
                     let tool_use_blocks: Vec<_> = content_blocks.iter().filter_map(|b| {
-                        if let ContentBlock::ToolUse { id, name, input } = b {
+                        if let ContentBlock::ToolUse { id, name, input, .. } = b {
                             Some((id.clone(), name.clone(), input.clone()))
                         } else {
                             None
@@ -1857,7 +1860,7 @@ pub async fn run_query_loop(
                 // Phase 1: sequential pre-hook pass.
                 let mut prepared: Vec<PreparedTool> = Vec::with_capacity(tool_blocks.len());
                 for block in tool_blocks {
-                    if let ContentBlock::ToolUse { id, name, input } = block {
+                    if let ContentBlock::ToolUse { id, name, input, .. } = block {
                         // Clone from the references returned by get_tool_use_blocks()
                         let id = id.clone();
                         let name = name.clone();
@@ -2770,6 +2773,7 @@ mod tests {
                             id: tool_id,
                             name: "noop_tool".to_string(),
                             input: serde_json::json!({}),
+                            thought_signature: None,
                         },
                     }),
                     Ok(StreamEvent::InputJsonDelta {
diff --git a/src-rust/crates/query/src/sanitize.rs b/src-rust/crates/query/src/sanitize.rs
index f3dd527..6f87fe3 100644
--- a/src-rust/crates/query/src/sanitize.rs
+++ b/src-rust/crates/query/src/sanitize.rs
@@ -209,6 +209,7 @@ mod tests {
             id: id.to_string(),
             name: "Read".to_string(),
             input: serde_json::json!({ "path": "/tmp/x" }),
+            thought_signature: None,
         }
     }
 
diff --git a/src-rust/crates/query/src/session_memory.rs b/src-rust/crates/query/src/session_memory.rs
index 6e50364..2165fdd 100644
--- a/src-rust/crates/query/src/session_memory.rs
+++ b/src-rust/crates/query/src/session_memory.rs
@@ -476,6 +476,7 @@ mod tests {
             id: "tool-123".to_string(),
             name: "bash".to_string(),
             input: serde_json::json!({"command": "ls"}),
+            thought_signature: None,
         }]);
         // Last assistant has tool_use → extraction should be deferred
         assert!(!SessionMemoryExtractor::should_extract(&msgs));
diff --git a/src-rust/crates/tui/src/lib.rs b/src-rust/crates/tui/src/lib.rs
index 0e4ea4a..0201e13 100644
--- a/src-rust/crates/tui/src/lib.rs
+++ b/src-rust/crates/tui/src/lib.rs
@@ -1279,6 +1279,7 @@ mod tests {
                 id: "toolu_1".to_string(),
                 name: "read_file".to_string(),
                 input: serde_json::json!({ "path": "README.md" }),
+                thought_signature: None,
             },
             ContentBlock::Text {
                 text: "Done".to_string(),
diff --git a/src-rust/crates/tui/src/message_copy.rs b/src-rust/crates/tui/src/message_copy.rs
index a4b4c9d..b6fcc4c 100644
--- a/src-rust/crates/tui/src/message_copy.rs
+++ b/src-rust/crates/tui/src/message_copy.rs
@@ -30,7 +30,7 @@ pub fn copy_as_markdown(message: &Message) -> String {
                             signature, thinking
                         ))
                     }
-                    claurst_core::ContentBlock::ToolUse { id, name, input } => {
+                    claurst_core::ContentBlock::ToolUse { id, name, input, .. } => {
                         // Format tool use as code block
                         Some(format!(
                             "```json\n// Tool: {}\n// ID: {}\n{}\n```",
@@ -330,7 +330,7 @@ fn format_block_for_json(block: &claurst_core::ContentBlock) -> String {
     match block {
         claurst_core::ContentBlock::Text { text } => text.clone(),
         claurst_core::ContentBlock::Image { .. } => "[Image content]".to_string(),
-        claurst_core::ContentBlock::ToolUse { id, name, input } => {
+        claurst_core::ContentBlock::ToolUse { id, name, input, .. } => {
             format!(
                 "[Tool: {} (ID: {})]\n{}",
                 name,
diff --git a/src-rust/crates/tui/src/messages/mod.rs b/src-rust/crates/tui/src/messages/mod.rs
index 8f881d3..7f88277 100644
--- a/src-rust/crates/tui/src/messages/mod.rs
+++ b/src-rust/crates/tui/src/messages/mod.rs
@@ -1627,7 +1627,7 @@ pub fn render_message(msg: &Message, ctx: &RenderContext) -> Vec<Line<'static>>
                     ctx.width,
                 ));
             }
-            ContentBlock::ToolUse { id, name, input } => {
+            ContentBlock::ToolUse { id, name, input, .. } => {
                 flush_text(&mut lines, &msg.role, &mut pending_text, ctx);
                 let rendered = render_tool_use_inner(&name, &input);
                 // Silence unused-variable warning on id — kept for symmetry with ToolResult lookup.
@@ -2090,6 +2090,7 @@ mod tests {
                 id: "tool-1".to_string(),
                 name: "read_file".to_string(),
                 input: serde_json::json!({ "path": "README.md" }),
+                thought_signature: None,
             },
             ContentBlock::ToolResult {
                 tool_use_id: "tool-1".to_string(),
@@ -2289,6 +2290,7 @@ mod tests {
             id: "tu-1".to_string(),
             name: "Bash".to_string(),
             input: serde_json::json!({"command": "ls -la"}),
+            thought_signature: None,
         }]);
         let rendered = render_message(&msg, &RenderContext::default())
             .into_iter()
@@ -2306,6 +2308,7 @@ mod tests {
             id: "tu-2".to_string(),
             name: "Read".to_string(),
             input: serde_json::json!({"file_path": "/tmp/foo.txt"}),
+            thought_signature: None,
         }]);
         let rendered = render_message(&msg, &RenderContext::default())
             .into_iter()
@@ -2326,6 +2329,7 @@ mod tests {
                 "subagent_type": "explore",
                 "description": "Trace the auth flow"
             }),
+            thought_signature: None,
         }]);
         let rendered = render_message(&msg, &RenderContext::default())
             .into_iter()