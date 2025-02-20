import { connectDB } from '@/config/db';
import Category, { ICategory } from '@/models/Category';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const categories: ICategory[] = await Category.find();

    return NextResponse.json({ categories: categories }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, description } = await req.json();

    const category: ICategory = new Category({
      name,
      description,
    });

    const createdCategory = await category.save();

    return NextResponse.json({ category: createdCategory }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
