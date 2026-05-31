"use client";

import { motion } from "framer-motion";
import MoneySenseiChat from "@/components/MoneySenseiChat";

export default function ChatPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex-1 pt-14">
        <MoneySenseiChat />
      </main>
    </motion.div>
  );
}
