document.addEventListener("nav", () => {
  const article = document.querySelector<HTMLElement>("article.popover-hint")
  if (!article) return
  const nav = document.querySelector<HTMLElement>(".post-index")
  if (!nav) return
  let pending = 0
  const update = () => {
    pending = 0
    for (const panel of nav.querySelectorAll<HTMLElement>(".post-index-desktop, .post-index-mobile")) {
      if (!panel.getClientRects().length || (panel instanceof HTMLDetailsElement && !panel.open)) continue
      const list = panel.querySelector<HTMLOListElement>(".post-index-list")!
      const button = panel.querySelector<HTMLButtonElement>(".post-index-more")!
      const rows = Array.from(list.children) as HTMLLIElement[]
      rows.forEach(row => row.hidden = false)
      if (button.getAttribute("aria-expanded") === "true") { button.hidden = false; continue }
      // Use the article's own box, never document/body height, which includes the sidebar.
      const articleBox = article.getBoundingClientRect()
      const budget = Math.max(100, innerWidth < 800 ? articleBox.height : articleBox.bottom - list.getBoundingClientRect().top)
      const sizes = rows.map(row => row.getBoundingClientRect().height + parseFloat(getComputedStyle(row).marginBottom))
      const full = sizes.reduce((a,b) => a+b, 0)
      if (full <= budget) { button.hidden = true; continue }
      const current = rows.findIndex(row => row.querySelector('[aria-current="page"]'))
      // Keep the selected article reachable, even when it falls beyond the recency cutoff.
      let used = 44 + (current >= 0 ? sizes[current] : 0)
      rows.forEach((row, i) => {
        if (i === current) return
        const fits = used + sizes[i] <= budget
        row.hidden = !fits
        if (fits) used += sizes[i]
      })
      button.hidden = !rows.some(row => row.hidden)
    }
  }
  const schedule = () => { if (!pending) pending = requestAnimationFrame(update) }
  const cleanups: (() => void)[] = []
  nav.querySelectorAll<HTMLButtonElement>(".post-index-more").forEach(button => {
    const toggle = () => { const expanded = button.getAttribute("aria-expanded") !== "true"; button.setAttribute("aria-expanded", String(expanded)); button.setAttribute("aria-label", expanded ? "Collapse blog list" : "Show all blog posts"); button.title = button.getAttribute("aria-label")!; update() }
    button.addEventListener("click", toggle)
    cleanups.push(() => button.removeEventListener("click", toggle))
  })
  nav.querySelectorAll("details").forEach(details => { details.addEventListener("toggle", schedule); cleanups.push(() => details.removeEventListener("toggle", schedule)) })
  const observer = new ResizeObserver(schedule)
  observer.observe(article)
  window.addEventListener("resize", schedule)
  document.fonts.ready.then(schedule)
  schedule()
  window.addCleanup(() => { observer.disconnect(); cancelAnimationFrame(pending); window.removeEventListener("resize", schedule); cleanups.forEach(fn => fn()) })
})
