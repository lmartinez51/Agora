import { Metadata } from 'next';
import { siteConfig } from '@/content/site';

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  return 'http://localhost:3000';
}

interface MetaOptions {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  path = '',
  noIndex = false,
}: MetaOptions = {}): Metadata {
  const baseUrl = getBaseUrl();
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.descriptor} en Ciudad Juárez`;
  const metaDescription = description || siteConfig.tagline;
  const canonicalUrl = `${baseUrl}${path}`;

  return {
    title: fullTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: 'es_MX',
      type: 'website',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}
