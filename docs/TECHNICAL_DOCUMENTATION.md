# Documentation Technique

## Objectif produit

La solution couvre deux parcours:

1. **Landing conversion** B2B/B2C avec redirection Eventbrite tracee (UTM)
2. **PWA visiteurs** immersive avec plan interactif, modules, narration, audio/video
3. **Gateway profil** pour centraliser les acces visiteurs et admin
4. **Jeux segmentes** (B2C et B2B)

## Modules applicatifs

## Front

- Landing: `app/page.tsx` + `components/landing/*`
- Profil: `app/profile/page.tsx` + `components/profile/*`
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
- `DELETE /api/dashboard-auth`: logout admin
- `GET/POST/DELETE /api/profile-session`: session visiteur (nom + segment)
- `POST /api/analytics/track`: ingestion evenements funnel
- `GET /api/cron/email-sequence`: traitement file email J-7/J-2/J-1

## Domain model principal

- `Module`
- `VisitorProfile`
- `VisitorSession`
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
- Cookie HTTP-only pour session visiteur (`mirokai_visitor_session`)
- Validation payload API via Zod
- Secrets en variables d'environnement
- Gating d'acces:
  - `/experience` et `/game*` passent par `/profile`
  - segment B2B redirige vers jeu B2B dedie

## Performance

- Next.js App Router (SSR/SSG hybride)
- PWA + service worker (`next-pwa`)
- Media charges en `preload=metadata`
- UI mobile-first
- Navigation mobile a onglets (`Accueil`, `Reserver`, `Jeu`, `Profil`) avec switch instantane
