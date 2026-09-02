// Tiny typo-tolerant fuzzy matcher. No dependencies.
// Returns a score (higher = better); 0 means no match.

export function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase().trim()
  const t = text.toLowerCase()
  if (!q) return 1
  if (t.includes(q)) return 100 - t.indexOf(q) // substring wins, earlier = better

  // subsequence match: all query chars appear in order
  let qi = 0, score = 0, streak = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) { qi++; streak++; score += streak } // reward consecutive
    else streak = 0
  }
  return qi === q.length ? score : 0
}

export function fuzzyFilter<T>(query: string, items: T[], getText: (item: T) => string): T[] {
  if (!query.trim()) return items
  return items
    .map(item => ({ item, score: getText(item).split('|').reduce((m, part) => Math.max(m, fuzzyScore(query, part)), 0) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(x => x.item)
}
