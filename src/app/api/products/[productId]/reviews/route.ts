import { connectDB } from '@/config/db';
import Product, { IProduct } from '@/models/Product';
import Review, { IReview } from '@/models/Review';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { productId: string } }) {
  try {
    await connectDB();

    const productId: string = params.productId;
    const { rating, comment } = await req.json();

    // check if product exists or not
    const product: IProduct | null = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ message: 'Product not found!' }, { status: 404 });
    }

    // create review and update the product with review
    const review: IReview = new Review({
      product: params.productId,
      rating,
      comment,
    });

    const createdReview = await review.save();

    await Product.findByIdAndUpdate(productId, { reviews: [...product.reviews, createdReview._id] });

    return NextResponse.json({ review: createdReview }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
