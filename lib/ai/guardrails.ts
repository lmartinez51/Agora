import { AIGuardrailCheck, AIChatAction } from './types';
import { aiKnowledgePolicy } from '@/content/ai/knowledge-policy';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { siteConfig } from '@/content/site';

const PROMPT_INJECTION_PATTERNS = [
  /ignore( all)? (previous|prior) (instructions|rules|prompts)/i,
  /ignora( todas)? las (instrucciones|reglas|indicaciones)/i,
  /show( me)? (your|the) (system prompt|instructions|configuration)/i,
  /muestra(me)? (tu|el) (prompt|sistema|instrucciones|configuraci[oó]n)/i,
  /jailbreak/i,
  /dame (tus|el) (secretos|variables de entorno|c[oó]digo fuente)/i,
  /reveal your (prompt|system|identity)/i,
  /olvida tus reglas/i,
];

const URGENT_MATTER_PATTERNS = [
  /detenci[oó]n/i,
  /detuvieron/i,
  /orden de aprehensi[oó]n/i,
  /embargo (hoy|mañana|inminente)/i,
  /plazo vence (hoy|mañana)/i,
  /audiencia (hoy|mañana)/i,
  /urgente penal/i,
  /ministerio p[uú]blico/i,
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

  // 2. Sensitive Information Filter
  const lowerQuery = query.toLowerCase();
  const foundSensitive = aiKnowledgePolicy.sensitiveDataKeywords.some((keyword) =>
    lowerQuery.includes(keyword)
  );

  if (foundSensitive) {
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

  // 3. Urgent Legal Situations
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
        allowed: true, // We allow processing but provide immediate urgent escalation
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
  // Strip any accidental attempt to claim attorney guarantees
  const sanitized = output
    .replace(/garantizamos (ganar|el éxito|la victoria)/gi, 'evaluamos las posibilidades procesales de')
    .replace(/resultado 100% seguro/gi, 'estrategia jurídica fundamentada');

  return sanitized;
}
