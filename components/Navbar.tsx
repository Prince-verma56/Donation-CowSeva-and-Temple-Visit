"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, cubicBezier } from "framer-motion";
import { Menu, X, HeartHandshake, Info, ShieldCheck } from "lucide-react"; 
import Link from "next/link";
import Image from "next/image";

// --- Type Definitions ---
interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// Utility function
const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(" ");

// Button component
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={cn(`px-4 py-2 font-medium transition-colors rounded-full`, className)}
    {...props}
  >
    {children}
  </button>
);

// --- Navbar Component ---
export const Navbar: React.FC = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll(); 
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const HIDE_THRESHOLD = 80; 

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (!open) { 
      if (latest > prev && latest > HIDE_THRESHOLD) {
        setVisible(false); 
      } else {
        setVisible(true);
      }
    }
  });

  // Nav items with Deep Charcoal icons
  const navItems: NavItem[] = [
    {
      name: "Donation",
      href: "/donation",
      icon: <HeartHandshake size={20} className="text-[#262424]" />, // 👈 Deep Charcoal Icon
    },
    {
      name: "About Us",
      href: "/about",
      icon: <Info size={20} className="text-[#262424]" />, // 👈 Deep Charcoal Icon
    },
    {
      name: "Services",
      href: "/services",
      icon: <ShieldCheck size={20} className="text-[#262424]" />, // 👈 Deep Charcoal Icon
    },
  ];

  const handleLinkClick = () => {
    setOpen(false); 
  };

  // Adjusted CTA to a modern gold/tan gradient for the button
  const CTA_CLASSES = 'bg-gradient-to-r from-[#C9B172] to-[#A0884A] hover:from-[#D8BF80] hover:to-[#B0985A] transition duration-300 shadow-lg text-white';


  return (
    <AnimatePresence>
      <motion.nav
        ref={ref}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
          transition: { duration: 0.3, ease: cubicBezier(0.17, 0.55, 0.55, 1) },
        }}
        // Glassmorphism Base: Light Almond BG with blur
        className={cn(
          "fixed top-6 left-0 right-0 z-50 mx-auto flex max-w-[80vw] md:max-w-7xl items-center justify-between",
          "border border-[#262424]/20 bg-[#EEE5DA]/80 px-6 py-3 shadow-xl backdrop-blur-lg rounded-full", // 👈 Light Almond BG & Deep Charcoal Border
          "dark:bg-neutral-900/40 dark:border-neutral-700/50 transition-colors"
        )}
      >
        {/* --- Logo --- */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-[#262424] p-1 rounded-full"> {/* 👈 Deep Charcoal BG */}
             <HeartHandshake size={24} className="text-[#EEE5DA]" /> {/* 👈 Light Almond Icon */}
          </div>
          <span className="font-serif text-xl font-bold text-[#EEE5DA] dark:text-white hidden sm:block"> {/* 👈 Deep Charcoal Text */}
            Gau Seva
          </span>
        </Link>

        {/* --- Desktop Nav --- */}
        <div className="hidden md:flex items-center space-x-2 text-sm font-medium text-[#262424] dark:text-[#EEE5DA]">
          {navItems.map((item) => (
            <Link
              key={`${item.name}-desktop`}
              href={item.href}
              className="flex items-center space-x-2 p-3 hover:bg-[#262424]/10 rounded-full transition" // 👈 Deep Charcoal Hover
            >
              {item.icon} 
              <span className="text-[#262424] dark:text-[#EEE5DA]">{item.name}</span> {/* 👈 Deep Charcoal/Light Almond Text */}
            </Link>
          ))}
        </div>

        {/* --- Right CTA Button (Donate) --- */}
        <Link href="/donate" className="hidden md:block">
          <Button className={CTA_CLASSES}>
            Donate
          </Button>
        </Link>

        {/* --- Mobile Toggle --- */}
        <div className="flex md:hidden">
          <button onClick={() => setOpen(!open)} className="text-[#262424] dark:text-[#EEE5DA]">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- Mobile Drawer (Translucent) --- */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute top-16 left-0 right-0 flex flex-col items-stretch gap-2 p-4 mx-auto w-[95%] sm:w-full",
                // Glassmorphism for mobile menu: Light Almond BG
                "rounded-xl border border-[#262424]/20 bg-[#EEE5DA]/90 shadow-2xl backdrop-blur-lg",
                "dark:bg-neutral-900/80 md:hidden"
              )}
            >
              {navItems.map((item) => (
                <Link
                  key={`${item.name}-mobile`}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-start gap-4 p-3 rounded-lg text-[#262424] dark:text-[#EEE5DA] hover:bg-[#262424]/10 transition" // 👈 Deep Charcoal Hover/Text
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <div className="pt-2 border-t border-[#262424]/20 mt-2">
                <Link href="/donate" onClick={handleLinkClick} className="w-full">
                  <Button className={`${CTA_CLASSES} w-full mt-1`}>
                    Donate Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
};
