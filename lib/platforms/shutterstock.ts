import { PlatformAdapter, ValidationResult, PlatformRow } from "@/types/platforms";
import { MasterAsset } from "@/types/master-asset";

export const shutterstockAdapter: PlatformAdapter = {
  id: "shutterstock",
  displayName: "Shutterstock",
  version: "1.0.0",
  lastVerifiedAt: "2026-08-02",
  supportedAssetTypes: ["image", "video", "vector"],
  sources: [
    {
      url: "https://support.submit.shutterstock.com",
      title: "Shutterstock CSV Requirements",
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
    { name: "Filename", required: true },
    { name: "Description", required: true },
    { name: "Keywords", required: true },
    { name: "Categories", required: true },
    { name: "Illustration", required: false },
    { name: "Mature Content", required: false },
    { name: "Editorial", required: false }
  ],
  validateAsset: (asset: MasterAsset): ValidationResult => {
    const issues = [];
    
    if (!asset.currentFilename) issues.push({ type: "error" as const, field: "Filename", message: "Filename is missing." });
    if (!asset.description) issues.push({ type: "error" as const, field: "Description", message: "Description is missing." });
    
    const kwCount = asset.keywords?.length || 0;
    if (kwCount < 7) issues.push({ type: "error" as const, field: "Keywords", message: `Requires 7-50 keywords. Currently has ${kwCount}.` });
    if (kwCount > 50) issues.push({ type: "error" as const, field: "Keywords", message: `Requires 7-50 keywords. Currently has ${kwCount}.` });
    
    if (!asset.categoryConcept) issues.push({ type: "error" as const, field: "Categories", message: "At least 1 category is required." });

    return {
      isValid: issues.filter(i => i.type === "error").length === 0,
      issues
    };
  },
  transformAsset: (asset: MasterAsset): PlatformRow => {
    const categories = [asset.categoryConcept, asset.secondaryCategoryConcept].filter(Boolean).join(", ");
    return {
      "Filename": asset.currentFilename,
      "Description": asset.description || "",
      "Keywords": (asset.keywords || []).slice(0, 50).join(", "),
      "Categories": categories,
      "Illustration": asset.illustration ? "Yes" : "No",
      "Mature Content": asset.matureContent ? "Yes" : "No",
      "Editorial": asset.editorial ? "Yes" : "No"
    };
  }
};
