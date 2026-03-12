"use client";

import { motion } from "framer-motion";
import { Bot, CalendarClock, Building2, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { useEventbrite } from "@/hooks/useEventbrite";
import { useProfile } from "@/hooks/useProfile";
import { trackEvent, trackPageView } from "@/lib/analytics";
import { getUpcomingSlots } from "@/services/bookingService";
import type { B2BFormData, VisitorProfile, VisitorSession } from "@/types/profile";

import { B2BForm } from "./B2BForm";
import { BookingCalendar } from "./BookingCalendar";
import { ConfirmationBanner } from "./ConfirmationBanner";
import { ExitPopup } from "./ExitPopup";
import { FAQ } from "./FAQ";
import { Hero } from "./Hero";
import { LocationSection } from "./LocationSection";
import { ProfileSelector } from "./ProfileSelector";
import { Testimonials } from "./Testimonials";
import { UseCases } from "./UseCases";
import { ArcadeSection } from "./ArcadeSection";

const EVENTBRITE_URL =
  process.env.NEXT_PUBLIC_EVENTBRITE_URL ??
  "https://www.eventbrite.fr/e/lexperience-mirokai-musee-robotique-et-ia-tickets-1837425843159?aff=ebdsoporgprofile";
const DEPLOYED_ROBOTS = Number(process.env.NEXT_PUBLIC_DEPLOYED_ROBOTS ?? "24");

interface LandingExperienceProps {
  visitorSession: VisitorSession | null;
}

export function LandingExperience({ visitorSession }: LandingExperienceProps) {
  const { locale } = useAppPreferences();
  const bookingRef = useRef<HTMLElement | null>(null);
  const b2bFormRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"home" | "booking" | "game">("home");

  const { profile, hydrated, setProfile } = useProfile("team");
  const { redirectToEventbrite } = useEventbrite(EVENTBRITE_URL);
  const slots = useMemo(() => getUpcomingSlots(), []);
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

    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#booking") {
        setActiveMobileTab("booking");
        return;
      }
      if (hash === "#game") {
        setActiveMobileTab("game");
        return;
      }
      setActiveMobileTab("home");
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
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
    if (nextProfile === "b2b") {
      onRequestPrivateSlot();
      return;
    }
    scrollToBooking();
  };

  const scrollToBooking = () => {
    if (isMobile) {
      window.location.hash = "booking";
      return;
    }
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onBookSlot = () => {
    const attendees = resolvedProfile === "b2b" ? 8 : 4;
    redirectToEventbrite(resolvedProfile, {
      attendees,
      company:
        resolvedProfile === "b2b" ? (locale === "fr" ? "Entreprise invitée" : "Invited company") : undefined,
    });
  };

  const onB2BQualified = (formData: B2BFormData) => {
    redirectToEventbrite("b2b", formData);
  };

  const onRequestPrivateSlot = () => {
    setProfile("b2b");
    if (isMobile) {
      window.location.hash = "booking";
      return;
    }
    window.setTimeout(() => {
      b2bFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const copy = {
    fr: {
      orbitTitle: "Votre parcours Mirokaï en 3 temps",
      orbit1: "Choisissez votre profil",
      orbit2: "Réservez ou demandez un créneau privé",
      orbit3: "Vivez la narration Nimira sur place",
    },
    en: {
      orbitTitle: "Your Mirokaï journey in 3 steps",
      orbit1: "Choose your profile",
      orbit2: "Book or request a private slot",
      orbit3: "Experience Nimira storytelling on site",
    },
  } as const;

  const t = copy[locale];
  const showAll = !isMobile;
  const showHome = showAll || activeMobileTab === "home";
  const showBooking = showAll || activeMobileTab === "booking";
  const showGame = showAll || activeMobileTab === "game";

  return (
    <main className="pb-14">
      <ConfirmationBanner />
      {showHome ? (
        <>
          <Hero
            profile={hydrated ? resolvedProfile : "team"}
            deployedRobots={DEPLOYED_ROBOTS}
            visitorSession={visitorSession}
            onPrimaryCTA={scrollToBooking}
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
        </>
      ) : null}

      {showBooking ? (
        <>
          <section ref={bookingRef} id="booking">
            <BookingCalendar
              profile={hydrated ? resolvedProfile : "team"}
              slots={slots}
              onBookSlot={onBookSlot}
              onRequestPrivateSlot={onRequestPrivateSlot}
            />
          </section>

          {resolvedProfile === "b2b" ? (
            <section ref={b2bFormRef}>
              <B2BForm onQualified={onB2BQualified} />
            </section>
          ) : null}
        </>
      ) : null}

      {showGame ? (
        <section id="game">
          <ArcadeSection />
        </section>
      ) : null}
    </main>
  );
}
