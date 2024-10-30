import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@/_lib/utils/api';
import extractUrlId from '@/_lib/utils/extractUrlId';

export async function POST(request: NextRequest) {
  const { id } = extractUrlId(request);
  const formData = await request.json();

  try {
    const response = await apiRequest(
      'post',
      `/document/comment?id=${id}`,
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
  const { id } = extractUrlId(req);

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

export async function DELETE(req: NextRequest) {
  const { id } = extractUrlId(req);

  try {
    const response = await apiRequest(
      'delete',
      `/document/comment?id=${id}`,
      req,
    );
    return NextResponse.json(
      { message: 'Comment deleted successfully' },
      { status: 200 },
    );
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

export async function PUT(req: NextRequest) {
  const { id } = extractUrlId(req);
  const formData = await req.json();

  try {
    const response = await apiRequest(
      'put',
      `/document/comment?id=${id}`,
      req,
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

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error occurred';
}
