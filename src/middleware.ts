import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth, requireAdminAuth } from './lib/auth';

export function middleware(request: NextRequest) {
  // Proteger rutas /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!validateAdminAuth(request)) {
      return requireAdminAuth();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};