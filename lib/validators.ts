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

export type B2BFormSchema = z.infer<typeof b2bFormSchema>;
export type EmailCaptureSchema = z.infer<typeof emailCaptureSchema>;
export type PrivateBookingSchema = z.infer<typeof privateBookingSchema>;
export type LeadSchema = z.infer<typeof leadSchema>;
