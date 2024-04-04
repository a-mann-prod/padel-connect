import { SupabaseClientOptions, createClient } from "@supabase/supabase-js";

export const supabaseClient = (options?: SupabaseClientOptions<"public">) =>
  createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get("SUPABASE_URL") ?? "",
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    options
  );
