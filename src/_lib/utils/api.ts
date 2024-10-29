import axios from 'axios';
import { BASE_URL } from '@/_lib/utils/config';

export async function apiRequest(endpoint: string, token: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, { headers });
    return response.data;
  } catch (error) {
    console.error(`API 호출 실패: ${endpoint}`, error);
    throw new Error('API request failed');
  }
}
