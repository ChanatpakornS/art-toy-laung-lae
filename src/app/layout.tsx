import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@/styles/globals.css';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import NextAuthProvider from '@/providers/NextAuthProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Art Toy Pre-Order',
  description:
    'Streamline your art toy pre-orders with our intuitive and efficient system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ReactQueryProvider>
            <NextAuthProvider>
              <div className='min-h-screen'>
                <Navbar />
                <main>{children}</main>
                <Toaster />
              </div>
              <Footer />
            </NextAuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
