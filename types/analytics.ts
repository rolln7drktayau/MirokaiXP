import type { VisitorProfile } from "./profile";

export type AnalyticsEventName =
  | "page_view"
  | "profile_selected"
  | "form_started"
  | "form_submitted"
  | "eventbrite_redirect"
  | "email_captured";

export interface AnalyticsEventRecord {
  id: string;
  event: AnalyticsEventName;
  profile?: VisitorProfile;
  source?: string;
  value?: string | number;
  step?: string;
  createdAt: string;
}

export interface AnalyticsEventInput {
  event: AnalyticsEventName;
  profile?: VisitorProfile;
  source?: string;
  value?: string | number;
  step?: string;
}
