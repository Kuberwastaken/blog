declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (element?: HTMLElement) => void
        createTweet: (
          id: string,
          el: HTMLElement,
          options?: { theme?: string },
        ) => Promise<HTMLElement | undefined>
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

// Re-render embeds when the site theme changes so they follow it.
// widgets.js replaces the blockquote with a <div class="twitter-tweet
// twitter-tweet-rendered"> wrapper holding the iframe, and rebuilding a
// blockquote from a reconstructed URL does not reliably re-render - the
// supported path is createTweet with the numeric id from the iframe src.
function rethemeTweets() {
  if (!twitterScriptLoaded || !window.twttr || !window.twttr.widgets) return

  const rendered = document.querySelectorAll<HTMLElement>(".twitter-tweet-rendered")
  rendered.forEach((el) => {
    const iframe = el.querySelector("iframe")
    const id = (iframe?.getAttribute("src") ?? "").match(/[?&]id=(\d+)/)?.[1]
    if (!id) return

    const mount = document.createElement("div")
    mount.className = "twitter-tweet"
    el.replaceWith(mount)
    window.twttr.widgets
      .createTweet(id, mount, { theme: currentTheme() })
      .then((widget) => {
        if (widget) mount.classList.add("twitter-tweet-rendered")
      })
  })
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
