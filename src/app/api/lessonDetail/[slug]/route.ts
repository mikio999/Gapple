import { apiRequest } from '@/_lib/utils/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.split(' ')[1];
  console.log(req);
  const url = new URL(req.url, `http://${req.headers.host}`);
  const slug = url.pathname.split('/').pop();

  if (!accessToken) {
    return NextResponse.json(
      { message: 'Authorization token is required' },
      { status: 401 },
    );
  }

  try {
    const data = await apiRequest(
      `/document/detail/plan?document_id=${slug}`,
      accessToken,
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
