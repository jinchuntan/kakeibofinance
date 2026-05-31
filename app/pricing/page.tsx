"use client";

import { motion } from "framer-motion";
import MonetizationSection from "@/components/MonetizationSection";
import ClosingCTA from "@/components/ClosingCTA";

export default function PricingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex-1 pt-14">
        {/* Pricing Plans */}
        <MonetizationSection />

        <div className="section-divider" />

        {/* Closing CTA */}
        <ClosingCTA />
      </main>
    </motion.div>
  );
}
