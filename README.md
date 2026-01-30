# CowSeva – Donations & Temple Seva Platform

## Project Overview
- This production-oriented web application was developed for a freelance client.
- The platform enables devotees to contribute to Cow Seva donations, book Temple Seva and VIP Darshan assistance, and complete secure online payments.
- The core purpose is to provide a trustworthy, modern experience for:
  - Donations to curated Seva programs
  - Donor data collection and receipts
  - VIP Darshan and temple assistance bookings
  - Secure payment handling and server-side verification

## Key Features
- Donation cards with fixed amounts and clear descriptions
- Donor information form with validation
- Razorpay payment integration (client checkout + server order creation)
- Server-side payment verification and status updates
- Supabase (PostgreSQL) database integration for donations
- Responsive, smooth, and visually polished UI

## Tech Stack Used
- Frontend:
  - Next.js (App Router)
  - React
  - Tailwind CSS
  - shadcn/ui components
  - GSAP / Framer Motion (animations and transitions)
  - Lenis smooth scrolling
- Backend:
  - Next.js API routes (server actions/endpoints)
  - Supabase (PostgreSQL)
  - Razorpay Payments (Orders + Checkout)

## How the System Works
1. The user selects a donation or seva option from predefined cards.
2. The user fills donor details in a guided form.
3. The server creates a Razorpay order and the user completes payment via Razorpay Checkout.
4. On success, the server marks the donation as paid and stores the payment reference.
5. The donation record is stored securely in Supabase with status and payment IDs.

## Security & Best Practices
- Server-side Razorpay processes:
  - Orders are created on the server
  - Payment status updates are handled server-side
  - Webhook-based signature verification is recommended for production
- Environment variables are used for all secrets (never hard-coded)
- Supabase service-role key is used only on the server; never exposed on the client
- Row Level Security (RLS) recommended for production tables with appropriate policies

## Environment Variables
Set these in your deployment platform (no values included here):
- NEXT_PUBLIC_RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

## Deployment Notes
- The application is production-ready and can be deployed on platforms such as Vercel.
- Ensure all environment variables are configured in the hosting provider’s dashboard.
- Keep Next.js and dependencies updated to the latest patched versions.
- Rotate secrets when moving between environments or after security updates.

## Credits
- This project was developed by the developer as a freelance solution for a client, with a focus on real-world reliability, performance, security, and a smooth user experience.

