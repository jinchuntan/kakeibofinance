"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingDown,
  PiggyBank,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  financialSummary,
  spendingCategories,
  dailySpending,
  plannedVsActual,
} from "@/data/mockFinanceData";

const summaryCards = [
  {
    label: "Monthly Income",
    value: financialSummary.monthlyIncome,
    icon: DollarSign,
    color: "text-kakeibo-green",
    bg: "bg-green-50",
  },
  {
    label: "Total Spending",
    value: financialSummary.totalSpending,
    icon: TrendingDown,
    color: "text-kakeibo-accent",
    bg: "bg-orange-50",
  },
  {
    label: "Current Savings",
    value: financialSummary.currentSavings,
    icon: PiggyBank,
    color: "text-kakeibo-brown",
    bg: "bg-amber-50",
  },
  {
    label: "Overspend Risk",
    value: financialSummary.projectedOverspendRisk,
    icon: AlertTriangle,
    color: "text-kakeibo-red",
    bg: "bg-red-50",
  },
];

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-kakeibo-accent mb-3 font-medium">
            Monthly Summary
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Your Financial Story</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            A clear view of where your money goes this month.
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {summaryCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="rounded-xl border-kakeibo-tan/60">
                <CardContent className="pt-6 pb-4 px-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                      {card.label}
                    </span>
                    <div className={`p-2 rounded-lg ${card.bg}`}>
                      <card.icon className={`w-4 h-4 ${card.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">
                    S${card.value.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Savings Goal Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <Card className="rounded-xl border-kakeibo-tan/60 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Savings Progress</span>
              <span className="text-sm text-muted-foreground">
                S${financialSummary.currentSavings} / S${financialSummary.savingsGoal}
              </span>
            </div>
            <div className="w-full h-3 bg-kakeibo-warm rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-kakeibo-accent to-kakeibo-brown rounded-full"
                initial={{ width: 0 }}
                whileInView={{
                  width: `${(financialSummary.currentSavings / financialSummary.savingsGoal) * 100}%`,
                }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              S${financialSummary.savingsGap} gap remaining to reach your goal
            </p>
          </Card>
        </motion.div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-xl border-kakeibo-tan/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm sm:text-base">Where your money went</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={spendingCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="amount"
                      nameKey="name"
                    >
                      {spendingCategories.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`S$${value}`, "Amount"]}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #E8DDD0",
                        fontSize: "13px",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px" }}
                      iconType="circle"
                      iconSize={8}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-xl border-kakeibo-tan/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm sm:text-base">When spending accelerated</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={dailySpending}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8DDD0" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={{ stroke: "#E8DDD0" }}
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={{ stroke: "#E8DDD0" }}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip
                      formatter={(value) => [`S$${value}`, "Spent"]}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #E8DDD0",
                        fontSize: "13px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#C4956A"
                      strokeWidth={2.5}
                      dot={{ fill: "#C4956A", r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="rounded-xl border-kakeibo-tan/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base">Where your plan drifted</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={plannedVsActual} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8DDD0" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#E8DDD0" }}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#E8DDD0" }}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    formatter={(value) => [`S$${value}`]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #E8DDD0",
                      fontSize: "13px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" iconSize={8} />
                  <Bar dataKey="planned" fill="#A8C686" radius={[4, 4, 0, 0]} name="Planned" />
                  <Bar dataKey="actual" fill="#D4956A" radius={[4, 4, 0, 0]} name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
