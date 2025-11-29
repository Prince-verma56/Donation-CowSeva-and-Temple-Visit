"use client";

import React from 'react';
import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog';

// Define the core duration and spring properties for a professional feel
const springTransition: Transition = {
  type: "spring",
  stiffness: 70,
  damping: 10,
  mass: 0.8
};

// Main container variants (Fast stagger for initial text elements)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Very fast stagger for text
      delayChildren: 0.1,    // Minimal initial delay
    },
  },
};

// Individual item variants (Smooth rise and slight scale-in for TEXT)
const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, // Reduced lift for faster feel
    scale: 0.99 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};

// **NEW VARIANT for the Video Section**
const videoItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, // More pronounced lift
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springTransition,
      delay: 0.3, // **CRITICAL: Adds a delay after the text finishes its stagger**
    },
  },
};


export function VideoPlayerSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 bg-linear-to-br from-slate-50 via-sky-50 to-teal-50 border-b-2 rounded-4xl">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          className="space-y-6 sm:space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Badge (Text element, uses itemVariants) */}
          <motion.div className="flex justify-center" variants={itemVariants}>
            <Badge 
              variant="outline"
              className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 text-xs sm:text-sm font-medium px-4 py-2 rounded-full"
            >
              🎥 See Our Impact in Action
            </Badge>
          </motion.div>

          {/* Heading (Text element, uses itemVariants) */}
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
              style={{ fontFamily: 'Qasira' }}
            >
              Witness the Journey of
              <span className="block bg-linear-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Rescue &amp; Recovery
              </span>
            </h2>
          </motion.div>

          {/* Paragraph (Text element, uses itemVariants) */}
          <motion.p
            className="text-center text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Montserrat' }}
            variants={itemVariants}
          >
            Discover the touching stories of cows saved from illness and injury. From their first moment of care to their full recovery, see how your donations transform lives and provide hope to those in need.
          </motion.p>

          {/* Video Player Card (MAIN VISUAL, **USES videoItemVariants**) */}
          <motion.div
            className="relative mt-10 sm:mt-14"
            variants={videoItemVariants} // **Applied the delayed variant here**
          >
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
              {/* Card background with gradient border effect */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-400/20 to-teal-400/20 rounded-2xl lg:rounded-3xl"></div>
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl lg:rounded-3xl"></div>

              {/* Content */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden">
                <HeroVideoDialog
                  animationStyle="from-center"
                  videoSrc="/videos/Preloader.mp4"
                  thumbnailSrc="/Images/Backgrounds/CowAndMen.png"
                  thumbnailAlt="Cow Seva - Rescue and Recovery Stories"
                />
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 rounded-2xl lg:rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </motion.div>

          {/* Additional info below video (Text element, uses itemVariants) */}
          <motion.div
            className="text-center mt-8 sm:mt-12"
            variants={itemVariants}
          >
            <p className="text-sm sm:text-base text-slate-600">
              <span className="font-semibold text-slate-900">2,500+ Lives Saved</span> • 
              <span className="mx-2 font-semibold text-slate-900">500K+ Donors</span> • 
              <span className="font-semibold text-slate-900">100% Transparent</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
