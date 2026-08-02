"use client";

import { useEffect, useState } from "react";
import { Settings, Save, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSettingsStore } from "@/lib/store/useSettingsStore";
import { useProjectStore } from "@/lib/store/useProjectStore";
import { useTemplateStore } from "@/lib/store/useTemplateStore";

export default function SettingsPage() {
  const settings = useSettingsStore();
  
  // Local state for form before saving
  const [defaultCopyright, setDefaultCopyright] = useState("");
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [ftpHost, setFtpHost] = useState("");
  const [ftpUser, setFtpUser] = useState("");
  const [ftpPassword, setFtpPassword] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Sync state after hydration to avoid SSR mismatch
  useEffect(() => {
    setDefaultCopyright(settings.defaultCopyright);
    setGeminiApiKey(settings.geminiApiKey);
    setFtpHost(settings.ftpHost || "");
    setFtpUser(settings.ftpUser || "");
    setFtpPassword(settings.ftpPassword || "");
  }, [settings.defaultCopyright, settings.geminiApiKey, settings.ftpHost, settings.ftpUser, settings.ftpPassword]);

  const handleSave = () => {
    settings.updateSettings({ defaultCopyright, geminiApiKey, ftpHost, ftpUser, ftpPassword });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClearData = () => {
    if (confirm("Are you absolutely sure you want to delete all local data? This includes all projects, assets, templates, and settings. This action cannot be undone.")) {
      localStorage.removeItem('microstock-project-storage');
      localStorage.removeItem('microstock-template-storage');
      localStorage.removeItem('microstock-settings-storage');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your global preferences.</p>
        </div>
      </div>

      <Card className="border-white/10 bg-card/30">
        <CardHeader>
          <CardTitle className="text-lg">Defaults</CardTitle>
          <CardDescription>Set default values that apply to new projects automatically.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="copyright">Default Copyright Owner</Label>
            <Input 
              id="copyright" 
              value={defaultCopyright}
              onChange={(e) => setDefaultCopyright(e.target.value)}
              placeholder="e.g. John Doe Photography" 
              className="bg-background/50 max-w-md" 
            />
            <p className="text-xs text-muted-foreground">This name will be pre-filled when you create a new project.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">AI Integration (BYOK)</CardTitle>
          <CardDescription>Configure your Google Gemini API key to enable AI Auto-Tagging.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gemini">Gemini API Key</Label>
            <Input 
              id="gemini"
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="AIzaSy..." 
              className="bg-background/50 max-w-md" 
            />
            <p className="text-xs text-muted-foreground">
              Your key is stored securely in your browser and never sent to our servers. Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI Studio</a>.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-card/30">
        <CardHeader>
          <CardTitle className="text-lg">FTP Upload (Local Scripts)</CardTitle>
          <CardDescription>Configure your default FTP credentials. These will be injected into a local upload script when you export.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ftpHost">FTP Host</Label>
              <Input 
                id="ftpHost"
                value={ftpHost}
                onChange={(e) => setFtpHost(e.target.value)}
                placeholder="ftp.shutterstock.com" 
                className="bg-background/50" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ftpUser">Username</Label>
              <Input 
                id="ftpUser"
                value={ftpUser}
                onChange={(e) => setFtpUser(e.target.value)}
                placeholder="Contributor ID" 
                className="bg-background/50" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ftpPass">Password</Label>
              <Input 
                id="ftpPass"
                type="password"
                value={ftpPassword}
                onChange={(e) => setFtpPassword(e.target.value)}
                placeholder="••••••••" 
                className="bg-background/50" 
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Warning: These credentials are saved in your local browser and will be written in plain text inside the `upload-ftp.bat` script upon export. Keep your computer secure.
          </p>
        </CardContent>
        <CardFooter className="border-t border-white/5 pt-4">
          <Button onClick={handleSave} className="shadow-[0_0_15px_-5px_rgba(34,211,238,0.3)]">
            <Save className="mr-2 h-4 w-4" />
            {isSaved ? "Saved!" : "Save Settings"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <CardTitle className="text-lg">Danger Zone</CardTitle>
          </div>
          <CardDescription>Destructive actions that cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Since data is currently stored in your browser's local storage, clicking the button below will permanently wipe all your projects, templates, and settings from this device.
          </p>
          <Button variant="destructive" onClick={handleClearData}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All Local Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
