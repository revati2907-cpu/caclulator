// Supabase configuration for the College Credit Calculator.
// Replace these two values with your Supabase Project URL and anon/public key.
// Supabase Dashboard -> Project Settings -> API.
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
