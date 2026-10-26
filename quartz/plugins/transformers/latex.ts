import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeMathjax from "rehype-mathjax/svg"
//@ts-ignore
import rehypeTypst from "@myriaddreamin/rehype-typst"
import { QuartzTransformerPlugin } from "../types"
import { katexCopyScriptUrl, katexStylesheetUrl } from "../../util/externalAssets"
import { KatexOptions } from "katex"
import { Element, Root } from "hast"
import { visit } from "unist-util-visit"
import { VFile } from "vfile"
import { Options as MathjaxOptions } from "rehype-mathjax/svg"
//@ts-ignore
import { Options as TypstOptions } from "@myriaddreamin/rehype-typst"

interface Options {
  renderEngine: "katex" | "mathjax" | "typst"
  customMacros: MacroType
  katexOptions: Omit<KatexOptions, "macros" | "output">
  mathJaxOptions: Omit<MathjaxOptions, "macros">
  typstOptions: TypstOptions
}

interface MacroType {
  [key: string]: string
}

const rehypeMarkLatex = () => (tree: Root, file: VFile) => {
  file.data.hasLatex = false
  visit(tree, "element", (node: Element) => {
    const classNames = node.properties?.className
    if (
      Array.isArray(classNames) &&
      classNames.some((className) => String(className) === "katex")
    ) {
      file.data.hasLatex = true
    }
  })
}

export const Latex: QuartzTransformerPlugin<Partial<Options>> = (opts) => {
  const engine = opts?.renderEngine ?? "katex"
  const macros = opts?.customMacros ?? {}
  return {
    name: "Latex",
    markdownPlugins() {
      return [remarkMath]
    },
    htmlPlugins() {
      switch (engine) {
        case "katex": {
          return [
            [rehypeKatex, { output: "html", macros, ...(opts?.katexOptions ?? {}) }],
            [rehypeMarkLatex],
          ]
        }
        case "typst": {
          return [[rehypeTypst, opts?.typstOptions ?? {}]]
        }
        case "mathjax": {
          return [[rehypeMathjax, { macros, ...(opts?.mathJaxOptions ?? {}) }]]
        }
        default: {
          return [[rehypeMathjax, { macros, ...(opts?.mathJaxOptions ?? {}) }]]
        }
      }
    },
    externalResources() {
      switch (engine) {
        case "katex":
          return {
            css: [{ content: katexStylesheetUrl }],
            js: [
              {
                // fix copy behaviour: https://github.com/KaTeX/KaTeX/blob/main/contrib/copy-tex/README.md
                src: katexCopyScriptUrl,
                loadTime: "afterDOMReady",
                contentType: "external",
                defer: true,
              },
            ],
          }
        default:
          return { css: [], js: [] }
      }
    },
  }
}

declare module "vfile" {
  interface DataMap {
    hasLatex: boolean | undefined
  }
}
