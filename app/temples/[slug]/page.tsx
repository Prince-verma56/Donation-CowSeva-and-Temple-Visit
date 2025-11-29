"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

import { getTempleBySlug } from "@/lib/temples";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TempleBookingPage() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const temple = getTempleBySlug(slug);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(1);

  useEffect(() => {
    if (!temple) {
      toast.error("Invalid temple option");
      router.push("/temples");
    }
  }, [temple, router]);

  if (!temple) return null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!temple) {
        toast.error("Invalid temple option");
        return;
      }
      setSubmitting(true);
      const res = await fetch("/api/temples/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templeSlug: temple.slug,
          name,
          email,
          phone,
          date,
          people,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to submit booking");
        setSubmitting(false);
        return;
      }

      toast.success("Booking submitted");
      router.push(`/temples/${temple.slug}/booking-confirmed`);
    } catch {
      toast.error("Booking failed");
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8 mt-10">
      <h1 className="text-3xl font-semibold mb-3">{temple.name}</h1>
      <p className="text-slate-600 mb-5">{temple.location}</p>
      <p className="text-slate-700 mb-8">{temple.desc}</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-slate-600">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-slate-600">Email</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-slate-600">Phone</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-slate-600">Date</label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-slate-600">People</label>
          <Input type="number" min={1} max={10} value={people} onChange={(e) => setPeople(Number(e.target.value))} required />
        </div>

        <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 text-lg" disabled={submitting}>
          {submitting ? "Submitting..." : "Confirm Booking"}
        </Button>
      </form>

      {/* TODO: Integrate Razorpay for booking advance payment */}
      {/* TODO: Save bookings to DB with verification and admin review */}
    </div>
  );
}
