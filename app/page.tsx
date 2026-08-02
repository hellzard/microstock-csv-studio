import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Layers, CheckCircle2, Shield, Settings2, FileImage, Download } from 'lucide-react';

import { Navigation } from '@/components/ui/Navigation';

export default function Home() {
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
              Microstock Metadata Control Room
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              One batch. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Every marketplace format.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Prepare titles, keywords, releases, AI details, and platform-ready CSV files from one organized workspace. Export perfectly formatted data for every agency in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 text-base shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]">
                  Create metadata project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#platforms">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/10 hover:bg-white/5">
                  View supported platforms
                </Button>
              </Link>
            </div>
            
            {/* Abstract UI representation instead of heavy 3D for now */}
            <div className="mt-20 relative max-w-5xl mx-auto rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm p-4 shadow-2xl">
              <div className="rounded-xl overflow-hidden border border-white/5 bg-background">
                 <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-muted/30">
                    <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-500/50"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500/50"></div>
                 </div>
                 <div className="p-8 aspect-video flex flex-col items-center justify-center text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/50 via-background to-background">
                    <Layers className="h-16 w-16 text-primary/40 mb-4" />
                    <p className="text-xl font-medium text-white/80">Interactive Workspace Prototype</p>
                    <p className="text-sm text-muted-foreground mt-2">Manage metadata effortlessly across multiple platforms.</p>
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
                  <h3 className="text-xl font-semibold mb-3">1. Upload Batch</h3>
                  <p className="text-muted-foreground">Drop your images, vectors, and videos. We extract technical metadata and EXIF data instantly.</p>
                </div>
              </div>

              <div className="relative p-8 rounded-2xl border border-white/10 bg-card hover:border-secondary/50 transition-colors group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-secondary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                    <Settings2 className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Master Metadata</h3>
                  <p className="text-muted-foreground">Write titles, tag keywords, and attach releases once in our powerful spreadsheet-like editor.</p>
                </div>
              </div>

              <div className="relative p-8 rounded-2xl border border-white/10 bg-card hover:border-accent/50 transition-colors group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    <Download className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Generate CSVs</h3>
                  <p className="text-muted-foreground">Select your target agencies. We validate limits and generate perfectly formatted CSV and ZIP packages.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section id="platforms" className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Supported Adapters</h2>
                <p className="text-muted-foreground">Built to the exact specifications of major contributor portals.</p>
              </div>
              <Button variant="outline">Request a platform</Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Adobe Stock', 'Shutterstock', 'Pond5', 'Magnific', 'Dreamstime (Template)', 'Custom CSV'].map((platform) => (
                <div key={platform} className="p-6 rounded-xl border border-white/10 bg-card/30 flex items-center gap-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Security Section */}
        <section id="security" className="py-24 bg-muted/20 border-t border-white/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold tracking-tight mb-4">Private & Secure</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Your unreleased assets and model releases are strictly protected. We use Row Level Security and private storage buckets to ensure your intellectual property remains yours. No automated portal submissions—you stay in control of the final upload.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            <span className="font-semibold text-foreground">Microstock CSV Studio</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Microstock CSV Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
