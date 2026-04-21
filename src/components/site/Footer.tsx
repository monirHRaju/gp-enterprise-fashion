"use client";

import Link from "next/link";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import Container from "@/components/ui/Container";
import { categories, siteSettings } from "@/data/mock";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Quality Policy", href: "#quality-policy" },
  { label: "Products", href: "#products" },
  { label: "Our Buyer", href: "#buyers" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { href: siteSettings.social.facebook, Icon: FaFacebookF, label: "Facebook" },
  { href: siteSettings.social.linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
  {
    href: siteSettings.social.instagram,
    Icon: FaInstagram,
    label: "Instagram",
  },
  { href: siteSettings.social.whatsapp, Icon: FaWhatsapp, label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-content">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-brass text-ink font-display font-bold text-lg">
                G
              </span>
              <span className="font-display text-lg font-semibold leading-tight">
                Grameen Fashion
              </span>
            </div>
            <p className="text-primary-content/75 text-sm leading-relaxed max-w-xs">
              Premium garments accessories for global buyers — labels, tags,
              trims, and packaging crafted to brand perfection.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-primary-content/25 hover:bg-brass hover:border-brass hover:text-ink transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-primary-content/80">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-2 hover:text-brass hover:translate-x-1 transition-all"
                  >
                    <span className="h-[1px] w-3 bg-primary-content/50" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-primary-content/80">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`#${c.slug}`}
                    className="inline-flex items-center gap-2 hover:text-brass hover:translate-x-1 transition-all"
                  >
                    <span className="h-[1px] w-3 bg-primary-content/50" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-primary-content/80">
              <li className="flex items-start gap-3">
                <FiMapPin className="h-4 w-4 mt-0.5 text-brass shrink-0" />
                <span>
                  {siteSettings.address.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 hover:text-brass transition-colors"
                >
                  <FiPhone className="h-4 w-4 text-brass shrink-0" />
                  {siteSettings.phone}
                </a>
                
                <a
                  href={`tel:${siteSettings.phone2.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 hover:text-brass transition-colors"
                >
                  <FiPhone className="h-4 w-4 text-brass shrink-0" />
                  {siteSettings.phone2}
                </a>

              </li>
              <li>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="flex items-center gap-3 hover:text-brass transition-colors"
                >
                  <FiMail className="h-4 w-4 text-brass shrink-0" />
                  {siteSettings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-primary-content/15">
        <Container className="py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-content/70">
          <p>
            © {new Date().getFullYear()} {siteSettings.brand}. All rights
            reserved.
          </p>
          <p>Designed with care.</p>
        </Container>
      </div>
    </footer>
  );
}
