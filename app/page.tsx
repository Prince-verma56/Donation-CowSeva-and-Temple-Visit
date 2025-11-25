import LandingPage from '@/components/sections/LandingPageMain';
import React from 'react';

// --- 1. Import all Components (The layout building blocks) ---


// --- 2. Import Configuration Data ---
// The data for the Hero section is imported here, not defined here.

export default function HomePage() {
  return (
<>
    <main className="w-full overflow-x-hidden ">
      <LandingPage />

    </main>
</>
  );
}