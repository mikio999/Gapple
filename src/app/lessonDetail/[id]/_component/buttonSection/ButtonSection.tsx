'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function ButtonSection() {
  const [active, setActive] = useState({
    heart: false,
    star: false,
    share: false,
  });

  return (
    <div
      className={
        'flex desktop:flex-col items-center desktop:space-y-8 justify-center bg-white shadow-md desktop:py-4 desktop:px-2 rounded-full px-4 py-2'
      }
    >
      <div
        className={'flex items-center relative cursor-pointer'}
        onMouseEnter={() => setActive((prev) => ({ ...prev, heart: true }))}
        onMouseLeave={() => setActive((prev) => ({ ...prev, heart: false }))}
        onClick={() => setActive((prev) => ({ ...prev, heart: !prev.heart }))}
      >
        <Image
          src={
            active.heart ? '/icons/heartRose.png' : '/icons/heartlightgray.png'
          }
          width={35}
          height={35}
          className={'desktop:w-8 w-6'}
          alt={'Heart'}
        />
        <span
          className={
            'desktop:hidden text-slate-400 text-xs font-semibold ml-2 mr-8'
          }
        >
          {'5'}
        </span>
        <span
          className={
            'hidden desktop:block absolute desktop:top-12 desktop:-translate-x-1/2 desktop:right-3 desktop:left-1/2 translate-x-full -translate-y-1/2 right-0 text-slate-500 text-xs font-semibold'
          }
        >
          {'3'}
        </span>
      </div>
      <div
        className={'flex items-center relative cursor-pointer'}
        onMouseEnter={() => setActive((prev) => ({ ...prev, star: true }))}
        onMouseLeave={() => setActive((prev) => ({ ...prev, star: false }))}
        onClick={() => setActive((prev) => ({ ...prev, star: !prev.star }))}
      >
        <Image
          src={
            active.star ? '/icons/starYellow.png' : '/icons/starlightgray.png'
          }
          width={35}
          height={35}
          className={'desktop:w-8 w-6'}
          alt={'Star'}
        />
        <span
          className={
            'desktop:hidden text-slate-400 text-xs font-semibold ml-2 mr-2'
          }
        >
          {'5'}
        </span>
        <span
          className={
            'hidden desktop:block absolute desktop:top-12 desktop:-translate-x-1/2 desktop:right-3 desktop:left-1/2 translate-x-full -translate-y-1/2 right-0 text-slate-500 text-xs font-semibold'
          }
        >
          {'3'}
        </span>
      </div>
      <div
        className={'relative cursor-pointer'}
        onMouseEnter={() => setActive((prev) => ({ ...prev, share: true }))}
        onMouseLeave={() => setActive((prev) => ({ ...prev, share: false }))}
        onClick={() => setActive((prev) => ({ ...prev, share: !prev.share }))}
      >
        <Image
          src={
            active.share ? '/icons/sharegray.png' : '/icons/sharelightgray.png'
          }
          width={35}
          height={35}
          className={'hidden desktop:block'}
          alt={'Share'}
        />
      </div>
    </div>
  );
}
