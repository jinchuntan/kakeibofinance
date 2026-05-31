"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Camera, PenLine, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function UploadSection() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2500);
  };

  const uploadOptions = [
    { icon: FileText, label: "Bank Statement CSV", desc: "Upload your monthly statement" },
    { icon: Camera, label: "Receipt Screenshot", desc: "Snap a photo of your receipt" },
    { icon: PenLine, label: "Manual Entry", desc: "Add expenses by hand" },
  ];

  return (
    <section id="upload" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-3">Upload Your Spending</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Share your financial data and let your Money Sensei read the story behind
            the numbers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {uploadOptions.map((opt, i) => (
            <motion.div
              key={opt.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="p-6 text-center cursor-pointer hover:border-kakeibo-accent hover:shadow-md transition-all group rounded-xl border-dashed border-2 border-kakeibo-tan">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-kakeibo-warm mb-3 group-hover:bg-kakeibo-tan transition-colors">
                  <opt.icon className="w-5 h-5 text-kakeibo-brown" />
                </div>
                <p className="font-medium text-sm mb-1">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center gap-4 py-8"
              >
                <Loader2 className="w-8 h-8 text-kakeibo-accent animate-spin" />
                <p className="text-lg text-kakeibo-brown font-medium animate-pulse">
                  Your Money Sensei is reading your spending story...
                </p>
              </motion.div>
            ) : (
              <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  className="bg-kakeibo-dark hover:bg-kakeibo-brown text-white rounded-xl px-8"
                >
                  <Upload className="mr-2 w-4 h-4" />
                  Analyze My Spending
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
