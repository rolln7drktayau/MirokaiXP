import type { VisitorProfile } from "./profile";

export type EmailSequenceStage = "j7" | "j2" | "j1";
export type ScheduledEmailStatus = "pending" | "sent" | "failed";

export interface SubscriberRecord {
  id: string;
  email: string;
  profile: VisitorProfile;
  source: string;
  consent: boolean;
  createdAt: string;
}

export interface ScheduledEmailRecord {
  id: string;
  subscriberId: string;
  email: string;
  profile: VisitorProfile;
  source: string;
  stage: EmailSequenceStage;
  subject: string;
  html: string;
  scheduledFor: string;
  status: ScheduledEmailStatus;
  sentAt?: string;
  provider?: "resend" | "mock";
  createdAt: string;
}
