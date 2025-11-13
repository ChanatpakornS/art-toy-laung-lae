import { ArtToyCard } from '@/components/arttoy/arttoy-card';
import { Container } from '@/components/container';
import { getArtToys } from '@/libs/arttoy';
import type { Arttoy } from '@/types/arttoy.types';

export default async function ArtToysPage() {
  let artToys: Arttoy[] = [];
  let error: string | null = null;

  try {
    const response = await getArtToys();
    artToys = response.data || [];
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load art toys';
  }

  return (
    <Container>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Available Pre-order</h1>
        <p>Check out our collection of unique art toys!</p>
      </div>
      <section>
        {error && (
          <div className='text-red-500 p-4 rounded-md bg-red-50 mb-4'>
            {error}
          </div>
        )}
        {artToys.length === 0 && !error && (
          <div className='text-gray-500 text-center py-8'>
            No art toys available at the moment.
          </div>
        )}
        {artToys.length > 0 && (
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
