import { connectDB } from '@/config/db';
import { generateTrackingNumber } from '@/lib/generateTrackingNumber';
import PrintRequest, { IPrintRequest } from '@/models/PrintRequest';
import User, { IUser } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const printRequests: IPrintRequest[] = await PrintRequest.find();

    return NextResponse.json({ printRequests: printRequests }, { status: 200 });
  } catch (e) {
    console.error('Error / GET Print Requests: ', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const {
      user,
      customFile,
      price,
      color,
      dimensions,
      material,
      quantity,
      status,
      shippingAddress,
      comments,
    }: IPrintRequest = await req.json();

    if (
      !user ||
      !price ||
      !customFile ||
      !dimensions ||
      !material ||
      !color ||
      !dimensions ||
      !quantity ||
      !status ||
      !shippingAddress ||
      !comments
    ) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const userExists: IUser | null = await User.findById(user);

    if (!userExists) {
      return NextResponse.json({ message: 'User not found!' }, { status: 404 });
    }

    const trackingNumber = await generateTrackingNumber();

    const printRequest: IPrintRequest = new PrintRequest({
      user,
      customFile,
      price,
      color,
      trackingNumber,
      dimensions,
      material,
      quantity,
      status,
      shippingAddress,
      comments,
    });

    const createdPrintRequest = await printRequest.save();

    return NextResponse.json({ printRequest: createdPrintRequest }, { status: 201 });
  } catch (e) {
    console.error('Error / Create Print Request', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
