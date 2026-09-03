import { AIProvider, AIProviderType, ChatMessage, AIRequestContext, AIResponsePayload } from './types';
import { getAIProviderType, getGeminiModel } from './config';
import { aiKnowledgePolicy } from '@/content/ai/knowledge-policy';
import { practices } from '@/content/practices';
import { articles } from '@/content/articles';
import { generalFaqs } from '@/content/faqs';
import { siteConfig } from '@/content/site';
import { sanitizeOutputGuardrails } from './guardrails';
import { createWhatsAppLink } from '@/lib/whatsapp';

export interface GeminiContentTurn {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

/**
 * Deterministically normalizes chat messages for the Google Gemini API (SEC-02).
 * - Slices up to the last 6 messages.
 * - Drops empty or non-string messages.
 * - Maps roles: 'assistant' -> 'model', everything else -> 'user'.
 * - Drops leading 'model' turns so the sequence always starts with 'user'.
 * - Coalesces consecutive turns of the same role into a single turn separated by newline.
 */
export function normalizeGeminiContents(messages: ChatMessage[]): GeminiContentTurn[] {
  if (!Array.isArray(messages) || messages.length === 0) {
    return [];
  }

  // 1. Take up to the last 6 messages
  const recent = messages.slice(-6);

  // 2. Filter valid non-empty messages and map roles
  const validTurns: Array<{ role: 'user' | 'model'; text: string }> = [];
  for (const msg of recent) {
    if (typeof msg.content === 'string') {
      const trimmed = msg.content.trim();
      if (trimmed.length > 0) {
        validTurns.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          text: trimmed,
        });
      }
    }
  }

  // 3. Drop leading 'model' turns so conversation starts with 'user'
  const firstUserIndex = validTurns.findIndex((t) => t.role === 'user');
  if (firstUserIndex === -1) {
    return [];
  }
  const fromFirstUser = validTurns.slice(firstUserIndex);

  // 4. Coalesce consecutive turns of the same role
  const coalesced: GeminiContentTurn[] = [];
  for (const turn of fromFirstUser) {
    const last = coalesced[coalesced.length - 1];
    if (last && last.role === turn.role) {
      last.parts[0].text += `\n${turn.text}`;
    } else {
      coalesced.push({
        role: turn.role,
        parts: [{ text: turn.text }],
      });
    }
  }

  return coalesced;
}

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
export interface GeminiProviderOptions {
  maxRetries?: number;
  getRetryDelay?: (attempt: number) => number;
}

export class GeminiProvider implements AIProvider {
  type: AIProviderType = 'gemini';
  readonly model: string;
  readonly maxRetries: number;
  private readonly getRetryDelay: (attempt: number) => number;

  constructor(model?: string, options?: GeminiProviderOptions) {
    this.model = model || getGeminiModel();
    this.maxRetries = options?.maxRetries ?? 2;
    this.getRetryDelay = options?.getRetryDelay ?? ((attempt: number) => (attempt === 1 ? 500 : 1000));
  }

  getModelEndpoint(apiKey: string): string {
    return `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${apiKey}`;
  }

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
      // Normalize conversation turns strictly for Gemini API requirements (SEC-02)
      const contents = normalizeGeminiContents(messages);

      if (contents.length === 0) {
        return {
          content:
            'Por favor ingrese una consulta válida para que el asistente pueda orientarle.',
          actions: context.intentResult.suggestedActions,
          intent: context.intentResult.intent,
        };
      }

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

      const endpoint = this.getModelEndpoint(apiKey);
      const maxAttempts = 1 + this.maxRetries;
      let attempt = 1;
      let response: Response | null = null;
      let lastStatus = 0;
      let lastErrorBody = '';

      while (attempt <= maxAttempts) {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000),
        });

        if (response.ok) {
          break;
        }

        lastStatus = response.status;
        try {
          lastErrorBody = await response.text();
        } catch {
          lastErrorBody = '<unable to read response body>';
        }

        const isTransient = lastStatus === 503 || lastStatus === 429;

        if (isTransient && attempt < maxAttempts) {
          const delayMs = this.getRetryDelay(attempt);

          if (process.env.NODE_ENV === 'development') {
            console.warn(
              `[GeminiProvider] Transient Gemini API error ${lastStatus} using model "${this.model}". Retrying attempt ${attempt + 1}/${maxAttempts} after ${delayMs}ms.`
            );
          }

          if (delayMs > 0) {
            await new Promise((resolve) => setTimeout(resolve, delayMs));
          }
          attempt++;
          continue;
        }

        // Non-transient error or exhausted all retry attempts
        break;
      }

      if (!response || !response.ok) {
        const status = lastStatus || response?.status || 500;
        const errorBody = lastErrorBody;

        if (process.env.NODE_ENV === 'development') {
          const safeErrorBody = apiKey ? errorBody.split(apiKey).join('[REDACTED_API_KEY]') : errorBody;
          console.error(
            `[GeminiProvider] Gemini API error ${status} using model "${this.model}":`,
            safeErrorBody
          );
        }

        let userMessage =
          'Ocurrió una interrupción temporal al conectar con el servicio de IA. Le invitamos a contactar directamente a nuestros abogados por WhatsApp o vía telefónica.';

        if (status === 401 || status === 403) {
          userMessage =
            'El servicio de asistencia con IA presenta un inconveniente de autorización con el proveedor. Le invitamos a contactar directamente a nuestros abogados por WhatsApp o vía telefónica.';
        } else if (status === 404) {
          userMessage =
            'El modelo de lenguaje configurado no se encuentra disponible actualmente. Puede comunicarse directamente con nuestros abogados a través de WhatsApp o vía telefónica.';
        } else if (status === 429) {
          userMessage =
            'El asistente de orientación jurídica ha alcanzado su límite temporal de consultas simultáneas. Por favor intente nuevamente en unos instantes o comuníquese por WhatsApp.';
        } else if (status === 503) {
          userMessage =
            'El servicio de asistencia jurídica se encuentra temporalmente con alta demanda. Por favor intente nuevamente en unos instantes o comuníquese por WhatsApp.';
        } else if (status >= 500) {
          userMessage =
            'El servicio de asistencia jurídica presenta intermitencia temporal en sus servidores. Le sugerimos reintentar en breve o comunicarse por WhatsApp.';
        }

        return {
          content: userMessage,
          actions: context.intentResult.suggestedActions,
          intent: context.intentResult.intent,
        };
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
    } catch (err: unknown) {
      const isTimeout =
        (err instanceof Error && err.name === 'TimeoutError') ||
        (err instanceof DOMException && err.name === 'TimeoutError') ||
        (err instanceof Error && err.message.toLowerCase().includes('timeout'));

      if (process.env.NODE_ENV === 'development') {
        const errMsg = err instanceof Error ? err.message : String(err);
        const safeErrMsg = apiKey ? errMsg.split(apiKey).join('[REDACTED_API_KEY]') : errMsg;
        console.error(
          `[GeminiProvider] Network/Timeout error connecting to Gemini (${this.model}):`,
          safeErrMsg
        );
      }

      const userMessage = isTimeout
        ? 'El servicio de asistencia jurídica tardó demasiado en responder. Le sugerimos reintentar su consulta o contactarnos directamente por WhatsApp.'
        : 'Ocurrió una interrupción al conectar con el servicio de IA. Le invitamos a contactar directamente a nuestros abogados por WhatsApp o vía telefónica.';

      return {
        content: userMessage,
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
