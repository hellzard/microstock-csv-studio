export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or simple HTML
  date: string;
  tags: string[];
  author: string;
  imageUrl?: string;
}
