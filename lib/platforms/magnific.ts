import { PlatformAdapter, ValidationResult, PlatformRow } from "@/types/platforms";
import { MasterAsset } from "@/types/master-asset";

export const magnificAdapter: PlatformAdapter = {
  id: "magnific",
  displayName: "Magnific",
  version: "1.0.0",
  lastVerifiedAt: "2026-08-02",
  supportedAssetTypes: ["image"], // Verify if vector is supported via CSV in same format
  sources: [
    {
      url: "https://support.magnific.com",
      title: "Magnific CSV Metadata",
      verifiedAt: "2026-08-02"
    }
  ],
  csv: {
    encoding: "utf-8",
    delimiter: ";",
    quoteChar: '"',
    lineEnding: "\r\n"
  },
  columns: [
    { name: "File name", required: true },
    { name: "Title", required: true, maxLength: 100 },
    { name: "Keywords", required: true },
    { name: "Prompt", required: false },
    { name: "Model", required: false }
  ],
  validateAsset: (asset: MasterAsset): ValidationResult => {
    const issues = [];
    
    if (!asset.currentFilename) issues.push({ type: "error" as const, field: "File name", message: "Filename is missing." });
    
    if (!asset.title) {
      issues.push({ type: "error" as const, field: "Title", message: "Title is missing." });
    } else if (asset.title.length < 35 || asset.title.length > 100) {
      issues.push({ type: "warning" as const, field: "Title", message: "Title should be 35-100 characters." });
    }

    if (!asset.keywords || asset.keywords.length === 0) issues.push({ type: "error" as const, field: "Keywords", message: "Keywords are missing." });

    if (asset.generativeAi) {
       if (!asset.prompt) issues.push({ type: "warning" as const, field: "Prompt", message: "Generative AI is flagged but Prompt is missing." });
       if (!asset.generationModel) issues.push({ type: "warning" as const, field: "Model", message: "Generative AI is flagged but Model is missing." });
    }

    return {
      isValid: issues.filter(i => i.type === "error").length === 0,
      issues
    };
  },
  transformAsset: (asset: MasterAsset): PlatformRow => {
    const kws = [...(asset.keywords || [])];
    if (asset.generativeAi && !kws.includes("_ai_generated")) {
      kws.push("_ai_generated");
    }

    return {
      "File name": asset.currentFilename,
      "Title": asset.title || "",
      "Keywords": kws.join(", "),
      "Prompt": asset.generativeAi ? (asset.prompt || "") : "",
      "Model": asset.generativeAi ? (asset.generationModel || "") : ""
    };
  }
};
