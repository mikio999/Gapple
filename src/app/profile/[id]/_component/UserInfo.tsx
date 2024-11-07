'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { GridLoader } from 'react-spinners';
import CustomModal from '@/_component/Modal/CustomModal';
import ProfileForm from './ProfileForm';
import { useUserInfo } from '../../_lib/useUserInfo'; // Ensure it's correctly imported
import { usePathname } from 'next/navigation';

const UserInfo = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const userId = Number(pathname.split('/')[2]);
  const { userInfo, updateUserInfo, isLoading, isError, error } = useUserInfo(
    userId,
    session?.accessToken,
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (status === 'loading' || isLoading) {
    return (
      <div className={'flex justify-center items-center mt-64'}>
        <GridLoader color={'#ED4264'} size={15} />
      </div>
    );
  }

  if (status !== 'authenticated' || isError) {
    console.error('Authentication error:', error);
    return null;
  }

  return (
    <div className="flex laptop:flex-row laptop:justify-around laptop:h-48 flex-col items-center space-y-4 bg-white px-8 rounded-lg pb-4 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div style={{ position: 'relative', width: '120px', height: '120px' }}>
        <Image
          src={userInfo.data.profileImg || '/images/gappler.png'}
          alt="Profile"
          layout="fill"
          className="rounded-full object-cover shadow-md"
        />
      </div>
      <div className="flex flex-col laptop:ml-8">
        <h1 className="text-xl font-semibold text-slate-800">
          {userInfo.data.nickname}
        </h1>
        <div className="text-sm text-slate-500">
          {userInfo.data.level || 'Level Info'}
        </div>
        <div className="text-sm text-slate-600 mt-2">
          {userInfo.data.selfIntro || '교육의 가치를 믿습니다!'}
        </div>
        <button
          type="button"
          className="mt-2 w-20 py-1 bg-slate-700 hover:bg-slate-500 text-white font-medium rounded-md text-xs"
          onClick={openModal}
        >
          프로필 수정
        </button>
      </div>
      {modalIsOpen && (
        <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
          <ProfileForm
            profileData={userInfo.data}
            updateUserInfo={updateUserInfo}
            setModalIsOpen={setModalIsOpen}
            accessToken={session.accessToken}
            setLoading={setLoading}
            loading={loading}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default UserInfo;
