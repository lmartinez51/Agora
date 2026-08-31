import { NextRequest, NextResponse } from 'next/server';
import { getAIChatConfig } from '@/lib/ai/config';
import { checkInputGuardrails } from '@/lib/ai/guardrails';
import { detectIntent } from '@/lib/ai/intent';
import { getSystemPromptKnowledge } from '@/lib/ai/knowledge';
import { getAIProvider } from '@/lib/ai/provider';
import { ChatMessage, AIRequestContext } from '@/lib/ai/types';
import { createWhatsAppLink } from '@/lib/whatsapp';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const config = getAIChatConfig();

    // 1. Feature Flag / Mode Check
    if (!config.enabled && config.mode === 'disabled') {
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

    // 2. Parse & Validate Payload
    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request payload. Expected an array of messages.' },
        { status: 400 }
      );
    }

    const messages: ChatMessage[] = body.messages;
    const latestUserMsg = messages[messages.length - 1];

    if (!latestUserMsg || typeof latestUserMsg.content !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message structure.' },
        { status: 400 }
      );
    }

    // 3. Length Limitation
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

    // 4. Guardrails Assessment (Prompt Injection, Sensitive Data, Urgent Matter)
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

    // 5. Intent Detection & Knowledge Context Assembly
    const intentResult = detectIntent(cleanContent);
    const groundedKnowledge = getSystemPromptKnowledge();

    const requestContext: AIRequestContext = {
      mode: config.mode,
      userQuery: cleanContent,
      intentResult,
      groundedKnowledge,
    };

    // 6. Provider Inference Execution
    const provider = getAIProvider();
    const responsePayload = await provider.generateResponse(messages, requestContext);

    // 7. Combine Intent Actions if none provided by inference
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
