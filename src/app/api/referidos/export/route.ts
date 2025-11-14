import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const fechaDesde = searchParams.get('fechaDesde');
    const fechaHasta = searchParams.get('fechaHasta');

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

    const referidos = await prisma.referido.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    const data = referidos.map(referido => ({
      'ID': referido.id,
      'Referente - Nombre': referido.referente_nombre,
      'Referente - Apellidos': referido.referente_apellidos || '',
      'Referente - Cédula': referido.referente_cedula || '',
      'Referente - Teléfono': referido.referente_telefono || '',
      'Referente - Email': referido.referente_email,
      'Referido - Nombre': referido.referido_nombre,
      'Referido - Apellidos': referido.referido_apellidos || '',
      'Referido - Teléfono': referido.referido_telefono || '',
      'Referido - Ocupación': referido.referido_ocupacion || '',
      'Acepta Términos': referido.acepta_terminos ? 'Sí' : 'No',
      'IP Address': referido.ip_address || '',
      'User Agent': referido.user_agent || '',
      'Fecha de Registro': referido.createdAt.toLocaleString('es-ES'),
      'Última Actualización': referido.updatedAt.toLocaleString('es-ES')
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Referidos');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer'
    });

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `referidos_${timestamp}.xlsx`;

    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': excelBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error al exportar referidos:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}