import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getComments } from './getComments';
import postComment from './postComment';
import deleteComment from './deleteComment';
import putComment from './putComment';

export function useComments(postId: number, accessToken: string) {
  const queryClient = useQueryClient();
  const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});

  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery(['comments', postId], () => getComments(postId, accessToken));

  const toggleReplies = (commentId: number) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  type CommentData = {
    content: string;
    parentCommentId?: number;
  };

  const addCommentMutation = useMutation(
    (commentData: CommentData) => postComment(commentData, postId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', postId]);
      },
    },
  );

  const deleteCommentMutation = useMutation(
    (commentId: number) => deleteComment(commentId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', postId]);
      },
    },
  );

  const putCommentMutation = useMutation(
    ({ commentId, content }: { commentId: number; content: string }) =>
      putComment({ content }, commentId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', postId]);
      },
    },
  );

  return {
    comments,
    addComment: addCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
    putComment: putCommentMutation.mutate,
    toggleReplies,
    isLoading,
    isError,
    error,
    showReplies,
  };
}
