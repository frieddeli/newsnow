import type { NewsItem } from "@shared/types"

interface HFModel {
  id: string
  likes?: number
  downloads?: number
  trendingScore?: number
  pipeline_tag?: string
}

export default defineSource(async () => {
  const data: HFModel[] = await myFetch("https://huggingface.co/api/models?sort=trendingScore&limit=30")
  return data
    .filter(m => m.id)
    .map<NewsItem>(m => ({
      id: m.id,
      title: m.id,
      url: `https://huggingface.co/${m.id}`,
      extra: {
        info: `♥ ${m.likes ?? 0}`,
        hover: [m.pipeline_tag, m.downloads != null ? `${m.downloads} downloads` : undefined].filter(Boolean).join(" · "),
      },
    }))
})
