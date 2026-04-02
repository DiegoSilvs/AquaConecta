-- Migration: Auth and Ads Schema
-- Created: 2026-04-01

-- 1. Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone default now(),
  full_name text,
  avatar_url text,
  role text check (role in ('produtor', 'comprador')),
  location text,
  phone text
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- 2. Create ads table
create table if not exists public.ads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now() not null,
  title text not null,
  description text,
  price numeric not null,
  category text not null,
  quantity text not null,
  location text not null,
  image_url text,
  user_id uuid references auth.users(id) on delete cascade not null
);

-- Enable RLS on ads
alter table public.ads enable row level security;

-- Policies for ads
create policy "Ads are viewable by everyone." on public.ads
  for select using (true);

create policy "Users can insert their own ads." on public.ads
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own ads." on public.ads
  for update using (auth.uid() = user_id);

create policy "Users can delete their own ads." on public.ads
  for delete using (auth.uid() = user_id);

-- 3. Trigger for new user profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', 
    new.raw_user_meta_data->>'role'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
