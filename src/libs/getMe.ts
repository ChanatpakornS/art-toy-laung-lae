import type { GetMeResponse } from '@/types/auth.types';

export default async function getMe(token: string): Promise<GetMeResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth/me`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to get user information');
  }

  return await response.json();
}
