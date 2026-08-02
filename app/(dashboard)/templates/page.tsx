"use client";

import { useState } from "react";
import { UploadCloud, Plus, Save, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTemplateStore, MetadataTemplate } from "@/lib/store/useTemplateStore";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export default function TemplatesPage() {
  const { templates, createTemplate, updateTemplate, deleteTemplate } = useTemplateStore();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const resetForm = () => {
    setName("");
    setTitle("");
    setDescription("");
    setKeywords("");
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (tpl: MetadataTemplate) => {
    setName(tpl.name);
    setTitle(tpl.title);
    setDescription(tpl.description);
    setKeywords(tpl.keywords.join(", "));
    setEditingId(tpl.id);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    
    const parsedKeywords = keywords.split(",").map(k => k.trim()).filter(Boolean);
    
    if (editingId) {
      updateTemplate(editingId, {
        name,
        title,
        description,
        keywords: parsedKeywords,
      });
    } else {
      createTemplate({
        name,
        title,
        description,
        keywords: parsedKeywords,
      });
    }
    
    resetForm();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UploadCloud className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
            <p className="text-muted-foreground mt-1">Manage reusable metadata presets.</p>
          </div>
        </div>
        {!isFormOpen && (
          <Button onClick={() => setIsFormOpen(true)} className="shadow-[0_0_15px_-5px_rgba(34,211,238,0.4)]">
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        )}
      </div>

      {isFormOpen && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Template" : "Create New Template"}</CardTitle>
            <CardDescription>Define a preset to quickly apply metadata to multiple assets.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name <span className="text-destructive">*</span></Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="e.g. Minimalist UI Kit" 
                className="bg-background/50" 
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Default Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Leave blank if not needed..." 
                  className="bg-background/50" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Default Description</Label>
                <Input 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Leave blank if not needed..." 
                  className="bg-background/50" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Default Keywords</Label>
              <Input 
                id="keywords" 
                value={keywords} 
                onChange={(e) => setKeywords(e.target.value)} 
                placeholder="Comma separated tags (e.g. ui, web, modern, clean)" 
                className="bg-background/50" 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t border-white/5 pt-4">
            <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSave} disabled={!name.trim()}>
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((tpl) => (
          <Card key={tpl.id} className="border-white/10 bg-card/30 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{tpl.name}</CardTitle>
              <CardDescription className="text-xs">
                Created {formatDistanceToNow(new Date(tpl.createdAt), { addSuffix: true })}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Title</p>
                <p className="text-sm truncate">{tpl.title || <span className="italic opacity-50">Empty</span>}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Keywords ({tpl.keywords.length})</p>
                <div className="flex flex-wrap gap-1">
                  {tpl.keywords.slice(0, 5).map(k => (
                    <Badge key={k} variant="secondary" className="text-[10px]">{k}</Badge>
                  ))}
                  {tpl.keywords.length > 5 && (
                    <Badge variant="outline" className="text-[10px]">+{tpl.keywords.length - 5} more</Badge>
                  )}
                  {tpl.keywords.length === 0 && <span className="text-sm italic opacity-50">None</span>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/5 pt-3 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(tpl)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteTemplate(tpl.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
        {templates.length === 0 && !isFormOpen && (
          <div className="md:col-span-2 lg:col-span-3 text-center p-12 border border-white/5 rounded-xl text-muted-foreground">
            <p>No templates found. Create one to save time when adding metadata!</p>
          </div>
        )}
      </div>
    </div>
  );
}
