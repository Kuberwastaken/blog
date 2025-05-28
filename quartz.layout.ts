import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { QuartzPluginData } from "./quartz/plugins/vfile"
import CustomHead from "./components/Head"

// This file is used to define the layout of the site
// You can customize it to your liking

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: CustomHead,
  header: [
    Component.Darkmode,
    Component.Header,
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/kuberwastaken",
      LinkedIn: "https://www.linkedin.com/in/kubermehta/",
    },
  }),
  afterBody: [
    Component.Search,
  ],
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle({
      text: "MindDump",
      subtext: "by Kuber Mehta",
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
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle({
      text: "MindDump",
      subtext: "by Kuber Mehta",
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

export const sharedLayout: SharedLayout = {
  head: CustomHead,
  header: [
    Component.Darkmode,
    Component.Header,
  ],
  footer: Component.Footer,
  afterBody: [
    Component.Search,
  ],
}

export const defaultLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs,
    Component.ArticleTitle,
    Component.ContentMeta,
    Component.TagList,
  ],
  left: [
    Component.PageTitle,
    Component.MobileOnly(Component.Spacer),
    Component.Search,
    Component.Darkmode,
    Component.DesktopOnly(Component.Explorer),
  ],
  right: [
    Component.Graph,
    Component.DesktopOnly(Component.TableOfContents),
    Component.Backlinks,
  ],
}