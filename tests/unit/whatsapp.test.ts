import { describe, it, expect } from 'vitest';
import { createWhatsAppLink } from '@/lib/whatsapp';

describe('createWhatsAppLink utility', () => {
  it('generates a general consultation link with the verified phone number', () => {
    const url = createWhatsAppLink({ context: 'general' });
    expect(url).toContain('wa.me/526563502916');
    expect(url).toContain('AGORA%2C%20ABOGADOS');
  });

  it('generates a practice-specific contextual link', () => {
    const url = createWhatsAppLink({ context: 'practice', detail: 'Derecho Mercantil' });
    expect(url).toContain('wa.me/526563502916');
    expect(url).toContain('Derecho%20Mercantil');
  });

  it('generates a foreigners contextual link with bilingual greeting', () => {
    const url = createWhatsAppLink({ context: 'foreigners' });
    expect(url).toContain('wa.me/526563502916');
    expect(url).toContain('Hello%20%2F%20Hola');
  });

  it('generates a business contextual link', () => {
    const url = createWhatsAppLink({ context: 'business' });
    expect(url).toContain('wa.me/526563502916');
    expect(url).toContain('empresa');
  });

  it('generates an article contextual link', () => {
    const url = createWhatsAppLink({ context: 'article', detail: 'Guía Legal' });
    expect(url).toContain('wa.me/526563502916');
    expect(url).toContain('Gu%C3%ADa%20Legal');
  });

  it('generates a booking fallback link', () => {
    const url = createWhatsAppLink({ context: 'booking-fallback' });
    expect(url).toContain('wa.me/526563502916');
    expect(url).toContain('agendar');
  });
});
