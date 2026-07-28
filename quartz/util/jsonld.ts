import { GlobalConfiguration } from "../cfg"
import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug } from "./path"
import { absoluteUrl, siteAuthor, siteBaseUrl, sitePublication } from "./identity"

/**
 * Schema.org JSON-LD for every page Quartz emits.
 *
 * This is the piece that actually attributes the writing. Search engines and AI
 * answer engines resolve entities from structured data far more reliably than
 * from prose, so a first-person essay that never spells out its author is
 * effectively anonymous to them. Emitting `BlogPosting -> author -> Person`,
 * with the Person `@id` shared with the portfolio, is what turns a pile of
 * standalone posts into a corpus attributable to one named human.
 */

type JsonLdNode = Record<string, unknown>

export type PageKind = "article" | "collection" | "home" | "other"

/**
 * Quartz reuses one Head component for real notes, generated tag/folder listings
 * and the 404 page. Only pages backed by an actual markdown file are articles;
 * the generated listings are synthesised with no `filePath`.
 */
export function classifyPage(fileData: QuartzPluginData): PageKind {
  const slug = fileData.slug ?? ""
  if (slug === "index") return "home"
  if (slug === "404") return "other"
  if (slug.startsWith("tags/") || slug.endsWith("/index")) return "collection"
  if (fileData.filePath && fileData.text) return "article"
  return "other"
}

/**
 * `modified` is only trustworthy when it came from frontmatter. The configured
 * fallback is the filesystem mtime, which in CI is the checkout time — emitting
 * that as `dateModified` would tell crawlers every post was rewritten on every
 * deploy, which is worse than saying nothing at all.
 */
function explicitModifiedDate(fileData: QuartzPluginData): Date | undefined {
  const raw = fileData.frontmatter?.modified
  if (raw === undefined || raw === null || raw === "") return undefined
  const parsed = new Date(raw as string)
  return isNaN(parsed.getTime()) ? undefined : parsed
}

function personNode(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": siteAuthor.id,
    name: siteAuthor.name,
    alternateName: siteAuthor.alternateName,
    url: siteAuthor.url,
    image: siteAuthor.image,
    jobTitle: siteAuthor.jobTitle,
    description: siteAuthor.description,
    sameAs: siteAuthor.sameAs,
  }
}

function blogNode(cfg: GlobalConfiguration): JsonLdNode {
  const base = siteBaseUrl(cfg)
  return {
    "@type": "Blog",
    "@id": `${base}/#blog`,
    name: sitePublication.name,
    alternateName: cfg.pageTitle,
    url: `${base}/`,
    description: sitePublication.description,
    inLanguage: cfg.locale ?? "en-US",
    author: { "@id": siteAuthor.id },
    creator: { "@id": siteAuthor.id },
    publisher: { "@id": siteAuthor.id },
  }
}

/** Mirrors the visible breadcrumb trail so the folder hierarchy is machine-readable. */
function breadcrumbNode(cfg: GlobalConfiguration, slug: FullSlug): JsonLdNode | undefined {
  const segments = slug
    .split("/")
    .filter((s) => s !== "" && s !== "index")
    .slice(0, -1)

  const base = siteBaseUrl(cfg)
  const items: JsonLdNode[] = [
    { "@type": "ListItem", position: 1, name: sitePublication.name, item: `${base}/` },
  ]

  let walked = ""
  for (const segment of segments) {
    walked = walked === "" ? segment : `${walked}/${segment}`
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: segment.replaceAll("-", " "),
      item: `${base}/${encodeURI(walked)}/`,
    })
  }

  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: (slug.split("/").pop() ?? "").replaceAll("-", " "),
    item: absoluteUrl(cfg, slug),
  })

  return items.length > 1 ? { "@type": "BreadcrumbList", itemListElement: items } : undefined
}

interface JsonLdOptions {
  title: string
  description: string
  image: string
}

export function buildJsonLd(
  cfg: GlobalConfiguration,
  fileData: QuartzPluginData,
  { title, description, image }: JsonLdOptions,
): JsonLdNode {
  const slug = (fileData.slug ?? "") as FullSlug
  const url = absoluteUrl(cfg, slug)
  const kind = classifyPage(fileData)
  const language = cfg.locale ?? "en-US"
  const graph: JsonLdNode[] = [personNode(), blogNode(cfg)]

  if (kind === "article") {
    const published = fileData.dates?.created
    const modified = explicitModifiedDate(fileData)
    const tags = (fileData.frontmatter?.tags ?? []) as string[]
    const section = slug.includes("/") ? slug.split("/")[0].replaceAll("-", " ") : undefined
    const wordCount = fileData.text?.split(/\s+/).filter(Boolean).length

    const article: JsonLdNode = {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      isPartOf: { "@id": `${siteBaseUrl(cfg)}/#blog` },
      mainEntityOfPage: url,
      url,
      headline: title,
      name: title,
      description,
      image,
      inLanguage: language,
      author: { "@id": siteAuthor.id },
      creator: { "@id": siteAuthor.id },
      publisher: { "@id": siteAuthor.id },
      copyrightHolder: { "@id": siteAuthor.id },
    }

    if (published) article.datePublished = published.toISOString()
    // Absent an explicit frontmatter value, restate the publish date rather than
    // leak the build timestamp — consumers treat a missing dateModified as stale.
    article.dateModified = (modified ?? published)?.toISOString()
    if (tags.length > 0) article.keywords = tags
    if (section) article.articleSection = section
    if (wordCount) article.wordCount = wordCount

    graph.push(article)
  } else {
    graph.push({
      "@type": kind === "collection" ? "CollectionPage" : "WebPage",
      "@id": `${url}#webpage`,
      isPartOf: { "@id": `${siteBaseUrl(cfg)}/#blog` },
      url,
      name: title,
      description,
      inLanguage: language,
      about: { "@id": siteAuthor.id },
      author: { "@id": siteAuthor.id },
      publisher: { "@id": siteAuthor.id },
    })
  }

  if (kind !== "home" && kind !== "other") {
    const crumbs = breadcrumbNode(cfg, slug)
    if (crumbs) graph.push(crumbs)
  }

  return { "@context": "https://schema.org", "@graph": graph }
}

/**
 * Serialise for inlining in a `<script>` tag. Escaping `<` is what prevents a
 * `</script>` sequence inside a post description from terminating the block.
 */
export function serializeJsonLd(node: JsonLdNode): string {
  return JSON.stringify(node).replace(/</g, "\\u003c")
}
