"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ProductGallery from "@/components/site/ProductGallery";
import type { Category, Product } from "@/data/mock";
import { motion } from "framer-motion";

interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
  coverImages: { url: string }[];
}

interface ApiProduct {
  _id: string;
  title: string;
  images: { url: string; publicId: string }[];
  category?: { name: string; slug: string };
  createdAt: string;
}

function apiCatToMock(c: ApiCategory): Category {
  return {
    slug: c.slug,
    name: c.name,
    productCount: 0,
    coverImages: c.coverImages?.map((i) => i.url) ?? [],
  };
}

function apiProdToMock(p: ApiProduct): Product {
  return {
    id: p._id,
    title: p.title,
    image: p.images?.[0]?.url ?? "",
    categorySlug: p.category?.slug ?? "",
    createdAt: p.createdAt,
  };
}

function FashionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategorySlug = searchParams.get("category") || "all";

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/fashion-categories")
      .then((r) => r.json())
      .then((data: ApiCategory[]) => {
        if (Array.isArray(data)) setCategories(data.map(apiCatToMock));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const url =
      activeCategorySlug === "all"
        ? "/api/fashion-products?limit=200"
        : `/api/fashion-products?limit=200&category=${activeCategorySlug}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const items: ApiProduct[] = data.products ?? data ?? [];
        setProducts(Array.isArray(items) ? items.map(apiProdToMock) : []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [activeCategorySlug]);

  const activeCategoryName =
    activeCategorySlug === "all"
      ? "All Fashion"
      : (categories.find((c) => c.slug === activeCategorySlug)?.name ?? "Fashion");

  const setCategory = (slug: string) => {
    if (slug === "all") router.push("/fashion");
    else router.push(`/fashion?category=${slug}`);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-10 md:py-16">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24">
            <h2 className="font-display text-xl font-bold text-ink mb-4 hidden lg:block">
              Categories
            </h2>
            <nav className="flex flex-wrap lg:flex-col gap-2">
              <button
                onClick={() => setCategory("all")}
                className={`px-4 py-2 text-sm text-left rounded-xl transition-all font-medium ${
                  activeCategorySlug === "all"
                    ? "bg-primary text-primary-content shadow-md"
                    : "bg-base-100 text-ink/70 hover:bg-base-200"
                }`}
              >
                All Fashion
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setCategory(cat.slug)}
                  className={`px-4 py-2 text-sm text-left rounded-xl transition-all font-medium ${
                    activeCategorySlug === cat.slug
                      ? "bg-primary text-primary-content shadow-md"
                      : "bg-base-100 text-ink/70 hover:bg-base-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <motion.h1
                key={activeCategoryName}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display text-3xl md:text-4xl font-bold text-ink"
              >
                {activeCategoryName}
              </motion.h1>
              <p className="mt-2 text-muted text-sm">
                {loading ? "Loading..." : `${products.length} item${products.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-base-200 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-muted">
              No items in this category yet.
            </div>
          ) : (
            <ProductGallery products={products} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function FashionPage() {
  return (
    <div className="bg-cream/30 min-h-screen">
      <Suspense fallback={<div className="p-20 text-center text-muted">Loading...</div>}>
        <FashionContent />
      </Suspense>
    </div>
  );
}
