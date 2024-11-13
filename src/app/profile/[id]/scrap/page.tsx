import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';
import { IFeed } from '@/types/feed';
import { getScrap } from '../../_lib/getScrap';
import PlanItem from '../plan/_component/PlanItem';
// import RecordItem from '../record/_component/RecordItem';

interface Session {
  accessToken: string;
}

export default async function ScrapPage() {
  const session: Session | null = await auth();

  if (!session) {
    console.error('No session available, user might not be logged in');
    return <div>{'유저 정보가 존재하지 않습니다'}</div>;
  }

  const scrapData = await getScrap(session.accessToken);

  if (!scrapData.data.list || scrapData.data.list.length === 0) {
    return <div className={'h-dvh ml-4'}>{'스크랩한 글이 없습니다.'}</div>;
  }

  return (
    <div>
      {scrapData.data.list.map((item: IFeed) => {
        const key = uuidv4();
        switch (item.type) {
          case 'PLAN':
            return <PlanItem key={key} data={item} />;
          // case 'LOG':
          //   return <RecordItem key={key} data={item} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
