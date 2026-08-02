// A heuristic-based mock scoring system for keyword trends

const HIGH_VALUE_ROOTS = ["abstract", "background", "technology", "ai", "business", "nature", "woman", "man", "health", "food", "medical", "concept"];
const LOW_VALUE_ROOTS = ["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with", "by", "about", "like", "through", "over", "before", "between", "after", "since", "without", "under", "within", "along", "following", "across", "behind", "beyond", "plus", "except", "but", "up", "out", "around", "down", "off", "above", "near", "photo", "image", "picture"];

export function getKeywordTrendScore(keyword: string): number {
  const normalized = keyword.toLowerCase().trim();
  let score = 50; // base score
  
  if (normalized.length < 3) return 10;
  if (LOW_VALUE_ROOTS.includes(normalized)) return 5;
  
  // High value words boost score
  for (const root of HIGH_VALUE_ROOTS) {
    if (normalized.includes(root)) score += 20;
  }
  
  // Two-word phrases often perform better than single generic words or long sentences
  const words = normalized.split(" ").length;
  if (words === 2) score += 15;
  else if (words === 3) score += 10;
  else if (words > 4) score -= 20;
  
  // Add some determinism but slight variation based on the string itself
  const charSum = normalized.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  score += (charSum % 20) - 10;
  
  return Math.max(1, Math.min(99, score));
}

export function getTrendColor(score: number): "green" | "amber" | "red" {
  if (score >= 70) return "green";
  if (score >= 40) return "amber";
  return "red";
}
