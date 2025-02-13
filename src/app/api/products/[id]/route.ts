import { connectDB } from '@/config/db';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const id = await params.id;

  const product = await Product.findById(id);

  if (product) {
    return NextResponse.json({ product: product }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'No product found!' }, { status: 404 });
  }
}
