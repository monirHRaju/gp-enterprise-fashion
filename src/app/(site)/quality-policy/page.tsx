"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { FiAward, FiCheckCircle, FiShield, FiTarget, FiUsers } from "react-icons/fi";

const policies = [
  { icon: FiAward, text: "We Strive for Excellence in all Endeavors." },
  { icon: FiTarget, text: "We Set our Goals to Achieve Customer Satisfaction and to Deliver Defect Free Product Services." },
  { icon: FiUsers, text: "Implementation of this Policy Makes it Essential that each Person be Committed to Perform Exactly as Specified." },
  { icon: FiShield, text: "It is our Basic Operational Philosophy to Concentrate on Prevention Method to Make Quality a way of Life and Perpetuate an Attitude of 'Do it Right the First Time'." },
  { icon: FiCheckCircle, text: "We are Committed to Achieve this by Providing Adequate Resources and Trained Manpower Who Strictly Adhere to the Procedures of ISO 9001:2015 Quality Management System (QMS)." },
];

export default function QualityPolicyPage() {
  return (
    <div className="bg-cream/30 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Commitment"
          title="Quality Policy"
          subtitle="At Grameen Enterprise and Fashion, quality is not just a standard — it is our way of life."
        />

        <div className="max-w-4xl mx-auto mt-12 space-y-6">
          {policies.map((policy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-base-200 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-forest/10 text-forest flex items-center justify-center group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                <policy.icon className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <p className="text-xl md:text-2xl font-medium text-ink leading-relaxed font-display">
                  {policy.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 bg-forest text-cream rounded-3xl shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold font-display mb-2">ISO 9001:2015</h3>
            <p className="text-cream/80 uppercase tracking-widest text-sm font-semibold">
              Quality Management System Certified
            </p>
          </div>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-base-200">
            <h4 className="font-bold text-forest mb-3 uppercase tracking-wider text-sm">Philosophy</h4>
            <p className="text-ink/70">Concentrating on prevention methods to make quality a permanent habit.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-base-200">
            <h4 className="font-bold text-forest mb-3 uppercase tracking-wider text-sm">Execution</h4>
            <p className="text-ink/70">Ensuring each team member is committed to performing exactly as specified.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-base-200">
            <h4 className="font-bold text-forest mb-3 uppercase tracking-wider text-sm">Outcome</h4>
            <p className="text-ink/70">Delivering defect-free products that exceed customer expectations.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
