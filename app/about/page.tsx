"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  PiggyBank,
  HandHeart,
  Scale,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ShlokaSection } from "@/components/sections/ShlokaSection";

// --- Static Data ---
const aboutContent = {
  title: "Where Every Act of Kindness Becomes Life",
  headingStyle: "font-light tracking-tight text-5xl md:text-6xl lg:text-7xl",
  mission:
    "We are a dedicated community committed to rescuing, rehabilitating, and protecting injured, sick, and abandoned cows. Our mission goes beyond shelter; it's about restoring dignity and ensuring compassionate care for every life.",
  values: [
    {
      icon: HandHeart,
      title: "Compassionate Rescue",
      description:
        "Immediate response and expert veterinary care for accident victims and cows facing distress.",
    },
    {
      icon: Scale,
      title: "Ethical Standards",
      description:
        "Operating with full transparency and integrity, ensuring every donation directly impacts animal welfare.",
    },
    {
      icon: PiggyBank,
      title: "Sustainable Seva",
      description:
        "Fostering long-term projects like organic fodder farming and permanent shelter expansion.",
    },
  ],
  communityStats:
    "Join our network of 25K+ active volunteers and donors dedicated to this sacred cause.",
};

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Main Component ---
export default function AboutPage() {
  return (
    <>
      {/* SECTION 1 */}
      <motion.section
        id="about-us"
        aria-labelledby="about-heading"
        className="relative py-16 md:py-28 bg-[#edf6f9] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Image + tag */}
            <motion.div
              className="relative w-full h-[420px] md:h-[520px] lg:h-[560px] rounded-3xl shadow-xl overflow-hidden bg-gray-200"
              variants={itemVariants}
            >
              <div className="group relative w-full h-full overflow-hidden">
                <Image
                  src="/Images/Persons/HandSomeBoy.png"
                  alt="A compassionate volunteer attending to a sick cow in a shelter."
                  width={1200}
                  height={800}
                  priority={false}
                  loading="eager"
                  className="w-full h-full object-cover object-center 
               transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] 
               group-hover:scale-[1.04]"
                />
              </div>

              {/* Community Join Tag */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl max-w-xs">
                <div className="flex -space-x-2 mb-2">
                  <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <Image
                      src="/Images/Avatars/P1.png"
                      alt="Donor profile 1"
                      fill
                      sizes="32px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <Image
                      src="/Images/Avatars/P2.png"
                      alt="Donor profile 2"
                      fill
                      sizes="32px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <Image
                      src="/Images/Avatars/P3.png"
                      alt="Donor profile 3"
                      fill
                      sizes="32px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                    <Users className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-snug">
                  {aboutContent.communityStats}
                </p>
              </div>
            </motion.div>

            {/* Right: Text + cards */}
            <div className="lg:pt-6">
              <motion.div variants={itemVariants}>
                <h2
                  id="about-heading"
                  className={`${aboutContent.headingStyle} text-gray-900 mb-6`}
                  style={{ fontFamily: "Qasira" }}
                >
                  Where <span className="text-[#963F15]">Every Act</span> of
                  Kindness Becomes Life
                </h2>
              </motion.div>

              <motion.p
                className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl"
                variants={itemVariants}
              >
                {aboutContent.mission}
              </motion.p>

              <motion.div variants={itemVariants} className="mb-12">
                <Link href="/donation" className="w-full sm:w-auto">
                  <InteractiveHoverButton
                    className="w-full sm:w-auto bg-linear-to-b from-amber-400 to-orange-500 hover:from-orange-500 hover:to-red-600 text-white font-bold px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 border-none rounded-full uppercase tracking-wide backdrop-blur-sm"
                  >
                    Donate now
                  </InteractiveHoverButton>
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutContent.values.map((value) => (
                  <motion.div key={value.title} variants={itemVariants}>
                    <Card className="border border-amber-50/70 bg-white/90 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full rounded-2xl">
                      <CardContent className="p-6">
                        <div className="p-3 bg-amber-100 text-amber-700 rounded-xl inline-flex mb-3">
                          <value.icon
                            className="w-6 h-6"
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {value.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2 */}
      <motion.section
        id="about-gaushala"
        aria-labelledby="about-gaushala-heading"
        className="relative py-16 md:py-24 bg-[#edf6f9] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT: content */}
            <motion.div
              className="space-y-6 lg:space-y-8"
              variants={itemVariants}
            >
              <p className="text-xs md:text-sm font-semibold tracking-[0.32em] text-emerald-700 uppercase">
                About Our Gaushala
              </p>

              <h2
                id="about-gaushala-heading"
                className="text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-tight"
                style={{ fontFamily: "Qasira" }}
              >
                Where Seva Becomes{" "}
                <span className="text-[#963F15]">Shelter</span> for Every Cow.
              </h2>

              <p className="text-sm md:text-base text-slate-600 max-w-xl">
                Our Gaushala rescues injured, abandoned, and elderly cows from
                city streets and highways, giving them lifelong care instead of
                temporary relief. From emergency medical treatment to daily
                feeding, every seva you offer becomes a part of their healing
                journey.
              </p>

              <p className="text-sm md:text-base text-slate-600 max-w-xl">
                Transparent reporting, on-ground volunteers, and a dedicated vet
                team ensure that your support reaches exactly where it is needed
                the most.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-4">
                <Card className="border-none shadow-sm bg-white/90 rounded-2xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
                  <CardContent className="p-4 md:p-5 flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1 text-2xl md:text-3xl font-semibold text-[#963F15]">
                      900+
                    </span>
                    <p className="text-[11px] md:text-xs font-medium uppercase tracking-wide text-slate-500">
                      Cows Rescued
                    </p>
                    <p className="text-xs text-slate-500">
                      given lifelong food, shelter, and care.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white/90 rounded-2xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
                  <CardContent className="p-4 md:p-5 flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1 text-2xl md:text-3xl font-semibold text-[#963F15]">
                      2.5k+
                    </span>
                    <p className="text-[11px] md:text-xs font-medium uppercase tracking-wide text-slate-500">
                      Active Donors
                    </p>
                    <p className="text-xs text-slate-500">
                      contributing monthly to Gau Seva.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none bg-white/90 rounded-2xl md:col-span-1 col-span-2 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
                  <CardContent className="p-4 md:p-5 flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1 text-2xl md:text-3xl font-semibold text-[#963F15]">
                      4+
                    </span>
                    <p className="text-[11px] md:text-xs font-medium uppercase tracking-wide text-slate-500">
                      Acres of Shelter
                    </p>
                    <p className="text-xs text-slate-500">
                      open paddocks, shaded sheds, and green surroundings.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-2">
                <Link href="/know-about-us" className="w-full sm:w-auto">
                  <InteractiveHoverButton
                    className="w-full sm:w-auto bg-linear-to-r from-amber-500 to-[#f6d550] hover:from-orange-500 hover:to-red-600 text-white font-bold px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 border-none rounded-full uppercase tracking-wide backdrop-blur-sm"
                  >
                    Know About Us
                  </InteractiveHoverButton>
                </Link>
              </div>
            </motion.div>

            {/* RIGHT: orbit image */}
            <motion.div
              className="relative flex items-center justify-center pointer-events-none"
              variants={itemVariants}
            >
              <div className="relative w-full max-w-[480px] aspect-square rounded-full bg-[#e3f3ea] flex items-center justify-center shadow-[0_18px_45px_rgba(15,23,42,0.12)] overflow-hidden">
                <div className="relative w-[80%] h-[80%] rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/Images/DonationCardsImg/OrbitServices2.png"
                    alt="Devoted volunteers serving cows at the Gaushala."
                    fill
                    sizes="(min-width: 1024px) 35vw, 80vw"
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </div>

                {/* orbit rings */}
                <div
                  className="pointer-events-none absolute inset-6 rounded-full border border-emerald-200/60"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-12 rounded-full border border-emerald-100"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-20 rounded-full border border-emerald-50"
                  aria-hidden="true"
                />

                {/* dots */}
                <span
                  className="pointer-events-none absolute left-[14%] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute right-[22%] top-[20%] h-2.5 w-2.5 rounded-full bg-lime-500"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute bottom-[20%] left-[30%] h-2.5 w-2.5 rounded-full bg-emerald-400"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3 – SHLOKA SECTION (separate, single container) */}
      <section className="relative py-16 md:py-20 bg-[#edf6f9]">
        <main className="container mx-auto px-4 md:px-6 mt-4 md:mt-8">
          <ShlokaSection eager />
        </main>
      </section>
    </>
  );
}
