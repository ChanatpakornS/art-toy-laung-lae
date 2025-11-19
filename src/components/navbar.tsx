'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import getMe from '@/libs/getMe';
import type { User } from '@/types/auth.types';

function NavLinks({
  user,
  onLinkClick,
}: {
  user: User | null;
  onLinkClick?: () => void;
}) {
  const { data: session } = useSession();

  const handleSignOut = () => {
    if (onLinkClick) {
      onLinkClick();
    }
    signOut();
  };

  const linkClass =
    'text-lg font-medium text-foreground hover:text-muted-foreground transition-colors';

  return (
    <>
      <Link href='/' className={linkClass} onClick={onLinkClick}>
        Home
      </Link>
      {user?.role === 'admin' ? (
        <>
          <Link
            href='/admin/arttoy-management'
            className={linkClass}
            onClick={onLinkClick}
          >
            Arttoy Management
          </Link>
          <Link
            href='/admin/orders'
            className={linkClass}
            onClick={onLinkClick}
          >
            Orders
          </Link>
        </>
      ) : (
        <>
          <Link href='/arttoys' className={linkClass} onClick={onLinkClick}>
            Arttoys
          </Link>
          {session && (
            <Link href='/myorder' className={linkClass} onClick={onLinkClick}>
              My Orders
            </Link>
          )}
        </>
      )}
      <Link href='/about' className={linkClass} prefetch onClick={onLinkClick}>
        About
      </Link>
      {session ? (
        <button
          className='text-lg font-medium hover:cursor-pointer'
          onClick={handleSignOut}
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            href='/login'
            className={linkClass}
            prefetch
            onClick={onLinkClick}
          >
            Login
          </Link>
          <Link
            href='/register'
            className={linkClass}
            prefetch
            onClick={onLinkClick}
          >
            Register
          </Link>
        </>
      )}
    </>
  );
}

export function Navbar() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (session) {
      const fetchUser = async () => {
        const userData = await getMe(session.user.token);
        setUser(userData.data);
      };

      fetchUser();
    } else {
      setUser(null);
    }
  }, [session]);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <nav className='flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-background z-50'>
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
      {isMobile ? (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon'>
              <Menu className='h-6 w-6' />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className='flex flex-col items-center justify-center h-full space-y-8'>
              <NavLinks user={user} onLinkClick={closeSheet} />
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div className='flex space-x-8 items-center'>
          <NavLinks user={user} />
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
