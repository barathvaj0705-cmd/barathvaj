import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/constants';

export function middleware(request: NextRequest) {
  const session = request.cookies.get(AUTH_COOKIE_NAME);
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/chat', '/quiz'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/chat/:path*', '/quiz/:path*', '/login', '/signup'],
};
