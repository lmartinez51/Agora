import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { AuthorityMetrics } from '@/components/sections/home/AuthorityMetrics';
import { PracticeAreasSection } from '@/components/sections/home/PracticeAreasSection';
import { AudiencePathsSection } from '@/components/sections/home/AudiencePathsSection';
import { InternationalSpotlight } from '@/components/sections/home/InternationalSpotlight';
import { MethodologySection } from '@/components/sections/home/MethodologySection';
import { KnowledgePreview } from '@/components/sections/home/KnowledgePreview';
import { FinalConversion } from '@/components/sections/home/FinalConversion';

export const metadata: Metadata = constructMetadata({
  title: 'Consultoría Jurídica y Litigio en Ciudad Juárez',
  description:
    'Firma legal con 25 años de experiencia en Ciudad Juárez, Chihuahua. Asesoría y representación en Derecho Civil, Mercantil, Familiar, Penal y Juicio de Amparo.',
  path: '/',
});

export default function HomePage(): React.ReactElement {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Authority Metrics */}
      <AuthorityMetrics />

      {/* 3. Practice Areas */}
      <PracticeAreasSection />

      {/* 4. Audience Paths */}
      <AudiencePathsSection />

      {/* 5. International / Cross-Border Spotlight */}
      <InternationalSpotlight />

      {/* 6. Methodology / Trust Principles */}
      <MethodologySection />

      {/* 7. Knowledge Center Preview */}
      <KnowledgePreview />

      {/* 8. Final Conversion */}
      <FinalConversion />
    </div>
  );
}
