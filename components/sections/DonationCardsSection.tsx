"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SEVAS } from "@/lib/sevas";

// Register ScrollTrigger on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTION_BACKGROUND_IMAGE_PATH = "/Images/Backgrounds/PastelBg.png";
const DEFAULT_PAGE_BACKGROUND_COLOR =
  "bg-cyan-100 bg-linear-to-br from-cyan-50 via-sky-50 to-teal-50";

// Framer Motion variants
const cardContainerVariants = {
  hidden: { transition: { staggerChildren: 0.1 } },
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const headerChildVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.17, 0.55, 0.55, 1],
    },
  },
};

const contentChildVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export function DonationCardsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        {
          scale: 1.05,
          opacity: 0.85,
          y: "5%",
        },
        {
          scale: 1,
          opacity: 1,
          y: "0%",
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 10%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`min-h-screen ${DEFAULT_PAGE_BACKGROUND_COLOR} p-4 sm:p-8 lg:p-12`}
    >
      <section
        ref={sectionRef}
        id="seva-donation-options"
        aria-labelledby="seva-heading"
        className="relative shadow-[0_4px_10px_rgb(0,0,0,0.2)] z-10 py-24 px-6 sm:px-12 lg:px-16 overflow-hidden rounded-3xl shadow-xl"
      >
        {/* Background */}
        <div ref={bgRef} className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src={SECTION_BACKGROUND_IMAGE_PATH}
              alt="Subtle traditional Indian pattern background for donation section"
              fill
              quality={80}
              className="object-cover opacity-70"
            />
          </div>
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-20">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.p
              variants={headerChildVariants}
              className="text-sm font-semibold uppercase text-orange-600 mb-2 tracking-widest"
            >
              <div className="flex items-center justify-center my-16 max-w-7xl mx-auto">
                <hr className="w-1/3 h-[1.5px] bg-gray-300 opacity-60" />
                <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 mx-4 text-sm font-semibold uppercase tracking-widest shadow-lg rounded-full whitespace-nowrap">
                  Support Our Mission
                </Badge>
                <hr className="w-1/3 h-[1.5px] bg-gray-300 opacity-60" />
              </div>
            </motion.p>
            <motion.h2
              variants={headerChildVariants}
              id="seva-heading"
              className="lg:text-8xl sm:text-6xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "Qasira" }}
            >
              Choose a Seva
            </motion.h2>
            <motion.p
              variants={headerChildVariants}
              className="text-slate-700 text-lg max-w-2xl mx-auto"
            >
              Select the cause you want to support, from daily nourishment to
              emergency medical intervention, and help us save lives today.
            </motion.p>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {SEVAS.map((seva, index) => (
              <motion.div
                key={seva.id}
                variants={cardItemVariants}
                className="h-full flex justify-center"
              >
                <Card className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col w-full max-w-[320px] lg:max-w-full">
                  {/* Image */}
                  <div className="relative p-4 pb-0">
                    <div className="relative w-full h-56 bg-white flex items-center justify-center rounded-2xl overflow-hidden">
                      <Image
                        src={seva.image}
                        alt={seva.name}
                        width={280}
                        height={280}
                        className="object-contain"
                        priority={index < 4}
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                      />
                    </div>
                    <div className="absolute top-7 left-7">
                      <span className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                        {seva.tag}
                      </span>
                    </div>
                    <button
                      aria-label={`Add ${seva.name} to wishlist`}
                      className="absolute top-7 right-7 bg-white rounded-full p-2 transition-all shadow-md hover:shadow-lg"
                    >
                      <Heart className="w-5 h-5 text-red-500 hover:fill-red-500" />
                    </button>
                  </div>

                  {/* Content */}
                  <motion.div
                    className="p-5 flex flex-col flex-grow text-left"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    <motion.p
                      variants={contentChildVariants}
                      className="text-sm text-gray-500 font-medium mb-1"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      COW SEVA
                    </motion.p>

                    <motion.h3
                      variants={contentChildVariants}
                      className="text-xl font-bold text-slate-900 mb-2 line-clamp-2"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      {seva.name}
                    </motion.h3>

                    <motion.p
                      variants={contentChildVariants}
                      className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      {seva.desc}
                    </motion.p>

                    <motion.div
                      variants={contentChildVariants}
                      className="mt-auto mb-5"
                    >
                      <p
                        className="text-2xl font-extrabold text-slate-900"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        ₹{seva.amount.toLocaleString("en-IN")}
                      </p>
                    </motion.div>

                    <motion.div
                      variants={contentChildVariants}
                      className="w-full"
                    >
                      <Link href={`/donation/${seva.slug}`} className="w-full">
                        <Button
                          className="w-full bg-slate-900 hover:bg-slate-700 text-white rounded-full py-3 text-base font-semibold transition-all transform hover:scale-[1.01] shadow-md"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          Donate Now
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
