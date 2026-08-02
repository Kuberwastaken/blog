# minddump-mcp

A stateless [MCP](https://modelcontextprotocol.io) server exposing the MindDump
blog to AI agents, running on the **Cloudflare Workers free plan** with zero
dependencies and zero bindings.

Every tool is a cached read over the blog's own machine-readable surfaces
(`llms.txt`, `static/contentIndex.json`, and the per-post `.md` mirrors), so the
server stores nothing and can never go stale — each blog deploy updates it
automatically.

## Tools

| Tool | What it does |
| --- | --- |
| `list_posts` | List posts, filter by section, sort by newest/oldest/title |
| `search_posts` | Full-text search with relevance scores and snippets |
| `get_post` | Fetch one post as raw markdown (frontmatter included) |
| `get_blog_info` | Blog and author metadata, sections, post count |

## Staying free forever

The free plan cannot bill: there is no payment method on the account, no
overage pricing on the free tier (requests past 100k/day fail rather than
charge), and this Worker deliberately uses none of the products with paid
dimensions — no KV, no Durable Objects, no R2, no Queues. Keep it that way:

1. Never add a payment method to the Cloudflare account.
2. Never subscribe to Workers Paid.
3. Add no bindings to `wrangler.toml`.

## First deploy (one time, ~5 minutes)

1. Create a Cloudflare account (free plan, **skip adding a card**).
2. `cd mcp && npm install && npx wrangler login && npx wrangler deploy`
3. Note the URL it prints: `https://minddump-mcp.<your-subdomain>.workers.dev`

## Automatic deploys from GitHub

`.github/workflows/deploy-mcp.yml` redeploys on any push touching `mcp/`.
It needs two repository secrets:

- `CLOUDFLARE_API_TOKEN` — dash.cloudflare.com → My Profile → API Tokens →
  Create Token → "Edit Cloudflare Workers" template
- `CLOUDFLARE_ACCOUNT_ID` — shown on the Workers overview page sidebar

## Try it

```sh
# Landing page
curl https://minddump-mcp.<subdomain>.workers.dev/

# Straight MCP
curl -s -X POST https://minddump-mcp.<subdomain>.workers.dev/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# Claude Code
claude mcp add --transport http minddump https://minddump-mcp.<subdomain>.workers.dev/mcp
```
