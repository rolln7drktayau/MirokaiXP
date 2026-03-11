import type { Module } from "@/types/module";

export const moduleSeed: Module[] = [
  {
    id: "module-01",
    number: 1,
    name: "Portail Nimira",
    description:
      "Introduction à l'univers Nimira et au rôle social des Mirokaï dans les espaces publics.",
    audioUrl: "/media/audio/fr/01-arrival-gate.mp3",
    images: ["/media/images/module-01.jpg"],
    position: { x: 14, y: 28 },
    mirokaiPrompt:
      "Bienvenue dans le Portail Nimira. Observez comment je vous guide naturellement vers le parcours.",
    unlocked: true,
    theme: "narration",
  },
  {
    id: "module-02",
    number: 2,
    name: "Accueil Retail",
    description: "Cas d'usage retail avec orientation client et médiation produit.",
    audioUrl: "/media/audio/fr/02-retail-lab.mp3",
    images: ["/media/images/module-02.jpg"],
    position: { x: 32, y: 42 },
    mirokaiPrompt:
      "Je peux orienter un visiteur vers le bon rayon et répondre rapidement aux questions fréquentes.",
    unlocked: false,
    theme: "tech",
  },
  {
    id: "module-03",
    number: 3,
    name: "Hub Entreprise",
    description: "Onboarding, accueil siège et expérience collaborateurs.",
    videoUrl: "/media/video/module-03.mp4",
    images: ["/media/images/module-03.jpg"],
    position: { x: 52, y: 36 },
    mirokaiPrompt:
      "Dans une entreprise, je facilite l'onboarding en apportant un guidage contextualisé.",
    unlocked: false,
    theme: "emotion",
  },
  {
    id: "module-04",
    number: 4,
    name: "Zone Santé",
    description: "Démonstration en environnement médical avec interactions rassurantes.",
    audioUrl: "/media/audio/fr/03-care-space.mp3",
    images: ["/media/images/module-04.jpg"],
    position: { x: 64, y: 58 },
    mirokaiPrompt:
      "Dans les parcours sensibles, mes réponses restent courtes, claires et rassurantes.",
    unlocked: false,
    theme: "emotion",
  },
  {
    id: "module-05",
    number: 5,
    name: "Scène Immersive",
    description: "Narration conjointe Miroki/Miroka pour les événements publics.",
    videoUrl: "/media/video/module-05.mp4",
    images: ["/media/images/module-05.jpg"],
    position: { x: 76, y: 30 },
    mirokaiPrompt:
      "Je vous raconte une mission Nimira en moins de trois phrases pour garder votre attention.",
    unlocked: false,
    theme: "nimira",
  },
  {
    id: "module-06",
    number: 6,
    name: "Forum Futur",
    description: "Projection des prochains déploiements et retours utilisateurs.",
    audioUrl: "/media/audio/fr/04-future-forum.mp3",
    images: ["/media/images/module-06.jpg"],
    position: { x: 86, y: 64 },
    mirokaiPrompt:
      "Le futur des interactions homme-robot se construit sur la confiance et la simplicité.",
    unlocked: false,
    theme: "narration",
  },
];
