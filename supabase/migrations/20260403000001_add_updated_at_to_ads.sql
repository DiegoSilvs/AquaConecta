-- Migration: Add updated_at and phone to ads table
-- Created: 2026-04-03

-- 1. Adicionar coluna updated_at na tabela ads
alter table public.ads 
add column if not exists updated_at timestamp with time zone default now();

-- 2. Criar função para atualizar o timestamp automaticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 3. Criar trigger para a tabela ads
drop trigger if exists set_updated_at on public.ads;
create trigger set_updated_at
  before update on public.ads
  for each row execute procedure public.handle_updated_at();

-- 4. Adicionar coluna phone na tabela ads para separação de contato
alter table public.ads 
add column if not exists phone text;
