"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { CreateDonationPayload } from "@/types/donations";
import { useRouter } from "next/navigation";
import { Lock, CreditCard } from "lucide-react"; // Added CreditCard icon for payment button

type Seva = {
  slug: string;
  name: string;
  amount: number;
  desc?: string;
  image?: string; 
};

type DonorFormProps = {
  seva: Seva;
  onLoadingChange?: (loading: boolean) => void;
};

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(8, "Phone is required"),
  address: z.string().optional(),
  message: z.string().optional(),
  panNumber: z.string().optional(),
  country: z.string().default("India").optional(),
});

declare global {
  interface Window {
    Razorpay: new (options: {
      key: string;
      amount: number;
      currency: string;
      name: string;
      description: string;
      order_id?: string;
      handler: (response: { razorpay_payment_id: string }) => void;
      prefill: { name: string; email: string; contact: string };
      notes?: Record<string, string>;
      theme?: { color: string };
      modal?: { ondismiss: () => void };
    }) => { open: () => void };
  }
}

// Helper component for the submit button animation
const SubmitButtonContent = ({ submitting }: { submitting: boolean }) => (
    <div className="flex items-center justify-center">
        <Lock className={`w-4 h-4 mr-2 ${submitting ? 'animate-pulse' : ''}`} />
        {submitting ? "Processing donation…" : "Continue to Secure Payment"}
    </div>
);


export function DonorForm({ seva, onLoadingChange }: DonorFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      message: "",
      panNumber: "",
      country: "India",
    },
  });

  // --- API CALLS (Logic Unchanged) ---
  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setSubmitting(true);
      onLoadingChange?.(true);

      const payload: CreateDonationPayload = {
        seva_slug: seva.slug,
        seva_name: seva.name,
        amount: seva.amount,
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address || null,
        message: values.message || null,
        pan_number: values.panNumber || null,
        country: values.country || "India",
      };

      const createRes = await fetch("/api/donations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const created = await createRes.json();
      if (!createRes.ok) {
        toast.error(created.error || "Failed to start donation");
        setSubmitting(false);
        onLoadingChange?.(false);
        return;
      }
      const donationId: string = created.donationId;

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: seva.amount,
          sevaSlug: seva.slug,
          donationId,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        toast.error(orderData.error || "Failed to create order");
        setSubmitting(false);
        onLoadingChange?.(false);
        return;
      }

      const order = orderData.order;

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        setSubmitting(false);
        onLoadingChange?.(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "CowSeva",
        description: seva.name,
        order_id: order.id,
        handler: async (response: { razorpay_payment_id: string }) => {
          try {
            await fetch("/api/donations/mark-paid", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                donationId,
                razorpayPaymentId: response.razorpay_payment_id,
              }),
            });
            toast.success("Donation successful, thank you!");
            router.push("/thank-you");
          } catch (e) {
            toast.error("Payment update failed");
          } finally {
            setSubmitting(false);
            onLoadingChange?.(false);
          }
        },
        prefill: {
          name: values.fullName,
          email: values.email,
          contact: values.phone,
        },
        notes: { donationId },
        theme: { color: "#0f172a" },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            onLoadingChange?.(false);
          },
        },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Donation processing failed");
      setSubmitting(false);
      onLoadingChange?.(false);
    }
  }

  // --- UI START: Single Column Layout (Short Height) ---

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      // Reverted to single column, ensuring full width utilization
      className="w-full"
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
                {/* First Row: Full Name (Increased font size for label) */}
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Full Name</FormLabel>
                            <FormControl>
                                {/* Interactive Input Styling */}
                                <Input 
                                    placeholder="Your full name" 
                                    {...field} 
                                    className="h-10 transition duration-150 hover:border-amber-400 focus-visible:ring-amber-500"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Second Row: Email & Phone (Reduced gap) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold">Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="email" 
                                        placeholder="you@example.com" 
                                        {...field} 
                                        className="h-10 transition duration-150 hover:border-amber-400 focus-visible:ring-amber-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold">Phone</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="10 digit number" 
                                        {...field} 
                                        className="h-10 transition duration-150 hover:border-amber-400 focus-visible:ring-amber-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Third Row: Amount & Country (Reduced gap, interactive amount input) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormItem>
                        <FormLabel className="text-sm font-semibold">Amount</FormLabel>
                        <FormControl>
                            <Input 
                                value={`₹${seva.amount.toLocaleString("en-IN")}`} 
                                readOnly 
                                className="h-10 bg-amber-100 border-amber-300 font-bold text-amber-900 cursor-default" 
                            />
                        </FormControl>
                    </FormItem>
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold">Country</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="India" 
                                        {...field} 
                                        className="h-10 transition duration-150 hover:border-amber-400 focus-visible:ring-amber-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Fourth Row: Address (Shorter Textarea) */}
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold">Address</FormLabel>
                            <FormControl>
                                <Textarea 
                                    rows={1} // Reduced rows for height
                                    placeholder="Optional" 
                                    {...field} 
                                    className="transition duration-150 hover:border-amber-400 focus-visible:ring-amber-500"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Fifth Row: PAN & Message (Reduced gap) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="panNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold">PAN Number (For Tax Benefits)</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Optional" 
                                        {...field} 
                                        className="h-10 transition duration-150 hover:border-amber-400 focus-visible:ring-amber-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-semibold">Message</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Optional" 
                                        {...field} 
                                        className="h-10 transition duration-150 hover:border-amber-400 focus-visible:ring-amber-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Submit Button - Highly Interactive Styling */}
                <Button 
                    type="submit" 
                    className="w-full bg-slate-900 hover:bg-slate-700 h-12 text-lg font-semibold transition duration-200 shadow-xl mt-4 
                                hover:shadow-2xl hover:scale-[1.005] active:scale-[0.99] group" 
                    disabled={submitting}
                >
                    <CreditCard className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                    <SubmitButtonContent submitting={submitting} />
                </Button>
            </form>
        </Form>
    </motion.div>
  );
}
