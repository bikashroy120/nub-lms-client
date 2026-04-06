import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { LMSProvider } from '@/lib/context/lms-context';
import { getMe } from './actions/auth';
import './globals.css';
import { AuthProvider } from '@/lib/context/auth-context';
import { Toaster } from 'sonner';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LearnHub - Professional Learning Management System',
  description:
    'A comprehensive LMS platform for online education, course management, and student learning',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getMe();
  return (
    <html lang='en'>
      <body className='font-sans antialiased'>
        <AuthProvider userData={userData?.data}>
          <LMSProvider>
            {children}
            <Toaster position='top-center' richColors closeButton />
          </LMSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
