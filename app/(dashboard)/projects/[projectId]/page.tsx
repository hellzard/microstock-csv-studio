import { ArrowLeft, Save, Download, Settings, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MetadataDataTable } from "@/components/metadata/MetadataDataTable";
import { MasterAsset } from "@/types/master-asset";

// Mock data for the prototype
const mockAssets: MasterAsset[] = [
  {
    id: "1",
    projectId: "proj_1",
    originalFilename: "IMG_9042_beach_sunset.jpg",
    currentFilename: "IMG_9042_beach_sunset.jpg",
    extension: "jpg",
    assetType: "image",
    mimeType: "image/jpeg",
    fileSize: 4500000,
    title: "Beautiful golden hour sunset over tropical beach",
    keywords: ["sunset", "beach", "ocean", "tropical", "sand", "waves"],
    editorial: false,
    illustration: false,
    matureContent: false,
    generativeAi: false,
    auditStatus: "Ready",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    projectId: "proj_1",
    originalFilename: "Vector_cityscape_ai_generated.eps",
    currentFilename: "Vector_cityscape_ai_generated.eps",
    extension: "eps",
    assetType: "vector",
    mimeType: "application/postscript",
    fileSize: 1200000,
    title: "Futuristic neon city skyline illustration",
    keywords: ["cityscape", "neon", "cyberpunk", "futuristic", "skyline"],
    editorial: false,
    illustration: true,
    matureContent: false,
    generativeAi: true,
    prompt: "cyberpunk city skyline at night, neon lights, highly detailed vector illustration",
    generationModel: "Midjourney v5",
    auditStatus: "Warning",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default async function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

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
              Summer Beach Photos
            </h1>
            <Badge variant="outline" className="hidden sm:inline-flex">2 Assets</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Settings className="h-4 w-4 mr-2" />
            Platform Config
          </Button>
          <Button variant="secondary" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Validate
          </Button>
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
            <span>Autosaved just now</span>
          </div>
        </div>
        <MetadataDataTable data={mockAssets} />
      </div>
    </div>
  );
}
