"use client";

import { motion } from "framer-motion";

const useCases = [
  {
    title: "Accueil intelligent",
    description: "Fluidifier l'accueil visiteurs avec un robot capable d'orienter et rassurer.",
    reference: "Lyon Saint-Exupéry",
  },
  {
    title: "Onboarding RH",
    description: "Créer une première impression mémorable avec un guide robotique narratif.",
    reference: "Salesforce",
  },
  {
    title: "Retail augmenté",
    description: "Informer, divertir et augmenter la conversion en magasin.",
    reference: "Decathlon",
  },
  {
    title: "Hospitalité expérientielle",
    description: "Transformer le check-in en moment immersif.",
    reference: "Ki Space Hotel",
  },
  {
    title: "Médiation culturelle",
    description: "Raconter des histoires interactives dans les lieux de visite.",
    reference: "Aquarium de Paris",
  },
  {
    title: "Accompagnement santé",
    description: "Apporter clarté et humanité dans les parcours patients.",
    reference: "ICM Montpellier",
  },
];

export function UseCases() {
  return (
    <section className="section-wrap py-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Cas d&apos;usage B2B</p>
          <h2 className="mt-2 text-2xl sm:text-3xl">Des scénarios concrets déjà déployés</h2>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((item) => (
          <motion.article
            key={item.title}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="glass-panel rounded-2xl p-4"
          >
            <h3 className="text-lg">{item.title}</h3>
            <p className="mt-2 text-sm text-white/75">{item.description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[#F5C842]">{item.reference}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
