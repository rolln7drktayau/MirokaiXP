import type { B2BFormData, VisitorProfile } from "@/types/profile";

export const DEFAULT_UTM = {
  utm_source: "landing_page",
  utm_medium: "organic",
  utm_campaign: "mirokai_experience_2026",
  utm_content: "solo",
} as const;

export interface EventbriteBuilderInput {
  profile: VisitorProfile;
  formData?: Partial<B2BFormData>;
  utm?: Partial<Record<string, string>>;
}

export const buildEventbriteURL = (
  baseURL: string,
  { profile, formData, utm }: EventbriteBuilderInput,
): string => {
  const params = new URLSearchParams({
    ...DEFAULT_UTM,
    ...utm,
    utm_medium: profile === "b2b" ? "b2b_form" : utm?.utm_medium ?? "organic",
    utm_content: profile,
    ...(formData?.company && { company: formData.company }),
    ...(formData?.email && { email: formData.email }),
    ...(formData?.contactName && { name: formData.contactName }),
    ...(formData?.attendees && { attendees: String(formData.attendees) }),
    ...(profile === "b2b" && { discount: "B2B2026" }),
  });

  return `${baseURL}?${params.toString()}`;
};
