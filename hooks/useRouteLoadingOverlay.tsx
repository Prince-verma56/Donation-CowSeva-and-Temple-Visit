'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLoadingOverlay } from './useLoadingOverlay';

export function useRouteLoadingOverlay() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoadingOverlay();
  const navigationTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleStart = () => {
      navigationTimeoutRef.current = setTimeout(() => {
        showLoading();
      }, 500); // Show loading after 500ms of navigation starting
    };

    const handleComplete = () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      hideLoading();
    };

    // You can use router events if Next.js provides them
    // For now, this is a template for implementing route transition loading

    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [showLoading, hideLoading]);

  return { showLoading, hideLoading };
}
