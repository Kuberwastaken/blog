import { QuartzTransformerPlugin } from "../types"

// Turns the author's `<!-- COMPONENT ... -->` / `<!-- YOUTUBE-EMBED ... -->`
// directives into real markup at build time. The markdown source is never edited.

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const ytId = (u: string) =>
  u.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube(?:-nocookie)?\.com\/embed\/)([\w-]{6,})/,
  )?.[1]

const youtubeIframe = (id: string, title: string) =>
  `<iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/${id}" title="${esc(title)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>`

const tweetBlock = (url: string) =>
  `<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true"><a href="${esc(url)}">View post on X</a></blockquote>`

function tweetGrid(body: string): string {
  const urls = [...body.matchAll(/^\s*\d+\.\s+(https?:\/\/\S+)(?:\s+\(([^)]*)\))?/gm)]
  const cells = urls.map((m) => {
    const url = m[1]
    const label = m[2] ?? ""
    const id = ytId(url)
    if (id) {
      return `<div class="tg-cell tg-video">${youtubeIframe(id, label || "YouTube video")}</div>`
    }
    return `<div class="tg-cell tg-tweet">${tweetBlock(url)}</div>`
  })
  return `<div class="tweet-grid-2x2">${cells.join("")}</div>`
}

function blogRef(body: string): string {
  const url = body.match(/https?:\/\/\S+/)?.[0]
  if (!url) return ""
  const slug = decodeURIComponent(
    url
      .replace(/[?#].*$/, "")
      .split("/")
      .filter(Boolean)
      .pop() ?? "",
  )
  const title = slug.replace(/-/g, " ")
  const display = url.replace(/^https?:\/\//, "")
  return (
    `<div class="blog-ref-embed">` +
    `<div class="br-bar"><span class="br-dots"><i></i><i></i><i></i></span><span class="br-url">${esc(display)}</span>` +
    `<a class="br-open" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Open &#8599;</a></div>` +
    `<div class="br-frame"><iframe src="${esc(url)}" title="${esc(title)}" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>` +
    `<a class="br-overlay" href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(title)} in a new tab"></a></div>` +
    `<a class="br-card" href="${esc(url)}" target="_blank" rel="noopener noreferrer">` +
    `<span class="br-card-kicker">MindDump</span><span class="br-card-title">${esc(title)}</span><span class="br-card-cta">Read the post &#8599;</span></a>` +
    `</div>`
  )
}

export const MarkdownEmbeds: QuartzTransformerPlugin = () => ({
  name: "MarkdownEmbeds",
  textTransform(_ctx, src) {
    let s = src instanceof Buffer ? src.toString() : (src as string)
    s = s.replace(
      /<!--\s*COMPONENT\s+([\w-]+)\s*:([\s\S]*?)-->/g,
      (_m, name: string, body: string) => {
        if (name === "tweet-grid-2x2") return `\n\n${tweetGrid(body)}\n\n`
        if (name === "blog-ref-embed") return `\n\n${blogRef(body)}\n\n`
        return _m
      },
    )
    s = s.replace(
      /<!--\s*YOUTUBE-EMBED\s+(https?:\/\/\S+)([\s\S]*?)-->/g,
      (_m, url: string, rest: string) => {
        const id = ytId(url)
        if (!id) return _m
        const label = rest.match(/\(([^,)]*)/)?.[1]?.trim() || "YouTube video"
        return `\n\n${youtubeIframe(id, label)}\n\n`
      },
    )
    return s
  },
})
