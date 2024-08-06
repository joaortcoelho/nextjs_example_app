import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isLoggedIn = !!token;

  if (!isLoggedIn && request.nextUrl.pathname === ('/startups' || '/favoritos' || '/logout')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoggedIn && request.nextUrl.pathname === ('/login' || '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
/* export const config = {
  matcher: ['/startups', '/favoritos'],
}; */
