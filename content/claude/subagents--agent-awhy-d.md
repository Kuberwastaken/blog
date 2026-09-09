---
title: "subagents · agent-awhy-d"
---

why does my contribution graph on github not show the commits made on branches of this private repo?

Good question — it's a mismatch between how you're committing and how GitHub counts contributions. The commits are real and pushed; GitHub is just choosing not to color them green. Here's why:

**GitHub only counts a commit toward your contribution graph if it meets specific rules.** The likely culprits here, in order of probability:

1. **The commit email doesn't match your GitHub account.** This is the most common cause. The commits in this repo are authored as `kuberwastaken <kuberhob@gmail.com>`. If `kuberhob@gmail.com` isn't added and verified in your GitHub account's email settings (Settings → Emails), GitHub can't attribute those commits to you, so they don't count — even though the push succeeded. Worth checking: your memory notes distinguish `kuberhob@gmail.com` from `kuberwastaken@gmail.com` (the "Claude-sub account"), so if the wrong one is the verified one on the account viewing the graph, that would do it.

2. **Branch commits only count if they land in the default branch OR the branch is `gh-pages`/your default.** This is the big one for your case: **commits on `campaign/mac`, `campaign/vps`, `campaign/combined`, and `feat/registry-enrichment` do NOT count toward the contribution graph until they're merged into `main`** (the default branch). GitHub's rule is that a commit counts when it's on the default branch or via a merged PR. The per-site progress commits from the publishers are piling up on `campaign/*` branches that were never merged to `main`, so they're invisible to the graph. The commits I make directly on `main` (the code/tooling commits) *should* be showing, provided rule #1 is satisfied.

3. **Private repo contributions must be enabled to display.** On your profile, "Contribution settings → Private contributions" must be toggled on for anyone (including you) to see private-repo activity as green squares. If off, the count exists but shows as anonymized/hidden.

**So the two things to check:** (a) is `kuberhob@gmail.com` a verified email on the GitHub account you're viewing, and (b) are you looking for the `campaign/*` branch commits — because those won't count until merged to `main`. The `main` commits, with a matching verified email and private contributions enabled, are the ones that should already be green.

One more subtlety worth noting: the automated per-site progress commits are authored/pushed *from the machines* (the Mac and the VPS run `git commit`/`git push` themselves in the publish loops). Those inherit whatever git identity is configured on each box — if the VPS has a different `user.email` than your verified GitHub email, its commits won't attribute either, independent of the branch issue.

<fork-boilerplate>
You are a worker fork. The transcript above is the parent's history — inherited reference, not your situation. You are NOT a continuation of that agent. Execute ONE directive, then stop.

Hard rules:
- Do NOT spawn subagents with the Agent tool. The "default to forking" guidance is for the parent; you ARE the fork, execute directly.
- One shot: report once and stop. No follow-up questions, no proposed next steps, no waiting for the user.

Guidelines (your directive may override any of these):
- Stay in scope. Other forks may be handling adjacent work; if you spot something outside your directive, note it in a sentence and move on.
- Open with one line restating your task, so the parent can spot scope drift at a glance.
- Be concise — as short as the answer allows, no shorter. Plain text, no preamble, no meta-commentary.
- If you committed changes, list the paths and commit hashes in your report.
</fork-boilerplate>

Your directive: why does my contribution graph on github not show the commits made on branches of this private repo?

Task: explain why GitHub's contribution graph isn't showing this private repo's branch commits.

Three reasons, most-likely first:

1. **Branch commits don't count until merged to the default branch.** GitHub only counts a commit toward the graph if it's on the default branch (`main`) or gets there via a merged PR. Your progress commits on `campaign/mac`, `campaign/vps`, `campaign/combined`, and `feat/registry-enrichment` sit on unmerged branches, so they're invisible to the graph — merge them (or PR them) into `main` and they'll count. Commits made directly on `main` should already be showing, if rules 2–3 hold.

2. **Commit email must be a verified email on your GitHub account.** These commits are authored `kuberwastaken <kuberhob@gmail.com>`. If `kuberhob@gmail.com` isn't added and verified under Settings → Emails on the account you're viewing, the commits aren't attributed to you and don't count. Note the automated per-site commits are pushed *by the Mac and the VPS themselves* — check each box's `git config user.email` matches your verified GitHub email, or those won't attribute regardless of branch.

3. **Private contributions must be enabled to display.** Profile → Contribution settings → "Private contributions" must be on, otherwise private-repo activity is counted but hidden/anonymized.

Quickest checks: confirm `kuberhob@gmail.com` is verified on the account, toggle private contributions on, and remember the `campaign/*` commits simply won't turn green until they reach `main`.