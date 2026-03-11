-- Mirokai Experience: core data model for leads, subscribers, email queue, analytics.
-- Safe to run on a fresh Supabase project.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  company_size text not null check (company_size in ('1-10', '11-50', '51-200', '201-500', '500+')),
  sector text not null,
  attendees integer not null check (attendees >= 1 and attendees <= 200),
  contact_name text not null,
  email text not null,
  profile text not null check (profile in ('solo', 'team', 'b2b')),
  utm jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  number integer not null,
  name text not null,
  description text not null,
  audio_url text,
  video_url text,
  images text[] not null default '{}',
  position jsonb not null default '{"x":50,"y":50}'::jsonb,
  mirokai_prompt text not null,
  unlocked boolean not null default false,
  theme text not null check (theme in ('nimira', 'tech', 'emotion', 'narration')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  profile text not null check (profile in ('solo', 'team', 'b2b')),
  source text not null default 'landing',
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.email_queue (
  id uuid primary key default gen_random_uuid(),
  subscriber_id uuid not null references public.subscribers(id) on delete cascade,
  email text not null,
  profile text not null check (profile in ('solo', 'team', 'b2b')),
  source text not null default 'subscribe_form',
  stage text not null check (stage in ('j7', 'j2', 'j1')),
  subject text not null,
  html text not null,
  scheduled_for timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed')),
  sent_at timestamptz,
  provider text check (provider in ('resend', 'mock')),
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event text not null check (
    event in (
      'page_view',
      'profile_selected',
      'form_started',
      'form_submitted',
      'eventbrite_redirect',
      'email_captured'
    )
  ),
  profile text check (profile in ('solo', 'team', 'b2b')),
  source text,
  value jsonb,
  step text,
  created_at timestamptz not null default now()
);

create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_profile on public.leads (profile);
create index if not exists idx_leads_email on public.leads (lower(email));

create unique index if not exists idx_modules_number_unique on public.modules (number);
create index if not exists idx_modules_theme on public.modules (theme);
create index if not exists idx_modules_unlocked on public.modules (unlocked);

create index if not exists idx_subscribers_created_at on public.subscribers (created_at desc);
create index if not exists idx_subscribers_profile on public.subscribers (profile);
create index if not exists idx_subscribers_email on public.subscribers (lower(email));

create index if not exists idx_email_queue_status_scheduled_for on public.email_queue (status, scheduled_for);
create index if not exists idx_email_queue_subscriber_id on public.email_queue (subscriber_id);
create index if not exists idx_email_queue_created_at on public.email_queue (created_at desc);

create index if not exists idx_analytics_events_event_created_at on public.analytics_events (event, created_at desc);
create index if not exists idx_analytics_events_profile on public.analytics_events (profile);
create index if not exists idx_analytics_events_source on public.analytics_events (source);

alter table public.leads enable row level security;
alter table public.modules enable row level security;
alter table public.subscribers enable row level security;
alter table public.email_queue enable row level security;
alter table public.analytics_events enable row level security;

-- No public policies: all writes/reads should happen server-side with service-role key.
