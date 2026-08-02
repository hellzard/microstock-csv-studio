import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Extracts a JSON object from a markdown string (e.g., from Gemini response).
 */
function extractJSON(text: string): any {
  try {
    // Attempt direct parse
    return JSON.parse(text);
  } catch {
    // If it's wrapped in markdown code blocks like ```json ... ```
    const match = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (match && match[1]) {
      return JSON.parse(match[1]);
    }
    // Try to find anything that looks like a JSON object
    const bracketMatch = text.match(/\{[\s\S]*\}/);
    if (bracketMatch) {
      return JSON.parse(bracketMatch[0]);
    }
    throw new Error("Could not parse JSON from AI response.");
  }
}

/**
 * Generates Title, Description, and Keywords based on a base64 image.
 */
export async function generateTagsForImage(base64DataUrl: string, apiKey: string) {
  if (!apiKey) throw new Error("Gemini API Key is missing.");

  const genAI = new GoogleGenerativeAI(apiKey);
  // Using 1.5 flash for speed and cost-effectiveness
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Extract base64 part and mime type
  const match = base64DataUrl.match(/^data:(image\/[a-zA-Z]*);base64,([^"]*)$/);
  if (!match) throw new Error("Invalid base64 image format");
  const mimeType = match[1];
  const base64 = match[2];

  const prompt = `You are a professional microstock contributor expert. 
Analyze the provided image and generate metadata optimized for search algorithms on Adobe Stock and Shutterstock.
Rules:
1. Title: Create a descriptive, commercial title (min 5 words, max 150 characters).
2. Description: Same as title or slightly more detailed.
3. Keywords: Exactly 50 highly relevant keywords, ordered by relevance. Do not use trademarked terms (like Apple, Nike, etc.). All keywords must be lowercase, separated by commas.
4. Output STRICTLY in JSON format with keys: "title", "description", "keywords". No markdown formatting or extra text.

Example JSON output:
{
  "title": "Beautiful sunset over the ocean with rocky beach",
  "description": "Beautiful sunset over the ocean with rocky beach",
  "keywords": ["sunset", "ocean", "beach", "water", "nature", "landscape", "dusk", "sky", "clouds", "scenic", "horizon", "coast", "sea", "summer", "sun", "reflection", "evening", "beautiful", "orange", "yellow", "red", "light", "silhouette", "tranquil", "peaceful", "calm", "relaxing", "vacation", "travel", "tourism", "destination", "background", "wallpaper", "outdoor", "view", "waves", "shore", "coastline", "twilight", "dramatic", "nature photography", "scenery", "picturesque", "stunning", "gorgeous", "colorful", "environment", "seascape", "surf", "tide"]
}`;

  const imagePart = {
    inlineData: {
      data: base64,
      mimeType
    },
  };

  try {
    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();
    const data = extractJSON(responseText);
    
    return {
      title: data.title || "",
      description: data.description || "",
      keywords: Array.isArray(data.keywords) ? data.keywords.join(", ") : (data.keywords || ""),
    };
  } catch (error: any) {
    console.error("Gemini AI Error:", error);
    throw new Error(error.message || "Failed to generate tags with AI.");
  }
}

/**
 * Translates a single text from any language (presumably Indonesian) to English.
 */
export async function translateToEnglish(text: string, apiKey: string): Promise<string> {
  if (!apiKey) throw new Error("Gemini API Key is missing.");
  if (!text.trim()) return "";

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Translate the following text to professional English, suitable for microstock titles or descriptions. Only return the translated text, nothing else. Text to translate: "${text}"`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error: any) {
    console.error("Gemini Translation Error:", error);
    throw new Error("Failed to translate text.");
  }
}
