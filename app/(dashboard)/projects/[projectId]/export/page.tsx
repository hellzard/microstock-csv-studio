"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Download, CheckCircle2, AlertTriangle, FileArchive, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjectStore } from "@/lib/store/useProjectStore";
import { useRouter } from "next/navigation";

export default function ExportPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  
  const projects = useProjectStore(state => state.projects);
  const allAssets = useProjectStore(state => state.assets);
  const updateProjectStatus = useProjectStore(state => state.updateProjectStatus);
  
  const project = projects.find(p => p.id === projectId);
  const projectAssets = allAssets.filter(a => a.projectId === projectId);
  
  const [isExporting, setIsExporting] = useState(false);

  // Simple validation logic for the UI
  const warningsCount = projectAssets.filter(a => !a.title || a.keywords.length < 5).length;
  const isReady = warningsCount === 0;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      updateProjectStatus(projectId, 'Exported');
      alert("Export complete! In a real app, this would download a ZIP file.");
      router.push('/dashboard');
    }, 1500);
  };

  if (!project) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href={`/projects/${projectId}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Export Package: {project.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">Review validation issues and generate CSVs</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Platform Readiness</h2>
          
          <Card className="border-white/10 bg-card/30">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Adobe_A_logo.svg/512px-Adobe_A_logo.svg.png" alt="Adobe" className="h-4 w-4 opacity-70 grayscale" />
                  </div>
                  <CardTitle className="text-base">Adobe Stock</CardTitle>
                </div>
                <Badge variant={isReady ? "default" : "outline"} className={isReady ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}>
                  {isReady ? "Ready to export" : "Needs Review"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-muted-foreground">Total Assets</span>
                <span className="font-medium">{projectAssets.length}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-muted-foreground">Warnings</span>
                <span className={`font-medium ${warningsCount > 0 ? "text-amber-500" : "text-green-500"}`}>
                  {warningsCount}
                </span>
              </div>
              <div className="flex justify-between py-2 border-white/5">
                <span className="text-muted-foreground">Format</span>
                <span className="font-mono text-xs text-muted-foreground">UTF-8, Comma (,)</span>
              </div>
            </CardContent>
          </Card>

          {warningsCount > 0 && (
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </div>
                    <CardTitle className="text-base">Validation Issues</CardTitle>
                  </div>
                  <Badge variant="outline" className="border-amber-500/50 text-amber-500">{warningsCount} Issues</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/20 flex gap-3 text-amber-500">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-xs">Missing Metadata</p>
                    <p className="text-xs opacity-80 mt-1">{warningsCount} assets are missing titles or have fewer than 5 keywords.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/projects/${projectId}`}>
                   <Button variant="outline" size="sm" className="border-amber-500/20 text-amber-500 hover:bg-amber-500/10">Fix Issues</Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="md:col-span-1">
          <Card className="border-primary/20 bg-primary/5 sticky top-24 shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]">
            <CardHeader>
              <CardTitle className="text-lg">Export Options</CardTitle>
              <CardDescription>Generate your final package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-card hover:bg-white/5 cursor-pointer transition-colors">
                  <input type="radio" name="exportType" className="mt-1 accent-primary" defaultChecked />
                  <div>
                    <p className="text-sm font-medium">CSV Files Only</p>
                    <p className="text-xs text-muted-foreground mt-1">Generate .csv files structured for each selected platform.</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-card hover:bg-white/5 cursor-pointer transition-colors">
                  <input type="radio" name="exportType" className="mt-1 accent-primary" />
                  <div>
                    <p className="text-sm font-medium">Full ZIP Package</p>
                    <p className="text-xs text-muted-foreground mt-1">Includes CSVs, matched original assets, and validation reports.</p>
                  </div>
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full shadow-[0_0_15px_-5px_rgba(34,211,238,0.4)]" 
                size="lg"
                onClick={handleExport}
                disabled={isExporting || projectAssets.length === 0}
              >
                {isExporting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FileArchive className="h-4 w-4" />
                    Generate Export
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
