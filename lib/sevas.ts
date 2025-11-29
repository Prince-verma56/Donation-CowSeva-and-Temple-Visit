// lib/sevas.ts
export type Seva = {
  id: string;
  name: string;
  desc: string;
  amount: number;     // amount in INR
  image: string;
  tag: string;
  slug: string;
};

export const SEVAS: Seva[] = [
  {
    id: "s1",
    name: "Seva Bhav",
    desc: "Provide nutritious food and daily care, essential for their well-being and recovery.",
    amount: 499,
    image: "/Images/DonationCardsImg/FirstRoti.png",
    tag: "Popular",
    slug: "feed-a-cow",
  },
  {
    id: "s2",
    name: "Shelter Care",
    desc: "Fund emergency treatments, necessary surgeries, and ongoing medication for sick cows.",
    amount: 999,
    image: "/Images/DonationCardsImg/CowsShed.png",
    tag: "Best Seller",
    slug: "medical-care",
  },
  {
    id: "s3",
    name: "Feeding a Cow",
    desc: "Contribute towards the maintenance and infrastructure of safe, clean cow shelters.",
    amount: 1499,
    image: "/Images/DonationCardsImg/GreenFodder.png",
    tag: "Featured",
    slug: "shelter-support",
  },
  {
    id: "s4",
    name: "Veterinary Support",
    desc: "Specialized, long-term veterinary care, physiotherapy, and nourishment for victims.",
    amount: 2499,
    image: "/Images/DonationCardsImg/MedicalTreat.png",
    tag: "Urgent",
    slug: "acid-attack-support",
  },
];

export function getSevaBySlug(slug: string) {
  return SEVAS.find(s => s.slug === slug) ?? null;
}
