import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { checkReviewExists, createReview, getUserDetails } from '@/libs/apis';
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

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response('Authentication required', { status: 500 });
  }

  const userId = session.user.id;

  const { roomId, reviewText, ratingValue } = await req.json();

  if (!roomId || !reviewText || !ratingValue) {
    return new Response('All fields are required', { status: 400 });
  }

  try {
    const alreadyExists = await checkReviewExists(userId, roomId);

    let data;
    if (alreadyExists) {
      // update review
    } else {
      data = await createReview({
        userId,
        hotelRoomId: roomId,
        reviewText,
        userRating: ratingValue,
      });
    }

    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error: any) {
    console.error('Error updating review', error);
    return new NextResponse('Unable to create review', { status: 400 });
  }
}
