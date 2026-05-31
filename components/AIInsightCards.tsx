"use client";

import { motion } from "framer-motion";
import { Droplets, Zap, Target, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { aiInsights } from "@/data/mockFinanceData";

const iconMap: Record<string, React.ElementType> = {
  Droplets,
  Zap,
  Target,
  Heart,
};

export default function AIInsightCards() {
  return (
    <section id="insights" className="py-16 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-kakeibo-accent mb-3 font-medium">
            AI Insights
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            What Your Money Sensei Sees
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {aiInsights.map((insight, i) => {
            const Icon = iconMap[insight.icon] || Zap;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="rounded-xl p-4 sm:p-5 h-full border-kakeibo-tan/60 hover:shadow-md transition-all group">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${insight.accent}18` }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: insight.accent }}
                    />
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm mb-1.5">
                    {insight.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {insight.body}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
