document.addEventListener("nav", () => {
  for (const details of document.querySelectorAll<HTMLDetailsElement>("details.you-may-like")) {
    details.open = false
    const rows = Array.from(details.querySelectorAll<HTMLLIElement>(".random-pool > li"))
    for (let i = rows.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[rows[i], rows[j]] = [rows[j], rows[i]]
    }
    rows.forEach((row, i) => {
      row.hidden = i >= 3
      row.parentElement?.appendChild(row)
    })
  }
})
