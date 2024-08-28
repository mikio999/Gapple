import Image from 'next/image'; // Import Image from 'next/image'
import Link from 'next/link';

const ProfileIcon = () => {
  return (
    <div className="flex items-center">
      <Link href="/">
        <a>
          <Image
            src="/images/GappleLogo.png"
            width={100}
            height={50}
            alt="logo"
            priority
          />
        </a>
      </Link>
      <div
        className="w-10 h-10 rounded-full"
        style={{
          backgroundImage: 'url(/images/ham.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '2px solid white',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
        }}
      />
    </div>
  );
};

export default ProfileIcon;
