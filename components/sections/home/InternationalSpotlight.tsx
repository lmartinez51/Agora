import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';

export function InternationalSpotlight(): React.ReactElement {
  return (
    <section className="py-16 sm:py-24 border-b border-brand-primary bg-brand-primary text-white" aria-label="Consultoría legal internacional y transfronteriza">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text and Value Proposition (Columns 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="accent" size="sm">
                Asesoría Legal Transfronteriza
              </Badge>
              <span className="text-neutral-500 font-mono text-xs">·</span>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                Bilingual Legal Practice
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-snug">
              ¿Necesita orientación jurídica en México y usted se encuentra fuera del país?
            </h2>

            <p className="text-base text-neutral-300 leading-relaxed max-w-2xl">
              En AGORA brindamos consultoría jurídica estructurada para personas, familias y empresas radicadas en el extranjero que requieren atender asuntos contractuales, comerciales, sucesorios o procesales dentro del marco legal mexicano.
            </p>

            <div className="space-y-3 pt-2 text-sm text-neutral-200">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 flex-shrink-0" />
                <p>
                  <strong>Sesiones virtuales directas:</strong> Consultas mediante Google Meet para analizar su expediente sin traslados internacionales innecesarios.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 flex-shrink-0" />
                <p>
                  <strong>Comunicación bilingüe:</strong> Asesoría fluida en idioma inglés y español con abogados titulados y radicados en México.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 flex-shrink-0" />
                <p>
                  <strong>Representación legal formal:</strong> Tramitación de poderes y gestión procesal en materias civil, mercantil y amparo ante tribunales mexicanos.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <WhatsAppCTA
                context="foreigners"
                size="md"
                label="Consultar por WhatsApp"
                className="justify-center shadow-subtle"
              />
              <OnlineConsultationCTA
                size="md"
                label="Agendar consulta online"
                className="justify-center border-white text-white hover:bg-white/10"
              />
            </div>
          </div>

          {/* Contextual Graphic / Architecture Frame (Columns 8-12) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-neutral-900 border border-neutral-700/80 p-3 rounded-md shadow-card">
              <ImageFrame
                aspectRatio="4/3"
                aria-label="Consultoría jurídica internacional y remota para asuntos en México"
                caption="Atención jurídica remota para particulares y empresas en el exterior con asuntos en México."
                placeholderText="[Fotografía editorial contextual de consultoría jurídica transfronteriza — Pendiente de asignación de archivo definitivo]"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
