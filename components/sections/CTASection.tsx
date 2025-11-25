"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative z-5 bg-linear-to-r from-orange-400 to-orange-500 py-20 px-6 sm:px-12 lg:px-16 border-t border-orange-600">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl font-light text-white mb-4" style={{ fontFamily: 'Qasira' }}>
          Ready to make a difference?
        </h2>
        <p className="text-white/90 mb-8 text-lg" style={{ fontFamily: 'Qasira' }}>
          Join thousands of compassionate donors saving lives every day.
        </p>
        <Link href="/donation">
          <Button 
            className="bg-white hover:bg-slate-100 text-orange-600 font-semibold rounded-full px-10 py-3 text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
            style={{ fontFamily: 'Montserrat' }}
          >
            Start Donating Today
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
