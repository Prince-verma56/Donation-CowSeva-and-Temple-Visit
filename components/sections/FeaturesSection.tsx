"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const features = [
  { icon: "✓", title: "Transparent Tracking", desc: "Real-time updates on where your money goes" },
  { icon: "🛡️", title: "Secure Payments", desc: "Bank-level encryption for all transactions" },
  { icon: "📱", title: "Easy to Use", desc: "Simple, intuitive platform for everyone" },
  { icon: "🏆", title: "Verified Impact", desc: "Admin verified donations with proof" },
];

export function FeaturesSection() {
  return (
    <section className="relative z-5 py-20 px-6 sm:px-12 lg:px-16 bg-linear-to-b from-white to-orange-50 border-t border-orange-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-slate-900 mb-4" style={{ fontFamily: 'Qasira' }}>
            Why Choose CowSeva?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-linear-to-br from-orange-50 to-white border border-orange-200 p-6 hover:border-orange-400 hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors" style={{ fontFamily: 'Montserrat' }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600" style={{ fontFamily: 'Montserrat' }}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
