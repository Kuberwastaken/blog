import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import Search from "./Search"
import Darkmode from "./Darkmode"

export default (() => {
  const SearchComponent = Search()
  const ThemeComponent = Darkmode()
  const SearchControls: QuartzComponent = (props: QuartzComponentProps) => <div class="search-controls"><SearchComponent {...props} /><ThemeComponent {...props} /></div>
  SearchControls.beforeDOMLoaded = ThemeComponent.beforeDOMLoaded
  SearchControls.afterDOMLoaded = SearchComponent.afterDOMLoaded
  SearchControls.css = [SearchComponent.css, ThemeComponent.css, `
.search-controls { display: flex; align-items: center; gap: 14px; min-width: 0; width: 100%; }
.search-controls > .search { flex: 1 1 auto; min-width: 0; }
.search-controls > .darkmode { flex: 0 0 32px; width: 32px; height: 32px; margin: 0; display: block; }
.search-controls > .darkmode svg { left: 6px; top: 6px; }
@media (max-width: 800px) {
  .search-controls { flex: 0 0 auto; width: auto; margin-left: 8px; }
  .search-controls > .search { flex: 0 0 36px; min-width: 36px; width: 36px; }
  .search-controls .search-button { width: 36px; background: transparent; justify-content: center; }
  .search-controls .search-button > p { display: none; }
}
`].join("\n")
  return SearchControls
}) satisfies QuartzComponentConstructor
