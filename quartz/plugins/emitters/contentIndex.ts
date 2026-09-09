import { Root } from "hast"
import { GlobalConfiguration } from "../../cfg"
import { getDate } from "../../components/Date"
import { escapeHTML } from "../../util/escape"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { toHtml } from "hast-util-to-html"
import { write } from "./helpers"
import { siteAuthor, sitePublication } from "../../util/identity"
import DepGraph from "../../depgraph"

export type ContentIndex = Map<FullSlug, ContentDetails>
export type ContentDetails = {
  title: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  richContent?: string
  date?: Date
  description?: string
}

interface Options {
  enableSiteMap: boolean
  enableRSS: boolean
  rssLimit?: number
  rssFullHtml: boolean
  includeEmptyFiles: boolean
  /**
   * Top-level folders left out of the sitemap, RSS feed, and search index.
   * Mirrors the LlmsTxt/RawMarkdown default so every discovery surface hides
   * the same folders; the pages themselves still build and resolve by URL.
   */
  excludeFolders: string[]
}

const defaultOptions: Options = {
  enableSiteMap: true,
  enableRSS: true,
  rssLimit: 10,
  rssFullHtml: false,
  includeEmptyFiles: true,
  excludeFolders: ["BITS"],
}

function generateSiteMap(cfg: GlobalConfiguration, idx: ContentIndex): string {
  const base = cfg.baseUrl ?? ""
  
  const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';
  
  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => {
    const cleanSlug = slug
      .split('/')
      .map(segment => 
        segment
          .replace(/[\s\\'"\^\[\]{}()*+?.,~!@#$%^&*=]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
      )
      .join('/');
      
    const fullUrl = `https://${joinSegments(base, cleanSlug)}`;
    
    return `  <url>
    <loc>${escapeHTML(fullUrl)}</loc>${content.date ? `
    <lastmod>${content.date.toISOString()}</lastmod>` : ''}
  </url>`
  }

  const urls = Array.from(idx)
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .join("\n")

  return `${xmlDeclaration}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`
}

function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndex, limit?: number): string {
  const base = cfg.baseUrl ?? ""

  // dc:creator rather than RSS's own <author>, which requires an email address.
  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<item>
    <title>${escapeHTML(content.title)}</title>
    <link>https://${joinSegments(base, encodeURI(slug))}</link>
    <guid>https://${joinSegments(base, encodeURI(slug))}</guid>
    <dc:creator>${escapeHTML(siteAuthor.name)}</dc:creator>
    <description>${content.richContent ?? content.description}</description>${content.tags
      .map((tag) => `\n    <category>${escapeHTML(tag)}</category>`)
      .join("")}
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`

  const items = Array.from(idx)
    .sort(([_, f1], [__, f2]) => {
      if (f1.date && f2.date) {
        return f2.date.getTime() - f1.date.getTime()
      } else if (f1.date && !f2.date) {
        return -1
      } else if (!f1.date && f2.date) {
        return 1
      }

      return f1.title.localeCompare(f2.title)
    })
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .slice(0, limit ?? idx.size)
    .join("")

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>https://${base}/</link>
      <atom:link href="https://${base}/index.xml" rel="self" type="application/rss+xml" />
      <description>${escapeHTML(sitePublication.description)}</description>
      <language>${cfg.locale ?? "en-US"}</language>
      <copyright>© ${new Date().getFullYear()} ${escapeHTML(siteAuthor.name)}</copyright>
      <dc:creator>${escapeHTML(siteAuthor.name)}</dc:creator>
      <image>
        <url>${escapeHTML(siteAuthor.image)}</url>
        <title>${escapeHTML(cfg.pageTitle)}</title>
        <link>https://${base}/</link>
      </image>
      <generator>Quartz -- https://${base}/</generator>
      ${items}
    </channel>
  </rss>`
}

export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "ContentIndex",
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()

      for (const [_tree, file] of content) {
        const sourcePath = file.data.filePath!
        
        graph.addEdge(
          sourcePath,
          joinSegments(ctx.argv.output, "static/contentIndex.json") as FilePath,
        )
        if (opts?.enableSiteMap) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "sitemap.xml") as FilePath)
        }
        if (opts?.enableRSS) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "index.xml") as FilePath)
        }
      }

      return graph
    },
    async emit(ctx, content, _resources) {
      const cfg = ctx.cfg.configuration
      const emitted: FilePath[] = []
      const linkIndex: ContentIndex = new Map()

      for (const [tree, file] of content) {
        const slug = file.data.slug!
        const topFolder = slug.includes("/") ? slug.split("/")[0] : ""
        if (opts?.excludeFolders?.includes(topFolder)) continue
        const date = getDate(ctx.cfg.configuration, file.data) ?? new Date()

        if (opts?.includeEmptyFiles || (file.data.text && file.data.text !== "")) {
          linkIndex.set(slug, {
            title: file.data.frontmatter?.title!,
            links: file.data.links ?? [],
            tags: file.data.frontmatter?.tags ?? [],
            content: "",
            richContent: opts?.rssFullHtml
              ? escapeHTML(toHtml(tree as Root, { allowDangerousHtml: true }))
              : undefined,
            date: date,
            description: file.data.description ?? "",
          })
        }
      }

      if (opts?.enableSiteMap) {
        emitted.push(
          await write({
            ctx,
            content: generateSiteMap(cfg, linkIndex),
            slug: "sitemap" as FullSlug,
            ext: ".xml",
          }),
        )
      }

      if (opts?.enableRSS) {
        emitted.push(
          await write({
            ctx,
            content: generateRSSFeed(cfg, linkIndex, opts.rssLimit),
            slug: "index" as FullSlug,
            ext: ".xml",
          }),
        )
      }

      const fp = joinSegments("static", "contentIndex") as FullSlug
      const simplifiedIndex = Object.fromEntries(
        Array.from(linkIndex).map(([slug, content]) => {
          delete content.description
          delete content.date
          return [slug, content]
        }),
      )

      emitted.push(
        await write({
          ctx,
          content: JSON.stringify(simplifiedIndex),
          slug: fp,
          ext: ".json",
        }),
      )

      return emitted
    },
    getQuartzComponents: () => [],
  }
}
