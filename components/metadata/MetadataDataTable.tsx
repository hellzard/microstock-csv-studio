"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  RowSelectionState,
} from "@tanstack/react-table";
import { MasterAsset } from "@/types/master-asset";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { validateAsset } from "@/lib/validators";
import { AlertTriangle, Bot, CheckSquare, Sparkles, CopyPlus } from "lucide-react";
import { useTemplateStore } from "@/lib/store/useTemplateStore";
import { scanForTrademarks } from "@/lib/validators/trademark-auditor";

interface MetadataDataTableProps {
  data: MasterAsset[];
  onUpdateAsset?: (assetId: string, updates: Partial<MasterAsset>) => void;
  onBulkUpdate?: (assetIds: string[], updates: Partial<MasterAsset>) => void;
}

export function MetadataDataTable({ data, onUpdateAsset, onBulkUpdate }: MetadataDataTableProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const templates = useTemplateStore(state => state.templates);

  const columns: ColumnDef<MasterAsset>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="accent-primary w-4 h-4 rounded cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="accent-primary w-4 h-4 rounded cursor-pointer"
        />
      ),
    },
    {
      accessorKey: "originalFilename",
      header: "Filename",
      cell: (info) => (
        <div className="font-mono text-xs w-24 truncate" title={info.getValue() as string}>
          {info.getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => {
        const asset = info.row.original;
        const audit = scanForTrademarks(asset.title || "", []);
        const hasViolations = audit.hasViolations;
        
        return (
          <Input 
            defaultValue={(info.getValue() as string) || ""} 
            onBlur={(e) => onUpdateAsset?.(asset.id, { title: e.target.value })}
            className={`h-8 bg-transparent ${hasViolations ? 'border-destructive focus:border-destructive text-destructive' : 'border-transparent hover:border-white/20 focus:border-primary'} rounded-sm`}
            placeholder="Enter title..."
            title={hasViolations ? `Trademark warning: ${audit.violations.join(", ")}` : undefined}
          />
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => {
        const asset = info.row.original;
        return (
          <Input 
            defaultValue={(info.getValue() as string) || ""} 
            onBlur={(e) => onUpdateAsset?.(asset.id, { description: e.target.value })}
            className="h-8 bg-transparent border-transparent hover:border-white/20 focus:border-primary rounded-sm"
            placeholder="Enter description..."
          />
        );
      },
    },
    {
      accessorKey: "keywords",
      header: "Keywords",
      cell: (info) => {
        const asset = info.row.original;
        const kws = info.getValue() as string[];
        const audit = scanForTrademarks("", kws || []);
        
        return (
          <div className="flex flex-col gap-1">
            <Input
              defaultValue={kws?.join(", ") || ""}
              onBlur={(e) => onUpdateAsset?.(asset.id, { 
                keywords: e.target.value.split(",").map(k => k.trim()).filter(Boolean) 
              })}
              className={`h-8 bg-transparent ${audit.hasViolations ? 'border-destructive focus:border-destructive text-destructive' : 'border-transparent hover:border-white/20 focus:border-primary'} rounded-sm`}
              placeholder="Enter keywords..."
              title={audit.hasViolations ? `Trademark warning: ${audit.violations.join(", ")}` : undefined}
            />
            {audit.hasViolations && (
              <span className="text-[10px] text-destructive font-medium flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {audit.violations.join(", ")}
              </span>
            )}
          </div>
        );
      },
    },
    {
      id: "validation",
      header: "Status",
      cell: (info) => {
        const asset = info.row.original;
        const issues = validateAsset(asset);
        
        if (issues.length === 0 && asset.title) {
          return <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">Ready</Badge>;
        }

        return (
          <div className="flex items-center gap-1 cursor-help" title={issues.map(i => i.message).join("\n")}>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-xs text-amber-500 font-medium">{issues.length} Issues</span>
          </div>
        );
      },
    },

  ];

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedRows = table.getSelectedRowModel().rows;

  const handleApplyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template || selectedRows.length === 0) return;

    const ids = selectedRows.map(r => r.original.id);
    onBulkUpdate?.(ids, {
      title: template.title,
      description: template.description,
      keywords: template.keywords
    });
    setRowSelection({});
  };

  return (
    <div className="space-y-4">
      {/* Bulk Action Bar */}
      {selectedRows.length > 0 && (
        <div className="p-3 bg-primary/10 border border-primary/20 rounded-md flex items-center justify-between flex-wrap gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{selectedRows.length} assets selected</span>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <select 
              className="h-8 text-sm bg-background border border-white/10 rounded px-2"
              onChange={(e) => handleApplyTemplate(e.target.value)}
              value=""
            >
              <option value="" disabled>Apply Template...</option>
              {templates.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={() => {
                const ids = selectedRows.map(r => r.original.id);
                onBulkUpdate?.(ids, { generativeAi: true });
                setRowSelection({});
              }}
            >
              Set as Gen AI
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={() => {
                const ids = selectedRows.map(r => r.original.id);
                onBulkUpdate?.(ids, { editorial: true });
                setRowSelection({});
              }}
            >
              Set as Editorial
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-muted-foreground"
              onClick={() => setRowSelection({})}
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border border-white/10 bg-card/50 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b border-white/10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 font-medium whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${row.getIsSelected() ? 'bg-primary/5' : ''}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                    No assets uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-white/5">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => {
              const asset = row.original;
              const isSelected = row.getIsSelected();
              return (
                <div key={row.id} className={`p-4 space-y-3 transition-colors ${isSelected ? 'bg-primary/5' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={row.getToggleSelectedHandler()}
                        className="accent-primary w-4 h-4 rounded cursor-pointer shrink-0 mt-1"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{asset.originalFilename}</p>
                        <p className="text-xs text-muted-foreground">
                          {asset.assetType} • {(asset.fileSize / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                    {/* Status badge rendered directly for mobile */}
                    <div className="shrink-0">
                      {flexRender(row.getVisibleCells().find(c => c.column.id === 'validation')?.column.columnDef.cell, row.getVisibleCells().find(c => c.column.id === 'validation')?.getContext()!)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Input 
                      defaultValue={asset.title || ""} 
                      onBlur={(e) => onUpdateAsset?.(asset.id, { title: e.target.value })}
                      className="h-8 text-sm"
                      placeholder="Enter title..."
                    />
                    <Input
                      defaultValue={asset.keywords?.join(", ") || ""}
                      onBlur={(e) => {
                        const val = e.target.value;
                        const newKeywords = val ? val.split(",").map(k => k.trim()).filter(Boolean) : [];
                        onUpdateAsset?.(asset.id, { keywords: newKeywords });
                      }}
                      className="h-8 text-sm"
                      placeholder="Keywords (comma separated)"
                    />
                  </div>
                  
                  <div className="flex justify-end pt-1">
                     {flexRender(row.getVisibleCells().find(c => c.column.id === 'actions')?.column.columnDef.cell, row.getVisibleCells().find(c => c.column.id === 'actions')?.getContext()!)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No assets uploaded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
