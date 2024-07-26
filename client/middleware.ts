import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getCurUser } from './pages/api/auth/login';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isLoggedIn = getCurUser();
  if (!isLoggedIn) {
    NextResponse.redirect(new URL('/home', request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/startups', '/favoritos'],
};
