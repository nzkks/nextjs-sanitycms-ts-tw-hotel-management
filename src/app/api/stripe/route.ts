import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { authOptions } from '@/libs/auth';
import { getRoom } from '@/libs/apis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};

export async function POST(req: Request, res: Response) {
  const {
    checkinDate,
    checkoutDate,
    adults,
    children,
    numberOfDays,
    hotelRoomSlug,
  }: RequestData = await req.json();

  if (
    !checkinDate ||
    !checkoutDate ||
    !adults ||
    !numberOfDays ||
    !hotelRoomSlug
  ) {
    return new NextResponse('All the fields are required', { status: 400 });
  }

  const origin = req.headers.get('origin');
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication required', { status: 401 });
  }

  const userId = session.user.id;
  const formattedCheckinDate = checkinDate.split('T')[0];
  const formattedCheckoutDate = checkoutDate.split('T')[0];

  try {
    const room = await getRoom(hotelRoomSlug);
    const discountPrice = room.price - (room.price * room.discount) / 100;
    const totalPrice = discountPrice * numberOfDays;

    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: room.name,
              images: room.images.map((image) => image.url),
            },
            unit_amount: parseInt((totalPrice * 100).toString()),
          },
        },
      ],
      payment_method_types: ['card'],
      success_url: `${origin}/users/${userId}`,
      metadata: {
        checkinDate: formattedCheckinDate,
        checkoutDate: formattedCheckoutDate,
        adults,
        children,
        numberOfDays,
        hotelRoom: room._id,
        user: userId,
        discount: room.discount,
        totalPrice,
      },
    });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: 'Payment session created',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
}
