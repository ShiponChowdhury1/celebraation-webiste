"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { PhoneReveal } from "@/components/phone-reveal";
import { Reviews } from "@/components/reviews";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

interface Occasion {
  title: string;
  image: string;
  textColor: string;
}

export default function Home() {
  const occasions: Occasion[] = [
    {
      title: "Birthday",
      image: "/images/wish/birthday.png",
      textColor: "#8E51FF",
    },
    {
      title: "Wedding",
      image: "/images/wish/wedding.png",
      textColor: "#EC008C",
    },
    {
      title: "Graduation",
      image: "/images/wish/graduation.png",
      textColor: "#009966",
    },
    {
      title: "Baby Shower",
      image: "/images/wish/baby-shower.png",
      textColor: "#2F80ED",
    },
    {
      title: "Anniversary",
      image: "/images/wish/anniversary.png",
      textColor: "#F2994A",
    },
    {
      title: "Retirement",
      image: "/images/wish/retirement.png",
      textColor: "#EB5757",
    },
    {
      title: "Holiday",
      image: "/images/wish/holiday.png",
      textColor: "#E0245E",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FF] font-sans flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 1. Banner/Hero Section */}
        <Hero />

        {/* 2. One Platform for Every Celebration - Infinite Marquee */}
        <section className="w-full py-24 bg-gradient-default border-b border-purple-100/30 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 md:px-[50px] text-center mb-12">
            <span className="text-[#7C3AED] font-semibold text-xs md:text-sm tracking-widest uppercase block mb-3 animate-pulse">
              Everything you need
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
              One platform for every celebration
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              From the first reminder to the final reveal — Celebr handles every detail.
            </p>
          </div>

          {/* Infinite Scrolling Occasion Cards Track */}
          <div className="relative w-full overflow-hidden py-4 select-none">
            {/* Fade overlays at edges for premium look */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FAF8FF] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FAF8FF] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex gap-6 hover:[animation-play-state:paused] duration-300">
              {[...occasions, ...occasions, ...occasions].map((occ, idx) => (
                <div
                  key={idx}
                  className="w-[220px] sm:w-[260px] md:w-[280px] bg-white border border-purple-100/20 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col shrink-0"
                >
                  {/* Top Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50">
                    <img 
                      src={occ.image} 
                      alt={occ.title} 
                      className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Bottom Text block */}
                  <div className="p-4 bg-white text-left select-none flex-grow flex items-center">
                    <h3 
                      className="font-bold text-sm md:text-base tracking-tight capitalize"
                      style={{ color: occ.textColor }}
                    >
                      {occ.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. How Wishpool Works */}
        <HowItWorks />

        {/* 5. Phone Mockup / Celebration Reveal */}
        <PhoneReveal />

        {/* 6. Real Celebrations Stories */}
        <Reviews />

        {/* 7. FAQs */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
