"use client";

import { motion } from "framer-motion";
import { BarChart3, Gamepad2, House, MapPinned, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

type NavItem = {
  key: "home" | "experience" | "game" | "dashboard";
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { key: "home", href: "/", icon: House },
  { key: "experience", href: "/experience", icon: MapPinned },
  { key: "game", href: "/game", icon: Gamepad2 },
  { key: "dashboard", href: "/dashboard", icon: BarChart3 },
];

const labels = {
  fr: {
    home: "Accueil",
    experience: "Visite",
    game: "Jeu",
    dashboard: "Stats",
    nav: "Navigation mobile",
  },
  en: {
    home: "Home",
    experience: "Tour",
    game: "Game",
    dashboard: "Stats",
    nav: "Mobile navigation",
  },
} as const;

const isPathActive = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

export function MobileBottomNav() {
  const pathname = usePathname();
  const { locale } = useAppPreferences();
  const t = labels[locale];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[65] border-t border-white/15 bg-black/30 backdrop-blur-xl md:hidden"
      aria-label={t.nav}
    >
      <div className="mx-auto max-w-3xl px-3 pt-2 [padding-bottom:calc(0.5rem+env(safe-area-inset-bottom))]">
        <ul className="grid grid-cols-4 gap-1 rounded-2xl border border-white/15 bg-[#1f2030]/80 p-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isPathActive(pathname, item.href);
            return (
              <li key={item.key}>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link
                    href={item.href}
                    className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] transition ${
                      active
                        ? "bg-[#00F5C4]/15 text-[#00F5C4]"
                        : "text-white/75 hover:bg-white/10"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{t[item.key]}</span>
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
