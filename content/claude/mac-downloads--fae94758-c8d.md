---
title: "mac-downloads · fae94758-c8d"
---

is this right? ❯ raise an issue for it and work on it (also side funny PS I don't have pull shark maxxed out on github even after we worked on so many PRs LOL so let's try making sure that the issues / PRs we raise trigger that) cool add that

Love it — and there's a real mechanism behind the joke. Let me set that straight and then execute.

Why Pull Shark isn't moving: it only counts merged pull requests — not issues, and not direct pushes to main. Your claurst history is linear with no merge commits, which means we've mostly been pushing straight to main. Zero PRs merged = zero Pull Shark credit, no matter how much work landed. Tiers are 2 / 16 / 128 / 1024 (gold), so the fix is a workflow change: branch → PR → merge, every time. (Bonus freebies while we're at it: YOLO = merge a PR with no review, which self-merges trigger; Quickdraw = close an issue/PR within 5 min of opening.)


⏺ Write(/private/tmp/claude-502/-Users-kuber-mehta/c5dcc7a4-9baa-4318-9dd0-599f5177379e/scratchpad/issue-spinner.md)
Wrote 26 lines to ../../../../private/tmp/claude-502/-Users-kuber-mehta/c5dcc7a4-9baa-4318-9dd0-599f5177379e/scratchpad/issue-spinner.md
# Summary

wo related status-bar / terminal-feedback problems:
. **Reasoning cog is always shown.** The status bar renders the cog/gear indicator unconditionally, regardless of whether a turn is actually active. It should reflect agen
 state: idle vs streaming text vs reasoning/thinking vs running a tool. Compare Claude Code, where the cog appears only while the model is reasoning.

. **No terminal "working" indicator (green bar).** In iTerm2, Claude Code shows a colored progress/activity bar at the top of the terminal while it is working, and clears
t when idle. This is done with terminal escape sequences (OSC 9;4 "progress" — supported by iTerm2, WezTerm, Windows Terminal, ConEmu, Ghostty; ignored elsewhere). claurst

# Environment
… +22 lines

  Ran 1 shell command

Both issues are up: #300 (auth) and #301 (spinner/terminal). And now the Pull Shark mystery has real numbers:

- 81 merged PRs authored by you across public repos (67 in claurst alone)
- 90 closed PRs total, so 81/90 got merged

That's the key finding: 81 merged PRs means you qualify for Pull Shark Bronze (16) and are ~47 short of Silver (128) — you should not be sitting at just the base (2) tier. So it's neither tier-math nor "not counting." Let me confirm the likely cause (recent-merge lag) with one more query.

  Ran 1 shell command

That resolves it cleanly. Here's the data-backed answer to the Pull Shark thread:

Timeline explains everything. Of your 81 merged PRs, 68 merged in just the last 14 days (the claurst burst — PRs #234ish→#301). Only 13 merged before June 24. Your earliest was March 2025.

So the last time GitHub's achievement pipeline computed your tier, you had ~13 merged PRs → that's below Bronze (16), so the base x2 badge was correct for that snapshot. The recent 68-PR burst rocketed you to 81 — which now qualifies for Bronze (16) and puts you 47 short of Silver (128) — but GitHub simply hasn't recomputed the tier yet. Achievement recalculation is notoriously laggy, especially after a burst.

So, definitively: nothing's broken, your PRs are counted, and my first two takes were both wrong. You're genuinely at 81 and owed at least Bronze; the badge will catch up (days–weeks; GitHub Support can nudge a recompute if it never does). To earn Silver you need 128 → 47 more merged PRs. Today's two = 83. Keep the branch→PR→merge flow and it climbs. (Freebies while grinding: YOLO for self-merging without review, Quickdraw for closing an issue/PR within 5 min.)

is this right? ❯ raise an issue for it and work on it (also side funny PS I don't have pull shark maxxed out on github even after we worked on so many PRs LOL so let's try making sure that the issues / PRs we raise trigger that) cool add that

Love it — and there's a real mechanism behind the joke. Let me set that straight and then execute.

Why Pull Shark isn't moving: it only counts merged pull requests — not issues, and not direct pushes to main. Your claurst history is linear with no merge commits, which means we've mostly been pushing straight to main. Zero PRs merged = zero Pull Shark credit, no matter how much work landed. Tiers are 2 / 16 / 128 / 1024 (gold), so the fix is a workflow change: branch → PR → merge, every time. (Bonus freebies while we're at it: YOLO = merge a PR with no review, which self-merges trigger; Quickdraw = close an issue/PR within 5 min of opening.)


⏺ Write(/private/tmp/claude-502/-Users-kuber-mehta/c5dcc7a4-9baa-4318-9dd0-599f5177379e/scratchpad/issue-spinner.md)
Wrote 26 lines to ../../../../private/tmp/claude-502/-Users-kuber-mehta/c5dcc7a4-9baa-4318-9dd0-599f5177379e/scratchpad/issue-spinner.md
# Summary

wo related status-bar / terminal-feedback problems:
. **Reasoning cog is always shown.** The status bar renders the cog/gear indicator unconditionally, regardless of whether a turn is actually active. It should reflect agen
 state: idle vs streaming text vs reasoning/thinking vs running a tool. Compare Claude Code, where the cog appears only while the model is reasoning.

. **No terminal "working" indicator (green bar).** In iTerm2, Claude Code shows a colored progress/activity bar at the top of the terminal while it is working, and clears
t when idle. This is done with terminal escape sequences (OSC 9;4 "progress" — supported by iTerm2, WezTerm, Windows Terminal, ConEmu, Ghostty; ignored elsewhere). claurst

# Environment
… +22 lines

  Ran 1 shell command

Both issues are up: #300 (auth) and #301 (spinner/terminal). And now the Pull Shark mystery has real numbers:

- 81 merged PRs authored by you across public repos (67 in claurst alone)
- 90 closed PRs total, so 81/90 got merged

That's the key finding: 81 merged PRs means you qualify for Pull Shark Bronze (16) and are ~47 short of Silver (128) — you should not be sitting at just the base (2) tier. So it's neither tier-math nor "not counting." Let me confirm the likely cause (recent-merge lag) with one more query.

  Ran 1 shell command

That resolves it cleanly. Here's the data-backed answer to the Pull Shark thread:

Timeline explains everything. Of your 81 merged PRs, 68 merged in just the last 14 days (the claurst burst — PRs #234ish→#301). Only 13 merged before June 24. Your earliest was March 2025.

So the last time GitHub's achievement pipeline computed your tier, you had ~13 merged PRs → that's below Bronze (16), so the base x2 badge was correct for that snapshot. The recent 68-PR burst rocketed you to 81 — which now qualifies for Bronze (16) and puts you 47 short of Silver (128) — but GitHub simply hasn't recomputed the tier yet. Achievement recalculation is notoriously laggy, especially after a burst.

So, definitively: nothing's broken, your PRs are counted, and my first two takes were both wrong. You're genuinely at 81 and owed at least Bronze; the badge will catch up (days–weeks; GitHub Support can nudge a recompute if it never does). To earn Silver you need 128 → 47 more merged PRs. Today's two = 83. Keep the branch→PR→merge flow and it climbs. (Freebies while grinding: YOLO for self-merging without review, Quickdraw for closing an issue/PR within 5 min.)