"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AssetDropzone } from "@/components/upload/AssetDropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Database, HardDrive, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useProjectStore } from "@/lib/store/useProjectStore";
import { useSettingsStore } from "@/lib/store/useSettingsStore";
import { MasterAsset } from "@/types/master-asset";
import { AssetType } from "@/types/platforms";

const PLATFORMS = [
  { id: 'adobe', name: 'Adobe Stock' },
  { id: 'shutterstock', name: 'Shutterstock' },
  { id: 'freepik', name: 'Freepik' },
  { id: 'vecteezy', name: 'Vecteezy' },
  { id: 'getty', name: 'Getty/iStock' },
];

export default function NewProjectPage() {
  const router = useRouter();
  const { createProject, addAssets } = useProjectStore();
  const { defaultCopyright: defaultCopyrightSetting } = useSettingsStore();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [copyright, setCopyright] = useState(defaultCopyrightSetting || "");
  const [storageMode, setStorageMode] = useState<'local' | 'cloud'>('local');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['adobe', 'shutterstock']);
  const [generativeAiDefault, setGenerativeAiDefault] = useState(false);
  const [assetType, setAssetType] = useState<'image' | 'video' | 'vector' | 'mixed'>('image');
  
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!name) return;
    setIsSubmitting(true);
    
    // Simulate slight processing delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const project = createProject({
      name,
      defaultCopyright: copyright,
      storageMode,
      selectedPlatforms,
      generativeAiDefault,
      assetType
    });
    
    if (files.length > 0) {
      const newAssets: MasterAsset[] = files.map((file, i) => {
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        let fileAssetType: AssetType = "image";
        if (ext === "mp4" || ext === "mov") fileAssetType = "video";
        if (ext === "eps" || ext === "ai") fileAssetType = "vector";
        
        return {
          id: `asset_${Date.now()}_${i}`,
          projectId: project.id,
          originalFilename: file.name,
          currentFilename: file.name,
          extension: ext,
          assetType: fileAssetType,
          mimeType: file.type || "application/octet-stream",
          fileSize: file.size,
          title: "",
          keywords: [],
          editorial: false,
          illustration: fileAssetType === "vector",
          matureContent: false,
          generativeAi: generativeAiDefault,
          auditStatus: "Warning", 
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          copyrightOwner: copyright || undefined,
        };
      });
      
      addAssets(newAssets);
    }
    
    router.push(`/projects/${project.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create New Project</h1>
            <p className="text-sm text-muted-foreground mt-1">Step {step} of 3</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {step === 1 && (
            <Card className="border-white/10 bg-card/30">
              <CardHeader>
                <CardTitle className="text-lg">Project Details</CardTitle>
                <CardDescription>Basic information and storage mode.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name <span className="text-destructive">*</span></Label>
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Summer Beach Photos" 
                    className="bg-background/50" 
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Storage Mode</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setStorageMode('local')}
                      className={`flex flex-col items-start p-4 border rounded-xl transition-all ${
                        storageMode === 'local' 
                          ? 'border-primary bg-primary/10 ring-1 ring-primary' 
                          : 'border-white/10 hover:bg-white/5 hover:border-white/30'
                      }`}
                    >
                      <HardDrive className={`h-5 w-5 mb-2 ${storageMode === 'local' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-semibold text-sm">Local Mode</span>
                      <span className="text-xs text-muted-foreground text-left mt-1">Data saved in browser only</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStorageMode('cloud')}
                      className={`flex flex-col items-start p-4 border rounded-xl transition-all ${
                        storageMode === 'cloud' 
                          ? 'border-primary bg-primary/10 ring-1 ring-primary' 
                          : 'border-white/10 hover:bg-white/5 hover:border-white/30'
                      }`}
                    >
                      <Database className={`h-5 w-5 mb-2 ${storageMode === 'cloud' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-semibold text-sm">Cloud Sync</span>
                      <span className="text-xs text-muted-foreground text-left mt-1">Requires Supabase setup</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="copyright">Default Copyright Owner (Optional)</Label>
                  <Input 
                    id="copyright" 
                    value={copyright}
                    onChange={(e) => setCopyright(e.target.value)}
                    placeholder="e.g. John Doe" 
                    className="bg-background/50" 
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => setStep(2)} disabled={!name}>
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-white/10 bg-card/30">
              <CardHeader>
                <CardTitle className="text-lg">Target Platforms & Metadata</CardTitle>
                <CardDescription>Select where you plan to submit and set AI defaults.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-3">
                  <Label>Target Platforms</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {PLATFORMS.map(platform => {
                      const isSelected = selectedPlatforms.includes(platform.id);
                      return (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => togglePlatform(platform.id)}
                          className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/10' 
                              : 'border-white/10 hover:bg-white/5'
                          }`}
                        >
                          <span className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>
                            {platform.name}
                          </span>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Primary Asset Type</Label>
                  <select 
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value as any)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="image">Photos / Raster Illustrations</option>
                    <option value="vector">Vectors (EPS/AI)</option>
                    <option value="video">Videos (MP4/MOV)</option>
                    <option value="mixed">Mixed Types</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="generative"
                    checked={generativeAiDefault}
                    onChange={(e) => setGenerativeAiDefault(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary bg-background"
                  />
                  <Label htmlFor="generative" className="font-normal cursor-pointer">
                    Assets were created using Generative AI tools (Midjourney, Stable Diffusion, etc.)
                  </Label>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)}>
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-white/10 bg-card/30">
              <CardHeader>
                <CardTitle className="text-lg">Upload Assets</CardTitle>
                <CardDescription>Select or drag & drop files to begin processing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <AssetDropzone onFilesChanged={setFiles} />
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="shadow-[0_0_15px_-5px_rgba(34,211,238,0.4)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Project"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="hidden md:block">
          <div className="sticky top-8 space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Setup Progress</h3>
            <ul className="space-y-4">
              <li className={`flex items-center gap-3 ${step >= 1 ? 'text-foreground' : 'text-muted-foreground opacity-50'}`}>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step > 1 ? 'bg-primary text-primary-foreground' : step === 1 ? 'border-2 border-primary text-primary' : 'border-2 border-muted-foreground'}`}>
                  {step > 1 ? <CheckCircle2 className="h-4 w-4" /> : '1'}
                </div>
                <span className={step === 1 ? 'font-medium text-primary' : ''}>Basic Details</span>
              </li>
              <li className={`flex items-center gap-3 ${step >= 2 ? 'text-foreground' : 'text-muted-foreground opacity-50'}`}>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step > 2 ? 'bg-primary text-primary-foreground' : step === 2 ? 'border-2 border-primary text-primary' : 'border-2 border-muted-foreground'}`}>
                  {step > 2 ? <CheckCircle2 className="h-4 w-4" /> : '2'}
                </div>
                <span className={step === 2 ? 'font-medium text-primary' : ''}>Platforms & AI</span>
              </li>
              <li className={`flex items-center gap-3 ${step >= 3 ? 'text-foreground' : 'text-muted-foreground opacity-50'}`}>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'border-2 border-primary text-primary' : 'border-2 border-muted-foreground'}`}>
                  3
                </div>
                <span className={step === 3 ? 'font-medium text-primary' : ''}>Upload Assets</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
