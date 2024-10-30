'use client';

import CommentList from './CommentList';
import NewCommentInput from './CommentInput';
import { useComments } from '@/app/lessonDetail/_lib/useComments';

interface CommentProps {
  postId: number;
  accessToken: string;
  params: number | string;
}

const CommentSection = ({ postId, accessToken, params }: CommentProps) => {
  const { comments, addComment, deleteComment } = useComments(
    postId,
    accessToken,
  );

  const handleToggleReplies = (id: number | string) => {
    console.log('토글됨');
  };

  const handleAddReply = (commentId: number, replyText: string) => {
    console.log('답글 달기');
  };

  const handleLike = (id: number) => {
    console.log('좋아요');
  };

  return (
    <div className={'bg-white shadow-md rounded-lg p-4 mt-4'}>
      <h3 className={'text-lg font-semibold mb-4'}>{'댓글'}</h3>
      <CommentList
        comments={comments?.data}
        onLike={handleLike}
        onToggleReplies={handleToggleReplies}
        onAddReply={handleAddReply}
        onDeleteComment={deleteComment}
      />
      <NewCommentInput onAddComment={addComment} />
    </div>
  );
};

export default CommentSection;
