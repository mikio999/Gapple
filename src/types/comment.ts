export default interface IComment {
  id: number;
  authorNickname: string;
  content: string;
  likes: number;
  replies: IComment[];
  showReplies: boolean;
  createdAt: string;
  authorThumbnailImage?: string;
}
