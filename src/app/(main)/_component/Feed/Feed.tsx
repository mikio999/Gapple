import ActionButtons from '@/_component/Item/ActionButtons';
import { IFeed } from '@/types/feed';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';

interface FeedProps {
  feed: IFeed;
}

export default function Feed({ feed }: FeedProps) {
  let parsedContent;
  try {
    parsedContent = JSON.parse(feed.content);
  } catch (e) {
    console.error('Error parsing JSON content', e);
    parsedContent = [];
  }

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
      <Link href={`/lessonDetail/${feed.id}`} passHref>
        <div
          key={feed.id}
          className="bg-white border rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <h1 className="text-xl font-bold">{feed.title}</h1>
            {parsedContent.map(
              (item: { subtitle: string; content: string }) => (
                <div key={item.subtitle}>
                  <h4 className="font-semibold">{item.subtitle}</h4>
                  <p>{item.content}</p>
                </div>
              ),
            )}
          </div>
          {feed.images.length > 0 && (
            <div className="p-4 border-t">
              <ImageCarousel images={feed.images} />
            </div>
          )}
        </div>
      </Link>
      <ActionButtons
        like={17}
        comment={5}
        scrap={5}
        isLiked={feed.liked}
        isBookmarked={feed.bookmarked}
        postId={feed.id}
      />
    </div>
  );
}
