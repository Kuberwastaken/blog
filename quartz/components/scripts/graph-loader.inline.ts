import type { FullSlug } from "../../util/path"

type GraphApi = { renderGlobalGraph: () => void }
type GraphModule = { initGraph: (slug: FullSlug) => GraphApi }

let graphModulePromise: Promise<GraphModule> | undefined

function loadGraphModule(): Promise<GraphModule> {
  graphModulePromise ??= (
    import(new URL("static/graph.js", import.meta.url).href) as Promise<GraphModule>
  ).catch((error) => {
    graphModulePromise = undefined
    throw error
  })
  return graphModulePromise
}

document.addEventListener("nav", (e: CustomEventMap["nav"]) => {
  const slug = e.detail.url
  let disposed = false
  let graphOpening = false
  let apiPromise: Promise<GraphApi | undefined> | undefined

  const loadGraph = () => {
    apiPromise ??= loadGraphModule()
      .then((module) => {
        if (disposed) return
        removeLoaderListeners()
        return module.initGraph(slug)
      })
      .catch((error) => {
        apiPromise = undefined
        console.error("Unable to load mindmap", error)
        return undefined
      })
    return apiPromise
  }

  const graph = document.getElementById("graph-container")
  const containerIcon = document.getElementById("global-graph-icon")

  const openGlobalGraph = async () => {
    if (graphOpening) return
    graphOpening = true
    try {
      const api = await loadGraph()
      if (!disposed) api?.renderGlobalGraph()
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
    void loadGraph()
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
  function removeLoaderListeners() {
    observer?.disconnect()
    containerIcon?.removeEventListener("click", openGlobalGraph)
    document.removeEventListener("keydown", graphShortcutHandler)
  }
  window.addCleanup(() => {
    disposed = true
    removeLoaderListeners()
  })
})
