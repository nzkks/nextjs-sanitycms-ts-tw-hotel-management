'use client';

import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { FaSignOutAlt } from 'react-icons/fa';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';

import { getUserBookings } from '@/libs/apis';
import LoadingSpinner from '../../loading';
import { User } from '@/models/user';
import BookingsTable from '@/components/BookingsTable/BookingsTable';
import BookingsChart from '@/components/BookingsChart/BookingsChart';
import RatingModal from '@/components/RatingModal/RatingModal';
import BackDrop from '@/components/BackDrop/BackDrop';

const UserDetails = (props: { params: { id: string } }) => {
  const {
    params: { id: userId },
  } = props;

  const [currentNav, setCurrentNav] = useState<
    'bookings' | 'amount' | 'ratings'
  >('bookings');
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState('');

  const toggleRatingModal = () =>
    setIsRatingModalOpen((prevState) => !prevState);

  const handleReviewSubmit = async () => {
    if (!ratingText.trim().length || !ratingValue) {
      return toast.error('Please provide a rating text and a rating');
    }

    if (!roomId) toast.error('Id not provided');

    setIsSubmittingReview(true);

    try {
      const { data } = await axios.post('/api/users', {
        roomId,
        ratingValue,
        reviewText: ratingText,
      });
      toast.success('Review submitted successfully');
    } catch (error) {
      toast.error('Review failed');
    } finally {
      setRoomId(null);
      setRatingText('');
      setRatingValue(null);
      setIsSubmittingReview(false);
      setIsRatingModalOpen(false);
    }
  };

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
            <p className="mr-2">Sign Out</p>
            <FaSignOutAlt
              className="cursor-pointer text-3xl"
              onClick={() => signOut({ callbackUrl: '/' })}
            />
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
            <p className="mr-2">Sign out</p>
            <FaSignOutAlt
              className="cursor-pointer text-3xl"
              onClick={() => signOut({ callbackUrl: '/' })}
            />
          </div>

          <nav className="sticky top-0 mx-auto mb-8 mt-7 w-fit rounded-lg border border-gray-200 bg-gray-50 px-2 py-3 text-gray-700 md:w-full md:px-5">
            <ol
              className={`${
                currentNav === 'bookings' ? 'text-blue-600' : 'text-gray-700'
              } mr-1 inline-flex items-center space-x-1 md:mr-5 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav('bookings')}
                className="inline-flex cursor-pointer items-center"
              >
                <BsJournalBookmarkFill />
                <a className="mx-1 inline-flex items-center text-xs font-medium md:mx-3 md:text-sm">
                  Current Bookings
                </a>
              </li>
            </ol>
            <ol
              className={`${
                currentNav === 'amount' ? 'text-blue-600' : 'text-gray-700'
              } mr-1 inline-flex items-center space-x-1 md:mr-5 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav('amount')}
                className="inline-flex cursor-pointer items-center"
              >
                <GiMoneyStack />
                <a className="mx-1 inline-flex items-center text-xs font-medium md:mx-3 md:text-sm">
                  Amount Spent
                </a>
              </li>
            </ol>
          </nav>

          {currentNav === 'bookings' ? (
            userBookings && (
              <BookingsTable
                userBookings={userBookings}
                setRoomId={setRoomId}
                toggleRatingModal={toggleRatingModal}
              />
            )
          ) : (
            <></>
          )}

          {currentNav === 'amount' ? (
            userBookings && <BookingsChart userBookings={userBookings} />
          ) : (
            <></>
          )}
        </div>
      </div>

      <RatingModal
        isOpen={isRatingModalOpen}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        ratingText={ratingText}
        setRatingText={setRatingText}
        isSubmittingReview={isSubmittingReview}
        onReviewSubmit={handleReviewSubmit}
        toggleRatingModal={toggleRatingModal}
      />
      <BackDrop isOpen={isRatingModalOpen} />
    </div>
  );
};

export default UserDetails;
