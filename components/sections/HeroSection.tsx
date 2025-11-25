"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { usePreloader } from "@/hooks/usePreloader";
import { SmallStatsCard } from '@/components/cards/SmallStatsCard';
import { Heart, Users } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const statsData = [
    { icon: <Heart className="w-full h-full" />, label: 'Lives Saved', value: 2500, suffix: '+' },
    { icon: <Users className="w-full h-full" />, label: 'Active Donors', value: 500, suffix: 'K+' },
];

export function HeroSection() {
    const { isPreloaderComplete } = usePreloader();

    return (
        <section className="relative w-full min-h-screen overflow-hidden rounded-b-4xl">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 w-full h-full ">
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
                      w-full md:w-2/3 lg:w-3/5 
                      bg-linear-to-r from-[#3C4A2C] via-[#3C4A2C]/80 to-transparent 
                      opacity-90 lg:opacity-85"></div>

            {/* Hero Content Container */}
            <div className="relative z-20 w-full min-h-screen flex flex-col justify-center p-6 sm:p-10 lg:p-16">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* Left Content */}
                        <motion.div
                            className="col-span-1 lg:col-span-6 text-white space-y-6 sm:space-y-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isPreloaderComplete ? "visible" : "hidden"}
                        >
                            {/* Main Heading - Multi-line */}
                            <motion.div className="space-y-2" variants={itemVariants}>
                                <h1
                                    className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight font-light tracking-tight"
                                    style={{ fontFamily: 'Qasira' }}
                                >
                                    Save Injured
                           
                                    &amp; Sick
                                </h1>
                                <h1
                                    className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight font-light tracking-tight"
                                    style={{ fontFamily: 'Qasira' }}
                                >
                                    Cows
                                </h1>
                            </motion.div>

                            {/* Paragraph */}
                            <motion.p
                                className="text-base sm:text-lg text-gray-100 font-light leading-relaxed max-w-xl"
                                style={{ fontFamily: 'Qasira' }}
                                variants={itemVariants}
                            >
                                They need your help. Accident victims, sick &amp; acid-attacked cows need urgent care and shelter.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-8" variants={itemVariants}>
                                <Link href="/donation" className="w-full sm:w-auto">
                                    <InteractiveHoverButton
                                        className="w-full sm:w-auto bg-linear-to-r from-amber-400 to-orange-600 hover:from-orange-500 hover:to-red-600 text-white font-bold px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 border-none rounded-full uppercase tracking-wide backdrop-blur-sm"
                                      
                                    >
                                        Donate now
                                    </InteractiveHoverButton>
                                </Link>
                                <Link href="/about" className="w-full sm:w-auto">
                                    <InteractiveHoverButton
                                        className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white font-bold px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 hover:border-white/50 rounded-full uppercase tracking-wide backdrop-blur-md"
                                        
                                    >
                                      About me
                                    </InteractiveHoverButton>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Stats Cards Stacked */}
                        <motion.div
                            className="col-span-1 lg:col-span-6 flex flex-col gap-4 sm:gap-6 lg:gap-8 items-center lg:items-end justify-center lg:pr-4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={isPreloaderComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                        >
                            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-4 sm:gap-6 lg:gap-8">
                                {statsData.map((stat, index) => (
                                    <SmallStatsCard
                                        key={index}
                                        icon={stat.icon}
                                        label={stat.label}
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
