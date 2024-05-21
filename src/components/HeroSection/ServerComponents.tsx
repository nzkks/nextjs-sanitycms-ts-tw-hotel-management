import Image from 'next/image';

export const heading1 = (
  <>
    <h1 className="font-heading mb-6">Explore Our Exquisite Hotel</h1>
    <p className="mb-12 max-w-lg text-[#4a4a4a] dark:text-[#ffffffea]">
      Experience an Exquisite Hotel Immersed in Rich History and Timeless
      Elegance.
    </p>
    <button className="btn-primary">Get Started</button>
  </>
);

export const section2 = (
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
);
