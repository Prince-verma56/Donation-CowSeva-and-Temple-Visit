"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

function LandingPage() {
  const timeline = [
    { step: 1, title: "Select a Cause", desc: "Choose the animals you want to help" },
    { step: 2, title: "Make Donation", desc: "Secure and instant payment process" },
    { step: 3, title: "Track Impact", desc: "See real-time updates on your donation" },
    { step: 4, title: "Share Success", desc: "Celebrate the impact with community" },
  ];

  const stats = [
    { icon: Heart, label: "Lives Saved", value: "2.5M+" },
    { icon: Users, label: "Active Donors", value: "500K+" },
    { icon: TrendingUp, label: "Total Donations", value: "₹50Cr+" },
  ];

  const features = [
    { icon: "✓", title: "Transparent Tracking", desc: "Real-time updates on where your money goes" },
    { icon: "🛡️", title: "Secure Payments", desc: "Bank-level encryption for all transactions" },
    { icon: "📱", title: "Easy to Use", desc: "Simple, intuitive platform for everyone" },
    { icon: "🏆", title: "Verified Impact", desc: "Admin verified donations with proof" },
  ];

  return (
    <>
    <main className="relative w-full overflow-hidden bg-black">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image 
            src="/Images/Backgrounds/CowAndMen.png" 
            alt="A man embracing a calf in a cow shelter, promoting a donation drive."
            fill
            className="object-cover"
            quality={90}
            priority
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-y-0 left-0 z-10 
                        w-full md:w-3/5 lg:w-1/2 xl:w-2/5 
                        bg-gradient-to-r from-[#3C4A2C] via-[#3C4A2C]/80 to-transparent 
                        opacity-90 lg:opacity-85"></div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col justify-center items-start w-full min-h-screen p-6 sm:p-12 lg:p-16">
          <motion.div
            className="max-w-lg text-white space-y-5 md:space-y-7 lg:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Badge */}
            <motion.div variants={badgeVariants}>
              <Badge className="bg-orange-500/20 border border-orange-500/50 text-orange-100 hover:bg-orange-500/30">
                <span className="mr-2">🐄</span>
                20M+ Lives Saved — Read Success Stories
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl leading-tight font-light tracking-tight" 
              style={{ fontFamily: 'Qasira' }}
              variants={itemVariants}
            >
              Save Every Soul
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              className="text-lg sm:text-xl text-gray-100 font-light"
              style={{ fontFamily: 'Qasira' }}
              variants={itemVariants}
            >
              Empower cow rescue. Transform lives. Build compassion.
            </motion.p>

            {/* Value Proposition */}
            <motion.div className="space-y-4 pt-4" variants={itemVariants}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-4 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-orange-300" style={{ fontFamily: 'Qasira' }}>
                    8X Impact Value
                  </h3>
                  <span className="text-xs text-orange-200 hover:text-orange-100 cursor-pointer transition">
                    Read Story
                  </span>
                </div>
                <p className="text-sm text-gray-200" style={{ fontFamily: 'Qasira' }}>
                  Your donations directly save injured & abandoned cows with emergency care and shelter.
                </p>
              </Card>
            </motion.div>

            {/* Testimonial */}
            <motion.div 
              className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all"
              variants={itemVariants}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 text-lg">
                ❤️
              </div>
              <div>
                <p className="text-sm font-semibold text-white" style={{ fontFamily: 'Qasira' }}>
                  Priya Sharma / ⭐⭐⭐⭐⭐
                </p>
                <p className="text-xs text-gray-300" style={{ fontFamily: 'Qasira' }}>
                  NGO Director - Animal Welfare Foundation
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  "Transparent, impactful, and truly makes a difference."
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="flex gap-3 pt-4 flex-wrap" variants={itemVariants}>
              <Link href="/donation" className="w-full sm:w-auto">
                <Button 
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold rounded-full px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  Donate Now &mdash; Save Lives
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-3 text-base font-semibold"
                style={{ fontFamily: 'Montserrat' }}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-5 bg-gradient-to-b from-black/40 to-black/70 py-16 px-6 sm:px-12 lg:px-16">
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
              <stat.icon className="w-10 h-10 mx-auto mb-3 text-orange-400" />
              <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Qasira' }}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-300" style={{ fontFamily: 'Qasira' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works - Timeline */}
      <section className="relative z-5 bg-black/50 py-20 px-6 sm:px-12 lg:px-16 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-4" style={{ fontFamily: 'Qasira' }}>
              How It Works
            </h2>
            <p className="text-gray-300 text-lg" style={{ fontFamily: 'Qasira' }}>
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
                <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/30 backdrop-blur-sm p-6 relative z-10 hover:border-orange-500/60 transition-all group cursor-pointer">
                  <motion.div 
                    className="flex items-center gap-3 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold flex-shrink-0 group-hover:shadow-lg transition-all">
                      {item.step}
                    </div>
                  </motion.div>
                  <h3 className="font-semibold text-white mb-2" style={{ fontFamily: 'Qasira' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300" style={{ fontFamily: 'Qasira' }}>
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

      {/* Features Section */}
      <section className="relative z-5 py-20 px-6 sm:px-12 lg:px-16 bg-gradient-to-b from-black/50 to-black/80 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-4" style={{ fontFamily: 'Qasira' }}>
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
                <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/30 backdrop-blur-sm p-6 hover:border-orange-500/60 hover:bg-orange-500/20 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors" style={{ fontFamily: 'Qasira' }}>
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-300" style={{ fontFamily: 'Qasira' }}>
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

      {/* CTA Section */}
      <section className="relative z-5 bg-gradient-to-r from-orange-600/20 to-orange-500/20 backdrop-blur-sm border-t border-orange-500/30 py-20 px-6 sm:px-12 lg:px-16">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-4" style={{ fontFamily: 'Qasira' }}>
            Ready to make a difference?
          </h2>
          <p className="text-gray-200 mb-8 text-lg" style={{ fontFamily: 'Qasira' }}>
            Join thousands of compassionate donors saving lives every day.
          </p>
          <Link href="/donation">
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-10 py-3 text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
              style={{ fontFamily: 'Montserrat' }}
            >
              Start Donating Today
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
    </>
  );
}

export default LandingPage;
