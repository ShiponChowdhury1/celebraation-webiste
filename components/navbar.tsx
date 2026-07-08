"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Examples", href: "#examples" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="w-full bg-[#F9F3FF] border-b border-purple-100/50 sticky top-0 z-50 transition-all duration-300">
      {/* Container matching desktop: max-w-[1440px] and exact 124px height */}
      <div className="max-w-[1440px] mx-auto h-20 md:h-[124px] px-4 md:px-[50px] flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Image
            src="/images/logo.png"
            alt="WishPool Logo"
            width={160}
            height={60}
            className="w-auto h-14 md:h-18 object-contain"
            priority
          />
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-zinc-600 hover:text-brand font-medium text-base transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-zinc-700 hover:text-brand hover:bg-purple-50 font-medium px-5 h-[48px] rounded-full text-base transition-all"
            >
              Sign in
            </Button>
          </Link>
          <Link href="/login?mode=signup">
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium px-6 h-[48px] rounded-full text-base shadow-sm hover:shadow-md transition-all">
              Get started free
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-700 hover:text-brand transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F9F3FF] border-b border-purple-100 shadow-lg py-6 px-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-zinc-700 hover:text-brand font-medium text-lg py-1 border-b border-purple-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
              <Button
                variant="outline"
                className="w-full border-purple-200 text-zinc-700 font-medium h-[48px] rounded-full text-base hover:bg-purple-50 transition-all"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/login?mode=signup" onClick={() => setIsOpen(false)} className="w-full">
              <Button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium h-[48px] rounded-full text-base shadow-sm transition-all">
                Get started free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
