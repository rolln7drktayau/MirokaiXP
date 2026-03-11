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
NEXT_PUBLIC_EVENTBRITE_URL=https://www.eventbrite.com/e/mirokai-experience-2026

NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_HOTJAR_ID=
NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION=6

DASHBOARD_PASSWORD=mirokai-dashboard-2026

RESEND_API_KEY=
MIROKAI_EMAIL_FROM="Mirokaï Experience <experience@enchanted.tools>"
MIROKAI_SALES_EMAIL=sales@enchanted.tools

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Architecture livrée

```text
/app
  /page.tsx
  /audioguide/page.tsx
  /dashboard/page.tsx
  /confirmation/page.tsx
  /api
    /subscribe/route.ts
    /book-private/route.ts
    /leads/route.ts
    /dashboard-auth/route.ts

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
  /audioguide
    AudioguideShell.tsx
    NarrativeCard.tsx
    MirokaiAvatar.tsx
    ProgressBar.tsx
    AudioPlayer.tsx
    StoryMap.tsx
  /dashboard
    AnalyticsCharts.tsx
    DashboardLogin.tsx

/hooks
  useProfile.ts
  useExitIntent.ts
  useUTM.ts
  useEventbrite.ts

/lib
  eventbrite.ts
  email.ts
  analytics.ts
  validators.ts
  audioguideContent.ts

/services
  bookingService.ts
  leadService.ts
  emailService.ts

/types
  profile.ts
  booking.ts
  audioguide.ts
```

## Flux clés

### Landing conversion (B2B/B2C)

1. Sélection de profil (`useProfile`, sessionStorage).
2. Tracking funnel (`page_view`, `profile_selected`, `form_started`, `form_submitted`, `eventbrite_redirect`, `email_captured`).
3. Calendrier avec distinction visuelle grand public / entreprise.
4. Formulaire B2B validé Zod + enregistrement lead API.
5. Redirection Eventbrite avec UTM systématiques (`useUTM`, `buildEventbriteURL`).
6. Exit intent popup avec capture email + séquence J-7/J-2/J-1.

### Audioguide immersif

1. Écran d'accueil (langue + choix guide Miroki/Miroka).
2. StoryMap interactive avec étapes verrouillées/déverrouillées.
3. Étape narrative avec avatar animé, audio, sous-titres et progression.
4. Écran de fin avec CTA retour conversion.

### Dashboard analytics

- Accès protégé par mot de passe (`DASHBOARD_PASSWORD`) via cookie HTTP-only.
- KPIs: taux de remplissage, part B2B/B2C, emails capturés.
- Graphiques Recharts: tunnel conversion + sources UTM.

## Intégrations externes

- Eventbrite: URL builder avec UTM et pré-remplissage champs.
- GA4/GTM/Hotjar: scripts injectés si variables présentes.
- Resend: envoi réel des emails si `RESEND_API_KEY` définie.
- Supabase: stockage leads si credentials présents, fallback mémoire sinon.

## Notes d'implémentation

- Mobile-first priorisé (landing et audioguide).
- Design Nimira: bleu nuit / violet profond / or lumineux.
- Composants découplés pour évolution rapide (A/B tests, nouveaux parcours, intégrations CRM).
