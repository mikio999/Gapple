'use client';

import FollowList from './FollowList';
import UserInfo from './UserInfo';
import { useSession } from 'next-auth/react';
import { useUserInfo } from '../../_lib/useUserInfo'; // Ensure it's correctly imported
import { usePathname } from 'next/navigation';

const followData = {
  follow: {
    follow_people: [
      {
        id: 1,
        name: '광망경',
        image: '/images/우사기.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
      {
        id: 2,
        name: '덩은킴',
        image: '/images/쿠리만쥬.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
      {
        id: 3,
        name: '항강응',
        image: '/images/하치와레.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
      {
        id: 4,
        name: '호떡킴',
        image: '/images/치이카와.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
    ],
    number: 4,
  },
  following: {
    following_people: [
      {
        id: 2,
        name: '덩은킴',
        image: '/images/쿠리만쥬.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
      {
        id: 3,
        name: '항강응',
        image: '/images/하치와레.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
      {
        id: 4,
        name: '호떡킴',
        image: '/images/치이카와.webp',
        introduction: '비빔 비비비빔 비비비비',
      },
    ],
    number: 3,
  },
};

const ProfileTop = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const token = session?.accessToken || '';
  const userId = Number(pathname.split('/')[2]);
  const { userInfo, updateUserInfo, isLoading, isError, error } = useUserInfo(
    userId,
    token,
  );

  return (
    <div className={'mb-6'}>
      <UserInfo
        userInfo={userInfo?.data}
        updateUserInfo={updateUserInfo}
        userId={userId}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <FollowList {...followData} />
    </div>
  );
};

export default ProfileTop;
