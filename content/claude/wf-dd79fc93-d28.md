---
title: "wf_dd79fc93 d28"
---

_6 transcript files aggregated._

Read the CURRENT enrichment implementation in the repo at /Users/kuber.mehta/Projects/marketing-outbound. Focus on:
- gtm_engine/gemini_enrichment.py (~1897 lines) — read it in full
- gtm_engine/enrichment.py (~1080 lines) — read it in full
- tests/test_gemini_enrichment_verification.py — read it

Map the pipeline EXACTLY as the code does it today: entry points, the order of operations, how candidate domains are produced, how they are verified/accepted/rejected, every confidence threshold and cap, what state/status fields exist and their values, what Gemini is actually called for vs what deterministic/SearXNG logic does, and any TODO/loose checks/known-weak spots. Cite file:line for every important claim. Return the structured object.

- graphify: Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the question should be treated as a graphify query first. Turns any input (code, docs, papers, images, videos) into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.
- vpsmaxxing: Set up and manage a personal cloud VPS as a dedicated remote workbench for AI coding agents (Claude Code + OpenAI Codex). Covers provisioning (git/node/pnpm/docker/tmux), installing & authenticating the agents, a self-aware agent environment, Tailscale networking (SSH with no exposed ports), a tmux + cmux cockpit, localhost port tunneling, reverse VPS→laptop file access (including a no-admin path for managed/work laptops), one-time migration of your skills/memory/history/credentials, and automatic two-way sync. Use this when the user wants to run AI agents on a server, offload heavy or parallel agent work off their laptop, "set up a VPS for Claude Code / Codex", spin up a remote agent box, or keep an agent setup synced across machines.
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
- review: Review a pull request
- security-review: Complete a security review of the pending changes on the current branch

I'll read the three files in full to map the current enrichment implementation.

<system-reminder>[Truncated: PARTIAL view — showing lines 1-1287 of 1898 total (31318 tokens, cap 25000). Call Read with offset=1288 limit=1287 for the next page, or Grep to find a specific section. Do NOT answer from this page alone if the answer may be further in the file.]</system-reminder>

1	#!/usr/bin/env python3
2	"""Gemini-backed enrichment for the SQLite GTM workbench.
3	
4	This is the SQLite-native version of the older Postgres enrichment lanes:
5	
6	* optional grounded Gemini domain discovery for leads without a website;
7	* bounded website crawl for contacts, socials, payment, and site quality;
8	* Gemini profile/classification from the crawled evidence;
9	* rescore into the current Razorpay-calibrated GTM score columns.
10	
11	The module is intentionally explicit and budget-friendly: no Gemini calls happen
12	unless a caller runs a batch or a single lead.
13	"""
14	from __future__ import annotations
15	
16	import json
17	import os
18	import re
19	import sqlite3
20	import time
21	from dataclasses import dataclass
22	from datetime import datetime, timezone
23	from typing import Any
24	from urllib.parse import urljoin, urlparse
25	
26	import requests
27	
28	try:
29	    from gtm_engine.enrichment import (
30	        DEFAULT_SEARXNG_URL,
31	        HTTP_UA,
32	        SearXNGClient,
33	        build_queries,
34	        identity_tokens,
35	        normalize_host,
36	        root_domain,
37	        score_result,
38	    )
39	except ModuleNotFoundError:  # pragma: no cover - direct script execution fallback
40	    import sys
41	    from pathlib import Path
42	
43	    ROOT = Path(__file__).resolve().parents[1]
44	    if str(ROOT) not in sys.path:
45	        sys.path.insert(0, str(ROOT))
46	    try:
47	        from gtm_engine.enrichment import (
48	            DEFAULT_SEARXNG_URL,
49	            HTTP_UA,
50	            SearXNGClient,
51	            build_queries,
52	            identity_tokens,
53	            normalize_host,
54	            root_domain,
55	            score_result,
56	        )
57	    except ModuleNotFoundError:
58	        from enrichment import (  # type: ignore
59	            DEFAULT_SEARXNG_URL,
60	            HTTP_UA,
61	            SearXNGClient,
62	            build_queries,
63	            identity_tokens,
64	            normalize_host,
65	            root_domain,
66	            score_result,
67	        )
68	
69	try:
70	    from outbound_scrapers.gates import rzp_quality
71	except ModuleNotFoundError:  # pragma: no cover - direct script use fallback
72	    import sys
73	    from pathlib import Path
74	
75	    ROOT = Path(__file__).resolve().parents[1]
76	    SRC_DIR = ROOT / "src"
77	    if str(SRC_DIR) not in sys.path:
78	        sys.path.insert(0, str(SRC_DIR))
79	    from outbound_scrapers.gates import rzp_quality  # type: ignore
80	
81	
82	DEFAULT_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
83	DEFAULT_ENDPOINT_TMPL = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
84	
85	# --- Vertex AI (service-account) backend ------------------------------------
86	# When a GCP service-account credential is available we route through Vertex AI
87	# instead of the public Generative Language API. Same generateContent request
88	# body; the differences are auth (OAuth bearer minted from the SA) and a
89	# regional endpoint. Grounding tool name differs: Vertex uses `googleSearch`.
90	GEMINI_BACKEND = os.getenv("GEMINI_BACKEND", "").strip().lower()  # "vertex" | "api" | "" (auto)
91	VERTEX_LOCATION = os.getenv("VERTEX_LOCATION") or os.getenv("GOOGLE_CLOUD_LOCATION") or "us-central1"
92	VERTEX_PROJECT = (
93	    os.getenv("VERTEX_PROJECT") or os.getenv("GOOGLE_CLOUD_PROJECT") or os.getenv("GCP_PROJECT") or ""
94	)
95	VERTEX_CREDENTIALS = (
96	    os.getenv("GOOGLE_APPLICATION_CREDENTIALS") or os.getenv("VERTEX_SERVICE_ACCOUNT_JSON") or ""
97	)
98	VERTEX_ENDPOINT_TMPL = (
99	    "https://{loc}-aiplatform.googleapis.com/v1/projects/{project}"
100	    "/locations/{loc}/publishers/google/models/{model}:generateContent"
101	)
102	_VERTEX_SCOPES = ["https://www.googleapis.com/auth/cloud-platform"]
103	
104	
105	def _vertex_project_from_creds(path: str) -> str:
106	    try:
107	        with open(path, "r", encoding="utf-8") as fh:
108	            return json.load(fh).get("project_id", "") or ""
109	    except (OSError, json.JSONDecodeError):
110	        return ""
111	MAX_FETCH_BYTES = 900_000
112	MAX_PROFILE_TEXT = 12_000
113	MAX_CONTACT_SCAN_TEXT = 200_000
114	MAX_PAGES = 8
115	REQUEST_TIMEOUT = (5, 18)
116	AUTO_VERIFY_CONFIDENCE = 0.88
117	REVIEW_VERIFY_CONFIDENCE = 0.70
118	
119	PARKED_SIGNS = (
120	    "this domain is for sale",
121	    "buy this domain",
122	    "domain may be for sale",
123	    "domain is for sale",
124	    "available for purchase",
125	    "sedoparking",
126	    "parkingcrew",
127	    "hugedomains.com",
128	    "domain parking",
129	    "godaddy.com/domainsearch",
130	    "renew your domain",
131	    "expired domain",
132	)
133	
134	VERIFY_STRONG_STATUSES = {"verified"}
135	VERIFY_REJECT_STATUSES = {
136	    "candidate_unverified",
137	    "needs_manual_review",
138	    "parent_or_group",
139	    "namesake",
140	    "dead_or_parked",
141	    "parked",
142	    "crawl_blocked",
143	    "site_unreachable",
144	    "directory",
145	}
146	VERIFY_TERMINAL_STATUSES = {
147	    "dead_or_parked",
148	    "parked",
149	    "crawl_blocked",
150	    "site_unreachable",
151	    "directory",
152	}
153	VERIFY_NEGATIVE_JUDGE_STATUSES = {"parent_or_group", "namesake", "dead_or_parked", "parked", "site_unreachable"}
154	CRAWL_BLOCKED_HTTP_CODES = {401, 403, 406, 407, 408, 409, 425, 429, 451}
155	GENERIC_IDENTITY_TOKENS = {
156	    "agency",
157	    "agencies",
158	    "cargo",
159	    "clearing",
160	    "courier",
161	    "custom",
162	    "customs",
163	    "freight",
164	    "forwarder",
165	    "forwarders",
166	    "forwarding",
167	    "global",
168	    "house",
169	    "logistic",
170	    "logistics",
171	    "maritime",
172	    "overseas",
173	    "roadways",
174	    "seatrans",
175	    "ship",
176	    "shipcargo",
177	    "shipping",
178	    "transport",
179	    "transworld",
180	    "warehouse",
181	}
182	
183	DIRECTORY_DOMAINS = {
184	    "ambitionbox.com",
185	    "cleartax.in",
186	    "connect2india.com",
187	    "exportersindia.com",
188	    "glassdoor.co.in",
189	    "glassdoor.com",
190	    "go4worldbusiness.com",
191	    "indiamart.com",
192	    "indiacatalog.com",
193	    "indiafilings.com",
194	    "instafinancials.com",
195	    "justdial.com",
196	    "kompass.com",
197	    "mca.gov.in",
198	    "naukri.com",
199	    "quickcompany.in",
200	    "sulekha.com",
201	    "thecompanycheck.com",
202	    "tofler.in",
203	    "tradeindia.com",
204	    "vakilsearch.com",
205	    "zaubacorp.com",
206	    "facebook.com",
207	    "instagram.com",
208	    "linkedin.com",
209	    "in.linkedin.com",
210	    "twitter.com",
211	    "x.com",
212	    "youtube.com",
213	    "wikipedia.org",
214	    "google.com",
215	    "tripadvisor.in",
216	    "tripadvisor.com",
217	    "makemytrip.com",
218	    "yatra.com",
219	    "goibibo.com",
220	    "practo.com",
221	    "99acres.com",
222	    "magicbricks.com",
223	}
224	
225	FREE_EMAIL_DOMAINS = {
226	    "gmail.com",
227	    "googlemail.com",
228	    "yahoo.com",
229	    "yahoo.co.in",
230	    "hotmail.com",
231	    "outlook.com",
232	    "rediffmail.com",
233	    "live.com",
234	    "icloud.com",
235	    "protonmail.com",
236	}
237	
238	PG_PATTERNS = {
239	    "razorpay": ("checkout.razorpay.com", "razorpay.com/v1", "rzp_", "data-razorpay", "razorpay"),
240	    "payu": ("secure.payu.in", "payu.in", "payubiz", "payumoney"),
241	    "cashfree": ("cashfree.com", "payments.cashfree.com", "sdk.cashfree"),
242	    "ccavenue": ("ccavenue", "secure.ccavenue"),
243	    "billdesk": ("billdesk", "pgi.billdesk"),
244	    "easebuzz": ("easebuzz", "ebz."),
245	    "paytm": ("paytm", "securegw.paytm"),
246	    "phonepe": ("phonepe", "mercury.phonepe"),
247	    "instamojo": ("instamojo", "imjo.in"),
248	    "stripe": ("stripe", "js.stripe.com"),
249	    "paypal": ("paypal", "paypalobjects.com"),
250	}
251	
252	PLATFORM_PATTERNS = {
253	    "shopify": ("cdn.shopify.com", "myshopify.com", "shopify.theme"),
254	    "woocommerce": ("woocommerce", "wp-content/plugins/woocommerce"),
255	    "magento": ("magento", "/mage/", "mage-init"),
256	    "wix": ("wixstatic.com", "wix.com", "_wix"),
257	    "squarespace": ("squarespace.com", "static1.squarespace"),
258	    "webflow": ("webflow.io", "assets.website-files"),
259	    "wordpress": ("wp-content", "wp-includes"),
260	}
261	
262	SOCIAL_PATTERNS = {
263	    "instagram": r"instagram\.com/[^/\"'?\s]+",
264	    "facebook": r"(?:facebook|fb)\.com/[^/\"'?\s]+",
265	    "linkedin": r"linkedin\.com/(?:company|in)/[^/\"'?\s]+",
266	    "youtube": r"youtube\.com/(?:channel|c|@|user)/[^/\"'?\s]+",
267	    "twitter": r"(?:twitter|x)\.com/[^/\"'?\s]+",
268	    "telegram": r"t\.me/[^/\"'?\s]+",
269	    "maps": r"(?:google\.[a-z.]+/maps|goo\.gl/maps|maps\.app\.goo\.gl)/[^\"'\s]+",
270	}
271	
272	SECTION_PATTERNS = {
273	    "contact": r"contact|reach|get-in-touch",
274	    "about": r"about|who-we-are|company|overview",
275	    "pricing": r"pricing|plans|packages|tariff",
276	    "products": r"product|service|solution|shop|store|collection|catalog|buy",
277	    "refund": r"refund|return|cancellation",
278	    "terms": r"terms|terms-and-conditions|tnc",
279	    "privacy": r"privacy",
280	    "careers": r"career|jobs|join-us",
281	}
282	
283	EMAIL_RE = re.compile(r"[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}", re.I)
284	PHONE_RE = re.compile(r"(?:\+?91[\-\s]?)?([6-9]\d{9})")
285	WA_RE = re.compile(r"(?:wa\.me/|api\.whatsapp\.com/send\?phone=)(\+?\d{10,15})", re.I)
286	TAG_RE = re.compile(r"<[^>]+>")
287	SCRIPT_RE = re.compile(r"<(script|style|noscript)[^>]*>.*?</\1>", re.I | re.S)
288	LINK_RE = re.compile(r'<a\s[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', re.I | re.S)
289	
290	GEMINI_SCHEMA = """
291	CREATE TABLE IF NOT EXISTS gemini_runs (
292	  id INTEGER PRIMARY KEY AUTOINCREMENT,
293	  started_at TEXT NOT NULL,
294	  finished_at TEXT,
295	  status TEXT NOT NULL,
296	  mode TEXT,
297	  filter_json TEXT,
298	  requested_limit INTEGER,
299	  processed INTEGER DEFAULT 0,
300	  domain_found INTEGER DEFAULT 0,
301	  profiled INTEGER DEFAULT 0,
302	  rescored INTEGER DEFAULT 0,
303	  failed INTEGER DEFAULT 0,
304	  model TEXT,
305	  grounded INTEGER DEFAULT 0,
306	  error TEXT
307	);
308	
309	CREATE TABLE IF NOT EXISTS lead_gemini_enrichment (
310	  lead_id INTEGER PRIMARY KEY,
311	  status TEXT NOT NULL,
312	  mode TEXT NOT NULL,
313	  attempts INTEGER DEFAULT 0,
314	  official_domain TEXT,
315	  candidate_domain TEXT,
316	  domain_source TEXT,
317	  domain_confidence REAL DEFAULT 0,
318	  domain_evidence TEXT,
319	  verification_status TEXT,
320	  verification_confidence REAL DEFAULT 0,
321	  verification_evidence TEXT,
322	  verification_json TEXT DEFAULT '{}',
323	  is_directory INTEGER DEFAULT 0,
324	  crawl_status TEXT,
325	  crawl_url TEXT,
326	  fetched_pages INTEGER DEFAULT 0,
327	  profile_quality_score INTEGER DEFAULT 0,
328	  pg_propensity_score INTEGER DEFAULT 0,
329	  score_delta INTEGER DEFAULT 0,
330	  inferred_vertical TEXT,
331	  inferred_category TEXT,
332	  business_summary TEXT,
333	  products TEXT DEFAULT '[]',
334	  payment_signals TEXT DEFAULT '[]',
335	  payment_gateways TEXT DEFAULT '[]',
336	  platform TEXT,
337	  has_razorpay INTEGER DEFAULT 0,
338	  has_competitor_pg INTEGER DEFAULT 0,
339	  has_cart INTEGER DEFAULT 0,
340	  has_checkout INTEGER DEFAULT 0,
341	  has_payment_link INTEGER DEFAULT 0,
342	  has_subscription INTEGER DEFAULT 0,
343	  emails TEXT DEFAULT '[]',
344	  phones TEXT DEFAULT '[]',
345	  whatsapp_numbers TEXT DEFAULT '[]',
346	  socials TEXT DEFAULT '{}',
347	  people TEXT DEFAULT '[]',
348	  profile_json TEXT DEFAULT '{}',
349	  raw_json TEXT DEFAULT '{}',
350	  decision TEXT,
351	  run_id INTEGER,
352	  updated_at TEXT NOT NULL
353	);
354	
355	CREATE INDEX IF NOT EXISTS idx_gemini_status ON lead_gemini_enrichment(status);
356	CREATE INDEX IF NOT EXISTS idx_gemini_domain ON lead_gemini_enrichment(official_domain);
357	CREATE INDEX IF NOT EXISTS idx_gemini_pg_score ON lead_gemini_enrichment(pg_propensity_score DESC);
358	CREATE INDEX IF NOT EXISTS idx_gemini_quality ON lead_gemini_enrichment(profile_quality_score DESC);
359	CREATE INDEX IF NOT EXISTS idx_gemini_updated ON lead_gemini_enrichment(updated_at DESC);
360	"""
361	
362	
363	@dataclass(frozen=True)
364	class DomainCandidate:
365	    domain: str
366	    url: str
367	    source: str
368	    score: int
369	    evidence: list[str]
370	    rank: int = 0
371	    title: str = ""
372	    snippet: str = ""
373	    raw: dict[str, Any] | None = None
374	
375	
376	@dataclass
377	class DomainVerification:
378	    status: str
379	    confidence: float
380	    evidence: list[str]
381	    candidate: DomainCandidate | None = None
382	    features: dict[str, Any] | None = None
383	    judge: dict[str, Any] | None = None
384	    candidates: list[dict[str, Any]] | None = None
385	    rejected: list[dict[str, Any]] | None = None
386	    discovery_errors: list[str] | None = None
387	
388	    @property
389	    def verified(self) -> bool:
390	        return self.status in VERIFY_STRONG_STATUSES and bool(self.candidate)
391	
392	
393	@dataclass
394	class GeminiClient:
395	    api_key: str = os.getenv("GEMINI_API_KEY", "")
396	    model: str = DEFAULT_MODEL
397	    timeout_s: int = 60
398	    backend: str = ""  # "vertex" | "api"; auto-resolved in __post_init__
399	    project: str = ""
400	    location: str = VERTEX_LOCATION
401	    credentials_path: str = VERTEX_CREDENTIALS
402	
403	    def __post_init__(self) -> None:
404	        self._creds: Any = None  # cached SA credentials (Vertex backend)
405	        if not self.backend:
406	            if GEMINI_BACKEND in ("vertex", "api"):
407	                self.backend = GEMINI_BACKEND
408	            elif self.credentials_path and os.path.exists(self.credentials_path):
409	                self.backend = "vertex"
410	            else:
411	                self.backend = "api"
412	        if self.backend == "vertex":
413	            self.project = self.project or VERTEX_PROJECT or _vertex_project_from_creds(self.credentials_path)
414	
415	    @property
416	    def configured(self) -> bool:
417	        if self.backend == "vertex":
418	            return bool(self.project and self.credentials_path and os.path.exists(self.credentials_path))
419	        return bool(self.api_key)
420	
421	    @property
422	    def endpoint(self) -> str:
423	        if self.backend == "vertex":
424	            return VERTEX_ENDPOINT_TMPL.format(loc=self.location, project=self.project, model=self.model)
425	        return DEFAULT_ENDPOINT_TMPL.format(model=self.model)
426	
427	    def _auth_headers(self) -> dict[str, str]:
428	        if self.backend == "vertex":
429	            from google.auth.transport.requests import Request as _GoogleAuthRequest
430	            from google.oauth2 import service_account
431	
432	            if self._creds is None:
433	                self._creds = service_account.Credentials.from_service_account_file(
434	                    self.credentials_path, scopes=_VERTEX_SCOPES
435	                )
436	            if not self._creds.valid:
437	                self._creds.refresh(_GoogleAuthRequest())
438	            return {"Authorization": f"Bearer {self._creds.token}", "Content-Type": "application/json"}
439	        return {"x-goog-api-key": self.api_key, "Content-Type": "application/json"}
440	
441	    def generate_json(self, prompt: str, *, grounded: bool = False) -> dict[str, Any]:
442	        if not self.configured:
443	            raise RuntimeError(
444	                "Gemini client not configured: set GOOGLE_APPLICATION_CREDENTIALS (Vertex SA) or GEMINI_API_KEY"
445	            )
446	        generation_config: dict[str, Any] = {
447	            "temperature": 0.0,
448	            "thinkingConfig": {"thinkingBudget": 0},
449	        }
450	        # JSON response-mime mode is incompatible with the Google Search tool, so
451	        # for grounded calls we let the model return prose+JSON and extract it.
452	        if not grounded:
453	            generation_config["responseMimeType"] = "application/json"
454	        body: dict[str, Any] = {
455	            "contents": [{"role": "user", "parts": [{"text": prompt}]}],
456	            "generationConfig": generation_config,
457	        }
458	        if grounded:
459	            tool_key = "googleSearch" if self.backend == "vertex" else "google_search"
460	            body["tools"] = [{tool_key: {}}]
461	        resp = requests.post(self.endpoint, headers=self._auth_headers(), json=body, timeout=self.timeout_s)
462	        if resp.status_code != 200:
463	            raise RuntimeError(f"Gemini {resp.status_code}: {resp.text[:500]}")
464	        payload = resp.json()
465	        try:
466	            parts = payload["candidates"][0]["content"]["parts"]
467	            text = "\n".join(part.get("text", "") for part in parts)
468	        except (KeyError, IndexError, TypeError):
469	            raise RuntimeError("Gemini response did not contain text")
470	        return parse_json_object(text)
471	
472	
473	def now_iso() -> str:
474	    return datetime.now(timezone.utc).isoformat()
475	
476	
477	def compact_json(value: Any) -> str:
478	    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))
479	
480	
481	def parse_json_object(text: str) -> dict[str, Any]:
482	    try:
483	        parsed = json.loads(text)
484	        return parsed if isinstance(parsed, dict) else {}
485	    except json.JSONDecodeError:
486	        match = re.search(r"\{.*\}", text, re.S)
487	        if not match:
488	            return {}
489	        parsed = json.loads(match.group(0))
490	        return parsed if isinstance(parsed, dict) else {}
491	
492	
493	def safe_json_load(raw: Any, default: Any) -> Any:
494	    if isinstance(raw, (dict, list)):
495	        return raw
496	    if raw is None or raw == "":
497	        return default
498	    try:
499	        return json.loads(str(raw))
500	    except json.JSONDecodeError:
501	        return default
502	
503	
504	def clean(value: Any) -> str:
505	    return "" if value is None else str(value).strip()
506	
507	
508	def boolish(value: Any) -> bool:
509	    if isinstance(value, bool):
510	        return value
511	    if isinstance(value, (int, float)):
512	        return bool(value)
513	    return clean(value).lower() in {"1", "true", "yes", "y", "on"}
514	
515	
516	def ensure_gemini_schema(conn: sqlite3.Connection) -> None:
517	    conn.executescript(GEMINI_SCHEMA)
518	    columns = {row[1] for row in conn.execute("PRAGMA table_info(lead_gemini_enrichment)").fetchall()}
519	    migrations = {
520	        "candidate_domain": "ALTER TABLE lead_gemini_enrichment ADD COLUMN candidate_domain TEXT",
521	        "domain_source": "ALTER TABLE lead_gemini_enrichment ADD COLUMN domain_source TEXT",
522	        "score_delta": "ALTER TABLE lead_gemini_enrichment ADD COLUMN score_delta INTEGER DEFAULT 0",
523	        "people": "ALTER TABLE lead_gemini_enrichment ADD COLUMN people TEXT DEFAULT '[]'",
524	        "raw_json": "ALTER TABLE lead_gemini_enrichment ADD COLUMN raw_json TEXT DEFAULT '{}'",
525	        "verification_status": "ALTER TABLE lead_gemini_enrichment ADD COLUMN verification_status TEXT",
526	        "verification_confidence": "ALTER TABLE lead_gemini_enrichment ADD COLUMN verification_confidence REAL DEFAULT 0",
527	        "verification_evidence": "ALTER TABLE lead_gemini_enrichment ADD COLUMN verification_evidence TEXT",
528	        "verification_json": "ALTER TABLE lead_gemini_enrichment ADD COLUMN verification_json TEXT DEFAULT '{}'",
529	    }
530	    for column, sql in migrations.items():
531	        if column not in columns:
532	            conn.execute(sql)
533	    conn.execute("CREATE INDEX IF NOT EXISTS idx_gemini_candidate_domain ON lead_gemini_enrichment(candidate_domain)")
534	    conn.execute("CREATE INDEX IF NOT EXISTS idx_gemini_verification_status ON lead_gemini_enrichment(verification_status)")
535	    conn.commit()
536	
537	
538	def health(client: GeminiClient | None = None) -> dict[str, Any]:
539	    c = client or GeminiClient()
540	    return {
541	        "ok": c.configured,
542	        "model": c.model,
543	        "configured": c.configured,
544	        "endpoint": c.endpoint,
545	        "message": "Ready" if c.configured else "GEMINI_API_KEY is not set",
546	    }
547	
548	
549	def domain_blocked(domain: str) -> bool:
550	    host = normalize_host(domain)
551	    if not host:
552	        return True
553	    return any(host == blocked or host.endswith("." + blocked) for blocked in DIRECTORY_DOMAINS)
554	
555	
556	def crawl_failure_status(crawl_status: Any) -> str:
557	    status = clean(crawl_status).lower()
558	    if not status:
559	        return "candidate_unverified"
560	    if status == "parked":
561	        return "parked"
562	    if status.startswith("http_"):
563	        try:
564	            code = int(status.split("_", 1)[1])
565	        except (IndexError, ValueError):
566	            return "site_unreachable"
567	        if code in CRAWL_BLOCKED_HTTP_CODES:
568	            return "crawl_blocked"
569	        return "site_unreachable"
570	    if status.startswith("non_html"):
571	        return "candidate_unverified"
572	    if status in {"timeout", "ssl", "fetch_failed", "connectionerror", "toomanyredirects", "connecttimeout", "readtimeout"}:
573	        return "site_unreachable"
574	    return "site_unreachable"
575	
576	
577	def positive_verification_status(confidence: float, evidence: list[str], note: str) -> str:
578	    if confidence >= AUTO_VERIFY_CONFIDENCE:
579	        return "verified"
580	    if confidence >= REVIEW_VERIFY_CONFIDENCE:
581	        marker = f"manual_review:{note}:confidence_below_{AUTO_VERIFY_CONFIDENCE:.2f}"
582	        if marker not in evidence:
583	            evidence.append(marker)
584	        return "needs_manual_review"
585	    return "candidate_unverified"
586	
587	
588	def parse_contacts_json(raw: Any) -> tuple[list[str], list[str]]:
589	    emails: list[str] = []
590	    phones: list[str] = []
591	    contacts = safe_json_load(raw, [])
592	    if not isinstance(contacts, list):
593	        return emails, phones
594	    for contact in contacts:
595	        if not isinstance(contact, dict):
596	            continue
597	        kind = clean(contact.get("kind")).lower()
598	        value = clean(contact.get("value"))
599	        if kind == "email" and value:
600	            emails.append(value.lower())
601	        elif kind == "phone" and value:
602	            phones.append(value)
603	    return sorted(set(emails)), sorted(set(phones))
604	
605	
606	def domain_from_email(email: str) -> str:
607	    if "@" not in email:
608	        return ""
609	    domain = email.lower().rsplit("@", 1)[-1]
610	    return "" if domain in FREE_EMAIL_DOMAINS else domain
611	
612	
613	def registered_address_text(row: dict[str, Any]) -> str:
614	    raw = row.get("registered_address")
615	    parsed = safe_json_load(raw, {})
616	    if isinstance(parsed, dict):
617	        return " ".join(clean(parsed.get(k)) for k in ("full", "city", "district", "state", "pincode") if clean(parsed.get(k)))
618	    return clean(raw)
619	
620	
621	def existing_domain(row: dict[str, Any]) -> str:
622	    return normalize_host(clean(row.get("domain")))
623	
624	
625	def candidate_to_dict(candidate: DomainCandidate) -> dict[str, Any]:
626	    return {
627	        "domain": candidate.domain,
628	        "url": candidate.url,
629	        "source": candidate.source,
630	        "score": candidate.score,
631	        "evidence": candidate.evidence,
632	        "rank": candidate.rank,
633	        "title": candidate.title,
634	        "snippet": candidate.snippet,
635	        "raw": candidate.raw or {},
636	    }
637	
638	
639	def compact_digits(value: str) -> str:
640	    return re.sub(r"\D+", "", value or "")
641	
642	
643	def registered_address_parts(row: dict[str, Any]) -> dict[str, str]:
644	    raw = row.get("registered_address")
645	    parsed = safe_json_load(raw, {})
646	    if not isinstance(parsed, dict):
647	        parsed = {}
648	    return {
649	        "full": clean(parsed.get("full") or raw),
650	        "city": clean(parsed.get("city") or parsed.get("district")),
651	        "district": clean(parsed.get("district")),
652	        "state": clean(parsed.get("state") or row.get("state")),
653	        "pincode": clean(parsed.get("pincode")),
654	    }
655	
656	
657	def add_domain_candidate(
658	    candidates: list[DomainCandidate],
659	    domain: str,
660	    *,
661	    source: str,
662	    score: int,
663	    evidence: list[str] | None = None,
664	    url: str = "",
665	    rank: int = 0,
666	    title: str = "",
667	    snippet: str = "",
668	    raw: dict[str, Any] | None = None,
669	) -> None:
670	    host = normalize_host(domain)
671	    if not host:
672	        return
673	    if domain_blocked(host):
674	        return
675	    candidates.append(
676	        DomainCandidate(
677	            domain=host,
678	            url=url or f"https://{host}",
679	            source=source,
680	            score=max(0, min(100, int(score))),
681	            evidence=evidence or [],
682	            rank=rank,
683	            title=title,
684	            snippet=snippet,
685	            raw=raw or {},
686	        )
687	    )
688	
689	
690	def dedupe_candidates(candidates: list[DomainCandidate]) -> list[DomainCandidate]:
691	    priority = {
692	        "existing_domain": 6,
693	        "corporate_email": 5,
694	        "searxng": 4,
695	        "gemini_grounding": 3,
696	        "name_guess": 1,
697	    }
698	    by_root: dict[str, DomainCandidate] = {}
699	    for candidate in candidates:
700	        key = root_domain(candidate.domain) or candidate.domain
701	        current = by_root.get(key)
702	        if current is None:
703	            by_root[key] = candidate
704	            continue
705	        current_rank = (current.score, priority.get(current.source, 0), -current.rank)
706	        candidate_rank = (candidate.score, priority.get(candidate.source, 0), -candidate.rank)
707	        if candidate_rank > current_rank:
708	            merged_evidence = [*candidate.evidence, *[item for item in current.evidence if item not in candidate.evidence]]
709	            by_root[key] = DomainCandidate(
710	                domain=candidate.domain,
711	                url=candidate.url,
712	                source=candidate.source,
713	                score=candidate.score,
714	                evidence=merged_evidence[:8],
715	                rank=candidate.rank,
716	                title=candidate.title,
717	                snippet=candidate.snippet,
718	                raw=candidate.raw,
719	            )
720	    return sorted(
721	        by_root.values(),
722	        key=lambda item: (item.source == "existing_domain", item.score, priority.get(item.source, 0), -item.rank),
723	        reverse=True,
724	    )
725	
726	
727	def discover_domain_candidates(
728	    row: dict[str, Any],
729	    client: GeminiClient,
730	    *,
731	    search_client: SearXNGClient | None = None,
732	    use_grounding: bool = True,
733	    max_search_queries: int = 4,
734	) -> tuple[list[DomainCandidate], list[str]]:
735	    candidates: list[DomainCandidate] = []
736	    errors: list[str] = []
737	    current_domain = existing_domain(row)
738	    if current_domain:
739	        add_domain_candidate(
740	            candidates,
741	            current_domain,
742	            source="existing_domain",
743	            score=65,
744	            evidence=["existing_domain"],
745	        )
746	
747	    emails, _phones = parse_contacts_json(row.get("contacts"))
748	    for email in emails:
749	        email_domain = domain_from_email(email)
750	        if email_domain:
751	            add_domain_candidate(
752	                candidates,
753	                email_domain,
754	                source="corporate_email",
755	                score=68,
756	                evidence=[f"email_domain:{email_domain}"],
757	            )
758	
759	    if search_client and not current_domain:
760	        for query in build_queries(row, max_queries=max_search_queries):
761	            try:
762	                results = search_client.search(query)
763	            except Exception as exc:  # noqa: BLE001 - search is useful but not mandatory
764	                errors.append(f"searxng:{type(exc).__name__}:{str(exc)[:160]}")
765	                break
766	            for rank, result in enumerate(results, start=1):
767	                scored = score_result(row, query, rank, result)
768	                if scored.category != "candidate" or scored.rejected_reason or scored.score < 40:
769	                    continue
770	                add_domain_candidate(
771	                    candidates,
772	                    scored.domain,
773	                    source="searxng",
774	                    score=scored.score,
775	                    evidence=scored.evidence,
776	                    url=scored.url,
777	                    rank=scored.rank,
778	                    title=scored.title,
779	                    snippet=scored.snippet,
780	                    raw={"query": query, "engine": scored.engine},
781	                )
782	
783	    has_retrieved_candidate = any(candidate.source in {"searxng", "corporate_email"} for candidate in candidates)
784	    if use_grounding and client.configured and not current_domain and not has_retrieved_candidate:
785	        try:
786	            raw = client.generate_json(discover_domain_prompt(row), grounded=True)
787	        except Exception as exc:  # noqa: BLE001 - fallback discovery should not fail the lead
788	            errors.append(f"grounding:{type(exc).__name__}:{str(exc)[:160]}")
789	        else:
790	            picked = normalize_host(raw.get("domain"))
791	            if picked and not bool(raw.get("is_directory")):
792	                add_domain_candidate(
793	                    candidates,
794	                    picked,
795	                    source="gemini_grounding",
796	                    score=int(float(raw.get("confidence") or 0) * 100),
797	                    evidence=[clean(raw.get("evidence")) or "gemini_grounding"],
798	                    raw=raw,
799	                )
800	
801	    return dedupe_candidates(candidates), errors
802	
803	
804	def score_identity_verification(
805	    row: dict[str, Any],
806	    candidate: DomainCandidate,
807	    features: dict[str, Any],
808	) -> dict[str, Any]:
809	    if domain_blocked(candidate.domain):
810	        return {"status": "directory", "confidence": 0.0, "evidence": ["blocked_directory_domain"]}
811	    if not features.get("is_live"):
812	        crawl_status = clean(features.get("crawl_status"))
813	        status = crawl_failure_status(crawl_status)
814	        return {"status": status, "confidence": 0.0, "evidence": [f"crawl:{crawl_status or 'not_live'}"]}
815	
816	    evidence: list[str] = []
817	    score = 0
818	    text = " ".join(
819	        clean(features.get(key))
820	        for key in ("title", "meta_description", "page_text", "combined_text")
821	        if clean(features.get(key))
822	    ).lower()
823	    text += " " + " ".join(clean(item).lower() for item in (features.get("h1s") or []))
824	    host_compact = re.sub(r"[^a-z0-9]", "", candidate.domain.lower())
825	    tokens = identity_tokens(clean(row.get("legal_name")))
826	    page_tokens = [token for token in tokens if token in text]
827	    domain_tokens = [token for token in tokens if token in host_compact]
828	    distinctive_tokens = [token for token in tokens if token not in GENERIC_IDENTITY_TOKENS]
829	    distinctive_page_tokens = [token for token in page_tokens if token in distinctive_tokens]
830	    distinctive_domain_tokens = [token for token in domain_tokens if token in distinctive_tokens]
831	
832	    if page_tokens:
833	        score += min(42, len(page_tokens) * 12)
834	        evidence.append("page_name_tokens:" + ",".join(page_tokens[:6]))
835	    if domain_tokens:
836	        score += min(36, len(domain_tokens) * 18)
837	        evidence.append("domain_tokens:" + ",".join(domain_tokens[:4]))
838	
839	    cin = clean(row.get("cin")).lower()
840	    if cin and cin in text:
841	        score += 70
842	        evidence.append("cin_match")
843	    gstin = clean(row.get("gstin")).lower()
844	    if gstin and gstin in text:
845	        score += 75
846	        evidence.append("gstin_match")
847	
848	    lead_emails, lead_phones = parse_contacts_json(row.get("contacts"))
849	    site_emails = set(features.get("emails") or [])
850	    matched_emails = sorted({email for email in lead_emails if email.lower() in text or email.lower() in site_emails})
851	    if matched_emails:
852	        score += 55
853	        evidence.append("email_match:" + ",".join(matched_emails[:2]))
854	    site_digits = compact_digits(" ".join((features.get("phones") or []) + (features.get("whatsapp_numbers") or [])))
855	    matched_phones = [phone for phone in lead_phones if compact_digits(phone) and compact_digits(phone) in site_digits]
856	    if matched_phones:
857	        score += 45
858	        evidence.append("phone_match")
859	
860	    address = registered_address_parts(row)
861	    for label in ("city", "district", "state", "pincode"):
862	        value = address.get(label, "").lower()
863	        if value and value in text:
864	            score += 8 if label != "pincode" else 12
865	            evidence.append(f"{label}_match")
866	            if label in {"city", "district"}:
867	                break
868	
869	    if candidate.source == "existing_domain":
870	        score += 10
871	        evidence.append("source:existing_domain")
872	    elif candidate.source == "corporate_email":
873	        score += 18
874	        evidence.append("source:corporate_email")
875	    elif candidate.source == "searxng":
876	        score += min(12, candidate.score // 8)
877	        evidence.append(f"source:searxng_score_{candidate.score}")
878	    elif candidate.source == "gemini_grounding":
879	        score += min(8, candidate.score // 12)
880	        evidence.append("source:grounded_candidate")
881	
882	    score += min(8, int(features.get("profile_quality_score") or 0) // 12)
883	    registry_identifier = any(item in evidence for item in ("cin_match", "gstin_match"))
884	    email_identifier = any(item.startswith("email_match") for item in evidence)
885	    phone_identifier = any(item.startswith("phone_match") for item in evidence)
886	    distinctive_name_anchor = bool(distinctive_page_tokens) and (
887	        bool(distinctive_domain_tokens)
888	        or len(distinctive_page_tokens) >= min(2, max(1, len(distinctive_tokens)))
889	        or any(item in evidence for item in ("city_match", "district_match", "state_match", "pincode_match"))
890	    )
891	    strong_identifier = registry_identifier or email_identifier or (phone_identifier and distinctive_name_anchor)
892	    enough_name = bool(page_tokens) and (
893	        len(page_tokens) >= min(2, max(1, len(tokens)))
894	        or (len(tokens) <= 2 and bool(domain_tokens))
895	        or (bool(domain_tokens) and any(item.endswith("_match") for item in evidence))
896	    )
897	    has_anchor = bool(domain_tokens) or strong_identifier or any(
898	        item in evidence for item in ("city_match", "district_match", "state_match", "pincode_match", "source:corporate_email")
899	    )
900	    confidence = min(0.99, score / 100)
901	    can_auto_verify = registry_identifier or email_identifier or (
902	        distinctive_name_anchor and (phone_identifier or (enough_name and has_anchor))
903	    )
904	    status = "verified" if confidence >= 0.72 and can_auto_verify else "candidate_unverified"
905	    if status != "verified" and confidence >= REVIEW_VERIFY_CONFIDENCE and page_tokens and not distinctive_name_anchor:
906	        evidence.append("manual_review:missing_distinctive_name_anchor")
907	    if status != "verified" and any(token in host_compact for token in ("group", "holdings", "holding")) and page_tokens:
908	        status = "parent_or_group"
909	    return {
910	        "status": status,
911	        "confidence": round(confidence, 3),
912	        "evidence": evidence or ["identity_evidence_too_weak"],
913	        "page_tokens": page_tokens,
914	        "domain_tokens": domain_tokens,
915	        "distinctive_page_tokens": distinctive_page_tokens,
916	        "distinctive_domain_tokens": distinctive_domain_tokens,
917	        "score": score,
918	    }
919	
920	
921	def judge_domain_prompt(row: dict[str, Any], candidate: DomainCandidate, features: dict[str, Any], deterministic: dict[str, Any]) -> str:
922	    evidence = {
923	        "lead": {
924	            "legal_name": clean(row.get("legal_name")),
925	            "cin": clean(row.get("cin")) or None,
926	            "gstin": clean(row.get("gstin")) or None,
927	            "state": clean(row.get("state")) or None,
928	            "registered_address": registered_address_text(row)[:400] or None,
929	            "vertical": clean(row.get("vertical")) or None,
930	            "category": clean(row.get("category")) or None,
931	        },
932	        "candidate": candidate_to_dict(candidate),
933	        "deterministic_check": deterministic,
934	        "site": {
935	            "domain": features.get("domain"),
936	            "url": features.get("crawl_url"),
937	            "title": features.get("title"),
938	            "meta_description": features.get("meta_description"),
939	            "h1s": features.get("h1s"),
940	            "emails": features.get("emails"),
941	            "phones": features.get("phones"),
942	            "text": clean(features.get("combined_text") or features.get("page_text"))[:5000],
943	        },
944	    }
945	    return f"""Judge whether this candidate is the official website of the exact Indian business.
946	
947	Use only the supplied evidence. Do not search. Do not reward a parent/group site, directory,
948	same-name business, marketplace listing, parked domain, or generic page.
949	
950	Evidence JSON:
951	{json.dumps(evidence, ensure_ascii=False)}
952	
953	Return ONLY JSON:
954	{{
955	  "status": "verified|candidate_unverified|parent_or_group|namesake|needs_manual_review|parked|crawl_blocked|site_unreachable",
956	  "confidence": 0.0,
957	  "reason": "short evidence-backed reason",
958	  "matched_evidence": ["specific matching facts"],
959	  "concerns": ["specific doubts"]
960	}}"""
961	
962	
963	def judge_domain_identity(
964	    client: GeminiClient,
965	    row: dict[str, Any],
966	    candidate: DomainCandidate,
967	    features: dict[str, Any],
968	    deterministic: dict[str, Any],
969	) -> dict[str, Any]:
970	    if not client.configured:
971	        return {}
972	    try:
973	        raw = client.generate_json(judge_domain_prompt(row, candidate, features, deterministic), grounded=False)
974	    except Exception as exc:  # noqa: BLE001 - deterministic verification can still decide
975	        return {"status": "judge_failed", "confidence": 0.0, "reason": f"{type(exc).__name__}: {str(exc)[:160]}"}
976	    status = clean(raw.get("status")).lower()
977	    if status not in VERIFY_STRONG_STATUSES | VERIFY_REJECT_STATUSES:
978	        status = "candidate_unverified"
979	    return {
980	        "status": status,
981	        "confidence": max(0.0, min(1.0, float(raw.get("confidence") or 0))),
982	        "reason": clean(raw.get("reason")),
983	        "matched_evidence": raw.get("matched_evidence") if isinstance(raw.get("matched_evidence"), list) else [],
984	        "concerns": raw.get("concerns") if isinstance(raw.get("concerns"), list) else [],
985	        "raw": raw,
986	    }
987	
988	
989	def resolve_verification(
990	    deterministic: dict[str, Any],
991	    judge: dict[str, Any],
992	) -> tuple[str, float, list[str]]:
993	    det_status = clean(deterministic.get("status")) or "candidate_unverified"
994	    det_conf = float(deterministic.get("confidence") or 0)
995	    evidence = list(deterministic.get("evidence") or [])
996	    judge_status = clean(judge.get("status"))
997	    judge_conf = float(judge.get("confidence") or 0)
998	    if judge.get("reason"):
999	        evidence.append("judge:" + clean(judge.get("reason"))[:180])
1000	
1001	    if det_status in VERIFY_TERMINAL_STATUSES:
1002	        return det_status, det_conf, evidence
1003	    if judge_status in VERIFY_NEGATIVE_JUDGE_STATUSES and judge_conf >= 0.62:
1004	        return judge_status, min(det_conf, judge_conf), evidence
1005	    if judge_status == "crawl_blocked" and judge_conf >= 0.62:
1006	        return "crawl_blocked", min(det_conf, judge_conf), evidence
1007	    if judge_status == "needs_manual_review" and judge_conf >= 0.62:
1008	        evidence.append("manual_review:judge_raised_identity_doubt")
1009	        return "needs_manual_review", max(det_conf, judge_conf), evidence
1010	    if det_status == "verified" and (not judge_status or judge_status in {"verified", "judge_failed"}):
1011	        confidence = det_conf if judge_status != "verified" else max(det_conf, round((det_conf * 0.65) + (judge_conf * 0.35), 3))
1012	        status = positive_verification_status(confidence, evidence, "auto_verify_gate")
1013	        return status, confidence, evidence
1014	    if judge_status == "verified" and judge_conf >= REVIEW_VERIFY_CONFIDENCE and det_conf >= 0.55:
1015	        confidence = round((det_conf * 0.55) + (judge_conf * 0.45), 3)
1016	        evidence.append("manual_review:judge_verified_but_deterministic_not_verified")
1017	        return "needs_manual_review" if confidence >= REVIEW_VERIFY_CONFIDENCE else "candidate_unverified", confidence, evidence
1018	    if det_status == "parent_or_group":
1019	        return "parent_or_group", det_conf, evidence
1020	    confidence = max(det_conf, judge_conf * 0.75)
1021	    if confidence >= REVIEW_VERIFY_CONFIDENCE:
1022	        evidence.append("manual_review:identity_evidence_below_verified_gate")
1023	        return "needs_manual_review", confidence, evidence
1024	    return "candidate_unverified", confidence, evidence
1025	
1026	
1027	def verify_domain_candidates(
1028	    row: dict[str, Any],
1029	    candidates: list[DomainCandidate],
1030	    client: GeminiClient,
1031	    *,
1032	    run_judge: bool = True,
1033	    discovery_errors: list[str] | None = None,
1034	) -> DomainVerification:
1035	    if not candidates:
1036	        return DomainVerification(
1037	            status="no_domain",
1038	            confidence=0.0,
1039	            evidence=["no_domain_candidates"],
1040	            candidates=[],
1041	            rejected=[],
1042	            discovery_errors=discovery_errors or [],
1043	        )
1044	
1045	    rejected: list[dict[str, Any]] = []
1046	    for candidate in candidates[:6]:
1047	        features = crawl_site(candidate.domain)
1048	        deterministic = score_identity_verification(row, candidate, features)
1049	        judge = {}
1050	        if features.get("is_live") and run_judge and deterministic.get("confidence", 0) < 0.9:
1051	            judge = judge_domain_identity(client, row, candidate, features, deterministic)
1052	        status, confidence, evidence = resolve_verification(deterministic, judge)
1053	        verification = {
1054	            "candidate": candidate_to_dict(candidate),
1055	            "deterministic": deterministic,
1056	            "judge": judge,
1057	            "status": status,
1058	            "confidence": confidence,
1059	            "evidence": evidence,
1060	            "crawl_status": features.get("crawl_status"),
1061	            "crawl_url": features.get("crawl_url"),
1062	        }
1063	        if status == "verified" and confidence >= AUTO_VERIFY_CONFIDENCE:
1064	            return DomainVerification(
1065	                status="verified",
1066	                confidence=round(confidence, 3),
1067	                evidence=evidence,
1068	                candidate=candidate,
1069	                features=features,
1070	                judge=judge,
1071	                candidates=[candidate_to_dict(item) for item in candidates],
1072	                rejected=rejected,
1073	                discovery_errors=discovery_errors or [],
1074	            )
1075	        rejected.append(verification)
1076	
1077	    best = max(rejected, key=lambda item: float(item.get("confidence") or 0), default={})
1078	    best_candidate = best.get("candidate") if isinstance(best.get("candidate"), dict) else {}
1079	    return DomainVerification(
1080	        status=clean(best.get("status")) or "candidate_unverified",
1081	        confidence=round(float(best.get("confidence") or 0), 3),
1082	        evidence=list(best.get("evidence") or ["no_candidate_verified"]),
1083	        candidate=DomainCandidate(
1084	            domain=clean(best_candidate.get("domain")),
1085	            url=clean(best_candidate.get("url")),
1086	            source=clean(best_candidate.get("source")),
1087	            score=int(best_candidate.get("score") or 0),
1088	            evidence=list(best_candidate.get("evidence") or []),
1089	        )
1090	        if best_candidate
1091	        else None,
1092	        features={
1093	            "crawl_status": clean(best.get("crawl_status")),
1094	            "crawl_url": clean(best.get("crawl_url")),
1095	        },
1096	        judge=best.get("judge") if isinstance(best.get("judge"), dict) else {},
1097	        candidates=[candidate_to_dict(item) for item in candidates],
1098	        rejected=rejected,
1099	        discovery_errors=discovery_errors or [],
1100	    )
1101	
1102	
1103	def discover_domain_prompt(row: dict[str, Any]) -> str:
1104	    emails, phones = parse_contacts_json(row.get("contacts"))
1105	    return f"""You are finding the official website domain for one Indian business.
1106	
1107	Business:
1108	- Legal name: {clean(row.get("legal_name"))}
1109	- CIN: {clean(row.get("cin")) or "unknown"}
1110	- GSTIN: {clean(row.get("gstin")) or "unknown"}
1111	- State: {clean(row.get("state")) or "unknown"}
1112	- Address: {registered_address_text(row)[:280] or "unknown"}
1113	- Vertical/category: {clean(row.get("vertical"))} / {clean(row.get("category"))} / {clean(row.get("subcategory"))}
1114	- Known email hints: {", ".join(emails[:3]) or "none"}
1115	- Known phone hints: {", ".join(phones[:3]) or "none"}
1116	
1117	Use Google Search grounding. Return the company's own official website domain only.
1118	Reject directories, social pages, marketplaces, app stores, news, and company-info portals.
1119	If there is no reliable official website, return an empty domain.
1120	
1121	Return ONLY JSON:
1122	{{
1123	  "domain": "example.com or empty string",
1124	  "confidence": 0.0,
1125	  "is_directory": false,
1126	  "evidence": "short reason with matching evidence",
1127	  "sources": ["urls used, max 5"]
1128	}}"""
1129	
1130	
1131	def classify_prompt(row: dict[str, Any], features: dict[str, Any]) -> str:
1132	    evidence = {
1133	        "lead": {
1134	            "legal_name": clean(row.get("legal_name")),
1135	            "cin": clean(row.get("cin")),
1136	            "gstin": clean(row.get("gstin")),
1137	            "vertical": clean(row.get("vertical")),
1138	            "category": clean(row.get("category")),
1139	            "subcategory": clean(row.get("subcategory")),
1140	            "state": clean(row.get("state")),
1141	        },
1142	        "site": {
1143	            "domain": features.get("domain"),
1144	            "title": features.get("title"),
1145	            "meta_description": features.get("meta_description"),
1146	            "h1s": features.get("h1s"),
1147	            "raw_signals": {
1148	                "platform": features.get("platform"),
1149	                "payment_gateways": features.get("payment_gateways"),
1150	                "commerce": {
1151	                    "has_cart": features.get("has_cart"),
1152	                    "has_checkout": features.get("has_checkout"),
1153	                    "has_payment_link": features.get("has_payment_link"),
1154	                    "has_subscription": features.get("has_subscription"),
1155	                    "has_pricing": features.get("has_pricing"),
1156	                    "has_products": features.get("has_products"),
1157	                },
1158	                "emails": features.get("emails"),
1159	                "phones": features.get("phones"),
1160	                "whatsapp": features.get("whatsapp_numbers"),
1161	                "socials": features.get("socials"),
1162	            },
1163	            "page_text": clean(features.get("combined_text") or features.get("page_text"))[:MAX_PROFILE_TEXT],
1164	        },
1165	    }
1166	    return f"""Profile this Indian business from its own website evidence.
1167	
1168	Rules:
1169	- Use only the evidence below; do not invent.
1170	- Pull out business model, products, customer type, online payment intent, people/team names if visible, and useful GTM notes.
1171	- If the official identity is unclear, say so in identity_confidence.
1172	
1173	Evidence JSON:
1174	{json.dumps(evidence, ensure_ascii=False)}
1175	
1176	Return ONLY JSON:
1177	{{
1178	  "brand_name": null,
1179	  "legal_entity_name": null,
1180	  "business_summary": "one factual sentence",
1181	  "products": ["max 5"],
1182	  "inferred_vertical": "business_services|construction|education|financial_services|healthcare|hospitality|it_software|lending|logistics_trade|manufacturing|real_estate|trading_ecommerce|travel_tourism|unknown",
1183	  "inferred_category": "short category",
1184	  "customer_type": "B2B|B2C|D2C|B2B2C|marketplace|enterprise|unknown",
1185	  "sells_online": true,
1186	  "payment_use_cases": ["cart|booking|fees|subscriptions|rent|emi|b2b_portal|international"],
1187	  "people": [{{"name":"", "role":"", "source":"website text"}}],
1188	  "socials": {{"linkedin": "", "instagram": "", "facebook": "", "youtube": "", "twitter": ""}},
1189	  "profile_confidence": 0.0,
1190	  "identity_confidence": 0.0,
1191	  "score_notes": ["short evidence-backed notes"]
1192	}}"""
1193	
1194	
1195	def fetch_url(url: str) -> tuple[int, str, str]:
1196	    try:
1197	        resp = requests.get(url, timeout=REQUEST_TIMEOUT, headers={"User-Agent": HTTP_UA}, allow_redirects=True)
1198	        content_type = resp.headers.get("Content-Type", "").lower()
1199	        if resp.status_code >= 400:
1200	            return resp.status_code, "", f"http_{resp.status_code}"
1201	        if content_type and not any(t in content_type for t in ("html", "text")):
1202	            return resp.status_code, "", f"non_html:{content_type}"
1203	        return resp.status_code, (resp.text or "")[:MAX_FETCH_BYTES], "ok"
1204	    except requests.exceptions.SSLError:
1205	        # Many Indian SME sites have weak/expired certs. Retry once without
1206	        # verification so we can still read the page (flagged via ok_insecure).
1207	        try:
1208	            import urllib3
1209	
1210	            urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
1211	            resp = requests.get(
1212	                url, timeout=REQUEST_TIMEOUT, headers={"User-Agent": HTTP_UA}, allow_redirects=True, verify=False
1213	            )
1214	            content_type = resp.headers.get("Content-Type", "").lower()
1215	            if resp.status_code >= 400:
1216	                return resp.status_code, "", f"http_{resp.status_code}"
1217	            if content_type and not any(t in content_type for t in ("html", "text")):
1218	                return resp.status_code, "", f"non_html:{content_type}"
1219	            return resp.status_code, (resp.text or "")[:MAX_FETCH_BYTES], "ok_insecure"
1220	        except requests.exceptions.RequestException:
1221	            return 0, "", "ssl"
1222	    except requests.exceptions.Timeout:
1223	        return 0, "", "timeout"
1224	    except requests.exceptions.RequestException as exc:
1225	        return 0, "", type(exc).__name__
1226	
1227	
1228	def candidate_urls(domain: str) -> list[str]:
1229	    host = normalize_host(domain)
1230	    if not host:
1231	        return []
1232	    return [f"https://{host}", f"http://{host}"]
1233	
1234	
1235	def strip_html(html: str) -> str:
1236	    return re.sub(r"\s+", " ", TAG_RE.sub(" ", SCRIPT_RE.sub(" ", html))).strip()
1237	
1238	
1239	def first_match(pattern: str, text: str, limit: int = 300) -> str:
1240	    match = re.search(pattern, text, re.I | re.S)
1241	    if not match:
1242	        return ""
1243	    return re.sub(r"\s+", " ", strip_html(match.group(1))).strip()[:limit]
1244	
1245	
1246	def pick_inner_links(html: str, base_url: str) -> list[str]:
1247	    base_host = normalize_host(base_url)
1248	    picked: list[str] = []
1249	    seen: set[str] = set()
1250	    for match in LINK_RE.finditer(html):
1251	        href, text = match.group(1), strip_html(match.group(2)).lower()
1252	        blob = f"{href} {text}".lower()
1253	        if not any(re.search(pattern, blob) for pattern in SECTION_PATTERNS.values()):
1254	            continue
1255	        url = urljoin(base_url, href)
1256	        if normalize_host(url) != base_host:
1257	            continue
1258	        url = url.split("#", 1)[0]
1259	        if url.rstrip("/") == base_url.rstrip("/") or url in seen:
1260	            continue
1261	        seen.add(url)
1262	        picked.append(url)
1263	        if len(picked) >= MAX_PAGES - 1:
1264	            break
1265	    if not picked:
1266	        for path in ("/contact", "/contact-us", "/about", "/about-us", "/pricing"):
1267	            url = urljoin(base_url, path)
1268	            if url not in seen:
1269	                picked.append(url)
1270	    return picked[: MAX_PAGES - 1]
1271	
1272	
1273	def detect_all(blob: str, patterns: dict[str, tuple[str, ...]]) -> list[str]:
1274	    low = blob.lower()
1275	    return sorted(key for key, needles in patterns.items() if any(needle in low for needle in needles))
1276	
1277	
1278	def detect_platform(blob: str) -> str:
1279	    found = detect_all(blob, PLATFORM_PATTERNS)
1280	    for platform in ("shopify", "woocommerce", "magento", "wix", "squarespace", "webflow", "wordpress"):
1281	        if platform in found:
1282	            return platform
1283	    return "custom" if blob else "unknown"
1284	
1285	
1286	def extract_socials(blob: str) -> dict[str, str]:
1287	    out: dict[str, str] = {}