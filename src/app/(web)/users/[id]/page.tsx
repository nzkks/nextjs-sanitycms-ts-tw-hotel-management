'use client';

import axios from 'axios';
import useSWR from 'swr';
import Image from 'next/image';

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

  if (IsUserDetailsLoading) return <LoadingSpinner />;

  if (!userDetails) throw new Error('Cannot fetch data');

  return (
    <div className="py10 container mx-auto px-2 md:px-4">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="sticky top-10 hidden h-fit rounded-lg bg-[#eff0f2] px-6 py-4 text-black shadow-lg md:col-span-4 md:block lg:col-span-3">
          <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full md:h-[143px] md:w-[143px]">
            <Image
              src={userDetails.image}
              alt={userDetails.name}
              width={143}
              height={143}
              className="img scale-animation rounded-full"
            />
          </div>
          <div className="py-4 text-left font-normal">
            <h6 className="pb-3 text-xl font-bold">About</h6>
            <p className="text-sm">{userDetails.about ?? ''}</p>
          </div>
          <div className="text-left font-normal">
            <h6 className="pb-3 text-xl font-bold">{userDetails.name}</h6>
          </div>
          <div className="flex items-center">
            {/* <p className="mr-2">Sign Out</p> */}
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-9">
          <div className="flex items-center">
            <h5 className="mr-3 text-2xl font-bold">
              Hello, {userDetails.name}
            </h5>
          </div>
          <div className="h-14 w-14 overflow-hidden rounded-l-full md:hidden">
            <Image
              className="img scale-animation rounded-full"
              width={56}
              height={56}
              src={userDetails.image}
              alt="User  Name"
            />
          </div>
          <p className="block w-fit py-2 text-sm md:hidden">
            {userDetails.about ?? ''}
          </p>

          <p className="py-2 text-xs font-medium">
            Joined In {userDetails._createdAt.split('T')[0]}
          </p>
          <div className="my-2 flex items-center md:hidden">
            {/* <p className="mr-2">Sign out</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
