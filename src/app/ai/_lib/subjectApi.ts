import axios from 'axios';

interface SubjectResponse {
  id: number;
  age: number;
  groupSize: string;
  subject: string;
  activityType: string;
  createdAt: string;
}

export async function postSubject(
  subjectData: {
    age: number;
    groupSize: string;
    subject: string;
    activityType: string;
  },
  accessToken: string,
) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post<SubjectResponse>(
      '/api/aiSubject',
      subjectData,
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to post subject:', error);
    throw error;
  }
}
