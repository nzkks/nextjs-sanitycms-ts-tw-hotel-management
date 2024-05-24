import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { getUserDetails } from '@/libs/apis';
import { authOptions } from '@/libs/auth';

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Authentication required', { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserDetails(userId);
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    return new Response('Unable to fetch data', { status: 400 });
  }
}
