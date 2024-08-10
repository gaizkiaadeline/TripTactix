import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';  // Mengimpor font Poppins
import './globals.css';
import LottieBus from './animated/LottieBus';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });  // Sesuaikan berat font jika diperlukan

export const metadata: Metadata = {
  title: 'TripTactix',
  description: 'AI-powered travel planner',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <LottieBus />
        <div className="wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}




