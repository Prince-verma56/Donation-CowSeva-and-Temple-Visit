'use client';

import { useEffect } from 'react';
import { useLoadingOverlay } from '@/hooks/useLoadingOverlay';

export function LoadingDetector() {
  const { showLoading, hideLoading } = useLoadingOverlay();

  useEffect(() => {
    // Listen to page visibility changes (tab activity)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page hidden - no action needed
      } else {
        // Page visible again - hide loading
        hideLoading();
      }
    });

    // Listen to fetch/XMLHttpRequest for slow network requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const fetchStartTime = Date.now();
      try {
        const response = await originalFetch(...args);
        const fetchDuration = Date.now() - fetchStartTime;
        
        // Show loading if fetch takes more than 1 second
        if (fetchDuration > 1000) {
          showLoading();
        }
        
        return response;
      } catch (error) {
        hideLoading();
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [showLoading, hideLoading]);

  return null;
}
