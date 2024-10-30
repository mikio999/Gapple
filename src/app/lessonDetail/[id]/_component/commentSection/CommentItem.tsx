import { useState } from 'react';
import Image from 'next/image';
import IComment from '@/types/comment';
import LikeButton from './LikeButton';
import ReplyItem from './ReplyItem';
import formatRelativeTime from '@/app/(main)/_lib/formatRelativeTime';

interface Props {
  comment: IComment;
  replies: IComment[];
  onLike: (id: number) => void;
  toggleReplies: (id: number) => void;
  showReplies: boolean;
  onAddReply: ({
    content,
    parentCommentId,
  }: {
    content: string;
    parentCommentId?: number;
  }) => void;
  onDeleteComment?: (id: number) => void;
}

const CommentItem = ({
  comment,
  replies,
  onLike,
  toggleReplies,
  showReplies,
  onAddReply,
  onDeleteComment,
}: Props) => {
  const [replyText, setReplyText] = useState('');

  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(event.target.value);
  };

  const submitReply = () => {
    if (replyText.trim()) {
      onAddReply({ content: replyText, parentCommentId: comment.id });
      setReplyText('');
    }
  };

  return (
    <div className={'bg-slate-100 rounded-lg p-4 my-4'}>
      <div className={'flex items-center space-x-4 justify-between'}>
        <div className={'flex'}>
          {comment.authorThumbnailImage && (
            <Image
              width={100}
              height={100}
              src={comment.authorThumbnailImage}
              alt={comment.authorNickname}
              className={
                'w-10 h-10 rounded-full object-cover border-2 border-white shadow-md'
              }
            />
          )}
          <div className={'mx-4'}>
            <p className={'text-sm font-semibold'}>{comment.authorNickname}</p>
            <p className={'text-xs text-slate-400'}>
              {formatRelativeTime(comment.createdAt)}
            </p>
          </div>
        </div>

        {comment.isMyComment && onDeleteComment && (
          <button
            type={'button'}
            onClick={() => onDeleteComment(comment.id)}
            className={
              'ml-auto text-slate-400 hover:text-red-700 py-2 px-4 rounded'
            }
          >
            {'×'}
          </button>
        )}
      </div>
      <p className={'text-sm my-2'}>{comment.content}</p>
      <div className={'flex items-center space-x-4'}>
        <LikeButton count={comment.likes} onLike={() => onLike(comment.id)} />
        <button
          type={'button'}
          onClick={() => toggleReplies(comment.id)}
          className={'text-blue-600 hover:text-blue-800'}
        >
          {comment.showReplies ? '답글 숨기기' : '답글 보기'}
        </button>
      </div>

      {showReplies && (
        <>
          {replies.length > 0 && (
            <div className={'ml-6 mt-2 bg-slate-200 rounded-lg p-2'}>
              {replies.map((reply) => (
                <ReplyItem
                  key={reply.id}
                  reply={reply}
                  onDeleteComment={onDeleteComment}
                />
              ))}
            </div>
          )}
          <div className={'flex mt-4'}>
            <input
              type={'text'}
              className={
                'shadow border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline'
              }
              placeholder={'답글'}
              value={replyText}
              onChange={handleReplyChange}
            />
            <button
              type={'button'}
              className={`bg-purple-500 hover:bg-purple-700 text-white text-sm whitespace-nowrap py-2 px-4 rounded ml-2 ${
                replyText.trim() ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={submitReply}
              disabled={!replyText.trim()}
            >
              {'등록'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentItem;
