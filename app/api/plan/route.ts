import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { tasks, availableHours, goal } = await req.json();
    const key = process.env.GEMINI_API_KEY;
    if (!key) return NextResponse.json({ error: "AI is not configured yet. Add GEMINI_API_KEY in your Vercel environment variables.", fallback: true }, { status: 503 });
    const prompt = `You are StudySync, a supportive academic planning assistant. Create a realistic, concise study plan in clear markdown. Prioritize imminent deadlines, difficult topics and task effort. Available study hours: ${availableHours}. Student goal: ${goal || "Complete the highest priority work"}. Tasks: ${JSON.stringify(tasks)}. Include time blocks, short breaks, and a brief rationale. Do not invent task details.`;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:.5,maxOutputTokens:1000}})
    });
    if (!response.ok) throw new Error("The AI service could not generate a plan.");
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No plan was returned.";
    return NextResponse.json({ plan:text });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Something went wrong." }, {status:500});
  }
}