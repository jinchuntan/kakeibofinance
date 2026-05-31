"use client";

import { useState, useEffect } from "react";
import * as mock from "@/data/mockFinanceData";

export function useFinanceData() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("kakeibo-analysis");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        // ignore invalid data
      }
    }
  }, []);

  return {
    financialSummary:
      (data?.financialSummary as typeof mock.financialSummary) ||
      mock.financialSummary,
    spendingCategories:
      (data?.spendingCategories as typeof mock.spendingCategories) ||
      mock.spendingCategories,
    dailySpending:
      (data?.dailySpending as typeof mock.dailySpending) ||
      mock.dailySpending,
    plannedVsActual:
      (data?.plannedVsActual as typeof mock.plannedVsActual) ||
      mock.plannedVsActual,
    moneyFlows:
      (data?.moneyFlows as typeof mock.moneyFlows) || mock.moneyFlows,
    moneyLeaks:
      (data?.moneyLeaks as typeof mock.moneyLeaks) || mock.moneyLeaks,
    aiInsights:
      (data?.aiInsights as typeof mock.aiInsights) || mock.aiInsights,
    isUserData: !!data,
  };
}
