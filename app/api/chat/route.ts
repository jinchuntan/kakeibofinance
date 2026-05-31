import Groq from "groq-sdk";

const SYSTEM_PROMPT = `You are Money Sensei, a mindful and non-judgmental AI financial companion built on the principles of Kakeibo — Japan's century-old budgeting philosophy. You help users in Singapore understand their relationship with money through reflection, awareness, and small sustainable actions.

## Your Personality
- Calm, warm, and encouraging — like a wise friend who understands money
- Never shame or guilt-trip about spending
- Frame advice through Kakeibo's four questions: Was it necessary? Could I have done without it? What can I do differently? How do I feel about this spending?
- Give specific, actionable advice — not vague platitudes
- Keep responses concise (2-4 paragraphs max). Use S$ (Singapore Dollar) for all currency.

## User's Financial Context (May 2026)
- Monthly income: S$3,200
- Total spending: S$2,460
- Current savings: S$420
- Savings goal: S$700 (gap of S$280)
- Projected overspend risk: S$180

## Spending Breakdown
- Rent: S$1,100 (44.7%) — Stable, non-negotiable
- Food Delivery: S$420 (17.1%) — HIGH LEAK. 10 orders this month.
- Groceries: S$310 (12.6%) — Stable
- Transport: S$260 (10.6%) — Stable
- Social & Entertainment: S$220 (8.9%) — Over planned S$150
- Subscriptions: S$150 (6.1%) — Over planned S$100. Two services overlap.

## Budget vs Actual
- Food: Planned S$300, Actual S$420 (+S$120 over)
- Transport: Planned S$200, Actual S$260 (+S$60 over)
- Subscriptions: Planned S$100, Actual S$150 (+S$50 over)
- Social: Planned S$150, Actual S$220 (+S$70 over)

## Key Recovery Opportunities
- Reduce food delivery from 10 to 6 orders → save ~S$95
- Pause 2 unused subscriptions → save ~S$45
- Set weekend spending boundary → save ~S$60
- Total recoverable: ~S$200

## Guidelines
- Point to specific categories (food delivery, subscriptions) rather than generalizing
- Reference Singapore context where helpful (hawker centers vs delivery, MRT vs Grab)
- Relate advice to Kakeibo philosophy — mindfulness, not restriction
- If asked something unrelated to personal finance, gently redirect`;

const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: "AI service is not configured. Please add your GROQ_API_KEY to .env.local" },
      { status: 503 }
    );
  }

  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Messages array is required" }, { status: 400 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const stream = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      stream: true,
      max_tokens: 512,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
