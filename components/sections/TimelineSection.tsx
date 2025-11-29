"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
// Import required icons
import { Feather, Zap, Building2, Compass, Eye, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';

// --- Icon Mapping ---
const IconMap = {
  Feather,
  Zap,
  Building2,
  Compass,
  Eye,
  ShieldCheck,
  Heart
};

type TimelineItem = { id: number; badge: string; title: string; desc: string; iconName: keyof typeof IconMap };
const timelineData: TimelineItem[] = [
  {
    id: 1,
    badge: "Listen",
    title: "Follow the Calling",
    desc: "Choose the cow or seva that resonates with your heart.",
    iconName: "Feather",
  },
  {
    id: 2,
    badge: "Rescue",
    title: "Reach & Rescue",
    desc: "Our team responds, rescues the animal, and brings it to safety.",
    iconName: "ShieldCheck",
  },
  {
    id: 3,
    badge: "Heal",
    title: "Care & Treatment",
    desc: "Veterinary care, medicines, and gentle rehabilitation.",
    iconName: "Zap",
  },
  {
    id: 4,
    badge: "Nourish",
    title: "Daily Care",
    desc: "Feeding, clean water, bedding, and ongoing nourishment.",
    iconName: "Building2",
  },
  {
    id: 5,
    badge: "Verify",
    title: "Verified Updates",
    desc: "Receive photos and short progress notes from caretakers.",
    iconName: "Eye",
  },
  {
    id: 6,
    badge: "Share",
    title: "Spread the Blessing",
    desc: "Share your seva story and inspire others to join.",
    iconName: "Heart",
  },
];

// --- Framer Motion Variants for Professional Feel ---
const springTransition: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 12,
  mass: 0.8
};

// Container for the whole section content (staggers header elements)
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger text first
      delayChildren: 0.15,
    },
  },
};

// Item variant for header text elements (Badge, Title, Paragraph)
const headerItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};

// Container for the horizontal scrolling cards (staggers the cards)
const cardTrackContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Stagger card appearance horizontally
      delayChildren: 0.4, // Wait after header animation finishes
    }
  }
};

// Item variant for individual timeline cards
const cardItemVariants = {
  hidden: { opacity: 0, x: 50, rotateX: 10 },
  visible: {
    opacity: 1,
    x: 0,
    rotateX: 0,
    transition: springTransition,
  },
};

// --- Custom Card Component ---
const TimelineCard = ({ data }: { data: { id: number; iconName: keyof typeof IconMap; badge: string; title: string; desc: string } }) => {
  const CardIcon = IconMap[data.iconName] || Feather; 
  
  return (
    <div
      className="flex flex-col flex-shrink-0 w-[90vw] sm:w-[350px] h-[300px] p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-300 hover:shadow-amber-500/20 hover:scale-[1.01] border border-stone-100"
      aria-label={`Step ${data.id}: ${data.title}`}
    >
      <div className="flex items-start justify-between">
        {/* Step Number */}
        <div className="flex items-center justify-center w-10 h-10 text-xl font-bold text-amber-700 border-2 border-amber-700 bg-white rounded-full shrink-0">
          {data.id}
        </div>
        {/* Card Icon */}
        <div className="p-3 bg-amber-50 rounded-full">
            <CardIcon className="w-6 h-6 text-amber-600" aria-hidden="true" />
        </div>
      </div>
      
      <h3 className="mt-6 mb-2 text-2xl font-bold text-stone-800">
        {data.title}
      </h3>
      <p className="text-stone-600 text-base">
        {data.desc}
      </p>
      
      <span className="mt-auto pt-4 text-sm font-medium text-amber-600 flex items-center gap-1">
        {data.badge} <ArrowRight className="w-3 h-3"/>
      </span>
    </div>
  );
};


export function TimelineSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Adjusted scroll amount for smooth snapping
      const scrollAmount = scrollRef.current.clientWidth * 0.8; 
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      
      setTimeout(checkScrollPosition, 350); 
    }
  };

  const checkScrollPosition = (): void => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Small tolerance (5px) for reaching the end
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;
      setCanScrollRight(!isAtEnd);
    }
  };

  React.useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      checkScrollPosition();
      element.addEventListener('scroll', checkScrollPosition);
      // Check position again on resize
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        element.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);
  
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-sky-50 via-cyan-50 to-white">
        
      {/* Scrollbar hiding styles for performance/aesthetics */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        {/* Header Content */}
        <div className="w-full max-w-4xl text-center mx-auto mb-16">
          
          {/* Badge */}
          <motion.div variants={headerItemVariants}>
            <span className="inline-flex items-center px-5 py-2 mb-6 text-sm font-bold tracking-wider text-white uppercase rounded-full shadow-lg bg-gradient-to-r from-amber-300 to-orange-600 shadow-orange-900/10">
              <Star className="w-4 h-4 mr-2 text-white fill-white/20" />
              Seva Journey
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 variants={headerItemVariants} className="text-4xl sm:text-5xl font-extrabold text-stone-900 mb-4">
            Our Care Workflow
          </motion.h2>
          
          {/* Paragraph */}
          <motion.p variants={headerItemVariants} className="text-xl text-stone-700/80">
            We guide the process from the moment of rescue to lifelong care, focusing on health, nourishment, and spiritual connection.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Scrollable Track - Now wrapped in motion.div to stagger children */}
          <motion.div
            ref={scrollRef}
            variants={cardTrackContainerVariants}
            className="flex overflow-x-auto snap-x snap-mandatory pb-6 gap-8 hide-scrollbar"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory' 
            }}
          >
            {timelineData.map((item) => (
              <motion.div 
                key={item.id} 
                className="snap-start flex-shrink-0"
                variants={cardItemVariants} // Applies staggered entrance animation
              >
                <TimelineCard data={item} />
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            
            {/* Left Arrow */}
            <motion.button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`
                pointer-events-auto p-3 rounded-full shadow-lg transition-all duration-300 border border-amber-100
                ${canScrollLeft ? 'bg-white text-amber-700 hover:bg-amber-50' : 'bg-white/50 text-stone-300 cursor-not-allowed'}
                -ml-4 sm:-ml-8
              `}
              whileHover={canScrollLeft ? { scale: 1.1 } : {}}
              whileTap={canScrollLeft ? { scale: 0.95 } : {}}
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            {/* Right Arrow */}
            <motion.button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`
                pointer-events-auto p-3 rounded-full shadow-lg transition-all duration-300 border border-amber-100
                ${canScrollRight ? 'bg-white text-amber-700 hover:bg-amber-50' : 'bg-white/50 text-stone-300 cursor-not-allowed'}
                -mr-4 sm:-mr-8
              `}
              whileHover={canScrollRight ? { scale: 1.1 } : {}}
              whileTap={canScrollRight ? { scale: 0.95 } : {}}
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
