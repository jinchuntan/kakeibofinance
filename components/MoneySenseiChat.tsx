"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Sparkles, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { chatResponses } from "@/data/mockFinanceData";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const promptChips = [
  "Why am I overspending?",
  "How can I save S$280 this month?",
  "Which spending can I reduce without hurting my lifestyle?",
  "Create a 7-day savings challenge",
];

export default function MoneySenseiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response =
        chatResponses[text] ||
        "That is a thoughtful question. Based on your spending pattern, the most impactful change you can make this week is to set a clear boundary on food delivery orders and review your active subscriptions. Small, consistent actions lead to meaningful savings over time.";
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setTyping(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
  };

  return (
    <section id="chat" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-3">Money Sensei Chat</h2>
          <p className="text-muted-foreground">
            Ask your AI companion about your spending, savings, and next steps.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="rounded-2xl border-kakeibo-tan/60 overflow-hidden">
            {/* Chat header */}
            <div className="px-5 py-3 border-b border-kakeibo-tan/40 flex items-center gap-2 bg-kakeibo-warm/30">
              <div className="p-1.5 rounded-full bg-kakeibo-accent/20">
                <Sparkles className="w-4 h-4 text-kakeibo-accent" />
              </div>
              <span className="text-sm font-medium">Money Sensei</span>
              <span className="text-xs text-green-600 ml-auto">Online</span>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="h-80 overflow-y-auto p-5 space-y-4"
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <MessageCircle className="w-8 h-8 text-kakeibo-tan" />
                  <p className="text-sm text-muted-foreground">
                    Ask me anything about your spending habits.
                  </p>
                </div>
              )}

              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-kakeibo-warm flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-kakeibo-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-kakeibo-dark text-white rounded-br-md"
                          : "bg-kakeibo-warm text-foreground rounded-bl-md"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-kakeibo-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-kakeibo-warm flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-kakeibo-accent" />
                  </div>
                  <div className="bg-kakeibo-warm rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-kakeibo-brown/40 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-kakeibo-brown/40 animate-bounce [animation-delay:0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-kakeibo-brown/40 animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Prompt chips */}
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {promptChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  disabled={typing}
                  className="text-xs px-3 py-1.5 rounded-full border border-kakeibo-tan hover:bg-kakeibo-warm hover:border-kakeibo-accent transition-colors text-muted-foreground disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-5 pb-5 flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                disabled={typing}
                className="rounded-xl border-kakeibo-tan focus-visible:ring-kakeibo-accent"
              />
              <Button
                type="submit"
                size="icon"
                disabled={typing || !input.trim()}
                className="rounded-xl bg-kakeibo-dark hover:bg-kakeibo-brown flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
