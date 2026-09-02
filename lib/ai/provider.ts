import { AIProvider, AIProviderType, ChatMessage, AIRequestContext, AIResponsePayload } from './types';
import { getAIProviderType } from './config';
import { aiKnowledgePolicy } from '@/content/ai/knowledge-policy';
import { practices } from '@/content/practices';
import { articles } from '@/content/articles';
import { generalFaqs } from '@/content/faqs';
import { siteConfig } from '@/content/site';
import { sanitizeOutputGuardrails } from './guardrails';
import { createWhatsAppLink } from '@/lib/whatsapp';

/**
 * 1. Local Grounded Provider
 * Uses verified structured data to answer queries accurately without third-party API dependencies.
 */
export class LocalGroundingProvider implements AIProvider {
  type: AIProviderType = 'local';

  async generateResponse(
    messages: ChatMessage[],
    context: AIRequestContext
  ): Promise<AIResponsePayload> {
    const lastUserMsg = messages[messages.length - 1]?.content || '';
    const lowerQuery = lastUserMsg.toLowerCase().trim();
    const isEnglish =
      lowerQuery.includes('hello') ||
      lowerQuery.includes('help') ||
      lowerQuery.includes('what') ||
      lowerQuery.includes('lawyer');

    // 1. Out of scope handling
    if (context.intentResult.intent === 'out_of_scope') {
      return {
        content: isEnglish
          ? 'As an assistant for AGORA, ABOGADOS, my focus is to provide guidance regarding our legal practice areas, consultation options, and published legal guides in Ciudad Juárez, Mexico. Please feel free to ask about our legal services.'
          : aiKnowledgePolicy.outOfScopeResponse,
        actions: [
          {
            type: 'whatsapp',
            label: 'Consultar por WhatsApp',
            href: createWhatsAppLink({ context: 'general' }),
            isExternal: true,
          },
        ],
        intent: 'out_of_scope',
      };
    }

    // 2. Practice Area matching
    if (context.intentResult.intent === 'practice_area' && context.intentResult.practiceSlug) {
      const practice = practices.find((p) => p.slug === context.intentResult.practiceSlug);
      if (practice) {
        const content = isEnglish
          ? `In ${practice.title}, AGORA, ABOGADOS provides specialized litigation and legal counsel under Mexican jurisdiction. Core services include: ${practice.services.slice(0, 3).join(', ')}. For an initial case evaluation, you may schedule an appointment or contact us via WhatsApp.`
          : `En materia de ${practice.title}, AGORA, ABOGADOS ofrece representación procesal y consultoría jurídica en Ciudad Juárez y tribunales de México. Nuestros servicios principales incluyen: ${practice.services.slice(0, 3).join(', ')}. Para una valoración preliminar de su caso, puede agendar una consulta o contactarnos directamente por WhatsApp.`;

        return {
          content: sanitizeOutputGuardrails(content),
          actions: context.intentResult.suggestedActions,
          intent: 'practice_area',
        };
      }
    }

    // 3. Foreigners / International matching
    if (context.intentResult.intent === 'foreigners') {
      const content = isEnglish
        ? 'AGORA, ABOGADOS provides legal counsel for foreign individuals, international investors, and cross-border companies operating in Mexico. Our practice covers civil, commercial, and constitutional amparo proceedings under Mexican federal and state law. Consultations are available online via Google Meet or in person in Ciudad Juárez.'
        : 'AGORA, ABOGADOS cuenta con atención especializada para personas extranjeras y empresas transfronterizas con intereses o controversias en México. Brindamos asesoría en derecho civil, mercantil y juicio de amparo bajo la legislación mexicana, con opción de consulta remota por Google Meet.';

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'foreigners',
      };
    }

    // 4. Booking intent matching
    if (context.intentResult.intent === 'booking') {
      const content = isEnglish
        ? 'You can schedule an initial legal guidance session with AGORA, ABOGADOS. We evaluate your case facts, procedural viability, and strategic legal steps under Mexican law. Consultations can be held in person in Ciudad Juárez or remotely via Google Meet.'
        : 'Puede programar una consulta jurídica inicial con el equipo de AGORA, ABOGADOS. Evaluaremos los hechos de su asunto, la viabilidad procesal y las estrategias aplicables bajo el marco jurídico mexicano, ya sea de forma presencial en Ciudad Juárez o virtual por Google Meet.';

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'booking',
      };
    }

    // 5. Business / Commercial matching
    if (context.intentResult.intent === 'business') {
      const content =
        'En materia mercantil y corporativa, asesoramos a empresas locales y transfronterizas en litigio comercial, resolución de controversias, incumplimiento de contratos y juicios ejecutivos mercantiles en Ciudad Juárez y tribunales federales.';

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'business',
      };
    }

    // 6. Article / Knowledge matching
    if (context.intentResult.intent === 'article') {
      const titles = articles.map((a) => `"${a.title}"`).join(', ');
      const content = `En nuestro Centro de Conocimiento compartimos análisis jurídicos y guías procesales sobre el marco legal mexicano. Publicaciones recientes incluyen: ${titles}.`;

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'article',
      };
    }

    // 7. General FAQs matching
    for (const faq of generalFaqs) {
      const faqWords = faq.question.toLowerCase().split(' ');
      const matches = faqWords.filter((w) => w.length > 4 && lowerQuery.includes(w));
      if (matches.length >= 2) {
        return {
          content: sanitizeOutputGuardrails(faq.answer),
          actions: context.intentResult.suggestedActions,
          intent: 'general_info',
        };
      }
    }

    // 8. Default Firm Overview
    const defaultResponse = isEnglish
      ? `AGORA, ABOGADOS is a legal firm based in Ciudad Juárez, Chihuahua, Mexico, with 25 years of professional experience across 5 practice areas: Civil, Commercial, Family, Criminal Defense, and Constitutional Amparo. We have a team of 7 lawyers (2 managing partners and 5 associates). How may we assist your legal inquiry?`
      : `AGORA, ABOGADOS es una firma legal con sede en Ciudad Juárez, Chihuahua, con 25 años de trayectoria profesional en 5 áreas del derecho mexicano: Civil, Mercantil, Familiar, Penal y Juicio de Amparo. Contamos con un equipo de 7 abogados (2 socios directores y 5 asociados). ¿En qué área jurídica o trámite requiere orientación?`;

    return {
      content: sanitizeOutputGuardrails(defaultResponse),
      actions: context.intentResult.suggestedActions,
      intent: 'general_info',
    };
  }
}

/**
 * 2. Google Gemini Provider
 * Connects securely server-side to the Google Gemini REST API.
 */
export class GeminiProvider implements AIProvider {
  type: AIProviderType = 'gemini';

  async generateResponse(
    messages: ChatMessage[],
    context: AIRequestContext
  ): Promise<AIResponsePayload> {
    const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        content:
          'El asistente virtual no tiene una clave de acceso configurada en el servidor. Puede comunicarse directamente con AGORA, ABOGADOS por WhatsApp.',
        actions: context.intentResult.suggestedActions,
        intent: context.intentResult.intent,
      };
    }

    try {
      // Preserve recent conversation turns (up to last 6 messages)
      const recentMessages = messages.slice(-6);
      const contents = recentMessages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const payload = {
        contents,
        systemInstruction: {
          parts: [{ text: context.groundedKnowledge }],
        },
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          maxOutputTokens: 500,
        },
      };

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`Gemini API returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText || typeof rawText !== 'string') {
        throw new Error('Empty or malformed Gemini response');
      }

      const cleanContent = sanitizeOutputGuardrails(rawText.trim());

      return {
        content: cleanContent,
        actions: context.intentResult.suggestedActions,
        intent: context.intentResult.intent,
      };
    } catch {
      // Graceful error fallback without exposing internal API details
      return {
        content:
          'Ocurrió una interrupción al conectar con el servicio de IA. Le invitamos a contactar directamente a nuestros abogados por WhatsApp o vía telefónica.',
        actions: context.intentResult.suggestedActions,
        intent: context.intentResult.intent,
      };
    }
  }
}

/**
 * 3. Unavailable Provider Fallback
 */
export class UnavailableProvider implements AIProvider {
  type: AIProviderType = 'unavailable';

  async generateResponse(): Promise<AIResponsePayload> {
    return {
      content:
        'El asistente de orientación se encuentra en mantenimiento temporal. Puede comunicarse directamente con nuestro equipo legal a través de WhatsApp o vía telefónica.',
      actions: [
        {
          type: 'whatsapp',
          label: 'Contactar por WhatsApp',
          href: createWhatsAppLink({ context: 'general' }),
          isExternal: true,
        },
        {
          type: 'link',
          label: `Llamar al ${siteConfig.contact.phoneDisplay}`,
          href: siteConfig.contact.phoneHref,
          isExternal: false,
        },
      ],
      intent: 'general_info',
    };
  }
}

/**
 * Provider Factory
 */
export function getAIProvider(): AIProvider {
  const providerType = getAIProviderType();

  switch (providerType) {
    case 'gemini':
      return new GeminiProvider();
    case 'unavailable':
      return new UnavailableProvider();
    case 'local':
    default:
      return new LocalGroundingProvider();
  }
}
