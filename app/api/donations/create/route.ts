import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import type { DonationRecordStatus } from "@/types/donations";
// TODO: Tighten RLS policies: restrict inserts/updates to server via service role; clients use row-scoped reads// TODO: Tighten RLS policies: restrict inserts/updates to server via service role; clients use row-scoped reads
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
    }

    const payload = {
      seva_slug: String(body.seva_slug),
      seva_name: String(body.seva_name),
      amount: Number(body.amount),
      full_name: String(body.full_name),
      email: String(body.email),
      phone: String(body.phone),
      address: body.address ?? null,
      message: body.message ?? null,
      pan_number: body.pan_number ?? null,
      country: body.country ?? null,
      status: (body.status ?? "pending") as DonationRecordStatus,
    };

    const { data, error } = await supabaseAdmin
      .from("donations")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ donationId: data.id });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
