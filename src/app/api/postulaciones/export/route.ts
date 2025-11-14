import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

const formatDate = (date: Date): string => {
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Guayaquil'
  });
};

export async function GET(request: NextRequest) {
  try {
    // Obtener todos los registros
    const postulaciones = await prisma.postulacion.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Preparar datos para Excel
    const excelData = postulaciones.map((registro, index) => ({
      '#': index + 1,
      'ID': registro.id,
      'Nombre': registro.nombre,
      'Apellidos': registro.apellidos,
      'Email': registro.email,
      'Teléfono': registro.telefono,
      'Puesto': registro.puesto,
      'Mensaje': registro.mensaje || 'N/A',
      'CV Adjunto': registro.cv_filename ? 'SÍ' : 'NO',
      'Nombre del CV': registro.cv_filename || 'N/A',
      'Aceptó Términos': registro.acepta_terminos ? 'SÍ' : 'NO',
      'Fecha de Postulación': formatDate(registro.createdAt),
      'IP': registro.ip_address || 'N/A',
      'Navegador': registro.user_agent || 'N/A'
    }));

    // Crear workbook y worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Configurar ancho de columnas
    const columnWidths = [
      { wch: 5 },   // #
      { wch: 25 },  // ID
      { wch: 20 },  // Nombre
      { wch: 20 },  // Apellidos
      { wch: 30 },  // Email
      { wch: 15 },  // Teléfono
      { wch: 25 },  // Puesto
      { wch: 40 },  // Mensaje
      { wch: 12 },  // CV Adjunto
      { wch: 30 },  // Nombre del CV
      { wch: 15 },  // Aceptó Términos
      { wch: 20 },  // Fecha
      { wch: 15 },  // IP
      { wch: 50 }   // Navegador
    ];

    worksheet['!cols'] = columnWidths;

    // Añadir worksheet al workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Postulaciones');

    // Generar buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Crear nombre de archivo con fecha actual
    const now = new Date();
    const fileName = `Postulaciones_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.xlsx`;

    // Configurar headers para descarga
    const headers = new Headers();
    headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
    headers.set('Content-Length', buffer.length.toString());

    return new NextResponse(buffer, {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Error al exportar postulaciones:', error);
    return NextResponse.json(
      { success: false, error: 'Error al exportar postulaciones' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}