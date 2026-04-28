"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Image from "next/image";
import { products, categories } from "@/data/mock";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setDebouncedQuery("");
    }
  }, [open]);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => {
        const cat = categories.find((c) => c.slug === p.categorySlug);
        return (
          p.title.toLowerCase().includes(q) ||
          cat?.name.toLowerCase().includes(q)
        );
      })
      .slice(0, 8);
  }, [debouncedQuery]);

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
            <div className="flex items-center gap-3 px-5 py-4 border-b border-base-300">
              <FiSearch className="h-5 w-5 text-muted" />
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
                className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-base-200 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {!debouncedQuery.trim() && (
                <div className="px-5 py-10 text-center text-muted text-sm">
                  Start typing to search products or categories.
                </div>
              )}

              {debouncedQuery.trim() && results.length === 0 && (
                <div className="px-5 py-10 text-center text-muted text-sm">
                  No results for &quot;{debouncedQuery}&quot;.
                </div>
              )}

              {results.length > 0 && (
                <ul className="divide-y divide-base-300">
                  {results.map((p) => {
                    const cat = categories.find((c) => c.slug === p.categorySlug);
                    return (
                      <li key={p.id}>
                        <button
                          onClick={onClose}
                          className="w-full flex items-center gap-4 px-5 py-3 hover:bg-base-200 transition-colors text-left"
                        >
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-base-200 shrink-0">
                            <Image
                              src={p.image}
                              alt={p.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-ink truncate">{p.title}</div>
                            <div className="text-xs text-muted">{cat?.name}</div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
