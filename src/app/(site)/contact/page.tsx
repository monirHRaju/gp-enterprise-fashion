"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteSettings } from "@/data/mock";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

interface ContactData {
  phone?: string;
  email?: string;
  address?: string;
  facebook?: string;
  linkedin?: string;
  whatsapp?: string;
}

export default function ContactPage() {
  const [contact, setContact] = useState<ContactData>({
    phone: siteSettings.phone,
    email: siteSettings.email,
    address: siteSettings.address[0],
    facebook: siteSettings.social.facebook,
    linkedin: siteSettings.social.linkedin,
    whatsapp: siteSettings.social.whatsapp,
  });

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data: ContactData | null) => {
        if (data) setContact(data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message. We will get back to you soon!");
  };

  const socials = [
    { href: contact.facebook, Icon: FaFacebookF, label: "Facebook" },
    { href: contact.linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
    { href: contact.whatsapp, Icon: FaWhatsapp, label: "WhatsApp" },
  ].filter((s) => s.href);

  return (
    <div className="bg-cream/30 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Get in touch"
          title="Contact Us"
          subtitle="Have questions about our products or want to discuss a partnership? We are here to help."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Info + Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cream/80 p-8 rounded-3xl shadow-sm border border-base-200">
                <div className="h-12 w-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center mb-4">
                  <FiPhone className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-2">Call Us</h3>
                <p className="text-muted text-sm">{contact.phone}</p>
                <p className="text-muted text-sm">{siteSettings.phone2}</p>
              </div>
              <div className="bg-cream/80 p-8 rounded-3xl shadow-sm border border-base-200">
                <div className="h-12 w-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center mb-4">
                  <FiMail className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-2">Email Us</h3>
                <p className="text-muted text-sm break-all">{contact.email}</p>
              </div>
            </div>

            <div className="bg-cream/80 p-8 rounded-3xl shadow-sm border border-base-200">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
                  <FiMapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">Our Location</h3>
                  <p className="text-muted text-sm">{contact.address}</p>
                </div>
              </div>
              {socials.length > 0 && (
                <div className="mt-6 pt-6 border-t border-base-200">
                  <p className="text-xs text-muted uppercase tracking-wider mb-3">Follow us</p>
                  <div className="flex gap-3">
                    {socials.map(({ href, Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full bg-forest/10 text-forest flex items-center justify-center hover:bg-forest hover:text-cream transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-cream/80 p-8 md:p-10 rounded-3xl shadow-lg border border-base-200 space-y-5"
            >
              <h3 className="font-display text-2xl font-bold text-ink">Send a Message</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-ink/70">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-base-300 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-ink/70">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-base-300 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink/70">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Inquiry about products"
                  className="w-full px-4 py-3 rounded-xl border border-base-300 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink/70">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your requirements..."
                  className="w-full px-4 py-3 rounded-xl border border-base-300 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all resize-none text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-forest text-cream py-4 rounded-xl font-bold hover:bg-ink transition-colors flex items-center justify-center gap-2 group"
              >
                Send Message
                <FiSend className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full min-h-125 lg:min-h-full rounded-3xl overflow-hidden shadow-sm border border-base-200 bg-cream/80"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.4319407843644!2d90.404288!3d23.891122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c463f35076a5%3A0xc346761c5c56d787!2sHossain%20Market%2C%20Tongi!5e0!3m2!1sen!2sbd!4v1714050000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
