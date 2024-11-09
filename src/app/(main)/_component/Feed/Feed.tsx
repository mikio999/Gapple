import Link from 'next/link';
import Image from 'next/image';
import ActionButtons from '@/_component/Item/ActionButtons';
import { IFeed } from '@/types/feed';
import ImageCarousel from './ImageCarousel';
import formatRelativeTime from '../../_lib/formatRelativeTime';

interface FeedProps {
  feed: IFeed;
}

export default function Feed({ feed }: FeedProps) {
  return (
    <div
      className={
        'mx-auto my-4 max-w-xs tablet:max-w-sm laptop:max-w-md desktop:max-w-lg font-pretendard'
      }
    >
      <Link href={`/profile/${feed.authorId}/plan`}>
        <div className={'flex items-center mb-4'}>
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
          <div className={'ml-2'}>
            <strong>{feed.authorNickname}</strong>
            <span className={'text-slate-600'}>
              {'의'}
              <strong className={'text-primary ml-1'}>
                {feed.type === 'PLAN' ? '교육계획안' : '기록'}
              </strong>
              {'이 올라왔어요!'}
            </span>
            <div className={'text-slate-500 text-xs'}>
              {formatRelativeTime(feed.createdAt)}
            </div>
          </div>
        </div>
      </Link>
      <div
        key={feed.id}
        className={
          'bg-slate-200 shadow-md rounded-lg overflow-hidden cursor-pointer'
        }
      >
        <div className={'p-4'}>
          <Link href={`/lessonDetail/${feed.id}`} passHref>
            <h1 className={'text-xl font-bold'}>{feed.title}</h1>
          </Link>
          <div className={'flex desktop:flex-row flex-col mt-2'}>
            <div className={'flex'}>
              <span
                className={
                  'text-white bg-slate-700 px-3 py-1 mr-2 rounded-full font-light'
                }
              >
                {feed.age} {'세'}
              </span>
              <span
                className={
                  'text-white bg-slate-700 px-3 py-1 mr-2 rounded-full font-light'
                }
              >
                {feed.activity_type}
              </span>
            </div>
            <div>
              <span
                className={
                  'text-white bg-slate-700 px-3 py-1 rounded-full font-light desktop:mt-0 mt-2'
                }
                style={{ display: 'inline-block' }}
              >
                {feed.subject}
              </span>
            </div>
          </div>
        </div>
        {feed.images && feed.images.length > 0 && (
          <div className={'px-4 py-0 border-t z-10'}>
            <ImageCarousel images={feed.images} />
          </div>
        )}
        <div className={'flex items-center py-1 pl-4 mt-2'}>
          <Image
            src={'/icons/idea.png'}
            width={20}
            height={20}
            alt={'idea'}
            className={'flex justify-center w-4 h-4 mr-1'}
          />
          <div className={'text-sm text-slate-800 font-medium'}>
            {feed.activity_goal}
          </div>
        </div>
        <Link href={`/lessonDetail/${feed.id}`} passHref>
          <ul className={'px-4 py-2'}>
            {feed.content_subtitles?.map((subtitle, index) => (
              <li
                key={subtitle}
                className={'flex items-center text-slate-700 text-sm mb-1'}
              >
                <div
                  className={
                    'flex justify-center items-center text-slate-400 w-4 h-4 rounded-full mr-2'
                  }
                >
                  {index + 1}
                </div>
                {subtitle}
              </li>
            ))}
          </ul>
          <span
            className={
              'flex justify-end mr-4 text-slate-600 hover:text-slate-400'
            }
          >
            {'...더보기'}
          </span>
        </Link>
        <div className={'px-4 pb-2'}>
          <ActionButtons
            like={feed.liked_count}
            comment={feed.comments.length}
            scrap={feed.bookmark_count}
            isLiked={feed.liked}
            isBookmarked={feed.bookmarked}
            postId={feed.id}
          />
        </div>

        {feed.comments.length > 0 && (
          <div className={'px-4 py-2'}>
            {feed.comments.map((comment) => (
              <div
                key={comment.id}
                className={'mt-2 p-2 bg-slate-100 rounded-lg shadow'}
              >
                <div className={'flex items-center space-x-3'}>
                  <div
                    className={'w-8 h-8 rounded-full'}
                    style={{
                      backgroundImage: `url(${comment.authorThumbnailImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div>
                    <div className={'flex items-center'}>
                      <strong>{comment.authorNickname}</strong>
                      <div className={'text-slate-500 text-xs ml-2'}>
                        {formatRelativeTime(comment.createdAt)}
                      </div>
                    </div>
                    <div className={'text-slate-600 text-sm'}>
                      {comment.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
