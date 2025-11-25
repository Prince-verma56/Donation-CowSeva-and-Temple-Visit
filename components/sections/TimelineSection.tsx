"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const timeline = [
  { step: 1, title: "Select a Cause", desc: "Choose the animals you want to help" },
  { step: 2, title: "Make Donation", desc: "Secure and instant payment process" },
  { step: 3, title: "Track Impact", desc: "See real-time updates on your donation" },
  { step: 4, title: "Share Success", desc: "Celebrate the impact with community" },
];

export function TimelineSection() {
  return (
    <section className="relative z-5 bg-linear-to-b from-orange-50 to-white py-20 px-6 sm:px-12 lg:px-16 border-t border-orange-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-slate-900 mb-4" style={{ fontFamily: 'Qasira' }}>
            How It Works
          </h2>
          <p className="text-slate-600 text-lg" style={{ fontFamily: 'Qasira' }}>
            Simple steps to create real impact
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="bg-white border border-orange-200 p-6 hover:border-orange-400 transition-all group cursor-pointer hover:shadow-md">
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold shrink-0">
                    {item.step}
                  </div>
                </motion.div>
                <h3 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Montserrat' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600" style={{ fontFamily: 'Montserrat' }}>
                  {item.desc}
                </p>
              </Card>
              {index < timeline.length - 1 && (
                <motion.div
                  className="absolute top-8 -right-2 hidden md:block"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  <ArrowRight className="w-5 h-5 text-orange-500/50" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
