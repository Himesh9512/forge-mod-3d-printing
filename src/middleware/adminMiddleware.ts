import { connectDB } from '@/config/db';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function adminMiddleware(req: NextRequest) {
  try {
    await connectDB();

    const method = req.method;

    if (method === 'GET') {
      return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(token.id);

    if (user.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
