import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    const { products } = await req.json(); // Receive products as an array from the request body

    if (!products || products.length === 0) {
      return NextResponse.json({ message: 'No products selected' }, { status: 400 });
    }

    // Fetch product details from Stripe and create line items
    const lineItems = await Promise.all(
      products.map(async (item: { stripeId: string; quantity: number }) => {
        const product = await stripe.products.retrieve(item.stripeId);
        return {
          price: product.default_price as string,
          quantity: item.quantity || 1,
        };
      })
    );

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e) {
    console.error('Error / Stripe Checkout Sessions: ', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
