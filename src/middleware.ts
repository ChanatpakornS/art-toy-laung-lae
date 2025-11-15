import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import getMe from '@/libs/getMe';

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
        const userData = await getMe(token.token as string);

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
