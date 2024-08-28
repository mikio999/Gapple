import Topbar from '@/_component/Topbar';
import FeedList from './(main)/_component/FeedList';

export default async function Home() {
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
