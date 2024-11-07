import axios from 'axios';

interface ProfileResponse {
  nickname: string;
  selfIntro: string;
  image_file_id: number;
}

const putProfile = async (
  profileData: {
    nickname: string;
    selfIntro: string;
    image_file_id: number;
  },
  accessToken: string,
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.put<ProfileResponse>(
      `/api/profile/putProfile`,
      profileData,
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error('프로필 수정 실패:', error);
    throw error;
  }
};

export default putProfile;
