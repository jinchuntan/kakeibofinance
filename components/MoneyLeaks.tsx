"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, CreditCard, Wine, Droplets } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useFinanceData } from "@/lib/useFinanceData";

const iconMap: Record<string, React.ElementType> = {
  UtensilsCrossed,
  CreditCard,
  Wine,
};

const severityStyles: Record<string, { border: string; bg: string; dot: string }> = {
  high: { border: "border-red-200", bg: "bg-red-50", dot: "bg-kakeibo-red" },
  medium: { border: "border-amber-200", bg: "bg-amber-50", dot: "bg-kakeibo-accent" },
  low: { border: "border-blue-200", bg: "bg-blue-50", dot: "bg-blue-400" },
};

export default function MoneyLeaks() {
  const { moneyLeaks } = useFinanceData();
  const totalRecoverable = moneyLeaks.reduce((s, l) => s + l.recoverable, 0);

  return (
    <section id="money-leaks" className="py-16 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Droplets className="w-4 h-4 text-kakeibo-red" />
            <p className="text-xs uppercase tracking-[0.2em] text-kakeibo-red font-medium">
              Money Leaks
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Your Biggest Money Leaks
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            Not wasted money. Potential to recover S${totalRecoverable} this
            month.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {moneyLeaks.map((leak, i) => {
            const Icon = iconMap[leak.icon] || CreditCard;
            const styles = severityStyles[leak.severity];
            const leakPercent = (leak.recoverable / leak.current) * 100;

            return (
              <motion.div
                key={leak.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`rounded-2xl p-5 sm:p-6 h-full ${styles.border} hover:shadow-lg transition-all group cursor-default`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${styles.bg}`}>
                      <Icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    <div className={`w-2.5 h-2.5 rounded-full ${styles.dot}`} />
                  </div>

                  <h3 className="font-semibold text-sm mb-1">{leak.category}</h3>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl sm:text-2xl font-bold">
                      S${leak.current}
                    </span>
                    <span className="text-xs text-muted-foreground">/month</span>
                  </div>

                  {/* Leak visualization */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">
                        Potential to recover
                      </span>
                      <span className="font-semibold text-kakeibo-green">
                        S${leak.recoverable}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-kakeibo-warm rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-kakeibo-green rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${leakPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {leak.suggestedAction}
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
