"use client";

import { useAnimationControls, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { buyerLogos } from "@/data/mock";

interface ApiBuyer {
  _id: string;
  name: string;
  logo?: { url: string; publicId: string } | null;
}

interface BuyerItem {
  id: string;
  name: string;
  logoUrl?: string;
}

const DURATION = 28;

export default function BuyerMarquee() {
  const controls = useAnimationControls();
  const [buyers, setBuyers] = useState<BuyerItem[]>([]);

  useEffect(() => {
    fetch("/api/buyers")
      .then((r) => r.json())
      .then((data: ApiBuyer[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setBuyers(data.map((b) => ({ id: b._id, name: b.name, logoUrl: b.logo?.url })));
        } else {
          setBuyers(buyerLogos.map((b, i) => ({ id: String(i), name: b.name })));
        }
      })
      .catch(() =>
        setBuyers(buyerLogos.map((b, i) => ({ id: String(i), name: b.name })))
      );
  }, []);

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: { duration: DURATION, ease: "linear", repeat: Infinity },
    });
  }, [controls, buyers]);

  const loop = [...buyers, ...buyers];

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
        className="relative overflow-hidden mt-10"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        }}
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() =>
          controls.start({
            x: ["0%", "-50%"],
            transition: { duration: DURATION, ease: "linear", repeat: Infinity },
          })
        }
      >
        <motion.div
          animate={controls}
          className="flex gap-12 md:gap-20 whitespace-nowrap will-change-transform"
        >
          {loop.map((b, i) => (
            <div
              key={`${b.id}-${i}`}
              className="shrink-0 h-20 md:h-24 px-8 flex items-center justify-center"
            >
              {b.logoUrl ? (
                <div className="relative h-14 w-32">
                  <Image
                    src={b.logoUrl}
                    alt={b.name}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              ) : (
                <span className="font-display text-2xl md:text-3xl font-semibold text-muted/70 hover:text-brass transition-colors tracking-wide">
                  {b.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
