
import { NextResponse } from "next/server";
import { supabase, supabaseMatching } from "@/lib/supabase";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export async function POST(req: Request) {
  try {
    const { userId, preferences } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch Student Profile from Primary DB
    const [
      { data: profile },
      { data: education },
      { data: experience },
      { data: skills },
      { data: achievements }
    ] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('education').select('*').eq('profile_id', userId),
      supabase.from('experience').select('*').eq('profile_id', userId),
      supabase.from('skills').select('*').eq('profile_id', userId),
      supabase.from('achievements').select('*').eq('profile_id', userId),
    ]);

    // 1.5 Fetch University Data from Matching DB (RAG Context)
    let universityData: any[] = [];
    try {
      const { data: unis } = await supabaseMatching
        .from('universities')
        .select('name, location, description, highlights')
        .in('country', preferences.countries)
        .limit(10);
      
      if (unis) universityData = unis;
    } catch (e) {
      console.warn("Could not fetch university data from matching DB, falling back to LLM knowledge.");
    }

    // 2. Prepare the Context for LLM
    const studentContext = `
      Name: ${profile?.full_name}
      Current Location: ${profile?.location}
      Education: ${JSON.stringify(education)}
      Experience: ${JSON.stringify(experience)}
      Skills: ${JSON.stringify(skills)}
      Achievements: ${JSON.stringify(achievements)}
      
      Student Preferences:
      Target Degree: ${preferences.degree}
      Target Countries: ${preferences.countries?.join(", ")}
      Budget: ${preferences.budget}

      Matching University Data from Database:
      ${JSON.stringify(universityData)}
    `;

    // 3. Call LLM
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.3-70b-instruct",
      messages: [
        {
          role: "system",
          content: "You are an expert academic advisor for international students from Pakistan. Your goal is to provide high-fidelity university matches and SOP structures based on student profiles. Return only JSON."
        },
        {
          role: "user",
          content: `Based on this student profile and their target preferences, please provide:
          1. A list of 3 recommended universities with match percentages and why they fit.
          2. A structural outline for their Statement of Purpose (SOP).
          
          Return the response in JSON format:
          {
            "matches": [
              { "name": "...", "location": "...", "match_strength": "...", "why": "...", "highlight": "..." }
            ],
            "sop_outline": [
              { "section": "...", "points": ["...", "..."] }
            ]
          }
          
          Profile Context:
          ${studentContext}`
        }
      ],
      temperature: 0.6,
      max_tokens: 4096,
    });

    const content = completion.choices[0].message.content || "{}";

    // Parse the JSON from the LLM response (handling potential markdown blocks)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI failed to return valid JSON: " + content);
    }
    const data = JSON.parse(jsonMatch[0]);

    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Copilot API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
