import type { AudioguideStep } from "@/types/audioguide";

export const audioguideSteps: AudioguideStep[] = [
  {
    id: "arrival-gate",
    order: 1,
    title: "Portail d'arrivée sur Nimira",
    narrative:
      "Bienvenue voyageur. Ici, chaque interaction avec Mirokaï révèle une facette de l'intelligence sociale: écoute, contexte et empathie opérationnelle.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    mirokaiCharacter: "miroki",
    mirokaiEmotion: "welcoming",
    locationInMuseum: "Hall d'introduction",
    unlocked: true,
  },
  {
    id: "retail-lab",
    order: 2,
    title: "Laboratoire Retail",
    narrative:
      "Observez comment Mirokaï fluidifie la relation client et soutient les équipes en magasin: orientation, pédagogie produit et émotion positive.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    mirokaiCharacter: "miroki",
    mirokaiEmotion: "explaining",
    locationInMuseum: "Zone démonstration retail",
    unlocked: false,
  },
  {
    id: "care-space",
    order: 3,
    title: "Espace Santé & Care",
    narrative:
      "Dans les parcours sensibles, Mirokaï apporte clarté et douceur. La technologie se met au service de la relation humaine.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    mirokaiCharacter: "miroka",
    mirokaiEmotion: "curious",
    locationInMuseum: "Aile médicale",
    unlocked: false,
  },
  {
    id: "future-forum",
    order: 4,
    title: "Forum des futurs usages",
    narrative:
      "Vous voici à la dernière étape. Imaginez votre organisation augmentée par une robotique sociale déployée avec méthode, sens et narration.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    mirokaiCharacter: "miroka",
    mirokaiEmotion: "happy",
    locationInMuseum: "Forum final",
    unlocked: false,
  },
];
