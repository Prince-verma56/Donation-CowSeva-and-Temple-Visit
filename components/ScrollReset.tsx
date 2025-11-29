'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollReset() {
  const pathname = usePathname();
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }, [pathname]);
  return null;
}
