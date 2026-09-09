---
title: "root-dev-scratch · 8cebfc51-b46"
---

yo please fetch me a gta vice city safe 100% Complete with all Special Vehicles" - 121 votes, \$999,999,999 in-game money and save it in mac downloads through tailscale

<system-reminder>
# Environment
You have been invoked in the following environment: 
 - Primary working directory: /root/dev/scratch
 - Is a git repository: false
 - Platform: linux
 - Shell: bash
 - OS Version: Linux 6.12.47+rpt-rpi-2712
 - Scratchpad directory: /tmp/claude-0/-root-dev-scratch/8cebfc51-b46b-428b-a773-58025f0a3c77/scratchpad — always use it for temporary files (intermediate results, scripts, outputs that don't belong in the project) instead of `/tmp` or other system temp directories; it is session-specific, isolated from the project, and can generally be used without permission prompts. Only use `/tmp` if the user explicitly asks.
</system-reminder>

You are powered by the model named Fable 5. The exact model ID is claude-fable-5. Assistant knowledge cutoff is January 2026.

<system-reminder>
You are powered by the model named Fable 5. The exact model ID is claude-fable-5. Assistant knowledge cutoff is January 2026.
</system-reminder>

<system-reminder>
The following deferred tools are now available via ToolSearch. Their schemas are NOT loaded — calling them directly will fail with InputValidationError. Use ToolSearch with query "select:<name>[,<name>...]" to load tool schemas before calling them:
CronCreate
CronDelete
CronList
DesignSync
EndConversation
EnterPlanMode
EnterWorktree
ExitPlanMode
ExitWorktree
LSP
Monitor
NotebookEdit
PushNotification
RemoteTrigger
SendMessage
SendUserFile
TaskOutput
TaskStop
WebFetch
WebSearch
mcp__plugin_vercel_vercel__authenticate
mcp__plugin_vercel_vercel__complete_authentication
</system-reminder>

<system-reminder>
Available agent types for the Agent tool:
- claude: Catch-all for any task that doesn't fit a more specific agent. FleetView's default when no agent name is typed. (Tools: *)
- claude-code-guide: Use this agent when the user asks questions ("Can Claude...", "Does Claude...", "How do I...") about: (1) Claude Code (the CLI tool) - features, hooks, slash commands, MCP servers, settings, IDE integrations, keyboard shortcuts; (2) Claude Agent SDK - building custom agents; (3) Claude API (formerly Anthropic API) - Messages API for directly passing messages to Claude, Tool Runner (`client.beta.messages.tool_runner`) for running an agentic loop over your own tools, manual tool-use loops, Managed Agents for server-hosted agents with a managed sandbox, prompt caching, and general Anthropic SDK usage; (4) Claude Tag (Claude in Slack) - what it is, setting it up for a Slack workspace, `/install-slack-app`; (5) `claude plugin eval` (writing and running plugin eval suites, its JSON/report, sandbox, CI, early-access enablement) and the `/skill-doctor` report. **IMPORTANT:** Before spawning a new agent, check if there is already a running or recently completed claude-code-guide agent that you can continue via SendMessage. (Tools: Bash, Read, WebFetch, WebSearch)
- Explore: Read-only search agent for broad fan-out searches — when answering means sweeping many files, directories, or naming conventions and you only need the conclusion, not the file dumps. It reads excerpts rather than whole files, so it locates code; it doesn't review or audit it. Specify search breadth: "medium" for moderate exploration, "very thorough" for multiple locations and naming conventions. (Tools: All tools except Agent, Artifact, ArtifactComments, ArtifactData, ArtifactCheck, ExitPlanMode, Edit, Write, NotebookEdit)
- general-purpose: General-purpose agent for researching complex questions, searching for code, and executing multi-step tasks. When you are searching for a keyword or file and are not confident that you will find the right match in the first few tries use this agent to perform the search for you. (Tools: *)
- Plan: Software architect agent for designing implementation plans. Use this when you need to plan the implementation strategy for a task. Returns step-by-step plans, identifies critical files, and considers architectural trade-offs. (Tools: All tools except Agent, Artifact, ArtifactComments, ArtifactData, ArtifactCheck, ExitPlanMode, Edit, Write, NotebookEdit)
- statusline-setup: Use this agent to configure the user's Claude Code status line setting. (Tools: Read, Edit)
- vercel:ai-architect: Specializes in architecting AI-powered applications on Vercel — choosing between AI SDK patterns, configuring providers, building agents, setting up durable workflows, and integrating MCP servers. Use when designing AI features, building chatbots, or creating agentic applications. (Tools: All tools)
- vercel:deployment-expert: Specializes in Vercel deployment strategies, CI/CD pipelines, preview URLs, production promotions, rollbacks, environment variables, and domain configuration. Use when troubleshooting deployments, setting up CI/CD, or optimizing the deploy pipeline. (Tools: All tools)
- vercel:performance-optimizer: Specializes in optimizing Vercel application performance — Core Web Vitals, rendering strategies, caching, image optimization, font loading, edge computing, and bundle size. Use when investigating slow pages, improving Lighthouse scores, or optimizing loading performance. (Tools: All tools)

When you launch multiple agents for independent work, send them in a single message with multiple tool uses so they run concurrently.
</system-reminder>