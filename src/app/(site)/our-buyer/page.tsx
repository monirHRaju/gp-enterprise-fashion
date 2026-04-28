"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { buyerLogos } from "@/data/mock";

interface ApiBuyer {
  _id: string;
  name: string;
  country?: string;
  logo?: { url: string; publicId: string } | null;
}

interface BuyerItem {
  id: string;
  name: string;
  country?: string;
  logoUrl?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function OurBuyerPage() {
  const [buyers, setBuyers] = useState<BuyerItem[]>([]);

  useEffect(() => {
    fetch("/api/buyers")
      .then((r) => r.json())
      .then((data: ApiBuyer[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setBuyers(
            data.map((b) => ({
              id: b._id,
              name: b.name,
              country: b.country,
              logoUrl: b.logo?.url,
            }))
          );
        } else {
          setBuyers(
            buyerLogos.map((b, i) => ({ id: String(i), name: b.name }))
          );
        }
      })
      .catch(() =>
        setBuyers(buyerLogos.map((b, i) => ({ id: String(i), name: b.name })))
      );
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-forest text-cream">
        <Container className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brass uppercase tracking-widest text-sm font-semibold mb-3"
          >
            Our Partners
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-display text-4xl md:text-6xl font-bold"
          >
            Our Buyers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-4 text-cream/75 text-lg max-w-xl mx-auto"
          >
            Trusted by leading fashion brands and retailers across more than 20 countries.
          </motion.p>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24 bg-base-100">
        <Container>
          <SectionHeading
            eyebrow="Global network"
            title="Brands We Serve"
            subtitle="A growing family of buyers who trust Grameen for quality accessories."
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6"
          >
            {buyers.map((buyer) => (
              <motion.div
                key={buyer.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group bg-white rounded-2xl border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center gap-4"
              >
                {/* Logo or initials */}
                <div className="w-full aspect-[3/2] rounded-xl overflow-hidden bg-base-100 flex items-center justify-center">
                  {buyer.logoUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={buyer.logoUrl}
                        alt={buyer.name}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                  ) : (
                    <span className="font-display text-2xl font-bold text-forest/30 group-hover:text-forest/50 transition-colors text-center px-2">
                      {buyer.name}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="font-semibold text-ink text-sm md:text-base leading-tight">
                    {buyer.name}
                  </h3>
                  {buyer.country && (
                    <p className="text-xs text-muted mt-1">{buyer.country}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {buyers.length === 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-base-200 bg-base-200 animate-pulse aspect-[3/2]"
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
