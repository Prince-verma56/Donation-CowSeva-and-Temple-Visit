import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/components/nav/Navbar";
import { LenisProvider } from "@/hooks/useLenisScroll";
import { PreloaderComponent } from "@/components/preloader/PreloaderComponent";
import { PreloaderProvider } from "@/hooks/usePreloader";
import { LoadingOverlay } from "@/components/overlays/LoadingOverlay";
import { LoadingOverlayProvider } from "@/hooks/useLoadingOverlay";
import { ScrollReset } from "@/components/ScrollReset";


export const metadata = {
 
  title: {
    // Highly specific title for the homepage
    default: "Vrindavan Govinda Gau Seva | Official Cow Protection & Donation",
    // Template for all other pages (e.g., "Medical Care | Vrindavan Govinda Gau Seva")
    template: "%s | Vrindavan Govinda Gau Seva",
  },
  description: "Official website of Vrindavan Govinda Gau Seva. Donate online to support Gau Seva in Vrindavan, providing medical care, shelter, and nutritious food for abandoned and rescued cows.",
  keywords: [
    "Vrindavan Govinda Gau Seva",
    "Gau Seva Vrindavan",
    "Donate Cow Vrindavan",
    "Gau Raksha",
    "Vrindavan Charity",
    "Cow Protection India",
    "Online Donation Gaushala",
    "Feed a Cow Vrindavan",
    "cow medical care"
  ],
  authors: [{ name: "Vrindavan Govinda Gau Seva" }],
  creator: "Vrindavan Govinda Gau Seva",
  publisher: "Vrindavan Govinda Gau Seva",
  
  // Canonical URL - Crucial for SEO, replace with your live domain
  metadataBase: new URL('https://your-vrindavan-gauseva-domain.com'), 
  alternates: {
    canonical: '/',
  },

  // Open Graph (OG) / Social Media Tags
  openGraph: {
    title: "Vrindavan Govinda Gau Seva: Donate and Save a Cow Today",
    description: "Your donation directly funds emergency medical treatment and secure shelter for cows in Vrindavan.",
    url: "https://your-vrindavan-gauseva-domain.com", // Replace
    siteName: "Vrindavan Govinda Gau Seva",
    images: [
      {
        url: "/og-image.jpg", // Ensure this high-quality image is in your public/ directory
        width: 1200,
        height: 630,
        alt: "Vrindavan Govinda Gau Seva official banner for donation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // Twitter Card Tags
  twitter: {
    card: "summary_large_image",
    title: "Support Gau Seva in Vrindavan | Vrindavan Govinda Gau Seva",
    description: "Help us sustain our Gau Seva mission in the heart of Vrindavan. Donate now to make an impact.",
    site: "@YourOrganizationHandle", // If you have a Twitter/X account
    creator: "@YourOrganizationHandle",
    images: ["/og-image.jpg"],
  },

  // Favicon/Icons - Next.js will automatically handle these links
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.ico",
  },
};
// -------------------------------------------------------------------

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en" dir="ltr"> 
      <body className="min-h-screen bg-background text-slate-900" suppressHydrationWarning={true}>
        <ScrollReset />
        <PreloaderComponent />
        <LoadingOverlayProvider>
          <LoadingOverlay isLoading={false} />
          <PreloaderProvider>
            <nav className="navbar-container fixed top-0 left-0 right-0 z-40 opacity-0 pointer-events-none transition-all duration-600">
              <Navbar />
            </nav>
            <LenisProvider>
              <main className="mx-auto">{children}</main>
              {/* Optional: Uncomment the footer when ready */}
              {/* <footer className="w-full border-t mt-12 py-6 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} Vrindavan Govinda Gau Seva
              </footer> */}
            </LenisProvider>
          </PreloaderProvider>
        </LoadingOverlayProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}