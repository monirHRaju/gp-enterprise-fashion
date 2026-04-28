"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiSearch, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { siteSettings, categories } from "@/data/mock";
import SearchModal from "./SearchModal";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: categories.map((c) => ({ label: c.name, href: `/products?category=${c.slug}` })),
  },
  { label: "Quality Policy", href: "/quality-policy" },
  { label: "Our Buyer", href: "/our-buyer" },
  { label: "Contact", href: "/contact" },
];

function isNavActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href + "?");
}

export default function Navbar() {
  const pathname = usePathname();
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
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-cream/85 backdrop-blur-md shadow-sm" : "bg-cream"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="h-16 md:h-20 flex items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label={siteSettings.brand}>
              <div className="relative h-10 w-10 md:h-12 md:w-12 transition-transform group-hover:scale-110">
                <Image src="/grameen-logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-display text-base md:text-lg font-semibold text-ink leading-tight">
                Grameen Enterprise
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = isNavActive(item.href, pathname);
                if (item.children) {
                  return (
                    <div key={item.label} className="relative group/nav">
                      <Link
                        href={item.href}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                          isActive ? "text-forest" : "text-ink/80 hover:text-forest"
                        }`}
                      >
                        {item.label}
                        <FiChevronDown className="h-3.5 w-3.5 transition-transform group-hover/nav:rotate-180" />
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-brass rounded-full"
                          />
                        )}
                      </Link>

                      {/* Dropdown */}
                      <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-200 z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-base-200 py-2 w-64 overflow-hidden">
                          <div className="max-h-[70vh] overflow-y-auto">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="block px-5 py-2.5 text-sm text-ink/70 hover:text-forest hover:bg-base-200 transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-forest" : "text-ink/80 hover:text-forest"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-brass rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
              className="fixed inset-0 z-90 bg-ink/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 top-0 bottom-0 z-95 w-[80%] max-w-xs bg-cream shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-base-300">
                <span className="font-display text-lg font-semibold text-ink">Menu</span>
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
                  const isActive = isNavActive(item.href, pathname);
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                    >
                      <div className="mb-1">
                        <Link
                          href={item.href}
                          onClick={() => { if (!item.children) setMobileOpen(false); }}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                            isActive ? "bg-primary text-primary-content" : "text-ink hover:bg-base-200"
                          }`}
                        >
                          {item.label}
                        </Link>
                        {item.children && (
                          <div className="mt-1 ml-4 border-l border-base-300 pl-2 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2 text-sm text-ink/70 hover:text-forest hover:bg-base-200 rounded-lg transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
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
