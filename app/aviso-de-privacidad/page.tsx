import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/content/site';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Aviso de Privacidad Integral',
  description:
    'Aviso de Privacidad de AGORA, ABOGADOS conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).',
  path: '/aviso-de-privacidad',
});

export default function AvisoDePrivacidadPage(): React.ReactElement {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Page Header */}
      <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 bg-brand-canvas border-b border-brand-border" aria-label="Encabezado del aviso de privacidad">
        <Container size="md">
          <nav aria-label="Ruta de navegación" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-brand-text-muted" role="list">
              <li>
                <Link href="/" className="hover:text-brand-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li className="text-brand-primary font-semibold" aria-current="page">
                Aviso de Privacidad
              </li>
            </ol>
          </nav>

          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold block">
              Marco Legal Mexicano · LFPDPPP
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-primary tracking-tight leading-tight">
              Aviso de Privacidad Integral
            </h1>
            <p className="text-sm font-mono text-brand-text-muted">
              Última actualización: Enero 2026 · {siteConfig.location.city}, Chihuahua, México
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Privacy Policy Content */}
      <article className="py-14 sm:py-20 bg-brand-surface border-b border-brand-border" aria-label="Contenido del aviso de privacidad">
        <Container size="md">
          <div className="space-y-8 text-sm sm:text-base text-brand-text-secondary leading-relaxed font-sans">
            {/* Identity */}
            <section className="space-y-3">
              <h2 className="text-xl font-serif font-bold text-brand-primary">
                1. Identidad y Domicilio del Responsable
              </h2>
              <p>
                <strong>{siteConfig.name}</strong> (en lo sucesivo, &ldquo;AGORA&rdquo; o &ldquo;la Firma&rdquo;), con sede institucional en la ciudad de {siteConfig.location.city}, {siteConfig.location.state}, México, es responsable del tratamiento y protección de sus datos personales conforme a la <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</em> y su Reglamento.
              </p>
            </section>

            {/* Data Collected */}
            <section className="space-y-3">
              <h2 className="text-xl font-serif font-bold text-brand-primary">
                2. Datos Personales que Recabamos
              </h2>
              <p>
                Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, podemos recabar las siguientes categorías de datos personales:
              </p>
              <ul className="list-disc pl-5 space-y-1.5" role="list">
                <li><strong>Datos de Identificación y Contacto:</strong> Nombre completo, número telefónico, dirección de correo electrónico y lugar de residencia.</li>
                <li><strong>Datos Jurídicos y Procesales:</strong> Información, antecedentes, contratos y documentos necesarios para el análisis, dictamen o representación legal de su asunto.</li>
                <li><strong>Datos de Facturación:</strong> Registro Federal de Contribuyentes (RFC), domicilio fiscal y constancia de situación fiscal cuando se solicite comprobante fiscal digital.</li>
              </ul>
            </section>

            {/* Purpose */}
            <section className="space-y-3">
              <h2 className="text-xl font-serif font-bold text-brand-primary">
                3. Finalidades del Tratamiento de Datos
              </h2>
              <p>
                Sus datos personales serán utilizados para las siguientes finalidades primarias y necesarias para el servicio solicitado:
              </p>
              <ul className="list-disc pl-5 space-y-1.5" role="list">
                <li>Atención y canalización de consultas legales iniciales vía WhatsApp, llamada telefónica o formulario digital.</li>
                <li>Programación y sustanciación de sesiones de asesoría jurídica presenciales o virtuales.</li>
                <li>Elaboración de estrategias procesales, contratos, demandas, contestaciones y trámites legales ante autoridades jurisdiccionales mexicanas.</li>
                <li>Cumplimiento de obligaciones profesionales, éticas y fiscales aplicables a la abogacía en México.</li>
              </ul>
            </section>

            {/* Confidentiality & Transfers */}
            <section className="space-y-3">
              <h2 className="text-xl font-serif font-bold text-brand-primary">
                4. Confidencialidad, Secreto Profesional y Transferencias
              </h2>
              <p>
                Toda información compartida con AGORA está sujeta al <strong>secreto profesional</strong> garantizado por la legislación mexicana. No vendemos, alquilamos ni transferimos sus datos personales a terceros, salvo en los supuestos expresamente previstos por el artículo 37 de la LFPDPPP o por mandato expreso de autoridad judicial competente.
              </p>
            </section>

            {/* ARCO Rights */}
            <section className="space-y-3">
              <h2 className="text-xl font-serif font-bold text-brand-primary">
                5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
              </h2>
              <p>
                Usted tiene derecho a conocer qué datos personales conservamos, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal si está desactualizada o es inexacta (Rectificación); que la eliminemos de nuestros registros cuando considere que no está siendo utilizada conforme a los principios legales (Cancelación); así como oponerse al uso de sus datos para fines específicos (Oposición).
              </p>
              <p>
                Para el ejercicio de cualquiera de los derechos ARCO o la revocación del consentimiento, puede comunicarse directamente al teléfono institucional <strong className="font-mono text-brand-primary">{siteConfig.contact.phoneDisplay}</strong> o a través de nuestros canales oficiales de contacto.
              </p>
            </section>

            {/* Security Notice */}
            <div className="p-5 bg-brand-canvas border border-brand-border rounded-md shadow-subtle flex items-start gap-3 text-xs text-brand-text-muted my-6">
              <ShieldCheck className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <span className="font-mono uppercase tracking-wider font-semibold text-brand-text-secondary block">
                  Seguridad de la Información
                </span>
                <p className="leading-relaxed">
                  AGORA implementa medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado.
                </p>
              </div>
            </div>

            {/* Updates */}
            <section className="space-y-3">
              <h2 className="text-xl font-serif font-bold text-brand-primary">
                6. Modificaciones al Aviso de Privacidad
              </h2>
              <p>
                El presente aviso de privacidad puede sufrir modificaciones derivadas de reformas legislativas, criterios jurisprudenciales o políticas internas de la firma. Cualquier actualización estará disponible en esta misma página web.
              </p>
            </section>
          </div>
        </Container>
      </article>
    </div>
  );
}
