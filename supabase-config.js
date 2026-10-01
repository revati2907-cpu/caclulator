// CreditCalc - Supabase configuration

window.CREDITCALC_SUPABASE_URL =
    "https://jcewglfpqybkjrppwbyj.supabase.co";

window.CREDITCALC_SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjZXdnbGZwcXlia2pycHB3YnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MzM5NjQsImV4cCI6MjEwNjQwOTk2NH0.JGoui4yIjKSSR17l15I1LxHWHXoQ4GogpjBPgbbqZZ4";

window.getSupabaseClient = function () {

    if (window.__creditCalcSupabaseClient) {
        return window.__creditCalcSupabaseClient;
    }

    if (
        !window.supabase ||
        typeof window.supabase.createClient !== "function"
    ) {
        throw new Error(
            "Supabase library could not be loaded."
        );
    }

    const url = window.CREDITCALC_SUPABASE_URL;
    const key = window.CREDITCALC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        throw new Error(
            "Supabase is not configured."
        );
    }

    window.__creditCalcSupabaseClient =
        window.supabase.createClient(url, key);

    return window.__creditCalcSupabaseClient;
};
