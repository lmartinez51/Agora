import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { PracticeArea } from '@/types';

export interface PracticeFAQProps {
  practice: PracticeArea;
}

export function PracticeFAQ({ practice }: PracticeFAQProps): React.ReactElement | null {
  if (!practice.faqs || practice.faqs.length === 0) {
    return null;
  }

  const accordionItems = practice.faqs.map((faq, idx) => ({
    id: `faq-${practice.slug}-${idx}`,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section className="py-14 sm:py-20 bg-brand-canvas border-b border-brand-border" aria-label={`Preguntas frecuentes sobre ${practice.title}`}>
      <Container size="md">
        <SectionHeading
          eyebrow="Orientación Inicial"
          title={`Preguntas frecuentes sobre ${practice.title.toLowerCase()}`}
          description="Criterios y aspectos procedimentales comunes resueltos por nuestro equipo legal."
          align="center"
          className="mb-10 max-w-2xl mx-auto"
        />

        <div className="bg-brand-surface p-6 sm:p-8 rounded-md border border-brand-border shadow-subtle">
          <Accordion items={accordionItems} />
        </div>
      </Container>
    </section>
  );
}
