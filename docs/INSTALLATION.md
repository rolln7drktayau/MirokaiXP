# Guide d'Installation

## Pre-requis

- Node.js 20+
- npm 10+
- Git

## 1) Cloner le projet

```bash
git clone https://github.com/rolln7drktayau/MirokaiXP.git
cd MirokaiXP
```

## 2) Installer les dependances

```bash
npm install
```

## 3) Configurer l'environnement

Copier le template:

```bash
cp .env.example .env.local
```

Renseigner au minimum:

- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- `NEXT_PUBLIC_EVENTBRITE_URL` (lien event Eventbrite)
- `NEXT_PUBLIC_DEPLOYED_ROBOTS=24`
- `DASHBOARD_PASSWORD`

Variables optionnelles selon integration:

- GA/GTM/Hotjar
- Resend
- Supabase

## 4) Lancer en local

```bash
npm run dev
```

Acces utiles:

- Landing: `http://localhost:3000`
- Profil gateway: `http://localhost:3000/profile`
- Experience PWA: `http://localhost:3000/experience`
- Admin: `http://localhost:3000/admin`
- Dashboard: `http://localhost:3000/dashboard`
- Jeux: `http://localhost:3000/game`

Note:

- `/experience` et `/game*` redirigent vers `/profile` si aucune session visiteur n'est active.
- Segment `b2b` ouvre un jeu dedie KPI/ROI sur `/game`.
- Sur mobile, la landing utilise une barre fixe a 4 onglets: `Accueil / Reserver / Jeu / Profil`.

## 5) Verification qualite

```bash
npm run lint
npm run build
```

## 6) Base Supabase (optionnel)

Appliquer la migration:

- `supabase/migrations/20260311_000001_init_mirokai.sql`

Seed modules:

- `supabase/seed/modules_seed.json`

Details: voir `supabase/README.md`.
