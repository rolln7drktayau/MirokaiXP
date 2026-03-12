"use client";

import { motion } from "framer-motion";
import { CalendarDays, Gamepad2, House, UserRound, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";

type NavItem = {
  key: "home" | "booking" | "game" | "profile";
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { key: "home", href: "/", icon: House },
  { key: "booking", href: "/#booking", icon: CalendarDays },
  { key: "game", href: "/#game", icon: Gamepad2 },
  { key: "profile", href: "/profile", icon: UserRound },
];
const MOBILE_TAB_EVENT = "mirokai-mobile-tab-change";

const labels = {
  fr: {
    home: "Accueil",
    booking: "Réserver",
    game: "Jeu",
    profile: "Profil",
    nav: "Navigation mobile",
  },
  en: {
    home: "Home",
    booking: "Book",
    game: "Game",
    profile: "Profile",
    nav: "Mobile navigation",
  },
} as const;

export function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [activeTab, setActiveTab] = useState<NavItem["key"]>("home");
  const { locale, theme } = useAppPreferences();
  const t = labels[locale];
  const isLight = theme === "nimira-light";

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash || "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (pathname === "/profile" || pathname.startsWith("/profile/")) {
      setActiveTab("profile");
      return;
    }

    if (pathname !== "/") {
      setActiveTab("home");
      return;
    }

    if (hash === "#booking") {
      setActiveTab("booking");
      return;
    }
    if (hash === "#game") {
      setActiveTab("game");
      return;
    }
    setActiveTab("home");
  }, [pathname, hash]);

  const handleTabClick = (item: NavItem) => {
    if (item.key === "profile") {
      return;
    }

    setActiveTab(item.key);

    if (pathname !== "/") {
      router.push(item.href);
      return;
    }

    const nextHash = item.key === "home" ? "" : `#${item.key}`;
    const nextUrl = `${window.location.pathname}${nextHash}`;
    window.history.replaceState(null, "", nextUrl);
    window.dispatchEvent(new CustomEvent(MOBILE_TAB_EVENT, { detail: { tab: item.key } }));
  };

  const isItemActive = (item: NavItem) => {
    if (item.key === "profile") {
      return pathname === "/profile" || pathname.startsWith("/profile/");
    }
    return activeTab === item.key;
  };

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-[65] border-t backdrop-blur-xl md:hidden ${
        isLight ? "border-[#202020]/12 bg-[#fff8ef]/85" : "border-[#f0eef8]/15 bg-[#101528]/35"
      }`}
      aria-label={t.nav}
    >
      <div className="mx-auto max-w-3xl px-3 pt-2 [padding-bottom:calc(0.5rem+env(safe-area-inset-bottom))]">
        <ul
          className={`grid grid-cols-4 gap-1 rounded-2xl border p-1.5 ${
            isLight ? "border-[#202020]/12 bg-white/95" : "border-[#f0eef8]/15 bg-[#1f2030]/88"
          }`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <li key={item.key}>
                <motion.div whileTap={{ scale: 0.96 }}>
                  {item.key === "profile" ? (
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
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleTabClick(item)}
                      className={`flex w-full flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] transition ${
                        active
                          ? "bg-[#00F5C4]/15 text-[#00F5C4]"
                          : isLight
                            ? "text-[#202020]/72 hover:bg-[#202020]/10"
                            : "text-[#f0eef8]/72 hover:bg-[#f0eef8]/10"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{t[item.key]}</span>
                    </button>
                  )}
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
