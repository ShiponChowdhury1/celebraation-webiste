"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  hideCTA?: boolean;
}

export function Footer({ hideCTA = false }: FooterProps) {
  return (
    <footer id="get-started" className={hideCTA ? "w-full" : "w-full bg-[#FAF8FF] pt-12"}>
      {/* 1. Large CTA Banner */}
      {!hideCTA && (
        <div className="max-w-[1440px] mx-auto px-4 md:px-[50px] mb-20">
          <div className="w-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] rounded-[36px] py-16 px-6 md:px-12 text-center text-white shadow-xl shadow-purple-600/10 flex flex-col items-center gap-6 relative overflow-hidden">

            {/* Subtle graphic background overlays */}
            <div className="absolute -top-24 -left-24 size-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 size-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

            {/* Icon/Emoji */}
            <span className="text-4xl md:text-5xl animate-bounce duration-1000 select-none">🎉</span>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl leading-tight">
              Ready to celebrate someone special?
            </h2>

            <p className="text-purple-100 text-sm md:text-base max-w-md font-light leading-relaxed">
              Join 12,400+ celebration creators. Your first WishPool is free — no credit card needed.
            </p>

            <Link href="#create-celebration" className="mt-2">
              <Button className="bg-white hover:bg-zinc-50 text-[#7C3AED] font-bold text-base h-[54px] px-8 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 duration-200">
                Create your first celebration
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* 2. Structured Footer Links & Brand */}
      <div className="w-full bg-[#0D0A1A] text-zinc-300 py-16 px-4 md:px-[50px]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-zinc-800 pb-12">

          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-6 items-start text-left">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="WishPool Logo"
                width={160}
                height={60}
                className="w-auto h-14 md:h-18 object-contain"
                priority
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-light">
              Beautiful celebration pages and group gifting for every milestone that matters.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Product Column */}
            <div className="flex flex-col items-start gap-4 text-left">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase">Product</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><Link href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="text-zinc-400 hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="#examples" className="text-zinc-400 hover:text-white transition-colors">Examples</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="flex flex-col items-start gap-4 text-left">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase">Company</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><Link href="#about" className="text-zinc-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#contact" className="text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="flex flex-col items-start gap-4 text-left col-span-2 sm:col-span-1">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase">Legal</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><Link href="#privacy" className="text-zinc-400 hover:text-white transition-colors">Privacy policy</Link></li>
                <li><Link href="#terms" className="text-zinc-400 hover:text-white transition-colors">Terms of service</Link></li>
                <li><Link href="#cookie" className="text-zinc-400 hover:text-white transition-colors">Cookie policy</Link></li>
                <li><Link href="#security" className="text-zinc-400 hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal / Copy */}
        <div className="max-w-[1440px] mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <span>
            © 2025 Celebr, Inc. All rights reserved.
          </span>
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium">
            <ShieldCheck className="size-4 text-emerald-400" />
            <span>Payments secured by Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
