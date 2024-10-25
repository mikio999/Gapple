import type { Metadata } from 'next';
import '../styles/globals.css';
import AuthSession from '@/_component/AuthSession';
import SideBar from './(main)/_component/NavBar/SideBar';

export const metadata: Metadata = {
  title: 'GA:Pl',
  description: 'Generate Ai Planner',
  icons: {
    icon: '/dog.png',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang={'ko'}>
      <body
        className={'flex justify-center items-center'}
        style={{ fontFamily: 'Pretendard' }}
      >
        <AuthSession>
          <SideBar />
          <main
            className={
              'flex justify-center tablet:ml-0 laptop:ml-20 desktop:ml-36 flex-grow p-4 bg-slate-50 h-dvh'
            }
          >
            {children}
          </main>
          {modal && <div>{modal}</div>}
        </AuthSession>
      </body>
    </html>
  );
}
