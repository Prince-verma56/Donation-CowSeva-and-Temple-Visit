'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface NotFoundOverlayProps {
  isVisible?: boolean;
  onClose?: () => void;
}

export function NotFoundOverlay({ isVisible = false, onClose }: NotFoundOverlayProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isMounted, setIsMounted] = useState(isVisible);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVisible) {
      // Use a microtask to avoid cascading renders
      queueMicrotask(() => {
        setIsMounted(true);
        setShouldRender(true);
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldRender) return;

    // Play video in loop
    video.loop = true;
    video.play().catch((err) => {
      console.log('Video autoplay prevented:', err);
    });
  }, [shouldRender]);

  const handleClose = () => {
    setShouldRender(false);
    setTimeout(() => {
      setIsMounted(false);
      onClose?.();
    }, 800);
  };

  // Don't render anything if unmounted
  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={shouldRender ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
      }}
      className="fixed inset-0 z-50 w-full h-screen flex items-center justify-center bg-white overflow-hidden cursor-pointer group"
      id="not-found-overlay"
      onClick={handleClose}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/videos/NotFound.mp4"
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Close Hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-white font-semibold text-sm backdrop-blur-md bg-black/30 px-4 py-2 rounded-full">
          Click to continue
        </p>
      </motion.div>
    </motion.div>
  );
}
