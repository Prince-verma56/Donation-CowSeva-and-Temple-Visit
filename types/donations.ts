export type DonationRecordStatus = "pending" | "paid" | "failed";

export type DonationRecord = {
  id: string;
  seva_slug: string;
  seva_name: string;
  amount: number;
  full_name: string;
  email: string;
  phone: string;
  address: string | null;
  message: string | null;
  pan_number: string | null;
  country: string | null;
  status: DonationRecordStatus;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  created_at: string;
};

export type CreateDonationPayload = {
  seva_slug: string;
  seva_name: string;
  amount: number;
  full_name: string;
  email: string;
  phone: string;
  address?: string | null;
  message?: string | null;
  pan_number?: string | null;
  country?: string | null;
};
