import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// مسیرهای auth که باید محافظت شوند
const authPaths = ['/login', '/verify-otp'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('acccss_token')?.value

  if (authToken && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // شامل همه مسیرها به جز فایل‌های استاتیک
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)',
  ],
};
