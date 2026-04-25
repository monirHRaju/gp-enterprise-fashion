"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo } from "react";
import Topbar from "@/components/site/Topbar";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ProductGallery from "@/components/site/ProductGallery";
import { categories, products } from "@/data/mock";
import { motion } from "framer-motion";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategorySlug = searchParams.get("category") || "all";

  const filteredProducts = useMemo(() => {
    if (activeCategorySlug === "all") return products;
    return products.filter((p) => p.categorySlug === activeCategorySlug);
  }, [activeCategorySlug]);

  const activeCategoryName = useMemo(() => {
    if (activeCategorySlug === "all") return "All Products";
    return categories.find((c) => c.slug === activeCategorySlug)?.name || "Products";
  }, [activeCategorySlug]);

  const setCategory = (slug: string) => {
    if (slug === "all") {
      router.push("/products");
    } else {
      router.push(`/products?category=${slug}`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-10 md:py-16">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="font-display text-xl font-bold text-ink mb-6">Categories</h2>
            <nav className="flex flex-wrap lg:flex-col gap-2">
              <button
                onClick={() => setCategory("all")}
                className={`px-4 py-2 text-left rounded-xl transition-all ${
                  activeCategorySlug === "all"
                    ? "bg-primary text-primary-content shadow-md"
                    : "bg-base-100 text-ink/70 hover:bg-base-200"
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setCategory(category.slug)}
                  className={`px-4 py-2 text-left rounded-xl transition-all ${
                    activeCategorySlug === category.slug
                      ? "bg-primary text-primary-content shadow-md"
                      : "bg-base-100 text-ink/70 hover:bg-base-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <motion.h1
              key={activeCategoryName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-display text-3xl md:text-4xl font-bold text-ink"
            >
              {activeCategoryName}
            </motion.h1>
            <p className="mt-2 text-muted">
              Explore our range of premium {activeCategoryName.toLowerCase()}.
            </p>
          </div>

          <ProductGallery products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <main className="flex-1 bg-cream/30 min-h-screen">
        <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
          <ProductsContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
