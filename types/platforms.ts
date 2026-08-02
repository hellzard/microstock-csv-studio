import { MasterAsset } from "./master-asset";

export type AssetType = "image" | "video" | "vector" | "audio";

export interface DocumentationSource {
  url: string;
  title: string;
  verifiedAt: string;
}

export interface CsvConfiguration {
  encoding: string;
  delimiter: string;
  quoteChar: string;
  lineEnding: string;
}

export interface PlatformColumn {
  name: string;
  required: boolean;
  maxLength?: number;
  description?: string;
  // some columns are dynamically computed based on master schema or specific mappings
}

export interface ValidationIssue {
  type: "error" | "warning";
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
}

export type PlatformRow = Record<string, string | number | boolean | null>;

export interface PlatformAdapter {
  id: string;
  displayName: string;
  version: string;
  lastVerifiedAt: string;
  supportedAssetTypes: AssetType[];
  sources: DocumentationSource[];
  csv: CsvConfiguration;
  columns: PlatformColumn[];
  
  validateAsset: (asset: MasterAsset) => ValidationResult;
  transformAsset: (asset: MasterAsset) => PlatformRow;
  generateCsv?: (rows: PlatformRow[]) => Promise<Blob>;
}
