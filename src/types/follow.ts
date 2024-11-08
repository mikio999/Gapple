import { IProfileData } from './profile';

export interface IPerson {
  email: null;
  isFollowed: boolean;
  nickname: string;
  profileImg: string;

  selfIntro: string;
  user_id: number;
}

export interface IFollowData {
  userInfo: IProfileData;
  follow: {
    number: number;
    follow_people: Array<IPerson>;
  };
  following: {
    number: number;
    following_people: Array<IPerson>;
  };
}
