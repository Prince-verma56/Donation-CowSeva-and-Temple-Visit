"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, HeartHandshake, Info, ShieldCheck } from "lucide-react"; 
import Link from "next/link";
// import Image from "next/image";

// --- Utility Functions & Components ---

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(" ");

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={cn(`px-4 py-2 font-medium transition-colors rounded-full`, className)}
    {...props}
  >
    {children}
  </button>
);

// --- Navbar Component (Translucent, Animated, Themed) ---

export const Navbar: React.FC = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll(); 
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const HIDE_THRESHOLD = 80; 

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    // Only manage visibility if the mobile menu is closed
    if (!open) { 
      if (latest > prev && latest > HIDE_THRESHOLD) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up or near the top
      }
    }
  });

  const navItems: NavItem[] = [
    // Deep Charcoal (#262424) icons for contrast
    { name: "Donation", href: "/donation", icon: <HeartHandshake size={20} className="text-[#262424]" /> }, 
    { name: "About Us", href: "/about", icon: <Info size={20} className="text-[#262424]" /> }, 
    { name: "Services", href: "/services", icon: <ShieldCheck size={20} className="text-[#262424]" /> }, 
  ];

  const handleLinkClick = () => setOpen(false); 
  
  // Custom gold gradient for the Donate CTA button
  const CTA_CLASSES = 'bg-gradient-to-r from-[#C9B172] to-[#A0884A] hover:from-[#D8BF80] hover:to-[#B0985A] transition duration-300 shadow-lg text-white';

  return (
    <AnimatePresence>
      <motion.nav
        ref={ref}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0, transition: { duration: 0.3, ease: "easeInOut" } }}
        // Glassmorphism Base: Light Almond BG (#EEE5DA) with blur
        className={cn(
          "fixed top-6 left-0 right-0 z-50 mx-auto flex max-w-[80vw] md:max-w-7xl items-center justify-between",
          "border border-[#262424]/20 bg-[#EEE5DA]/80 px-6 py-3 shadow-xl backdrop-blur-lg rounded-full",
          "dark:bg-neutral-900/40 dark:border-neutral-700/50 transition-colors"
        )}
      >
        <Link href="/" className="flex items-center space-x-2">
          {/* Logo with Deep Charcoal background and Light Almond icon */}
          <div className="bg-[#262424] p-1 rounded-full">
             <HeartHandshake size={24} className="text-[#EEE5DA]" />
          </div>
          {/* Logo Text uses Deep Charcoal */}
          <span className="font-serif text-xl font-bold text-[#262424] dark:text-white hidden sm:block">
            Gau Seva
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2 text-sm font-medium text-[#262424] dark:text-[#EEE5DA]">
          {navItems.map((item) => (
            <Link
              key={`${item.name}-desktop`}
              href={item.href}
              // Hover effect uses a slight Deep Charcoal tint
              className="flex items-center space-x-2 p-3 hover:bg-[#262424]/10 rounded-full transition" 
            >
              {item.icon} 
              <span className="text-[#262424] dark:text-[#EEE5DA]">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Right CTA Button (Donate) */}
        <Link href="/donate" className="hidden md:block">
          <Button className={CTA_CLASSES}>
            Donate
          </Button>
        </Link>

        {/* Mobile Toggle */}
        <div className="flex md:hidden">
          <button onClick={() => setOpen(!open)} className="text-[#262424] dark:text-[#EEE5DA]">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer (Translucent) */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              // Mobile menu uses light almond/translucent background
              className={cn(
                "absolute top-16 left-0 right-0 flex flex-col items-stretch gap-2 p-4 mx-auto w-[95%] sm:w-full",
                "rounded-xl border border-[#262424]/20 bg-[#EEE5DA]/90 shadow-2xl backdrop-blur-lg",
                "dark:bg-neutral-900/80 md:hidden"
              )}
            >
              {navItems.map((item) => (
                <Link
                  key={`${item.name}-mobile`}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-start gap-4 p-3 rounded-lg text-[#262424] dark:text-[#EEE5DA] hover:bg-[#262424]/10 transition"
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