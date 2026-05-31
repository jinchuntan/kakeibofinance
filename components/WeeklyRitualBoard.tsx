"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Check, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ritualActions, financialSummary } from "@/data/mockFinanceData";
import type { ActionItem } from "@/data/mockFinanceData";

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-amber-100 text-amber-800",
  Hard: "bg-red-100 text-red-800",
};

export default function WeeklyRitualBoard() {
  const [actions, setActions] = useState<ActionItem[]>(ritualActions);

  const completedSavings = actions
    .filter((a) => a.completed)
    .reduce((sum, a) => sum + a.estimatedSavings, 0);

  const totalPossible = actions.reduce((s, a) => s + a.estimatedSavings, 0);
  const progressPercent = Math.min(100, (completedSavings / financialSummary.savingsGap) * 100);

  const toggleAction = (id: string) => {
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  return (
    <section id="action-plan" className="py-16 sm:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-kakeibo-accent" />
            <p className="text-xs uppercase tracking-[0.2em] text-kakeibo-accent font-medium">
              Weekly Ritual
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            This Week&apos;s Money Ritual
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Five small actions. One protected future.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Progress card */}
          <Card className="rounded-2xl border-kakeibo-tan/60 p-5 sm:p-6 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Savings Protected</span>
              <span className="text-sm font-bold text-kakeibo-green">
                S${completedSavings} / S${financialSummary.savingsGap}
              </span>
            </div>
            <div className="w-full h-3 bg-kakeibo-warm rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-kakeibo-accent to-kakeibo-green rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            {completedSavings > 0 && (
              <p className="text-xs text-kakeibo-green mt-2">
                +S${completedSavings} recovered from completed rituals
              </p>
            )}
          </Card>

          {/* Action cards */}
          <div className="space-y-3">
            {actions.map((action, i) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <button
                  onClick={() => toggleAction(action.id)}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    action.completed
                      ? "bg-green-50/50 border-kakeibo-green/40"
                      : "bg-white border-kakeibo-tan/60 hover:border-kakeibo-accent/40 hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      action.completed
                        ? "bg-kakeibo-green border-kakeibo-green"
                        : "border-kakeibo-tan"
                    }`}
                  >
                    {action.completed && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className={`text-sm font-medium ${
                          action.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {action.title}
                      </p>
                      {action.completed && (
                        <motion.span
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: -3 }}
                          className="stamp"
                        >
                          <Shield className="w-3 h-3" />
                          Protected
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-kakeibo-green font-medium">
                        Recovery: ~S${action.estimatedSavings}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] rounded-full px-2 ${difficultyColors[action.difficulty]}`}
                      >
                        {action.difficulty}
                      </Badge>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Completing all rituals could protect up to S${totalPossible} this week
          </p>
        </motion.div>
      </div>
    </section>
  );
}
