# CreditCalc - College Mini Project

## Files
- `index.html` - Home page with Login and Sign Up links
- `login.html` - Supabase student login
- `signup.html` - Supabase student registration
- `calculator.html` - SGPA calculator protected by Supabase login
- `admin.html` - Existing local admin dashboard
- `about.html` - Existing project page
- `style.css` - Styling
- `script.js` - Supabase authentication and calculator logic
- `supabase-config.js` - Supabase project URL and anon/public key

## Supabase setup
1. Open your Supabase project.
2. Go to **Project Settings -> API**.
3. Copy the **Project URL** and **anon/public key**.
4. Open `supabase-config.js`.
5. Replace:
   - `YOUR_SUPABASE_PROJECT_URL`
   - `YOUR_SUPABASE_ANON_PUBLIC_KEY`
6. In Supabase Authentication -> Providers, keep **Email** enabled.
7. If you want users to verify email, keep email confirmation enabled. If you want immediate login after signup, disable email confirmation.
8. Add your GitHub Pages URL under **Authentication -> URL Configuration -> Site URL / Redirect URLs** when using email confirmation.

## GitHub Pages
Upload all files to the same GitHub Pages repository/folder. Start from `index.html`.

## Authentication flow
Home -> Sign Up -> Supabase account -> Login -> Calculator.

The old student login/signup popups and browser `localStorage` student authentication have been removed.
