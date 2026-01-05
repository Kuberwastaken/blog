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

function loadTwitterWidgets() {
  const tweets = document.querySelectorAll(".twitter-tweet:not([data-twitter-rendered])")
  if (tweets.length === 0) return

  // Mark tweets as being processed to avoid double-loading
  tweets.forEach((tweet) => tweet.setAttribute("data-twitter-rendered", "true"))

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
