import { Link } from "@/i18n/routing";
import { Navigation } from '@/components/ui/Navigation';

export default function DataRetentionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Data Retention</h1>
        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Local Storage</h2>
            <p>Projects created in Guest Mode are saved in your browser's IndexedDB. This data remains on your device indefinitely until you clear your browser's site data, use the "Delete Project" function within the app, or if the browser automatically clears storage under low disk space conditions.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Account Deletion</h2>
            <p>If you connect a Cloud database, you must configure your own retention policies and deletion workflows within your provider (e.g., Supabase).</p>
          </section>
        </div>
      </main>
    </div>
  );
}
