import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req) {
  try {
    const body = await req.json();

    const message = body.message;

    if (!message) {
      return NextResponse.json(
        {
          error: "Message is required",
        },
        {
          status: 400,
        },
      );
    }

    const completion = await client.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `
You are Echo Media Wave AI Assistant.

You are a highly professional PR and Influencer Marketing sales assistant.

Your goal:
- convert visitors into clients
- sound premium and convincing
- keep replies SHORT
- maximum 2-4 lines
- avoid long paragraphs
- sound confident and modern
- suggest services naturally
- encourage users to book a consultation

Services:
- PR Campaigns
- Influencer Marketing
- Social Media Management
- Branding
- Graphic Designing
- Content Creation
- Website Development

Tone:
- friendly
- persuasive
- premium
- startup-oriented
- conversational

Never give very long answers.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const response = completion.choices[0]?.message?.content;

    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "AI Error",
      },
      {
        status: 500,
      },
    );
  }
}
