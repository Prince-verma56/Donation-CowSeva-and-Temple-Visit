'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePreloader } from '@/hooks/usePreloader';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  index: number;
}

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const increment = Math.ceil(value / 100);
    const interval = setInterval(() => {
      startValue += increment;
      if (startValue >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(startValue);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <span>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

export function SmallStatsCard({ icon, label, value, suffix, index }: StatCardProps) {
  const { isPreloaderComplete } = usePreloader();

  return (
    <motion.div
      className="w-full sm:w-48 sm:h-48 lg:w-56 lg:h-56 backdrop-blur-lg bg-linear-to-br from-white/15 to-white/5 border border-white/30 hover:border-white/50 rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 flex flex-col items-center justify-center text-center group"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isPreloaderComplete ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.2, ease: "easeOut" }}
      whileHover={{ y: -12, scale: 1.05, boxShadow: '0 30px 60px rgba(255, 165, 0, 0.4)' }}
    >
      {/* Icon Container */}
      <motion.div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#7a8162] flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:shadow-2xl"
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg">
          {icon}
        </div>
      </motion.div>

      {/* Content */}
      <div className="space-y-2 sm:space-y-3">
        <p className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-widest">{label}</p>
        <motion.p
          className="text-3xl sm:text-5xl font-black text-white drop-shadow-lg"
          style={{ fontFamily: 'Qasira' }}
        >
          {isPreloaderComplete ? <AnimatedCounter value={value} suffix={suffix} /> : `0${suffix}`}
        </motion.p>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className="mt-4 sm:mt-6 h-1.5 w-12 rounded-full bg-linear-to-r from-orange-300 via-yellow-400 to-amber-600 shadow-lg"
        initial={{ scaleX: 0 }}
        animate={isPreloaderComplete ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 0.7 + index * 0.15, duration: 0.7, ease: "easeOut" }}
      />
    </motion.div>
  );
}
