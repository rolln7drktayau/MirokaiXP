"use client";

import { ArrowLeft, House } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavBackHomeProps {
  className?: string;
  homeHref?: string;
  backLabel?: string;
  homeLabel?: string;
}

export function NavBackHome({
  className = "",
  homeHref = "/",
  backLabel = "Retour",
  homeLabel = "Accueil",
}: NavBackHomeProps) {
  const router = useRouter();

  return (
    <nav className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => router.back()}
        className="cta-secondary inline-flex items-center gap-2"
        aria-label={backLabel}
      >
        <ArrowLeft size={16} />
        {backLabel}
      </button>
      <Link href={homeHref} className="cta-secondary inline-flex items-center gap-2">
        <House size={16} />
        {homeLabel}
      </Link>
    </nav>
  );
}
