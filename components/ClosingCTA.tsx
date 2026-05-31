"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClosingCTAProps {
  onBegin: () => void;
}

export default function ClosingCTA({ onBegin }: ClosingCTAProps) {
  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mb-8">
          <div className="w-16 h-px bg-kakeibo-accent mx-auto mb-8" />
          <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-4">
            Budgeting tells you what happened.
            <br />
            <span className="text-kakeibo-accent">
              Kakeibo AI helps you change what happens next.
            </span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            This is not about guilt. It is about clarity.
          </p>
        </div>
        <Button
          size="lg"
          onClick={onBegin}
          className="bg-kakeibo-dark hover:bg-kakeibo-brown text-white rounded-xl px-8"
        >
          Begin Your Money Reflection
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </motion.div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-kakeibo-tan/40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>Kakeibo AI — Mindful Finance Companion</span>
          <span>
            Built for young professionals, freelancers, and international students
            in Singapore
          </span>
        </div>
      </div>
    </section>
  );
}
