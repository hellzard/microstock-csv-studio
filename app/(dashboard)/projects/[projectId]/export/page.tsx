"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, AlertTriangle, FileArchive, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjectStore } from "@/lib/store/useProjectStore";
import { useRouter } from "next/navigation";
import { getAdaptersForProject } from "@/lib/adapters";
import { generateCsvBlob } from "@/lib/csv/exporter";
import JSZip from "jszip";

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
  const [exportType, setExportType] = useState<"csv" | "zip">("csv");

  if (!project) return null;

  const adapters = getAdaptersForProject(project.selectedPlatforms || ['adobe', 'shutterstock']);

  // Compute validation per platform
  const platformValidation = adapters.map(adapter => {
    let warnings = 0;
    let errors = 0;
    
    projectAssets.forEach(asset => {
      const result = adapter.validateAsset(asset);
      if (!result.isValid) errors++;
      const hasWarnings = result.issues.some(i => i.type === 'warning');
      if (hasWarnings) warnings++;
    });

    return {
      adapter,
      errors,
      warnings,
      isReady: errors === 0,
    };
  });

  const allReady = platformValidation.every(pv => pv.isReady);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      if (exportType === "csv") {
        // Download each platform's CSV separately
        for (const pv of platformValidation) {
          const rows = projectAssets.map(asset => pv.adapter.transformAsset(asset));
          const blob = await generateCsvBlob(pv.adapter, rows);
          
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${project.name}_${pv.adapter.displayName}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          // Small delay between downloads
          await new Promise(r => setTimeout(r, 500));
        }
      } else {
        // Generate a ZIP containing all CSVs
        const zip = new JSZip();
        
        for (const pv of platformValidation) {
          const rows = projectAssets.map(asset => pv.adapter.transformAsset(asset));
          const blob = await generateCsvBlob(pv.adapter, rows);
          zip.file(`${project.name}_${pv.adapter.displayName}.csv`, blob);
        }
        
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.name}_Metadata.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      updateProjectStatus(projectId, 'Exported');
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export files. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

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
          
          <div className="grid gap-4">
            {platformValidation.map(({ adapter, errors, warnings, isReady }) => (
              <Card key={adapter.id} className="border-white/10 bg-card/30">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {adapter.displayName.charAt(0)}
                      </div>
                      <CardTitle className="text-base">{adapter.displayName}</CardTitle>
                    </div>
                    <Badge variant={isReady ? "default" : "outline"} className={isReady ? "bg-green-500/10 text-green-500 border-green-500/20" : "border-destructive/50 text-destructive"}>
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
                    <span className="text-muted-foreground">Issues (Errors)</span>
                    <span className={`font-medium ${errors > 0 ? "text-destructive" : "text-green-500"}`}>
                      {errors}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-muted-foreground">Warnings</span>
                    <span className={`font-medium ${warnings > 0 ? "text-amber-500" : "text-muted-foreground"}`}>
                      {warnings}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-white/5">
                    <span className="text-muted-foreground">Format</span>
                    <span className="font-mono text-xs text-muted-foreground">{adapter.csv.encoding}, Delimiter: {adapter.csv.delimiter}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {!allReady && (
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    </div>
                    <CardTitle className="text-base">Validation Issues Block Export</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 flex gap-3 text-destructive">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-xs">Errors detected</p>
                    <p className="text-xs opacity-80 mt-1">Please fix the missing required metadata in the workspace before exporting. Platform policies strictly require valid metadata.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/projects/${projectId}`}>
                   <Button variant="outline" size="sm" className="border-destructive/20 text-destructive hover:bg-destructive/10">Fix Issues in Workspace</Button>
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
                  <input type="radio" name="exportType" checked={exportType === "csv"} onChange={() => setExportType("csv")} className="mt-1 accent-primary" />
                  <div>
                    <p className="text-sm font-medium">CSV Files Only</p>
                    <p className="text-xs text-muted-foreground mt-1">Generate and download separate .csv files for each selected platform.</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-card hover:bg-white/5 cursor-pointer transition-colors">
                  <input type="radio" name="exportType" checked={exportType === "zip"} onChange={() => setExportType("zip")} className="mt-1 accent-primary" />
                  <div>
                    <p className="text-sm font-medium">Full ZIP Package</p>
                    <p className="text-xs text-muted-foreground mt-1">Includes CSVs packaged together for convenience.</p>
                  </div>
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full shadow-[0_0_15px_-5px_rgba(34,211,238,0.4)]" 
                size="lg"
                onClick={handleExport}
                disabled={isExporting || projectAssets.length === 0 || !allReady}
              >
                {isExporting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
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
