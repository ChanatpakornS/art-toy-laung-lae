'use client';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
interface NextAuthProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

export default function NextAuthProvider({
  children,
  session,
}: NextAuthProviderProps): React.ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
