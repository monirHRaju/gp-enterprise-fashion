"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FiGrid,
  FiBox,
  FiTag,
  FiImage,
  FiUsers,
  FiPhone,
  FiFileText,
  FiLogOut,
  FiShoppingBag,
  FiBookmark,
} from "react-icons/fi";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", Icon: FiGrid },
  { label: "Products", href: "/admin/products", Icon: FiBox },
  { label: "Categories", href: "/admin/categories", Icon: FiTag },
  { label: "Slider", href: "/admin/slider", Icon: FiImage },
  { label: "Buyers", href: "/admin/buyers", Icon: FiUsers },
  { label: "Contact", href: "/admin/contact", Icon: FiPhone },
  { label: "Pages", href: "/admin/pages", Icon: FiFileText },
];

const FASHION_NAV = [
  { label: "Fashion Products", href: "/admin/fashion/products", Icon: FiShoppingBag },
  { label: "Fashion Categories", href: "/admin/fashion/categories", Icon: FiBookmark },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 lg:w-60 bg-forest text-cream flex flex-col z-50 shadow-xl transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 lg:px-5 h-16 border-b border-white/10 shrink-0">
        <div className="relative h-9 w-9 shrink-0">
          <Image
            src="/grameen-logo.png"
            alt="Logo"
            fill
            className="object-contain filter brightness-0 invert"
          />
        </div>
        <span className="hidden lg:block font-display font-semibold text-sm leading-tight">
          Grameen Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {NAV.map(({ label, href, Icon }) => {
          const isActive =
            href === "/admin/dashboard"
              ? pathname === href
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all group ${
                isActive
                  ? "bg-white/15 text-cream"
                  : "text-cream/70 hover:bg-white/10 hover:text-cream"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="hidden lg:block text-sm font-medium">{label}</span>
            </Link>
          );
        })}

        <div className="my-3 mx-3 border-t border-white/10" />
        <p className="hidden lg:block px-3 mb-2 text-xs font-semibold text-cream/40 uppercase tracking-widest">Fashion</p>

        {FASHION_NAV.map(({ label, href, Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all group ${
                isActive
                  ? "bg-white/15 text-cream"
                  : "text-cream/70 hover:bg-white/10 hover:text-cream"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="hidden lg:block text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-white/10 shrink-0">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-cream/70 hover:bg-red-500/20 hover:text-red-300 transition-all"
        >
          <FiLogOut className="h-5 w-5 shrink-0" />
          <span className="hidden lg:block text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
