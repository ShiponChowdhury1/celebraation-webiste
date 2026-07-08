"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Cake, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function PhoneReveal() {
  const [revealed, setRevealed] = useState(false);
  const [totalRaised, setTotalRaised] = useState(0);

  // Count up animation when revealed
  useEffect(() => {
    if (!revealed) {
      setTotalRaised(0);
      return;
    }

    let start = 0;
    const end = 840;
    const duration = 2000; // 2 seconds
    const range = end - start;
    let current = start;
    const increment = end > start ? 10 : -10;
    const stepTime = Math.abs(Math.floor(duration / (range / 10)));
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setTotalRaised(end);
        clearInterval(timer);
      } else {
        setTotalRaised(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [revealed]);

  const handleReveal = () => {
    setRevealed(true);
    
    // Blast confetti & emojis!
    const end = Date.now() + (2 * 1000); // 2 seconds duration
    
    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0.3, y: 0.8 },
        scalar: 1.5,
        shapes: ['emoji'],
        shapeOptions: {
          emoji: {
            value: ['🎉', '🎂', '💖', '🥳', '🧁', '🍰']
          }
        }
      } as any);
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 0.7, y: 0.8 },
        scalar: 1.5,
        shapes: ['emoji'],
        shapeOptions: {
          emoji: {
            value: ['🎉', '🎂', '💖', '🥳', '🧁', '🍰']
          }
        }
      } as any);

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  };

  const messages = [
    { sender: "Marcus Chen", amount: "$75", text: "Happy birthday! You deserve all the joy in the world! 🎉" },
    { sender: "David Okafor", amount: "$50", text: "Emma! Hope you have the most magical 30th birthday! 🎂" },
    { sender: "Melissa Torres", amount: "$100", text: "Cheers to 30 years of amazing memories! Love you! ❤️" },
    { sender: "Sarah Jenkins", amount: "$40", text: "So glad to be part of your celebration! Enjoy your day! ✨" }
  ];

  return (
    <section id="features" className="w-full py-24 bg-gradient-reveal border-b border-purple-100/30 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[50px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
          <span className="text-[#7C3AED] font-semibold text-xs md:text-sm tracking-widest uppercase block">
            The Reveal Moment
          </span>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            A reveal they'll remember <br className="hidden md:inline" />
            long after the day ends.
          </h2>
          
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
            When the moment arrives, you send one special link. They open it and see — for the first time — every message, every contributor, every word that was written for them. It's not just a gift. It's proof that people showed up.
          </p>

          {/* Blockquote Quote */}
          <div className="border-l-4 border-[#7C3AED] pl-6 my-2 py-1 text-zinc-700 bg-purple-50/50 pr-4 rounded-r-2xl">
            <p className="text-base md:text-lg italic font-light leading-relaxed">
              "I sat there reading each message three times. I had no idea so many people cared. It's the most meaningful gift I've ever received."
            </p>
            <cite className="block font-semibold text-sm text-zinc-900 mt-2 not-italic">
              — Rachel, 30th birthday recipient
            </cite>
          </div>

          {/* Checklist */}
          <ul className="flex flex-col gap-3.5 w-full mt-2">
            {[
              "Every contributor's personal message, beautifully displayed",
              "Grand total reveal with confetti animation",
              "Private — the recipient sees nothing until you're ready",
              "No app download needed — just a single link"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-700 text-sm md:text-base font-medium">
                <div className="p-1 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="size-4 text-[#7C3AED]" />
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <Link href="/login?mode=signup" className="w-full sm:w-auto mt-4">
            <Button className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-base h-[54px] px-8 rounded-full shadow-md shadow-purple-600/20 group transition-all">
              Create your celebration
              <ArrowRight className="size-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Right Side: Virtual Phone Mockup */}
        <div className="lg:col-span-5 flex justify-center relative w-full h-[650px]">
          
          {/* Subtle glow behind the phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-purple-300/20 blur-3xl z-0 pointer-events-none" />

          {/* Outer Phone Mockup (using HTML/CSS for responsive nesting, wrapped with public/images/Phone.png if available, but fully custom CSS guarantees fit) */}
          <div className="relative w-[320px] h-[640px] rounded-[48px] bg-zinc-950 border-[12px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col z-10">
            
            {/* Speaker & Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-12 h-1 bg-zinc-800 rounded-full" />
            </div>

            {/* Screen Inner Container */}
            <div className="flex-1 w-full h-full bg-gradient-to-tr from-purple-800 via-purple-600 to-pink-500 flex flex-col text-white pt-10 px-4 pb-4 overflow-y-auto select-none no-scrollbar">
              
              {!revealed ? (
                /* Unrevealed State */
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-8">
                  <div className="relative p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl animate-bounce duration-1000">
                    <Cake className="size-16 text-yellow-300 animate-pulse" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight">Emma's 30th Birthday</h3>
                    <p className="text-sm text-purple-100 opacity-90 mt-1">From 14 people who love you</p>
                  </div>

                  <p className="text-xs text-purple-200 bg-black/25 px-4 py-2.5 rounded-xl border border-white/10 max-w-[220px] leading-normal font-light">
                    The total amount and your personal messages are hidden until you unlock them!
                  </p>

                  <Button
                    onClick={handleReveal}
                    className="bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-extrabold px-8 py-6 rounded-full shadow-lg shadow-yellow-400/20 text-base flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Sparkles className="size-5 fill-current animate-spin-slow" />
                    Open Reveal!
                  </Button>
                </div>
              ) : (
                /* Revealed State */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-4 py-4"
                >
                  <div className="text-center">
                    <span className="text-[10px] tracking-widest font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full text-purple-100">
                      Your Celebration Reveal
                    </span>
                    <h3 className="text-2xl font-extrabold mt-3 tracking-tight">Emma's 30th Birthday</h3>
                    <p className="text-xs text-purple-200 font-light mt-0.5">from 14 people who love you</p>
                  </div>

                  {/* Total Raised Banner */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shadow-lg"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-200">Total Raised</span>
                    <div className="text-4xl font-extrabold mt-1 tracking-tight font-mono text-yellow-300">
                      ${totalRaised}
                    </div>
                  </motion.div>

                  {/* Birthday Wish Emojis rainfall indicator */}
                  <div className="flex items-center justify-between text-xs text-purple-200 font-bold px-1">
                    <span>Messages for you</span>
                    <span className="flex items-center gap-1 text-pink-300"><Heart className="size-3 fill-current" /> 14 wishes</span>
                  </div>

                  {/* Messages List Container */}
                  <div className="flex flex-col gap-3">
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.2, type: "spring", stiffness: 100 }}
                        className="bg-white text-zinc-800 rounded-2xl p-3.5 shadow-md flex gap-2.5 items-start text-left"
                      >
                        <div className="size-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {msg.sender.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="flex flex-col gap-0.5 w-full">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-zinc-900">{msg.sender}</span>
                            <span className="font-extrabold text-xs text-purple-600">{msg.amount}</span>
                          </div>
                          <p className="text-xs text-zinc-600 leading-normal font-light">
                            {msg.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Reset Reveal Button (to retry) */}
                  <button
                    onClick={() => setRevealed(false)}
                    className="text-xs text-purple-200 hover:text-white underline mt-2 text-center"
                  >
                    Reset & play again
                  </button>
                </motion.div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
