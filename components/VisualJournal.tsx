"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Sparkles, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { journalQuestions } from "@/data/mockFinanceData";

export default function VisualJournal() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [reflectionText, setReflectionText] = useState("");

  const hasContent = Object.values(answers).some((a) => a.trim().length > 0);

  const handleGenerate = async () => {
    if (!hasContent) return;
    setGenerating(true);

    const entries = journalQuestions.map((q, i) => ({
      question: q,
      answer: answers[i] || "",
    }));

    try {
      const response = await fetch("/api/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries }),
      });

      if (!response.ok) throw new Error("Failed to generate reflection");

      const data = await response.json();
      setReflectionText(data.summary);
      setShowSummary(true);
    } catch {
      setReflectionText(
        "I could not generate your reflection right now. Your journal entries are saved — please try again shortly."
      );
      setShowSummary(true);
    } finally {
      setGenerating(false);
    }
  };

  const today = new Date();
  const monthName = today.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <section id="reflection" className="py-16 sm:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <PenLine className="w-4 h-4 text-kakeibo-accent" />
            <p className="text-xs uppercase tracking-[0.2em] text-kakeibo-accent font-medium">
              Kakeibo Journal
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Monthly Reflection
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Pause. Reflect. Understand your relationship with money.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="rounded-2xl border-kakeibo-tan/60 overflow-hidden">
            {/* Journal header */}
            <div className="bg-kakeibo-warm/50 px-6 sm:px-8 py-4 border-b border-kakeibo-tan/40 notebook-lines">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-kakeibo-brown" />
                  <span className="text-sm font-medium">{monthName}</span>
                </div>
                <span className="text-xs text-muted-foreground italic">
                  Monthly intention: Build clarity, not guilt
                </span>
              </div>
            </div>

            {/* Journal body */}
            <div className="p-6 sm:p-8 space-y-5 notebook-lines">
              {journalQuestions.map((q, i) => (
                <div key={i}>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    {q}
                  </label>
                  <Textarea
                    placeholder="Write your thoughts..."
                    value={answers[i] || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [i]: e.target.value }))
                    }
                    className="rounded-xl border-kakeibo-tan resize-none focus-visible:ring-kakeibo-accent min-h-[56px] bg-white/60"
                    rows={2}
                  />
                </div>
              ))}

              <div className="text-center pt-2">
                <Button
                  onClick={handleGenerate}
                  disabled={generating || !hasContent}
                  className="bg-kakeibo-dark hover:bg-kakeibo-brown text-white rounded-xl px-6"
                >
                  {generating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Reflection Summary
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Generated summary */}
            <AnimatePresence>
              {showSummary && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <div className="bg-kakeibo-warm/60 rounded-xl p-5 border border-kakeibo-tan/40 relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-kakeibo-accent" />
                          <span className="text-sm font-medium text-kakeibo-accent">
                            AI Reflection Summary
                          </span>
                        </div>
                        <span className="stamp">Reflection Generated</span>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">
                        {reflectionText}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
