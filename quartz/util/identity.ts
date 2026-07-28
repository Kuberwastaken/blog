import { GlobalConfiguration } from "../cfg"
import { FullSlug, joinSegments, simplifySlug } from "./path"

/**
 * Single source of truth for who this site belongs to.
 *
 * Out of the box Quartz never names the author anywhere a machine can see it:
 * posts carry no `author` metadata, emit no structured data, and the footer only
 * shows a handle. A crawler or retrieval system therefore has no way to bind a
 * post to a named person — it can read the page perfectly and still not know
 * whose page it is. Every machine-readable surface (head metadata, JSON-LD, RSS,
 * llms.txt) reads from this file so they all describe the same entity.
 */
export interface SiteAuthor {
  name: string
  alternateName: string
  /** Canonical home of the person entity. */
  url: string
  /**
   * Stable JSON-LD identifier. Deliberately anchored to the portfolio origin and
   * shared with the portfolio's own Person block, so both sites are read as one
   * entity rather than two people who happen to share a name.
   */
  id: string
  jobTitle: string
  description: string
  image: string
  /** Without the leading "@". */
  twitterHandle: string
  sameAs: string[]
}

export const siteAuthor: SiteAuthor = {
  name: "Kuber Mehta",
  alternateName: "kuberwastaken",
  url: "https://kuber.studio/",
  id: "https://kuber.studio/#person",
  jobTitle: "AI Developer & Full Stack Engineer",
  description:
    "AI developer and full stack engineer from New Delhi, India. Creator of Claurst, Backdooms and TREAT, and author of the MindDump blog.",
  image: "https://kuber.studio/embed-image.png",
  twitterHandle: "Kuberwastaken",
  sameAs: [
    "https://github.com/Kuberwastaken",
    "https://www.linkedin.com/in/kubermehta/",
    "https://x.com/Kuberwastaken",
    "https://www.youtube.com/@Kuberwastaken",
    "https://kuber.studio/",
  ],
}

/** The blog itself, as a named work separate from its author. */
export interface SitePublication {
  name: string
  description: string
}

export const sitePublication: SitePublication = {
  name: "MindDump",
  description:
    "MindDump is the personal blog of Kuber Mehta — essays and notes on AI, technology, projects, and whatever else is currently stuck in his head.",
}

/** Origin + base path of the deployed site, with no trailing slash. */
export function siteBaseUrl(cfg: GlobalConfiguration): string {
  return `https://${cfg.baseUrl ?? "example.com"}`
}

/**
 * Absolute, canonical URL for a page. Uses `simplifySlug` so folder and root
 * index pages resolve to the directory URL people actually link to, rather than
 * the `.../index` form that would otherwise split link equity across two URLs.
 */
export function absoluteUrl(cfg: GlobalConfiguration, slug: FullSlug): string {
  const base = cfg.baseUrl ?? ""
  const simple = simplifySlug(slug)
  if (simple === "/" || simple === "") {
    return `https://${base}/`
  }
  return `https://${joinSegments(base, encodeURI(simple))}`
}
