'use client';

import { useOptimistic } from 'react';
import { BASE_URL } from '@/_lib/utils/config';

interface ActionButtonsProps {
  like: number;
  comment: number;
  scrap: number;
  isLiked: boolean;
  isBookmarked: boolean;
  postId: number;
}

const ActionButtons = ({
  like,
  comment,
  scrap,
  isLiked,
  isBookmarked,
  postId,
}: ActionButtonsProps) => {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    like,
    (prevLikes: number) => (isLiked ? prevLikes - 1 : prevLikes + 1),
  );

  const [optimisticBookmark, setOptimisticBookmark] = useOptimistic(
    isBookmarked,
    (prevBookmark: boolean) => !prevBookmark,
  );

  const handleLikeToggle = async () => {
    setOptimisticLikes(isLiked ? optimisticLikes - 1 : optimisticLikes + 1);

    try {
      await fetch(`${BASE_URL}/document/like?id=${postId}`, { method: 'POST' });
    } catch (error) {
      setOptimisticLikes(isLiked ? optimisticLikes + 1 : optimisticLikes - 1);
      console.error(error);
    }
  };

  const handleBookmarkToggle = async () => {
    setOptimisticBookmark(!optimisticBookmark);

    try {
      await fetch(`${BASE_URL}/document/bookmark?id=${postId}`, {
        method: 'POST',
      });
    } catch (error) {
      setOptimisticBookmark(!optimisticBookmark);
      console.error(error);
    }
  };

  return (
    <div className={'flex text-xs items-center justify-between mt-2'}>
      <div className={'flex space-x-2'}>
        <button
          type={'button'}
          className={`flex items-center space-x-1 text-slate-600 hover:text-rose-500 ${
            optimisticLikes > like ? 'text-rose-500' : 'text-slate-600'
          }`}
          onClick={handleLikeToggle}
        >
          <span
            className={`like-icon ${
              optimisticLikes > like ? 'bg-heartRose' : 'bg-heart'
            }`}
          />
          <span>{optimisticLikes}</span>
        </button>
        <button
          type={'button'}
          className={
            'flex items-center space-x-1 text-slate-600 hover:text-blue-500'
          }
        >
          <span
            className={'w-[15px] h-[15px] bg-comment bg-cover'}
            aria-hidden={'true'}
          />
          <span>{comment}</span>
        </button>
      </div>
      <button
        type={'button'}
        className={`flex items-center space-x-1 ${
          optimisticBookmark ? 'text-yellow-500' : 'text-slate-600'
        } hover:text-yellow-500`}
        onClick={handleBookmarkToggle}
      >
        <span
          className={`bookmark-icon ${
            optimisticBookmark ? 'bg-starYellow' : 'bg-star'
          }`}
        />
        <span>{scrap}</span>
      </button>
    </div>
  );
};

export default ActionButtons;
