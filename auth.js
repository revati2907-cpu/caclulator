// Shared Supabase authentication helpers
async function getCurrentUser() {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error || !data.user) return null;
    return data.user;
}

async function requireLogin() {
    const user = await getCurrentUser();
    if (!user) {
        window.location.replace('login.html');
        return null;
    }
    return user;
}

async function logout() {
    await supabaseClient.auth.signOut();
    window.location.replace('login.html');
}
