import { ArtToyList } from '@/components/arttoy/arttoy-list';
import { Container } from '@/components/container';

export default async function ArtToysPage() {
  return (
    <Container>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Available Pre-order</h1>
        <p>Check out our collection of unique art toys!</p>
      </div>
      <section>
        <ArtToyList />
      </section>
    </Container>
  );
}
