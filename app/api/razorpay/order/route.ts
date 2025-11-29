import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
// NOTE: Server envs:
// - key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
// - key_secret: process.env.RAZORPAY_KEY_SECRET

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { amount: number; sevaSlug: string; donationId?: string };

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      if (!keyId) console.error("[Razorpay] Missing NEXT_PUBLIC_RAZORPAY_KEY_ID (server env)");
      if (!keySecret) console.error("[Razorpay] Missing RAZORPAY_KEY_SECRET (server env)");
      return NextResponse.json(
        { error: "Razorpay keys not configured" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const amountInPaise = Math.max(1, Math.floor(Number(body.amount) * 100));
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `seva_${body.sevaSlug}_${Date.now()}`,
      notes: { sevaSlug: body.sevaSlug, donationId: body.donationId ?? "" },
    };

    const order = await razorpay.orders.create(options);

    if (body.donationId) {
      const supabaseAdmin = getSupabaseAdmin();
      if (supabaseAdmin) {
        await supabaseAdmin
          .from("donations")
          .update({ razorpay_order_id: order.id })
          .eq("id", body.donationId);
      }
    }

    return NextResponse.json({ order, donationId: body.donationId });
  } catch (err: any) {
    const description = (err?.error?.description as string) || "Failed to create Razorpay order";
    console.error("[Razorpay] Order creation error:", description, err?.error || err);
    return NextResponse.json({ error: description }, { status: 500 });
  }
}
