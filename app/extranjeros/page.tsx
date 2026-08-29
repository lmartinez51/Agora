import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';
import { PhoneCTA } from '@/components/conversion/PhoneCTA';
import { audiences } from '@/content/audiences';
import { siteConfig } from '@/content/site';
import { AudienceHero } from '@/components/sections/audiences/AudienceHero';
import { AudiencePractices } from '@/components/sections/audiences/AudiencePractices';
import { OtherAudiences } from '@/components/sections/audiences/OtherAudiences';
import { Globe, Video, FileText, Shield } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Consultoría Legal para Extranjeros con Asuntos en México',
  description:
    'Orientación jurídica remota y representación procesal en México para particulares y empresas en el exterior. Atención bilingüe en inglés y español.',
  path: '/extranjeros',
});

export default function ExtranjerosPage(): React.ReactElement {
  const audience = audiences.find((a) => a.slug === 'extranjeros') || audiences[2];

  const remoteFeatures = [
    {
      icon: Video,
      title: 'Consultas Virtuales Directas',
      description: 'Sesiones de orientación inicial por Google Meet para analizar su caso sin necesidad de viajes internacionales preliminares.',
    },
    {
      icon: Globe,
      title: 'Comunicación Bilingüe (English / Español)',
      description: 'Atención fluida y redacción legal precisa para clientes particulares y empresas de Estados Unidos y otros países.',
    },
    {
      icon: FileText,
      title: 'Poderes Notariales Apostillados',
      description: 'Estructuración y formalización de facultades procesales bajo la Convención de La Haya para actuar legalmente en su nombre en México.',
    },
    {
      icon: Shield,
      title: 'Jurisdicción y Ley Mexicana',
      description: 'Representación técnica en materias civil, mercantil y amparo ante tribunales del fuero común y federal en territorio mexicano.',
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero & Breadcrumbs */}
      <AudienceHero
        audience={audience}
        badgeLabel="Consultoría Transfronteriza"
        ctaLabel="Consultar en inglés o español"
      />

      {/* 2. Strategic Remote Consultation Model */}
      <section className="py-14 sm:py-20 bg-brand-surface border-b border-brand-border" aria-label="Mecanismos de atención remota">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Detailed text & Features grid (Columns 1-7) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="accent" size="sm">
                    Atención Internacional
                  </Badge>
                  <span className="text-xs font-mono text-brand-text-muted">·</span>
                  <span className="text-xs font-mono text-brand-text-muted">
                    Bilingual Legal Advisory
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-primary mb-4">
                  Certeza jurídica en México, incluso cuando usted se encuentra en el extranjero
                </h2>
                <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
                  Para personas y empresas ubicadas fuera de México, atender un litigio, formalizar un contrato, resolver una disputa comercial o gestionar una sucesión en territorio mexicano puede resultar complejo. En AGORA combinamos 25 años de experiencia procesal en la frontera de Ciudad Juárez con herramientas de comunicación virtual para ofrecer un servicio transparente, ágil y jurídicamente solvente.
                </p>
              </div>

              {/* 4 Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {remoteFeatures.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 bg-brand-canvas border border-brand-border rounded-sm space-y-2"
                    >
                      <div className="flex items-center gap-2 text-brand-accent">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-brand-primary">
                          {feat.title}
                        </h3>
                      </div>
                      <p className="text-xs text-brand-text-secondary leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Editorial Image Frame & Legal Scope Box (Columns 8-12) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-brand-canvas p-3 border border-brand-border rounded-md shadow-card">
                <ImageFrame
                  aspectRatio="4/3"
                  aria-label="Consultoría legal transfronteriza para asuntos en México"
                  caption="Asesoría jurídica bilingüe con sede en Ciudad Juárez para particulares y empresas en el exterior."
                  placeholderText="[Fotografía editorial contextual — Consultoría jurídica internacional y remota]"
                  className="w-full"
                />
              </div>

              <div className="p-4 bg-brand-muted border border-brand-border rounded-sm text-xs text-brand-text-muted space-y-2">
                <span className="font-mono font-semibold text-brand-text-secondary uppercase tracking-wider block">
                  Delimitación de Competencia
                </span>
                <p className="leading-relaxed">
                  AGORA ejerce la abogacía exclusivamente bajo el marco normativo y la jurisdicción de los Estados Unidos Mexicanos. No ofrecemos asesoría en derecho estadounidense ni servicios migratorios no confirmados.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Verified Key Capabilities */}
      <section className="py-14 sm:py-20 bg-brand-canvas border-b border-brand-border" aria-label="Capacidades para clientes extranjeros">
        <Container size="xl">
          <SectionHeading
            eyebrow="Alcance y Materias"
            title="Asuntos jurídicos que atendemos a distancia"
            description="Representación y asesoría especializada en controversias y actos jurídicos regidos por la ley mexicana."
            className="max-w-2xl mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-brand-surface border border-brand-border rounded-md space-y-3 shadow-subtle">
              <h3 className="text-lg font-serif font-bold text-brand-primary">
                Contratos y Comercio Binacional
              </h3>
              <p className="text-xs text-brand-text-secondary leading-relaxed">
                Asesoría a empresas extranjeras en relaciones comerciales con proveedores, clientes o socios en México, cobranza mercantil y formalización contractual.
              </p>
            </div>

            <div className="p-6 bg-brand-surface border border-brand-border rounded-md space-y-3 shadow-subtle">
              <h3 className="text-lg font-serif font-bold text-brand-primary">
                Patrimonio y Sucesiones en México
              </h3>
              <p className="text-xs text-brand-text-secondary leading-relaxed">
                Regularización de inmuebles, derechos hereditarios, testamentos y juicios sucesorios en México para herederos o propietarios radicados en el exterior.
              </p>
            </div>

            <div className="p-6 bg-brand-surface border border-brand-border rounded-md space-y-3 shadow-subtle">
              <h3 className="text-lg font-serif font-bold text-brand-primary">
                Litigio y Juicio de Amparo
              </h3>
              <p className="text-xs text-brand-text-secondary leading-relaxed">
                Defensa de derechos constitucionales y representación contenciosa ante juzgados locales y federales en el estado de Chihuahua y todo México.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Relevant Practice Areas */}
      <AudiencePractices
        practiceSlugs={['derecho-mercantil', 'derecho-civil', 'amparo', 'derecho-penal']}
        title="Áreas de práctica requeridas por clientes en el exterior"
        description="Materias jurídicas comúnmente gestionadas a distancia para clientes internacionales."
      />

      {/* 5. High Contrast Conversion Banner */}
      <section className="py-14 sm:py-20 bg-brand-primary text-white border-b border-brand-primary" aria-label="Iniciar consulta transfronteriza">
        <Container size="lg">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block">
              International Consultation · English / Spanish
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              ¿Tiene un asunto legal en México que requiere atención inmediata?
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Inicie su consulta por WhatsApp en español o inglés, o agende una sesión virtual por Google Meet para revisar la documentación de su caso.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-md mx-auto">
              <WhatsAppCTA
                context="foreigners"
                size="lg"
                fullWidth
                label="Consultar por WhatsApp"
                className="justify-center shadow-subtle text-sm"
              />
              <OnlineConsultationCTA
                size="lg"
                fullWidth
                label="Agendar sesión virtual"
                className="justify-center text-sm border-white text-white hover:bg-white/10"
              />
            </div>

            <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="font-mono text-neutral-300">Direct phone line:</span>
                <PhoneCTA variant="inline" className="text-white hover:text-brand-accent font-mono" />
              </div>
              <div className="font-mono">
                <span>{siteConfig.contact.hours} (Mexico Central Time) · Ciudad Juárez, México</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Other Audiences */}
      <OtherAudiences currentSlug="extranjeros" />
    </div>
  );
}
