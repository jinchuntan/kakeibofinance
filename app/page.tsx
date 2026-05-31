"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import UploadSection from "@/components/UploadSection";
import MoneyFlowMap from "@/components/MoneyFlowMap";
import MoneyLeaks from "@/components/MoneyLeaks";
import AgentCards from "@/components/AgentCards";
import Dashboard from "@/components/Dashboard";
import MoneyMoodMeter from "@/components/MoneyMoodMeter";
import AIInsightCards from "@/components/AIInsightCards";
import MoneySenseiChat from "@/components/MoneySenseiChat";
import VisualJournal from "@/components/VisualJournal";
import WeeklyRitualBoard from "@/components/WeeklyRitualBoard";
import RitualCalendar from "@/components/RitualCalendar";
import FutureSelfComparison from "@/components/FutureSelfComparison";
import MonetizationSection from "@/components/MonetizationSection";
import ClosingCTA from "@/components/ClosingCTA";

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);
  const uploadRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const journalRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalyze = () => {
    setShowDashboard(true);
    setTimeout(() => scrollTo(flowRef), 100);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero
          onStartReflection={() => scrollTo(uploadRef)}
          onViewDashboard={() => {
            setShowDashboard(true);
            setTimeout(() => scrollTo(flowRef), 100);
          }}
        />

        <div className="section-divider" />

        {/* 2. Problem */}
        <ProblemSection />

        <div className="section-divider" />

        {/* 3. Upload */}
        <div ref={uploadRef}>
          <UploadSection onAnalyze={handleAnalyze} />
        </div>

        {/* 4-15. Full experience after analysis */}
        <AnimatePresence>
          {showDashboard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="section-divider" />

              {/* 4. Money Flow Map */}
              <div ref={flowRef}>
                <MoneyFlowMap />
              </div>

              <div className="section-divider" />

              {/* 5. Money Leaks */}
              <MoneyLeaks />

              <div className="section-divider" />

              {/* 6. AI Agents */}
              <AgentCards />

              <div className="section-divider" />

              {/* 7. Dashboard */}
              <Dashboard />

              <div className="section-divider" />

              {/* 8. Money Mood */}
              <MoneyMoodMeter />

              <div className="section-divider" />

              {/* 9. AI Insight Cards + Chat */}
              <AIInsightCards />
              <MoneySenseiChat />

              <div className="section-divider" />

              {/* 10. Journal */}
              <div ref={journalRef}>
                <VisualJournal />
              </div>

              <div className="section-divider" />

              {/* 11. Weekly Ritual Board */}
              <WeeklyRitualBoard />

              <div className="section-divider" />

              {/* 12. 7-Day Savings Ritual */}
              <RitualCalendar />

              <div className="section-divider" />

              {/* 13. Current You vs Future You */}
              <FutureSelfComparison />

              <div className="section-divider" />

              {/* 14. Monetization */}
              <MonetizationSection />

              <div className="section-divider" />

              {/* 15. Closing CTA */}
              <ClosingCTA onBegin={() => scrollTo(journalRef)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
