import type { AudioguideStep } from "@/types/audioguide";

export const audioguideSteps: AudioguideStep[] = [
  {
    id: "arrival-gate",
    order: 1,
    title: "Portail d'arrivée sur Nimira",
    narratives: {
      fr: "Bienvenue voyageur. Ici, chaque interaction avec Mirokaï révèle une facette de l'intelligence sociale: écoute, contexte et empathie opérationnelle.",
      en: "Welcome traveler. Here, every Mirokai interaction reveals social intelligence in action: listening, context awareness, and operational empathy.",
    },
    audioUrls: {
      fr: "/media/audio/fr/01-arrival-gate.mp3",
      en: "/media/audio/en/01-arrival-gate.mp3",
    },
    mirokaiCharacter: "miroki",
    mirokaiEmotion: "welcoming",
    locationInMuseum: "Hall d'introduction",
    unlocked: true,
  },
  {
    id: "retail-lab",
    order: 2,
    title: "Laboratoire Retail",
    narratives: {
      fr: "Observez comment Mirokaï fluidifie la relation client et soutient les équipes en magasin: orientation, pédagogie produit et émotion positive.",
      en: "Observe how Mirokai streamlines customer interactions and supports store teams with guidance, product education, and positive engagement.",
    },
    audioUrls: {
      fr: "/media/audio/fr/02-retail-lab.mp3",
      en: "/media/audio/en/02-retail-lab.mp3",
    },
    mirokaiCharacter: "miroki",
    mirokaiEmotion: "explaining",
    locationInMuseum: "Zone démonstration retail",
    unlocked: false,
  },
  {
    id: "care-space",
    order: 3,
    title: "Espace Santé & Care",
    narratives: {
      fr: "Dans les parcours sensibles, Mirokaï apporte clarté et douceur. La technologie se met au service de la relation humaine.",
      en: "In sensitive environments, Mirokai brings clarity and reassurance. Technology stays in service of human connection.",
    },
    audioUrls: {
      fr: "/media/audio/fr/03-care-space.mp3",
      en: "/media/audio/en/03-care-space.mp3",
    },
    mirokaiCharacter: "miroka",
    mirokaiEmotion: "curious",
    locationInMuseum: "Aile médicale",
    unlocked: false,
  },
  {
    id: "future-forum",
    order: 4,
    title: "Forum des futurs usages",
    narratives: {
      fr: "Vous voici à la dernière étape. Imaginez votre organisation augmentée par une robotique sociale déployée avec méthode, sens et narration.",
      en: "You reached the final step. Imagine your organization augmented by social robotics deployed with method, purpose, and storytelling.",
    },
    audioUrls: {
      fr: "/media/audio/fr/04-future-forum.mp3",
      en: "/media/audio/en/04-future-forum.mp3",
    },
    mirokaiCharacter: "miroka",
    mirokaiEmotion: "happy",
    locationInMuseum: "Forum final",
    unlocked: false,
  },
];
