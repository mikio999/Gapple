import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';
import extractUrlId from '@/_lib/utils/extractUrlId';
import extractErrorMessage from '@/_lib/utils/extractErrorMessage';

export async function POST(request: NextRequest) {
  const { id } = extractUrlId(request);
  const formData = await request.json();
  console.log('fdfdfdf');
  console.log(formData);
  try {
    const response = await apiRequest(
      'post',
      `/document/like?id=${id}`,
      request,
      formData,
    );
    console.log(response);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    console.error('좋아요 API 호출 실패:', errorMessage);
    return NextResponse.json(
      { message: errorMessage },
      {
        status: errorMessage === 'Authorization token is required' ? 401 : 500,
      },
    );
  }
}
