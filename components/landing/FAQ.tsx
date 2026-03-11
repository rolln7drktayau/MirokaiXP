"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Le Mirokaï collecte-t-il des données personnelles ?",
    answer:
      "Nous limitons strictement la collecte au nécessaire (réservation, consentement email). Les données sont traitées selon le RGPD et ne sont jamais revendues.",
  },
  {
    question: "Les interactions physiques sont-elles sécurisées ?",
    answer:
      "Oui. Les interactions sont encadrées, supervisées et limitées à des scénarios sûrs, avec protocoles de sécurité standardisés.",
  },
  {
    question: "Peut-on organiser une session privée entreprise ?",
    answer:
      "Oui, dès 8 participants. Utilisez la demande de créneau privé pour un parcours personnalisé et un briefing dédié.",
  },
  {
    question: "L'expérience est-elle adaptée à un public non technique ?",
    answer:
      "Totalement. La narration Nimira rend les concepts d'IA et robotique accessibles sans jargon.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="section-wrap py-10">
      <h2 className="text-2xl sm:text-3xl">FAQ & réassurance</h2>
      <div className="mt-4 space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <article key={faq.question} className="glass-panel rounded-2xl p-4">
              <button
                type="button"
                onClick={() => setActiveIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-[#F5C842]">{isOpen ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden pt-2 text-sm text-white/75"
                  >
                    {faq.answer}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}
