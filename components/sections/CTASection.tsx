"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, cubicBezier } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Apple,
  Play,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

// FOOTER LINKS & SOCIAL
const FOOTER_LINKS = {
  Products: [
    { name: "Product", href: "/products/main" },
    { name: "Pricing", href: "/products/pricing" },
    { name: "Log in", href: "/auth/login" },
    { name: "Request access", href: "/products/request-access" },
    { name: "Partnerships", href: "/products/partnerships" },
  ],
  "About us": [
    { name: "About heilsa", href: "/about" },
    { name: "Contact us", href: "/contact" },
    { name: "Features", href: "/features" },
    { name: "Careers", href: "/careers" },
  ],
  Resources: [
    { name: "Help center", href: "/help" },
    { name: "Book a demo", href: "/book-demo" },
    { name: "Server status", href: "/status" },
    { name: "Blog", href: "/blog" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", name: "Facebook" },
  { icon: Instagram, href: "#", name: "Instagram" },
  { icon: Twitter, href: "#", name: "Twitter" },
  { icon: Linkedin, href: "#", name: "LinkedIn" },
];

// ANIMATIONS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.17, 0.55, 0.55, 1),
    },
  },
};

// APP CTA - updated so image is fully visible (no dark overlay)
// Notes:
// - parent .relative & child .absolute are required for Image fill
// - removed opacity on image; if you want slight dimming for contrast, use a thin gradient overlay with pointer-events-none
const AppBannerCTA = () => (
  <section
    className="py-12 px-6 sm:px-12 lg:px-16"
    aria-label="App Download Call to Action"
  >
    <motion.div
      className="relative
      shadow-[inset_-12px_-8px_40px_#46464620]
      w-full overflow-hidden text-white p-12 sm:p-16 lg:p-24 rounded-[3rem] shadow-2xl min-h-[620px] flex flex-col items-center justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Background image full bleed (no dimming) */}
      <div className="absolute inset-0 z-0 rounded-[3rem] overflow-hidden pointer-events-none ">
        <Image
          src="/Images/Backgrounds/SevaFooterImg2.png"
          alt="App background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            // no opacity so image displays naturally
          }}
          sizes="(max-width: 768px) 100vw, 1200px"
          priority={false}
        />
      </div>

      {/* Content layer (above image) */}
      <div className="z-20 w-full max-w-4xl text-center">
        <motion.h2
          className="text-4xl sm:text-5xl relative bottom-50 lg:text-6xl font-extrabold mb-4 leading-tight text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]
 drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]
"
          style={{ fontFamily: "Qasira" }}
          variants={childVariants}
          id="app-cta-heading"
        >
            Serving cows, uplifting <span className="text-amber-400">spirits</span> together
        </motion.h2>



        {/* <motion.div variants={childVariants} className="flex items-center justify-center gap-4 flex-wrap">
          <Button className="px-6 py-3">Get the App</Button>
          <Link href="/features" className="inline-flex items-center text-sm font-medium underline text-slate-700">
            Learn more <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div> */}
      </div>
    </motion.div>
  </section>
);

// FOOTER MENU
const FooterMenu = () => (
  <footer
    className="bg-white text-slate-700 pt-16 pb-8 px-6 sm:px-12 lg:px-16 border-t border-slate-200"
    aria-label="Site Navigation and Information"
  >
    <motion.div
      className="max-w-7xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-8 pb-12">
        <motion.div variants={childVariants} className="col-span-2 md:col-span-1 pr-8">
          <Link
            href="/"
            className="flex items-center text-2xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "Qasira" }}
          >
            <Heart className="w-6 h-6 mr-2 fill-green-600 text-green-600" />
            CowSeva
          </Link>
          <p className="text-slate-500 text-xs mt-4 mb-2">
            &copy;{new Date().getFullYear()} Sworkit® by Nevercise, Inc.
          </p>
          <p className="text-slate-500 text-xs">
            <Link href="/terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>{" "}
            |{" "}
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </motion.div>

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <motion.div key={title} variants={childVariants} className="col-span-1">
            <h3
              className="text-sm font-semibold mb-4 text-slate-900 uppercase tracking-widest"
              style={{ fontFamily: "Montserrat" }}
            >
              {title}
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-green-600 transition-colors text-sm"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div variants={childVariants} className="col-span-2 md:col-span-1">
          <h3
            className="text-sm font-semibold mb-4 text-slate-900 uppercase tracking-widest"
            style={{ fontFamily: "Montserrat" }}
          >
            Get in touch
          </h3>
          <p className="text-slate-600 mb-4 text-sm" style={{ fontFamily: "Montserrat" }}>
            Questions or feedback? We’d love to hear from you.
          </p>

          <div className="flex space-x-4 mt-6">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                aria-label={`Follow us on ${social.name}`}
                className="text-slate-500 hover:text-green-600 transition-colors transform hover:scale-110"
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
            <Link
              href="#"
              aria-label="Send us a message"
              className="text-slate-500 hover:text-green-600 transition-colors transform hover:scale-110"
            >
              <MessageCircle className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </footer>
);

export function CTASection() {
  return (
    <div className="w-full">
      <AppBannerCTA />
      <FooterMenu />
    </div>
  );
}

export const AppFooter = FooterMenu;
export const AppBanner = AppBannerCTA;
