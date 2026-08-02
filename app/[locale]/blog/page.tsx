import { Metadata } from 'next';
import { blogPosts } from '@/lib/data/blog';
import { Link } from '@/i18n/routing';
import { Badge } from '@/components/ui/badge';
import { Layers, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | BuatinCSV — Microstock Contributor Resources',
  description: 'Read the latest guides, tips, and tutorials on maximizing your microstock earnings through better metadata and automated workflows.',
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar (Simplified for Blog) */}
      <nav className="border-b border-white/10 bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Layers className="h-6 w-6" />
            <span className="font-bold text-lg text-foreground tracking-tight">BuatinCSV</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Microstock Intelligence</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, workflows, and strategies to help you sell more photos, vectors, and videos across global agencies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="p-8 rounded-2xl border border-white/10 bg-card hover:border-primary/50 transition-colors h-full flex flex-col">
                <div className="flex gap-2 mb-4">
                  {post.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="bg-white/5 border-white/10">{tag}</Badge>
                  ))}
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-muted-foreground mb-6 flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto pt-6 border-t border-white/10">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      
      <footer className="py-12 border-t border-white/10 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6 text-sm text-muted-foreground text-center">
          <div className="flex items-center gap-2 opacity-80">
            <Layers className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground tracking-tight">BuatinCSV</span>
          </div>
          <p className="opacity-60">&copy; {new Date().getFullYear()} BuatinCSV Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
