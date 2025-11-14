'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { ThemeToggle } from '@/components/theme/theme-toggle';

export function Navbar() {
  const { data: session } = useSession();

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
