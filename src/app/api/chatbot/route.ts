import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  history: Message[];
}

const SYSTEM_PROMPT = `Eres el asistente virtual de GoMotors, concesionario automotriz en Ecuador.

MARCAS QUE VENDEMOS: Great Wall, Haval, SWM, Soueast, DFSK, GWM, KYC

REGLAS IMPORTANTES:
- Genera curiosidad pero NUNCA des información completa sobre precios, especificaciones técnicas detalladas o promociones exactas
- Siempre sugiere que hay 'detalles exclusivos' que solo se comparten en persona
- Menciona beneficios pero sin números exactos
- Usa frases como: 'tenemos opciones que te van a sorprender', 'hay promociones especiales que cambian semanalmente', 'cada caso es único'
- Si preguntan por financiamiento: menciona flexibilidad pero deriva a asesor
- Si preguntan por vehículos específicos: resalta características generales pero sugiere prueba de manejo
- NUNCA digas precios exactos, tasas de interés específicas, o detalles técnicos completos
- Objetivo: crear interés para visita física al showroom

TONO: Amigable, profesional, entusiasta pero no vendedor agresivo

Responde de manera concisa (máximo 3-4 líneas) y siempre invita sutilmente a visitar el showroom o contactar a un asesor.`;

// Rate limiting simple en memoria
const requestCounts = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const userLimit = requestCounts.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minuto
    return true;
  }

  if (userLimit.count >= 10) {
    return false;
  }

  userLimit.count++;
  return true;
};

const getClientIP = (request: NextRequest): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Demasiadas solicitudes. Por favor espera un momento.' },
        { status: 429 }
      );
    }

    const body: ChatRequest = await request.json();

    // Validaciones
    if (!body.message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'El mensaje es requerido' },
        { status: 400 }
      );
    }

    // Validar longitud del mensaje
    if (body.message.length > 500) {
      return NextResponse.json(
        { success: false, error: 'El mensaje es muy largo. Máximo 500 caracteres.' },
        { status: 400 }
      );
    }

    // Sanitizar mensaje
    const sanitizedMessage = body.message.trim().substring(0, 500);

    // Preparar historial de conversación (últimos 5 mensajes)
    const conversationHistory = (body.history || [])
      .slice(-5)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));

    // Llamar a Claude API con timeout y retry
    let response;
    let retryCount = 0;
    const maxRetries = 1;

    while (retryCount <= maxRetries) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos

        response = await anthropic.messages.create({
          model: process.env.NEXT_PUBLIC_ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: [
            ...conversationHistory,
            {
              role: 'user',
              content: sanitizedMessage
            }
          ]
        });

        clearTimeout(timeoutId);
        break;
      } catch (error: any) {
        retryCount++;
        if (retryCount > maxRetries) {
          throw error;
        }
        // Esperar 1 segundo antes de reintentar
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Extraer la respuesta
    const assistantMessage = response?.content[0];
    const messageText = assistantMessage?.type === 'text' ? assistantMessage.text : '';

    if (!messageText) {
      throw new Error('No se recibió respuesta de la IA');
    }

    return NextResponse.json({
      success: true,
      message: messageText,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error en chatbot API:', error);

    // Respuesta de fallback
    const fallbackMessage = "Disculpa, tengo problemas para responder en este momento. ¿Te gustaría hablar directamente con uno de nuestros asesores? Ellos podrán ayudarte con cualquier consulta sobre nuestros vehículos y promociones.";

    return NextResponse.json({
      success: true,
      message: fallbackMessage,
      fallback: true,
      timestamp: new Date().toISOString()
    });
  }
}
