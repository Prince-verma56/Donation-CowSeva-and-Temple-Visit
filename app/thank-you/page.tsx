"use client"; // Required for hooks, refs, and GSAP

import Link from "next/link";
import Image from "next/image";
import { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
// Import the necessary icons from react-icons/fa
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

// --- COMPONENTS & UTILITIES ---

// Map icon names to their imported components
const IconMap = {
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
};

// Social Links: The structure is simplified as the label is no longer needed.
const socialLinks: SocialIconProps[] = [
  { name: "Facebook", href: "https://www.facebook.com" },
  { name: "Instagram", href: "https://www.instagram.com" },
  { name: "YouTube", href: "https://www.youtube.com" },
];

// Updated SocialIcon component to use React Icons
type SocialIconProps = { name: keyof typeof IconMap; href: string };
const SocialIcon = ({ name, href }: SocialIconProps) => {
  const IconComponent = IconMap[name];
  if (!IconComponent) return null; // Fallback

  return (
    <Link
      href={href}
      target="_blank"
      aria-label={`Connect on ${name}`}
      className="mx-2"
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center 
                      bg-slate-900 text-white shadow-sm transition-all duration-300 
                      hover:scale-110 hover:bg-amber-500 hover:shadow-lg">
        {/* Render the actual React Icon component */}
        <IconComponent size={18} />
      </div>
    </Link>
  );
};


// --- MAIN COMPONENT ---

export default function ThankYouPage() {
  // Use Refs for all elements we want to control with GSAP
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRefs = useRef<HTMLElement[]>([]);
  const socialRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(cardRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.8,
        delay: 0.2,
        immediateRender: false,
      })
        .from(
          imageContainerRef.current,
          {
            opacity: 0,
            scale: 0.7,
            duration: 0.7,
            immediateRender: false,
          },
          "<0.2"
        )
        .from(contentRefs.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          immediateRender: false,
        }, "<0.3")
        .from(socialRef.current?.children || [], {
          opacity: 0,
          y: 10,
          duration: 0.4,
          stagger: 0.1,
          immediateRender: false,
        }, "<0.2");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    return () => {
      document.body.style.overflow = prevBodyOverflow || "auto";
      document.documentElement.style.overflow = prevHtmlOverflow || "auto";
    };
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">

      {/* Background Image - FIXED: priority={true} */}
      <Image
        src="/Images/Backgrounds/ThankYouBg.png"
        alt="Thank you background"
        fill
        priority={true} 
        className="object-cover object-center"
      />

      {/* Soft White Overlay */}
      <div className="absolute inset-0 bg-white/30"></div>

      {/* Main Card (GSAP Target) - FIX: Added opacity-100 and scale-100 for default visibility */}
      <div
        ref={cardRef}
        className="relative w-full max-w-3xl mt-10 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-10 opacity-100 scale-100" 
      >

        {/* Layout */}
        <div className="flex flex-col md:flex-row min-h-[350px]">

          {/* Left Illustration: Full Cover Fix */}
          <div className="md:w-2/5 bg-slate-100 flex items-center justify-center p-0 relative">

            {/* Image Container: Full width and height of the column */}
            <div
              ref={imageContainerRef}
              className="relative w-full h-full overflow-hidden"
            >
              <Image
                src="/Images/DonationCardsImg/PriestWithCow2.png"
                alt="Sacred cow illustration representing successful donation."
                fill
                priority={false}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover drop-shadow-md transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Content - FIX: Added opacity-100 for default visibility of content block */}
          <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center text-center md:text-left opacity-100">

            {/* Tag */}
            <div
              ref={(el) => { if (el) contentRefs.current[0] = el; }}
              className="inline-flex items-center justify-center md:justify-start mb-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1 border border-emerald-100">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                Donation Successful
              </span>
            </div>

            {/* Heading (Gold Gradient) */}
            <h1
              ref={(el) => { if (el) contentRefs.current[1] = el; }}
              className="text-3xl md:text-4xl font-extrabold 
                bg-gradient-to-r 
                from-[#f59e0b] 
                via-[#f3c83a] 
                to-[#fc953b] 
                bg-clip-text 
                text-transparent
                tracking-tight mb-3 leading-tight"
            >
              Thank you for your Seva
            </h1>

            {/* Message 1 */}
            <p
              ref={(el) => { if (el) contentRefs.current[2] = el; }}
              className="text-sm md:text-base text-slate-700 mb-3"
            >
              Your sacred donation has been received. Your support helps us
              care for and serve our cows with love and responsibility.
            </p>

            {/* Message 2 */}
            <p
              ref={(el) => { if (el) contentRefs.current[3] = el; }}
              className="text-xs md:text-sm text-slate-500 mb-6"
            >
              A confirmation email with details of your contribution is on the
              way. You may close this page or explore more seva opportunities.
            </p>

            {/* Buttons (Primary Button with gradient hover shift) */}
            <div
              ref={(el) => { if (el) contentRefs.current[4] = el; }}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <Link href="/" aria-label="Return to Cowsewa Homepage" className="flex-1">
                <span
                  className="
      inline-flex w-full items-center justify-center rounded-lg 
      text-white font-semibold px-4 py-3 text-sm md:text-base shadow-md
      bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
      bg-[length:200%_200%]
      transition-all duration-500 ease-out
      hover:bg-[100%_0%]
      hover:shadow-lg
    "
                >
                  Explore more Seva
                </span>
              </Link>

              {/* Secondary Button */}
              <Link href="/contact" aria-label="Connect with Cowsewa" className="flex-1">
                <span
                  className="
      inline-flex w-full items-center justify-center rounded-lg 
      border border-slate-300 text-slate-800 font-medium 
      px-4 py-3 text-sm md:text-base transition hover:bg-slate-50
    "
                >
                  Contact us
                </span>
              </Link>
            </div>

            {/* Social Media */}
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs md:text-sm text-slate-500 mb-3">
                Stay connected with Cowsewa
              </p>

              <div ref={socialRef} className="flex justify-center md:justify-start">
                {socialLinks.map((link) => (
                  <SocialIcon key={link.name} {...link} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
