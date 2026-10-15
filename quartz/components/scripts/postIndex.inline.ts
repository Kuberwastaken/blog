document.addEventListener("nav", () => {
  const nav = document.querySelector<HTMLElement>(".post-index")
  if (!nav) return
  const cleanups: (() => void)[] = []
  for (const panel of document.querySelectorAll<HTMLElement>(".post-index-desktop, .post-index-mobile")) {
    const rows = Array.from(panel.querySelectorAll<HTMLLIElement>(".post-index-list > li"))
    const button = panel.querySelector<HTMLButtonElement>(".post-index-more")!
    const current = rows.findIndex(row => row.querySelector('[aria-current="page"]'))
    const update = () => {
      const expanded = button.getAttribute("aria-expanded") === "true"
      // Ten posts regardless of article length. Retain the current post within that cap.
      const limit = innerWidth < 800 ? 3 : 10
      const recentCount = current >= limit ? limit - 1 : limit
      rows.forEach((row, i) => row.hidden = !expanded && i >= recentCount && i !== current)
      button.hidden = rows.length <= (innerWidth < 800 ? 3 : 10)
      button.setAttribute("aria-label", expanded ? "Collapse blog list" : "Show all blog posts")
      button.title = button.getAttribute("aria-label")!
    }
    const toggle = () => { button.setAttribute("aria-expanded", String(button.getAttribute("aria-expanded") !== "true")); update() }
    button.addEventListener("click", toggle)
    cleanups.push(() => button.removeEventListener("click", toggle))
    window.addEventListener("resize", update)
    cleanups.push(() => window.removeEventListener("resize", update))
    update()
  }
  window.addCleanup(() => cleanups.forEach(fn => fn()))
})
