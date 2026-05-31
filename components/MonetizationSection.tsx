"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free",
    price: "S$0",
    period: "forever",
    description: "Get started with mindful tracking",
    features: [
      "Manual expense tracking",
      "Monthly reflection journal",
      "Basic dashboard view",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "S$6.90",
    period: "/month",
    description: "Unlock your AI money sensei",
    features: [
      "AI spending analysis",
      "Money Sensei chat",
      "Weekly action plan",
      "Savings challenge tracker",
      "Pattern detection alerts",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Partner",
    price: "Custom",
    period: "",
    description: "For organizations and platforms",
    features: [
      "Financial wellness dashboard",
      "Aggregated non-sensitive insights",
      "Custom onboarding flow",
      "Universities & coworking spaces",
      "Employee wellness programs",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export default function MonetizationSection() {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-3">Simple, Thoughtful Pricing</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Choose the level of guidance that fits your financial journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`rounded-2xl p-6 sm:p-8 h-full flex flex-col relative ${
                  plan.highlighted
                    ? "border-kakeibo-accent border-2 shadow-lg"
                    : "border-kakeibo-tan/60"
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-kakeibo-accent text-white rounded-full px-3">
                    Most Popular
                  </Badge>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-kakeibo-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-xl ${
                    plan.highlighted
                      ? "bg-kakeibo-dark hover:bg-kakeibo-brown text-white"
                      : "bg-kakeibo-warm hover:bg-kakeibo-tan text-foreground"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
