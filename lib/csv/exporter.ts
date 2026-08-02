import { PlatformAdapter, PlatformRow } from "@/types/platforms";
import Papa from "papaparse";

export async function generateCsvBlob(adapter: PlatformAdapter, rows: PlatformRow[]): Promise<Blob> {
  // Map rows strictly to adapter columns in the correct order
  const orderedData = rows.map(row => {
    const orderedRow: Record<string, any> = {};
    adapter.columns.forEach(col => {
      orderedRow[col.name] = row[col.name] !== undefined ? row[col.name] : "";
    });
    return orderedRow;
  });

  const csvString = Papa.unparse(orderedData, {
    quotes: true, // Typically standard for safety
    quoteChar: adapter.csv.quoteChar || '"',
    escapeChar: '"',
    delimiter: adapter.csv.delimiter || ",",
    header: true,
    newline: adapter.csv.lineEnding || "\r\n",
  });

  // Adding BOM for UTF-8 to ensure Excel compatibility in international locales
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  return new Blob([bom, csvString], { type: "text/csv;charset=utf-8;" });
}
