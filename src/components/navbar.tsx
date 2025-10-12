import Link from 'next/link';

import { ThemeToggle } from '@/components/theme/theme-toggle';

export function Navbar() {
  return (
    <nav className='flex justify-end items-center p-4'>
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
        <Link
          href='/about'
          className='text-foreground hover:text-muted-foreground transition-colors'
          prefetch
        >
          About
        </Link>
        <Link
          href='/login'
          className='text-foreground hover:text-muted-foreground transition-colors'
          prefetch
        >
          Login
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
