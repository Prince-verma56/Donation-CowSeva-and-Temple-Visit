"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition } from 'framer-motion';

// --- INLINE UI COMPONENTS (Replaces external imports) ---

// 1. Simple Badge component (Replaces '@/components/ui/badge')
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}
const Badge: React.FC<BadgeProps> = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-4 py-2 text-xs sm:text-sm font-medium ${className || ""}`}>
    {children}
  </span>
);

// 2. Full-Screen Video Dialog (Replaces '@/components/ui/hero-video-dialog')
// This component implements the focus/blur effect and plays the custom video with controls.
interface VideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  thumbnailAlt: string;
}
const VideoDialog: React.FC<VideoDialogProps> = ({ isOpen, onClose, videoSrc, thumbnailAlt }) => {

  // Variants for the modal overlay background
  const backdropVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Variants for the video card itself (from-center animation)
  const dialogVariants: any = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
  };

  // Close when pressing ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose} // Close on backdrop click
    >
      {/* Backdrop with Focus/Blur Effect */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Video Content Container */}
      <motion.div
        className="relative w-full max-w-5xl rounded-2xl bg-slate-900 shadow-3xl overflow-hidden"
        variants={dialogVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside video box
      >
        <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
          {/* Custom Video Player with Controls */}
          <video
            src={videoSrc}
            title={thumbnailAlt}
            controls // Enables all standard video controls
            autoPlay // Auto-play when the dialog opens
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400 z-10 transition-colors p-2 rounded-full bg-black/50"
          aria-label="Close video player"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </motion.div>
    </motion.div>
  );
};


// --- FRAMER MOTION CONSTANTS ---

// Define the core duration and spring properties for a professional feel
const springTransition: Transition = {
  type: "spring",
  stiffness: 70,
  damping: 10,
  mass: 0.8
};

// Main container variants (Fast stagger for initial text elements)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Very fast stagger for text
      delayChildren: 0.1,    // Minimal initial delay
    },
  },
};

// Individual item variants (Smooth rise and slight scale-in for TEXT)
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20, // Reduced lift for faster feel
    scale: 0.99
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};

// **NEW VARIANT for the Video Section**
const videoItemVariants = {
  hidden: {
    opacity: 0,
    y: 50, // More pronounced lift
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springTransition,
      delay: 0.3, // **CRITICAL: Adds a delay after the text finishes its stagger**
    },
  },
};


// --- MAIN COMPONENT ---

export function VideoPlayerSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 💡 Your custom media file link (must be a direct link to an MP4, WEBM, etc.)
  const CUSTOM_VIDEO_SRC = "/videos/DemoCowVideo.mp4";
  const THUMBNAIL_SRC = "/Images/Backgrounds/SevaFooterImg2.png";
  const THUMBNAIL_ALT = "Cow Seva - Rescue and Recovery Stories";

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);


  return (
    <>
      <section className="relative w-full py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 bg-linear-to-br from-slate-50 via-sky-50 to-teal-50 border-b-2 rounded-4xl">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <motion.div
            className="space-y-6 sm:space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {/* Badge */}
            <motion.div className="flex justify-center" variants={itemVariants}>
              <Badge
                className="bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 font-medium rounded-full"
              >
                🎥 See Our Impact in Action
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.div className="text-center space-y-4" variants={itemVariants}>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
                style={{ fontFamily: 'Qasira' }}
              >
                Witness the Journey of
                <span className="block bg-linear-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Rescue &amp; Recovery
                </span>
              </h2>
            </motion.div>

            {/* Paragraph */}
            <motion.p
              className="text-center text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Montserrat' }}
              variants={itemVariants}
            >
              Discover the touching stories of cows saved from illness and injury. From their first moment of care to their full recovery, see how your donations transform lives and provide hope to those in need.
            </motion.p>

            {/* Video Player Card (MAIN VISUAL, THUMBNAIL) */}
            <motion.div
              className="relative mt-10 sm:mt-14 group"
              variants={videoItemVariants} // **Applied the delayed variant here**
              onClick={openVideo} // **CLICK HANDLER TO OPEN DIALOG**
            >
              <div className="relative cursor-pointer rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                {/* Card background with gradient border effect */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-400/20 to-teal-400/20 rounded-2xl lg:rounded-3xl"></div>
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl lg:rounded-3xl"></div>

                {/* Content - THUMBNAIL */}
                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden">
                  <div className="relative w-full pt-[56.25%] bg-gray-200"> {/* 16:9 Aspect Ratio container */}
                    <img
                      src={THUMBNAIL_SRC}
                      alt={THUMBNAIL_ALT}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = "https://placehold.co/1280x720/E0F7FA/00BCD4?text=Video+Thumbnail";
                      }}
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all duration-300">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xl">
                        <svg className="w-10 h-10 text-blue-600 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 rounded-2xl lg:rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            {/* Additional info below video */}
            <motion.div
              className="text-center mt-8 sm:mt-12"
              variants={itemVariants}
            >
              <p className="text-sm sm:text-base text-slate-600">
                <span className="font-semibold text-slate-900">2,500+ Lives Saved</span> •
                <span className="mx-2 font-semibold text-slate-900">500K+ Donors</span> •
                <span className="font-semibold text-slate-900">100% Transparent</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* RENDER THE VIDEO DIALOG */}
      <AnimatePresence>
        {isVideoOpen && (
          <VideoDialog
            key="video-dialog"
            isOpen={isVideoOpen}
            onClose={closeVideo}
            videoSrc={CUSTOM_VIDEO_SRC}
            thumbnailAlt={THUMBNAIL_ALT}
          />
        )}
      </AnimatePresence>
    </>
  );
}
