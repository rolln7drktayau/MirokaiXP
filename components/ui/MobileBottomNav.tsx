"use client";

import { motion } from "framer-motion";
import { CalendarDays, House, UserRound, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

type NavItem = {
  key: "home" | "booking" | "profile";
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { key: "home", href: "/", icon: House },
  { key: "booking", href: "/#booking", icon: CalendarDays },
  { key: "profile", href: "/profile", icon: UserRound },
];

const labels = {
  fr: {
    home: "Accueil",
    booking: "Réserver",
    profile: "Profil",
    nav: "Navigation mobile",
  },
  en: {
    home: "Home",
    booking: "Book",
    profile: "Profile",
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
  const { locale, theme } = useAppPreferences();
  const t = labels[locale];
  const isLight = theme === "nimira-light";

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-[65] border-t backdrop-blur-xl md:hidden ${
        isLight ? "border-[#202020]/12 bg-[#fff8ef]/85" : "border-[#f0eef8]/15 bg-[#101528]/35"
      }`}
      aria-label={t.nav}
    >
      <div className="mx-auto max-w-3xl px-3 pt-2 [padding-bottom:calc(0.5rem+env(safe-area-inset-bottom))]">
        <ul
          className={`grid grid-cols-3 gap-1 rounded-2xl border p-1.5 ${
            isLight ? "border-[#202020]/12 bg-white/95" : "border-[#f0eef8]/15 bg-[#1f2030]/88"
          }`}
        >
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
                        : isLight
                          ? "text-[#202020]/72 hover:bg-[#202020]/10"
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
