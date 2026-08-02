import { Link } from "@/i18n/routing";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Layers, CheckCircle2, Shield, Settings2, FileImage, Download, Info, AlertTriangle, Hammer, Puzzle } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { useTranslations } from 'next-intl';
import { InstallPwaButton } from "@/components/ui/InstallPwaButton";

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32">
          {/* Subtle background grid & glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="container relative mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary px-3 py-1 bg-primary/5">
              {t('badge')}
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              {t('title_part1')} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t('title_part2')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 text-base shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]">
                  {t('cta_create')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#platforms">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/10 hover:bg-white/5">
                  {t('cta_platforms')}
                </Button>
              </Link>
              <InstallPwaButton variant="outline" className="h-12 px-8 text-base border-white/10 hover:bg-white/5" />
            </div>
            
            {/* Realistic UI representation */}
            <div className="mt-20 relative max-w-5xl mx-auto rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm p-4 shadow-2xl">
              <div className="rounded-xl overflow-hidden border border-white/5 bg-background">
                 <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-muted/30">
                    <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-500/50"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500/50"></div>
                 </div>
                 <div className="p-4 bg-muted/10">
                   <div className="flex justify-between items-center mb-4">
                     <div className="flex gap-2">
                       <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Adobe Stock</Badge>
                       <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Shutterstock</Badge>
                     </div>
                     <Button size="sm" variant="secondary">Export CSVs</Button>
                   </div>
                   {/* Fake Table */}
                   <div className="border border-white/10 rounded-md overflow-hidden bg-card">
                     <div className="grid grid-cols-12 gap-4 p-3 border-b border-white/5 bg-muted/30 text-xs text-muted-foreground font-medium">
                       <div className="col-span-3">Filename</div>
                       <div className="col-span-4">Title</div>
                       <div className="col-span-4">Keywords</div>
                       <div className="col-span-1 text-center">Status</div>
                     </div>
                     {[1,2,3].map((i) => (
                       <div key={i} className="grid grid-cols-12 gap-4 p-3 border-b border-white/5 text-sm items-center hover:bg-white/5">
                         <div className="col-span-3 font-mono text-xs truncate">IMG_{2030 + i}.jpg</div>
                         <div className="col-span-4 truncate text-muted-foreground">Beautiful abstract landscape...</div>
                         <div className="col-span-4 flex gap-1 overflow-hidden">
                           <span className="px-2 py-0.5 bg-white/10 rounded text-xs">abstract</span>
                           <span className="px-2 py-0.5 bg-white/10 rounded text-xs">nature</span>
                           <span className="px-2 py-0.5 bg-white/10 rounded text-xs">...</span>
                         </div>
                         <div className="col-span-1 flex justify-center">
                           <CheckCircle2 className="h-4 w-4 text-green-500" />
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="features" className="py-24 bg-muted/20 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Three simple steps to everywhere</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Stop editing spreadsheets manually for every agency. Standardize your workflow.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="relative p-8 rounded-2xl border border-white/10 bg-card hover:border-primary/50 transition-colors group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <FileImage className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. Add Assets</h3>
                  <p className="text-muted-foreground">Register your images, vectors, and videos in a secure, local-first workspace.</p>
                </div>
              </div>

              <div className="relative p-8 rounded-2xl border border-white/10 bg-card hover:border-secondary/50 transition-colors group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-secondary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                    <Settings2 className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Master Metadata</h3>
                  <p className="text-muted-foreground">Write titles and tag keywords once in a powerful editor. Resolve platform-specific warnings instantly.</p>
                </div>
              </div>

              <div className="relative p-8 rounded-2xl border border-white/10 bg-card hover:border-accent/50 transition-colors group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    <Download className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Generate CSVs</h3>
                  <p className="text-muted-foreground">Select your target agencies. We apply the specific delimiter, encoding, and schema needed for each.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Extensions & Apps Section */}
        <section id="extensions" className="py-24 bg-muted/30 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
              <div className="flex-1 space-y-6">
                <Badge variant="outline" className="border-primary/30 text-primary px-3 py-1 bg-primary/5">New Feature</Badge>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Auto-Submitter Chrome Extension</h2>
                <p className="text-lg text-muted-foreground">
                  Stop downloading CSVs. Install our open-source Chrome Extension to instantly inject your curated metadata directly into Shutterstock and Adobe Stock upload forms with a single click.
                </p>
                <div className="flex gap-4 pt-4">
                  <a href="/extension.zip" download="buatincsv-extension.zip" className="inline-block">
                    <Button size="lg" className="h-12 bg-white text-black hover:bg-white/90">
                      <Puzzle className="h-5 w-5 mr-2" />
                      Get Chrome Extension
                    </Button>
                  </a>
                </div>
              </div>
              <div className="flex-1 w-full max-w-md bg-card border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 blur-2xl rounded-full"></div>
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Puzzle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">BuatinCSV Auto-Submitter</h3>
                    <p className="text-xs text-green-500">Supported platform detected.</p>
                  </div>
                </div>
                <Button className="w-full h-12 text-lg shadow-[0_0_15px_-5px_rgba(34,211,238,0.5)]">
                  Inject Metadata Here
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">Simulated Extension UI</p>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section id="platforms" className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Supported Adapters</h2>
                <p className="text-muted-foreground">Built to the exact specifications of major contributor portals.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-6 rounded-xl border border-white/10 bg-card flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-lg">Adobe Stock</span>
                </div>
                <Badge variant="outline" className="w-fit">Verified</Badge>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-card flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-lg">Shutterstock</span>
                </div>
                <Badge variant="outline" className="w-fit">Verified</Badge>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-card flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-lg">Magnific</span>
                </div>
                <Badge variant="outline" className="w-fit">Verified</Badge>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-card/30 flex flex-col gap-2 opacity-70">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span className="font-semibold text-lg">Pond5</span>
                </div>
                <Badge variant="outline" className="w-fit border-amber-500/50 text-amber-500">Experimental</Badge>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-card/30 flex flex-col gap-2 opacity-70">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-lg">Dreamstime</span>
                </div>
                <Badge variant="outline" className="w-fit border-blue-500/50 text-blue-500">Template based</Badge>
              </div>
              <div className="p-6 rounded-xl border border-dashed border-white/20 bg-transparent flex flex-col gap-2 opacity-50">
                <div className="flex items-center gap-3">
                  <Hammer className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold text-lg">Custom CSV</span>
                </div>
                <Badge variant="outline" className="w-fit">Planned</Badge>
              </div>
            </div>
          </div>
        </section>
        
        {/* Security Section */}
        <section id="security" className="py-24 bg-muted/20 border-t border-white/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold tracking-tight mb-4">Local First, Privacy Built-in</h2>
            <p className="text-muted-foreground text-lg mb-8">
              By default, all your metadata and assets remain on your device using IndexedDB. We do not upload your files to our servers unless you explicitly connect a personal Cloud database. Your intellectual property remains yours. No automated portal submissions—you stay in control of the final upload.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6 text-sm text-muted-foreground text-center">
          <div className="flex items-center gap-2 opacity-80">
            <Layers className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground tracking-tight">BuatinCSV</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link href="/blog" className="hover:text-primary transition-colors font-medium text-foreground">Blog & SEO</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/security" className="hover:text-primary transition-colors">Security</Link>
          </div>
          <p className="opacity-60">&copy; {new Date().getFullYear()} BuatinCSV Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
