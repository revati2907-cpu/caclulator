// CreditCalc - Supabase configuration
// Replace the two values below with your Supabase Project URL and anon/public key.
// Supabase Dashboard -> Project Settings -> API
//
// IMPORTANT: The anon/public key is intended for frontend use.
// Never put your Supabase service_role key in this file.

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_PUBLIC_KEY";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
