# Reste à Faire Pour Finaliser Le Projet

## Ce qui est désormais couvert (priorités 5 à 9)

- **5. Capture email + Exit Popup**: collecte active via `/api/subscribe` + consentement + tracking.
- **6. Testimonials + FAQ + UseCases**: sections landing en place.
- **7. Séquence emails J-7/J-2/J-1**: planification dans une file (`email_queue`) + envoi immédiat J-7 + traitement des emails dus via `/api/cron/email-sequence`.
- **8. Dashboard analytics**: dashboard connecté aux leads, subscribers et événements analytics (fallback mock si aucune donnée).
- **9. Audioguide immersif**: langue FR/EN, narration/audio par locale, swipe gauche/droite, progression, map verrouillée.

## Ce qu'il reste pour achever le projet (Go-Live)

1. **Brancher Eventbrite réel**
- Remplacer les créneaux mock de `services/bookingService.ts` par Eventbrite API.
- Injecter les taux de remplissage réels dans le dashboard.

2. **Créer les tables Supabase de prod**
- `leads`
- `subscribers`
- `email_queue`
- `analytics_events`
- Migration déjà prête: `supabase/migrations/20260311_000001_init_mirokai.sql`
- Procédure: `supabase/README.md`

3. **Activer les secrets de prod sur Vercel**
- `RESEND_API_KEY`
- `MIROKAI_EMAIL_FROM`
- `MIROKAI_SALES_EMAIL`
- `CRON_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

4. **Configurer le cron Vercel**
- Déjà déclaré dans `vercel.json`.
- Vérifier l'appel horaire de `/api/cron/email-sequence` avec header `Authorization: Bearer <CRON_SECRET>`.

5. **Compléter le contenu final**
- Remplacer les textes exemples (témoignages, FAQ, narrations) par contenus validés marque/com.
- Ajouter logos autorisés et mentions légales.

6. **QA / Tests**
- Ajouter tests API (subscribe/leads/cron).
- Ajouter tests e2e mobile (funnel + audioguide).
- Vérifier performance Lighthouse mobile.

## Où mettre les audios et vidéos

## Vidéo Hero Landing

- **Fichier**: `public/media/video/mirokai-hero-loop.mp4`
- **URL servie**: `/media/video/mirokai-hero-loop.mp4`
- **Override optionnel**: `NEXT_PUBLIC_HERO_VIDEO_URL`
- **Code**: `components/landing/Hero.tsx`

## Audios Audioguide

- **Code de mapping**: `lib/audioguideContent.ts`
- **Dossiers**:
  - `public/media/audio/fr/`
  - `public/media/audio/en/`
- **Fichiers attendus**:
  - `01-arrival-gate.mp3`
  - `02-retail-lab.mp3`
  - `03-care-space.mp3`
  - `04-future-forum.mp3`

## Référence média rapide

Voir aussi: `public/media/README.md`
