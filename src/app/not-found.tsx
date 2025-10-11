import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
      <h1 className='text-6xl font-bold text-foreground mb-4'>404</h1>
      <h2 className='text-2xl md:text-3xl font-semibold text-muted-foreground mb-6'>
        Page Not Found
      </h2>
      <p className='text-lg text-muted-foreground mb-8 max-w-xl'>
        The page you are looking for does not exist. It might have been moved or
        deleted.
      </p>
      <Link className='underline' href='/'>
        Back to Home
      </Link>
    </div>
  );
}
