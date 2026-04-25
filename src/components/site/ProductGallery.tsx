"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/mock";
import ProductCard from "./ProductCard";
import ProductLightbox from "./ProductLightbox";
import { useState } from "react";

type Props = {
  products: Product[];
};

export default function ProductGallery({ products }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted text-lg">No products found in this category.</p>
        </div>
      )}

      <ProductLightbox
        items={products}
        index={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrev={() =>
          setSelectedIndex((i) =>
            i === null ? null : (i - 1 + products.length) % products.length,
          )
        }
        onNext={() =>
          setSelectedIndex((i) => (i === null ? null : (i + 1) % products.length))
        }
      />
    </>
  );
}
