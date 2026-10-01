# Supabase + GitHub Pages Setup

1. Create/open your Supabase project.
2. In Project Settings -> API, copy the Project URL and the anon/public key.
3. Open `supabase-config.js` and replace `YOUR_SUPABASE_PROJECT_URL` and `YOUR_SUPABASE_ANON_KEY`.
4. In Supabase -> SQL Editor, run the SQL below.
5. In Authentication -> URL Configuration, add your GitHub Pages URL to Site URL and Redirect URLs. Example: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/reset-password.html`
6. Upload the contents of `calculatorrev` to your GitHub repository (GitHub Pages).

## SQL

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email)
  on conflict (id) do update set full_name=excluded.full_name, email=excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
