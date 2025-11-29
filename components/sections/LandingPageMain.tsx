"use client";
import React from 'react';
import { HeroSection } from './HeroSection';
import { VideoPlayerSection } from './VideoPlayerSection';
import { DonationCardsSection } from './DonationCardsSection';
import { TimelineSection } from './TimelineSection';
import { FeaturesSection } from './FeaturesSection';
import { AppFooter, CTASection } from './CTASection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <VideoPlayerSection />
      <DonationCardsSection />
      <TimelineSection />
      <FeaturesSection />
      <CTASection />
    </>
  );
}
