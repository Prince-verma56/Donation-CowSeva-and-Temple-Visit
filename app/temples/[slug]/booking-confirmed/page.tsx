// app/temples/[slug]/booking-confirmed/page.tsx
import Link from "next/link";

type PageProps = { params: { slug: string } };

export default function TempleBookingConfirmedPage({ params }: PageProps) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8 mt-10 text-center">
      <h1 className="text-3xl font-semibold mb-3">Booking Confirmed</h1>
      <p className="text-slate-700 mb-6">
        Your VIP darshan request for <span className="font-semibold">{params.slug}</span> has been received.
      </p>
      <p className="text-slate-600 mb-8">
        We will reach out shortly with schedule and verification details.
      </p>
      <Link href="/temples" className="inline-block">
        <span className="rounded-md bg-slate-900 text-white px-6 py-3">Back to Temples</span>
      </Link>
    </div>
  );
}
