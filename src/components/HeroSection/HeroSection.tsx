'use client';

import Image from 'next/image';
import CountUpNumber from '../CountUpNumber/CountUpNumber';

const HeroSection = () => {
  return (
    <section className="container mx-auto flex items-center gap-12 px-4">
      <div className="h-full py-10">
        <h1 className="font-heading mb-6">Explore Our Exquisite Hotel</h1>
        <p className="mb-12 max-w-lg text-[#4a4a4a] dark:text-[#ffffffea]">
          Experience an Exquisite Hotel Immersed in Rich History and Timeless
          Elegance.
        </p>
        <button className="btn-primary">Get Started</button>

        <div className="mt-12 flex justify-between">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-xs lg:text-xl">Basic Room</p>
            <CountUpNumber duration={3000} endValue={200} />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-xs lg:text-xl">Luxury Room</p>
            <CountUpNumber duration={2000} endValue={100} />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-xs lg:text-xl">Suite</p>
            <CountUpNumber duration={1000} endValue={50} />
          </div>
        </div>
      </div>

      <div className="hidden grid-cols-1 gap-8 md:grid">
        <div className="h-48 overflow-hidden rounded-2xl">
          <Image
            src="/images/hero-1.jpg"
            alt="Hero image"
            width={300}
            height={300}
            className="img scale-animation"
          />
        </div>

        <div className="grid h-48 grid-cols-2 gap-8">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/images/hero-2.jpg"
              alt="Hero image"
              width={300}
              height={300}
              className="img scale-animation"
            />
          </div>
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/images/hero-3.jpg"
              alt="Hero image"
              width={300}
              height={300}
              className="img scale-animation"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
