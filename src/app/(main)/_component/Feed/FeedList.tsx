import { IFeed } from '@/types/feed';
import { auth } from '@/auth';
import Feed from './Feed';
import { getFeeds } from '../../_lib/getFeeds';

interface Session {
  accessToken: string;
}

export default async function FeedList() {
  const session: Session | null = await auth();

  if (!session) {
    console.error('No session available, user might not be logged in');
    return <div>유저 정보가 존재하지 않습니다</div>;
  }
  console.log(session.accessToken);

  try {
    const feeds = await getFeeds(session.accessToken);

    if (!feeds.data.list || !Array.isArray(feeds.data.list)) {
      console.error('Feed data is not available or not in expected format');
      return <div>No feed data available</div>;
    }

    return (
      <div>
        {feeds.data.list.map((feedData: IFeed) => (
          <Feed key={feedData.id} feed={feedData} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch feeds:', error);
    return <div>Error loading feeds</div>;
  }
}
