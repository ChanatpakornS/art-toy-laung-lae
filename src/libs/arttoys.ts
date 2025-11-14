import { getSession } from 'next-auth/react';

import { Arttoy } from '@/types/arttoy.types';

export async function getArtToys(): Promise<Arttoy[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/arttoys`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch art toys');
  }

  const data = await response.json();
  return data.data || [];
}

export async function submitOrder({
  artToy,
  orderAmount,
}: {
  artToy: string;
  orderAmount: number;
}): Promise<void> {
  const session = await getSession();

  if (!session?.user?.token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.token}`,
      },
      body: JSON.stringify({
        artToy,
        orderAmount,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to submit order');
  }
}
