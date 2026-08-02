import { MasterAsset } from "@/types/master-asset";
import { PlatformAdapter, PlatformRow, ValidationResult, ValidationIssue } from "@/types/platforms";

export const shutterstockAdapter: PlatformAdapter = {
  id: "shutterstock",
  displayName: "Shutterstock",
  version: "1.0.0",
  lastVerifiedAt: "2026-08-01T00:00:00Z",
  supportedAssetTypes: ["image", "video", "vector"],
  sources: [
    {
      title: "Shutterstock CSV Upload Guide",
      url: "https://support.submit.shutterstock.com/s/article/How-do-I-use-a-CSV-file-to-apply-metadata",
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
    { name: "Description", required: true, maxLength: 200 },
    { name: "Keywords", required: true },
    { name: "Categories", required: true },
    { name: "Illustrations", required: false },
    { name: "Mature Content", required: false },
    { name: "Editorial", required: false }
  ],
  
  validateAsset: (asset: MasterAsset): ValidationResult => {
    const issues: ValidationIssue[] = [];
    
    if (!asset.title || asset.title.length < 5) {
      issues.push({ type: "error", field: "title", message: "Description (title) must be at least 5 characters" });
    }
    if (asset.title && asset.title.length > 200) {
      issues.push({ type: "error", field: "title", message: "Description (title) must not exceed 200 characters" });
    }
    
    if (!asset.keywords || asset.keywords.length < 7) {
      issues.push({ type: "error", field: "keywords", message: "At least 7 keywords are required" });
    }
    if (asset.keywords && asset.keywords.length > 50) {
      issues.push({ type: "error", field: "keywords", message: "Shutterstock strictly limits keywords to 50 max" });
    }

    if (!asset.category) {
      issues.push({ type: "warning", field: "category", message: "At least one category is recommended" });
    }

    return {
      isValid: issues.filter(i => i.type === "error").length === 0,
      issues
    };
  },
  
  transformAsset: (asset: MasterAsset): PlatformRow => {
    return {
      Filename: asset.currentFilename,
      Description: asset.title,
      Keywords: asset.keywords.slice(0, 50).join(","), // Enforce 50 limit strictly for export
      Categories: asset.category?.toString() || "",
      Illustrations: asset.illustration ? "yes" : "no",
      "Mature Content": asset.matureContent ? "yes" : "no",
      Editorial: asset.editorial ? "yes" : "no",
    };
  }
};
