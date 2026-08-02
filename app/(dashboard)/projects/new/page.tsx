import { AssetDropzone } from "@/components/upload/AssetDropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
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

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="border-white/10 bg-card/30">
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
              <CardDescription>Configure basic metadata defaults for this batch.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" placeholder="e.g. Summer Beach Photos" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="copyright">Default Copyright Owner (Optional)</Label>
                <Input id="copyright" placeholder="e.g. John Doe" className="bg-background/50" />
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
              <AssetDropzone />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
