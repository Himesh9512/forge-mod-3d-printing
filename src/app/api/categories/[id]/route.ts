import { connectDB } from '@/config/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const id = await params.id;

    const category = await Category.findById(id);

    if (category) {
      return NextResponse.json({ category: category }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No category found!' }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const id = await params.id;
    const { name, description } = await req.json();

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true }
    );

    if (updatedCategory) {
      return NextResponse.json({ category: updatedCategory }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No category found!' }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const id = await params.id;

    const products = await Product.find({ category: id });

    if (products.length > 0) {
      return NextResponse.json({ message: 'Category has products, cannot delete!' }, { status: 400 });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (deletedCategory) {
      return NextResponse.json({ message: 'Category deleted!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No category found!' }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
