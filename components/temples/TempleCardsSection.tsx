"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TEMPLES } from "@/lib/temples";

const containerVariants = {
  hidden: { transition: { staggerChildren: 0.1 } },
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: ((): Transition => ({ type: "spring", stiffness: 80, damping: 15 }))(),
  },
};

export function TempleCardsSection() {
  return (
    <section className="relative z-10 py-16 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Temples – VIP Darshan</h2>
          <p className="text-slate-700 mt-2">Book a priority darshan with simple, guided assistance.</p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {TEMPLES.map((t) => (
            <motion.div key={t.id} variants={itemVariants} className="h-full flex justify-center">
              <Card className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col w-full">
                <div className="relative p-4 pb-0">
                  <div className="relative w-full h-56 bg-white flex items-center justify-center rounded-2xl overflow-hidden">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow text-left">
                  <p className="text-sm text-gray-500 font-medium mb-1">VIP DARSHAN</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{t.name}</h3>
                  <p className="text-sm text-slate-600 mb-3">{t.location}</p>
                  <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-3">{t.desc}</p>
                  <div className="mt-auto mb-5">
                    <p className="text-2xl font-extrabold text-slate-900">₹{t.basePrice.toLocaleString("en-IN")}</p>
                  </div>
                  <Link href={`/temples/${t.slug}`} className="w-full">
                    <Button className="w-full bg-slate-900 hover:bg-slate-700 text-white rounded-full py-3 text-base font-semibold transition-all transform hover:scale-[1.01]">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
