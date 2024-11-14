import { BASE_NEXT_URL } from '@/_lib/utils/config';
import axios from 'axios';

interface PostRecordData {
  attachmentId: number;
  activity_type: string;
  subject: string;
  content: string;
}

const postRecord = async (data: PostRecordData, token: string) => {
  const postData = {
    attachmentId: data.attachmentId,
    activity_type: data.activity_type,
    subject: data.subject,
    content: data.content,
  };

  try {
    const response = await axios.post(`${BASE_NEXT_URL}/api/record`, postData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting record:', error);
    throw error;
  }
};

export default postRecord;
