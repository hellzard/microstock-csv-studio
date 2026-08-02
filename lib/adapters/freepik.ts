import { MasterAsset } from "@/types/master-asset";
import { PlatformAdapter, PlatformRow, ValidationResult, ValidationIssue } from "@/types/platforms";

export const freepikAdapter: PlatformAdapter = {
  id: "freepik",
  displayName: "Freepik",
  version: "1.0.0",
  lastVerifiedAt: "2026-08-01T00:00:00Z",
  supportedAssetTypes: ["image", "vector"],
  sources: [
    {
      title: "Freepik CSV Requirements",
      url: "https://support.freepik.com/s/article/How-to-upload-content",
      verifiedAt: "2026-08-01T00:00:00Z",
    }
  ],
  csv: {
    encoding: "utf-8",
    delimiter: ";", // Freepik usually prefers semicolon or comma, we use standard , if possible, but let's stick to their docs
    quoteChar: '"',
    lineEnding: "\n",
  },
  columns: [
    { name: "File name", required: true },
    { name: "Title", required: true, maxLength: 100 },
    { name: "Keywords", required: true }
  ],
  
  validateAsset: (asset: MasterAsset): ValidationResult => {
    const issues: ValidationIssue[] = [];
    
    if (!asset.title) {
      issues.push({ type: "error", field: "title", message: "Title is required" });
    }
    if (asset.title && asset.title.length > 100) {
      issues.push({ type: "warning", field: "title", message: "Freepik suggests keeping title under 100 characters" });
    }
    
    if (!asset.keywords || asset.keywords.length < 5) {
      issues.push({ type: "error", field: "keywords", message: "At least 5 keywords are required" });
    }

    return {
      isValid: issues.filter(i => i.type === "error").length === 0,
      issues
    };
  },
  
  transformAsset: (asset: MasterAsset): PlatformRow => {
    return {
      "File name": asset.currentFilename || "",
      Title: asset.title || "",
      Keywords: (asset.keywords || []).join(","),
    };
  }
};
