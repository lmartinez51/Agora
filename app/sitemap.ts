import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo';
import { practices } from '@/content/practices';
import { articles } from '@/content/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const currentDate = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/practicas`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/personas`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/empresas`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/extranjeros`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/la-firma`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/equipo`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/conocimiento`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/agenda`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contacto`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/aviso-de-privacidad`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const practiceRoutes: MetadataRoute.Sitemap = practices.map((practice) => ({
    url: `${baseUrl}/practicas/${practice.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/conocimiento/${article.slug}`,
    lastModified: article.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...practiceRoutes, ...articleRoutes];
}
