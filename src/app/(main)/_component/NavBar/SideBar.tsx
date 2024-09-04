import MENU_ITEMS from './menuItems';
import MenuItem from './MenuItem';
import ProfileIcon from './ProfileIcon';
import Link from 'next/link';
import Image from 'next/image';

const isLoggedIn = true;

export default function SideBar() {
  const filteredMenuItems = isLoggedIn
    ? MENU_ITEMS.filter((item) => item.name !== '로그인')
    : MENU_ITEMS.filter((item) => ['홈', '검색', '로그인'].includes(item.name));
  return (
    <div
      className="
        flex bg-white  z-50 shadow-md
        fixed desktop:left-0 desktop:top-0 desktop:bottom-0 desktop:w-52 desktop:flex-col desktop:h-dvh
        laptop:w-20 laptop:flex-col laptop:items-center laptop:justify-start laptop:h-dvh 
        tablet:fixed tablet:top-auto tablet:left-0 tablet:right-0 tablet:bottom-0 tablet:h-20 tablet:flex-row tablet:items-center tablet:justify-around
      "
    >
      <Link href="/" className="mt-4 tablet:hidden desktop:block laptop:hidden">
        <Image
          src={'/images/GappleLogo.png'}
          width={100}
          height={50}
          alt={'logo'}
          priority
        />
      </Link>
      <Link href="/" className="mt-4 tablet:hidden desktop:hidden laptop:block">
        <Image
          src={'/images/gappleapple.png'}
          width={30}
          height={50}
          alt={'logo'}
          priority
        />
      </Link>
      <div className="mt-8 tablet:flex tablet:justify-center tablet:items-center mb-4">
        {filteredMenuItems.map((item) => (
          <MenuItem
            key={item.name}
            name={item.name}
            icon={item.icon}
            activeIcon={item.activeIcon}
            link={item.link}
          />
        ))}
      </div>
      {/* <div className="flex mt-auto tablet:mb-4 desktop:mb-8 laptop:mb-8">
        {isLoggedIn ? <ProfileIcon /> : <></>}
      </div> */}
    </div>
  );
}
