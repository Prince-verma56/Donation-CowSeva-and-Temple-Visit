"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import type { Transition } from "framer-motion";
import { PlayCircle, Globe, Zap, Video, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Link from "next/link";

// =================== CONFIG & DATA ===================

const CARD_FEATURES = [
    {
        icon: Video,
        pill: "Live",
        title: "Live Virtual Parikrama",
        description: "Join the sacred walk in real time from your home.",
        accent: "from-amber-200/40 to-orange-200/50",
    },
    {
        icon: Globe,
        pill: "Global",
        title: "Global Community Darshan",
        description: "Pray together with devotees across the world.",
        accent: "from-amber-200/40 to-yellow-200/50",
    },
    {
        icon: Zap,
        pill: "HD",
        title: "High Definition Streaming",
        description: "Smooth, clear video on any device.",
        accent: "from-orange-200/40 to-red-200/50",
    },
    {
        icon: TrendingUp,
        pill: "Daily",
        title: "Daily Blessings & Mantras",
        description: "Short daily clips to keep you connected.",
        accent: "from-yellow-200/40 to-amber-200/50",
    },
];

const CUSTOM_VIDEO_SRC = "https://www.w3schools.com/html/mov_bbb.mp4";
const THUMBNAIL_SRC =
    "https://placehold.co/1280x720/FDBA74/ffffff?text=Live+Darshan+Thumbnail";
const THUMBNAIL_ALT = "Preview of the Live Online Darshan Stream";
const HERO_BG_IMAGE_URL = "/Images/Backgrounds/MandirBgDarshan2.png";

// =================== MOTION CONSTANTS ===================

const springTransition: Transition = {
    type: "spring",
    stiffness: 70,
    damping: 10,
    mass: 0.8,
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.99,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: springTransition,
    },
};

const videoItemVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            ...springTransition,
            delay: 0.3,
        },
    },
};

// =================== INTERACTIVE BUTTON ===================

interface InteractiveHoverButtonProps
    extends React.ComponentProps<typeof motion.button> {
    children: React.ReactNode;
}
const InteractiveHoverButton: React.FC<InteractiveHoverButtonProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className={`
        relative isolate overflow-hidden 
        rounded-full transition-all duration-500 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500
        ${className}
      `}
            {...props}
        >
            {/* Gradient background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 block pointer-events-none">
                {children}
            </span>
        </motion.button>
    );
};

// =================== VIDEO DIALOG ===================

interface VideoDialogProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc: string;
    thumbnailAlt: string;
}
const VideoDialog: React.FC<VideoDialogProps> = ({
    isOpen,
    onClose,
    videoSrc,
    thumbnailAlt,
}) => {
    const backdropVariants: any = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0.3 } },
    };

    const dialogVariants: any = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 },
        },
        exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                    aria-modal="true"
                    role="dialog"
                    aria-label="Live darshan video"
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-lg" />

                    <motion.div
                        className="relative w-full max-w-5xl rounded-2xl bg-gray-900 shadow-3xl overflow-hidden"
                        variants={dialogVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative pt-[56.25%]">
                            <video
                                src={videoSrc}
                                title={thumbnailAlt}
                                controls
                                autoPlay
                                playsInline
                                loop
                                className="absolute inset-0 w-full h-full object-cover"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white hover:text-amber-400 z-10 transition-colors rounded-full bg-black/50 hover:bg-black/70"
                            aria-label="Close video player"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// =================== HERO BANNER ===================

const HeroBanner: React.FC = () => (
    <section
        className="relative w-full min-h-screen overflow-hidden text-white flex items-center justify-start p-4 sm:p-12"
        aria-labelledby="hero-title"
    >
        {/* Background options */}
        <div className="absolute inset-0 z-0">
            {/* Default image background */}
            <img
                src={HERO_BG_IMAGE_URL}
                alt="Golden temple at sunset used as sacred background for online darshan."
                className="w-full h-full object-cover brightness-[0.6]"
                loading="eager"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/Images/Backgrounds/MandirBgDarshan2.png";
                }}
            />

            {/* Optional pure gradient background (SEO and performance friendly) */}
            {/*
      <div className="w-full h-full bg-gradient-to-br from-amber-700 via-orange-700 to-slate-900" />
      */}

            {/* Soft overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/10 to-transparent" />
        </div>

        <motion.div
            className="relative z-10 max-w-4xl text-left pl-0 md:pl-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.p
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase bg-white/10 rounded-full shadow-lg backdrop-blur-sm border border-white/20"
                variants={itemVariants}
            >
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Goseva Experience
            </motion.p>

            <motion.h1
                id="hero-title"
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-6 drop-shadow-2xl"
                variants={itemVariants}
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
                Experience Live
                <br />
                Online Darshan
            </motion.h1>

            <motion.p
                className="text-lg sm:text-2xl font-light max-w-2xl mb-10 drop-shadow-lg text-slate-100"
                variants={itemVariants}
                style={{ fontFamily: "Inter, sans-serif" }}
            >
                Access daily aarti and parikrama in HD and feel connected to the temple
                from wherever you are.
            </motion.p>

            <motion.div
                className="flex flex-wrap items-center gap-4"
                variants={itemVariants}
            >
                {/* <InteractiveHoverButton
                    className="w-full sm:w-auto text-white font-semibold px-10 py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl border-none rounded-full uppercase tracking-wide"
                    aria-label="Donate now and support Goseva"
                >
                    <div className="flex items-center gap-3">
                        Donate Now &amp; Support Goseva
                        <PlayCircle className="w-5 h-5 fill-white" />
                    </div>
                </InteractiveHoverButton> */}


                <Link href="/donation" className="w-full sm:w-auto">
                    <InteractiveHoverButton
                                        className="w-full sm:w-auto bg-linear-to-r from-amber-400 to-orange-600 hover:from-orange-500 hover:to-red-600 text-white font-bold px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 border-none rounded-full uppercase tracking-wide backdrop-blur-sm"
                    >
                        Donate Now &amp; Support Goseva 
                    </InteractiveHoverButton>
                </Link>

                <p className="text-xs sm:text-sm text-slate-200/90 max-w-xs">
                    Secure donations. Instant receipt. Direct support to live darshan and
                    cow care activities.
                </p>
            </motion.div>
        </motion.div>
    </section>
);

// =================== VIDEO + FEATURE CAROUSEL ===================

const VideoFeaturesSection: React.FC = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const waveY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const openVideo = () => setIsVideoOpen(true);
    const closeVideo = () => setIsVideoOpen(false);

    const handleScroll = (direction: "left" | "right") => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const scrollAmount = container.clientWidth * 0.7;
        const delta = direction === "left" ? -scrollAmount : scrollAmount;
        container.scrollBy({ left: delta, behavior: "smooth" });
    };

    return (
        <>
            <section
                ref={ref}
                className="relative w-full overflow-hidden bg-white pt-20 pb-40"
                aria-labelledby="video-section-heading"
            >
                {/* Background: abstract waves by default, or switch to image if needed */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full z-0"
                    style={{ y: waveY }}
                >
                    {/* Default SVG wave background */}
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 1440 800"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M0 800C240 700 480 600 720 500C960 400 1200 300 1440 200V0H0V800Z"
                            fill="#FEF3C7"
                            className="opacity-70"
                        />
                        <path
                            d="M0 700C240 600 480 500 720 400C960 300 1200 200 1440 100V0H0V700Z"
                            fill="#FBBF24"
                            className="opacity-40"
                        />
                    </svg>

                    {/* Optional image background instead of SVG */}
                    {/*
          <img
            src="/Images/Backgrounds/DarshanSectionBg.png"
            alt="Soft background for darshan feature section"
            className="w-full h-full object-cover opacity-80"
            loading="lazy"
          />
          */}
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading and video block */}
                    <motion.div
                        className="flex flex-col items-center justify-between gap-10"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.div className="text-center" variants={itemVariants}>
                            <h2
                                id="video-section-heading"
                                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-400 mb-4"
                                style={{ fontFamily: "Qasira" }}
                            >
                                The Live Darshan Experience
                            </h2>
                            <p
                                className="text-base sm:text-lg text-gray-600 mb-6 max-w-xl mx-auto"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Watch daily rituals, aarti, and special events streamed directly
                                from the main shrine.
                            </p>
                        </motion.div>

                        <motion.div
                            className="relative mt-2 w-full cursor-pointer group"
                            variants={videoItemVariants}
                            onClick={openVideo}
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-shadow duration-300">
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-300" />

                                <div className="relative rounded-3xl overflow-hidden">
                                    <div className="relative w-full pt-[56.25%] bg-gray-900">
                                        <img
                                            src={THUMBNAIL_SRC}
                                            alt={THUMBNAIL_ALT}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                                            loading="lazy"
                                            onError={(
                                                e: React.SyntheticEvent<HTMLImageElement, Event>
                                            ) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src =
                                                    "https://placehold.co/1280x720/FDBA74/ffffff?text=Video+Thumbnail";
                                            }}
                                        />

                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/45 transition-all duration-300">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xl border border-amber-100">
                                                <PlayCircle className="w-12 h-12 text-amber-600 fill-amber-600" />
                                            </div>
                                        </div>

                                        <span className="absolute bottom-4 left-4 text-xs sm:text-sm bg-red-600 text-white px-3 py-1 rounded-full font-semibold flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                            Live now
                                        </span>
                                        <span className="absolute bottom-4 right-4 text-xs sm:text-sm bg-black/60 text-white px-3 py-1 rounded-full font-medium">
                                            Temple Main Altar
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Feature carousel */}
                    <section
                        className="mt-14"
                        aria-label="Key benefits of online darshan"
                    >
                        <div className="flex items-center justify-between mb-4 gap-4">
                            <h3 className="text-sm font-semibold tracking-[0.25em] uppercase text-amber-700">
                                Features at a glance
                            </h3>
                            <div className="hidden sm:flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full h-9 w-9 border-gray-300 hover:bg-gray-100"
                                    onClick={() => handleScroll("left")}
                                    aria-label="Scroll features left"
                                >
                                    <span className="sr-only">Previous</span>
                                    <span aria-hidden="true">{"‹"}</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full h-9 w-9 border-gray-300 hover:bg-gray-100"
                                    onClick={() => handleScroll("right")}
                                    aria-label="Scroll features right"
                                >
                                    <span className="sr-only">Next</span>
                                    <span aria-hidden="true">{"›"}</span>
                                </Button>
                            </div>
                        </div>

                        <motion.div
                            ref={carouselRef}
                            className="w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory py-6 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={containerVariants}
                        >
                            {CARD_FEATURES.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    variants={itemVariants}
                                    style={{ transitionDelay: `${index * 0.05}s` }}
                                    className="snap-center inline-flex w-[82vw] sm:w-[50vw] md:w-[40vw] lg:w-[32vw] xl:w-[24vw] flex-shrink-0"
                                >
                                    <Card className="relative group rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-[0_12px_35px_rgba(15,23,42,0.12)] p-6 md:p-7 transition-all hover:shadow-[0_18px_45px_rgba(15,23,42,0.16)] hover:-translate-y-1.5">
                                        <div
                                            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-40 transition-opacity rounded-2xl`}
                                            aria-hidden="true"
                                        />

                                        <div className="relative flex items-center justify-between mb-4 gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-11 w-11 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                                                    <item.icon className="w-5 h-5 text-amber-600" />
                                                </div>
                                                <span className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-700 tracking-wide uppercase">
                                                    {item.pill}
                                                </span>
                                            </div>
                                            <div className="hidden sm:block text-[10px] text-gray-400 uppercase tracking-[0.22em]">
                                                Online Darshan
                                            </div>
                                        </div>

                                        <h4
                                            className="relative text-lg md:text-xl font-semibold text-gray-900 mb-2"
                                            style={{ fontFamily: "Cormorant Garamond, serif" }}
                                        >
                                            {item.title}
                                        </h4>
                                        <p
                                            className="relative text-sm text-gray-600 leading-relaxed"
                                            style={{ fontFamily: "Inter, sans-serif" }}
                                        >
                                            {item.description}
                                        </p>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>
                </div>
            </section>

            <VideoDialog
                isOpen={isVideoOpen}
                onClose={closeVideo}
                videoSrc={CUSTOM_VIDEO_SRC}
                thumbnailAlt={THUMBNAIL_ALT}
            />
        </>
    );
};

// =================== MAIN COMPONENT ===================

export default function OnlineDarshanSection() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* For better performance in Next you would normally use next/font instead of @import */}
            <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;700&family=Inter:wght@300;400;500;600;700&display=swap");
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
            <HeroBanner />
            <VideoFeaturesSection />
        </div>
    );
}

export { OnlineDarshanSection };
