'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Container } from '@/components/container';
import { OrderCard } from '@/components/order/order-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getOrders } from '@/libs/order';
import { Order, OrderUser } from '@/types/arttoy.types';

export default function AdminOrdersPage() {
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
    fetchOrders();
  }, [fetchOrders]);

  const handleOrderUpdate = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)),
    );
  };

  const handleOrderDelete = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((o) => o._id !== orderId));
  };

  if (isLoading) {
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

  const groupedOrders = orders.reduce((acc: Record<string, Order[]>, o) => {
    const userObj = typeof o.user === 'string' ? null : (o.user as OrderUser);
    let key = o.user as string;
    if (userObj) {
      key = userObj._id || userObj.email || userObj.name;
    }
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(o);
    return acc;
  }, {});

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
          <p className='text-muted-foreground mb-4'>
            No new orders at this time.
          </p>
        </div>
      ) : (
        <div className='space-y-6'>
          {Object.entries(groupedOrders).map(([userKey, userOrders]) => {
            if (userOrders.length === 0) {
              return null;
            }
            const first = userOrders[0];
            const firstUser =
              typeof first.user === 'string' ? null : (first.user as OrderUser);
            const userLabel = firstUser
              ? `${firstUser.name} (${firstUser.email})`
              : (first.user as string);
            return (
              <div key={userKey} className='space-y-3'>
                <div className='p-4 bg-muted/50 rounded-md'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>User</p>
                      <p className='font-semibold'>{userLabel}</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm text-muted-foreground'>
                        Total Orders
                      </p>
                      <p className='font-bold'>{userOrders.length}</p>
                    </div>
                  </div>
                </div>
                <div className='space-y-4'>
                  {userOrders.map((order) => (
                    <OrderCard
                      key={order._id}
                      order={order}
                      onUpdate={handleOrderUpdate}
                      onDelete={handleOrderDelete}
                      isAdmin
                      showUser
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
