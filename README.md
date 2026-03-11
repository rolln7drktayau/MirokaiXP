# Enchanted Tools × Mirokaï Experience 2026

Plateforme Next.js 14 orientée conversion B2B/B2C + audioguide immersif Nimira.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- React Hook Form + Zod
- Recharts (dashboard analytics)
- Resend (emails) / Supabase (leads, optionnel)

## Démarrage

```bash
npm install
npm run dev
```

Build de vérification:

```bash
npm run lint
npm run build
```

## Variables d'environnement

Créer `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_EVENTBRITE_URL=https://www.eventbrite.fr/e/lexperience-mirokai-musee-robotique-et-ia-tickets-1837425843159?aff=ebdsoporgprofile

NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_HOTJAR_ID=
NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION=6
NEXT_PUBLIC_HERO_VIDEO_URL=/media/video/mirokai-hero-loop.mp4

DASHBOARD_PASSWORD=mirokai-dashboard-2026
CRON_SECRET=change-me-cron-secret

RESEND_API_KEY=
MIROKAI_EMAIL_FROM="Mirokaï Experience <experience@enchanted.tools>"
MIROKAI_SALES_EMAIL=sales@enchanted.tools

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Architecture livrée

```text
/app
  /page.tsx                        -> Landing B2B/B2C
  /experience/page.tsx             -> PWA visiteurs (plan + modules)
  /experience/[moduleId]/page.tsx  -> Détail d'un module
  /game/page.tsx                   -> Mini-jeu Nimira
  /admin/page.tsx                  -> Hub admin protégé
  /admin/modules/page.tsx          -> Gestion modules (CRUD)
  /admin/floor-plan/page.tsx       -> Placement drag & drop
  /dashboard/page.tsx              -> Dashboard analytics protégé
  /confirmation/page.tsx           -> Confirmation post-réservation
  /api
    /subscribe/route.ts            -> Capture email + opt-in
    /book-private/route.ts         -> Demande créneau privé
    /leads/route.ts                -> Leads B2B
    /modules/route.ts              -> CRUD modules (list/create)
    /modules/[id]/route.ts         -> CRUD module (get/patch/delete)
    /dashboard-auth/route.ts       -> Auth cookie admin/dashboard
    /analytics/track/route.ts      -> Ingestion analytics événements
    /cron/email-sequence/route.ts  -> Traitement queue emails

/components
  /landing
    Hero.tsx
    ProfileSelector.tsx
    UseCases.tsx
    BookingCalendar.tsx
    B2BForm.tsx
    Testimonials.tsx
    FAQ.tsx
    ExitPopup.tsx
    ConfirmationBanner.tsx
    SlotCounter.tsx
    LandingExperience.tsx
  /experience
    AudioguideShell.tsx
    FloorPlan.tsx
    ModuleCard.tsx
    MirokaiAvatar.tsx
    ProgressBar.tsx
    AudioPlayer.tsx
    NarrativeCard.tsx
  /audioguide
    AudioguideShell.tsx            -> Legacy route redirigée vers /experience
    NarrativeCard.tsx
    MirokaiAvatar.tsx
    ProgressBar.tsx
    AudioPlayer.tsx
    StoryMap.tsx
  /admin
    ModuleForm.tsx
    DraggableModule.tsx
    FloorPlanEditor.tsx
    FloorPlanManager.tsx
    ModulesManager.tsx
  /game
    GameShell.tsx
    NimiraQuiz.tsx
  /dashboard
    AnalyticsCharts.tsx
    DashboardLogin.tsx
  /ui
    Button.tsx
    Modal.tsx
    Badge.tsx
    Tooltip.tsx

/hooks
  useProfile.ts
  useExitIntent.ts
  useUTM.ts
  useEventbrite.ts
  usePWA.ts
  useModules.ts

/lib
  auth.ts
  eventbrite.ts
  email.ts
  analytics.ts
  validators.ts
  audioguideContent.ts
  moduleSeed.ts

/services
  bookingService.ts
  leadService.ts
  emailService.ts
  moduleService.ts
  subscriptionService.ts
  analyticsService.ts
  dashboardService.ts

/types
  profile.ts
  booking.ts
  audioguide.ts
  module.ts
  admin.ts
  email.ts
  analytics.ts
```

## Flux clés

### Landing conversion (B2B/B2C)

1. Sélection de profil (`useProfile`, sessionStorage).
2. Tracking funnel (`page_view`, `profile_selected`, `form_started`, `form_submitted`, `eventbrite_redirect`, `email_captured`).
3. Calendrier avec distinction visuelle grand public / entreprise.
4. Formulaire B2B validé Zod + enregistrement lead API.
5. Redirection Eventbrite avec UTM systématiques (`useUTM`, `buildEventbriteURL`).
6. Exit intent popup avec capture email + séquence J-7/J-2/J-1.

### PWA visiteurs immersive

1. Plan interactif de l'espace avec points modules positionnés.
2. Avatar Miroki/Miroka avec prompts courts (2-3 phrases max).
3. Navigation module + progression persistée localement.
4. Détail module avec audio/vidéo/images.
5. Mode PWA installable (`next-pwa`) + détection online/offline.

### Dashboard analytics

- Accès protégé par mot de passe (`DASHBOARD_PASSWORD`) via cookie HTTP-only.
- KPIs: taux de remplissage, part B2B/B2C, emails capturés.
- Graphiques Recharts: tunnel conversion + sources UTM.
- Ingestion analytics serveur via `/api/analytics/track`.

### Admin modules + floor plan

1. CRUD modules via API `/api/modules`.
2. Éditeur drag & drop du plan (`@dnd-kit/core`).
3. Sauvegarde optimiste des positions modules.
4. Accès protégé via cookie d'auth dashboard/admin.

## Intégrations externes

- Eventbrite: URL builder avec UTM et pré-remplissage champs.
- GA4/GTM/Hotjar: scripts injectés si variables présentes.
- Resend: envoi réel des emails si `RESEND_API_KEY` définie.
- Supabase: stockage leads si credentials présents, fallback mémoire sinon.

## Notes d'implémentation

- Mobile-first priorisé (landing et audioguide).
- Design Nimira: bleu nuit / violet profond / or lumineux.
- Composants découplés pour évolution rapide (A/B tests, nouveaux parcours, intégrations CRM).

## Guide Admin (rapide)

1. Ouvrir `/admin` et s'authentifier avec le mot de passe dashboard.
2. Aller sur `/admin/modules` pour créer/éditer/supprimer un module.
3. Aller sur `/admin/floor-plan` pour placer les modules en drag & drop.
4. Vérifier le rendu côté visiteur sur `/experience`.

## Médias (audio/vidéo)

- Vidéo hero: `public/media/video/mirokai-hero-loop.mp4`
- Audios audioguide FR/EN: `public/media/audio/fr/*` et `public/media/audio/en/*`
- Détails de mapping: `lib/audioguideContent.ts`

## Détails restants

- Voir `README_RESTANT.md` pour la checklist de finalisation complète.

## Base de données Supabase

- Migration SQL: `supabase/migrations/20260311_000001_init_mirokai.sql`
- Seed modules: `supabase/seed/modules_seed.json`
- Guide d'exécution: `supabase/README.md`
