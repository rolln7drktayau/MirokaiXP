import { z } from "zod";

export const profileSchema = z.enum(["solo", "team", "b2b"]);

export const b2bFormSchema = z.object({
  company: z.string().min(2, "Le nom d'entreprise est requis."),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"]),
  sector: z.string().min(2, "Le secteur est requis."),
  attendees: z
    .number()
    .int("Le nombre doit être un entier.")
    .min(1, "Minimum 1 personne.")
    .max(200, "Maximum 200 personnes."),
  contactName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Email professionnel invalide."),
});

export const emailCaptureSchema = z.object({
  email: z.string().email("Email invalide."),
  profile: profileSchema,
  consent: z
    .boolean()
    .refine((value) => value, "Le consentement est nécessaire pour recevoir les emails."),
  source: z.string().optional(),
});

export const privateBookingSchema = z.object({
  company: z.string().min(2, "Le nom d'entreprise est requis."),
  contactName: z.string().min(2, "Le nom du contact est requis."),
  email: z.string().email("Email invalide."),
  attendees: z.coerce.number().int().min(8, "Minimum 8 personnes."),
  preferredDate: z.string().min(1, "La date préférée est requise."),
  note: z.string().max(400).optional(),
});

export const leadSchema = b2bFormSchema.extend({
  profile: profileSchema,
  utm: z.record(z.string(), z.string()).optional(),
});

export const moduleThemeSchema = z.enum(["nimira", "tech", "emotion", "narration"]);

export const moduleSchema = z.object({
  number: z.number().int().min(1).max(999),
  name: z.string().min(2).max(80),
  description: z.string().min(8).max(1200),
  audioUrl: z.string().trim().optional().or(z.literal("")),
  videoUrl: z.string().trim().optional().or(z.literal("")),
  images: z.array(z.string()),
  position: z.object({
    x: z.number().min(0).max(100),
    y: z.number().min(0).max(100),
  }),
  mirokaiPrompt: z
    .string()
    .min(8)
    .max(320, "Prompt trop long. Maximum 2-3 phrases recommandées."),
  unlocked: z.boolean(),
  theme: moduleThemeSchema,
});

export const modulePatchSchema = moduleSchema.partial();

export const analyticsEventSchema = z.object({
  event: z.enum([
    "page_view",
    "profile_selected",
    "form_started",
    "form_submitted",
    "eventbrite_redirect",
    "email_captured",
  ]),
  profile: profileSchema.optional(),
  source: z.string().optional(),
  step: z.string().optional(),
  value: z.union([z.string(), z.number()]).optional(),
});

export type B2BFormSchema = z.infer<typeof b2bFormSchema>;
export type EmailCaptureSchema = z.infer<typeof emailCaptureSchema>;
export type PrivateBookingSchema = z.infer<typeof privateBookingSchema>;
export type LeadSchema = z.infer<typeof leadSchema>;
export type ModuleSchema = z.infer<typeof moduleSchema>;
export type ModulePatchSchema = z.infer<typeof modulePatchSchema>;
export type AnalyticsEventSchema = z.infer<typeof analyticsEventSchema>;
