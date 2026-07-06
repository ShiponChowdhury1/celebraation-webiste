"use client";

import { Cake, Heart, GraduationCap, Baby, Users, Sun, Trees, Sparkles } from "lucide-react";

interface Category {
  name: string;
  textColor: string;
  bgColor: string;
  icon: React.ReactNode;
}

export function MarqueeCategory() {
  const categories: Category[] = [
    {
      name: "Birthday",
      textColor: "text-[#8516E5]",
      bgColor: "bg-[#E8CEFF]",
      icon: <Cake className="size-6 text-[#8516E5]" />,
    },
    {
      name: "Wedding",
      textColor: "text-[#D4085B]",
      bgColor: "bg-[#FFCAE0]",
      icon: <Heart className="size-6 text-[#D4085B]" />,
    },
    {
      name: "Graduation",
      textColor: "text-[#008767]",
      bgColor: "bg-[#D1FAE5]",
      icon: <GraduationCap className="size-6 text-[#008767]" />,
    },
    {
      name: "Baby Shower",
      textColor: "text-[#1D4ED8]",
      bgColor: "bg-[#DBEAFE]",
      icon: <Baby className="size-6 text-[#1D4ED8]" />,
    },
    {
      name: "Anniversary",
      textColor: "text-[#C2410C]",
      bgColor: "bg-[#FFEDD5]",
      icon: <Users className="size-6 text-[#C2410C]" />,
    },
    {
      name: "Retirement",
      textColor: "text-[#B91C1C]",
      bgColor: "bg-[#FEE2E2]",
      icon: <Sun className="size-6 text-[#B91C1C]" />,
    },
    {
      name: "Holiday",
      textColor: "text-[#BE123C]",
      bgColor: "bg-[#FFE4E6]",
      icon: <Trees className="size-6 text-[#BE123C]" />,
    },
    {
      name: "Celebrations",
      textColor: "text-[#6B21A8]",
      bgColor: "bg-[#F3E8FF]",
      icon: <Sparkles className="size-6 text-[#6B21A8]" />,
    },
  ];

  // Duplicate list to ensure seamless looping
  const marqueeItems = [...categories, ...categories, ...categories];

  return (
    <section className="w-full py-8 bg-[#FAF8FF] overflow-hidden border-y border-purple-100/50">
      <div className="relative w-full flex items-center">
        {/* Gradients to fade out the edges for a premium look */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FAF8FF] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FAF8FF] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6 items-center">
          {marqueeItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-8 py-4 rounded-3xl ${item.bgColor} border border-white/40 shadow-sm transition-transform hover:scale-105 duration-300 shrink-0`}
            >
              <div className="p-1.5 rounded-xl bg-white/70 shadow-xs flex items-center justify-center">
                {item.icon}
              </div>
              <span className={`font-semibold text-lg md:text-xl ${item.textColor} whitespace-nowrap`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
