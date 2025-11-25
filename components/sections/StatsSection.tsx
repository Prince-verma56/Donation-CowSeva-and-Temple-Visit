"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Heart, label: "Lives Saved", value: "2.5M+" },
  { icon: Users, label: "Active Donors", value: "500K+" },
  { icon: TrendingUp, label: "Total Donations", value: "₹50Cr+" },
];

export function StatsSection() {
  return (
    <section className="relative z-5 bg-linear-to-b from-white to-orange-50 py-16 px-6 sm:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <stat.icon className="w-10 h-10 mx-auto mb-3 text-orange-500" />
            <p className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Qasira' }}>
              {stat.value}
            </p>
            <p className="text-sm text-slate-600" style={{ fontFamily: 'Qasira' }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
