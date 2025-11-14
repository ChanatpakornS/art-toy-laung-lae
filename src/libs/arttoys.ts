import { getSession } from 'next-auth/react';

import { Arttoy, Order } from '@/types/arttoy.types';

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

export async function getOrders(): Promise<Order[]> {
  const session = await getSession();

  if (!session?.user?.token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/orders`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.token}`,
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  const data = await response.json();
  return data.data || [];
}

export async function getOrderById(id: string): Promise<Order> {
  const session = await getSession();

  if (!session?.user?.token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/orders/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.token}`,
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch order');
  }

  const data = await response.json();
  return data.data;
}

export async function updateOrder({
  id,
  orderAmount,
}: {
  id: string;
  orderAmount: number;
}): Promise<Order> {
  const session = await getSession();

  if (!session?.user?.token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/orders/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.token}`,
      },
      body: JSON.stringify({ orderAmount }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update order');
  }

  const data = await response.json();
  return data.data;
}

export async function deleteOrder(id: string): Promise<void> {
  const session = await getSession();

  if (!session?.user?.token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/orders/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.token}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete order');
  }
}
