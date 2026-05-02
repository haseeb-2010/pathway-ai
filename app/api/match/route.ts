
import { NextResponse } from "next/server";
import { supabase, supabaseMatching } from "@/lib/supabase";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch Student Profile
    const [
      { data: profile },
      { data: education },
      { data: experience },
      { data: skills }
    ] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('education').select('*').eq('profile_id', userId),
      supabase.from('experience').select('*').eq('profile_id', userId),
      supabase.from('skills').select('*').eq('profile_id', userId),
    ]);

    // 2. Fetch Internship Data from Matching DB
    const { data: internships } = await supabaseMatching
      .from('internships')
      .select('*')
      .limit(50); // Get a good sample to filter

    // 3. Use NVIDIA LLM to match
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.3-70b-instruct",
      messages: [
        {
          role: "system",
          content: "You are the Pathway AI Matching Engine. Your job is to analyze a student's profile and a list of internships to find the best matches. Return only JSON."
        },
        {
          role: "user",
          content: `
          Student Profile:
          - Full Name: ${profile?.full_name}
          - Location: ${profile?.location}
          - Education: ${JSON.stringify(education)}
          - Experience: ${JSON.stringify(experience)}
          - Skills: ${JSON.stringify(skills?.map((s: any) => s.skill_name))}

          Internship List:
          ${JSON.stringify(internships)}

          Task:
          1. Select the top 6 internships that best match this student's skills and background.
          2. For each, calculate a 'match_score' (percentage).
          3. Provide a brief explanation of why it fits.

          Return JSON format:
          {
            "matches": [
              {
                "id": "...",
                "role": "...",
                "company": "...",
                "location": "...",
                "description": "...",
                "match_score": 95,
                "why": "...",
                "apply_link": "..."
              }
            ]
          }
          `
        }
      ],
      temperature: 0.1,
    });

    const content = completion.choices[0].message.content || "{}";
    
    // Robust JSON extraction
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI failed to return valid JSON: " + content);
    }
    const data = JSON.parse(jsonMatch[0]);

    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Match API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
