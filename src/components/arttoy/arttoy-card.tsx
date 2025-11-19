'use client';

import { Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { submitOrder } from '@/libs/order';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToOrder } from '@/store/slices/orderSlice';
import { Arttoy } from '@/types/arttoy.types';
import { formatISOToShort } from '@/utils/date';

import { AspectRatio } from '../ui/aspect-ratio';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';

export function ArtToyCard(props: Arttoy) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.order);
  const [amount, setAmount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isInOrder = items.some(
    (item: { artToyId: string }) => item.artToyId === props._id,
  );

  const handleIncrement = () => {
    if (props.availableQuota < amount + 1) {
      toast.error('Cannot order more than available quota');
      return;
    }
    setAmount((prev) => Math.min(prev + 1, 5));
  };

  const handleDecrement = () => {
    setAmount((prev) => Math.max(prev - 1, 1));
  };

  const handlePreOrder = async () => {
    if (!session) {
      toast.error('Please login to pre-order');
      return;
    }

    if (isInOrder) {
      toast.info('You already have an order for this art toy');
      return;
    }

    try {
      setIsSubmitting(true);

      // Call the API to submit the order
      await submitOrder({
        artToy: props._id,
        orderAmount: amount,
      });

      // Add to local state for UI updates
      dispatch(addToOrder({ artToy: props, amount }));

      toast.success(`Pre-order submitted successfully! Quantity: ${amount}`);
      setDialogOpen(false);
      setAmount(1); // Reset amount
    } catch {
      toast.error('Failed to submit pre-order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Card className='w-full pt-0 overflow-hidden hover:scale-105 duration-300 cursor-pointer'>
          <CardContent className='p-0 w-full'>
            <Image
              src={props.posterPicture}
              alt={props.name}
              width={400}
              height={400}
              className='w-full h-48 object-cover'
            />
          </CardContent>
          <CardFooter className='flex-col gap-2'>
            <div className='flex flex-col w-full'>
              <h3 className='text-lg text-start font-semibold'>{props.name}</h3>
              <p className='text-sm text-muted-foreground'>
                {props.description}
              </p>
            </div>
            <div className='flex justify-end w-full'>
              <p className='text-end'>
                Available:{' '}
                <span className='font-black'>{props.availableQuota}</span>
              </p>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className='w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>{props.name}</DialogTitle>
        </DialogHeader>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='col-span-1'>
            <AspectRatio
              ratio={9 / 16}
              className='rounded-lg overflow-hidden min-h-96 relative'
            >
              <Image
                src={props.posterPicture}
                alt={props.name}
                fill
                className='object-cover'
              />
            </AspectRatio>
          </div>
          <div className='col-span-1 flex justify-between flex-col'>
            <ul className='mb-4 space-y-4'>
              <li>
                <Label className='text-lg font-semibold mb-2'>
                  Description
                </Label>
                <div className='p-4 items-center bg-muted-foreground/10 rounded-lg border'>
                  <p>{props.description}</p>
                </div>
              </li>
              <li>
                <Label className='text-lg font-semibold mb-2'>
                  Arrival Date
                </Label>
                <p>{formatISOToShort(props.arrivalDate)}</p>
              </li>
              <li>
                <Label className='text-lg font-semibold mb-2'>Available</Label>
                <p>{props.availableQuota}</p>
              </li>
              <li>
                <Label className='text-lg font-semibold mb-2'>Quantity</Label>
                <div className='flex items-center gap-3 mt-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={handleDecrement}
                    disabled={amount <= 1 || isInOrder}
                    className='h-9 w-9'
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <div className='w-16 text-center'>
                    <span className='text-2xl font-bold'>{amount}</span>
                  </div>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={handleIncrement}
                    disabled={amount >= 5 || isInOrder}
                    className='h-9 w-9'
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
                <p className='text-sm text-muted-foreground mt-2'>
                  Maximum 5 items per art toy
                </p>
              </li>
            </ul>
            <div>
              <Button
                className='w-full'
                onClick={handlePreOrder}
                disabled={isInOrder || isSubmitting}
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : isInOrder ? (
                  'Already Ordered'
                ) : (
                  <>
                    <ShoppingCart className='mr-2 h-4 w-4' />
                    Pre-Order Now ({amount} {amount === 1 ? 'item' : 'items'})
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
