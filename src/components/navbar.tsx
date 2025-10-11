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
          href='/services'
          className='text-foreground hover:text-muted-foreground transition-colors'
        >
          Services
        </Link>
        <Link
          href='/about'
          className='text-foreground hover:text-muted-foreground transition-colors'
          prefetch
        >
          About
        </Link>
        <Link
          href='/contact'
          className='text-foreground hover:text-muted-foreground transition-colors'
          prefetch
        >
          Contact
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
