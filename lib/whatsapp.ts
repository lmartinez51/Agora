import { WhatsAppContext, WhatsAppOptions } from '@/types';
import { siteConfig } from '@/content/site';

const contextMessages: Record<WhatsAppContext, (detail?: string) => string> = {
  general: () =>
    'Hola, me gustaría solicitar una consulta jurídica inicial con AGORA, ABOGADOS.',
  practice: (practiceName) =>
    `Hola, deseo consultar sobre un asunto en materia de ${practiceName || 'asesoría legal'} con AGORA, ABOGADOS.`,
  foreigners: () =>
    'Hello / Hola, I am requesting legal guidance regarding a legal matter in Mexico.',
  business: () =>
    'Hola, represento a una empresa y requiero asesoría legal mercantil/corporativa.',
  article: (articleTitle) =>
    `Hola, leí su artículo "${articleTitle || 'jurídico'}" y quisiera asesoría legal sobre este tema.`,
  'booking-fallback': () =>
    'Hola, deseo agendar una consulta jurídica inicial directamente a través de WhatsApp.',
};

export function createWhatsAppLink(options: WhatsAppOptions = { context: 'general' }): string {
  const phone = siteConfig.contact.whatsappNumber; // '526563502916'
  const messageFn = contextMessages[options.context] || contextMessages.general;
  const rawMessage = messageFn(options.detail);
  const encodedText = encodeURIComponent(rawMessage);
  return `https://wa.me/${phone}?text=${encodedText}`;
}
