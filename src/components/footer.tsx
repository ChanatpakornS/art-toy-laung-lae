import { Icon } from '@iconify/react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='bg-background border-t border-border'>
      <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
        <div className='md:flex md:justify-between'>
          <div className='mb-6 md:mb-0'>
            <Link href='https://flowbite.com/' className='flex items-center'>
              <span className='self-center text-2xl font-semibold text-foreground'>
                ArtToyPreOrder
              </span>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-foreground uppercase'>
                Resources
              </h2>
              <ul className='text-muted-foreground font-medium space-y-4'>
                <li>
                  <Link href='https://nextjs.org/' className='hover:underline'>
                    NextJS
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://tailwindcss.com/'
                    className='hover:underline'
                  >
                    Tailwind CSS
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://ui.shadcn.com/'
                    className='hover:underline'
                  >
                    ShadCN UI
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-foreground uppercase'>
                Follow us
              </h2>
              <ul className='text-muted-foreground font-medium'>
                <li className='mb-4'>
                  <Link
                    href='https://github.com/ChanatpakornS/art-toy-laung-lae'
                    className='hover:underline '
                  >
                    Github
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-foreground uppercase'>
                Information
              </h2>
              <ul className='text-muted-foreground font-medium'>
                <li className='mb-4'>
                  <Link href='/about' className='hover:underline'>
                    About us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className='my-6 border-border sm:mx-auto lg:my-8' />
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm text-muted-foreground sm:text-center'>
            © 2025{' '}
            <Link href='https://flowbite.com/' className='hover:underline'>
              ArtToyPreOrder™
            </Link>
            . All Rights Reserved.
          </span>
          <div className='flex mt-4 sm:justify-center sm:mt-0'>
            <Link
              href='https://github.com/ChanatpakornS/art-toy-laung-lae'
              className='text-muted-foreground hover:text-foreground ms-5'
            >
              <Icon icon='simple-icons:github' className='w-4 h-4' />
              <span className='sr-only'>GitHub account</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
