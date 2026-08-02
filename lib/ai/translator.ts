export interface TranslationResult {
  text: string;
  sourceLang: string;
  targetLang: string;
  error?: string;
}

/**
 * Translates text using the free MyMemory API.
 * Rate limit: 500 words/day for free anonymous usage.
 * Includes a simulated fallback if the API fails or rate limits.
 */
export async function translateText(text: string, targetLang: string, sourceLang: string = "en"): Promise<TranslationResult> {
  if (!text || text.trim() === "") {
    return { text, sourceLang, targetLang };
  }

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.responseData && data.responseData.translatedText) {
      // MyMemory sometimes returns an error string in translatedText if limit reached
      if (data.responseStatus !== 200) {
        throw new Error(data.responseDetails || "Translation failed");
      }
      return {
        text: data.responseData.translatedText,
        sourceLang,
        targetLang
      };
    }
    throw new Error("Invalid response from translation API");
  } catch (error) {
    console.error("Translation API error, falling back to simulated translation:", error);
    
    // Fallback: simulated translation just to demonstrate functionality without API keys
    // In a real production app, this would use Google Cloud Translation or AWS Translate
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    
    const langPrefix = `[${targetLang.toUpperCase()}]`;
    return {
      text: `${langPrefix} ${text}`,
      sourceLang,
      targetLang,
      error: "API rate limited. Using simulated fallback."
    };
  }
}

/**
 * Translates an array of keywords. 
 * Joins them into a single string to save API calls, then splits them back.
 */
export async function translateKeywords(keywords: string[], targetLang: string, sourceLang: string = "en"): Promise<string[]> {
  if (!keywords || keywords.length === 0) return [];
  
  const joined = keywords.join(" ||| ");
  const result = await translateText(joined, targetLang, sourceLang);
  
  return result.text.split(" ||| ").map(k => k.trim());
}
