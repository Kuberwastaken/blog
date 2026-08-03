import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { QuartzPluginData } from "./quartz/plugins/vfile"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      LinkedIn: "https://www.linkedin.com/in/kubermehta/",
      X: "https://x.com/kuberwastaken",
      GitHub: "https://github.com/kuberwastaken",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    // Visually hidden pointer to the markdown mirror, llms.txt, and MCP server
    // for extraction pipelines that only keep body text.
    // Temporarily disabled for testing — re-enable by uncommenting.
    // Component.AgentNote(),
  ],
  left: [
    Component.PageTitle({
      // Kept as the configured pageTitle so the sidebar renders exactly as before;
      // PageTitle used to ignore this option entirely.
      text: "ᨒ MindDump",
    }),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      filterFn: (node) => {
        return node.name !== "BITS" && node.name !== "index"
      },
        })),
      ],
      right: [
        Component.DesktopOnly(Component.TableOfContents()),
        Component.Graph({
      localGraph: {
        depth: 2,
        repelForce: 2,
        centerForce: 0.4,
        linkDistance: 50,
        fontSize: 0.8,
        focusOnHover: true,
      },
      globalGraph: {
        depth: -1,
        scale: 0.9,
        repelForce: 1.5,
        centerForce: 0.4,
        linkDistance: 45,
        fontSize: 0.7,
        focusOnHover: true,
      },
        }),
        Component.RecentNotes({
      title: "Trending Posts", 
      limit: 3,
      showTags: false,
      filter: (file) => !file.slug?.startsWith("BITS/") && file.slug !== "index",
      sort: (f1: QuartzPluginData, f2: QuartzPluginData) => {
        const date1 = f1.dates?.created ? new Date(f1.dates.created) : new Date(0)
        const date2 = f2.dates?.created ? new Date(f2.dates.created) : new Date(0)
        
        if (date2.getTime() === date1.getTime()) {
          return f2.slug?.localeCompare(f1.slug ?? "") ?? 0
        }
        return date2.getTime() - date1.getTime()
      }
    }),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    // Listing pages aren't authored articles, so no byline on the meta line.
    Component.ContentMeta({ showAuthor: false }),
  ],
  left: [
    Component.PageTitle({
      text: "ᨒ MindDump",
    }),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      filterFn: (node) => {
        return node.name !== "BITS"
      },
    })),
  ],
  right: [],
}