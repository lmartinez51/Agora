import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import { ContactForm } from '@/components/sections/contact/ContactForm';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { generalFaqs } from '@/content/faqs';

export const metadata: Metadata = constructMetadata({
  title: 'Contacto y Canales de Atención Directa en Ciudad Juárez',
  description:
    'Comuníquese con los abogados de AGORA en Ciudad Juárez, Chihuahua. Teléfono, WhatsApp oficial y formulario de contacto confidencial.',
  path: '/contacto',
});

export default function ContactoPage(): React.ReactElement {
  const faqItems = generalFaqs.map((faq, idx) => ({
    id: `faq-contact-${idx}`,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <div className="w-full flex flex-col">
      {/* 1. Contact Hero */}
      <ContactHero />

      {/* 2. Main Contact Grid (Info + Form) */}
      <section className="py-14 sm:py-20 bg-brand-surface border-b border-brand-border" aria-label="Información y formulario de contacto">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Direct Info (Columns 1-5) */}
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>

            {/* Right Column: Accessible Form (Columns 6-12) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. General FAQs */}
      <section className="py-14 sm:py-20 bg-brand-canvas border-b border-brand-border" aria-label="Preguntas frecuentes generales">
        <Container size="md">
          <SectionHeading
            eyebrow="Orientación Rápida"
            title="Preguntas frecuentes sobre el contacto y servicios"
            description="Respuestas claras sobre nuestra modalidad de atención, ubicación y alcance."
            align="center"
            className="mb-10 max-w-2xl mx-auto"
          />

          <div className="bg-brand-surface p-6 sm:p-8 rounded-md border border-brand-border shadow-subtle">
            <Accordion items={faqItems} />
          </div>
        </Container>
      </section>
    </div>
  );
}
