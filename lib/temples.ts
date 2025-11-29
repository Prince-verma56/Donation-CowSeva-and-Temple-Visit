// lib/temples.ts
export type Temple = {
  id: string;
  name: string;
  slug: string;
  location: string;
  desc: string;
  image: string;
  basePrice: number; // INR
};

export const TEMPLES: Temple[] = [
  {
    id: "t1",
    name: "Kashi Vishwanath Temple",
    slug: "kashi-vishwanath",
    location: "Varanasi, Uttar Pradesh",
    desc: "Experience a guided VIP darshan at one of the most sacred Jyotirlinga shrines, with priority access and seamless assistance.",
    image: "/Images/Backgrounds/TraditionalBg.png",
    basePrice: 1999,
  },
  {
    id: "t2",
    name: "Somnath Temple",
    slug: "somnath",
    location: "Prabhas Patan, Gujarat",
    desc: "Sacred coastal temple known for its profound spiritual aura. Book priority darshan with trusted local facilitation.",
    image: "/Images/Backgrounds/LightBlueTheme.png",
    basePrice: 1499,
  },
  {
    id: "t3",
    name: "Tirumala Venkateswara Temple",
    slug: "tirumala-venkateswara",
    location: "Tirupati, Andhra Pradesh",
    desc: "Priority darshan assistance at the renowned hill shrine. Smooth scheduling, queue guidance, and verification support.",
    image: "/Images/Backgrounds/PastelBg.png",
    basePrice: 2499,
  },
];

export function getTempleBySlug(slug: string) {
  return TEMPLES.find((t) => t.slug === slug) ?? null;
}

// TODO: Persist temple catalog in database and expose admin editing
// TODO: Add price tiers, add-ons, and seasonal availability
