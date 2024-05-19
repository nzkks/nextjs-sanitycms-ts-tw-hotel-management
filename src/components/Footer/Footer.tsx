import Link from 'next/link';
import { BiMessageDetail } from 'react-icons/bi';
import { BsFillSendFill, BsTelephoneOutbound } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-tertiary-dark font-black">
          DRMS
        </Link>
        <h4 className="py-6 text-[40px] font-semibold">Contact</h4>
        <div className="flex flex-wrap items-center justify-center gap-16">
          <div className="flex-1">
            <p>123 Main St.</p>
            <div className="flex items-center py-4">
              <BsFillSendFill />
              <p className="ml-2">Auckland</p>
            </div>
            <div className="flex items-center py-4">
              <BsTelephoneOutbound />
              <p className="ml-2">0987654321</p>
            </div>
            <div className="flex items-center pt-4">
              <BiMessageDetail />
              <p className="ml-2">Auckland&apos;s Best</p>
            </div>
          </div>

          <div className="flex-1 md:text-right">
            <p className="pb-4">Our Story</p>
            <p className="pb-4">Get in Touch</p>
            <p className="pb-4">Our Privacy Cmmitment</p>
            <p className="pb-4">Terms of Service</p>
            <p>Customer Assistence</p>
          </div>

          <div className="flex-1 md:text-right">
            <p className="pb-4">Dining Experience</p>
            <p className="pb-4">Wellness</p>
            <p className="pb-4">Fitness</p>
            <p className="pb-4">Sports</p>
            <p>Events</p>
          </div>
        </div>
      </div>

      <div className="bg-tertiary-light bottom-0 left-0 mt-16 h-10 w-full md:h-[70px]"></div>
    </footer>
  );
};

export default Footer;
