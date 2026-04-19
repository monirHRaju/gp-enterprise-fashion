"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/data/mock";

type Props = {
  product: Product;
  onClick?: () => void;
};

export default function ProductCard({ product, onClick }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      whileHover={{ y: -4 }}
      className="group text-left w-full"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-base-200 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
      </div>
      <h3 className="mt-4 text-center font-display text-base md:text-lg font-medium text-ink truncate transition-colors group-hover:text-brass">
        {product.title}
      </h3>
    </motion.button>
  );
}
