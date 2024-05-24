import { createBooking, updateHotelRoom } from '@/libs/apis';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const checkout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get('Stripe-Signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;

    event = stripe.webhooks.constructEvent(
      reqBody,
      sig as string,
      webhookSecret,
    );
  } catch (error: any) {
    console.log(`⚠️  Webhook signature verification failed: ${error}`); // for demo purposes only
    return new NextResponse(`Webhook Error`, { status: 500 });
  }

  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;

      const {
        // @ts-ignore
        metadata: {
          user,
          hotelRoom,
          checkinDate,
          checkoutDate,
          numberOfDays,
          adults,
          children,
          totalPrice,
          discount,
        },
      } = session;

      await createBooking({
        user,
        hotelRoom,
        checkinDate,
        checkoutDate,
        numberOfDays: Number(numberOfDays),
        adults: Number(adults),
        children: Number(children),
        totalPrice: Number(totalPrice),
        discount: Number(discount),
      });

      await updateHotelRoom(hotelRoom);

      return NextResponse.json('Booking successful', {
        status: 200,
        statusText: 'Booking successful',
      });

    default:
      console.log('Unhandled event type: ', event.type);
  }

  return NextResponse.json('Event Received', {
    status: 200,
    statusText: 'Event Received',
  });
}
