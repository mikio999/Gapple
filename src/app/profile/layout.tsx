import FollowList from './_component/FollowList';
import TabComponent from './_component/TabComponent';
import UserInfo from './_component/UserInfo';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

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

export default function Layout({ children }: ProfileLayoutProps) {
  return (
    <div>
      <div className={'mb-6'}>
        <UserInfo />
        <FollowList {...followData} />
      </div>
      <TabComponent />
      <main className={'mt-6'}>{children}</main>
    </div>
  );
}
