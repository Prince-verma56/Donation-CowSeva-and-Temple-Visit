'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingOverlayProps {
  isLoading?: boolean;
}

export function LoadingOverlay({ isLoading = false }: LoadingOverlayProps) {
  const [isVisible, setIsVisible] = useState(isLoading);
  const [isMounted, setIsMounted] = useState(isLoading);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isLoading) {
      // Use a microtask to avoid cascading renders
      queueMicrotask(() => {
        setIsMounted(true);
        setIsVisible(true);
      });
    }
  }, [isLoading]);

  // Detect if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      // Check if window width is less than 768px (md breakpoint) or if it's a touch device
      const isTouchDevice = () => {
        return (
          (typeof window !== 'undefined' &&
            ('ontouchstart' in window ||
              navigator.maxTouchPoints > 0)) ||
          false
        );
      };

      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isSmallScreen || isTouchDevice());
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    // Play video in loop
    video.loop = true;
    video.play().catch((err) => {
      console.log('Video autoplay prevented:', err);
    });
  }, [isVisible]);

  // Don't render anything if unmounted
  if (!isMounted) {
    return null;
  }

  // Select video based on device type
  const videoSrc = isMobile ? '/videos/LoadingPhone.mp4' : '/videos/Loading.mp4';

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
      }}
      className="fixed inset-0 z-50 w-full h-screen flex items-center justify-center bg-white overflow-hidden"
      id="loading-overlay"
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
