"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFinanceData } from "@/lib/useFinanceData";

const tagStyles: Record<string, string> = {
  "High leak": "bg-red-100 text-red-700 border-red-200",
  Review: "bg-amber-100 text-amber-700 border-amber-200",
  "Below goal": "bg-orange-100 text-orange-700 border-orange-200",
  Stable: "bg-green-50 text-green-700 border-green-200",
};

export default function MoneyFlowMap() {
  const { financialSummary, moneyFlows } = useFinanceData();
  return (
    <section id="money-flow" className="py-16 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-kakeibo-accent mb-3 font-medium">
            Money Flow
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Your Money Flow This Month
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            See where every dollar flowed, where it leaked, and what can be
            recovered.
          </p>
        </motion.div>

        {/* Flow diagram */}
        <div className="relative">
          {/* Income source */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <Card className="bg-kakeibo-dark text-white rounded-2xl px-6 sm:px-8 py-4 text-center shadow-lg border-0 inline-block">
              <p className="text-xs uppercase tracking-wider opacity-70 mb-1">
                Monthly Income
              </p>
              <p className="text-2xl sm:text-3xl font-bold">
                S${financialSummary.monthlyIncome.toLocaleString()}
              </p>
            </Card>
          </motion.div>

          {/* Flow arrows */}
          <div className="flex justify-center mb-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-kakeibo-tan" />
              <ArrowRight className="w-4 h-4 text-kakeibo-accent rotate-90" />
            </div>
          </div>

          {/* Flow cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {moneyFlows.map((flow, i) => {
              const widthPercent = (flow.amount / financialSummary.monthlyIncome) * 100;
              return (
                <motion.div
                  key={flow.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    className={`rounded-xl p-3 sm:p-4 h-full border transition-all hover:shadow-md ${
                      flow.tag === "High leak"
                        ? "border-red-200 bg-red-50/30"
                        : flow.tag === "Review"
                          ? "border-amber-200 bg-amber-50/30"
                          : flow.tag === "Below goal"
                            ? "border-orange-200 bg-orange-50/30"
                            : "border-kakeibo-tan/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: flow.color }}
                      />
                      {flow.tag && (
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 rounded-full ${tagStyles[flow.tag]}`}
                        >
                          {flow.tag}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {flow.name}
                    </p>
                    <p className="text-sm sm:text-base font-bold">
                      S${flow.amount.toLocaleString()}
                    </p>
                    {/* Mini bar */}
                    <div className="mt-2 w-full h-1.5 bg-kakeibo-warm rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: flow.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${widthPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                      />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* AI insight */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Card className="bg-kakeibo-warm/50 border-kakeibo-tan/40 rounded-xl p-4 max-w-lg mx-auto">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-kakeibo-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm leading-relaxed text-foreground italic">
                  &ldquo;Your money is not leaking everywhere. The biggest
                  recoverable flow is food delivery and subscriptions.&rdquo;
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
