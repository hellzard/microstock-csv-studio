import { MasterAsset } from "@/types/master-asset";
import { PlatformAdapter, PlatformRow, ValidationResult, ValidationIssue } from "@/types/platforms";

export const adobeAdapter: PlatformAdapter = {
  id: "adobe",
  displayName: "Adobe Stock",
  version: "1.0.0",
  lastVerifiedAt: "2026-08-01T00:00:00Z",
  supportedAssetTypes: ["image", "video", "vector"],
  sources: [
    {
      title: "Adobe Stock Contributor Guide - Metadata",
      url: "https://helpx.adobe.com/stock/contributor/help/csv-file-for-metadata.html",
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
    { name: "Title", required: true, maxLength: 200 },
    { name: "Keywords", required: true },
    { name: "Category", required: true },
    { name: "Releases", required: false },
    { name: "Editorial", required: false }
  ],
  
  validateAsset: (asset: MasterAsset): ValidationResult => {
    const issues: ValidationIssue[] = [];
    
    if (!asset.title || asset.title.length < 5) {
      issues.push({ type: "error", field: "title", message: "Title must be at least 5 characters" });
    }
    if (asset.title && asset.title.length > 200) {
      issues.push({ type: "error", field: "title", message: "Title must not exceed 200 characters" });
    }
    
    if (!asset.keywords || asset.keywords.length < 5) {
      issues.push({ type: "error", field: "keywords", message: "At least 5 keywords are required" });
    }
    if (asset.keywords && asset.keywords.length > 50) {
      issues.push({ type: "warning", field: "keywords", message: "Adobe recommends max 50 keywords (extra will be ignored/penalized)" });
    }

    if (!asset.category) {
      issues.push({ type: "warning", field: "category", message: "Category is highly recommended" });
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
      Category: asset.category?.toString() || "1", // Default Category
      Releases: asset.releases?.join(",") || "",
      Editorial: asset.editorial ? "yes" : "no",
    };
  }
};
