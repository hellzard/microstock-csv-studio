import { Link } from "@/i18n/routing";
import { Navigation } from '@/components/ui/Navigation';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="space-y-6 text-muted-foreground">
          <p>Last updated: August 2026</p>
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Use of the Application</h2>
            <p>BuatinCSV is a tool to help prepare and format metadata for various microstock platforms. We do not guarantee the acceptance of your submissions by any third-party agency, nor do we guarantee compliance with their evolving legal or technical requirements.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. User Responsibility</h2>
            <p>You are solely responsible for the metadata you generate, export, and submit to agencies. You must ensure that you hold all necessary copyrights, model releases, and property releases for the assets you process. You must not use this tool to process illegal or unauthorized materials.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Loss</h2>
            <p>Because the default Guest Mode relies on your browser's local storage, clearing your browser data or using incognito mode will result in permanent loss of your projects and metadata. We are not liable for any data loss.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
