'use client';

import { IFeed } from '@/types/feed';
import { useSession } from 'next-auth/react';
import Feed from './Feed';
import { getFeeds } from '../../_lib/getFeeds';
import { useQuery } from '@tanstack/react-query';

export default function FeedList() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const { data, isLoading, error } = useQuery(
    ['feeds', accessToken],
    () => {
      if (!accessToken) throw new Error('No access token');
      return getFeeds(session.accessToken);
    },
    {
      enabled: !!session,
      retry: false,
    },
  );

  if (!session) {
    return <div>{'유저 정보가 존재하지 않습니다'}</div>;
  }

  if (isLoading) {
    return <div>{'Loading feeds...'}</div>;
  }

  if (error) {
    console.error('Failed to fetch feeds:', error);
    return <div>{'Error loading feeds'}</div>;
  }

  if (!data?.data.list || !Array.isArray(data.data.list)) {
    console.error('Feed data is not available or not in expected format');
    return <div>{'No feed data available'}</div>;
  }

  return (
    <div>
      {data.data.list.map((feedData: IFeed) => (
        <Feed key={feedData.id} feed={feedData} />
      ))}
    </div>
  );
}
