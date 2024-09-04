import Link from 'next/link';

const ProfileIcon = () => {
  return (
    <div className="flex items-center justify-center">
      <Link href="/">
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
      </Link>
    </div>
  );
};

export default ProfileIcon;
