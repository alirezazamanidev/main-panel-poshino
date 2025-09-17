import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'poshino',
  description: 'poshino online shop'
};
const vazir = Vazirmatn({ subsets: ['arabic'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
   
      <body >
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#1f1f1f',
              color: '#fff',
              fontFamily: 'Vazirmatn',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#1f1f1f',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1f1f1f',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}