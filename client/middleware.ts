import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getCurUser, useSession } from './context/session';

export async function middleware(request: NextRequest) {
  const session = useSession; //todo: returning undefined
  const isLoggedIn = !!session;
  console.log(isLoggedIn);

  if (request.nextUrl.pathname == '/logout') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isLoggedIn && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isLoggedIn && request.nextUrl.pathname === ('/startups' || '/favoritos')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
/* export const config = {
  matcher: ['/startups', '/favoritos'],
}; */
