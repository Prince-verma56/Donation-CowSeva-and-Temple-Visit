'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function PreloaderComponent() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      // Trigger exit animation
      setIsVisible(false);
    };

    // Add event listener for video end
    video.addEventListener('ended', handleVideoEnd);

    // Fallback: if video doesn't end in 15 seconds, force exit
    const fallbackTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 20000);

    // Try to play video
    video.play().catch((err) => {
      console.log('Video autoplay prevented:', err);
    });

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  // Update navbar visibility and remove preloader when animation completes
  useEffect(() => {
    if (!isVisible) {
      // Preloader animation is starting, show navbar after animation duration
      setTimeout(() => {
        const navbar = document.querySelector('.navbar-container');
        if (navbar) {
          navbar.classList.add('navbar-visible');
        }
      }, 50);

      // Dispatch event to trigger content animations
      setTimeout(() => {
        window.dispatchEvent(new Event('preloader-complete'));
      }, 400); // Dispatch halfway through animation for smooth transition

      // Remove preloader from DOM after animation completes
      setTimeout(() => {
        setIsMounted(false);
      }, 850); // 800ms animation + buffer
    }
  }, [isVisible]);

  // Don't render anything if unmounted
  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: '-100%', opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
      }}
      className="fixed inset-0 z-50 w-full h-screen flex items-center justify-center bg-white overflow-hidden"
      id="preloader-container"
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/videos/Logo Animation of VGS.mp4"
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
