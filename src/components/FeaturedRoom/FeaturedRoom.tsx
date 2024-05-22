import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Room } from '@/app/models/room';

type Props = {
  featuredRoom: Room;
};

const FeaturedRoom: FC<Props> = (props) => {
  const { featuredRoom } = props;

  return (
    <section className="container mx-auto flex flex-col items-center gap-12 px-4 py-10 md:flex-row">
      <div className="grid-cols-1 gap-8 md:grid">
        <div className="mb-4 h-48 overflow-hidden rounded-2xl md:mb-0">
          <Image
            src={featuredRoom.coverImage.url}
            alt={featuredRoom.name}
            width={300}
            height={300}
            className="img scale-animation"
          />
        </div>
        <div className="grid h-48 grid-cols-2 gap-8">
          {featuredRoom.images.splice(1, 2).map((image) => (
            <div key={image._key} className="overflow-hidden rounded-2xl">
              <Image
                src={image.url}
                alt={image._key}
                width={300}
                height={300}
                className="img scale-animation"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-left md:w-1/2 md:py-10">
        <h3 className="font-heading mb-12">Featured Room</h3>

        <p className="max-w-md font-normal">{featuredRoom.description}</p>

        <div className="mt-5 flex flex-col justify-between md:flex-row md:items-end">
          <div className="mb-3 flex md:mb-0">
            <div className="mr-4 flex flex-col items-center justify-center gap-3">
              <p className="text-center text-xs lg:text-xl">Start From</p>
              <p className="flex text-lg font-medium md:font-bold xl:text-5xl">
                $ {featuredRoom.price}
              </p>
            </div>
            <div className="mr-4 flex flex-col items-center justify-center gap-3">
              <p className="text-center text-xs lg:text-xl">Discount</p>
              <p className="flex text-lg font-medium md:font-bold xl:text-5xl">
                $ {featuredRoom.discount}
              </p>
            </div>
          </div>

          <Link
            href={`/rooms/${featuredRoom.slug.current}`}
            className="h-fit rounded-2xl border border-tertiary-dark px-3 py-2 text-center font-bold text-tertiary-dark lg:px-7 lg:py-5 lg:text-xl"
          >
            More Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoom;
