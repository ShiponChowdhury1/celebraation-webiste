"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Heart, Cake, Gift, Calendar, GraduationCap, Baby, Users, Sun, Trees, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

interface Balloon {
  id: number;
  x: number; // percentage across screen (0-100)
  delay: number; // delay in seconds
  color: string;
  emoji: string;
  popped: boolean;
  size: number;
}

export function Hero() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [showEmojis, setShowEmojis] = useState(false);

  // Initialize balloons on mount
  useEffect(() => {
    const colors = [
      "from-pink-400 to-rose-500",
      "from-purple-400 to-indigo-500",
      "from-amber-400 to-orange-500",
      "from-sky-400 to-blue-500",
      "from-emerald-400 to-teal-500"
    ];
    const emojis = ["🎉", "🎂", "🎈", "🎁", "💖", "🥳", "✨", "🍰"];
    
    const initialBalloons: Balloon[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80, // keep away from edges
      delay: Math.random() * 2,
      color: colors[i % colors.length],
      emoji: emojis[i % emojis.length],
      popped: false,
      size: 45 + Math.random() * 25 // size in pixels between 45px and 70px
    }));
    
    setBalloons(initialBalloons);

    // Initial Celebration Trigger after 1s
    const celebrationTimer = setTimeout(() => {
      triggerConfettiRain();
    }, 1000);

    // Automatically pop balloons after 4 seconds to trigger wish rain
    const autoPopTimer = setTimeout(() => {
      setBalloons(prev => prev.map(b => ({ ...b, popped: true })));
      triggerConfettiRain();
    }, 4000);

    return () => {
      clearTimeout(celebrationTimer);
      clearTimeout(autoPopTimer);
    };
  }, []);

  const triggerConfettiRain = () => {
    // Rain emojis
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.8,
      decay: 0.94,
      startVelocity: 30,
    };
    
    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 1.5,
      shapes: ['emoji'],
      shapeOptions: {
        emoji: {
          value: ['🎉', '🎂', '🎈', '💖', '🥳', '✨', '🎁']
        }
      }
    } as any);

    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 1.2,
      colors: ['#8E51FF', '#C27AFF', '#7C3AED', '#FFCAE0', '#E8CEFF']
    });
  };

  const handlePopBalloon = (id: number, e: React.MouseEvent) => {
    setBalloons(prev =>
      prev.map(b => (b.id === id ? { ...b, popped: true } : b))
    );

    // Trigger local explosion
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      origin: { x, y },
      particleCount: 20,
      spread: 80,
      scalar: 1.6,
      shapes: ['emoji'],
      shapeOptions: {
        emoji: {
          value: ['🎉', '✨', '🎈', '🎂', '🥳']
        }
      }
    } as any);
  };

  return (
    <section className="relative min-h-[750px] lg:min-h-[850px] w-full flex items-center justify-center overflow-hidden bg-zinc-950 text-white py-16 md:py-24">
      
      {/* Background Image with Dark Purple/Black Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center select-none opacity-100 brightness-100"
          style={{ backgroundImage: "url('/images/banner-image.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent lg:bg-gradient-to-r lg:from-black/75 lg:via-black/40 lg:to-transparent z-10" />
      </div>

      {/* Floating Interactive Balloons Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <AnimatePresence>
          {balloons.map((balloon) => (
            !balloon.popped && (
              <motion.div
                key={balloon.id}
                initial={{ y: "110vh", opacity: 0 }}
                animate={{
                  y: "-15vh",
                  opacity: [0, 1, 1, 0],
                  x: [
                    `${balloon.x}vw`,
                    `${balloon.x + (balloon.id % 2 === 0 ? 5 : -5)}vw`,
                    `${balloon.x}vw`
                  ]
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 8 + (balloon.id % 3),
                  delay: balloon.delay,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="absolute pointer-events-auto cursor-pointer flex flex-col items-center group"
                style={{ left: 0 }}
                onMouseEnter={(e) => handlePopBalloon(balloon.id, e)}
                onClick={(e) => handlePopBalloon(balloon.id, e)}
              >
                {/* Balloon Body */}
                <div
                  className={`relative rounded-t-full rounded-b-[75px] bg-gradient-to-br ${balloon.color} shadow-lg shadow-black/25 flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}
                  style={{ width: balloon.size, height: balloon.size * 1.25 }}
                >
                  {/* Glossy 3D Reflection Highlight */}
                  <div className="absolute top-1.5 left-2.5 w-[22%] h-[22%] bg-white/40 rounded-full blur-[0.3px]" />
                  
                  {/* Balloon String */}
                  <div className="absolute -bottom-10 w-0.5 h-10 bg-white/20 left-1/2 -translate-x-1/2" />
                  {/* Knot */}
                  <div className="absolute -bottom-1 w-2.5 h-2.5 bg-inherit rotate-45 left-1/2 -translate-x-1/2" />
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-[1440px] mx-auto w-full px-4 md:px-[50px] z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[580px]">
        
        {/* Left Side Info */}
        <div className="lg:col-span-6 flex flex-col items-start text-left gap-6 max-w-2xl relative z-10">
          
         

          {/* Heading */}
          <div className="flex flex-col items-start gap-1 select-none w-full">
            <h1 className="text-4xl md:text-[56px] font-extrabold tracking-tight leading-[1.1] text-white">
              Celebrate life's biggest
            </h1>
            <h1 className="text-4xl md:text-[56px] font-extrabold tracking-tight leading-[1.1] text-white">
              moments together.
            </h1>
            {/* Custom styled gradient tapered bar underneath moments together */}
            <div className="w-full max-w-[528px] mt-2 select-none pointer-events-none">
              <svg 
                viewBox="0 0 528 28" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-lg"
              >
                <defs>
                  <linearGradient id="tapered-gradient" x1="0" y1="14" x2="528" y2="14" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8E51FF" />
                    <stop offset="100%" stopColor="#C27AFF" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 14 0 A 14 14 0 0 0 14 28 L 528 15.5 A 1.5 1.5 0 0 0 528 12.5 Z" 
                  fill="url(#tapered-gradient)" 
                />
              </svg>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-xl">
            Bring loved ones together to share wishes, collect contributions, and reveal a beautiful celebration for someone special.
          </p>

          {/* Category Pills (Two rows, matching client mockups) */}
          <div className="flex flex-col gap-3 mt-1 w-full text-zinc-200">
            {/* Row 1 */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs md:text-sm font-semibold hover:bg-white/10 transition-colors">
                <Cake className="size-3.5 text-purple-300" /> Birthday
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs md:text-sm font-semibold hover:bg-white/10 transition-colors">
                <Heart className="size-3.5 text-pink-300" /> Wedding
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs md:text-sm font-semibold hover:bg-white/10 transition-colors">
                <GraduationCap className="size-3.5 text-emerald-300" /> Graduation
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs md:text-sm font-semibold hover:bg-white/10 transition-colors">
                <Baby className="size-3.5 text-blue-300" /> Baby
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs md:text-sm font-semibold hover:bg-white/10 transition-colors">
                <Users className="size-3.5 text-orange-300" /> Anniversary
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs md:text-sm font-semibold hover:bg-white/10 transition-colors">
                <Sun className="size-3.5 text-yellow-300" /> Retirement
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs md:text-sm font-semibold hover:bg-white/10 transition-colors">
                <Trees className="size-3.5 text-rose-300" /> Holiday
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
            <Link href="/login?mode=signup" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-lg h-[56px] px-8 rounded-full shadow-lg shadow-purple-600/30 group transition-all">
                Get started free
              </Button>
            </Link>
          </div>

          {/* Ratings & Trust */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
            {/* Avatars */}
            <div className="flex -space-x-3 overflow-hidden">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
              ].map((avatar, i) => (
                <div key={i} className="relative w-10 h-10 rounded-full border-2 border-zinc-950 overflow-hidden bg-zinc-800">
                  <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            {/* Rating text */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-zinc-300">
                <span className="font-semibold text-white">4.9/5</span> from 1,800+ reviews
              </p>
            </div>
          </div>

          {/* Mobile-only cards block (hidden on desktop) */}
          <div className="flex flex-col gap-4 mt-8 w-full lg:hidden text-zinc-800">
            {/* 12 Days Left Card */}
            <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-zinc-100 shadow-lg select-none">
              <Clock className="size-5 text-[#7C3AED] shrink-0" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-zinc-900 leading-none">12</span>
                <span className="text-[10px] font-extrabold tracking-wider text-zinc-400 uppercase">Days Left</span>
              </div>
            </div>

            {/* Marcus Chen Card */}
            <div className="flex gap-3 bg-white rounded-2xl p-4 border border-zinc-100 shadow-lg items-start select-none">
              <div className="relative size-10 rounded-full overflow-hidden shrink-0 border border-zinc-200/80 shadow-xs">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" 
                  alt="Marcus Chen" 
                  className="size-full object-cover" 
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-sm text-zinc-900 leading-none">Marcus Chen</span>
                <span className="text-[10px] text-zinc-400 font-semibold mt-1">Just contributed $75</span>
                <p className="text-xs text-zinc-500 font-light mt-1.5 italic">
                  "Happy birthday! You deserve all the joy! 🎉"
                </p>
              </div>
            </div>

            {/* Emma's WishPool Card */}
            <div className="flex flex-col gap-3 bg-white rounded-2xl p-4 border border-zinc-100 shadow-lg select-none">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0">
                  <Gift className="size-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[10px] text-zinc-400">Emma's 30th WishPool</span>
                  <span className="font-extrabold text-sm text-zinc-900 font-mono mt-0.5">$840 / $1,000</span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-purple-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: "84%" }} />
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-400">
                <span>38 contributors</span>
                <span className="font-bold text-[#7C3AED]">84%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side placeholder to keep grid column alignment correct on desktop */}
        <div className="lg:col-span-6 relative w-full h-[100px] lg:h-full pointer-events-none" />

        {/* Floating Cards Mockups positioned absolutely relative to the Centered Hero Container */}
        
        {/* Card 1: Marcus Chen Contribution Card */}
        <motion.div
          initial={{ x: 40, y: -20, opacity: 0 }}
          animate={{ x: 0, y: [0, -8, 0], opacity: 1 }}
          transition={{
            x: { duration: 0.8, delay: 0.2 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="hidden lg:flex absolute top-[5%] right-[0%] xl:right-[2%] w-[330px] bg-white text-zinc-800 rounded-3xl p-5 shadow-2xl border border-zinc-100 z-30 gap-4 text-left items-start select-none"
        >
          <div className="relative size-10 rounded-full overflow-hidden shrink-0 border border-zinc-200/80 shadow-xs">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" 
              alt="Marcus Chen" 
              className="size-full object-cover" 
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-sm text-zinc-900 leading-none">Marcus Chen</span>
            <span className="text-[10px] text-zinc-400 font-semibold mt-1.5">Just contributed $75</span>
            <p className="text-xs text-zinc-500 font-light mt-2.5 italic">
              "Happy birthday! You deserve all the joy! 🎉"
            </p>
          </div>
        </motion.div>

        {/* Card 2: Emma's WishPool Progress Card */}
        <motion.div
          initial={{ x: 40, y: 30, opacity: 0 }}
          animate={{ x: 0, y: [0, 8, 0], opacity: 1 }}
          transition={{
            x: { duration: 0.8, delay: 0.4 },
            y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
          className="hidden lg:flex absolute bottom-[8%] right-[1%] xl:right-[3%] w-[320px] bg-white text-zinc-800 rounded-3xl p-5 shadow-2xl border border-zinc-100 z-30 flex-col gap-3.5 text-left select-none"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
              <Gift className="size-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-[11px] text-zinc-400">Emma's 30th WishPool</span>
              <span className="font-extrabold text-base text-zinc-900 font-mono mt-0.5">$840 / $1,000</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: "84%" }} />
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-light">
            <span>38 contributors</span>
            <span className="font-bold text-[#7C3AED]">84%</span>
          </div>
        </motion.div>

        {/* Card 3: Days Left Pill Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
          transition={{
            scale: { duration: 0.5, delay: 0.6 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className="hidden lg:flex absolute top-[38%] left-[53%] xl:left-[55%] w-[90px] h-[95px] bg-white text-zinc-800 rounded-3xl shadow-2xl border border-zinc-100 z-30 flex-col items-center justify-center text-center select-none"
        >
          <Clock className="size-4.5 text-purple-600" />
          <span className="block text-xl font-extrabold text-zinc-900 mt-1 leading-none">12</span>
          <span className="block text-[8px] font-extrabold tracking-wider text-zinc-400 mt-1 uppercase">Days Left</span>
        </motion.div>

      </div>

    </section>
  );
}
