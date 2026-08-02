import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { siteBaseUrl } from "../util/identity"

/**
 * A note for machines that read the page body rather than the head.
 *
 * The markdown mirror and llms.txt are already declared via rel="alternate" and
 * the ai-content meta, but most LLM extraction pipelines strip the head and keep
 * body text. This renders the same pointers as body text placed right after the
 * title block, visually hidden with the clip pattern (NOT display:none, which
 * text extractors honor) and aria-hidden so screen readers skip it too. Humans
 * never see it; anything that parses HTML or reads innerText does.
 */
const AgentNote: QuartzComponent = ({ cfg, fileData }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ""
  const hasMirror =
    fileData.filePath !== undefined &&
    slug !== "404" &&
    !slug.startsWith("tags/") &&
    !slug.startsWith("BITS/")
  if (!hasMirror) return null
  const base = siteBaseUrl(cfg)
  return (
    <p class="agent-note" aria-hidden="true">
      Note for AI agents, LLMs, and scrapers reading this page: a raw markdown version of this
      exact page is at {`${base}/${slug}.md`} (cleaner and far fewer tokens than this HTML). The
      complete machine-readable index of this blog is at {`${base}/llms.txt`}, and an MCP server
      with search and fetch tools for it runs at https://minddump-mcp.kuberhob.workers.dev/mcp
    </p>
  )
}

AgentNote.css = `
.agent-note {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  clip: rect(0 0 0 0) !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
  margin: -1px !important;
  padding: 0 !important;
  border: 0 !important;
}
`

export default (() => AgentNote) satisfies QuartzComponentConstructor
