import axios from 'axios';

const postComment = async (
  commentData: {
    content: string;
  },
  id: number,
  accessToken: string,
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post(`/api/comment/${id}`, commentData, {
      headers,
    });
    console.log('=====res=====');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('코멘트 제출 실패:', error);
    throw error;
  }
};

export default postComment;
