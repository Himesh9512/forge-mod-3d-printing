import { connectDB } from '@/config/db';
import Product, { IProduct } from '@/models/Product';
import Review from '@/models/Review';
import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { productId: string } }) {
  try {
    await connectDB();

    const id: string = await params.productId;

    const product: IProduct | null = await Product.findById(id).populate('reviews');

    if (product) {
      return NextResponse.json({ product: product }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No product found!' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error / GET Product: ', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { productId: string } }) {
  try {
    await connectDB();

    const id: string = await params.productId;
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

    const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    if (updatedProduct) {
      return NextResponse.json({ product: updatedProduct }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No product found!' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error / Update Product: ', e);

    return NextResponse.json({ message: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { productId: string } }) {
  try {
    await connectDB();

    const id: string = await params.productId;

    const deletedProduct: IProduct | null = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      if (deletedProduct.reviews.length > 0) {
        await Promise.all(deletedProduct.reviews.map((review: Types.ObjectId) => Review.findByIdAndDelete(review)));
      }
    }

    if (deletedProduct) {
      return NextResponse.json({ message: 'Product deleted!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No product found!' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error / Delete Product: ', e);

    return NextResponse.json({ message: e }, { status: 500 });
  }
}
