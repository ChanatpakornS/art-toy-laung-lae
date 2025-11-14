import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;

    // Check if the user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // Double-check token exists (should always be true due to authorized callback)
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      try {
        // Fetch user information from the backend to get the role
        const response = await fetch(
          `${process.env.BACKEND_API_URL}/api/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          },
        );

        if (!response.ok) {
          return NextResponse.redirect(new URL('/login', req.url));
        }

        const userData = await response.json();

        // Check if user has admin role
        if (userData.data?.role !== 'admin') {
          // Redirect non-admin users to not-found page
          return NextResponse.redirect(new URL('/not-found', req.url));
        }
      } catch {
        // If there's an error fetching the user role, redirect to login
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  },
);

export const config = {
  matcher: ['/admin/:path*'],
};
