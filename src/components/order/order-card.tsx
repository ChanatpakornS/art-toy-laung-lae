'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { deleteOrder, updateOrder } from '@/libs/arttoys';
import { Order, OrderArtToy } from '@/types/arttoy.types';
import { formatISOToShort } from '@/utils/date';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Label } from '../ui/label';

interface OrderCardProps {
  order: Order;
  onUpdate: () => void;
  showUser?: boolean;
}

export function OrderCard({ order, onUpdate, showUser }: OrderCardProps) {
  const [amount, setAmount] = useState(order.orderAmount);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const artToy = order.artToy as OrderArtToy;
  const orderUser = order.user as { name?: string; email?: string } | string;
  const hasChanges = amount !== order.orderAmount;

  const handleIncrement = () => {
    if (amount < 5) {
      setAmount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      await updateOrder({
        id: order._id,
        orderAmount: amount,
      });
      toast.success('Order updated successfully!');
      onUpdate();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update order',
      );
      // Reset amount on error
      setAmount(order.orderAmount);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteOrder(order._id);
      toast.success('Order deleted successfully!');
      onUpdate();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete order',
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReset = () => {
    setAmount(order.orderAmount);
  };

  return (
    <Card className='w-full overflow-hidden'>
      <CardHeader className='pb-4'>
        <div className='flex justify-between items-start'>
          <div>
            <h3 className='text-lg font-semibold'>{artToy.name}</h3>
            <p className='text-sm text-muted-foreground'>SKU: {artToy.sku}</p>
            {showUser && (
              <p className='text-sm text-muted-foreground mt-1'>
                Ordered by:{' '}
                <span className='font-medium'>
                  {typeof orderUser === 'string'
                    ? orderUser
                    : `${orderUser?.name || 'Unknown'} (${orderUser?.email || ''})`}
                </span>
              </p>
            )}
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant='destructive'
                size='icon'
                disabled={isDeleting || isUpdating}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Order</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this order for &quot;
                  {artToy.name}&quot;? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='col-span-1 md:col-span-2 space-y-4'>
            <div>
              <Label className='text-sm font-semibold'>Description</Label>
              <p className='text-sm text-muted-foreground mt-1'>
                {artToy.description}
              </p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label className='text-sm font-semibold'>Arrival Date</Label>
                <p className='text-sm mt-1'>
                  {formatISOToShort(artToy.arrivalDate)}
                </p>
              </div>
              <div>
                <Label className='text-sm font-semibold'>Available Quota</Label>
                <p className='text-sm mt-1'>{artToy.availableQuota}</p>
              </div>
            </div>
            <div>
              <Label className='text-sm font-semibold'>Order Date</Label>
              <p className='text-sm mt-1'>
                {formatISOToShort(order.createdAt)}
              </p>
            </div>
          </div>
          <div className='flex justify-end md:justify-start'>
            <div className='col-auto'>
              <Label className='text-sm font-semibold'>Order Quantity</Label>
              <div className='flex items-center gap-3 mt-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={handleDecrement}
                  disabled={amount <= 1 || isUpdating}
                  className='h-9 w-9'
                >
                  <Minus className='h-4 w-4' />
                </Button>
                <div className='w-16 text-center'>
                  <span className='text-xl font-bold'>{amount}</span>
                </div>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={handleIncrement}
                  disabled={amount >= 5 || isUpdating}
                  className='h-9 w-9'
                >
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
              <p className='text-xs text-muted-foreground mt-2'>
                Maximum 5 items per art toy
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      {hasChanges && (
        <CardFooter className='flex gap-2 justify-end'>
          <Button variant='outline' onClick={handleReset} disabled={isUpdating}>
            Reset
          </Button>
          <Button onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update Order'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
