'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { ArtToyCard } from '@/components/arttoy/arttoy-card';
import { Container } from '@/components/container';
import { Skeleton } from '@/components/ui/skeleton';
import { getArtToys } from '@/libs/arttoy';
import { Arttoy } from '@/types/arttoy.types';

export function ArtToyList() {
  const { data: _session, status } = useSession();
  const [artToys, setArtToys] = useState<Arttoy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArtToys = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getArtToys();
      setArtToys(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load orders';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtToys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'loading' || isLoading) {
    return (
      <Container>
        <div className='mb-6'>
          <Skeleton className='h-8 w-48 mb-2' />
          <Skeleton className='h-4 w-96' />
        </div>
      </Container>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {artToys.map((artToy) => (
        <ArtToyCard key={artToy._id} {...artToy} />
      ))}
    </div>
  );
}
