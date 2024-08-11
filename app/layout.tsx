import type { Metadata } from 'next';
import { Poppins } from 'next/font/google'; 
import './globals.css';
import LottieBus from './animated/LottieBus';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] }); 

export const metadata: Metadata = {
  title: 'TripTactix',
  description: 'AI-powered travel planner',
  icons: {
    icon: '/images/logo-withouttext.png',  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

        <link rel="icon" type="image/png" sizes="264x264" href="/images/logo-withouttext.png" />
      </head>
      <body className={poppins.className}>
        <LottieBus />
        <div className="wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}





