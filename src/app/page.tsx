import Topbar from '@/_component/Topbar';
import FeedList from './(main)/_component/FeedList';

// async function getServerSideProps() {
//   try {
//     const res = await fetch('http://localhost:3000/dummyFeeds.json');
//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
//     }
//     return { props: { feeds: data } };
//   } catch (error) {
//     console.error('Failed to load data', error);
//     return { props: { feeds: [] } };
//   }
// }

export default async function Home() {
  // const response = await getServerSideProps();
  return (
    <main>
      <Topbar />
      <div className=" flex flex-col justify-center items-center z-10 w-full max-w-5xl items-center text-sm lg:flex">
        {/* <FeedList feeds={response.data ?? []} /> */}
        <FeedList />
      </div>
    </main>
  );
}
