'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PreloaderContextType {
  isPreloaderComplete: boolean;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  useEffect(() => {
    // Listen for preloader completion
    const handlePreloaderComplete = () => {
      setIsPreloaderComplete(true);
    };

    // Custom event that will be triggered by PreloaderComponent
    window.addEventListener('preloader-complete', handlePreloaderComplete);

    return () => {
      window.removeEventListener('preloader-complete', handlePreloaderComplete);
    };
  }, []);

  return (
    <PreloaderContext.Provider value={{ isPreloaderComplete }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error('usePreloader must be used within PreloaderProvider');
  }
  return context;
}
