"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Receipt, ArrowDown, BookOpen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onStartReflection: () => void;
  onViewDashboard: () => void;
}

export default function Hero({ onStartReflection, onViewDashboard }: HeroProps) {
  return (
    <section className="min-h-[100dvh] flex items-center justify-center pt-14 px-4 relative overflow-hidden">
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-kakeibo-warm/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-48 h-48 rounded-full bg-kakeibo-tan/30 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-kakeibo-accent mb-4 font-medium">
            Mindful Finance Companion
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-3">
            Meet your AI
            <br />
            <span className="text-kakeibo-accent">Money Sensei.</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-3 leading-relaxed max-w-lg">
            Kakeibo AI turns messy spending into a calm weekly ritual of
            reflection, clarity, and action.
          </p>
          <p className="text-sm text-muted-foreground/70 mb-8 max-w-md italic">
            Inspired by Kakeibo, the Japanese household budgeting method built
            around mindful reflection.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={onStartReflection}
              className="bg-kakeibo-dark hover:bg-kakeibo-brown text-white rounded-xl px-6"
            >
              Start My Money Ritual
              <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onViewDashboard}
              className="rounded-xl px-6 border-kakeibo-tan hover:bg-kakeibo-warm"
            >
              View Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden sm:block"
        >
          <div className="relative">
            <div className="grid grid-cols-3 gap-3 items-center">
              <motion.div
                initial={{ rotate: -5, opacity: 0 }}
                animate={{ rotate: -2, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-2"
              >
                <div className="bg-white/70 border border-kakeibo-tan rounded-lg p-3 transform -rotate-2 shadow-sm">
                  <Receipt className="w-4 h-4 text-kakeibo-accent mb-1" />
                  <p className="text-[10px] text-muted-foreground">Grab Food</p>
                  <p className="text-xs font-semibold">S$18.50</p>
                </div>
                <div className="bg-white/70 border border-kakeibo-tan rounded-lg p-3 transform rotate-1 shadow-sm">
                  <Receipt className="w-4 h-4 text-kakeibo-red mb-1" />
                  <p className="text-[10px] text-muted-foreground">Netflix</p>
                  <p className="text-xs font-semibold">S$16.98</p>
                </div>
                <div className="bg-white/70 border border-kakeibo-tan rounded-lg p-3 transform -rotate-1 shadow-sm">
                  <Receipt className="w-4 h-4 text-kakeibo-brown mb-1" />
                  <p className="text-[10px] text-muted-foreground">Spotify</p>
                  <p className="text-xs font-semibold">S$9.99</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-kakeibo-tan" />
                  <ArrowRight className="w-3 h-3 text-kakeibo-accent" />
                </div>
                <div className="bg-kakeibo-dark text-white rounded-xl p-4 text-center shadow-lg">
                  <Sparkles className="w-5 h-5 mx-auto mb-1.5 text-kakeibo-accent" />
                  <p className="text-[10px] font-medium tracking-wide uppercase">
                    Kakeibo AI
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-kakeibo-accent" />
                  <ArrowRight className="w-3 h-3 text-kakeibo-green" />
                </div>
              </motion.div>

              <motion.div
                initial={{ rotate: 5, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="space-y-2"
              >
                <div className="bg-white border border-kakeibo-green/30 rounded-lg p-3 shadow-sm">
                  <BookOpen className="w-4 h-4 text-kakeibo-green mb-1" />
                  <p className="text-[10px] text-muted-foreground">Clean Ledger</p>
                  <p className="text-xs font-semibold text-kakeibo-green">Organized</p>
                </div>
                <div className="bg-white border border-kakeibo-accent/30 rounded-lg p-3 shadow-sm">
                  <Sparkles className="w-4 h-4 text-kakeibo-accent mb-1" />
                  <p className="text-[10px] text-muted-foreground">Savings Plan</p>
                  <p className="text-xs font-semibold text-kakeibo-accent">S$280 goal</p>
                </div>
                <div className="bg-white border border-kakeibo-green/30 rounded-lg p-3 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-kakeibo-green mb-1" />
                  <p className="text-[10px] text-muted-foreground">Future Self</p>
                  <p className="text-xs font-semibold text-kakeibo-green">Protected</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="mt-5 bg-white/80 backdrop-blur-sm border border-kakeibo-tan rounded-xl p-4 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-kakeibo-accent via-kakeibo-brown to-kakeibo-accent" />
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-kakeibo-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-foreground italic">
                  &ldquo;You are not overspending because you lack discipline.
                  You are overspending because your weekly food decisions have no
                  boundary.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
