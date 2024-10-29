'use client';

import { useRouter } from 'next/navigation';

export default function RecordModal() {
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
        {'hello this is record Modal'}
      </div>
    </div>
  );
}
