"use client";

import { use } from "react";
import { ArrowLeft, Save, Download, Settings, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MetadataDataTable } from "@/components/metadata/MetadataDataTable";
import { useProjectStore } from "@/lib/store/useProjectStore";

export default function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  
  const projects = useProjectStore(state => state.projects);
  const allAssets = useProjectStore(state => state.assets);
  const updateAsset = useProjectStore(state => state.updateAsset);
  
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
