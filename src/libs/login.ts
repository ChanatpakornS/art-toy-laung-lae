import type { LoginRequest, LoginResponse } from '@/types/auth.types';

export default async function login({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  );

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
}
