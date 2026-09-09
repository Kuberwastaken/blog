---
title: "mac-projects-hive-mind-refs-hive · 952614a3-7d4"
---

You are summarizing 60 messages from a Claude Code session for project "kuber.mehta".
The user is engaged in a coherent work cluster. Extract:

  topic: short noun phrase (e.g. "token-refresh", "vrm-v10-launch")
  body: 2-4 sentences in plain English describing:
        - what the user was investigating/doing
        - what they tried (especially dead-ends)
        - what they learned or decided
        - what remains open
  signal_score: 0.0-1.0 confidence this cluster contains team-worthy knowledge
                (>0.7 = auto-publish; 0.4-0.7 = cache local for weekly digest; <0.4 = skip)
  candidate_actions: array of {kind, confidence, draft} for things this cluster suggests:
                    - "brain_publish" if it's a TIL/decision/pattern
                    - "supersede" if it contradicts an existing brain entry
                    - "decision_open" if it surfaces a real team decision
  source_meta: {prompts: N, tool_calls: N, edits: N, commits: N, files: [...], duration_s: N}

Output STRICT JSON. No markdown, no prose outside JSON.

--- TRANSCRIPT ---
[assistant] 

[assistant] Confirmed: **19,677** no-CIN corp-email leads, exactly matching the verdict. Launching the pilot — 2,000 leads, ₹400 cap (expect ~₹280), grounding off, and it'll now **log live to the ledger** (validating the fix end-to-end):

[assistant] 

[user] 

[assistant] 

[assistant] Run started (log shows universe=19,677, processing 2,000). That "tailscaled ssh" line is just my ssh command matching the pgrep, not the real process. Let me confirm the actual python is alive, and check the ledger is receiving **live** rows (the real end-to-end validation of the fix):

[assistant] 

[user] 

[assistant] 

[assistant] Run is confirmed alive (PID 151693) with **13 finds already**. The ledger showing 0 live rows is just buffering — `gb.log` flushes every 25 calls, so the first batch is still in-memory. Let me launch a robust completion watcher (self-match-proof *and* blip-proof this time) and re-poll the ledger to confirm live-logging kicks in:

[assistant] 

[user] 

[assistant] 

[user] 

[assistant] 

[assistant] Both phases landing well. Quick update:

## ✅ Phase 1 — ledger fix, validated live
The wiring works end-to-end: the running pilot is **logging live to the ledger right now — 75 calls, ₹4.84** under `script='free_discovery_scale'` (the buffering was just the 25-call flush delay). Plus the **₹3,190.60 backfill** landed, so "spend since Monday" is now honest *in the ledger itself*, no more reading run logs:
- `scale_nameguess_backfill` ₹3,003.20 · `scale_corpemail_backfill` ₹187.40 · live pilot ₹4.84 and climbing.

Committed: `d4a96b52` (ledger write) + `fff00716` (`--no-cin` flag), both deployed to VPS.

## 🟢 Phase 2 — no-CIN corp-email pilot is running hot
Confirmed cohort **19,677** (exactly the verdict's number). Pilot of 2,000 leads:
> **done=50/2000 · verified=30 (60.0%) · ₹3.7 · projecting ~11,806** over the full cohort

That 60% is early and noisy (only 50 done) and will settle, but it's a *rich* seam — these regulator-list businesses (AMFI/SEBI/APEDA) have very reliable corporate-email domains. **One caveat to check at the end:** the verdict flagged that AMFI *distributors* are often individuals — a high domain-verify rate isn't the same as sell-fit, so I'll break the finds 

[user] <task-notification>
<task-id>bbefsvstk</task-id>
<tool-use-id>toolu_01YQZdzn4dyd2eqTt3zvT9Et</tool-use-id>
<output-file>/private/tmp/claude-502/-Users-kuber-mehta/1da3478f-d9d6-4429-abf5-1462f3b2a998/tasks/bbefsvstk.output</output-file>
<status>completed</status>
<summary>Background command "Robust completion watcher for no-CIN pilot" completed (exit code 0)</summary>
</task-notification>

[assistant] 

[assistant] 

[user] 

[assistant] 

[assistant] Pilot complete — and it's the best run yet. **771/2,000 verified (38.55%), ₹216.6, and the ledger captured it exactly (₹216.61 — fix fully validated).** That's ₹0.28/verified domain, cheaper than even the CIN corp-email run. Let me pull the finds and do the sell-fit breakdown the verdict asked for:

[assistant] 

[user] 

[assistant] 

[assistant] The `leads` table has `source`, `gtm_action`, `sell_score`. Let me join the 771 finds to it for the sell-fit breakdown plus the standard quality checks:

[assistant] 

[user] 

[assistant] 

[assistant] `leads` PK is `id` not `lead_id` — let me fix the join. Also worth noting the 16 dup domains (kotak.com ×3, incredcapital ×2) — that's the sell-fit concern showing up: multiple distributor leads sharing a *parent firm's* domain. Let me quantify:

[assistant] 

[user] 

[assistant] 

[assistant] Now this is the important finding — the pilot did its job and revealed a **sell-fit leak the verdict predicted**:

**Of the 771 verified, by `gtm_action`:** Suppress **401 (52%)** · Sell now **264 (34%)** · Enrich medium 105 · Enrich high 1.

**By source list:** amfi_distributors **261**, sebi 128, nidhi_tourism 118, epch 105, apeda 78. The AMFI concern is confirmed — many are individual mutual-fund distributors whose "domain" is their *parent AMC* (kotak.com ×3, incredcapital.com ×2 — 16 shared domains covering 33 leads). So ~52% of the ₹216 (~₹113) went to Suppress-labeled leads the scorer already rejected — exactly what the verdict said to exclude.

Let me sync the full 771 as the faithful record, then fix the leak before the full run. First sync+commit:

[assistant] 

[user] 

[assistant] 

[assistant] Committed as batch 0000 (`discovery-nocin-corpemail`). Now fix the leak — add `--exclude-suppress` so the full run only spends on leads the scorer wants:

[assistant] 

[user] 

[assistant] 

[user] 

[assistant] 

[user] 

[assistant] 

[assistant] Syntax-check, commit, deploy, and verify the non-suppress cohort size:

[assistant] 

[user] 

[assistant] 

[assistant] **7,911** non-suppress cohort confirmed — and it's **100% Sell-now (5,055) / Enrich-high (2,856)**, zero Suppress. This is the cleanest, highest-sell-fit lever we've found.

**My decision:** fire the full non-suppress run now — it's the validated lever at ₹0.28/verified (expect ~₹850 for ~3,000 sellable domains), cheap, ledger-capped, and runs in the background. Then while it runs I'll do the ₹0 Phase-3 prep (the 50-row audit of the pre-fix 380). I'll pause before the actual golden rebuild so you can see the audit first. Launching:

[assistant] 

[user] 

[assistant] 

[assistant] Full run is live (PID 223568, all 7,911). At the pilot's pace this is a ~3-hour run — I'll set a longer watcher. Then, while it runs, I'll audit the pre-fix 380 batch (Phase-3 prep). Launching the watcher and running the audit together:

[assistant] 

[user] 

[assistant] 

[user] 

[assistant] 

[assistant] Audit's clean. Here's where we are:

## 🟢 Full non-suppress run launched
- PID 223568, all **7,911** leads (100% Sell-now/Enrich-high), ₹1,200 cap, grounding off, logging live to the ledger.
- ~3-hour run at the pilot's pace. Long watcher `bjldysqlq` is running (self-match-proof) — it'll ping me at completion with final yield + ledger total.

## ✅ Pre-fix batch audit — remarkably clean
I audited all 380 finds in the pre-stem-fix `discovery-vps` batch: **exactly 1 false positive** — lead **250627 SMS METALS → `sms.co.in`** (the known one). Every other find passed. So the whole staged set is promotable with a single-lead exclusion.

## Where the pieces stand
| Shard | Verified | Note |
|---|---:|---|
| discovery-vps (name-guess) | 380 | exclude lead 250627 at promote |
| discovery-corp-email | 307 | clean |
| discovery-nocin-corpemail (pilot) | 771 | clean; 264 Sell-now portion is the sellable core |
| **full non-suppress run** | **~3,000 (in progress)** | 100% Sell-now/Enrich-high |

## Plan from here
Rather than rebuild golden twice, I'll **wait for the full run, then promote everything at once** (~4,458 domains, minus the 1 FP) in a single re-score — more efficient. That golden r
--- END TRANSCRIPT ---