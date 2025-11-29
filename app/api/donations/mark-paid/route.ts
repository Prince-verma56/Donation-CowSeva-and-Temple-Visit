import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { donationId: string; razorpay_payment_id?: string; razorpayPaymentId?: string };

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
    }

    const paymentId = body.razorpay_payment_id ?? body.razorpayPaymentId ?? "";
    const { error } = await supabaseAdmin
      .from("donations")
      .update({ status: "paid", razorpay_payment_id: paymentId })
      .eq("id", body.donationId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

// TODO: Add admin panel to list and filter donations
