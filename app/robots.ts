import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/en/dashboard', '/id/dashboard', '/en/projects', '/id/projects', '/en/settings', '/id/settings'],
    },
    sitemap: 'https://microstock-csv-studio.vercel.app/sitemap.xml',
  };
}
