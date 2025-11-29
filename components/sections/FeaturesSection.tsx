"use client";
import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import type { Transition, Variants } from 'framer-motion';
import { ShieldCheck, Heart, Eye, ChevronDown, CheckCircle2, ArrowRight, Star, FileCheck2, Ambulance, Leaf } from 'lucide-react';
import Image from 'next/image'; 
// Removed GSAP imports for environment compatibility
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Removed GSAP registration
// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }

// --- Data ---
const featuresData = [
  {
    id: 1,
    icon: <Eye className="w-5 h-5" />,
    title: "100% Seva Transparency",
    content: "We believe in absolute clarity. You can track exactly how your donation is utilized—whether for fodder, medical treatment, or shelter maintenance. We provide regular verified updates."
  },
  {
    id: 2,
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Secure & Verified Processing",
    content: "Your contributions are processed through top-tier encrypted gateways. We ensure that every penny reaches the Gaushala safely without any intermediaries."
  },
  {
    id: 3,
    icon: <Heart className="w-5 h-5" />,
    title: "Holistic Cow Care",
    content: "It's not just about food. We focus on comprehensive care including veterinary surgeries, comfortable bedding, protection from weather, and emotional affection for abandoned cows."
  },
  {
    id: 4,
    icon: <Ambulance className="w-5 h-5" />,
    title: "24/7 Emergency Rescue",
    content: "Our rapid response teams are always ready. We operate dedicated cow ambulances to rescue accident victims and sick cattle from the streets immediately upon reporting."
  },
  {
    id: 5,
    icon: <FileCheck2 className="w-5 h-5" />,
    title: "Tax Exemption Benefits",
    content: "Your kindness is rewarded. All donations made to CowSeva are eligible for tax exemption under Section 80G. You receive an instant, valid donation receipt for your records."
  },
  {
    id: 6,
    icon: <Leaf className="w-5 h-5" />,
    title: "Eco-Friendly Sustainability",
    content: "We promote a circular economy. We utilize cow dung and urine to create organic manure, biogas, and natural medicines, ensuring a zero-waste, sustainable ecosystem."
  }
];

// Core Transition for smooth, professional entrance
const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1,
};

// 1. STANDARD ITEM VARIANT (For Badge and CTA)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: cubicBezier(0.17, 0.55, 0.55, 1) },
  },
};

// 2. TITLE CONTAINER VARIANT (For Staggering the words)
const titleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // Fast stagger for a quick, dramatic reveal
      delayChildren: 0.2,    // Wait slightly after the badge
    }
  }
};

// 3. WORD ANIMATION VARIANT (The "tracking-in" effect)
const wordAnimation: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10, 
    // Simulating letter-spacing contraction by starting small and fading in
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  }
};

// 4. PARAGRAPH FADE-IN (Delayed after the main title)
const paragraphFadeIn: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.7, // Appears after the main title words are finished
      ease: cubicBezier(0.17, 0.55, 0.55, 1),
    }
  }
};


// --- UTILITY FUNCTION ---
// Function to split text into motion spans for individual word animation
const splitText = (text: string, className?: string): React.ReactNode[] => {
  // Use a unique key for "Total Devotion" since it's one phrase
  const words = text.split(' ').filter(word => word.length > 0);
  
  return words.map((word, index) => (
    <motion.span 
      key={index} 
      variants={wordAnimation}
      className={`inline-block mr-2 ${className || ''}`} 
    >
      {word}
    </motion.span>
  ));
};


// --- Accordion Item Component ---
const AccordionItem = ({ item, isOpen, onClick }: { item: { icon: React.ReactNode; title: string; content: string }; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className={`border-b border-slate-200 last:border-0 transition-colors duration-300 ${isOpen ? 'bg-blue-50/50' : 'bg-transparent'}`}>
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between py-5 px-5 text-left transition-all hover:text-[#0088B2] focus:outline-none ${isOpen ? 'text-blue-700' : 'text-slate-800'}`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl transition-colors ${isOpen ? 'bg-blue-100 text-blue-600 shadow-sm' : 'bg-slate-100 text-slate-500'}`}>
            {item.icon}
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight font-sans">
            {item.title}
          </span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} 
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: cubicBezier(0.17, 0.55, 0.55, 1) }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-[4.75rem] pr-6 text-slate-600 leading-relaxed text-sm sm:text-base">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN COMPONENT ---
export function FeaturesSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  // Removed GSAP useLayoutEffect for environment compatibility
  useLayoutEffect(() => {
    // This effect is now empty, but kept for future use if GSAP is available
    if (!sectionRef.current) return;
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden bg-slate-50">
      
      {/* Decorative Background Blur */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* --- PART 1: HEADER SECTION (Centered) --- */}
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Triggers early
            className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
        >
            
            {/* Badge - Standard item animation */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center mb-6"
            >
                <span className="inline-flex items-center px-4 py-1.5 text-sm font-bold tracking-wider text-[#0088B2] uppercase bg-blue-100 rounded-full border border-blue-200 shadow-sm">
                    <Star className="w-3.5 h-3.5 mr-2 fill-current" />
                    Why CowSeva?
                </span>
            </motion.div>

            {/* Main Title - Uses Staggered Word Animation */}
            <motion.h2 
              variants={titleContainerVariants}
              className="text-4xl sm:text-5xl lg:text-8xl font-normal text-slate-900 mb-6 tracking-tight overflow-hidden leading-snug" 
              style={{ fontFamily: 'Qasira, serif' }}
            >
                {splitText("Trust. Transparency.", "text-slate-900")}
                <br />
                {/* Ensure "Total Devotion." is treated as its own block for color and spacing */}
                {splitText("Total Devotion.", "text-[#0088B2]")}
            </motion.h2>
            
            {/* Paragraph - Uses custom delayed fade-in */}
            <motion.p 
              variants={paragraphFadeIn}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto"
            >
                We don just ask for donations; we invite you to be part of a family that treats every cow as a mother.
            </motion.p>
        </motion.div>


        {/* --- PART 2: GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Large Feature Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-full min-h-[400px] lg:min-h-[550px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 group mt-2 bg-slate-200"
          >
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent z-10" />
            
            <Image
              src="/Images/DonationCardsImg/WhyClear.png"
              alt="Cow Seva Care and Transparency"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />

            {/* Content overlaid on image */}
            <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-sm">Verified NGO Partner</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Making a Real Impact</h3>
                <p className="text-slate-100 opacity-90">Every day, we feed over 500+ cows and provide medical aid to those injured in road accidents.</p>
            </div>
          </motion.div>


          {/* RIGHT COLUMN: Professional Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col h-full lg:-mt-2" 
          >
            {/* Accordion Container */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden relative z-20">
              {featuresData.map((feature, index) => (
                <AccordionItem
                  key={feature.id}
                  item={feature}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                />
              ))}
            </div>

            {/* CTA Button below Accordion */}
            <div className="mt-8 pl-2">
                <button className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 cursor-pointer bg-[#0088B2] rounded-full hover:bg-[#38bae1] hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                    Join Our Mission
                    <ArrowRight className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
