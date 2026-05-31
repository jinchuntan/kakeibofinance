import Groq from "groq-sdk";

const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      {
        error:
          "AI service is not configured. Please add your GROQ_API_KEY to .env.local",
      },
      { status: 503 }
    );
  }

  try {
    const { transactions } = await request.json();

    if (
      !transactions ||
      !Array.isArray(transactions) ||
      transactions.length === 0
    ) {
      return Response.json(
        { error: "No transactions provided" },
        { status: 400 }
      );
    }

    const totalSpending = transactions.reduce(
      (s: number, t: { amount?: number }) => s + (t.amount || 0),
      0
    );

    const transactionList = transactions
      .map(
        (t: { date?: string; description?: string; amount?: number }) =>
          `${t.date || "N/A"} | ${t.description || "Unknown"} | $${t.amount || 0}`
      )
      .join("\n");

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `Analyze these spending transactions and return a structured JSON analysis. The currency is Singapore Dollars (S$).

TRANSACTIONS:
${transactionList}

TOTAL SPENDING: S$${totalSpending.toFixed(2)}

Return ONLY valid JSON (no markdown, no code blocks, no explanation) with this exact structure:
{
  "financialSummary": {
    "monthlyIncome": 0,
    "totalSpending": ${totalSpending.toFixed(2)},
    "currentSavings": 0,
    "projectedOverspendRisk": <estimated risk amount based on patterns>,
    "savingsGoal": 0,
    "savingsGap": 0
  },
  "spendingCategories": [
    { "name": "<category>", "amount": <total for category>, "color": "<hex color>", "percentage": <percent of total> }
  ],
  "dailySpending": [
    { "day": "<date label>", "amount": <total for that day> }
  ],
  "plannedVsActual": [
    { "category": "<category>", "planned": <reasonable estimated budget>, "actual": <actual spend> }
  ],
  "moneyFlows": [
    { "name": "<category>", "amount": <amount>, "color": "<hex color>", "tag": "<one of: High leak, Review, Stable, or null>" }
  ],
  "moneyLeaks": [
    { "id": "<number>", "category": "<category>", "icon": "<one of: UtensilsCrossed, CreditCard, Wine, ShoppingBag, Car, Smartphone>", "current": <monthly spend>, "recoverable": <potential savings>, "suggestedAction": "<specific actionable suggestion>", "severity": "<high or medium or low>" }
  ],
  "aiInsights": [
    { "id": "1", "title": "Biggest Leak", "body": "<insight about biggest spending area>", "icon": "Droplets", "accent": "#C75B5B" },
    { "id": "2", "title": "Fastest Win", "body": "<easiest saving opportunity>", "icon": "Zap", "accent": "#C4956A" },
    { "id": "3", "title": "This Week's Focus", "body": "<actionable weekly focus>", "icon": "Target", "accent": "#7BA67D" },
    { "id": "4", "title": "Future Self Note", "body": "<motivational forward-looking insight>", "icon": "Heart", "accent": "#C4A6D7" }
  ]
}

RULES:
- Categorize each transaction into logical spending categories (Food, Transport, Shopping, Entertainment, Bills, Groceries, Health, Subscriptions, Rent, etc.)
- Use these hex colors for categories: "#8B7355", "#D4956A", "#A8C686", "#7BA7BC", "#C4A6D7", "#E8B4B8", "#C4956A", "#B8A898"
- For plannedVsActual, estimate reasonable budgets based on Singapore cost of living
- Identify the top 2-3 money leaks (highest areas of recoverable overspending)
- Set monthlyIncome to 0 since we do not know income
- Be specific and practical in insights and suggested actions
- Make sure category percentages add up to 100
- Group dailySpending by date, sorted chronologically
- Return at least 3 spending categories and at most 8`;

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a financial data analyst. Return only valid JSON. No markdown formatting, no code blocks, no explanation text — just the JSON object.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 2048,
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content || "";

    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch {
      // Try to extract JSON from markdown code blocks or raw braces
      const jsonMatch =
        content.match(/```(?:json)?\s*([\s\S]*?)```/) ||
        content.match(/(\{[\s\S]*\})/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error("Could not parse AI response as JSON");
      }
    }

    return Response.json(analysis);
  } catch (error) {
    console.error("Analyze API error:", error);
    const message =
      error instanceof Error ? error.message : "Analysis failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
