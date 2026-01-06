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
    amount: 101, // Minimal starting amount (s1: 499 -> 101)
    image: "/Images/DonationCardsImg/FirstRoti.png",
    tag: "Popular",
    slug: "feed-a-cow",
  },
  {
    id: "s2",
    name: "Shelter Care",
    desc: "Fund emergency treatments, necessary surgeries, and ongoing medication for sick cows.",
    amount: 501, // Next ascending amount (s2: 999 -> 501)
    image: "/Images/DonationCardsImg/CowsShed.png",
    tag: "Best Seller",
    slug: "medical-care",
  },
  {
    id: "s3",
    name: "Feeding a Cow",
    desc: "Contribute towards the maintenance and infrastructure of safe, clean cow shelters.",
    amount: 1101, // Higher amount (s3: 1499 -> 1101)
    image: "/Images/DonationCardsImg/GreenFodder.png",
    tag: "Featured",
    slug: "shelter-support",
  },
  {
    id: "s4",
    name: "Veterinary Support",
    desc: "Specialized, long-term veterinary care, physiotherapy, and nourishment for victims.",
    amount: 2501, // Highest amount (s4: 2499 -> 2501)
    image: "/Images/DonationCardsImg/MedicalTreat.png",
    tag: "Urgent",
    slug: "acid-attack-support",
  },
];


export function getSevaBySlug(slug: string) {
  return SEVAS.find(s => s.slug === slug) ?? null;
}
