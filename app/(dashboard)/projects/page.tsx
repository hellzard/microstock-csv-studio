"use client";

import Link from "next/link";
import { Plus, Folder, Search, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjectStore } from "@/lib/store/useProjectStore";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ProjectsPage() {
  const { projects, assets, deleteProject } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Folder className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage all your metadata batches.</p>
          </div>
        </div>
        <Link href="/projects/new">
          <Button className="shadow-[0_0_15px_-5px_rgba(34,211,238,0.4)]">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card/50 border-white/10" 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => {
          const projectAssets = assets.filter(a => a.projectId === project.id).length;
          return (
            <Card key={project.id} className="border-white/10 bg-card/30 hover:border-primary/50 transition-colors group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 shrink-0 rounded bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <Folder className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    {project.storageMode === 'cloud' ? (
                      <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">Cloud</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Local</Badge>
                    )}
                    <Badge variant={project.status === 'Ready' ? 'default' : project.status === 'Exported' ? 'secondary' : 'secondary'} className="text-xs">
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                <CardDescription className="text-xs">
                  Created {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assets</span>
                  <span className="font-medium">{projectAssets}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Copyright</span>
                  <span className="font-medium truncate max-w-[120px]">{project.defaultCopyright || <span className="italic opacity-50">None</span>}</span>
                </div>
              </CardContent>
              <div className="p-4 pt-0 border-t border-white/5 mt-4 flex items-center gap-2 justify-end">
                <Button variant="ghost" size="icon" onClick={() => deleteProject(project.id)} className="text-muted-foreground hover:text-destructive shrink-0 mt-4">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Link href={`/projects/${project.id}`} className="flex-1 mt-4">
                  <Button variant="secondary" className="w-full">
                    Open Workspace
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
        
        {filteredProjects.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center p-12 border border-white/5 rounded-xl text-muted-foreground bg-card/10">
            <Folder className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm">Create a new project or try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
