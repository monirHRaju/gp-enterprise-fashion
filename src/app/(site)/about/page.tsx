"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { stats } from "@/data/mock";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-ink text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://i.ibb.co.com/YT0y4rP8/slide-4.jpg"
            alt="About Background"
            fill
            className="object-cover"
          />
        </div>
        <Container className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold mb-6"
          >
            About Grameen Enterprise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto"
          >
            Crafting excellence in garments accessories since our inception, serving global fashion leaders with precision and integrity.
          </motion.p>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-base-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="A Legacy of Quality and Innovation"
                align="left"
              />
              <div className="space-y-4 text-ink/70 text-lg leading-relaxed mt-6">
                <p>
                  Grameen Enterprise and Fashion has established itself as a premier supplier of high-quality garments accessories. Located in the heart of Gazipur&apos;s industrial hub, we specialize in a wide array of natural and synthetic accessories that add value and distinction to global apparel brands.
                </p>
                <p>
                  From natural buckles and wooden buttons to intricate shell beads, our products are a testament to our commitment to craftsmanship and sustainability. We believe that the smallest detail can make the biggest difference in fashion.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-10">
                {stats.slice(0, 4).map((stat, i) => (
                  <div key={i} className="bg-base-200 p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-forest mb-1">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-sm text-muted uppercase tracking-wider font-semibold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://i.ibb.co.com/Zzk8mFDs/slide-2.jpg"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-forest text-cream">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl">
              <h2 className="font-display text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-cream/80 text-lg leading-relaxed">
                To provide global apparel manufacturers with superior quality accessories that combine traditional craftsmanship with modern innovation, ensuring every garment reaches its full aesthetic potential.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl">
              <h2 className="font-display text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-cream/80 text-lg leading-relaxed">
                To be the global benchmark for natural and sustainable garments accessories, recognized for our environmental responsibility and uncompromised quality standards.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
