import { AIIntentResult, AIChatAction } from './types';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { practices } from '@/content/practices';
import { siteConfig } from '@/content/site';

/**
 * Deterministic, Priority-Ordered Intent Detection
 *
 * Priorities:
 * 1. Booking (explicit request to schedule/agenda)
 * 2. Contact (explicit request for channels, phone, location)
 * 3. High Risk (guarantee requests, win predictions, definitive advice)
 * 4. Attorney Info (questions about individual lawyers, names, specialties)
 * 5. Firm Info (factual questions about firm trajectory, total lawyer count)
 * 6. Unsupported / Hallucination-prone queries (awards, client lists, dollar amounts)
 * 7. Foreign Client / International (/extranjeros)
 * 8. Business Client (/empresas)
 * 9. General Legal Info (definitions, procedural explanations like "¿Qué es...?")
 * 10. Personal Legal Situation (user describes their specific personal problem)
 * 11. Practice Area (matching confirmed practice areas)
 * 12. Articles / Guides (/conocimiento)
 * 13. Greeting
 * 14. Out of Scope (trivia, non-legal)
 * 15. Ambiguous Fallback (neutral general_info with ZERO CTA spam)
 */
export function detectIntent(userQuery: string): AIIntentResult {
  const query = userQuery.toLowerCase().trim();
  const cleaned = query.replace(/^[^a-z0-9áéíóúüñ]+/i, '');

  // 1. Explicit Booking intent
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

  // 2. Explicit Contact intent
  if (
    query.includes('contacto') ||
    query.includes('whatsapp') ||
    query.includes('teléfono') ||
    query.includes('telefono') ||
    query.includes('llamar') ||
    query.includes('donde estan') ||
    query.includes('dónde están') ||
    query.includes('ubicacion') ||
    query.includes('ubicación') ||
    query.includes('oficina')
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

  // 3. High Risk / Legal Safety Inquiries (guarantee, prediction, definitive advice)
  if (
    query.includes('garantízame') ||
    query.includes('garantizame') ||
    query.includes('probabilidad de ganar') ||
    query.includes('probabilidades de ganar') ||
    query.includes('chances de ganar') ||
    query.includes('dime exactamente qué hacer') ||
    query.includes('estrategia exacta') ||
    query.includes('voy a ganar') ||
    query.includes('puedo ganar')
  ) {
    return { intent: 'high_risk', confidence: 0.9, suggestedActions: [] };
  }

  // 4. Attorney Info (names, individual specialists, bios)
  if (
    query.includes('abogado penalista') ||
    query.includes('especialista penal') ||
    query.includes('especialidad de cada') ||
    query.includes('cuál de ellos') ||
    query.includes('cual de ellos') ||
    query.includes('quién lleva') ||
    query.includes('quien lleva') ||
    query.includes('quién atiende') ||
    query.includes('quien atiende') ||
    ((query.includes('abogado') || query.includes('abogados')) &&
      (query.includes('quién') ||
        query.includes('quien') ||
        query.includes('nombre') ||
        query.includes('lista') ||
        query.includes('siete') ||
        query.includes('equipo')))
  ) {
    return { intent: 'attorney_info', confidence: 0.9, suggestedActions: [] };
  }

  // 5. Firm Info (general trajectory, total count, history, handled areas)
  if (
    query.includes('cuántos abogados') ||
    query.includes('cuantos abogados') ||
    query.includes('trayectoria') ||
    query.includes('cuántos años') ||
    query.includes('cuantos años') ||
    query.includes('años de experiencia') ||
    query.includes('historia de agora') ||
    query.includes('sobre agora') ||
    query.includes('acerca de agora') ||
    query.includes('años de trayectoria') ||
    query.includes('materias que manejan') ||
    query.includes('qué materias') ||
    query.includes('que materias')
  ) {
    return { intent: 'firm_info', confidence: 0.9, suggestedActions: [] };
  }

  // 6. Unsupported / Extrapolated claims (awards, client lists, dollar amounts)
  if (
    query.includes('inventa') ||
    query.includes('premios') ||
    query.includes('reconocimientos') ||
    query.includes('cuántos millones') ||
    query.includes('cuantos millones') ||
    query.includes('recuperado para clientes') ||
    query.includes('empresas que ha representado') ||
    query.includes('clientes importantes') ||
    query.includes('casos ganados') ||
    query.includes('ranking')
  ) {
    return { intent: 'unsupported', confidence: 0.85, suggestedActions: [] };
  }

  // 7. Foreigners / International intent
  if (
    query.includes('extranjero') ||
    query.includes('foreign') ||
    query.includes('international') ||
    query.includes('internacional') ||
    query.includes('estados unidos') ||
    query.includes('united states') ||
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
    return {
      intent: 'foreigners',
      confidence: 0.9,
      suggestedActions: actions,
    };
  }

  // 8. Business / Corporate intent
  if (
    query.includes('empresa') ||
    query.includes('corporativ') ||
    query.includes('sociedad') ||
    query.includes('comercio')
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
    return {
      intent: 'business',
      confidence: 0.85,
      suggestedActions: actions,
    };
  }

  // 9. General Legal Info (definitions, procedures like "¿Qué es...?")
  if (
    cleaned.startsWith('qué es') ||
    cleaned.startsWith('que es') ||
    cleaned.startsWith('cómo funciona') ||
    cleaned.startsWith('como funciona') ||
    cleaned.startsWith('en qué consiste') ||
    cleaned.startsWith('en que consiste') ||
    query.includes('requisitos para') ||
    query.includes('plazo para') ||
    query.includes('derechos tengo') ||
    query.includes('derechos tiene') ||
    query.includes('derechos como') ||
    query.includes('derechos laborales')
  ) {
    return { intent: 'general_legal_info', confidence: 0.85, suggestedActions: [] };
  }

  // 10. Personal Legal Situation (user describes specific personal problem, dispute, or colloquial conflict)
  if (
    query.includes('mi arrendador') ||
    query.includes('mi casero') ||
    query.includes('mi depósito') ||
    query.includes('mi deposito') ||
    query.includes('sacar a alguien') ||
    query.includes('no me paga la renta') ||
    query.includes('no paga la renta') ||
    query.includes('desalojo') ||
    query.includes('desalojar') ||
    query.includes('quitar el departamento') ||
    query.includes('quitar la casa') ||
    query.includes('casa de mis papás') ||
    query.includes('casa de mis papas') ||
    query.includes('quedarse con la casa') ||
    query.includes('herencia') ||
    query.includes('testamento') ||
    query.includes('me despidieron') ||
    query.includes('despido') ||
    query.includes('mi patrón') ||
    query.includes('mi patron') ||
    query.includes('no me quiere pagar') ||
    query.includes('no me pagan') ||
    query.includes('liquidación') ||
    query.includes('liquidacion') ||
    query.includes('finiquito') ||
    query.includes('choqué') ||
    query.includes('choque') ||
    query.includes('intoxiqué') ||
    query.includes('intoxique') ||
    query.includes('quiere demandar') ||
    query.includes('quieren demandar') ||
    query.includes('puedo demandar') ||
    query.includes('me demandaron') ||
    query.includes('mi contrato') ||
    query.includes('tengo un problema con') ||
    query.includes('ayudarme con un problema') ||
    query.includes('ayuda con un problema') ||
    query.includes('me deben') ||
    query.includes('fui arrestado') ||
    query.includes('me arrestaron') ||
    query.includes('me detuvieron') ||
    query.includes('si me detuvieron') ||
    query.includes('mi caso') ||
    query.includes('mi situación') ||
    query.includes('mi situacion') ||
    query.includes('qué debo hacer en mi') ||
    query.includes('que debo hacer en mi')
  ) {
    const actions: AIChatAction[] = [
      {
        type: 'whatsapp',
        label: 'Consultar Caso con un Abogado',
        href: createWhatsAppLink({ context: 'practice', detail: 'Situación legal personal' }),
        isExternal: true,
      },
    ];
    return { intent: 'personal_legal_situation', confidence: 0.85, suggestedActions: actions };
  }

  // 11. Practice Area intent
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

  // 12. Article / Knowledge intent
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

  // 13. Greeting intent
  if (
    cleaned.startsWith('hola') ||
    cleaned.startsWith('buenos días') ||
    cleaned.startsWith('buenos dias') ||
    cleaned.startsWith('buenas tardes') ||
    cleaned.startsWith('buenas noches') ||
    cleaned.startsWith('saludos') ||
    cleaned === 'hola'
  ) {
    return { intent: 'greeting', confidence: 0.95, suggestedActions: [] };
  }

  // 14. Out of scope detection (trivia, non-legal, culinary, sports, poetry, math, mechanics)
  // RULE: OUT-OF-SCOPE + SIN SEÑAL JURÍDICA/INSTITUCIONAL -> out_of_scope
  //       OUT-OF-SCOPE + SEÑAL JURÍDICA/INSTITUCIONAL     -> preservar intención jurídica/institucional
  const hasLegalAnchor =
    query.includes('demanda') ||
    query.includes('demandar') ||
    query.includes('demandaron') ||
    query.includes('juicio') ||
    query.includes('tribunal') ||
    query.includes('juez') ||
    query.includes('juzgado') ||
    query.includes('fiscalía') ||
    query.includes('fiscalia') ||
    query.includes('ministerio público') ||
    query.includes('ministerio publico') ||
    query.includes('amparo') ||
    query.includes('litigio') ||
    query.includes('procesal') ||
    query.includes('abogado') ||
    query.includes('abogados') ||
    query.includes('patrón') ||
    query.includes('patron') ||
    query.includes('despido') ||
    query.includes('despidieron') ||
    query.includes('derecho') ||
    query.includes('derechos') ||
    query.includes('ley') ||
    query.includes('legal') ||
    query.includes('arrendador') ||
    query.includes('arrendatario') ||
    query.includes('casero') ||
    query.includes('renta') ||
    query.includes('inquilino') ||
    query.includes('contrato') ||
    query.includes('deuda') ||
    query.includes('deben') ||
    query.includes('herencia') ||
    query.includes('testamento') ||
    query.includes('detención') ||
    query.includes('detencion') ||
    query.includes('arresto') ||
    query.includes('detuvieron') ||
    query.includes('delito') ||
    query.includes('agora') ||
    query.includes('firma') ||
    query.includes('asesoría') ||
    query.includes('asesoria') ||
    query.includes('consulta');

  const hasOutOfScopeSignal =
    // Culinary / food preparation
    query.includes('tortilla') ||
    query.includes('tortillas') ||
    query.includes('receta') ||
    query.includes('ingrediente') ||
    query.includes('ingredientes') ||
    query.includes('hornear') ||
    query.includes('harina de trigo') ||
    query.includes('cómo se hace la') ||
    query.includes('como se hace la') ||
    query.includes('cómo se hacen las') ||
    query.includes('como se hacen las') ||
    query.includes('cómo se hacen la') ||
    query.includes('como se hacen la') ||
    query.includes('cómo se prepara') ||
    query.includes('como se prepara') ||
    query.includes('cómo se preparan') ||
    query.includes('como se preparan') ||
    query.includes('postre') ||
    query.includes('repostería') ||
    query.includes('reposteria') ||
    // Sports & Pop culture / entertainment
    query.includes('mundial de fútbol') ||
    query.includes('mundial de futbol') ||
    query.includes('fútbol') ||
    query.includes('futbol') ||
    query.includes('chiste') ||
    query.includes('poema') ||
    query.includes('poesía') ||
    query.includes('poesia') ||
    query.includes('canción') ||
    query.includes('cancion') ||
    query.includes('película') ||
    query.includes('pelicula') ||
    query.includes('videojuego') ||
    // Math, trivia & homework
    query.includes('resuelve la ecuación') ||
    query.includes('resuelve la ecuacion') ||
    query.includes('ecuación') ||
    query.includes('ecuacion') ||
    query.includes('matemáticas') ||
    query.includes('matematicas') ||
    query.includes('capital de') ||
    query.includes('clima') ||
    // Automotive / mechanical DIY
    query.includes('batería de un coche') ||
    query.includes('bateria de un coche') ||
    query.includes('batería de un auto') ||
    query.includes('bateria de un auto') ||
    query.includes('batería del coche') ||
    query.includes('bateria del coche') ||
    query.includes('batería del auto') ||
    query.includes('bateria del auto') ||
    query.includes('cambiar la llanta') ||
    query.includes('reparar motor') ||
    // Code / programming
    query.includes('código en python') ||
    query.includes('codigo en python') ||
    query.includes('escribe un script');

  if (hasOutOfScopeSignal && !hasLegalAnchor) {
    const actions: AIChatAction[] = [
      {
        type: 'whatsapp',
        label: 'Consultar por WhatsApp',
        href: createWhatsAppLink({ context: 'general' }),
        isExternal: true,
      },
    ];
    return { intent: 'out_of_scope', confidence: 0.9, suggestedActions: actions };
  }

  // 15. Ambiguous Safe Fallback (General Info with ZERO CTA spam)
  return { intent: 'general_info', confidence: 0.4, suggestedActions: [] };
}
