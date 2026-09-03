import { NextRequest, NextResponse } from 'next/server';
import { getAIChatConfig } from '@/lib/ai/config';
import { checkInputGuardrails } from '@/lib/ai/guardrails';
import { detectIntent } from '@/lib/ai/intent';
import { getSystemPromptKnowledge } from '@/lib/ai/knowledge';
import { getAIProvider } from '@/lib/ai/provider';
import { ChatMessage, AIRequestContext } from '@/lib/ai/types';
import { checkRateLimit, isLocalhostRequest } from '@/lib/ai/ratelimit';
import { createWhatsAppLink } from '@/lib/whatsapp';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const config = getAIChatConfig();

    // 1. Feature Flag & Mode Resolution Check
    if (config.mode === 'disabled' || (!config.enabled && config.mode !== 'private')) {
      return NextResponse.json(
        {
          error: 'AI Chat subsystem is currently disabled.',
          message: {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: 'El servicio de asistente virtual no está habilitado.',
            createdAt: Date.now(),
            actions: [
              {
                type: 'whatsapp',
                label: 'Contactar por WhatsApp',
                href: createWhatsAppLink({ context: 'general' }),
                isExternal: true,
              },
            ],
          },
        },
        { status: 200 }
      );
    }

    // 2. Private Mode Server-Side Authorization Check
    if (config.mode === 'private') {
      const isDevLocal = process.env.NODE_ENV === 'development' && isLocalhostRequest(req);

      if (!isDevLocal) {
        const authHeader = req.headers.get('x-agora-ai-auth') || req.headers.get('authorization');
        const secret = config.privateSecret || process.env.AI_CHAT_PRIVATE_SECRET;
        const isBearer = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

        if (!secret || isBearer !== secret) {
          return NextResponse.json(
            { error: 'Unauthorized: Private mode requires a valid authorization header.' },
            { status: 401 }
          );
        }
      }
    }

    // 3. Server-Side IP-Aware Rate Limiting
    const rateLimit = checkRateLimit(req);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please slow down and try again later.',
          message: {
            id: `rate-${Date.now()}`,
            role: 'assistant',
            content:
              'Ha excedido el límite temporal de consultas. Por favor espere unos momentos o comuníquese directamente con nosotros por WhatsApp.',
            createdAt: Date.now(),
            actions: [
              {
                type: 'whatsapp',
                label: 'Contactar por WhatsApp',
                href: createWhatsAppLink({ context: 'general' }),
                isExternal: true,
              },
            ],
          },
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    // 4. Parse & Validate Payload Shape
    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request payload. Expected an array of messages.' },
        { status: 400 }
      );
    }

    const messages: ChatMessage[] = body.messages;

    // SEC-03: Upper bound on incoming message array (max 10 messages)
    if (messages.length > 10) {
      return NextResponse.json(
        {
          error:
            'El historial de la conversación supera el límite máximo permitido (10 mensajes). Por favor inicie una nueva sesión.',
        },
        { status: 400 }
      );
    }

    const latestUserMsg = messages[messages.length - 1];

    if (!latestUserMsg || typeof latestUserMsg.content !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message structure.' },
        { status: 400 }
      );
    }

    // 5. Length Limitation
    const cleanContent = latestUserMsg.content.trim();
    if (cleanContent.length === 0) {
      return NextResponse.json(
        { error: 'Message content cannot be empty.' },
        { status: 400 }
      );
    }

    if (cleanContent.length > config.maxUserMessageLength) {
      return NextResponse.json(
        {
          message: {
            id: `msg-${Date.now()}`,
            role: 'assistant',
            content: `Por favor ingrese una consulta de hasta ${config.maxUserMessageLength} caracteres para brindarle una mejor orientación.`,
            createdAt: Date.now(),
          },
        },
        { status: 200 }
      );
    }

    // 6. Guardrails Assessment (Prompt Injection, Sensitive Data, Urgent Matters)
    const guardrailCheck = checkInputGuardrails(cleanContent);
    if (!guardrailCheck.allowed && guardrailCheck.interceptionMessage) {
      return NextResponse.json({
        message: {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content: guardrailCheck.interceptionMessage,
          createdAt: Date.now(),
          actions: guardrailCheck.suggestedActions,
        },
      });
    }

    // 7. Intent Detection & Knowledge Context Assembly
    const intentResult = detectIntent(cleanContent);
    const groundedKnowledge = getSystemPromptKnowledge();

    const requestContext: AIRequestContext = {
      mode: config.mode,
      userQuery: cleanContent,
      intentResult,
      groundedKnowledge,
    };

    // 8. Provider Inference Execution (Local or Gemini)
    const provider = getAIProvider();
    const responsePayload = await provider.generateResponse(messages, requestContext);

    // 9. Combine Intent Actions if none provided by inference
    const combinedActions = responsePayload.actions || intentResult.suggestedActions;

    return NextResponse.json({
      message: {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: responsePayload.content,
        createdAt: Date.now(),
        actions: combinedActions,
      },
      intent: intentResult.intent,
    });
  } catch {
    // Graceful error handling - never expose raw stack traces
    return NextResponse.json(
      {
        message: {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            'Ocurrió un inconveniente al procesar su solicitud. Puede comunicarse directamente con nuestro equipo a través de WhatsApp.',
          createdAt: Date.now(),
          actions: [
            {
              type: 'whatsapp',
              label: 'Contactar por WhatsApp',
              href: createWhatsAppLink({ context: 'general' }),
              isExternal: true,
            },
          ],
        },
      },
      { status: 200 }
    );
  }
}
