"use client";

import { motion } from "framer-motion";
import { BarChart3, Gamepad2, House, MapPinned, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

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
  const router = useRouter();
  const { locale } = useAppPreferences();
  const t = labels[locale];
  const pressTimer = useRef<number | null>(null);
  const longPressTriggered = useRef(false);

  const startStatsPress = () => {
    longPressTriggered.current = false;
    pressTimer.current = window.setTimeout(() => {
      longPressTriggered.current = true;
      router.push("/admin");
    }, 550);
  };

  const endStatsPress = () => {
    if (pressTimer.current) {
      window.clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }

    if (!longPressTriggered.current) {
      router.push("/dashboard");
    }
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[65] border-t border-[#f0eef8]/15 bg-[#101528]/35 backdrop-blur-xl md:hidden"
      aria-label={t.nav}
    >
      <div className="mx-auto max-w-3xl px-3 pt-2 [padding-bottom:calc(0.5rem+env(safe-area-inset-bottom))]">
        <ul className="grid grid-cols-4 gap-1 rounded-2xl border border-[#f0eef8]/15 bg-[#1f2030]/88 p-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isPathActive(pathname, item.href);

            if (item.key === "dashboard") {
              return (
                <li key={item.key}>
                  <motion.div whileTap={{ scale: 0.96 }}>
                    <button
                      type="button"
                      onPointerDown={startStatsPress}
                      onPointerUp={endStatsPress}
                      onPointerLeave={() => {
                        if (pressTimer.current) {
                          window.clearTimeout(pressTimer.current);
                          pressTimer.current = null;
                        }
                      }}
                      onPointerCancel={() => {
                        if (pressTimer.current) {
                          window.clearTimeout(pressTimer.current);
                          pressTimer.current = null;
                        }
                      }}
                      className={`flex w-full flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] transition ${
                        active
                          ? "bg-[#00F5C4]/15 text-[#00F5C4]"
                          : "text-[#f0eef8]/72 hover:bg-[#f0eef8]/10"
                      }`}
                      aria-label={`${t.dashboard} (long press admin)`}
                    >
                      <Icon size={16} />
                      <span>{t[item.key]}</span>
                    </button>
                  </motion.div>
                </li>
              );
            }

            return (
              <li key={item.key}>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link
                    href={item.href}
                    className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] transition ${
                      active
                        ? "bg-[#00F5C4]/15 text-[#00F5C4]"
                        : "text-[#f0eef8]/72 hover:bg-[#f0eef8]/10"
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
