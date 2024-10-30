import IComment from '@/types/comment';
import CommentItem from './CommentItem';

interface Props {
  comments: IComment[];
  onLike: (id: number) => void;
  onToggleReplies: (id: number) => void;
  onAddReply: (id: number, replyText: string) => void;
  onDeleteComment: (commentId: number) => void;
}

const CommentList = ({
  comments,
  onLike,
  onToggleReplies,
  onAddReply,
  onDeleteComment,
}: Props) => {
  return (
    <div>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onLike={onLike}
            onToggleReplies={onToggleReplies}
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
