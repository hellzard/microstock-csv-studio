"use client";

import { use, useState } from "react";
import { ArrowLeft, Save, Download, Settings, Play, Sparkles, Languages } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MetadataDataTable } from "@/components/metadata/MetadataDataTable";
import { useProjectStore } from "@/lib/store/useProjectStore";
import { useSettingsStore } from "@/lib/store/useSettingsStore";

export default function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  
  const projects = useProjectStore(state => state.projects);
  const allAssets = useProjectStore(state => state.assets);
  const updateAsset = useProjectStore(state => state.updateAsset);
  const geminiApiKey = useSettingsStore(state => state.geminiApiKey);
  
  const [isProcessingAi, setIsProcessingAi] = useState(false);
  
  const project = projects.find(p => p.id === projectId);
  const projectAssets = allAssets.filter(a => a.projectId === projectId);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)]">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Project not found</h2>
        <p className="text-muted-foreground mb-6">The project you are looking for does not exist or has been deleted.</p>
        <Link href="/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] -m-6 md:-m-8">
      {/* Workspace Header */}
      <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-card/50 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-semibold truncate max-w-[200px] sm:max-w-md">
              {project.name}
            </h1>
            <Badge variant="outline" className="hidden sm:inline-flex">{projectAssets.length} Assets</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Settings className="h-4 w-4 mr-2" />
            Platform Config
          </Button>

          <label className="cursor-pointer">
            <input 
              type="file" 
              accept="image/*"
              multiple
              className="hidden" 
              onChange={async (e) => {
                if (!geminiApiKey) {
                  alert("Please configure your Gemini API Key in Settings first.");
                  return;
                }
                if (e.target.files && e.target.files.length > 0) {
                  setIsProcessingAi(true);
                  try {
                    const { generateTagsForImage } = await import("@/lib/ai/gemini");
                    const { downscaleImage } = await import("@/lib/utils/image");
                    
                    const files = Array.from(e.target.files);
                    let processed = 0;
                    
                    for (const file of files) {
                      // Match by originalFilename
                      const asset = projectAssets.find(a => a.originalFilename === file.name);
                      if (asset) {
                        try {
                          const base64 = await downscaleImage(file);
                          const tags = await generateTagsForImage(base64, geminiApiKey);
                          updateAsset(asset.id, {
                            title: tags.title,
                            description: tags.description,
                            keywords: tags.keywords.split(",").map((k: string) => k.trim()),
                            aiGeneratedMetadata: true,
                          });
                          processed++;
                        } catch (err) {
                          console.error("AI Tagging failed for", file.name, err);
                        }
                      }
                    }
                    alert(`AI Auto-Tagging complete for ${processed} matched assets.`);
                  } finally {
                    setIsProcessingAi(false);
                    e.target.value = '';
                  }
                }
              }}
            />
            {/* @ts-expect-error shadcn ui type mismatch in react 19 */}
            <Button variant="outline" size="sm" asChild className="text-amber-500 border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400">
              <span>
                <Sparkles className={`h-4 w-4 mr-2 ${isProcessingAi ? 'animate-pulse' : ''}`} />
                {isProcessingAi ? 'Tagging...' : 'Auto-Tag AI'}
              </span>
            </Button>
          </label>

          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex text-blue-500 border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
            disabled={isProcessingAi}
            onClick={async () => {
              if (!geminiApiKey) {
                alert("Please configure your Gemini API Key in Settings first.");
                return;
              }
              if (confirm("This will translate all Indonesian titles and descriptions to English. Proceed?")) {
                setIsProcessingAi(true);
                try {
                  const { translateToEnglish } = await import("@/lib/ai/gemini");
                  let processed = 0;
                  // Process sequentially to respect rate limits
                  for (const asset of projectAssets) {
                    let updated = false;
                    const updates: any = {};
                    if (asset.title) {
                      updates.title = await translateToEnglish(asset.title, geminiApiKey);
                      updated = true;
                    }
                    if (asset.description) {
                      updates.description = await translateToEnglish(asset.description, geminiApiKey);
                      updated = true;
                    }
                    if (updated) {
                      updateAsset(asset.id, updates);
                      processed++;
                    }
                  }
                  alert(`Translated metadata for ${processed} assets.`);
                } catch (err) {
                  console.error(err);
                  alert("Translation failed. Check console.");
                } finally {
                  setIsProcessingAi(false);
                }
              }
            }}
          >
            <Languages className={`h-4 w-4 mr-2 ${isProcessingAi ? 'animate-pulse' : ''}`} />
            Translate EN
          </Button>

          <label className="cursor-pointer">
            <input 
              type="file" 
              accept=".csv" 
              className="hidden" 
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  try {
                    const { importCsvFile } = await import("@/lib/csv/importer");
                    const importedRows = await importCsvFile(e.target.files[0]);
                    
                    // Match by originalFilename
                    importedRows.forEach(row => {
                      if (!row.filename) return;
                      const asset = projectAssets.find(a => a.originalFilename === row.filename || a.currentFilename === row.filename);
                      if (asset) {
                        updateAsset(asset.id, {
                          title: row.title || asset.title,
                          description: row.description || asset.description,
                          keywords: row.keywords.length > 0 ? row.keywords : asset.keywords,
                        });
                      }
                    });
                    alert(`Imported metadata for ${importedRows.length} rows.`);
                  } catch (err) {
                    alert("Failed to parse CSV");
                  }
                  e.target.value = '';
                }
              }}
            />
            {/* @ts-expect-error shadcn ui type mismatch in react 19 */}
            <Button variant="secondary" size="sm" asChild>
              <span>
                <Play className="h-4 w-4 mr-2" />
                Import CSV
              </span>
            </Button>
          </label>
          <Link href={`/projects/${projectId}/export`}>
            <Button size="sm" className="shadow-[0_0_15px_-5px_rgba(34,211,238,0.4)]">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 overflow-auto p-6 bg-background">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium tracking-tight">Master Metadata</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Save className="h-3 w-3" />
            <span>Autosaved</span>
          </div>
        </div>
        <MetadataDataTable 
          data={projectAssets} 
          onUpdateAsset={(id, updates) => updateAsset(id, updates)} 
          onBulkUpdate={(ids, updates) => {
            ids.forEach(id => updateAsset(id, updates));
          }}
        />
      </div>
    </div>
  );
}
