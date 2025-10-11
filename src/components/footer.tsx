import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='bg-background border-t border-border'>
      <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
        <div className='md:flex md:justify-between'>
          <div className='mb-6 md:mb-0'>
            <Link href='https://flowbite.com/' className='flex items-center'>
              <Image
                src='https://flowbite.com/docs/images/logo.svg'
                className='h-8 me-3'
                width={48}
                height={48}
                alt='FlowBite Logo'
              />
              <span className='self-center text-2xl font-semibold text-foreground'>
                Flowbite
              </span>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-foreground uppercase'>
                Resources
              </h2>
              <ul className='text-muted-foreground font-medium'>
                <li className='mb-4'>
                  <Link
                    href='https://flowbite.com/'
                    className='hover:underline'
                  >
                    Mocker
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
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-foreground uppercase'>
                Follow us
              </h2>
              <ul className='text-muted-foreground font-medium'>
                <li className='mb-4'>
                  <Link
                    href='https://github.com/themesberg/flowbite'
                    className='hover:underline '
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://discord.gg/4eeurUVvTy'
                    className='hover:underline'
                  >
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-foreground uppercase'>
                Legal
              </h2>
              <ul className='text-muted-foreground font-medium'>
                <li className='mb-4'>
                  <Link href='#' className='hover:underline'>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className='my-6 border-border sm:mx-auto lg:my-8' />
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm text-muted-foreground sm:text-center'>
            © 2023{' '}
            <Link href='https://flowbite.com/' className='hover:underline'>
              Flowbite™
            </Link>
            . All Rights Reserved.
          </span>
          <div className='flex mt-4 sm:justify-center sm:mt-0'>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground'
            >
              <Icon icon='simple-icons:facebook' className='w-4 h-4' />
              <span className='sr-only'>Facebook page</span>
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground ms-5'
            >
              <Icon icon='simple-icons:discord' className='w-4 h-4' />
              <span className='sr-only'>Discord community</span>
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground ms-5'
            >
              <Icon icon='simple-icons:x' className='w-4 h-4' />
              <span className='sr-only'>X page</span>
            </Link>
            <Link
              href='#'
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
