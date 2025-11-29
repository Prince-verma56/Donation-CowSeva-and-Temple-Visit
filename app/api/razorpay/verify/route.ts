import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabaseServer";

type VerifyBody = {
  donationId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as VerifyBody;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Razorpay secret not configured" }, { status: 500 });
    }

    const data = `${body.razorpay_order_id}|${body.razorpay_payment_id}`;
    const expectedSignature = crypto.createHmac("sha256", secret).update(data).digest("hex");

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
    }

    if (expectedSignature !== body.razorpay_signature) {
      await supabaseAdmin
        .from("donations")
        .update({ status: "failed" })
        .eq("id", body.donationId);
      // TODO: Add dedicated /payment-failed page and redirect
      // TODO: Log verification attempts for auditing
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 401 });
    }

    // Optionally set order id if not stored yet
    const { data: existing } = await supabaseAdmin
      .from("donations")
      .select("razorpay_order_id")
      .eq("id", body.donationId)
      .single();

    const updatePayload: Record<string, any> = {
      status: "paid",
      razorpay_payment_id: body.razorpay_payment_id,
    };
    if (!existing?.razorpay_order_id) {
      updatePayload.razorpay_order_id = body.razorpay_order_id;
    }

    const { error } = await supabaseAdmin
      .from("donations")
      .update(updatePayload)
      .eq("id", body.donationId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Razorpay] Verify error:", err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
