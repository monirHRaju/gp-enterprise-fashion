"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { stats } from "@/data/mock";
import { motion } from "framer-motion";
import Image from "next/image";

const FALLBACK_IMAGES = [
  "https://i.ibb.co.com/0VZ5S1Z8/NCSB01.png",
  "https://i.ibb.co.com/t9VkHGt/NWB01.png",
  "https://i.ibb.co.com/Rk7Tw6NJ/WHC-3.png",
  "https://i.ibb.co.com/6c1gfKrQ/BB01.jpg",
  "https://i.ibb.co.com/3yCdGR7k/WB-458.jpg",
  "https://i.ibb.co.com/x8sHGQHp/RS35WW.jpg",
];

export default function AboutPage() {
  const [pageTitle, setPageTitle] = useState("About Grameen Enterprise");
  const [pageBody, setPageBody] = useState(
    "Crafting excellence in garments accessories since our inception, serving global fashion leaders with precision and integrity."
  );
  const [photoGrid, setPhotoGrid] = useState<string[]>(FALLBACK_IMAGES);

  useEffect(() => {
    fetch("/api/pages/about")
      .then((r) => r.json())
      .then((data) => {
        if (data?.title) setPageTitle(data.title);
        if (data?.body) setPageBody(data.body);
        if (data?.images?.length) setPhotoGrid(data.images.map((i: { url: string }) => i.url));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-ink text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://i.ibb.co.com/YT0y4rP8/slide-4.jpg"
            alt="About"
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
            {pageTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto"
          >
            {pageBody}
          </motion.p>
        </Container>
      </section>

      {/* Story */}
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
                  From natural buckles and wooden buttons to intricate shell beads, our products are a testament to our commitment to craftsmanship and sustainability.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-10">
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

      {/* Photo Grid */}
      <section className="py-20 bg-base-200/40">
        <Container>
          <SectionHeading eyebrow="Our Work" title="Craftsmanship in Detail" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {photoGrid.map((src, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-base-200 group"
              >
                <Image
                  src={src}
                  alt={`Product ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-forest text-cream">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl"
            >
              <h2 className="font-display text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-cream/80 text-lg leading-relaxed">
                To provide global apparel manufacturers with superior quality accessories that combine traditional craftsmanship with modern innovation, ensuring every garment reaches its full aesthetic potential.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl"
            >
              <h2 className="font-display text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-cream/80 text-lg leading-relaxed">
                To be the global benchmark for natural and sustainable garments accessories, recognized for our environmental responsibility and uncompromised quality standards.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
