import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CTAButton } from '@/components/ui/CTAButton';
import { TextLink } from '@/components/ui/TextLink';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Divider } from '@/components/ui/Divider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { WhatsAppCTA } from '@/components/conversion/WhatsAppCTA';
import { OnlineConsultationCTA } from '@/components/conversion/OnlineConsultationCTA';
import { PhoneCTA } from '@/components/conversion/PhoneCTA';

export const metadata = {
  title: 'Laboratorio de Diseño y Componentes (Design Lab)',
  robots: { index: false, follow: false },
};

export default function DesignSystemPage(): React.ReactElement {
  return (
    <div className="py-12 bg-brand-canvas min-h-screen text-brand-text-primary">
      <Container size="xl">
        {/* Lab Header */}
        <div className="border-b border-brand-border pb-8 mb-16">
          <Badge variant="accent" size="md" className="mb-3">
            Entorno de Verificación Visual · Fase 2
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary tracking-tight mb-4">
            AGORA — Design System & Primitives Lab
          </h1>
          <p className="text-brand-text-secondary text-base max-w-2xl">
            Catálogo exhaustivo y verificable de tokens, escalas tipográficas, componentes atómicos, estados de interacción y patrones de accesibilidad bajo lineamientos WCAG 2.2 AA.
          </p>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono rounded-sm">
            [AVISO DE CONTROL]: Todos los textos e interacciones en esta vista corresponden a <strong>contenido neutral de demostración</strong>. No contiene datos de producción no confirmados.
          </div>
        </div>

        {/* 01 — Color */}
        <section className="mb-20" id="section-color">
          <SectionHeading
            eyebrow="01 — Tokens de Color"
            title="Paleta Cromática Autorizada"
            description="Valores hex exactos bloqueados según la Constitución Visual y Documentación de Diseño v1.0."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { name: 'Primary (Obsidian)', hex: '#111827', bg: 'bg-[#111827]', text: 'text-white' },
              { name: 'Dark Surface', hex: '#0B0F17', bg: 'bg-[#0B0F17]', text: 'text-white' },
              { name: 'Accent (Ochre Bronze)', hex: '#B48C56', bg: 'bg-[#B48C56]', text: 'text-white' },
              { name: 'Accent Hover', hex: '#9B7443', bg: 'bg-[#9B7443]', text: 'text-white' },
              { name: 'Canvas (Warm Off-White)', hex: '#FAFAF9', bg: 'bg-[#FAFAF9]', text: 'text-brand-primary', border: true },
              { name: 'Surface White', hex: '#FFFFFF', bg: 'bg-[#FFFFFF]', text: 'text-brand-primary', border: true },
              { name: 'Muted Surface', hex: '#F3F4F6', bg: 'bg-[#F3F4F6]', text: 'text-brand-primary', border: true },
              { name: 'Border', hex: '#E5E7EB', bg: 'bg-[#E5E7EB]', text: 'text-brand-primary' },
              { name: 'Text Primary', hex: '#111827', bg: 'bg-[#111827]', text: 'text-white' },
              { name: 'Text Secondary', hex: '#4B5563', bg: 'bg-[#4B5563]', text: 'text-white' },
              { name: 'Text Muted', hex: '#6B7280', bg: 'bg-[#6B7280]', text: 'text-white' },
              { name: 'WhatsApp CTA', hex: '#25D366', bg: 'bg-[#25D366]', text: 'text-white' },
              { name: 'WhatsApp Hover', hex: '#1EBE5D', bg: 'bg-[#1EBE5D]', text: 'text-white' },
            ].map((c) => (
              <div key={c.name} className="border border-brand-border rounded-sm overflow-hidden bg-brand-surface shadow-subtle">
                <div className={`h-16 w-full ${c.bg} ${c.border ? 'border-b border-brand-border' : ''}`} />
                <div className="p-3">
                  <div className="text-xs font-bold text-brand-primary truncate">{c.name}</div>
                  <div className="text-[11px] font-mono text-brand-text-muted">{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* 02 — Typography */}
        <section className="mb-20" id="section-typography">
          <SectionHeading
            eyebrow="02 — Escala Tipográfica"
            title="Jerarquía Editorial y Tamaños"
            description="Tipografía base Inter/system-ui para lectura y pila serif neutra para títulos (Display / Heading serif: PENDING DESIGN DECISION)."
          />
          <div className="border border-brand-border bg-brand-surface p-6 sm:p-8 rounded-md space-y-8 divide-y divide-brand-border/60">
            <div>
              <div className="text-xs font-mono text-brand-accent uppercase mb-2">Display · 56px / 1.1 · Letter-spacing: -0.02em</div>
              <p className="text-4xl sm:text-5xl font-serif font-bold text-brand-primary">
                Asesoría y Rigor Jurídico en México
              </p>
            </div>
            <div className="pt-6">
              <div className="text-xs font-mono text-brand-accent uppercase mb-2">H1 · 44px / 1.15 · Letter-spacing: -0.02em</div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-primary">
                Protección Jurídica Integral y Litigio Estratégico
              </h1>
            </div>
            <div className="pt-6">
              <div className="text-xs font-mono text-brand-accent uppercase mb-2">H2 · 32px / 1.25 · Letter-spacing: -0.01em</div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-primary">
                Áreas de Práctica y Especialidad Profesional
              </h2>
            </div>
            <div className="pt-6">
              <div className="text-xs font-mono text-brand-accent uppercase mb-2">H3 · 24px / 1.3</div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-primary">
                Derecho Mercantil y Operaciones Transfronterizas
              </h3>
            </div>
            <div className="pt-6">
              <div className="text-xs font-mono text-brand-accent uppercase mb-2">Body Large · 18px / 1.6</div>
              <p className="text-lg text-brand-text-secondary leading-relaxed max-w-3xl">
                [Demostración]: Acompañamos a particulares y empresas en la toma de decisiones con alto impacto patrimonial, ofreciendo certidumbre procedimental y fundamentación constitucional.
              </p>
            </div>
            <div className="pt-6">
              <div className="text-xs font-mono text-brand-accent uppercase mb-2">Body Regular · 16px / 1.6</div>
              <p className="text-base text-brand-text-secondary leading-relaxed max-w-3xl">
                [Demostración]: Las consultas jurídicas remotas permiten a clientes fuera de México acceder a representación técnica y revisión de contratos de forma transparente y estructurada.
              </p>
            </div>
            <div className="pt-6">
              <div className="text-xs font-mono text-brand-accent uppercase mb-2">Caption / UI Label · 14px / 1.5</div>
              <p className="text-sm text-brand-text-muted">
                [Demostración]: Actualizado al 28 de agosto de 2026 · Tiempo estimado de lectura: 4 minutos.
              </p>
            </div>
            <div className="pt-6">
              <div className="text-xs font-mono text-brand-accent uppercase mb-2">Legal / Micro · 12px / 1.4 · Letter-spacing: +0.05em</div>
              <p className="text-xs text-brand-text-muted uppercase tracking-wider font-mono">
                [Demostración]: Todos los derechos reservados · Aviso de Privacidad conforme a la LFPDPPP
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* 03 & 04 — Spacing & Containers */}
        <section className="mb-20" id="section-spacing">
          <SectionHeading
            eyebrow="03 & 04 — Espaciado y Contenedores"
            title="Escala de Contenedores Máximos"
            description="Límites semánticos de ancho de lectura y encuadre estructural."
          />
          <div className="space-y-4 font-mono text-xs text-center">
            <div className="max-w-container-sm mx-auto p-4 bg-brand-surface border border-brand-accent/40 rounded-sm">
              <span className="text-brand-accent font-bold">Container SM (640px)</span> — Artículos y columnas de lectura
            </div>
            <div className="max-w-container-md mx-auto p-4 bg-brand-surface border border-brand-accent/40 rounded-sm">
              <span className="text-brand-accent font-bold">Container MD (896px)</span> — Formularios, avisos legales y diálogo enfocado
            </div>
            <div className="max-w-container-lg mx-auto p-4 bg-brand-surface border border-brand-accent/40 rounded-sm">
              <span className="text-brand-accent font-bold">Container LG (1152px)</span> — Contenido general de páginas y grillas
            </div>
            <div className="max-w-container-xl mx-auto p-4 bg-brand-surface border border-brand-accent/40 rounded-sm">
              <span className="text-brand-accent font-bold">Container XL (1280px)</span> — Límite máximo de layout estructural
            </div>
          </div>
        </section>

        <Divider />

        {/* 05 — Buttons */}
        <section className="mb-20" id="section-buttons">
          <SectionHeading
            eyebrow="05 — Sistema de Botones"
            title="Variantes y Estados de Botón"
            description="Control de jerarquía visual con soporte para estados hover, focus-visible, active y disabled."
          />
          <div className="border border-brand-border bg-brand-surface p-6 sm:p-8 rounded-md space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg">Primary (Large)</Button>
              <Button variant="primary" size="md">Primary (Medium)</Button>
              <Button variant="primary" size="sm">Primary (Small)</Button>
              <Button variant="primary" size="md" disabled>Primary (Disabled)</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="whatsapp" size="lg">WhatsApp (Large)</Button>
              <Button variant="whatsapp" size="md">WhatsApp (Medium)</Button>
              <Button variant="whatsapp" size="sm">WhatsApp (Small)</Button>
              <Button variant="whatsapp" size="md" disabled>WhatsApp (Disabled)</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary" size="lg">Secondary (Large)</Button>
              <Button variant="secondary" size="md">Secondary (Medium)</Button>
              <Button variant="secondary" size="sm">Secondary (Small)</Button>
              <Button variant="secondary" size="md" disabled>Secondary (Disabled)</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="ghost" size="lg">Ghost (Large)</Button>
              <Button variant="ghost" size="md">Ghost (Medium)</Button>
              <Button variant="ghost" size="sm">Ghost (Small)</Button>
              <Button variant="ghost" size="md" disabled>Ghost (Disabled)</Button>
            </div>
          </div>
        </section>

        <Divider />

        {/* 06 — Links */}
        <section className="mb-20" id="section-links">
          <SectionHeading
            eyebrow="06 — Enlaces Editoriales"
            title="TextLink y Navegación Textual"
            description="Enlaces con subrayado tipográfico discreto y flechas contextuales."
          />
          <div className="border border-brand-border bg-brand-surface p-6 rounded-md flex flex-wrap gap-8 items-center">
            <TextLink href="/design-system" variant="default" showArrow>
              Enlace Primario con Flecha
            </TextLink>
            <TextLink href="/design-system" variant="accent" showArrow>
              Enlace con Acento Bronce
            </TextLink>
            <TextLink href="/design-system" variant="muted">
              Enlace Secundario Discreto
            </TextLink>
            <TextLink href="https://example.com" isExternal showArrow>
              Enlace Externo
            </TextLink>
          </div>
        </section>

        <Divider />

        {/* 07 — Badges */}
        <section className="mb-20" id="section-badges">
          <SectionHeading
            eyebrow="07 — Insignias (Badges)"
            title="Indicadores y Etiquetas de Estado"
            description="Etiquetas monoespaciadas sin bordes excesivamente redondeados."
          />
          <div className="border border-brand-border bg-brand-surface p-6 rounded-md flex flex-wrap gap-4 items-center">
            <Badge variant="default">Default Badge</Badge>
            <Badge variant="accent">Accent Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
            <Badge variant="dark">Dark Surface Badge</Badge>
            <Badge variant="accent" size="sm">Small Tag</Badge>
          </div>
        </section>

        <Divider />

        {/* 08 — Cards */}
        <section className="mb-20" id="section-cards">
          <SectionHeading
            eyebrow="08 — Sistema de Tarjetas (Cards)"
            title="Estructuras Editoriales Contenidas"
            description="Tarjetas compuestas con micro-bordes de 1px, sutil elevación y jerarquía limpia."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              eyebrow="Materia Confirmada"
              title="Derecho Civil"
              description="[Contenido de demostración]: Litigio contractual, sucesiones, regularización patrimonial y responsabilidad civil."
              metadata="5 servicios"
              action={<TextLink href="/design-system" showArrow>Ver detalle</TextLink>}
            />
            <Card
              variant="interactive"
              eyebrow="Tarjeta Interactiva"
              title="Derecho Mercantil"
              description="[Contenido de demostración]: Asesoría a corporaciones binacionales, contratos comerciales y cobranza judicial."
              metadata="Enfoque Fronterizo"
              action={<TextLink href="/design-system" variant="accent" showArrow>Explorar</TextLink>}
            />
            <Card
              variant="featured"
              eyebrow="Destacado Estratégico"
              title="Consultoría para Extranjeros"
              description="[Contenido de demostración]: Asesoría legal remota en inglés y español para asuntos y litigios en territorio mexicano."
              metadata="Atención Virtual"
              action={<Button variant="whatsapp" size="sm">Consultar</Button>}
            />
          </div>
        </section>

        <Divider />

        {/* 09 — Section Headings */}
        <section className="mb-20" id="section-headings">
          <SectionHeading
            eyebrow="09 — Encabezados de Sección"
            title="Variantes de Alineación y Jerarquía"
            description="Componente SectionHeading con alineación izquierda y centrada."
          />
          <div className="space-y-8 border border-brand-border bg-brand-surface p-6 rounded-md">
            <SectionHeading
              eyebrow="Alineación Izquierda"
              title="Encabezado de Sección Estándar"
              description="[Contenido de demostración]: Descripción contextual con ancho óptimo para lectura continua."
              align="left"
            />
            <Divider />
            <SectionHeading
              eyebrow="Alineación Central"
              title="Encabezado de Sección Centrado"
              description="[Contenido de demostración]: Utilizado en bloques de conversión o galerías de autoridad."
              align="center"
            />
          </div>
        </section>

        <Divider />

        {/* 10 — Forms */}
        <section className="mb-20" id="section-forms">
          <SectionHeading
            eyebrow="10 — Sistema de Formularios"
            title="Controles de Entrada y Validación"
            description="Campos con etiquetas accesibles, mensajes de ayuda, indicadores de error y focus visible."
          />
          <div className="border border-brand-border bg-brand-surface p-6 sm:p-8 rounded-md max-w-container-md mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre Completo"
                placeholder="Ej. Lic. Carlos Morales"
                required
              />
              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="nombre@empresa.com"
                description="Utilizado exclusivamente para responder su solicitud."
                required
              />
            </div>

            <Select
              label="Materia de Interés Legal"
              options={[
                { value: 'civil', label: 'Derecho Civil' },
                { value: 'mercantil', label: 'Derecho Mercantil' },
                { value: 'familiar', label: 'Derecho Familiar' },
                { value: 'penal', label: 'Derecho Penal' },
                { value: 'amparo', label: 'Juicio de Amparo' },
                { value: 'extranjeros', label: 'Asuntos de Extranjeros en México' },
              ]}
              placeholderOption="Seleccione una materia jurídica..."
            />

            <Textarea
              label="Descripción Preliminar del Asunto"
              placeholder="Describa brevemente la situación legal sin incluir datos bancarios o sensibles..."
              description="La información proporcionada se encuentra protegida bajo estricta confidencialidad."
            />

            {/* Error & Disabled Demonstration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-border">
              <Input
                label="Ejemplo con Error"
                value="correo-invalido@"
                error="El formato del correo electrónico no es válido."
                readOnly
              />
              <Input
                label="Ejemplo Deshabilitado"
                value="Campo no editable"
                disabled
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* 11 — Accordion */}
        <section className="mb-20" id="section-accordion">
          <SectionHeading
            eyebrow="11 — Componente de Acordeón"
            title="Despliegue Accesible para Preguntas Frecuentes"
            description="Controlado por teclado con soporte aria-expanded, transiciones suaves y estados de foco visibles."
          />
          <div className="max-w-container-md mx-auto bg-brand-surface p-6 rounded-md border border-brand-border">
            <Accordion
              defaultOpenId="faq-1"
              items={[
                {
                  id: 'faq-1',
                  title: '¿Cómo se garantiza la confidencialidad de la información proporcionada?',
                  content:
                    '[Demostración]: Toda la información compartida con AGORA está sujeta al secreto profesional y al Aviso de Privacidad conforme a la legislación mexicana aplicable.',
                },
                {
                  id: 'faq-2',
                  title: '¿Puedo solicitar una consulta si resido en Estados Unidos o en el extranjero?',
                  content:
                    '[Demostración]: Sí. Atendemos asuntos a través de sesiones virtuales por Google Meet y coordinación directa vía WhatsApp.',
                },
                {
                  id: 'faq-3',
                  title: '¿Cuál es el tiempo de respuesta para una solicitud inicial?',
                  content:
                    '[Demostración]: Nuestro equipo responde las consultas recibidas en horario laboral (8:00 AM – 6:00 PM) de forma oportuna.',
                },
              ]}
            />
          </div>
        </section>

        <Divider />

        {/* 12 — Conversion CTAs */}
        <section className="mb-20" id="section-conversion">
          <SectionHeading
            eyebrow="12 — Componentes de Conversión"
            title="Disparadores Contextuales de Contacto"
            description="Componentes conectados a la utilidad centralizada lib/whatsapp.ts sin URLs duplicadas."
          />
          <div className="border border-brand-border bg-brand-surface p-6 sm:p-8 rounded-md space-y-6">
            <div>
              <div className="text-xs font-mono uppercase text-brand-accent mb-3 font-semibold">
                Conversión Primaria — WhatsApp (6 Contextos Contextuales)
              </div>
              <div className="flex flex-wrap gap-3">
                <WhatsAppCTA context="general" label="WhatsApp General" />
                <WhatsAppCTA context="practice" detail="Derecho Mercantil" label="WhatsApp Materia" />
                <WhatsAppCTA context="foreigners" label="WhatsApp Extranjeros" />
                <WhatsAppCTA context="business" label="WhatsApp Empresas" />
                <WhatsAppCTA context="article" detail="Guía de Amparo" label="WhatsApp Artículo" />
                <WhatsAppCTA context="booking-fallback" label="WhatsApp Fallback" />
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border flex flex-wrap gap-4 items-center">
              <div>
                <div className="text-xs font-mono uppercase text-brand-accent mb-2 font-semibold">
                  Conversión Secundaria (Agenda)
                </div>
                <OnlineConsultationCTA />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-brand-accent mb-2 font-semibold">
                  Conversión Terciaria (Teléfono)
                </div>
                <PhoneCTA />
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* 13 — Responsive Grids & Structural Frame */}
        <section className="mb-20" id="section-responsive">
          <SectionHeading
            eyebrow="13 — Grilla Responsiva y Encuadre"
            title="Comportamiento Multi-Dispositivo (390px a 1440px+)"
            description="Transición fluida de 1 columna (móvil) a 2 columnas (tablet) y 3 columnas (desktop)."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ImageFrame
              aspectRatio="16/9"
              caption="[Demostración]: Tratamiento de encuadre fotográfico 16:9 con borde editorial."
            />
            <ImageFrame
              aspectRatio="4/3"
              caption="[Demostración]: Tratamiento de encuadre 4:3 para retratos y detalles."
            />
            <ImageFrame
              aspectRatio="1/1"
              caption="[Demostración]: Tratamiento cuadrado 1:1 para sellos y simbología."
            />
          </div>
        </section>

        <Divider />

        {/* 14 — Dark Surface Examples */}
        <section className="mb-20" id="section-dark">
          <SectionHeading
            eyebrow="14 — Comportamiento en Superficies Oscuras"
            title="Contraste y Jerarquía en Fondos Oscuros"
            description="Aplicación de micro-bordes transparentes y acentos bronce sobre color-primary (#111827)."
          />
          <div className="bg-brand-primary text-white p-8 sm:p-12 rounded-md border border-brand-primary shadow-overlay space-y-8">
            <SectionHeading
              eyebrow="Superficie Oscura"
              title="Autoridad y Discreción Institucional"
              description="[Contenido de demostración]: En bloques de alto contraste, los textos secundarios emplean neutrales claros y los botones mantienen visibilidad inmediata."
              surface="dark"
            />
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="whatsapp">Consultar por WhatsApp</Button>
              <CTAButton href="/agenda" variant="secondary" className="border-white/30 text-white hover:bg-white/10">
                Agendar Consulta Online
              </CTAButton>
              <Badge variant="dark">Plataforma Segura</Badge>
            </div>
          </div>
        </section>

      </Container>
    </div>
  );
}
