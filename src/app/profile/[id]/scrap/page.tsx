import { auth } from '@/auth';
import { v4 as uuidv4 } from 'uuid';
import ScrapItem from './_component/ScrapItem';
import { getScrap } from '../../_lib/getScrap';
import PlanItem from '../plan/_component/PlanItem';
import RecordItem from '../record/_component/RecordItem';

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
  console.log(scrapData.data.list);
  return (
    <div>
      {scrapData.data.list.map((item) => {
        switch (item.type) {
          case 'PLAN':
            return <PlanItem data={item} />;
          case 'LOG':
            return (
              <RecordItem
                key={item.id}
                title={item.title}
                description={item.description}
                likedBy={item.likedBy}
              />
            );
          default:
            return null; // Handle unknown types or add a default item type
        }
      })}
    </div>
  );
}
