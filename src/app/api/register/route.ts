import { NextRequest, NextResponse } from 'next/server';

import register from '@/libs/register';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, tel, role, password, createdAt } = body;
    const data = await register({
      name,
      email,
      tel,
      role,
      password,
      createdAt,
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
