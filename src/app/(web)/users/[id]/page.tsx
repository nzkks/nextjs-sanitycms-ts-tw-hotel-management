'use client';

import axios from 'axios';
import useSWR from 'swr';

import { getUserBookings } from '@/libs/apis';
import LoadingSpinner from '../../loading';
import { User } from '@/models/user';

const UserDetails = (props: { params: { id: string } }) => {
  const {
    params: { id: userId },
  } = props;

  const fetchUserBooking = async () => getUserBookings(userId);

  const fetchUserDetails = async () => {
    const { data } = await axios.get<User>('/api/users');
    return data;
  };

  const {
    data: userBookings,
    error: userBookingsError,
    isLoading: IsUserBookingsLoading,
  } = useSWR('/api/userBookings', fetchUserBooking);

  const {
    data: userDetails,
    error: userDetailsError,
    isLoading: IsUserDetailsLoading,
  } = useSWR('/api/users', fetchUserDetails);

  if (userBookingsError || userDetailsError)
    throw new Error('Cannot fetch data');

  if (typeof userBookings === 'undefined' && !IsUserBookingsLoading)
    throw new Error('Cannot fetch user bookings data');

  if (typeof userDetails === 'undefined' && !IsUserDetailsLoading)
    throw new Error('Cannot fetch user details');

  if (!userBookings || !userDetails) return <LoadingSpinner />;

  console.log({ userDetails });

  return <div>UserDetails</div>;
};

export default UserDetails;
