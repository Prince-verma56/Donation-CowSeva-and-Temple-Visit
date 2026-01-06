"use client";

import React from "react";
import { motion, cubicBezier } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils, Syringe, Users, Heart } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import CircularGallery from "@/components/CircularGallery";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";

// --- Animation Variants ---
const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            when: "beforeChildren",
            staggerChildren: 0.2,
        },
    },
};

const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: cubicBezier(0.17, 0.55, 0.55, 1) },
    },
};

export function ServicesSection() {
    return (
        <motion.section
            aria-labelledby="services-heading"
            className="relative py-16 md:py-24 mt-20 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >
            {/* ==== Background Image + Overlay (restored to your old behavior) ==== */}
            <div
                className="pointer-events-none absolute inset-0 h-screen -z-10"
                aria-hidden="true"
            >
                <Image
                    src="/images/Backgrounds/PureWhiteSky.png"
                    alt=""
                    fill
                    sizes="100vw"
                    loading="lazy"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-white/85" />
            </div>
            {/* ================================================================ */}

            <div className="relative container max-w-6xl mx-auto px-4">
                {/* --- 1. Header Area --- */}
                <div className="text-center mb-16 md:mb-20 relative">
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        aria-hidden="true"
                    >
                        <div className="w-16 h-1 bg-amber-400/50 rounded-full" />
                    </div>
                    <div className="absolute top-2 right-10 hidden md:block" aria-hidden="true">
                        <div className="w-12 h-12 border-2 border-gray-100 rounded-lg" />
                    </div>

                    <motion.h2
                        id="services-heading"
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
                        variants={titleVariants}
                    >
                        How Can You <span className="text-[#E17100]">Help</span>?
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
                        variants={titleVariants}
                    >
                        Every Seva (Service) makes a profound difference. Choose the area
                        where you wish to support the most.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4"
                        variants={titleVariants}
                    >
                        {/* <Link href="/donation" className="inline-block">
                            <Button className="h-12 px-8 bg-amber-600 hover:bg-amber-700 text-white shadow-lg rounded-full font-semibold transition-all group">
                                Start Your Seva
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link> */}

                        <Link href="/about" className="w-full sm:w-auto">
                            <InteractiveHoverButton
                                className="h-12 px-8 bg-amber-600 hover:bg-amber-700 text-white shadow-lg rounded-full font-semibold transition-all group uppercase tracking-wide backdrop-blur-sm"
                            >
                                Know About Us
                            </InteractiveHoverButton>
                        </Link>

                        <Link href="/impact" className="inline-block">
                            <Button
                                variant="outline"
                                className="h-12 px-8 border-gray-300 text-gray-800 hover:bg-gray-50 rounded-full font-semibold transition-all"
                            >
                                View Our Impact
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* --- 2. Circular Gallery Section --- */}
                <section
                    aria-label="Gau Seva visual highlights"
                    className="w-full lg:w-[95%] mx-auto overflow-hidden relative bottom-12 shadow-4xl rounded-3xl"
                >
                    <div className="w-full scale-[2.8] h-auto min-h-[500px] shadow-md flex justify-center items-center">
                        <CircularGallery
                            items={[]}
                            bend={5}
                            borderRadius={0.06}
                            scrollEase={0.02}
                        />
                    </div>
                </section>

                {/* --- 3. Trusted Partners / Community Impact --- */}
                <motion.section
                    aria-labelledby="community-heading"
                    className="relative mt-20 md:mt-32 w-screen left-1/2 -translate-x-1/2 py-16 md:py-20 bg-white overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionVariants}
                >
                    {/* Soft background gradients */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        aria-hidden="true"
                    >
                        <div className="absolute -top-20 left-1/3 h-40 w-40 bg-amber-200/20 blur-3xl rounded-full" />
                        <div className="absolute bottom-0 right-10 h-60 w-60 bg-sky-200/20 blur-3xl rounded-full" />
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300/40 to-transparent" />
                    </div>

                    <div className="relative max-w-5xl mx-auto flex flex-col gap-12 px-4">
                        {/* Heading */}
                        <div className="text-center space-y-4">
                            <motion.h3
                                id="community-heading"
                                className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-amber-600 uppercase"
                                variants={itemVariants}
                            >
                                Supported by the Community
                            </motion.h3>

                            <motion.h4
                                className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900"
                                variants={itemVariants}
                            >
                                Together, we care for every life that reaches our Gaushala.
                            </motion.h4>

                            <motion.p
                                className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto"
                                variants={itemVariants}
                            >
                                Every Seva you make becomes food, medicine, and shelter for a
                                rescued cow. A small act of compassion builds a huge circle of care.
                            </motion.p>
                        </div>

                        {/* Stats + Ecosystem */}
                        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-start">
                            {/* Left: Stats Cards */}
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
                                variants={containerVariants}
                            >
                                {[
                                    {
                                        label: "Donors",
                                        value: "2.5k+",
                                        desc: "kind hearts contributing to Gau Seva.",
                                        accent: "from-amber-300/20 to-orange-200/20",
                                    },
                                    {
                                        label: "Cows Cared",
                                        value: "900+",
                                        desc: "receiving food, shelter, medical support.",
                                        accent: "from-green-300/20 to-emerald-200/20",
                                    },
                                    {
                                        label: "Cities Reached",
                                        value: "25+",
                                        desc: "supporters across India & abroad.",
                                        accent: "from-sky-300/20 to-blue-200/20",
                                    },
                                ].map((item) => (
                                    <motion.div key={item.label} variants={itemVariants}>
                                        <Card className="relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-[0_6px_18px_rgba(0,0,0,0.05)] p-5 md:p-6 transition-all hover:shadow-[0_8px_22px_rgba(0,0,0,0.08)] hover:-translate-y-1 group">
                                            <div
                                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-40 transition-opacity rounded-2xl`}
                                                aria-hidden="true"
                                            />

                                            <span className="relative inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-3 py-1 text-[11px] font-medium text-gray-600">
                                                {item.label}
                                            </span>

                                            <p className="relative text-2xl md:text-3xl font-semibold text-gray-900 mt-3">
                                                {item.value}
                                            </p>

                                            <p className="relative text-xs md:text-sm text-gray-500 leading-relaxed mt-1">
                                                {item.desc}
                                            </p>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Right: Quote + Ecosystem Icons */}
                            <motion.div
                                className="flex flex-col gap-6"
                                variants={containerVariants}
                            >
                                {/* Quote Card */}
                                <motion.div
                                    className="relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm p-6"
                                    variants={itemVariants}
                                >
                                    <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed mb-4">
                                        “Your Seva helps us treat injured cows, provide safe shelter,
                                        and serve prasadam to visiting devotees.”
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
                                            <Heart className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-gray-900">
                                                Community of Donors
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Transparent support, shared devotion, real impact.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Ecosystem Icons */}
                                <motion.div
                                    className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm px-5 py-5"
                                    variants={itemVariants}
                                >
                                    <p className="text-[10px] uppercase tracking-[0.26em] text-gray-600 mb-4">
                                        Support Ecosystem
                                    </p>

                                    <TooltipProvider>
                                        <div className="flex flex-wrap items-center gap-6">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-9 w-9 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                                                            <Heart className="w-5 h-5 text-amber-600" />
                                                        </div>
                                                        <span className="text-xs md:text-sm font-medium text-gray-800">
                                                            Donors
                                                        </span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>Thousands helping monthly.</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-9 w-9 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                                                            <Users className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <span className="text-xs md:text-sm font-medium text-gray-800">
                                                            Volunteers
                                                        </span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>On-ground seva team.</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-9 w-9 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                                                            <Syringe className="w-5 h-5 text-green-600" />
                                                        </div>
                                                        <span className="text-xs md:text-sm font-medium text-gray-800">
                                                            Medical Partners
                                                        </span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>Vets offering emergency care.</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-9 w-9 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                                                            <Utensils className="w-5 h-5 text-amber-600" />
                                                        </div>
                                                        <span className="text-xs md:text-sm font-medium text-gray-800">
                                                            Fodder Supporters
                                                        </span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>Fodder & grains suppliers.</TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </TooltipProvider>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </motion.section>
    );
}
