'use client';

import Image from 'next/image';
import IComment from '@/types/comment';
import formatRelativeTime from '@/app/(main)/_lib/formatRelativeTime';

interface ReplyItemProps {
  reply: IComment;
  onDeleteComment?: (id: number) => void;
}

const ReplyItem = ({ reply, onDeleteComment }: ReplyItemProps) => {
  console.log(reply);

  return (
    <div className={'p-2 my-2'}>
      <div className={'flex items-center space-x-4 justify-between'}>
        <div className={'flex'}>
          {reply.authorThumbnailImage && (
            <Image
              width={100}
              height={100}
              src={reply.authorThumbnailImage}
              alt={reply.authorNickname}
              className={
                'w-10 h-10 rounded-full object-cover border-2 border-white shadow-md'
              }
            />
          )}
          <div className={'mx-4'}>
            <p className={'text-sm font-semibold'}>{reply.authorNickname}</p>
            <p className={'text-xs text-slate-400'}>
              {formatRelativeTime(reply.createdAt)}
            </p>
          </div>
        </div>

        {reply.isMyComment && onDeleteComment && (
          <button
            type={'button'}
            onClick={() => onDeleteComment(reply.id)}
            className={
              'ml-auto text-slate-400 hover:text-red-700 py-2 px-4 rounded'
            }
          >
            {'×'}
          </button>
        )}
      </div>
      <p className={'text-sm my-2'}>{reply.content}</p>
    </div>
  );
};

export default ReplyItem;
