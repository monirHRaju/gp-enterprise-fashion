"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiAward, FiCheckCircle, FiGlobe, FiTruck } from "react-icons/fi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Counter from "./Counter";
import { stats } from "@/data/mock";

const features = [
  {
    Icon: FiAward,
    title: "30+ Years Experience",
    copy: "Serving global buyers since 1994 with heritage craftsmanship.",
  },
  {
    Icon: FiCheckCircle,
    title: "ISO-Certified Quality",
    copy: "Every product meets strict international quality standards.",
  },
  {
    Icon: FiGlobe,
    title: "Global Buyer Network",
    copy: "Trusted by 200+ brands across more than 20 countries.",
  },
  {
    Icon: FiTruck,
    title: "On-Time Delivery",
    copy: "98% on-time shipment rate, backed by proven logistics.",
  },
];

const DEFAULT_TITLE = "Why Choose Grameen";
const DEFAULT_SUBTITLE =
  "Decades of craftsmanship, a global footprint, and a quality-first approach — everything your brand needs in an accessories partner.";

export default function WhyChooseUs() {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [subtitle, setSubtitle] = useState(DEFAULT_SUBTITLE);

  useEffect(() => {
    fetch("/api/pages/home-features")
      .then((r) => r.json())
      .then((data) => {
        if (data?.title) setTitle(data.title);
        if (data?.body) setSubtitle(data.body);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="why-choose-us"
      className="py-16 md:py-24 bg-base-100 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brass/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-forest/10 blur-3xl" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Why us"
          title={title}
          subtitle={subtitle}
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map(({ Icon, title: t, copy }) => (
            <motion.div
              key={t}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-cream border border-base-300 p-7 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 6 }}
                className="h-14 w-14 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-5 group-hover:bg-brass group-hover:text-ink transition-colors"
              >
                <Icon className="h-6 w-6" />
              </motion.div>
              <h3 className="font-display text-xl font-semibold text-ink mb-2">{t}</h3>
              <p className="text-sm text-muted leading-relaxed">{copy}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats strip */}
        <div className="mt-16 rounded-2xl bg-forest text-cream px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-xl">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-semibold text-brass">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-cream/75 text-sm mt-2 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
