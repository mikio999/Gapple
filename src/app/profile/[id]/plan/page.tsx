import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';
import PlanItem from './_component/PlanItem';
import { getPlan } from '../../_lib/getPlan';
import { IFeed } from '@/types/feed';

interface Session {
  accessToken: string;
}

export default async function PlanPage({ params }: { params: { id: string } }) {
  const session: Session | null = await auth();

  if (!session) {
    console.error('No session available, user might not be logged in');
    return <div>{'유저 정보가 존재하지 않습니다. '}</div>;
  }

  try {
    const plans = await getPlan(session.accessToken, params.id);

    return (
      <div>
        {plans.data.list.map((item: IFeed) => (
          <PlanItem key={uuidv4()} data={item} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch plans:', error);
    return <div>{'Error loading plans'}</div>;
  }
}
