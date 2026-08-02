import { Metadata } from 'next';
import { blogPosts } from '@/lib/data/blog';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Layers, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{ slug: string }>;
};

// Dynamic SEO metadata generation based on the blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found | BuatinCSV',
    };
  }

  return {
    title: `${post.title} | BuatinCSV Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-white/10 bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Layers className="h-6 w-6" />
            <span className="font-bold text-lg text-foreground tracking-tight">BuatinCSV</span>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/blog" className="inline-block mb-12">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <span>•</span>
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
          </div>
          
          <div 
            className="blog-content space-y-6 text-muted-foreground leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-12 [&>h2]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2 [&>strong]:text-foreground"
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(/\\n/g, '<br />').replace(/## (.*?)\\n/g, '<h2>$1</h2>').replace(/# (.*?)\\n/g, '') // Basic Markdown parser for MVP
            }} 
          />
          
          <div className="mt-16 pt-8 border-t border-white/10">
            <h3 className="font-bold mb-4">Topics:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
