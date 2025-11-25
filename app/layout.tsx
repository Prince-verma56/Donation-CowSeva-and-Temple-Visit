import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/components/nav/Navbar";
import { LenisProvider } from "@/hooks/useLenisScroll";
import { PreloaderComponent } from "@/components/preloader/PreloaderComponent";
import { PreloaderProvider } from "@/hooks/usePreloader";
import { LoadingOverlay } from "@/components/overlays/LoadingOverlay";
import { LoadingOverlayProvider } from "@/hooks/useLoadingOverlay";

export const metadata = {
  title: "CowSeva",
  description: "Donation app - simple scaffold",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fefae0] text-slate-900">
        <PreloaderComponent />
        <LoadingOverlayProvider>
          <LoadingOverlay isLoading={false} />
          <PreloaderProvider>
            <nav className="navbar-container fixed top-0 left-0 right-0 z-40 opacity-0 pointer-events-none transition-all duration-600">
              <Navbar />
            </nav>
            <LenisProvider>
              <main className="mx-auto">{children}</main>
              <footer className="w-full border-t mt-12 py-6 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} CowSeva
              </footer>
            </LenisProvider>
          </PreloaderProvider>
        </LoadingOverlayProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
