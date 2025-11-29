// app/api/razorpay/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_SECRET ? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID : undefined;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { amount: number; sevaSlug: string };

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: "Razorpay keys not configured" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: body.amount * 100,        // convert to paise
      currency: "INR",
      receipt: `seva_${body.sevaSlug}_${Date.now()}`,
      notes: {
        sevaSlug: body.sevaSlug,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ order });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
