import { ArtToyCard } from '@/components/arttoy/arttoy-card';
import { Container } from '@/components/container';
import { getArtToys } from '@/libs/arttoys';
import { Arttoy } from '@/types/arttoy.types';

export default async function ArtToysPage() {
  let artToys: Arttoy[] = [];
  let error: string | null = null;

  try {
    artToys = await getArtToys();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load art toys';
  }

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
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {artToys.map((artToy) => (
              <ArtToyCard key={artToy._id} {...artToy} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}
