import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { audiences } from '@/content/audiences';
import { AudienceHero } from '@/components/sections/audiences/AudienceHero';
import { AudienceHighlights } from '@/components/sections/audiences/AudienceHighlights';
import { AudiencePractices } from '@/components/sections/audiences/AudiencePractices';
import { AudienceCTA } from '@/components/sections/audiences/AudienceCTA';
import { OtherAudiences } from '@/components/sections/audiences/OtherAudiences';

export const metadata: Metadata = constructMetadata({
  title: 'Asesoría Jurídica para Particulares y Familias',
  description:
    'Protección integral de su patrimonio, derechos familiares e integridad jurídica en Ciudad Juárez y México. 25 años de experiencia legal.',
  path: '/personas',
});

export default function PersonasPage(): React.ReactElement {
  const audience = audiences.find((a) => a.slug === 'personas') || audiences[0];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero & Breadcrumbs */}
      <AudienceHero
        audience={audience}
        badgeLabel="Atención para Particulares"
        ctaLabel="Consultar por WhatsApp"
      />

      {/* 2. Highlights & Editorial Context */}
      <AudienceHighlights
        audience={audience}
        detailedText="En AGORA comprendemos que los conflictos legales que involucran a personas y familias requieren un equilibrio indispensable entre sensibilidad humana, discreción absoluta y firmeza procesal. Brindamos representación técnica en juicios sucesorios, controversias de propiedad, disolución matrimonial, custodia de menores y defensa penal, protegiendo su patrimonio y tranquilidad jurídica."
        imageCaption="Acompañamiento legal ético y confidencial para proteger el patrimonio y los derechos de las familias en Ciudad Juárez."
        imagePlaceholder="[Fotografía editorial contextual — Asesoría legal para particulares y familias]"
      />

      {/* 3. Relevant Practice Areas */}
      <AudiencePractices
        practiceSlugs={['derecho-civil', 'derecho-familiar', 'derecho-penal', 'amparo']}
        title="Áreas jurídicas para particulares y familias"
        description="Especialidades procesales diseñadas para salvaguardar sus derechos civiles, familiares y constitucionales."
      />

      {/* 4. Direct Conversion Banner */}
      <AudienceCTA
        audience={audience}
        headingText="Proteja sus derechos y patrimonio familiar con el respaldo de AGORA"
        subText="Agende una consulta inicial confidencial para evaluar su situación legal y conocer los pasos procesales recomendados."
        ctaLabel="Consultar sobre mi asunto familiar o civil"
      />

      {/* 5. Other Audiences */}
      <OtherAudiences currentSlug="personas" />
    </div>
  );
}
