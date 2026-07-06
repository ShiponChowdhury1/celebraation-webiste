"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MarqueeCategory } from "@/components/marquee-category";
import { HowItWorks } from "@/components/how-it-works";
import { PhoneReveal } from "@/components/phone-reveal";
import { Reviews } from "@/components/reviews";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Cake, Heart, GraduationCap, Baby, Users, Sun, Trees, Gift } from "lucide-react";
import { motion } from "framer-motion";

interface Occasion {
  title: string;
  desc: string;
  icon: React.ReactNode;
  iconBg: string;
  cardBg: string;
  borderCol: string;
}

export default function Home() {
  const occasions: Occasion[] = [
    {
      title: "Birthday",
      desc: "Milestone birthdays, kids parties, and surprise reveals.",
      icon: <Cake className="size-6 text-[#8516E5]" />,
      iconBg: "bg-[#E8CEFF]/60",
      cardBg: "from-purple-50/50 to-white",
      borderCol: "hover:border-[#8516E5]/30",
    },
    {
      title: "Wedding",
      desc: "Group wedding registries, honeymoon pools, and wish walls.",
      icon: <Heart className="size-6 text-[#D4085B]" />,
      iconBg: "bg-[#FFCAE0]/60",
      cardBg: "from-pink-50/50 to-white",
      borderCol: "hover:border-[#D4085B]/30",
    },
    {
      title: "Graduation",
      desc: "Send graduates off with collective funds and encouraging advice.",
      icon: <GraduationCap className="size-6 text-[#008767]" />,
      iconBg: "bg-[#D1FAE5]/80",
      cardBg: "from-emerald-50/50 to-white",
      borderCol: "hover:border-[#008767]/30",
    },
    {
      title: "Baby Shower",
      desc: "Support new parents with diapers, nursery funds, and love.",
      icon: <Baby className="size-6 text-[#1D4ED8]" />,
      iconBg: "bg-[#DBEAFE]/80",
      cardBg: "from-blue-50/50 to-white",
      borderCol: "hover:border-[#1D4ED8]/30",
    },
    {
      title: "Anniversary",
      desc: "Honor relationships with group gifts and photo memories.",
      icon: <Users className="size-6 text-[#C2410C]" />,
      iconBg: "bg-[#FFEDD5]/80",
      cardBg: "from-orange-50/50 to-white",
      borderCol: "hover:border-[#C2410C]/30",
    },
    {
      title: "Retirement",
      desc: "Send colleagues off to their next chapter with warm memories.",
      icon: <Sun className="size-6 text-[#B91C1C]" />,
      iconBg: "bg-[#FEE2E2]/80",
      cardBg: "from-red-50/50 to-white",
      borderCol: "hover:border-[#B91C1C]/30",
    },
    {
      title: "Holiday",
      desc: "Group gifting pools for Secret Santa, Christmas, and Thanksgiving.",
      icon: <Trees className="size-6 text-[#BE123C]" />,
      iconBg: "bg-[#FFE4E6]/80",
      cardBg: "from-rose-50/50 to-white",
      borderCol: "hover:border-[#BE123C]/30",
    },
    {
      title: "Custom Event",
      desc: "Any other special moment worth gathering loved ones together.",
      icon: <Gift className="size-6 text-[#6B21A8]" />,
      iconBg: "bg-[#F3E8FF]/80",
      cardBg: "from-purple-50/50 to-white",
      borderCol: "hover:border-[#6B21A8]/30",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FF] font-sans flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 1. Banner/Hero Section */}
        <Hero />

        {/* 2. Horizontal Infinite Marquee */}
        <MarqueeCategory />

        {/* 3. One Platform for Every Celebration Grid */}
        <section className="w-full py-24 bg-gradient-default border-b border-purple-100/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-[50px] text-center">
            <span className="text-[#7C3AED] font-semibold text-xs md:text-sm tracking-widest uppercase block mb-3 animate-pulse">
              Everything you need
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
              One platform for every celebration
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
              From the first reminder to the final reveal — Celebr handles every detail.
            </p>

            {/* Occasion Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {occasions.map((occ, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`bg-gradient-to-br ${occ.cardBg} border border-purple-100/50 rounded-3xl p-6 text-left shadow-xs transition-all duration-300 hover:shadow-md hover:scale-102 hover:bg-white border-t-2 ${occ.borderCol} group`}
                >
                  <div className={`size-12 rounded-2xl ${occ.iconBg} flex items-center justify-center mb-5 shadow-xs transition-transform group-hover:scale-110 duration-200`}>
                    {occ.icon}
                  </div>
                  <h3 className="font-bold text-zinc-900 text-lg mb-2 group-hover:text-[#7C3AED] transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">
                    {occ.desc}
                  </p>
                </motion.div>
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
