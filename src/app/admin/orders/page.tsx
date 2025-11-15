'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Container } from '@/components/container';
import { OrderCard } from '@/components/order/order-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getOrders } from '@/libs/arttoys';
import getMe from '@/libs/getMe';
import { Order } from '@/types/arttoy.types';

export default function AdminOrdersPage() {
  const { data: _session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // getOrders will use the current session token to fetch orders from backend
      // Backend should return all orders for admin users
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
  };

  useEffect(() => {
    const init = async () => {
      if (status === 'unauthenticated') {
        router.push('/login');
        return;
      }

      if (status === 'authenticated') {
        // verify role
        try {
          // session token is available at _session?.user?.token
          // If session not present, fetchOrders will fail anyway
          // but we proactively check role to restrict access
          // @ts-ignore - session shape from next-auth
          const token = (_session as any)?.user?.token as string | undefined;
          if (!token) {
            router.push('/');
            return;
          }

          const me = await getMe(token);
          if (!me?.data || me.data.role !== 'admin') {
            // Not an admin
            router.push('/');
            return;
          }

          await fetchOrders();
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : 'Failed to validate user';
          setError(errorMessage);
          setIsLoading(false);
        }
      }
    };

    init();
  }, [status, router, _session]);

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
        <h1 className='text-3xl font-bold mb-2'>All Orders</h1>
        <p className='text-muted-foreground'>
          View and manage orders placed by any user (admin only)
        </p>
      </div>

      {error ? (
        <div className='text-center py-12 bg-muted/50 rounded-lg'>
          <p className='text-destructive mb-4'>{error}</p>
          <Button onClick={fetchOrders}>Try Again</Button>
        </div>
      ) : orders.length === 0 ? (
        <div className='text-center py-12 bg-muted/50 rounded-lg'>
          <h2 className='text-xl font-semibold mb-2'>No Orders</h2>
          <p className='text-muted-foreground mb-4'>No orders found.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {orders.map((order) => (
            <div key={order._id}>
              <div className='mb-2'>
                <p className='text-sm text-muted-foreground'>
                  Ordered by:{' '}
                  <span className='font-semibold'>
                    {typeof order.user === 'string'
                      ? order.user
                      : `${order.user.name} (${order.user.email})`}
                  </span>
                </p>
              </div>
              <OrderCard order={order} onUpdate={fetchOrders} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
