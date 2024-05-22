'use client';

import useSWR from 'swr';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { LiaFireExtinguisherSolid } from 'react-icons/lia';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { GiSmokeBomb } from 'react-icons/gi';

import { getRoom } from '@/libs/apis';
import LoadingSpinner from '../../loading';
import HotelPhotoGallery from '@/components/HotelPhotoGallery/HotelPhotoGallery';

const RoomDetails = (props: { params: { slug: string } }) => {
  const slug = props.params.slug;

  const fetchRoom = async () => getRoom(slug);
  const { data: room, error, isLoading } = useSWR('/api/room', fetchRoom);

  if (error) throw new Error('Cannot fetch data');
  if (typeof room === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');

  if (!room) return <LoadingSpinner />;

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
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
