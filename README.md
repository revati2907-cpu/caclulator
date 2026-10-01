# CreditCalc - Supabase Login

The calculator interface and calculation features are kept the same as the original CreditCalc project. The old student login/signup popups were removed.

## Supabase setup
1. Open `supabase-config.js`.
2. Replace `YOUR_SUPABASE_PROJECT_URL` with your Supabase Project URL.
3. Replace `YOUR_SUPABASE_ANON_PUBLIC_KEY` with your Supabase anon/public key.
4. In Supabase Authentication, enable Email provider.
5. Add your GitHub Pages URL under Authentication > URL Configuration > Site URL / Redirect URLs if email confirmation is enabled.

## Student flow
Home -> Sign Up -> Login -> Calculator.
The calculator page checks the Supabase session. Without a logged-in user it redirects to `login.html`.

## Important
The calculator HTML/layout/calculation interface is retained from the original project. Supabase is used only for student authentication.
