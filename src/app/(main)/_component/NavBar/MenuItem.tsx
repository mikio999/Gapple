import Image from 'next/image';
import Link from 'next/link';

interface MenuItemProps {
  name: string;
  icon: string;
  activeIcon: string;
  link: string;
}

const MenuItem = ({ name, icon, activeIcon, link }: MenuItemProps) => {
  return (
    <Link
      href={link}
      className="p-4 flex items-center justify-start hover:bg-gray-200 desktop:w-48"
    >
      <div className="relative">
        <Image
          src={icon}
          width={30}
          height={30}
          alt={`${name} Icon`}
          priority
          className="m-2 transition-transform duration-300 ease-in-out hover:scale-110 tablet:w-8"
        />
      </div>
      <span className="ml-2 tablet:hidden laptop:hidden desktop:block">
        {name}
      </span>
    </Link>
  );
};

export default MenuItem;
