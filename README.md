# Enchanted Tools x Mirokai Experience 2026

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![PWA](https://img.shields.io/badge/PWA-enabled-0ea5e9)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

Plateforme conversion B2B/B2C + PWA visiteurs immersive pour la Mirokai Experience.

## Liens utiles

- Production: https://mirokai-experience-2026.vercel.app
- Profil (gateway): `/profile`
- Admin (via profil): `/admin`
- Dashboard (via profil/admin): `/dashboard`
- Experience visiteurs: `/experience`
- Jeux: `/game` et `/game/memory`
- Privacy: `/privacy`
- Cookies: `/cookies`
- Legal: `/legal`

## Repository propre

- Structure modulaire claire (`app`, `components`, `hooks`, `services`, `lib`, `types`)
- TypeScript strict + schemas Zod
- Endpoints API isoles par use-case
- Documentation de reprise dans `docs/`

## Fonctionnalites clefs

- Landing conversion B2B/B2C avec UTM Eventbrite
- Section galerie immersive (images moodboard)
- Profil gateway `/profile`:
  - Connexion visiteur (segment `b2c` / `b2b`)
  - Connexion admin
- PWA experience protegee par session visiteur
- Personnalisation robot (nom utilisateur + message par segment)
- Jeux segmentes:
  - B2C: quiz + memory
  - B2B: simulation decisionnelle KPI/ROI
- Admin modules + drag and drop floor plan
- Dashboard analytics protegee par mot de passe
- Consentement cookies persistant

## Documentation

### Documentation technique

- [Documentation technique detaillee](docs/TECHNICAL_DOCUMENTATION.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Guide installation](docs/INSTALLATION.md)
- [Guide admin](docs/ADMIN_GUIDE.md)
- [Exemples de donnees](docs/DATA_EXAMPLES.md)
- [Guide deploiement](docs/DEPLOYMENT.md)
- [Justification technique (livrable referent)](docs/TECHNICAL_RATIONALE.md)

### Schéma d'architecture

Le schema complet (Mermaid) est dans [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Demarrage rapide

```bash
npm install
npm run dev
```

Verification qualite:

```bash
npm run lint
npm run build
```

## Variables d'environnement

Copier le template:

```bash
cp .env.example .env.local
```

Variables importantes:

- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- `NEXT_PUBLIC_EVENTBRITE_URL=https://www.eventbrite.fr/e/lexperience-mirokai-musee-robotique-et-ia-tickets-1837425843159?aff=ebdsoporgprofile`
- `NEXT_PUBLIC_DEPLOYED_ROBOTS=24`
- `DASHBOARD_PASSWORD=...`
- `CRON_SECRET=...`

## Exemples de donnees / media

- Seed modules: `supabase/seed/modules_seed.json`
- Migration SQL: `supabase/migrations/20260311_000001_init_mirokai.sql`
- Videos/audios: `public/media/` et mapping `lib/audioguideContent.ts`
- Galerie landing: `public/media/gallery/*`
- Visuels profils: `public/media/profiles/*`

## Deploiement

Instructions detaillees:

- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Livrable PDF

- PDF referent mis a jour: `RAKOTOMALALA_Océane_M2TL_Compétition.pdf`

## Checklist finale

- Avancement fonctionnel restant: [README_RESTANT.md](README_RESTANT.md)
- Setup Supabase: [supabase/README.md](supabase/README.md)

## Etat UI actuel

- Section "Ils nous font confiance" active sur la landing
- Section "Ou nous trouver" restauree avec informations d'acces
- Liens footer conformite actifs et relies a des pages dediees
