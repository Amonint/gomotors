import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lista de asesores válidos
const ASESORES_VALIDOS = [
  "Diego Paucar",
  "Wilson Luzuriaga",
  "Luis Ayala",
  "Pablo Vivanco",
  "Ricardo Capa",
  "Cristhian Maza",
  "Cristhian Espinosa",
  "Edgar Ruilova",
  "María Eugenia Montesinos",
  "Diego Jaramillo",
  "José Ríos",
  "Yury Illescas",
  "Cesar Gonzales"
];

// Lista de razones válidas
const RAZONES_VALIDAS = [
  "Mantenimiento",
  "Pregunta o Duda",
  "Cotización",
  "Solicitudes",
  "Asesoria"
];

interface RecoleccionData {
  nombres: string;
  email: string;
  cedula: string;
  telefono: string;
  ciudad: string;
  asesor: string;
  razon: string;
  comentario?: string;
  acepta_politicas: boolean;
  firma_base64: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (telefono: string): boolean => {
  // Validar que contenga solo números, espacios, guiones y paréntesis
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phoneRegex.test(telefono) && telefono.replace(/\D/g, '').length >= 7;
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

const validateBase64Signature = (base64: string): boolean => {
  // Validar que sea una cadena Base64 válida con prefijo de imagen
  const base64Regex = /^data:image\/(png|jpeg|jpg);base64,/;
  return base64Regex.test(base64) && base64.length > 100; // Mínimo tamaño razonable
};

const getDeviceInfo = (userAgent: string): string => {
  if (!userAgent || userAgent === 'unknown') return 'Desconocido';

  // Detectar sistema operativo
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac OS')) return 'Mac OS';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  if (userAgent.includes('Linux')) return 'Linux';

  return 'Desconocido';
};

export async function POST(request: NextRequest) {
  try {
    const body: RecoleccionData = await request.json();

    // Validaciones requeridas
    const errors: string[] = [];

    if (!body.nombres?.trim()) {
      errors.push('El nombre es requerido');
    }

    if (!body.email?.trim()) {
      errors.push('El email es requerido');
    } else if (!validateEmail(body.email)) {
      errors.push('Formato de email inválido');
    }

    if (!body.cedula?.trim()) {
      errors.push('La cédula es requerida');
    }

    if (!body.telefono?.trim()) {
      errors.push('El teléfono es requerido');
    } else if (!validatePhone(body.telefono)) {
      errors.push('Formato de teléfono inválido');
    }

    if (!body.ciudad?.trim()) {
      errors.push('La ciudad es requerida');
    }

    if (!body.asesor) {
      errors.push('Debe seleccionar un asesor');
    } else if (!ASESORES_VALIDOS.includes(body.asesor)) {
      errors.push('Asesor seleccionado no válido');
    }

    if (!body.razon) {
      errors.push('Debe seleccionar una razón');
    } else if (!RAZONES_VALIDAS.includes(body.razon)) {
      errors.push('Razón seleccionada no válida');
    }

    if (!body.acepta_politicas) {
      errors.push('Debe aceptar las políticas de privacidad');
    }

    // Validar firma digital
    if (!body.firma_base64?.trim()) {
      errors.push('La firma digital es requerida');
    } else if (!validateBase64Signature(body.firma_base64)) {
      errors.push('Formato de firma inválido');
    }

    // Validar tamaño de la firma (máx 500KB)
    if (body.firma_base64) {
      const firmaSize = (body.firma_base64.length * 3) / 4 / 1024; // Tamaño en KB
      if (firmaSize > 500) {
        errors.push('La firma es muy grande (máximo 500KB)');
      }
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
    const dispositivo = getDeviceInfo(user_agent);

    // Guardar en base de datos
    const recoleccion = await prisma.recoleccionDatos.create({
      data: {
        nombres: body.nombres.trim(),
        email: body.email.trim().toLowerCase(),
        cedula: body.cedula.trim(),
        telefono: body.telefono.trim(),
        ciudad: body.ciudad.trim(),
        asesor: body.asesor,
        razon: body.razon,
        comentario: body.comentario?.trim() || null,
        acepta_politicas: body.acepta_politicas,
        ip_address,
        user_agent,
        firma_base64: body.firma_base64,
        firma_ip: ip_address,
        firma_dispositivo: dispositivo
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Datos guardados exitosamente',
      id: recoleccion.id
    });

  } catch (error) {
    console.error('Error al guardar datos de recolección:', error);
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
    const asesor = searchParams.get('asesor');
    const razon = searchParams.get('razon');
    const search = searchParams.get('search');
    const fechaDesde = searchParams.get('fechaDesde');
    const fechaHasta = searchParams.get('fechaHasta');

    const skip = (page - 1) * limit;

    // Construir filtros
    const where: any = {};

    if (asesor && asesor !== 'todos') {
      where.asesor = asesor;
    }

    if (razon && razon !== 'todos') {
      where.razon = razon;
    }

    if (search) {
      where.OR = [
        { nombres: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
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
    const [recolecciones, total] = await Promise.all([
      prisma.recoleccionDatos.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nombres: true,
          email: true,
          telefono: true,
          ciudad: true,
          asesor: true,
          razon: true,
          createdAt: true
        }
      }),
      prisma.recoleccionDatos.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: recolecciones,
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
    console.error('Error al obtener datos de recolección:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}