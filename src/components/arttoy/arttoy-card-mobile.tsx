'use client';

import { Edit, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Arttoy } from '@/types/arttoy.types';
import { formatISOToShort } from '@/utils/date';

interface ArtToyCardMobileProps {
  artToy: Arttoy;
  onEdit: (artToy: Arttoy) => void;
  onDelete: (artToy: Arttoy) => void;
}

export function ArtToyCardMobile({
  artToy,
  onEdit,
  onDelete,
}: ArtToyCardMobileProps) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{artToy.name}</CardTitle>
        <p className='text-sm text-muted-foreground'>SKU: {artToy.sku}</p>
      </CardHeader>
      <CardContent className='space-y-2'>
        <p className='text-sm'>
          <span className='font-semibold'>Description:</span>{' '}
          {artToy.description}
        </p>
        <p className='text-sm'>
          <span className='font-semibold'>Arrival Date:</span>{' '}
          {formatISOToShort(artToy.arrivalDate)}
        </p>
        <p className='text-sm'>
          <span className='font-semibold'>Available Quota:</span>{' '}
          {artToy.availableQuota}
        </p>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Button variant='outline' size='icon' onClick={() => onEdit(artToy)}>
          <Edit className='h-4 w-4' />
        </Button>
        <Button
          variant='destructive'
          size='icon'
          onClick={() => onDelete(artToy)}
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </CardFooter>
    </Card>
  );
}
