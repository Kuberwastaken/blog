import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { Date as PostDate } from "./Date"
import style from "./styles/postIndex.scss"

export default (() => {
  const PostIndex: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
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
        const time = (page: typeof a) => page.dates?.created?.getTime() ?? 0
        return (
          time(b) - time(a) ||
          (a.frontmatter?.title ?? "").localeCompare(b.frontmatter?.title ?? "")
        )
      })
    const list = () => (
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
              {post.dates?.created && <PostDate date={post.dates.created} />}
            </a>
          </li>
        ))}
      </ol>
    )
    return (
      <nav class="post-index" aria-label="All blog posts, newest first">
        <div class="post-index-desktop">
          <h2>Blogs</h2>

          {list()}
        </div>
        <details class="post-index-mobile">
          <summary>
            Blogs
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </summary>

          {list()}
        </details>
      </nav>
    )
  }
  PostIndex.css = style
  return PostIndex
}) satisfies QuartzComponentConstructor
