import type { NewsItem } from "@shared/types"

interface Hit {
  objectID: string
  title: string
  url?: string
  points?: number
  num_comments?: number
}

export default defineSource(async () => {
  const since = Math.floor(Date.now() / 1000) - 7 * 24 * 3600
  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=show_hn&numericFilters=${encodeURIComponent(`created_at_i>${since},points>10`)}&hitsPerPage=30`
  const data: { hits: Hit[] } = await myFetch(url)
  return data.hits
    .filter(h => h.objectID && h.title)
    .sort((a, b) => (b.points ?? 0) - (a.points ?? 0))
    .map<NewsItem>(h => ({
      id: h.objectID,
      title: h.title.replace(/^Show HN:\s*/i, ""),
      url: `https://news.ycombinator.com/item?id=${h.objectID}`,
      extra: {
        info: `▲ ${h.points ?? 0}`,
        hover: h.url,
      },
    }))
})
