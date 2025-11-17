'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import getMe from '@/libs/getMe';
import type { User } from '@/types/auth.types';

export function Navbar() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session) {
      const fetchUser = async () => {
        try {
          const userData = await getMe(session.user.token);
          setUser(userData.data);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch user:', error);
          signOut();
        }
      };

      fetchUser();
    }
  }, [session]);

  return (
    <nav className='flex justify-between items-center p-4'>
      {/* Left side - User info */}
      <div className='flex items-center space-x-4'>
        {session && (
          <div className='flex flex-col'>
            <span className='font-medium'>{session.user?.name}</span>
            {session.user?.email && (
              <span className='text-sm text-muted-foreground'>
                {session.user.email}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Right side - Navigation */}
      <div className='flex space-x-8 items-center'>
        <Link
          href='/'
          className='text-foreground hover:text-muted-foreground transition-colors'
        >
          Home
        </Link>
        {user?.role === 'admin' ? (
          <>
            <Link
              href='/admin/arttoy-management'
              className='text-foreground hover:text-muted-foreground transition-colors'
            >
              Arttoy Management
            </Link>
            <Link
              href='/admin/orders'
              className='text-foreground hover:text-muted-foreground transition-colors'
            >
              Orders
            </Link>
          </>
        ) : (
          <>
            <Link
              href='/arttoys'
              className='text-foreground hover:text-muted-foreground transition-colors'
            >
              Arttoys
            </Link>
            {session && (
              <Link
                href='/myorder'
                className='text-foreground hover:text-muted-foreground transition-colors'
              >
                My Orders
              </Link>
            )}
          </>
        )}
        <Link
          href='/about'
          className='text-foreground hover:text-muted-foreground transition-colors'
          prefetch
        >
          About
        </Link>
        {session ? (
          <button className='hover:cursor-pointer' onClick={() => signOut()}>
            Logout
          </button>
        ) : (
          <>
            <Link
              href='/login'
              className='text-foreground hover:text-muted-foreground transition-colors'
              prefetch
            >
              Login
            </Link>
            <Link
              href='/register'
              className='text-foreground hover:text-muted-foreground transition-colors'
              prefetch
            >
              Register
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
