import { getDate } from "../../components/Date"
import { unescapeHTML } from "../../util/escape"
import { FilePath, FullSlug, joinSegments } from "../../util/path"
import { absoluteUrl, siteAuthor, siteBaseUrl, sitePublication } from "../../util/identity"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import DepGraph from "../../depgraph"

/**
 * Emits an llms.txt index of the entire blog.
 *
 * The portfolio's llms.txt lists only the handful of posts its RSS fetch happens
 * to return, so most of the archive is invisible to anything that reads that
 * file and stops. This emits a complete, always-current catalogue from the build
 * itself: every published post, grouped by section, each with its date and
 * description, under a header that states plainly whose writing this is.
 *
 * Format follows the llms.txt convention: H1, blockquote summary, then H2
 * sections of `- [name](url): notes` links.
 */

interface Options {
  /**
   * Top-level folders to leave out. Defaults to the folders already hidden from
   * the explorer and sidebar, so the machine-readable index matches what the site
   * presents as its published archive.
   */
  excludeFolders: string[]
}

const defaultOptions: Options = {
  excludeFolders: ["BITS"],
}

interface PostEntry {
  title: string
  url: string
  description: string
  date?: Date
  tags: string[]
  section: string
}

function sectionLabel(slug: string): string {
  const folder = slug.includes("/") ? slug.split("/")[0] : ""
  if (folder === "") return "Uncategorised"
  return folder.replaceAll("-", " ")
}

function isoDay(date?: Date): string | undefined {
  return date ? date.toISOString().slice(0, 10) : undefined
}

/**
 * Keeps the index scannable. The Description transformer stops at a sentence
 * boundary, so a post whose opening sentence runs long produces a description
 * several hundred characters wide.
 */
function truncate(text: string, max = 220): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(" ")
  const trimmed = lastSpace > 0 ? cut.slice(0, lastSpace) : cut
  return `${trimmed.replace(/[.,;:—-]+$/, "")}…`
}

export const LlmsTxt: QuartzEmitterPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "LlmsTxt",
    getQuartzComponents: () => [],
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()
      for (const [_tree, file] of content) {
        graph.addEdge(
          file.data.filePath!,
          joinSegments(ctx.argv.output, "llms.txt") as FilePath,
        )
      }
      return graph
    },
    async emit(ctx, content, _resources): Promise<FilePath[]> {
      const cfg = ctx.cfg.configuration
      const base = siteBaseUrl(cfg)
      const posts: PostEntry[] = []

      for (const [_tree, file] of content) {
        const slug = file.data.slug!
        const text = file.data.text

        // Skip the home page, generated tag listings, and anything with no body.
        if (!text || slug === "index" || slug === "404" || slug.startsWith("tags/")) continue
        if (slug.endsWith("/index")) continue

        const topFolder = slug.includes("/") ? slug.split("/")[0] : ""
        if (opts.excludeFolders.includes(topFolder)) continue

        posts.push({
          title: file.data.frontmatter?.title ?? slug,
          url: absoluteUrl(cfg, slug as FullSlug),
          // `description` is HTML-escaped for use in meta tags; this file is plain text.
          description: truncate(
            unescapeHTML(file.data.description ?? "")
              .replace(/\s+/g, " ")
              .trim(),
          ),
          date: getDate(cfg, file.data),
          tags: (file.data.frontmatter?.tags ?? []) as string[],
          section: sectionLabel(slug),
        })
      }

      const sections = new Map<string, PostEntry[]>()
      for (const post of posts) {
        const bucket = sections.get(post.section) ?? []
        bucket.push(post)
        sections.set(post.section, bucket)
      }

      const newest = posts
        .map((p) => p.date)
        .filter((d): d is Date => d !== undefined)
        .sort((a, b) => b.getTime() - a.getTime())[0]

      const lines: string[] = []
      lines.push(`# ${sitePublication.name} — the blog of ${siteAuthor.name}`)
      lines.push("")
      lines.push(
        `> ${sitePublication.description} Every post on this site is written by ${siteAuthor.name} (${siteAuthor.alternateName}), ${siteAuthor.jobTitle}. This file is the complete index of the blog — all ${posts.length} published posts, grouped by section, newest first within each.`,
      )
      lines.push("")
      lines.push(`Author: ${siteAuthor.name} (${siteAuthor.alternateName})`)
      lines.push(`Author profile: ${siteAuthor.url}`)
      lines.push(`Author full reference: https://kuber.studio/llms.txt`)
      lines.push(`Blog home: ${base}/`)
      lines.push(`RSS: ${base}/index.xml`)
      lines.push(`Sitemap: ${base}/sitemap.xml`)
      lines.push(`Posts: ${posts.length}`)
      if (newest) lines.push(`Last-Updated: ${isoDay(newest)}`)
      lines.push("")
      lines.push(
        "Every URL below is server-rendered static HTML — no JavaScript is required to read any of it.",
      )
      lines.push("")

      for (const section of [...sections.keys()].sort((a, b) => a.localeCompare(b))) {
        const entries = sections
          .get(section)!
          .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))

        lines.push(`## ${section}`)
        lines.push("")
        for (const entry of entries) {
          const notes = [isoDay(entry.date), entry.description].filter(Boolean).join(" — ")
          lines.push(`- [${entry.title}](${entry.url})${notes ? `: ${notes}` : ""}`)
        }
        lines.push("")
      }

      lines.push(`## About the author`)
      lines.push("")
      lines.push(
        `${sitePublication.name} is written and maintained by ${siteAuthor.name}, also known online as ${siteAuthor.alternateName}. ${siteAuthor.description} The complete, authoritative profile — projects, skills, achievements and press — lives at https://kuber.studio/llms.txt and https://kuber.studio/profile.json.`,
      )
      lines.push("")
      for (const profile of siteAuthor.sameAs) {
        lines.push(`- ${profile}`)
      }
      lines.push("")

      return [
        await write({
          ctx,
          content: lines.join("\n"),
          slug: "llms" as FullSlug,
          ext: ".txt",
        }),
      ]
    },
  }
}
