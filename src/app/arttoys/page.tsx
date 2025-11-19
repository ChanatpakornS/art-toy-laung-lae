import { ArtToyList } from '@/components/arttoy/arttoy-list';
import { Container } from '@/components/container';
import { Arttoy } from '@/types/arttoy.types';

export default async function ArtToysPage() {
  const artToys: Arttoy[] = [];
  const error: string | null = null;

  return (
    <Container>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Available Pre-order</h1>
        <p>Check out our collection of unique art toys!</p>
      </div>
      <section>
        {error ? (
          <div className='text-center py-12'>
            <p className='text-destructive'>{error}</p>
            <p className='text-muted-foreground mt-2'>
              Please try again later or contact support.
            </p>
          </div>
        ) : artToys.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-muted-foreground'>
              No art toys available at the moment.
            </p>
          </div>
        ) : (
          <ArtToyList />
        )}
      </section>
    </Container>
  );
}
