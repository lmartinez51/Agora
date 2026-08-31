import { AIIntentResult, AIChatAction } from './types';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { practices } from '@/content/practices';
import { siteConfig } from '@/content/site';

export function detectIntent(userQuery: string): AIIntentResult {
  const query = userQuery.toLowerCase().trim();

  // 1. Booking intent
  if (
    query.includes('agendar') ||
    query.includes('cita') ||
    query.includes('agenda') ||
    query.includes('programar') ||
    query.includes('calendario') ||
    query.includes('consulta virtual')
  ) {
    const actions: AIChatAction[] = [
      {
        type: 'booking',
        label: 'Ver Agenda de Citas Online',
        href: '/agenda',
      },
      {
        type: 'whatsapp',
        label: 'Agendar por WhatsApp',
        href: createWhatsAppLink({ context: 'booking-fallback' }),
        isExternal: true,
      },
    ];
    return { intent: 'booking', confidence: 0.95, suggestedActions: actions };
  }

  // 2. Practice Area intent
  for (const practice of practices) {
    const titleWords = practice.title.toLowerCase();
    const slugMatch = practice.slug.replace('derecho-', '');
    if (query.includes(titleWords) || query.includes(slugMatch) || query.includes(practice.slug)) {
      const actions: AIChatAction[] = [
        {
          type: 'practice',
          label: `Conocer Servicios en ${practice.title}`,
          href: `/practicas/${practice.slug}`,
        },
        {
          type: 'whatsapp',
          label: `Consultar sobre ${practice.title}`,
          href: createWhatsAppLink({ context: 'practice', detail: practice.title }),
          isExternal: true,
        },
      ];
      return {
        intent: 'practice_area',
        confidence: 0.9,
        practiceSlug: practice.slug,
        suggestedActions: actions,
      };
    }
  }

  // 3. Foreigners / International intent
  if (
    query.includes('extranjero') ||
    query.includes('foreign') ||
    query.includes('international') ||
    query.includes('internacional') ||
    query.includes('estados unidos') ||
    query.includes('usa') ||
    query.includes('cross-border') ||
    query.includes('transfronteriz') ||
    query.includes('ingles') ||
    query.includes('english') ||
    query.includes('frontera')
  ) {
    const actions: AIChatAction[] = [
      {
        type: 'link',
        label: 'Servicios para Extranjeros en México',
        href: '/extranjeros',
      },
      {
        type: 'whatsapp',
        label: 'Consultoría Internacional por WhatsApp',
        href: createWhatsAppLink({ context: 'foreigners' }),
        isExternal: true,
      },
    ];
    return { intent: 'foreigners', confidence: 0.9, suggestedActions: actions };
  }

  // 4. Business / Corporate intent
  if (
    query.includes('empresa') ||
    query.includes('corporativ') ||
    query.includes('sociedad') ||
    query.includes('comercio') ||
    query.includes('mercantil')
  ) {
    const actions: AIChatAction[] = [
      {
        type: 'link',
        label: 'Atención a Empresas y Comercio',
        href: '/empresas',
      },
      {
        type: 'whatsapp',
        label: 'Consulta Empresarial por WhatsApp',
        href: createWhatsAppLink({ context: 'business' }),
        isExternal: true,
      },
    ];
    return { intent: 'business', confidence: 0.85, suggestedActions: actions };
  }

  // 5. Contact intent
  if (
    query.includes('contacto') ||
    query.includes('whatsapp') ||
    query.includes('teléfono') ||
    query.includes('telefono') ||
    query.includes('llamar') ||
    query.includes('donde estan') ||
    query.includes('dónde están') ||
    query.includes('ubicacion') ||
    query.includes('ubicación')
  ) {
    const actions: AIChatAction[] = [
      {
        type: 'whatsapp',
        label: 'Escribir por WhatsApp Oficial',
        href: createWhatsAppLink({ context: 'general' }),
        isExternal: true,
      },
      {
        type: 'link',
        label: `Llamar al ${siteConfig.contact.phoneDisplay}`,
        href: siteConfig.contact.phoneHref,
        isExternal: false,
      },
      {
        type: 'link',
        label: 'Ver Canales de Contacto',
        href: '/contacto',
      },
    ];
    return { intent: 'contact', confidence: 0.9, suggestedActions: actions };
  }

  // 6. Article / Knowledge intent
  if (
    query.includes('artículo') ||
    query.includes('articulo') ||
    query.includes('guía legal') ||
    query.includes('guia legal') ||
    query.includes('publicación') ||
    query.includes('publicacion') ||
    query.includes('conocimiento')
  ) {
    const actions: AIChatAction[] = [
      {
        type: 'link',
        label: 'Centro de Conocimiento Jurídico',
        href: '/conocimiento',
      },
    ];
    return { intent: 'article', confidence: 0.85, suggestedActions: actions };
  }

  // 7. Out of scope detection (e.g. weather, recipes, unrelated general trivia)
  if (
    query.includes('clima') ||
    query.includes('receta') ||
    query.includes('capital de') ||
    query.includes('fútbol') ||
    query.includes('futbol') ||
    query.includes('chiste')
  ) {
    return { intent: 'out_of_scope', confidence: 0.8, suggestedActions: [] };
  }

  // Default: General Info
  const defaultActions: AIChatAction[] = [
    {
      type: 'whatsapp',
      label: 'Consultar por WhatsApp',
      href: createWhatsAppLink({ context: 'general' }),
      isExternal: true,
    },
  ];
  return { intent: 'general_info', confidence: 0.5, suggestedActions: defaultActions };
}
