import Image from 'next/image';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='w-full pt-0 overflow-hidden hover:scale-105 duration-300'>
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
            <div>
              <h3 className='text-lg font-semibold'>{props.name}</h3>
              <p className='text-sm text-muted-foreground'>
                {props.description}
              </p>
            </div>
            <div className='flex justify-end w-full'>
              <p className='text-end'>
                Avaliable:{' '}
                <span className='font-black'>{props.availableQuota}</span>
              </p>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className='min-w-2xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>{props.name}</DialogTitle>
        </DialogHeader>
        <div className='grid grid-cols-2 gap-8'>
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
            </ul>
            <div>
              <Button className='w-full'>Pre-Order Now</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
