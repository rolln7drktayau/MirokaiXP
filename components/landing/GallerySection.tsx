"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Sparkles } from "lucide-react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

type GalleryItem = {
  src: string;
  alt: {
    fr: string;
    en: string;
  };
  title: {
    fr: string;
    en: string;
  };
  comment: {
    fr: string;
    en: string;
  };
};

const galleryItems: GalleryItem[] = [
  {
    src: "/media/gallery/nimira-signaletique.jpeg",
    alt: {
      fr: "Signalétique immersive dans l'espace Mirokaï",
      en: "Immersive signage inside the Mirokaï space",
    },
    title: {
      fr: "Signalétique immersive",
      en: "Immersive signage",
    },
    comment: {
      fr: "Un repère visuel clair pour ancrer le storytelling Nimira dès l'entrée.",
      en: "A clear visual marker to anchor Nimira storytelling from the entrance.",
    },
  },
  {
    src: "/media/gallery/nimira-forest-palette.jpeg",
    alt: {
      fr: "Palette visuelle inspirée de la forêt de Nimira",
      en: "Visual palette inspired by the Nimira forest",
    },
    title: {
      fr: "Palette de Nimira",
      en: "Nimira palette",
    },
    comment: {
      fr: "Des tons organiques et lumineux pour rendre la robotique plus émotionnelle.",
      en: "Organic and luminous tones to make robotics feel more emotional.",
    },
  },
  {
    src: "/media/gallery/nimira-characters-collage.jpeg",
    alt: {
      fr: "Personnages et univers narratif Mirokaï",
      en: "Characters and narrative world around Mirokaï",
    },
    title: {
      fr: "Personnages & narration",
      en: "Characters & storytelling",
    },
    comment: {
      fr: "Des repères narratifs pour lier l'expérience visiteur aux cas d'usage réels.",
      en: "Narrative anchors connecting visitor emotion to real-world business use cases.",
    },
  },
];

export function GallerySection() {
  const { locale, theme } = useAppPreferences();
  const isLight = theme === "nimira-light";

  const copy = {
    fr: {
      eyebrow: "Galerie Nimira",
      title: "Univers visuel & inspirations",
      intro:
        "Une sélection d'images pour transmettre la direction artistique, la narration et l'ambiance de la Mirokaï Experience.",
    },
    en: {
      eyebrow: "Nimira gallery",
      title: "Visual world & inspirations",
      intro:
        "A curated image set to express artistic direction, storytelling, and atmosphere for the Mirokaï Experience.",
    },
  } as const;

  const t = copy[locale];

  return (
    <section className="section-wrap py-8" id="gallery">
      <div
        className={`relative overflow-hidden rounded-3xl border p-5 sm:p-6 ${
          isLight
            ? "border-[#202020]/12 bg-[linear-gradient(155deg,#f9f3e9_0%,#f4ece0_55%,#efe5d9_100%)]"
            : "border-white/15 bg-[linear-gradient(150deg,#111032_0%,#15143f_45%,#0d1027_100%)]"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(0,245,196,0.16),transparent_40%),radial-gradient(circle_at_82%_82%,rgba(245,200,66,0.14),transparent_44%)]" />

        <div className="relative">
          <p className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] ${isLight ? "text-[#202020]/70" : "text-white/70"}`}>
            <Sparkles size={12} className="text-[#FFD166]" />
            {t.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl">{t.title}</h2>
          <p className={`mt-2 max-w-3xl text-sm ${isLight ? "text-[#202020]/80" : "text-white/80"}`}>{t.intro}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <motion.article
                key={item.src}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.28, delay: index * 0.07, ease: "easeInOut" }}
                whileHover={{ y: -4 }}
                className={`overflow-hidden rounded-2xl border ${
                  isLight ? "border-[#202020]/12 bg-white/85" : "border-white/15 bg-white/5"
                }`}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image src={item.src} alt={item.alt[locale]} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/30 px-2 py-1 text-[11px] text-white/90">
                    <Camera size={11} />
                    Nimira
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold">{item.title[locale]}</h3>
                  <p className={`mt-2 text-sm ${isLight ? "text-[#202020]/80" : "text-white/78"}`}>{item.comment[locale]}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
