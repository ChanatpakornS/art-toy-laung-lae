'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { artToyFormSchema, type ArtToyFormData } from '@/types/arttoy.types';

interface ArtToyFormProps {
  defaultValues?: Partial<ArtToyFormData>;
  onSubmit: (data: ArtToyFormData) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function ArtToyForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Submit',
}: ArtToyFormProps) {
  const form = useForm<ArtToyFormData>({
    resolver: zodResolver(artToyFormSchema),
    defaultValues: defaultValues || {
      sku: '',
      name: '',
      description: '',
      arrivalDate: '',
      availableQuota: 0,
      posterPicture: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='sku'
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder='ATT-001' {...field} />
              </FormControl>
              <FormDescription>
                Unique stock keeping unit identifier
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Art Toy Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Describe the art toy...'
                  className='min-h-[100px]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='arrivalDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arrival Date</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormDescription>Must be today or a future date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='availableQuota'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Quota</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min='0'
                  placeholder='0'
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? 0 : parseInt(value, 10));
                  }}
                />
              </FormControl>
              <FormDescription>
                Number of units available for pre-order
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='posterPicture'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poster Picture URL</FormLabel>
              <FormControl>
                <Input
                  type='url'
                  placeholder='https://example.com/image.jpg'
                  {...field}
                />
              </FormControl>
              <FormDescription>URL to the art toy image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end gap-4'>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
