"use client";

import Topbar from "@/components/site/Topbar";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Container from "@/components/ui/Container";
import { motion } from "framer-motion";

export default function FashionPage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <main className="flex-1 bg-cream/30 flex items-center justify-center min-h-[60vh]">
        <Container>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-5xl md:text-7xl font-bold text-ink mb-6">
                Fashion
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brass/10 border border-brass/20 text-brass font-medium text-lg md:text-xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brass opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brass"></span>
                </span>
                Coming Soon
              </div>
              <p className="mt-8 text-muted max-w-xl mx-auto text-lg">
                We are crafting something extraordinary. Our fashion collection will be unveiled soon, featuring premium designs and the finest materials.
              </p>
            </motion.div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
