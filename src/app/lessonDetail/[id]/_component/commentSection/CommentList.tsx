import IComment from '@/types/comment';
import CommentItem from './CommentItem';

interface Props {
  comments: IComment[];
  onLike: (id: number) => void;
  toggleReplies: (id: number) => void;
  onAddReply: (id: number, replyText: string) => void;
  onDeleteComment: (commentId: number) => void;
  showReplies: Record<number, boolean>;
}

const CommentList = ({
  comments,
  onLike,
  toggleReplies,
  showReplies,
  onAddReply,
  onDeleteComment,
}: Props) => {
  const topLevelComments = comments?.filter((c) => !c.parentCommentId);

  return (
    <div>
      {topLevelComments?.length > 0 ? (
        topLevelComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={comments.filter((c) => c.parentCommentId === comment.id)}
            onLike={onLike}
            toggleReplies={toggleReplies}
            showReplies={showReplies[comment.id]}
            onAddReply={onAddReply}
            onDeleteComment={onDeleteComment}
          />
        ))
      ) : (
        <div>{'댓글이 없습니다'}</div>
      )}
    </div>
  );
};

export default CommentList;
