import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { siteAuthor } from "../util/identity"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          © {year}{" "}
          <a href={siteAuthor.url} rel="author me">
            {siteAuthor.name}
          </a>{" "}
          ({siteAuthor.alternateName})
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li key={text}>
              {/* rel="me" marks these as the same person's profiles, which is how
                  IndieWeb/Mastodon-style identity verification is established. */}
              <a href={link} rel="me">
                {text}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
