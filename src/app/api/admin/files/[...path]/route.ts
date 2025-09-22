import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { validateAdminAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Validar autenticación admin
    if (!validateAdminAuth(request)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { path } = await params;

    if (!path || path.length === 0) {
      return new NextResponse('Path required', { status: 400 });
    }

    // Construir la ruta del archivo
    const filePath = join(process.cwd(), ...path);

    // Verificar que el archivo esté en el directorio uploads/cedulas
    if (!filePath.includes('uploads/cedulas')) {
      return new NextResponse('Access denied', { status: 403 });
    }

    // Leer el archivo
    const fileBuffer = await readFile(filePath);

    // Determinar el tipo de contenido basado en la extensión
    const extension = path[path.length - 1].split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';

    switch (extension) {
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'png':
        contentType = 'image/png';
        break;
      case 'pdf':
        contentType = 'application/pdf';
        break;
    }

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    console.error('Error serving file:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}