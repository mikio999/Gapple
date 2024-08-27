'use client';

import { useEffect, useState } from 'react';
import Feed from './Feed';
import IFeed from '@/types/feed';

function FeedList() {
  const [feeds, setFeeds] = useState<IFeed[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/data/dummyFeeds.JSON');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        setFeeds(data.mockData);
      } catch (error) {
        console.error('Failed to load data', error);
      }
    }
    fetchData();
  }, []);
  console.log(feeds);

  // function FeedList({ feeds }) {
  return (
    <div>
      {feeds.map((feedData) => (
        <Feed key={feedData.document_id} feed={feedData} />
      ))}
    </div>
  );
}

export default FeedList;
