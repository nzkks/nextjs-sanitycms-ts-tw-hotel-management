import { FC } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import LoadingSpinner from '@/app/(web)/loading';
import Rating from '../Rating/Rating';
import { Review } from '@/models/review';

const RoomReview: FC<{ roomId: string }> = ({ roomId }) => {
  const fetchRoomReviews = async () => {
    const { data } = await axios.get(`/api/room-reviews/${roomId}`);
    return data;
  };

  const {
    data: roomReviews,
    error,
    isLoading,
  } = useSWR('/api/room-reviews', fetchRoomReviews);

  if (error) throw new Error('Cannot fetch data');
  if (typeof roomReviews === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');

  if (!roomReviews) return <LoadingSpinner />;

  return (
    <>
      {roomReviews &&
        roomReviews.map((review: Review) => (
          <div
            className="rounded-lg bg-gray-100 p-4 dark:bg-gray-900"
            key={review._id}
          >
            <div className="mb-2 flex font-semibold">
              <p>{review.user.name}</p>
              <div className="ml-4 flex items-center text-lg text-tertiary-light">
                <Rating rating={review.userRating} />
              </div>
            </div>

            <p>{review.text}</p>
          </div>
        ))}
    </>
  );
};

export default RoomReview;
