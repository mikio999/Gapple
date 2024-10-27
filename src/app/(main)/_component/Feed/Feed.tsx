import ActionButtons from '@/_component/Item/ActionButtons';
import { IFeed } from '@/types/feed';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';

interface FeedProps {
  feed: IFeed;
}

export default function Feed({ feed }: FeedProps) {
  return (
    <div className="mx-auto my-4 max-w-xs tablet:max-w-sm laptop:max-w-md desktop:max-w-lg font-pretendard">
      <div className="flex items-center mb-4">
        <div
          className={'w-10 h-10 laptop:w-12 laptop:h-12 rounded-full'}
          style={{
            backgroundImage: `url(${feed.authorThumbnailImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
          }}
        />
        <div className="ml-2">
          <strong>{feed.authorNickname}</strong>
          <span className="text-primary">의 교육계획안이 올라왔어요!</span>
          <div className="text-slate-500 text-xs">
            작성 시간: {new Date(feed.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      <div
        key={feed.id}
        className="bg-slate-200 shadow-md rounded-lg overflow-hidden cursor-pointer"
      >
        <div className="p-4">
          <Link href={`/lessonDetail/${feed.id}`} passHref>
            <h1 className="text-xl font-bold">{feed.title}</h1>
          </Link>
        </div>
        {feed.images && feed.images.length > 0 && (
          <div className="px-4 py-0 border-t z-10">
            <ImageCarousel images={feed.images} />
          </div>
        )}
        <Link href={`/lessonDetail/${feed.id}`} passHref>
          <ul className="px-4 py-2">
            {feed.content_subtitles.map((subtitle, index) => (
              <li key={index} className={'text-slate-700 text-base'}>
                {subtitle}
              </li>
            ))}
          </ul>
        </Link>
        <div className={'px-4 pb-4'}>
          <ActionButtons
            like={feed.liked_count}
            comment={0}
            scrap={feed.bookmark_count}
            isLiked={feed.liked}
            isBookmarked={feed.bookmarked}
            postId={feed.id}
          />
        </div>
      </div>
    </div>
  );
}
