import type { NewsItem } from "@shared/types"

interface HFSpace {
  id: string
  likes?: number
  sdk?: string
}

export default defineSource(async () => {
  const data: HFSpace[] = await myFetch("https://huggingface.co/api/spaces?sort=trendingScore&limit=30")
  return data
    .filter(s => s.id)
    .map<NewsItem>(s => ({
      id: s.id,
      title: s.id,
      url: `https://huggingface.co/spaces/${s.id}`,
      extra: {
        info: `♥ ${s.likes ?? 0}`,
        hover: s.sdk,
      },
    }))
})
