"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
// 🎯 NEW: Import the icon needed for the back button
import { FaArrowLeft } from 'react-icons/fa'; 

import { getSevaBySlug } from "@/lib/sevas";
import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/overlays/LoadingOverlay";


declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: () => void;
  prefill: { name: string; email: string; contact: string };
  notes: { sevaSlug: string };
  theme: { color: string };
  modal?: { ondismiss: () => void };
};

// NOTE: Define these simple components outside the main function for better performance
const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const RazorpayIcon = () => {
  return (
    <Image
      src="/Images/icons/razorpayIcon.png"
      alt="Razorpay Logo"
      width={20}
      height={20}
      loading="lazy"
      className="ml-1 inline-block align-text-bottom"
    />
  );
};


export default function DonationPayPage() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const seva = getSevaBySlug(slug);
  const [isPaying, setIsPaying] = useState(false);

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
      if (!seva) {
        toast.error("Invalid donation option");
        return;
      }
      setIsPaying(true);
      
      const res = await fetch("/api/order", {
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
        setIsPaying(false);
        return;
      }

      const order = data.order;

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        setIsPaying(false);
        return;
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_123456789",
        amount: order.amount,
        currency: order.currency,
        name: "CowSeva",
        description: seva.name,
        order_id: order?.id ?? undefined,

        handler: function () {
          toast.success("Donation successful, thank you!");
          setIsPaying(false);
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
        modal: {
          ondismiss: () => {
            setIsPaying(false);
          },
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment initialization failed");
      setIsPaying(false);
    }
  }

  const formattedAmount = seva.amount.toLocaleString("en-IN");

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      {/* Main container with full background setup */}
      <section className="relative min-h-screen w-full flex justify-center items-center py-10 bg-[#0f172a] overflow-hidden"> 
        
        {/* 🎯 REPLACED: Button component for back navigation */}
        <div className="absolute top-40 left-4 sm:top-40 sm:left-30 z-30">
            <Button
              onClick={() => router.push('/')} // Navigate back to the home route
              aria-label="Go back to home page"
              // Apply styling for a floating, circular back button
              className="
                 px-12 py-4 h-auto w-auto rounded-full 
                bg-white text-slate-800 
                shadow-md border border-slate-200 
                transition duration-150 ease-in-out 
                hover:bg-slate-50 hover:shadow-lg hover:scale-[1.02] 
                active:scale-95
              "
              variant="outline" // Use a variant that works well with custom styling
            >
              <FaArrowLeft size={18} />
              Back
            </Button>
        </div>

        {/* 1. Background Image (Fill) */}
        <Image
          src="/Images/Backgrounds/ThankYouBg.png"
          alt="Background graphic of payment scene"
          fill
          priority={true} 
          className="object-cover object-center z-0" 
        />

        {/* 2. Whitish Opacity Overlay (Sits over the image) */}
        <div className="absolute inset-0 bg-[#ffffff]/70 z-10"></div> 

        {/* 3. Main Content Card (z-20 to be above the overlay) */}
        <div className="relative shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]
          max-w-xl mx-auto w-full bg-white rounded-xl shadow-2xl p-8 mt-25 border border-slate-100 transition duration-300 hover:shadow-3xl z-20"> 
          
          {/* Header Section: Clearer separation */}
          <div className="mb-6 pb-4 border-b border-slate-100">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
              {seva.name}
            </h1>
            <p className="text-sm font-medium text-slate-500 mb-4">
              Donation Service Details
            </p>
          </div>

          {/* Description */}
          <p className="text-base text-slate-700 mb-6 leading-snug">
            {seva.desc}
          </p>

          {/* Amount Display - Premium Highlighted Box */}
          <div className="bg-slate-50 p-5 rounded-lg mb-8 border border-slate-200 flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Total Amount
              </p>
              <p className="text-4xl font-extrabold text-slate-900 mt-1">
                ₹{formattedAmount}
              </p>
            </div>
            {/* Subtle design element */}
            <div className="text-slate-300 font-extrabold text-4xl">
              <span role="img" aria-label="Rupee Icon">₹</span>
            </div>
          </div>

          {/* Payment Button - High Contrast & Loading State */}
          <div className="mb-4">
            
            <Button
              className="w-full bg-slate-900 cursor-pointer hover:bg-slate-700 active:bg-slate-800 text-white py-4 text-xl font-bold rounded-xl transition duration-200 ease-in-out shadow-lg hover:shadow-xl focus:ring-4 focus:ring-slate-500/50 disabled:bg-slate-400"
              onClick={handlePay}
              disabled={isPaying} 
            >
              {isPaying ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner />
                  Processing Payment...
                </div>
              ) : (
                <>
                  Proceed to Payment
                </>
              )}
            </Button>
          </div>

          {/* Footer/Security Note & Razorpay Branding */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center flex justify-center items-center">
              <span className="font-semibold text-slate-600 mr-1">Secure Payment</span> via
              <span className="flex items-center ml-1 font-bold text-slate-900">
                Razorpay
                <RazorpayIcon />
              </span>
            </p>
            {/* Visual trust elements */}
            <div className="flex justify-center mt-2 space-x-2">
              <span className="text-xs text-slate-300" title="Supports Credit Card">💳</span>
              <span className="text-xs text-slate-300" title="Supports UPI">📱</span>
              <span className="text-xs text-slate-300" title="Supports Netbanking">🏦</span>
            </div>
          </div>
        </div>

        <LoadingOverlay isLoading={isPaying} />
      </section>
    </>
  );
}
