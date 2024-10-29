'use client';

import { useEffect, useState } from 'react';
import IComment from '@/types/comment';
import CommentList from './CommentList';
import NewCommentInput from './CommentInput';
import postComment from '@/app/lessonDetail/_lib/postComment';

interface CommentProps {
  postId: number;
  accessToken: string;
  initialComments: IComment[];
}

const CommentSection = ({
  postId,
  accessToken,
  initialComments,
}: CommentProps) => {
  const [comments, setComments] = useState<IComment[]>(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleAddComment = async (text: string) => {
    try {
      const newCommentData = await postComment(
        { content: text },
        postId,
        accessToken,
      );
      const newComment = { ...newCommentData, replies: [], showReplies: false };
      setComments([...comments, newComment]);
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  const handleToggleReplies = (id) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, showReplies: !comment.showReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleAddReply = (commentId, replyText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const newReply = {
          id: comment.replies.length + 1,
          author: 'Anonymous',
          text: replyText,
          likes: 0,
          replies: [],
          showReplies: true,
        };
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div className={'bg-white shadow-md rounded-lg p-4 mt-4'}>
      <h3 className={'text-lg font-semibold mb-4'}>{'댓글'}</h3>
      <CommentList
        comments={comments}
        onToggleReplies={handleToggleReplies}
        onAddReply={handleAddReply}
      />
      <NewCommentInput onAddComment={handleAddComment} />
    </div>
  );
};

export default CommentSection;
