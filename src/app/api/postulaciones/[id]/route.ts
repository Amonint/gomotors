import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID es requerido' },
        { status: 400 }
      );
    }

    const postulacion = await prisma.postulacion.findUnique({
      where: { id }
    });

    if (!postulacion) {
      return NextResponse.json(
        { success: false, error: 'Postulación no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: postulacion
    });

  } catch (error) {
    console.error('Error al obtener postulación:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}