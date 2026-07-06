"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Review {
  quote: string;
  name: string;
  avatarText: string;
  role: string;
  bgColor: string;
  textColor: string;
}

export function Reviews() {
  const reviews: Review[] = [
    {
      quote: "We raised $3,400 from 62 guests. Every single message made us cry happy tears. Celebr is the most thoughtful gifting platform I've ever used.",
      name: "Rachel Kim",
      avatarText: "RK",
      role: "Used for her wedding",
      bgColor: "bg-purple-600",
      textColor: "text-purple-600",
    },
    {
      quote: "The whole team chipped in remotely — colleagues from 4 countries. The reveal moment was incredible. Our colleague said it was the best gift of his life.",
      name: "David Okafor",
      avatarText: "DO",
      role: "Organized a retirement party",
      bgColor: "bg-[#7C3AED]",
      textColor: "text-[#7C3AED]",
    },
    {
      quote: "I was shocked when I saw 23 messages from friends and family. The confetti reveal is magical. I literally screamed. 10/10 experience.",
      name: "Melissa Torres",
      avatarText: "MT",
      role: "Birthday celebration",
      bgColor: "bg-pink-600",
      textColor: "text-pink-600",
    },
    {
      quote: "Our family is spread across three continents. Being able to easily contribute and leave video/photo wishes in one place made Mom's 60th unforgettable.",
      name: "Sophia Martinez",
      avatarText: "SM",
      role: "Mother's 60th birthday",
      bgColor: "bg-blue-600",
      textColor: "text-blue-600",
    },
  ];

  return (
    <section id="examples" className="w-full py-24 bg-[#FAF8FF] border-b border-purple-100/30">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[50px] text-center">
        
        {/* Section Tag */}
        <span className="text-[#7C3AED] font-semibold text-xs md:text-sm tracking-widest uppercase block mb-3">
          Real Celebrations
        </span>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
          Stories that make us proud
        </h2>
        
        <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto mb-16">
          Hear from the people who created magical reveal memories for their loved ones.
        </p>

        {/* Swiper Slider Wrapper */}
        <div className="w-full mt-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i} className="h-auto flex">
                <div className="bg-white border border-purple-100/80 rounded-3xl p-8 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300 flex flex-col justify-between h-full w-full text-left group">
                  <div>
                    {/* Top Quote Icon and Star Rating */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-purple-50 rounded-2xl group-hover:bg-[#F9F3FF] transition-colors">
                        <Quote className="size-6 text-[#7C3AED] fill-[#7C3AED]/10" />
                      </div>
                      <div className="flex gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Star key={starIdx} className="size-4 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="text-zinc-600 text-base leading-relaxed mb-8 font-light">
                      "{review.quote}"
                    </p>
                  </div>

                  {/* Reviewer Details */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-purple-50">
                    <div className={`size-11 rounded-full ${review.bgColor} text-white flex items-center justify-center font-extrabold text-sm shadow-inner`}>
                      {review.avatarText}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-900 text-base">{review.name}</span>
                      <span className="text-xs text-zinc-400 font-medium">{review.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
