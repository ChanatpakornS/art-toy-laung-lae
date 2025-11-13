import type NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      role?: string;
      success: boolean;
      token: string;
      iat: number;
      exp: number;
      jti: string;
    };
  }

  interface User {
    _id: string;
    name: string;
    email: string;
    role?: string;
    success: boolean;
    token: string;
    iat: number;
    exp: number;
    jti: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id: string;
    name: string;
    email: string;
    role?: string;
    success: boolean;
    token: string;
    iat: number;
    exp: number;
    jti: string;
  }
}
