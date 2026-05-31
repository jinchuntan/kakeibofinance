"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, CheckCircle2, Trophy, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { challengeDays as initialDays } from "@/data/mockFinanceData";
import type { ChallengeDay } from "@/data/mockFinanceData";

export default function RitualCalendar() {
  const [days, setDays] = useState<ChallengeDay[]>(initialDays);

  const completedCount = days.filter((d) => d.completed).length;
  const totalSaved = days.filter((d) => d.completed).reduce((s, d) => s + d.savings, 0);
  const allDone = completedCount === days.length;

  const toggleDay = (dayNum: number) => {
    setDays((prev) =>
      prev.map((d) => (d.day === dayNum ? { ...d, completed: !d.completed } : d))
    );
  };

  return (
    <section id="challenge" className="py-16 sm:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-kakeibo-accent" />
            <p className="text-xs uppercase tracking-[0.2em] text-kakeibo-accent font-medium">
              7-Day Challenge
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            7-Day Savings Ritual
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            One small action each day. Build momentum toward clarity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="rounded-2xl border-kakeibo-tan/60 p-5 sm:p-8">
            {/* Stats bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-kakeibo-accent" />
                <span className="text-sm font-medium">
                  {completedCount}/{days.length} days
                </span>
              </div>
              <span className="text-sm font-bold text-kakeibo-green">
                S${totalSaved} saved
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-kakeibo-warm rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full bg-gradient-to-r from-kakeibo-accent to-kakeibo-green rounded-full"
                animate={{ width: `${(completedCount / days.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Calendar tiles */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
              {days.map((day) => (
                <motion.button
                  key={day.day}
                  onClick={() => toggleDay(day.day)}
                  whileTap={{ scale: 0.93 }}
                  className={`relative flex flex-col items-center p-3 sm:p-4 rounded-xl border-2 transition-all ${
                    day.completed
                      ? "bg-green-50 border-kakeibo-green shadow-sm"
                      : "bg-white border-kakeibo-tan hover:border-kakeibo-accent"
                  }`}
                >
                  <span className="text-[10px] font-bold text-muted-foreground mb-1">
                    Day {day.day}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 transition-colors ${
                      day.completed ? "bg-kakeibo-green" : "bg-kakeibo-warm"
                    }`}
                  >
                    {day.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-xs font-bold text-kakeibo-brown">
                        {day.day}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-center leading-tight text-muted-foreground">
                    {day.task}
                  </p>
                  {day.savings > 0 && (
                    <span className={`text-[10px] font-medium mt-1 ${day.completed ? "text-kakeibo-green" : "text-muted-foreground/50"}`}>
                      +S${day.savings}
                    </span>
                  )}
                  {day.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Shield className="w-3.5 h-3.5 text-kakeibo-green" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Celebration */}
            <AnimatePresence>
              {allDone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 text-center"
                >
                  <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-50 to-green-50 rounded-xl border border-amber-200">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span className="text-xs sm:text-sm font-semibold text-amber-800">
                      You protected your future self this week.
                    </span>
                    <Trophy className="w-5 h-5 text-amber-500" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
