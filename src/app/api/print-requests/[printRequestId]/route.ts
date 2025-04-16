import { connectDB } from '@/config/db';
import PrintRequest, { IPrintRequest } from '@/models/PrintRequest';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { printRequestId: string } }) {
  try {
    await connectDB();

    const { printRequestId } = await params;
    const id = printRequestId;

    const printRequest: IPrintRequest | null = await PrintRequest.findById(id);

    if (printRequest) {
      return NextResponse.json({ printRequest: printRequest }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No print request found!' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error / GET Print Request: ', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { printRequestId: string } }) {
  try {
    await connectDB();

    const { printRequestId } = await params;
    const id = printRequestId;

    const { user, customFile, price, color, dimensions, material, quantity, status, shippingAddress, comments } =
      await req.json();

    const updatedPrintRequest: IPrintRequest | null = await PrintRequest.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    if (updatedPrintRequest) {
      return NextResponse.json({ printRequest: updatedPrintRequest }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No print request found!' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error / Update Print Request: ', e);

    return NextResponse.json({ message: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { printRequestId: string } }) {
  try {
    await connectDB();

    const { printRequestId } = await params;
    const id = printRequestId;

    const deletedPrintRequest: IPrintRequest | null = await PrintRequest.findByIdAndDelete(id);

    if (deletedPrintRequest) {
      return NextResponse.json({ message: 'Print Request deleted!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No print request found!' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error / Delete Print Request: ', e);

    return NextResponse.json({ message: e }, { status: 500 });
  }
}
