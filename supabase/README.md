# Supabase Setup

Ce dossier contient la migration SQL de base pour la plateforme.

## Migration incluse

- `migrations/20260311_000001_init_mirokai.sql`

Tables créées:

- `public.leads`
- `public.subscribers`
- `public.email_queue`
- `public.analytics_events`

## Comment l'appliquer

## Option 1: Supabase SQL Editor (rapide)

1. Ouvrir Supabase > SQL Editor.
2. Coller le contenu de `migrations/20260311_000001_init_mirokai.sql`.
3. Exécuter.

## Option 2: Supabase CLI

```bash
supabase db push
```

Pré-requis:

- Projet Supabase lié au dossier local.
- CLI Supabase installée et authentifiée.

## Variables d'environnement à renseigner ensuite

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
