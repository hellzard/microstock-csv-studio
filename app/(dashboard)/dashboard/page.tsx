"use client";

import Link from "next/link";
import { Plus, FileImage, Layers, Download, AlertTriangle, Folder, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjectStore } from "@/lib/store/useProjectStore";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
  const { projects, assets, deleteProject } = useProjectStore();

  const totalAssets = assets.length;
  // Let's pretend any export count is a derivative of exported projects
  const exportedCount = projects.filter(p => p.status === 'Exported').length;
  // Warnings could be assets with empty titles or keywords
  const unresolvedIssues = assets.filter(a => !a.title || a.keywords.length < 5).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Manage your microstock metadata projects.</p>
        </div>
        <Link href="/projects/new">
          <Button className="shadow-[0_0_15px_-5px_rgba(34,211,238,0.4)]">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
            <Layers className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Assets Processed</CardTitle>
            <FileImage className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssets}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projects Exported</CardTitle>
            <Download className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exportedCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Assets Needing Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{unresolvedIssues}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Recent Projects</h2>
          <Card className="border-white/10 bg-card/30">
            {projects.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p>No projects yet. Create one to get started!</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {projects.map((project) => {
                  const projectAssets = assets.filter(a => a.projectId === project.id).length;
                  return (
                    <div key={project.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-white/5 transition-colors gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 shrink-0 rounded bg-primary/10 flex items-center justify-center">
                          <Folder className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm max-w-[200px] truncate">{project.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {projectAssets} assets • {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={project.status === 'Ready' ? 'default' : project.status === 'Exported' ? 'outline' : 'secondary'} className="text-xs shrink-0">
                          {project.status}
                        </Badge>
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="ghost" size="sm">Open</Button>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => deleteProject(project.id)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Platform Status</h2>
          <Card className="border-white/10 bg-card/30 p-4 space-y-4">
            {[
              { name: "Adobe Stock", verified: "Aug 2026", status: "up-to-date" },
              { name: "Shutterstock", verified: "Aug 2026", status: "up-to-date" },
              { name: "Pond5", verified: "Aug 2026", status: "up-to-date" },
              { name: "Magnific", verified: "Aug 2026", status: "up-to-date" },
            ].map((platform, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm font-medium">{platform.name}</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  {platform.verified}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
