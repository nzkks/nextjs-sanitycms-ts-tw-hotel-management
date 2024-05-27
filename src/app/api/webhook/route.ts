import { createBooking, updateHotelRoom } from '@/libs/apis';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const checkout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
  typescript: true,
});

export async function POST(req: Request) {
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
    return new NextResponse(`Webhook Error`, { status: 500 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const user = session?.metadata?.user;
  const hotelRoom = session?.metadata?.hotelRoom;
  const checkinDate = session?.metadata?.checkinDate;
  const checkoutDate = session?.metadata?.checkoutDate;
  const numberOfDays = session?.metadata?.numberOfDays;
  const adults = session?.metadata?.adults;
  const children = session?.metadata?.children;
  const totalPrice = session?.metadata?.totalPrice;
  const discount = session?.metadata?.discount;

  switch (event.type) {
    case checkout_session_completed:
      if (!user || !hotelRoom || !checkinDate || !checkoutDate) {
        return new NextResponse('Webhook error: Missing metadata', {
          status: 400,
          statusText: 'Booking Unsuccessful',
        });
      }
      await createBooking({
        user,
        hotelRoom,
        checkinDate: new Date(checkinDate),
        checkoutDate: new Date(checkoutDate),
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
      NextResponse.json('Booking Unsuccessful', {
        status: 400,
        statusText: event.type,
      });
  }

  return NextResponse.json('Event Received', {
    status: 200,
    statusText: 'Event Received',
  });
}
