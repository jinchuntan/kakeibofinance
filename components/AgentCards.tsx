"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { agents } from "@/data/mockFinanceData";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Brain,
  Shield,
  Zap,
};

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800",
  Ready: "bg-amber-100 text-amber-800",
  Watching: "bg-blue-100 text-blue-800",
};

export default function AgentCards() {
  return (
    <section id="agents" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-3">Your AI Money Team</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Four specialized agents working together to protect your finances.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {agents.map((agent, i) => {
            const Icon = iconMap[agent.icon];
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-xl border-kakeibo-tan/60 p-5 h-full flex flex-col hover:shadow-md hover:border-kakeibo-accent/40 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-kakeibo-warm">
                      {Icon && <Icon className="w-5 h-5 text-kakeibo-brown" />}
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs rounded-full px-2.5 ${statusColors[agent.status]}`}
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5">{agent.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed flex-1">
                    {agent.description}
                  </p>
                  <div className="bg-kakeibo-warm/60 rounded-lg p-3">
                    <p className="text-xs text-kakeibo-dark leading-relaxed italic">
                      &ldquo;{agent.insight}&rdquo;
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
