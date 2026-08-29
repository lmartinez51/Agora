import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticles, getArticleBySlug } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { ArticleHeader } from '@/components/sections/knowledge/ArticleHeader';
import { ArticleBody } from '@/components/sections/knowledge/ArticleBody';
import { ArticleFooter } from '@/components/sections/knowledge/ArticleFooter';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const articles = await getArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return constructMetadata({
      title: 'Artículo No Encontrado',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${article.title} | Guías Legales AGORA`,
    description: article.excerpt,
    path: `/conocimiento/${article.slug}`,
  });
}

export default async function ArticleDetailPage({ params }: PageProps): Promise<React.ReactElement> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col">
      {/* 1. Article Header & Breadcrumbs */}
      <ArticleHeader article={article} />

      {/* 2. Article Body with Structured Content */}
      <ArticleBody article={article} />

      {/* 3. Related Practices & Contextual Article CTA */}
      <ArticleFooter article={article} />
    </div>
  );
}
