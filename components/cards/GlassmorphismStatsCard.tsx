'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, TrendingUp } from 'lucide-react';
import { usePreloader } from '@/hooks/usePreloader';

const statsData = [
  { icon: Heart, label: 'Lives Saved', value: '2.5M+' },
  { icon: Users, label: 'Active Donors', value: '500K+' },
  { icon: TrendingUp, label: 'Total Donations', value: '₹50Cr+' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export function GlassmorphismStatsCard() {
  const { isPreloaderComplete } = usePreloader();

  return (
    <motion.div
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300"
      variants={containerVariants}
      initial="hidden"
      animate={isPreloaderComplete ? 'visible' : 'hidden'}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(255, 255, 255, 0.2)' }}
    >
      {/* Header */}
      <motion.div className="mb-8" variants={itemVariants}>
        <h3
          className="text-xl sm:text-2xl font-semibold text-white mb-2"
          style={{ fontFamily: 'Qasira' }}
        >
          Our Impact
        </h3>
        <p className="text-white/70 text-sm">Together we&apos;re making a difference</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="space-y-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          >
            {/* Icon */}
            <motion.div
              className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-orange-400 to-amber-600 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </motion.div>

            {/* Content */}
            <div className="grow">
              <p className="text-white/80 text-xs sm:text-sm font-medium">{stat.label}</p>
              <p
                className="text-lg sm:text-2xl font-bold text-white"
                style={{ fontFamily: 'Qasira' }}
              >
                {stat.value}
              </p>
            </div>

            {/* Accent dot */}
            <div className="w-2 h-2 rounded-full bg-linear-to-r from-orange-400 to-amber-600" />
          </motion.div>
        ))}
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className="mt-8 h-1 rounded-full bg-linear-to-r from-orange-400 via-transparent to-transparent"
        initial={{ scaleX: 0 }}
        animate={isPreloaderComplete ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      />
    </motion.div>
  );
}
