import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { Date as PostDate } from "./Date"
import style from "./styles/postRecommendations.scss"
// @ts-ignore
import script from "./scripts/postRecommendations.inline"

export default (() => {
  const PostRecommendations: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
    const posts = allFiles.filter(p => p.slug !== "index" && !p.slug?.endsWith("/index") && !p.slug?.startsWith("BITS/") && !p.slug?.startsWith("tags/") && !p.frontmatter?.draft)
    const pinnedSlugs = [
      "AI/Claude-Code's-Entire-Source-Code-Got-Leaked-via-a-Sourcemap-in-npm,-Let's-Talk-About-it",
      "AI/all-software-is-open-source-now",
      "Projects/How-I-Managed-To-Get-Doom-In-A-QR-Code",
    ]
    const home = fileData.slug === "index"
    const currentTags = new Set(fileData.frontmatter?.tags ?? [])
    const common = (p: typeof fileData) => (p.frontmatter?.tags ?? []).filter(t => currentTags.has(t)).length
    const category = (p: typeof fileData) => p.slug?.split("/")[0]
    const sameCategory = (p: typeof fileData) => category(p) === category(fileData)
    const candidates = posts.filter(p => p.slug !== fileData.slug)
    const related = candidates.filter(p => common(p) > 0 || sameCategory(p)).sort((a,b) => common(b) - common(a) || Number(sameCategory(b)) - Number(sameCategory(a)) || (b.dates?.created?.getTime() ?? 0) - (a.dates?.created?.getTime() ?? 0) || (a.slug ?? "").localeCompare(b.slug ?? "")).slice(0,3)
    const pinned = pinnedSlugs.map(slug => posts.find(p => p.slug === slug)).filter((p): p is typeof fileData => !!p)
    const randomPool = candidates.filter(p => !related.some(r => r.slug === p.slug))
    const list = (pages: typeof posts, random = false) => <ul class={random ? "recommendation-list random-pool" : "recommendation-list"}>{pages.map((p, i) => <li hidden={random && i > 2} data-post-slug={p.slug}>
      <a class="internal" href={resolveRelative(fileData.slug!, p.slug!)}>{p.frontmatter?.title}</a>
      {p.dates?.created && <PostDate date={p.dates.created} />}
    </li>)}</ul>
    return <section class="post-recommendations" aria-label={home ? "Pinned posts" : "Post recommendations"}>
      <h3>{home ? "Pinned posts" : "Related posts"}</h3>
      {list(home ? pinned : related)}
      {!home && <details class="you-may-like"><summary>You may like</summary>{list(randomPool, true)}</details>}
    </section>
  }
  PostRecommendations.css = style
  PostRecommendations.afterDOMLoaded = script
  return PostRecommendations
}) satisfies QuartzComponentConstructor
