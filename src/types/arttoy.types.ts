import { z } from 'zod';

export interface Arttoy {
  _id: string;
  sku: string;
  name: string;
  description: string;
  arrivalDate: string;
  availableQuota: number;
  posterPicture: string;
  createdAt: string;
  updatedAt: string;
}

// Validation schema for creating/updating art toys
export const artToyFormSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  arrivalDate: z.string().refine(
    (date) => {
      const arrivalDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return arrivalDate >= today;
    },
    {
      message: 'Arrival date must not be earlier than today',
    },
  ),
  availableQuota: z
    .number()
    .min(0, 'Available quota must be at least 0')
    .int('Available quota must be an integer'),
  posterPicture: z.string().url('Must be a valid URL'),
});

export type ArtToyFormData = z.infer<typeof artToyFormSchema>;

// API response types
export interface ArtToyResponse {
  success: boolean;
  data: Arttoy;
}

export interface ArtToysResponse {
  success: boolean;
  count: number;
  data: Arttoy[];
}

export interface DeleteArtToyResponse {
  success: boolean;
  message: string;
}
