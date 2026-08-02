import { PlatformAdapter, ValidationResult, PlatformRow } from "@/types/platforms";
import { MasterAsset } from "@/types/master-asset";

export const pond5Adapter: PlatformAdapter = {
  id: "pond5",
  displayName: "Pond5",
  version: "1.0.0",
  lastVerifiedAt: "2026-08-02",
  supportedAssetTypes: ["image", "video"],
  sources: [
    {
      url: "https://contributor.pond5.com",
      title: "Pond5 CSV Format",
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
    { name: "OriginalFilename", required: true },
    { name: "Title", required: true, maxLength: 80 },
    { name: "Keywords", required: true },
    { name: "Description", required: true },
    { name: "City", required: false },
    { name: "Region", required: false },
    { name: "Country", required: false },
    { name: "Specifysource", required: false },
    { name: "Modelreleased", required: false },
    { name: "Propertyreleased", required: false },
    { name: "Release", required: false },
    { name: "Copyright", required: false },
    { name: "Price", required: false },
    { name: "Editorial", required: false }
  ],
  validateAsset: (asset: MasterAsset): ValidationResult => {
    const issues = [];
    
    if (!asset.originalFilename) issues.push({ type: "error" as const, field: "OriginalFilename", message: "Filename is missing." });
    
    if (!asset.title) {
      issues.push({ type: "error" as const, field: "Title", message: "Title is missing." });
    } else if (asset.title.length < 40 || asset.title.length > 80) {
      issues.push({ type: "warning" as const, field: "Title", message: "Title should ideally be 40-80 characters." });
    }

    if (!asset.description) issues.push({ type: "error" as const, field: "Description", message: "Description is missing." });

    const kwCount = asset.keywords?.length || 0;
    if (kwCount < 40) issues.push({ type: "warning" as const, field: "Keywords", message: `Ideally 40-50 keywords. Currently has ${kwCount}.` });
    if (kwCount > 50) issues.push({ type: "warning" as const, field: "Keywords", message: `Pond5 recommends max 50 keywords. Currently has ${kwCount}.` });
    
    return {
      isValid: issues.filter(i => i.type === "error").length === 0,
      issues
    };
  },
  transformAsset: (asset: MasterAsset): PlatformRow => {
    return {
      "OriginalFilename": asset.originalFilename,
      "Title": asset.title || "",
      "Keywords": (asset.keywords || []).slice(0, 50).join(","), // Typically comma without space, but can be space depending on specific dialect
      "Description": asset.description || "",
      "City": asset.city || "",
      "Region": asset.region || "",
      "Country": asset.country || "",
      "Specifysource": "",
      "Modelreleased": asset.modelReleaseRequired ? "Yes" : "No",
      "Propertyreleased": asset.propertyReleaseRequired ? "Yes" : "No",
      "Release": (asset.releaseFiles || []).join(", "),
      "Copyright": asset.copyrightOwner || "",
      "Price": asset.price?.toString() || "",
      "Editorial": asset.editorial ? "Yes" : "No"
    };
  }
};
