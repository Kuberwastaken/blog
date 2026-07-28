import { FilePath, FullSlug } from "../../util/path"
import { siteAuthor, siteBaseUrl } from "../../util/identity"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

/**
 * Emits robots.txt as part of the build.
 *
 * A hand-placed `public/robots.txt` cannot survive here: `quartz build` rimrafs
 * the output directory before emitting, so the committed copy was deleted on
 * every deploy and the deployed path returned 404. Generating it as an emitter
 * is the only way a robots.txt at this path stays live.
 *
 * Note this file sits at `<baseUrl>/robots.txt`, not the origin root. Crawlers
 * only honour the origin-root copy, so the authoritative rules still live in the
 * portfolio repo's robots.txt — this one exists so the path resolves, and so the
 * blog's sitemap and llms.txt are discoverable from within the blog itself.
 */

interface Options {
  /** Paths (relative to the site base) to keep out of crawler indexes. */
  disallow: string[]
}

const defaultOptions: Options = {
  disallow: ["/BITS/"],
}

export const RobotsTxt: QuartzEmitterPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "RobotsTxt",
    getQuartzComponents: () => [],
    async emit(ctx, _content, _resources): Promise<FilePath[]> {
      const cfg = ctx.cfg.configuration
      const base = siteBaseUrl(cfg)
      const basePath = new URL(base).pathname.replace(/\/$/, "")

      const lines = [
        `# ${cfg.pageTitle} — writing by ${siteAuthor.name} (${siteAuthor.alternateName}).`,
        "# All of it is public. Search engines, AI search and AI training crawlers are all welcome.",
        "#",
        `# Index of every post (llms.txt format): ${base}/llms.txt`,
        `# Author reference:                      https://kuber.studio/llms.txt`,
        "",
        "User-agent: *",
        "Allow: /",
        ...opts.disallow.flatMap((path) => [
          `Disallow: ${path}`,
          // Also spelled with the base path, since this site is served from a subdirectory.
          ...(basePath ? [`Disallow: ${basePath}${path}`] : []),
        ]),
        "",
        `Sitemap: ${base}/sitemap.xml`,
        "",
      ]

      return [
        await write({
          ctx,
          content: lines.join("\n"),
          slug: "robots" as FullSlug,
          ext: ".txt",
        }),
      ]
    },
  }
}
