import type { NewsItem } from "@shared/types"

interface DailyPaper {
  paper: { id: string, title: string, upvotes?: number, summary?: string }
}

export default defineSource(async () => {
  const data: DailyPaper[] = await myFetch("https://huggingface.co/api/daily_papers")
  return data
    .filter(d => d.paper?.id && d.paper.title)
    .sort((a, b) => (b.paper.upvotes ?? 0) - (a.paper.upvotes ?? 0))
    .map<NewsItem>(({ paper }) => ({
      id: paper.id,
      title: paper.title.replace(/\s+/g, " "),
      url: `https://huggingface.co/papers/${paper.id}`,
      extra: {
        info: `▲ ${paper.upvotes ?? 0}`,
        hover: paper.summary,
      },
    }))
})
