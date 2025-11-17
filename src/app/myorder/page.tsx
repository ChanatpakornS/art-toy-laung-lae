'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Container } from '@/components/container';
import { OrderCard } from '@/components/order/order-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getOrders } from '@/libs/order';
import { Order } from '@/types/arttoy.types';

export default function MyOrderPage() {
  const { data: _session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load orders';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, router, fetchOrders]);

  const handleOrderUpdate = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)),
    );
  };

  const handleOrderDelete = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((o) => o._id !== orderId));
  };

  if (status === 'loading' || isLoading) {
    return (
      <Container>
        <div className='mb-6'>
          <Skeleton className='h-8 w-48 mb-2' />
          <Skeleton className='h-4 w-96' />
        </div>
        <div className='space-y-4'>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className='h-64 w-full' />
          ))}
        </div>
      </Container>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <Container>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>My Orders</h1>
        <p className='text-muted-foreground'>
          View and manage your art toy pre-orders
        </p>
      </div>

      {error ? (
        <div className='text-center py-12 bg-muted/50 rounded-lg'>
          <p className='text-destructive mb-4'>{error}</p>
          <Button onClick={fetchOrders}>Try Again</Button>
        </div>
      ) : orders.length === 0 ? (
        <div className='text-center py-12 bg-muted/50 rounded-lg'>
          <h2 className='text-xl font-semibold mb-2'>No Orders Yet</h2>
          <p className='text-muted-foreground mb-4'>
            You haven&apos;t placed any pre-orders yet.
          </p>
          <Button onClick={() => router.push('/arttoys')}>
            Browse Art Toys
          </Button>
        </div>
      ) : (
        <>
          <div className='mb-4 p-4 bg-muted/50 rounded-lg'>
            <div className='flex justify-between gap-4 items-center'>
              <div>
                <p className='text-sm text-muted-foreground'>Total Orders</p>
                <p className='text-2xl font-bold'>{orders.length}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Total Items</p>
                <p className='text-2xl font-bold'>
                  {orders.reduce((sum, order) => sum + order.orderAmount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onUpdate={handleOrderUpdate}
                onDelete={handleOrderDelete}
              />
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
