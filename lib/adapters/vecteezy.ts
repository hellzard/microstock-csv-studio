import { MasterAsset } from "@/types/master-asset";
import { PlatformAdapter, PlatformRow, ValidationResult, ValidationIssue } from "@/types/platforms";

export const vecteezyAdapter: PlatformAdapter = {
  id: "vecteezy",
  displayName: "Vecteezy",
  version: "1.0.0",
  lastVerifiedAt: "2026-08-01T00:00:00Z",
  supportedAssetTypes: ["image", "video", "vector"],
  sources: [
    {
      title: "Vecteezy Contributor Portal",
      url: "https://support.vecteezy.com/hc/en-us/articles/360057088191-How-do-I-add-metadata-via-CSV",
      verifiedAt: "2026-08-01T00:00:00Z",
    }
  ],
  csv: {
    encoding: "utf-8",
    delimiter: ",",
    quoteChar: '"',
    lineEnding: "\n",
  },
  columns: [
    { name: "Filename", required: true },
    { name: "Title", required: true },
    { name: "Keywords", required: true },
    { name: "License", required: false }
  ],
  
  validateAsset: (asset: MasterAsset): ValidationResult => {
    const issues: ValidationIssue[] = [];
    
    if (!asset.title) {
      issues.push({ type: "error", field: "title", message: "Title is required" });
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
      Filename: asset.currentFilename,
      Title: asset.title,
      Keywords: asset.keywords.join(","),
      License: "Free", // Can be Free or Pro
    };
  }
};
