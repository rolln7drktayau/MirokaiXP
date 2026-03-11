"use client";

import { ArrowLeft, House } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

interface NavBackHomeProps {
  className?: string;
  homeHref?: string;
  backLabel?: string;
  homeLabel?: string;
}

export function NavBackHome({
  className = "",
  homeHref = "/",
  backLabel,
  homeLabel,
}: NavBackHomeProps) {
  const router = useRouter();
  const { locale } = useAppPreferences();

  const labels = {
    fr: { back: "Retour", home: "Accueil" },
    en: { back: "Back", home: "Home" },
  } as const;

  const resolvedBackLabel = backLabel ?? labels[locale].back;
  const resolvedHomeLabel = homeLabel ?? labels[locale].home;

  return (
    <nav className={`flex flex-wrap items-center gap-2 ${className}`}>
      <motion.button
        type="button"
        onClick={() => router.back()}
        className="cta-secondary inline-flex items-center gap-2"
        aria-label={resolvedBackLabel}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <ArrowLeft size={16} />
        {resolvedBackLabel}
      </motion.button>
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Link href={homeHref} className="cta-secondary inline-flex items-center gap-2">
          <House size={16} />
          {resolvedHomeLabel}
        </Link>
      </motion.div>
    </nav>
  );
}
