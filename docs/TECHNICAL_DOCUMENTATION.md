# Documentation Technique

## Objectif produit

La solution couvre deux parcours:

1. **Landing conversion** B2B/B2C avec redirection Eventbrite tracee (UTM)
2. **PWA visiteurs** immersive avec plan interactif, modules, narration, audio/video

## Modules applicatifs

## Front

- Landing: `app/page.tsx` + `components/landing/*`
- Experience: `app/experience/*` + `components/experience/*`
- Jeux: `app/game/*` + `components/game/*`
- Admin: `app/admin/*` + `components/admin/*`
- Dashboard: `app/dashboard/page.tsx` + `components/dashboard/*`

## Backend API

- `POST /api/subscribe`: capture email newsletter + opt-in
- `POST /api/book-private`: demande creneau prive entreprise
- `POST /api/leads`: capture lead B2B
- `GET/POST /api/modules`: lecture/creation modules
- `GET/PATCH/DELETE /api/modules/[id]`: details et MAJ module
- `POST /api/dashboard-auth`: verification mot de passe
- `POST /api/analytics/track`: ingestion evenements funnel
- `GET /api/cron/email-sequence`: traitement file email J-7/J-2/J-1

## Domain model principal

- `Module`
- `VisitorProfile`
- `BookingSlot`
- `AudioguideSession`
- `Lead`
- `Subscriber`
- `AnalyticsEvent`

## Integrations

- Eventbrite: URL builder UTM et pre-remplissage
- GA4/GTM/Hotjar: tracking comportemental
- Resend: envois transactionnels/programmes
- Supabase: persistance modules/leads/subscribers/analytics/email_queue

## Securite

- Auth admin/dashboard basee sur `DASHBOARD_PASSWORD`
- Cookie HTTP-only pour les pages protegees
- Validation payload API via Zod
- Secrets en variables d'environnement

## Performance

- Next.js App Router (SSR/SSG hybride)
- PWA + service worker (`next-pwa`)
- Media charges en `preload=metadata`
- UI mobile-first
