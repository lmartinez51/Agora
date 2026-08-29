import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { TeamHero } from '@/components/sections/team/TeamHero';
import { TeamGrid } from '@/components/sections/team/TeamGrid';
import { TeamNotice } from '@/components/sections/team/TeamNotice';
import { FirmCTA } from '@/components/sections/firm/FirmCTA';

export const metadata: Metadata = constructMetadata({
  title: 'Equipo Jurídico — 7 Abogados y 2 Socios Directores',
  description:
    'Estructura profesional de AGORA, ABOGADOS en Ciudad Juárez, Chihuahua. Socios directores y abogados asociados en cinco áreas del derecho mexicano.',
  path: '/equipo',
});

export default function EquipoPage(): React.ReactElement {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Team Hero */}
      <TeamHero />

      {/* 2. Structured Team Grid (Partners & Associates) */}
      <TeamGrid />

      {/* 3. Transparency Notice */}
      <TeamNotice />

      {/* 4. Direct Conversion Banner */}
      <FirmCTA />
    </div>
  );
}
