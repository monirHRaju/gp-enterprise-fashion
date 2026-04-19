"use client";

import { FiMail, FiPhone } from "react-icons/fi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { siteSettings } from "@/data/mock";

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

export default function Topbar() {
  return (
    <div className="hidden md:block bg-primary text-primary-content text-sm">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 h-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 hover:text-brass transition-colors"
          >
            <FiPhone className="h-3.5 w-3.5" />
            <span>{siteSettings.phone}</span>
          </a>
          <a
            href={`mailto:${siteSettings.email}`}
            className="flex items-center gap-2 hover:text-brass transition-colors"
          >
            <FiMail className="h-3.5 w-3.5" />
            <span>{siteSettings.email}</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className="opacity-70 text-xs tracking-wide">Follow us</span>
          <div className="flex items-center gap-2">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 w-7 inline-flex items-center justify-center rounded-full border border-primary-content/30 hover:border-brass hover:text-brass hover:scale-110 transition-all"
              >
                <Icon className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
