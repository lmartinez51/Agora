import type { Metadata, Viewport } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/content/site';
import { constructMetadata } from '@/lib/seo';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Editorial Serif font placeholder - tracked under PENDING DESIGN DECISION
const fontSerif = Cinzel({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: '#111827',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: siteConfig.name,
    description: siteConfig.tagline,
    telephone: siteConfig.contact.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: siteConfig.location.country,
    },
    openingHours: siteConfig.contact.hours,
    priceRange: '$$',
  };

  return (
    <html lang="es" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-brand-canvas text-brand-text-primary antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
