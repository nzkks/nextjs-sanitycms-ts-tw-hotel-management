'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { LiaFireExtinguisherSolid } from 'react-icons/lia';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { GiSmokeBomb } from 'react-icons/gi';
import toast from 'react-hot-toast';

import { getRoom } from '@/libs/apis';
import LoadingSpinner from '../../loading';
import HotelPhotoGallery from '@/components/HotelPhotoGallery/HotelPhotoGallery';
import BookRoomCTA from '@/components/BookRoomCTA/BookRoomCTA';

const RoomDetails = (props: { params: { slug: string } }) => {
  const slug = props.params.slug;

  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);

  const fetchRoom = async () => getRoom(slug);
  const { data: room, error, isLoading } = useSWR('/api/room', fetchRoom);

  if (error) throw new Error('Cannot fetch data');
  if (typeof room === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');

  if (!room) return <LoadingSpinner />;

  const calcMinCheckoutDate = () => {
    if (!checkinDate) return null;

    const nextDay = new Date(checkinDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  };

  const calcNumOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  const handleBookNowClick = () => {
    if (!checkinDate || !checkoutDate)
      return toast.error('Please provide checkin / checkout date');

    if (checkinDate > checkoutDate)
      return toast.error('Please choose a valid checkin period');

    const numberOfDays = calcNumOfDays();

    const hotelRoomSlug = room.slug.current;
  };

  return (
    <div>
      <HotelPhotoGallery photos={room.images} />

      <div className="container mx-auto mt-20">
        <div className="gap-10 px-3 md:grid md:grid-cols-12">
          <div className="md:col-span-8 md:w-full">
            <div>
              <h2 className="text-left text-lg font-bold md:text-2xl">
                {room.name} ({room.dimension})
              </h2>
              <div className="my-11 flex">
                {room.offeredAmenities.map((amenity) => (
                  <div
                    key={amenity._key}
                    className="mr-3 grid h-20 w-fit place-content-center rounded-lg bg-[#eff0f2] px-2 text-center dark:bg-gray-800 md:h-40 md:w-44 md:px-0"
                  >
                    <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                    <p className="pt-3 text-xs md:text-base">
                      {amenity.amenity}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mb-11">
                <h2 className="mb-2 text-3xl font-bold">Description</h2>
                <p>{room.description}</p>
              </div>
              <div className="mb-11">
                <h2 className="mb-2 text-3xl font-bold">Offered Amenities</h2>
                <div className="grid grid-cols-2">
                  {room.offeredAmenities.map((amenity) => (
                    <div
                      key={amenity._key}
                      className="my-1 flex items-center md:my-0"
                    >
                      <i className={`fa-solid ${amenity.icon}`}></i>
                      <p className="ml-2 text-xs md:text-base">
                        {amenity.amenity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-11">
                <h2 className="mb-2 text-3xl font-bold">Safety And Hygiene</h2>
                <div className="grid grid-cols-2">
                  <div className="my-1 flex items-center md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 text-xs md:text-base">Daily Cleaning</p>
                  </div>
                  <div className="my-1 flex items-center md:my-0">
                    <LiaFireExtinguisherSolid />
                    <p className="ml-2 text-xs md:text-base">
                      Fire Extinguishers
                    </p>
                  </div>
                  <div className="my-1 flex items-center md:my-0">
                    <AiOutlineMedicineBox />
                    <p className="ml-2 text-xs md:text-base">
                      Disinfections and Sterilizations
                    </p>
                  </div>
                  <div className="my-1 flex items-center md:my-0">
                    <GiSmokeBomb />
                    <p className="ml-2 text-xs md:text-base">Smoke Detectors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky top-10 h-fit overflow-auto rounded-xl shadow-lg dark:shadow dark:shadow-white md:col-span-4">
            <BookRoomCTA
              discount={room.discount}
              price={room.price}
              specialNote={room.specialNote}
              checkinDate={checkinDate}
              setCheckinDate={setCheckinDate}
              checkoutDate={checkoutDate}
              setCheckoutDate={setCheckoutDate}
              calcMinCheckoutDate={calcMinCheckoutDate}
              calcNumOfDays={calcNumOfDays}
              adults={adults}
              setAdults={setAdults}
              noOfChildren={noOfChildren}
              setNoOfChildren={setNoOfChildren}
              isBooked={room.isBooked}
              handleBookNowClick={handleBookNowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
