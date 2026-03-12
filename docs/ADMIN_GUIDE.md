# Guide d'Utilisation Admin

## Acces

1. Ouvrir `/profile`.
2. Utiliser la section **Connexion admin**.
3. Saisir `DASHBOARD_PASSWORD`.
4. Un cookie HTTP-only permet l'acces aux pages protegees (`/admin`, `/dashboard`).

Raccourcis ensuite disponibles:

- `/admin` pour la gestion experience
- `/dashboard` pour les analytics

## Gestion des modules

Page: `/admin/modules`

Fonctions disponibles:

- Creer un module
- Modifier un module
- Supprimer un module

Champs a renseigner:

- Numero du module
- Nom
- Description/cartel
- Prompt Mirokai (2-3 phrases max)
- Theme (`nimira`, `tech`, `emotion`, `narration`)
- URLs media (audio, video, images)
- Etat `unlocked`

## Positionnement sur plan interactif

Page: `/admin/floor-plan`

Workflow:

1. Selectionner un module.
2. Deplacer la pastille (drag & drop).
3. Enregistrer.
4. Verifier dans `/experience` que le point est bien interactif.

## Verification apres edition

1. Aller sur `/experience`.
2. Si necessaire, se connecter d'abord sur `/profile`.
3. Cliquer le module sur le plan.
4. Controler affichage:
- titre
- description
- audio/video
- images
- prompt avatar

## Bonnes pratiques

- Garder des prompts courts et contextuels
- Uniformiser le style des cartels
- Compresser les medias (mobile-first)
- Tester en mode smartphone avant publication
- Verifier le rendu des couleurs en mode clair et nuit
- Controler les textes FR/EN avant publication
