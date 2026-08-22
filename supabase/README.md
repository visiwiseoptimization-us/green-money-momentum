# Chat room backend (Supabase) — one-time setup

The chat room UI is fully built and wired up in the code. It just needs a
Supabase project to talk to. This takes about 10 minutes and costs nothing
on the free tier.

## 1. Create the project

1. Go to [supabase.com](https://supabase.com) and sign up (GitHub sign-in is
   the fastest option).
2. Click **New project**. Pick any name (e.g. `gmm-chat`), generate/save a
   database password somewhere safe, and pick the region closest to your
   audience.
3. Wait ~2 minutes for the project to finish provisioning.

## 2. Create the messages table + security rules

1. In your new project, open **SQL Editor** in the left sidebar → **New
   query**.
2. Open `supabase/schema.sql` from this repo, copy the whole file, paste it
   into the editor, and click **Run**.
3. You should see "Success. No rows returned." That created the `messages`
   table, the security rules that keep #announcements/#rules read-only,
   a basic spam guard, some starter messages, and turned on realtime.

## 3. Get your API keys

1. In the left sidebar, go to **Project Settings → API**.
2. Copy the **Project URL** (looks like `https://xxxxx.supabase.co`).
3. Copy the **anon / public** key (a long string starting with `eyJ...`).
   Don't use the `service_role` key for this — that one's a real secret and
   should never end up in a browser-facing site.

## 4. Add them to GitHub so the live site can use them

1. On GitHub, go to your repo → **Settings → Secrets and variables →
   Actions → New repository secret**.
2. Add a secret named `NEXT_PUBLIC_SUPABASE_URL` with the Project URL from
   step 3.
3. Add a second secret named `NEXT_PUBLIC_SUPABASE_ANON_KEY` with the anon
   key from step 3.
4. Re-run the deploy workflow (Actions tab → Deploy to GitHub Pages → Run
   workflow), or just push any commit — it'll pick these up automatically
   from now on.

That's it — the chat room on the live site will connect to your Supabase
project on the next deploy.

## Local development

Copy `.env.example` to `.env.local` in the project root and fill in the same
two values, then `npm run dev`. `.env.local` is gitignored, so this never
gets committed.

## What "anon key + Row Level Security" means, in plain terms

The anon key is meant to be public — it ships inside the site's JavaScript
bundle for anyone to see, by design. That's normal for Supabase. The actual
security boundary is the policies in `schema.sql`: they're what actually
decide who can read or insert rows, no matter who's holding the key. That's
why the SQL file is the important part to review if you ever want to change
what's allowed.

## Current limitations (by design, for the MVP)

- **No accounts.** Anyone can type any display name — there's no password
  behind it. This matches what you asked for (lowest friction, no signup),
  but it means display names aren't verified and a bad actor can impersonate
  someone by reusing their name. If that becomes a real problem, the next
  step up is Supabase's *anonymous* auth (still no signup form, but gives
  each browser a stable hidden ID you can actually ban).
- **Spam guard is basic.** One message per 2 seconds per name, enforced in
  the database. It stops accidental double-posts and naive scripts, not a
  determined abuser. Revisit if this becomes an issue.
- **#announcements and #rules are read-only** at the database level — only
  rows inserted directly (e.g. via the SQL editor, or later a real admin
  panel) will show up there. There's no in-app way to post to them yet,
  which matches "the client gets a real login later" being a separate,
  future project.
- **Moderation (deleting/banning) isn't built.** For now, deleting a bad
  message means going into Supabase's **Table Editor → messages** and
  removing the row directly. A proper moderation UI is a good next feature
  once the client's admin login exists.
