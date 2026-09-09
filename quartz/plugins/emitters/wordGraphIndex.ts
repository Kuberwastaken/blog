import { QuartzEmitterPlugin } from "../types"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { write } from "./helpers"

// Words too common to say anything about what a note is about. Standard
// English stopwords plus markdown/html artifacts.
const STOPWORDS = new Set([
  "the","and","that","this","with","from","have","has","had","was","were","are","for","not","you","your","yours","but","all","can","cant","could","would","should","will","wont","shall","may","might","must","about","into","over","under","again","once","here","there","when","where","which","while","what","who","whom","whose","why","how","than","then","them","they","their","theirs","these","those","such","some","any","each","few","more","most","much","many","very","just","only","also","even","ever","never","always","often","sometimes","now","today","yesterday","tomorrow","been","being","does","did","done","doing","dont","doesnt","didnt","isnt","arent","wasnt","werent","its","itself","himself","herself","themselves","ourselves","myself","yourself","his","her","hers","him","she","our","ours","out","off","too","own","same","down","because","until","before","after","above","below","between","through","during","against","without","within","upon","per","via","etc","else","either","neither","both","none","nobody","nothing","everything","anything","something","someone","anyone","everyone","yes","really","quite","rather","pretty","going","goes","went","gone","make","makes","made","making","take","takes","took","taking","gets","got","getting","gotten","lets","say","says","said","saying","know","knows","knew","knowing","think","thinks","thought","thinking","thing","things","way","ways","like","likes","liked","liking","want","wants","wanted","wanting","need","needs","needed","needing","uses","used","using","work","works","worked","working","look","looks","looked","looking","sees","seen","seeing","come","comes","came","coming","give","gives","gave","giving","find","finds","found","finding","still","back","well","right","left","good","best","better","worst","worse","first","last","next","long","little","great","small","high","early","late","sure","okay","maybe","probably","actually","literally","basically","stuff","lots","kind","sort","part","parts","point","points","ends","start","starts","time","times","days","week","weeks","month","months","year","years","people","person","life","world","place","places","case","fact","idea","ideas","question","questions","answer","answers","example","examples","however","though","although","therefore","thus","hence","since","despite","towards","among","across","around","along","behind","beyond","inside","outside","instead","meanwhile","otherwise","whether","unless","except","besides","moreover","furthermore","nonetheless","nevertheless",
  // markdown/html/url artifacts
  "http","https","html","href","nbsp","quot","code","inline","block","width","height","style","link","links","image","images","file","files","page","pages","post","posts","blog","note","notes","read","reading","write","writing","written","click","text","content","title","date","tags","tagged",
])

const MIN_LEN = 4
const MAX_LEN = 24
const MAX_WORDS = 240 // hard cap on word nodes so the graph stays readable
const MIN_DF = 2 // the whole point: only words repeated across notes
const MAX_DF_RATIO = 0.3 // drop words present in >30% of notes (hairball hubs)
const MAX_EDGES_PER_WORD = 40

// Emits static/wordGraph.json: { word: [slugs...] } for words that repeat
// across at least MIN_DF notes. The graph component uses it to stick notes
// together by repeated words instead of #tags.
export const WordGraphIndex: QuartzEmitterPlugin = () => {
  return {
    name: "WordGraphIndex",
    async emit(ctx, content, _resources) {
      const df = new Map<string, Set<SimpleSlug>>()

      for (const [_tree, file] of content) {
        const slug = file.data.slug!
        const topFolder = slug.includes("/") ? slug.split("/")[0] : ""
        if (topFolder === "BITS") continue
        if (slug === "index" || slug.endsWith("/index")) continue
        const text = `${file.data.frontmatter?.title ?? ""} ${file.data.text ?? ""}`
        const words = new Set(
          text
            .toLowerCase()
            .split(/[^a-z0-9]+/)
            .filter((w) => w.length >= MIN_LEN && w.length <= MAX_LEN && !STOPWORDS.has(w)),
        )
        const simple = simplifySlug(slug)
        for (const w of words) {
          let set = df.get(w)
          if (!set) {
            set = new Set()
            df.set(w, set)
          }
          set.add(simple)
        }
      }

      const numDocs = content.length
      const maxDf = Math.max(10, Math.floor(numDocs * MAX_DF_RATIO))

      const repeated = [...df.entries()]
        .filter(
          ([, slugs]) =>
            slugs.size >= MIN_DF && slugs.size <= maxDf && slugs.size <= MAX_EDGES_PER_WORD,
        )
        .sort((a, b) => b[1].size - a[1].size)
        .slice(0, MAX_WORDS)

      const wordGraph: Record<string, SimpleSlug[]> = {}
      for (const [word, slugs] of repeated) {
        wordGraph[word] = [...slugs]
      }

      const emitted: FilePath[] = []
      emitted.push(
        await write({
          ctx,
          content: JSON.stringify(wordGraph),
          slug: joinSegments("static", "wordGraph") as FullSlug,
          ext: ".json",
        }),
      )
      return emitted
    },
    getQuartzComponents: () => [],
  }
}
