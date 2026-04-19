"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { buyerLogos } from "@/data/mock";

export default function BuyerMarquee() {
  const loop = [...buyerLogos, ...buyerLogos];

  return (
    <section id="buyers" className="py-16 md:py-24 bg-base-200/40">
      <Container>
        <SectionHeading
          eyebrow="Our partners"
          title="Trusted by Leading Brands"
          subtitle="From boutique labels to global retailers — we supply accessories to some of the most recognized names in fashion."
        />
      </Container>

      <div
        className="relative overflow-hidden group"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <motion.div
          className="flex gap-12 md:gap-20 whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ animationPlayState: "running" }}
        >
          {loop.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="shrink-0 h-20 md:h-24 px-8 flex items-center justify-center"
            >
              <span className="font-display text-2xl md:text-3xl font-semibold text-muted/70 group-hover:text-muted transition-colors tracking-wide hover:text-brass">
                {b.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
