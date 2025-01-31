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
      GitHub: "https://github.com/kuberwastaken",
      LinkedIn: "https://www.linkedin.com/in/kubermehta/",
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
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      filterFn: (node) => {
        // Check the exact folder name since BITS is uppercase
        return node.name !== "BITS"
      },
    })),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.RecentNotes({
      title: "Recent Posts", 
      limit: 3,
      showTags: false,
      filter: (f) => !f.file?.path?.startsWith("BITS/"),
      sort: (f1: QuartzPluginData, f2: QuartzPluginData) => {
        const date1Created = f1.dates?.created ? new Date(f1.dates.created).getTime() : 0
        const date1Modified = f1.dates?.modified ? new Date(f1.dates.modified).getTime() : 0
        const date2Created = f2.dates?.created ? new Date(f2.dates.created).getTime() : 0
        const date2Modified = f2.dates?.modified ? new Date(f2.dates.modified).getTime() : 0
        
        const date1 = Math.max(date1Created, date1Modified)
        const date2 = Math.max(date2Created, date2Modified)
        
        return date2 - date1
      }
    }),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
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