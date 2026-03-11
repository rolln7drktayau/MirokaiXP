# Enchanted Tools x Mirokai Experience 2026

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![PWA](https://img.shields.io/badge/PWA-enabled-0ea5e9)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

Plateforme conversion B2B/B2C + PWA visiteurs immersive pour la Mirokai Experience.

## Liens utiles

- Production: https://mirokai-experience-2026.vercel.app
- Admin: `/admin`
- Dashboard: `/dashboard`
- Experience visiteurs: `/experience`

## Repository propre

- Structure modulaire claire (`app`, `components`, `hooks`, `services`, `lib`, `types`)
- TypeScript strict + schemas Zod
- Endpoints API isoles par use-case
- Documentation de reprise dans `docs/`

## README clair - Index documentation

## Documentation technique

- [Documentation technique detaillee](docs/TECHNICAL_DOCUMENTATION.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Guide installation](docs/INSTALLATION.md)
- [Guide admin](docs/ADMIN_GUIDE.md)
- [Exemples de donnees](docs/DATA_EXAMPLES.md)
- [Guide deploiement](docs/DEPLOYMENT.md)
- [Justification technique (livrable referent)](docs/TECHNICAL_RATIONALE.md)

## Schéma d'architecture

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
- `DASHBOARD_PASSWORD=...`
- `CRON_SECRET=...`

## Exemples de donnees / media

- Seed modules: `supabase/seed/modules_seed.json`
- Migration SQL: `supabase/migrations/20260311_000001_init_mirokai.sql`
- Videos/audios: `public/media/` et mapping `lib/audioguideContent.ts`

## Deploiement

Instructions detaillees:

- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Checklist finale

- Avancement fonctionnel restant: [README_RESTANT.md](README_RESTANT.md)
- Setup Supabase: [supabase/README.md](supabase/README.md)
