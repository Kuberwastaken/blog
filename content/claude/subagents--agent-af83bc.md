---
title: "subagents · agent-af83bc"
---

You are implementing a feature in Megaphone, a fully-local macOS dictation app (Swift, plain Makefile + swiftc). You are in an isolated git worktree of ~/dev/scratch/freeflow.

# CRITICAL first step — correct base branch
The worktree may start on the WRONG base (upstream zachlatta/freeflow). Run: `git fetch megaphone && git checkout -b feat/formality-dial megaphone/main` and confirm HEAD is "chore: prepare Megaphone 1.1.6" (88e311d) or newer and `Sources/ScreenTextService.swift` exists. Do not proceed until true.

# Architecture context (trust this, then verify by reading code)
- `Sources/AppleFoundationModelsPostProcessor.swift`: `AppWritingContext` enum (email / workChat / casualChat / document / codeOrTerminal / neutral) classifies the frontmost app; `cleanupGuidance(markdown:)` and `commandGuidance(markdown:)` produce per-context prompt guidance consumed by `cleanupPrompt(for:)`, `selectionPrompt(...)`, `commandPrompt(...)`. The on-device model is SMALL and prompt-fragile: short imperative guidance beats prose.
- A core cleanup principle in the instructions is "preserve the speaker's tone" — your formality feature must be worded as the USER'S OWN standing preference for how their words are polished (register/punctuation choices), NOT as a rewrite instruction; it must never cause the model to rephrase meaning.
- `Sources/AppState.swift` settings pattern: storage key + @Published didSet + init load + init assignment. `SmartCleanupRequest` is constructed in `processTranscript`.
- `Sources/SettingsView.swift` for UI; find a fitting existing section (e.g. near cleanup mode / writing settings) and match style.
- Tests: `Tests/AppContextServiceTests.swift` hand-rolled runner. Makefile TEST_RUNNER lists compiled files — update BOTH occurrences if you add a source file.

# Feature: per-context formality dial (Wispr Flow's "Personalized Style")
1. New enum `WritingFormality: String, Codable`: `casual`, `balanced` (default — current behavior, adds NOTHING to prompts), `formal`. Place it in the postprocessor file or a small new file included in the test target.
2. User setting: a formality per writing-context bucket for these five: email, workChat, casualChat, document, neutral (codeOrTerminal is exempt — always technical). Storage: a single UserDefaults dictionary (e.g. `writing_formality_by_context` as [String: String]), default all-balanced. AppState exposes it @Published with the usual pattern.
3. Plumbing: `SmartCleanupRequest` gains `formality: WritingFormality` (default `.balanced` as a default parameter so existing constructions compile). AppState resolves the bucket via `AppWritingContext.classify` on the captured context and looks up the user's dial. Same plumb-through for `commandPrompt`/`executeCommand` and `selectionPrompt`/`transformSelection` (default params).
4. Prompt effect: `cleanupGuidance(markdown:formality:)` (and command variant) append ONE short sentence only when not balanced. Suggested starting points (iterate if live validation misbehaves): casual → "The speaker prefers a relaxed register: contractions are welcome and punctuation stays light." formal → "The speaker prefers a polished register: full sentences, no slang, professional punctuation." The sentence must be phrased as polish preference, never "rewrite/make it formal".
5. Settings UI: "Writing style" group — five labeled rows (Email, Work chat, Personal chat, Documents, Everything else) each with a three-segment Picker (Casual / Balanced / Formal). Compact, matching existing styles.
6. Tests: default is balanced and adds nothing to the prompt; casual/formal add their sentence; codeOrTerminal ignores formality; storage round-trip if you add codable logic.
7. LIVE VALIDATION (required): compile a harness with the real postprocessor (`swiftc -parse-as-library -o h h.swift Sources/AppleFoundationModelsPostProcessor.swift` on the Mac) and run real `cleanup(...)` on a transcript like "hey uh can you send me the report by friday thanks" under (a) email+formal, (b) casualChat+casual, (c) balanced — verify formal output is professional without inventing content, casual keeps it loose, balanced matches current behavior, and meaning is NEVER changed. Include outputs in your report; iterate wording if needed.

# Build/verify loop (valerie cannot compile Swift — use the user's Mac over ssh)
- `rsync -aq --delete Sources Tests Launcher Resources Makefile Info.plist Megaphone.entitlements mac:/tmp/mega-formality/`
- `ssh mac 'cd /tmp/mega-formality && make test'` → "MegaphoneTests passed"
- `ssh mac 'cd /tmp/mega-formality && make CODESIGN_IDENTITY=- 2>&1 | grep -E " error"'` → zero errors, no NEW warnings from your code
- Only /tmp/mega-formality on the Mac. Never touch /Applications or anything else — user's active machine.

# Finish
Commit on `feat/formality-dial` conventionally (NEVER any Co-Authored-By or Claude/AI trailer). Do NOT push. Return: branch, files changed, final guidance wording, live-validation outputs, test/build results verbatim, caveats.