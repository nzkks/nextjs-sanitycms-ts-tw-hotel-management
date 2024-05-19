import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import Header from '@/components/Header/Header';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Hotel Management System',
  description: 'Discover your next stay!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        <main className="font-normal">{children}</main>
        {/* ?Footer */}
      </body>
    </html>
  );
}
