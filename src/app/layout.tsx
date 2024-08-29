import type { Metadata } from 'next';
import '../styles/globals.css';
import Topbar from '@/_component/Topbar';

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
      <body style={{ fontFamily: 'Pretendard' }}>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
