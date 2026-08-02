export type PolicyViolationType = 'TRADEMARK' | 'AI_RESTRICTION' | 'BANNED_WORD';

export interface PolicyViolation {
  term: string;
  type: PolicyViolationType;
  message: string;
}

export interface PolicyAuditResult {
  hasViolations: boolean;
  violations: PolicyViolation[];
}

const TRADEMARKS = [
  "nike", "adidas", "puma", "apple", "iphone", "macbook", "windows", "xbox", "sony", "playstation",
  "disney", "marvel", "star wars", "pixar", "lego", "barbie", "porsche", "ferrari", "coca-cola",
  "pepsi", "mcdonalds", "starbucks", "gucci", "rolex", "instagram", "facebook", "twitter",
  "tiktok", "youtube", "google", "netflix", "amazon", "olympic"
];

const AI_TERMS = [
  "ai generated", "generative ai", "midjourney", "dall-e", "stable diffusion", "ai art",
  "artificial intelligence generated"
];

const BANNED_WORDS = [
  "nsfw", "porn", "gore", "murder", "rape", "suicide" // Simple examples
];

export function lintMetadata(
  title: string = "", 
  keywords: string[] = [], 
  isGenerativeAi: boolean = false
): PolicyAuditResult {
  const violations: PolicyViolation[] = [];
  const titleLower = title.toLowerCase();
  
  // Helper to check
  const checkTerm = (term: string, type: PolicyViolationType, message: string, condition?: boolean) => {
    if (condition === false) return; // Skip if condition is explicitly false
    
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    const inTitle = regex.test(titleLower);
    const inKeywords = keywords.some(k => k.toLowerCase().trim() === term);
    
    if (inTitle || inKeywords) {
      // Avoid duplicate reports for the same term
      if (!violations.find(v => v.term === term)) {
        violations.push({ term, type, message });
      }
    }
  };

  // 1. Trademarks (Always bad for commercial)
  for (const term of TRADEMARKS) {
    checkTerm(term, 'TRADEMARK', `Commercial violation: '${term}' is a trademark.`);
  }

  // 2. AI Restrictions
  for (const term of AI_TERMS) {
    // If it's NOT marked as generative AI, these terms are highly suspicious/illegal on Adobe Stock
    checkTerm(term, 'AI_RESTRICTION', `AI keywords like '${term}' require the Generative AI flag to be checked!`, !isGenerativeAi);
  }

  // 3. Banned Words
  for (const term of BANNED_WORDS) {
    checkTerm(term, 'BANNED_WORD', `Banned word detected: '${term}' is not allowed on stock platforms.`);
  }

  return {
    hasViolations: violations.length > 0,
    violations
  };
}
