"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { FaArrowLeft } from 'react-icons/fa';
import { HeartHandshake, ShieldCheck } from "lucide-react"; 

import { getSevaBySlug } from "@/lib/sevas"; // Assuming this is correct
import { Button } from "@/components/ui/button";
import { DonorForm } from "@/components/donations/DonorForm"; // Assuming this handles the Razorpay initiation
import { LoadingOverlay } from "@/components/overlays/LoadingOverlay";

// NOTE: Define these simple components outside the main function for better performance
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

  const formattedAmount = seva.amount.toLocaleString("en-IN");

  return (
    <>
      {/* SEO: Razorpay script loading */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      {/* Main Container: Centered, reduced vertical padding on the section */}
      <section className="relative min-h-screen w-full flex justify-center items-center py-6 md:py-8 bg-gray-50 overflow-hidden ">
        
        {/* Back Button (Floating outside the main card) */}
        <div className="absolute top-4 left-4 z-30">
          <Button
            onClick={() => router.push('/')}
            aria-label="Go back to home page"
            className="
              h-10 px-4 rounded-full 
              bg-white text-slate-700 
              shadow-md border border-slate-200 
              transition duration-150 ease-in-out 
              hover:bg-slate-100 hover:shadow-lg
            "
            variant="outline" 
          >
            <FaArrowLeft size={14} className="mr-2" />
            Back
          </Button>
        </div>

        {/* 1. Background Image (Fill) - Kept */}
        <Image
          src="/Images/Backgrounds/ThankYouBg.png"
          alt="Background graphic of payment scene"
          fill
          priority={true} 
          className="object-cover object-center z-0 opacity-20"
        />

        {/* 2. Main Content Card (CENTERED, TWO-COLUMN, NO FIXED MIN-HEIGHT) */}
        <div className="relative z-20 mx-4 w-full max-w-4xl 
                        grid grid-cols-1 md:grid-cols-5 
                        bg-white rounded-3xl shadow-2xl overflow-hidden 
                        h-auto transition duration-300 mt-20"> {/* h-auto ensures fit */}
          
          {/* ============================================== */}
          {/* LEFT SECTION: FORM & TEXT (Condensed Padding) */}
          {/* ============================================== */}
          <div className="md:col-span-3 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
            
            {/* Top Content (Header, Amount, Form) */}
            <div>
              {/* Header (Condensed spacing) */}
              <header className="mb-4 pb-3 border-b border-amber-100">
                <h1 className="flex items-center text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
                  <HeartHandshake className="w-6 h-6 mr-2 text-amber-600" />
                  Complete Your Seva
                </h1>
                <h2 className="text-lg font-semibold text-gray-700">{seva.name}</h2>
                <p className="text-xs font-medium text-slate-500 mt-1">{seva.desc}</p>
              </header>

              {/* Amount Display (Condensed padding/font size) */}
              <div className="bg-amber-50 p-4 rounded-xl mb-4 border border-amber-200 flex justify-between items-center shadow-inner">
                <div>
                  <p className="text-sm font-semibold text-amber-800 uppercase tracking-wider">
                    Total Donation
                  </p>
                  <p className="text-3xl font-extrabold text-amber-900 mt-0.5">
                    ₹{formattedAmount}
                  </p>
                </div>
                <div className="text-amber-300 font-extrabold text-4xl">
                  <span role="img" aria-label="Rupee Icon">₹</span>
                </div>
              </div>

              {/* Donor Form */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-slate-600" />
                  Donor Details
                </h3>
                <DonorForm seva={seva} onLoadingChange={setIsPaying} />
              </div>
            </div>

            {/* Footer/Security Note & Razorpay Branding (Condensed top padding) */}
            <div className="pt-3 border-t border-slate-100 mt-auto">
              <p className="text-xs font-medium text-slate-600 text-center mb-2">
                Your contribution directly funds the {seva.name} program.
              </p>
              <div className="flex justify-center items-center">
                <p className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-600 mr-1">Secure Payment</span> via
                </p>
                <span className="flex items-center ml-1 font-bold text-slate-900">
                  Razorpay
                  <RazorpayIcon />
                </span>
              </div>
            </div>
          </div>

          {/* ============================================== */}
          {/* RIGHT SECTION: IMAGE */}
          {/* ============================================== */}
          <div className="relative md:col-span-2 min-h-[200px] md:min-h-full bg-amber-50/50 hidden md:block">
            <Image
              src={seva.image || "/Images/Payment/default-donation-image.png"}
              alt={`Illustration for the ${seva.name} donation option.`}
              fill
              sizes="40vw"
              className="object-cover object-center rounded-r-3xl"
              priority={false} 
            />
            {/* Aesthetic overlay for depth */}
            <div className="absolute inset-0 bg-amber-900/10 backdrop-brightness-75"></div>

            {/* Promotional text overlay */}
            <div className="absolute bottom-6 left-0 right-0 p-4 text-white text-center z-10">
              <p className="text-xl font-bold tracking-tight mb-1">
                Saving Lives, Securing Futures
              </p>
              <p className="text-xs font-light opacity-80">
                Your immediate digital Seva ensures crucial medical and shelter support.
              </p>
            </div>
          </div>

        </div>

        <LoadingOverlay isLoading={isPaying} />
      </section>
    </>
  );
}