import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabaseUrlMatching = process.env.NEXT_PUBLIC_SUPABASE_URL_1 || '';
const supabaseAnonKeyMatching = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_1 || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Primary Supabase credentials missing.');
}

// Primary client for User Profiles
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Secondary client for University/Internship Matching
export const supabaseMatching = createClient(supabaseUrlMatching, supabaseAnonKeyMatching);
