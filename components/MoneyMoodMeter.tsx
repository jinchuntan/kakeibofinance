"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const moods = ["Drifting", "Recovering", "Protected"];
const currentMoodIndex = 1; // "Recovering"

export default function MoneyMoodMeter() {
  const percent = ((currentMoodIndex + 0.5) / moods.length) * 100;

  return (
    <section id="mood" className="py-16 sm:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-kakeibo-accent" />
            <p className="text-xs uppercase tracking-[0.2em] text-kakeibo-accent font-medium">
              Money Mood
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            This Month&apos;s Money Mood
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="rounded-2xl border-kakeibo-tan/60 p-6 sm:p-8">
            {/* Mood bar */}
            <div className="relative mb-6">
              <div className="w-full h-3 mood-gradient rounded-full overflow-hidden" />
              {/* Indicator */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2"
                initial={{ left: "0%" }}
                whileInView={{ left: `${percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                style={{ marginLeft: "-10px" }}
              >
                <div className="w-5 h-5 bg-white rounded-full border-2 border-kakeibo-accent shadow-md" />
              </motion.div>
            </div>

            {/* Mood labels */}
            <div className="flex justify-between mb-6">
              {moods.map((mood, i) => (
                <span
                  key={mood}
                  className={`text-xs sm:text-sm font-medium ${
                    i === currentMoodIndex
                      ? "text-kakeibo-accent"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {mood}
                </span>
              ))}
            </div>

            {/* Current state */}
            <div className="text-center bg-kakeibo-warm/50 rounded-xl p-5">
              <p className="text-lg sm:text-xl font-bold text-kakeibo-accent mb-2">
                Recovering
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                You are not in crisis. Your essentials are stable, but
                convenience spending is pulling you away from your savings goal.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
