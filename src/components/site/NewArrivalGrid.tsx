"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "./ProductCard";
import ProductLightbox from "./ProductLightbox";
import { products } from "@/data/mock";

export default function NewArrivalGrid() {
  const latest = useMemo(
    () =>
      [...products]
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        .slice(0, 12),
    [],
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="new-arrival" className="py-16 md:py-24 bg-base-200/40">
      <Container>
        <SectionHeading
          eyebrow="Fresh in"
          title="New Arrival"
          subtitle="Our latest additions — crafted with precision and ready for your next collection."
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7"
        >
          {latest.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => setOpenIndex(i)}
            />
          ))}
        </motion.div>
      </Container>

      <ProductLightbox
        items={latest}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={() =>
          setOpenIndex((i) => (i === null ? null : (i - 1 + latest.length) % latest.length))
        }
        onNext={() =>
          setOpenIndex((i) => (i === null ? null : (i + 1) % latest.length))
        }
      />
    </section>
  );
}
