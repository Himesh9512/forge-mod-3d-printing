import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    const { searchParams } = new URL(req.url);

    const product = await stripe.products.retrieve(searchParams.get('stripeId') as string);

    const priceId = product.default_price || '';

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId as string,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    return NextResponse.redirect(session.url as string, 303);
  } catch (e) {
    console.error('Error / Stripe Checkout Sessions: ', e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
