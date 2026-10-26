import type { FullSlug } from "../../util/path"

type GraphApi = { renderGlobalGraph: () => void }
type GraphModule = { initGraph: (slug: FullSlug) => GraphApi }

let graphModule: GraphModule | undefined
let graphModulePromise: Promise<GraphApi> | undefined
let graphApi: GraphApi | undefined
let graphOpening = false

async function loadGraph(slug: FullSlug): Promise<GraphApi> {
  if (!graphModule) {
    graphModulePromise ??= (
      import(new URL("static/graph.js", import.meta.url).href) as Promise<GraphModule>
    ).then((module) => {
      graphModule = module
      // Use the current page in case an SPA navigation happened while loading.
      graphApi = module.initGraph(document.body.dataset.slug as FullSlug)
      return graphApi
    })
    return graphModulePromise
  }
  graphApi = graphModule.initGraph(slug)
  return graphApi
}

document.addEventListener("nav", (e: CustomEventMap["nav"]) => {
  const slug = e.detail.url
  if (graphModule) {
    graphApi = graphModule.initGraph(slug)
    return
  }

  const graph = document.getElementById("graph-container")
  const containerIcon = document.getElementById("global-graph-icon")

  const openGlobalGraph = async () => {
    if (graphOpening) return
    graphOpening = true
    try {
      const api = await loadGraph(slug)
      observer?.disconnect()
      containerIcon?.removeEventListener("click", openGlobalGraph)
      document.removeEventListener("keydown", graphShortcutHandler)
      api.renderGlobalGraph()
    } finally {
      graphOpening = false
    }
  }

  const graphShortcutHandler = (event: HTMLElementEventMap["keydown"]) => {
    if (event.key === "g" && (event.ctrlKey || event.metaKey) && !event.shiftKey) {
      event.preventDefault()
      void openGlobalGraph()
    }
  }

  const loadLocalGraph = () => {
    observer?.disconnect()
    void loadGraph(slug)
  }

  let observer: IntersectionObserver | undefined
  if (graph) {
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) loadLocalGraph()
        },
        { rootMargin: "200px" },
      )
      observer.observe(graph)
    } else {
      loadLocalGraph()
    }
  }

  containerIcon?.addEventListener("click", openGlobalGraph)
  document.addEventListener("keydown", graphShortcutHandler)
  window.addCleanup(() => {
    observer?.disconnect()
    containerIcon?.removeEventListener("click", openGlobalGraph)
    document.removeEventListener("keydown", graphShortcutHandler)
  })
})
