/**
 * minddump-mcp — a stateless MCP server for the MindDump blog.
 *
 * Runs on the Cloudflare Workers free plan with zero bindings and zero
 * dependencies: every tool is a thin, cached read over the blog's own
 * machine-readable surfaces (llms.txt, static/contentIndex.json, and the
 * per-post markdown mirrors), so the server holds no data and can never go
 * stale — each blog deploy updates it automatically.
 *
 * Transport: MCP streamable HTTP in stateless mode. Clients POST JSON-RPC to
 * /mcp and get a plain JSON response; no sessions, no SSE, no state.
 */

const BLOG = "https://kuber.studio/blog"
const SERVER_NAME = "minddump-mcp"
const SERVER_VERSION = "1.0.0"
const PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"]
const CACHE_TTL_SECONDS = 300

// ---------------------------------------------------------------- data layer

/** Fetch a blog resource through the free edge cache (~5 min TTL). */
async function fetchCached(url: string): Promise<Response> {
  const cache = caches.default
  const key = new Request(url)
  const hit = await cache.match(key)
  if (hit) return hit

  const res = await fetch(url, { headers: { "User-Agent": `${SERVER_NAME}/${SERVER_VERSION}` } })
  if (!res.ok) return res

  const cacheable = new Response(res.body, res)
  cacheable.headers.set("Cache-Control", `s-maxage=${CACHE_TTL_SECONDS}`)
  await cache.put(key, cacheable.clone())
  return cacheable
}

interface PostEntry {
  title: string
  url: string
  mdUrl: string
  slug: string
  section: string
  date?: string
  description?: string
}

/** Parse llms.txt into structured post entries. */
async function loadIndex(): Promise<{ header: string; posts: PostEntry[] }> {
  const res = await fetchCached(`${BLOG}/llms.txt`)
  if (!res.ok) throw new Error(`llms.txt fetch failed with status ${res.status}`)
  const text = await res.text()

  const header = text.split(/^## /m)[0].trim()
  const posts: PostEntry[] = []
  let section = "Uncategorised"

  for (const line of text.split("\n")) {
    const sectionMatch = line.match(/^## (.+)$/)
    if (sectionMatch) {
      section = sectionMatch[1].trim()
      continue
    }
    // `- [Title](url) ([markdown](url.md)): YYYY-MM-DD — description`
    // The markdown link and the notes are both optional so older copies of the
    // index parse the same way.
    const m = line.match(
      /^- \[(.+?)\]\((https?:[^)\s]+?)\)(?:\s*\(\[markdown\]\((https?:[^)\s]+?)\)\))?(?::\s*(.*))?$/,
    )
    if (!m) continue
    const [, title, url, mdUrl, notes] = m
    const dateMatch = notes?.match(/^(\d{4}-\d{2}-\d{2})/)
    const description = notes?.replace(/^\d{4}-\d{2}-\d{2}\s*[—-]?\s*/, "").trim()
    posts.push({
      title,
      url,
      mdUrl: mdUrl ?? `${url}.md`,
      slug: url.replace(`${BLOG}/`, ""),
      section,
      date: dateMatch?.[1],
      description: description || undefined,
    })
  }
  return { header, posts }
}

interface IndexedContent {
  title: string
  links: string[]
  tags: string[]
  content: string
}

/** Quartz's emitted search corpus: slug → { title, links, tags, content }. */
async function loadCorpus(): Promise<Record<string, IndexedContent>> {
  const res = await fetchCached(`${BLOG}/static/contentIndex.json`)
  if (!res.ok) throw new Error(`contentIndex.json fetch failed with status ${res.status}`)
  return res.json()
}

// --------------------------------------------------------------------- tools

const TOOLS = [
  {
    name: "list_posts",
    description:
      "List blog posts from MindDump (Kuber Mehta's blog), optionally filtered by section and sorted. Returns title, URL, markdown URL, date, and description for each post.",
    inputSchema: {
      type: "object",
      properties: {
        section: {
          type: "string",
          description: "Only posts from this section (e.g. 'AI', 'Projects', 'Reflections')",
        },
        sort: {
          type: "string",
          enum: ["newest", "oldest", "title"],
          description: "Sort order, defaults to newest first",
        },
        limit: { type: "number", description: "Maximum posts to return (default 50)" },
      },
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "search_posts",
    description:
      "Full-text search across all MindDump blog posts. Returns matching posts with a snippet around the first match. Use get_post with a result's slug to read the full post.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search terms" },
        limit: { type: "number", description: "Maximum results (default 10)" },
      },
      required: ["query"],
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "get_post",
    description:
      "Fetch a single MindDump blog post as raw markdown (frontmatter included). Accepts a slug like 'AI/DeepSeeks-Plan-for-AGI-is-the-Costco-Hot-Dog' or a full post URL.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Post slug or full URL" },
      },
      required: ["slug"],
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "get_blog_info",
    description:
      "Get information about the MindDump blog and its author, plus the list of sections and post count.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
  },
]

async function callTool(name: string, args: Record<string, unknown>): Promise<string> {
  switch (name) {
    case "list_posts": {
      const { posts } = await loadIndex()
      const section = typeof args.section === "string" ? args.section.toLowerCase() : undefined
      const sort = typeof args.sort === "string" ? args.sort : "newest"
      const limit = typeof args.limit === "number" ? args.limit : 50

      let filtered = section
        ? posts.filter((p) => p.section.toLowerCase() === section)
        : [...posts]
      if (sort === "title") filtered.sort((a, b) => a.title.localeCompare(b.title))
      else
        filtered.sort((a, b) => {
          const da = a.date ?? ""
          const db = b.date ?? ""
          return sort === "oldest" ? da.localeCompare(db) : db.localeCompare(da)
        })
      filtered = filtered.slice(0, limit)

      if (filtered.length === 0) {
        const sections = [...new Set(posts.map((p) => p.section))].join(", ")
        return `No posts matched. Available sections: ${sections}`
      }
      return JSON.stringify(filtered, null, 2)
    }

    case "search_posts": {
      if (typeof args.query !== "string" || args.query.trim() === "")
        throw new Error("query is required")
      const query = args.query.toLowerCase()
      const terms = query.split(/\s+/).filter((t) => t.length > 1)
      const limit = typeof args.limit === "number" ? args.limit : 10
      const [corpus, { posts }] = await Promise.all([loadCorpus(), loadIndex()])
      const bySlug = new Map(posts.map((p) => [p.slug, p]))

      const results: { score: number; slug: string; title: string; snippet: string }[] = []
      for (const [slug, doc] of Object.entries(corpus)) {
        const content = doc.content.toLowerCase()
        const title = doc.title.toLowerCase()
        let score = 0
        let firstHit = -1
        for (const term of terms.length > 0 ? terms : [query]) {
          const contentHits = content.split(term).length - 1
          const titleHits = title.split(term).length - 1
          const tagHits = doc.tags.filter((t) => t.toLowerCase().includes(term)).length
          score += contentHits + titleHits * 5 + tagHits * 3
          if (firstHit < 0) firstHit = content.indexOf(term)
        }
        if (score === 0) continue
        const start = Math.max(0, firstHit - 100)
        const snippet = doc.content.slice(start, firstHit + 160).replace(/\s+/g, " ").trim()
        results.push({ score, slug, title: doc.title, snippet: `…${snippet}…` })
      }

      results.sort((a, b) => b.score - a.score)
      const top = results.slice(0, limit).map((r) => ({
        title: r.title,
        slug: r.slug,
        url: `${BLOG}/${r.slug}`,
        markdown_url: `${BLOG}/${r.slug}.md`,
        date: bySlug.get(r.slug)?.date,
        relevance: r.score,
        snippet: r.snippet,
      }))
      if (top.length === 0) return `No posts matched "${args.query}".`
      return JSON.stringify(top, null, 2)
    }

    case "get_post": {
      if (typeof args.slug !== "string" || args.slug.trim() === "")
        throw new Error("slug is required")
      let slug = args.slug.trim()
      if (slug.startsWith("http")) slug = slug.replace(`${BLOG}/`, "")
      slug = slug.replace(/\.md$/, "").replace(/^\/+|\/+$/g, "")

      const res = await fetchCached(`${BLOG}/${slug}.md`)
      if (res.status === 404)
        throw new Error(
          `No post at slug "${slug}". Use list_posts or search_posts to find valid slugs.`,
        )
      if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`)
      return await res.text()
    }

    case "get_blog_info": {
      const { header, posts } = await loadIndex()
      const sections = [...new Set(posts.map((p) => p.section))]
      return `${header}\n\nSections: ${sections.join(", ")}\nTotal posts: ${posts.length}\n\nEvery post URL has a raw markdown mirror at the same URL + ".md".`
    }

    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}

// ----------------------------------------------------------- JSON-RPC / MCP

type JsonRpcRequest = { jsonrpc: "2.0"; id?: number | string | null; method: string; params?: any }

function rpcResult(id: number | string | null, result: unknown) {
  return { jsonrpc: "2.0", id, result }
}

function rpcError(id: number | string | null, code: number, message: string) {
  return { jsonrpc: "2.0", id, error: { code, message } }
}

async function handleMessage(msg: JsonRpcRequest): Promise<object | null> {
  const id = msg.id ?? null

  // Notifications get no response.
  if (msg.id === undefined && msg.method?.startsWith("notifications/")) return null

  switch (msg.method) {
    case "initialize": {
      const requested = msg.params?.protocolVersion
      const version = PROTOCOL_VERSIONS.includes(requested) ? requested : PROTOCOL_VERSIONS[0]
      return rpcResult(id, {
        protocolVersion: version,
        capabilities: { tools: {} },
        serverInfo: {
          name: SERVER_NAME,
          version: SERVER_VERSION,
          title: "MindDump — Kuber Mehta's blog",
        },
        instructions:
          "Read-only tools over the MindDump blog (kuber.studio/blog). Use search_posts or list_posts to find posts, then get_post to read one as raw markdown.",
      })
    }
    case "ping":
      return rpcResult(id, {})
    case "tools/list":
      return rpcResult(id, { tools: TOOLS })
    case "tools/call": {
      const name = msg.params?.name
      const args = msg.params?.arguments ?? {}
      try {
        const text = await callTool(name, args)
        return rpcResult(id, { content: [{ type: "text", text }], isError: false })
      } catch (err) {
        return rpcResult(id, {
          content: [{ type: "text", text: err instanceof Error ? err.message : String(err) }],
          isError: true,
        })
      }
    }
    case "resources/list":
      return rpcResult(id, { resources: [] })
    case "prompts/list":
      return rpcResult(id, { prompts: [] })
    default:
      return rpcError(id, -32601, `Method not found: ${msg.method}`)
  }
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, Mcp-Session-Id, Mcp-Protocol-Version",
  "Access-Control-Expose-Headers": "Mcp-Session-Id",
}

const LANDING = `minddump-mcp — MCP server for MindDump, the blog of Kuber Mehta

Endpoint : POST /mcp  (MCP streamable HTTP, stateless)
Tools    : list_posts, search_posts, get_post, get_blog_info
Blog     : ${BLOG}/
Index    : ${BLOG}/llms.txt

Add it to Claude Code:
  claude mcp add --transport http minddump <this-origin>/mcp
`

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS })

    if (url.pathname === "/" && request.method === "GET")
      return new Response(LANDING, {
        headers: { "Content-Type": "text/plain; charset=utf-8", ...CORS_HEADERS },
      })

    if (url.pathname !== "/mcp")
      return new Response("Not found. MCP endpoint is POST /mcp", {
        status: 404,
        headers: CORS_HEADERS,
      })

    // Stateless server: no SSE stream to offer on GET.
    if (request.method === "GET")
      return new Response(null, { status: 405, headers: { Allow: "POST", ...CORS_HEADERS } })

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return Response.json(rpcError(null, -32700, "Parse error"), {
        status: 400,
        headers: CORS_HEADERS,
      })
    }

    const messages = Array.isArray(body) ? body : [body]
    const responses = (
      await Promise.all(messages.map((m) => handleMessage(m as JsonRpcRequest)))
    ).filter((r): r is object => r !== null)

    // Pure notifications: acknowledge with 202 and no body.
    if (responses.length === 0) return new Response(null, { status: 202, headers: CORS_HEADERS })

    const payload = Array.isArray(body) ? responses : responses[0]
    return Response.json(payload, { headers: CORS_HEADERS })
  },
}
