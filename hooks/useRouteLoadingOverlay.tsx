'use client';

import { useEffect, useRef } from 'react';
import { useLoadingOverlay } from './useLoadingOverlay';

export function useRouteLoadingOverlay() {
  const { showLoading, hideLoading } = useLoadingOverlay();
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timeoutId = navigationTimeoutRef.current;
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showLoading, hideLoading]);

  return { showLoading, hideLoading };
}
