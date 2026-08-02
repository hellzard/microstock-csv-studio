import Papa from "papaparse";

export interface ImportedRow {
  filename: string;
  title: string;
  description: string;
  keywords: string[];
}

/**
 * Basic heuristic-based CSV importer.
 * It tries to map common column names (Filename, Title, Description, Keywords)
 * to a standard internal structure.
 */
export async function importCsvFile(file: File): Promise<ImportedRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn("CSV parse issues:", results.errors);
        }
        
        const rows = results.data as Record<string, any>[];
        const mappedRows: ImportedRow[] = rows.map(row => {
          // Heuristic key matching
          const getVal = (keys: string[]) => {
            const match = Object.keys(row).find(k => keys.includes(k.toLowerCase().trim()));
            return match ? row[match] : "";
          };

          const filename = getVal(["filename", "file name", "file", "name"]);
          const title = getVal(["title", "description", "caption", "name"]);
          const description = getVal(["description", "title", "caption", "desc"]);
          
          const keywordsStr = getVal(["keywords", "tags", "keyword"]);
          const keywords = keywordsStr 
            ? keywordsStr.split(/[,;]/).map((k: string) => k.trim()).filter(Boolean)
            : [];

          return {
            filename: String(filename),
            title: String(title),
            description: String(description),
            keywords,
          };
        });

        resolve(mappedRows);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}
