interface RegisterProps {
  name: string;
  email: string;
  tel: string;
  role: string;
  password: string;
  createdAt: string;
}

export default async function register({
  name,
  email,
  tel,
  role,
  password,
  createdAt,
}: RegisterProps) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/v1/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        tel,
        role,
        password,
        createdAt,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Registration failed');
  }

  return await response.json();
}
