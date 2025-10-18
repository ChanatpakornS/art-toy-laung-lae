interface LoginProps {
  email: string;
  password: string;
}

export default async function login({ email, password }: LoginProps) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/v1/auth/login`,
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
