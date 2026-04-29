"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiArrowUpRight } from "react-icons/fi";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import type { Category } from "@/data/mock";

import "swiper/css";
import "swiper/css/effect-fade";

type Props = {
  category: Category;
  delay?: number;
};

export default function CategoryCard({ category, delay = 0 }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-base-200 aspect-[4/5]"
    >
      <Link
        href={`/products?category=${category.slug}`}
        className="absolute inset-0 z-20"
        aria-label={category.name}
      />

      <Swiper
        modules={[Autoplay, EffectFade]}
        loop
        speed={1000}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(s) => (swiperRef.current = s)}
        className="h-full w-full"
      >
        {category.coverImages.map((src, i) => (
          <SwiperSlide key={src}>
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={`${category.name} ${i + 1}`}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Gradient overlay — z-10 ensures it renders above Swiper stacking context */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-ink/90 via-ink/40 to-transparent" />

      {/* Prev / Next — above Link layer */}
      <button
        onClick={(e) => { e.preventDefault(); swiperRef.current?.slidePrev(); }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-cream/20 backdrop-blur border border-cream/30 text-cream flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-brass hover:border-brass hover:text-ink z-30"
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={(e) => { e.preventDefault(); swiperRef.current?.slideNext(); }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-cream/20 backdrop-blur border border-cream/30 text-cream flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-brass hover:border-brass hover:text-ink z-30"
      >
        <FiChevronRight className="h-4 w-4" />
      </button>

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3 text-cream z-20 pointer-events-none">
        <div>
          <h3 className="font-display text-xl md:text-2xl font-semibold leading-tight">
            {category.name}
          </h3>
          <p className="text-xs md:text-sm text-cream/75 mt-1">
            {category.productCount} items
          </p>
        </div>
        <span className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-brass text-ink opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <FiArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </motion.div>
  );
}
