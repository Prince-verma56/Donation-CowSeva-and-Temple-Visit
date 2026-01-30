// app/api/order/route.ts
// NOTE: Legacy/mock route. Primary flow uses app/api/razorpay/order.
// Ensure server envs (NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) are configured.
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getSupabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { amount: number; sevaSlug: string; donationId?: string };
    const amountInPaise = Math.max(1, Math.floor(body.amount * 100));

    const hasKeys = !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && !!process.env.RAZORPAY_KEY_SECRET;

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
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `seva_${body.sevaSlug}_${Date.now()}`,
      notes: { sevaSlug: body.sevaSlug },
    });

    if (body.donationId) {
      const supabaseAdmin = getSupabaseAdmin();
      if (supabaseAdmin) {
        // Update donations with Razorpay order id
        await supabaseAdmin
          .from("donations")
          .update({ razorpay_order_id: order.id })
          .eq("id", body.donationId);
      }
    }

    return NextResponse.json({ mock: false, order });
  } catch (err: any) {
    const description = (err?.error?.description as string) || "Failed to create Razorpay order";
    console.error("[Razorpay] /api/order error:", description, err?.error || err);
    return NextResponse.json({ error: description }, { status: 500 });
  }
}


const config = {
  runtime: "edge",
};

