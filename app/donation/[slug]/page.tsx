"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getSevaBySlug } from "@/lib/sevas";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type PageProps = {
  params: { slug: string };
};

export default function DonationPayPage({ params }: PageProps) {
  const router = useRouter();
  const seva = getSevaBySlug(params.slug);

  // If wrong slug, redirect to home
  useEffect(() => {
    if (!seva) {
      toast.error("Invalid donation option");
      router.push("/");
    }
  }, [seva, router]);

  if (!seva) return null;

  async function handlePay() {
    try {
      // 1. Create Razorpay order from backend
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: seva.amount,
          sevaSlug: seva.slug,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create order");
        return;
      }

      const order = data.order;

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      // 2. Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "CowSeva",
        description: seva.name,
        order_id: order.id,

        handler: function (response: any) {
          // This runs after successful payment
          console.log("Razorpay success:", response);
          toast.success("Donation successful, thank you!");
          router.push("/thank-you");
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        notes: {
          sevaSlug: seva.slug,
        },

        theme: {
          color: "#0f172a",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment initialization failed");
    }
  }

  return (
    <>
      {/* Razorpay script loader */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8 mt-10">
        <h1 className="text-3xl font-semibold mb-3">{seva.name}</h1>
        <p className="text-slate-600 mb-5">{seva.desc}</p>

        <p className="text-xl font-bold mb-8">
          Amount: ₹{seva.amount.toLocaleString("en-IN")}
        </p>

        <Button
          className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 text-lg"
          onClick={handlePay}
        >
          Pay with Razorpay
        </Button>

        <p className="text-xs text-slate-400 mt-3 text-center">
          Secure payment powered by Razorpay
        </p>
      </div>
    </>
  );
}
