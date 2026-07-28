#!/usr/bin/env node
/**
 * Post-build assertions for the machine-readable surfaces.
 *
 * Everything checked here is produced by emitters at build time, so it is
 * regenerated on every deploy rather than committed. The risk is not staleness
 * but silence: esbuild strips types without checking them, and an emitter that
 * stops running, throws, or gets dropped from quartz.config.ts would still leave
 * a build that "succeeds" while quietly shipping pages that no longer say who
 * wrote them. This turns that into a failed deploy.
 *
 * Deliberately structural — it asserts that authorship exists, is internally
 * consistent, and is wired together, without hardcoding a name. Renaming the
 * author in quartz/util/identity.ts must not require editing this file.
 *
 * Usage: node scripts/verify-machine-readable.mjs [outputDir]
 */

import fs from "fs"
import path from "path"

const outputDir = process.argv[2] ?? "public"
const failures = []
const notes = []

function fail(message) {
  failures.push(message)
}

function walk(dir) {
  const found = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) found.push(...walk(full))
    else found.push(full)
  }
  return found
}

if (!fs.existsSync(outputDir)) {
  console.error(`✗ output directory '${outputDir}' does not exist — did the build run?`)
  process.exit(1)
}

const allFiles = walk(outputDir)
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"))

if (htmlFiles.length === 0) fail("no HTML pages were emitted")

// ---------------------------------------------------------------- emitted files

for (const required of ["llms.txt", "robots.txt", "sitemap.xml", "index.xml"]) {
  const fp = path.join(outputDir, required)
  if (!fs.existsSync(fp)) {
    fail(`${required} was not emitted`)
  } else if (fs.statSync(fp).size === 0) {
    fail(`${required} is empty`)
  }
}

// ------------------------------------------------------------------- llms.txt

const llmsPath = path.join(outputDir, "llms.txt")
let llmsEntries = []
if (fs.existsSync(llmsPath)) {
  const llms = fs.readFileSync(llmsPath, "utf8")
  llmsEntries = [...llms.matchAll(/^- \[([^\]]+)\]\((https?:\/\/[^)]+)\)/gm)].map((m) => ({
    title: m[1],
    url: m[2],
  }))

  if (llmsEntries.length === 0) {
    fail("llms.txt lists no posts — the index is present but useless")
  }
  if (!/^## /m.test(llms)) {
    fail("llms.txt has no section headings")
  }

  // Every advertised URL must correspond to a page that was actually emitted.
  // Catches slug drift and URL-encoding mistakes, which would otherwise ship as
  // an index full of 404s that only a crawler would ever notice.
  const base = llmsEntries.length ? new URL(llmsEntries[0].url) : null
  const basePath = base ? base.pathname.replace(/\/[^/]*$/, "") : ""
  let broken = 0
  for (const entry of llmsEntries) {
    const rel = decodeURI(new URL(entry.url).pathname)
      .replace(new RegExp(`^${basePath.split("/").slice(0, 2).join("/")}/?`), "")
      .replace(/\/$/, "")
    const candidates = [
      path.join(outputDir, `${rel}.html`),
      path.join(outputDir, rel, "index.html"),
    ]
    if (!candidates.some((c) => fs.existsSync(c))) {
      broken++
      if (broken <= 3) fail(`llms.txt links a page that was not emitted: ${entry.url}`)
    }
  }
  if (broken > 3) fail(`...and ${broken - 3} further llms.txt links with no emitted page`)
}

// ------------------------------------------------------------------ robots.txt

const robotsPath = path.join(outputDir, "robots.txt")
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, "utf8")
  if (!/^Sitemap:\s*https?:\/\/\S+/m.test(robots)) fail("robots.txt declares no Sitemap")
  if (!/^User-agent:/m.test(robots)) fail("robots.txt has no User-agent group")
}

// ------------------------------------------------------------------------ RSS

const rssPath = path.join(outputDir, "index.xml")
if (fs.existsSync(rssPath)) {
  const rss = fs.readFileSync(rssPath, "utf8")
  const items = (rss.match(/<item>/g) ?? []).length
  const creators = (rss.match(/<dc:creator>/g) ?? []).length
  if (items === 0) fail("RSS feed contains no items")
  // One per item plus one at channel level.
  if (creators < items) fail(`RSS has ${items} items but only ${creators} dc:creator elements`)
  if (!rss.includes('rel="self"')) fail("RSS is missing its atom:self link")
}

// ---------------------------------------------------------------- HTML surfaces

const authorValues = new Set()
const personIds = new Set()
const canonicals = new Map()
let blogPostings = 0
let missingJsonLd = 0
let missingAuthor = 0
let missingCanonical = 0
let unlinkedAuthor = 0

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8")
  const head = html.split("</head>")[0]
  const rel = path.relative(outputDir, file)

  const author = head.match(/<meta name="author" content="([^"]*)"/)
  if (!author || author[1].trim() === "") missingAuthor++
  else authorValues.add(author[1])

  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)
  if (!canonical) missingCanonical++
  else {
    const seen = canonicals.get(canonical[1])
    if (seen) fail(`duplicate canonical URL ${canonical[1]} on ${seen} and ${rel}`)
    canonicals.set(canonical[1], rel)
  }

  const ld = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  if (!ld) {
    missingJsonLd++
    continue
  }

  let graph
  try {
    graph = JSON.parse(ld[1])["@graph"]
  } catch (err) {
    fail(`invalid JSON-LD on ${rel}: ${err.message}`)
    continue
  }
  if (!Array.isArray(graph)) {
    fail(`JSON-LD on ${rel} has no @graph array`)
    continue
  }

  const person = graph.find((n) => n["@type"] === "Person")
  if (!person) {
    fail(`JSON-LD on ${rel} declares no Person`)
    continue
  }
  if (!person["@id"]) fail(`Person on ${rel} has no @id, so nothing can reference it`)
  else personIds.add(person["@id"])

  // The whole point of the graph is that the content points at the person, so
  // every attribution reference on every node must resolve to that Person. A
  // Person node nobody references attributes nothing, and a reference pointing
  // at an @id that isn't in the graph is a dangling edge consumers silently drop.
  for (const node of graph) {
    for (const field of ["author", "creator", "publisher", "copyrightHolder"]) {
      const ref = node[field]
      if (ref && typeof ref === "object" && ref["@id"] && ref["@id"] !== person["@id"]) {
        unlinkedAuthor++
        fail(
          `${node["@type"]} on ${rel} has ${field} -> ${ref["@id"]}, which is not the Person @id`,
        )
      }
    }
  }

  const posting = graph.find((n) => n["@type"] === "BlogPosting")
  if (posting) {
    blogPostings++
    if (!posting.author?.["@id"]) {
      unlinkedAuthor++
      fail(`BlogPosting on ${rel} has no author reference`)
    }
    for (const field of ["headline", "datePublished", "url"]) {
      if (!posting[field]) fail(`BlogPosting on ${rel} is missing ${field}`)
    }
  }
}

if (missingAuthor > 0) fail(`${missingAuthor} page(s) have no author meta tag`)
if (missingCanonical > 0) fail(`${missingCanonical} page(s) have no canonical URL`)
if (missingJsonLd > 0) fail(`${missingJsonLd} page(s) emit no JSON-LD`)
if (unlinkedAuthor > 0) fail(`${unlinkedAuthor} attribution reference(s) do not resolve to the Person @id`)
if (blogPostings === 0) fail("no page emitted a BlogPosting — posts are not being attributed")

if (authorValues.size > 1) {
  fail(`pages disagree on the author: ${[...authorValues].map((a) => `"${a}"`).join(", ")}`)
}
if (personIds.size > 1) {
  fail(`pages disagree on the Person @id: ${[...personIds].join(", ")}`)
}

// llms.txt excludes hidden folders, so it should never exceed the attributed posts.
if (llmsEntries.length > blogPostings) {
  fail(`llms.txt lists ${llmsEntries.length} posts but only ${blogPostings} pages are attributed`)
}

notes.push(`${htmlFiles.length} pages, ${blogPostings} attributed posts, ${llmsEntries.length} in llms.txt`)
notes.push(`author: ${[...authorValues][0] ?? "none"} (${[...personIds][0] ?? "no @id"})`)

// --------------------------------------------------------------------- report

if (failures.length > 0) {
  console.error("✗ machine-readable output failed verification:\n")
  for (const f of failures) console.error(`  - ${f}`)
  console.error("")
  process.exit(1)
}

console.log("✓ machine-readable output verified")
for (const n of notes) console.log(`  ${n}`)
