# BuatinCSV (formerly CSV Studio)

BuatinCSV is a local-first metadata editor for Microstock contributors.
It allows photographers, illustrators, and generative AI artists to easily manage their asset metadata (Titles, Descriptions, Keywords) and export them to highly validated CSV files compatible with major stock agencies.

## Features

- **Local-First Architecture:** All data is saved directly in your browser using IndexedDB. No server database required.
- **Microstock Adapters:** Built-in validation and column mapping for Adobe Stock, Shutterstock, Freepik, and Vecteezy.
- **Bulk Editing:** Apply templates, set copyright, and mark assets as Generative AI or Editorial in bulk.
- **CSV Sanitization:** Automatic protection against CSV injection attacks.
- **ZIP Export:** Download multiple agency-ready CSV files in a single ZIP archive.
- **CSV Import:** Heuristic-based CSV importing to quickly load existing metadata.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **State Management:** Zustand + idb-keyval
- **Styling:** Tailwind CSS + shadcn/ui
- **Data Tables:** TanStack Table v8
- **Exporting:** PapaParse, JSZip

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cloud Sync Mode (Optional)

The application supports an optional Cloud Sync mode powered by Supabase.
Check `supabase/migrations/` for the initial database schema and RLS policies.

## Security

Please see `SECURITY.md` for information on how to report vulnerabilities and our security practices (including CSP headers and CSV Formula Injection mitigation).
