const TRADEMARK_TERMS = [
  "nike", "adidas", "puma", "reebok", "under armour",
  "apple", "iphone", "ipad", "macbook", "ios", "mac os",
  "microsoft", "windows", "xbox", "surface",
  "sony", "playstation", "nintendo", "switch", "wii",
  "disney", "marvel", "star wars", "pixar", "mickey",
  "lego", "barbie", "hot wheels",
  "porsche", "ferrari", "lamborghini", "bmw", "mercedes", "audi", "tesla",
  "coca-cola", "pepsi", "red bull", "monster energy",
  "mcdonalds", "burger king", "starbucks", "kfc",
  "gucci", "louis vuitton", "prada", "rolex", "chanel",
  "instagram", "facebook", "twitter", "tiktok", "youtube", "google", "netflix",
  "amazon", "ebay", "walmart",
  "olympic", "olympics", "fifa", "nba", "nfl", "uefa",
  // Add more common terms as needed
];

export interface TrademarkAuditResult {
  hasViolations: boolean;
  violations: string[];
}

/**
 * Scans title and keywords for trademarked terms.
 * Returns an array of violating terms.
 */
export function scanForTrademarks(title: string = "", keywords: string[] = []): TrademarkAuditResult {
  const violations = new Set<string>();
  
  const titleLower = title.toLowerCase();
  
  for (const term of TRADEMARK_TERMS) {
    // Check title (exact word match or substring depending on strictness - we use regex word boundary)
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    
    if (regex.test(titleLower)) {
      violations.add(term);
    }
    
    // Check keywords (exact match is usually better for keywords)
    for (const kw of keywords) {
      if (kw.toLowerCase().trim() === term) {
        violations.add(term);
      }
    }
  }

  return {
    hasViolations: violations.size > 0,
    violations: Array.from(violations),
  };
}
