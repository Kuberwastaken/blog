declare module "*.scss" {
  const content: string
  export = content
}

// dom custom event
interface CustomEventMap {
  nav: CustomEvent<{ url: FullSlug }>
  themechange: CustomEvent<{ theme: "light" | "dark" }>
}

declare const fetchWordGraph: Promise<Record<string, string[]>>
declare const fetchData: Promise<ContentIndex>
