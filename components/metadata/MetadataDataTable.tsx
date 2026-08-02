"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { MasterAsset } from "@/types/master-asset";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function MetadataDataTable({ data }: { data: MasterAsset[] }) {
  // Simplified columns for the prototype
  const columns: ColumnDef<MasterAsset>[] = [
    {
      accessorKey: "originalFilename",
      header: "Filename",
      cell: (info) => (
        <div className="font-mono text-xs">{info.getValue() as string}</div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => (
        <Input 
          defaultValue={(info.getValue() as string) || ""} 
          className="h-8 bg-transparent border-transparent hover:border-white/20 focus:border-primary rounded-sm"
          placeholder="Enter title..."
        />
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => (
        <Input 
          defaultValue={(info.getValue() as string) || ""} 
          className="h-8 bg-transparent border-transparent hover:border-white/20 focus:border-primary rounded-sm"
          placeholder="Enter description..."
        />
      ),
    },
    {
      accessorKey: "keywords",
      header: "Keywords",
      cell: (info) => {
        const kws = info.getValue() as string[];
        return (
          <div className="flex items-center gap-1 overflow-hidden h-8">
            {kws?.length ? (
              <Badge variant="outline" className="text-[10px] font-normal truncate max-w-[150px]">
                {kws.join(", ")}
              </Badge>
            ) : (
              <span className="text-xs text-muted-foreground italic">0 tags</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "auditStatus",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() as string;
        if (!status) return null;
        return (
          <Badge variant={status === "Ready" ? "default" : status === "Warning" ? "outline" : "destructive"}>
            {status}
          </Badge>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border border-white/10 bg-card/50 overflow-hidden">
      <div className="overflow-x-auto">
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
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
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
    </div>
  );
}
