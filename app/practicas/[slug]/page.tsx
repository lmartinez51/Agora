import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPractices, getPracticeBySlug } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { PracticeHero } from '@/components/sections/practices/PracticeHero';
import { PracticeServices } from '@/components/sections/practices/PracticeServices';
import { PracticeFAQ } from '@/components/sections/practices/PracticeFAQ';
import { PracticeCTA } from '@/components/sections/practices/PracticeCTA';
import { RelatedPractices } from '@/components/sections/practices/RelatedPractices';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const practices = await getPractices();
  return practices.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const practice = await getPracticeBySlug(params.slug);

  if (!practice) {
    return constructMetadata({
      title: 'Materia No Encontrada',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${practice.title} en Ciudad Juárez`,
    description: practice.shortDescription,
    path: `/practicas/${practice.slug}`,
  });
}

export default async function PracticeDetailPage({ params }: PageProps): Promise<React.ReactElement> {
  const practice = await getPracticeBySlug(params.slug);

  if (!practice) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col">
      {/* 1. Practice Hero & Breadcrumb */}
      <PracticeHero practice={practice} />

      {/* 2. Practice Overview & Verified Services List */}
      <PracticeServices practice={practice} />

      {/* 3. Practice Verified FAQs */}
      <PracticeFAQ practice={practice} />

      {/* 4. Direct Practice Conversion Banner */}
      <PracticeCTA practice={practice} />

      {/* 5. Related Practices Navigation */}
      <RelatedPractices currentSlug={practice.slug} />
    </div>
  );
}
