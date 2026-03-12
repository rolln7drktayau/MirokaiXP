# Exemples de Donnees

## Module (experience)

```json
{
  "id": "module-01",
  "number": 1,
  "name": "Accueil Nimira",
  "description": "Introduction a l'univers Mirokai et orientation visiteur.",
  "audioUrl": "/media/audio/fr/01-arrival-gate.mp3",
  "videoUrl": "/media/video/module-01.mp4",
  "images": ["/media/images/module-01-1.jpg", "/media/images/module-01-2.jpg"],
  "position": { "x": 22, "y": 36 },
  "mirokaiPrompt": "Bienvenue sur Nimira. Suivez-moi pour decouvrir ce module. Restons curieux.",
  "unlocked": true,
  "theme": "nimira"
}
```

## Lead B2B

Payload API `POST /api/leads`:

```json
{
  "company": "Renault Group",
  "companySize": "51-200",
  "sector": "Retail",
  "attendees": 12,
  "contactName": "Camille Martin",
  "email": "camille@entreprise.fr",
  "profile": "b2b"
}
```

## Abonne newsletter

Payload API `POST /api/subscribe`:

```json
{
  "email": "visiteur@email.com",
  "profile": "solo",
  "consent": true,
  "source": "exit_popup"
}
```

## Evenement analytics

Payload API `POST /api/analytics/track`:

```json
{
  "event": "eventbrite_redirect",
  "profile": "b2b",
  "source": "landing_page",
  "step": "booking_calendar",
  "value": "b2b_form"
}
```

## Session visiteur

Payload API `POST /api/profile-session`:

```json
{
  "name": "Oceane",
  "segment": "b2b"
}
```

## Emplacement des medias

- Video hero: `public/media/video/mirokai-hero-loop.mp4`
- Audios FR: `public/media/audio/fr/*`
- Audios EN: `public/media/audio/en/*`
- Mapping audio guide: `lib/audioguideContent.ts`
- Galerie landing: `public/media/gallery/*`
- Visuels profils: `public/media/profiles/*`
