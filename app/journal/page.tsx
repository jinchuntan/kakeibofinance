"use client";

import { motion } from "framer-motion";
import VisualJournal from "@/components/VisualJournal";
import WeeklyRitualBoard from "@/components/WeeklyRitualBoard";
import RitualCalendar from "@/components/RitualCalendar";
import FutureSelfComparison from "@/components/FutureSelfComparison";

export default function JournalPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex-1 pt-14">
        {/* Kakeibo Reflection Journal */}
        <VisualJournal />

        <div className="section-divider" />

        {/* Weekly Ritual Board */}
        <WeeklyRitualBoard />

        <div className="section-divider" />

        {/* 7-Day Savings Challenge */}
        <RitualCalendar />

        <div className="section-divider" />

        {/* Current You vs Future You */}
        <FutureSelfComparison />
      </main>
    </motion.div>
  );
}
