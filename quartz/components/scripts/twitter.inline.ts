declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (element?: HTMLElement) => void
      }
      ready: (callback: () => void) => void
    }
  }
}

let twitterScriptLoaded = false

const currentTheme = () =>
  document.documentElement.getAttribute("saved-theme") === "light" ? "light" : "dark"

function loadTwitterWidgets() {
  const tweets = document.querySelectorAll<HTMLElement>(".twitter-tweet:not([data-twitter-rendered])")
  if (tweets.length === 0) return

  // Mark tweets as being processed to avoid double-loading, and pin the
  // embed theme to the site's current theme (light or dark)
  tweets.forEach((tweet) => {
    tweet.setAttribute("data-twitter-rendered", "true")
    tweet.setAttribute("data-theme", currentTheme())
  })

  if (!twitterScriptLoaded) {
    // Load the Twitter widgets script
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    script.charset = "utf-8"
    script.onload = () => {
      twitterScriptLoaded = true
      // Twitter's script auto-initializes, but we call ready to ensure it's done
      if (window.twttr && window.twttr.ready) {
        window.twttr.ready(() => {
          window.twttr.widgets.load()
        })
      }
    }
    document.body.appendChild(script)
  } else if (window.twttr && window.twttr.widgets) {
    // Script already loaded, just re-render widgets
    window.twttr.widgets.load()
  }
}

// Re-render embeds when the site theme changes so they follow it
function rethemeTweets() {
  if (!twitterScriptLoaded || !window.twttr || !window.twttr.widgets) return

  const rendered = document.querySelectorAll<HTMLElement>(
    ".twitter-tweet[data-twitter-rendered], iframe.twitter-tweet",
  )
  rendered.forEach((el) => {
    // widgets.js replaces the blockquote with an iframe; recover the tweet URL either way
    let url = el.querySelector?.("a[href]")?.getAttribute("href") ?? ""
    if (!url && el.tagName === "IFRAME") {
      const id = (el.getAttribute("src") ?? "").match(/[?&]id=(\d+)/)?.[1]
      if (id) url = `https://twitter.com/i/web/status/${id}`
    }
    if (!url) return

    const fresh = document.createElement("blockquote")
    fresh.className = "twitter-tweet"
    fresh.setAttribute("data-twitter-rendered", "true")
    fresh.setAttribute("data-theme", currentTheme())
    const a = document.createElement("a")
    a.href = url
    a.textContent = "View Tweet"
    fresh.appendChild(a)
    el.replaceWith(fresh)
  })

  window.twttr.widgets.load()
}

document.addEventListener("themechange", () => {
  setTimeout(rethemeTweets, 50)
})

// Run on SPA navigation
document.addEventListener("nav", () => {
  setTimeout(loadTwitterWidgets, 100)
})

// Also run on initial DOMContentLoaded for non-SPA loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadTwitterWidgets)
} else {
  loadTwitterWidgets()
}
