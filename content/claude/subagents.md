---
title: "subagents"
---

_742 transcript files aggregated._

You are an Opus implementer for the Kube project (clean-room Rust image editor). Work EXCLUSIVELY in the git worktree /root/dev/scratch/kube-wt-tool on branch `unit/6.0-tool-system` (empty off main — a prior run was interrupted before producing anything; start fresh). Reasoning effort: high.

# Rules
- **SEQUENTIAL COMMITS** — small conventional commits; never leave uncommitted at end. Commit as `kuberwastaken <kuberhob@gmail.com>`, NO Claude/Anthropic trailer.
- `#![forbid(unsafe_code)]` every file. `refs/` off-limits. Clean-room (from spec).
- Stay within `crates/kube-tool/` (+ Cargo.toml, fixtures, Cargo.lock). Don't touch other crates/deny.toml. Scope cargo with `-p kube-tool`.

# The unit — 6.0 `kube-tool`: tool framework + brush engine + 3 seed tools
Implement `docs/specs/tool-system.md` (READ IT). Tier-3, headless. Deps: `kube-core`, `kube-pixel`, `kube-geometry`, `kube-history`, `kube-color` (merged — read their lib.rs, esp. kube-history Command/Memento + kube-core Document/TileStore/selection).
Build: `Tool` trait + `PointerEvent`/`ToolContext`/`ToolResponse`/`ToolCursor`, a minimal tool-options property system (local; do NOT depend on kube-effect), `hit_test`, and the **brush engine** module (stamped: size/hardness/flow/opacity, pressure→size/opacity, spacing, stamp interpolation along the pointer polyline, AA, selection-clipped, blend-aware, DETERMINISTIC). Transaction model: down→move…→up = ONE `kube-history` transaction committed on Up (structural-sharing memento of touched tiles); Cancel discards. Headless scripted-event replay entry (`Vec<PointerEvent>` → committed transaction). Seed tools: `tool.pencil` (hard 1px), `tool.brush` (soft AA), `tool.bucket_fill` (flood+tolerance+selection-clip+hit-test).

# Acceptance (spec §Acceptance): scripted events → exactly ONE transaction on Up; undo reverts whole stroke byte-exact; Cancel unchanged; brush engine straight stroke → correct AA line (golden, Kube output); spacing even; selection-clipped; pressure modulates; deterministic (same events → byte-identical); pencil pixel-exact hard line (golden); fill matches reference within tolerance + respects selection + no leak; no panic on degenerate (zero-length stroke, off-canvas, empty selection); bench long stroke 4K.

# DoD (self-verify, speed-first): `cargo fmt --all --check` clean; `RUSTFLAGS="-D warnings" cargo clippy -p kube-tool --all-targets` zero warnings; `cargo nextest run -p kube-tool` all pass (count); `cargo build --workspace` green; `cargo metadata --locked` OK; no todo!/unimplemented!/bare TODO; docs.

# Report: branch tip + `git log --oneline main..HEAD`; test count; the commit-on-Up + undo mechanism (kube-history integration); brush-engine stamp/interpolation/determinism design; hit-test + fill approach; bench; deviations; confirm git status clean + workspace builds. Your message is the deliverable (I self-verify; batched sweep later). Adapt to real APIs; don't stop to ask.

- gstack: Fast web browsing for Claude Code via persistent headless Chromium daemon. Navigate to any URL,
read page content, click elements, fill forms, run JavaScript, take screenshots,
inspect CSS/DOM, capture console/network logs, and more. ~100ms per command after
first call. Use when you need to check a website, verify a deployment, read docs,
or interact with any web page. No MCP, no Chrome extension — just fast CLI.
- pdf-inspector: Read, classify, and convert PDF files to Markdown locally in ~10-200ms using Firecrawl's pdf-inspector Rust library — no OCR service, no network, no ML models. Use whenever a task involves reading, extracting, summarizing, or converting a PDF file. Classifies text-based vs scanned first, so scanned pages get routed to OCR instead of silently coming back empty.
- subagentmaxxing: Spawn and control non-Claude coding-agent subagents (OpenAI Codex CLI and Cursor CLI — grok-4.5, composer-2.5, gpt-5.5) as one-prompt-in/one-answer-out subagents via the `subagent` CLI. Use when you want to offload a task to a Codex or Cursor subagent, get a second opinion from a different model family, run cross-model consensus, or fan one prompt out across several models in parallel. - Also for reaching Cursor-hosted Opus/Sonnet/Gemini, or any time you specifically want a non-Claude model instead of the native Agent tool.
- vercel:bootstrap: Bootstrap a repository with Vercel-linked resources by running preflight checks, provisioning integrations, verifying env keys, and then executing db/dev startup commands safely.
- vercel:deploy: Deploy the current project to Vercel. Pass "prod" or "production" as argument to deploy to production. Default is preview deployment.
- vercel:env: Manage Vercel environment variables. Commands include list, pull, add, remove, and diff. Use to sync environment variables between Vercel and your local development environment.
- vercel:status: Show the status of the current Vercel project — recent deployments, linked project info, and environment overview.
- vercel:ai-gateway: Vercel AI Gateway expert guidance. Use when configuring model routing, provider failover, cost tracking, or managing multiple AI providers through a unified API.
- vercel:ai-sdk: Vercel AI SDK expert guidance. Use when building AI-powered features — chat interfaces, text generation, structured output, tool calling, agents, MCP integration, streaming, embeddings, reranking, image generation, or working with any LLM provider.
- vercel:auth: Authentication integration guidance — Clerk (native Vercel Marketplace), Descope, and Auth0 setup for Next.js applications. Covers middleware auth patterns, sign-in/sign-up flows, and Marketplace provisioning. Use when implementing user authentication.
- vercel:cdn-caching: Debug Vercel CDN caching — cache hit rate, stale content, revalidation behavior, ISR + PPR, per-request cache reasons (cacheReason), and costs.
- vercel:chat-sdk: Vercel Chat SDK expert guidance. Use when building multi-platform chat bots — Slack, Telegram, Microsoft Teams, Discord, Google Chat, GitHub, Linear — with a single codebase. Covers the Chat class, adapters, threads, messages, cards, modals, streaming, state management, and webhook setup.
- vercel:deployments-cicd: Vercel deployment and CI/CD expert guidance. Use when deploying, promoting, rolling back, inspecting deployments, building with --prebuilt, or configuring CI workflow files for Vercel.
- vercel:env-vars: Vercel environment variable expert guidance. Use when working with .env files, vercel env commands, OIDC tokens, or managing environment-specific configuration.
- vercel:eve: Build durable AI agents and agent-powered applications with the eve framework. Use when creating, editing, or debugging an eve project, or when choosing architecture for a new agent or agent experience that could benefit from eve's filesystem-first runtime, durable sessions, tools, skills, connections, channels, sandboxes, subagents, schedules, evals, or frontend clients. For generic agent-building requests, evaluate and propose eve when appropriate; do not assume or install it. Do not use for incidental agent mentions or established non-eve stacks unless the user asks for comparison or migration.
- vercel:knowledge-update: Corrects outdated LLM knowledge about the Vercel platform and introduces new products. Injected at session start.
- vercel:marketplace: Vercel Marketplace expert guidance — discovering, installing, and managing third-party integrations via the `vercel integration` CLI. Use when building any app that needs an external capability without a dedicated skill — commerce (stores, storefronts, selling products), payments (checkout, subscriptions, billing), observability/monitoring, messaging/email, search, or CMS — or when discovering, installing, or managing integrations.
- vercel:microfrontends: Guide for building, configuring, and deploying microfrontends on Vercel. Use this skill when the user mentions microfrontends, multi-zones, splitting an app across teams, independent deployments, cross-app routing, incremental migration, composing multiple frontends under one domain, microfrontends.json, @vercel/microfrontends, the microfrontends local proxy, or path-based routing between Vercel projects. Also use when the user asks about shared layouts across projects, navigation between microfrontends, fallback environments, asset prefixes, or feature flag controlled routing.
- vercel:next-cache-components: Next.js 16 Cache Components guidance — PPR, use cache directive, cacheLife, cacheTag, updateTag, and migration from unstable_cache. Use when implementing partial prerendering, caching strategies, or migrating from older Next.js cache patterns.
- vercel:next-forge: next-forge expert guidance — production-grade Turborepo monorepo SaaS starter by Vercel. Use when working in a next-forge project, scaffolding with `npx next-forge init`, or editing @repo/* workspace packages.
- vercel:next-upgrade: Upgrade Next.js to the latest version following official migration guides and codemods. Use when upgrading Next.js versions, running codemods, or migrating between major releases.
- vercel:nextjs: Next.js App Router expert guidance. Use when building, debugging, or architecting Next.js applications — routing, Server Components, Server Actions, Cache Components, layouts, middleware/proxy, data fetching, rendering strategies, and deployment on Vercel.
- vercel:react-best-practices: React best-practices reviewer for TSX files. Triggers after editing multiple TSX components to run a condensed quality checklist covering component structure, hooks usage, accessibility, performance, and TypeScript patterns.
- vercel:routing-middleware: Vercel Routing Middleware guidance — request interception before cache, rewrites, redirects, personalization. Works with any framework. Supports Edge, Node.js, and Bun runtimes. Use when intercepting requests at the platform level.
- vercel:runtime-cache: Vercel Runtime Cache API guidance — ephemeral per-region key-value cache with tag-based invalidation. Shared across Functions, Routing Middleware, and Builds. Use when implementing caching strategies beyond framework-level caching.
- vercel:shadcn: shadcn/ui expert guidance — CLI, component installation, composition patterns, custom registries, theming, Tailwind CSS integration, and high-quality interface design. Use when initializing shadcn, adding components, composing product UI, building custom registries, configuring themes, or troubleshooting component issues.
- vercel:turbopack: Turbopack expert guidance. Use when configuring the Next.js bundler, optimizing HMR, debugging build issues, or understanding the Turbopack vs Webpack differences.
- vercel:vercel-agent: Vercel Agent guidance — AI-powered code review, incident investigation, and SDK installation. Automates PR analysis and anomaly debugging. Use when configuring or understanding Vercel's AI development tools.
- vercel:vercel-cli: Vercel CLI expert guidance. Use when deploying, managing environment variables, linking projects, viewing logs, querying metrics, managing domains, or interacting with the Vercel platform from the command line.
- vercel:vercel-connect: Vercel Connect expert guidance — securely obtain scoped OAuth tokens for third-party services (Slack, GitHub, MCP servers, OAuth, Snowflake) on behalf of apps or users via Vercel OIDC. Use when wiring up third-party API access, connecting to MCP servers, sending Slack messages, accessing GitHub APIs, receiving webhook events from Slack/Linear/GitHub and forwarding them to your agents and apps, or building Eve agent connections.
- vercel:vercel-firewall: Vercel Firewall expert guidance — automatic DDoS mitigation, the Vercel WAF (custom rules, IP blocking, managed rulesets, rate limiting), Attack Mode, system bypass, bot management, and the `vercel firewall` CLI. Use when configuring platform-level security, responding to attacks, or staging firewall rules.
- vercel:vercel-functions: Vercel Functions expert guidance — Serverless Functions, Edge Functions, Fluid Compute, streaming, Cron Jobs, and runtime configuration. Use when configuring, debugging, or optimizing server-side code running on Vercel.
- vercel:vercel-sandbox: Vercel Sandbox guidance — ephemeral Firecracker microVMs for running untrusted code safely. Supports AI agents, code generation, and experimentation. Use when executing user-generated or AI-generated code in isolation.
- vercel:vercel-storage: Vercel storage expert guidance — Blob, Edge Config, and Marketplace storage (Neon Postgres, Upstash Redis). Use when choosing, configuring, or using data storage with Vercel applications.
- vercel:verification: Full-story verification — infers what the user is building, then verifies the complete flow end-to-end: browser → API → data → response. Triggers on dev server start and 'why isn't this working' signals.
- vercel:workflow: Vercel Workflow DevKit (WDK) expert guidance. Use when building durable workflows, long-running tasks, API routes or agents that need pause/resume, retries, step-based execution, or crash-safe orchestration with Vercel Workflow.
- dataviz: Use this skill whenever you are about to create ANY chart, graph, plot, dashboard, or data visualization, in ANY output medium — an HTML or React artifact, inline SVG, plotting code in any library (matplotlib, plotly, d3, Recharts, …), an image/PNG you will render and upload, or a chart shared into Slack. Read it BEFORE writing the first line of chart code, choosing chart colors, building a stat tile / meter / KPI row, or laying out a dashboard. Produces visualizations that read as one system — elegant, accessible, consistent in light and dark — using a brand-neutral placeholder palette you swap for your own. Teaches a design-system-agnostic method: a form heuristic, a color formula with a runnable validator, mark specs, and interaction rules. A validated default palette is documented in `references/palette.md` — swap that file's values for your brand's. Triggers on: "chart", "graph", "plot", "data viz", "visualization", "dashboard", "analytics", "visualize data", "categorical colors", "sequential / diverging palette", "stat tile", "sparkline", "heatmap", "legend", "axis", "tooltip", "chart colors", "color by series".
- update-config: Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
- keybindings-help: Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".
- code-review: Review the current diff, or a PR number/branch/path target, for correctness bugs and reuse/simplification/efficiency cleanups at the given effort level (low/medium: fewer, high-confidence findings; high→max: broader coverage, may include uncertain findings); with no level given, it reuses the level you typed last. Pass --comment to post findings as inline PR comments, or --fix to apply the findings to the working tree after the review.
- simplify: Review the changed code for reuse, simplification, efficiency, and altitude cleanups, then apply the fixes. Quality only — it does not hunt for bugs; use /code-review for that.
- fewer-permission-prompts: Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project .claude/settings.json to reduce permission prompts.
- loop: Run a prompt or slash command on a recurring interval (e.g. /loop 5m /foo). Omit the interval to let the model self-pace. - When the user wants to set up a recurring task, poll for status, or run something repeatedly on an interval (e.g. "check the deploy every 5 minutes", "keep running /babysit-prs"). Do NOT invoke for one-off tasks.
- claude-api: Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.
TRIGGER — read BEFORE opening the target file; don't skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
- run: Launch and drive this project's app to see a change working. Use when asked to run, start, or screenshot the app, or to confirm a change works in the real app (not just tests). First looks for a project skill that already covers launching the app; otherwise falls back to built-in patterns per project type (CLI, server, TUI, Electron, browser-driven, library).
- init: Initialize a new CLAUDE.md file with codebase documentation
- security-review: Complete a security review of the pending changes on the current branch

I'll start by exploring the worktree and reading the spec.

On branch unit/6.0-tool-system
nothing to commit, working tree clean
ee9ea3f docs(specs): effect-system (5.0) + tool-system (6.0) foundation contracts
012f325 docs: unit 4.1 kube-gpu done (headless Vulkan on Pi V3D); Phase 4 underway
f7f09db merge(kube-gpu): unit 4.1 — GPU device bring-up (the GPU firewall)
---
CHECKLIST.md
Cargo.lock
Cargo.toml
PLAN.md
README.md
STATUS.md
corpus
crates
deny.toml
docs
fixtures
rust-toolchain.toml
xtask

# Spec: tool system (`kube-tool`) — v1 (unit 6.0 + seed tools + brush engine)

The Tier-3, **headless** tool framework: a `Tool` trait that turns pointer input into document
edits as `kube-history` transactions, plus hit-testing and the **brush engine** module. Headless so
`kube-cli` can replay strokes for golden tests (input translation + overlay drawing are `kube-ui`
concerns, Phase 6/7). Depends on `kube-core` (Document/tiles/selection), `kube-pixel`,
`kube-geometry` (paths/masks), `kube-history` (commands/mementos), `kube-color`. `#![forbid(unsafe_code)]`.
The tool *catalog* (pencil, brush, eraser, fill, gradient, shapes, text, clone, move/transform,
selection tools, recolor, …, matching paint.net) is built AFTER this as a fan-out; this unit is the
framework + the brush engine + 3 reference tools that prove it.

## Public API (shape)

```rust
/// A tool consumes pointer events over a document and produces edits as a history transaction.
pub trait Tool {
    fn id(&self) -> &'static str;                 // "tool.brush"
    fn name_key(&self) -> &'static str;           // i18n key
    fn properties(&self) -> PropertySchema;       // tool options (size, hardness, color, mode…) — reuse kube-effect's property system or a shared one
    fn cursor(&self) -> ToolCursor;
    /// Drive the tool. Events are in DOCUMENT coordinates (the UI maps screen→doc via the viewport).
    fn on_event(&mut self, ctx: &mut ToolContext, ev: PointerEvent) -> ToolResponse;
}

pub enum PointerEvent { Down{pos:DocPoint, button, mods, pressure:f32}, Move{pos, pressure}, Up{pos}, Cancel }
pub struct ToolContext<'a> { /* &mut Document, &TileStore, active layer, &Selection, current color/palette, &mut History */ }
pub enum ToolResponse { /* in-progress (live preview), Committed(txn), NoOp */ }
```

- **Transaction model:** a tool interaction (e.g. a brush stroke down→move…→up) is ONE undoable
  transaction. The tool mutates through a staging/preview path during the drag (live feedback) and
  **commits a single `kube-history` memento on Up** (structural-sharing over touched tiles) — so undo
  reverts the whole stroke, not each segment. Cancel discards. This is the tool↔history contract.
- **Hit-testing:** `hit_test(doc, point) -> HitResult` (which layer/pixel/selection region a point
  falls in) for tools that need it (fill, move, magic-wand).
- **Brush engine (module):** the reusable stroke rasterizer — a stamped brush (hardness/softness,
  size, spacing, flow, opacity, pressure→size/opacity) that interpolates stamps along the pointer
  polyline and composites them into the layer (respecting the selection mask + blend). Antialiased.
  Deterministic given the same input event sequence (so CLI stroke-replay golden tests work). This is
  the hard part several catalog tools (brush, pencil, eraser, clone) build on.
- **Selection-aware + color:** edits clip to the active `Selection`; the current foreground/background
  color + palette come from `ToolContext`.
- **Headless replay:** expose a way to feed a scripted `Vec<PointerEvent>` and get the committed
  transaction (no window) — the golden-test + `kube-cli` stroke-replay path.

## Seed tools (prove the framework — first catalog entries)
1. **`tool.pencil`** — hard 1px-aliased freehand line via the brush engine (spacing=1, hardness=1,
   no AA) — the simplest stroke; verifies event→stroke→single-transaction→undo.
2. **`tool.brush`** — soft antialiased brush (size/hardness/flow/opacity, pressure) — exercises the
   full brush engine (stamp interpolation, soft edge, flow accumulation).
3. **`tool.bucket_fill`** — flood fill from a seed point with a tolerance, selection-clipped —
   exercises hit-testing + a non-brush edit + a single transaction.

## Acceptance
- Framework: a scripted event sequence → exactly ONE history transaction on Up; undo reverts the
  whole stroke to the pre-stroke pixels (byte-exact via the memento); Cancel leaves the doc unchanged.
- Brush engine: a straight down→up stroke rasterizes a correct antialiased line (golden fixture, Kube
  output); spacing produces evenly-spaced stamps; the stroke clips to a selection (deselected pixels
  untouched); pressure modulates size/opacity as declared; deterministic (same events → byte-identical
  result across runs).
- Pencil: pixel-exact hard line (golden). Fill: flood region matches a reference within tolerance;
  respects selection; a fully-enclosed region doesn't leak.
- No panic on degenerate input (zero-length stroke = down-then-up same point → a single dab; stroke
  outside canvas clipped; empty selection = no-op). Bench a long brush stroke on a 4K layer.
- `#![forbid(unsafe_code)]`; gates green; docs.

## Non-goals (6.0)
The full tool catalog (separate fan-out), live-text editing (Phase 6/7), transform/move gizmos
(later), UI cursors/overlays/input-translation (kube-ui, Phase 7), tool *plugins*. This unit is the
framework + brush engine + the 3 seeds; the catalog references this trait.

Now let me survey the workspace and dependency crates.

[workspace]
resolver = "3"
members = ["crates/*", "xtask"]

[workspace.package]
version = "0.1.0"
edition = "2024"
rust-version = "1.97"
license = "MIT OR Apache-2.0"
repository = "https://github.com/Kuberwastaken/kube"
authors = ["Kuber Mehta <kuberhob@gmail.com>"]

[workspace.dependencies]
# Tier 0-3 (headless core). Heavy Tier-4 deps (wgpu, egui, wasmtime) are added
# only when their phase starts, to keep the default build light.
rayon = "1.11"
kurbo = "0.13"
i_overlay = "8"
tiny-skia = "0.12"
flate2 = { version = "1.1", default-features = false, features = ["zlib-rs"] }
thiserror = "2"
smallvec = "1"
hashbrown = "0.15"
parking_lot = "0.12"
tempfile = "3"
png = "0.18"
log = "0.4"
# Pinned to =4.6.1: the only clap whose `clap_builder`/`clap_derive` are both
# available in this offline build environment (4.6.6 wants clap_derive 4.6.4,
# which is not vendored). `^4` would resolve to 4.6.6 and fail to build.
clap = { version = "=4.6.1", features = ["derive"] }

# Tier 4 (GPU / windowing). `wgpu` is named ONLY by `kube-gpu` (the GPU
# firewall, ARCHITECTURE §GPU firewall); every crate above it depends on
# `kube-gpu`, never on `wgpu` directly. `pollster` is a tiny zero-runtime-dep
# executor used to block on wgpu's async adapter/device requests (we cannot
# hand-roll a `Waker` under `#![forbid(unsafe_code)]`).
wgpu = "30"
pollster = "0.4"

# dev/test
proptest = "1"
criterion = { version = "0.8", default-features = false }
insta = "1"

# first-party
kube-pixel = { path = "crates/kube-pixel" }
kube-geometry = { path = "crates/kube-geometry" }
kube-tile = { path = "crates/kube-tile" }
kube-core = { path = "crates/kube-core" }
kube-history = { path = "crates/kube-history" }
kube-nrbf = { path = "crates/kube-nrbf" }
pdn-format = { path = "crates/pdn-format" }
psd-format = { path = "crates/psd-format" }
kube-codec = { path = "crates/kube-codec" }
kube-color = { path = "crates/kube-color" }
kube-exif = { path = "crates/kube-exif" }
kube-formats = { path = "crates/kube-formats" }
kube-effect = { path = "crates/kube-effect" }
kube-tool = { path = "crates/kube-tool" }
kube-plugin = { path = "crates/kube-plugin" }
kube-plugin-sdk = { path = "crates/kube-plugin-sdk" }
kube-gpu = { path = "crates/kube-gpu" }
kube-render = { path = "crates/kube-render" }
kube-effect-gpu = { path = "crates/kube-effect-gpu" }
kube-i18n = { path = "crates/kube-i18n" }
kube-testkit = { path = "crates/kube-testkit" }

[workspace.lints.rust]
unsafe_op_in_unsafe_fn = "deny"
missing_debug_implementations = "warn"
unused_qualifications = "warn"

[workspace.lints.clippy]
pedantic = { level = "warn", priority = -1 }
# Curated escape hatches from pedantic — imaging code trips these constantly
# for legitimate reasons (u8 arithmetic, index math on pixel buffers).
cast_possible_truncation = "allow"
cast_precision_loss = "allow"
cast_sign_loss = "allow"
cast_lossless = "allow"
module_name_repetitions = "allow"
must_use_candidate = "allow"
missing_panics_doc = "allow"
missing_errors_doc = "allow"
similar_names = "allow"
many_single_char_names = "allow"
unreadable_literal = "allow"
inline_always = "allow"

# Fast local dev on the Pi; CI builds release where it matters.
[profile.dev]
opt-level = 1

[profile.dev.package."*"]
opt-level = 2

[profile.release]
lto = "thin"
codegen-units = 1

[profile.bench]
inherits = "release"
=== crates ===
kube-cli
kube-codec
kube-color
kube-core
kube-effect
kube-effect-gpu
kube-exif
kube-formats
kube-geometry
kube-gpu
kube-history
kube-i18n
kube-nrbf
kube-pixel
kube-plugin
kube-plugin-sdk
kube-render
kube-testkit
kube-tile
kube-tool
kube-ui
pdn-format
psd-format
=== sizes ===
-- kube-core
  140 crates/kube-core/src/geometry.rs
   45 crates/kube-core/src/error.rs
  158 crates/kube-core/src/metadata.rs
  355 crates/kube-core/src/document.rs
  465 crates/kube-core/src/selection.rs
  199 crates/kube-core/src/grid.rs
  433 crates/kube-core/src/compositor.rs
  265 crates/kube-core/src/layer.rs
   56 crates/kube-core/src/lib.rs
 2116 total
-- kube-pixel
  531 crates/kube-pixel/src/blend.rs
  226 crates/kube-pixel/src/rgba128f.rs
  112 crates/kube-pixel/src/math.rs
   37 crates/kube-pixel/src/lib.rs
  313 crates/kube-pixel/src/bgra8.rs
  912 crates/kube-pixel/src/blend/simd.rs
 2131 total
-- kube-geometry
  524 crates/kube-geometry/src/geometry.rs
  218 crates/kube-geometry/src/mask.rs
   34 crates/kube-geometry/src/lib.rs
  776 total
-- kube-history
   76 crates/kube-history/src/error.rs
  156 crates/kube-history/src/memento.rs
  351 crates/kube-history/src/command.rs
  304 crates/kube-history/src/history.rs
   77 crates/kube-history/src/lib.rs
  964 total
-- kube-color
  234 crates/kube-color/src/profile.rs
   73 crates/kube-color/src/linear.rs
   44 crates/kube-color/src/error.rs
  190 crates/kube-color/src/tonemap.rs
  157 crates/kube-color/src/cmyk.rs
  516 crates/kube-color/src/transform.rs
   36 crates/kube-color/src/lib.rs
 1250 total

blend
exif
fetch-flatten.py
flatten-expected.json
icc
pdn-corpus-expected.json
psd
pypdn-crosscheck.json
pypdn-crosscheck.py
tonemap
=== corpus ===
fetch.py
pdn-manifest.json
psd-fetch.py
=== docs/specs ===
blend-fixtures.md
core-document.md
effect-system.md
formats-bridge-cli.md
kube-codec.md
kube-color.md
kube-exif.md
pdn-format.md
psd-format.md
render-canvas.md
tile-store.md
tool-system.md

<persisted-output>
Output too large (42.8KB). Full output saved to: /root/.claude/projects/-root-dev-scratch/66b0397f-0af5-4ba4-9871-b5053e5c3934/tool-results/bkwxxitjp.txt

Preview (first 2KB):
########## crates/kube-history/src/lib.rs
     1	//! Structural-sharing undo/redo engine for the Kube image editor.
     2	//!
     3	//! `kube-history` is the **session-owned** command layer over `kube-core`'s
     4	//! document model (`docs/ARCHITECTURE.md` — "kube-history is separate ... owned
     5	//! by an app-level session, not by `Document`"). It owns the shared
     6	//! [`Arc<TileStore>`](kube_tile::TileStore) and the live [`Document`], turns
     7	//! every edit into a [`Command`], and records the inverse as a memento built by
     8	//! **structural sharing** — not by cloning.
     9	//!
    10	//! # The idea
    11	//!
    12	//! `kube-core::Document` is deliberately not `Clone`; its layers own tile
    13	//! *handles* into a shared store. A memento captures pre-edit state with
    14	//! [`Document::snapshot`](kube_core::Document::snapshot) /
    15	//! [`Layer::snapshot`](kube_core::Layer::snapshot), which
    16	//! [`share`](kube_tile::TileStore::share) every tile (one refcount bump each,
    17	//! **zero pixel copies**). A later write forks — copy-on-write — only the tiles
    18	//! it touches, so a localized edit's memento costs *O(changed tiles)* pixels
    19	//! however large the canvas is. Undo and redo are then a pure ownership *swap*
    20	//! between the live document and the memento: no pixels move.
    21	//!
    22	//! Because mementos hold plain [`TileId`](kube_tile::TileId) handles (not `Arc`s
    23	//! pinning buffers), the store's LRU spill applies uniformly to live *and*
    24	//! history tiles — a deep whole-canvas undo history spills to disk and pages
    25	//! back transparently (the review-C1 property), which the `spill` test suite
    26	//! pins down.
    27	//!
    28	//! # Ownership and release discipline
    29	//!
    30	//! The [`History`] engine owns every memento and is the sole manager of tile
    31	//! lifetime. It releases a memento's handles *exactly* when the memento leaves a
...
</persisted-output>

<persisted-output>
Output too large (31.6KB). Full output saved to: /root/.claude/projects/-root-dev-scratch/66b0397f-0af5-4ba4-9871-b5053e5c3934/tool-results/bzadhrnv3.txt

Preview (first 2KB):
########## crates/kube-core/src/lib.rs
     1	//! Document model, layer stack, and tile compositor for the Kube image editor.
     2	//!
     3	//! `kube-core` is the headless, GPU-free heart of the document tier
     4	//! (`docs/ARCHITECTURE.md`). It owns:
     5	//!
     6	//! - the **document model** — [`Document`], [`LayerList`], [`Layer`],
     7	//!   [`TileGrid`], [`Metadata`], [`Dpu`] — built on `kube-tile`'s handle store so
     8	//!   a document is a cheap bag of [`TileId`](kube_tile::TileId)s that
     9	//!   `kube-history` can snapshot by sharing handles;
    10	//! - the **compositor** — [`Compositor`], a pure per-tile function over the layer
    11	//!   stack run on its own `rayon` pool with generation-counter cancellation,
    12	//!   bit-exact against `kube-pixel`'s fixture-proven blend primitive.
    13	//!
    14	//! Selection (unit 2.6) lives in the [`selection`] module: it clips *editing*,
    15	//! not display, so it does not touch the compositor. See [`Selection`].
    16	//!
    17	//! # Example
    18	//!
    19	//! ```
    20	//! use kube_core::{Compositor, Document, RectU32};
    21	//! use kube_pixel::{Bgra8, BlendMode};
    22	//! use kube_tile::{SpillConfig, TileStore};
    23	//!
    24	//! let store = TileStore::new(SpillConfig::ephemeral());
    25	//! let mut doc = Document::new(300, 200, &store); // opaque-white background
    26	//! let top = doc.add_layer("tint", &store);
    27	//! {
    28	//!     let layer = doc.layers_mut().get_mut(top).unwrap();
    29	//!     layer.set_blend(BlendMode::Multiply);
    30	//!     layer.set_opacity(128);
    31	//! }
    32	//!
    33	//! let compositor = Compositor::new().unwrap();
    34	//! let region = RectU32::from_size(300, 200);
    35	//! let mut frame = vec![Bgra8::TRANSPARENT; region.area() as usize];
    36	//! compositor.composite_into(&doc, &store, &mut frame, region).unwrap();
    37	//! ```
    38	#![forbid(unsafe_code)]
    39	
    40	mod compositor;
    41	mod document;
...
</persisted-output>

1	########## crates/kube-history/src/lib.rs
2	     1	//! Structural-sharing undo/redo engine for the Kube image editor.
3	     2	//!
4	     3	//! `kube-history` is the **session-owned** command layer over `kube-core`'s
5	     4	//! document model (`docs/ARCHITECTURE.md` — "kube-history is separate ... owned
6	     5	//! by an app-level session, not by `Document`"). It owns the shared
7	     6	//! [`Arc<TileStore>`](kube_tile::TileStore) and the live [`Document`], turns
8	     7	//! every edit into a [`Command`], and records the inverse as a memento built by
9	     8	//! **structural sharing** — not by cloning.
10	     9	//!
11	    10	//! # The idea
12	    11	//!
13	    12	//! `kube-core::Document` is deliberately not `Clone`; its layers own tile
14	    13	//! *handles* into a shared store. A memento captures pre-edit state with
15	    14	//! [`Document::snapshot`](kube_core::Document::snapshot) /
16	    15	//! [`Layer::snapshot`](kube_core::Layer::snapshot), which
17	    16	//! [`share`](kube_tile::TileStore::share) every tile (one refcount bump each,
18	    17	//! **zero pixel copies**). A later write forks — copy-on-write — only the tiles
19	    18	//! it touches, so a localized edit's memento costs *O(changed tiles)* pixels
20	    19	//! however large the canvas is. Undo and redo are then a pure ownership *swap*
21	    20	//! between the live document and the memento: no pixels move.
22	    21	//!
23	    22	//! Because mementos hold plain [`TileId`](kube_tile::TileId) handles (not `Arc`s
24	    23	//! pinning buffers), the store's LRU spill applies uniformly to live *and*
25	    24	//! history tiles — a deep whole-canvas undo history spills to disk and pages
26	    25	//! back transparently (the review-C1 property), which the `spill` test suite
27	    26	//! pins down.
28	    27	//!
29	    28	//! # Ownership and release discipline
30	    29	//!
31	    30	//! The [`History`] engine owns every memento and is the sole manager of tile
32	    31	//! lifetime. It releases a memento's handles *exactly* when the memento leaves a
33	    32	//! stack (a redo entry cleared by a fresh edit; an undo entry evicted past the
34	    33	//! depth cap; teardown via [`History::clear`] / [`History::into_document`]). A
35	    34	//! swap moves handle ownership rather than duplicating it, so a tile is never
36	    35	//! released while a live document or another memento still references it, and
37	    36	//! never orphaned. See the [`memento`] module for the mechanism.
38	    37	//!
39	    38	//! # Example
40	    39	//!
41	    40	//! ```
42	    41	//! use std::sync::Arc;
43	    42	//! use kube_core::Document;
44	    43	//! use kube_history::{Command, History, LayerProperty};
45	    44	//! use kube_pixel::BlendMode;
46	    45	//! use kube_tile::{SpillConfig, TileStore};
47	    46	//!
48	    47	//! let store = Arc::new(TileStore::new(SpillConfig::ephemeral()));
49	    48	//! let doc = Document::new(256, 256, &store); // opaque-white background
50	    49	//! let mut history = History::new(Arc::clone(&store), doc, 64);
51	    50	//!
52	    51	//! history.push(Command::AddTransparentLayer { name: "tint".into() })?;
53	    52	//! history.push(Command::SetLayerProperty {
54	    53	//!     index: 1,
55	    54	//!     property: LayerProperty::Blend(BlendMode::Multiply),
56	    55	//! })?;
57	    56	//! assert_eq!(history.document().layers().len(), 2);
58	    57	//!
59	    58	//! history.undo()?;                 // drop the blend change
60	    59	//! history.undo()?;                 // drop the added layer
61	    60	//! assert_eq!(history.document().layers().len(), 1);
62	    61	//! history.redo()?;                 // re-add the layer
63	    62	//! assert_eq!(history.document().layers().len(), 2);
64	    63	//!
65	    64	//! let (mut doc, store) = history.into_document();
66	    65	//! doc.release(&store);
67	    66	//! # Ok::<(), kube_history::HistoryError>(())
68	    67	//! ```
69	    68	#![forbid(unsafe_code)]
70	    69	
71	    70	mod command;
72	    71	mod error;
73	    72	mod history;
74	    73	mod memento;
75	    74	
76	    75	pub use command::{Command, LayerProperty, TileEdit};
77	    76	pub use error::HistoryError;
78	    77	pub use history::{CoalesceKey, History};
79	########## crates/kube-history/src/command.rs
80	     1	//! The edit vocabulary: [`Command`]s a session pushes onto the [`History`], plus
81	     2	//! the primitives that build each command's inverse [`Memento`].
82	     3	//!
83	     4	//! A command is the *intent* plus its payload (new pixels, a layer to insert, a
84	     5	//! property value). Applying one mutates the live [`Document`] through the
85	     6	//! `kube-core` mutators and hands back a [`Memento`] — the recorded inverse — for
86	     7	//! the engine to stack. The command is consumed by [`Command::apply`], so a
87	     8	//! payload it owns (a built [`Layer`], a whole replacement [`Document`], a tile's
88	     9	//! pixels) moves straight into the document or the memento with no copy.
89	    10	//!
90	    11	//! # Granularity (documented, per the unit brief)
91	    12	//!
92	    13	//! Each command captures the *smallest scope that changed*, so a memento shares
93	    14	//! only what it must:
94	    15	//!
95	    16	//! - **Bitmap edits** ([`Command::EditLayerTiles`]) snapshot the affected
96	    17	//!   **layer** (one [`share`](kube_tile::TileStore::share) per tile in that
97	    18	//!   layer, zero pixel copies) and then write the changed tiles in place. Only
98	    19	//!   the tiles actually written fork (copy-on-write), so the memento costs
99	    20	//!   *O(changed tiles)* pixel copies — the untouched tiles ride along as shared
100	    21	//!   handles. This is the property the localized-edit bench and the
101	    22	//!   `pixel_copies` test pin down.
102	    23	//! - **Structural layer ops** (add / insert / remove / move / duplicate) build a
103	    24	//!   *precise* inverse — a removed layer is kept whole for re-insertion, a move
104	    25	//!   is inverted by the reverse move — so they never snapshot the wider document.
105	    26	//! - **Property edits** ([`Command::SetLayerProperty`]) record only the scalar
106	    27	//!   they overwrite: no tile handles at all.
107	    28	//! - **Whole-document replacement** ([`Command::ReplaceDocument`]) is the coarse
108	    29	//!   fallback for edits that do not fit the above; its memento snapshots the
109	    30	//!   whole document (still zero pixel copies — every tile is shared).
110	    31	
111	    32	use kube_core::{Document, Layer};
112	    33	use kube_pixel::{Bgra8, BlendMode};
113	    34	use kube_tile::{TILE_PIXELS, TileStore};
114	    35	
115	    36	use crate::error::HistoryError;
116	    37	use crate::memento::Memento;
117	    38	
118	    39	/// A full-tile pixel replacement at grid cell `(col, row)` of a layer.
119	    40	///
120	    41	/// `pixels` must be exactly [`TILE_PIXELS`] straight-alpha [`Bgra8`] values,
121	    42	/// row-major — one whole tile. Edge tiles carry their out-of-bounds pixels too
122	    43	/// (they are simply never composited), so a caller reconstructs the full tile
123	    44	/// (usually by reading the current tile and overwriting the sub-rect it touched).
124	    45	#[derive(Debug, Clone)]
125	    46	pub struct TileEdit {
126	    47	    /// Grid column (`x / 256`).
127	    48	    pub col: u32,
128	    49	    /// Grid row (`y / 256`).
129	    50	    pub row: u32,
130	    51	    /// Exactly [`TILE_PIXELS`] straight-alpha pixels, row-major.
131	    52	    pub pixels: Box<[Bgra8]>,
132	    53	}
133	    54	
134	    55	impl TileEdit {
135	    56	    /// A tile edit at `(col, row)` carrying `pixels` (validated on
136	    57	    /// [`apply`](Command::apply), not here).
137	    58	    #[must_use]
138	    59	    pub fn new(col: u32, row: u32, pixels: impl Into<Box<[Bgra8]>>) -> Self {
139	    60	        Self {
140	    61	            col,
141	    62	            row,
142	    63	            pixels: pixels.into(),
143	    64	        }
144	    65	    }
145	    66	}
146	    67	
147	    68	/// A layer property and its value — the payload of [`Command::SetLayerProperty`]
148	    69	/// and, holding the *previous* value, the [`Memento`] that undoes it.
149	    70	#[derive(Debug, Clone, PartialEq, Eq)]
150	    71	pub enum LayerProperty {
151	    72	    /// Layer opacity, `0..=255`.
152	    73	    Opacity(u8),
153	    74	    /// Whether the layer is visible.
154	    75	    Visible(bool),
155	    76	    /// The blend mode.
156	    77	    Blend(BlendMode),
157	    78	    /// The display name.
158	    79	    Name(String),
159	    80	    /// The background flag.
160	    81	    IsBackground(bool),
161	    82	}
162	    83	
163	    84	/// One undoable edit.
164	    85	///
165	    86	/// See the [module docs](self) for the scope each variant captures. Every
166	    87	/// variant is consumed by [`Command::apply`]; the payloads it owns move into the
167	    88	/// document or its memento.
168	    89	#[derive(Debug)]
169	    90	#[non_exhaustive]
170	    91	pub enum Command {
171	    92	    /// Overwrite one or more whole tiles of the layer at `index`.
172	    93	    EditLayerTiles {
173	    94	        /// The target layer (0 = bottom).
174	    95	        index: usize,
175	    96	        /// The tiles to overwrite.
176	    97	        edits: Vec<TileEdit>,
177	    98	    },
178	    99	    /// Add a fresh fully transparent, canvas-sized layer on top.
179	   100	    AddTransparentLayer {
180	   101	        /// The new layer's name.
181	   102	        name: String,
182	   103	    },
183	   104	    /// Insert an already-built (canvas-sized) layer at `index`.
184	   105	    InsertLayer {
185	   106	        /// Where to insert (clamped to the top of the stack).
186	   107	        index: usize,
187	   108	        /// The layer to insert; its handles move into the document.
188	   109	        layer: Layer,
189	   110	    },
190	   111	    /// Remove the layer at `index` (kept whole for undo).
191	   112	    RemoveLayer {
192	   113	        /// The layer to remove.
193	   114	        index: usize,
194	   115	    },
195	   116	    /// Move the layer at `from` to `to`.
196	   117	    MoveLayer {
197	   118	        /// Source index.
198	   119	        from: usize,
199	   120	        /// Destination index.
200	   121	        to: usize,
201	   122	    },
202	   123	    /// Duplicate the layer at `index` (the copy lands directly above it).
203	   124	    DuplicateLayer {
204	   125	        /// The layer to duplicate.
205	   126	        index: usize,
206	   127	    },
207	   128	    /// Set a scalar property of the layer at `index`.
208	   129	    SetLayerProperty {
209	   130	        /// The target layer.
210	   131	        index: usize,
211	   132	        /// The property and its new value.
212	   133	        property: LayerProperty,
213	   134	    },
214	   135	    /// Replace the whole document with `document` (the coarse fallback).
215	   136	    ///
216	   137	    /// `document` must have been built against the **same** [`TileStore`] the
217	   138	    /// history owns; its handles move into the live document and the outgoing
218	   139	    /// document moves into the memento.
219	   140	    ReplaceDocument {
220	   141	        /// The replacement document.
221	   142	        document: Document,
222	   143	    },
223	   144	}
224	   145	
225	   146	impl Command {
226	   147	    /// Applies this command to `doc`, returning the [`Memento`] that inverts it.
227	   148	    ///
228	   149	    /// The command is consumed. A bitmap edit is fully validated (cell bounds and
229	   150	    /// pixel counts) before any tile is written, so a rejected edit leaves `doc`
230	   151	    /// untouched.
231	   152	    ///
232	   153	    /// # Errors
233	   154	    /// [`HistoryError::LayerIndex`] / [`HistoryError::TileCell`] for an
234	   155	    /// out-of-range target, [`HistoryError::TileEditSize`] for a wrong-length
235	   156	    /// tile payload, or [`HistoryError::Core`] / [`HistoryError::Tile`] on a
236	   157	    /// tile-store fault.
237	   158	    pub(crate) fn apply(
238	   159	        self,
239	   160	        doc: &mut Document,
240	   161	        store: &TileStore,
241	   162	    ) -> Result<Memento, HistoryError> {
242	   163	        match self {
243	   164	            Command::EditLayerTiles { index, edits } => {
244	   165	                validate_edits(doc, index, &edits)?;
245	   166	                // Snapshot the affected layer *before* mutating: every tile is
246	   167	                // shared (zero pixel copies). The subsequent in-place writes then
247	   168	                // fork only the tiles they touch — O(changed tiles) copies.
248	   169	                let before = layer_ref(doc, index)?.snapshot(store)?;
249	   170	                if let Err(err) = write_tile_edits(doc, store, index, &edits) {
250	   171	                    // A store fault mid-batch (e.g. a page-in failure on a spilled
251	   172	                    // tile after earlier cells committed) would otherwise leave the
252	   173	                    // layer half-edited with the pre-edit snapshot released — an
253	   174	                    // unrecoverable state, since no memento is pushed on the Err
254	   175	                    // path. Instead, roll the batch back atomically: restore the
255	   176	                    // pre-edit snapshot as the live layer and release the discarded
256	   177	                    // half-edited one. `before` shares the original (un-forked)
257	   178	                    // tiles, so this reproduces the pre-edit state exactly.
258	   179	                    if let Some(slot) = doc.layers_mut().get_mut(index) {
259	   180	                        let half_edited = std::mem::replace(slot, before);
260	   181	                        half_edited.release(store);
261	   182	                    } else {
262	   183	                        // `index` was validated above, so this is unreachable; guard
263	   184	                        // against a leak rather than panic if it ever changes.
264	   185	                        before.release(store);
265	   186	                    }
266	   187	                    return Err(err);
267	   188	                }
268	   189	                Ok(Memento::ReplaceLayer {
269	   190	                    index,
270	   191	                    layer: before,
271	   192	                })
272	   193	            }
273	   194	            Command::AddTransparentLayer { name } => {
274	   195	                let index = doc.add_layer(name, store);
275	   196	                Ok(Memento::RemoveLayer { index })
276	   197	            }
277	   198	            Command::InsertLayer { index, layer } => {
278	   199	                let landed = doc.insert_layer(index, layer);
279	   200	                Ok(Memento::RemoveLayer { index: landed })
280	   201	            }
281	   202	            Command::RemoveLayer { index } => {
282	   203	                let removed = doc.remove_layer(index)?;
283	   204	                Ok(Memento::ReinsertLayer {
284	   205	                    index,
285	   206	                    layer: removed,
286	   207	                })
287	   208	            }
288	   209	            Command::MoveLayer { from, to } => {
289	   210	                doc.move_layer(from, to)?;
290	   211	                // The inverse of move(from -> to) is move(to -> from).
291	   212	                Ok(Memento::MoveLayer { from: to, to: from })
292	   213	            }
293	   214	            Command::DuplicateLayer { index } => {
294	   215	                let new_index = doc.duplicate_layer(index, store)?;
295	   216	                Ok(Memento::RemoveLayer { index: new_index })
296	   217	            }
297	   218	            Command::SetLayerProperty { index, property } => {
298	   219	                let len = doc.layers().len();
299	   220	                let layer = doc
300	   221	                    .layers_mut()
301	   222	                    .get_mut(index)
302	   223	                    .ok_or(HistoryError::LayerIndex { index, len })?;
303	   224	                let previous = set_property(layer, property);
304	   225	                Ok(Memento::SetLayerProperty {
305	   226	                    index,
306	   227	                    property: previous,
307	   228	                })
308	   229	            }
309	   230	            Command::ReplaceDocument { document } => {
310	   231	                let displaced = std::mem::replace(doc, document);
311	   232	                Ok(Memento::ReplaceDocument { doc: displaced })
312	   233	            }
313	   234	        }
314	   235	    }
315	   236	
316	   237	    /// The layer a coalescing bitmap edit would extend, if this command is one.
317	   238	    pub(crate) fn coalesce_layer(&self) -> Option<usize> {
318	   239	        match self {
319	   240	            Command::EditLayerTiles { index, .. } => Some(*index),
320	   241	            _ => None,
321	   242	        }
322	   243	    }
323	   244	
324	   245	    /// Applies a coalesced bitmap edit *in place*, without producing a new
325	   246	    /// memento: the memento already on top of the undo stack still holds the
326	   247	    /// pre-run state, so a merged stroke undoes to before the whole run.
327	   248	    ///
328	   249	    /// Only ever called for [`Command::EditLayerTiles`] (gated by
329	   250	    /// [`coalesce_layer`](Command::coalesce_layer)).
330	   251	    pub(crate) fn apply_coalesced(
331	   252	        self,
332	   253	        doc: &Document,
333	   254	        store: &TileStore,
334	   255	    ) -> Result<(), HistoryError> {
335	   256	        match self {
336	   257	            Command::EditLayerTiles { index, edits } => {
337	   258	                validate_edits(doc, index, &edits)?;
338	   259	                write_tile_edits(doc, store, index, &edits)
339	   260	            }
340	   261	            _ => unreachable!("apply_coalesced is only reached for EditLayerTiles"),
341	   262	        }
342	   263	    }
343	   264	}
344	   265	
345	   266	/// Sets `property` on `layer`, returning the value it replaced (packaged as the
346	   267	/// inverse [`LayerProperty`]). Shared by [`Command::apply`] and
347	   268	/// [`Memento::undo`](crate::memento::Memento::undo).
348	   269	pub(crate) fn set_property(layer: &mut Layer, property: LayerProperty) -> LayerProperty {
349	   270	    match property {
350	   271	        LayerProperty::Opacity(value) => {
351	   272	            let previous = layer.opacity();
352	   273	            layer.set_opacity(value);
353	   274	            LayerProperty::Opacity(previous)
354	   275	        }
355	   276	        LayerProperty::Visible(value) => {
356	   277	            let previous = layer.visible();
357	   278	            layer.set_visible(value);
358	   279	            LayerProperty::Visible(previous)
359	   280	        }
360	   281	        LayerProperty::Blend(value) => {
361	   282	            let previous = layer.blend();
362	   283	            layer.set_blend(value);
363	   284	            LayerProperty::Blend(previous)
364	   285	        }
365	   286	        LayerProperty::Name(value) => {
366	   287	            let previous = layer.name().to_owned();
367	   288	            layer.set_name(value);
368	   289	            LayerProperty::Name(previous)
369	   290	        }
370	   291	        LayerProperty::IsBackground(value) => {
371	   292	            let previous = layer.is_background();
372	   293	            layer.set_is_background(value);
373	   294	            LayerProperty::IsBackground(previous)
374	   295	        }
375	   296	    }
376	   297	}
377	   298	
378	   299	/// Borrows the layer at `index`, mapping an out-of-range index to a clear error.
379	   300	fn layer_ref(doc: &Document, index: usize) -> Result<&Layer, HistoryError> {
380	   301	    let len = doc.layers().len();
381	   302	    doc.layers()
382	   303	        .get(index)
383	   304	        .ok_or(HistoryError::LayerIndex { index, len })
384	   305	}
385	   306	
386	   307	/// Checks every edit's target cell and pixel count *before* any write, so a
387	   308	/// malformed batch never half-applies.
388	   309	fn validate_edits(doc: &Document, index: usize, edits: &[TileEdit]) -> Result<(), HistoryError> {
389	   310	    let grid = layer_ref(doc, index)?.grid();
390	   311	    let (cols, rows) = (grid.cols(), grid.rows());
391	   312	    for edit in edits {
392	   313	        if edit.col >= cols || edit.row >= rows {
393	   314	            return Err(HistoryError::TileCell {
394	   315	                layer: index,
395	   316	                col: edit.col,
396	   317	                row: edit.row,
397	   318	                cols,
398	   319	                rows,
399	   320	            });
400	   321	        }
401	   322	        if edit.pixels.len() != TILE_PIXELS {
402	   323	            return Err(HistoryError::tile_edit_size(
403	   324	                edit.col,
404	   325	                edit.row,
405	   326	                edit.pixels.len(),
406	   327	            ));
407	   328	        }
408	   329	    }
409	   330	    Ok(())
410	   331	}
411	   332	
412	   333	/// Writes each edit's pixels into the layer's tile through the store.
413	   334	///
414	   335	/// The tile ids are stable — the grid keeps them — so a shared tile forks
415	   336	/// copy-on-write on the write guard and an unshared one is written in place.
416	   337	/// Assumes [`validate_edits`] already passed.
417	   338	pub(crate) fn write_tile_edits(
418	   339	    doc: &Document,
419	   340	    store: &TileStore,
420	   341	    index: usize,
421	   342	    edits: &[TileEdit],
422	   343	) -> Result<(), HistoryError> {
423	   344	    let grid = layer_ref(doc, index)?.grid();
424	   345	    for edit in edits {
425	   346	        let id = grid.tile_id(edit.col, edit.row);
426	   347	        let mut guard = store.write(id)?;
427	   348	        guard.pixels_mut().copy_from_slice(&edit.pixels);
428	   349	    }
429	   350	    Ok(())
430	   351	}
431	########## crates/kube-history/src/memento.rs
432	     1	//! Mementos: the recorded inverse of an applied [`Command`](crate::Command).
433	     2	//!
434	     3	//! A memento owns whatever structural-sharing state undoing its command needs —
435	     4	//! a snapshotted layer, a removed layer kept whole, a whole-document snapshot, or
436	     5	//! just a scalar. [`Memento::undo`] applies that inverse to the live document and
437	     6	//! returns the memento that *re-does* it: undo and redo are the same swap run in
438	     7	//! opposite directions, which is what makes redo byte-exact for free.
439	     8	//!
440	     9	//! # Release discipline (the 1.6 hazard)
441	    10	//!
442	    11	//! A memento holds live tile handles. The engine owns every memento and must
443	    12	//! [`release`](Memento::release) it *exactly* when it leaves the stack — a redo
444	    13	//! entry discarded by a fresh edit, or an undo entry evicted past the depth cap.
445	    14	//! Dropping a handle-bearing memento without releasing it leaks tiles (the store
446	    15	//! can never reclaim them); releasing one whose handles a live document still
447	    16	//! shares is impossible here, because a swap moves ownership rather than
448	    17	//! duplicating it. `undo` never allocates or copies pixels: it swaps handle
449	    18	//! ownership between the live document and the memento.
450	    19	
451	    20	use kube_core::Document;
452	    21	use kube_core::Layer;
453	    22	use kube_tile::TileStore;
454	    23	
455	    24	use crate::command::{LayerProperty, set_property};
456	    25	use crate::error::HistoryError;
457	    26	
458	    27	/// The inverse of one applied command. See the [module docs](self).
459	    28	#[derive(Debug)]
460	    29	pub(crate) enum Memento {
461	    30	    /// Swap the whole layer at `index` back to `layer` (the bitmap-edit inverse).
462	    31	    ///
463	    32	    /// Undo replaces the live layer with the snapshot, handing the displaced
464	    33	    /// (post-edit) layer to the redo memento — a pure ownership swap.
465	    34	    ReplaceLayer {
466	    35	        /// The layer's stack position.
467	    36	        index: usize,
468	    37	        /// The layer state to restore; owns shared tile handles.
469	    38	        layer: Layer,
470	    39	    },
471	    40	    /// Undo by removing the layer at `index` (inverts add / insert / duplicate).
472	    41	    RemoveLayer {
473	    42	        /// The layer to remove; it becomes a [`Memento::ReinsertLayer`].
474	    43	        index: usize,
475	    44	    },
476	    45	    /// Undo by re-inserting `layer` at `index` (inverts a remove).
477	    46	    ReinsertLayer {
478	    47	        /// Where to re-insert.
479	    48	        index: usize,
480	    49	        /// The removed layer, kept whole; owns its tile handles.
481	    50	        layer: Layer,
482	    51	    },
483	    52	    /// Undo by performing move(`from` -> `to`) (inverts a move).
484	    53	    MoveLayer {
485	    54	        /// Source index of the inverse move.
486	    55	        from: usize,
487	    56	        /// Destination index of the inverse move.
488	    57	        to: usize,
489	    58	    },
490	    59	    /// Undo by restoring a scalar layer property.
491	    60	    SetLayerProperty {
492	    61	        /// The target layer.
493	    62	        index: usize,
494	    63	        /// The value to restore.
495	    64	        property: LayerProperty,
496	    65	    },
497	    66	    /// Swap the whole document back (the coarse-fallback inverse); owns a
498	    67	    /// whole-document snapshot's handles.
499	    68	    ReplaceDocument {
500	    69	        /// The document state to restore.
501	    70	        doc: Document,
502	    71	    },
503	    72	}
504	    73	
505	    74	impl Memento {
506	    75	    /// Applies this inverse to `doc`, returning the memento that re-does it.
507	    76	    ///
508	    77	    /// A pure swap: no pixels are copied and no handles are allocated or freed —
509	    78	    /// ownership of the affected scope moves between `doc` and the returned
510	    79	    /// memento.
511	    80	    ///
512	    81	    /// # Errors
513	    82	    /// [`HistoryError::LayerIndex`] / [`HistoryError::Core`] if the recorded
514	    83	    /// index no longer addresses the stack (a well-formed history never hits
515	    84	    /// this).
516	    85	    pub(crate) fn undo(
517	    86	        self,
518	    87	        doc: &mut Document,
519	    88	        store: &TileStore,
520	    89	    ) -> Result<Memento, HistoryError> {
521	    90	        match self {
522	    91	            Memento::ReplaceLayer { index, layer } => {
523	    92	                let len = doc.layers().len();
524	    93	                let Some(slot) = doc.layers_mut().get_mut(index) else {
525	    94	                    // Documented-unreachable for a well-formed history, but release
526	    95	                    // the captured layer rather than leak its handles on the way
527	    96	                    // out (this arm is the only inverse holding handles that could
528	    97	                    // fail before consuming them).
529	    98	                    layer.release(store);
530	    99	                    return Err(HistoryError::LayerIndex { index, len });
531	   100	                };
532	   101	                let displaced = std::mem::replace(slot, layer);
533	   102	                Ok(Memento::ReplaceLayer {
534	   103	                    index,
535	   104	                    layer: displaced,
536	   105	                })
537	   106	            }
538	   107	            Memento::RemoveLayer { index } => {
539	   108	                let removed = doc.remove_layer(index)?;
540	   109	                Ok(Memento::ReinsertLayer {
541	   110	                    index,
542	   111	                    layer: removed,
543	   112	                })
544	   113	            }
545	   114	            Memento::ReinsertLayer { index, layer } => {
546	   115	                let landed = doc.insert_layer(index, layer);
547	   116	                Ok(Memento::RemoveLayer { index: landed })
548	   117	            }
549	   118	            Memento::MoveLayer { from, to } => {
550	   119	                doc.move_layer(from, to)?;
551	   120	                Ok(Memento::MoveLayer { from: to, to: from })
552	   121	            }
553	   122	            Memento::SetLayerProperty { index, property } => {
554	   123	                let len = doc.layers().len();
555	   124	                let layer = doc
556	   125	                    .layers_mut()
557	   126	                    .get_mut(index)
558	   127	                    .ok_or(HistoryError::LayerIndex { index, len })?;
559	   128	                let previous = set_property(layer, property);
560	   129	                Ok(Memento::SetLayerProperty {
561	   130	                    index,
562	   131	                    property: previous,
563	   132	                })
564	   133	            }
565	   134	            Memento::ReplaceDocument { doc: restore } => {
566	   135	                let displaced = std::mem::replace(doc, restore);
567	   136	                Ok(Memento::ReplaceDocument { doc: displaced })
568	   137	            }
569	   138	        }
570	   139	    }
571	   140	
572	   141	    /// Releases every tile handle this memento owns back to `store`.
573	   142	    ///
574	   143	    /// Call this — and only this — when the memento leaves the stack for good.
575	   144	    /// The index-only and scalar variants own no handles and are free to drop.
576	   145	    pub(crate) fn release(self, store: &TileStore) {
577	   146	        match self {
578	   147	            Memento::ReplaceLayer { layer, .. } | Memento::ReinsertLayer { layer, .. } => {
579	   148	                layer.release(store);
580	   149	            }
581	   150	            Memento::ReplaceDocument { mut doc } => doc.release(store),
582	   151	            Memento::RemoveLayer { .. }
583	   152	            | Memento::MoveLayer { .. }
584	   153	            | Memento::SetLayerProperty { .. } => {}
585	   154	        }
586	   155	    }
587	   156	}
588	########## crates/kube-history/src/history.rs
589	     1	//! The session engine: the live document, the undo/redo stacks, and the depth
590	     2	//! cap.
591	     3	
592	     4	use std::collections::VecDeque;
593	     5	use std::sync::Arc;
594	     6	
595	     7	use kube_core::Document;
596	     8	use kube_tile::TileStore;
597	     9	
598	    10	use crate::command::Command;
599	    11	use crate::error::HistoryError;
600	    12	use crate::memento::Memento;
601	    13	
602	    14	/// The `expect` message for the live-document handle. The document is `Some` for
603	    15	/// the whole life of a `History`; only [`History::into_document`] takes it, and
604	    16	/// that consumes `self`, so no method can observe `None`.
605	    17	const DOC_LIVE: &str = "the history document is live until into_document consumes it";
606	    18	
607	    19	/// A caller-chosen token that merges consecutive edits into one undo step.
608	    20	///
609	    21	/// Two [`push_coalesced`](History::push_coalesced) calls with the *same* key,
610	    22	/// back to back and on the same layer, collapse into a single memento (a brush
611	    23	/// stroke, a slider drag). A different key, any non-coalesced
612	    24	/// [`push`](History::push), or an [`undo`](History::undo)/[`redo`](History::redo)
613	    25	/// closes the run.
614	    26	#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
615	    27	pub struct CoalesceKey(pub u64);
616	    28	
617	    29	/// One entry on the undo stack: the inverse memento plus the coalescing token
618	    30	/// (if any) that opened its run.
619	    31	#[derive(Debug)]
620	    32	struct Entry {
621	    33	    memento: Memento,
622	    34	    coalesce: Option<CoalesceKey>,
623	    35	}
624	    36	
625	    37	/// The undo/redo engine for one editing session.
626	    38	///
627	    39	/// # Ownership (documented, per the unit brief)
628	    40	///
629	    41	/// The history is **session-owned** and owns both the shared
630	    42	/// [`Arc<TileStore>`](TileStore) and the live [`Document`]. Every edit flows
631	    43	/// through [`push`](History::push), so the engine is the single place tile
632	    44	/// lifetime is managed: it snapshots pre-state into mementos, and releases those
633	    45	/// handles the instant a memento leaves a stack (a redo entry cleared by a new
634	    46	/// edit, or an undo entry evicted past the [`depth`](History::depth) cap). The
635	    47	/// store is an `Arc` so the same store backs the compositor and any other session
636	    48	/// consumers; nothing else may mutate the document behind the engine's back.
637	    49	///
638	    50	/// # Teardown
639	    51	///
640	    52	/// Dropping a `History` **releases everything** it owns — the live document and
641	    53	/// every memento's handles — back to the store (it holds the `Arc<TileStore>`,
642	    54	/// so it can). [`into_document`](History::into_document) opts *out* of that for
643	    55	/// the document: it hands the live document to the caller (still owning its
644	    56	/// handles) and releases only the mementos. [`clear`](History::clear) drops just
645	    57	/// the stacks. So there is no leak-on-drop footgun: an early return or a panic in
646	    58	/// the session unwinds through `Drop` and reclaims every tile.
647	    59	#[derive(Debug)]
648	    60	pub struct History {
649	    61	    store: Arc<TileStore>,
650	    62	    /// The live document. `Some` for the whole life of the `History`; taken by
651	    63	    /// [`into_document`](History::into_document) (which consumes `self`) so the
652	    64	    /// releasing [`Drop`] does not then free handles the caller now owns.
653	    65	    document: Option<Document>,
654	    66	    undo: VecDeque<Entry>,
655	    67	    redo: Vec<Memento>,
656	    68	    depth: usize,
657	    69	}
658	    70	
659	    71	impl History {
660	    72	    /// A new session over `document`, backed by `store`, keeping at most `depth`
661	    73	    /// undo steps.
662	    74	    ///
663	    75	    /// `document` must have been built against `store`. `depth` is clamped to at
664	    76	    /// least 1 (a zero-length history would discard every edit's undo state as
665	    77	    /// soon as it was recorded).
666	    78	    #[must_use]
667	    79	    pub fn new(store: Arc<TileStore>, document: Document, depth: usize) -> Self {
668	    80	        Self {
669	    81	            store,
670	    82	            document: Some(document),
671	    83	            undo: VecDeque::new(),
672	    84	            redo: Vec::new(),
673	    85	            depth: depth.max(1),
674	    86	        }
675	    87	    }
676	    88	
677	    89	    /// The live document.
678	    90	    #[must_use]
679	    91	    pub fn document(&self) -> &Document {
680	    92	        self.document.as_ref().expect(DOC_LIVE)
681	    93	    }
682	    94	
683	    95	    /// The shared tile store this session owns.
684	    96	    #[must_use]
685	    97	    pub fn store(&self) -> &Arc<TileStore> {
686	    98	        &self.store
687	    99	    }
688	   100	
689	   101	    /// The undo-depth cap.
690	   102	    #[must_use]
691	   103	    pub fn depth(&self) -> usize {
692	   104	        self.depth
693	   105	    }
694	   106	
695	   107	    /// Whether there is at least one edit to undo.
696	   108	    #[must_use]
697	   109	    pub fn can_undo(&self) -> bool {
698	   110	        !self.undo.is_empty()
699	   111	    }
700	   112	
701	   113	    /// Whether there is at least one undone edit to redo.
702	   114	    #[must_use]
703	   115	    pub fn can_redo(&self) -> bool {
704	   116	        !self.redo.is_empty()
705	   117	    }
706	   118	
707	   119	    /// The number of undo steps currently recorded.
708	   120	    #[must_use]
709	   121	    pub fn undo_len(&self) -> usize {
710	   122	        self.undo.len()
711	   123	    }
712	   124	
713	   125	    /// The number of redo steps currently available.
714	   126	    #[must_use]
715	   127	    pub fn redo_len(&self) -> usize {
716	   128	        self.redo.len()
717	   129	    }
718	   130	
719	   131	    /// Applies `command`, records its inverse, and clears the redo stack.
720	   132	    ///
721	   133	    /// # Errors
722	   134	    /// Any [`HistoryError`] the command's [`apply`](Command::apply) raises. On
723	   135	    /// error the redo stack has still been cleared (a rejected edit abandons the
724	   136	    /// redo branch), but no memento is recorded.
725	   137	    pub fn push(&mut self, command: Command) -> Result<(), HistoryError> {
726	   138	        self.push_inner(command, None)
727	   139	    }
728	   140	
729	   141	    /// Like [`push`](History::push), but merges into the previous edit when it
730	   142	    /// shares `key` and targets the same layer (see [`CoalesceKey`]).
731	   143	    ///
732	   144	    /// # Errors
733	   145	    /// As [`push`](History::push).
734	   146	    pub fn push_coalesced(
735	   147	        &mut self,
736	   148	        command: Command,
737	   149	        key: CoalesceKey,
738	   150	    ) -> Result<(), HistoryError> {
739	   151	        self.push_inner(command, Some(key))
740	   152	    }
741	   153	
742	   154	    fn push_inner(
743	   155	        &mut self,
744	   156	        command: Command,
745	   157	        key: Option<CoalesceKey>,
746	   158	    ) -> Result<(), HistoryError> {
747	   159	        if let Some(key) = key
748	   160	            && self.can_coalesce(command.coalesce_layer(), key)
749	   161	        {
750	   162	            // Extend the open run: the memento already on top still holds the
751	   163	            // pre-run state, so we only mutate the live document and keep the
752	   164	            // redo stack cleared.
753	   165	            self.clear_redo();
754	   166	            return command.apply_coalesced(self.document.as_ref().expect(DOC_LIVE), &self.store);
755	   167	        }
756	   168	
757	   169	        self.clear_redo();
758	   170	        let memento = command.apply(self.document.as_mut().expect(DOC_LIVE), &self.store)?;
759	   171	        self.undo.push_back(Entry {
760	   172	            memento,
761	   173	            coalesce: key,
762	   174	        });
763	   175	        self.enforce_depth();
764	   176	        Ok(())
765	   177	    }
766	   178	
767	   179	    /// Whether a new edit on `layer` with `key` can merge into the top entry.
768	   180	    fn can_coalesce(&self, layer: Option<usize>, key: CoalesceKey) -> bool {
769	   181	        let Some(layer) = layer else { return false };
770	   182	        match self.undo.back() {
771	   183	            Some(entry) => {
772	   184	                entry.coalesce == Some(key)
773	   185	                    && matches!(entry.memento, Memento::ReplaceLayer { index, .. } if index == layer)
774	   186	            }
775	   187	            None => false,
776	   188	        }
777	   189	    }
778	   190	
779	   191	    /// Undoes the most recent edit, moving its inverse onto the redo stack.
780	   192	    ///
781	   193	    /// Returns `Ok(false)` if there was nothing to undo.
782	   194	    ///
783	   195	    /// # Errors
784	   196	    /// [`HistoryError`] only if the recorded inverse cannot apply (a well-formed
785	   197	    /// history never hits this).
786	   198	    pub fn undo(&mut self) -> Result<bool, HistoryError> {
787	   199	        let Some(entry) = self.undo.pop_back() else {
788	   200	            return Ok(false);
789	   201	        };
790	   202	        let redo = entry
791	   203	            .memento
792	   204	            .undo(self.document.as_mut().expect(DOC_LIVE), &self.store)?;
793	   205	        self.redo.push(redo);
794	   206	        // An undo closes any coalescing run: the entry now exposed on top must
795	   207	        // not merge a later same-key edit across this boundary.
796	   208	        self.close_coalescing_run();
797	   209	        Ok(true)
798	   210	    }
799	   211	
800	   212	    /// Redoes the most recently undone edit, moving its inverse back onto the
801	   213	    /// undo stack.
802	   214	    ///
803	   215	    /// Returns `Ok(false)` if there was nothing to redo.
804	   216	    ///
805	   217	    /// # Errors
806	   218	    /// As [`undo`](History::undo).
807	   219	    pub fn redo(&mut self) -> Result<bool, HistoryError> {
808	   220	        let Some(memento) = self.redo.pop() else {
809	   221	            return Ok(false);
810	   222	        };
811	   223	        let undo = memento.undo(self.document.as_mut().expect(DOC_LIVE), &self.store)?;
812	   224	        self.undo.push_back(Entry {
813	   225	            memento: undo,
814	   226	            coalesce: None,
815	   227	        });
816	   228	        // Symmetric with undo(): a redo also closes any coalescing run.
817	   229	        self.close_coalescing_run();
818	   230	        Ok(true)
819	   231	    }
820	   232	
821	   233	    /// Clears the coalescing marker on the current top undo entry, so a run
822	   234	    /// interrupted by an undo/redo can never be re-opened by a later same-key
823	   235	    /// [`push_coalesced`](History::push_coalesced).
824	   236	    fn close_coalescing_run(&mut self) {
825	   237	        if let Some(top) = self.undo.back_mut() {
826	   238	            top.coalesce = None;
827	   239	        }
828	   240	    }
829	   241	
830	   242	    /// Drops the whole redo branch, releasing its mementos' handles.
831	   243	    fn clear_redo(&mut self) {
832	   244	        for memento in self.redo.drain(..) {
833	   245	            memento.release(&self.store);
834	   246	        }
835	   247	    }
836	   248	
837	   249	    /// Evicts undo entries past the depth cap from the *oldest* end, releasing
838	   250	    /// each evicted memento's handles.
839	   251	    fn enforce_depth(&mut self) {
840	   252	        while self.undo.len() > self.depth {
841	   253	            if let Some(entry) = self.undo.pop_front() {
842	   254	                entry.memento.release(&self.store);
843	   255	            } else {
844	   256	                break;
845	   257	            }
846	   258	        }
847	   259	    }
848	   260	
849	   261	    /// Clears both stacks, releasing every memento's handles. The live document
850	   262	    /// is untouched.
851	   263	    pub fn clear(&mut self) {
852	   264	        for entry in self.undo.drain(..) {
853	   265	            entry.memento.release(&self.store);
854	   266	        }
855	   267	        self.clear_redo();
856	   268	    }
857	   269	
858	   270	    /// Tears the session down: releases every memento's handles and returns the
859	   271	    /// live document (still owning its handles) and the store.
860	   272	    ///
861	   273	    /// This opts *out* of the releasing [`Drop`] for the document — the caller
862	   274	    /// then owns it and must eventually [`release`](Document::release) it against
863	   275	    /// the returned store.
864	   276	    #[must_use]
865	   277	    pub fn into_document(mut self) -> (Document, Arc<TileStore>) {
866	   278	        let document = self.document.take().expect(DOC_LIVE);
867	   279	        for entry in self.undo.drain(..) {
868	   280	            entry.memento.release(&self.store);
869	   281	        }
870	   282	        for memento in self.redo.drain(..) {
871	   283	            memento.release(&self.store);
872	   284	        }
873	   285	        // `self` drops here with `document == None` and both stacks drained, so
874	   286	        // `Drop` releases nothing the caller now owns.
875	   287	        let store = Arc::clone(&self.store);
876	   288	        (document, store)
877	   289	    }
878	   290	}
879	   291	
880	   292	impl Drop for History {
881	   293	    fn drop(&mut self) {
882	   294	        for entry in self.undo.drain(..) {
883	   295	            entry.memento.release(&self.store);
884	   296	        }
885	   297	        for memento in self.redo.drain(..) {
886	   298	            memento.release(&self.store);
887	   299	        }
888	   300	        if let Some(mut document) = self.document.take() {
889	   301	            document.release(&self.store);
890	   302	        }
891	   303	    }
892	   304	}
893	########## crates/kube-history/src/error.rs
894	     1	//! Failure modes of the undo/redo engine.
895	     2	
896	     3	use kube_core::CoreError;
897	     4	use kube_tile::{TILE_PIXELS, TileError};
898	     5	
899	     6	/// Everything that can go wrong applying, undoing or redoing a
900	     7	/// [`Command`](crate::Command).
901	     8	///
902	     9	/// Document-model faults (a bad layer index, a tile-store page-in) surface as
903	    10	/// [`HistoryError::Core`]; a raw tile-store fault taken through the store
904	    11	/// directly (sharing a snapshot handle, forking a tile on write) surfaces as
905	    12	/// [`HistoryError::Tile`]. A malformed bitmap edit is caught before any pixel is
906	    13	/// written, so a rejected [`Command`](crate::Command) never leaves the document
907	    14	/// half-edited.
908	    15	#[derive(Debug, thiserror::Error)]
909	    16	#[non_exhaustive]
910	    17	pub enum HistoryError {
911	    18	    /// A document-model operation failed (layer indexing, snapshot page-in).
912	    19	    #[error("core error: {0}")]
913	    20	    Core(#[from] CoreError),
914	    21	
915	    22	    /// A tile-store operation failed (share a snapshot handle, fork on write).
916	    23	    #[error("tile store error: {0}")]
917	    24	    Tile(#[from] TileError),
918	    25	
919	    26	    /// A layer index addressed a slot outside the current stack.
920	    27	    #[error("layer index {index} is out of bounds (the stack holds {len} layers)")]
921	    28	    LayerIndex {
922	    29	        /// The offending index.
923	    30	        index: usize,
924	    31	        /// The number of layers in the stack.
925	    32	        len: usize,
926	    33	    },
927	    34	
928	    35	    /// A bitmap edit named a grid cell outside the target layer.
929	    36	    #[error("tile cell ({col}, {row}) is outside the {cols}x{rows} grid of layer {layer}")]
930	    37	    TileCell {
931	    38	        /// The target layer index.
932	    39	        layer: usize,
933	    40	        /// The offending column.
934	    41	        col: u32,
935	    42	        /// The offending row.
936	    43	        row: u32,
937	    44	        /// The layer's grid width in tiles.
938	    45	        cols: u32,
939	    46	        /// The layer's grid height in tiles.
940	    47	        rows: u32,
941	    48	    },
942	    49	
943	    50	    /// A bitmap edit supplied the wrong number of pixels for a full tile.
944	    51	    #[error(
945	    52	        "tile edit for cell ({col}, {row}) supplied {got} pixels, expected {expected} (one full tile)"
946	    53	    )]
947	    54	    TileEditSize {
948	    55	        /// The offending column.
949	    56	        col: u32,
950	    57	        /// The offending row.
951	    58	        row: u32,
952	    59	        /// The pixel count the caller passed.
953	    60	        got: usize,
954	    61	        /// The pixel count one full tile needs ([`TILE_PIXELS`]).
955	    62	        expected: usize,
956	    63	    },
957	    64	}
958	    65	
959	    66	impl HistoryError {
960	    67	    /// A [`HistoryError::TileEditSize`] for a wrong-length tile payload.
961	    68	    pub(crate) fn tile_edit_size(col: u32, row: u32, got: usize) -> Self {
962	    69	        Self::TileEditSize {
963	    70	            col,
964	    71	            row,
965	    72	            got,
966	    73	            expected: TILE_PIXELS,
967	    74	        }
968	    75	    }
969	    76	}
970	

########## crates/kube-history/src/lib.rs
     1	//! Structural-sharing undo/redo engine for the Kube image editor.
     2	//!
     3	//! `kube-history` is the **session-owned** command layer over `kube-core`'s
     4	//! document model (`docs/ARCHITECTURE.md` — "kube-history is separate ... owned
     5	//! by an app-level session, not by `Document`"). It owns the shared
     6	//! [`Arc<TileStore>`](kube_tile::TileStore) and the live [`Document`], turns
     7	//! every edit into a [`Command`], and records the inverse as a memento built by
     8	//! **structural sharing** — not by cloning.
     9	//!
    10	//! # The idea
    11	//!
    12	//! `kube-core::Document` is deliberately not `Clone`; its layers own tile
    13	//! *handles* into a shared store. A memento captures pre-edit state with
    14	//! [`Document::snapshot`](kube_core::Document::snapshot) /
    15	//! [`Layer::snapshot`](kube_core::Layer::snapshot), which
    16	//! [`share`](kube_tile::TileStore::share) every tile (one refcount bump each,
    17	//! **zero pixel copies**). A later write forks — copy-on-write — only the tiles
    18	//! it touches, so a localized edit's memento costs *O(changed tiles)* pixels
    19	//! however large the canvas is. Undo and redo are then a pure ownership *swap*
    20	//! between the live document and the memento: no pixels move.
    21	//!
    22	//! Because mementos hold plain [`TileId`](kube_tile::TileId) handles (not `Arc`s
    23	//! pinning buffers), the store's LRU spill applies uniformly to live *and*
    24	//! history tiles — a deep whole-canvas undo history spills to disk and pages
    25	//! back transparently (the review-C1 property), which the `spill` test suite
    26	//! pins down.
    27	//!
    28	//! # Ownership and release discipline
    29	//!
    30	//! The [`History`] engine owns every memento and is the sole manager of tile
    31	//! lifetime. It releases a memento's handles *exactly* when the memento leaves a
    32	//! stack (a redo entry cleared by a fresh edit; an undo entry evicted past the
    33	//! depth cap; teardown via [`History::clear`] / [`History::into_document`]). A
    34	//! swap moves handle ownership rather than duplicating it, so a tile is never
    35	//! released while a live document or another memento still references it, and
    36	//! never orphaned. See the [`memento`] module for the mechanism.
    37	//!
    38	//! # Example
    39	//!
    40	//! ```
    41	//! use std::sync::Arc;
    42	//! use kube_core::Document;
    43	//! use kube_history::{Command, History, LayerProperty};
    44	//! use kube_pixel::BlendMode;
    45	//! use kube_tile::{SpillConfig, TileStore};
    46	//!
    47	//! let store = Arc::new(TileStore::new(SpillConfig::ephemeral()));
    48	//! let doc = Document::new(256, 256, &store); // opaque-white background
    49	//! let mut history = History::new(Arc::clone(&store), doc, 64);
    50	//!
    51	//! history.push(Command::AddTransparentLayer { name: "tint".into() })?;
    52	//! history.push(Command::SetLayerProperty {
    53	//!     index: 1,
    54	//!     property: LayerProperty::Blend(BlendMode::Multiply),
    55	//! })?;
    56	//! assert_eq!(history.document().layers().len(), 2);
    57	//!
    58	//! history.undo()?;                 // drop the blend change
    59	//! history.undo()?;                 // drop the added layer
    60	//! assert_eq!(history.document().layers().len(), 1);
    61	//! history.redo()?;                 // re-add the layer
    62	//! assert_eq!(history.document().layers().len(), 2);
    63	//!
    64	//! let (mut doc, store) = history.into_document();
    65	//! doc.release(&store);
    66	//! # Ok::<(), kube_history::HistoryError>(())
    67	//! ```
    68	#![forbid(unsafe_code)]
    69	
    70	mod command;
    71	mod error;
    72	mod history;
    73	mod memento;
    74	
    75	pub use command::{Command, LayerProperty, TileEdit};
    76	pub use error::HistoryError;
    77	pub use history::{CoalesceKey, History};
########## crates/kube-history/src/command.rs
     1	//! The edit vocabulary: [`Command`]s a session pushes onto the [`History`], plus
     2	//! the primitives that build each command's inverse [`Memento`].
     3	//!
     4	//! A command is the *intent* plus its payload (new pixels, a layer to insert, a
     5	//! property value). Applying one mutates the live [`Document`] through the
     6	//! `kube-core` mutators and hands back a [`Memento`] — the recorded inverse — for
     7	//! the engine to stack. The command is consumed by [`Command::apply`], so a
     8	//! payload it owns (a built [`Layer`], a whole replacement [`Document`], a tile's
     9	//! pixels) moves straight into the document or the memento with no copy.
    10	//!
    11	//! # Granularity (documented, per the unit brief)
    12	//!
    13	//! Each command captures the *smallest scope that changed*, so a memento shares
    14	//! only what it must:
    15	//!
    16	//! - **Bitmap edits** ([`Command::EditLayerTiles`]) snapshot the affected
    17	//!   **layer** (one [`share`](kube_tile::TileStore::share) per tile in that
    18	//!   layer, zero pixel copies) and then write the changed tiles in place. Only
    19	//!   the tiles actually written fork (copy-on-write), so the memento costs
    20	//!   *O(changed tiles)* pixel copies — the untouched tiles ride along as shared
    21	//!   handles. This is the property the localized-edit bench and the
    22	//!   `pixel_copies` test pin down.
    23	//! - **Structural layer ops** (add / insert / remove / move / duplicate) build a
    24	//!   *precise* inverse — a removed layer is kept whole for re-insertion, a move
    25	//!   is inverted by the reverse move — so they never snapshot the wider document.
    26	//! - **Property edits** ([`Command::SetLayerProperty`]) record only the scalar
    27	//!   they overwrite: no tile handles at all.
    28	//! - **Whole-document replacement** ([`Command::ReplaceDocument`]) is the coarse
    29	//!   fallback for edits that do not fit the above; its memento snapshots the
    30	//!   whole document (still zero pixel copies — every tile is shared).
    31	
    32	use kube_core::{Document, Layer};
    33	use kube_pixel::{Bgra8, BlendMode};
    34	use kube_tile::{TILE_PIXELS, TileStore};
    35	
    36	use crate::error::HistoryError;
    37	use crate::memento::Memento;
    38	
    39	/// A full-tile pixel replacement at grid cell `(col, row)` of a layer.
    40	///
    41	/// `pixels` must be exactly [`TILE_PIXELS`] straight-alpha [`Bgra8`] values,
    42	/// row-major — one whole tile. Edge tiles carry their out-of-bounds pixels too
    43	/// (they are simply never composited), so a caller reconstructs the full tile
    44	/// (usually by reading the current tile and overwriting the sub-rect it touched).
    45	#[derive(Debug, Clone)]
    46	pub struct TileEdit {
    47	    /// Grid column (`x / 256`).
    48	    pub col: u32,
    49	    /// Grid row (`y / 256`).
    50	    pub row: u32,
    51	    /// Exactly [`TILE_PIXELS`] straight-alpha pixels, row-major.
    52	    pub pixels: Box<[Bgra8]>,
    53	}
    54	
    55	impl TileEdit {
    56	    /// A tile edit at `(col, row)` carrying `pixels` (validated on
    57	    /// [`apply`](Command::apply), not here).
    58	    #[must_use]
    59	    pub fn new(col: u32, row: u32, pixels: impl Into<Box<[Bgra8]>>) -> Self {
    60	        Self {
    61	            col,
    62	            row,
    63	            pixels: pixels.into(),
    64	        }
    65	    }
    66	}
    67	
    68	/// A layer property and its value — the payload of [`Command::SetLayerProperty`]
    69	/// and, holding the *previous* value, the [`Memento`] that undoes it.
    70	#[derive(Debug, Clone, PartialEq, Eq)]
    71	pub enum LayerProperty {
    72	    /// Layer opacity, `0..=255`.
    73	    Opacity(u8),
    74	    /// Whether the layer is visible.
    75	    Visible(bool),
    76	    /// The blend mode.
    77	    Blend(BlendMode),
    78	    /// The display name.
    79	    Name(String),
    80	    /// The background flag.
    81	    IsBackground(bool),
    82	}
    83	
    84	/// One undoable edit.
    85	///
    86	/// See the [module docs](self) for the scope each variant captures. Every
    87	/// variant is consumed by [`Command::apply`]; the payloads it owns move into the
    88	/// document or its memento.
    89	#[derive(Debug)]
    90	#[non_exhaustive]
    91	pub enum Command {
    92	    /// Overwrite one or more whole tiles of the layer at `index`.
    93	    EditLayerTiles {
    94	        /// The target layer (0 = bottom).
    95	        index: usize,
    96	        /// The tiles to overwrite.
    97	        edits: Vec<TileEdit>,
    98	    },
    99	    /// Add a fresh fully transparent, canvas-sized layer on top.
   100	    AddTransparentLayer {
   101	        /// The new layer's name.
   102	        name: String,
   103	    },
   104	    /// Insert an already-built (canvas-sized) layer at `index`.
   105	    InsertLayer {
   106	        /// Where to insert (clamped to the top of the stack).
   107	        index: usize,
   108	        /// The layer to insert; its handles move into the document.
   109	        layer: Layer,
   110	    },
   111	    /// Remove the layer at `index` (kept whole for undo).
   112	    RemoveLayer {
   113	        /// The layer to remove.
   114	        index: usize,
   115	    },
   116	    /// Move the layer at `from` to `to`.
   117	    MoveLayer {
   118	        /// Source index.
   119	        from: usize,
   120	        /// Destination index.
   121	        to: usize,
   122	    },
   123	    /// Duplicate the layer at `index` (the copy lands directly above it).
   124	    DuplicateLayer {
   125	        /// The layer to duplicate.
   126	        index: usize,
   127	    },
   128	    /// Set a scalar property of the layer at `index`.
   129	    SetLayerProperty {
   130	        /// The target layer.
   131	        index: usize,
   132	        /// The property and its new value.
   133	        property: LayerProperty,
   134	    },
   135	    /// Replace the whole document with `document` (the coarse fallback).
   136	    ///
   137	    /// `document` must have been built against the **same** [`TileStore`] the
   138	    /// history owns; its handles move into the live document and the outgoing
   139	    /// document moves into the memento.
   140	    ReplaceDocument {
   141	        /// The replacement document.
   142	        document: Document,
   143	    },
   144	}
   145	
   146	impl Command {
   147	    /// Applies this command to `doc`, returning the [`Memento`] that inverts it.
   148	    ///
   149	    /// The command is consumed. A bitmap edit is fully validated (cell bounds and
   150	    /// pixel counts) before any tile is written, so a rejected edit leaves `doc`
   151	    /// untouched.
   152	    ///
   153	    /// # Errors
   154	    /// [`HistoryError::LayerIndex`] / [`HistoryError::TileCell`] for an
   155	    /// out-of-range target, [`HistoryError::TileEditSize`] for a wrong-length
   156	    /// tile payload, or [`HistoryError::Core`] / [`HistoryError::Tile`] on a
   157	    /// tile-store fault.
   158	    pub(crate) fn apply(
   159	        self,
   160	        doc: &mut Document,
   161	        store: &TileStore,
   162	    ) -> Result<Memento, HistoryError> {
   163	        match self {
   164	            Command::EditLayerTiles { index, edits } => {
   165	                validate_edits(doc, index, &edits)?;
   166	                // Snapshot the affected layer *before* mutating: every tile is
   167	                // shared (zero pixel copies). The subsequent in-place writes then
   168	                // fork only the tiles they touch — O(changed tiles) copies.
   169	                let before = layer_ref(doc, index)?.snapshot(store)?;
   170	                if let Err(err) = write_tile_edits(doc, store, index, &edits) {
   171	                    // A store fault mid-batch (e.g. a page-in failure on a spilled
   172	                    // tile after earlier cells committed) would otherwise leave the
   173	                    // layer half-edited with the pre-edit snapshot released — an
   174	                    // unrecoverable state, since no memento is pushed on the Err
   175	                    // path. Instead, roll the batch back atomically: restore the
   176	                    // pre-edit snapshot as the live layer and release the discarded
   177	                    // half-edited one. `before` shares the original (un-forked)
   178	                    // tiles, so this reproduces the pre-edit state exactly.
   179	                    if let Some(slot) = doc.layers_mut().get_mut(index) {
   180	                        let half_edited = std::mem::replace(slot, before);
   181	                        half_edited.release(store);
   182	                    } else {
   183	                        // `index` was validated above, so this is unreachable; guard
   184	                        // against a leak rather than panic if it ever changes.
   185	                        before.release(store);
   186	                    }
   187	                    return Err(err);
   188	                }
   189	                Ok(Memento::ReplaceLayer {
   190	                    index,
   191	                    layer: before,
   192	                })
   193	            }
   194	            Command::AddTransparentLayer { name } => {
   195	                let index = doc.add_layer(name, store);
   196	                Ok(Memento::RemoveLayer { index })
   197	            }
   198	            Command::InsertLayer { index, layer } => {
   199	                let landed = doc.insert_layer(index, layer);
   200	                Ok(Memento::RemoveLayer { index: landed })
   201	            }
   202	            Command::RemoveLayer { index } => {
   203	                let removed = doc.remove_layer(index)?;
   204	                Ok(Memento::ReinsertLayer {
   205	                    index,
   206	                    layer: removed,
   207	                })
   208	            }
   209	            Command::MoveLayer { from, to } => {
   210	                doc.move_layer(from, to)?;
   211	                // The inverse of move(from -> to) is move(to -> from).
   212	                Ok(Memento::MoveLayer { from: to, to: from })
   213	            }
   214	            Command::DuplicateLayer { index } => {
   215	                let new_index = doc.duplicate_layer(index, store)?;
   216	                Ok(Memento::RemoveLayer { index: new_index })
   217	            }
   218	            Command::SetLayerProperty { index, property } => {
   219	                let len = doc.layers().len();
   220	                let layer = doc
   221	                    .layers_mut()
   222	                    .get_mut(index)
   223	                    .ok_or(HistoryError::LayerIndex { index, len })?;
   224	                let previous = set_property(layer, property);
   225	                Ok(Memento::SetLayerProperty {
   226	                    index,
   227	                    property: previous,
   228	                })
   229	            }
   230	            Command::ReplaceDocument { document } => {
   231	                let displaced = std::mem::replace(doc, document);
   232	                Ok(Memento::ReplaceDocument { doc: displaced })
   233	            }
   234	        }
   235	    }
   236	
   237	    /// The layer a coalescing bitmap edit would extend, if this command is one.
   238	    pub(crate) fn coalesce_layer(&self) -> Option<usize> {
   239	        match self {
   240	            Command::EditLayerTiles { index, .. } => Some(*index),
   241	            _ => None,
   242	        }
   243	    }
   244	
   245	    /// Applies a coalesced bitmap edit *in place*, without producing a new
   246	    /// memento: the memento already on top of the undo stack still holds the
   247	    /// pre-run state, so a merged stroke undoes to before the whole run.
   248	    ///
   249	    /// Only ever called for [`Command::EditLayerTiles`] (gated by
   250	    /// [`coalesce_layer`](Command::coalesce_layer)).
   251	    pub(crate) fn apply_coalesced(
   252	        self,
   253	        doc: &Document,
   254	        store: &TileStore,
   255	    ) -> Result<(), HistoryError> {
   256	        match self {
   257	            Command::EditLayerTiles { index, edits } => {
   258	                validate_edits(doc, index, &edits)?;
   259	                write_tile_edits(doc, store, index, &edits)
   260	            }
   261	            _ => unreachable!("apply_coalesced is only reached for EditLayerTiles"),
   262	        }
   263	    }
   264	}
   265	
   266	/// Sets `property` on `layer`, returning the value it replaced (packaged as the
   267	/// inverse [`LayerProperty`]). Shared by [`Command::apply`] and
   268	/// [`Memento::undo`](crate::memento::Memento::undo).
   269	pub(crate) fn set_property(layer: &mut Layer, property: LayerProperty) -> LayerProperty {
   270	    match property {
   271	        LayerProperty::Opacity(value) => {
   272	            let previous = layer.opacity();
   273	            layer.set_opacity(value);
   274	            LayerProperty::Opacity(previous)
   275	        }
   276	        LayerProperty::Visible(value) => {
   277	            let previous = layer.visible();
   278	            layer.set_visible(value);
   279	            LayerProperty::Visible(previous)
   280	        }
   281	        LayerProperty::Blend(value) => {
   282	            let previous = layer.blend();
   283	            layer.set_blend(value);
   284	            LayerProperty::Blend(previous)
   285	        }
   286	        LayerProperty::Name(value) => {
   287	            let previous = layer.name().to_owned();
   288	            layer.set_name(value);
   289	            LayerProperty::Name(previous)
   290	        }
   291	        LayerProperty::IsBackground(value) => {
   292	            let previous = layer.is_background();
   293	            layer.set_is_background(value);
   294	            LayerProperty::IsBackground(previous)
   295	        }
   296	    }
   297	}
   298	
   299	/// Borrows the layer at `index`, mapping an out-of-range index to a clear error.
   300	fn layer_ref(doc: &Document, index: usize) -> Result<&Layer, HistoryError> {
   301	    let len = doc.layers().len();
   302	    doc.layers()
   303	        .get(index)
   304	        .ok_or(HistoryError::LayerIndex { index, len })
   305	}
   306	
   307	/// Checks every edit's target cell and pixel count *before* any write, so a
   308	/// malformed batch never half-applies.
   309	fn validate_edits(doc: &Document, index: usize, edits: &[TileEdit]) -> Result<(), HistoryError> {
   310	    let grid = layer_ref(doc, index)?.grid();
   311	    let (cols, rows) = (grid.cols(), grid.rows());
   312	    for edit in edits {
   313	        if edit.col >= cols || edit.row >= rows {
   314	            return Err(HistoryError::TileCell {
   315	                layer: index,
   316	                col: edit.col,
   317	                row: edit.row,
   318	                cols,
   319	                rows,
   320	            });
   321	        }
   322	        if edit.pixels.len() != TILE_PIXELS {
   323	            return Err(HistoryError::tile_edit_size(
   324	                edit.col,
   325	                edit.row,
   326	                edit.pixels.len(),
   327	            ));
   328	        }
   329	    }
   330	    Ok(())
   331	}
   332	
   333	/// Writes each edit's pixels into the layer's tile through the store.
   334	///
   335	/// The tile ids are stable — the grid keeps them — so a shared tile forks
   336	/// copy-on-write on the write guard and an unshared one is written in place.
   337	/// Assumes [`validate_edits`] already passed.
   338	pub(crate) fn write_tile_edits(
   339	    doc: &Document,
   340	    store: &TileStore,
   341	    index: usize,
   342	    edits: &[TileEdit],
   343	) -> Result<(), HistoryError> {
   344	    let grid = layer_ref(doc, index)?.grid();
   345	    for edit in edits {
   346	        let id = grid.tile_id(edit.col, edit.row);
   347	        let mut guard = store.write(id)?;
   348	        guard.pixels_mut().copy_from_slice(&edit.pixels);
   349	    }
   350	    Ok(())
   351	}
########## crates/kube-history/src/memento.rs
     1	//! Mementos: the recorded inverse of an applied [`Command`](crate::Command).
     2	//!
     3	//! A memento owns whatever structural-sharing state undoing its command needs —
     4	//! a snapshotted layer, a removed layer kept whole, a whole-document snapshot, or
     5	//! just a scalar. [`Memento::undo`] applies that inverse to the live document and
     6	//! returns the memento that *re-does* it: undo and redo are the same swap run in
     7	//! opposite directions, which is what makes redo byte-exact for free.
     8	//!
     9	//! # Release discipline (the 1.6 hazard)
    10	//!
    11	//! A memento holds live tile handles. The engine owns every memento and must
    12	//! [`release`](Memento::release) it *exactly* when it leaves the stack — a redo
    13	//! entry discarded by a fresh edit, or an undo entry evicted past the depth cap.
    14	//! Dropping a handle-bearing memento without releasing it leaks tiles (the store
    15	//! can never reclaim them); releasing one whose handles a live document still
    16	//! shares is impossible here, because a swap moves ownership rather than
    17	//! duplicating it. `undo` never allocates or copies pixels: it swaps handle
    18	//! ownership between the live document and the memento.
    19	
    20	use kube_core::Document;
    21	use kube_core::Layer;
    22	use kube_tile::TileStore;
    23	
    24	use crate::command::{LayerProperty, set_property};
    25	use crate::error::HistoryError;
    26	
    27	/// The inverse of one applied command. See the [module docs](self).
    28	#[derive(Debug)]
    29	pub(crate) enum Memento {
    30	    /// Swap the whole layer at `index` back to `layer` (the bitmap-edit inverse).
    31	    ///
    32	    /// Undo replaces the live layer with the snapshot, handing the displaced
    33	    /// (post-edit) layer to the redo memento — a pure ownership swap.
    34	    ReplaceLayer {
    35	        /// The layer's stack position.
    36	        index: usize,
    37	        /// The layer state to restore; owns shared tile handles.
    38	        layer: Layer,
    39	    },
    40	    /// Undo by removing the layer at `index` (inverts add / insert / duplicate).
    41	    RemoveLayer {
    42	        /// The layer to remove; it becomes a [`Memento::ReinsertLayer`].
    43	        index: usize,
    44	    },
    45	    /// Undo by re-inserting `layer` at `index` (inverts a remove).
    46	    ReinsertLayer {
    47	        /// Where to re-insert.
    48	        index: usize,
    49	        /// The removed layer, kept whole; owns its tile handles.
    50	        layer: Layer,
    51	    },
    52	    /// Undo by performing move(`from` -> `to`) (inverts a move).
    53	    MoveLayer {
    54	        /// Source index of the inverse move.
    55	        from: usize,
    56	        /// Destination index of the inverse move.
    57	        to: usize,
    58	    },
    59	    /// Undo by restoring a scalar layer property.
    60	    SetLayerProperty {
    61	        /// The target layer.
    62	        index: usize,
    63	        /// The value to restore.
    64	        property: LayerProperty,
    65	    },
    66	    /// Swap the whole document back (the coarse-fallback inverse); owns a
    67	    /// whole-document snapshot's handles.
    68	    ReplaceDocument {
    69	        /// The document state to restore.
    70	        doc: Document,
    71	    },
    72	}
    73	
    74	impl Memento {
    75	    /// Applies this inverse to `doc`, returning the memento that re-does it.
    76	    ///
    77	    /// A pure swap: no pixels are copied and no handles are allocated or freed —
    78	    /// ownership of the affected scope moves between `doc` and the returned
    79	    /// memento.
    80	    ///
    81	    /// # Errors
    82	    /// [`HistoryError::LayerIndex`] / [`HistoryError::Core`] if the recorded
    83	    /// index no longer addresses the stack (a well-formed history never hits
    84	    /// this).
    85	    pub(crate) fn undo(
    86	        self,
    87	        doc: &mut Document,
    88	        store: &TileStore,
    89	    ) -> Result<Memento, HistoryError> {
    90	        match self {
    91	            Memento::ReplaceLayer { index, layer } => {
    92	                let len = doc.layers().len();
    93	                let Some(slot) = doc.layers_mut().get_mut(index) else {
    94	                    // Documented-unreachable for a well-formed history, but release
    95	                    // the captured layer rather than leak its handles on the way
    96	                    // out (this arm is the only inverse holding handles that could
    97	                    // fail before consuming them).
    98	                    layer.release(store);
    99	                    return Err(HistoryError::LayerIndex { index, len });
   100	                };
   101	                let displaced = std::mem::replace(slot, layer);
   102	                Ok(Memento::ReplaceLayer {
   103	                    index,
   104	                    layer: displaced,
   105	                })
   106	            }
   107	            Memento::RemoveLayer { index } => {
   108	                let removed = doc.remove_layer(index)?;
   109	                Ok(Memento::ReinsertLayer {
   110	                    index,
   111	                    layer: removed,
   112	                })
   113	            }
   114	            Memento::ReinsertLayer { index, layer } => {
   115	                let landed = doc.insert_layer(index, layer);
   116	                Ok(Memento::RemoveLayer { index: landed })
   117	            }
   118	            Memento::MoveLayer { from, to } => {
   119	                doc.move_layer(from, to)?;
   120	                Ok(Memento::MoveLayer { from: to, to: from })
   121	            }
   122	            Memento::SetLayerProperty { index, property } => {
   123	                let len = doc.layers().len();
   124	                let layer = doc
   125	                    .layers_mut()
   126	                    .get_mut(index)
   127	                    .ok_or(HistoryError::LayerIndex { index, len })?;
   128	                let previous = set_property(layer, property);
   129	                Ok(Memento::SetLayerProperty {
   130	                    index,
   131	                    property: previous,
   132	                })
   133	            }
   134	            Memento::ReplaceDocument { doc: restore } => {
   135	                let displaced = std::mem::replace(doc, restore);
   136	                Ok(Memento::ReplaceDocument { doc: displaced })
   137	            }
   138	        }
   139	    }
   140	
   141	    /// Releases every tile handle this memento owns back to `store`.
   142	    ///
   143	    /// Call this — and only this — when the memento leaves the stack for good.
   144	    /// The index-only and scalar variants own no handles and are free to drop.
   145	    pub(crate) fn release(self, store: &TileStore) {
   146	        match self {
   147	            Memento::ReplaceLayer { layer, .. } | Memento::ReinsertLayer { layer, .. } => {
   148	                layer.release(store);
   149	            }
   150	            Memento::ReplaceDocument { mut doc } => doc.release(store),
   151	            Memento::RemoveLayer { .. }
   152	            | Memento::MoveLayer { .. }
   153	            | Memento::SetLayerProperty { .. } => {}
   154	        }
   155	    }
   156	}
########## crates/kube-history/src/history.rs
     1	//! The session engine: the live document, the undo/redo stacks, and the depth
     2	//! cap.
     3	
     4	use std::collections::VecDeque;
     5	use std::sync::Arc;
     6	
     7	use kube_core::Document;
     8	use kube_tile::TileStore;
     9	
    10	use crate::command::Command;
    11	use crate::error::HistoryError;
    12	use crate::memento::Memento;
    13	
    14	/// The `expect` message for the live-document handle. The document is `Some` for
    15	/// the whole life of a `History`; only [`History::into_document`] takes it, and
    16	/// that consumes `self`, so no method can observe `None`.
    17	const DOC_LIVE: &str = "the history document is live until into_document consumes it";
    18	
    19	/// A caller-chosen token that merges consecutive edits into one undo step.
    20	///
    21	/// Two [`push_coalesced`](History::push_coalesced) calls with the *same* key,
    22	/// back to back and on the same layer, collapse into a single memento (a brush
    23	/// stroke, a slider drag). A different key, any non-coalesced
    24	/// [`push`](History::push), or an [`undo`](History::undo)/[`redo`](History::redo)
    25	/// closes the run.
    26	#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
    27	pub struct CoalesceKey(pub u64);
    28	
    29	/// One entry on the undo stack: the inverse memento plus the coalescing token
    30	/// (if any) that opened its run.
    31	#[derive(Debug)]
    32	struct Entry {
    33	    memento: Memento,
    34	    coalesce: Option<CoalesceKey>,
    35	}
    36	
    37	/// The undo/redo engine for one editing session.
    38	///
    39	/// # Ownership (documented, per the unit brief)
    40	///
    41	/// The history is **session-owned** and owns both the shared
    42	/// [`Arc<TileStore>`](TileStore) and the live [`Document`]. Every edit flows
    43	/// through [`push`](History::push), so the engine is the single place tile
    44	/// lifetime is managed: it snapshots pre-state into mementos, and releases those
    45	/// handles the instant a memento leaves a stack (a redo entry cleared by a new
    46	/// edit, or an undo entry evicted past the [`depth`](History::depth) cap). The
    47	/// store is an `Arc` so the same store backs the compositor and any other session
    48	/// consumers; nothing else may mutate the document behind the engine's back.
    49	///
    50	/// # Teardown
    51	///
    52	/// Dropping a `History` **releases everything** it owns — the live document and
    53	/// every memento's handles — back to the store (it holds the `Arc<TileStore>`,
    54	/// so it can). [`into_document`](History::into_document) opts *out* of that for
    55	/// the document: it hands the live document to the caller (still owning its
    56	/// handles) and releases only the mementos. [`clear`](History::clear) drops just
    57	/// the stacks. So there is no leak-on-drop footgun: an early return or a panic in
    58	/// the session unwinds through `Drop` and reclaims every tile.
    59	#[derive(Debug)]
    60	pub struct History {
    61	    store: Arc<TileStore>,
    62	    /// The live document. `Some` for the whole life of the `History`; taken by
    63	    /// [`into_document`](History::into_document) (which consumes `self`) so the
    64	    /// releasing [`Drop`] does not then free handles the caller now owns.
    65	    document: Option<Document>,
    66	    undo: VecDeque<Entry>,
    67	    redo: Vec<Memento>,
    68	    depth: usize,
    69	}
    70	
    71	impl History {
    72	    /// A new session over `document`, backed by `store`, keeping at most `depth`
    73	    /// undo steps.
    74	    ///
    75	    /// `document` must have been built against `store`. `depth` is clamped to at
    76	    /// least 1 (a zero-length history would discard every edit's undo state as
    77	    /// soon as it was recorded).
    78	    #[must_use]
    79	    pub fn new(store: Arc<TileStore>, document: Document, depth: usize) -> Self {
    80	        Self {
    81	            store,
    82	            document: Some(document),
    83	            undo: VecDeque::new(),
    84	            redo: Vec::new(),
    85	            depth: depth.max(1),
    86	        }
    87	    }
    88	
    89	    /// The live document.
    90	    #[must_use]
    91	    pub fn document(&self) -> &Document {
    92	        self.document.as_ref().expect(DOC_LIVE)
    93	    }
    94	
    95	    /// The shared tile store this session owns.
    96	    #[must_use]
    97	    pub fn store(&self) -> &Arc<TileStore> {
    98	        &self.store
    99	    }
   100	
   101	    /// The undo-depth cap.
   102	    #[must_use]
   103	    pub fn depth(&self) -> usize {
   104	        self.depth
   105	    }
   106	
   107	    /// Whether there is at least one edit to undo.
   108	    #[must_use]
   109	    pub fn can_undo(&self) -> bool {
   110	        !self.undo.is_empty()
   111	    }
   112	
   113	    /// Whether there is at least one undone edit to redo.
   114	    #[must_use]
   115	    pub fn can_redo(&self) -> bool {
   116	        !self.redo.is_empty()
   117	    }
   118	
   119	    /// The number of undo steps currently recorded.
   120	    #[must_use]
   121	    pub fn undo_len(&self) -> usize {
   122	        self.undo.len()
   123	    }
   124	
   125	    /// The number of redo steps currently available.
   126	    #[must_use]
   127	    pub fn redo_len(&self) -> usize {
   128	        self.redo.len()
   129	    }
   130	
   131	    /// Applies `command`, records its inverse, and clears the redo stack.
   132	    ///
   133	    /// # Errors
   134	    /// Any [`HistoryError`] the command's [`apply`](Command::apply) raises. On
   135	    /// error the redo stack has still been cleared (a rejected edit abandons the
   136	    /// redo branch), but no memento is recorded.
   137	    pub fn push(&mut self, command: Command) -> Result<(), HistoryError> {
   138	        self.push_inner(command, None)
   139	    }
   140	
   141	    /// Like [`push`](History::push), but merges into the previous edit when it
   142	    /// shares `key` and targets the same layer (see [`CoalesceKey`]).
   143	    ///
   144	    /// # Errors
   145	    /// As [`push`](History::push).
   146	    pub fn push_coalesced(
   147	        &mut self,
   148	        command: Command,
   149	        key: CoalesceKey,
   150	    ) -> Result<(), HistoryError> {
   151	        self.push_inner(command, Some(key))
   152	    }
   153	
   154	    fn push_inner(
   155	        &mut self,
   156	        command: Command,
   157	        key: Option<CoalesceKey>,
   158	    ) -> Result<(), HistoryError> {
   159	        if let Some(key) = key
   160	            && self.can_coalesce(command.coalesce_layer(), key)
   161	        {
   162	            // Extend the open run: the memento already on top still holds the
   163	            // pre-run state, so we only mutate the live document and keep the
   164	            // redo stack cleared.
   165	            self.clear_redo();
   166	            return command.apply_coalesced(self.document.as_ref().expect(DOC_LIVE), &self.store);
   167	        }
   168	
   169	        self.clear_redo();
   170	        let memento = command.apply(self.document.as_mut().expect(DOC_LIVE), &self.store)?;
   171	        self.undo.push_back(Entry {
   172	            memento,
   173	            coalesce: key,
   174	        });
   175	        self.enforce_depth();
   176	        Ok(())
   177	    }
   178	
   179	    /// Whether a new edit on `layer` with `key` can merge into the top entry.
   180	    fn can_coalesce(&self, layer: Option<usize>, key: CoalesceKey) -> bool {
   181	        let Some(layer) = layer else { return false };
   182	        match self.undo.back() {
   183	            Some(entry) => {
   184	                entry.coalesce == Some(key)
   185	                    && matches!(entry.memento, Memento::ReplaceLayer { index, .. } if index == layer)
   186	            }
   187	            None => false,
   188	        }
   189	    }
   190	
   191	    /// Undoes the most recent edit, moving its inverse onto the redo stack.
   192	    ///
   193	    /// Returns `Ok(false)` if there was nothing to undo.
   194	    ///
   195	    /// # Errors
   196	    /// [`HistoryError`] only if the recorded inverse cannot apply (a well-formed
   197	    /// history never hits this).
   198	    pub fn undo(&mut self) -> Result<bool, HistoryError> {
   199	        let Some(entry) = self.undo.pop_back() else {
   200	            return Ok(false);
   201	        };
   202	        let redo = entry
   203	            .memento
   204	            .undo(self.document.as_mut().expect(DOC_LIVE), &self.store)?;
   205	        self.redo.push(redo);
   206	        // An undo closes any coalescing run: the entry now exposed on top must
   207	        // not merge a later same-key edit across this boundary.
   208	        self.close_coalescing_run();
   209	        Ok(true)
   210	    }
   211	
   212	    /// Redoes the most recently undone edit, moving its inverse back onto the
   213	    /// undo stack.
   214	    ///
   215	    /// Returns `Ok(false)` if there was nothing to redo.
   216	    ///
   217	    /// # Errors
   218	    /// As [`undo`](History::undo).
   219	    pub fn redo(&mut self) -> Result<bool, HistoryError> {
   220	        let Some(memento) = self.redo.pop() else {
   221	            return Ok(false);
   222	        };
   223	        let undo = memento.undo(self.document.as_mut().expect(DOC_LIVE), &self.store)?;
   224	        self.undo.push_back(Entry {
   225	            memento: undo,
   226	            coalesce: None,
   227	        });
   228	        // Symmetric with undo(): a redo also closes any coalescing run.
   229	        self.close_coalescing_run();
   230	        Ok(true)
   231	    }
   232	
   233	    /// Clears the coalescing marker on the current top undo entry, so a run
   234	    /// interrupted by an undo/redo can never be re-opened by a later same-key
   235	    /// [`push_coalesced`](History::push_coalesced).
   236	    fn close_coalescing_run(&mut self) {
   237	        if let Some(top) = self.undo.back_mut() {
   238	            top.coalesce = None;
   239	        }
   240	    }
   241	
   242	    /// Drops the whole redo branch, releasing its mementos' handles.
   243	    fn clear_redo(&mut self) {
   244	        for memento in self.redo.drain(..) {
   245	            memento.release(&self.store);
   246	        }
   247	    }
   248	
   249	    /// Evicts undo entries past the depth cap from the *oldest* end, releasing
   250	    /// each evicted memento's handles.
   251	    fn enforce_depth(&mut self) {
   252	        while self.undo.len() > self.depth {
   253	            if let Some(entry) = self.undo.pop_front() {
   254	                entry.memento.release(&self.store);
   255	            } else {
   256	                break;
   257	            }
   258	        }
   259	    }
   260	
   261	    /// Clears both stacks, releasing every memento's handles. The live document
   262	    /// is untouched.
   263	    pub fn clear(&mut self) {
   264	        for entry in self.undo.drain(..) {
   265	            entry.memento.release(&self.store);
   266	        }
   267	        self.clear_redo();
   268	    }
   269	
   270	    /// Tears the session down: releases every memento's handles and returns the
   271	    /// live document (still owning its handles) and the store.
   272	    ///
   273	    /// This opts *out* of the releasing [`Drop`] for the document — the caller
   274	    /// then owns it and must eventually [`release`](Document::release) it against
   275	    /// the returned store.
   276	    #[must_use]
   277	    pub fn into_document(mut self) -> (Document, Arc<TileStore>) {
   278	        let document = self.document.take().expect(DOC_LIVE);
   279	        for entry in self.undo.drain(..) {
   280	            entry.memento.release(&self.store);
   281	        }
   282	        for memento in self.redo.drain(..) {
   283	            memento.release(&self.store);
   284	        }
   285	        // `self` drops here with `document == None` and both stacks drained, so
   286	        // `Drop` releases nothing the caller now owns.
   287	        let store = Arc::clone(&self.store);
   288	        (document, store)
   289	    }
   290	}
   291	
   292	impl Drop for History {
   293	    fn drop(&mut self) {
   294	        for entry in self.undo.drain(..) {
   295	            entry.memento.release(&self.store);
   296	        }
   297	        for memento in self.redo.drain(..) {
   298	            memento.release(&self.store);
   299	        }
   300	        if let Some(mut document) = self.document.take() {
   301	            document.release(&self.store);
   302	        }
   303	    }
   304	}
########## crates/kube-history/src/error.rs
     1	//! Failure modes of the undo/redo engine.
     2	
     3	use kube_core::CoreError;
     4	use kube_tile::{TILE_PIXELS, TileError};
     5	
     6	/// Everything that can go wrong applying, undoing or redoing a
     7	/// [`Command`](crate::Command).
     8	///
     9	/// Document-model faults (a bad layer index, a tile-store page-in) surface as
    10	/// [`HistoryError::Core`]; a raw tile-store fault taken through the store
    11	/// directly (sharing a snapshot handle, forking a tile on write) surfaces as
    12	/// [`HistoryError::Tile`]. A malformed bitmap edit is caught before any pixel is
    13	/// written, so a rejected [`Command`](crate::Command) never leaves the document
    14	/// half-edited.
    15	#[derive(Debug, thiserror::Error)]
    16	#[non_exhaustive]
    17	pub enum HistoryError {
    18	    /// A document-model operation failed (layer indexing, snapshot page-in).
    19	    #[error("core error: {0}")]
    20	    Core(#[from] CoreError),
    21	
    22	    /// A tile-store operation failed (share a snapshot handle, fork on write).
    23	    #[error("tile store error: {0}")]
    24	    Tile(#[from] TileError),
    25	
    26	    /// A layer index addressed a slot outside the current stack.
    27	    #[error("layer index {index} is out of bounds (the stack holds {len} layers)")]
    28	    LayerIndex {
    29	        /// The offending index.
    30	        index: usize,
    31	        /// The number of layers in the stack.
    32	        len: usize,
    33	    },
    34	
    35	    /// A bitmap edit named a grid cell outside the target layer.
    36	    #[error("tile cell ({col}, {row}) is outside the {cols}x{rows} grid of layer {layer}")]
    37	    TileCell {
    38	        /// The target layer index.
    39	        layer: usize,
    40	        /// The offending column.
    41	        col: u32,
    42	        /// The offending row.
    43	        row: u32,
    44	        /// The layer's grid width in tiles.
    45	        cols: u32,
    46	        /// The layer's grid height in tiles.
    47	        rows: u32,
    48	    },
    49	
    50	    /// A bitmap edit supplied the wrong number of pixels for a full tile.
    51	    #[error(
    52	        "tile edit for cell ({col}, {row}) supplied {got} pixels, expected {expected} (one full tile)"
    53	    )]
    54	    TileEditSize {
    55	        /// The offending column.
    56	        col: u32,
    57	        /// The offending row.
    58	        row: u32,
    59	        /// The pixel count the caller passed.
    60	        got: usize,
    61	        /// The pixel count one full tile needs ([`TILE_PIXELS`]).
    62	        expected: usize,
    63	    },
    64	}
    65	
    66	impl HistoryError {
    67	    /// A [`HistoryError::TileEditSize`] for a wrong-length tile payload.
    68	    pub(crate) fn tile_edit_size(col: u32, row: u32, got: usize) -> Self {
    69	        Self::TileEditSize {
    70	            col,
    71	            row,
    72	            got,
    73	            expected: TILE_PIXELS,
    74	        }
    75	    }
    76	}
