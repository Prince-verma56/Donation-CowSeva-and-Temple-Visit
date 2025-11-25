"use client";
import React from 'react';
import { HeroSection } from './HeroSection';
import { VideoPlayerSection } from './VideoPlayerSection';
import { DonationCardsSection } from './DonationCardsSection';
import { TimelineSection } from './TimelineSection';
import { FeaturesSection } from './FeaturesSection';
import { CTASection } from './CTASection';

export default function LandingPage() {
  return (
    <>
    <main className="relative w-full overflow-hidden bg-white">
      <HeroSection />
      <VideoPlayerSection />
      <DonationCardsSection />
      <TimelineSection />
      <FeaturesSection />
      <CTASection />
    </main>
    </>
  );
}
