import axios, { AxiosRequestConfig } from 'axios';
import { NextRequest } from 'next/server';
import { BASE_URL } from '@/_lib/utils/config';

export async function apiRequest(
  method: 'get' | 'post' | 'delete' | 'patch' | 'put',
  endpoint: string,
  request: NextRequest,
  data?: any,
  contentType?: string,
) {
  const accessToken = request.headers.get('authorization')?.split(' ')[1];
  if (!accessToken) {
    throw new Error('Authorization token is required');
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
  };

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  const options: AxiosRequestConfig = {
    method,
    headers,
    url: `${BASE_URL}${endpoint}`,
    data,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(`API 호출 실패: ${endpoint}`, error);
    throw new Error('API request failed');
  }
}
