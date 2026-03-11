"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

export function Testimonials() {
  const { locale } = useAppPreferences();
  const testimonialsByLocale = {
    fr: [
      {
        quote: "Le Mirokaï a transformé notre accueil clients en expérience mémorable.",
        author: "Direction Innovation",
        company: "Decathlon",
      },
      {
        quote: "Excellent levier d'onboarding: nos équipes retiennent mieux les messages clés.",
        author: "Responsable RH",
        company: "Salesforce",
      },
      {
        quote: "Un niveau d'engagement rare dans un contexte de médiation grand public.",
        author: "Direction Expérience",
        company: "Aquarium de Paris",
      },
    ],
    en: [
      {
        quote: "Mirokaï turned our visitor reception into a memorable customer experience.",
        author: "Innovation Lead",
        company: "Decathlon",
      },
      {
        quote: "A powerful onboarding lever: our teams retain key messages much better.",
        author: "HR Manager",
        company: "Salesforce",
      },
      {
        quote: "A rare engagement level for a public-facing mediation experience.",
        author: "Experience Director",
        company: "Aquarium de Paris",
      },
    ],
  } as const;

  const labels = {
    fr: {
      eyebrow: "Témoignages B2B",
      aria: "Voir le témoignage",
    },
    en: {
      eyebrow: "B2B testimonials",
      aria: "Show testimonial",
    },
  } as const;

  const t = labels[locale];
  const testimonials = testimonialsByLocale[locale];

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 8500);
    return () => window.clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const item = testimonials[index];

  return (
    <section
      className="section-wrap py-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">{t.eyebrow}</p>
      <motion.figure
        key={item.company}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="glass-panel mt-3 rounded-3xl p-5"
      >
        <blockquote className="text-xl leading-relaxed sm:text-2xl">“{item.quote}”</blockquote>
        <figcaption className="mt-4 text-sm text-white/75">
          {item.author} • <span className="text-[#F5C842]">{item.company}</span>
        </figcaption>
      </motion.figure>

      <div className="mt-3 flex gap-2">
        {testimonials.map((testimonial, dotIndex) => (
          <button
            key={testimonial.company}
            type="button"
            onClick={() => setIndex(dotIndex)}
            className={`h-2.5 w-8 rounded-full transition ${
              dotIndex === index ? "bg-[#F5C842]" : "bg-white/20"
            }`}
            aria-label={`${t.aria} ${dotIndex + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
