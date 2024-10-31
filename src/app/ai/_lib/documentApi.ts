import axios from 'axios';

interface DocumentResponse {
  id: number;
  title: string;
  subject: string;
  detailSubject: string;
  age: number;
  groupSize: string;
  activityType: string;
  activityGoal: string[];
  activityTool: string[];
  precautions: string[];
  evaluationCriteria: string[];
  activityContent: {
    subtitle: string;
    content: string;
  }[];
  nuriCurriculum: string | null;
  attachmentId: number | null;
  imageId: number | null;
}

export async function postDocument(
  documentData: {
    title: string;
    subject: string;
    detailSubject: string;
    age: number;
    groupSize: string;
    activityType: string;
    activityGoal: string[];
    activityTool: string[];
    precautions: string[];
    evaluationCriteria: string[];
    activityContent: {
      subtitle: string;
      content: string;
    }[];
  },
  accessToken: string,
) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post<DocumentResponse>(
      '/api/aiDocument',
      documentData,
      {
        headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to post document:', error);
    throw error;
  }
}

export async function getDocument(documentId: number, accessToken: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await axios.get<{
      status: string;
      data: DocumentResponse;
      message: string | null;
    }>(`/api/aiDocument/${documentId}`, {
      headers,
    });
    if (response.data.status !== 'success') {
      throw new Error('Failed to fetch document');
    }
    return response.data.data;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}
