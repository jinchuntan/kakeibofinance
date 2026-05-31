"use client";

import { motion } from "framer-motion";
import { ArrowRight, CloudRain, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";

const currentTraits = [
  "Reactive food spending",
  "Subscription creep",
  "S$280 savings gap",
  "Money mood: Drifting",
];

const futureTraits = [
  "Clear weekly spending boundary",
  "Unused subscriptions paused",
  "S$280 savings gap closed",
  "Money mood: Protected",
];

export default function FutureSelfComparison() {
  return (
    <section id="future-self" className="py-16 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-kakeibo-accent mb-3 font-medium">
            Transformation
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Current You vs Future You
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            See the difference one week of mindful action can make.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-2 items-center">
          {/* Current You */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-2xl p-5 sm:p-6 border-red-200/60 bg-red-50/20">
              <div className="flex items-center gap-2 mb-4">
                <CloudRain className="w-5 h-5 text-kakeibo-red" />
                <h3 className="font-bold text-sm">Current You</h3>
              </div>
              <ul className="space-y-2.5">
                {currentTraits.map((trait) => (
                  <li key={trait} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-kakeibo-red flex-shrink-0 mt-1.5" />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {trait}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Bridge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex sm:flex-col items-center gap-2 justify-center py-2"
          >
            <ArrowRight className="w-5 h-5 text-kakeibo-accent sm:rotate-0 rotate-90" />
            <div className="bg-kakeibo-dark text-white rounded-lg px-3 py-1.5 text-center">
              <p className="text-[10px] font-medium uppercase tracking-wider whitespace-nowrap">
                Kakeibo AI
              </p>
              <p className="text-[10px] opacity-70 whitespace-nowrap">Action Plan</p>
            </div>
            <ArrowRight className="w-5 h-5 text-kakeibo-green sm:rotate-0 rotate-90" />
          </motion.div>

          {/* Future You */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl p-5 sm:p-6 border-green-200/60 bg-green-50/20">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-5 h-5 text-kakeibo-green" />
                <h3 className="font-bold text-sm">Future You</h3>
              </div>
              <ul className="space-y-2.5">
                {futureTraits.map((trait) => (
                  <li key={trait} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-kakeibo-green flex-shrink-0 mt-1.5" />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {trait}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
