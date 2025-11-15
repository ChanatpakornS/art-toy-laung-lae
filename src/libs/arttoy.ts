import type {
  ArtToyFormData,
  ArtToyResponse,
  ArtToysResponse,
  DeleteArtToyResponse,
} from '@/types/arttoy.types';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

if (!API_URL) {
  throw new Error(
    'NEXT_PUBLIC_BACKEND_API_URL is not defined. Please check your .env file.',
  );
}

/**
 * Get all art toys
 */
export async function getArtToys(): Promise<ArtToysResponse> {
  const response = await fetch(`${API_URL}/api/v1/arttoys`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch art toys');
  }

  return await response.json();
}

/**
 * Get a single art toy by ID
 */
export async function getArtToy(id: string): Promise<ArtToyResponse> {
  const response = await fetch(`${API_URL}/api/v1/arttoys/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch art toy');
  }

  return await response.json();
}

/**
 * Create a new art toy (admin only)
 */
export async function createArtToy(
  data: ArtToyFormData,
  token: string,
): Promise<ArtToyResponse> {
  const response = await fetch(`${API_URL}/api/v1/arttoys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create art toy');
  }

  return await response.json();
}

/**
 * Update an existing art toy (admin only)
 */
export async function updateArtToy(
  id: string,
  data: ArtToyFormData,
  token: string,
): Promise<ArtToyResponse> {
  const response = await fetch(`${API_URL}/api/v1/arttoys/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update art toy');
  }

  return await response.json();
}

/**
 * Delete an art toy (admin only)
 */
export async function deleteArtToy(
  id: string,
  token: string,
): Promise<DeleteArtToyResponse> {
  const response = await fetch(`${API_URL}/api/v1/arttoys/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete art toy');
  }

  return await response.json();
}
