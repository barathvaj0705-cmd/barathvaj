import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Authentication is now handled client-side in the layouts/pages
  // so the middleware is simplified.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/chat/:path*', '/quiz/:path*', '/login', '/signup'],
};
