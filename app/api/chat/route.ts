import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // This is a placeholder mock for now since the actual Gemini API key
  // or Supabase DB might not be connected yet.
  // In Phase 2, this will use:
  // const result = await streamText({
  //   model: google('gemini-1.5-pro'),
  //   messages,
  //   system: "You are Pathway.ai. Recommend ONLY the retrieved programs..."
  // });
  // return result.toDataStreamResponse();
  
  // For MVP frontend demo without an API key, we return a standard Response.
  return new Response(JSON.stringify({ message: "API setup successful. Waiting for real API key to activate Gemini." }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
