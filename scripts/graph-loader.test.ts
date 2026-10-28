import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"
import { runInNewContext } from "node:vm"
import { transformSync } from "esbuild"

const source = readFileSync("quartz/components/scripts/graph-loader.inline.ts", "utf8").replace(
  'import(new URL("static/graph.js", import.meta.url).href)',
  "loadModule()",
)
const code = transformSync(source, { loader: "ts" }).code
const flush = () => new Promise((resolve) => setImmediate(resolve))

function fixture() {
  const document = new EventTarget()
  const icon = new EventTarget()
  const cleanups: (() => void)[] = []
  const observers: { fire: () => void; disconnected: boolean }[] = []
  const initialized: string[] = []
  let opens = 0
  let resolveModule!: (value: unknown) => void
  const modulePromise = new Promise((resolve) => (resolveModule = resolve))
  const module = {
    initGraph(slug: string) {
      initialized.push(slug)
      const renderGlobalGraph = () => opens++
      icon.addEventListener("click", renderGlobalGraph)
      cleanups.push(() => icon.removeEventListener("click", renderGlobalGraph))
      return { renderGlobalGraph }
    },
  }
  class IntersectionObserver {
    disconnected = false
    constructor(private callback: (entries: unknown[]) => void) {
      observers.push(this)
    }
    observe() {}
    disconnect() {
      this.disconnected = true
    }
    fire() {
      if (!this.disconnected) this.callback([{ isIntersecting: true }])
    }
  }
  Object.assign(document, {
    getElementById: (id: string) => (id === "global-graph-icon" ? icon : {}),
  })
  runInNewContext(code, {
    document,
    console,
    IntersectionObserver,
    window: { IntersectionObserver, addCleanup: (fn: () => void) => cleanups.push(fn) },
    loadModule: () => modulePromise,
  })
  const nav = (slug: string) => {
    cleanups.splice(0).forEach((fn) => fn())
    const event = new Event("nav")
    Object.assign(event, { detail: { url: slug } })
    document.dispatchEvent(event)
  }
  return {
    nav,
    observers,
    initialized,
    icon,
    resolve: () => resolveModule(module),
    opens: () => opens,
  }
}

test("visible local graph hands clicks to one initialized graph", async () => {
  const f = fixture()
  f.nav("index")
  f.observers[0].fire()
  f.resolve()
  await flush()
  f.icon.dispatchEvent(new Event("click"))
  await flush()
  assert.deepEqual(f.initialized, ["index"])
  assert.equal(f.opens(), 1)
})

test("concurrent visibility and repeated clicks share one load", async () => {
  const f = fixture()
  f.nav("index")
  f.observers[0].fire()
  f.icon.dispatchEvent(new Event("click"))
  f.icon.dispatchEvent(new Event("click"))
  f.resolve()
  await flush()
  assert.deepEqual(f.initialized, ["index"])
  assert.equal(f.opens(), 1)
})

test("navigation cancels a pending open and keeps the next page lazy", async () => {
  const f = fixture()
  f.nav("old")
  f.icon.dispatchEvent(new Event("click"))
  f.nav("new")
  f.resolve()
  await flush()
  assert.deepEqual(f.initialized, [])
  assert.equal(f.opens(), 0)
  f.observers[1].fire()
  await flush()
  assert.deepEqual(f.initialized, ["new"])
  f.icon.dispatchEvent(new Event("click"))
  await flush()
  assert.equal(f.opens(), 1)
})
