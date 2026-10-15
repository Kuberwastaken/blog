import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { Date as PostDate } from "./Date"
// @ts-ignore
import script from "./scripts/postIndex.inline"
import style from "./styles/postIndex.scss"

export default (() => {
  const PostIndex: QuartzComponent = ({ allFiles, fileData, displayClass }: QuartzComponentProps) => {
    const posts = allFiles
      .filter((page) => {
        const slug = page.slug ?? ""
        return (
          slug !== "index" &&
          !slug.endsWith("/index") &&
          !slug.startsWith("BITS/") &&
          !slug.startsWith("tags/") &&
          !page.frontmatter?.draft
        )
      })
      .sort((a, b) => {
        const hello = "Social-Media/Hello-World"
        if (a.slug === hello || b.slug === hello) return Number(a.slug === hello) - Number(b.slug === hello)
        const time = (page: typeof a) => page.dates?.created?.getTime() ?? 0
        return (
          time(b) - time(a) ||
          (a.frontmatter?.title ?? "").localeCompare(b.frontmatter?.title ?? "")
        )
      })
    const list = () => (
      <>
      <ol class="post-index-list">
        {posts.map((post) => (
          <li>
            <a
              class="internal"
              data-no-popover="true"
              href={resolveRelative(fileData.slug!, post.slug!)}
              aria-current={post.slug === fileData.slug ? "page" : undefined}
            >
              <span>{post.frontmatter?.title}</span>
              {post.slug === fileData.slug && post.dates?.created && <PostDate date={post.dates.created} />}
            </a>
          </li>
        ))}
      </ol>
      <button class="post-index-more" type="button" hidden aria-expanded="false" aria-label="Show all blog posts" title="Show all blog posts"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20"><path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.5" /></svg></button>
      </>
    )
    return (
      <nav class={["post-index", displayClass].filter(Boolean).join(" ")} aria-label="All blog posts, newest first">
        <div class="post-index-desktop">
          <h2>Blogs</h2>

          {list()}
        </div>
        <div class="post-index-mobile">
          <h2>Blogs</h2>
          {list()}
        </div>
      </nav>
    )
  }
  PostIndex.afterDOMLoaded = script
  PostIndex.css = style
  return PostIndex
}) satisfies QuartzComponentConstructor
