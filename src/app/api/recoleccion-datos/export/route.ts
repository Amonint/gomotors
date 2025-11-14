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
    const recolecciones = await prisma.recoleccionDatos.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Preparar datos para Excel
    const excelData = recolecciones.map((registro, index) => ({
      '#': index + 1,
      'ID': registro.id,
      'Nombres': registro.nombres,
      'Email': registro.email,
      'Cédula': registro.cedula,
      'Teléfono': registro.telefono,
      'Ciudad': registro.ciudad,
      'Asesor': registro.asesor,
      'Razón': registro.razon,
      'Comentario': registro.comentario || 'N/A',
      'Aceptó Políticas': registro.acepta_politicas ? 'SÍ' : 'NO',
      'Firmado': registro.firma_base64 ? 'SÍ' : 'NO',
      'Fecha de Firma': registro.firma_fecha ? formatDate(registro.firma_fecha) : 'N/A',
      'Dispositivo de Firma': registro.firma_dispositivo || 'N/A',
      'Fecha de Aceptación': formatDate(registro.createdAt),
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
      { wch: 30 },  // Nombres
      { wch: 35 },  // Email
      { wch: 15 },  // Cédula
      { wch: 15 },  // Teléfono
      { wch: 20 },  // Ciudad
      { wch: 25 },  // Asesor
      { wch: 20 },  // Razón
      { wch: 40 },  // Comentario
      { wch: 15 },  // Aceptó Políticas
      { wch: 10 },  // Firmado
      { wch: 20 },  // Fecha de Firma
      { wch: 20 },  // Dispositivo de Firma
      { wch: 20 },  // Fecha
      { wch: 15 },  // IP
      { wch: 50 }   // Navegador
    ];

    worksheet['!cols'] = columnWidths;

    // Añadir worksheet al workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Recolección de Datos');

    // Generar buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Crear nombre de archivo con fecha actual
    const now = new Date();
    const fileName = `Recoleccion_Datos_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.xlsx`;

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
    console.error('Error al exportar datos:', error);
    return NextResponse.json(
      { success: false, error: 'Error al exportar datos' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}