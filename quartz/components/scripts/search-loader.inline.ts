import type { FullSlug } from "../../util/path"

type SearchType = "basic" | "tags"
type SearchApi = { showSearch: (searchType: SearchType) => void }
type SearchModule = { initSearch: (slug: FullSlug) => SearchApi }

let searchModule: SearchModule | undefined
let searchModulePromise: Promise<SearchApi> | undefined
let searchApi: SearchApi | undefined
let searchOpening = false

async function loadSearch(slug: FullSlug): Promise<SearchApi> {
  if (!searchModule) {
    searchModulePromise ??= (
      import(new URL("static/search.js", import.meta.url).href) as Promise<SearchModule>
    ).then((module) => {
      searchModule = module
      // Use the current page in case an SPA navigation happened while loading.
      searchApi = module.initSearch(document.body.dataset.slug as FullSlug)
      return searchApi
    })
    return searchModulePromise
  }
  searchApi = searchModule.initSearch(slug)
  return searchApi
}

document.addEventListener("nav", (e: CustomEventMap["nav"]) => {
  const slug = e.detail.url
  if (searchModule) {
    searchApi = searchModule.initSearch(slug)
    return
  }

  const searchButton = document.getElementById("search-button")
  const searchBar = document.getElementById("search-bar") as HTMLInputElement | null

  const openSearch = async (searchType: SearchType) => {
    if (searchOpening) return
    searchOpening = true
    try {
      const api = await loadSearch(slug)
      searchButton?.removeEventListener("click", openBasicSearch)
      document.removeEventListener("keydown", searchShortcutHandler)
      api.showSearch(searchType)
      if (searchType === "tags" && searchBar) searchBar.value = "#"
    } finally {
      searchOpening = false
    }
  }

  const openBasicSearch = () => void openSearch("basic")
  const searchShortcutHandler = (event: HTMLElementEventMap["keydown"]) => {
    if (event.key === "k" && (event.ctrlKey || event.metaKey) && !event.shiftKey) {
      event.preventDefault()
      void openSearch("basic")
    } else if (
      event.shiftKey &&
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault()
      void openSearch("tags")
    }
  }

  searchButton?.addEventListener("click", openBasicSearch)
  document.addEventListener("keydown", searchShortcutHandler)
  window.addCleanup(() => {
    searchButton?.removeEventListener("click", openBasicSearch)
    document.removeEventListener("keydown", searchShortcutHandler)
  })
})
