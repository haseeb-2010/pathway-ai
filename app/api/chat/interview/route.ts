
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, session } = await req.json();

    if (!messages || !session) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/llama-3.1-70b-instruct", // More stable model
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Interview API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
