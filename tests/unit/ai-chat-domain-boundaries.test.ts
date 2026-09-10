import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { detectIntent } from '@/lib/ai/intent';
import { POST } from '@/app/api/ai-chat/route';
import { aiKnowledgePolicy } from '@/content/ai/knowledge-policy';
import { getSystemPromptKnowledge } from '@/lib/ai/knowledge';
import { AIProvider, AIProviderType } from '@/lib/ai/types';
import * as providerModule from '@/lib/ai/provider';

describe('AI Chat Domain Boundaries & Server-Side Gate Suite', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.NEXT_PUBLIC_AI_CHAT_ENABLED = 'true';
    process.env.AI_CHAT_MODE = 'public';
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  function createMockPostRequest(content: string, headers: Record<string, string> = {}) {
    const body = JSON.stringify({
      messages: [{ id: 'msg-1', role: 'user', content, createdAt: Date.now() }],
    });
    return new NextRequest('http://localhost:3000/api/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '127.0.0.1',
        ...headers,
      },
      body,
    });
  }

  describe('A & B. Out-of-Domain Detection (Without Fragile Blacklist Reliance)', () => {
    it('detects culinary query without the word "receta": "Como se hacen la tortillas de harina?"', () => {
      const result = detectIntent('Como se hacen la tortillas de harina?');
      expect(result.intent).toBe('out_of_scope');
      expect(result.confidence).toBeGreaterThanOrEqual(0.8);
    });

    it('detects sports trivia query: "¿Quién ganó el mundial de fútbol?"', () => {
      const result = detectIntent('¿Quién ganó el mundial de fútbol?');
      expect(result.intent).toBe('out_of_scope');
    });

    it('detects creative writing query: "Escribe un poema sobre la noche"', () => {
      const result = detectIntent('Escribe un poema sobre la noche');
      expect(result.intent).toBe('out_of_scope');
    });

    it('detects automotive mechanics query: "¿Cómo cambio la batería de un coche?"', () => {
      const result = detectIntent('¿Cómo cambio la batería de un coche?');
      expect(result.intent).toBe('out_of_scope');
    });

    it('detects math equation query: "Resuelve la ecuación 2x + 4 = 10"', () => {
      const result = detectIntent('Resuelve la ecuación 2x + 4 = 10');
      expect(result.intent).toBe('out_of_scope');
    });
  });

  describe('C. Preservation of Colloquial & Ambiguous Legal Queries', () => {
    it('preserves colloquial tenancy dispute: "Mi casero me quiere quitar el departamento"', () => {
      const result = detectIntent('Mi casero me quiere quitar el departamento');
      expect(result.intent).toBe('personal_legal_situation');
      expect(result.suggestedActions.some((a) => a.type === 'whatsapp')).toBe(true);
    });

    it('preserves non-payment rent eviction inquiry: "¿Cómo saco a alguien que no me paga la renta?"', () => {
      const result = detectIntent('¿Cómo saco a alguien que no me paga la renta?');
      expect(result.intent).toBe('personal_legal_situation');
    });

    it('preserves colloquial wrongful dismissal: "Me despidieron injustificadamente ayer"', () => {
      const result = detectIntent('Me despidieron injustificadamente ayer');
      expect(result.intent).toBe('personal_legal_situation');
    });

    it('preserves colloquial employer unpaid wages: "Mi patrón no me quiere pagar"', () => {
      const result = detectIntent('Mi patrón no me quiere pagar');
      expect(result.intent).toBe('personal_legal_situation');
    });

    it('preserves accident liability controversy: "Choqué y la otra persona me quiere demandar"', () => {
      const result = detectIntent('Choqué y la otra persona me quiere demandar');
      expect(result.intent).toBe('personal_legal_situation');
    });

    it('preserves family inheritance property dispute: "Mi hermano quiere quedarse con la casa de mis papás"', () => {
      const result = detectIntent('Mi hermano quiere quedarse con la casa de mis papás');
      expect(result.intent).toBe('personal_legal_situation');
    });

    it('preserves detention rights inquiry: "¿Qué puedo hacer si me detuvieron?"', () => {
      const result = detectIntent('¿Qué puedo hacer si me detuvieron?');
      expect(result.intent).toBe('personal_legal_situation');
    });

    it('preserves constitutional amparo inquiry: "¿Qué es un amparo indirecto?"', () => {
      const result = detectIntent('¿Qué es un amparo indirecto?');
      expect(['general_legal_info', 'practice_area']).toContain(result.intent);
    });

    it('preserves ambiguous culinary/restaurant vocabulary with legal anchor: "¿Puedo demandar a un restaurante si me intoxiqué?"', () => {
      const result = detectIntent('¿Puedo demandar a un restaurante si me intoxiqué?');
      expect(result.intent).not.toBe('out_of_scope');
      expect(result.intent).toBe('personal_legal_situation');
    });

    it('preserves ambiguous culinary/restaurant vocabulary with labor anchor: "Mi patrón me pidió cocinar y después me despidió."', () => {
      const result = detectIntent('Mi patrón me pidió cocinar y después me despidió.');
      expect(result.intent).not.toBe('out_of_scope');
      expect(result.intent).toBe('personal_legal_situation');
    });

    it('preserves labor rights inquiry in kitchen context: "¿Qué derechos tengo si trabajo en la cocina de un restaurante?"', () => {
      const result = detectIntent('¿Qué derechos tengo si trabajo en la cocina de un restaurante?');
      expect(result.intent).not.toBe('out_of_scope');
      expect(['general_legal_info', 'personal_legal_situation']).toContain(result.intent);
    });

    it('preserves institutional assistance inquiry for commercial restaurant dispute: "AGORA puede ayudarme con un problema relacionado con un restaurante?"', () => {
      const result = detectIntent('AGORA puede ayudarme con un problema relacionado con un restaurante?');
      expect(result.intent).not.toBe('out_of_scope');
      expect(['personal_legal_situation', 'firm_info', 'business']).toContain(result.intent);
    });
  });

  describe('D. Real Server-Side Gate: Zero Provider Invocations for Out-of-Scope', () => {
    it('returns static outOfScopeResponse and DOES NOT call provider.generateResponse', async () => {
      // Create spy on provider instance
      const mockProvider = {
        type: 'openai' as const,
        generateResponse: vi.fn(),
      };
      vi.spyOn(providerModule, 'getAIProvider').mockReturnValue(mockProvider as unknown as AIProvider);

      const req = createMockPostRequest('Como se hacen la tortillas de harina?');
      const response = await POST(req);

      expect(response.status).toBe(200);
      const data = await response.json();

      // Verify the deterministic canned response
      expect(data.intent).toBe('out_of_scope');
      expect(data.message.content).toBe(aiKnowledgePolicy.outOfScopeResponse);
      expect(data.message.actions.some((a: { href: string }) => a.href.includes('wa.me'))).toBe(true);

      // CRITICAL GATE VERIFICATION: Provider generateResponse must NOT have been called!
      expect(mockProvider.generateResponse).not.toHaveBeenCalled();
    });

    it('short-circuits other out-of-scope queries (soccer, poetry, math, mechanics) without provider calls', async () => {
      const mockProvider = {
        type: 'openai' as const,
        generateResponse: vi.fn(),
      };
      vi.spyOn(providerModule, 'getAIProvider').mockReturnValue(mockProvider as unknown as AIProvider);

      const outOfScopeQueries = [
        '¿Quién ganó el mundial de fútbol?',
        'Escribe un poema sobre la noche',
        '¿Cómo cambio la batería de un coche?',
        'Resuelve la ecuación 2x + 4 = 10',
      ];

      for (const query of outOfScopeQueries) {
        const req = createMockPostRequest(query);
        const res = await POST(req);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.intent).toBe('out_of_scope');
        expect(data.message.content).toBe(aiKnowledgePolicy.outOfScopeResponse);
      }

      expect(mockProvider.generateResponse).not.toHaveBeenCalled();
    });
  });

  describe('E. Provider Independence', () => {
    it('behaves identically regardless of AI_PROVIDER (local, gemini, or openai)', async () => {
      const providers = ['local', 'gemini', 'openai'];

      for (const provider of providers) {
        process.env.AI_PROVIDER = provider;

        const mockProvider = {
          type: provider as AIProviderType,
          generateResponse: vi.fn(),
        };
        vi.spyOn(providerModule, 'getAIProvider').mockReturnValue(mockProvider as unknown as AIProvider);

        const req = createMockPostRequest('Como se hacen la tortillas de harina?');
        const res = await POST(req);
        expect(res.status).toBe(200);

        const data = await res.json();
        expect(data.intent).toBe('out_of_scope');
        expect(data.message.content).toBe(aiKnowledgePolicy.outOfScopeResponse);
        expect(mockProvider.generateResponse).not.toHaveBeenCalled();
      }
    });
  });

  describe('F. System Prompt Negative Domain Boundary', () => {
    it('contains the mandatory negative domain perimeter in getSystemPromptKnowledge', () => {
      const prompt = getSystemPromptKnowledge();
      expect(prompt).toContain('PERÍMETRO DE DOMINIO INSTITUCIONAL Y JURÍDICO');
      expect(prompt).toContain('ESTÁ ESTRICTAMENTE PROHIBIDO responder preguntas sobre temas ajenos');
      expect(prompt).toContain('Cocina, gastronomía');
      expect(prompt).toContain('Deportes');
      expect(prompt).toContain('Entretenimiento');
      expect(prompt).toContain('Poesía');
      expect(prompt).toContain('Matemáticas');
      expect(prompt).toContain('Mecánica automotriz');
      expect(prompt).toContain('Programación');
      expect(prompt).toContain(aiKnowledgePolicy.outOfScopeResponse);
    });
  });
});
