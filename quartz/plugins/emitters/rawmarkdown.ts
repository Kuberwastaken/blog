import fs from "fs"
import { FilePath, FullSlug, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import DepGraph from "../../depgraph"

/**
 * Mirrors every content page's raw markdown source to `<slug>.md` alongside the
 * emitted HTML.
 *
 * The built HTML for a post is ~2.5x the size of its source and wraps the essay
 * in navigation, trending links and scripts — all noise to a crawler or LLM, and
 * occasionally mis-attributed as content. The source markdown *is* the post,
 * frontmatter included, so this emitter publishes it at a predictable URL:
 * append `.md` to any page URL. llms.txt advertises the convention and the page
 * `<head>` declares it via `rel="alternate"`, so nothing about the existing
 * URL structure changes.
 */

interface Options {
  /**
   * Top-level folders to leave out, mirroring LlmsTxt's default so the set of
   * markdown mirrors matches the archive the site presents as published.
   */
  excludeFolders: string[]
}

const defaultOptions: Options = {
  excludeFolders: ["BITS"],
}

function shouldEmit(slug: string, filePath: string | undefined, exclude: string[]): boolean {
  if (!filePath) return false
  if (slug === "404" || slug.startsWith("tags/")) return false
  const topFolder = slug.includes("/") ? slug.split("/")[0] : ""
  return !exclude.includes(topFolder)
}

export const RawMarkdown: QuartzEmitterPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "RawMarkdown",
    getQuartzComponents: () => [],
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()
      for (const [_tree, file] of content) {
        if (!shouldEmit(file.data.slug!, file.data.filePath, opts.excludeFolders)) continue
        graph.addEdge(
          file.data.filePath!,
          joinSegments(ctx.argv.output, file.data.slug! + ".md") as FilePath,
        )
      }
      return graph
    },
    async emit(ctx, content, _resources): Promise<FilePath[]> {
      const fps: FilePath[] = []
      for (const [_tree, file] of content) {
        const slug = file.data.slug!
        if (!shouldEmit(slug, file.data.filePath, opts.excludeFolders)) continue
        const source = await fs.promises.readFile(file.data.filePath!, "utf8")
        fps.push(await write({ ctx, slug: slug as FullSlug, ext: ".md", content: source }))
      }
      return fps
    },
  }
}
