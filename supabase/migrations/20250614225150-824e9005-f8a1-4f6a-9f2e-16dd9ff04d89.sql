
-- 1. Table to log every page view (with basic analytics)
create table public.page_views (
  id uuid primary key default gen_random_uuid(),
  slug text not null, -- which page/portfolio/blog was viewed
  viewed_at timestamp with time zone not null default now(),
  referrer text, -- traffic source
  location text, -- country/region (client-provided)
  device_type text, -- "desktop", "mobile" (client-detected)
  session_id text not null, -- random or fingerprinted per session
  user_agent text,
  extra jsonb -- optional: store extras as needed in future
);

create index on public.page_views (slug);

-- 2. Lead/submission table
create table public.lead_submissions (
  id uuid primary key default gen_random_uuid(),
  submitted_at timestamp with time zone not null default now(),
  name text,
  email text,
  phone text,
  message text,
  source text, -- where the lead came from
  page_slug text,
  session_id text,
  response_time_ms integer, -- time to respond, filled in later (if tracked)
  status text default 'new', -- new, responded, closed, lost, etc
  extra jsonb
);

-- 3. AI agent conversations table (optional, future)
create table public.agent_conversations (
  id uuid primary key default gen_random_uuid(),
  started_at timestamp with time zone not null default now(),
  ended_at timestamp with time zone,
  user_message_count integer,
  agent_message_count integer,
  intent_accuracy numeric, -- as rated by your system
  escalated boolean default false,
  conversion text, -- what kind of conversion occurred, if any
  rating integer, -- NPS or manual rating
  session_id text,
  details jsonb
);

-- 4. Conversion events (e.g., booking call, clicked contact, etc.)
create table public.conversion_events (
  id uuid primary key default gen_random_uuid(),
  event_at timestamp with time zone not null default now(),
  event_type text not null, -- e.g., "contact_clicked", "book_call", etc.
  page_slug text,
  session_id text,
  extra jsonb
);

-- 5. RLS: Allow anyone to insert analytics data, admin to select/delete
alter table public.page_views enable row level security;
alter table public.lead_submissions enable row level security;
alter table public.agent_conversations enable row level security;
alter table public.conversion_events enable row level security;

-- Anyone (even anonymous) can insert event/metric data:
create policy "Any insert page views" on public.page_views for insert with check (true);
create policy "Any insert conversion events" on public.conversion_events for insert with check (true);
create policy "Any insert agent convo" on public.agent_conversations for insert with check (true);
create policy "Any insert lead" on public.lead_submissions for insert with check (true);

-- Only authenticated users can select/update/delete (for admin dashboard):
create policy "Admin can select metrics page views" on public.page_views for select using (auth.role() = 'authenticated');
create policy "Admin can metrics leads" on public.lead_submissions for select using (auth.role() = 'authenticated');
create policy "Admin can select agent conversations" on public.agent_conversations for select using (auth.role() = 'authenticated');
create policy "Admin can select conversions" on public.conversion_events for select using (auth.role() = 'authenticated');
