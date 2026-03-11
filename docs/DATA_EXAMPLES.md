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
  "companySize": "50-200",
  "industry": "Retail",
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
  "optIn": true,
  "locale": "fr"
}
```

## Evenement analytics

Payload API `POST /api/analytics/track`:

```json
{
  "eventName": "eventbrite_redirect",
  "profile": "b2b",
  "utm_source": "landing_page",
  "utm_medium": "b2b_form",
  "utm_campaign": "mirokai_experience_2026"
}
```

## Emplacement des medias

- Video hero: `public/media/video/mirokai-hero-loop.mp4`
- Audios FR: `public/media/audio/fr/*`
- Audios EN: `public/media/audio/en/*`
- Mapping audio guide: `lib/audioguideContent.ts`
