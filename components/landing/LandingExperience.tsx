"use client";

import { useEffect, useMemo, useRef } from "react";

import { useEventbrite } from "@/hooks/useEventbrite";
import { useProfile } from "@/hooks/useProfile";
import { trackEvent, trackPageView } from "@/lib/analytics";
import { getRemainingSlotCount, getUpcomingSlots } from "@/services/bookingService";
import type { B2BFormData, VisitorProfile } from "@/types/profile";

import { B2BForm } from "./B2BForm";
import { BookingCalendar } from "./BookingCalendar";
import { ConfirmationBanner } from "./ConfirmationBanner";
import { ExitPopup } from "./ExitPopup";
import { FAQ } from "./FAQ";
import { Hero } from "./Hero";
import { ProfileSelector } from "./ProfileSelector";
import { Testimonials } from "./Testimonials";
import { UseCases } from "./UseCases";

const EVENTBRITE_URL =
  process.env.NEXT_PUBLIC_EVENTBRITE_URL ??
  "https://www.eventbrite.com/e/mirokai-experience-2026";

export function LandingExperience() {
  const bookingRef = useRef<HTMLElement | null>(null);
  const b2bFormRef = useRef<HTMLElement | null>(null);

  const { profile, hydrated, setProfile } = useProfile("solo");
  const { redirectToEventbrite } = useEventbrite(EVENTBRITE_URL);
  const slots = useMemo(() => getUpcomingSlots(), []);
  const remainingSlots = useMemo(() => getRemainingSlotCount(profile), [profile]);

  useEffect(() => {
    trackPageView("/");
  }, []);

  const handleProfileChange = (nextProfile: VisitorProfile) => {
    setProfile(nextProfile);
    trackEvent("profile_selected", { profile: nextProfile });
  };

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onBookSlot = () => {
    const attendees = profile === "team" ? 4 : 1;
    redirectToEventbrite(profile, { attendees, company: profile === "b2b" ? "Entreprise invitée" : undefined });
  };

  const onB2BQualified = (formData: B2BFormData) => {
    redirectToEventbrite("b2b", formData);
  };

  const onRequestPrivateSlot = () => {
    setProfile("b2b");
    window.setTimeout(() => {
      b2bFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  return (
    <main className="pb-14">
      <ConfirmationBanner />
      <Hero profile={hydrated ? profile : "solo"} remainingSlots={remainingSlots} onPrimaryCTA={scrollToBooking} />
      <ProfileSelector profile={hydrated ? profile : "solo"} onSelect={handleProfileChange} />

      <UseCases />

      <section ref={bookingRef}>
        <BookingCalendar
          profile={hydrated ? profile : "solo"}
          slots={slots}
          onBookSlot={onBookSlot}
          onRequestPrivateSlot={onRequestPrivateSlot}
        />
      </section>

      {profile === "b2b" ? (
        <section ref={b2bFormRef}>
          <B2BForm onQualified={onB2BQualified} />
        </section>
      ) : null}

      <Testimonials />
      <FAQ />
      <ExitPopup profile={hydrated ? profile : "solo"} />
    </main>
  );
}
