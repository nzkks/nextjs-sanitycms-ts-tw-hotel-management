import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { Booking } from '@/models/booking';

type Props = {
  bookingDetails: Booking[];
};

const BookingsTable: FC<Props> = ({ bookingDetails }) => {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-[340px] overflow-x-auto rounded-lg shadow-md sm:rounded-lg md:max-w-full">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">Room name</th>
            <th className="px-6 py-3">Unit Price</th>
            <th className="px-6 py-3">No. Days Booked</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Discount</th>
            <th className="px-6 py-3">Days Left</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails.map((booking) => (
            <tr
              key={booking._id}
              className="border-b bg-white hover:bg-gray-50"
            >
              <th
                onClick={() =>
                  router.push(`/rooms/${booking.hotelRoom.slug.current}`)
                }
                className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium text-blue-600 underline"
              >
                {booking.hotelRoom.name}
              </th>
              <td className="px-6 py-4">{booking.hotelRoom.price}</td>
              <td className="px-6 py-4">{booking.numberOfDays}</td>
              <td className="px-6 py-4">{booking.totalPrice}</td>
              <td className="px-6 py-4">{booking.discount}</td>
              <td className="px-6 py-4">0</td>
              <td className="px-6 py-4">Rate button</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
