document.addEventListener("nav", () => {
  const nav = document.querySelector<HTMLElement>(".post-index")
  if (!nav) return
  const cleanups: (() => void)[] = []
  for (const panel of document.querySelectorAll<HTMLElement>(".post-index-desktop, .post-index-mobile")) {
    const rows = Array.from(panel.querySelectorAll<HTMLLIElement>(".post-index-list > li"))
    const button = panel.querySelector<HTMLButtonElement>(".post-index-more")!
    const current = rows.findIndex(row => row.querySelector('[aria-current="page"]'))
    const fitSelectedDate = () => {
      const link = panel.querySelector<HTMLElement>('[aria-current="page"]')
      const title = link?.querySelector<HTMLElement>(".post-index-title")
      const date = link?.querySelector<HTMLElement>(".post-index-date")
      const time = date?.querySelector<HTMLElement>("time")
      if (!link || !title || !date || !time || !link.getBoundingClientRect().width) return
      date.classList.remove("inline-date")
      date.style.width = ""
      const dateWidth = time.getBoundingClientRect().width
      date.style.display = "none"
      const range = document.createRange()
      range.selectNodeContents(title)
      const lines = range.getClientRects()
      const last = lines[lines.length - 1]
      const room = last ? link.getBoundingClientRect().right - 10 - last.right : 0
      date.style.display = ""
      // Reserve a 10px right inset, a short 12px separator, and two 8px gaps.
      if (room >= dateWidth + 30) {
        date.classList.add("inline-date")
        date.style.width = `${Math.ceil(dateWidth + 20)}px`
      }
    }
    const update = () => {
      const expanded = button.getAttribute("aria-expanded") === "true"
      // Ten posts regardless of article length. Retain the current post within that cap.
      const limit = innerWidth < 800 ? 3 : 10
      const recentCount = current >= limit ? limit - 1 : limit
      rows.forEach((row, i) => row.hidden = !expanded && i >= recentCount && i !== current)
      button.hidden = rows.length <= (innerWidth < 800 ? 3 : 10)
      button.setAttribute("aria-label", expanded ? "Collapse blog list" : "Show all blog posts")
      button.title = button.getAttribute("aria-label")!
      fitSelectedDate()
    }
    const toggle = () => { button.setAttribute("aria-expanded", String(button.getAttribute("aria-expanded") !== "true")); update() }
    button.addEventListener("click", toggle)
    cleanups.push(() => button.removeEventListener("click", toggle))
    window.addEventListener("resize", update)
    cleanups.push(() => window.removeEventListener("resize", update))
    update()
    const observer = new ResizeObserver(fitSelectedDate)
    observer.observe(panel)
    cleanups.push(() => observer.disconnect())
    document.fonts.ready.then(() => { if (panel.isConnected) fitSelectedDate() })
  }
  window.addCleanup(() => cleanups.forEach(fn => fn()))
})
