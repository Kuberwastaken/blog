import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"
import { JSResourceToScriptElement } from "../quartz/util/resources"

const Head: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title ?? "MindDump"
  const description = fileData.description ?? fileData.frontmatter?.description ?? "Kuber Mehta's blog about technology, AI, and more"
  const { js } = externalResources
  const baseUrl = `https://${cfg.baseUrl}`
  const ogImagePath = `${baseUrl}/static/og-image.png`

  return (
    <head>
      <title>{title}</title>
      <meta name="og:site_name" content={cfg.pageTitle} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      
      {/* Twitter specific meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImagePath} />
      
      {/* Open Graph image */}
      <meta property="og:image" content={ogImagePath} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={description} />
      
      {/* Scripts that need to load before DOM */}
      {js
        .filter((resource) => resource.loadTime === "beforeDOMReady")
        .map((res) => JSResourceToScriptElement(res))}
    </head>
  )
}

export default (() => Head) satisfies QuartzComponentConstructor 