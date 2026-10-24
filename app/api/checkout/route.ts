import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { items, customer } = await request.json();

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (!stripeKey) {
    return NextResponse.json({
      success: true,
      demo: true,
      message: `Demo checkout successful for ${customer?.name || 'customer'}.`,
    });
  }

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(stripeKey);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: (items || []).map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: Number(item.quantity || 1),
    })),
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/`,
    customer_email: customer?.email || undefined,
    metadata: {
      customerName: customer?.name || '',
      address: `${customer?.address || ''}, ${customer?.city || ''} ${customer?.zip || ''}`,
    },
  });

  return NextResponse.json({ url: session.url });
}
