import { connectDB } from '@/config/db';
import Category, { ICategory } from '@/models/Category';
import Product, { IProduct } from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (page < 1 || limit < 1) {
      return NextResponse.json({ message: 'Invalid page or limit' }, { status: 400 });
    }

    const skip = (page - 1) * limit;
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const products: IProduct[] = await Product.find().skip(skip).limit(limit);

    return NextResponse.json(
      { products: products, pagination: { totalProducts, totalPages, currentPage: page, pageSize: limit } },
      { status: 200 }
    );
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
      !license
    ) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const categoryExists: ICategory | null = await Category.findById(category);

    if (!categoryExists) {
      return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
    }

    const stripeProduct = await stripe.products.create({
      name: name,
      description: description,
      default_price_data: {
        currency: 'usd',
        unit_amount_decimal: (price * 100).toString(),
      },
      unit_label: 'unit',
    });

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
      stripeId: stripeProduct.id,
      reviews,
    });

    const createdProduct = await product.save();

    return NextResponse.json({ product: createdProduct }, { status: 201 });
  } catch (e) {
    console.error('Error / Create Product', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
