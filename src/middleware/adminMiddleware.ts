import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function adminMiddleware(req: NextRequest) {
  try {
    const method = req.method;

    if (method === 'GET') {
      return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (token.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
