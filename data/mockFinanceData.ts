export interface SpendingCategory {
  name: string;
  amount: number;
  color: string;
  percentage: number;
}

export interface DailySpending {
  day: string;
  amount: number;
}

export interface PlannedVsActual {
  category: string;
  planned: number;
  actual: number;
}

export interface ActionItem {
  id: string;
  title: string;
  estimatedSavings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
}

export interface ChallengeDay {
  day: number;
  task: string;
  completed: boolean;
  savings: number;
}

export interface AgentInfo {
  name: string;
  icon: string;
  description: string;
  status: "Active" | "Ready" | "Watching";
  insight: string;
}

export interface MoneyFlow {
  name: string;
  amount: number;
  color: string;
  tag?: "High leak" | "Review" | "Below goal" | "Stable";
}

export interface MoneyLeak {
  id: string;
  category: string;
  icon: string;
  current: number;
  recoverable: number;
  suggestedAction: string;
  severity: "high" | "medium" | "low";
}

export interface AIInsight {
  id: string;
  title: string;
  body: string;
  icon: string;
  accent: string;
}

export const financialSummary = {
  monthlyIncome: 3200,
  totalSpending: 2460,
  currentSavings: 420,
  projectedOverspendRisk: 180,
  savingsGoal: 700,
  savingsGap: 280,
};

export const spendingCategories: SpendingCategory[] = [
  { name: "Rent", amount: 1100, color: "#8B7355", percentage: 44.7 },
  { name: "Food Delivery", amount: 420, color: "#D4956A", percentage: 17.1 },
  { name: "Groceries", amount: 310, color: "#A8C686", percentage: 12.6 },
  { name: "Transport", amount: 260, color: "#7BA7BC", percentage: 10.6 },
  { name: "Social & Entertainment", amount: 220, color: "#C4A6D7", percentage: 8.9 },
  { name: "Subscriptions", amount: 150, color: "#E8B4B8", percentage: 6.1 },
];

export const moneyFlows: MoneyFlow[] = [
  { name: "Rent", amount: 1100, color: "#8B7355", tag: "Stable" },
  { name: "Food Delivery", amount: 420, color: "#D4956A", tag: "High leak" },
  { name: "Groceries", amount: 310, color: "#A8C686", tag: "Stable" },
  { name: "Transport", amount: 260, color: "#7BA7BC", tag: "Stable" },
  { name: "Social & Fun", amount: 220, color: "#C4A6D7" },
  { name: "Subscriptions", amount: 150, color: "#E8B4B8", tag: "Review" },
  { name: "Savings", amount: 420, color: "#7BA67D", tag: "Below goal" },
  { name: "Buffer", amount: 320, color: "#B8A898" },
];

export const moneyLeaks: MoneyLeak[] = [
  {
    id: "1",
    category: "Food Delivery",
    icon: "UtensilsCrossed",
    current: 420,
    recoverable: 95,
    suggestedAction: "Reduce 4 delivery orders with home-cooked meals",
    severity: "high",
  },
  {
    id: "2",
    category: "Subscriptions",
    icon: "CreditCard",
    current: 150,
    recoverable: 45,
    suggestedAction: "Pause 2 unused subscriptions",
    severity: "medium",
  },
  {
    id: "3",
    category: "Social & Entertainment",
    icon: "Wine",
    current: 220,
    recoverable: 60,
    suggestedAction: "Set one weekend spending boundary",
    severity: "low",
  },
];

export const aiInsights: AIInsight[] = [
  {
    id: "1",
    title: "Biggest Leak",
    body: "Food delivery is your largest recoverable category at S$95 potential savings.",
    icon: "Droplets",
    accent: "#C75B5B",
  },
  {
    id: "2",
    title: "Fastest Win",
    body: "Pausing 2 subscriptions can recover S$45 immediately with zero lifestyle change.",
    icon: "Zap",
    accent: "#C4956A",
  },
  {
    id: "3",
    title: "This Week\u2019s Focus",
    body: "Protect your savings by setting a food delivery boundary of 6 orders max.",
    icon: "Target",
    accent: "#7BA67D",
  },
  {
    id: "4",
    title: "Future Self Note",
    body: "Small boundaries this week create breathing room next month. Your future self will thank you.",
    icon: "Heart",
    accent: "#C4A6D7",
  },
];

export const ritualActions: ActionItem[] = [
  { id: "1", title: "Reduce food delivery from 10 orders to 6", estimatedSavings: 95, difficulty: "Medium", completed: false },
  { id: "2", title: "Pause 2 unused subscriptions", estimatedSavings: 45, difficulty: "Easy", completed: false },
  { id: "3", title: "Set S$90 flexible spending cap", estimatedSavings: 70, difficulty: "Medium", completed: false },
  { id: "4", title: "Transfer S$40 every Monday", estimatedSavings: 40, difficulty: "Easy", completed: false },
  { id: "5", title: "Cook 2 simple meals this week", estimatedSavings: 30, difficulty: "Easy", completed: false },
];

export const dailySpending: DailySpending[] = [
  { day: "May 1", amount: 45 }, { day: "May 3", amount: 120 }, { day: "May 5", amount: 35 },
  { day: "May 7", amount: 88 }, { day: "May 9", amount: 62 }, { day: "May 11", amount: 95 },
  { day: "May 13", amount: 42 }, { day: "May 15", amount: 78 }, { day: "May 17", amount: 110 },
  { day: "May 19", amount: 55 }, { day: "May 21", amount: 85 }, { day: "May 23", amount: 68 },
  { day: "May 25", amount: 92 }, { day: "May 27", amount: 48 }, { day: "May 29", amount: 75 },
];

export const plannedVsActual: PlannedVsActual[] = [
  { category: "Rent", planned: 1100, actual: 1100 },
  { category: "Food", planned: 300, actual: 420 },
  { category: "Transport", planned: 200, actual: 260 },
  { category: "Groceries", planned: 280, actual: 310 },
  { category: "Subscriptions", planned: 100, actual: 150 },
  { category: "Social", planned: 150, actual: 220 },
];

export const actionItems: ActionItem[] = ritualActions;

export const challengeDays: ChallengeDay[] = [
  { day: 1, task: "No delivery", completed: false, savings: 15 },
  { day: 2, task: "Review subs", completed: false, savings: 20 },
  { day: 3, task: "Cook a meal", completed: false, savings: 12 },
  { day: 4, task: "No impulse buy", completed: false, savings: 18 },
  { day: 5, task: "Public transport", completed: false, savings: 10 },
  { day: 6, task: "Save S$40", completed: false, savings: 40 },
  { day: 7, task: "Reflect & reset", completed: false, savings: 0 },
];

export const agents: AgentInfo[] = [
  { name: "Ledger Agent", icon: "BookOpen", description: "Organizes your income, expenses, receipts, and statements into a clean monthly money story.", status: "Active", insight: "Your May spending is 8% higher than April, mainly driven by a S$40 increase in food delivery orders." },
  { name: "Sensei Agent", icon: "Brain", description: "Asks reflective Kakeibo-style questions to help you understand why you spent, not just what you spent.", status: "Active", insight: "You ordered food delivery 3 times last week after 9pm. Were those driven by hunger or by tiredness?" },
  { name: "Guardian Agent", icon: "Shield", description: "Detects risky spending patterns before they become painful.", status: "Watching", insight: "Your subscription spending has crept up by S$30 in the last 2 months. Two services overlap in function." },
  { name: "Action Agent", icon: "Zap", description: "Turns reflection into small weekly actions that protect your savings.", status: "Ready", insight: "If you cook just 2 meals this week, you will save roughly S$24 and stay within your food budget." },
];

export const chatResponses: Record<string, string> = {
  "Why am I overspending?": "You are not overspending across everything. The main issue is concentrated in food delivery and subscriptions. Food delivery alone makes up 17% of your total spending. If you reduce delivery from 10 orders to 6 orders this month, you can recover around S$120 without changing your rent, transport, or essential expenses.",
  "How can I save S$280 this month?": "To close your S$280 savings gap, take three actions: pause two unused subscriptions to save S$45, replace four food delivery meals with groceries to save around S$95, and set a weekly discretionary cap of S$90 to save another S$140. This protects your savings goal without requiring extreme lifestyle changes.",
  "Which spending can I reduce without hurting my lifestyle?": "Focus on two areas: subscriptions and food delivery. You have subscriptions that overlap in function \u2014 pausing them saves S$45 with zero lifestyle impact. Replacing 4 out of 10 food deliveries with simple home meals saves another S$95. Your rent, transport, and social spending are already reasonable for Singapore.",
  "Create a 7-day savings challenge": "Your 7-day challenge: no food delivery for 3 days, cancel or pause 1 unused subscription, use public transport for 2 short-distance trips, cook 2 simple meals, and transfer S$40 into savings at the start of the week. Estimated savings: S$85 to S$120.",
};

export const journalQuestions = [
  "What spending genuinely improved my life?",
  "What spending was reactive or impulsive?",
  "What can I protect next week?",
  "What will my future self thank me for?",
];

export const reflectionQuestions = journalQuestions;

export const mockReflectionSummary = "This month, your essentials were stable, but convenience spending became reactive. Your highest-impact move is not extreme cutting. It is creating a weekly boundary around food delivery and subscriptions.";
