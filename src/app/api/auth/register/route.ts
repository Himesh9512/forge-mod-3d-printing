import { connectDB } from '@/config/db';
import User, { IUser } from '@/models/User';
import { hash } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Please fill all fields' }, { status: 400 });
    }

    const existingUser: IUser | null = await User.findOne({ email: email });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword: string = await hash(password, 10);

    const otherData = {
      role: 'customer',
      address: [
        {
          street: '',
          city: '',
          state: '',
          zip: '',
          country: '',
        },
      ],
      purchasedModels: [],
    };

    const user = new User({
      name,
      email,
      password: hashedPassword,
      ...otherData,
    });

    await user.save();

    return NextResponse.json({ message: 'Registration was successful!' }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
