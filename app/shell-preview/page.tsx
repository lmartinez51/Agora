import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';

export const metadata = {
  title: 'Vista Previa del Shell Global (Shell Lab)',
  robots: { index: false, follow: false },
};

export default function ShellPreviewPage(): React.ReactElement {
  return (
    <div className="py-8 sm:py-12 space-y-16">
      <Container size="xl">
        {/* Banner de verificación */}
        <div className="border border-brand-accent/40 bg-brand-surface p-6 rounded-md shadow-subtle mb-12">
          <Badge variant="accent" size="sm" className="mb-2">
            Entorno de Prueba de Shell · Fase 3
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-primary mb-2">
            Laboratorio de Integración del Shell Global
          </h1>
          <p className="text-sm text-brand-text-secondary max-w-2xl">
            Esta vista verifica la integración del Header sticky, DesktopNav, MobileNav, Footer oscuro, espaciados estructurales y la barra de conversión móvil inferior (MobileStickyBar) en pantallas menores a 768px.
          </p>
        </div>

        {/* Sección 1: Contenido Corto y Tarjetas */}
        <section className="mb-16">
          <SectionHeading
            eyebrow="Prueba 01 — Estructura y Tarjetas"
            title="Verificación de Grilla de 3 Columnas"
            description="[Contenido de demostración]: Comprobación de altura y alineación en contenedor XL."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              eyebrow="Bloque A"
              title="Tarjeta Estándar"
              description="[Demostración]: Texto descriptivo para validar legibilidad dentro del ancho de contenedor estándar."
              action={<Button variant="secondary" size="sm">Acción</Button>}
            />
            <Card
              variant="interactive"
              eyebrow="Bloque B"
              title="Tarjeta Interactiva"
              description="[Demostración]: Micro-elevación y borde acentuado al pasar el cursor."
              action={<Button variant="primary" size="sm">Detalle</Button>}
            />
            <Card
              variant="featured"
              eyebrow="Bloque C"
              title="Tarjeta Destacada"
              description="[Demostración]: Enfoque de alta relevancia con acento bronce."
              action={<WhatsAppCTA context="general" size="sm" />}
            />
          </div>
        </section>

        {/* Sección 2: Bloque Oscuro de Alto Contraste */}
        <section className="bg-brand-primary text-white p-8 sm:p-12 rounded-md shadow-overlay mb-16">
          <SectionHeading
            eyebrow="Prueba 02 — Sección Oscura"
            title="Integración de Superficie Oscura en el Shell"
            description="[Demostración]: Transición armónica entre el canvas claro y bloques de autoridad institucional."
            surface="dark"
          />
          <div className="flex flex-wrap gap-4 items-center pt-4">
            <WhatsAppCTA context="foreigners" label="Consultar por WhatsApp" />
            <OnlineConsultationCTA />
          </div>
        </section>

        {/* Sección 3: Formulario para validar no-oclusión de la barra móvil */}
        <section className="mb-16">
          <SectionHeading
            eyebrow="Prueba 03 — Ergonomía de Formularios"
            title="Validación de Offset Inferior y Sticky Bar"
            description="[Demostración]: Los campos de entrada y botones inferiores deben ser perfectamente accesibles sin que la barra sticky móvil los cubra."
          />
          <div className="max-w-container-md mx-auto bg-brand-surface border border-brand-border p-6 sm:p-8 rounded-md space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Nombre de Prueba" placeholder="Ej. Juan Pérez" />
              <Input label="Teléfono de Prueba" placeholder="+52 656 000 0000" />
            </div>
            <Textarea
              label="Mensaje de Prueba"
              placeholder="Escriba aquí para comprobar que el teclado móvil y la barra inferior no bloquean el foco..."
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" size="md">Cancelar</Button>
              <Button variant="primary" size="md">Enviar Solicitud de Prueba</Button>
            </div>
          </div>
        </section>

        {/* Sección 4: Texto Largo para Scroll */}
        <section className="mb-16 max-w-container-sm mx-auto">
          <SectionHeading
            eyebrow="Prueba 04 — Scroll Continuo"
            title="Comportamiento en Lectura Prolongada"
          />
          <div className="space-y-4 text-sm text-brand-text-secondary leading-relaxed">
            <p>
              [Demostración]: Este párrafo extiende la longitud vertical de la página para validar que el Header permanece fijo de manera fluida y que el Footer al final del documento se presenta con el espaciado adecuado.
            </p>
            <p>
              [Demostración]: En dispositivos móviles, la barra inferior `MobileStickyBar` debe flotar sobre el viewport con `z-40`, mientras que en pantallas medianas y grandes (`md: 768px+`) desaparece automáticamente sin causar saltos de contenido.
            </p>
            <Divider />
            <div className="text-center pt-2">
              <WhatsAppCTA context="general" size="md" />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
