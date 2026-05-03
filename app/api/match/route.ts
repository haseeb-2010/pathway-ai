
import { NextResponse } from "next/server";
import { supabase, supabaseMatching } from "@/lib/supabase";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_MATCHING_KEY || process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export async function POST(req: Request) {
  try {
    const { userId, type = 'universities', preferences } = await req.json();

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

    // 2. Prepare Profile Text with Preferences (Context-Aware)
    const isInternship = type === 'internships';
    const profileText = `
      Student Profile:
      Name: ${profile?.full_name}
      ${isInternship ? `Target Role: ${preferences?.role || "Internship"}` : `Target Degree: ${preferences?.degree || "Not specified"}`}
      Target Countries: ${preferences?.countries?.length > 0 ? preferences.countries.join(", ") : "Global"}
      ${isInternship ? `Work Type: ${preferences?.type || "Remote"}` : `Yearly Budget: ${preferences?.budget || "Flexible"}`}
      ${isInternship ? `Stipend Preference: ${preferences?.stipend || "Any"}` : ""}
      Location: ${profile?.location}
      Education History: ${education?.map((e: any) => `${e.degree} at ${e.institution}`).join(", ")}
      Professional Experience: ${experience?.map((e: any) => `${e.position} at ${e.company}`).join(", ")}
      Core Skills: ${skills?.map((s: any) => s.skill_name || s.name).join(", ")}
      Achievements: ${achievements?.map((a: any) => a.title).join(", ")}
    `.trim();

    // 3. Generate Embedding
    const embeddingResponse = await openai.embeddings.create({
      model: "nvidia/nv-embedqa-e5-v5",
      input: profileText,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // 4. Call Vector Match RPC
    let vectorResults = [];
    if (type === 'universities') {
      const { data, error } = await supabaseMatching.rpc('match_universities', {
        query_embedding: embedding,
        match_threshold: 0.01, // Lowered threshold for broader matching
        match_count: 20
      });
      if (error) throw error;
      vectorResults = data || [];
    } else {
      const { data, error } = await supabaseMatching.rpc('match_internships', {
        query_embedding: embedding,
        match_threshold: 0.01, // Lowered threshold for broader matching
        match_count: 20
      });
      if (error) throw error;
      vectorResults = data || [];

      // Fallback: If no vector matches, try keyword search on role
      if (vectorResults.length === 0 && preferences?.role) {
        const { data: keywordMatches } = await supabaseMatching
          .from('internships')
          .select('*')
          .ilike('role', `%${preferences.role}%`)
          .limit(10);
        
        if (keywordMatches) {
          vectorResults = keywordMatches.map(m => ({ ...m, similarity: 0.5 }));
        }
      }
      
      // Secondary Fallback: Just some random internships if still empty
      if (vectorResults.length === 0) {
        const { data: latest } = await supabaseMatching
          .from('internships')
          .select('*')
          .limit(10);
        vectorResults = latest?.map(m => ({ ...m, similarity: 0.3 })) || [];
      }
    }

    // 5. RAG Refinement with Qwen Thinking Model
    const refinedCompletion = await openai.chat.completions.create({
      model: "qwen/qwen3-next-80b-a3b-thinking",
      messages: [
        {
          role: "system",
          content: `You are the Pathway AI Professional Discovery Engine. Analyze potential ${type} matches against the student profile and their preferences. 
          STRICT RULES:
          1. Prioritize matches that align with Target Role, Work Type, and Location.
          2. Provide a 'match_why' for each (max 2 sentences) focusing on skill alignment and cultural fit.
          3. Re-rank based on overall fit.
          4. Return ONLY valid JSON with a 'matches' array.`
        },
        {
          role: "user",
          content: `
            Profile & Preferences: ${profileText}
            Potential Matches from Database: ${JSON.stringify(vectorResults)}
            
            Task: Return a JSON object with a 'matches' array. Each item should have all original fields plus 'match_why'.
          `
        }
      ],
      temperature: 0.1,
    });

    const refinedContent = refinedCompletion.choices[0].message.content || "{}";
    const jsonMatch = refinedContent.match(/\{[\s\S]*\}/);
    const finalData = jsonMatch ? JSON.parse(jsonMatch[0]) : { matches: vectorResults };

    return NextResponse.json(finalData);

  } catch (error: any) {
    console.error("Match API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
