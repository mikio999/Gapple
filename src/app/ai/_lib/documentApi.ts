import axios from 'axios';
import { IDocumentData } from '@/types/document';

export async function postDocument(
  documentData: IDocumentData,
  accessToken: string,
) {
  try {
    const response = await axios.post('/api/aiPlan', documentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting document:', error);
    throw error;
  }
}
