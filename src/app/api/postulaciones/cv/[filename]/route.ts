import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    if (!filename) {
      return NextResponse.json(
        { success: false, error: 'Nombre de archivo requerido' },
        { status: 400 }
      );
    }

    // Validar que el archivo sea un PDF y tenga el formato correcto
    if (!filename.match(/^cv_\d+_[a-z0-9]+\.pdf$/)) {
      return NextResponse.json(
        { success: false, error: 'Nombre de archivo inválido' },
        { status: 400 }
      );
    }

    // Construir ruta del archivo
    const filePath = join(process.cwd(), 'uploads', 'cv', filename);

    try {
      // Leer el archivo
      const fileBuffer = await readFile(filePath);

      // Crear respuesta con el archivo
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': fileBuffer.length.toString(),
        },
      });

    } catch (fileError) {
      console.error('Error al leer archivo CV:', fileError);
      return NextResponse.json(
        { success: false, error: 'Archivo no encontrado' },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('Error al descargar CV:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}