export interface IProfileData {
  nickname: string;
  profileImg: string;
  level?: string;
  selfIntro?: string;
  image_file_id?: number;
}

export interface IUpdateUser {
  nickname?: string;
  selfIntro?: string;
  image_file_id?: number | undefined;
}
