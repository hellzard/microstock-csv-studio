import { AssetType } from "./platforms";

export interface MasterAsset {
  id: string;
  projectId: string;
  originalFilename: string;
  currentFilename: string;
  extension: string;
  assetType: AssetType;
  mimeType: string;
  fileSize: number;
  
  // Image specific
  width?: number;
  height?: number;
  aspectRatio?: number;
  megapixels?: number;
  colorProfile?: string;
  alphaChannel?: boolean;
  
  // Video specific
  duration?: number;
  frameRate?: number;
  codec?: string;

  // Metadata
  title?: string;
  description?: string;
  keywords: string[];
  keywordOrder?: number[];
  categoryConcept?: string;
  secondaryCategoryConcept?: string;
  country?: string;
  region?: string;
  city?: string;
  
  // Flags
  editorial: boolean;
  illustration: boolean;
  matureContent: boolean;
  generativeAi: boolean;
  copyrightOwner?: string;
  category?: string | number;
  releases?: string[];
  
  auditStatus: 'Pass' | 'Warning' | 'Error';
  fictionalPeople?: boolean;
  fictionalProperty?: boolean;
  recognizablePerson?: boolean;
  recognizableProperty?: boolean;
  prompt?: string;
  negativePrompt?: string;
  generationModel?: string;
  referenceImageUsed?: boolean;
  
  // Releases
  modelReleaseRequired?: boolean;
  propertyReleaseRequired?: boolean;
  releaseFiles?: string[];
  
  // Commerce
  price?: number;
  notes?: string;
  
  // Overrides per platform
  platformOverrides?: Record<string, Partial<MasterAsset>>;
  
  createdAt: string;
  updatedAt: string;
}
