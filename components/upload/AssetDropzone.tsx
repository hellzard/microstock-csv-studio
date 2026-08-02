"use client";

import { useState, useCallback } from "react";
import { UploadCloud, File, AlertCircle, X, Image as ImageIcon, Video, FileAudio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MasterAsset } from "@/types/master-asset";

export function AssetDropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const [queue, setQueue] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = (files: File[]) => {
    const validExtensions = ["jpg", "jpeg", "png", "mp4", "mov", "eps", "ai"];
    
    const validFiles = files.filter(f => {
      const ext = f.name.split('.').pop()?.toLowerCase();
      return ext && validExtensions.includes(ext);
    });

    if (validFiles.length < files.length) {
      setError(`Some files were rejected. Supported formats: ${validExtensions.join(", ")}`);
    }

    setQueue(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setQueue(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-white/20 bg-card/50 hover:bg-white/5 hover:border-white/30"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <UploadCloud className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-xl font-medium mb-1">Drag and drop assets here</p>
            <p className="text-sm text-muted-foreground">Or click to browse from your computer</p>
          </div>
          <p className="text-xs text-muted-foreground mt-4 max-w-sm mx-auto">
            Supports JPG, PNG, MP4, MOV, and EPS vectors. Metadata will be automatically extracted upon upload.
          </p>
          <label htmlFor="file-upload">
             <Button type="button" variant="outline" className="mt-4 pointer-events-none">
                Browse Files
             </Button>
          </label>
          <input 
            id="file-upload"
            type="file" 
            multiple 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            onChange={(e) => {
              if (e.target.files) handleFiles(Array.from(e.target.files));
              e.target.value = '';
            }}
          />
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
          <Button variant="ghost" size="icon" className="ml-auto h-6 w-6 text-destructive hover:bg-destructive/20" onClick={() => setError(null)}>
             <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {queue.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{queue.length} files queued</h3>
            <Button size="sm">Process Batch</Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {queue.map((file, i) => (
              <div key={`${file.name}-${i}`} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-card/50">
                <div className="h-10 w-10 shrink-0 rounded bg-muted flex items-center justify-center">
                  {file.type.startsWith('image') ? <ImageIcon className="h-5 w-5 text-muted-foreground" /> :
                   file.type.startsWith('video') ? <Video className="h-5 w-5 text-muted-foreground" /> :
                   <File className="h-5 w-5 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFile(i)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
