import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !key) {
    console.error("[Supabase] Missing admin keys. URL:", url, "Key present:", !!key);
    return null;
  }
  
  // Log the URL being used to debug connection issues
  console.log("[Supabase] Initializing Admin Client with URL:", url);
  
  return createClient(url, key);
}

// TODO: Use this only in API routes/server components; never expose service role on the client
