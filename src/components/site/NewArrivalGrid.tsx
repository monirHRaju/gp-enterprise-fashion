"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "./ProductCard";
import ProductLightbox from "./ProductLightbox";
import { products as mockProducts } from "@/data/mock";
import type { Product } from "@/data/mock";

interface ApiProduct {
  _id: string;
  title: string;
  images: { url: string; publicId: string }[];
  isNewArrival: boolean;
  createdAt: string;
}

function apiToMock(p: ApiProduct): Product {
  return {
    id: p._id,
    title: p.title,
    image: p.images?.[0]?.url ?? "",
    categorySlug: "",
    createdAt: p.createdAt,
  };
}

export default function NewArrivalGrid() {
  const [items, setItems] = useState<Product[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/products?isNewArrival=true&limit=12")
      .then((r) => r.json())
      .then((data) => {
        if (data.products?.length > 0) {
          setItems(data.products.map(apiToMock));
        } else {
          setItems(fallback);
        }
      })
      .catch(() => setItems(fallback));
  }, []);

  const fallback = useMemo(
    () =>
      [...mockProducts]
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        .slice(0, 12),
    [],
  );

  const displayed = items.length > 0 ? items : fallback;

  return (
    <section id="new-arrival" className="py-16 md:py-24 bg-base-200/40">
      <Container>
        <SectionHeading
          eyebrow="Fresh in"
          title="New Arrivals"
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
          {displayed.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => setOpenIndex(i)}
            />
          ))}
        </motion.div>
      </Container>

      <ProductLightbox
        items={displayed}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={() =>
          setOpenIndex((i) =>
            i === null ? null : (i - 1 + displayed.length) % displayed.length,
          )
        }
        onNext={() =>
          setOpenIndex((i) => (i === null ? null : (i + 1) % displayed.length))
        }
      />
    </section>
  );
}
