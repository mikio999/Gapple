export interface IFeed {
  id: number;
  type: string;
  authorNickname: string;
  authorThumbnailImage: string;
  createdAt: string;
  title: string;
  images: string[];
  content: string;

  liked: boolean;
  bookmarked: boolean;
}
