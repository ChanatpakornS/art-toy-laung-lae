import { ArtToyCard } from '@/components/arttoy/arttoy-card';
import { Container } from '@/components/container';

const mockData = {
  id: '1',
  sku: 'ATL-001',
  name: 'Art Toy Laung Lae',
  description:
    'A unique art toy that combines traditional Thai elements with modern design.',
  arrivalDate: '2024-12-01',
  availableQuota: 100,
  posterPicture: '/images/sample.png',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-06-01T00:00:00Z',
};

export default function ArtToysPage() {
  return (
    <Container>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Available Pre-order</h1>
        <p>Check out our collection of unique art toys!</p>
      </div>
      <section>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <ArtToyCard {...mockData} />
          <ArtToyCard {...mockData} />
          <ArtToyCard {...mockData} />
          <ArtToyCard {...mockData} />
        </div>
      </section>
    </Container>
  );
}
