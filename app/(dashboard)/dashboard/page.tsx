import Link from "next/link";
import { Plus, FileImage, Layers, Download, CheckCircle2, AlertTriangle, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
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
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Assets Processed</CardTitle>
            <FileImage className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">CSV Exports</CardTitle>
            <Download className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unresolved Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">3</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Recent Projects</h2>
          <Card className="border-white/10 bg-card/30">
            <div className="divide-y divide-white/5">
              {[
                { name: "Summer Beach Photos", assets: 45, date: "2 hours ago", status: "Ready" },
                { name: "AI Architecture Concepts", assets: 120, date: "Yesterday", status: "Draft" },
                { name: "City Timelapse 4K", assets: 12, date: "Last week", status: "Exported" },
              ].map((project, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                      <Folder className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{project.name}</h3>
                      <p className="text-xs text-muted-foreground">{project.assets} assets • {project.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={project.status === 'Ready' ? 'default' : project.status === 'Exported' ? 'outline' : 'secondary'} className="text-xs">
                      {project.status}
                    </Badge>
                    <Link href={`/projects/${i}`}>
                      <Button variant="ghost" size="sm">Open</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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


