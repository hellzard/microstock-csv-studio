"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AssetDropzone } from "@/components/upload/AssetDropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useProjectStore } from "@/lib/store/useProjectStore";
import { MasterAsset } from "@/types/master-asset";
import { AssetType } from "@/types/platforms";

export default function NewProjectPage() {
  const router = useRouter();
  const { createProject, addAssets } = useProjectStore();
  
  const [name, setName] = useState("");
  const [copyright, setCopyright] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name) return;
    setIsSubmitting(true);
    
    // Simulate slight processing delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const project = createProject(name, copyright);
    
    if (files.length > 0) {
      const newAssets: MasterAsset[] = files.map((file, i) => {
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        let assetType: AssetType = "image";
        if (ext === "mp4" || ext === "mov") assetType = "video";
        if (ext === "eps" || ext === "ai") assetType = "vector";
        
        return {
          id: `asset_${Date.now()}_${i}`,
          projectId: project.id,
          originalFilename: file.name,
          currentFilename: file.name,
          extension: ext,
          assetType,
          mimeType: file.type || "application/octet-stream",
          fileSize: file.size,
          title: "",
          keywords: [],
          editorial: false,
          illustration: assetType === "vector",
          matureContent: false,
          generativeAi: false,
          auditStatus: "Warning", // Warning by default because metadata is missing
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
            <p className="text-sm text-muted-foreground mt-1">Setup your project and upload assets</p>
          </div>
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={!name || isSubmitting}
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

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="border-white/10 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
              <CardDescription>Configure basic metadata defaults for this batch.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="border-white/10 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg">Upload Assets</CardTitle>
              <CardDescription>Select or drag & drop files to begin processing.</CardDescription>
            </CardHeader>
            <CardContent>
              <AssetDropzone onFilesChanged={setFiles} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
