"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  cubicBezier,
} from "framer-motion";
import { Menu, X, HeartHandshake, Info, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// UTILS
const cn = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(" ");

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button
    className={cn(
      `px-4 py-2 font-medium transition-colors rounded-full`,
      className
    )}
    {...props}
  >
    {children}
  </button>
);

// NAVBAR
export const Navbar: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

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

  const navItems: NavItem[] = [
    {
      name: "Donation",
      href: "/donation",
      icon: <HeartHandshake size={20} className="text-[#262424]" />,
    },
    {
      name: "About Us",
      href: "/about",
      icon: <Info size={20} className="text-[#262424]" />,
    },
    {
      name: "Services",
      href: "/services",
      icon: <ShieldCheck size={20} className="text-[#262424]" />,
    },
  ];

  const CTA_CLASSES =
    "bg-gradient-to-r from-[#C9B172] to-[#A0884A] hover:from-[#D8BF80] hover:to-[#B0985A] transition duration-300 shadow-lg text-white";

  // Small helper so nested routes like /donation/xyz still mark Donation active
  const isRouteActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <AnimatePresence>
      <motion.nav
        ref={ref}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
          transition: {
            duration: 0.3,
            ease: cubicBezier(0.17, 0.55, 0.55, 1),
          },
        }}
        className={cn(
          "fixed top-6 left-0 right-0 z-50 mx-auto flex max-w-[80vw] md:max-w-7xl items-center justify-between",
          "border border-[#262424]/20 bg-[#EEE5DA]/80 px-6 py-3 shadow-xl backdrop-blur-lg rounded-full",
          "dark:bg-neutral-900/40 dark:border-neutral-700/50 transition-colors"
        )}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-[#262424] p-1 rounded-full">
            <HeartHandshake size={24} className="text-[#EEE5DA]" />
          </div>
          <span className="font-serif text-xl font-bold text-[#262424] hidden sm:block">
            Gau Seva
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-2 text-sm font-medium text-[#262424] relative">
          {navItems.map((item) => {
            const active = isRouteActive(item.href);

            return (
              <Link
                key={`${item.name}-desktop`}
                href={item.href}
                className={cn(
                  "relative flex items-center space-x-2 px-4 py-2 rounded-full transition",
                  active
                    ? "text-[#262424] font-semibold"
                    : "text-[#262424]/70 hover:text-[#262424]"
                )}
                style={{ zIndex: 1 }}
              >
                {/* Sliding pill behind active item */}
                {active && (
                  <motion.div
                    layoutId="navActivePill"
                    className="absolute inset-0 rounded-full bg-[#262424]/10"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                    style={{ zIndex: -1 }}
                  />
                )}

                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA BUTTON */}
        <Link href="/donation" className="hidden md:block">
          <Button className={CTA_CLASSES}>Donate</Button>
        </Link>

        {/* MOBILE TOGGLE */}
        <div className="flex md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-[#262424] dark:text-[#EEE5DA]"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
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
                "rounded-xl border border-[#262424]/20 bg-[#EEE5DA]/90 shadow-2xl backdrop-blur-lg",
                "dark:bg-neutral-900/80 md:hidden"
              )}
            >
              {navItems.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <Link
                    key={`${item.name}-mobile`}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-lg transition",
                      active
                        ? "bg-[#262424]/10 text-[#262424]"
                        : "text-[#262424] hover:bg-[#262424]/10"
                    )}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-[#262424]/20 mt-2">
                <Link href="/donation" className="w-full" onClick={() => setOpen(false)}>
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
