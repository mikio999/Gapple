import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getComments } from './getComments';
import postComment from './postComment';
import deleteComment from './deleteComment';

export function useComments(postId: number | string, accessToken: string) {
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery(['comments', postId], () => getComments(postId, accessToken));

  const addCommentMutation = useMutation(
    (newCommentText: string) =>
      postComment({ content: newCommentText }, postId, accessToken),
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

  return {
    comments,
    addComment: addCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
    isLoading,
    isError,
    error,
  };
}
