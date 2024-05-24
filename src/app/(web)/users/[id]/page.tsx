'use client';

import useSWR from 'swr';

import { getUserBookings } from '@/libs/apis';
import LoadingSpinner from '../../loading';

const UserDetails = (props: { params: { id: string } }) => {
  const {
    params: { id: userId },
  } = props;

  const fetchUserBooking = async () => getUserBookings(userId);

  const {
    data: userBookings,
    error: userBookingsError,
    isLoading: IsUserBookingsLoading,
  } = useSWR('/api/userBookings', fetchUserBooking);

  if (userBookingsError) throw new Error('Cannot fetch data');

  if (typeof userBookings === 'undefined' && !IsUserBookingsLoading)
    throw new Error('Cannot fetch user bookings data');

  if (!userBookings) return <LoadingSpinner />;

  console.log({ userBookings });

  return <div>UserDetails</div>;
};

export default UserDetails;
