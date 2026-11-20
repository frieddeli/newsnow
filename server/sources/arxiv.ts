const feed = (cat: string) => defineRSSSource(`https://rss.arxiv.org/rss/${cat}`, { hiddenDate: true })

export default defineSource({
  "arxiv": feed("cs.AI"),
  "arxiv-ai": feed("cs.AI"),
  "arxiv-lg": feed("cs.LG"),
  "arxiv-ro": feed("cs.RO"),
  "arxiv-dc": feed("cs.DC"),
  "arxiv-ar": feed("cs.AR"),
  "arxiv-se": feed("cs.SE"),
})
