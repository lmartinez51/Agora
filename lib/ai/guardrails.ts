import { AIGuardrailCheck, AIChatAction } from './types';
import { aiKnowledgePolicy } from '@/content/ai/knowledge-policy';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { siteConfig } from '@/content/site';

const PROMPT_INJECTION_PATTERNS = [
  /ignore( all)? (?:previous|prior)?\s*(?:instructions|rules|prompts)/i,
  /ignora( todas)? (?:las)?\s*(?:instrucciones|reglas|indicaciones)/i,
  /show( me)? (your|the) (system prompt|instructions|configuration)/i,
  /muestra(me)? (tu|el) (prompt|sistema|instrucciones|configuraci[oó]n)/i,
  /jailbreak/i,
  /dame (tus|el) (secretos|variables de entorno|c[oó]digo fuente)/i,
  /reveal your (prompt|system|identity)/i,
  /olvida tus reglas/i,
  /pretend you are/i,
  /act as an unrestricted/i,
];

const URGENT_MATTER_PATTERNS = [
  /detenci[oó]n/i,
  /detuvieron/i,
  /arrestaron/i,
  /arresto/i,
  /orden de aprehensi[oó]n/i,
  /embargo (hoy|mañana|inminente)/i,
  /plazo vence (hoy|mañana)/i,
  /audiencia (hoy|mañana)/i,
  /urgente penal/i,
  /ministerio p[uú]blico/i,
  /arrested/i,
  /detained/i,
  /hearing (today|tomorrow)/i,
  /court deadline/i,
  /emergency lawyer/i,
  /urgent criminal/i,
];

// Raw Sensitive Data Pattern Detectors (Defense-in-Depth)
const SENSITIVE_PATTERNS = [
  // Mexican CURP (18 alphanumeric format: 4 letters + 6 digits YYMMDD + H/M + 5 letters + 1 digit/letter + 1 digit)
  /\b[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d\b/i,

  // Mexican RFC with homoclave (12 or 13 alphanumeric chars with date)
  /\b[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}\b/i,

  // Credit Card / Debit Card (16 digits formatted or continuous)
  /\b(?:\d{4}[ -]?){3}\d{4}\b/,

  // Mexican Bank CLABE (18 continuous digits)
  /\b\d{18}\b/,
];

export function checkInputGuardrails(userQuery: string): AIGuardrailCheck {
  const query = userQuery.trim();

  // 1. Prompt Injection Defense
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(query)) {
      return {
        allowed: false,
        reason: 'prompt_injection',
        interceptionMessage:
          'Como asistente virtual de AGORA, ABOGADOS, sigo exclusivamente los lineamientos y políticas de orientación de la firma. ¿En qué asunto legal podemos orientarle?',
      };
    }
  }

  // 2. Sensitive Information Filter (Keywords & Raw Regex Patterns)
  const lowerQuery = query.toLowerCase();
  const keywordMatch = aiKnowledgePolicy.sensitiveDataKeywords.some((keyword) =>
    lowerQuery.includes(keyword)
  );
  const patternMatch = SENSITIVE_PATTERNS.some((pattern) => pattern.test(query));

  if (keywordMatch || patternMatch) {
    const whatsappUrl = createWhatsAppLink({ context: 'general' });
    const actions: AIChatAction[] = [
      {
        type: 'whatsapp',
        label: 'Consultar por WhatsApp Seguro',
        href: whatsappUrl,
        isExternal: true,
      },
      {
        type: 'link',
        label: `Llamar al ${siteConfig.contact.phoneDisplay}`,
        href: siteConfig.contact.phoneHref,
        isExternal: false,
      },
    ];

    return {
      allowed: false,
      reason: 'sensitive_data',
      interceptionMessage: aiKnowledgePolicy.sensitiveDataResponse,
      suggestedActions: actions,
    };
  }

  // 3. Urgent Legal Situations (Immediate Interception & Escalation)
  for (const pattern of URGENT_MATTER_PATTERNS) {
    if (pattern.test(query)) {
      const whatsappUrl = createWhatsAppLink({
        context: 'practice',
        detail: 'Asunto urgente',
      });

      const actions: AIChatAction[] = [
        {
          type: 'whatsapp',
          label: 'Contactar Abogado por WhatsApp',
          href: whatsappUrl,
          isExternal: true,
        },
        {
          type: 'link',
          label: `Llamar al ${siteConfig.contact.phoneDisplay}`,
          href: siteConfig.contact.phoneHref,
          isExternal: false,
        },
      ];

      return {
        allowed: false, // Halts pipeline immediately and returns urgent response
        reason: 'urgent_matter',
        interceptionMessage: aiKnowledgePolicy.urgentMatterResponse,
        suggestedActions: actions,
      };
    }
  }

  return {
    allowed: true,
  };
}

export function sanitizeOutputGuardrails(output: string): string {
  // Strip any accidental attempt to claim attorney guarantees, probability predictions,
  // formal attorney-client relationships via web chat, or model identity leaks
  const sanitized = output
    .replace(/(?:garantizo|garantizamos)\s+(?:que\s+)?(?:ganar|el\s+éxito|la\s+victoria|va\s+a\s+ganar|ganará)/gi, 'evaluamos las posibilidades procesales de')
    .replace(/resultado 100% seguro/gi, 'estrategia jurídica fundamentada')
    .replace(/(?:probabilidad(?:es)?|chances?)\s+(?:de\s+ganar|de\s+éxito)\s+(?:del?\s+)?\d+%/gi, 'posibilidades procesales sujetas a evaluación judicial')
    .replace(/(?:se\s+ha|queda)\s+(?:cread[oa]|establecid[oa]|iniciad[oa])\s+(?:un|una)\s+(?:vínculo|relación)\s+(?:formal\s+)?abogado-cliente/gi, 'esta orientación es informativa y no constituye relación formal abogado-cliente')
    .replace(/como modelo de lenguaje/gi, 'como asistente informativo de AGORA')
    .replace(/mi (prompt|instrucción del sistema)/gi, 'la información verificada de AGORA');

  return sanitized;
}
