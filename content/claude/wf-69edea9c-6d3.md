---
title: "wf_69edea9c 6d3"
---

_19 transcript files aggregated._

You are a counterexample hunter for one WOWII (Graffiti.pc / DeLaViña) conjecture, inside the breakthroughmaxxing repo at /Users/kuber.mehta/Projects/breakthroughmaxxing. TODAY: 2026-07-23. Two WOWII conjectures fell this month: #91 (K33+bridge+K8, GPT) and #85 (C5[K4] cycle-blowup, THIS session, see 04-wowii/findings/c85-refutation.md). You hunt the next one.

RESOURCES (read them):
- 04-wowii/conjectures.json - your conjecture's verbatim statement_text (TRUTH), formula (hint only), hypotheses, status evidence.
- 04-wowii/INVARIANT-GLOSSARY.md - DeLaViña's verbatim invariant definitions + compute notes. KNOWN TRAPS: dist_even counts v itself (d=0 even); dist to/within sets conventions; degree-average floors; #72-style precedence ambiguity.
- 04-wowii/invariants.py + hunt.py - reusable exact library (b, f, tree via subsets; alpha; matching; domination; residue; annihilation; Ls; path cover; lambda_v; eccentricities) and the sweep/families/anneal engine. DO NOT EDIT SHARED FILES - put anything new in your own module 04-wowii/hunters/c<ID>_hunt.py.
- Python venv: /tmp/claude-1000/-Users-kuber-mehta-Projects-scratch/0ff2343c-686c-4342-8a04-37018db446b7/scratchpad/venv/bin/python ; geng binary: /tmp/claude-1000/-Users-kuber-mehta-Projects-scratch/0ff2343c-686c-4342-8a04-37018db446b7/scratchpad/geng

PROTOCOL (strict order):
1. ENCODE from statement_text + glossary. New invariants: implement exactly, with 2-3 hand-computed unit tests on tiny graphs (paths, cycles, K4, Petersen).
2. CALIBRATE: sweep ALL connected atlas graphs (<=7 vertices, networkx.graph_atlas_g). The conjecture MUST hold there (Graffiti.pc tested small graphs). ANY violation => your encoding (or the available interpretation) is wrong: fix or, if genuinely ambiguous, try alternative readings; only readings with 0 calibration violations may be hunted. If none survive, verdict=encoding-unclear with details.
3. HUNT (budget ~40 min CPU, single process, nice -n 12): (a) geng exhaustive n=8 (and 9 if invariant costs allow); (b) structured families: hunt.families() PLUS cycle-blowups C_k[K_m] and C_k[complement patterns] (k=4..8, m=2..6), complete splits, joins, coronas, brooms, Kneser/Paley if relevant, guided by your hint; (c) anneal at n=12..16 with hunt.anneal. Log every stage to 04-wowii/logs/c<ID>.md AS YOU GO (dated bullets; mandatory - user follows via git; an auto-committer pushes every 2 min).
4. ANY violation: re-verify with FRESH code (recompute every quantity a second way), save graph6 + edge list + standalone verifier to 04-wowii/findings/c<ID>-*.{md,g6,py}, and log loudly. NEVER report a counterexample that failed re-verification or whose reading has calibration violations.
5. Do NOT run git commands. Single process only - the box is shared.

Your target: conjecture 310. Attack hint (verify against the sources yourself): gamma_t <= ceil[1 + Tdist_min/3]; race against the gamma_t = 2n/3 extremal family (paths/cycles of triangles)

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

{
  "id": 310,
  "statement_text": "If G is a simple connected graph such that n(G)> 2, then \u03b3_t(G) \u2264 CEIL[1 + Tdist_min(v)/3]",
  "formula": "gamma_t(G) <= ceil[1 + Tdist_min(v)/3]",
  "invariants": [
    "gamma_t",
    "total_dist"
  ],
  "hypotheses": "G is a simple connected graph such that n(G)> 2",
  "status": "open",
  "status_evidence": "page marker 'O' (open). Page note: Mar. 1, 2007.",
  "in_formal_conjectures": false,
  "lean_file": null,
  "page_marker": "O",
  "section": "Upper bounds for Total Domination \u03b3_t. (34 T 9 F 12 O 14- 2/19/09)"
}

18:### `γ_τ` — total domination number  [73 open]
20:> A subset of the vertices, D_t, of the graph is called a total dominating set of the graph if for every vertex v of the graph is adjacent to a vertex of D_t. The total domination number of a graph is the size of a smallest total dominating set of the graph.
22:*Compute:* NP-hard; small-n exact / ILP (total domination).
222:### `Tdist_? (v)` — total distance of a vertex  [6 open]
224:> is the sum of distances from v to all other vertices. Tdist_min(v) is the minimum total distance among all vertices. Tdist_max(v) is the maximum of total distance among all vertices.
226:*Compute:* Poly: Tdist(v) = sum of distances (transmission).

16:def _max_subset(G, prop, lower=0):
32:def b_induced_bipartite(G):
37:def f_induced_forest(G):
44:def alpha(G):
52:def alpha_set_free(G):
58:def mu_matching(G):
62:def gamma_domination(G):
76:def lambda_v(G, v):
81:def lambda_bar(G):
87:def lambda_vals(G):
91:def Ls_max_leaves(G):
111:def path_cover_number(G):
142:def residue(G):
155:def annihilation(G):
169:def radius(G):
173:def diameter(G):
177:def n_vertices(G):
181:def m_edges(G):
185:def max_degree(G):
189:def min_degree(G):
193:def girth(G):

27:def check(G, conj):
34:def record_hit(G, conj, res, outdir="hits"):
49:def sweep_iter(graphs, conj, tag="", every=500):
74:def families(max_n=16):
76:    def K(q):
79:    def KB(a, b):
136:def anneal(conj, n, iters, seed, log=print):

1	"""Generic counterexample hunt engine for WOWII conjectures.
2	
3	A conjecture is a dict:
4	  {"id": int, "hyp": fn(G)->bool, "lhs": fn(G)->float, "rhs": fn(G)->float}
5	meaning: claim  hyp(G) => lhs(G) <= rhs(G).
6	A counterexample is G with hyp(G) and lhs(G) > rhs(G) + EPS.
7	
8	Search prongs:
9	  sweep_iter   — any iterable of graphs (atlas, geng pipe, families)
10	  families     — C91-style structured composites (cliques + bicliques + bridges,
11	                 coronas, splits, blowups): the discretization-cliff hunting ground
12	  anneal       — minimize slack = rhs - lhs by local edge edits
13	
14	Every violation is re-verified from scratch and appended to hits/ as JSON with
15	a graph6 string. Log lines go to stdout (callers tee into repo logs).
16	"""
17	import json
18	import math
19	import os
20	import random
21	
22	import networkx as nx
23	
24	EPS = 1e-9
25	
26	
27	def check(G, conj):
28	    if not conj["hyp"](G):
29	        return None
30	    lhs, rhs = conj["lhs"](G), conj["rhs"](G)
31	    return {"lhs": lhs, "rhs": rhs, "slack": rhs - lhs}
32	
33	
34	def record_hit(G, conj, res, outdir="hits"):
35	    os.makedirs(outdir, exist_ok=True)
36	    g6 = nx.to_graph6_bytes(nx.convert_node_labels_to_integers(G),
37	                            header=False).decode().strip()
38	    safe = {k: (float(v) if not isinstance(v, (int, str)) else v)
39	            for k, v in res.items()}
40	    rec = {"conjecture": conj["id"], "g6": g6, "n": G.number_of_nodes(),
41	           "m": G.number_of_edges(), **safe}
42	    path = os.path.join(outdir, f"c{conj['id']}_hits.jsonl")
43	    with open(path, "a") as fh:
44	        fh.write(json.dumps(rec) + "\n")
45	    print(f"!!! C{conj['id']} VIOLATED: {json.dumps(rec)}", flush=True)
46	    return rec
47	
48	
49	def sweep_iter(graphs, conj, tag="", every=500):
50	    seen = viol = 0
51	    worst = None
52	    for G in graphs:
53	        seen += 1
54	        res = check(G, conj)
55	        if res is None:
56	            continue
57	        if res["slack"] < -EPS:
58	            res2 = check(G.copy(), conj)  # recompute from scratch
59	            if res2 and res2["slack"] < -EPS:
60	                record_hit(G, conj, res2)
61	                viol += 1
62	        if worst is None or res["slack"] < worst:
63	            worst = res["slack"]
64	        if seen % every == 0:
65	            print(f"[c{conj['id']} {tag}] {seen} scanned, min slack {worst}",
66	                  flush=True)
67	    print(f"[c{conj['id']} {tag}] DONE {seen} scanned, {viol} violations, "
68	          f"min slack {worst}", flush=True)
69	    return viol, worst
70	
71	
72	# ---------- structured families (the C91 pattern generalized) ----------
73	
74	def families(max_n=16):
75	    """Yield structured composite graphs up to max_n vertices."""
76	    def K(q):
77	        return nx.complete_graph(q)
78	
79	    def KB(a, b):
80	        return nx.complete_bipartite_graph(a, b)
81	
82	    # cliques bridged to bicliques / cliques / cycles / paths
83	    parts = []
84	    for q in range(3, 13):
85	        parts.append((f"K{q}", K(q)))
86	    for a in range(2, 5):
87	        for b in range(a, 6):
88	            parts.append((f"K{a},{b}", KB(a, b)))
89	    for l in range(3, 9):
90	        parts.append((f"C{l}", nx.cycle_graph(l)))
91	        parts.append((f"P{l}", nx.path_graph(l)))
92	    parts.append(("Petersen", nx.petersen_graph()))
93	
94	    for i, (na, A) in enumerate(parts):
95	        for nb, B in parts[i:]:
96	            n = A.number_of_nodes() + B.number_of_nodes()
97	            if n > max_n or n < 4:
98	                continue
99	            G = nx.disjoint_union(A, B)
100	            u, v = 0, A.number_of_nodes()
101	            # single bridge
102	            H = G.copy()
103	            H.add_edge(u, v)
104	            yield H
105	            # shared vertex
106	            H2 = nx.contracted_nodes(G, u, v, self_loops=False)
107	            yield H2
108	            # double bridge from one vertex
109	            if B.number_of_nodes() >= 2:
110	                H3 = G.copy()
111	                H3.add_edge(u, v)
112	                H3.add_edge(u, v + 1)
113	                yield H3
114	
115	    # coronas and blowup-ish: clique with pendant paths
116	    for q in range(3, 11):
117	        for tail in range(1, min(5, max_n - q + 1)):
118	            G = K(q)
119	            G.add_edges_from((0, q + i) if i == 0 else (q + i - 1, q + i)
120	                             for i in range(tail))
121	            yield G
122	    # split-ish: clique + independent set fully/partially joined
123	    for q in range(3, 9):
124	        for s in range(1, min(6, max_n - q + 1)):
125	            G = K(q)
126	            for i in range(s):
127	                G.add_edge(0, q + i)
128	            yield G
129	            G2 = K(q)
130	            for i in range(s):
131	                for j in range(q):
132	                    G2.add_edge(j, q + i)
133	            yield G2
134	
135	
136	def anneal(conj, n, iters, seed, log=print):
137	    rng = random.Random(seed)
138	    G = nx.gnp_random_graph(n, 0.35, seed=seed)
139	    while not (nx.is_connected(G) and conj["hyp"](G)):
140	        G = nx.gnp_random_graph(n, rng.uniform(0.2, 0.6), seed=rng.randrange(1 << 30))
141	    cur = check(G, conj)
142	    best = cur["slack"]
143	    for it in range(iters):
144	        H = G.copy()
145	        u, v = rng.sample(list(H.nodes()), 2)
146	        if H.has_edge(u, v):
147	            H.remove_edge(u, v)
148	        else:
149	            H.add_edge(u, v)
150	        if not nx.is_connected(H):
151	            continue
152	        res = check(H, conj)
153	        if res is None:
154	            continue
155	        if res["slack"] < -EPS:
156	            record_hit(H, conj, res)
157	        if res["slack"] <= cur["slack"] or rng.random() < 0.08:
158	            G, cur = H, res
159	        if cur["slack"] < best:
160	            best = cur["slack"]
161	            log(f"[c{conj['id']} anneal n={n} s={seed}] it={it} new min slack "
162	                f"{float(best):.4f} m={G.number_of_edges()}")
163	    return best
164	

55	    return len(clique)
56	
57	
58	def mu_matching(G):
59	    return len(nx.max_weight_matching(G, maxcardinality=True))
60	
61	
62	def gamma_domination(G):
63	    nodes = list(G.nodes())
64	    n = len(nodes)
65	    N = {v: set(G[v]) | {v} for v in nodes}
66	    for k in range(1, n + 1):
67	        for S in itertools.combinations(nodes, k):
68	            cov = set()
69	            for v in S:
70	                cov |= N[v]
71	            if len(cov) == n:
72	                return k
73	    return n
74	
75	
76	def lambda_v(G, v):
77	    """lambda(v): independence number of the open neighborhood G[N(v)]."""
78	    return alpha(G.subgraph(list(G[v])))
79	
80	
81	def lambda_bar(G):
82	    """Average of lambda(v) over all vertices (exact fraction as float)."""
83	    vals = [lambda_v(G, v) for v in G.nodes()]
84	    return sum(vals) / len(vals)

ls: cannot access '/Users/kuber.mehta/Projects/breakthroughmaxxing/04-wowii/hunters/': No such file or directory
/Users/kuber.mehta/Projects/breakthroughmaxxing/04-wowii/logs/:
anneal.log
c85-n9.log
families-sweep.log
parser-agent.md
# WOWII parser agent — running log

- 2026-07-23 14:45 — Started. Sources located: wowii-all.html (801KB, windows-1252, table-based layout, MathJax) and 48 Lean files in formal-conjectures/WrittenOnTheWallII. Target dir 04-wowii/ was empty; created logs/. Beginning HTML structure analysis.
- 2026-07-23 14:55 — Structure decoded: page = 36 tables, 506 conjecture rows (numbers run past 189 into the 400s across ~14 sub-lists). Status marker column: T=97 (theorem), O=220 (open), E=31 (exercise/easy-true), R=18 (rediscovery of known result), F=131 (false/counterexample), T*=2 (proved w/ caveat: 20, 50), O*=7 (open w/ partial results). Verified semantics against annotations (e.g. #15 'R' = proven Fajtlowicz 1988; #253 'O*' = proved only for girth>=7).
- 2026-07-23 14:58 — Lean cross-check extracted: 46 formalized conjectures, 21 open / 25 solved per @[category] attrs.
- 2026-07-23 15:00 — Big win: recovered wowIIdefs.js (64KB) from Wayback (snapshot 2024-07-26) — contains 121 machine-readable defEntry invariant definitions plus per-conjecture printDefinitions(i1..i5) indices embedded in the page HTML => exact invariant lists per conjecture. JS conjEntry statuses are stale (e.g. #3) — using HTML markers as authoritative for status, JS only for definitions/invariants.
- 2026-07-23 14:52 — Fixed encodings (page is UTF-8 despite windows-1252 meta; defs JS is cp1252): all mojibake gone. Final parse: 522 conjecture rows (ids 1-459 with letter-suffix variants; page contains a duplicate "434a." typo, kept as 434a-dup2).
- 2026-07-23 14:55 — Status adjudication done. Lean-vs-page conflicts resolved: 58/109/327 refuted (Lean answer(False)), 143/315 proved (formal proofs linked), 34 unclear (Lean solved, direction unrecorded). 430b: page-marked O but note says "Jan 2011 ... counterexample" -> refuted. C91 -> refuted (July 2026): I re-verified the K_{3,3}+bridge+K_8 counterexample numerically with networkx brute force: n=14, b=8, f=6, avg lambda=2.0 -> RHS=7 < 8. Checked all 13 O-rows with resolution-hinting notes; rest are genuinely partial results, stay open.
- 2026-07-23 14:57 — conjectures.json WRITTEN (522 records): 220 open, 162 proved, 139 refuted, 1 unclear. 46 have Lean formalizations.
- 2026-07-23 14:59 — INVARIANT-GLOSSARY.md WRITTEN: 93 primary entries (every def used by an open conjecture, ordered by open-usage count, DeLaViña's verbatim definitions + compute notes) + 29 appendix entries + conventions section (Symbol-font Greek restoration, M/A/B/C/P set names, dist_even/ecc(S) edge cases) + precision notes cross-checked vs Lean (residue, annihilation, induced-subgraph-order invariants).
- 2026-07-23 15:05 — OPEN-TARGETS.md WRITTEN: all 220 open conjectures ranked by attackability heuristic (cheap invariants, ceil/floor cliffs, local/global mix, tree-only exhaustibility, thinly-vetted 4xx series); 24 curated with hand-written attack notes.
- 2026-07-23 15:05 — HEADLINE: while curating targets I found a candidate COUNTEREXAMPLE to open Conjecture 85 (tree(G) >= ceil[sqrt(1+2*min dist_even(v))]): C5[K_4] (n=20) has tree=4 (exhaustive over all 15,504 5-subsets, verified by two independent code paths) vs RHS=5 under BOTH dist_even conventions (v counted or not). C5[K_m] violates for all m>=4; n=10 member (m=2) satisfies, so it sat just beyond her test database. Flagged in OPEN-TARGETS.md as needing independent verification; status in conjectures.json left "open" per source-of-truth rules.
- 2026-07-23 15:06 — DONE. Final: 522 conjectures (220 open / 162 proved / 139 refuted / 1 unclear), 46 Lean-formalized. Deliverables: conjectures.json, INVARIANT-GLOSSARY.md, OPEN-TARGETS.md, logs/parser-agent.md.

> The number of vertices of a largest induced forest of the graph.

*Compute:* NP-hard (max induced forest = n - min FVS); exact small n; good FVS solvers exist.

### `A(G)` — annihilation number  [7 open]

> is defined as follows: let d_1,d_2,...,d_n be the degree sequence of a graph G arranged in non-decreasing order. A(G) is the largest integer k such that the sum of the first k terms of the sequence is at most half the sum of the entire sequence(i.e. the size of G).

*Compute:* Trivial: greedy prefix of nondecreasing degree sequence vs |E|.

### `peN(S)` — Number of private external neighbors of S  [7 open]

> is the number of vertices of V(G)\\S that have exactly one nieghbor in S.

*Compute:* Trivial per set.

### `FLOOR[x]` — floor of a number, x  [6 open]

> The largest integer less than or equal to x.

*Compute:* Function: floor.

### `Tdist_? (v)` — total distance of a vertex  [6 open]

> is the sum of distances from v to all other vertices. Tdist_min(v) is the minimum total distance among all vertices. Tdist_max(v) is the maximum of total distance among all vertices.

*Compute:* Poly: Tdist(v) = sum of distances (transmission).

### `deg_avg(G)` — average degree of a graph  [5 open]

> The average of the degrees of all vertices of the graph.

*Compute:* Trivial: 2m/n.

### `girth(G)` — girth of a graph  [5 open]

25:### 3. #310 (score 10.5)
26-`gamma_t(G) <= ceil[1 + Tdist_min(v)/3]`  — hyp: G is a simple connected graph such that n(G)> 2
27-invariants: `gamma_t, total_dist`
28-
29-gamma_t <= ceil[1+Tdist_min/3]: Tdist_min >= n-1 always, so RHS >= n/3; gamma_t can reach 2n/3 on known extremal families (coronas/subdivisions). Race at factor 2 - enumerate the gamma_t=2n/3 extremal family (Brigham-Carrington-Vitray characterization) and compute transmission on its compact members.
30-
31-### 4. #384b (score 10.5)
--
163:| 3 | #310 | 10.5 | `gamma_t(G) <= ceil[1 + Tdist_min(v)/3]` | gamma_t, total_dist | see curated notes above |
164-| 4 | #384b | 10.5 | `gamma_2 <= floor(n - \| Τ \| /2 ), where T = {k: some vertex of G has exactly k ` | gamma_2, triangles_at_v | see curated notes above |
165-| 5 | #63 | 9.0 | `f(G) >= ceil[(minimum of dist_even(v) + b(G) + 1)/3]` | f, dist_even, b, ceil | see curated notes above |
166-| 6 | #72 | 9.0 | `tree(G) >= ceil[average of ecc(v) + maximum of lambda(v) /3]` | tree, ecc, lambda_local, ceil | see curated notes above |
167-| 7 | #76 | 9.0 | `tree(G) >= freq[T_max(v)]/floor[deg_avg(G)]` | tree, triangles_at_v, deg_avg, floor | see curated notes above |
168-| 8 | #100 | 9.0 | `alpha(G) <= ceil[(maximum of lambda(v) + 0.5*length( bar(G) ))/2]` | alpha, lambda_local, length_deg2norm, ceil, complement | see curated notes above |
169-| 9 | #400c | 9.0 | `Let G be a connected graph on n > 2 vertices. T hen gamma_2 <= floor[3A(G) /disp` | gamma_2, annihilation, disparity | see curated notes above |

I have the picture. Conjecture 310: γ_t(G) ≤ CEIL[1 + Tdist_min/3] for connected G with n > 2. Let me set up the hunter module and log.

# C310 hunt log — gamma_t(G) <= CEIL[1 + Tdist_min(v)/3]

Statement (verbatim): "If G is a simple connected graph such that n(G)> 2, then
gamma_t(G) <= CEIL[1 + Tdist_min(v)/3]" — open since Mar 1 2007.

- Tdist_min(v) = min over v of transmission (sum of distances from v to all others), per glossary.
- gamma_t = total domination number = min #vertices whose OPEN neighborhoods cover V.
- Reading A (standard precedence): RHS = 1 + ceil(Tdist_min/3). Reading B: ceil((1+Tdist_min)/3)
  is refuted by C3 already (gamma_t=2, RHS_B=1), so A is the intended reading. Hunting A.

- 2026-07-23 — Paper analysis before coding: spiders with k legs of length 2 are TIGHT
  (gamma_t=k+1, Tdist_min=3k, RHS=k+1); so are C3, C6, K4, 2-coronas H.P2 (H=K2 gives
  slack 0), and legs of length 3 stay tight. The /3 exactly prices a forced support
  (dist 1) + private leaf (dist 2). Plan: exhaust trees (spiders/caterpillars are the
  tight zone) to n~20, geng n=8/9(/10), 2-corona family race, triangle chains/cycles,
  cycle blowups, anneal 12-16, plus local perturbation search seeded at every tight
  graph found.


File created successfully at: /Users/kuber.mehta/Projects/breakthroughmaxxing/04-wowii/logs/c310.md (file state is current in your context — no need to Read it back)

"""C310 hunter: gamma_t(G) <= CEIL[1 + Tdist_min(v)/3] for connected G, n > 2.

Tdist_min = minimum transmission (sum of distances from a vertex to all others).
gamma_t   = total domination number = min k such that k OPEN neighborhoods cover V.

Reading A (standard precedence, hunted): RHS = 1 + ceil(Tdist_min / 3).
Reading B, ceil((1 + Tdist_min)/3), fails already on C3 so it is not the intended one.

Stages (CLI): unit | calibrate | geng8 | geng9 | geng10 | trees | families | tight | anneal
Everything appends dated bullets to 04-wowii/logs/c310.md.
"""
import itertools
import math
import os
import subprocess
import sys
import time
from datetime import datetime

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import networkx as nx

import hunt

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # 04-wowii/
LOG = os.path.join(HERE, "logs", "c310.md")
GENG = "/tmp/claude-1000/-Users-kuber-mehta-Projects-scratch/0ff2343c-686c-4342-8a04-37018db446b7/scratchpad/geng"


def log(msg):
    line = f"- {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} — {msg}"
    print(line, flush=True)
    with open(LOG, "a") as fh:
        fh.write(line + "\n")


# ---------------- invariants ----------------

def _masks(G):
    nodes = list(G.nodes())
    idx = {v: i for i, v in enumerate(nodes)}
    nb = [0] * len(nodes)
    for v in nodes:
        m = 0
        for u in G[v]:
            m |= 1 << idx[u]
        nb[idx[v]] = m
    return nb


def tdist_min(G):
    """Minimum transmission over vertices (None if disconnected)."""
    nb = _masks(G)
    n = len(nb)
    full = (1 << n) - 1
    best = None
    for s in range(n):
        seen = 1 << s
        frontier = 1 << s
        d = 0
        tot = 0
        while frontier:
            d += 1
            nxt = 0
            f = frontier
            while f:
                j = (f & -f).bit_length() - 1
                nxt |= nb[j]
                f &= f - 1
            nxt &= ~seen
            if not nxt:
                break
            tot += d * bin(nxt).count("1")
            seen |= nxt
            frontier = nxt
        if seen != full:
            return None
        if best is None or tot < best:
            best = tot
    return best


def gamma_t(G):
    """Exact total domination number via branch&bound set cover of open nbhds."""
    nb = _masks(G)
    n = len(nb)
    if any(m == 0 for m in nb):
        return None  # isolated vertex: no total dominating set exists
    full = (1 << n) - 1
    # greedy upper bound
    cov, k = 0, 0
    while cov != full:
        j = max(range(n), key=lambda j: bin(nb[j] & ~cov).count("1"))
        cov |= nb[j]
        k += 1
    best = [k]
    maxdeg = max(bin(m).count("1") for m in nb)
    covers = [[] for _ in range(n)]  # covers[i] = vertices whose nbhd contains i
    for j in range(n):
        m = nb[j]
        while m:
            i = (m & -m).bit_length() - 1
            covers[i].append(j)
            m &= m - 1

    def dfs(cov, k):
        if cov == full:
            if k < best[0]:
                best[0] = k
            return
        rem = bin(full & ~cov).count("1")
        if k + (rem + maxdeg - 1) // maxdeg >= best[0]:
            return
        m = full & ~cov
        bi, bl = -1, 1 << 30
        while m:
            i = (m & -m).bit_length() - 1
            if len(covers[i]) < bl:
                bi, bl = i, len(covers[i])
            m &= m - 1
        for j in covers[bi]:
            dfs(cov | nb[j], k + 1)

    dfs(0, 0)
    return best[0]


def gamma_t_brute(G):
    """Independent slow check: smallest S with union of open nbhds = V."""
    nodes = list(G.nodes())
    n = len(nodes)
    N = {v: set(G[v]) for v in nodes}
    for k in range(1, n + 1):
        for S in itertools.combinations(nodes, k):
            cov = set()
            for v in S:
                cov |= N[v]
            if len(cov) == n:
                return k
    return None


def tdist_min_nx(G):
    return min(sum(nx.single_source_shortest_path_length(G, v).values())
               for v in G.nodes())


def rhs(G):
    t = tdist_min(G)
    return 1 + (t + 2) // 3  # = ceil(1 + t/3) exactly, integer arithmetic


CONJ = {"id": 310,
        "hyp": lambda G: G.number_of_nodes() > 2 and nx.is_connected(G),
        "lhs": gamma_t,
        "rhs": rhs}


# ---------------- structured families ----------------

def spider(legs):
    """Center 0 with paths of given lengths attached."""
    G = nx.Graph()
    G.add_node(0)
    nxt = 1
    for L in legs:
        prev = 0
        for _ in range(L):
            G.add_edge(prev, nxt)
            prev = nxt
            nxt += 1
    return G


def corona_path(H, plen):
    """H with a pendant path of plen vertices attached to every vertex (H o P_plen)."""
    G = H.copy()
    G = nx.convert_node_labels_to_integers(G)
    n = G.number_of_nodes()
    nxt = n
    for v in range(n):
        prev = v
        for _ in range(plen):
            G.add_edge(prev, nxt)
            prev = nxt
            nxt += 1
    return G


def triangle_chain_shared(k):
    """k triangles, consecutive ones share a vertex (friendship path). n=2k+1."""
    G = nx.Graph()
    a = 0
    nxt = 1
    for _ in range(k):
        b, c = nxt, nxt + 1
        nxt += 2
        G.add_edge(a, b); G.add_edge(a, c); G.add_edge(b, c)
        a = c
    return G


def triangle_chain_bridged(k, cyclic=False):
    """k disjoint triangles, consecutive joined by a bridge edge. n=3k."""
    G = nx.Graph()
    for i in range(k):
        b = 3 * i
        G.add_edge(b, b + 1); G.add_edge(b, b + 2); G.add_edge(b + 1, b + 2)
        if i:
            G.add_edge(b - 1, b)
    if cyclic and k >= 2:
        G.add_edge(3 * k - 1, 0)
    return G


def blowup(C, pattern, m):
    """Substitute each vertex of C with K_m ('K') or empty bar-K_m ('E')."""
    k = C.number_of_nodes()
    G = nx.Graph()
    for v in range(k):
        for i in range(m):
            for j in range(i + 1, m):
                if pattern == "K":
                    G.add_edge(v * m + i, v * m + j)
            G.add_node(v * m + i)
    for u, v in C.edges():
        for i in range(m):
            for j in range(m):
                G.add_edge(u * m + i, v * m + j)
    return G


def c310_families(max_n=48):
    # spiders: all leg-length multisets from {1,2,3,4}, n <= 24
    for c1 in range(0, 13):
        for c2 in range(0, 13):
            for c3 in range(0, 9):
                for c4 in range(0, 7):
                    nlegs = c1 + c2 + c3 + c4
                    n = 1 + c1 + 2 * c2 + 3 * c3 + 4 * c4
                    if nlegs < 2 or n < 4 or n > 24:
                        continue
                    yield spider([1] * c1 + [2] * c2 + [3] * c3 + [4] * c4)
    # coronas H o P_t for assorted compact H, t = 1, 2, 3
    Hs = [nx.path_graph(i) for i in range(1, 7)]
    Hs += [nx.cycle_graph(i) for i in range(3, 8)]
    Hs += [nx.complete_graph(i) for i in range(2, 7)]
    Hs += [nx.star_graph(i) for i in range(2, 7)]  # star_graph(i): i+1 vertices
    Hs += [spider([2, 2]), spider([2, 2, 2]), nx.petersen_graph()]
    for H in Hs:
        for t in (1, 2, 3):
            G = corona_path(H, t)
            if G.number_of_nodes() <= max_n:
                yield G
    # triangle chains / cycles (the hinted gamma_t=2n/3-style race family)
    for k in range(2, 13):
        yield triangle_chain_shared(k)
        yield triangle_chain_bridged(k)
        if k >= 2:
            yield triangle_chain_bridged(k, cyclic=True)
    # cycle blowups
    for k in range(4, 9):
        C = nx.cycle_graph(k)
        for m in range(2, 7):
            if k * m <= max_n:
                yield blowup(C, "K", m)
                yield blowup(C, "E", m)
    # complete splits K_q join empty_s and small joins
    for q in range(1, 8):
        for s in range(1, 10):
            K = nx.complete_graph(q)
            G = K.copy()
            for i in range(s):
                for j in range(q):
                    G.add_edge(q + i, j)
            yield G
    smalls = [nx.path_graph(3), nx.cycle_graph(4), nx.cycle_graph(5),
              nx.complete_graph(3), nx.empty_graph(3), nx.star_graph(3)]
    for A in smalls:
        for B in smalls:
            yield nx.join(A.copy(), B.copy()) if hasattr(nx, "join") else nx.complete_multipartite_graph(1)
    # Kneser / Paley
    try:
        yield nx.kneser_graph(6, 2)
        yield nx.kneser_graph(7, 2)
        yield nx.kneser_graph(7, 3)
    except Exception:
        pass
    for q in (9, 13, 17):
        G = nx.Graph()
        residues = {(x * x) % q for x in range(1, q)}
        for a in range(q):
            for r in residues:
                G.add_edge(a, (a + r) % q)
        yield G


# ---------------- stages ----------------

def stage_unit():
    P = nx.path_graph
    C = nx.cycle_graph
    tests = [  # (graph, gamma_t expected, Tdist_min expected)
        (P(3), 2, 2),
        (P(4), 2, 4),
        (C(3), 2, 2),
        (C(6), 4, 9),
        (C(7), 4, 12),
        (nx.complete_graph(4), 2, 3),
        (nx.petersen_graph(), 4, 15),
        (spider([2, 2, 2]), 4, 9),
        (nx.star_graph(5), 2, 5),          # K_{1,5}
        (corona_path(nx.complete_graph(2), 2), 4, 9),  # K2 o P2, n=6
    ]
    ok = True
    for i, (G, egt, et) in enumerate(tests):
        g1, g2 = gamma_t(G), gamma_t_brute(G)
        t1, t2 = tdist_min(G), tdist_min_nx(G)
        good = g1 == g2 == egt and t1 == t2 == et
        ok &= good
        print(f"unit {i}: gamma_t={g1}/{g2} (exp {egt}) T={t1}/{t2} (exp {et}) "
              f"{'OK' if good else 'FAIL'}")
    log(f"unit tests {'PASSED' if ok else 'FAILED'} (10 hand-computed cases, "
        f"two independent implementations each for gamma_t and Tdist_min)")
    return ok


def stage_calibrate():
    from networkx.generators.atlas import graph_atlas_g
    graphs = [G for G in graph_atlas_g()
              if G.number_of_nodes() >= 3 and nx.is_connected(G)]
    # cross-check the two gamma_t implementations on every atlas graph
    mism = sum(1 for G in graphs if gamma_t(G) != gamma_t_brute(G))
    viol, worst = hunt.sweep_iter(iter(graphs), CONJ, tag="atlas<=7", every=400)
    log(f"CALIBRATION: atlas n=3..7 connected ({len(graphs)} graphs): "
        f"{viol} violations, min slack {worst}; gamma_t impl mismatches: {mism}")
    tight = [nx.to_graph6_bytes(G, header=False).decode().strip()
             for G in graphs if hunt.check(G, CONJ)["slack"] == 0]
    log(f"calibration tight (slack=0) count: {len(tight)}; examples: {tight[:12]}")
    return viol == 0 and mism == 0


def geng_graphs(n, extra=()):
    args = [GENG, "-c", "-q", str(n)] + list(extra)
    proc = subprocess.Popen(args, stdout=subprocess.PIPE, bufsize=1 << 20)
    for line in proc.stdout:
        yield nx.from_graph6_bytes(line.strip())
    proc.wait()


def stage_geng(n, extra=(), tag=None):
    tag = tag or f"geng{n}"
    t0 = time.time()
    viol, worst = hunt.sweep_iter(geng_graphs(n, extra), CONJ, tag=tag, every=20000)
    log(f"{tag}: exhaustive connected n={n} {' '.join(extra)}: {viol} violations, "
        f"min slack {worst} ({time.time()-t0:.0f}s)")


def stage_trees(nmax=20):
    for n in range(8, nmax + 1):
        t0 = time.time()
        viol, worst = hunt.sweep_iter(
            geng_graphs(n, extra=[f"{n-1}:{n-1}"]), CONJ,
            tag=f"trees{n}", every=100000)
        log(f"trees n={n}: {viol} violations, min slack {worst} "
            f"({time.time()-t0:.0f}s)")
        if time.time() - t0 > 600:
            log(f"trees: stopping at n={n} (stage getting slow)")
            break


def stage_families():
    def gen():
        for G in hunt.families(max_n=18):
            yield G
        for G in c310_families():
            if nx.is_connected(G):
                yield G
    viol, worst = hunt.sweep_iter(gen(), CONJ, tag="families", every=500)
    log(f"families (hunt.families + spiders/coronas/triangle-chains/blowups/"
        f"splits/joins/kneser/paley): {viol} violations, min slack {worst}")


def stage_tight():
    """Collect tight graphs from small exhaustive + family sweeps, perturb them."""
    tight = []
    from networkx.generators.atlas import graph_atlas_g
    pools = [G for G in graph_atlas_g()
             if G.number_of_nodes() >= 3 and nx.is_connected(G)]
    for G in pools:
        r = hunt.check(G, CONJ)
        if r and r["slack"] == 0:
            tight.append(G)
    for G in c310_families(max_n=20):
        if G.number_of_nodes() <= 20 and nx.is_connected(G):
            r = hunt.check(G, CONJ)
            if r and r["slack"] == 0:
                tight.append(G)
    log(f"tight-local: {len(tight)} tight seeds collected; perturbing "
        f"(edge add/remove, pendant P1/P2/P3 attach, edge subdivide)")
    seen_worst = 1 << 30
    viol = 0
    checked = 0
    for G0 in tight:
        G0 = nx.convert_node_labels_to_integers(G0)
        n = G0.number_of_nodes()
        cands = []
        nodes = list(G0.nodes())
        for u, v in itertools.combinations(nodes, 2):  # edge toggles
            H = G0.copy()
            if H.has_edge(u, v):
                H.remove_edge(u, v)
                if not nx.is_connected(H):
                    continue
            else:
                H.add_edge(u, v)
            cands.append(H)
        for v in nodes:  # pendant paths length 1..3
            for L in (1, 2, 3):
                H = G0.copy()
                prev = v
                for i in range(L):
                    H.add_edge(prev, n + i)
                    prev = n + i
                cands.append(H)
        for u, v in list(G0.edges()):  # subdivide an edge
            H = G0.copy()
            H.remove_edge(u, v)
            H.add_edge(u, n); H.add_edge(n, v)
            cands.append(H)
        for H in cands:
            r = hunt.check(H, CONJ)
            checked += 1
            if r is None:
                continue
            if r["slack"] < -hunt.EPS:
                r2 = hunt.check(H.copy(), CONJ)
                if r2 and r2["slack"] < -hunt.EPS:
                    hunt.record_hit(H, CONJ, r2,
                                    outdir=os.path.join(HERE, "hits"))
                    viol += 1
            seen_worst = min(seen_worst, r["slack"])
    log(f"tight-local: perturbed {len(tight)} seeds, {checked} candidates, "
        f"{viol} violations, min slack {seen_worst}")


def stage_anneal():
    for n in (12, 13, 14, 15, 16):
        for seed in (1, 2):
            b = hunt.anneal(CONJ, n, iters=2500, seed=seed, log=print)
            log(f"anneal n={n} seed={seed}: best slack {b}")


if __name__ == "__main__":
    stage = sys.argv[1] if len(sys.argv) > 1 else "unit"
    os.chdir(HERE)  # so hunt.record_hit default outdir lands in 04-wowii/hits
    if stage == "unit":
        sys.exit(0 if stage_unit() else 1)
    elif stage == "calibrate":
        sys.exit(0 if stage_calibrate() else 1)
    elif stage == "geng8":
        stage_geng(8)
    elif stage == "geng9":
        stage_geng(9)
    elif stage == "geng10":
        stage_geng(10)
    elif stage == "trees":
        stage_trees()
    elif stage == "families":
        stage_families()
    elif stage == "tight":
        stage_tight()
    elif stage == "anneal":
        stage_anneal()
    elif stage == "all":
        stage_geng(8)
        stage_geng(9)
        stage_trees()
        stage_families()
        stage_tight()
        stage_anneal()


File created successfully at: /Users/kuber.mehta/Projects/breakthroughmaxxing/04-wowii/hunters/c310_hunt.py (file state is current in your context — no need to Read it back)

The file /Users/kuber.mehta/Projects/breakthroughmaxxing/04-wowii/hunters/c310_hunt.py has been updated successfully. (file state is current in your context — no need to Read it back)

/tmp/claude-1000/-Users-kuber-mehta-Projects-scratch/0ff2343c-686c-4342-8a04-37018db446b7/scratchpad/venv/lib64/python3.9/site-packages/networkx/utils/backends.py:135: RuntimeWarning: networkx backend defined more than once: nx-loopback
  backends.update(_get_backends("networkx.backends"))
unit 0: gamma_t=2/2 (exp 2) T=2/2 (exp 2) OK
unit 1: gamma_t=2/2 (exp 2) T=4/4 (exp 4) OK
unit 2: gamma_t=2/2 (exp 2) T=2/2 (exp 2) OK
unit 3: gamma_t=4/4 (exp 4) T=9/9 (exp 9) OK
unit 4: gamma_t=4/4 (exp 4) T=12/12 (exp 12) OK
unit 5: gamma_t=2/2 (exp 2) T=3/3 (exp 3) OK
unit 6: gamma_t=4/4 (exp 4) T=15/15 (exp 15) OK
unit 7: gamma_t=4/4 (exp 4) T=9/9 (exp 9) OK
unit 8: gamma_t=2/2 (exp 2) T=5/5 (exp 5) OK
unit 9: gamma_t=4/4 (exp 4) T=9/9 (exp 9) OK
- 2026-07-23 15:19:32 — unit tests PASSED (10 hand-computed cases, two independent implementations each for gamma_t and Tdist_min)

All 10 unit tests pass with both independent implementations agreeing. Now calibration on the full atlas.

[c310 atlas<=7] 400 scanned, min slack 0
[c310 atlas<=7] 800 scanned, min slack 0
[c310 atlas<=7] DONE 994 scanned, 0 violations, min slack 0
- 2026-07-23 15:19:38 — CALIBRATION: atlas n=3..7 connected (994 graphs): 0 violations, min slack 0; gamma_t impl mismatches: 0
- 2026-07-23 15:19:38 — calibration tight (slack=0) count: 15; examples: ['Bo', 'Bw', 'CF', 'CN', 'C|', 'C~', 'Dh_', 'Dhc', 'E`EG', 'EhEG', 'Fk_G_', 'Fg?hg']

Command running in background with ID: bt0l1y10c. Output is being written to: /tmp/claude-1000/-Users-kuber-mehta-Projects-scratch/0ff2343c-686c-4342-8a04-37018db446b7/tasks/bt0l1y10c.output. You will be notified when it completes. To check interim output, use Read on that file path.
Session cwd remains /Users/kuber.mehta/Projects/scratch; directory changes made by the backgrounded command do not apply to subsequent commands.

<tool_use_error>Blocked: sleep 60 followed by: tail -20 /tmp/claude-1000/-Users-kuber-mehta-Projects-scratch/0ff2343c-686c-4342-8a04-37018db446b7/tasks/bt0l1y10c.output. To wait for a condition, use Monitor with an until-loop (e.g. `until <check>; do sleep 2; done`). To wait for a command you started, use run_in_background: true. Do not chain shorter sleeps to work around this block.</tool_use_error>

Monitor started (task bnn9502cc, timeout 3600000ms). You will be notified on each event. Keep working — do not poll or sleep. Events may arrive while you are waiting for the user — an event is not their reply.

(Bash completed with no output)

You've hit your session limit · resets 4:20pm (UTC)

You are a counterexample hunter for one WOWII (Graffiti.pc / DeLaViña) conjecture, inside the breakthroughmaxxing repo at /Users/kuber.mehta/Projects/breakthroughmaxxing. TODAY: 2026-07-23. Two WOWII conjectures fell this month: #91 (K33+bridge+K8, GPT) and #85 (C5[K4] cycle-blowup, THIS session, see 04-wowii/findings/c85-refutation.md). You hunt the next one.

RESOURCES (read them):
- 04-wowii/conjectures.json - your conjecture's verbatim statement_text (TRUTH), formula (hint only), hypotheses, status evidence.
- 04-wowii/INVARIANT-GLOSSARY.md - DeLaViña's verbatim invariant definitions + compute notes. KNOWN TRAPS: dist_even counts v itself (d=0 even); dist to/within sets conventions; degree-average floors; #72-style precedence ambiguity.
- 04-wowii/invariants.py + hunt.py - reusable exact library (b, f, tree via subsets; alpha; matching; domination; residue; annihilation; Ls; path cover; lambda_v; eccentricities) and the sweep/families/anneal engine. DO NOT EDIT SHARED FILES - put anything new in your own module 04-wowii/hunters/c<ID>_hunt.py.
- Python venv: /tmp/claude-1000/-Users-kuber-mehta-Projects-scratch/0ff2343c-686c-4342-8a04-37018db446b7/scratchpad/venv/bin/python ; geng binary: /tmp/claude-1000/-Users-kuber-mehta-Projects-scratch/0ff2343c-686c-4342-8a04-37018db446b7/scratchpad/geng

PROTOCOL (strict order):
1. ENCODE from statement_text + glossary. New invariants: implement exactly, with 2-3 hand-computed unit tests on tiny graphs (paths, cycles, K4, Petersen).
2. CALIBRATE: sweep ALL connected atlas graphs (<=7 vertices, networkx.graph_atlas_g). The conjecture MUST hold there (Graffiti.pc tested small graphs). ANY violation => your encoding (or the available interpretation) is wrong: fix or, if genuinely ambiguous, try alternative readings; only readings with 0 calibration violations may be hunted. If none survive, verdict=encoding-unclear with details.
3. HUNT (budget ~40 min CPU, single process, nice -n 12): (a) geng exhaustive n=8 (and 9 if invariant costs allow); (b) structured families: hunt.families() PLUS cycle-blowups C_k[K_m] and C_k[complement patterns] (k=4..8, m=2..6), complete splits, joins, coronas, brooms, Kneser/Paley if relevant, guided by your hint; (c) anneal at n=12..16 with hunt.anneal. Log every stage to 04-wowii/logs/c<ID>.md AS YOU GO (dated bullets; mandatory - user follows via git; an auto-committer pushes every 2 min).
4. ANY violation: re-verify with FRESH code (recompute every quantity a second way), save graph6 + edge list + standalone verifier to 04-wowii/findings/c<ID>-*.{md,g6,py}, and log loudly. NEVER report a counterexample that failed re-verification or whose reading has calibration violations.
5. Do NOT run git commands. Single process only - the box is shared.

Your target: conjecture 63. Attack hint (verify against the sources yourself): f >= ceil[(min dist_even + b + 1)/3]; SIBLING OF REFUTED 58 and 91 - try the C91 (clique+biclique+bridge) and C85 (cycle blowup C_k[K_m]) patterns aggressively

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

<class 'list'>
[
 {
  "id": 1,
  "statement_text": "If G is a simple connected graph, then L_s(G) ≥ n + 1 - 2 μ(G)",
  "formula": "L_s(G) >= n + 1 - 2 mu(G)",
  "invariants": [
   "L_s",
   "n",
   "mu"
  ],
  "hypotheses": "G is a simple connected graph",
  "status": "proved",
  "status_evidence": "page marker 'T' (theorem/proved). Page note: 1996. In 1984, Hedetniemi and Laskar [HL] proved that for simple connected graphs L_s(G) ≥ n - 2 μ(G). In 1996, Fajtlowicz proved that for connected graphs on at l

There's prior c63 work in the repo. Let me read the conjecture entry and existing files.

{
 "id": 58,
 "statement_text": "If G is a simple connected graph, then f(G) \u2265 CEIL[ b(G)/average of \u03bb(v)]",
 "formula": "f(G) >= ceil[ b(G)/average of lambda(v)]",
 "invariants": [
  "f",
  "lambda_local",
  "b"
 ],
 "hypotheses": "G is a simple connected graph",
 "status": "refuted",
 "status_evidence": "page marker 'O' (open). Page note: Mar 25, 2004. This conjecture seems to be similar to conjecture 91. || Page marker 'O' but Lean GraphConjecture58.lean is @[category research solved] with answer(False) and an explicit counterexample in the docstring (K_{3,3} + K_73 joined through one vertex, n=79).",
 "in_formal_conjectures": true,
 "lean_file": "GraphConjecture58.lean",
 "page_marker": "O",
 "section": "2nd run on Lower bounds on the forest number of simple connected graphs, f(G)."
}
================================================================================
{
 "id": 63,
 "statement_text": "If G is a simple connected graph, then f(G) \u2265 CEIL[(minimum of dist_even(v) + b(G) + 1)/3]",
 "formula": "f(G) >= ceil[(minimum of dist_even(v) + b(G) + 1)/3]",
 "invariants": [
  "f",
  "dist_even",
  "b",
  "ceil"
 ],
 "hypotheses": "G is a simple connected graph",
 "status": "open",
 "status_evidence": "page marker 'O' (open). Page note: Mar 25, 2004.",
 "in_formal_conjectures": false,
 "lean_file": null,
 "page_marker": "O",
 "section": "2nd run on Lower bounds on the forest number of simple connected graphs, f(G)."
}
================================================================================
{
 "id": 85,
 "statement_text": "If G is a simple connected graph, then tree(G) \u2265 CEIL[sqrt(1 + 2*minimum of dist_even(v))]",
 "formula": "tree(G) >= ceil[sqrt(1 + 2*minimum of dist_even(v))]",
 "invariants": [
  "tree",
  "dist_even",
  "ceil"
 ],
 "hypotheses": "G is a simple connected graph",
 "status": "open",
 "status_evidence": "page marker 'O' (open). Page note: Apr 04, 2004.",
 "in_formal_conjectures": false,
 "lean_file": null,
 "page_marker": "O",
 "section": "Lower bounds on the tree number of simple connected graphs, tree(G)."
}
================================================================================
{
 "id": 91,
 "statement_text": "If G is a simple connected graph, then b(G) \u2264 1 + f(G) * (CEIL[ average of \u03bb(v) ])/2",
 "formula": "b(G) <= 1 + f(G) * (ceil[ average of lambda(v) ])/2",
 "invariants": [
  "b",
  "f",
  "lambda_local",
  "ceil"
 ],
 "hypotheses": "G is a simple connected graph",
 "status": "refuted",
 "status_evidence": "page marker 'O' (open). Page note: April 10, 2004. This conjecture seems to be similar to conjecture 58, but tighter for large b. || REFUTED July 2026 (GPT 5.6 Pro): counterexample K_{3,3} + bridge + K_8 (n=14): b(G)=8 > 7 = 1 + f(G)*ceil(avg lambda(v))/2 with f=6, avg lambda=2. Re-verified numerically by this pipeline (brute force b, f, lambda). Page marker was still 'O'.",
 "in_formal_conjectures": false,
 "lean_file": null,
 "page_marker": "O",
 "section": "Upper bounds on the bipartite number of simple connected graphs, b(G)."
}
================================================================================