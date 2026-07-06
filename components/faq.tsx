"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does the WishPool work?",
      answer: "You set a goal amount for a celebration. Contributors visit your shareable link, choose how much to contribute, pay securely via Stripe, and leave a personal message. The recipient can't see the total until you trigger the reveal.",
    },
    {
      question: "When do I receive the funds?",
      answer: "Funds are transferred securely to your bank account via Stripe integration. Payouts can be triggered immediately following the reveal moment, or scheduled automatically depending on your preferences. Transfers typically take 2-5 business days.",
    },
    {
      question: "Is there a platform fee?",
      answer: "Creating a celebration page and collecting text wishes is 100% free. For financial contributions (WishPool), Stripe credit card processing fees of 2.9% + 30¢ apply. Celebr does not charge any additional platform markup.",
    },
    {
      question: "Can contributors stay anonymous?",
      answer: "Absolutely. During checkout, contributors can select option checkboxes to hide their contribution amount, hide their name, or remain completely anonymous to the public feed. The celebration host will still see the total sum in their private dashboard.",
    },
    {
      question: "What is the recipient reveal experience?",
      answer: "When you are ready, you send a single magic link. Opening it triggers a delightful landing page experience containing a custom confetti blast, count-up totals, and a beautiful grid showcasing every message and contributor card.",
    },
    {
      question: "Does the recipient need to create an account?",
      answer: "No. Recipient viewing pages are completely open via secure encrypted links. No app download or account creation is required to see the wishes. To withdraw raised funds, they simply follow secure Identity Verification steps powered by Stripe Connect.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-24 bg-gradient-default border-b border-purple-100/30">
      <div className="max-w-[800px] mx-auto px-4 text-center">
        
        {/* Subtitle */}
        <span className="text-[#7C3AED] font-semibold text-xs md:text-sm tracking-widest uppercase block mb-3">
          Got Questions?
        </span>
        
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-16">
          Frequently asked
        </h2>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4 text-left w-full">
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            return (
              <div
                key={i}
                className={`bg-white border border-purple-100 border-l-4 ${
                  isOpen ? "border-l-[#BB4D00]" : "border-l-[#BB4D00]/20"
                } rounded-2xl overflow-hidden shadow-xs hover:border-purple-200/80 transition-all duration-300`}
              >
                {/* Header */}
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full py-5 px-6 md:px-8 flex items-center justify-between gap-4 text-left text-zinc-900 hover:text-[#7C3AED] focus:outline-none transition-colors"
                >
                  <span className="font-bold text-base md:text-lg">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-purple-50 shrink-0 text-[#7C3AED] transition-transform duration-300 ${isOpen ? "rotate-180 bg-purple-100" : ""}`}>
                    <ChevronDown className="size-5" />
                  </div>
                </button>

                {/* Answer (Animated collapse/expand) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-6 text-zinc-500 text-sm md:text-base leading-relaxed font-light border-t border-purple-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
