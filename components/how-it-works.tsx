"use client";

import Link from "next/link";
import { UserPlus, Palette, Link as LinkIcon, HeartHandshake, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function HowItWorks() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Add important people",
      description: "Build your network of family and friends. Add their birthdays, anniversaries, and milestones.",
      icon: <UserPlus className="size-6 text-[#7C3AED]" />,
    },
    {
      number: "02",
      title: "Create a celebration page",
      description: "Design a beautiful page for the occasion. Choose a theme, set a WishPool goal, and write a personal message.",
      icon: <Palette className="size-6 text-[#7C3AED]" />,
    },
    {
      number: "03",
      title: "Share the link",
      description: "Send a single link to everyone. They'll land on a beautiful page that explains exactly how to contribute.",
      icon: <LinkIcon className="size-6 text-[#7C3AED]" />,
    },
    {
      number: "04",
      title: "Collect contributions & messages",
      description: "Watch the fund grow in real time. Every contributor leaves a heartfelt message attached to their gift.",
      icon: <HeartHandshake className="size-6 text-[#7C3AED]" />,
    },
    {
      number: "05",
      title: "Reveal the celebration",
      description: "Present the recipient with a magical reveal: confetti, all their messages, and the grand total.",
      icon: <PartyPopper className="size-6 text-[#7C3AED]" />,
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-20 bg-gradient-default border-b border-purple-100/30">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[50px] text-center">
        
        {/* Sub-header */}
        <span className="text-[#7C3AED] font-semibold text-xs md:text-sm tracking-widest uppercase block mb-3">
          Simple as 1-2-3
        </span>
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
          How Wishpool works
        </h2>
        
        <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto mb-16">
          Five steps from idea to unforgettable moment.
        </p>

        {/* Timeline Grid */}
        <div className="relative w-full mb-16">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-purple-200 via-purple-300 to-pink-200 z-0" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center group"
              >
                {/* Step Circle with Icon */}
                <div className="relative mb-6">
                  {/* Number Overlay */}
                  <span className="absolute -top-3 -right-3 text-xs font-extrabold text-[#7C3AED] bg-purple-100 px-2 py-0.5 rounded-full z-20">
                    {step.number}
                  </span>

                  {/* Circle container */}
                  <div className="size-20 md:size-24 rounded-3xl bg-white border border-purple-100/80 shadow-md shadow-purple-100/20 flex items-center justify-center group-hover:scale-110 group-hover:border-purple-200 group-hover:shadow-lg group-hover:shadow-purple-100/40 transition-all duration-300 relative z-10">
                    <div className="p-4 rounded-2xl bg-purple-50 group-hover:bg-[#F9F3FF] transition-colors">
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Step Text Info */}
                <h3 className="text-lg font-bold text-zinc-900 mb-3 group-hover:text-[#7C3AED] transition-colors">
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <Link href="#get-started">
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-base h-[54px] px-8 rounded-full shadow-md shadow-purple-600/20 transition-all">
              Start your first celebration
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
