import { connectDB } from '@/config/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();

    return NextResponse.json({ products: products }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
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

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
    }

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
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
