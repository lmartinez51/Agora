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
  title: 'Consultoría Legal Corporativa y Litigio Mercantil para Empresas',
  description:
    'Solidez jurídica, prevención de riesgos contractuales y litigio mercantil en Ciudad Juárez y la frontera norte de México.',
  path: '/empresas',
});

export default function EmpresasPage(): React.ReactElement {
  const audience = audiences.find((a) => a.slug === 'empresas') || audiences[1];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero & Breadcrumbs */}
      <AudienceHero
        audience={audience}
        badgeLabel="Atención Corporativa y Comercial"
        ctaLabel="Consultar asesoría empresarial"
      />

      {/* 2. Highlights & Editorial Context */}
      <AudienceHighlights
        audience={audience}
        detailedText="Las operaciones comerciales en el entorno fronterizo e industrial de Ciudad Juárez exigen blindaje contractual riguroso y capacidad de respuesta procesal inmediata. En AGORA asesoramos a sociedades mercantiles, inversionistas y directivos en la estructuración de contratos comerciales, cobranza judicial de títulos de crédito, gobierno corporativo y litigio mercantil contencioso ante tribunales locales y federales."
        imageCaption="Respaldo legal estratégico y resolución de controversias comerciales para empresas en Ciudad Juárez y la frontera norte."
        imagePlaceholder="[Fotografía editorial contextual — Consultoría jurídica corporativa y comercial]"
      />

      {/* 3. Relevant Practice Areas */}
      <AudiencePractices
        practiceSlugs={['derecho-mercantil', 'derecho-civil', 'amparo']}
        title="Áreas jurídicas para empresas y comercio"
        description="Especialidades procesales enfocadas en la seguridad operativa, patrimonial y mercantil de su organización."
      />

      {/* 4. Direct Conversion Banner */}
      <AudienceCTA
        audience={audience}
        headingText="Fortalezca la seguridad jurídica y contractual de su empresa"
        subText="Comuníquese con nuestros abogados para evaluar sus contratos mercantiles, contingencias procesales o recuperación de cartera."
        ctaLabel="Consultar por WhatsApp con enfoque empresarial"
      />

      {/* 5. Other Audiences */}
      <OtherAudiences currentSlug="empresas" />
    </div>
  );
}
