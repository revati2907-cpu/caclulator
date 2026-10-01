// CreditCalc - Supabase configuration
// Replace the two values below with your Supabase Project URL and anon/public key.
// Supabase Dashboard -> Project Settings -> API
//
// IMPORTANT: The anon/public key is intended for frontend use.
// Never put your Supabase service_role key in this file.

const SUPABASE_URL = "https://jcewglfpqybkjrppwbyj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjZXdnbGZwcXlia2pycHB3YnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MzM5NjQsImV4cCI6MjEwNjQwOTk2NH0.JGoui4yIjKSSR17l15I1LxHWHXoQ4GogpjBPgbbqZZ4";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
