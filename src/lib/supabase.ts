import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// These are Next.js "public" env vars — they get baked into the static
// export at build time (see .github/workflows/deploy.yml). That's expected
// and safe for Supabase: the anon key is meant to be used from the browser,
// and the real security boundary is the Row Level Security policies in
// supabase/schema.sql, not keeping this value secret.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isChatConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// `supabase` is null until someone runs through the setup in
// supabase/README.md and adds the two env vars — every caller has to handle
// that (see useChatChannel / usePresence) so a site without chat configured
// yet still builds and renders instead of crashing.
export const supabase: SupabaseClient | null = isChatConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      realtime: {
        params: { eventsPerSecond: 5 },
      },
    })
  : null;
