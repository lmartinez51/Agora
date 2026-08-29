import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { FirmHero } from '@/components/sections/firm/FirmHero';
import { FirmPhilosophy } from '@/components/sections/firm/FirmPhilosophy';
import { FirmMetricsOverview } from '@/components/sections/firm/FirmMetricsOverview';
import { FirmTeamPreview } from '@/components/sections/firm/FirmTeamPreview';
import { FirmCTA } from '@/components/sections/firm/FirmCTA';

export const metadata: Metadata = constructMetadata({
  title: 'La Firma — 25 Años de Experiencia Procesal y Solidez Jurídica',
  description:
    'Conozca la trayectoria de AGORA, ABOGADOS en Ciudad Juárez, Chihuahua. Filosofía de práctica procesal, principios éticos y estructura profesional en México.',
  path: '/la-firma',
});

export default function LaFirmaPage(): React.ReactElement {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Institutional Hero */}
      <FirmHero />

      {/* 2. Practice Philosophy & Pillars */}
      <FirmPhilosophy />

      {/* 3. Verified Metrics Banner */}
      <FirmMetricsOverview />

      {/* 4. Professional Team Structure Overview */}
      <FirmTeamPreview />

      {/* 5. Direct Conversion Banner */}
      <FirmCTA />
    </div>
  );
}
