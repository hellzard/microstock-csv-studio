import Link from 'next/link';
import { Navigation } from '@/components/ui/Navigation';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-muted-foreground">
          <p>Last updated: August 2026</p>
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Local First Architecture</h2>
            <p>BuatinCSV is designed with a local-first architecture. By default, all project data, metadata, and asset files you process using this application remain stored entirely within your browser's local storage (IndexedDB) on your device. We do not upload, process, or store your assets on our servers unless you explicitly configure a personal Cloud storage integration.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Third-Party Services</h2>
            <p>If you use the AI Auto-Tagger feature, your API key and the required data are transmitted directly from your browser to the Google Gemini API. We do not proxy, intercept, or store your API keys or the generated results on our servers.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cloud Mode</h2>
            <p>If you choose to configure a personal Supabase backend (Cloud Mode), your data is stored in the database and storage buckets that you control. You are responsible for securing your database credentials and adhering to the privacy regulations applicable to your jurisdiction.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
