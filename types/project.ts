export interface Project {
  id: string;
  name: string;
  assetType?: 'image' | 'video' | 'vector' | 'audio' | 'mixed';
  metadataLanguage?: string;
  defaultCopyright?: string;
  generativeAiDefault?: boolean;
  defaultGenerationModel?: string;
  selectedPlatforms: string[];
  exportNamingConvention?: string;
  status: 'Draft' | 'Ready' | 'Exported';
  storageMode: 'local' | 'cloud';
  createdAt: string;
  updatedAt: string;
}
