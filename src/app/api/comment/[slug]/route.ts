import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';

export async function POST(request: NextRequest) {
  const formData = await request.json();
  const host = request.headers.get('host');
  const url = new URL(request.url, `http://${host}`);
  const slug = url.pathname.split('/').pop();

  try {
    const response = await apiRequest(
      'post',
      `/document/comment?id=${slug}`,
      request,
      formData,
    );
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    console.error('외부 API 호출 실패:', errorMessage);
    return NextResponse.json(
      { message: errorMessage },
      {
        status: errorMessage === 'Authorization token is required' ? 401 : 500,
      },
    );
  }
}

export async function GET(req: NextRequest) {
  const host = req.headers.get('host');
  const url = new URL(req.url, `http://${host}`);
  const id = url.pathname.split('/').pop();

  try {
    const data = await apiRequest('get', `/document/comments?id=${id}`, req);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);
    console.error('외부 API 호출 실패:', errorMessage);
    return NextResponse.json(
      { message: errorMessage },
      {
        status: errorMessage === 'Authorization token is required' ? 401 : 500,
      },
    );
  }
}

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error occurred';
}
