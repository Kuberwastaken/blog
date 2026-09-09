---
title: "subagents · agent-afab08"
---

You are refactoring the multi-turn "/goal" autonomy of a Rust agent from a cross-turn bolt-on into an in-loop continuation policy. Work ONLY inside the git worktree at /Users/kuber.mehta/Personal-Projects/claurst-wt-230/src-rust (isolated checkout on branch refactor/230-goal-inloop). Use absolute paths. DO NOT touch other worktrees or /Users/kuber.mehta/Personal-Projects/claurst. Behavior must stay equivalent or better — do not break normal (non-goal) turns, which must still stop after one turn.

## Issue #230 (MI-3): make /goal an in-loop continuation policy + max-steps graceful degradation
Today `/goal` is a cross-turn bolt-on: `check_and_continue_goal` (`crates/query/src/goal_loop.rs`) is called by the CLI REPL (`crates/cli/src/main.rs`) AFTER `run_query_loop` returns, and re-dispatches a whole new turn. Its guards (runaway `MAX_GOAL_TURNS`, soft token budget, continuation message) live outside the loop. The goal addendum is injected into the system prompt in the CLI (~main.rs:2779).

### Reference (read-only, MAIN tree)
- pi `/Users/kuber.mehta/Personal-Projects/claurst/refs/pi/packages/agent/src/agent-loop.ts` — its callback shape: `shouldStopAfterTurn`, `getFollowUpMessages`, `prepareNextTurn`, and the `agentLoopContinue` primitive for "keep going without a new user message."
- opencode `/Users/kuber.mehta/Personal-Projects/claurst/refs/opencode` — grep `max-steps` / `maxSteps`: at the step limit it sets `toolChoice:"none"`, drops tools, and forces a final text summary (graceful degradation) instead of hard-stopping.

## What to build
1. **In-loop continuation policy.** Introduce a small continuation abstraction the runner consults at the end of each turn (mirror pi's callbacks): after a turn completes with `end_turn` (no tool calls), instead of ALWAYS returning, ask a policy "should we continue, and if so with what follow-up message?" The default policy = stop (current non-goal behavior EXACTLY). The GOAL policy (built from the existing `GoalStore`/`goal_loop.rs` logic: runaway guard, token budget, `goal_continuation_message`) = if the goal is still active and guards allow, continue the loop with the continuation message injected as the next user turn; else stop (and surface the same paused/among messages as today). Move the decision INTO `run_query_loop` (or a helper it calls) so continuation no longer requires the CLI REPL to re-dispatch. Keep the goal system-prompt addendum applied per turn (it can move into the loop's per-turn setup or stay where it is if cleaner). The CLI's post-loop `check_and_continue_goal` re-dispatch should be removed/reduced to just kicking off the loop with goal mode enabled.
2. **Max-steps graceful degradation.** When `effective_max_turns` is reached, instead of returning cold, run ONE final turn with tools DISABLED (no tool definitions / tool_choice none, per how the provider request is built) that asks the model to summarize progress and stopping point. Then return. Applies to both goal and non-goal runs that hit the turn cap. Guard against infinite recursion (the degradation turn itself must not re-trigger).
3. **Small completion for #233** (separate commit): in `run_query_loop`, populate `config.enabled_tools = Some(<names of the tools this run exposes>)` from the loop's tools vec before the system prompt is built, so the top-level interactive session gets the conditional-guideline trimming that #233 wired up to that boundary. (One-liner-ish; `QueryConfig.enabled_tools` already exists.)

Keep the goal commands (`/goal set|resume|status`), the runaway/budget guards, and their user-facing messages behaviorally intact — you're relocating WHERE continuation is decided, not changing the guards. Don't hold locks across `.await`.

## Verifying layer (required)
Tests: (a) a non-goal turn ending with `end_turn` stops after one turn (unchanged); (b) a goal-active session continues in-loop with the continuation message when guards allow, and stops when the runaway/budget guard trips (assert the same paused outcome); (c) hitting `effective_max_turns` produces a final tool-less summary turn rather than a cold return (mock the provider; assert tools were disabled on that last request and the loop then ends). Extract policy/decision logic into testable helpers where the loop makes it hard to test inline.

## Commits — IMPORTANT
Sequential, logically-scoped commits (do NOT push/PR/merge — local only). E.g.: commit 1 = continuation-policy abstraction + default(stop) policy; commit 2 = goal policy from goal_loop guards, decided in-loop; commit 3 = remove CLI post-loop re-dispatch; commit 4 = max-steps graceful degradation; commit 5 = populate enabled_tools (#233 completion); commit 6 = tests. Clean conventional messages (`refactor(query): ...`, `feat(query): ...`). NO `Co-Authored-By`/"Generated with" trailers.

## Build check
`cargo check -p claurst-query -p claurst` and `cargo test -p claurst-query`, plus `cargo check --workspace`; all green.

## Report back
`git log --oneline`, the continuation-policy design (how goal vs default differ, how guards are preserved), how max-steps degradation works (and its anti-recursion guard), confirmation the CLI no longer re-dispatches, the enabled_tools completion, the tests, and cargo results. Be honest about anything deferred. Stay within #230.