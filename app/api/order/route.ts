// app/api/razorpay/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { amount: number; sevaSlug: string };
    const amountInPaise = Math.max(1, Math.floor(body.amount * 100));

    const hasKeys = !!process.env.RAZORPAY_KEY_ID && !!process.env.RAZORPAY_KEY_SECRET;

    if (!hasKeys) {
      return NextResponse.json({
        mock: true,
        order: {
          id: null,
          amount: amountInPaise,
          currency: "INR",
          receipt: `seva_${body.sevaSlug}_${Date.now()}`,
          notes: { sevaSlug: body.sevaSlug },
        },
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `seva_${body.sevaSlug}_${Date.now()}`,
      notes: { sevaSlug: body.sevaSlug },
    });

    return NextResponse.json({ mock: false, order });
  } catch {
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
// TODO: Add webhook endpoint: verify signature (X-Razorpay-Signature)
// TODO: Persist successful transactions to database with donor details
// TODO: Build admin dashboard to view and reconcile donations
