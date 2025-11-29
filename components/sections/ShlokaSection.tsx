"use client";

import React, { useState, KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  BookOpen,
  Sparkles,
  Flower2,
  Quote,
  ScrollText,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Shloka = {
  id: string;
  sanskrit: string;
  hindi: string;
  english: string;
  theme: string;
  essence: string;
  image?: string;
};

const SHLOKAS: Shloka[] = [
  {
    id: "dhan-vyarth",
    sanskrit:
      "यस्य वित्तं न दानाय नोपभोगाय देहिनाम्। अप्रत्यक्षं च नो यशे न च धर्मे विनियोजितम्। तद् धनं निष्प्रभं लोके नृपस्येव गतद्युतिः॥",
    hindi:
      "जिस धन का न दान में, न भोग में, न यश में, न धर्म में उपयोग हो, वह धन व्यर्थ है जैसे फीका राजा।",
    english:
      "Wealth not used for charity, enjoyment, fame, or dharma is useless, like a king who has lost his radiance.",
    theme: "Right use of wealth",
    essence: "Wealth that does not serve others slowly loses its shine.",
    image: "/Images/ShlokasImgs/Shloka1.png",
  },
  {
    id: "dan-vriddhi",
    sanskrit:
      "गोदुग्धं वाटिकापुष्पं विद्या कूपोदकं धनम्। दानाद्विवर्धते नित्यं न दानात् विनश्यति॥",
    hindi:
      "गाय का दूध, फूल, विद्या, कुएँ का पानी, धन, दान से बढ़ते हैं, न देने से नष्ट हो जाते हैं।",
    english:
      "Cow milk, garden flowers, knowledge, well water and wealth grow when shared through charity and perish when held back.",
    theme: "Sharing increases abundance",
    essence: "What is meant to be shared grows only when it flows.",
    image: "/Images/ShlokasImgs/Shloka2.png",
  },
  {
    id: "kupatra-dan",
    sanskrit:
      "कुपात्रदानात् दरिद्रो भवति पापात् नरकगः। नरकात् पुनर्दारिद्र्यं तस्मात् कुपात्रं विवर्जयेत्॥",
    hindi:
      "अयोग्य को दान देने से दरिद्रता, पाप से नरक, और नरक से फिर दरिद्रता आती है, इसलिए कुपात्र को दान न दो।",
    english:
      "Wrongly placed charity leads to poverty, sin leads to suffering, and suffering again brings poverty. Avoid giving to the unworthy.",
    theme: "Discernment in giving",
    essence: "Compassion needs wisdom, not only emotion.",
    image: "/Images/ShlokasImgs/Shloka3.png",
  },
  {
    id: "guno-vina",
    sanskrit:
      "येषां न विद्या न तपो न दानं ज्ञानं न शीलं न गुणो न धर्मः। ते मर्त्यलोके भुविभारभूता मनुष्यरूपेण मृगाश्चरन्ति॥",
    hindi:
      "जिनमें न विद्या, न तप, न दान, न शील, न धर्म, वे मनुष्य रूप में पृथ्वी पर व्यर्थ भार हैं।",
    english:
      "Those without knowledge, discipline, charity, character or virtue only wander the earth as a burden in human form.",
    theme: "Qualities of a true human",
    essence: "Human birth finds meaning when it carries virtue.",
    image: "/Images/ShlokasImgs/Shloka4.png",
  },
  {
    id: "adharm-dhan",
    sanskrit:
      "अधर्मेण सम्पन्नं धनं दानं नाशयति प्रभो। नष्टे धने कथं दानं कर्तुं शक्यं नराधिप॥",
    hindi:
      "अधर्म से अर्जित धन दान को नष्ट कर देता है, धन नष्ट हो जाए तो दान कैसे होगा।",
    english:
      "Wealth gained through unrighteous means destroys the spirit of charity, and when that wealth perishes, true giving becomes impossible.",
    theme: "Purity of earnings",
    essence: "The source of wealth decides the purity of our charity.",
    image: "/Images/ShlokasImgs/Shloka5.png",
  },
  {
    id: "dvau-doshau",
    sanskrit:
      "लब्धानामपि वित्तानां बोद्धव्यौ द्वावतिक्रमौ। अपात्रे प्रतिपत्तिश्च पात्रे चाप्रतिपादनम्॥",
    hindi:
      "धन के दो अपराध हैं, अयोग्य को देना और योग्य को न देना, दोनों से जीवन निष्फल होता है।",
    english:
      "There are two misuses of wealth, giving to the undeserving and not giving to the deserving.",
    theme: "Balance in giving",
    essence: "Giving must be guided both by heart and by discrimination.",
    image: "/Images/ShlokasImgs/Shloka6.png",
  },
  {
    id: "maya-hetu",
    sanskrit:
      "माया हेतोस्तथाहङ्कारात् लज्जया वा प्रतिक्रमात्। यद् दानं तन्न साधति धर्मं वैष्णवमादरात्॥",
    hindi:
      "लोभ, अहंकार या लज्जा के कारण दान न देना धर्म को सिद्ध नहीं करता, ऐसा जीवन अधूरा रहता है।",
    english:
      "When charity is withheld out of greed, ego or false shame, it does not support dharma and leaves life incomplete.",
    theme: "Inner blocks to charity",
    essence: "Let generosity be stronger than ego and hesitation.",
    image: "/Images/ShlokasImgs/Shloka7.png",
  },
  {
    id: "aste-suryah",
    sanskrit:
      "यदि चास्तमिते सूर्ये न दत्तं धनमर्थिनाम्। तद्धनं नैव जानामि प्रातः कस्य भविष्यति॥",
    hindi:
      "सूर्यास्त तक यदि जरूरतमंद को धन न दिया, तो सुबह वह धन किसका होगा, कौन जानता है।",
    english:
      "If, by sunset, we have not given to those in need, who knows whose wealth it will be by sunrise.",
    theme: "Urgency in kindness",
    essence: "Opportunities to give do not wait forever.",
    image: "/Images/ShlokasImgs/Shloka8.png",
  },
  {
    id: "krodho-nashayati",
    sanskrit:
      "दानं नाशयति क्रोधो दानं नाशयति द्वेषः। दानं नाशयति मोहश्च तस्मात् दानं प्रकुर्वते॥",
    hindi:
      "क्रोध, द्वेष और मोह दान की भावना को नष्ट कर देते हैं, इसलिए इनसे ऊपर उठकर दान करना चाहिए।",
    english:
      "Anger, hatred and delusion destroy the spirit of charity, so giving must rise above them.",
    theme: "Emotional purity in giving",
    essence: "Before giving outside, we must soften inside.",
    image: "/Images/ShlokasImgs/Shloka9.png",
  },
  {
    id: "na-danam",
    sanskrit:
      "न दानं न तपो न जपो न होमो विधिना कृतः। तस्य जन्म व्यर्थं लोके पशुवत् भ्रमति सः॥",
    hindi:
      "जिसने न दान किया, न तप, न जप, न होम, उसका जन्म व्यर्थ है, वह पशु की तरह भटकता है।",
    english:
      "One who performs no charity, no austerity, no worship or sacred acts, wanders like an animal and his birth is wasted.",
    theme: "Purpose of human birth",
    essence: "A life without giving and inner growth remains unused.",
    image: "/Images/ShlokasImgs/Shloka10.png",
  },
];

export const ShlokaSection: React.FC<{ eager?: boolean }> = ({ eager: _eager }) => {
  const [activeId, setActiveId] = useState<string>(SHLOKAS[0]?.id);
  const shouldReduceMotion = useReducedMotion();

  const active = SHLOKAS.find((s) => s.id === activeId) ?? SHLOKAS[0];

  // Variants defined *inside* so we can use shouldReduceMotion
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.17, 0.55, 0.55, 1],
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.17, 0.55, 0.55, 1],
      },
    },
  };

  const handleKeySelect = (
    e: KeyboardEvent<HTMLDivElement>,
    id: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveId(id);
    }
  };

  return (
    <section
      id="shlokas"
      aria-labelledby="shloka-section-title"
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/80 via-blue-50/50 to-indigo-50/40" />
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-52 w-52 rounded-full bg-indigo-200/20 blur-3xl" />

      {/* header */}
      <header className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100/80">
              <Sparkles className="h-3.5 w-3.5 text-[#0089B0]" />
            </span>
            Dāna Shloka Series
          </p>
          <h2
            id="shloka-section-title"
            className="mt-3 text-3xl font-semibold font-['Qasira'] tracking-wide text-slate-800 sm:text-4xl"
          >
            Sacred verses on the joy of{" "}
            <span className="text-[#0089B0]">Giving</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
            One focused verse on top for deep reading, with a library of
            related shlokas just below for quick reflection.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 text-xs sm:flex-row sm:items-center sm:text-sm">
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50/80 text-slate-700"
          >
            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
            Sanskrit, Hindi, English
          </Badge>
          <Badge
            variant="outline"
            className="border-indigo-200 bg-indigo-50/80 text-slate-700"
          >
            <Flower2 className="mr-1.5 h-3.5 w-3.5" />
            Reflection friendly layout
          </Badge>
        </div>
      </header>

      {/* main animated container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/95 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm">
          {/* small glow at top edge */}
          <div className="pointer-events-none absolute inset-x-10 top-0 h-10 rounded-b-full bg-gradient-to-b from-blue-50 to-transparent opacity-60" />

          <div className="flex flex-col gap-8 p-5 sm:p-6 lg:p-8">
            {/* active shloka at top */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.99 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  ease: [0.17, 0.55, 0.55, 1],
                }}
                className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8"
              >
                {/* image */}
                <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-slate-100 lg:h-52 lg:max-w-sm">
                  <Image
                    src={
                      active.image ??
                      "/Images/shloka/shloka-featured-fallback.jpg"
                    }
                    alt="Decorative illustration for the featured shloka on charity"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 60vw, 100vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur shadow-sm">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    Now reading
                  </div>
                </div>

                {/* text area */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge className="rounded-full bg-slate-800 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-white">
                      {active.theme}
                    </Badge>
                    <span className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
                      Dana · Seva · Dharma
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                      {active.sanskrit}
                    </p>

                    <div className="space-y-1 rounded-2xl bg-blue-50/80 px-4 py-3 text-xs text-slate-700 sm:text-sm border border-blue-100/50">
                      <p className="font-medium">हिंदी अर्थ</p>
                      <p>{active.hindi}</p>
                    </div>

                    <div className="space-y-1 rounded-2xl bg-indigo-50/60 px-4 py-3 text-xs text-slate-700 sm:text-sm border border-indigo-100/50">
                      <p className="font-medium">English meaning</p>
                      <p>{active.english}</p>
                    </div>
                  </div>

                  <div className="mt-1 flex items-start gap-2 text-xs text-slate-600 sm:text-sm">
                    <Quote className="mt-[2px] h-3.5 w-3.5 text-blue-600" />
                    <p>{active.essence}</p>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-[0.7rem] text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100/80">
                        <ScrollText className="h-3.5 w-3.5 text-blue-600" />
                      </span>
                      Read slowly once, then pause with eyes closed for a few
                      breaths.
                    </span>
                    <Link
                      href="/shlokas"
                      aria-label="Explore all donation related shlokas"
                      className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-slate-700 underline-offset-4 hover:underline"
                    >
                      View full shloka archive
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Timeline strip (desktop) */}
            <div className="hidden md:block">
              <div className="relative mt-2 mb-6">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: [0.17, 0.55, 0.55, 1] }}
                  className="origin-left h-[2px] w-full rounded-full bg-slate-100"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/40 to-transparent rounded-full" />
                <div className="absolute inset-0 flex items-center justify-between px-1">
                  {SHLOKAS.map((shloka) => {
                    const isActive = shloka.id === active.id;
                    return (
                      <motion.button
                        key={shloka.id}
                        type="button"
                        onClick={() => setActiveId(shloka.id)}
                        className="relative flex items-center justify-center focus:outline-none"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.18 }}
                      >
                        <motion.span
                          className="h-2 w-2 rounded-full"
                          animate={
                            isActive
                              ? {
                                  scale: 1.7,
                                  boxShadow:
                                    "0 0 0 4px rgba(59,130,246,0.3)",
                                  backgroundColor: "rgb(37,99,235)",
                                }
                              : {
                                  scale: 1,
                                  boxShadow: "0 0 0 0px rgba(0,0,0,0)",
                                  backgroundColor: "rgb(148,163,184)",
                                }
                          }
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* label above grid */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100/80">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                </span>
                Other verses in this series
              </div>
              <p className="hidden text-[0.7rem] text-slate-500 sm:block">
                Tap any card below; it will gently move into focus at the top.
              </p>
            </div>

            {/* grid of shlokas, timeline-like stagger */}
            <motion.div
              variants={containerVariants}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {SHLOKAS.map((shloka) => {
                const isActive = shloka.id === active.id;

                return (
                  <motion.div
                    key={shloka.id}
                    variants={cardVariants}
                    className="relative"
                  >
                    <Card
                      role="button"
                      tabIndex={0}
                      aria-pressed={isActive}
                      aria-label={`View shloka about ${shloka.theme}`}
                      onClick={() => setActiveId(shloka.id)}
                      onKeyDown={(e) => handleKeySelect(e, shloka.id)}
                      className={[
                        "group relative h-full cursor-pointer overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                        isActive
                          ? "border-blue-300 shadow-[0_16px_32px_rgba(59,130,246,0.12)] ring-1 ring-blue-200"
                          : "border-slate-200 shadow-sm hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(0,0,0,0.08)]",
                      ].join(" ")}
                    >
                      {shloka.image && (
                        <div className="relative h-40 w-full overflow-hidden">
                          <Image
                            src={shloka.image}
                            alt="Decorative illustration for shloka"
                            fill
                            loading="lazy"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(min-width: 1024px) 260px, 33vw"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-white to-transparent" />
                        </div>
                      )}

                      <CardHeader className="flex items-start justify-between gap-3 px-4 pt-3 sm:px-5 sm:pt-4">
                        <div className="space-y-1">
                          <CardTitle className="text-sm font-semibold text-slate-800">
                            {shloka.theme}
                          </CardTitle>
                          <CardDescription className="text-[0.7rem] text-slate-600">
                            {shloka.essence}
                          </CardDescription>
                        </div>
                        <Badge
                          className={[
                            "rounded-full px-2 py-1 text-[0.65rem] font-semibold tracking-wide",
                            isActive
                              ? "bg-slate-800 text-white"
                              : "bg-blue-100/80 text-slate-700",
                          ].join(" ")}
                        >
                          {isActive ? "In focus" : "Tap to read"}
                        </Badge>
                      </CardHeader>

                      <CardContent className="space-y-2 px-4 pb-4 sm:px-5 sm:pb-5">
                        <p className="line-clamp-3 text-[0.75rem] leading-relaxed text-slate-700">
                          {shloka.sanskrit}
                        </p>
                        <p className="line-clamp-2 text-[0.7rem] text-slate-600">
                          {shloka.hindi}
                        </p>

                        <div className="mt-1 flex items-center justify-between text-[0.7rem] text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-blue-600" />
                            Reflection shloka
                          </span>
                          {isActive && (
                            <span className="inline-flex animate-pulse items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                              Reading now
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};
