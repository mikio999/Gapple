import Image from 'next/image';
import Link from 'next/link';
import ProfileIcon from './ProfileIcon';
import LoginBtn from './LoginBtn';

const isLoggedIn = false;

export default function Topbar() {
  return (
    <div className="flex align-items justify-between m-4">
      <Link href="/">
        <Image
          src={'/images/GappleLogo.png'}
          width={100}
          height={50}
          alt={'logo'}
          priority
        />
      </Link>
      {isLoggedIn ? <ProfileIcon /> : <LoginBtn />}
    </div>
  );
}
