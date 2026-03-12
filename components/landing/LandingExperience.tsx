"use client";

import { motion } from "framer-motion";
import { Bot, CalendarClock, Building2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { useProfile } from "@/hooks/useProfile";
import { trackEvent, trackPageView } from "@/lib/analytics";
import type { VisitorProfile } from "@/types/profile";

import { ConfirmationBanner } from "./ConfirmationBanner";
import { ContactSection } from "./ContactSection";
import { ExitPopup } from "./ExitPopup";
import { FAQ } from "./FAQ";
import { Hero } from "./Hero";
import { LocationSection } from "./LocationSection";
import { ProfileSelector } from "./ProfileSelector";
import { Testimonials } from "./Testimonials";
import { UseCases } from "./UseCases";
import { ArcadeSection } from "./ArcadeSection";

const DEPLOYED_ROBOTS = Number(process.env.NEXT_PUBLIC_DEPLOYED_ROBOTS ?? "24");
const MOBILE_TAB_EVENT = "mirokai-mobile-tab-change";

export function LandingExperience() {
  const { locale } = useAppPreferences();
  const contactsRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"home" | "contacts" | "game">("home");

  const { profile, hydrated, setProfile } = useProfile("team");
  const resolvedProfile: VisitorProfile = profile === "solo" ? "team" : profile;

  useEffect(() => {
    trackPageView("/");
  }, []);

  useEffect(() => {
    const syncViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setActiveMobileTab("home");
      return;
    }

    const getTabFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#contacts") {
        return "contacts" as const;
      }
      if (hash === "#game") {
        return "game" as const;
      }
      return "home" as const;
    };

    const syncFromHash = () => {
      setActiveMobileTab(getTabFromHash());
    };

    const syncFromEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ tab?: "home" | "contacts" | "game" }>;
      if (customEvent.detail?.tab) {
        setActiveMobileTab(customEvent.detail.tab);
      }
    };

    syncFromHash();
    window.addEventListener(MOBILE_TAB_EVENT, syncFromEvent);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener(MOBILE_TAB_EVENT, syncFromEvent);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [isMobile]);

  useEffect(() => {
    if (hydrated && profile === "solo") {
      setProfile("team");
    }
  }, [hydrated, profile, setProfile]);

  const handleProfileChange = (nextProfile: VisitorProfile) => {
    setProfile(nextProfile);
    trackEvent("profile_selected", { profile: nextProfile });
  };

  const openSlotsForProfile = (nextProfile: VisitorProfile) => {
    handleProfileChange(nextProfile);
    scrollToContacts();
  };

  const scrollToContacts = () => {
    if (isMobile) {
      setActiveMobileTab("contacts");
      window.dispatchEvent(new CustomEvent(MOBILE_TAB_EVENT, { detail: { tab: "contacts" } }));
      window.location.hash = "contacts";
      return;
    }
    contactsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copy = {
    fr: {
      orbitTitle: "Votre parcours Mirokaï en 3 temps",
      orbit1: "Choisissez votre profil",
      orbit2: "Laissez vos coordonnées de contact",
      orbit3: "Vivez la narration Nimira sur place",
    },
    en: {
      orbitTitle: "Your Mirokaï journey in 3 steps",
      orbit1: "Choose your profile",
      orbit2: "Share your contact details",
      orbit3: "Experience Nimira storytelling on site",
    },
  } as const;

  const t = copy[locale];
  const showAll = !isMobile;
  const showHome = showAll || activeMobileTab === "home";
  const showContacts = showAll || activeMobileTab === "contacts";
  const showGame = showAll || activeMobileTab === "game";

  return (
    <main className="pb-14">
      <ConfirmationBanner />
      <div className={showHome ? undefined : "hidden"}>
          <Hero
            profile={hydrated ? resolvedProfile : "team"}
            deployedRobots={DEPLOYED_ROBOTS}
            onPrimaryCTA={scrollToContacts}
          />

          <section className="section-wrap pb-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="section-shell flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-white/75">
                <Sparkles size={12} className="text-[#FFD166]" />
                {t.orbitTitle}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
                <Bot size={13} className="text-[#00F5C4]" />
                {t.orbit1}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
                <CalendarClock size={13} className="text-[#53B3FF]" />
                {t.orbit2}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
                <Building2 size={13} className="text-[#FF6B9D]" />
                {t.orbit3}
              </span>
            </motion.div>
          </section>

          <ProfileSelector
            profile={hydrated ? resolvedProfile : "team"}
            onSelect={handleProfileChange}
            onOpenSlots={openSlotsForProfile}
          />

          <UseCases />

          <Testimonials />
          <FAQ />
          <LocationSection />
          <ExitPopup profile={hydrated ? resolvedProfile : "team"} />
      </div>

      <div className={showContacts ? undefined : "hidden"}>
        <section ref={contactsRef} id="contacts">
          <ContactSection profile={hydrated ? resolvedProfile : "team"} />
        </section>
      </div>

      <section id="game" className={showGame ? undefined : "hidden"}>
          <ArcadeSection />
      </section>
    </main>
  );
}
