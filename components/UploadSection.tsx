"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Camera,
  PenLine,
  Loader2,
  Check,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Transaction {
  date: string;
  description: string;
  amount: number;
}

interface ManualEntry {
  description: string;
  amount: string;
  category: string;
}

function parseCSV(text: string): Transaction[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  // Detect columns from header
  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().toLowerCase().replace(/"/g, ""));
  const dateIdx = headers.findIndex((h) => h.includes("date"));
  const descIdx = headers.findIndex(
    (h) =>
      h.includes("desc") ||
      h.includes("narr") ||
      h.includes("particular") ||
      h.includes("reference") ||
      h.includes("memo") ||
      h.includes("payee")
  );
  const amountIdx = headers.findIndex(
    (h) =>
      h.includes("amount") ||
      h.includes("debit") ||
      h.includes("withdrawal")
  );
  const creditIdx = headers.findIndex(
    (h) => h.includes("credit") || h.includes("deposit")
  );

  const transactions: Transaction[] = [];

  for (let r = 1; r < lines.length; r++) {
    const row = lines[r];
    if (!row.trim()) continue;

    // Handle quoted CSV fields
    const cols: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of row) {
      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (char === "," && !inQuotes) {
        cols.push(current.trim());
        current = "";
        continue;
      }
      current += char;
    }
    cols.push(current.trim());

    const date = dateIdx >= 0 ? cols[dateIdx] || "" : cols[0] || "";
    const desc = descIdx >= 0 ? cols[descIdx] || "" : cols[1] || "";
    let amount = 0;

    if (amountIdx >= 0) {
      amount = Math.abs(
        parseFloat(cols[amountIdx]?.replace(/[^0-9.-]/g, "") || "0")
      );
    }

    // Skip credit-only rows (income)
    if (creditIdx >= 0 && cols[creditIdx]) {
      const credit = parseFloat(
        cols[creditIdx]?.replace(/[^0-9.-]/g, "") || "0"
      );
      if (credit > 0 && amount === 0) continue;
    }

    if (amount > 0 && desc) {
      transactions.push({ date, description: desc, amount });
    }
  }

  return transactions;
}

export default function UploadSection() {
  const [loading, setLoading] = useState(false);
  const [csvTransactions, setCsvTransactions] = useState<Transaction[]>([]);
  const [csvFileName, setCsvFileName] = useState("");
  const [receiptFiles, setReceiptFiles] = useState<string[]>([]);
  const [manualEntries, setManualEntries] = useState<ManualEntry[]>([]);
  const [activePanel, setActivePanel] = useState<"manual" | null>(null);
  const [newEntry, setNewEntry] = useState<ManualEntry>({
    description: "",
    amount: "",
    category: "",
  });
  const [error, setError] = useState("");

  const csvInputRef = useRef<HTMLInputElement>(null);
  const receiptInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const hasData =
    csvTransactions.length > 0 ||
    manualEntries.length > 0 ||
    receiptFiles.length > 0;

  const handleCSVUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setCsvFileName(file.name);
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        const transactions = parseCSV(text);
        if (transactions.length === 0) {
          setError(
            "Could not parse any transactions from this CSV. Expected columns: Date, Description, Amount."
          );
          setCsvFileName("");
        } else {
          setCsvTransactions(transactions);
          setError("");
        }
      };
      reader.readAsText(file);
      // Reset so the same file can be re-selected
      e.target.value = "";
    },
    []
  );

  const handleReceiptUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      const names = Array.from(files).map((f) => f.name);
      setReceiptFiles((prev) => [...prev, ...names]);
      e.target.value = "";
    },
    []
  );

  const addManualEntry = () => {
    if (!newEntry.description || !newEntry.amount) return;
    setManualEntries((prev) => [...prev, { ...newEntry }]);
    setNewEntry({ description: "", amount: "", category: "" });
  };

  const removeManualEntry = (idx: number) => {
    setManualEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAnalyze = async () => {
    if (!hasData) return;
    setLoading(true);
    setError("");

    // Combine all transaction sources
    const allTransactions: Transaction[] = [
      ...csvTransactions,
      ...manualEntries.map((e) => ({
        date: new Date().toLocaleDateString(),
        description:
          e.description + (e.category ? ` [${e.category}]` : ""),
        amount: parseFloat(e.amount) || 0,
      })),
    ];

    // If only receipts were uploaded (no parseable data), use placeholder
    if (allTransactions.length === 0 && receiptFiles.length > 0) {
      setError(
        "Receipt analysis coming soon. Please also upload a CSV or add manual entries."
      );
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactions: allTransactions }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const analysis = await res.json();
      localStorage.setItem("kakeibo-analysis", JSON.stringify(analysis));
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
      setLoading(false);
    }
  };

  const totalAmount = [
    ...csvTransactions,
    ...manualEntries.map((e) => ({
      amount: parseFloat(e.amount) || 0,
    })),
  ].reduce((s, t) => s + t.amount, 0);

  const uploadOptions = [
    {
      icon: FileText,
      label: "Bank Statement CSV",
      desc: csvFileName || "Upload your monthly statement",
      active: csvTransactions.length > 0,
      badge:
        csvTransactions.length > 0
          ? `${csvTransactions.length} transactions`
          : undefined,
      onClick: () => csvInputRef.current?.click(),
    },
    {
      icon: Camera,
      label: "Receipt Screenshot",
      desc:
        receiptFiles.length > 0
          ? `${receiptFiles.length} receipt(s) uploaded`
          : "Snap a photo of your receipt",
      active: receiptFiles.length > 0,
      onClick: () => receiptInputRef.current?.click(),
    },
    {
      icon: PenLine,
      label: "Manual Entry",
      desc:
        manualEntries.length > 0
          ? `${manualEntries.length} entries added`
          : "Add expenses by hand",
      active: manualEntries.length > 0,
      onClick: () =>
        setActivePanel(activePanel === "manual" ? null : "manual"),
    },
  ];

  return (
    <section id="upload" className="py-20 px-4">
      {/* Hidden file inputs */}
      <input
        ref={csvInputRef}
        type="file"
        accept=".csv"
        aria-label="Upload bank statement CSV"
        className="hidden"
        onChange={handleCSVUpload}
      />
      <input
        ref={receiptInputRef}
        type="file"
        accept="image/*"
        multiple
        aria-label="Upload receipt screenshots"
        className="hidden"
        onChange={handleReceiptUpload}
      />

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
            Share your financial data and let your Money Sensei read the
            story behind the numbers.
          </p>
        </motion.div>

        {/* Upload option cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {uploadOptions.map((opt, i) => (
            <motion.div
              key={opt.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card
                onClick={opt.onClick}
                className={`p-6 text-center cursor-pointer hover:border-kakeibo-accent hover:shadow-md transition-all group rounded-xl border-2 ${
                  opt.active
                    ? "border-kakeibo-green bg-green-50/30"
                    : "border-dashed border-kakeibo-tan"
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 transition-colors">
                  {opt.active ? (
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-5 h-5 text-kakeibo-green" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-kakeibo-warm flex items-center justify-center group-hover:bg-kakeibo-tan">
                      <opt.icon className="w-5 h-5 text-kakeibo-brown" />
                    </div>
                  )}
                </div>
                <p className="font-medium text-sm mb-1">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
                {opt.badge && (
                  <p className="text-xs text-kakeibo-green font-medium mt-1">
                    {opt.badge}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Manual Entry Panel */}
        <AnimatePresence>
          {activePanel === "manual" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <Card className="p-5 rounded-xl border-kakeibo-tan">
                <h3 className="text-sm font-semibold mb-4">Add Expense</h3>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Description (e.g., Grab ride)"
                    value={newEntry.description}
                    onChange={(e) =>
                      setNewEntry((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => e.key === "Enter" && addManualEntry()}
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-kakeibo-tan bg-white focus:outline-none focus:border-kakeibo-accent"
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={newEntry.amount}
                    onChange={(e) =>
                      setNewEntry((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => e.key === "Enter" && addManualEntry()}
                    className="w-full sm:w-28 px-3 py-2 text-sm rounded-lg border border-kakeibo-tan bg-white focus:outline-none focus:border-kakeibo-accent"
                  />
                  <select
                    value={newEntry.category}
                    onChange={(e) =>
                      setNewEntry((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    aria-label="Expense category"
                    className="w-full sm:w-40 px-3 py-2 text-sm rounded-lg border border-kakeibo-tan bg-white focus:outline-none focus:border-kakeibo-accent"
                  >
                    <option value="">Category (optional)</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Bills">Bills</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Health">Health</option>
                    <option value="Other">Other</option>
                  </select>
                  <Button
                    type="button"
                    size="sm"
                    onClick={addManualEntry}
                    disabled={!newEntry.description || !newEntry.amount}
                    aria-label="Add expense entry"
                    className="bg-kakeibo-dark hover:bg-kakeibo-brown text-white rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {manualEntries.length > 0 && (
                  <div className="space-y-2">
                    {manualEntries.map((entry, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm bg-kakeibo-warm/50 rounded-lg px-3 py-2"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="font-medium truncate">
                            {entry.description}
                          </span>
                          {entry.category && (
                            <span className="text-xs text-muted-foreground ml-2">
                              ({entry.category})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                          <span className="font-semibold">
                            S${parseFloat(entry.amount).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeManualEntry(idx)}
                            className="text-muted-foreground hover:text-kakeibo-red transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary bar */}
        <AnimatePresence>
          {hasData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mb-4"
            >
              <p className="text-sm text-kakeibo-brown">
                <span className="font-semibold">
                  {csvTransactions.length + manualEntries.length}
                </span>{" "}
                transaction{csvTransactions.length + manualEntries.length !== 1 ? "s" : ""}{" "}
                totaling{" "}
                <span className="font-semibold">
                  S${totalAmount.toFixed(2)}
                </span>
                {receiptFiles.length > 0 && (
                  <>
                    {" "}
                    + {receiptFiles.length} receipt
                    {receiptFiles.length !== 1 ? "s" : ""}
                  </>
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mb-4"
            >
              <p className="text-sm text-kakeibo-red">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analyze button / Loading state */}
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
              <motion.div
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={!hasData}
                  className="bg-kakeibo-dark hover:bg-kakeibo-brown text-white rounded-xl px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="mr-2 w-4 h-4" />
                  Analyze My Spending
                </Button>
                {!hasData && (
                  <p className="text-xs text-muted-foreground mt-3">
                    Upload a CSV, add receipts, or enter expenses to begin
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
