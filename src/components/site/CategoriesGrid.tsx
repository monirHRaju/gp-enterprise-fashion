"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryCard from "./CategoryCard";
import { categories as mockCategories } from "@/data/mock";
import type { Category } from "@/data/mock";

export default function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(
            data.map((c) => ({
              slug: c.slug,
              name: c.name,
              productCount: c.coverImages?.length ?? 0,
              coverImages: c.coverImages?.map((img: { url: string }) => img.url) ?? [],
            }))
          );
        } else {
          setCategories(mockCategories);
        }
      })
      .catch(() => setCategories(mockCategories));
  }, []);

  const displayed = categories.length > 0 ? categories : mockCategories;

  return (
    <section id="categories" className="py-16 md:py-24 bg-base-100">
      <Container>
        <SectionHeading
          eyebrow="What we make"
          title="Our Categories"
          subtitle="Explore our full range of premium garments accessories crafted for leading apparel brands."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayed.map((c, i) => (
            <CategoryCard
              key={c.slug}
              category={c}
              delay={i * 0.08}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
