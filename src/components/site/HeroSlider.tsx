"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { heroSlides } from "@/data/mock";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface SlideItem {
  _id: string;
  imageUrl: string;
  order: number;
}

export default function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/slider")
      .then((r) => r.json())
      .then((data: SlideItem[]) => {
        if (data.length > 0) {
          setSlides(data.map((s) => s.imageUrl));
        } else {
          setSlides(heroSlides);
        }
      })
      .catch(() => setSlides(heroSlides));
  }, []);

  if (slides.length === 0) {
    return <div className="w-full h-[80vh] min-h-125 bg-primary animate-pulse" />;
  }

  return (
    <section className="relative w-full h-[80vh] min-h-125 overflow-hidden bg-primary group">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="h-full w-full"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={src}>
            <div className="relative h-full w-full overflow-hidden">
              <motion.div
                key={`${src}-${activeIndex === i ? "active" : "idle"}`}
                initial={{ scale: 1 }}
                animate={activeIndex === i ? { scale: 1.08 } : { scale: 1 }}
                transition={{ duration: 8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt={`Slide ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  unoptimized
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-linear-to-t from-ink/50 via-ink/10 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-cream/15 backdrop-blur border border-cream/30 text-cream md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-brass hover:border-brass hover:text-ink flex items-center justify-center"
      >
        <FiChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-cream/15 backdrop-blur border border-cream/30 text-cream md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-brass hover:border-brass hover:text-ink flex items-center justify-center"
      >
        <FiChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
}
