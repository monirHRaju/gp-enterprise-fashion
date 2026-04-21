"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { siteSettings } from "@/data/mock";
import SearchModal from "./SearchModal";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Quality Policy", href: "/quality-policy" },
  { label: "Products", href: "/products" },
  { label: "Our Buyer", href: "/buyers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-cream/85 backdrop-blur-md shadow-sm"
            : "bg-cream"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="h-16 md:h-20 flex items-center justify-between gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label={siteSettings.brand}
            >
              <span className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-primary text-primary-content font-display font-bold text-lg group-hover:bg-brass transition-colors">
                G
              </span>
              <span className="font-display text-base md:text-lg font-semibold text-ink leading-tight">
                <span className="hidden sm:inline">
                  Grameen Enterprise
                </span>
                <span className="sm:hidden">Grameen Enterprise</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.label;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActive(item.label)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-forest" : "text-ink/80 hover:text-forest"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-brass rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-base-200 transition-colors text-ink"
              >
                <FiSearch className="h-5 w-5" />
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-base-200 transition-colors text-ink"
              >
                <FiMenu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-ink/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 top-0 bottom-0 z-[95] w-[80%] max-w-xs bg-cream shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-base-300">
                <span className="font-display text-lg font-semibold text-ink">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-base-200"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = active === item.label;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => {
                          setActive(item.label);
                          setMobileOpen(false);
                        }}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-primary-content"
                            : "text-ink hover:bg-base-200"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="px-5 py-4 border-t border-base-300 text-sm text-muted">
                <div className="font-medium text-ink">{siteSettings.phone}</div>
                <div>{siteSettings.email}</div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
