"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, CheckCircle2, AlertTriangle, FileArchive, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ExportPage({
  params,
}: {
  params: { projectId: string }; // NOTE: Next.js 15 uses promises for params, this is a simplified synchronous mock for UI build.
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("ZIP file generation complete! (Mock)");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href={`/projects/${params.projectId}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Export Package</h1>
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
                <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">Ready to export</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-muted-foreground">Valid Assets</span>
                <span className="font-medium">120 / 120</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-muted-foreground">Warnings</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between py-2 border-white/5">
                <span className="text-muted-foreground">Format</span>
                <span className="font-mono text-xs text-muted-foreground">UTF-8, Comma (,)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                    <Box className="h-4 w-4 text-amber-500" />
                  </div>
                  <CardTitle className="text-base">Shutterstock</CardTitle>
                </div>
                <Badge variant="outline" className="border-amber-500/50 text-amber-500">2 Issues</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/20 flex gap-3 text-amber-500">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-xs">Categories Missing</p>
                  <p className="text-xs opacity-80 mt-1">2 assets are missing the required category selection for Shutterstock.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/projects/${params.projectId}`}>
                 <Button variant="outline" size="sm" className="border-amber-500/20 text-amber-500 hover:bg-amber-500/10">Fix Issues</Button>
              </Link>
            </CardFooter>
          </Card>
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
                disabled={isExporting}
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
