import FeedList from './_component/Feed/FeedList';
import MainTop from './_component/MainTop/MainTop';
import MonthlyTheme from './_component/MonthlyTheme/MonthlyTheme';
import RecommendList from './_component/RecommendFeed/RecommendList';

export default function MainPage() {
  return (
    <div>
      <div className={'flex flex-col text-sm'}>
        <MainTop />

        <div
          className={
            'flex flex-col desktop:flex-row tablet:flex-col laptop:flex-row justify-between w-full'
          }
        >
          <FeedList />
          <div className={'desktop:ml-8 laptop:ml-8'}>
            <MonthlyTheme />
            <RecommendList />
          </div>
        </div>
      </div>
    </div>
  );
}
