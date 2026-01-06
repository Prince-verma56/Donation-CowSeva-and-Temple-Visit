"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, cubicBezier } from 'framer-motion';
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { usePreloader } from "@/hooks/usePreloader";
import { SmallStatsCard } from '@/components/cards/SmallStatsCard';
import { Heart, Users } from 'lucide-react';
import { Button } from '../ui/button';

// --- ANIMATION VARIANTS (KEPT UNCHANGED) ---
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
    // Replicating stats data to get 4 cards for the 2x2 mobile grid
    { icon: <Heart className="w-full h-full" />, label: 'Shelters Built', value: 3500, suffix: '+' },
    { icon: <Users className="w-full h-full" />, label: 'Volunteers', value: 500, suffix: 'K+' },
];

// --- Custom Mobile Stat Card for Glassmorphism ---
type MobileStatProps = { icon: React.ReactNode; label: string; value: number; suffix: string; index: number };
const MobileStatCard = ({ icon, label, value, suffix, index }: MobileStatProps) => (
    <motion.div
        className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20 text-white flex flex-col items-center justify-center text-center"
        variants={itemVariants}
    >
        <div className="w-8 h-8 mb-2 text-white/80">{icon}</div>
        <p className="text-xl font-bold leading-tight">{value}{suffix}</p>
        <p className="text-sm font-medium opacity-80 uppercase">{label}</p>
        <div className="w-1/3 h-0.5 bg-slate-400 mt-2 rounded-full"></div>
    </motion.div>
);


export function HeroSection() {
    const { isPreloaderComplete } = usePreloader();

    return (
        <section className="relative w-full min-h-screen overflow-hidden rounded-b-4xl ">

            {/* Background Image (KEPT UNCHANGED) */}
            <div className="absolute inset-0 z-0 w-full h-full ">
                <Image
                    src="/Images/Backgrounds/CowAndMen.png"
                    alt="A man embracing a calf in a cow shelter, promoting a donation drive."
                    fill
                    sizes="100vw"
                    className="object-cover object-[50%_35%] md:object-center"
                    priority
                />

            </div>

            {/* Dark Overlay - FIX: Left-to-Right Gradient on ALL screens */}
            <div className="absolute inset-0 z-10 w-full h-full">
                <div className="absolute inset-0 left-[-40%] w-full h-full 
                    bg-gradient-to-r from-[#3C4A2C] via-[#3C4A2C]/85 to-transparent 
                    opacity-90 md:opacity-85">
                </div>
                {/* Optional subtle blur effect over the entire screen */}
                <div className="absolute inset-0 backdrop-blur-[1px] md:backdrop-blur-[.5px]"></div>
            </div>

            {/* Hero Content Container */}
            <div className="relative z-20 w-full min-h-screen flex flex-col justify-center pt-10 pb-6 sm:p-10 lg:p-16 lg:mt-10 md:mt-20 sm:mt-30">

                {/* --- DESKTOP VIEW (Visible on sm and up) --- (KEPT UNCHANGED) */}
                <div className="w-full max-w-7xl mx-auto hidden sm:block">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        {/* Left Content (Desktop) */}
                        <motion.div
                            className="col-span-1 lg:col-span-6 text-white space-y-4 sm:space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isPreloaderComplete ? "visible" : "hidden"}
                        >
                            {/* Heading */}
                            <motion.div className="space-y-2" variants={itemVariants}>
                                <h1
                                    className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight font-light tracking-tight"
                                    style={{ fontFamily: 'Qasira' }}
                                >
                                    Save Injured &amp; Sick
                                </h1>
                                <h1
                                    className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight font-light tracking-tight"
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

                            {/* CTA Buttons (Desktop) */}
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

                        {/* Right Content - Stats Cards Stacked (Desktop) */}
                        <motion.div
                            className="col-span-1 lg:col-span-6 flex flex-col gap-4 sm:gap-6 lg:gap-8 items-center lg:items-end justify-center lg:pr-4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={isPreloaderComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.7, delay: 0.4, ease: cubicBezier(0.17, 0.55, 0.55, 1) }}
                        >
                            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-4 sm:gap-6 lg:gap-8">
                                {statsData.slice(0, 2).map((stat, index) => (
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

                {/* ------------------------------------------------------------------ */}
                {/* --- MOBILE VIEW (Improved Responsiveness) --- */}
                {/* ------------------------------------------------------------------ */}
                <div className="w-full mx-auto sm:hidden">
                    <motion.div
                        // Padding adjusted for better edge spacing on all small screens
                        className="text-white pt-10 pb-16 text-center flex flex-col items-center px-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isPreloaderComplete ? "visible" : "hidden"}
                    >

                        {/* Hero Title & Subtitle - Text Area for better responsiveness */}
                        <div className="w-full max-w-sm text-left">
                            <motion.div className="space-y-1 mb-8" variants={itemVariants}>
                                <h1 className="text-[40px] leading-tight font-extrabold" style={{ fontFamily: 'Qasira' }}>
                                    Save Injured &amp; Sick
                                </h1>
                                <h1 className="text-[40px] leading-tight font-extrabold" style={{ fontFamily: 'Qasira' }}>
                                    Cows
                                </h1>
                            </motion.div>

                            {/* Neutral Line */}
                            <motion.div className="w-20 h-1 bg-slate-400 mb-8" variants={itemVariants}></motion.div>

                            {/* Paragraph */}
                            <motion.p
                                // Ensure max-w-full and flexible font size for small screens
                                className="text-base text-gray-100 font-light leading-snug mb-10"
                                variants={itemVariants}
                            >
                                They need your help. Accident victims, sick &amp; acid-attacked cows need urgent care and shelter.
                            </motion.p>
                        </div>

                        {/* CTA Buttons - Full width within a constrained container */}
                        <motion.div className="w-full max-w-sm space-y-4 mb-12" variants={containerVariants}>
                            <motion.div variants={itemVariants}>
                                <Link href="/donation" className="w-full block">
                                    <Button
                                        className="w-full text-base px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-[1.02] bg-amber-600 hover:bg-slate-700 text-white font-medium uppercase tracking-wider border-none flex items-center justify-center"
                                    >
                                        <div className="w-2 h-2  rounded-full mr-2"></div>
                                        Donate now
                                    </Button>
                                </Link>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Link href="/about" className="w-full block">
                                    <Button
                                        className="w-full text-base px-6 py-3 text-black rounded-full border bg-white border-white/40  hover:bg-white/10 font-medium uppercase tracking-wider backdrop-blur-md flex items-center justify-center"
                                    >
                                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                                        About me
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Stats Section - 2x2 Grid */}
                        <motion.div
                            // Constrain the max width of the grid for very large mobile/small tablet screens
                            className="grid grid-cols-2 gap-4 w-full max-w-sm"
                            variants={containerVariants}
                        >
                            {statsData.map((stat, index) => (
                                <MobileStatCard
                                    key={index}
                                    icon={stat.icon}
                                    label={stat.label}
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    index={index}
                                />
                            ))}
                        </motion.div>

                    </motion.div>
                </div>

            </div>
        </section>
    );
}
