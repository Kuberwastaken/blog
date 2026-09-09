---
title: "mac Projects breakthroughmaxxing"
---

_3 transcript files aggregated._

Adversarially audit ONLY 07-marlin/perfect-cuboid/phase26-c85-shared-curve as a mathematical proof/certificate package. Do not edit files, do not use git, and do NOT install/build/download dependencies; use only existing stdlib/source and short checks. Re-derive and attack: all five quotient equations/ranks, the 262144-class full 2-descent enumeration and why local p^2 filters plus four global Kummer witnesses prove Selmer size exactly 4, rank0 inference, torsion exhaustion, birational map and complete pullback, z=t^2 square gate, infinity/genus/sign classification, Phase24 provenance, and cuboid implication. Look for circular/self-consistent verification, omitted local places/classes, invalid Selmer logic, transcription errors, and overclaim. Return BLOCKER/MAJOR/MINOR findings and exactly what is genuinely certified.

Adversarially audit ONLY 07-marlin/perfect-cuboid/phase26-c85-shared-curve as a mathematical proof/certificate package. Do not edit files, do not use git, and do NOT install/build/download dependencies; use only existing stdlib/source and short checks. Re-derive and attack: all five quotient equations/ranks, the 262144-class full 2-descent enumeration and why local p^2 filters plus four global Kummer witnesses prove Selmer size exactly 4, rank0 inference, torsion exhaustion, birational map and complete pullback, z=t^2 square gate, infinity/genus/sign classification, Phase24 provenance, and cuboid implication. Look for circular/self-consistent verification, omitted local places/classes, invalid Selmer logic, transcription errors, and overclaim. Return BLOCKER/MAJOR/MINOR findings and exactly what is genuinely certified.

- aidocs: Use whenever the user mentions aidocs, an aidocs URL, an aidocs document/folder/comment/share/version, or asks to publish, review, open, or update a long-form artifact in aidocs.
- day0-idea-submission: Use when a Day 0 / DayZero hackathon participant wants to brainstorm, draft, check, or submit their hackathon idea. Triggers on "submit my idea", "help me write my hackathon idea", "day0 idea", "idea submission", "brainstorm hackathon idea", or resubmission after screener feedback.
- graphify: Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the question should be treated as a graphify query first. Turns any input (code, docs, papers, images, videos) into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.
- subagentmaxxing: Spawn and control non-Claude coding-agent subagents (OpenAI Codex CLI and Cursor CLI — grok-4.5, composer-2.5, gpt-5.5) as one-prompt-in/one-answer-out subagents via the `subagent` CLI. Use when you want to offload a task to a Codex or Cursor subagent, get a second opinion from a different model family, run cross-model consensus, or fan one prompt out across several models in parallel. - Also for reaching Cursor-hosted Opus/Sonnet/Gemini, or any time you specifically want a non-Claude model instead of the native Agent tool.
- vpsmaxxing: Set up and manage a personal cloud VPS as a dedicated remote workbench for AI coding agents (Claude Code + OpenAI Codex). Covers provisioning (git/node/pnpm/docker/tmux), installing & authenticating the agents, a self-aware agent environment, Tailscale networking (SSH with no exposed ports), a tmux + cmux cockpit, localhost port tunneling, reverse VPS→laptop file access (including a no-admin path for managed/work laptops), one-time migration of your skills/memory/history/credentials, and automatic two-way sync. Use this when the user wants to run AI agents on a server, offload heavy or parallel agent work off their laptop, "set up a VPS for Claude Code / Codex", spin up a remote agent box, or keep an agent setup synced across machines.
- youtube-transcript: Extract transcripts from YouTube videos. Use when the user asks for a transcript, subtitles, or captions of a YouTube video and provides a YouTube URL (youtube.com/watch?v=, youtu.be/, or similar). Supports output with or without timestamps.
- dataviz: Use this skill whenever you are about to create ANY chart, graph, plot, dashboard, or data visualization, in ANY output medium — an HTML or React artifact, inline SVG, plotting code in any library (matplotlib, plotly, d3, Recharts, …), an image/PNG you will render and upload, or a chart shared into Slack. Read it BEFORE writing the first line of chart code, choosing chart colors, building a stat tile / meter / KPI row, or laying out a dashboard. Produces visualizations that read as one system — elegant, accessible, consistent in light and dark — using a brand-neutral placeholder palette you swap for your own. Teaches a design-system-agnostic method: a form heuristic, a color formula with a runnable validator, mark specs, and interaction rules. A validated default palette is documented in `references/palette.md` — swap that file's values for your brand's. Triggers on: "chart", "graph", "plot", "data viz", "visualization", "dashboard", "analytics", "visualize data", "categorical colors", "sequential / diverging palette", "stat tile", "sparkline", "heatmap", "legend", "axis", "tooltip", "chart colors", "color by series".
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

I'll start by exploring the package structure.

total 120
drwxr-xr-x.  2 ec2-user ec2-user 16384 Jul 24 19:31 .
drwxr-xr-x. 28 ec2-user ec2-user 16384 Jul 24 19:23 ..
-rw-r--r--.  1 ec2-user ec2-user   413 Jul 24 19:29 LIMITATIONS.md
-rw-r--r--.  1 ec2-user ec2-user   603 Jul 24 19:29 LOG.md
-rw-r--r--.  1 ec2-user ec2-user   592 Jul 24 19:29 MANIFEST.md
-rw-r--r--.  1 ec2-user ec2-user  2315 Jul 24 19:29 README.md
-rw-r--r--.  1 ec2-user ec2-user   874 Jul 24 19:31 SHA256SUMS
-rw-r--r--.  1 ec2-user ec2-user 21982 Jul 24 19:30 certificate.json
-rwxr-xr-x.  1 ec2-user ec2-user 11862 Jul 24 19:25 generate.py
-rw-r--r--.  1 ec2-user ec2-user   374 Jul 24 19:27 pari_reproduce.gp
-rw-r--r--.  1 ec2-user ec2-user   747 Jul 24 19:27 pari_transcript.txt
-rwxr-xr-x.  1 ec2-user ec2-user   294 Jul 24 19:29 run_all.sh
-rwxr-xr-x.  1 ec2-user ec2-user  3636 Jul 24 19:29 test_phase26.py
-rwxr-xr-x.  1 ec2-user ec2-user 15524 Jul 24 19:30 verify.py
---SIZES---
  413 LIMITATIONS.md
  603 LOG.md
  592 MANIFEST.md
 2315 README.md
  874 SHA256SUMS
21982 certificate.json
11862 generate.py
  374 pari_reproduce.gp
  747 pari_transcript.txt
  294 run_all.sh
 3636 test_phase26.py
15524 verify.py
59216 total

1	# Phase 26: complete shared-curve obstruction at \(c=85\)
2	
3	The certified birank orientation `(84,13,85)` gives the genus-five curve
4	
5	```
6	D²=t²+169,  G²=t²+7056,  H²=t²+7225.
7	```
8	
9	It is the perfect-cuboid curve for box edges `(t,13,84)`: the third face
10	diagonal is already `85`, while `D,G` are the other face diagonals and `H` is
11	the space diagonal.
12	
13	This phase proves that the curve has exactly eight sign points over `t=0` and
14	eight rational points at infinity. There is no nonzero rational `t` and no
15	perfect cuboid.
16	
17	## Five elliptic quotients
18	
19	The three pair characters `(13,84)`, `(13,85)`, `(84,85)` have ranks
20	`1,1,0`; these records are pinned exactly to Phase 24. The odd
21	triple-product quotient
22	
23	```
24	W²=(z+169)(z+7056)(z+7225)
25	```
26	
27	has rank at least one, witnessed by `(-7153,6984)`. Exact reduced point orders
28	4 and 8 at the odd good primes 5 and 11 prove that this point is non-torsion.
29	Its `z` is negative.
30	
31	The decisive even triple-product quotient is
32	
33	```
34	V²=z(z+169)(z+7056)(z+7225),  z=t², V=tDGH.
35	```
36	
37	It is isomorphic after smooth projective completion to
38	
39	```
40	Y²=(X+1192464)(X+1221025)(X+50979600)
41	X=8615552400/z,  Y=8615552400 V/z².
42	```
43	
44	## Exact rank and pullback
45	
46	An independently replayed full-two-torsion descent begins with 262,144
47	squareclass pairs. Local tests through `97²` leave exactly four classes, and
48	four explicit global Kummer witnesses give the matching lower bound. Thus the
49	2-Selmer group has size four, equal to rational two-torsion, and the
50	Mordell–Weil rank is zero without a Cassels or BSD assumption.
51	
52	The torsion group is `Z/8 × Z/2`. Sixteen explicitly generated points exhaust
53	it: both 11 and 19 are verified odd good primes and both reductions have
54	order 16, closing either prime-primary loophole. Their complete quartic
55	pullback has only one positive nonzero value, `z=510`, occurring with both
56	signs of `V`; `510` is not a square. The only finite square `z` is zero.
57	
58	The PARI transcript is parsed and bound to the certificate, but it is
59	corroborative: completeness comes from the standard-library two-descent and
60	torsion replay. `hyperellratpoints(...,10^7)` is explicitly bounded
61	corroboration only.
62	
63	Run `./run_all.sh` for deterministic regeneration, independent reverse-order
64	verification, mutation tests, transcript checks, and artifact hashes.
65	

# Phase 26: complete shared-curve obstruction at \(c=85\)

The certified birank orientation `(84,13,85)` gives the genus-five curve

```
D²=t²+169,  G²=t²+7056,  H²=t²+7225.
```

It is the perfect-cuboid curve for box edges `(t,13,84)`: the third face
diagonal is already `85`, while `D,G` are the other face diagonals and `H` is
the space diagonal.

This phase proves that the curve has exactly eight sign points over `t=0` and
eight rational points at infinity. There is no nonzero rational `t` and no
perfect cuboid.

## Five elliptic quotients

The three pair characters `(13,84)`, `(13,85)`, `(84,85)` have ranks
`1,1,0`; these records are pinned exactly to Phase 24. The odd
triple-product quotient

```
W²=(z+169)(z+7056)(z+7225)
```

has rank at least one, witnessed by `(-7153,6984)`. Exact reduced point orders
4 and 8 at the odd good primes 5 and 11 prove that this point is non-torsion.
Its `z` is negative.

The decisive even triple-product quotient is

```
V²=z(z+169)(z+7056)(z+7225),  z=t², V=tDGH.
```

It is isomorphic after smooth projective completion to

```
Y²=(X+1192464)(X+1221025)(X+50979600)
X=8615552400/z,  Y=8615552400 V/z².
```

## Exact rank and pullback

An independently replayed full-two-torsion descent begins with 262,144
squareclass pairs. Local tests through `97²` leave exactly four classes, and
four explicit global Kummer witnesses give the matching lower bound. Thus the
2-Selmer group has size four, equal to rational two-torsion, and the
Mordell–Weil rank is zero without a Cassels or BSD assumption.

The torsion group is `Z/8 × Z/2`. Sixteen explicitly generated points exhaust
it: both 11 and 19 are verified odd good primes and both reductions have
order 16, closing either prime-primary loophole. Their complete quartic
pullback has only one positive nonzero value, `z=510`, occurring with both
signs of `V`; `510` is not a square. The only finite square `z` is zero.

The PARI transcript is parsed and bound to the certificate, but it is
corroborative: completeness comes from the standard-library two-descent and
torsion replay. `hyperellratpoints(...,10^7)` is explicitly bounded
corroboration only.

Run `./run_all.sh` for deterministic regeneration, independent reverse-order
verification, mutation tests, transcript checks, and artifact hashes.


1	# Limitations
2	
3	- This phase settles the shared curve for `(84,13,85)` only. It makes no
4	  exhaustiveness claim about later primitive Pythagorean ratios.
5	- The retained PARI/GP output is parsed corroboration. The exact rank-zero
6	  proof is independently replayed in standard-library Python.
7	- `hyperellratpoints(...,10^7)` is bounded corroboration and is not used for
8	  completeness.
9	- No perfect cuboid is found.
10	

# Limitations

- This phase settles the shared curve for `(84,13,85)` only. It makes no
  exhaustiveness claim about later primitive Pythagorean ratios.
- The retained PARI/GP output is parsed corroboration. The exact rank-zero
  proof is independently replayed in standard-library Python.
- `hyperellratpoints(...,10^7)` is bounded corroboration and is not used for
  completeness.
- No perfect cuboid is found.


1	# Log
2	
3	- Derived the shared cuboid curve from the exact Phase-24 c=85 record.
4	- Inventoried all five elliptic quotients with ranks `1,1,0,1,0`.
5	- Found the decisive reciprocal elliptic model of the even triple-product
6	  quotient.
7	- Completed a 262,144-class two-descent with four local survivors and four
8	  exact global Kummer witnesses.
9	- Enumerated and exhausted the 16-point torsion subgroup using good
10	  reductions at 11 and 19.
11	- Pulled back every torsion point; the sole positive nonzero value is the
12	  nonsquare `z=510`.
13	- Classified all 16 smooth-projective rational points on the shared curve.
14	

# Log

- Derived the shared cuboid curve from the exact Phase-24 c=85 record.
- Inventoried all five elliptic quotients with ranks `1,1,0,1,0`.
- Found the decisive reciprocal elliptic model of the even triple-product
  quotient.
- Completed a 262,144-class two-descent with four local survivors and four
  exact global Kummer witnesses.
- Enumerated and exhausted the 16-point torsion subgroup using good
  reductions at 11 and 19.
- Pulled back every torsion point; the sole positive nonzero value is the
  nonsquare `z=510`.
- Classified all 16 smooth-projective rational points on the shared curve.


1	# Manifest
2	
3	- `generate.py` — deterministic exact certificate generator.
4	- `verify.py` — independent reverse-order standard-library verifier.
5	- `test_phase26.py` — regression and mutation tests.
6	- `certificate.json` — machine-readable theorem certificate.
7	- `pari_reproduce.gp` — exact PARI/GP corroboration commands.
8	- `pari_transcript.txt` — parsed selected PARI/GP output.
9	- `README.md` — theorem and proof outline.
10	- `LIMITATIONS.md` — scope and trust boundaries.
11	- `LOG.md` — research log.
12	- `run_all.sh` — complete replay.
13	- `SHA256SUMS` — stable artifact hashes.
14	

# Manifest

- `generate.py` — deterministic exact certificate generator.
- `verify.py` — independent reverse-order standard-library verifier.
- `test_phase26.py` — regression and mutation tests.
- `certificate.json` — machine-readable theorem certificate.
- `pari_reproduce.gp` — exact PARI/GP corroboration commands.
- `pari_transcript.txt` — parsed selected PARI/GP output.
- `README.md` — theorem and proof outline.
- `LIMITATIONS.md` — scope and trust boundaries.
- `LOG.md` — research log.
- `run_all.sh` — complete replay.
- `SHA256SUMS` — stable artifact hashes.


1	#!/usr/bin/env python3
2	"""Generate the exact Phase-26 c=85 shared-curve certificate."""
3	
4	from __future__ import annotations
5	
6	import argparse
7	import hashlib
8	import json
9	import math
10	from fractions import Fraction
11	from pathlib import Path
12	
13	SOURCE = Path("../phase24-next-birank-quotients/certificate.json")
14	SOURCE_HASH = "546b1c6044ae9ee528921f01609d95d2dae554a0504dfaf5801d1268aaef6b6b"
15	SCHEMA = "perfect-cuboid-c85-shared-curve-v1"
16	A, B, C = 13**2, 84**2, 85**2
17	AB, AC, BC, N = A * B, A * C, B * C, A * B * C
18	ROOTS = (-AB, -AC, -BC)
19	DISCRIMINANT = 16 * math.prod(
20	    (ROOTS[i] - ROOTS[j]) ** 2 for i in range(3) for j in range(i)
21	)
22	MODULI = [(2, 3), (2, 5), (2, 7), (3, 2), (5, 2), (7, 2),
23	          (13, 2), (17, 2), (71, 2), (97, 2)]
24	
25	
26	def pair(value):
27	    value = Fraction(value)
28	    return [value.numerator, value.denominator]
29	
30	
31	def factors(n):
32	    output = []
33	    n = abs(n)
34	    p = 2
35	    while p * p <= n:
36	        if n % p == 0:
37	            output.append(p)
38	            while n % p == 0:
39	                n //= p
40	        p += 1
41	    if n > 1:
42	        output.append(n)
43	    return output
44	
45	
46	def squareclass(a, b, primes):
47	    n = a * b
48	    output = -1 if n < 0 else 1
49	    n = abs(n)
50	    for p in primes:
51	        parity = 0
52	        while n % p == 0:
53	            n //= p
54	            parity ^= 1
55	        if parity:
56	            output *= p
57	    assert n == 1
58	    return output
59	
60	
61	def local_cover(candidate, p, exponent, d2, d3):
62	    b1, b2, b3 = candidate
63	    q = p**exponent
64	    tables = []
65	    for coefficient in (b2, b3):
66	        table = {}
67	        for z in range(q):
68	            residue = coefficient * z * z % q
69	            table[residue] = table.get(residue, False) or z % p != 0
70	        tables.append(table)
71	    for z1 in range(q):
72	        base = b1 * z1 * z1
73	        for w in range(q):
74	            r2 = (base - d2 * w * w) % q
75	            r3 = (base - d3 * w * w) % q
76	            if r2 in tables[0] and r3 in tables[1]:
77	                if z1 % p or w % p or tables[0][r2] or tables[1][r3]:
78	                    return True
79	    return False
80	
81	
82	def local_p2(candidate, p, d2, d3):
83	    """Primitive projective solubility modulo an odd p^2."""
84	    b1, b2, b3 = candidate
85	    q = p * p
86	    tables = [{coefficient * z * z % q for z in range(q)}
87	              for coefficient in (b2, b3)]
88	    for z1 in range(q):  # w unit, scaled to one
89	        base = b1 * z1 * z1
90	        if (base - d2) % q in tables[0] and (base - d3) % q in tables[1]:
91	            return True
92	    for k in range(p):  # z1 unit, scaled to one; w=p*k
93	        w = p * k
94	        if (b1 - d2 * w * w) % q in tables[0] and \
95	                (b1 - d3 * w * w) % q in tables[1]:
96	            return True
97	    return False
98	
99	
100	def two_descent():
101	    differences = [ROOTS[i] - ROOTS[j] for i in range(3) for j in range(i)]
102	    primes = tuple(sorted(set(factors(math.prod(differences)))))
103	    generators = (-1,) + primes
104	    classes = []
105	    for mask in range(1 << len(generators)):
106	        value = 1
107	        for i, generator in enumerate(generators):
108	            if mask & (1 << i):
109	                value *= generator
110	        classes.append(value)
111	    candidates = [(x, y, squareclass(x, y, primes)) for x in classes for y in classes]
112	    d2, d3 = ROOTS[1] - ROOTS[0], ROOTS[2] - ROOTS[0]
113	    stages = []
114	    for p, exponent in MODULI:
115	        before = len(candidates)
116	        q = p**exponent
117	        cache = {}
118	        checker = local_p2 if p > 19 and exponent == 2 else None
119	
120	        def soluble(candidate):
121	            key = tuple(value % q for value in candidate)
122	            if key not in cache:
123	                cache[key] = checker(candidate, p, d2, d3) if checker else \
124	                    local_cover(candidate, p, exponent, d2, d3)
125	            return cache[key]
126	
127	        candidates = [candidate for candidate in candidates if soluble(candidate)]
128	        stages.append({"prime": p, "exponent": exponent, "modulus": q,
129	                       "before": before, "after": len(candidates)})
130	    witnesses = [
131	        {"class": [1, 1, 1], "point": [1, 1, 1, 0], "elliptic_point": "O"},
132	        {"class": [-1, -6887, 6887], "point": [169, 0, 85, 1],
133	         "elliptic_point": [-1221025, 0]},
134	        {"class": [-546, -78455, 253470], "point": [14, 1, 14, 1],
135	         "elliptic_point": [-1299480, 645841560]},
136	        {"class": [546, 107185, 346290], "point": [182, 13, 14, 1],
137	         "elliptic_point": [16893240, 149116629480]},
138	    ]
139	    assert set(candidates) == {tuple(row["class"]) for row in witnesses}
140	    return {
141	        "roots": list(ROOTS),
142	        "squareclass_primes": list(primes),
143	        "initial_candidates": len(classes) ** 2,
144	        "local_stages": stages,
145	        "survivors": [list(row) for row in candidates],
146	        "global_witnesses": witnesses,
147	        "local_upper": 4,
148	        "global_lower": 4,
149	        "selmer_size_by_upper_lower_sandwich": 4,
150	        "rational_two_torsion_size": 4,
151	        "rank": 0,
152	    }
153	
154	
155	def add(P, Q):
156	    if P is None:
157	        return Q
158	    if Q is None:
159	        return P
160	    x, y = P
161	    X, Y = Q
162	    if x == X and y == -Y:
163	        return None
164	    a2 = -sum(ROOTS)
165	    a4 = sum(ROOTS[i] * ROOTS[j] for i in range(3) for j in range(i))
166	    if P == Q:
167	        if y == 0:
168	            return None
169	        slope = (3 * x * x + 2 * a2 * x + a4) / (2 * y)
170	    else:
171	        slope = (Y - y) / (X - x)
172	    z = slope * slope - a2 - x - X
173	    return z, slope * (x - z) - y
174	
175	
176	def torsion_points():
177	    g1 = (Fraction(-1299480), Fraction(645841560))
178	    g2 = (Fraction(-1221025), Fraction(0))
179	    output = []
180	    for i in range(8):
181	        for j in range(2):
182	            P = None
183	            for _ in range(i):
184	                P = add(P, g1)
185	            if j:
186	                P = add(P, g2)
187	            output.append(P)
188	    assert len(set(output)) == 16
189	    return output
190	
191	
192	def curve_order(p):
193	    total = 1
194	    for x in range(p):
195	        rhs = math.prod((x - root) % p for root in ROOTS) % p
196	        total += sum(y * y % p == rhs for y in range(p))
197	    return total
198	
199	
200	def pullback(P):
201	    if P is None:
202	        return {"elliptic_point": "O", "location": "z=0", "z": [0, 1],
203	                "V": [0, 1], "z_is_square": True}
204	    X, Y = P
205	    if X == 0:
206	        return {"elliptic_point": [pair(X), pair(Y)], "location": "infinity",
207	                "z": None, "V": None, "z_is_square": None}
208	    z = Fraction(N, 1) / X
209	    V = Fraction(N, 1) * Y / X**2
210	    square = z >= 0 and math.isqrt(z.numerator)**2 == z.numerator and \
211	        math.isqrt(z.denominator)**2 == z.denominator
212	    return {"elliptic_point": [pair(X), pair(Y)], "location": "affine",
213	            "z": pair(z), "V": pair(V), "z_is_square": square}
214	
215	
216	def sign_points(values):
217	    a, b, c = values
218	    return [[x, y, z] for x in (-a, a) for y in (-b, b) for z in (-c, c)]
219	
220	
221	def document(source_hash, source):
222	    shared = next(row for row in source["shared_curves"] if row["triple"] == [84, 13, 85])
223	    projections = [row for row in source["primitive_frontier"]["positive_projection_records"]
224	                   if row["triple"] == [84, 13, 85]]
225	    positive_pairs = [row for row in source["quotient_ranking"]["positive_quotients"]
226	                      if row["triple"][2] == 85]
227	    rank_zero_pair = source["quotient_ranking"]["ratio_85_rank_zero_quotient"]
228	    pullbacks = [pullback(P) for P in torsion_points()]
229	    return {
230	        "schema": SCHEMA,
231	        "source_phase24_sha256": source_hash,
232	        "source_phase24_c85_provenance": {
233	            "shared_curve_record": shared,
234	            "positive_projection_records": projections,
235	            "positive_pair_quotients": positive_pairs,
236	            "rank_zero_84_85_pair_quotient": rank_zero_pair,
237	        },
238	        "triple": [84, 13, 85],
239	        "shared_curve": {
240	            "genus": 5,
241	            "equations": [
242	                {"variable": "D", "edge": 13, "constant": A},
243	                {"variable": "G", "edge": 84, "constant": B},
244	                {"variable": "H", "edge": 85, "constant": C},
245	            ],
246	            "cuboid_edges": ["t", 13, 84],
247	            "face_diagonals": ["D", "G", 85],
248	            "space_diagonal": "H",
249	            "genus_derivation": {
250	                "cover_degree": 8, "geometric_branch_points": 6,
251	                "ramification_per_branch": 4, "total_ramification": 24,
252	                "riemann_hurwitz": "2g-2=8*(-2)+24=8",
253	            },
254	            "rational_unramified_infinity_branches": 8,
255	        },
256	        "elliptic_quotient_inventory": [
257	            {"character": "13*84", "rank": 1, "source": "Phase24 positive quotient"},
258	            {"character": "13*85", "rank": 1, "source": "Phase24 positive quotient"},
259	            {"character": "84*85", "rank": 0, "source": "Phase24 exact 2-descent"},
260	            {"character": "13*84*85 odd", "rank": 1,
261	             "equation": "W^2=(z+169)(z+7056)(z+7225)",
262	             "point": [[-7153, 1], [6984, 1]],
263	             "good_reduction_obstruction": [
264	                 {"prime": 5, "curve_order": 8, "point_order": 4},
265	                 {"prime": 11, "curve_order": 16, "point_order": 8},
266	             ]},
267	            {"character": "13*84*85 even", "rank": 0,
268	             "equation": "V^2=z(z+169)(z+7056)(z+7225)",
269	             "role": "decisive"},
270	        ],
271	        "decisive_quotient": {
272	            "map_from_shared_curve": "z=t^2, V=tDGH",
273	            "elliptic_curve": {
274	                "equation": "Y^2=(X+1192464)(X+1221025)(X+50979600)",
275	                "roots": list(ROOTS),
276	                "discriminant": DISCRIMINANT,
277	                "map": "X=8615552400/z, Y=8615552400*V/z^2",
278	                "inverse": "z=8615552400/X, V=8615552400*Y/X^2",
279	                "exceptional": [
280	                    "(z,V)=(0,0) <-> O",
281	                    "quartic infinities +/- <-> (0,+/-8615552400)",
282	                ],
283	                "smooth_projective_isomorphism": True,
284	            },
285	            "two_descent": two_descent(),
286	            "torsion": {
287	                "structure": [8, 2],
288	                "generators": [[-1299480, 645841560], [-1221025, 0]],
289	                "exhibited_size": 16,
290	                "good_reductions": [
291	                    {"prime": 11, "discriminant_mod_prime": DISCRIMINANT % 11,
292	                     "curve_order": curve_order(11)},
293	                    {"prime": 19, "discriminant_mod_prime": DISCRIMINANT % 19,
294	                     "curve_order": curve_order(19)},
295	                ],
296	            },
297	            "complete_pullback_table": pullbacks,
298	            "only_square_finite_z": [[0, 1]],
299	            "pari_corroboration": {
300	                "version": [2, 17, 3], "selmer_f2_dimension": 2,
301	                "ellrank": [0, 0, 0, []],
302	                "elltors": [16, [8, 2],
303	                            [[-1299480, 645841560], [-1221025, 0]]],
304	                "hyperellratpoints_bound": 10000000,
305	                "logical_role": "bounded corroboration only",
306	            },
307	        },
308	        "classification": {
309	            "affine_t_zero_points": [{"t": 0, "DGH": row}
310	                                     for row in sign_points((13, 84, 85))],
311	            "points_at_infinity": [{"normalized_DGH": row}
312	                                   for row in sign_points((1, 1, 1))],
313	            "smooth_projective_count": 16,
314	            "complete": True,
315	        },
316	        "claim": {
317	            "ratio_85_completely_obstructed": True,
318	            "nonzero_shared_t_found": False,
319	            "perfect_cuboid_found": False,
320	        },
321	    }
322	
323	
324	def main():
325	    parser = argparse.ArgumentParser()
326	    parser.add_argument("-o", "--output", default="certificate.json")
327	    args = parser.parse_args()
328	    raw = SOURCE.read_bytes()
329	    digest = hashlib.sha256(raw).hexdigest()
330	    assert digest == SOURCE_HASH
331	    Path(args.output).write_text(json.dumps(document(digest, json.loads(raw)),
332	                                                indent=2, sort_keys=True) + "\n")
333	
334	
335	if __name__ == "__main__":
336	    main()
337	

#!/usr/bin/env python3
"""Generate the exact Phase-26 c=85 shared-curve certificate."""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from fractions import Fraction
from pathlib import Path

SOURCE = Path("../phase24-next-birank-quotients/certificate.json")
SOURCE_HASH = "546b1c6044ae9ee528921f01609d95d2dae554a0504dfaf5801d1268aaef6b6b"
SCHEMA = "perfect-cuboid-c85-shared-curve-v1"
A, B, C = 13**2, 84**2, 85**2
AB, AC, BC, N = A * B, A * C, B * C, A * B * C
ROOTS = (-AB, -AC, -BC)
DISCRIMINANT = 16 * math.prod(
    (ROOTS[i] - ROOTS[j]) ** 2 for i in range(3) for j in range(i)
)
MODULI = [(2, 3), (2, 5), (2, 7), (3, 2), (5, 2), (7, 2),
          (13, 2), (17, 2), (71, 2), (97, 2)]


def pair(value):
    value = Fraction(value)
    return [value.numerator, value.denominator]


def factors(n):
    output = []
    n = abs(n)
    p = 2
    while p * p <= n:
        if n % p == 0:
            output.append(p)
            while n % p == 0:
                n //= p
        p += 1
    if n > 1:
        output.append(n)
    return output


def squareclass(a, b, primes):
    n = a * b
    output = -1 if n < 0 else 1
    n = abs(n)
    for p in primes:
        parity = 0
        while n % p == 0:
            n //= p
            parity ^= 1
        if parity:
            output *= p
    assert n == 1
    return output


def local_cover(candidate, p, exponent, d2, d3):
    b1, b2, b3 = candidate
    q = p**exponent
    tables = []
    for coefficient in (b2, b3):
        table = {}
        for z in range(q):
            residue = coefficient * z * z % q
            table[residue] = table.get(residue, False) or z % p != 0
        tables.append(table)
    for z1 in range(q):
        base = b1 * z1 * z1
        for w in range(q):
            r2 = (base - d2 * w * w) % q
            r3 = (base - d3 * w * w) % q
            if r2 in tables[0] and r3 in tables[1]:
                if z1 % p or w % p or tables[0][r2] or tables[1][r3]:
                    return True
    return False


def local_p2(candidate, p, d2, d3):
    """Primitive projective solubility modulo an odd p^2."""
    b1, b2, b3 = candidate
    q = p * p
    tables = [{coefficient * z * z % q for z in range(q)}
              for coefficient in (b2, b3)]
    for z1 in range(q):  # w unit, scaled to one
        base = b1 * z1 * z1
        if (base - d2) % q in tables[0] and (base - d3) % q in tables[1]:
            return True
    for k in range(p):  # z1 unit, scaled to one; w=p*k
        w = p * k
        if (b1 - d2 * w * w) % q in tables[0] and \
                (b1 - d3 * w * w) % q in tables[1]:
            return True
    return False


def two_descent():
    differences = [ROOTS[i] - ROOTS[j] for i in range(3) for j in range(i)]
    primes = tuple(sorted(set(factors(math.prod(differences)))))
    generators = (-1,) + primes
    classes = []
    for mask in range(1 << len(generators)):
        value = 1
        for i, generator in enumerate(generators):
            if mask & (1 << i):
                value *= generator
        classes.append(value)
    candidates = [(x, y, squareclass(x, y, primes)) for x in classes for y in classes]
    d2, d3 = ROOTS[1] - ROOTS[0], ROOTS[2] - ROOTS[0]
    stages = []
    for p, exponent in MODULI:
        before = len(candidates)
        q = p**exponent
        cache = {}
        checker = local_p2 if p > 19 and exponent == 2 else None

        def soluble(candidate):
            key = tuple(value % q for value in candidate)
            if key not in cache:
                cache[key] = checker(candidate, p, d2, d3) if checker else \
                    local_cover(candidate, p, exponent, d2, d3)
            return cache[key]

        candidates = [candidate for candidate in candidates if soluble(candidate)]
        stages.append({"prime": p, "exponent": exponent, "modulus": q,
                       "before": before, "after": len(candidates)})
    witnesses = [
        {"class": [1, 1, 1], "point": [1, 1, 1, 0], "elliptic_point": "O"},
        {"class": [-1, -6887, 6887], "point": [169, 0, 85, 1],
         "elliptic_point": [-1221025, 0]},
        {"class": [-546, -78455, 253470], "point": [14, 1, 14, 1],
         "elliptic_point": [-1299480, 645841560]},
        {"class": [546, 107185, 346290], "point": [182, 13, 14, 1],
         "elliptic_point": [16893240, 149116629480]},
    ]
    assert set(candidates) == {tuple(row["class"]) for row in witnesses}
    return {
        "roots": list(ROOTS),
        "squareclass_primes": list(primes),
        "initial_candidates": len(classes) ** 2,
        "local_stages": stages,
        "survivors": [list(row) for row in candidates],
        "global_witnesses": witnesses,
        "local_upper": 4,
        "global_lower": 4,
        "selmer_size_by_upper_lower_sandwich": 4,
        "rational_two_torsion_size": 4,
        "rank": 0,
    }


def add(P, Q):
    if P is None:
        return Q
    if Q is None:
        return P
    x, y = P
    X, Y = Q
    if x == X and y == -Y:
        return None
    a2 = -sum(ROOTS)
    a4 = sum(ROOTS[i] * ROOTS[j] for i in range(3) for j in range(i))
    if P == Q:
        if y == 0:
            return None
        slope = (3 * x * x + 2 * a2 * x + a4) / (2 * y)
    else:
        slope = (Y - y) / (X - x)
    z = slope * slope - a2 - x - X
    return z, slope * (x - z) - y


def torsion_points():
    g1 = (Fraction(-1299480), Fraction(645841560))
    g2 = (Fraction(-1221025), Fraction(0))
    output = []
    for i in range(8):
        for j in range(2):
            P = None
            for _ in range(i):
                P = add(P, g1)
            if j:
                P = add(P, g2)
            output.append(P)
    assert len(set(output)) == 16
    return output


def curve_order(p):
    total = 1
    for x in range(p):
        rhs = math.prod((x - root) % p for root in ROOTS) % p
        total += sum(y * y % p == rhs for y in range(p))
    return total


def pullback(P):
    if P is None:
        return {"elliptic_point": "O", "location": "z=0", "z": [0, 1],
                "V": [0, 1], "z_is_square": True}
    X, Y = P
    if X == 0:
        return {"elliptic_point": [pair(X), pair(Y)], "location": "infinity",
                "z": None, "V": None, "z_is_square": None}
    z = Fraction(N, 1) / X
    V = Fraction(N, 1) * Y / X**2
    square = z >= 0 and math.isqrt(z.numerator)**2 == z.numerator and \
        math.isqrt(z.denominator)**2 == z.denominator
    return {"elliptic_point": [pair(X), pair(Y)], "location": "affine",
            "z": pair(z), "V": pair(V), "z_is_square": square}


def sign_points(values):
    a, b, c = values
    return [[x, y, z] for x in (-a, a) for y in (-b, b) for z in (-c, c)]


def document(source_hash, source):
    shared = next(row for row in source["shared_curves"] if row["triple"] == [84, 13, 85])
    projections = [row for row in source["primitive_frontier"]["positive_projection_records"]
                   if row["triple"] == [84, 13, 85]]
    positive_pairs = [row for row in source["quotient_ranking"]["positive_quotients"]
                      if row["triple"][2] == 85]
    rank_zero_pair = source["quotient_ranking"]["ratio_85_rank_zero_quotient"]
    pullbacks = [pullback(P) for P in torsion_points()]
    return {
        "schema": SCHEMA,
        "source_phase24_sha256": source_hash,
        "source_phase24_c85_provenance": {
            "shared_curve_record": shared,
            "positive_projection_records": projections,
            "positive_pair_quotients": positive_pairs,
            "rank_zero_84_85_pair_quotient": rank_zero_pair,
        },
        "triple": [84, 13, 85],
        "shared_curve": {
            "genus": 5,
            "equations": [
                {"variable": "D", "edge": 13, "constant": A},
                {"variable": "G", "edge": 84, "constant": B},
                {"variable": "H", "edge": 85, "constant": C},
            ],
            "cuboid_edges": ["t", 13, 84],
            "face_diagonals": ["D", "G", 85],
            "space_diagonal": "H",
            "genus_derivation": {
                "cover_degree": 8, "geometric_branch_points": 6,
                "ramification_per_branch": 4, "total_ramification": 24,
                "riemann_hurwitz": "2g-2=8*(-2)+24=8",
            },
            "rational_unramified_infinity_branches": 8,
        },
        "elliptic_quotient_inventory": [
            {"character": "13*84", "rank": 1, "source": "Phase24 positive quotient"},
            {"character": "13*85", "rank": 1, "source": "Phase24 positive quotient"},
            {"character": "84*85", "rank": 0, "source": "Phase24 exact 2-descent"},
            {"character": "13*84*85 odd", "rank": 1,
             "equation": "W^2=(z+169)(z+7056)(z+7225)",
             "point": [[-7153, 1], [6984, 1]],
             "good_reduction_obstruction": [
                 {"prime": 5, "curve_order": 8, "point_order": 4},
                 {"prime": 11, "curve_order": 16, "point_order": 8},
             ]},
            {"character": "13*84*85 even", "rank": 0,
             "equation": "V^2=z(z+169)(z+7056)(z+7225)",
             "role": "decisive"},
        ],
        "decisive_quotient": {
            "map_from_shared_curve": "z=t^2, V=tDGH",
            "elliptic_curve": {
                "equation": "Y^2=(X+1192464)(X+1221025)(X+50979600)",
                "roots": list(ROOTS),
                "discriminant": DISCRIMINANT,
                "map": "X=8615552400/z, Y=8615552400*V/z^2",
                "inverse": "z=8615552400/X, V=8615552400*Y/X^2",
                "exceptional": [
                    "(z,V)=(0,0) <-> O",
                    "quartic infinities +/- <-> (0,+/-8615552400)",
                ],
                "smooth_projective_isomorphism": True,
            },
            "two_descent": two_descent(),
            "torsion": {
                "structure": [8, 2],
                "generators": [[-1299480, 645841560], [-1221025, 0]],
                "exhibited_size": 16,
                "good_reductions": [
                    {"prime": 11, "discriminant_mod_prime": DISCRIMINANT % 11,
                     "curve_order": curve_order(11)},
                    {"prime": 19, "discriminant_mod_prime": DISCRIMINANT % 19,
                     "curve_order": curve_order(19)},
                ],
            },
            "complete_pullback_table": pullbacks,
            "only_square_finite_z": [[0, 1]],
            "pari_corroboration": {
                "version": [2, 17, 3], "selmer_f2_dimension": 2,
                "ellrank": [0, 0, 0, []],
                "elltors": [16, [8, 2],
                            [[-1299480, 645841560], [-1221025, 0]]],
                "hyperellratpoints_bound": 10000000,
                "logical_role": "bounded corroboration only",
            },
        },
        "classification": {
            "affine_t_zero_points": [{"t": 0, "DGH": row}
                                     for row in sign_points((13, 84, 85))],
            "points_at_infinity": [{"normalized_DGH": row}
                                   for row in sign_points((1, 1, 1))],
            "smooth_projective_count": 16,
            "complete": True,
        },
        "claim": {
            "ratio_85_completely_obstructed": True,
            "nonzero_shared_t_found": False,
            "perfect_cuboid_found": False,
        },
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="certificate.json")
    args = parser.parse_args()
    raw = SOURCE.read_bytes()
    digest = hashlib.sha256(raw).hexdigest()
    assert digest == SOURCE_HASH
    Path(args.output).write_text(json.dumps(document(digest, json.loads(raw)),
                                                indent=2, sort_keys=True) + "\n")


if __name__ == "__main__":
    main()


1	#!/usr/bin/env python3
2	"""Independent exact verifier for Phase 26."""
3	
4	from __future__ import annotations
5	
6	import hashlib
7	import json
8	import math
9	import re
10	import sys
11	from fractions import Fraction
12	from pathlib import Path
13	
14	SOURCE_HASH = "546b1c6044ae9ee528921f01609d95d2dae554a0504dfaf5801d1268aaef6b6b"
15	A, B, C = 169, 7056, 7225
16	AB, AC, BC, N = A * B, A * C, B * C, A * B * C
17	ROOTS = (-AB, -AC, -BC)
18	DISCRIMINANT = 16 * math.prod(
19	    (ROOTS[i] - ROOTS[j]) ** 2 for i in range(3) for j in range(i)
20	)
21	
22	
23	def factors(n):
24	    output = []
25	    n = abs(n)
26	    p = 2
27	    while p * p <= n:
28	        if n % p == 0:
29	            output.append(p)
30	            while n % p == 0:
31	                n //= p
32	        p += 1
33	    if n > 1:
34	        output.append(n)
35	    return output
36	
37	
38	def canonical(a, b, primes):
39	    n = a * b
40	    output = -1 if n < 0 else 1
41	    n = abs(n)
42	    for p in reversed(primes):
43	        exponent = 0
44	        while n % p == 0:
45	            n //= p
46	            exponent += 1
47	        if exponent % 2:
48	            output *= p
49	    assert n == 1
50	    return output
51	
52	
53	def local(candidate, p, exponent, d2, d3):
54	    b1, b2, b3 = candidate
55	    q = p**exponent
56	    tables = []
57	    for coefficient in (b2, b3):
58	        table = {}
59	        for z in reversed(range(q)):
60	            residue = coefficient * z * z % q
61	            table[residue] = table.get(residue, False) or z % p != 0
62	        tables.append(table)
63	    for w in reversed(range(q)):
64	        for z1 in reversed(range(q)):
65	            base = b1 * z1 * z1
66	            r2 = (base - d2 * w * w) % q
67	            r3 = (base - d3 * w * w) % q
68	            if r2 in tables[0] and r3 in tables[1]:
69	                if z1 % p or w % p or tables[0][r2] or tables[1][r3]:
70	                    return True
71	    return False
72	
73	
74	def local_p2(candidate, p, d2, d3):
75	    b1, b2, b3 = candidate
76	    q = p * p
77	    tables = [{coefficient * z * z % q for z in reversed(range(q))}
78	              for coefficient in (b2, b3)]
79	    for z1 in reversed(range(q)):
80	        base = b1 * z1 * z1
81	        if (base - d2) % q in tables[0] and (base - d3) % q in tables[1]:
82	            return True
83	    for k in reversed(range(p)):
84	        w = p * k
85	        if (b1 - d2 * w * w) % q in tables[0] and \
86	                (b1 - d3 * w * w) % q in tables[1]:
87	            return True
88	    return False
89	
90	
91	def verify_descent(item):
92	    assert tuple(item["roots"]) == ROOTS
93	    differences = [ROOTS[i] - ROOTS[j] for i in range(3) for j in range(i)]
94	    primes = tuple(sorted(set(factors(math.prod(differences)))))
95	    assert list(primes) == item["squareclass_primes"] == [2, 3, 5, 7, 13, 17, 71, 97]
96	    generators = (-1,) + primes
97	    classes = []
98	    for mask in reversed(range(1 << len(generators))):
99	        value = 1
100	        for i, generator in enumerate(generators):
101	            if mask & (1 << i):
102	                value *= generator
103	        classes.append(value)
104	    candidates = [(x, y, canonical(x, y, primes))
105	                  for x in reversed(classes) for y in reversed(classes)]
106	    assert len(candidates) == item["initial_candidates"] == 262144
107	    d2, d3 = ROOTS[1] - ROOTS[0], ROOTS[2] - ROOTS[0]
108	    rebuilt_stages = []
109	    for stage in item["local_stages"]:
110	        p, exponent = stage["prime"], stage["exponent"]
111	        q = p**exponent
112	        before = len(candidates)
113	        cache = {}
114	        checker = local_p2 if p > 19 and exponent == 2 else None
115	
116	        def soluble(candidate):
117	            key = tuple(value % q for value in candidate)
118	            if key not in cache:
119	                cache[key] = checker(candidate, p, d2, d3) if checker else \
120	                    local(candidate, p, exponent, d2, d3)
121	            return cache[key]
122	
123	        candidates = [candidate for candidate in candidates if soluble(candidate)]
124	        rebuilt_stages.append({"prime": p, "exponent": exponent, "modulus": q,
125	                               "before": before, "after": len(candidates)})
126	    assert rebuilt_stages == item["local_stages"]
127	    survivors = {tuple(row) for row in candidates}
128	    assert survivors == {tuple(row) for row in item["survivors"]}
129	    witnesses = item["global_witnesses"]
130	    assert survivors == {tuple(row["class"]) for row in witnesses}
131	    for witness in witnesses:
132	        b1, b2, b3 = witness["class"]
133	        z1, z2, z3, w = witness["point"]
134	        assert b1 * z1*z1 - b2 * z2*z2 == d2 * w*w
135	        assert b1 * z1*z1 - b3 * z3*z3 == d3 * w*w
136	        if witness["elliptic_point"] != "O":
137	            x, y = witness["elliptic_point"]
138	            assert y*y == math.prod(x - root for root in ROOTS)
139	    assert len(survivors) == item["local_upper"] == item["global_lower"] == 4
140	    assert item["selmer_size_by_upper_lower_sandwich"] == 4
141	    assert item["rational_two_torsion_size"] == 4
142	    selmer_dimension = item["selmer_size_by_upper_lower_sandwich"].bit_length() - 1
143	    torsion_dimension = item["rational_two_torsion_size"].bit_length() - 1
144	    assert (selmer_dimension, torsion_dimension) == (2, 2)
145	    assert selmer_dimension - torsion_dimension == item["rank"] == 0
146	
147	
148	def add(P, Q):
149	    """General-Weierstrass law, independent of the generator specialization."""
150	    if P is None:
151	        return Q
152	    if Q is None:
153	        return P
154	    x, y = P
155	    X, Y = Q
156	    a1, a2, a3 = Fraction(0), Fraction(-sum(ROOTS)), Fraction(0)
157	    a4 = Fraction(sum(ROOTS[i] * ROOTS[j] for i in range(3) for j in range(i)))
158	    a6 = Fraction(-math.prod(ROOTS))
159	    if x == X and y + Y + a1*x + a3 == 0:
160	        return None
161	    if P == Q:
162	        denominator = 2*y + a1*x + a3
163	        if denominator == 0:
164	            return None
165	        slope = (3*x*x + 2*a2*x + a4 - a1*y) / denominator
166	        intercept = (-x**3 + a4*x + 2*a6 - a3*y) / denominator
167	    else:
168	        slope = (Y-y)/(X-x)
169	        intercept = (y*X-Y*x)/(X-x)
170	    z = slope*slope + a1*slope - a2 - x - X
171	    return z, -(slope+a1)*z - intercept - a3
172	
173	
174	def curve_order(roots, p):
175	    total = 1
176	    for x in reversed(range(p)):
177	        rhs = math.prod((x-root) % p for root in roots) % p
178	        total += sum(y*y % p == rhs for y in reversed(range(p)))
179	    return total
180	
181	
182	def finite_add(P, Q, roots, p):
183	    if P is None:
184	        return Q
185	    if Q is None:
186	        return P
187	    x, y = P
188	    X, Y = Q
189	    if x == X and (y+Y) % p == 0:
190	        return None
191	    a2 = -sum(roots) % p
192	    a4 = sum(roots[i]*roots[j] for i in range(3) for j in range(i)) % p
193	    if P == Q:
194	        if y % p == 0:
195	            return None
196	        slope = (3*x*x+2*a2*x+a4)*pow(2*y, -1, p) % p
197	        intercept = (-x**3+a4*x-2*math.prod(roots))*pow(2*y, -1, p) % p
198	    else:
199	        slope = (Y-y)*pow(X-x, -1, p) % p
200	        intercept = (y*X-Y*x)*pow(X-x, -1, p) % p
201	    z = (slope*slope-a2-x-X) % p
202	    return z, (-slope*z-intercept) % p
203	
204	
205	def reduced_order(point, roots, p):
206	    P = tuple(value.numerator*pow(value.denominator, -1, p) % p for value in point)
207	    multiple = None
208	    for order in range(1, curve_order(roots, p)+1):
209	        multiple = finite_add(multiple, P, roots, p)
210	        if multiple is None:
211	            return order
212	    raise AssertionError
213	
214	
215	def parse_value(text):
216	    tokens = re.findall(r"\[|\]|,|-?\d+(?:/\d+)?", text)
217	    position = 0
218	
219	    def parse():
220	        nonlocal position
221	        if tokens[position] == "[":
222	            position += 1
223	            output = []
224	            while tokens[position] != "]":
225	                output.append(parse())
226	                if tokens[position] == ",":
227	                    position += 1
228	            position += 1
229	            return output
230	        value = Fraction(tokens[position])
231	        position += 1
232	        return value
233	
234	    result = parse()
235	    assert position == len(tokens)
236	    return result
237	
238	
239	def integralize(value):
240	    if isinstance(value, list):
241	        return [integralize(row) for row in value]
242	    assert value.denominator == 1
243	    return value.numerator
244	
245	
246	def parse_transcript(text):
247	    assert "verbatim selected" in text and "bounded corroboration" in text
248	    lines = [line for line in text.splitlines() if line and not line.startswith("#")]
249	    result = {}
250	    for line in lines:
251	        if line.startswith("Selmer rank: "):
252	            result["selmer"] = int(line.removeprefix("Selmer rank: "))
253	        else:
254	            key, value = line.split("=", 1)
255	            result[key] = parse_value(value) if value.startswith("[") else int(value)
256	    assert set(result) == {"PARI_VERSION", "selmer", "ELLRANK", "ELLTORS",
257	                           "SEARCH_BOUND", "QUARTIC_POINTS"}
258	    return result
259	
260	
261	def verify_document(doc, source, transcript_text):
262	    assert doc["schema"] == "perfect-cuboid-c85-shared-curve-v1"
263	    assert doc["source_phase24_sha256"] == SOURCE_HASH
264	    assert doc["triple"] == [84, 13, 85] and 84**2 + 13**2 == 85**2
265	    provenance = doc["source_phase24_c85_provenance"]
266	    assert provenance["shared_curve_record"] == next(
267	        row for row in source["shared_curves"] if row["triple"] == [84, 13, 85]
268	    )
269	    projections = [row for row in source["primitive_frontier"]["positive_projection_records"]
270	                   if row["triple"] == [84, 13, 85]]
271	    assert provenance["positive_projection_records"] == projections and len(projections) == 2
272	    positive_pairs = [row for row in source["quotient_ranking"]["positive_quotients"]
273	                      if row["triple"][2] == 85]
274	    assert provenance["positive_pair_quotients"] == positive_pairs and len(positive_pairs) == 2
275	    assert provenance["rank_zero_84_85_pair_quotient"] == \
276	        source["quotient_ranking"]["ratio_85_rank_zero_quotient"]
277	
278	    shared = doc["shared_curve"]
279	    assert [row["constant"] for row in shared["equations"]] == [A, B, C]
280	    assert shared["cuboid_edges"] == ["t", 13, 84]
281	    assert shared["face_diagonals"] == ["D", "G", 85] and \
282	        shared["space_diagonal"] == "H"
283	    genus = shared["genus_derivation"]
284	    assert len({A, B, C}) == 3
285	    assert genus["cover_degree"] == 8 and genus["geometric_branch_points"] == 6
286	    assert genus["ramification_per_branch"] == 4
287	    assert genus["total_ramification"] == 24
288	    assert 2*shared["genus"]-2 == -16+24
289	    assert shared["rational_unramified_infinity_branches"] == 8
290	
291	    inventory = doc["elliptic_quotient_inventory"]
292	    assert [(row["character"], row["rank"]) for row in inventory] == [
293	        ("13*84", 1), ("13*85", 1), ("84*85", 0),
294	        ("13*84*85 odd", 1), ("13*84*85 even", 0),
295	    ]
296	    odd = inventory[3]
297	    z, w = (Fraction(*row) for row in odd["point"])
298	    odd_roots = (-A, -B, -C)
299	    odd_disc = 16*math.prod((odd_roots[i]-odd_roots[j])**2
300	                            for i in range(3) for j in range(i))
301	    assert w*w == math.prod(z-root for root in odd_roots)
302	    for row in odd["good_reduction_obstruction"]:
303	        p = row["prime"]
304	        assert p % 2 and odd_disc % p
305	        assert row["curve_order"] == curve_order(odd_roots, p)
306	        assert row["point_order"] == reduced_order((z, w), odd_roots, p)
307	    assert [row["point_order"] for row in odd["good_reduction_obstruction"]] == [4, 8]
308	
309	    decisive = doc["decisive_quotient"]
310	    elliptic = decisive["elliptic_curve"]
311	    assert elliptic["roots"] == list(ROOTS)
312	    assert elliptic["discriminant"] == DISCRIMINANT
313	    assert N == 8615552400 and AB*AC*BC == N*N
314	    assert (N//A, N//B, N//C) == (BC, AC, AB)
315	    assert elliptic["smooth_projective_isomorphism"] is True
316	    assert elliptic["exceptional"] == [
317	        "(z,V)=(0,0) <-> O",
318	        "quartic infinities +/- <-> (0,+/-8615552400)",
319	    ]
320	    assert N*N == math.prod(-root for root in ROOTS)
321	    verify_descent(decisive["two_descent"])
322	
323	    torsion = decisive["torsion"]
324	    g1 = tuple(map(Fraction, torsion["generators"][0]))
325	    g2 = tuple(map(Fraction, torsion["generators"][1]))
326	    points = []
327	    for i in range(8):
328	        for j in range(2):
329	            P = None
330	            for _ in range(i):
331	                P = add(P, g1)
332	            if j:
333	                P = add(P, g2)
334	            points.append(P)
335	    assert len(set(points)) == torsion["exhibited_size"] == 16
336	    four_g1 = add(add(g1, g1), add(g1, g1))
337	    assert four_g1 is not None and add(four_g1, four_g1) is None
338	    assert add(g2, g2) is None
339	    for row in torsion["good_reductions"]:
340	        p = row["prime"]
341	        assert p in (11, 19) and p % 2
342	        assert row["discriminant_mod_prime"] == DISCRIMINANT % p != 0
343	        assert row["curve_order"] == curve_order(ROOTS, p) == 16
344	
345	    table = decisive["complete_pullback_table"]
346	    rebuilt = []
347	    for P in points:
348	        if P is None:
349	            rebuilt.append(("z=0", Fraction(0), Fraction(0), True))
350	        elif P[0] == 0:
351	            rebuilt.append(("infinity", None, None, None))
352	        else:
353	            X, Y = P
354	            zz = Fraction(N, 1)/X
355	            V = Fraction(N, 1)*Y/X**2
356	            assert V*V == zz*(zz+A)*(zz+B)*(zz+C)
357	            square = zz >= 0 and math.isqrt(zz.numerator)**2 == zz.numerator and \
358	                math.isqrt(zz.denominator)**2 == zz.denominator
359	            rebuilt.append(("affine", zz, V, square))
360	    encoded = []
361	    for row in table:
362	        encoded.append((row["location"], None if row["z"] is None else Fraction(*row["z"]),
363	                        None if row["V"] is None else Fraction(*row["V"]),
364	                        row["z_is_square"]))
365	    assert encoded == rebuilt
366	    assert [z for _, z, _, square in rebuilt if z is not None and square] == [Fraction(0)]
367	    assert decisive["only_square_finite_z"] == [[0, 1]]
368	    assert [z for _, z, _, _ in rebuilt if z is not None and z > 0] == \
369	        [Fraction(510), Fraction(510)]
370	    assert math.isqrt(510)**2 != 510
371	
372	    transcript = parse_transcript(transcript_text)
373	    pari = decisive["pari_corroboration"]
374	    assert integralize(transcript["PARI_VERSION"]) == pari["version"]
375	    assert transcript["selmer"] == pari["selmer_f2_dimension"] == 2
376	    assert integralize(transcript["ELLRANK"]) == pari["ellrank"]
377	    assert integralize(transcript["ELLTORS"]) == pari["elltors"]
378	    assert transcript["SEARCH_BOUND"] == pari["hyperellratpoints_bound"]
379	    assert pari["logical_role"] == "bounded corroboration only"
380	    transcript_points = {(row[0], row[1]) for row in transcript["QUARTIC_POINTS"]}
381	    pullback_points = {(z, V) for location, z, V, _ in rebuilt if location != "infinity"}
382	    assert transcript_points == pullback_points
383	
384	    classification = doc["classification"]
385	    affine = {tuple(row["DGH"]) for row in classification["affine_t_zero_points"]}
386	    infinity = {tuple(row["normalized_DGH"]) for row in classification["points_at_infinity"]}
387	    assert affine == {(d, g, h) for d in (-13, 13) for g in (-84, 84) for h in (-85, 85)}
388	    assert infinity == {(d, g, h) for d in (-1, 1) for g in (-1, 1) for h in (-1, 1)}
389	    assert classification["smooth_projective_count"] == 16
390	    assert classification["complete"] is True
391	    assert doc["claim"] == {
392	        "ratio_85_completely_obstructed": True,
393	        "nonzero_shared_t_found": False,
394	        "perfect_cuboid_found": False,
395	    }
396	
397	
398	def main():
399	    cert = Path(sys.argv[1] if len(sys.argv) > 1 else "certificate.json")
400	    source_path = Path(sys.argv[2] if len(sys.argv) > 2 else
401	                       "../phase24-next-birank-quotients/certificate.json")
402	    transcript_path = Path(sys.argv[3] if len(sys.argv) > 3 else "pari_transcript.txt")
403	    raw = source_path.read_bytes()
404	    assert hashlib.sha256(raw).hexdigest() == SOURCE_HASH
405	    verify_document(json.loads(cert.read_text()), json.loads(raw),
406	                    transcript_path.read_text())
407	    print("verified complete c=85 shared-curve obstruction")
408	
409	
410	if __name__ == "__main__":
411	    main()
412	

#!/usr/bin/env python3
"""Independent exact verifier for Phase 26."""

from __future__ import annotations

import hashlib
import json
import math
import re
import sys
from fractions import Fraction
from pathlib import Path

SOURCE_HASH = "546b1c6044ae9ee528921f01609d95d2dae554a0504dfaf5801d1268aaef6b6b"
A, B, C = 169, 7056, 7225
AB, AC, BC, N = A * B, A * C, B * C, A * B * C
ROOTS = (-AB, -AC, -BC)
DISCRIMINANT = 16 * math.prod(
    (ROOTS[i] - ROOTS[j]) ** 2 for i in range(3) for j in range(i)
)


def factors(n):
    output = []
    n = abs(n)
    p = 2
    while p * p <= n:
        if n % p == 0:
            output.append(p)
            while n % p == 0:
                n //= p
        p += 1
    if n > 1:
        output.append(n)
    return output


def canonical(a, b, primes):
    n = a * b
    output = -1 if n < 0 else 1
    n = abs(n)
    for p in reversed(primes):
        exponent = 0
        while n % p == 0:
            n //= p
            exponent += 1
        if exponent % 2:
            output *= p
    assert n == 1
    return output


def local(candidate, p, exponent, d2, d3):
    b1, b2, b3 = candidate
    q = p**exponent
    tables = []
    for coefficient in (b2, b3):
        table = {}
        for z in reversed(range(q)):
            residue = coefficient * z * z % q
            table[residue] = table.get(residue, False) or z % p != 0
        tables.append(table)
    for w in reversed(range(q)):
        for z1 in reversed(range(q)):
            base = b1 * z1 * z1
            r2 = (base - d2 * w * w) % q
            r3 = (base - d3 * w * w) % q
            if r2 in tables[0] and r3 in tables[1]:
                if z1 % p or w % p or tables[0][r2] or tables[1][r3]:
                    return True
    return False


def local_p2(candidate, p, d2, d3):
    b1, b2, b3 = candidate
    q = p * p
    tables = [{coefficient * z * z % q for z in reversed(range(q))}
              for coefficient in (b2, b3)]
    for z1 in reversed(range(q)):
        base = b1 * z1 * z1
        if (base - d2) % q in tables[0] and (base - d3) % q in tables[1]:
            return True
    for k in reversed(range(p)):
        w = p * k
        if (b1 - d2 * w * w) % q in tables[0] and \
                (b1 - d3 * w * w) % q in tables[1]:
            return True
    return False


def verify_descent(item):
    assert tuple(item["roots"]) == ROOTS
    differences = [ROOTS[i] - ROOTS[j] for i in range(3) for j in range(i)]
    primes = tuple(sorted(set(factors(math.prod(differences)))))
    assert list(primes) == item["squareclass_primes"] == [2, 3, 5, 7, 13, 17, 71, 97]
    generators = (-1,) + primes
    classes = []
    for mask in reversed(range(1 << len(generators))):
        value = 1
        for i, generator in enumerate(generators):
            if mask & (1 << i):
                value *= generator
        classes.append(value)
    candidates = [(x, y, canonical(x, y, primes))
                  for x in reversed(classes) for y in reversed(classes)]
    assert len(candidates) == item["initial_candidates"] == 262144
    d2, d3 = ROOTS[1] - ROOTS[0], ROOTS[2] - ROOTS[0]
    rebuilt_stages = []
    for stage in item["local_stages"]:
        p, exponent = stage["prime"], stage["exponent"]
        q = p**exponent
        before = len(candidates)
        cache = {}
        checker = local_p2 if p > 19 and exponent == 2 else None

        def soluble(candidate):
            key = tuple(value % q for value in candidate)
            if key not in cache:
                cache[key] = checker(candidate, p, d2, d3) if checker else \
                    local(candidate, p, exponent, d2, d3)
            return cache[key]

        candidates = [candidate for candidate in candidates if soluble(candidate)]
        rebuilt_stages.append({"prime": p, "exponent": exponent, "modulus": q,
                               "before": before, "after": len(candidates)})
    assert rebuilt_stages == item["local_stages"]
    survivors = {tuple(row) for row in candidates}
    assert survivors == {tuple(row) for row in item["survivors"]}
    witnesses = item["global_witnesses"]
    assert survivors == {tuple(row["class"]) for row in witnesses}
    for witness in witnesses:
        b1, b2, b3 = witness["class"]
        z1, z2, z3, w = witness["point"]
        assert b1 * z1*z1 - b2 * z2*z2 == d2 * w*w
        assert b1 * z1*z1 - b3 * z3*z3 == d3 * w*w
        if witness["elliptic_point"] != "O":
            x, y = witness["elliptic_point"]
            assert y*y == math.prod(x - root for root in ROOTS)
    assert len(survivors) == item["local_upper"] == item["global_lower"] == 4
    assert item["selmer_size_by_upper_lower_sandwich"] == 4
    assert item["rational_two_torsion_size"] == 4
    selmer_dimension = item["selmer_size_by_upper_lower_sandwich"].bit_length() - 1
    torsion_dimension = item["rational_two_torsion_size"].bit_length() - 1
    assert (selmer_dimension, torsion_dimension) == (2, 2)
    assert selmer_dimension - torsion_dimension == item["rank"] == 0


def add(P, Q):
    """General-Weierstrass law, independent of the generator specialization."""
    if P is None:
        return Q
    if Q is None:
        return P
    x, y = P
    X, Y = Q
    a1, a2, a3 = Fraction(0), Fraction(-sum(ROOTS)), Fraction(0)
    a4 = Fraction(sum(ROOTS[i] * ROOTS[j] for i in range(3) for j in range(i)))
    a6 = Fraction(-math.prod(ROOTS))
    if x == X and y + Y + a1*x + a3 == 0:
        return None
    if P == Q:
        denominator = 2*y + a1*x + a3
        if denominator == 0:
            return None
        slope = (3*x*x + 2*a2*x + a4 - a1*y) / denominator
        intercept = (-x**3 + a4*x + 2*a6 - a3*y) / denominator
    else:
        slope = (Y-y)/(X-x)
        intercept = (y*X-Y*x)/(X-x)
    z = slope*slope + a1*slope - a2 - x - X
    return z, -(slope+a1)*z - intercept - a3


def curve_order(roots, p):
    total = 1
    for x in reversed(range(p)):
        rhs = math.prod((x-root) % p for root in roots) % p
        total += sum(y*y % p == rhs for y in reversed(range(p)))
    return total


def finite_add(P, Q, roots, p):
    if P is None:
        return Q
    if Q is None:
        return P
    x, y = P
    X, Y = Q
    if x == X and (y+Y) % p == 0:
        return None
    a2 = -sum(roots) % p
    a4 = sum(roots[i]*roots[j] for i in range(3) for j in range(i)) % p
    if P == Q:
        if y % p == 0:
            return None
        slope = (3*x*x+2*a2*x+a4)*pow(2*y, -1, p) % p
        intercept = (-x**3+a4*x-2*math.prod(roots))*pow(2*y, -1, p) % p
    else:
        slope = (Y-y)*pow(X-x, -1, p) % p
        intercept = (y*X-Y*x)*pow(X-x, -1, p) % p
    z = (slope*slope-a2-x-X) % p
    return z, (-slope*z-intercept) % p


def reduced_order(point, roots, p):
    P = tuple(value.numerator*pow(value.denominator, -1, p) % p for value in point)
    multiple = None
    for order in range(1, curve_order(roots, p)+1):
        multiple = finite_add(multiple, P, roots, p)
        if multiple is None:
            return order
    raise AssertionError


def parse_value(text):
    tokens = re.findall(r"\[|\]|,|-?\d+(?:/\d+)?", text)
    position = 0

    def parse():
        nonlocal position
        if tokens[position] == "[":
            position += 1
            output = []
            while tokens[position] != "]":
                output.append(parse())
                if tokens[position] == ",":
                    position += 1
            position += 1
            return output
        value = Fraction(tokens[position])
        position += 1
        return value

    result = parse()
    assert position == len(tokens)
    return result


def integralize(value):
    if isinstance(value, list):
        return [integralize(row) for row in value]
    assert value.denominator == 1
    return value.numerator


def parse_transcript(text):
    assert "verbatim selected" in text and "bounded corroboration" in text
    lines = [line for line in text.splitlines() if line and not line.startswith("#")]
    result = {}
    for line in lines:
        if line.startswith("Selmer rank: "):
            result["selmer"] = int(line.removeprefix("Selmer rank: "))
        else:
            key, value = line.split("=", 1)
            result[key] = parse_value(value) if value.startswith("[") else int(value)
    assert set(result) == {"PARI_VERSION", "selmer", "ELLRANK", "ELLTORS",
                           "SEARCH_BOUND", "QUARTIC_POINTS"}
    return result


def verify_document(doc, source, transcript_text):
    assert doc["schema"] == "perfect-cuboid-c85-shared-curve-v1"
    assert doc["source_phase24_sha256"] == SOURCE_HASH
    assert doc["triple"] == [84, 13, 85] and 84**2 + 13**2 == 85**2
    provenance = doc["source_phase24_c85_provenance"]
    assert provenance["shared_curve_record"] == next(
        row for row in source["shared_curves"] if row["triple"] == [84, 13, 85]
    )
    projections = [row for row in source["primitive_frontier"]["positive_projection_records"]
                   if row["triple"] == [84, 13, 85]]
    assert provenance["positive_projection_records"] == projections and len(projections) == 2
    positive_pairs = [row for row in source["quotient_ranking"]["positive_quotients"]
                      if row["triple"][2] == 85]
    assert provenance["positive_pair_quotients"] == positive_pairs and len(positive_pairs) == 2
    assert provenance["rank_zero_84_85_pair_quotient"] == \
        source["quotient_ranking"]["ratio_85_rank_zero_quotient"]

    shared = doc["shared_curve"]
    assert [row["constant"] for row in shared["equations"]] == [A, B, C]
    assert shared["cuboid_edges"] == ["t", 13, 84]
    assert shared["face_diagonals"] == ["D", "G", 85] and \
        shared["space_diagonal"] == "H"
    genus = shared["genus_derivation"]
    assert len({A, B, C}) == 3
    assert genus["cover_degree"] == 8 and genus["geometric_branch_points"] == 6
    assert genus["ramification_per_branch"] == 4
    assert genus["total_ramification"] == 24
    assert 2*shared["genus"]-2 == -16+24
    assert shared["rational_unramified_infinity_branches"] == 8

    inventory = doc["elliptic_quotient_inventory"]
    assert [(row["character"], row["rank"]) for row in inventory] == [
        ("13*84", 1), ("13*85", 1), ("84*85", 0),
        ("13*84*85 odd", 1), ("13*84*85 even", 0),
    ]
    odd = inventory[3]
    z, w = (Fraction(*row) for row in odd["point"])
    odd_roots = (-A, -B, -C)
    odd_disc = 16*math.prod((odd_roots[i]-odd_roots[j])**2
                            for i in range(3) for j in range(i))
    assert w*w == math.prod(z-root for root in odd_roots)
    for row in odd["good_reduction_obstruction"]:
        p = row["prime"]
        assert p % 2 and odd_disc % p
        assert row["curve_order"] == curve_order(odd_roots, p)
        assert row["point_order"] == reduced_order((z, w), odd_roots, p)
    assert [row["point_order"] for row in odd["good_reduction_obstruction"]] == [4, 8]

    decisive = doc["decisive_quotient"]
    elliptic = decisive["elliptic_curve"]
    assert elliptic["roots"] == list(ROOTS)
    assert elliptic["discriminant"] == DISCRIMINANT
    assert N == 8615552400 and AB*AC*BC == N*N
    assert (N//A, N//B, N//C) == (BC, AC, AB)
    assert elliptic["smooth_projective_isomorphism"] is True
    assert elliptic["exceptional"] == [
        "(z,V)=(0,0) <-> O",
        "quartic infinities +/- <-> (0,+/-8615552400)",
    ]
    assert N*N == math.prod(-root for root in ROOTS)
    verify_descent(decisive["two_descent"])

    torsion = decisive["torsion"]
    g1 = tuple(map(Fraction, torsion["generators"][0]))
    g2 = tuple(map(Fraction, torsion["generators"][1]))
    points = []
    for i in range(8):
        for j in range(2):
            P = None
            for _ in range(i):
                P = add(P, g1)
            if j:
                P = add(P, g2)
            points.append(P)
    assert len(set(points)) == torsion["exhibited_size"] == 16
    four_g1 = add(add(g1, g1), add(g1, g1))
    assert four_g1 is not None and add(four_g1, four_g1) is None
    assert add(g2, g2) is None
    for row in torsion["good_reductions"]:
        p = row["prime"]
        assert p in (11, 19) and p % 2
        assert row["discriminant_mod_prime"] == DISCRIMINANT % p != 0
        assert row["curve_order"] == curve_order(ROOTS, p) == 16

    table = decisive["complete_pullback_table"]
    rebuilt = []
    for P in points:
        if P is None:
            rebuilt.append(("z=0", Fraction(0), Fraction(0), True))
        elif P[0] == 0:
            rebuilt.append(("infinity", None, None, None))
        else:
            X, Y = P
            zz = Fraction(N, 1)/X
            V = Fraction(N, 1)*Y/X**2
            assert V*V == zz*(zz+A)*(zz+B)*(zz+C)
            square = zz >= 0 and math.isqrt(zz.numerator)**2 == zz.numerator and \
                math.isqrt(zz.denominator)**2 == zz.denominator
            rebuilt.append(("affine", zz, V, square))
    encoded = []
    for row in table:
        encoded.append((row["location"], None if row["z"] is None else Fraction(*row["z"]),
                        None if row["V"] is None else Fraction(*row["V"]),
                        row["z_is_square"]))
    assert encoded == rebuilt
    assert [z for _, z, _, square in rebuilt if z is not None and square] == [Fraction(0)]
    assert decisive["only_square_finite_z"] == [[0, 1]]
    assert [z for _, z, _, _ in rebuilt if z is not None and z > 0] == \
        [Fraction(510), Fraction(510)]
    assert math.isqrt(510)**2 != 510

    transcript = parse_transcript(transcript_text)
    pari = decisive["pari_corroboration"]
    assert integralize(transcript["PARI_VERSION"]) == pari["version"]
    assert transcript["selmer"] == pari["selmer_f2_dimension"] == 2
    assert integralize(transcript["ELLRANK"]) == pari["ellrank"]
    assert integralize(transcript["ELLTORS"]) == pari["elltors"]
    assert transcript["SEARCH_BOUND"] == pari["hyperellratpoints_bound"]
    assert pari["logical_role"] == "bounded corroboration only"
    transcript_points = {(row[0], row[1]) for row in transcript["QUARTIC_POINTS"]}
    pullback_points = {(z, V) for location, z, V, _ in rebuilt if location != "infinity"}
    assert transcript_points == pullback_points

    classification = doc["classification"]
    affine = {tuple(row["DGH"]) for row in classification["affine_t_zero_points"]}
    infinity = {tuple(row["normalized_DGH"]) for row in classification["points_at_infinity"]}
    assert affine == {(d, g, h) for d in (-13, 13) for g in (-84, 84) for h in (-85, 85)}
    assert infinity == {(d, g, h) for d in (-1, 1) for g in (-1, 1) for h in (-1, 1)}
    assert classification["smooth_projective_count"] == 16
    assert classification["complete"] is True
    assert doc["claim"] == {
        "ratio_85_completely_obstructed": True,
        "nonzero_shared_t_found": False,
        "perfect_cuboid_found": False,
    }


def main():
    cert = Path(sys.argv[1] if len(sys.argv) > 1 else "certificate.json")
    source_path = Path(sys.argv[2] if len(sys.argv) > 2 else
                       "../phase24-next-birank-quotients/certificate.json")
    transcript_path = Path(sys.argv[3] if len(sys.argv) > 3 else "pari_transcript.txt")
    raw = source_path.read_bytes()
    assert hashlib.sha256(raw).hexdigest() == SOURCE_HASH
    verify_document(json.loads(cert.read_text()), json.loads(raw),
                    transcript_path.read_text())
    print("verified complete c=85 shared-curve obstruction")


if __name__ == "__main__":
    main()
