import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const asesor = searchParams.get('asesor');
    const razon = searchParams.get('razon');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Construir filtros
    const where: Record<string, unknown> = {};

    if (asesor && asesor !== 'all') {
      where.asesor = asesor;
    }

    if (razon && razon !== 'all') {
      where.razon = razon;
    }

    if (search) {
      where.OR = [
        { nombres: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Obtener solicitudes con paginación
    const [solicitudes, total] = await Promise.all([
      prisma.solicitud.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          nombres: true,
          email: true,
          asesor: true,
          razon: true,
          createdAt: true
        }
      }),
      prisma.solicitud.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: solicitudes,
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
    console.error('Error fetching solicitudes:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      nombres,
      email,
      cedula,
      telefono,
      ciudad,
      asesor,
      razon,
      comentario,
      cedula_frontal_path,
      cedula_trasera_path,
      acepta_politicas
    } = body;

    // Validaciones
    if (!nombres || !email || !cedula || !telefono || !ciudad || !asesor || !razon) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos obligatorios deben ser completados' },
        { status: 400 }
      );
    }

    if (!acepta_politicas) {
      return NextResponse.json(
        { success: false, error: 'Debe aceptar las políticas de privacidad' },
        { status: 400 }
      );
    }

    // Validar que el asesor sea válido
    const asesoresValidos = [
      'Diego Paucar',
      'Wilson Luzuriaga',
      'Luis Ayala',
      'Pablo Vivanco',
      'Ricardo Capa',
      'Cristhian Maza',
      'Cristhian Espinosa',
      'Edgar Ruilova',
      'María Eugenia Montesinos',
      'Diego Jaramillo',
      'José Ríos',
      'Yury Illescas',
      'Cesar Gonzales'
    ];

    if (!asesoresValidos.includes(asesor)) {
      return NextResponse.json(
        { success: false, error: 'Asesor no válido' },
        { status: 400 }
      );
    }

    // Validar razón
    const razonesValidas = [
      'Mantenimiento',
      'Pregunta o Duda',
      'Cotización',
      'Solicitudes',
      'Asesoria'
    ];

    if (!razonesValidas.includes(razon)) {
      return NextResponse.json(
        { success: false, error: 'Razón no válida' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Formato de email no válido' },
        { status: 400 }
      );
    }

    // Crear la solicitud en la base de datos
    const solicitud = await prisma.solicitud.create({
      data: {
        nombres,
        email,
        cedula,
        telefono,
        ciudad,
        asesor,
        razon,
        comentario: comentario || null,
        cedula_frontal_path: cedula_frontal_path || null,
        cedula_trasera_path: cedula_trasera_path || null,
        acepta_politicas
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Solicitud enviada exitosamente',
      solicitudId: solicitud.id
    });

  } catch (error) {
    console.error('Error creating solicitud:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}