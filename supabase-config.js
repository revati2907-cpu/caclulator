// CreditCalc - Supabase configuration
// 1. Open Supabase Dashboard -> Project Settings -> API
// 2. Replace the two values below with your Project URL and anon/public key.
// 3. Keep this file loaded AFTER the Supabase CDN script.

window.CREDITCALC_SUPABASE_URL = "https://jcewglfpqybkjrppwbyj.supabase.co";
window.CREDITCALC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjZXdnbGZwcXlia2pycHB3YnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MzM5NjQsImV4cCI6MjEwNjQwOTk2NH0.JGoui4yIjKSSR17l15I1LxHWHXoQ4GogpjBPgbbqZZ4";

window.getSupabaseClient = function () {
    if (window.__creditCalcSupabaseClient) {
        return window.__creditCalcSupabaseClient;
    }

    if (!window.supabase || typeof window.supabase.createClient !== "function") {
        throw new Error("Supabase library could not be loaded. Check your internet connection.");
    }

    const url = window.CREDITCALC_SUPABASE_URL;
    const key = window.CREDITCALC_SUPABASE_ANON_KEY;

    if (!url || url === "YOUR_SUPABASE_PROJECT_URL" || !key || key === "YOUR_SUPABASE_ANON_PUBLIC_KEY") {
        throw new Error("Supabase is not configured. Add your Supabase Project URL and anon/public key in supabase-config.js.");
    }

    window.__creditCalcSupabaseClient = window.supabase.createClient(url, key);
    return window.__creditCalcSupabaseClient;
};
