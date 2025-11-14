import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

// Configuración para aumentar límite de body
export const runtime = 'nodejs';
export const maxDuration = 30;

interface PostulacionData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  message?: string;
  cv?: string; // base64
  acceptTerms: boolean;
}

const validatePhone = (telefono: string): { isValid: boolean; error?: string } => {
  if (/[a-zA-Z]/.test(telefono)) {
    return { isValid: false, error: 'El teléfono no puede contener letras' };
  }

  const allowedCharsRegex = /^[\d\s\-\(\)\+\.]+$/;
  if (!allowedCharsRegex.test(telefono)) {
    return { isValid: false, error: 'Solo se permiten números, espacios, guiones, paréntesis y +' };
  }

  const digitsOnly = telefono.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    return { isValid: false, error: 'El teléfono debe tener al menos 7 dígitos' };
  }

  if (digitsOnly.length > 15) {
    return { isValid: false, error: 'El teléfono no puede tener más de 15 dígitos' };
  }

  return { isValid: true };
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const getClientIP = (request: NextRequest): string => {
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
    const body: PostulacionData = await request.json();

    // Validaciones requeridas
    const errors: string[] = [];

    if (!body.name?.trim()) {
      errors.push('El nombre es requerido');
    }

    if (!body.lastName?.trim()) {
      errors.push('Los apellidos son requeridos');
    }

    if (!body.email?.trim()) {
      errors.push('El email es requerido');
    } else if (!validateEmail(body.email)) {
      errors.push('Formato de email inválido');
    }

    if (!body.phone?.trim()) {
      errors.push('El teléfono es requerido');
    } else {
      const phoneValidation = validatePhone(body.phone);
      if (!phoneValidation.isValid) {
        errors.push(phoneValidation.error!);
      }
    }

    if (!body.position?.trim()) {
      errors.push('El puesto es requerido');
    }

    if (!body.acceptTerms) {
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

    // Guardar archivo CV si existe
    let cv_filename: string | null = null;
    let cv_path: string | null = null;

    if (body.cv) {
      try {
        // Validar que el base64 no esté vacío
        if (!body.cv.trim()) {
          throw new Error('CV base64 is empty');
        }

        // Generar nombre único para el archivo
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        cv_filename = `cv_${timestamp}_${randomString}.pdf`;
        cv_path = `/uploads/cv/${cv_filename}`;

        // Convertir base64 a buffer
        const buffer = Buffer.from(body.cv, 'base64');

        // Validar tamaño del archivo (máximo 10MB)
        if (buffer.length > 10 * 1024 * 1024) {
          throw new Error('El archivo CV es demasiado grande (máximo 10MB)');
        }

        // Guardar archivo
        const filePath = join(process.cwd(), 'uploads', 'cv', cv_filename);
        await writeFile(filePath, buffer);
      } catch (fileError) {
        console.error('Error al guardar CV:', fileError);
        return NextResponse.json(
          { success: false, error: 'Error al procesar el archivo CV: ' + (fileError as Error).message },
          { status: 500 }
        );
      }
    }

    // Guardar en base de datos
    const postulacion = await prisma.postulacion.create({
      data: {
        nombre: body.name.trim(),
        apellidos: body.lastName.trim(),
        email: body.email.trim().toLowerCase(),
        telefono: body.phone.trim(),
        puesto: body.position.trim(),
        mensaje: body.message?.trim() || null,
        cv_filename,
        cv_path,
        acepta_terminos: body.acceptTerms,
        ip_address,
        user_agent
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Postulación guardada exitosamente',
      id: postulacion.id
    });

  } catch (error) {
    console.error('Error al guardar postulación:', error);
    console.error('Error stack:', (error as Error).stack);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor: ' + (error as Error).message },
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
    const search = searchParams.get('search');
    const puesto = searchParams.get('puesto');
    const fechaDesde = searchParams.get('fechaDesde');
    const fechaHasta = searchParams.get('fechaHasta');

    const skip = (page - 1) * limit;

    // Construir filtros
    const where: any = {};

    if (search) {
      where.OR = [
        { nombre: { contains: search, mode: 'insensitive' } },
        { apellidos: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (puesto && puesto !== 'todos') {
      where.puesto = { contains: puesto, mode: 'insensitive' };
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
    const [postulaciones, total] = await Promise.all([
      prisma.postulacion.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nombre: true,
          apellidos: true,
          email: true,
          telefono: true,
          puesto: true,
          cv_filename: true,
          createdAt: true
        }
      }),
      prisma.postulacion.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: postulaciones,
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
    console.error('Error al obtener postulaciones:', error);
    console.error('Error stack:', (error as Error).stack);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor: ' + (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}