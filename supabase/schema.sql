-- Green Money Momentum — chat room schema
--
-- Run this once in your Supabase project's SQL Editor (Dashboard → SQL
-- Editor → New query → paste this whole file → Run). It's written to be
-- safe to re-run if something fails partway through — see supabase/README.md
-- for the full setup walkthrough.

create extension if not exists pgcrypto;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  channel text not null,
  display_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_channel_created_at_idx
  on public.messages (channel, created_at);

alter table public.messages enable row level security;

drop policy if exists messages_select_all on public.messages;
create policy messages_select_all
  on public.messages for select
  to anon
  using (true);

-- Anyone can post, but ONLY into the open "Market Talk" channels.
-- #announcements and #rules stay read-only until the client has a real
-- login of their own to post as GMM through the app instead of the SQL
-- editor.
drop policy if exists messages_insert_open_channels on public.messages;
create policy messages_insert_open_channels
  on public.messages for insert
  to anon
  with check (
    channel in ('general', 'stock-picks', 'price-action', 'options-plays')
    and char_length(trim(body)) > 0
    and char_length(body) <= 500
    and char_length(trim(display_name)) between 2 and 24
  );

-- Basic spam guard: no more than one message every 2 seconds per display
-- name. This is NOT strong anti-abuse (anyone can type a new name and keep
-- going — there's no login backing display names by design), just enough
-- to stop accidental double-sends and a naive spam script. Tighten this
-- later if abuse becomes a real problem (e.g. move to Supabase Auth
-- anonymous sign-in, which gives a stable id per browser to rate-limit on).
create or replace function public.enforce_chat_rate_limit()
returns trigger as $$
begin
  if exists (
    select 1 from public.messages
    where display_name = new.display_name
      and channel = new.channel
      and created_at > now() - interval '2 seconds'
  ) then
    raise exception 'Sending too fast — slow down a bit.';
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists messages_rate_limit on public.messages;
create trigger messages_rate_limit
  before insert on public.messages
  for each row execute function public.enforce_chat_rate_limit();

-- Seed the read-only channels + #general so the room isn't empty on first
-- load. Only runs once (guarded on the table being empty) so re-running
-- this whole script won't duplicate messages.
do $$
begin
  if not exists (select 1 from public.messages) then
    insert into public.messages (channel, display_name, body) values
      ('announcements', 'GMM', E'This week''s investor note is live — check the Weekly Notes tab. New video drops Tuesday.'),
      ('rules', 'GMM', E'1) Be respectful. 2) No financial advice presented as fact — share your own take. 3) No spam or pumping. Not investment advice; trade at your own risk.'),
      ('general', 'GMM', E'Morning — SPY holding above the 50-day so far. Watching that level all session.');
  end if;
end $$;

-- Turn on realtime (live updates) for this table. Safe to re-run — it just
-- no-ops with a notice if the table's already in the publication.
do $$
begin
  alter publication supabase_realtime add table public.messages;
exception
  when duplicate_object then null;
end $$;
