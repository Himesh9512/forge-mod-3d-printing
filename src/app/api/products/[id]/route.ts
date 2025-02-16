import { connectDB } from '@/config/db';
import Product from '@/models/Product';
import Review from '@/models/Review';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const id = await params.id;

    const product = await Product.findById(id);

    if (product) {
      return NextResponse.json({ product: product }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No product found!' }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const id = await params.id;
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

    const updatedProduct = await Product.findByIdAndUpdate(
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
    return NextResponse.json({ message: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const id = await params.id;

    await Review.deleteMany({ product: id });

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      return NextResponse.json({ message: 'Product deleted!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No product found!' }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
