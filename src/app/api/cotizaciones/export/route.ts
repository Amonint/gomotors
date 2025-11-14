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
    const cotizaciones = await prisma.cotizacion.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Preparar datos para Excel
    const excelData = cotizaciones.map((registro, index) => ({
      '#': index + 1,
      'ID': registro.id,
      'Nombre Completo': registro.nombre_completo,
      'Teléfono': registro.telefono,
      'Ciudad': registro.ciudad,
      'Marca de Interés': registro.marca_interes,
      'Segmento': registro.segmento,
      'Forma de Pago': registro.forma_pago || 'N/A',
      'Comentario': registro.comentario || 'N/A',
      'Aceptó Términos': registro.acepta_terminos ? 'SÍ' : 'NO',
      'Fecha de Registro': formatDate(registro.createdAt),
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
      { wch: 30 },  // Nombre Completo
      { wch: 15 },  // Teléfono
      { wch: 20 },  // Ciudad
      { wch: 15 },  // Marca de Interés
      { wch: 15 },  // Segmento
      { wch: 15 },  // Forma de Pago
      { wch: 40 },  // Comentario
      { wch: 15 },  // Aceptó Términos
      { wch: 20 },  // Fecha
      { wch: 15 },  // IP
      { wch: 50 }   // Navegador
    ];

    worksheet['!cols'] = columnWidths;

    // Añadir worksheet al workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cotizaciones');

    // Generar buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Crear nombre de archivo con fecha actual
    const now = new Date();
    const fileName = `Cotizaciones_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.xlsx`;

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
    console.error('Error al exportar cotizaciones:', error);
    return NextResponse.json(
      { success: false, error: 'Error al exportar cotizaciones' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}