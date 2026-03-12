export type VisitorProfile = "solo" | "team" | "b2b";
export type VisitorSegment = "b2c" | "b2b";

export type CompanySize =
  | "1-10"
  | "11-50"
  | "51-200"
  | "201-500"
  | "500+";

export interface ProfileOption {
  id: VisitorProfile;
  label: string;
  description: string;
  ctaLabel: string;
}

export interface B2BFormData {
  company: string;
  companySize: CompanySize;
  sector: string;
  attendees: number;
  contactName: string;
  email: string;
}

export interface LeadPayload extends B2BFormData {
  profile: VisitorProfile;
  utm?: Record<string, string>;
}

export interface EmailCaptureInput {
  email: string;
  profile: VisitorProfile;
  consent: boolean;
  source?: string;
}

export interface VisitorSession {
  name: string;
  segment: VisitorSegment;
  createdAt: string;
}
