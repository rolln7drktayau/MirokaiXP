# Instructions de Deploiement

## Cible

- Front/API: Vercel
- Data: Supabase
- Email: Resend

## 1) Configurer les variables Vercel

Dans `Project Settings > Environment Variables`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_EVENTBRITE_URL`
- `DASHBOARD_PASSWORD`
- `CRON_SECRET`
- `NEXT_PUBLIC_GTM_ID` (optionnel)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optionnel)
- `NEXT_PUBLIC_HOTJAR_ID` (optionnel)
- `RESEND_API_KEY` (si emails actifs)
- `MIROKAI_EMAIL_FROM`
- `MIROKAI_SALES_EMAIL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 2) Deployer depuis GitHub (recommande)

1. Connecter le repo sur Vercel.
2. Selectionner branche `main`.
3. Build command: `npm run build`.
4. Output: Next.js detection automatique.
5. Lancer `Deploy`.

## 3) Deployer via CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 4) Activer le cron sequence email

Le cron est deja declare dans `vercel.json`.

Verifier:

- Route: `/api/cron/email-sequence`
- Header attendu: `Authorization: Bearer <CRON_SECRET>`

## 5) Verification post-deploiement

1. Landing charge sans erreur.
2. CTA booking redirige vers Eventbrite avec UTM.
3. Page `/profile`:
   - connexion visiteur fonctionne
   - connexion admin fonctionne
4. CRUD modules et drag/drop position OK.
5. Experience PWA accessible en mobile (apres passage profil).
6. Jeux:
   - B2C: quiz + memory
   - B2B: simulation KPI/ROI
7. Email subscribe/leads traces en base (si Supabase configure).
