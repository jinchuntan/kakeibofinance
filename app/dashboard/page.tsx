"use client";

import { motion } from "framer-motion";
import MoneyFlowMap from "@/components/MoneyFlowMap";
import MoneyLeaks from "@/components/MoneyLeaks";
import AgentCards from "@/components/AgentCards";
import Dashboard from "@/components/Dashboard";
import MoneyMoodMeter from "@/components/MoneyMoodMeter";
import AIInsightCards from "@/components/AIInsightCards";

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex-1 pt-14">
        {/* Money Flow Map */}
        <MoneyFlowMap />

        <div className="section-divider" />

        {/* Money Leaks */}
        <MoneyLeaks />

        <div className="section-divider" />

        {/* AI Agents */}
        <AgentCards />

        <div className="section-divider" />

        {/* Dashboard Charts */}
        <Dashboard />

        <div className="section-divider" />

        {/* Money Mood */}
        <MoneyMoodMeter />

        <div className="section-divider" />

        {/* AI Insights */}
        <AIInsightCards />
      </main>
    </motion.div>
  );
}
