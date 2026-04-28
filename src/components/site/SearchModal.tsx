"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiSearch, FiX, FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { products, categories } from "@/data/mock";

interface SearchResult {
  id: string;
  type: "product" | "category";
  title: string;
  thumbnail: string;
  subtitle: string;
  href: string;
}

function mockSearch(q: string): SearchResult[] {
  const lower = q.toLowerCase();
  const prodResults = products
    .filter((p) => {
      const cat = categories.find((c) => c.slug === p.categorySlug);
      return p.title.toLowerCase().includes(lower) || cat?.name.toLowerCase().includes(lower);
    })
    .slice(0, 6)
    .map((p) => {
      const cat = categories.find((c) => c.slug === p.categorySlug);
      return {
        id: p.id,
        type: "product" as const,
        title: p.title,
        thumbnail: p.image,
        subtitle: cat?.name ?? "",
        href: `/products?category=${p.categorySlug}`,
      };
    });

  const catResults = categories
    .filter((c) => c.name.toLowerCase().includes(lower))
    .slice(0, 3)
    .map((c) => ({
      id: c.slug,
      type: "category" as const,
      title: c.name,
      thumbnail: c.coverImages[0] ?? "",
      subtitle: "Category",
      href: `/products?category=${c.slug}`,
    }));

  return [...prodResults, ...catResults].slice(0, 8);
}

type Props = { open: boolean; onClose: () => void };

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = query.trim();
    if (!q) { setResults([]); return; }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data: SearchResult[] = await res.json();
        if (data.length > 0) {
          setResults(data);
        } else {
          setResults(mockSearch(q));
        }
      } catch {
        setResults(mockSearch(q));
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 bg-ink/70 backdrop-blur-sm flex items-start justify-center pt-20 md:pt-32 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-2xl bg-cream rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-base-300">
              {loading ? (
                <span className="loading loading-spinner loading-sm text-muted" />
              ) : (
                <FiSearch className="h-5 w-5 text-muted shrink-0" />
              )}
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-1 bg-transparent outline-none text-base md:text-lg placeholder:text-muted/70"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-base-200 transition-colors shrink-0"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {!query.trim() && (
                <div className="px-5 py-10 text-center text-muted text-sm">
                  Start typing to search products or categories.
                </div>
              )}

              {query.trim() && !loading && results.length === 0 && (
                <div className="px-5 py-10 text-center text-muted text-sm">
                  No results for &quot;{query}&quot;.
                </div>
              )}

              {results.length > 0 && (
                <ul className="divide-y divide-base-300">
                  {results.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={r.href}
                        onClick={onClose}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-base-200 transition-colors group"
                      >
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-base-200 shrink-0">
                          {r.thumbnail ? (
                            <Image
                              src={r.thumbnail}
                              alt={r.title}
                              fill
                              unoptimized
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-muted text-xs">
                              {r.type === "category" ? "Cat" : "Img"}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-ink truncate text-sm">{r.title}</div>
                          <div className="text-xs text-muted">{r.subtitle}</div>
                        </div>
                        <FiArrowUpRight className="h-4 w-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
