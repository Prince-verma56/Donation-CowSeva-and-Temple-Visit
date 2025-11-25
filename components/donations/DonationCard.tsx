import Image from "next/image";
import { Button } from "@/components/ui/button";

interface DonationCardProps {
  item: {
    id: string;
    title: string;
    amount: number;
    image: string;
  };
  onDonate: () => void;
}

export default function DonationCard({ item, onDonate }: DonationCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden shadow hover:shadow-md transition-shadow">
      <div className="relative w-full h-40 bg-slate-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{item.title}</h3>
        <p className="text-sm text-slate-500 mt-1">Help us make a difference</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">₹{item.amount}</span>
          <Button onClick={onDonate} size="sm" className="bg-blue-600 hover:bg-blue-700">
            Donate
          </Button>
        </div>
      </div>
    </div>
  );
}
