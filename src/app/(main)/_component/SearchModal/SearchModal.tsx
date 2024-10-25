'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SearchCategory from './SearchCategory';

export default function SearchModal() {
  const router = useRouter();

  const handleInputClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  return (
    <div
      className={
        'fixed top-0 left-0 w-full h-full bg-slate-800 bg-opacity-85 flex justify-center items-center z-10'
      }
      onClick={router.back}
    >
      <div
        className={
          'flex flex-col bg-slate-300 p-8 rounded-md shadow-md max-w-3xl w-full tablet:w-4/5 laptop:w-3/5 desktop:w-2/5 min-h-96 border-none mx-auto'
        }
        onClick={handleInputClick}
      >
        <div className={'flex border-b pb-1 border-slate-200'}>
          <Image
            src={'/icons/searchWhite.png'}
            width={30}
            height={30}
            alt={'search icon'}
          />
          <input
            className={
              'w-full pl-2 ml-2 bg-transparent focus:outline-none text-slate-900'
            }
          />
        </div>
        <SearchCategory />
        <div className={'flex justify-center items-center h-96 text-slate-600'}>
          {'무엇이 궁금하신가요?!'}
        </div>
      </div>
    </div>
  );
}
