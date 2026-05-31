"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      icon: EyeOff,
      title: "Invisible Decisions",
      desc: "Every day, dozens of micro-spending decisions happen without thought. Tap. Swipe. Subscribe. Repeat.",
    },
    {
      icon: TrendingUp,
      title: "Slow Drift",
      desc: "No single purchase breaks you. But the pattern quietly widens the gap between what you earn and what you keep.",
    },
    {
      icon: Eye,
      title: "Missing Clarity",
      desc: "Most tools show you what happened. None help you understand why, or guide you on what to do next.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-kakeibo-red mb-3 font-medium">
            The Problem
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Money decisions happen invisibly.
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            By the time you check your balance, the pattern has already taken shape.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-kakeibo-warm mb-4">
                <p.icon className="w-5 h-5 text-kakeibo-brown" />
              </div>
              <h3 className="font-semibold text-sm mb-2">{p.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
