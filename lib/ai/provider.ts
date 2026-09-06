import { AIProvider, AIProviderType, ChatMessage, AIRequestContext, AIResponsePayload, AIChatAction } from './types';
import { getAIProviderType, getGeminiModel, getOpenAIModel } from './config';
import { aiKnowledgePolicy } from '@/content/ai/knowledge-policy';
import { practices } from '@/content/practices';
import { articles } from '@/content/articles';
import { generalFaqs } from '@/content/faqs';
import { siteConfig } from '@/content/site';
import { sanitizeOutputGuardrails } from './guardrails';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { getSystemPromptKnowledge } from './knowledge';

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
    if (context.intentResult.intent === 'foreigners' || context.intentResult.intent === 'foreign_client') {
      const content = isEnglish
        ? 'AGORA, ABOGADOS provides legal counsel for foreign individuals, international investors, and cross-border companies operating in Mexico. Our practice covers civil, commercial, and constitutional amparo proceedings under Mexican federal and state law. Consultations are available online via Google Meet or in person in Ciudad Juárez.'
        : 'AGORA, ABOGADOS cuenta con atención especializada para personas extranjeras y empresas transfronterizas con intereses o controversias en México. Brindamos asesoría en derecho civil, mercantil y juicio de amparo bajo la legislación mexicana, con opción de consulta remota por Google Meet.';

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'foreign_client',
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
    if (context.intentResult.intent === 'business' || context.intentResult.intent === 'business_client') {
      const content =
        'En materia mercantil y corporativa, asesoramos a empresas locales y transfronterizas en litigio comercial, resolución de controversias, incumplimiento de contratos y juicios ejecutivos mercantiles en Ciudad Juárez y tribunales federales.';

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'business_client',
      };
    }

    // 6. Attorney info matching (pending boundaries)
    if (context.intentResult.intent === 'attorney_info') {
      const content =
        'El equipo de AGORA, ABOGADOS está integrado por 7 profesionales del derecho: 2 socios directores y 5 abogados asociados. Los nombres, semblanzas biográficas individuales y asignaciones de especialidad se encuentran en proceso formal de confirmación y publicación por la firma. Nuestro equipo atiende de manera colegiada las cinco áreas de práctica confirmadas.';

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'attorney_info',
      };
    }

    // 7. Firm info matching (anti-extrapolation)
    if (context.intentResult.intent === 'firm_info') {
      const content =
        'AGORA, ABOGADOS es una firma legal con 25 años de trayectoria institucional en Ciudad Juárez, Chihuahua, con práctica en cinco áreas del derecho mexicano: Civil, Mercantil, Familiar, Penal y Juicio de Amparo. Cuenta con un equipo profesional de 7 abogados en total (2 socios directores y 5 asociados).';

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'firm_info',
      };
    }

    // 8. High Risk / Legal Safety Inquiries
    if (context.intentResult.intent === 'high_risk') {
      const content =
        'Como asistente virtual informativo de AGORA, ABOGADOS, no emito dictámenes jurídicos concluyentes ni garantizo resoluciones judiciales ni porcentajes de éxito. Todo asunto procesal requiere una valoración técnica e individualizada de los hechos y constancias por parte de un abogado calificado.';

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'high_risk',
      };
    }

    // 9. Personal Legal Situation
    if (context.intentResult.intent === 'personal_legal_situation') {
      const content =
        'Comprendo la situación que describe. De forma general y conforme al marco legal mexicano, estos asuntos se rigen por las disposiciones legales de la materia correspondiente. Para revisar la documentación específica y definir una estrategia procesal adecuada, le recomendamos formalizar una consulta jurídica con nuestros abogados.';

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'personal_legal_situation',
      };
    }

    // 10. Unsupported / Extrapolated inquiries
    if (context.intentResult.intent === 'unsupported') {
      const content =
        'La información consultada no forma parte de los datos institucionales verificados de AGORA, ABOGADOS. Nuestra firma orienta exclusivamente con base en información confirmada sobre sus 5 áreas de práctica, trayectoria y canales oficiales de atención.';

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'unsupported',
      };
    }

    // 11. Greeting intent
    if (context.intentResult.intent === 'greeting') {
      const content =
        'Hola. Soy el asistente informativo de AGORA, ABOGADOS. Puedo orientarle sobre nuestras cinco áreas de práctica jurídica, proceso de consulta y publicaciones legales. ¿En qué tema jurídico requiere orientación?';

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'greeting',
      };
    }

    // 12. Article / Knowledge matching
    if (context.intentResult.intent === 'article') {
      const titles = articles.map((a) => `"${a.title}"`).join(', ');
      const content = `En nuestro Centro de Conocimiento compartimos análisis jurídicos y guías procesales sobre el marco legal mexicano. Publicaciones recientes incluyen: ${titles}.`;

      return {
        content: sanitizeOutputGuardrails(content),
        actions: context.intentResult.suggestedActions,
        intent: 'article',
      };
    }

    // 13. General FAQs matching
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

    // 14. Default General Info Fallback
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

      const systemInstructionText = context?.groundedKnowledge || getSystemPromptKnowledge();
      const payload: Record<string, unknown> = {
        contents,
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          maxOutputTokens: 500,
        },
      };

      if (systemInstructionText && systemInstructionText.trim().length > 0) {
        payload.systemInstruction = {
          parts: [{ text: systemInstructionText }],
        };
      }

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

        const fallbackErrorActions: AIChatAction[] = [
          {
            type: 'whatsapp',
            label: 'Contactar por WhatsApp',
            href: createWhatsAppLink({ context: 'general' }),
            isExternal: true,
          },
        ];
        const errorActions =
          context.intentResult.suggestedActions && context.intentResult.suggestedActions.length > 0
            ? context.intentResult.suggestedActions
            : fallbackErrorActions;

        return {
          content: userMessage,
          actions: errorActions,
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

      const fallbackErrorActions: AIChatAction[] = [
        {
          type: 'whatsapp',
          label: 'Contactar por WhatsApp',
          href: createWhatsAppLink({ context: 'general' }),
          isExternal: true,
        },
      ];
      const errorActions =
        context.intentResult.suggestedActions && context.intentResult.suggestedActions.length > 0
          ? context.intentResult.suggestedActions
          : fallbackErrorActions;

      return {
        content: userMessage,
        actions: errorActions,
        intent: context.intentResult.intent,
      };
    }
  }
}

/**
 * 3. OpenAI Responses API Provider
 * Connects securely server-side to the OpenAI Responses API (https://api.openai.com/v1/responses).
 */
export interface OpenAIResponsesMessageTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface NormalizedOpenAIResponsesInput {
  instructions: string;
  input: OpenAIResponsesMessageTurn[];
}

/**
 * Normalizes messages for the OpenAI Responses API.
 * - Slices up to the last 6 messages.
 * - Drops empty or non-string messages.
 * - Maps roles explicitly: 'assistant' -> 'assistant', 'user' -> 'user'.
 * - Any 'system' messages in the conversation array are audited: their content is preserved
 *   and appended to the canonical base instructions so NO system instruction is ever lost.
 * - Drops leading 'assistant' turns so the conversational input always starts with 'user'.
 * - Coalesces consecutive turns of the same role into a single turn separated by newline.
 */
export function normalizeOpenAIResponsesInput(
  messages: ChatMessage[],
  baseInstructions: string
): NormalizedOpenAIResponsesInput {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { instructions: baseInstructions, input: [] };
  }

  const recent = messages.slice(-6);
  let finalInstructions = baseInstructions;
  const conversationalTurns: Array<{ role: 'user' | 'assistant'; text: string }> = [];

  for (const msg of recent) {
    if (typeof msg.content === 'string') {
      const trimmed = msg.content.trim();
      if (trimmed.length > 0) {
        if (msg.role === 'system') {
          // System messages are preserved and appended to the instructions field
          if (!finalInstructions.includes(trimmed)) {
            finalInstructions = finalInstructions ? `${finalInstructions}\n\n${trimmed}` : trimmed;
          }
        } else if (msg.role === 'assistant') {
          conversationalTurns.push({ role: 'assistant', text: trimmed });
        } else {
          conversationalTurns.push({ role: 'user', text: trimmed });
        }
      }
    }
  }

  // Drop leading assistant turns so conversation starts with user
  const firstUserIndex = conversationalTurns.findIndex((t) => t.role === 'user');
  if (firstUserIndex === -1) {
    return { instructions: finalInstructions, input: [] };
  }
  const fromFirstUser = conversationalTurns.slice(firstUserIndex);

  // Coalesce consecutive turns of the same role
  const coalesced: OpenAIResponsesMessageTurn[] = [];
  for (const turn of fromFirstUser) {
    const last = coalesced[coalesced.length - 1];
    if (last && last.role === turn.role) {
      last.content += `\n${turn.text}`;
    } else {
      coalesced.push({
        role: turn.role,
        content: turn.text,
      });
    }
  }

  return {
    instructions: finalInstructions,
    input: coalesced,
  };
}

/**
 * Strictly parses the OpenAI Responses API response structure.
 * Targets:
 * - output_text convenience field
 * - output array containing message items with output_text or text content parts
 * Rejects legacy Chat Completions `choices` structures completely.
 */
export function extractResponsesApiText(data: unknown): string | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const record = data as Record<string, unknown>;

  // 1. Direct output_text convenience property on Responses API response
  if (typeof record.output_text === 'string') {
    const trimmed = record.output_text.trim();
    if (trimmed.length > 0) return trimmed;
  }

  // 2. Structured output items array in Responses API
  if (Array.isArray(record.output)) {
    for (const item of record.output) {
      if (item && typeof item === 'object') {
        const itemObj = item as Record<string, unknown>;
        if (itemObj.type === 'message' && Array.isArray(itemObj.content)) {
          for (const part of itemObj.content) {
            if (part && typeof part === 'object') {
              const partObj = part as Record<string, unknown>;
              if (
                (partObj.type === 'output_text' || partObj.type === 'text') &&
                typeof partObj.text === 'string'
              ) {
                const trimmed = partObj.text.trim();
                if (trimmed.length > 0) return trimmed;
              }
            }
          }
        }
        if (typeof itemObj.content === 'string') {
          const trimmed = itemObj.content.trim();
          if (trimmed.length > 0) return trimmed;
        }
      }
    }
  }

  return null;
}

/**
 * Identifies transient HTTP status codes appropriate for retry in the OpenAI Responses API.
 * 429: Rate limit / temporary concurrency limit
 * 500: Internal server error
 * 502: Bad gateway
 * 503: Service unavailable / high demand
 * 504: Gateway timeout
 */
export function isOpenAITransientStatus(status: number): boolean {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

export interface OpenAIProviderOptions {
  maxRetries?: number;
  getRetryDelay?: (attempt: number) => number;
}

export class OpenAIProvider implements AIProvider {
  type: AIProviderType = 'openai';
  readonly model: string;
  readonly maxRetries: number;
  private readonly getRetryDelay: (attempt: number) => number;

  constructor(model?: string, options?: OpenAIProviderOptions) {
    this.model = model || getOpenAIModel();
    this.maxRetries = options?.maxRetries ?? 2;
    this.getRetryDelay = options?.getRetryDelay ?? ((attempt: number) => (attempt === 1 ? 500 : 1000));
  }

  getResponsesEndpoint(): string {
    return 'https://api.openai.com/v1/responses';
  }

  async generateResponse(
    messages: ChatMessage[],
    context: AIRequestContext
  ): Promise<AIResponsePayload> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const fallbackErrorActions: AIChatAction[] = [
        {
          type: 'whatsapp',
          label: 'Contactar por WhatsApp',
          href: createWhatsAppLink({ context: 'general' }),
          isExternal: true,
        },
      ];
      const actions =
        context.intentResult.suggestedActions && context.intentResult.suggestedActions.length > 0
          ? context.intentResult.suggestedActions
          : fallbackErrorActions;

      return {
        content:
          'El asistente virtual no tiene una clave de acceso configurada en el servidor para OpenAI. Puede comunicarse directamente con AGORA, ABOGADOS por WhatsApp.',
        actions,
        intent: context.intentResult.intent,
      };
    }

    try {
      const baseInstructions = context?.groundedKnowledge || getSystemPromptKnowledge();
      const normalized = normalizeOpenAIResponsesInput(messages, baseInstructions);

      if (normalized.input.length === 0) {
        return {
          content:
            'Por favor ingrese una consulta válida para que el asistente pueda orientarle.',
          actions: context.intentResult.suggestedActions,
          intent: context.intentResult.intent,
        };
      }

      const payload: Record<string, unknown> = {
        model: this.model,
        instructions: normalized.instructions,
        input: normalized.input,
      };

      const endpoint = this.getResponsesEndpoint();
      const maxAttempts = 1 + this.maxRetries;
      let attempt = 1;
      let response: Response | null = null;
      let lastStatus = 0;
      let lastErrorBody = '';

      while (attempt <= maxAttempts) {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
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

        const isTransient = isOpenAITransientStatus(lastStatus);

        if (isTransient && attempt < maxAttempts) {
          const delayMs = this.getRetryDelay(attempt);

          if (process.env.NODE_ENV === 'development') {
            console.warn(
              `[OpenAIProvider] Transient error ${lastStatus} using Responses API (${this.model}). Retrying attempt ${attempt + 1}/${maxAttempts} after ${delayMs}ms.`
            );
          }

          if (delayMs > 0) {
            await new Promise((resolve) => setTimeout(resolve, delayMs));
          }
          attempt++;
          continue;
        }

        // Non-transient error (400, 401, 403, 404, etc.) or exhausted retries
        break;
      }

      if (!response || !response.ok) {
        const status = lastStatus || response?.status || 500;
        const errorBody = lastErrorBody;

        if (process.env.NODE_ENV === 'development') {
          const safeErrorBody = apiKey ? errorBody.split(apiKey).join('[REDACTED_API_KEY]') : errorBody;
          console.error(
            `[OpenAIProvider] OpenAI Responses API error ${status} using model "${this.model}":`,
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
            'El modelo de lenguaje configurado no se encuentra disponible actualmente o no es compatible con la Responses API. Puede comunicarse directamente con nuestros abogados a través de WhatsApp o vía telefónica.';
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

        const fallbackErrorActions: AIChatAction[] = [
          {
            type: 'whatsapp',
            label: 'Contactar por WhatsApp',
            href: createWhatsAppLink({ context: 'general' }),
            isExternal: true,
          },
        ];
        const errorActions =
          context.intentResult.suggestedActions && context.intentResult.suggestedActions.length > 0
            ? context.intentResult.suggestedActions
            : fallbackErrorActions;

        return {
          content: userMessage,
          actions: errorActions,
          intent: context.intentResult.intent,
        };
      }

      const data = await response.json();
      const rawText = extractResponsesApiText(data);

      if (!rawText) {
        throw new Error('Empty or malformed OpenAI Responses API response');
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
          `[OpenAIProvider] Network/Timeout error connecting to OpenAI Responses API (${this.model}):`,
          safeErrMsg
        );
      }

      const userMessage = isTimeout
        ? 'El servicio de asistencia jurídica tardó demasiado en responder. Le sugerimos reintentar su consulta o contactarnos directamente por WhatsApp.'
        : 'Ocurrió una interrupción al conectar con el servicio de IA. Le invitamos a contactar directamente a nuestros abogados por WhatsApp o vía telefónica.';

      const fallbackErrorActions: AIChatAction[] = [
        {
          type: 'whatsapp',
          label: 'Contactar por WhatsApp',
          href: createWhatsAppLink({ context: 'general' }),
          isExternal: true,
        },
      ];
      const errorActions =
        context.intentResult.suggestedActions && context.intentResult.suggestedActions.length > 0
          ? context.intentResult.suggestedActions
          : fallbackErrorActions;

      return {
        content: userMessage,
        actions: errorActions,
        intent: context.intentResult.intent,
      };
    }
  }
}

/**
 * 4. Unavailable Provider Fallback
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
    case 'openai':
      return new OpenAIProvider();
    case 'unavailable':
      return new UnavailableProvider();
    case 'local':
    default:
      return new LocalGroundingProvider();
  }
}
