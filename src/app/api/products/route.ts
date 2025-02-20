import { connectDB } from '@/config/db';
import Category, { ICategory } from '@/models/Category';
import Product, { IProduct } from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const products: IProduct[] = await Product.find();

    return NextResponse.json({ products: products }, { status: 200 });
  } catch (e) {
    console.error('Error / GET Products: ', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
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
    }: IProduct = await req.json();

    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !fileFormat ||
      !modelFile ||
      !thumbnail ||
      !printable ||
      !dimensions ||
      !materials ||
      !license ||
      !rating ||
      !reviews
    ) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const categoryExists: ICategory | null = await Category.findById(category);

    if (!categoryExists) {
      return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
    }

    const product: IProduct = new Product({
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
    console.error('Error / Create Product', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
