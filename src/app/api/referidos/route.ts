import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const runtime = 'nodejs';
export const maxDuration = 30;

interface ReferidoData {
  referrerName: string;
  referrerLastName?: string;
  referrerCedula?: string;
  referrerPhone?: string;
  referrerEmail: string;
  referredName: string;
  referredLastName?: string;
  referredPhone?: string;
  referredOccupation?: string;
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
    const body: ReferidoData = await request.json();

    const errors: string[] = [];

    if (!body.referrerName?.trim()) {
      errors.push('El nombre del referente es requerido');
    }

    if (!body.referrerEmail?.trim()) {
      errors.push('El email del referente es requerido');
    } else if (!validateEmail(body.referrerEmail)) {
      errors.push('Formato de email del referente inválido');
    }

    if (!body.referredName?.trim()) {
      errors.push('El nombre del referido es requerido');
    }

    if (body.referrerPhone?.trim()) {
      const phoneValidation = validatePhone(body.referrerPhone);
      if (!phoneValidation.isValid) {
        errors.push('Teléfono del referente: ' + phoneValidation.error!);
      }
    }

    if (body.referredPhone?.trim()) {
      const phoneValidation = validatePhone(body.referredPhone);
      if (!phoneValidation.isValid) {
        errors.push('Teléfono del referido: ' + phoneValidation.error!);
      }
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

    const ip_address = getClientIP(request);
    const user_agent = request.headers.get('user-agent') || 'unknown';

    const referido = await prisma.referido.create({
      data: {
        referente_nombre: body.referrerName.trim(),
        referente_apellidos: body.referrerLastName?.trim() || null,
        referente_cedula: body.referrerCedula?.trim() || null,
        referente_telefono: body.referrerPhone?.trim() || null,
        referente_email: body.referrerEmail.trim().toLowerCase(),
        referido_nombre: body.referredName.trim(),
        referido_apellidos: body.referredLastName?.trim() || null,
        referido_telefono: body.referredPhone?.trim() || null,
        referido_ocupacion: body.referredOccupation?.trim() || null,
        acepta_terminos: body.acceptTerms,
        ip_address,
        user_agent
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Referido guardado exitosamente',
      id: referido.id
    });

  } catch (error) {
    console.error('Error al guardar referido:', error);
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
    const fechaDesde = searchParams.get('fechaDesde');
    const fechaHasta = searchParams.get('fechaHasta');

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { referente_nombre: { contains: search, mode: 'insensitive' } },
        { referente_apellidos: { contains: search, mode: 'insensitive' } },
        { referente_email: { contains: search, mode: 'insensitive' } },
        { referido_nombre: { contains: search, mode: 'insensitive' } },
        { referido_apellidos: { contains: search, mode: 'insensitive' } }
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

    const [referidos, total] = await Promise.all([
      prisma.referido.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          referente_nombre: true,
          referente_apellidos: true,
          referente_email: true,
          referido_nombre: true,
          referido_apellidos: true,
          createdAt: true
        }
      }),
      prisma.referido.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: referidos,
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
    console.error('Error al obtener referidos:', error);
    console.error('Error stack:', (error as Error).stack);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor: ' + (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}