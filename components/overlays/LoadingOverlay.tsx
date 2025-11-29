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
      queueMicrotask(() => {
        setIsMounted(true);
        setIsVisible(true);
      });
    } else {
      queueMicrotask(() => {
        setIsVisible(false);
      });
      // Unmount after the exit animation completes
      const t = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(t);
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

  // Lock body scroll while overlay is visible; restore on hide/unmount
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevBody || 'auto';
      document.documentElement.style.overflow = prevHtml || 'auto';
    }
    return () => {
      document.body.style.overflow = prevBody || 'auto';
      document.documentElement.style.overflow = prevHtml || 'auto';
    };
  }, [isVisible]);

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
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      aria-hidden={!isVisible}
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
