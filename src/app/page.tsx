import Category from './(main)/_component/Category/Category';
import CreateBtn from './(main)/_component/Create/CreateBtn';
import FeedList from './(main)/_component/Feed/FeedList';
import RecommendList from './(main)/_component/RecommendFeed/RecommendList';
import SearchBar from './(main)/_component/SearchBar/SearchBar';

export default async function Home() {
  return (
    <div>
      <div className="flex flex-col text-sm">
        <div className="flex justify-around">
          <SearchBar />
          <CreateBtn />
        </div>
        <Category />
        <div className="flex flex-row justify-between w-full">
          <FeedList />
          <RecommendList />
        </div>
      </div>
    </div>
  );
}
