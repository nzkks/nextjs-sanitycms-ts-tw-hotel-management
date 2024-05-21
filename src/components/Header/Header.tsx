'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

import ThemeContext from '@/context/themeContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const { data: session } = useSession();

  return (
    <header className="container mx-auto flex flex-wrap items-center justify-between px-4 py-10 text-xl md:flex-nowrap">
      <div className="md:2/3 flex w-full items-center">
        <Link href="/" className="font-black text-tertiary-dark">
          DRMS
        </Link>
        <ul className="ml-5 flex items-center">
          <li className="flex items-center">
            {session?.user ? (
              <Link href={`/users/${session.user.id}`}>
                {session.user.image ? (
                  <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={session.user.image}
                      alt={session.user.name!}
                      width={32}
                      height={32}
                      className="img scale-animation"
                    />
                  </div>
                ) : (
                  <FaUserCircle className="cursor-pointer" />
                )}
              </Link>
            ) : (
              <Link href="/auth">
                <FaUserCircle className="cursor-pointer" />
              </Link>
            )}
          </li>
          <li className="ml-2">
            {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem('hotel-theme');
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem('hotel-theme', 'true');
                }}
              />
            )}
          </li>
        </ul>
      </div>
      <ul className="mt-4 flex w-full items-center justify-between md:w-1/3">
        <li className="transition-all duration-500 hover:-translate-y-2">
          <Link href="/">Home</Link>
        </li>
        <li className="transition-all duration-500 hover:-translate-y-2">
          <Link href="/rooms">Rooms</Link>
        </li>
        <li className="transition-all duration-500 hover:-translate-y-2">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
