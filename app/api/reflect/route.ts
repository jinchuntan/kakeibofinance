import Groq from "groq-sdk";

const REFLECT_SYSTEM_PROMPT = `You are Money Sensei, a mindful financial reflection companion inspired by Kakeibo philosophy. You are reviewing a user's monthly financial reflection journal.

The user is based in Singapore with a monthly income of S$3,200, total spending of S$2,460, and current savings of S$420 against a goal of S$700. Their main spending areas are rent (S$1,100), food delivery (S$420), groceries (S$310), transport (S$260), social (S$220), and subscriptions (S$150).

Given their journal answers to the four Kakeibo reflection questions, write a brief, compassionate reflection summary (3-5 sentences). The summary should:
- Acknowledge what they shared without judgment
- Identify one pattern or insight from their answers
- Suggest one small, concrete action for next week
- End with an encouraging note about their financial awareness journey

Keep the tone warm, personal, and grounded. Use S$ for currency. Do not repeat the questions back. Write as a cohesive paragraph, not bullet points.`;

const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: "AI service is not configured. Please add your GROQ_API_KEY to .env.local" },
      { status: 503 }
    );
  }

  try {
    const { entries } = await request.json();

    if (!entries || !Array.isArray(entries) || entries.length === 0) {
      return Response.json({ error: "Journal entries are required" }, { status: 400 });
    }

    const journalContent = entries
      .map((e: { question: string; answer: string }) => `Q: ${e.question}\nA: ${e.answer}`)
      .join("\n\n");

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: REFLECT_SYSTEM_PROMPT },
        { role: "user", content: journalContent },
      ],
      max_tokens: 400,
      temperature: 0.7,
    });

    const summary =
      completion.choices[0]?.message?.content ||
      "Unable to generate reflection. Please try again.";

    return Response.json({ summary });
  } catch (error) {
    console.error("Reflect API error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
