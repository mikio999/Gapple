'use client';

import { useComments } from '@/app/lessonDetail/_lib/useComments';
import CommentList from './CommentList';
import NewCommentInput from './CommentInput';

interface CommentProps {
  postId: number;
  accessToken: string;
}

const CommentSection = ({ postId, accessToken }: CommentProps) => {
  const {
    comments,
    addComment,
    deleteComment,
    toggleReplies,
    showReplies,
    putComment,
  } = useComments(postId, accessToken);

  const handleLike = (id: number) => {
    console.log(id, '좋아요');
  };

  return (
    <div className={'bg-white shadow-md rounded-lg p-4 mt-4'}>
      <h3 className={'text-lg font-semibold mb-4'}>{'댓글'}</h3>
      <CommentList
        comments={comments?.data}
        onLike={handleLike}
        toggleReplies={toggleReplies}
        showReplies={showReplies}
        onAddReply={addComment}
        onDeleteComment={deleteComment}
        onEditComment={putComment}
      />
      <NewCommentInput onAddComment={addComment} />
    </div>
  );
};

export default CommentSection;
