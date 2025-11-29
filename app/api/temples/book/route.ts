import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // TODO: save temple booking to DB
    // TODO: notify admin dashboard
    return NextResponse.json({ success: true, booking: body });
  } catch {
    return NextResponse.json({ error: "Invalid booking payload" }, { status: 400 });
  }
}

