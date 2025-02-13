import { connectDB } from '@/config/db';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  const products = await Product.find();

  return NextResponse.json({ products: products }, { status: 200 });
}

export async function POST(req: NextRequest) {
  await connectDB();

  const {
    name,
    price,
    description,
    category,
    fileFormat,
    modelFile,
    thumbnail,
    printable,
    dimensions,
    materials,
    license,
    rating,
    reviews,
  } = await req.json();

  const product = new Product({
    name,
    description,
    price,
    category,
    fileFormat,
    modelFile,
    thumbnail,
    printable,
    dimensions,
    materials,
    license,
    rating,
    reviews,
  });

  const createdProduct = await product.save();

  return NextResponse.json({ product: createdProduct }, { status: 201 });
}
