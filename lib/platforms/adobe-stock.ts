import { PlatformAdapter, ValidationResult, PlatformRow } from "@/types/platforms";
import { MasterAsset } from "@/types/master-asset";

export const adobeStockAdapter: PlatformAdapter = {
  id: "adobe-stock",
  displayName: "Adobe Stock",
  version: "1.0.0",
  lastVerifiedAt: "2026-08-02",
  supportedAssetTypes: ["image", "video", "vector"],
  sources: [
    {
      url: "https://helpx.adobe.com/stock/contributor/help/uploading-content.html",
      title: "Adobe Stock Contributor Requirements",
      verifiedAt: "2026-08-02"
    }
  ],
  csv: {
    encoding: "utf-8",
    delimiter: ",",
    quoteChar: '"',
    lineEnding: "\r\n"
  },
  columns: [
    { name: "Filename", required: true, maxLength: 30 },
    { name: "Title", required: true, maxLength: 70 },
    { name: "Keywords", required: true },
    { name: "Category", required: false },
    { name: "Releases", required: false }
  ],
  validateAsset: (asset: MasterAsset): ValidationResult => {
    const issues = [];
    
    if (!asset.currentFilename) {
      issues.push({ type: "error" as const, field: "Filename", message: "Filename is missing." });
    } else if (asset.currentFilename.length > 30) {
      issues.push({ type: "warning" as const, field: "Filename", message: "Filename is over 30 characters, though actual system limit might vary." });
    }

    if (!asset.title) {
      issues.push({ type: "error" as const, field: "Title", message: "Title is missing." });
    } else if (asset.title.length > 70) {
      issues.push({ type: "error" as const, field: "Title", message: "Title exceeds 70 characters." });
    } else if (asset.title.includes(',')) {
      issues.push({ type: "warning" as const, field: "Title", message: "Title contains commas, ensure it is properly quoted on export." });
    }

    if (!asset.keywords || asset.keywords.length < 5) {
      issues.push({ type: "error" as const, field: "Keywords", message: "Minimum 5 keywords required (standard recommendation)." });
    } else if (asset.keywords.length > 50) {
      issues.push({ type: "error" as const, field: "Keywords", message: "Maximum 50 keywords allowed." });
    }

    return {
      isValid: issues.filter(i => i.type === "error").length === 0,
      issues
    };
  },
  transformAsset: (asset: MasterAsset): PlatformRow => {
    return {
      "Filename": asset.currentFilename,
      "Title": asset.title || "",
      "Keywords": (asset.keywords || []).slice(0, 50).join(", "),
      "Category": asset.categoryConcept || "",
      "Releases": (asset.releaseFiles || []).join(", ")
    };
  }
};
