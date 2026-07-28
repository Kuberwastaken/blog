import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { siteAuthor } from "../util/identity"

interface Options {
  /** Overrides `pageTitle` from the config for the sidebar heading only. */
  text: string
  /**
   * Byline shown under the site title, rendered as a link to the author. Puts the
   * author's name in anchor text on every page instead of only in the footer.
   */
  subtext: string
}

export default ((opts?: Partial<Options>) => {
  const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
    const title = opts?.text ?? cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
    const baseDir = pathToRoot(fileData.slug!)
    return (
      <>
        <h2 class={classNames(displayClass, "page-title")}>
          <a href={baseDir}>{title}</a>
        </h2>
        {opts?.subtext && (
          <p class={classNames(displayClass, "page-subtitle")}>
            <a href={siteAuthor.url} rel="author">
              {opts.subtext}
            </a>
          </p>
        )}
      </>
    )
  }

  PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
}

.page-subtitle {
  margin: 0.15rem 0 0 0;
  font-size: 0.9rem;
  color: var(--gray);
}

.page-subtitle a {
  color: inherit;
  text-decoration: none;
  background-color: transparent;
}

.page-subtitle a:hover {
  color: var(--secondary);
}
`

  return PageTitle
}) satisfies QuartzComponentConstructor
