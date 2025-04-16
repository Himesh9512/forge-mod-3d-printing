import { connectDB } from '@/config/db';
import Product, { IProduct } from '@/models/Product';
import Review, { IReview } from '@/models/Review';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { reviewId: string } }) {
  try {
    await connectDB();

    const { reviewId } = await params;
    const id = reviewId;

    const review: IReview | null = await Review.findById(id);

    if (review) {
      return NextResponse.json({ review: review }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No review found!' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error / GET Review: ', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { reviewId: string } }) {
  try {
    await connectDB();

    const { reviewId } = await params;
    const id = reviewId;
    const { rating, comment } = await req.json();

    const updatedReview: IReview | null = await Review.findByIdAndUpdate(
      id,
      {
        rating,
        comment,
      },
      { new: true }
    );

    if (updatedReview) {
      return NextResponse.json({ review: updatedReview }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No review found!' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error / Update Review: ', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { reviewId: string } }) {
  try {
    await connectDB();

    const { reviewId } = await params;
    const id = reviewId;

    const deletedReview: IReview | null = await Review.findByIdAndDelete(id);

    const product: IProduct | null = await Product.findById(deletedReview?.product);

    if (product && deletedReview) {
      const reviewIndex: number = product.reviews.findIndex(
        (review) => review.toString() === deletedReview.id.toString()
      );

      if (reviewIndex !== -1) {
        product.reviews.splice(reviewIndex, 1);
      }

      await Product.findByIdAndUpdate(product?.id, product);
    }

    if (deletedReview) {
      return NextResponse.json({ message: 'Review deleted!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No review found!' }, { status: 404 });
    }
  } catch (e) {
    console.error('Error / Delete Review: ', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
