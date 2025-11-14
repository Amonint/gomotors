import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lista de marcas válidas
const MARCAS_VALIDAS = [
  "HYUNDAI", "GWM", "HAVAL", "LIVAN", "SHINERAY", "DFKS", "TANK", "KINGLONG", "SWM"
];

// Lista de segmentos válidos
const SEGMENTOS_VALIDOS = [
  "Auto", "SUV", "Camioneta", "VAN", "CAMIÓN"
];

// Lista de formas de pago válidas
const FORMAS_PAGO_VALIDAS = [
  "Contado", "Crédito"
];

interface CotizacionData {
  nombreCompleto: string;
  telefono: string;
  ciudad: string;
  marcaInteres: string;
  segmento: string;
  formaPago?: string;
  comentario?: string;
  aceptaTerminos: boolean;
}

const validatePhone = (telefono: string): { isValid: boolean; error?: string } => {
  // Verificar si contiene letras
  if (/[a-zA-Z]/.test(telefono)) {
    return { isValid: false, error: 'El teléfono no puede contener letras' };
  }

  // Verificar si contiene caracteres no permitidos
  const allowedCharsRegex = /^[\d\s\-\(\)\+\.]+$/;
  if (!allowedCharsRegex.test(telefono)) {
    return { isValid: false, error: 'El teléfono solo puede contener números, espacios, guiones, paréntesis y el símbolo +' };
  }

  // Verificar longitud de dígitos
  const digitsOnly = telefono.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    return { isValid: false, error: 'El teléfono debe tener al menos 7 dígitos' };
  }

  if (digitsOnly.length > 15) {
    return { isValid: false, error: 'El teléfono no puede tener más de 15 dígitos' };
  }

  return { isValid: true };
};

const getClientIP = (request: NextRequest): string => {
  // Intentar obtener IP de varios headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const remoteAddr = request.headers.get('remote-addr');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (remoteAddr) {
    return remoteAddr;
  }

  return 'unknown';
};

export async function POST(request: NextRequest) {
  try {
    const body: CotizacionData = await request.json();

    // Validaciones requeridas
    const errors: string[] = [];

    if (!body.nombreCompleto?.trim()) {
      errors.push('El nombre completo es requerido');
    }

    if (!body.telefono?.trim()) {
      errors.push('El teléfono es requerido');
    } else {
      const phoneValidation = validatePhone(body.telefono);
      if (!phoneValidation.isValid) {
        errors.push(phoneValidation.error!);
      }
    }

    if (!body.ciudad?.trim()) {
      errors.push('La ciudad es requerida');
    }

    if (!body.marcaInteres) {
      errors.push('Debe seleccionar una marca de interés');
    } else if (!MARCAS_VALIDAS.includes(body.marcaInteres)) {
      errors.push('Marca seleccionada no válida');
    }

    if (!body.segmento) {
      errors.push('Debe seleccionar un segmento');
    } else if (!SEGMENTOS_VALIDOS.includes(body.segmento)) {
      errors.push('Segmento seleccionado no válido');
    }

    if (body.formaPago && body.formaPago.trim() && !FORMAS_PAGO_VALIDAS.includes(body.formaPago)) {
      errors.push('Forma de pago seleccionada no válida');
    }

    if (!body.aceptaTerminos) {
      errors.push('Debe aceptar los términos y condiciones');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      );
    }

    // Obtener IP y User Agent
    const ip_address = getClientIP(request);
    const user_agent = request.headers.get('user-agent') || 'unknown';

    // Guardar en base de datos
    const cotizacion = await prisma.cotizacion.create({
      data: {
        nombre_completo: body.nombreCompleto.trim(),
        telefono: body.telefono.trim(),
        ciudad: body.ciudad.trim(),
        marca_interes: body.marcaInteres,
        segmento: body.segmento,
        forma_pago: (body.formaPago && body.formaPago.trim()) || null,
        comentario: body.comentario?.trim() || null,
        acepta_terminos: body.aceptaTerminos,
        ip_address,
        user_agent
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Cotización guardada exitosamente',
      id: cotizacion.id
    });

  } catch (error) {
    console.error('Error al guardar cotización:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const marca = searchParams.get('marca');
    const segmento = searchParams.get('segmento');
    const formaPago = searchParams.get('formaPago');
    const search = searchParams.get('search');
    const fechaDesde = searchParams.get('fechaDesde');
    const fechaHasta = searchParams.get('fechaHasta');

    const skip = (page - 1) * limit;

    // Construir filtros
    const where: any = {};

    if (marca && marca !== 'todos') {
      where.marca_interes = marca;
    }

    if (segmento && segmento !== 'todos') {
      where.segmento = segmento;
    }

    if (formaPago && formaPago !== 'todos') {
      where.forma_pago = formaPago;
    }

    if (search) {
      where.OR = [
        { nombre_completo: { contains: search, mode: 'insensitive' } },
        { ciudad: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (fechaDesde || fechaHasta) {
      where.createdAt = {};
      if (fechaDesde) {
        where.createdAt.gte = new Date(fechaDesde);
      }
      if (fechaHasta) {
        const fecha = new Date(fechaHasta);
        fecha.setHours(23, 59, 59, 999);
        where.createdAt.lte = fecha;
      }
    }

    // Obtener datos y total
    const [cotizaciones, total] = await Promise.all([
      prisma.cotizacion.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nombre_completo: true,
          telefono: true,
          ciudad: true,
          marca_interes: true,
          segmento: true,
          forma_pago: true,
          createdAt: true
        }
      }),
      prisma.cotizacion.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: cotizaciones,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}