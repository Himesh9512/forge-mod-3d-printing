import { connectDB } from '@/config/db';
import User, { IUser } from '@/models/User';
import { getToken, JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token: JWT | null = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user: IUser | null = await User.findById(token.id);

    if (user) {
      return NextResponse.json({ user: user }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No user found!' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error / GET User: ', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const token: JWT | null = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, address } = await req.json();

    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      token.id,
      {
        name,
        address,
      },
      { new: true }
    );

    if (updatedUser) {
      return NextResponse.json({ user: updatedUser }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No user found!' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error / Update User: ', e);

    return NextResponse.json({ message: e }, { status: 500 });
  }
}
