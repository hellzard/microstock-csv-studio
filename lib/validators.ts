import { MasterAsset } from "@/types/master-asset";

export interface ValidationIssue {
  type: 'error' | 'warning';
  message: string;
}

export function validateAsset(asset: MasterAsset): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // General checks
  if (!asset.title) {
    issues.push({ type: 'error', message: 'Title is required' });
  } else if (asset.title.length < 5) {
    issues.push({ type: 'warning', message: 'Title is very short' });
  }

  // Shutterstock specific rules
  // Minimum 5 words for description, minimum 7 keywords
  if (!asset.description) {
     issues.push({ type: 'error', message: 'Description is required for Shutterstock' });
  } else {
     const wordCount = asset.description.trim().split(/\s+/).length;
     if (wordCount < 5) {
       issues.push({ type: 'warning', message: 'Description should be at least 5 words for Shutterstock' });
     }
  }

  if (asset.keywords.length < 7) {
    issues.push({ type: 'error', message: 'Shutterstock requires at least 7 keywords' });
  }

  // Adobe Stock specific rules
  if (asset.keywords.length > 50) {
    issues.push({ type: 'warning', message: 'Adobe Stock allows a maximum of 50 keywords' });
  }

  return issues;
}
