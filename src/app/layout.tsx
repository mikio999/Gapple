import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GA:Pl',
  description: 'Generate Ai Planner',
  icons: {
    icon: '/icons/gappler.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: 'Pretendard' }}>{children}</body>
    </html>
  );
}
