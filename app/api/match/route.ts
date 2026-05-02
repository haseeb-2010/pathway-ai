
import { NextResponse } from "next/server";
import { supabase, supabaseMatching } from "@/lib/supabase";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.NVIDIA_API_KEY, // Fallback for env safety
  baseURL: process.env.OPENAI_API_KEY ? undefined : "https://integrate.api.nvidia.com/v1",
});

export async function POST(req: Request) {
  try {
    const { userId, type = 'universities' } = await req.json();

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

    // 2. Prepare Profile Text for Embedding
    const profileText = `
      Name: ${profile?.full_name}
      Location: ${profile?.location}
      Education: ${education?.map((e: any) => `${e.degree} at ${e.institution}`).join(", ")}
      Experience: ${experience?.map((e: any) => `${e.position} at ${e.company}`).join(", ")}
      Skills: ${skills?.map((s: any) => s.skill_name || s.name).join(", ")}
      Achievements: ${achievements?.map((a: any) => a.title).join(", ")}
    `.trim();

    // 3. Generate Embedding (using 3072 dims for compatibility with provided SQL)
    const embeddingResponse = await openai.embeddings.create({
      model: process.env.OPENAI_API_KEY ? "text-embedding-3-large" : "nvidia/nv-embedqa-e5-v5",
      input: profileText,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // 4. Call Vector Match RPC
    let results = [];
    if (type === 'universities') {
      const { data, error } = await supabaseMatching.rpc('match_universities', {
        query_embedding: embedding,
        match_count: 6
      });
      if (error) throw error;
      results = data;
    } else {
      const { data, error } = await supabaseMatching.rpc('match_internships', {
        query_embedding: embedding,
        match_count: 6
      });
      if (error) throw error;
      results = data;
    }

    return NextResponse.json({ matches: results });

  } catch (error: any) {
    console.error("Match API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
