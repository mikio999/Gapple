import { BASE_URL } from '@/_lib/utils/config';

async function fetchFeeds() {
  // const response = await fetch(`${BASE_URL}/feeds`);
  const response = await fetch(`/dummyFeeds.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }
  return await response.json();
}

export default fetchFeeds;
