'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Image as ImageType } from '@/models/room';

const HotelPhotoGallery: FC<{
  photos: ImageType[];
}> = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const totalPhotos = photos.length;

  const handlePrevious = () =>
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? totalPhotos - 1 : prevIndex - 1,
    );

  const handleNext = () =>
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === totalPhotos - 1 ? 0 : prevIndex + 1,
    );

  return (
    <div className="container mx-auto">
      <div className="relative grid gap-5 px-3 md:grid-cols-2">
        <div className="relative h-[540px] overflow-hidden rounded-2xl">
          <div className="flex h-full w-full items-center justify-center md:hidden">
            <Image
              src={photos[currentPhotoIndex].url}
              alt={`Room photo ${currentPhotoIndex + 1}`}
              className="img"
              width={150}
              height={150}
            />
          </div>
        </div>
        <div className="flex items-center justify-between md:hidden">
          <div className="flex space-x-2">
            <FaArrowLeft className="cursor-pointer" onClick={handlePrevious} />
            <FaArrowRight className="cursor-pointer" onClick={handleNext} />
          </div>
          <div>
            {currentPhotoIndex + 1}/{totalPhotos}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPhotoGallery;
