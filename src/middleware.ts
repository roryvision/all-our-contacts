import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // route protection
    const token = await getToken({
      req,
      raw: true,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (req.nextUrl.pathname.startsWith('/api')) {
      const response = NextResponse.next();
      response.headers.append('Access-Control-Allow-Origin', '*');
      return response;
    }

    const publicRoutes = ['/search', '/create'];
    const isAccessingPublicRoute = publicRoutes.some(
      (route) => pathname === route
    );

    if (!token && !isAccessingPublicRoute) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|$).*)',
  ],
};